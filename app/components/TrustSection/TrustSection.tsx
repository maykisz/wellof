import styles from "./TrustSection.module.css";

const trustSteps = [
  "Acesso ao hangar combinado antes da chegada.",
  "FBO, hangaragem e atendimento executivo como foco do serviço.",
  "Chegada, permanência e saída alinhadas diretamente com a equipe.",
  "Localização declarada no Campo de Marte, junto à CASP.",
  "Dados formais da empresa apresentados no atendimento e contrato.",
];

export default function TrustSection() {
  return (
    <section className={styles.section} id="confianca" data-navbar-theme="dark">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Por que confiar</p>
        <h2>
          <span>Processo verificável</span>
          <span>vale mais que promessa.</span>
        </h2>
      </div>

      <div className={styles.panel}>
        {trustSteps.map((step, index) => (
          <div className={styles.step} key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
