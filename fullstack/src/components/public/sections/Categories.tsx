"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  order: number;
}

export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
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
      <section id="categories" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="categories" className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">⚠️ Gagal memuat kategori</p>
        </div>
      </section>
    );
  }

  if (data.length === 0) return null;

  return (
    <section id="categories" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Kategori
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {item.icon && (
                <div className="text-4xl mb-3">
                  <i className={item.icon}></i>
                </div>
              )}
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
                />
              )}
              <h3 className="font-semibold text-lg">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}