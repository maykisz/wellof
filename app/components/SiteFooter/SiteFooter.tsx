"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./SiteFooter.module.css";

const gallery = [
  { src: "/footer/wellof-footer-hangar.webp", alt: "Aeronave no hangar Well Of" },
  { src: "/about/team-hangar.webp", alt: "Equipe Well Of no hangar" },
  { src: "/about/team-inspection.webp", alt: "Atendimento junto a aeronave no hangar" },
  { src: "/about/team-access.webp", alt: "Recepção de cliente no hangar" },
  { src: "/services/jet-wing-glass.webp", alt: "Aeronave dentro do hangar" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const progress = clamp(value, 0, 1);
  return progress * progress * (3 - 2 * progress);
}

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const footer = footerRef.current;

      if (!footer) {
        return;
      }

      const rect = footer.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const current = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      setProgress(current);
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
    const footer = footerRef.current;
    const video = videoRef.current;

    if (!footer || !video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const logoProgress = smoothStep((progress - 0.22) / 0.46);
  const logoReveal = smoothStep((progress - 0.18) / 0.24);
  const panelProgress = smoothStep((progress - 0.58) / 0.4);
  const galleryProgress = smoothStep((progress - 0.78) / 0.26);

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      data-navbar-theme="dark"
      style={
        {
          "--panel-top": `${100 - panelProgress * 74}vh`,
          "--logo-y": `${118 - logoProgress * 68}vh`,
          "--logo-scale": 0.78 + logoProgress * 0.22,
          "--logo-opacity": logoReveal,
          "--gallery-opacity": galleryProgress,
          "--gallery-y": `${(1 - galleryProgress) * 42}px`,
        } as CSSProperties
      }
    >
      <div className={styles.stage}>
        <div className={styles.imageLayer}>
          <video
            ref={videoRef}
            className={styles.footerVideo}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/footer/video-fundo.poster.jpg"
            aria-label="Vídeo do hangar Well Of"
          >
            <source src="/footer/video-fundo.opt.mp4" type="video/mp4" />
          </video>
          <div className={styles.imageShade} />
          <nav className={styles.topNav} aria-label="Links do rodapé">
            <a href="/#hangar">Hangar</a>
            <a href="/servicos">Serviços</a>
            <a href="/#localizacao">Localização</a>
          </nav>
        </div>

        <Image
          className={`${styles.bigLogo} ${styles.bigLogoDark}`}
          src="/logo-branca.webp"
          alt="Well Of"
          width={900}
          height={252}
          priority={false}
        />

        <div className={styles.blackPanel}>
          <Image
            className={`${styles.bigLogo} ${styles.bigLogoLight}`}
            src="/logo-preta.webp"
            alt=""
            width={900}
            height={252}
            priority={false}
          />

          <div className={styles.footerBar}>
            <a href="mailto:contato@wellof.com.br">contato@wellof.com.br</a>
            <a href="tel:+5511940895758">(11) 94089-5758</a>
            <nav aria-label="Links principais do rodapé">
              <a href="/#hangar">Hangar</a>
              <a href="/servicos">Serviços</a>
              <a href="/#contato">Contato</a>
            </nav>
            <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>

          <div className={styles.gallery}>
            {gallery.map((item) => (
              <figure className={styles.galleryItem} key={item.src}>
                <Image src={item.src} alt={item.alt} fill sizes="20vw" />
              </figure>
            ))}
          </div>

          <div className={styles.legal}>
            <span>&copy; 2026 Well Of Hangar</span>
            <span>Campo de Marte, junto à CASP</span>
            <span>Dados formais apresentados no atendimento e contrato.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
