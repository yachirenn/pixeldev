"use client";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import ContactForm from "./form/contact-form";
import ContactThankYouEmail from "../src/app/api/email/contact-template";
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

export default function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-45">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">KB-TKIP Salsabila 1</h3>
            <p className="text-muted-foreground mb-4">
              Pendidikan berkualitas adalah fondasi utama bagi lahirnya generasi yang cerdas dan berkarakter. Dengan pendidikan yang baik, kita dapat membangun masa depan yang gemilang.

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

          {/* Source Map */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kunjungi Kami</h4>
            <p className="text-muted-foreground mb-4">
              Pesan Anda sangat bermanfaat bagi kami.
            </p>
            <ul className="space-y-2">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.23088779751345!2d110.37298900699453!3d-7.699552299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5f263ab6de2d%3A0x2207a3a6fdf57aa4!2sTKIP%20SDIT%20SMPIT%20SALSABILA%20UNIT%20PANDOWOHARJO!5e0!3m2!1sid!2sid!4v1764301921665!5m2!1sid!2sid"
              width="400"
              height="300"
              style={{ border: 0 }}   // ✅ perbaikan
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            </ul>
          </div>

          {/* Newsletter */}
          <div className="">
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <p className="text-muted-foreground mb-4">
              Pesan Anda sangat bermanfaat bagi kami.
            </p>
            <ContactForm />
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
