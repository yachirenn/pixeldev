import * as motion from "motion/react-client";
import { testimonials } from "@/lib/testimonial";
import Image from "next/image";

const TestiSection = () => {
  return (
    <section id="testimoni" className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 mt-10 mb-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Testimoni
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Suara dari orang tua, alumni, dan pendidik tentang pengalaman
              mereka bersama KB–TKIP Salsabila 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card p-6 rounded-lg shadow-sm"
              >
                <p className="italic text-muted-foreground mb-6">
                  {item.quote}
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={`Foto ${item.name}`}
                    width={56}   // 14 * 4px = 56px
                    height={56}  // sama dengan w-14 h-14
                    className="rounded-full object-cover border border-border"
                  />
                  <div>
                    <strong className="block text-primary">{item.name}</strong>
                    <span className="text-sm text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestiSection;
