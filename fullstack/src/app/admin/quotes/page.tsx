"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

interface Quote {
  _id?: string;
  content: string;
  author: string;
  role?: string;
  isActive: boolean;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Quote>({
    content: "",
    author: "",
    role: "",
    isActive: true,
  });

  const fetchData = () => {
    fetch("/api/quotes")
      .then(res => res.json())
      .then(data => {
        setQuotes(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ content: "", author: "", role: "", isActive: true });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...form, _id: editingId } : form;

    const res = await fetch("/api/quotes", {
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
    await fetch(`/api/quotes?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div className="animate-pulse p-8">Memuat...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Quotes</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Quote" : "Tambah Quote"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kutipan *</label>
              <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Penulis *</label>
                <Input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan</label>
                <Input value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} />
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
        <CardHeader><CardTitle>Daftar Quotes ({quotes.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Kutipan</th>
                  <th className="text-left p-3">Penulis</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(item => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 max-w-xs truncate">{item.content}</td>
                    <td className="p-3 font-medium">{item.author}</td>
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
                {quotes.length === 0 && (
                  <tr><td colSpan={4} className="p-6 text-center text-gray-500">Belum ada quotes</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}