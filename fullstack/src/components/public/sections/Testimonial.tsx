"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { Star } from "lucide-react";

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

  if (loading) {
    return (
      <section id="testimonial" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonial" className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">⚠️ Gagal memuat testimonial</p>
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  return (
    <section id="testimonial" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Testimonial
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.avatarUrl || "/images/avatar-placeholder.jpg"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  {item.role && (
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </div>
              
              {item.rating && (
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star < item.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <p className="text-muted-foreground italic">"{item.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}