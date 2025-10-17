import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import ActivitySection from "@/components/ActivitySection";
import AboutSection from "@/components/AboutSection";
import TestiSection from "@/components/TestiSection";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <Categories />
        <ActivitySection />
        <TestiSection />
      </main>
    </div>
  );
}
