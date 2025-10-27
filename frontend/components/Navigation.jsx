// import { Link } from "lucide-react";
import { navItems } from "@/lib/constants";
import { Button } from "./ui/button";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";

const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '6285878087845';
const waText = encodeURIComponent('Halo saya ingin tahu tentang proyek Anda');
const waHref = `https://wa.me/${waNumber}?text=${waText}`;

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <div className="">
            <h1 className="text-3xl font-black font-heading text-primary">
              KT-TKIP
            </h1>
          </div>

          <div className="hidden md:flex items-center justify-end gap-2">
            <div className="flex items-baseline gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-gray-600 hover:underline px-3 py-2 text-md font-medium transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Button href={waHref} className="p-5 text-md font-medium bg-primary text-white border-2 border-transparent hover:bg-white hover:text-primary hover:border-primary active:bg-primary/80 cursor-pointer transition-colors duration-300" target="_blank" rel="noopener noreferrer">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Nav */}
          <MobileNavigation />

        </div>
      </div>
    </nav>
  );
}
