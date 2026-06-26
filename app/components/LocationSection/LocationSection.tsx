import styles from "./LocationSection.module.css";

const locationFacts = [
  ["Base", "Hangar Executivo"],
  ["Acesso", "Santana"],
  ["Operação", "Junto à CASP"],
];

export default function LocationSection() {
  return (
    <section className={styles.section} id="localizacao" data-navbar-theme="light">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Localização</p>
          <h2>Onde a cidade encontra a pista.</h2>
          <p>
            Base Well Of no Campo de Marte, junto a CASP, com acesso direto para
            passageiros, tripulações e operadores em São Paulo.
          </p>
        </div>

        <div className={styles.experience}>
          <div className={styles.mapScene}>
            <div className={styles.mapShell}>
              <iframe
                className={styles.map}
                title="Mapa do Campo de Marte"
                src="https://www.google.com/maps?q=Casp%20Well%20Of%20Hangar%20Executivo%20Campo%20de%20Marte%20SP%20Av.%20Olavo%20Fontoura%201078%20Santana%20S%C3%A3o%20Paulo%20SP%2002012-021&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={styles.routeLayer} aria-hidden="true">
              <span className={styles.routeLine} />
              <span className={styles.routeLine} />
              <span className={styles.routeLine} />
              <span className={styles.pulsePin} />
            </div>
          </div>

          <aside className={styles.details} aria-label="Detalhes da localização">
            <div className={styles.detailsHeader}>
              <span>Coordenada operacional</span>
              <strong>São Paulo</strong>
            </div>

            <div className={styles.facts}>
              {locationFacts.map(([label, value]) => (
                <div className={styles.fact} key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <address className={styles.address}>
              <span>Endereço</span>
              CASP Well Of Hangar Executivo | Campo de Marte - SP
              <br />
              Av. Olavo Fontoura, 1078 - Santana
              <br />
              São Paulo - SP, 02012-021
            </address>

            <div className={styles.actions}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Casp%20Well%20Of%20Hangar%20Executivo%20Campo%20de%20Marte%20SP%20Av.%20Olavo%20Fontoura%201078%20Santana%20S%C3%A3o%20Paulo%20SP%2002012-021"
                target="_blank"
                rel="noreferrer"
              >
                Abrir rota
              </a>
              <a href="#contato">Falar com a equipe</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
