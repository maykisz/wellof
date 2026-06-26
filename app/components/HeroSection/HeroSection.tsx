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
            <p>Hangaragem, FBO e atendimento executivo no Campo de Marte.</p>
            <div className={styles.actions}>
              <a className={styles.cta} href="https://wa.me/5511940895758?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20disponibilidade%20de%20hangaragem%20na%20Well%20Of." target="_blank" rel="noreferrer" aria-label="Consultar disponibilidade pelo WhatsApp">Consultar disponibilidade</a>
              <a className={styles.secondaryCta} href="mailto:contato@wellof.com.br?subject=Proposta%20de%20hangaragem%20Well%20Of" aria-label="Solicitar proposta por e-mail">Solicitar proposta</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
