"use client";
import { motion } from "motion/react";

export default function HeroSection() {
    return (
        <section className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                            Writing That <span>Resonance</span>
                        </h1>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}