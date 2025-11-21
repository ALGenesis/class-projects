"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Class Projects
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/projects">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium"
              >
                Explorer les projets
              </Button>
            </Link>
            <Link href="/create">
              <Button size="sm" className="text-sm font-medium">
                Créer un projet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
