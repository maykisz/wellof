"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./GallerySection.module.css";

const galleryItems = [
  {
    title: "Sala VIP",
    image: "/about/team-cta.png",
  },
  {
    title: "Sala reunião",
    image: "/about/team-access.png",
  },
  {
    title: "Estacionamento",
    image: "/wellof-hangar-hero.png",
  },
  {
    title: "Hangar",
    image: "/footer/wellof-footer-hangar.png",
  },
];

const sideItems = [
  {
    title: "Recepção",
    image: "/gallery/recepcao.png",
    position: styles.sideLeft,
  },
  {
    title: "Sala VIP 2",
    image: "/gallery/sala-vip-2.png",
    position: styles.sideRight,
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "revealed" | "expanded">("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frame = 0;

    const updatePhase = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = Math.max(rect.height - viewport, 1);
      const progress = Math.min(Math.max((viewport * 0.18 - rect.top) / scrollable, 0), 1);

      if (progress > 0.68) {
        setPhase("expanded");
      } else if (progress > 0.12) {
        setPhase("revealed");
      } else {
        setPhase("idle");
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePhase);
    };

    updatePhase();
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
      className={styles.section}
      id="galeria"
      data-navbar-theme="light"
      data-phase={phase}
      ref={sectionRef}
    >
      <div className={styles.stage}>
        <div className={styles.header}>
          <h2>
            Descubra nossos espaços
          </h2>
          <p>Ambientes pensados para FBO, hangaragem e atendimento executivo com conforto e organização.</p>
        </div>

        <div className={styles.galleryFrame}>
          {sideItems.map((item) => (
            <figure className={`${styles.item} ${styles.sideCard} ${item.position}`} key={item.title}>
              <Image
                src={item.image}
                alt={item.title}
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 100vw, 28vw"
              />
              <figcaption>
                <strong>{item.title}</strong>
              </figcaption>
            </figure>
          ))}

          <div className={styles.grid}>
            {galleryItems.map((item, index) => (
              <figure
                className={styles.item}
                key={item.title}
                style={{ "--reveal-delay": `${index * 180}ms` } as CSSProperties}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={760}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <figcaption>
                  <strong>{item.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
