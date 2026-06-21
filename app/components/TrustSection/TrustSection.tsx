import styles from "./TrustSection.module.css";

const trustSteps = [
  "Acesso ao hangar combinado antes da chegada, com horário e responsável definidos.",
  "FBO, hangaragem e atendimento executivo concentrados em uma base no Campo de Marte.",
  "Chegada, permanência e saída alinhadas diretamente com a equipe local.",
  "Endereço e rota exibidos na página para facilitar conferência antes da visita.",
  "Dados formais da empresa apresentados no atendimento e no contrato.",
];

export default function TrustSection() {
  return (
    <section className={styles.section} id="confianca" data-navbar-theme="dark">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Por que confiar</p>
        <h2>
          <span>Processo claro</span>
          <span>antes da chegada.</span>
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
