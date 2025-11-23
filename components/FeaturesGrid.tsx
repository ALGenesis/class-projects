"use client";
import { useState } from "react";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Rocket,
  Users,
  Sparkles,
  Target,
  Shield,
  Zap,
  Globe,
  Heart,
} from "lucide-react";

const features = [
    {
      icon: Rocket,
      title: "Lancez vos idées",
      description:
        "Transformez votre vision en réalité en créant des projets et en trouvant l'équipe idéale pour les concrétiser.",
    },
    {
      icon: Users,
      title: "Rejoignez des équipes ambitieuses",
      description:
        "Découvrez des projets passionnants et collaborez avec des personnes talentueuses partout dans le monde.",
    },
    {
      icon: Target,
      title: "Atteignez vos objectifs",
      description:
        "Travaillez ensemble vers un objectif commun et construisez quelque chose d'exceptionnel en équipe.",
    },
    {
      icon: Sparkles,
      title: "Progressez ensemble",
      description:
        "Apprenez de nouvelles compétences, partagez vos connaissances et évoluez professionnellement grâce à la collaboration.",
    },

  ];

interface FeatureItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeaturesGridMobile = () => {
  const [order, setOrder] = useState<number[]>(() =>
    features.map((_, index) => index)
  );

  const handleCardClick = () => {
    setOrder((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
  };

  const visibleCount = Math.min(features.length, 4);

  return (
    <div className="relative h-[320px] xs:h-[340px] sm:h-[360px] max-w-md mx-auto">
      {order.slice(0, visibleCount).map((featureIndex, position) => {
        const feature = features[featureIndex] as FeatureItem;
        const Icon = feature.icon;

        const offset = position * 16; // plus de décalage vertical entre les cartes
        const scale = 1 - position * 0.03; // on réduit moins fort l'échelle
        const opacity = 1 - position * 0.08; // cartes du fond un peu plus visibles

        const isTop = position === 0;

        return (
          <button
            key={feature.title}
            type="button"
            onClick={handleCardClick}
            className="absolute inset-0 flex justify-center items-center focus:outline-none"
            style={{
              transform: `translateY(${offset}px) scale(${scale})`,
              opacity,
              zIndex: visibleCount - position,
            }}
          >
            <Card
              className={`w-full max-w-md border-border bg-background/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                isTop
                  ? "ring-2 ring-primary/40 hover:ring-primary/60 hover:shadow-xl"
                  : "scale-[0.98]"
              }`}
            >
              <CardContent className="pt-6 pb-6 px-5 space-y-4 text-center">
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
};

export const FeaturesGrid = () => {
  return (
    <section className="relative py-12 bg-accent/20 overflow-hidden md:max-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tout ce dont vous avez besoin pour <span className="text-primary">réussir</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour vous aider à collaborer, créer et lancer vos projets ensemble.
            </p>
          </div>

          {/* Version mobile : pile de cartes */}
          <div className="block md:hidden">
            <FeaturesGridMobile />
          </div>

          {/* Version desktop : grille classique */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
