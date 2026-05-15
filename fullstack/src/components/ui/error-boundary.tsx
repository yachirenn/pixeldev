"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-100 flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
            <p className="text-gray-500 mb-4">
              {this.state.error?.message || "Gagal memuat komponen"}
            </p>
            <Button onClick={() => this.setState({ hasError: false, error: null })}>
              Coba Lagi
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}