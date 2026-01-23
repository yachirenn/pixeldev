'use client';
import * as motion from "motion/react-client";
import CountUp from "react-countup";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tentang Kami
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              KB-TK Islam Plus Salsabila 1 Pandowoharjo hadir sebagai lembaga
              pendidikan anak usia dini yang berlandaskan Iman dan Taqwa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg bg-card shadow-sm text-center">
              <div className="text-primary text-4xl mb-4">
                <i className="fa-solid fa-book-quran"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Active Learning</h3>
              <p className="text-muted-foreground">
                Tahfidz Juz 30, Hadits Pilihan, Doa Harian, dan IQRO’
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card shadow-sm text-center">
              <div className="text-primary text-4xl mb-4">
                <i className="fa-solid fa-thumbs-up"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Leadership Soul</h3>
              <p className="text-muted-foreground">
                Menumbuhkan jiwa kepemimpinan, kemandirian, dan tanggung jawab
                sejak dini.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card shadow-sm text-center">
              <div className="text-primary text-4xl mb-4">
                <i className="fa-solid fa-music"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengembangan Bakat</h3>
              <p className="text-muted-foreground">
                Fasilitas dan program untuk menyalurkan minat serta bakat anak
                secara positif.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card shadow-sm text-center">
              <div className="text-primary text-4xl mb-4">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Akhlak Mulia</h3>
              <p className="text-muted-foreground">
                Pembiasaan Ibadah dan Adab (Akhlaqul Karimah)
              </p>
            </div>
          </div>

          {/* Statistik */}
          <div className="mt-16 mb-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center backdrop-blur-sm bg-blue-50 p-6 rounded-lg shadow-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-primary">
                <CountUp end={181} duration={4} />
              </div>
              <div className="text-muted-foreground">Siswa</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-primary">
                <CountUp end={10} duration={4} />
              </div>
              <div className="text-muted-foreground">Guru</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-primary">
                <CountUp end={2461} duration={4.5} />
              </div>
              <div className="text-muted-foreground">Alumni</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-primary">
                <CountUp end={30} duration={4} />
              </div>
              <div className="text-muted-foreground">Prestasi</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
