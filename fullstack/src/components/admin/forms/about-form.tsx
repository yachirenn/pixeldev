'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export function AboutForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [{ icon: '', title: '', description: '' }],
    statistics: [{ value: 0, label: '' }],
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        if (data && data._id) {
          setAboutId(data._id);
          setFormData({
            title: data.title || '',
            description: data.description || '',
            features: data.features || [{ icon: '', title: '', description: '' }],
            statistics: data.statistics || [{ value: 0, label: '' }],
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { icon: '', title: '', description: '' }],
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    (newFeatures[index] as any)[field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addStat = () => {
    setFormData({
      ...formData,
      statistics: [...formData.statistics, { value: 0, label: '' }],
    });
  };

  const removeStat = (index: number) => {
    const newStats = formData.statistics.filter((_, i) => i !== index);
    setFormData({ ...formData, statistics: newStats });
  };

  const updateStat = (index: number, field: string, value: any) => {
    const newStats = [...formData.statistics];
    (newStats[index] as any)[field] = field === 'value' ? Number(value) : value;
    setFormData({ ...formData, statistics: newStats });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = '/api/about';
      const method = aboutId ? 'PUT' : 'POST';
      const body = aboutId ? { ...formData, _id: aboutId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Gagal menyimpan');
      
      const result = await res.json();
      if (!aboutId) setAboutId(result._id);
      toast.success('About berhasil disimpan! 🎉');
    } catch (error) {
      toast.error('Gagal menyimpan data');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-50" />
          <Skeleton className="h-4 w-75" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ℹ️ Edit About Section</CardTitle>
        <CardDescription>Update informasi tentang sekolah</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Tentang Kami"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi tentang sekolah"
              rows={4}
            />
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fitur</label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="mr-1 h-4 w-4" /> Tambah Fitur
              </Button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fitur #{index + 1}</span>
                  {formData.features.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeFeature(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Icon (fa-solid fa-book-quran)"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                />
                <Input
                  placeholder="Judul fitur"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                />
                <Textarea
                  placeholder="Deskripsi fitur"
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Statistik</label>
              <Button type="button" variant="outline" size="sm" onClick={addStat}>
                <Plus className="mr-1 h-4 w-4" /> Tambah Statistik
              </Button>
            </div>
            {formData.statistics.map((stat, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Statistik #{index + 1}</span>
                  {formData.statistics.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeStat(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs">Nilai</label>
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs">Label</label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Siswa, Guru, dll"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isSaving} size="lg">
            {isSaving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}