"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./VisitCtaSection.module.css";

const revealColumns = Array.from({ length: 10 }, (_, index) => index);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function VisitCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveState = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const nextPinned = rect.top <= 0 && rect.bottom >= viewportHeight * 0.12;
      const nextProgress = nextPinned ? clamp(-rect.top / (viewportHeight * 0.82), 0, 1) : 0;

      setIsPinned(nextPinned);
      setRevealProgress(nextProgress);
      setIsActive(nextProgress > 0.86);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveState);
    };

    updateActiveState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isPinned ? styles.isPinned : ""} ${isActive ? styles.isActive : ""}`}
      data-navbar-theme="dark"
      aria-labelledby="visit-cta-title"
    >
      <div className={styles.stickyFrame}>
        <Image className={styles.image} src="/visit-cta/hangar-dawn.png" alt="" fill sizes="100vw" priority={false} />
        <div className={styles.revealColumns} aria-hidden="true">
          {revealColumns.map((column) => (
            <span
              key={column}
              style={
                {
                  "--column-index": column,
                  "--column-x": `${(column / (revealColumns.length - 1)) * 100}%`,
                  "--column-y": `${(1 - clamp((revealProgress - column * 0.065) / 0.22, 0, 1)) * 112}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <p className={styles.eyebrow}>Base no Campo de Marte</p>
          <h2 id="visit-cta-title">Conheca a estrutura de perto.</h2>
          <p className={styles.copy}>
            Agende uma visita a nossa base e veja como atendimento, hangaragem e apoio operacional acontecem antes do embarque.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="mailto:contato@wellof.com.br?subject=Agendar%20visita%20Well%20Of">
              Agendar visita
            </a>
            <a className={styles.secondary} href="#contato">
              Falar com atendimento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
