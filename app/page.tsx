
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";


export default function Home() {
  return (
    <div className=" relative bg-background">
      
      <Hero />
      <Stats />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CTA />
 
    </div>
  );
}
