import styles from "./LocationSection.module.css";

export default function LocationSection() {
  return (
    <section className={styles.section} id="localizacao" data-navbar-theme="light">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Localização</p>
        <h2>Campo de Marte, São Paulo.</h2>
        <p>Base junto à CASP, com acesso urbano direto pela zona norte de São Paulo.</p>
      </div>

      <div className={styles.grid}>
        <iframe
          className={styles.map}
          title="Mapa do Campo de Marte"
          src="https://www.google.com/maps?q=Campo%20de%20Marte%20CASP%20S%C3%A3o%20Paulo&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <address className={styles.address}>
          <span>Endereço</span>
          Campo de Marte - junto à CASP
          <br />
          São Paulo, SP
        </address>
      </div>
    </section>
  );
}
