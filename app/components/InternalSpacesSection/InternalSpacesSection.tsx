"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./InternalSpacesSection.module.css";

const videos = [
  {
    title: "Operacao em solo",
    eyebrow: "FBO",
    area: "operation",
    delay: 0,
    focusAt: 0.2,
    src: "/interno/hangar/SaveClip.App_AQMFdLjKqWkhjF-wTR2YniQ-4EJ2kNWB-lUXb5giiTc0Z6KvkuEaoR2wbdjW1BdtTlHsVoll1G3DwCbHMaApiE3An2y7tkVFcChSrnY.mp4",
  },
  {
    title: "Hangar",
    eyebrow: "Estrutura",
    area: "hangar",
    delay: 0.12,
    focusAt: 0.48,
    src: "/interno/hangar/SaveClip.App_AQNcDCZnrIOmceH6Cz3_nq2jNfIlwZBLejrpWM5CSnskx96rXt7yUz_MxBAn1VGlio7RNjbwDaeS9wpQZGxRuoW04qEDM-OR7bDsOZk.mp4",
  },
  {
    title: "Sala VIP",
    eyebrow: "Atendimento",
    area: "vip",
    delay: 0.04,
    focusAt: 0.3,
    src: "/interno/sala-vip/SaveClip.App_AQNAPU9h7GUq8HCzeUuZTpprVa8JafqqwCK6qc3Oz264bv9A5r3IVzCwUszu506UIN-xmMx3Z2srzA6Fi7ar3w2DlyXlufa_-6rcxYE.mp4",
  },
  {
    title: "Sala de reuniao",
    eyebrow: "Reservado",
    area: "meeting",
    delay: 0.08,
    focusAt: 0.39,
    src: "/interno/sala-reuni%C3%A3o/SaveClip.App_AQMbH4XwopYHPMsgsZjouAE6sshzX5jDFD7M4YJg5vr-ictsw9-wF7hzQlPJ8vqbIk8q5jCMXkXzy_AppCN0Z4od9rAc_7W_6GknCn4.mp4",
  },
  {
    title: "Sala do piloto",
    eyebrow: "Tripulacao",
    area: "pilot",
    delay: 0.16,
    focusAt: 0.57,
    src: "/interno/sala-piloto/SaveClip.App_AQP_A0clOrdz5QCdNHC0ghTSNw2DrlEpvKbp3jecGTaTup6tPpKrZeQFAlPUqH5_9Gdl2LukXvQIr34LLDrObIGkGR8-OYdupxMlFv0.mp4",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const progress = clamp(value, 0, 1);
  return progress * progress * (3 - 2 * progress);
}

export default function InternalSpacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    setPortalElement(document.body);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "-12% 0px -18% 0px", threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const media = Array.from(section.querySelectorAll("video"));

    media.forEach((video) => {
      if (isVisible) {
        void video.play();
      } else {
        video.pause();
      }
    });
  }, [isVisible]);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      if (window.matchMedia("(max-width: 900px)").matches) {
        setProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(max-width: 900px)").matches) {
      return;
    }

    const updatePointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      section.style.setProperty("--pointer-x", `${clamp(x, 0, 100)}%`);
      section.style.setProperty("--pointer-y", `${clamp(y, 0, 100)}%`);
    };

    section.addEventListener("pointermove", updatePointer);

    return () => section.removeEventListener("pointermove", updatePointer);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => (current === null ? current : (current + 1) % videos.length));
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => (current === null ? current : (current - 1 + videos.length) % videos.length));
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const introProgress = smoothStep(progress / 0.18);
  const gridProgress = smoothStep((progress - 0.12) / 0.24);
  const sceneProgress = smoothStep((progress - 0.18) / 0.42);
  const exitProgress = smoothStep((progress - 0.92) / 0.08);
  const inverseIntro = 1 - introProgress;
  const selectedVideo = selectedIndex === null ? null : videos[selectedIndex];
  const previousIndex = selectedIndex === null ? null : (selectedIndex - 1 + videos.length) % videos.length;
  const nextIndex = selectedIndex === null ? null : (selectedIndex + 1) % videos.length;

  const selectVideo = (index: number) => {
    setVideoProgress(0);
    setSelectedIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="galeria"
      data-navbar-theme="light"
      style={
        {
          "--intro-progress": introProgress,
          "--grid-progress": gridProgress,
          "--grid-y": `${(1 - gridProgress) * 34}px`,
          "--grid-scale": 0.985 + gridProgress * 0.015,
          "--scene-progress": sceneProgress,
          "--exit-progress": exitProgress,
          "--stage-y": `${exitProgress * -42}px`,
          "--stage-opacity": 1 - exitProgress * 0.34,
          "--pointer-x": "50%",
          "--pointer-y": "48%",
          "--spotlight-x": `${18 + sceneProgress * 64}%`,
          "--spotlight-y": `${32 + Math.sin(sceneProgress * Math.PI) * 26}%`,
          "--watermark-x": `${inverseIntro * -5}vw`,
          "--watermark-y": `${inverseIntro * -28}px`,
          "--watermark-scale": 0.94 + introProgress * 0.06,
          "--watermark-opacity": 0.12 + introProgress * 0.88,
          "--header-y": `${inverseIntro * 34}px`,
          "--header-opacity": 0.1 + introProgress * 0.9,
        } as CSSProperties
      }
    >
      <div className={styles.stage}>
        <h2 className={styles.imageTitle}>
          <Image src="/interno/titulo.jpeg" alt="Descubra nossos espacos" width={2400} height={424} priority={false} />
        </h2>

        <div className={styles.reelGrid} aria-label="Videos dos espacos internos da Well Of">
          {videos.map((item, index) => {
            const reveal = smoothStep((gridProgress - item.delay) / 0.32);
            const focus = smoothStep(1 - Math.abs(progress - item.focusAt) / 0.18);

            return (
              <button
                type="button"
                className={styles.card}
                data-area={item.area}
                key={item.src}
                aria-label={`Abrir video: ${item.title}`}
                onClick={() => selectVideo(index)}
                style={
                  {
                    "--card-focus": focus,
                    "--card-reveal": reveal,
                    "--card-y": `${(1 - reveal) * 38 - focus * 14}px`,
                    "--card-scale": 0.965 + reveal * 0.035 + focus * 0.018,
                    "--copy-y": `${(1 - reveal) * 16}px`,
                    "--video-scale": 1.1 - reveal * 0.08 + focus * 0.015,
                    "--wipe-y": `${(1 - reveal) * 100}%`,
                  } as CSSProperties
                }
              >
                <video className={styles.video} src={item.src} muted loop playsInline preload="metadata" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardCopy}>
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                </div>
                <span className={styles.watchPill}>Assistir</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedVideo && selectedIndex !== null && previousIndex !== null && nextIndex !== null && portalElement
        ? createPortal(
            <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={selectedVideo.title} onClick={() => setSelectedIndex(null)}>
              <div className={styles.lightboxPanel} onClick={(event) => event.stopPropagation()}>
                <div className={styles.lightboxMedia} key={selectedVideo.src}>
                  <video
                    src={selectedVideo.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={() => setVideoProgress(0)}
                    onTimeUpdate={(event) => {
                      const video = event.currentTarget;
                      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
                      setVideoProgress((video.currentTime / duration) * 100);
                    }}
                  />
                </div>
                <div className={styles.lightboxHeader}>
                  <button className={styles.lightboxClose} type="button" aria-label="Fechar video" onClick={() => setSelectedIndex(null)} />
                </div>
                <div className={styles.lightboxZones}>
                  <button type="button" className={styles.lightboxZonePrev} aria-label={`Video anterior: ${videos[previousIndex].title}`} onClick={() => selectVideo(previousIndex)} />
                  <button type="button" className={styles.lightboxZoneNext} aria-label={`Proximo video: ${videos[nextIndex].title}`} onClick={() => selectVideo(nextIndex)} />
                </div>
                <div className={styles.lightboxFooter}>
                  <div className={styles.lightboxProgress} aria-hidden="true">
                    <span style={{ transform: `scaleX(${videoProgress / 100})` }} />
                  </div>
                  <div className={styles.lightboxCopy} key={selectedVideo.title}>
                    <span>{selectedVideo.eyebrow}</span>
                    <h3>{selectedVideo.title}</h3>
                  </div>
                </div>
              </div>
            </div>,
            portalElement,
          )
        : null}
    </section>
  );
}
