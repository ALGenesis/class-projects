import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, Users, Rocket } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Découvrez des projets",
      description:
        "Parcourez des centaines de projets passionnants dans différentes catégories et trouvez ce qui vous intéresse.",
      step: "01",
    },
    {
      icon: PlusCircle,
      title: "Créez le vôtre",
      description:
        "Vous avez une idée ? Créez votre projet en quelques minutes et commencez à constituer votre équipe de rêve.",
      step: "02",
    },
    {
      icon: Users,
      title: "Rejoignez et collaborez",
      description:
        "Connectez-vous avec des personnes talentueuses qui partagent votre passion et commencez à travailler ensemble.",
      step: "03",
    },
    {
      icon: Rocket,
      title: "Lancez ensemble",
      description:
        "Construisez, itérez et lancez votre projet avec une équipe dédiée à vos côtés.",
      step: "04",
    },
  ];

  return (
    <section id="how-it-works" className="overflow-hidden relative pt-12 bg-background md:min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Comment ça <span className="text-primary">fonctionne</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Commencez en quatre étapes simples
            </p>
          </div>

          <div className={`relative flex flex-col items-center h-fit p-2 overflow-hidden `}>

            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary/30 md:h-[150vh]">
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={` relative w-full mb-8 md:mb-6 max-w-[90%] md:max-w-[40%] min-h-[150px] md:min-h-0 md:h-[180px] mx-auto 
                    ${
                    index % 2 === 0
                      ? '-translate-x-4 translate-y-2  md:-translate-x-[53%] md:translate-y-[10%]'
                      : 'translate-x-4 translate-y-2  md:translate-x-[53%] md:-translate-y-[10%]'
                  }`}
                >
                  <Card className="relative z-10 border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <CardContent className="h-full flex flex-col justify-between py-2">
                      <div className="flex items-start justify-between">
                        <div className="p-2.5 md:p-3 rounded-xl bg-primary/10">
                          <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                        <span className="text-4xl md:text-5xl font-bold text-primary/20">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
