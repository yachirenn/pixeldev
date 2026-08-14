"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { 
  Baby, Smile, Star, GraduationCap,
  ArrowRight, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  order: number;
}

const iconMap: Record<string, any> = {
  "fas fa-child": Baby,
  "fas fa-smile": Smile,
  "fas fa-star": Star,
  "fas fa-graduation-cap": GraduationCap,
};

const colorMap = [
  "from-blue-500/20 to-cyan-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-orange-500/20 to-yellow-500/20",
  "from-purple-500/20 to-pink-500/20",
];

const borderColorMap = [
  "border-blue-200 hover:border-blue-400",
  "border-green-200 hover:border-green-400",
  "border-orange-200 hover:border-orange-400",
  "border-purple-200 hover:border-purple-400",
];

const shadowColorMap = [
  "hover:shadow-blue-500/10",
  "hover:shadow-green-500/10",
  "hover:shadow-orange-500/10",
  "hover:shadow-purple-500/10",
];

function getIcon(iconClass: string) {
  return iconMap[iconClass] || Star;
}

export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => {
        setData(Array.isArray(data) ? data.sort((a: Category, b: Category) => a.order - b.order) : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <section id="categories" className="py-20 bg-linear-to-b from-muted/50 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-16">
            <div className="h-4 w-32 bg-primary/20 rounded-full mx-auto mb-4" />
            <div className="h-10 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="categories" className="py-20 bg-linear-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">⚠️</span>
          </motion.div>
          <p className="text-red-500">Gagal memuat kategori</p>
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  return (
    <section id="categories" className="py-20 lg:py-28 bg-linear-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-linear(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Floating shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-24 h-24 border-2 border-primary/10 rounded-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-16 h-16 border-2 border-primary/10 rounded-full"
        />
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
            <Sparkles className="w-4 h-4" />
            Program Kami
          </motion.span>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pilih Jenjang Pendidikan
          </h2>
          
          <p className="text-muted-foreground">
            Program pembelajaran yang disesuaikan dengan tahap perkembangan anak
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((category, i) => {
            const Icon = getIcon(category.icon || "");
            
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 rounded-3xl border-2 bg-card/50 backdrop-blur-sm transition-all duration-500 cursor-pointer
                  ${borderColorMap[i % borderColorMap.length]}
                  ${shadowColorMap[i % shadowColorMap.length]}
                  hover:shadow-2xl hover:-translate-y-2
                `}
              >
                {/* Background linear */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                  }}
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${colorMap[i % colorMap.length]} transition-opacity duration-500`}
                />

                {/* Hover Glow Effect */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === i ? 1.5 : 0,
                    opacity: hoveredIndex === i ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
                />

                <div className="relative z-10">
                  {/* Step Number */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === i ? 1.1 : 1,
                    }}
                    className="text-xs font-bold text-primary/40 mb-4"
                  >
                    0{i + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotateY: hoveredIndex === i ? 360 : 0,
                      scale: hoveredIndex === i ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${colorMap[i % colorMap.length]} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {category.description || `Program untuk ${category.name}`}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      x: hoveredIndex === i ? 0 : -10,
                    }}
                    className="flex items-center gap-2 text-primary font-medium text-sm"
                  >
                    Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Top Right Decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-4 h-4 text-primary/40" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="ghost" size="lg" className="gap-2 group">
            Lihat Semua Program
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}