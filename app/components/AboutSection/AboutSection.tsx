"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.css";

const slides = [
  {
    src: "/about/team-hangar.png",
    alt: "Equipe Well Of ao lado de aeronave em hangar",
    kicker: "Sobre a gente",
    title: "Presença no hangar, processo visível.",
    copy: "A Well Of nasce para atender de forma direta: acesso combinado, equipe no local e comunicação clara em cada etapa.",
  },
  {
    src: "/about/team-inspection.png",
    alt: "Equipe alinhando atendimento junto a aeronave",
    kicker: "Atendimento executivo",
    title: "Chegada e saída com suporte no local.",
    copy: "A equipe acompanha a recepção, o acesso ao hangar e o atendimento necessário para passageiros, tripulação e operadores.",
  },
  {
    src: "/wellof-hangar-hero.png",
    alt: "Hangar Well Of no Campo de Marte",
    kicker: "Campo de Marte",
    title: "Uma base enxuta junto a CASP.",
    copy: "O foco é simples: hangaragem com localização clara, atendimento direto e informações verificáveis.",
  },
  {
    src: "/about/team-access.png",
    alt: "Equipe alinhando detalhes de acesso no hangar",
    kicker: "FBO",
    title: "Tudo combinado antes da chegada.",
    copy: "O atendimento confirma horários, acesso ao espaço e condições de permanência para reduzir improviso no dia.",
  },
  {
    src: "/about/team-cta.png",
    alt: "Recepção no hangar para visita e atendimento",
    kicker: "Próximo passo",
    title: "Agende uma conversa no hangar.",
    copy: "Veja o espaço, confirme o processo de acesso e alinhe as condições diretamente com a equipe.",
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

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const current = clamp(-rect.top / scrollable, 0, 1);
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

  const introProgress = clamp(progress / 0.16, 0, 1);
  const sequenceProgress = clamp((progress - 0.16) / 0.56, 0, 1);
  const spreadProgress = clamp((progress - 0.88) / 0.12, 0, 1);
  const contentFade = 1 - smoothStep((progress - 0.78) / 0.08);
  const transitionCount = slides.length - 1;
  const sequencePosition = sequenceProgress * transitionCount;
  const currentStep = Math.min(Math.floor(sequencePosition), transitionCount);
  const stepProgress = currentStep === transitionCount ? 1 : sequencePosition - currentStep;
  const holdProgress = clamp(stepProgress / 0.62, 0, 1);
  const transitionProgress = smoothStep((stepProgress - 0.62) / 0.38);
  const active = currentStep === transitionCount ? transitionCount : currentStep + transitionProgress;
  const stackY = 34 - introProgress * 24;
  const finalIndex = slides.length - 1;
  const spreadSlots = [-104, -56, 56, 104];

  return (
    <section ref={sectionRef} className={styles.section} id="sobre" data-navbar-theme="light">
      <div className={styles.stage}>
        <h2 className={styles.title}>
          <Image
            src="/about/texto-sobre-a-agente.png"
            alt="Sobre a gente"
            width={3002}
            height={688}
            priority
          />
        </h2>

        <div className={styles.copyRail}>
          {slides.map((slide, index) => {
            const offset = index - active;
            const opacity = clamp(1 - Math.abs(offset) * 1.8, 0, 1) * contentFade;
            const textFill = index < currentStep ? 1 : index === currentStep ? holdProgress : 0;

            return (
              <div
                className={styles.copyBlock}
                key={slide.title}
                style={
                  {
                    "--copy-opacity": opacity,
                    "--copy-y": `${offset * 34}px`,
                    "--text-fill": `${textFill * 100}%`,
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

        <div className={styles.mediaStack} style={{ "--stack-y": `${stackY}vh` } as CSSProperties}>
          {slides.map((slide, index) => {
            const reveal = clamp(active - index + 1, 0, 1);
            const baseY = index === 0 ? 0 : (1 - reveal) * 82;
            const isFinal = index === finalIndex;
            const finalSlot = spreadSlots[index] ?? 0;
            const spreadX = isFinal ? 0 : finalSlot * spreadProgress;
            const spreadY = isFinal ? 0 : 6 * spreadProgress;
            const scale = isFinal ? 1 - spreadProgress * 0.14 : 1 - spreadProgress * 0.36;
            const layer = isFinal ? 90 : 20 + index;

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
                    "--card-copy-opacity": contentFade,
                  } as CSSProperties
                }
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 86vw, 46vw" />
                {slide.cta ? (
                  <div className={styles.cardCta}>
                    <h3>{slide.title}</h3>
                    <a href="/contato">{slide.cta}</a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
