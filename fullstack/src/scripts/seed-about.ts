import { connectDB } from '@/lib/db/db';
import About from '@/models/About';

async function seedAbout() {
  try {
    await connectDB();
    
    const existing = await About.findOne({ isActive: true });
    if (existing) {
      console.log('About already exists');
      process.exit(0);
    }
    
    await About.create({
      title: 'Tentang Kami',
      description: 'KB-TK Islam Plus Salsabila 1 Pandowoharjo hadir sebagai lembaga pendidikan anak usia dini yang berlandaskan Iman dan Taqwa.',
      features: [
        {
          icon: 'fa-solid fa-book-quran',
          title: 'Active Learning',
          description: 'Tahfidz Juz 30, Hadits Pilihan, Doa Harian, dan IQRO\'',
        },
        {
          icon: 'fa-solid fa-thumbs-up',
          title: 'Leadership Soul',
          description: 'Menumbuhkan jiwa kepemimpinan, kemandirian, dan tanggung jawab sejak dini.',
        },
        {
          icon: 'fa-solid fa-music',
          title: 'Pengembangan Bakat',
          description: 'Fasilitas dan program untuk menyalurkan minat serta bakat anak secara positif.',
        },
        {
          icon: 'fa-solid fa-hand-holding-heart',
          title: 'Akhlak Mulia',
          description: 'Pembiasaan Ibadah dan Adab (Akhlaqul Karimah)',
        },
      ],
      statistics: [
        { value: 181, label: 'Siswa' },
        { value: 10, label: 'Guru' },
        { value: 2461, label: 'Alumni' },
        { value: 30, label: 'Prestasi' },
      ],
    });
    
    console.log('About seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAbout();