"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

interface Hero {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export default function AdminHeroPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Hero>({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
  });

  // Fetch data
  const fetchHeroes = () => {
    fetch("/api/hero")
      .then(res => res.json())
      .then(data => {
        setHeroes(Array.isArray(data) ? data : [data]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    });
    setEditingId(null);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;

    const res = await fetch("/api/hero", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchHeroes();
      resetForm();
    }
  };

  // Edit
  const handleEdit = (hero: Hero) => {
    setForm(hero);
    setEditingId(hero._id || null);
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    
    await fetch(`/api/hero?id=${id}`, { method: "DELETE" });
    fetchHeroes();
  };

  if (loading) {
    return <div className="animate-pulse">Memuat...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Hero</h1>

      {/* Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Hero" : "Tambah Hero Baru"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul</label>
                <Input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Judul hero"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subjudul</label>
                <Input
                  value={form.subtitle}
                  onChange={e => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Subjudul hero"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Deskripsi hero"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <Input
                  value={form.imageUrl}
                  onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teks Tombol</label>
                <Input
                  value={form.buttonText}
                  onChange={e => setForm({ ...form, buttonText: e.target.value })}
                  placeholder="Contoh: Daftar Sekarang"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link Tombol</label>
                <Input
                  value={form.buttonLink}
                  onChange={e => setForm({ ...form, buttonLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Simpan" : "Tambah"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm} className="gap-2">
                  <X className="h-4 w-4" />
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Hero ({heroes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Judul</th>
                  <th className="text-left p-3">Subjudul</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {heroes.map(hero => (
                  <tr key={hero._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{hero.title}</td>
                    <td className="p-3 text-gray-500">{hero.subtitle}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        hero.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {hero.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(hero)}
                        className="gap-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(hero._id!)}
                        className="gap-1 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {heroes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-500">
                      Belum ada data hero
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}