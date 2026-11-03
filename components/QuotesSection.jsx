import { Quote } from "lucide-react";
import * as motion from "motion/react-client";
import { quotes } from "@/lib/data";

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export default function QuotesSection() {
  const randomQuote = getRandomQuote();

  return (
    <section id="quotes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-serif font-medium text-foreground leading-relaxed mb-6">
                {randomQuote.text}
            </blockquote>
            <cite className="text-lg text-foreground font-medium not-italic">
                - {randomQuote.author}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
