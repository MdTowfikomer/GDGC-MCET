"use client";

import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen bg-bg text-fg"
    >
      <Navbar />
      <HeroSection />
    </div>
  );
}
