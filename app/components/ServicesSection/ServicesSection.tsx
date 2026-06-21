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
    description: "Apoio em solo para chegada, permanência e partida no Campo de Marte.",
    detail: "Coordenação direta para passageiros, tripulação e operadores antes da aeronave chegar ao hangar.",
    image: "/services/service-fbo.png",
    cta: "Explorar FBO",
    stats: ["Solo", "Acesso", "Equipe"],
  },
  {
    slug: "hangaragem",
    title: "Hangaragem",
    eyebrow: "Estrutura no Campo",
    description: "Espaço dedicado para acomodação de aeronaves no Hangar Well Of junto à CASP.",
    detail: "Uma base objetiva para proteger a aeronave, simplificar a rotina e centralizar o atendimento.",
    image: "/services/service-hangaragem.png",
    cta: "Explorar hangaragem",
    stats: ["Hangar", "CASP", "Rotina"],
  },
  {
    slug: "atendimento-executivo",
    title: "Atendimento Executivo",
    eyebrow: "Experiência reservada",
    description: "Recepção e atendimento direto para passageiros, tripulação e operadores.",
    detail: "Do primeiro contato ao embarque, a experiência fica mais discreta, clara e bem acompanhada.",
    image: "/services/service-atendimento.png",
    cta: "Explorar atendimento",
    stats: ["Recepção", "Conforto", "Discrição"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasCompletedRef = useRef(false);
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedService, setRevealedService] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const selectedService = services[activeService];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-18% 0px -22% 0px", threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      if (window.matchMedia("(max-width: 980px)").matches) {
        setRevealedService(services.length - 1);
        setHasCompleted(true);
        return;
      }

      if (hasCompletedRef.current) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const nextService = progress < 0.42 ? 0 : progress < 0.76 ? 1 : 2;

      setRevealedService((current) => Math.max(current, nextService));
      setActiveService(nextService);

      if (progress >= 0.98) {
        hasCompletedRef.current = true;
        setRevealedService(services.length - 1);
        setActiveService(services.length - 1);
        setHasCompleted(true);
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
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
      className={styles.section}
      id="servicos"
      data-navbar-theme="light"
      data-visible={isVisible}
      data-complete={hasCompleted}
    >
      <div className={styles.stage}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Serviços Well Of</p>
            <h2>Rumo a uma operação executiva mais fluida.</h2>
          </div>
          <span>({String(services.length).padStart(2, "0")})</span>
        </div>

        <div className={styles.content}>
          <div className={styles.serviceList} aria-label="Serviços Well Of">
            {services.map((service, index) => (
              <a
                className={styles.serviceItem}
                href={`/servicos#${service.slug}`}
                data-active={activeService === index}
                data-revealed={revealedService >= index}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                key={service.title}
                style={{ "--item-delay": `${index * 90}ms` } as CSSProperties}
              >
                <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.serviceText}>
                  <small>{service.eyebrow}</small>
                  <strong>{service.title}</strong>
                  <span>{service.description}</span>
                </span>
                <span className={styles.serviceArrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>

          <aside className={styles.preview} aria-live="polite">
            <div className={styles.previewInner} key={selectedService.slug}>
              <div className={styles.previewMeta}>
                <span>{String(activeService + 1).padStart(2, "0")}</span>
                <strong>{selectedService.eyebrow}</strong>
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  width={720}
                  height={520}
                  sizes="(max-width: 980px) 100vw, 34vw"
                />
              </div>
              <div className={styles.previewCopy}>
                <h3>{selectedService.title}</h3>
                <p>{selectedService.detail}</p>
              </div>
              <div className={styles.tags} aria-label="Destaques do serviço">
                {selectedService.stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </div>
            <a href={`/servicos#${selectedService.slug}`}>{selectedService.cta}</a>
          </aside>
        </div>
      </div>
    </section>
  );
}
