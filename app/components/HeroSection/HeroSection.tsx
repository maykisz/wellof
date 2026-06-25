import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="inicio" aria-label="Well Of Hangar" data-navbar-theme="hero">
      <div className={styles.slider} aria-hidden="true">
        <video
          className={styles.heroVideo}
          poster="/video-hero.poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video-hero.opt.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1>Hangaragem executiva</h1>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <p>Base no Campo de Marte — suporte operacional, agendamento coordenado e embarque discreto.</p>
            <div className={styles.actions}>
              <a className={styles.cta} href="mailto:contato@wellof.com.br?subject=Agendar%20visita%20Well%20Of" aria-label="Agendar visita">Agendar visita</a>
              <a className={styles.secondaryCta} href="https://wa.me/5511940895758" target="_blank" rel="noreferrer" aria-label="Solicitar cotação pelo WhatsApp">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
