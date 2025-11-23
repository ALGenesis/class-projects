import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "ProjectHub m'a aidée à trouver l'équipe idéale pour ma startup. En moins de deux semaines, nous avions une équipe complète de développeurs et de designers prêts à construire le produit.",
      author: "Sarah Chen",
      role: "Founder, HealthTrack AI",
      initials: "SC",
    },
    {
      quote:
        "J'ai rejoint trois projets incroyables grâce à cette plateforme. La qualité des personnes et des idées ici est exceptionnelle. C'est comme LinkedIn, mais vraiment utile.",
      author: "Alex Martinez",
      role: "Full Stack Developer",
      initials: "AM",
    },
    {
      quote:
        "En tant que designer cherchant à travailler sur de vrais projets, ProjectHub a été inestimable. J'ai construit mon portfolio et appris auprès de fondateurs expérimentés.",
      author: "Jordan Lee",
      role: "UI/UX Designer",
      initials: "JL",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-accent/20 md:max-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ce que dit notre <span className="text-primary">communauté</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rejoignez des milliers de créateurs qui construisent ensemble
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="pt-6 space-y-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
