"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-16 sm:pb-20 sm:pt-32">
      

      <div className="container relative z-10 px-4">
        <div className="sm:max-w-5xl sm:mx-auto text-center space-y-4">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Construisez votre </span>
              <span className="text-primary">prochain projet ensemble</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ">
              Connectez-vous avec des créateurs talentueux, découvrez des projets inspirants
              et transformez vos idées en réalité grâce à la collaboration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 ">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 group">
                Explorer les projets
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/create" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base hover:text-background h-12 px-8"
              >
                Créer votre projet
              </Button>
            </Link>
          </div>

          <div className="pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Aucune carte bancaire requise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Commencez gratuitement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Rejoignez plus de 2 000 créateurs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
