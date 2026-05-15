"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface HeroData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
}

export default function HeroSection() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data");
        return res.json();
      })
      .then((data) => {
        // API return array, ambil yang pertama
        const hero = Array.isArray(data) ? data[0] : data;
        setData(hero);
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
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4" />
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto" />
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500">⚠️ {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </section>
    );
  }

  // Empty State
  if (!data) {
    return (
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-muted-foreground">di KB-TKIP Salsabila 1</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[90vh] bg-amber-400 flex items-center justify-center px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center bg-red-500">
        {/* TEXT */}
        <div className="bg-blue-500">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            {data.title}{" "}
            <span className="text-primary italic">{data.subtitle}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground text-lg"
          >
            {data.description}
          </motion.p>

          {data.buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => {
                  if (data.buttonLink) {
                    window.open(data.buttonLink, "_blank");
                  }
                }}
                className="mt-6"
              >
                {data.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* IMAGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:block"
        >
          <Image
            src={data.imageUrl || "/images/placeholder.jpg"}
            alt={data.title || "Hero"}
            width={320}
            height={320}
            className="w-80 h-80 object-cover rounded-xl shadow-lg"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}