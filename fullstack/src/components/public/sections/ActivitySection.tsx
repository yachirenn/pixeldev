"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { 
  Calendar, MapPin, Clock, ArrowRight, 
  Sparkles, Filter, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Activity {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  location?: string;
  category?: string;
}

export default function ActivitySection() {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/activity")
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

  const categories = ["Semua", ...new Set(data.map(item => item.category || "Umum"))];
  
  const filteredData = selectedCategory === "Semua" 
    ? data 
    : data.filter(item => (item.category || "Umum") === selectedCategory);

  // Format date to Indonesian
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Check if activity is upcoming
  const isUpcoming = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) > new Date();
  };

  // Loading Skeleton
  if (loading) {
    return (
      <section id="activity" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-16">
            <div className="h-4 w-32 bg-primary/20 rounded-full mx-auto mb-4" />
            <div className="h-10 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-gray-100 h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="activity" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">⚠️</span>
          </motion.div>
          <p className="text-red-500">Gagal memuat kegiatan</p>
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  return (
    <section id="activity" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Wave pattern */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-muted/50 to-transparent" />
        
        {/* Dots */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-10 w-20 h-20 opacity-10"
          style={{
            backgroundImage: `radial-linear(circle, hsl(var(--primary)) 2px, transparent 2px)`,
            backgroundSize: "15px 15px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Calendar className="w-4 h-4" />
            Kegiatan
          </motion.span>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Kegiatan & Aktivitas
          </h2>
          
          <p className="text-muted-foreground">
            Berbagai kegiatan menarik untuk mendukung tumbuh kembang anak
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Activity Cards */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredData.map((activity, i) => (
            <motion.div
              key={activity._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(activity._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-card rounded-3xl overflow-hidden border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                {activity.imageUrl ? (
                  <>
                    <Image
                      src={activity.imageUrl}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-primary/30" />
                  </div>
                )}

                {/* Date Badge */}
                {activity.date && (
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      isUpcoming(activity.date) 
                        ? "bg-green-500" 
                        : "bg-gray-500"
                    } text-white border-0`}>
                      {isUpcoming(activity.date) ? "Mendatang" : "Selesai"}
                    </Badge>
                  </div>
                )}

                {/* Category Badge */}
                {activity.category && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {activity.category}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {activity.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {activity.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {activity.date && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(activity.date)}
                    </div>
                  )}
                  {activity.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {activity.location}
                    </div>
                  )}
                </div>

                {/* Read More */}
                <motion.div
                  animate={{
                    opacity: hoveredId === activity._id ? 1 : 0,
                    y: hoveredId === activity._id ? 0 : 10,
                  }}
                  className="mt-4"
                >
                  <Button variant="ghost" size="sm" className="gap-1 text-primary p-0 h-auto">
                    Selengkapnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>

              {/* Hover Line */}
              <motion.div
                animate={{
                  scaleX: hoveredId === activity._id ? 1 : 0,
                }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-primary/50 origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Tidak ada kegiatan di kategori ini</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}