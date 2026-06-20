import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import GallerySection from "./components/GallerySection/GallerySection";
import HeroSection from "./components/HeroSection/HeroSection";
import InstagramSection from "./components/InstagramSection/InstagramSection";
import IntroVideo from "./components/IntroVideo";
import LocationSection from "./components/LocationSection/LocationSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import TrustSection from "./components/TrustSection/TrustSection";

export default function Home() {
  return (
    <main className="pageShell">
      <IntroVideo />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <GallerySection />
      <InstagramSection />
      <LocationSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
