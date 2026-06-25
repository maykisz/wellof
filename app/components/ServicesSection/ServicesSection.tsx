"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./ServicesSection.module.css";

const services = [
  {
    slug: "fbo",
    title: "FBO",
    eyebrow: "Chegada e partida",
    detail:
      "Coordenação direta para passageiros, tripulação e operadores antes da aeronave chegar ao hangar.",
    image: "/services/service-fbo.webp",
    cta: "Explorar FBO",
  },
  {
    slug: "hangaragem",
    title: "Hangaragem",
    eyebrow: "Estrutura no Campo",
    detail:
      "Espaço dedicado para acomodação de aeronaves no Hangar Well Of junto à CASP, com operação organizada, proteção da aeronave e atendimento centralizado.",
    image: "/services/service-hangaragem.webp",
    cta: "Explorar hangaragem",
  },
  {
    slug: "atendimento-executivo",
    title: "Atendimento Executivo",
    eyebrow: "Experiência reservada",
    detail:
      "Recepção e atendimento direto para passageiros, tripulação e operadores, com discrição, conforto e agilidade em cada etapa.",
    image: "/services/service-atendimento.webp",
    cta: "Explorar atendimento",
  },
];

const INTERVAL = 4800;

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fillKey, setFillKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setActive(index);
    setFillKey((k) => k + 1);
  };

  const prev = () => goTo((active + services.length - 1) % services.length);
  const next = () => goTo((active + 1) % services.length);

  useEffect(() => {
    if (paused) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % services.length);
      setFillKey((k) => k + 1);
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const current = services[active];
  const second = services[(active + 1) % services.length];
  const third = services[(active + 2) % services.length];

  return (
    <section
      className={styles.section}
      id="servicos"
      data-navbar-theme="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.headingBlock}>
            <span className={styles.kicker}>Serviços Well Of</span>

            <h2 className={styles.title}>
              Rumo a uma operação,
              <span> executiva mais fluida.</span>
            </h2>
          </div>

          <div className={styles.topCopy}>
            <p>
              Na Well Of, cada etapa do atendimento foi pensada para tornar a
              operação mais clara, discreta e eficiente. Da chegada ao hangar ao
              suporte em solo, conectamos estrutura, equipe e atenção aos
              detalhes para simplificar sua rotina executiva.
            </p>
          </div>
        </div>

        <div className={styles.gallery}>
          <button
            type="button"
            className={`${styles.card} ${styles.cardLarge}`}
            onClick={next}
            aria-label={`Ver ${current.title}`}
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <span className={styles.overlay} />
            <div className={styles.cardInfo}>
              <small>{current.eyebrow}</small>
              <strong>{current.title}</strong>
              <p>{current.detail}</p>
            </div>
          </button>

          <div className={styles.side}>
            <div className={styles.sideGrid}>
              <button
                type="button"
                className={styles.card}
                onClick={() => goTo((active + 1) % services.length)}
                aria-label={`Ver ${second.title}`}
              >
                <Image
                  src={second.image}
                  alt={second.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                />
                <span className={styles.overlay} />
                <div className={styles.cardMiniInfo}>
                  <small>{second.eyebrow}</small>
                  <strong>{second.title}</strong>
                </div>
              </button>

              <button
                type="button"
                className={styles.card}
                onClick={() => goTo((active + 2) % services.length)}
                aria-label={`Ver ${third.title}`}
              >
                <Image
                  src={third.image}
                  alt={third.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                />
                <span className={styles.overlay} />
                <div className={styles.cardMiniInfo}>
                  <small>{third.eyebrow}</small>
                  <strong>{third.title}</strong>
                </div>
              </button>
            </div>

            <div className={styles.controls}>
              <div className={styles.navRow}>
                <button type="button" className={styles.navButton} onClick={prev}>
                  Prev
                </button>

                <div className={styles.progressLine}>
                  <span
                    key={fillKey}
                    className={styles.progressFill}
                    style={{ "--duration": `${INTERVAL}ms` } as CSSProperties}
                  />
                </div>

                <button type="button" className={styles.navButton} onClick={next}>
                  Next
                </button>
              </div>

              <a className={styles.detailCta} href={`/servicos#${current.slug}`}>
                {current.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
