import React from "react";

import HeroSection from "@/components/HeroSection";
import Activity from "@/components/ActivitySection";
import About from "@/components/AboutSection";
import Categories from "@/components/Categories";
import Testimonial from "@/components/Testimonial";
import Quotes from "@/components/QuotesSection";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <About />
        <Categories />
        <Activity />
        <Testimonial />
        <Quotes />
      </main>
    </div>
  );
}
