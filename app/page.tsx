import AboutSection from "./components/AboutSection/AboutSection";
import AircraftSlider from "./components/AircraftSlider/AircraftSlider";
import ContactSection from "./components/ContactSection/ContactSection";
import HeroSection from "./components/HeroSection/HeroSection";
import InstagramSection from "./components/InstagramSection/InstagramSection";
import IntroVideo from "./components/IntroVideo";
import InternalSpacesSection from "./components/InternalSpacesSection/InternalSpacesSection";
import LocationSection from "./components/LocationSection/LocationSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import TrustSection from "./components/TrustSection/TrustSection";
import VisitCtaSection from "./components/VisitCtaSection/VisitCtaSection";
import VisitPreparationSection from "./components/VisitPreparationSection/VisitPreparationSection";

export default function Home() {
  return (
    <main className="pageShell">
      <IntroVideo />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AircraftSlider />
      <TrustSection />
      <InternalSpacesSection />
      <VisitPreparationSection />
      <VisitCtaSection />
      <InstagramSection />
      <LocationSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
