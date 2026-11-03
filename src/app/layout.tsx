import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KB-TKIP Salsabila 1 Pandowoharjo",
    template: "%s | KB-TKIP Salsabila 1",
  },
  description: "Website resmi KB-TKIP Salsabila 1 Pandowoharjo. Sekolah Islam Terpadu untuk pendidikan anak usia dini.",
  keywords: ["TK", "KB", "PAUD", "Salsabila", "Pandowoharjo", "Sekolah Islam"],
  authors: [{ name: "KB-TKIP Salsabila 1" }],
  openGraph: {
    title: "KB-TKIP Salsabila 1 Pandowoharjo",
    description: "Sekolah Islam Terpadu untuk pendidikan anak usia dini",
    type: "website",
    locale: "id_ID",
    siteName: "KB-TKIP Salsabila 1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/logo-tkip.png" type="image/png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}