"use client";

import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import BenefitsSection from "@/components/Benefits/BenefitsSection";
import Events from "@/components/Events/Events";
import Team from "@/components/Team/Team";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-bg text-fg">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <Events />
      <Team />
      <Footer />
    </div>
  );
}
