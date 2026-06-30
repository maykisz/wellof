"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SiteFooter.module.css";

const navigationLinks = [
  { label: "Hangar", href: "/#hangar" },
  { label: "Segurança", href: "/#confianca" },
  { label: "Servi\u00e7os", href: "/servicos" },
  { label: "Localiza\u00e7\u00e3o", href: "/#localizacao" },
  { label: "Contato", href: "/#contato" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/wellof.hangar/" },
  { label: "WhatsApp", href: "https://wa.me/5511940895758" },
  { label: "E-mail", href: "mailto:contato@wellof.com.br" },
];

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-8% 0px -18%",
        threshold: 0.18,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`${styles.footer} ${isVisible ? styles.footerVisible : ""}`}
      data-navbar-theme="dark"
    >
      <section className={styles.infoPanel} aria-label="Rodap\u00e9 Well Of">
        <a className={styles.topLogo} href="/" aria-label="Well Of">
          <img src="/footer/wellof-logo-small-white.png" alt="" />
        </a>

        <div className={styles.navigation}>
          <nav className={styles.mainNav} aria-label="Links principais do rodap\u00e9">
            {navigationLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.details}>
          <p className={styles.detailsLabel}>(DETALHES DO HANGAR)</p>

          <nav className={styles.socialNav} aria-label="Links de contato">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label} <span aria-hidden="true">&#8599;</span>
              </a>
            ))}
          </nav>

          <div className={styles.partnerBadge}>
            <span>W</span>
            Hangar premium
          </div>

          <p className={styles.address}>
            Base em S&#227;o Paulo, Brasil.
            <br />
            Atendimento nacional.
          </p>

          <a className={styles.email} href="mailto:contato@wellof.com.br">
            &#8627; contato@wellof.com.br
          </a>
        </div>

        <div className={styles.panelFooter}>
          <p>
            Campo de Marte
            <br />
            S&#227;o Paulo - SP (GMT -03)
          </p>

          <p>
            <a href="#top">Voltar ao topo &#8593;</a>
            <br />
            Projetos e hangaragem sob consulta
          </p>

          <p>&copy;2026 WELL OF Hangar</p>
        </div>
      </section>

      <section className={styles.imagePanel} aria-label="Assinatura Well Of">
        <video className={styles.waveVideo} autoPlay muted playsInline preload="metadata" aria-hidden="true">
          <source src="/ondas.mp4" type="video/mp4" />
        </video>

        <img src="/footer/wellof-logo-small-white.png" alt="Well Of" className={styles.footerLogo} />

        <p className={styles.quote}>&#12302;Seu hangar, em outro n&#237;vel.&#12303;</p>
      </section>
    </footer>
  );
}
