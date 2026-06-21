import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={styles.section} id="contato" data-navbar-theme="dark">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Contato final</p>
        <h2>Fale com a Well Of.</h2>
        <p>Confirme disponibilidade, processo de entrada e dados formais antes da visita.</p>

        <div className={styles.actions}>
          <a className={styles.whatsappButton} href="mailto:contato@wellof.com.br?subject=Contato%20Well%20Of%20Hangar">
            Solicitar atendimento
          </a>
          <a href="mailto:contato@wellof.com.br">contato@wellof.com.br</a>
          <a href="https://www.instagram.com/wellof.hangar/" target="_blank" rel="noreferrer">
            Instagram @wellof.hangar
          </a>
        </div>
      </div>
    </section>
  );
}
