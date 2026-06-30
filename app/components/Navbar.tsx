"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type NavbarTheme = "hero" | "light" | "dark";

const menuLinks = [
  { label: "Hangar", href: "/#hangar" },
  { label: "Servi\u00e7os", href: "/servicos" },
  { label: "Seguran\u00e7a", href: "/#confianca" },
  { label: "Localiza\u00e7\u00e3o", href: "/#localizacao" },
  { label: "Contato", href: "/#contato" },
  { label: "Instagram", href: "https://www.instagram.com/wellof.hangar/", external: true },
];

function getActiveTheme(): NavbarTheme {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-theme]"));
  const probeY = 96;

  const activeSection = [...sections].reverse().find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= probeY && rect.bottom > probeY;
  });

  const theme = activeSection?.dataset.navbarTheme;

  if (theme === "light" || theme === "hero") {
    return theme;
  }

  return "dark";
}

function renderAnimatedLabel(label: string) {
  return Array.from(label).map((character, index) => (
    <span
      aria-hidden="true"
      key={`${character}-${index}`}
      style={{ "--letter-index": index } as CSSProperties}
    >
      {character}
    </span>
  ));
}

export default function Navbar() {
  const [theme, setTheme] = useState<NavbarTheme>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHero = theme === "hero" && !isMenuOpen;
  const isLight = theme === "light" || isMenuOpen;

  useEffect(() => {
    if (isMenuOpen) {
      return;
    }

    const updateTheme = () => setTheme(getActiveTheme());

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle("menuOpen", isMenuOpen);

    return () => {
      document.body.classList.remove("menuOpen");
    };
  }, [isMenuOpen]);

  return (
    <header
      className={[
        "topbar",
        isHero ? "topbarHero" : isLight ? "topbarLight" : "topbarDark",
        isMenuOpen ? "topbarMenuOpen" : "",
      ].join(" ")}
      aria-label="Navegacao principal"
    >
      <a className="brand" href="/">
        <Image
          src={isLight ? "/logo-preta.webp" : "/logo-branca.webp"}
          alt="Well Of"
          width={150}
          height={42}
          priority
          className="brandLogo"
        />
      </a>

      <nav className="navLinks" aria-label="Paginas" aria-hidden={isHero}>
        <a href="/#hangar" tabIndex={isHero ? -1 : undefined}>
          Hangar
        </a>
        <a href="/servicos" tabIndex={isHero ? -1 : undefined}>
          Servi&#231;os
        </a>
        <a href="/#confianca" tabIndex={isHero ? -1 : undefined}>
          Seguran&#231;a
        </a>
        <a href="/#localizacao" tabIndex={isHero ? -1 : undefined}>
          Localiza&#231;&#227;o
        </a>
        <a href="/#contato" tabIndex={isHero ? -1 : undefined}>
          Contato
        </a>
      </nav>

      <div className="navActions">
        <button
          className={`menuButton ${isMenuOpen ? "menuButtonOpen" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`menuOverlay ${isMenuOpen ? "menuOverlayOpen" : ""}`} aria-hidden={!isMenuOpen}>
        <nav className="menuPanel" aria-label="Menu completo">
          {menuLinks.map((link, index) => (
            <a
              href={link.href}
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              aria-label={link.label}
              data-index={String(index + 1).padStart(2, "0")}
              style={{ "--menu-link-index": index } as CSSProperties}
            >
              {renderAnimatedLabel(link.label)}
            </a>
          ))}
        </nav>

        <div className="menuFooter">
          <a href="mailto:contato@wellof.com.br">contato@wellof.com.br</a>
          <a href="tel:+5511940895758">(11) 94089-5758</a>
          <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">Instagram</a>
          <span>Campo de Marte &#183; CASP</span>
          <span>Well Of Hangar</span>
        </div>
      </div>
    </header>
  );
}
