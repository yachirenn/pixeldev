"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import CountUp from "react-countup";

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
  features: Feature[];
  stats: Stat[];
}

export default function AboutSection() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/about")
    .then((res) => {
      if (!res.ok) throw new Error("Gagal memuat data");
      return res.json();
    })
    .then((data) => {
      // API return object atau array
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
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4 mt-20 animate-pulse">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 rounded-lg bg-gray-100 h-40" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4 mt-20 text-center">
          <p className="text-red-500">⚠️ Gagal memuat data About</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-primary underline"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  // Empty State
  if (!data) {
    return null;
  }

  return (
    <section id="about" className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 mt-20">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            {data.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* FEATURES */}
        {data.features && data.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg bg-card shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-primary text-4xl mb-4">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* STATS */}
        {data.stats && data.stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {data.stats.map((stat, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl font-bold text-primary">
                  <CountUp end={stat.value} duration={4} separator="." />
                  {stat.value > 100 ? "+" : ""}
                </div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}