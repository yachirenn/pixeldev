"use client";

import { useEffect, useState, useRef } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { 
  Star, Quote, ChevronLeft, ChevronRight,
  MessageCircle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

export default function Testimonial() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/testimonial")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => {
        setData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Auto-slide
  useEffect(() => {
    if (data.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    // Reset interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 5000);
  };

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Variants for slide animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Loading Skeleton
  if (loading) {
    return (
      <section id="testimonial" className="py-20 bg-linear-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-16">
            <div className="h-4 w-32 bg-primary/20 rounded-full mx-auto mb-4" />
            <div className="h-10 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-100 rounded-3xl p-12 h-64 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="testimonial" className="py-20 bg-linear-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">⚠️</span>
          </motion.div>
          <p className="text-red-500">Gagal memuat testimonial</p>
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  const currentTestimonial = data[currentIndex];

  return (
    <section id="testimonial" className="py-20 lg:py-28 bg-linear-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Quote */}
        <Quote className="absolute top-20 left-10 w-40 h-40 text-primary/3 -rotate-12" />
        <Quote className="absolute bottom-20 right-10 w-40 h-40 text-primary/3 rotate-12" />
        
        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
            }}
          >
            <Star className="w-3 h-3 text-primary/20 fill-primary/20" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <MessageCircle className="w-4 h-4" />
            Testimonial
          </motion.span>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Apa Kata Mereka?
          </h2>
          
          <p className="text-muted-foreground">
            Testimoni dari orang tua yang telah mempercayakan pendidikan anaknya kepada kami
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-3xl mx-auto relative">
          {/* Navigation Buttons */}
          {data.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 rounded-full shadow-lg bg-background hidden md:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 rounded-full shadow-lg bg-background hidden md:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Card */}
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="relative bg-card rounded-3xl p-8 md:p-12 shadow-xl border"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 md:left-12">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            <div className="mt-4">
              {/* Rating Stars */}
              {currentTestimonial.rating && (
                <motion.div 
                  className="flex gap-1 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                      }}
                      transition={{ delay: 0.1 * i, type: "spring" }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating!
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Content */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-8"
              >
                &ldquo;{currentTestimonial.content}&rdquo;
              </motion.blockquote>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <Image
                    src={currentTestimonial.avatarUrl || "/images/avatar-placeholder.jpg"}
                    alt={currentTestimonial.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
                  {currentTestimonial.role && (
                    <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          {data.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {data.map((_, i) => (
                <Button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile Navigation */}
          {data.length > 1 && (
            <div className="flex justify-center gap-4 mt-6 md:hidden">
              <Button variant="outline" size="icon" onClick={goPrev} className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={goNext} className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}