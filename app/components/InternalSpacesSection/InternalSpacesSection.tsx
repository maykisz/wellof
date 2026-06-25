"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./InternalSpacesSection.module.css";

/* ─── Data ──────────────────────────────────────────────────────────────────*/
const videos = [
  {
    title:   "Operação em solo",
    eyebrow: "FBO",
    area:    "operation",
    focusAt: 0.20,
    sheenDelay: "60ms",
    src: "/interno/hangar/SaveClip.App_AQMFdLjKqWkhjF-wTR2YniQ-4EJ2kNWB-lUXb5giiTc0Z6KvkuEaoR2wbdjW1BdtTlHsVoll1G3DwCbHMaApiE3An2y7tkVFcChSrnY.opt.mp4",
  },
  {
    title:   "Hangar",
    eyebrow: "Estrutura",
    area:    "hangar",
    focusAt: 0.48,
    sheenDelay: "240ms",
    src: "/interno/hangar/SaveClip.App_AQNcDCZnrIOmceH6Cz3_nq2jNfIlwZBLejrpWM5CSnskx96rXt7yUz_MxBAn1VGlio7RNjbwDaeS9wpQZGxRuoW04qEDM-OR7bDsOZk.opt.mp4",
  },
  {
    title:   "Sala VIP",
    eyebrow: "Atendimento",
    area:    "vip",
    focusAt: 0.30,
    sheenDelay: "140ms",
    src: "/interno/sala-vip/SaveClip.App_AQNAPU9h7GUq8HCzeUuZTpprVa8JafqqwCK6qc3Oz264bv9A5r3IVzCwUszu506UIN-xmMx3Z2srzA6Fi7ar3w2DlyXlufa_-6rcxYE.opt.mp4",
  },
  {
    title:   "Sala de reunião",
    eyebrow: "Reservado",
    area:    "meeting",
    focusAt: 0.39,
    sheenDelay: "180ms",
    src: "/interno/sala-reuni%C3%A3o/SaveClip.App_AQMbH4XwopYHPMsgsZjouAE6sshzX5jDFD7M4YJg5vr-ictsw9-wF7hzQlPJ8vqbIk8q5jCMXkXzy_AppCN0Z4od9rAc_7W_6GknCn4.opt.mp4",
  },
  {
    title:   "Sala do piloto",
    eyebrow: "Tripulação",
    area:    "pilot",
    focusAt: 0.57,
    sheenDelay: "320ms",
    src: "/interno/sala-piloto/SaveClip.App_AQP_A0clOrdz5QCdNHC0ghTSNw2DrlEpvKbp3jecGTaTup6tPpKrZeQFAlPUqH5_9Gdl2LukXvQIr34LLDrObIGkGR8-OYdupxMlFv0.opt.mp4",
  },
];

/* ─── Math helpers ──────────────────────────────────────────────────────────*/
function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/** Smooth-step (hermite interpolation) — removes linear feel from all progress values */
function smoothStep(t: number) {
  const p = clamp(t, 0, 1);
  return p * p * (3 - 2 * p);
}

/**
 * Smooth-step applied twice (C2 continuity) — even silkier for card focus.
 * Used specifically for the focus value so cards rise/fall with no abrupt edge.
 */
function smootherStep(t: number) {
  const p = clamp(t, 0, 1);
  return p * p * p * (p * (p * 6 - 15) + 10);
}

/* ─── Component ─────────────────────────────────────────────────────────────*/
export default function InternalSpacesSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const reelRef      = useRef<HTMLDivElement>(null);
  const [isVisible,    setIsVisible]    = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [portalEl,     setPortalEl]     = useState<HTMLElement | null>(null);
  const [selectedIdx,  setSelectedIdx]  = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeSlide,  setActiveSlide]  = useState(0); // mobile dot indicator

  /* Portal target */
  useEffect(() => { setPortalEl(document.body); }, []);

  /* Intersection → play/pause videos */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "-10% 0px -16% 0px", threshold: 0.16 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    for (const v of Array.from(section.querySelectorAll("video"))) {
      isVisible ? void v.play() : v.pause();
    }
  }, [isVisible]);

  /* Scroll → progress (desktop only) */
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.matchMedia("(max-width: 900px)").matches) {
        setProgress(1);
        return;
      }

      const rect       = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Pointer spotlight (desktop) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(max-width: 900px)").matches) return;

    let raf = 0;
    const onPointer = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = clamp(((e.clientX - rect.left) / rect.width)  * 100, 0, 100);
        const y = clamp(((e.clientY - rect.top)  / rect.height) * 100, 0, 100);
        section.style.setProperty("--pointer-x", `${x}%`);
        section.style.setProperty("--pointer-y", `${y}%`);
      });
    };

    section.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onPointer);
    };
  }, []);

  /* Keyboard nav in lightbox */
  useEffect(() => {
    if (selectedIdx === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { setSelectedIdx(null); }
      if (e.key === "ArrowRight") { openVideo((selectedIdx + 1) % videos.length); }
      if (e.key === "ArrowLeft")  { openVideo((selectedIdx - 1 + videos.length) % videos.length); }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIdx]);

  /* Mobile: track active slide from scroll position */
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = reel;
      const idx = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (videos.length - 1));
      setActiveSlide(clamp(idx, 0, videos.length - 1));
    };

    reel.addEventListener("scroll", onScroll, { passive: true });
    return () => reel.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Derived animation values ─────────────────────────────────────────── */
  const introProgress = smoothStep(progress / 0.18);
  const gridProgress  = smoothStep((progress - 0.12) / 0.24);
  const sceneProgress = smoothStep((progress - 0.18) / 0.42);
  const exitProgress  = smoothStep((progress - 0.92) / 0.08);
  const inverseIntro  = 1 - introProgress;

  /* ─── Helpers ──────────────────────────────────────────────────────────── */
  const openVideo = (index: number) => {
    setVideoProgress(0);
    setSelectedIdx(index);
  };

  const selectedVideo = selectedIdx === null ? null : videos[selectedIdx];
  const prevIdx = selectedIdx === null ? null : (selectedIdx - 1 + videos.length) % videos.length;
  const nextIdx = selectedIdx === null ? null : (selectedIdx + 1) % videos.length;

  /* ─── Render ────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="galeria"
      data-navbar-theme="light"
      style={{
        "--intro-progress":    introProgress,
        "--grid-progress":     gridProgress,
        "--grid-y":            `${(1 - gridProgress) * 34}px`,
        "--grid-scale":        0.985 + gridProgress * 0.015,
        "--scene-progress":    sceneProgress,
        "--exit-progress":     exitProgress,
        "--stage-y":           `${exitProgress * -44}px`,
        "--stage-opacity":     1 - exitProgress * 0.36,
        "--spotlight-x":       `${18 + sceneProgress * 64}%`,
        "--spotlight-y":       `${32 + Math.sin(sceneProgress * Math.PI) * 26}%`,
        "--watermark-x":       `${inverseIntro * -5}vw`,
        "--watermark-y":       `${inverseIntro * -28}px`,
        "--watermark-scale":   0.93 + introProgress * 0.07,
        "--watermark-opacity": 0.1 + introProgress * 0.9,
        "--header-y":          `${inverseIntro * 36}px`,
        "--header-opacity":    0.08 + introProgress * 0.92,
        "--pointer-x":         "50%",
        "--pointer-y":         "48%",
      } as CSSProperties}
    >
      <div className={styles.stage}>

        {/* Watermark */}
        <span className={styles.watermark} aria-hidden="true">
          Well&nbsp;Of
        </span>

        {/* Image title */}
        <h2 className={styles.imageTitle}>
          <Image
            src="/interno/titulo.webp"
            alt="Descubra nossos espaços"
            width={2400}
            height={424}
            priority={false}
          />
        </h2>

        {/* Reel grid */}
        <div
          ref={reelRef}
          className={styles.reelGrid}
          aria-label="Vídeos dos espaços internos da Well Of"
        >
          {videos.map((item, index) => {
            // smootherStep for card focus → silkier highlight peak
            const reveal = smoothStep((gridProgress - (index * 0.08)) / 0.32);
            const focus  = smootherStep(1 - Math.abs(progress - item.focusAt) / 0.18);

            return (
              <button
                key={item.src}
                type="button"
                className={styles.card}
                data-area={item.area}
                aria-label={`Abrir vídeo: ${item.title}`}
                onClick={() => openVideo(index)}
                style={{
                  "--card-focus":  focus,
                  "--card-reveal": reveal,
                  "--card-y":      `${(1 - reveal) * 38 - focus * 14}px`,
                  "--card-scale":  0.964 + reveal * 0.036 + focus * 0.018,
                  "--copy-y":      `${(1 - reveal) * 16}px`,
                  "--video-scale": 1.10 - reveal * 0.08 + focus * 0.014,
                  "--wipe-y":      `${(1 - reveal) * 100}%`,
                  "--sheen-delay": item.sheenDelay,
                } as CSSProperties}
              >
                <video
                  className={styles.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={item.src.replace(/\.opt\.mp4(\?.*)?$/i, ".poster.jpg")}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardCopy}>
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                </div>
                <span className={styles.watchPill} aria-hidden="true">
                  Assistir
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile scroll dots */}
        <div className={styles.scrollDots} aria-hidden="true">
          {videos.map((_, i) => (
            <span
              key={i}
              className={styles.scrollDot}
              data-active={String(i === activeSlide)}
            />
          ))}
        </div>

      </div>

      {/* ─── Lightbox ──────────────────────────────────────────────────────── */}
      {selectedVideo && selectedIdx !== null && prevIdx !== null && nextIdx !== null && portalEl
        ? createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
            onClick={() => setSelectedIdx(null)}
          >
            <div
              className={styles.lightboxPanel}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media */}
              <div className={styles.lightboxMedia} key={selectedVideo.src}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedMetadata={() => setVideoProgress(0)}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    const d = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 1;
                    setVideoProgress((v.currentTime / d) * 100);
                  }}
                  poster={selectedVideo.src.replace(/\.opt\.mp4(\?.*)?$/i, ".poster.jpg")}
                >
                  <source src={selectedVideo.src} type="video/mp4" />
                </video>
              </div>

              {/* Close */}
              <div className={styles.lightboxHeader}>
                <button
                  className={styles.lightboxClose}
                  type="button"
                  aria-label="Fechar vídeo"
                  onClick={() => setSelectedIdx(null)}
                />
              </div>

              {/* Prev / Next zones */}
              <div className={styles.lightboxZones}>
                <button
                  type="button"
                  className={styles.lightboxZonePrev}
                  aria-label={`Vídeo anterior: ${videos[prevIdx].title}`}
                  onClick={() => openVideo(prevIdx)}
                />
                <button
                  type="button"
                  className={styles.lightboxZoneNext}
                  aria-label={`Próximo vídeo: ${videos[nextIdx].title}`}
                  onClick={() => openVideo(nextIdx)}
                />
              </div>

              {/* Footer */}
              <div className={styles.lightboxFooter}>
                {/* Progress bar */}
                <div className={styles.lightboxProgress} aria-hidden="true">
                  <span style={{ transform: `scaleX(${videoProgress / 100})` }} />
                </div>

                {/* Copy — key forces re-animation on video change */}
                <div className={styles.lightboxCopy} key={selectedVideo.title}>
                  <span>{selectedVideo.eyebrow}</span>
                  <h3>{selectedVideo.title}</h3>
                </div>
              </div>
            </div>
          </div>,
          portalEl,
        )
        : null}
    </section>
  );
}
