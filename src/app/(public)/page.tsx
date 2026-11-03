import { Suspense } from "react";
import HeroSection from "@/components/public/sections/HeroSection";
import Activity from "@/components/public/sections/ActivitySection";
import About from "@/components/public/sections/AboutSection";
import Categories from "@/components/public/sections/Categories";
import Testimonial from "@/components/public/sections/Testimonial";
import Quotes from "@/components/public/sections/QuotesSection";
import { HeroSkeleton, SectionSkeleton } from "@/components/ui/skeleton-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <Categories />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <Activity />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonial />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <Quotes />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}