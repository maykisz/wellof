import AboutSection from "./components/AboutSection/AboutSection";
import AircraftSlider from "./components/AircraftSlider/AircraftSlider";
import ContactSection from "./components/ContactSection/ContactSection";
import HeroSection from "./components/HeroSection/HeroSection";
import IntroVideo from "./components/IntroVideo";
import InternalSpacesSection from "./components/InternalSpacesSection/InternalSpacesSection";
import LocationSection from "./components/LocationSection/LocationSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import TrustSection from "./components/TrustSection/TrustSection";
import VisitCtaSection from "./components/VisitCtaSection/VisitCtaSection";


export default function Home() {
  return (
    <main className="pageShell">
      <IntroVideo />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <AircraftSlider />
      <InternalSpacesSection />
      <VisitCtaSection />
      <LocationSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
