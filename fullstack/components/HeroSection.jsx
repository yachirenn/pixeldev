"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="main" className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Cakap, Cendekia,{" "}
              <span className="text-primary italic">Berakhlak Mulia</span>
            </h1>

            <p className="text-xl md:*:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Kami menghadirkan kegiatan yang menumbuhkan kecerdasan, akhlak, dan kemandirian anak sejak dni — agar mereka tumbuh menjadi generasi yang beriman dan berakhlakul karimah.
            </p>

            <motion.div initial={{ opacity: 0, y: 20}} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.8, delay: 0.3 }}>
              <Button size="lg" onClick={() => window.open("https://forms.gle/tzcAzQb3BW3Dybzt6", "_blank")} target="_blank" rel="noopener noreferrer" className="group hover:cursor-pointer">
                Yuk Daftar!{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }} 
          className="hidden lg:block"
          >
            <div className="relative m-12">
            <img 
            src="../images/LOGO.png" 
            alt="Logo" 
            className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
            />
            </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
