import Image from "next/image";

const heroSlides = [
  {
    src: "/wellof-hangar-hero.png",
    alt: "Hangar escuro com jato executivo no Campo de Marte",
    className: "heroSlideOne",
  },
  {
    src: "/wellof-hangar-hero.png",
    alt: "Vista cinematográfica do hangar Well Of",
    className: "heroSlideTwo",
  },
  {
    src: "/wellof-hangar-hero.png",
    alt: "Jato executivo dentro do hangar Well Of",
    className: "heroSlideThree",
  },
];

export default function Hero() {
  return (
    <section className="hero" id="sobre" aria-label="Well Of Hangar" data-navbar-theme="hero">
      <div className="heroSlider" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <Image
            key={`${slide.src}-${slide.className}`}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`heroImage ${slide.className}`}
          />
        ))}
      </div>
      <div className="heroOverlay" aria-hidden="true" />

      <div className="heroContent">
        <p className="heroKicker">// Well Of Hangar</p>
        <h1>Voe Mais Longe</h1>

        <div className="heroBottom">
          <div className="heroPreview">
            <Image src="/services/service-fbo.png" alt="FBO Well Of" width={220} height={132} />
            <span>FBO • Hangaragem • Atendimento Executivo</span>
          </div>
          <p>Uma base no Campo de Marte para chegada, permanência e atendimento executivo.</p>
        </div>
      </div>
    </section>
  );
}
