import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section} id="contato" data-navbar-theme="dark">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Atendimento</p>
        <h2>Consulte a Well Of.</h2>
        <p>Confirme disponibilidade de hangaragem, FBO, atendimento executivo e processo de entrada antes da chegada.</p>

        <div className={styles.actions}>
          <a className={styles.primaryButton} href="https://wa.me/5511940895758?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Well%20Of%20sobre%20hangaragem%20e%20FBO." target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <a href="mailto:contato@wellof.com.br">contato@wellof.com.br</a>
          <a href="tel:+5511940895758">(11) 94089-5758</a>
          <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">
            Instagram @wellof.hangar
          </a>
        </div>
      </div>
    </section>
  );
}
