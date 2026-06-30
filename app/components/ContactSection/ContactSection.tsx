"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContactSection.module.css";

const whatsappHref =
  "https://wa.me/5511940895758?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20disponibilidade%20com%20a%20Well%20Of%20para%20hangaragem%20e%20FBO.";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px", threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport - rect.top) / (viewport + rect.height);
      const progress = Math.min(1, Math.max(0, raw));
      section.style.setProperty("--contact-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.sectionVisible : ""}`}
      id="contato"
      data-navbar-theme="hero"
    >
      <div className={styles.jetWrap} aria-hidden="true">
        <img className={styles.jetImage} src="/contact/contact-jet-focus.png" alt="" />
        <div className={styles.jetOverlay} />
      </div>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Well Of · Campo de Marte</span>

        <div className={styles.titleRow}>
          <h2 className={`${styles.title} ${styles.titleLeft}`}>Pronta</h2>
          <h2 className={`${styles.title} ${styles.titleRight}`}>Para voar</h2>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.subtitle}>
            Hangaragem premium, manutenção e atendimento dedicado para sua aeronave em São Paulo.
          </p>

          <div className={styles.actions}>
            <a className={styles.button} href={whatsappHref} target="_blank" rel="noreferrer">
              <span>Entrar em contato</span>
              <svg
                className={styles.buttonIcon}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className={styles.phoneLink} href="tel:+5511940895758">
              +55 11 94089-5758
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
