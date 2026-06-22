import Image from "next/image";
import styles from "./AircraftSlider.module.css";

const logos = [
  { name: "Embraer", src: "/aircraft-slider/logo-embraer.svg", width: 440, height: 74 },
  { name: "Gulfstream", src: "/aircraft-slider/logo-gulfstream.svg", width: 300, height: 64 },
  { name: "Dassault Aviation", src: "/aircraft-slider/logo-dassault.svg", width: 344, height: 96 },
  { name: "Pilatus", src: "/aircraft-slider/logo-pilatus.svg", width: 260, height: 70 },
  { name: "Bombardier", src: "/aircraft-slider/logo-bombardier.svg", width: 220, height: 40 },
  { name: "Cessna", src: "/aircraft-slider/logo-cessna.svg", width: 240, height: 80 },
  { name: "Textron Aviation", src: "/aircraft-slider/logo-textron.svg", width: 300, height: 56 },
  { name: "Airbus Corporate Jets", src: "/aircraft-slider/logo-airbus.svg", width: 185, height: 74 },
] as const;

export default function AircraftSlider() {
  return (
    <section className={styles.section} aria-label="Fabricantes de aeronaves executivas" data-navbar-theme="light">
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[0, 1].map((group) => (
            <div className={styles.group} key={group} aria-hidden={group === 1}>
              {logos.map((logo) => (
                <Image
                  className={styles.logo}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  sizes="240px"
                  key={`${logo.name}-${group}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
