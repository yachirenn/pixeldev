"use client";

import { useEffect, useState, useRef } from "react";
import * as motion from "motion/react-client";
import CountUp from "react-countup";
import { BookOpen, Users, Building2, Heart, GraduationCap, Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Stat {
  label: string;
  value: number;
}

interface AboutData {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  mission?: string;
  vision?: string;
  features: Feature[];
  stats: Stat[];
}

const iconMap: Record<string, any> = {
  "fas fa-book-open": BookOpen,
  "fas fa-users": Users,
  "fas fa-building": Building2,
  "fas fa-heart": Heart,
  "fas fa-graduation-cap": GraduationCap,
  "fas fa-bullseye": Target,
  "fas fa-eye": Eye,
};

function getIcon(iconClass: string) {
  return iconMap[iconClass] || BookOpen;
}

export default function AboutSection() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"features" | "vision" | "mission">("features");
  const statsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => {
        const about = Array.isArray(data) ? data[0] : data;
        setData(about);
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
      <section id="about" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-16">
            <div className="h-4 w-32 bg-primary/20 rounded-full mx-auto mb-4" />
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">⚠️</span>
          </motion.div>
          <p className="text-red-500">Gagal memuat data About</p>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section id="about" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-linear(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-60 h-60 border-30 border-primary/5 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Tentang Kami
          </motion.span>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {data.title}
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { key: "features" as const, label: "Keunggulan" },
            { key: "vision" as const, label: "Visi" },
            { key: "mission" as const, label: "Misi" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {activeTab === "features" && data.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.features.map((feature, i) => {
                const Icon = getIcon(feature.icon);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative p-8 rounded-2xl bg-card border hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Hover linear */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      >
                        <Icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-linear-to-bl from-primary/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "vision" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10"
            >
              <Target className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {data.vision || "Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk generasi Qur'ani, berakhlak mulia, dan berwawasan global."}
              </p>
            </motion.div>
          )}

          {activeTab === "mission" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10"
            >
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {data.mission || "Menyelenggarakan pendidikan yang mengintegrasikan nilai-nilai Islam dalam setiap aspek pembelajaran untuk membentuk karakter dan kompetensi anak."}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Counter */}
        {data.stats && data.stats.length > 0 && (
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 relative"
          >
            {/* Stats background */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-12">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {isStatsVisible && (
                      <CountUp
                        end={stat.value}
                        duration={3}
                        separator="."
                        suffix={stat.value > 100 ? "+" : ""}
                      />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="gap-2 group"
          >
            Hubungi Kami
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}