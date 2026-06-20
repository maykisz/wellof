import styles from "./IntroSection.module.css";

export default function IntroSection() {
  return (
    <section className={styles.section} id="hangar" data-navbar-theme="light">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Campo de Marte</p>
        <h2>Hangar Well Of junto a CASP</h2>
        <p>
          Uma base enxuta para quem precisa de FBO, hangaragem e atendimento executivo com acesso direto e localização
          clara.
        </p>
      </div>
    </section>
  );
}
