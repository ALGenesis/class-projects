"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Prêt à construire quelque chose
            <br />
            <span className="text-primary">d'incroyable ?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre communauté de créateurs, développeurs et innovateurs.
            Commencez votre aventure dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/create">
              <Button size="lg" className="group">
                Créer votre projet
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                Explorer les projets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
