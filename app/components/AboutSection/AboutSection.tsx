"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutSection.module.css";

const headline = "Operação executiva com precisão em solo.";

const aboutTitle = "A Well Of integra estrutura, equipe e atendimento para uma rotina mais previsível no Campo de Marte.";
const aboutCopy =
  "Da hangaragem ao apoio a tripulações, cada etapa é conduzida com discrição, clareza e proximidade para proprietários, operadores e passageiros.";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const progress = clamp(value, 0, 1);
  return progress * progress * (3 - 2 * progress);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const letters = useMemo(() => Array.from(headline), []);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
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

  const revealProgress = smoothStep(progress / 0.68);
  const detailProgress = smoothStep((progress - 0.38) / 0.34);
  const arrowProgress = smoothStep(progress / 0.2);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="hangar"
      data-navbar-theme="light"
      style={
        {
          "--reveal-progress": revealProgress,
          "--detail-progress": detailProgress,
          "--arrow-progress": arrowProgress,
        } as CSSProperties
      }
    >
      <div className={styles.stage}>
        <div className={styles.arrow} aria-hidden="true" />

        <div className={styles.content}>
          <h2 className={styles.headline} aria-label={headline}>
            {letters.map((letter, index) => {
              const start = index / letters.length;
              const letterProgress = smoothStep((revealProgress - start * 0.76) / 0.18);

              return (
                <span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  className={letter === " " ? styles.space : undefined}
                  style={
                    {
                      "--letter-progress": letterProgress,
                    } as CSSProperties
                  }
                >
                  {letter}
                </span>
              );
            })}
          </h2>

          <div className={styles.details}>
            <span className={styles.label}>(Sobre nós)</span>
            <article className={styles.detail}>
              <h3>{aboutTitle}</h3>
              <p>{aboutCopy}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
