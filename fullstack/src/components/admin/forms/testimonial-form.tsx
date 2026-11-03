'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TestimonialForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ℹ️ About Section</CardTitle>
        <CardDescription>
          Form edit about section akan segera hadir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Coming soon...</p>
      </CardContent>
    </Card>
  );
}