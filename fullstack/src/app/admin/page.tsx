'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroForm } from '@/components/dashboard/forms/hero-form';
import { AboutForm } from '@/components/dashboard/forms/about-form';
import { CategoriesForm } from '@/components/dashboard/forms/categories-form';
import { ActivityForm } from '@/components/dashboard/forms/activity-form';
import { TestimonialForm } from '@/components/dashboard/forms/testimonial-form';
import { QuotesForm } from '@/components/dashboard/forms/quotes-form';

const sections = [
  { id: 'hero', label: 'Hero', icon: '🎯' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
  { id: 'categories', label: 'Categories', icon: '📂' },
  { id: 'activity', label: 'Activity', icon: '⚡' },
  { id: 'testimonial', label: 'Testimonial', icon: '💬' },
  { id: 'quotes', label: 'Quotes', icon: '✨' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all sections of your landing page
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 gap-2 bg-muted p-1 rounded-lg">
          {sections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent className="" value="hero">
          <HeroForm />
        </TabsContent>

        <TabsContent className="" value="about">
          <AboutForm />
        </TabsContent>

        <TabsContent className="" value="categories">
          <CategoriesForm />
        </TabsContent>

        <TabsContent className="" value="activity">
          <ActivityForm />
        </TabsContent>

        <TabsContent className="" value="testimonial">
          <TestimonialForm />
        </TabsContent>

        <TabsContent className="" value="quotes">
          <QuotesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}