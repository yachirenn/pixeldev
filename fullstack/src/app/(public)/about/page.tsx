import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center">Tentang Kami</h1>
      <p className="text-center">Kami adalah sebuah organisasi yang bergerak di bidang IT Jepang. Kami membangun, memasarkan, menciptakan, dan menganalisis berbagai aspek yang berkaitan dengan perkembangkan teknologi dan industri.</p>
      <Button>Learn More about Us</Button>
    </div>
  );
}