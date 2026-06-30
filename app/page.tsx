import AboutSection from "./components/AboutSection/AboutSection";
import AircraftSlider from "./components/AircraftSlider/AircraftSlider";
import ContactSection from "./components/ContactSection/ContactSection";
import HeroSection from "./components/HeroSection/HeroSection";
import IntroVideo from "./components/IntroVideo";
import LocationSection from "./components/LocationSection/LocationSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import TrustSection from "./components/TrustSection/TrustSection";


export default function Home() {
  return (
    <main className="pageShell" id="top">
      <IntroVideo />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <AircraftSlider />
      <LocationSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
