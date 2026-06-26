"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.css";

const slides = [
  {
    src: "/about/team-hangar.webp",
    alt: "Equipe Well Of alinhando operação ao lado de aeronave executiva no hangar",
    kicker: "Sobre a Well Of",
    title: "Base executiva no Campo de Marte.",
    copy:
      "A Well Of reúne estrutura, equipe e operação em solo para oferecer uma experiência mais simples, reservada e organizada para proprietários, operadores, passageiros e tripulações.",
  },
  {
    src: "/wellof-hangar-hero.webp",
    alt: "Hangar Well Of no Campo de Marte com aeronave executiva",
    kicker: "Estrutura dedicada",
    title: "Um hangar pensado para a rotina da aviação executiva.",
    copy:
      "Localizada junto à CASP, nossa base oferece suporte direto para chegada, permanência, hangaragem e partida, com atendimento próximo e operação centralizada.",
  },
  {
    src: "/about/team-cta.webp",
    alt: "Atendimento reservado para visita ao hangar Well Of",
    kicker: "Visita e atendimento",
    title: "Conheça o hangar Well Of.",
    copy:
      "Agende uma conversa para visitar a estrutura, entender as possibilidades de operação e alinhar as condições diretamente com a nossa equipe.",
    cta: "Falar com a Well Of",
  },
];

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
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const current = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
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
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setMobileActive((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const introProgress = clamp(progress / 0.12, 0, 1);
  const sequenceProgress = clamp((progress - 0.08) / 0.58, 0, 1);
  const spreadProgress = clamp((progress - 0.78) / 0.14, 0, 1);
  const contentFade = 1 - smoothStep((progress - 0.72) / 0.1);
  const transitionCount = slides.length - 1;
  const sequencePosition = sequenceProgress * transitionCount;
  const currentStep = Math.min(Math.floor(sequencePosition), transitionCount);
  const stepProgress = currentStep === transitionCount ? 1 : sequencePosition - currentStep;
  const transitionProgress = smoothStep((stepProgress - 0.6) / 0.4);
  const active = currentStep === transitionCount ? transitionCount : currentStep + transitionProgress;
  const stackY = 29 - introProgress * 22 + smoothStep(spreadProgress) * 9;
  const stackX = (1 - smoothStep(spreadProgress)) * 18;
  const finalIndex = slides.length - 1;
  const spreadSlots = [-54, 54, 0];
  const finalCopyOpacity =
    spreadProgress <= 0.08
      ? 1
      : spreadProgress < 0.72
        ? 0
        : smoothStep((spreadProgress - 0.72) / 0.28);

  return (
    <section ref={sectionRef} className={styles.section} id="hangar" data-navbar-theme="light">
      <div className={styles.stage}>
        <h2 className={styles.title}>
          Sobre a Well Of
        </h2>

        <div className={styles.copyRail}>
          {slides.map((slide, index) => {
            const offset = index - active;
            const opacity = clamp(1 - Math.abs(offset) * 1.8, 0, 1) * contentFade;

            return (
              <div
                className={styles.copyBlock}
                key={slide.title}
                style={
                  {
                    "--copy-opacity": opacity,
                    "--copy-y": `${offset * 30}px`,
                  } as CSSProperties
                }
              >
                <div className={styles.copyHeading}>
                  <span>{slide.kicker}</span>
                  <h3>{slide.title}</h3>
                </div>
                <p>{slide.copy}</p>
              </div>
            );
          })}
        </div>

        <div
          className={styles.mediaStack}
          style={{ "--stack-x": `${stackX}vw`, "--stack-y": `${stackY}vh` } as CSSProperties}
        >
          {slides.map((slide, index) => {
            const reveal = clamp(active - index + 1, 0, 1);
            const baseY = index === 0 ? 0 : (1 - reveal) * 78;
            const isFinal = index === finalIndex;
            const finalSlot = spreadSlots[index] ?? 0;
            const spreadX = finalSlot * spreadProgress;
            const spreadY = (isFinal ? 5 : 1) * spreadProgress;
            const scale = isFinal ? 1 : 1 - spreadProgress * 0.25;
            const layer = isFinal ? 90 : 40 + index;
            const cardCopyOpacity = isFinal ? finalCopyOpacity : contentFade;

            return (
              <article
                className={styles.mediaCard}
                key={slide.src}
                style={
                  {
                    "--card-x": `${spreadX}%`,
                    "--card-y": `${baseY + spreadY}vh`,
                    "--card-scale": scale,
                    "--card-layer": layer,
                    "--card-copy-opacity": cardCopyOpacity,
                  } as CSSProperties
                }
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 86vw, 46vw" />
                {slide.cta ? (
                  <div className={styles.cardCta}>
                    <h3>{slide.title}</h3>
                    <a href="#contato">{slide.cta}</a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className={styles.mobileList} aria-roledescription="carousel" aria-label="Sobre a Well Of">
          <div className={styles.mobileViewport}>
            <div
              className={styles.mobileTrack}
              style={{ "--mobile-slide": mobileActive } as CSSProperties}
            >
              {slides.map((slide, index) => (
                <article
                  className={styles.mobileItem}
                  key={`mobile-${slide.src}`}
                  aria-hidden={index !== mobileActive}
                >
                  <div className={styles.mobileImage}>
                    <Image src={slide.src} alt={slide.alt} fill sizes="100vw" />
                  </div>
                  <div className={styles.mobileCopy}>
                    <span>{slide.kicker}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.copy}</p>
                    {slide.cta ? <a href="#contato">{slide.cta}</a> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.mobileDots} aria-label="Selecionar slide">
            {slides.map((slide, index) => (
              <button
                className={styles.mobileDot}
                type="button"
                key={`mobile-dot-${slide.src}`}
                aria-label={`Mostrar slide ${index + 1}`}
                aria-current={index === mobileActive}
                onClick={() => setMobileActive(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
