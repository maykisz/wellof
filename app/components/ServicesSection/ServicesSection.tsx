"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./ServicesSection.module.css";

const services = [
  {
    slug: "fbo",
    title: "FBO",
    eyebrow: "Chegada, permanência e partida",
    detail:
      "Coordenação completa da operação em solo para aeronaves executivas, incluindo apoio à chegada, recepção de passageiros, suporte à tripulação e organização da partida com agilidade, discrição e padrão Well Of.",
    image: "/services/service-fbo.webp",
  },
  {
    slug: "hangaragem",
    title: "Hangaragem",
    eyebrow: "Estrutura executiva",
    detail:
      "Acomodação de aeronaves no Hangar Well Of junto à CASP, em uma estrutura pensada para proteger o equipamento, facilitar a rotina operacional e centralizar o atendimento de proprietários, operadores e tripulações.",
    image: "/services/service-hangaragem.webp",
  },
  {
    slug: "atendimento-executivo",
    title: "Atendimento Executivo",
    eyebrow: "Recepção personalizada",
    detail:
      "Experiência de atendimento voltada a passageiros e tripulações que buscam conforto, privacidade e eficiência, com recepção discreta, suporte próximo e cuidado em cada etapa da jornada no hangar.",
    image: "/services/service-atendimento.webp",
  },
];

const SLIDE_INTERVAL = 5200;

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    setActive(index);
    setProgressKey((key) => key + 1);
  };

  const prev = () => goTo((active + services.length - 1) % services.length);
  const next = () => goTo((active + 1) % services.length);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setActive((current) => (current + 1) % services.length);
      setProgressKey((key) => key + 1);
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [progressKey]);

  const current = services[active];
  const second = services[(active + 1) % services.length];
  const third = services[(active + 2) % services.length];

  return (
    <section
      className={styles.section}
      id="servicos"
      data-navbar-theme="light"
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.headingBlock}>
            <h2 className={styles.title}>
              Serviços executivos
              <span>com padrão Well Of.</span>
            </h2>
          </div>

          <div className={styles.serviceIntro}>
            <span>{current.eyebrow}</span>
            <h3>{current.title}</h3>
            <p>
              {current.detail}
            </p>
          </div>
        </div>

        <div className={styles.showcase} aria-label="Serviços Well Of">
          <button
            type="button"
            className={`${styles.imageButton} ${styles.mainImage}`}
            onClick={next}
            aria-label={`Ver ${current.title}`}
          >
            <Image
              key={current.slug}
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 54vw"
            />
          </button>

          <div className={styles.sidePanel}>
            <div className={styles.sideImages}>
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => goTo((active + 1) % services.length)}
                aria-label={`Ver ${second.title}`}
              >
                <Image
                  key={second.slug}
                  src={second.image}
                  alt={second.title}
                  fill
                  sizes="(max-width: 760px) 50vw, 20vw"
                />
              </button>

              <button
                type="button"
                className={styles.imageButton}
                onClick={() => goTo((active + 2) % services.length)}
                aria-label={`Ver ${third.title}`}
              >
                <Image
                  key={third.slug}
                  src={third.image}
                  alt={third.title}
                  fill
                  sizes="(max-width: 760px) 50vw, 20vw"
                />
              </button>
            </div>

            <div className={styles.controls}>
              <div className={styles.navRow}>
                <button type="button" className={styles.navButton} onClick={prev}>
                  Prev
                </button>

                <div className={styles.progressLine}>
                  <span
                    key={progressKey}
                    className={styles.progressFill}
                    style={{ "--duration": `${SLIDE_INTERVAL}ms` } as CSSProperties}
                  />
                </div>

                <button type="button" className={styles.navButton} onClick={next}>
                  Next
                </button>
              </div>

              <a className={styles.detailCta} href={`/servicos#${current.slug}`}>
                Conheça mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
