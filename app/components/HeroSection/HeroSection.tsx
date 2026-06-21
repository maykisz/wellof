import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="inicio" aria-label="Well Of Hangar" data-navbar-theme="hero">
      <div className={styles.slider} aria-hidden="true">
        <video
          className={styles.heroVideo}
          src="/video-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1>Hangaragem executiva</h1>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <p>Campo de Marte, São Paulo.</p>
            <div className={styles.actions}>
              <a className={styles.cta} href="/#contato">
                Solicitar atendimento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
