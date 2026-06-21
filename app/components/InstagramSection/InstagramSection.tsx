"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import styles from "./InstagramSection.module.css";

const instagramPosts = [
  {
    url: "https://www.instagram.com/p/DZYTUDeIPy7/",
    title: "Hangar Well Of",
    type: "Reel",
    image: "/footer/wellof-footer-hangar.png",
  },
  {
    url: "https://www.instagram.com/p/DXmN3l6jqty/",
    title: "Atendimento Executivo",
    type: "Reel",
    image: "/services/service-atendimento.png",
  },
  {
    url: "https://www.instagram.com/p/DY0vneisJZw/",
    title: "Aeronaves no Campo",
    type: "Post",
    image: "/hero/wellof-hero-apron-night.png",
  },
  {
    url: "https://www.instagram.com/p/DZDn3uwoeeW/",
    title: "Rotina Well Of",
    type: "Reel",
    image: "/about/team-inspection.png",
  },
  {
    url: "https://www.instagram.com/p/DZII10ROO5M/",
    title: "Sala VIP",
    type: "Post",
    image: "/gallery/sala-vip-2.png",
  },
  {
    url: "https://www.instagram.com/p/DYph1x7o7OS/",
    title: "Hangar Well Of",
    type: "Reel",
    image: "/services/service-hangaragem.png",
  },
];

function getOffset(index: number, active: number) {
  const total = instagramPosts.length;
  let offset = index - active;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

export default function InstagramSection() {
  const [activePost, setActivePost] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePost((current) => (current + 1) % instagramPosts.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActivePost((current) => (current - 1 + instagramPosts.length) % instagramPosts.length);
  };

  const goToNext = () => {
    setActivePost((current) => (current + 1) % instagramPosts.length);
  };

  return (
    <section className={styles.section} id="instagram" data-navbar-theme="light">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Instagram</p>
        <h2>Rotina no hangar</h2>
        <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">
          @wellof.hangar
        </a>
      </div>

      <div className={styles.carousel} aria-label="Posts do Instagram da Well Of">
        <div className={styles.scene}>
          {instagramPosts.map((post, index) => {
            const offset = getOffset(index, activePost);
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 2;

            return (
              <article
                className={styles.card}
                data-active={offset === 0}
                data-visible={isVisible}
                aria-hidden={!isVisible}
                key={post.url}
                style={
                  {
                    "--offset": offset,
                    "--abs-offset": absOffset,
                    "--card-index": index,
                  } as CSSProperties
                }
              >
                <div className={styles.embedClip}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 900px) 78vw, 350px"
                  />
                </div>

                <a className={styles.overlayLink} href={post.url} target="_blank" rel="noreferrer">
                  <span className={styles.type}>{post.type}</span>
                  <span className={styles.play} aria-hidden="true" />
                  <span className={styles.meta}>
                    <strong>{post.title}</strong>
                    <small>Abrir no Instagram</small>
                  </span>
                </a>
              </article>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={goToPrevious} aria-label="Post anterior">
            <span aria-hidden="true">‹</span>
          </button>

          <div className={styles.dots} aria-label="Selecionar post">
            {instagramPosts.map((post, index) => (
              <button
                type="button"
                data-active={activePost === index}
                onClick={() => setActivePost(index)}
                aria-label={`Ver ${post.title}`}
                key={post.url}
              />
            ))}
          </div>

          <button type="button" onClick={goToNext} aria-label="Próximo post">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
