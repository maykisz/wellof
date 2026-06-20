"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ServicesSection.module.css";

const services = [
  {
    slug: "fbo",
    title: "FBO",
    description: "Apoio em solo para chegada, permanência e partida no Campo de Marte.",
    image: "/services/service-fbo.png",
    cta: "Explorar FBO",
  },
  {
    slug: "hangaragem",
    title: "Hangaragem",
    description: "Espaço dedicado para acomodação de aeronaves no Hangar Well Of junto à CASP.",
    image: "/services/service-hangaragem.png",
    cta: "Explorar hangaragem",
  },
  {
    slug: "atendimento-executivo",
    title: "Atendimento Executivo",
    description: "Recepção e atendimento direto para passageiros, tripulação e operadores.",
    image: "/services/service-atendimento.png",
    cta: "Explorar atendimento",
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(services.length - 1);
  const selectedService = services[activeService];

  return (
    <section className={styles.section} id="servicos" data-navbar-theme="light">
      <div className={styles.header}>
        <h2>Serviços</h2>
        <span>({String(services.length).padStart(2, "0")})</span>
      </div>

      <div className={styles.content}>
        <div className={styles.serviceGrid} aria-label="Serviços Well Of">
          <div className={styles.numbers} aria-hidden="true">
            {services.map((service, index) => (
              <span data-active={activeService === index} key={service.title}>
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          <div className={styles.names}>
            {services.map((service, index) => (
              <a
                href={`/servicos#${service.slug}`}
                data-active={activeService === index}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                key={service.title}
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>

        <aside className={styles.preview} aria-live="polite">
          <div className={styles.imageWrap}>
            <Image
              src={selectedService.image}
              alt={selectedService.title}
              width={720}
              height={520}
              sizes="(max-width: 980px) 100vw, 34vw"
            />
          </div>
          <p>{selectedService.description}</p>
          <a href={`/servicos#${selectedService.slug}`}>{selectedService.cta}</a>
        </aside>
      </div>
    </section>
  );
}
