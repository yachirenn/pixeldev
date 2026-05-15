"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X, GripVertical } from "lucide-react";

interface Category {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Category>({
    name: "",
    description: "",
    icon: "",
    imageUrl: "",
    isActive: true,
    order: 0,
  });

  const fetchData = () => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", icon: "", imageUrl: "", isActive: true, order: 0 });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;

    const res = await fetch("/api/categories", {
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
    if (!confirm("Yakin?")) return;
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="animate-pulse">Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Kategori</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Kategori" : "Tambah Kategori"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama *</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon (class)</label>
                <Input value={form.icon || ""} onChange={e => setForm({ ...form, icon: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <Input value={form.imageUrl || ""} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Urutan</label>
                <Input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <Textarea value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
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
        <CardHeader><CardTitle>Daftar Kategori ({categories.length})</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Nama</th>
                <th className="text-left p-3">Urutan</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{cat.name}</td>
                  <td className="p-3">{cat.order}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                      {cat.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => { setForm(cat); setEditingId(cat._id!); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(cat._id!)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}