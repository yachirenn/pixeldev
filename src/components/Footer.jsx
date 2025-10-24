import {
  Facebook,
  Github,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Twitter,
} from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const socialLinks = [
  {
    icon: Twitter,
    href: "https://twitter.com/yourprofile",
    label: "Twitter",
  },
  {
    icon: Facebook,
    href: "https://facebook.com/yourprofile",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/yourprofile",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourprofile",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "",
    label: "GitHub",
  },
];

const linkcepat = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Why Us?", href: "#?" },
  { name: "Activity", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">KT-TKIP</h3>
            <p className="text-muted-foreground mb-4">
              Membangun masa depan gemilang melalui pendidikan berkualitas.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              {linkcepat.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="">
            <h4 className="font-semibold text-foreground mb-4">Stay Update</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe untuk mendapatkan pembaruan terbaru.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Your email" />
                <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
