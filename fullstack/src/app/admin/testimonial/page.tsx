"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X, Star } from "lucide-react";

interface Testimonial {
  _id?: string;
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
  isActive: boolean;
}

export default function AdminTestimonialPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Testimonial>({
    name: "",
    role: "",
    content: "",
    avatarUrl: "",
    rating: 5,
    isActive: true,
  });

  const fetchData = () => {
    fetch("/api/testimonial")
      .then(res => res.json())
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ name: "", role: "", content: "", avatarUrl: "", rating: 5, isActive: true });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;

    const res = await fetch("/api/testimonial", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchData();
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    await fetch(`/api/testimonial?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="animate-pulse p-8">Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Testimonial</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Testimonial" : "Tambah Testimonial"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama *</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan/Peran</label>
                <Input value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="misal: Orang Tua Murid" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Avatar</label>
                <Input value={form.avatarUrl || ""} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                    >
                      <Star className={`h-6 w-6 ${star <= (form.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Testimoni *</label>
                <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={3} required />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Simpan" : "Tambah"}
              </Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}><X className="h-4 w-4" /> Batal</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Daftar Testimonial ({testimonials.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Nama</th>
                  <th className="text-left p-3">Peran</th>
                  <th className="text-left p-3">Rating</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map(item => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-sm">{item.role || "-"}</td>
                    <td className="p-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < (item.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setForm(item); setEditingId(item._id!); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(item._id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}