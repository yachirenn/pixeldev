'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', href: '#main' },
  { name: 'About', href: '#about' },
  { name: 'Activities', href: '#aktivitas' },
  { name: 'Testimonial', href: '#testimoni' },
  { name: 'Footer', href: '#footer' },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center space-x-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2" aria-label="Open menu">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigate the site</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col mt-8 space-y-4 p-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}