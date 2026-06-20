"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./HeroSection.module.css";

const heroSlides = [
  {
    src: "/hero/wellof-hero-hangar-night.png",
    alt: "Jato executivo em hangar premium iluminado a noite",
    className: "slideOne",
  },
  {
    src: "/hero/wellof-hero-apron-night.png",
    alt: "Jato executivo em hangar aberto com luzes noturnas",
    className: "slideTwo",
  },
];

export default function HeroSection() {
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  function playPreviewVideo() {
    const video = previewVideoRef.current;

    if (!video) {
      return;
    }

    video.play().catch(() => undefined);
  }

  function resetPreviewVideo() {
    const video = previewVideoRef.current;

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  }

  return (
    <section className={styles.hero} id="sobre" aria-label="Well Of Hangar" data-navbar-theme="hero">
      <div className={styles.slider} aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <Image
            key={`${slide.src}-${slide.className}`}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`${styles.image} ${styles[slide.className]}`}
          />
        ))}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1>Voe Mais Longe</h1>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <p>Uma base no Campo de Marte para chegada, permanencia e atendimento executivo.</p>
            <div className={styles.actions}>
              <a className={styles.cta} href="/#contato">
                Solicitar Hangaragem
              </a>
              <div
                className={styles.preview}
                tabIndex={0}
                aria-label="Reproduzir video do atendimento executivo"
                onFocus={playPreviewVideo}
                onBlur={resetPreviewVideo}
                onMouseEnter={playPreviewVideo}
                onMouseLeave={resetPreviewVideo}
              >
                <video
                  ref={previewVideoRef}
                  className={styles.previewVideo}
                  src="/footer/video-fundo.mp4"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/services/service-fbo.png"
                  aria-label="Video do atendimento executivo Well Of"
                />
                <div className={styles.previewThumb} aria-hidden="true">
                  <Image src="/services/service-fbo.png" alt="" width={220} height={132} />
                </div>
                <span>FBO • Hangaragem • Atendimento Executivo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
