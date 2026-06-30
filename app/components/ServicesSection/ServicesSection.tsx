"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./ServicesSection.module.css";

const services = [
  {
    slug: "fbo",
    title: "FBO",
    eyebrow: "Chegada, permanencia e partida",
    detail:
      "Coordenacao completa da operacao em solo para aeronaves executivas, incluindo chegada, recepcao de passageiros, suporte a tripulacao e partida com agilidade, discricao e padrao Well Of.",
    image: "/services/service-fbo-generated.webp",
    theme: "#b9b6ad",
    sideLeft: "chegada",
    sideRight: "partida",
  },
  {
    slug: "hangaragem",
    title: "Hangaragem",
    eyebrow: "Estrutura executiva",
    detail:
      "Acomodacao de aeronaves no Hangar Well Of junto a CASP, com rotina pensada para proteger o equipamento, facilitar a operacao e centralizar o atendimento de proprietarios, operadores e tripulacoes.",
    image: "/services/service-hangaragem-generated.webp",
    theme: "#4a4441",
    sideLeft: "protege",
    sideRight: "prepara",
  },
  {
    slug: "atendimento-executivo",
    title: "Atendimento Executivo",
    eyebrow: "Recepcao personalizada",
    detail:
      "Atendimento voltado a passageiros e tripulacoes que buscam conforto, privacidade e eficiencia, com recepcao discreta, suporte proximo e cuidado em cada etapa da jornada no hangar.",
    image: "/services/service-atendimento-generated.webp",
    theme: "#8f9a98",
    sideLeft: "recebe",
    sideRight: "cuida",
  },
];

const SLIDE_INTERVAL = 5200;
const SERVICE_WORD = "SERVICOS";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const smoothStep = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

const updateCursorPosition = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
};

const resetCursorPosition = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.style.removeProperty("--cursor-x");
  event.currentTarget.style.removeProperty("--cursor-y");
  event.currentTarget.removeAttribute("data-cursor-side");
};

const feedbackCards = [
  {
    name: "Operador executivo",
    role: "Hangaragem",
    quote: "A rotina ficou previsivel. A aeronave chega protegida e pronta para a proxima etapa.",
    src: "/feedback/feedback-crew.webp",
    className: "cardOne" as const,
  },
  {
    name: "Tripulacao",
    role: "Apoio em solo",
    quote: "O atendimento antecipa demandas e deixa a partida mais simples.",
    src: "/feedback/feedback-greeting.webp",
    className: "cardTwo" as const,
  },
  {
    name: "Passageiro",
    role: "Atendimento executivo",
    quote: "A chegada acontece com privacidade, conforto e discricao.",
    src: "/feedback/feedback-reception.webp",
    className: "cardThree" as const,
  },
  {
    name: "Base Well Of",
    role: "FBO",
    quote: "Hangar, recepcao e operacao funcionam como uma unica rotina.",
    src: "/feedback/feedback-apron.webp",
    className: "cardFour" as const,
  },
  {
    name: "Recepcao",
    role: "Atendimento",
    quote: "Chegada privada e fluida.",
    src: "/feedback/feedback-checklist.webp",
    className: "cardSix" as const,
  },
  {
    name: "Operacao",
    role: "Solo",
    quote: "Equipe proxima em cada detalhe.",
    src: "/feedback/feedback-inspection.webp",
    className: "cardSeven" as const,
  },
  {
    name: "Hangar",
    role: "Estrutura",
    quote: "Protecao e previsibilidade.",
    src: "/feedback/feedback-ramp.webp",
    className: "cardEight" as const,
  },
  {
    name: "FBO Well Of",
    role: "Partida",
    quote: "Fluxo seguro ate a decolagem.",
    src: "/feedback/feedback-apron.webp",
    className: "cardNine" as const,
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [previousActive, setPreviousActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scenePinned, setScenePinned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (index === active) return;
    setPreviousActive(active);
    setActive(index);
    setProgressKey((k) => k + 1);
  };

  const prev = () => goTo((active + services.length - 1) % services.length);
  const next = () => goTo((active + 1) % services.length);

  const updateFeatureCursorPosition = (event: PointerEvent<HTMLDivElement>) => {
    updateCursorPosition(event);
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.dataset.cursorSide =
      event.clientX - rect.left < rect.width / 2 ? "prev" : "next";
  };

  const handleFeatureClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.clientX - rect.left < rect.width / 2 ? prev() : next();
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (scrollProgress < 0.88) return;

    timerRef.current = setTimeout(() => {
      setActive((current) => {
        setPreviousActive(current);
        return (current + 1) % services.length;
      });
      setProgressKey((k) => k + 1);
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [progressKey, scrollProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
        const viewport = window.innerHeight || 1;
        const entranceOffset = viewport * 0.55;
        setScrollProgress(clamp((entranceOffset - rect.top) / (scrollable + entranceOffset)));
        const nextTop =
          document.querySelector("#confianca")?.getBoundingClientRect().top ?? rect.bottom;
        setScenePinned(rect.top <= entranceOffset && nextTop > 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

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
      { rootMargin: "0px 0px -34% 0px", threshold: 0.02 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const current = services[active];
  const previous = services[previousActive];
  const hasPrevious = previousActive !== active;

  const introProgress      = smoothStep(scrollProgress / 0.2);
  const cardsExit          = smoothStep((scrollProgress - 0.72) / 0.16);
  const featureProgress    = smoothStep((scrollProgress - 0.74) / 0.1);
  const featureScale       = smoothStep((scrollProgress - 0.74) / 0.12);
  const serviceTextProgress = smoothStep((scrollProgress - 0.92) / 0.06);
  const servicesProgress   = smoothStep((scrollProgress - 0.88) / 0.12);
  const wordProgress       = smoothStep((scrollProgress - 0.8) / 0.18);
  const isFinalFrame       = scrollProgress >= 0.98;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="servicos"
      data-navbar-theme="light"
      data-visible={isVisible}
      data-scene-pinned={scenePinned}
      data-final-frame={isFinalFrame}
      style={
        {
          "--intro-progress": introProgress,
          "--cards-exit": cardsExit,
          "--feature-progress": featureProgress,
          "--feature-scale": featureScale,
          "--service-text-progress": serviceTextProgress,
          "--services-progress": servicesProgress,
        } as CSSProperties
      }
    >
      <div className={styles.inner}>
        <div className={styles.introScene}>
          <div className={styles.introCopy}>
            <span>Well Of Hangar</span>
            <p className={styles.introHeadline}>
              <span className={styles.headlineTop}>Feedbacks reais</span>
              <span className={styles.splitLine}>
                <span className={styles.splitLeft}>por quem</span>
                <span className={styles.splitRight}>opera</span>
              </span>
            </p>
          </div>

          {feedbackCards.map((card, index) => {
            const entry = smoothStep((scrollProgress - (0.03 + index * 0.018)) / 0.2);
            const cardProgress = entry * (1 - cardsExit);

            return (
              <article
                key={card.name}
                className={`${styles.feedbackCard} ${styles[card.className]}`}
                onPointerMove={updateCursorPosition}
                onPointerLeave={resetCursorPosition}
                style={{ "--card-progress": cardProgress } as CSSProperties}
              >
                <div className={styles.feedbackMedia}>
                  <Image src={card.src} alt="" fill sizes="24vw" />
                </div>
                <div className={styles.feedbackCopy}>
                  <span>{card.role}</span>
                  <p>{card.quote}</p>
                  <strong>{card.name}</strong>
                </div>
              </article>
            );
          })}

          <div className={styles.featureServiceTitle} aria-label="Servicos">
            {Array.from(SERVICE_WORD).map((letter, index) => {
              const titleLetterProgress = smoothStep(
                (serviceTextProgress - index * 0.065) / 0.3,
              );
              return (
                <span
                  key={`title-${letter}-${index}`}
                  aria-hidden="true"
                  style={{ "--title-letter-progress": titleLetterProgress } as CSSProperties}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <div
            className={styles.featureReveal}
            onClick={handleFeatureClick}
            onPointerMove={updateFeatureCursorPosition}
            onPointerLeave={resetCursorPosition}
            style={{ "--slide-bg": current.theme } as CSSProperties}
          >
            <span className={`${styles.featureSideLabel} ${styles.featureSideLabelLeft}`}>
              {current.sideLeft}
            </span>
            <span className={`${styles.featureSideLabel} ${styles.featureSideLabelRight}`}>
              {current.sideRight}
            </span>

            {hasPrevious && (
              <Image
                key={`feature-prev-${previous.slug}-${progressKey}`}
                src={previous.image}
                alt=""
                fill
                sizes="82vw"
                className={styles.mainImagePrevious}
              />
            )}

            <Image
              key={`feature-curr-${current.slug}-${progressKey}`}
              src={current.image}
              alt=""
              fill
              sizes="82vw"
              className={styles.mainImageCurrent}
            />

            <span
              key={`sweep-${progressKey}`}
              className={styles.panelSweep}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>

            <span className={styles.featureHoverCursor} aria-hidden="true" />

            <div
              key={`caption-${current.slug}`}
              className={styles.featureServiceCaption}
            >
              <span>{current.eyebrow}</span>
              <h3>{current.title}</h3>
              <p>{current.detail}</p>
              <a className={styles.detailCta} href={`/servicos#${current.slug}`}>
                Ver servico
              </a>
            </div>

            <div className={styles.featureThumbs} aria-label="Selecionar servico">
              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  className={styles.featureThumb}
                  data-active={index === active}
                  onClick={() => goTo(index)}
                  aria-label={`Ver ${service.title}`}
                >
                  <Image src={service.image} alt="" fill sizes="86px" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.featureProgress} aria-hidden="true">
            {services.map((service, index) => (
              <span
                key={service.slug}
                data-active={index === active}
                style={{ "--duration": `${SLIDE_INTERVAL}ms` } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <h2 className={styles.word} aria-label="Servicos">
          {Array.from(SERVICE_WORD).map((letter, index) => {
            const letterProgress = smoothStep((wordProgress - index * 0.06) / 0.28);
            return (
              <span
                key={`word-${letter}-${index}`}
                aria-hidden="true"
                style={
                  {
                    "--letter-index": index,
                    "--letter-progress": letterProgress,
                  } as CSSProperties
                }
              >
                {letter}
              </span>
            );
          })}
        </h2>

        <div className={styles.showcase} aria-hidden="true">
          <button
            type="button"
            className={`${styles.imageButton} ${styles.mainImage}`}
            onClick={next}
            aria-label={`Ver ${current.title}`}
          >
            {hasPrevious && (
              <Image
                key={`prev-${previous.slug}-${progressKey}`}
                src={previous.image}
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 54vw"
                className={styles.mainImagePrevious}
              />
            )}
            <Image
              key={`curr-${current.slug}-${progressKey}`}
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 54vw"
              className={styles.mainImageCurrent}
            />
            <span
              key={`sweep-showcase-${progressKey}`}
              className={styles.panelSweep}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>

            <div key={`img-caption-${current.slug}`} className={styles.imageCaption}>
              <span>{current.eyebrow}</span>
              <h3>{current.title}</h3>
              <p>{current.detail}</p>
              <a className={styles.detailCta} href={`/servicos#${current.slug}`}>
                Ver servico
              </a>
              <div className={styles.inlineProgress} aria-hidden="true">
                {services.map((service, index) => (
                  <span
                    key={service.slug}
                    data-active={index === active}
                    style={{ "--duration": `${SLIDE_INTERVAL}ms` } as CSSProperties}
                  />
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
