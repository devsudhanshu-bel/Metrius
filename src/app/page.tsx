import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-black">

      {/* =====================================================
          01 — HERO
      ===================================================== */}

      <Hero />


      {/* =====================================================
          02 — ABOUT
      ===================================================== */}

      <AboutSection />


      {/* =====================================================
          03 — SERVICES
      ===================================================== */}

      <ServicesSection />


      {/* =====================================================
          04 — CONTACT
      ===================================================== */}

      <ContactSection />


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  );
}