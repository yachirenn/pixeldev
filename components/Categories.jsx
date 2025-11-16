import { BookOpen, User, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import { Card } from "./ui/card";

const categories = [
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "Active Learning",
    description:
      "Metode yang mengajak anak terlibat aktif melalui proyek, permainan edukatif, dan kreasi.",
    href: "#tentang",
  },
  {
    icon: <User className="w-8 h-8 text-primary" />,
    title: "Expert Teacher",
    description:
      "Pendidik berpengalaman, berdedikasi, dan siap membimbing dengan pendekatan yang hangat.",
    href: "#tentang",
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Strategi Location",
    description:
      "Lokasi strategis yang mudah dijangkau, aman, dan mendukung aktivitas belajar.",
    href: "#tentang",
  },
];

export default function Categories() {
  return (
    <section id="kategori" className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Kenapa kami?</h2>
            <p className="text-muted-foreground">
              Tiga alasan utama memilih KB-TKP Salsabila 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <Card
                key={index}
                className="bg-card p-6 rounded-lg items-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center mb-6">{item.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
