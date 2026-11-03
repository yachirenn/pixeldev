"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Quote, Sparkles, Heart } from "lucide-react";

interface QuoteData {
  _id: string;
  content: string;
  author: string;
  role?: string;
}

export default function QuotesSection() {
  const [data, setData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => {
        const quotes = Array.isArray(data) ? data[0] : data;
        setData(quotes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="relative py-24 bg-linear-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-6" />
            <div className="h-6 w-3/4 bg-white/20 rounded mx-auto mb-4" />
            <div className="h-4 w-1/4 bg-white/20 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  // Error / Empty State
  if (error || !data) return null;

  return (
    <section className="relative py-24 lg:py-32 bg-linear-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Large rotating quotes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-20 -right-20 opacity-10"
        >
          <Quote className="w-80 h-80 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-20 -left-20 opacity-10"
        >
          <Quote className="w-96 h-96 text-white" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-linear(circle, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-4 h-4" />
            Kata Bijak
          </motion.div>

          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              type: "spring",
              stiffness: 150,
            }}
            className="relative inline-block mb-8"
          >
            {/* Glow behind icon */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 rounded-full blur-xl"
            />
            
            <div className="relative w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <Quote className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Quote Content */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            {/* Decorative lines */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-white leading-relaxed mb-8">
              &ldquo;{data.content}&rdquo;
            </p>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </motion.blockquote>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-3">
              {/* Decorative heart */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-red-300 fill-red-300" />
              </motion.div>
              
              <div>
                <p className="text-xl font-bold text-white">
                  {data.author}
                </p>
                {data.role && (
                  <p className="text-white/70 text-sm">
                    {data.role}
                  </p>
                )}
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Heart className="w-5 h-5 text-red-300 fill-red-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 w-32 h-px bg-white/20 mx-auto"
          />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}