"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X, Calendar, MapPin } from "lucide-react";

interface Activity {
  _id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  location?: string;
  category?: string;
  isActive: boolean;
}

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Activity>({
    title: "",
    description: "",
    imageUrl: "",
    date: "",
    location: "",
    category: "",
    isActive: true,
  });

  const fetchData = () => {
    fetch("/api/activity")
      .then(res => res.json())
      .then(data => {
        setActivities(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", imageUrl: "", date: "", location: "", category: "", isActive: true });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;

    const res = await fetch("/api/activity", {
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
    await fetch(`/api/activity?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="animate-pulse p-8">Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Kegiatan</h1>

      {/* Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Kegiatan" : "Tambah Kegiatan"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul *</label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <Input value={form.category || ""} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="misal: Olahraga, Seni" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tanggal</label>
                <Input type="date" value={form.date?.split("T")[0] || ""} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lokasi</label>
                <Input value={form.location || ""} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <Input value={form.imageUrl || ""} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi *</label>
                <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required />
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

      {/* Table */}
      <Card>
        <CardHeader><CardTitle>Daftar Kegiatan ({activities.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Judul</th>
                  <th className="text-left p-3">Tanggal</th>
                  <th className="text-left p-3">Lokasi</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(item => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3 text-sm">
                      {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="p-3 text-sm">{item.location || "-"}</td>
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
                {activities.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-gray-500">Belum ada kegiatan</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}