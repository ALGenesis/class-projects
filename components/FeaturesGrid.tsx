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

export const FeaturesGrid = () => {
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

  return (
    <section className="relative py-12 bg-accent/20 overflow-hidden md:max-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tout ce dont vous avez besoin pour <span className="text-primary">réussir</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour vous aider à collaborer, créer et lancer vos projets ensemble.
            </p>
          </div>

          <div className="  grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`  border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group`}
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
