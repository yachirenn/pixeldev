"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Image, Info, Grid3X3, Calendar, MessageCircle, Quote, 
  ArrowRight, TrendingUp 
} from "lucide-react";

interface Stats {
  hero: number;
  about: number;
  categories: number;
  activity: number;
  testimonial: number;
  quotes: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    hero: 0,
    about: 0,
    categories: 0,
    activity: 0,
    testimonial: 0,
    quotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/hero").then(r => r.json()),
      fetch("/api/about").then(r => r.json()),
      fetch("/api/categories").then(r => r.json()),
      fetch("/api/activity").then(r => r.json()),
      fetch("/api/testimonial").then(r => r.json()),
      fetch("/api/quotes").then(r => r.json()),
    ]).then(([hero, about, categories, activity, testimonial, quotes]) => {
      setStats({
        hero: Array.isArray(hero) ? hero.length : hero ? 1 : 0,
        about: about ? 1 : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
        activity: Array.isArray(activity) ? activity.length : 0,
        testimonial: Array.isArray(testimonial) ? testimonial.length : 0,
        quotes: Array.isArray(quotes) ? quotes.length : 0,
      });
      setLoading(false);
    });
  }, []);

  const menuItems = [
    { label: "Hero", count: stats.hero, href: "/admin/hero", icon: Image, color: "text-blue-500" },
    { label: "About", count: stats.about, href: "/admin/about", icon: Info, color: "text-green-500" },
    { label: "Kategori", count: stats.categories, href: "/admin/categories", icon: Grid3X3, color: "text-purple-500" },
    { label: "Kegiatan", count: stats.activity, href: "/admin/activity", icon: Calendar, color: "text-orange-500" },
    { label: "Testimonial", count: stats.testimonial, href: "/admin/testimonial", icon: MessageCircle, color: "text-pink-500" },
    { label: "Quotes", count: stats.quotes, href: "/admin/quotes", icon: Quote, color: "text-yellow-500" },
  ];

  const totalItems = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview konten website sekolah</p>
      </div>

      {/* Total Stats */}
      <Card className="mb-8 bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-10 w-10" />
            <div>
              <p className="text-sm opacity-75">Total Konten</p>
              <p className="text-3xl font-bold">
                {loading ? "..." : totalItems}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-2xl font-bold">
                        {loading ? "..." : item.count}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}