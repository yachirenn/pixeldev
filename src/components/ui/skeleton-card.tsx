// src/components/ui/skeleton-card.tsx

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-48 w-full" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-20 bg-gray-200 rounded w-full" />
          <div className="h-12 bg-gray-200 rounded w-40" />
        </div>
        <div className="hidden lg:block animate-pulse">
          <div className="w-80 h-80 bg-gray-200 rounded-xl mx-auto" />
        </div>
      </div>
    </section>
  );
}

export function SectionSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="animate-pulse text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}