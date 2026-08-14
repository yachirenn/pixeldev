"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Stat {
  label: string;
  value: number;
}

interface About {
  _id?: string;
  title: string;
  description: string;
  features: Feature[];
  stats: Stat[];
  isActive: boolean;
}

export default function AdminAboutPage() {
  const [data, setData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<About>({
    title: "",
    description: "",
    features: [],
    stats: [],
    isActive: true,
  });

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setData(data);
          setForm(data);
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = data?._id ? "PUT" : "POST";
    const body = data?._id ? { ...form, _id: data._id } : form;

    await fetch("/api/about", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    window.location.reload();
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { icon: "", title: "", desc: "" }],
    });
  };

  const addStat = () => {
    setForm({
      ...form,
      stats: [...form.stats, { label: "", value: 0 }],
    });
  };

  if (loading) return <div className="animate-pulse">Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola About</h1>

      <Card>
        <CardHeader>
          <CardTitle>{data ? "Edit About" : "Tambah About"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <Input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <Textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Fitur</h3>
                <Button type="button" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4" /> Tambah
                </Button>
              </div>
              {form.features.map((feature, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mb-2 p-3 border rounded">
                  <Input
                    placeholder="Icon (class)"
                    value={feature.icon}
                    onChange={e => {
                      const newFeatures = [...form.features];
                      newFeatures[i].icon = e.target.value;
                      setForm({ ...form, features: newFeatures });
                    }}
                  />
                  <Input
                    placeholder="Judul"
                    value={feature.title}
                    onChange={e => {
                      const newFeatures = [...form.features];
                      newFeatures[i].title = e.target.value;
                      setForm({ ...form, features: newFeatures });
                    }}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Deskripsi"
                      value={feature.desc}
                      onChange={e => {
                        const newFeatures = [...form.features];
                        newFeatures[i].desc = e.target.value;
                        setForm({ ...form, features: newFeatures });
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setForm({
                          ...form,
                          features: form.features.filter((_, idx) => idx !== i),
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Statistik</h3>
                <Button type="button" size="sm" onClick={addStat}>
                  <Plus className="h-4 w-4" /> Tambah
                </Button>
              </div>
              {form.stats.map((stat, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Label"
                    value={stat.label}
                    onChange={e => {
                      const newStats = [...form.stats];
                      newStats[i].label = e.target.value;
                      setForm({ ...form, stats: newStats });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Nilai"
                    value={stat.value}
                    onChange={e => {
                      const newStats = [...form.stats];
                      newStats[i].value = parseInt(e.target.value) || 0;
                      setForm({ ...form, stats: newStats });
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setForm({
                        ...form,
                        stats: form.stats.filter((_, idx) => idx !== i),
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Simpan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}