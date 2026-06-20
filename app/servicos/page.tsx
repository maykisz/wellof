import Image from "next/image";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import styles from "./servicos.module.css";

const services = [
  {
    id: "fbo",
    title: "FBO",
    image: "/services/service-fbo.png",
    description:
      "Apoio em solo para chegada, permanência e partida no Campo de Marte, com alinhamento direto entre operador, tripulação e equipe local.",
  },
  {
    id: "hangaragem",
    title: "Hangaragem",
    image: "/services/service-hangaragem.png",
    description:
      "Espaço dedicado para acomodação de aeronaves no Hangar Well Of junto à CASP, com acesso combinado e rotina objetiva.",
  },
  {
    id: "atendimento-executivo",
    title: "Atendimento Executivo",
    image: "/services/service-atendimento.png",
    description:
      "Recepção e atendimento direto para passageiros, tripulação e operadores, mantendo a experiência reservada e bem coordenada.",
  },
];

const pillars = [
  {
    title: "Atendimento direto",
    description: "Contato claro com a equipe para alinhar chegada, acesso e permanência sem excesso de etapas.",
    tone: "white",
  },
  {
    title: "Base no Campo de Marte",
    description: "Operação junto à CASP, com acesso urbano objetivo para passageiros, tripulações e operadores.",
    tone: "light",
  },
  {
    title: "Rotina reservada",
    description: "Ambientes e condução pensados para manter a experiência executiva simples, discreta e organizada.",
    tone: "dark",
  },
  {
    title: "Processo verificável",
    description: "Informações formais, horários e condições alinhados antes da visita ou da operação.",
    tone: "light",
  },
];

const partners = ["FBO", "Hangaragem", "Atendimento", "Campo de Marte", "CASP", "Well Of"];

export default function ServicosPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.hero} data-navbar-theme="light">
        <div className={styles.eyebrow}>
          <span />
          <p>Nossos serviços</p>
        </div>
        <h1>Serviços executivos para a rotina do hangar.</h1>
      </section>

      <section className={styles.servicesOverview} data-navbar-theme="light" aria-label="Serviços Well Of">
        <div className={styles.serviceNumbers} aria-hidden="true">
          {services.map((service, index) => (
            <a href={`#${service.id}`} key={service.id}>
              {String(index + 1).padStart(2, "0")}
            </a>
          ))}
        </div>

        <div className={styles.serviceNames}>
          {services.map((service) => (
            <a href={`#${service.id}`} key={service.id}>
              {service.title}
            </a>
          ))}
        </div>

        <div className={styles.featureImage}>
          <Image
            src="/services/service-fbo.png"
            alt="FBO Well Of no Campo de Marte"
            width={1280}
            height={720}
            priority
            sizes="(max-width: 900px) 100vw, 34vw"
          />
        </div>
      </section>

      <section className={styles.pillars} data-navbar-theme="light">
        <h2>Operação enxuta, atendimento próximo e estrutura no Campo de Marte.</h2>
        <div className={styles.pillarGrid}>
          {pillars.map((pillar) => (
            <article className={styles.pillar} data-tone={pillar.tone} key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <span aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.testimonial} data-navbar-theme="light">
        <h2>Atendimento pensado para quem precisa chegar, permanecer e sair com tudo alinhado.</h2>
        <div className={styles.testimonialPanel}>
          <div className={styles.testimonialImage}>
            <Image
              src="/services/service-hangaragem.png"
              alt="Aeronave em hangar executivo"
              width={1280}
              height={720}
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
          <div className={styles.quote}>
            <p>
              “A Well Of reúne FBO, hangaragem e atendimento executivo em uma base objetiva para operadores,
              tripulações e passageiros.”
            </p>
            <div>
              <strong>Well Of Hangar</strong>
              <span>Campo de Marte • CASP</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners} data-navbar-theme="light">
        <div className={styles.metric}>
          <strong>03</strong>
          <span>frentes de atendimento</span>
        </div>
        <div className={styles.partnerStrip} aria-label="Frentes de atendimento Well Of">
          {partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </section>

      <section className={styles.detailList} data-navbar-theme="light">
        {services.map((service, index) => (
          <article className={styles.detail} id={service.id} key={service.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <a href="/#contato">Falar com a equipe</a>
            </div>
            <Image src={service.image} alt={service.title} width={960} height={640} sizes="(max-width: 900px) 100vw, 34vw" />
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
