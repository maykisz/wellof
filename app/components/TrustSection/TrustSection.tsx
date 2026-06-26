import styles from "./TrustSection.module.css";

const trustSteps = [
  "Disponibilidade, período de permanência e necessidade operacional alinhados antes da chegada.",
  "FBO, hangaragem e atendimento executivo concentrados em uma base no Campo de Marte.",
  "Chegada, permanência e saída coordenadas diretamente com a equipe local da Well Of.",
  "Endereço, rota e referência junto à CASP exibidos para conferência antes da visita.",
  "Condições comerciais e dados formais apresentados no atendimento e no contrato.",
];

export default function TrustSection() {
  return (
    <section className={styles.section} id="confianca" data-navbar-theme="dark">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Decisão segura</p>
        <h2>
          <span>Clareza antes</span>
          <span>da contratação.</span>
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
