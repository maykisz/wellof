"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NavbarTheme = "hero" | "light" | "dark";

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
      aria-label="Navegação principal"
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

      <nav className="navLinks" aria-label="Páginas" aria-hidden={isHero}>
        <a href="/#hangar" tabIndex={isHero ? -1 : undefined}>
          Hangar
        </a>
        <a href="/servicos" tabIndex={isHero ? -1 : undefined}>
          Serviços
        </a>
        <a href="/#confianca" tabIndex={isHero ? -1 : undefined}>
          Segurança
        </a>
        <a href="/#galeria" tabIndex={isHero ? -1 : undefined}>
          Galeria
        </a>
        <a href="/#localizacao" tabIndex={isHero ? -1 : undefined}>
          Localização
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
          <a href="/#hangar" onClick={() => setIsMenuOpen(false)}>
            Hangar
          </a>
          <a href="/servicos" onClick={() => setIsMenuOpen(false)}>
            Serviços
          </a>
          <a href="/#confianca" onClick={() => setIsMenuOpen(false)}>
            Segurança
          </a>
          <a href="/#galeria" onClick={() => setIsMenuOpen(false)}>
            Galeria
          </a>
          <a href="/#localizacao" onClick={() => setIsMenuOpen(false)}>
            Localização
          </a>

          <a href="/#contato" onClick={() => setIsMenuOpen(false)}>
            Contato
          </a>
          <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>

        <div className="menuFooter">
          <a href="mailto:contato@wellof.com.br">contato@wellof.com.br</a>
          <a href="tel:+5511940895758">(11) 94089-5758</a>
          <a href="https://wa.me/5511940895758" target="_blank" rel="noreferrer">WhatsApp</a>
          <span>Campo de Marte · CASP</span>
          <span>Well Of Hangar</span>
        </div>
      </div>
    </header>
  );
}
