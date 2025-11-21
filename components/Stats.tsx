export const Stats = () => {
  const stats = [
    { value: "500+", label: "Projets actifs" },
    { value: "2 000+", label: "Membres d'équipe" },
    { value: "50+", label: "Pays" },
    { value: "95%", label: "Taux de réussite" },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
