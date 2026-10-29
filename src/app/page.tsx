
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import AboutSectionMain from "@/components/about/aboutSectionMain";
import HowWeWorkSection from "@/components/about/HowWeWorkSection";
import ServicesSection from "@/components/services/ServicesSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-black">
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — ABOUT */}
      <AboutSection />

      {/* 03 — ABOUT MAIN */}
      <AboutSectionMain />

      {/* 04 — HOW WE WORK */}
      <HowWeWorkSection />

      {/* 05 — SERVICES */}
      <ServicesSection />

      {/* 06 — CONTACT */}
      <ContactSection />

      {/* 07 — FOOTER */}
      <Footer />
    </main>
  );
}
