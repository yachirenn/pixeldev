"use client";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
    href: "https://github.com/yourprofile",
    label: "GitHub",
  },
];

const linkcepat = [
  { name: "Beranda", href: "#main" },
  { name: "Tentang", href: "#about" },
  { name: "Kenapa Kami", href: "#kategori" },
  { name: "Kegiatan", href: "#aktivitas" },
  { name: "Kontak", href: "#footer" },
];

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Mengirim email...");

    try {
      if (!name || !email || !message) {
        setStatus("Semua field wajib diisi");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("Email berhasil dikirim!");
      } else {
        const errorText = await res.text();
        setStatus(errorText || "Terjadi kesalahan saat mengirim");
      }
    } catch (error) {
      console.error("Gagal menghubungi server:", error);
      setStatus("Gagal menghubungi server backend");
    }
  };

  return (
    <footer id="footer" className="bg-background border-t border-border/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">KB-TKIP Salsabila 1</h3>
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
                    className="text-muted-foreground hover:text-foreground hover:underline transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="">
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <p className="text-muted-foreground mb-4">
              Komentar Anda sangat bermanfaat bagi kami.
            </p>
            <form
              onSubmit={handleSubmit}
              className="grid-cols-3 space-y-5 gap-8"
            >
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type="name" 
                placeholder="Your Name"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
              />
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here."
              />
              <Button type="submit" className="hover:cursor-pointer">
                Submit
              </Button>
              <p>{status}</p>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-sm font-medium">
          <p>
            © {new Date().getFullYear()} KB-TKIP - Salsabila 1. All rights
            reserved.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
