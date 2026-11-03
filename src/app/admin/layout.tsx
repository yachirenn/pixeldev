// src/app/admin/layout.tsx
import Link from "next/link";
import { 
  LayoutDashboard, 
  Image, 
  Info, 
  Grid3X3, 
  Calendar, 
  MessageCircle, 
  Quote,
  ChevronLeft
} from "lucide-react";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Image },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/categories", label: "Kategori", icon: Grid3X3 },
  { href: "/admin/activity", label: "Kegiatan", icon: Calendar },
  { href: "/admin/testimonial", label: "Testimonial", icon: MessageCircle },
  { href: "/admin/quotes", label: "Quotes", icon: Quote },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Kembali ke Website
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}