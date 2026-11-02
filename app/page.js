"use client";

import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import BenefitsPlaceholder from "@/components/Benefits/BenefitsPlaceholder";
import Events from "@/components/Events/Events";
import Team from "@/components/Team/Team";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-bg text-fg">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsPlaceholder />
      <Events />
      <Team />
    </div>
  );
}
