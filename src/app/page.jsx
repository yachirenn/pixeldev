import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import ActivitySection from "@/components/ActivitySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        <HeroSection />
        <ActivitySection />
      </main>
    </div>
  );
}
