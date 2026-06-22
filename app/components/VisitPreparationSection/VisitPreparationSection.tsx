import styles from "./VisitPreparationSection.module.css";

const visitSteps = [
  {
    title: "Acesso",
    copy: "Horario, chegada e responsavel pelo atendimento.",
  },
  {
    title: "Estrutura",
    copy: "Hangar, FBO e ambientes de apoio apresentados com calma.",
  },
  {
    title: "Condicoes",
    copy: "Disponibilidade, necessidades da aeronave e proximos passos.",
  },
];

export default function VisitPreparationSection() {
  return (
    <section className={styles.section} data-navbar-theme="light" aria-labelledby="visit-prep-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Antes da visita</p>
          <h2 id="visit-prep-title">Um alinhamento simples antes de conhecer o hangar.</h2>
          <p>A equipe confirma o essencial para a visita ser objetiva.</p>
        </div>

        <div className={styles.steps} aria-label="O que alinhar na visita">
          {visitSteps.map((step, index) => (
            <article className={styles.step} key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
