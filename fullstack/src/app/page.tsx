import React from "react";

import HeroSection from "@/components/sections/HeroSection";
import Activity from "@/components/sections/ActivitySection";
import About from "@/components/sections/AboutSection";
import Categories from "@/components/sections/Categories";
import Testimonial from "@/components/sections/Testimonial";
import Quotes from "@/components/sections/QuotesSection";

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
