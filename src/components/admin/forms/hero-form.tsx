'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function HeroForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [heroId, setHeroId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: '',
    ctaLink: '',
    heroImage: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/hero');
      if (res.ok) {
        const data = await res.json();
        setHeroId(data._id);
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          ctaText: data.ctaText || '',
          ctaLink: data.ctaLink || '',
          heroImage: data.heroImage || '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Wajib diisi';
    if (!formData.subtitle.trim()) errs.subtitle = 'Wajib diisi';
    if (!formData.description.trim()) errs.description = 'Wajib diisi';
    if (!formData.ctaText.trim()) errs.ctaText = 'Wajib diisi';
    if (!formData.ctaLink.trim()) errs.ctaLink = 'Wajib diisi';
    if (!formData.heroImage.trim()) errs.heroImage = 'Wajib diisi';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      const url = '/api/hero';
      const method = heroId ? 'PUT' : 'POST';
      const body = heroId ? { ...formData, _id: heroId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Gagal menyimpan');
      
      const result = await res.json();
      if (!heroId) setHeroId(result._id);
      toast.success('Berhasil disimpan! 🎉');
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
        <CardTitle>🎯 Edit Hero Section</CardTitle>
        <CardDescription>Update konten utama landing page</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Judul</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Masukkan judul"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                placeholder="Masukkan subtitle"
              />
              {errors.subtitle && <p className="text-sm text-red-500">{errors.subtitle}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Masukkan deskripsi"
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Teks Tombol</label>
              <Input
                value={formData.ctaText}
                onChange={(e) => setFormData({...formData, ctaText: e.target.value})}
                placeholder="Contoh: Yuk Daftar!"
              />
              {errors.ctaText && <p className="text-sm text-red-500">{errors.ctaText}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Tombol</label>
              <Input
                value={formData.ctaLink}
                onChange={(e) => setFormData({...formData, ctaLink: e.target.value})}
                placeholder="https://..."
                type="url"
              />
              {errors.ctaLink && <p className="text-sm text-red-500">{errors.ctaLink}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL Gambar</label>
            <Input
              value={formData.heroImage}
              onChange={(e) => setFormData({...formData, heroImage: e.target.value})}
              placeholder="/images/hero.png atau https://..."
            />
            {errors.heroImage && <p className="text-sm text-red-500">{errors.heroImage}</p>}
            {formData.heroImage && (
              <div className="mt-2 w-40 h-40 border rounded overflow-hidden">
                <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <Button type="submit" disabled={isSaving} size="lg">
            {isSaving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}