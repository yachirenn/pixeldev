"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Quote } from "lucide-react";

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

  if (loading) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 animate-pulse text-center">
          <div className="h-8 w-64 bg-white/20 rounded mx-auto" />
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="h-12 w-12 mx-auto mb-6 opacity-50" />
          
          <blockquote className="text-2xl md:text-3xl font-medium italic max-w-3xl mx-auto leading-relaxed">
            "{data.content}"
          </blockquote>
          
          <div className="mt-6">
            <p className="font-semibold text-lg">— {data.author}</p>
            {data.role && (
              <p className="text-sm opacity-75 mt-1">{data.role}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}