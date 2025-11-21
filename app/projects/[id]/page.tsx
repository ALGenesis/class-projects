"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Calendar,
  UserPlus,
  Target,
  CheckCircle2,
  Globe,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Health Tracker",
    description:
      "Building a comprehensive health tracking app that uses AI to provide personalized wellness recommendations and track various health metrics.",
    longDescription:
      "We're creating a revolutionary health tracking platform that combines wearable device data with artificial intelligence to provide users with actionable health insights. The app will track sleep patterns, nutrition, exercise, and mental health metrics to create a holistic view of user wellness.\n\nOur mission is to make preventive healthcare accessible to everyone by providing early warning signs and personalized recommendations based on each individual's unique health profile.",
    category: "AI/ML",
    teamSize: 5,
    currentMembers: 3,
    tags: ["React", "Python", "TensorFlow", "Healthcare"],
    createdAt: new Date().toISOString(),
    creator: "Sarah Chen",
    goals: [
      "Launch MVP with basic tracking features within 3 months",
      "Integrate with major wearable devices (Apple Watch, Fitbit)",
      "Achieve 10,000 active users in the first year",
      "Partner with healthcare providers for validation",
    ],
    lookingFor: ["Backend Developer", "ML Engineer", "UI/UX Designer"],
    requirements: [
      "Experience with React and modern frontend frameworks",
      "Understanding of healthcare data privacy (HIPAA)",
      "Passion for health and wellness technology",
    ],
    timeline: "6-8 months to MVP",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop",
    ],
    socialLinks: {
      website: "https://healthtracker.example.com",
      github: "https://github.com/healthtracker",
      twitter: "https://twitter.com/healthtracker",
    },
  },
  {
    id: "2",
    title: "Sustainable Fashion Marketplace",
    description:
      "Creating an eco-friendly e-commerce platform connecting sustainable fashion brands with conscious consumers.",
    longDescription:
      "Join us in revolutionizing the fashion industry by building a marketplace that exclusively features sustainable, ethically-produced clothing and accessories. Our platform will use blockchain technology to verify the sustainability claims of each product and provide complete transparency about the supply chain.\n\nWe're not just building another e-commerce site—we're creating a movement toward more conscious consumption and supporting small sustainable brands that are often overlooked by major platforms.",
    category: "Web Development",
    teamSize: 6,
    currentMembers: 4,
    tags: ["Next.js", "E-commerce", "Sustainability", "Design"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    creator: "Alex Martinez",
    goals: [
      "Onboard 50+ sustainable fashion brands",
      "Build a community of 5,000+ conscious shoppers",
      "Implement blockchain-based verification system",
      "Create a carbon footprint calculator for each purchase",
    ],
    lookingFor: ["Full-Stack Developer", "Product Designer"],
    requirements: [
      "Experience with Next.js and modern e-commerce platforms",
      "Passion for sustainability and ethical fashion",
      "Understanding of payment gateway integration",
    ],
    timeline: "4-6 months",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
    ],
    socialLinks: {
      website: "https://sustainablefashion.example.com",
      linkedin: "https://linkedin.com/company/sustainablefashion",
    },
  },
  {
    id: "3",
    title: "Local Community App",
    description:
      "Developing a mobile app to connect neighbors and strengthen local communities through events and resource sharing.",
    category: "Mobile App",
    teamSize: 4,
    currentMembers: 2,
    tags: ["React Native", "Community", "Social", "Firebase"],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    creator: "Jordan Lee",
  },
  {
    id: "4",
    title: "Educational Gaming Platform",
    description:
      "Building an engaging platform that combines gaming with learning for students aged 8-16.",
    category: "Web Development",
    teamSize: 8,
    currentMembers: 5,
    tags: ["Unity", "Education", "Gamification", "TypeScript"],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    creator: "Maya Patel",
  },
  {
    id: "5",
    title: "Remote Team Collaboration Tool",
    description:
      "Creating a next-generation collaboration tool specifically designed for remote teams with innovative features.",
    category: "Web Development",
    teamSize: 5,
    currentMembers: 5,
    tags: ["Vue.js", "WebRTC", "Productivity", "SaaS"],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    creator: "Chris Anderson",
  },
  {
    id: "6",
    title: "Smart Home Energy Manager",
    description:
      "Developing an IoT solution to help homeowners optimize their energy consumption and reduce costs.",
    category: "AI/ML",
    teamSize: 6,
    currentMembers: 3,
    tags: ["IoT", "Python", "Energy", "Smart Home"],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    creator: "Taylor Johnson",
  },
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params?.id as string | undefined;
    if (!id) {
      setLoading(false);
      return;
    }

    let projects: Project[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("projects");
      if (stored) {
        try {
          projects = JSON.parse(stored);
        } catch {
          projects = [];
        }
      }
    }

    if (projects.length === 0 && sampleProjects.length > 0) {
      projects = sampleProjects;
    }

    const found = projects.find((p) => p.id === id) || null;
    setProject(found);
    setLoading(false);
  }, [params]);

  const handleJoinProject = () => {
    if (!project) return;
    toast.success("🎉 Vous avez rejoint le projet avec succès !", {
      description: `Vous faites maintenant partie de ${project.title}. L'équipe sera informée.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">

        <main className="container mx-auto px-4 pt-24 pb-12">
          <p className="text-muted-foreground">Chargement du projet…</p>
        </main>
       
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2 mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux projets
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Projet introuvable</h1>
            <p className="text-muted-foreground">
              Le projet que vous recherchez n'existe pas ou a été supprimé.
            </p>
          </div>
        </main>
        
      </div>
    );
  }

  const isFull = project.currentMembers >= project.teamSize;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux projets
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {project.currentMembers}/{project.teamSize} membres
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {project.title}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Images du projet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden bg-accent/20 border border-border hover:scale-105 duration-300 transition-all ease-in-out"
                  >
                    <img
                      src={image}
                      alt={`${project.title} aperçu ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.longDescription && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">À propos de ce projet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          )}

          <Separator />

          {project.goals && project.goals.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Objectifs du projet
              </h2>
              <ul className="space-y-2">
                {project.goals.map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.lookingFor && project.lookingFor.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                Profils recherchés
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.lookingFor.map((role, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {project.requirements && project.requirements.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Pré-requis</h2>
              <ul className="space-y-2">
                {project.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.timeline && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Planning
              </h2>
              <p className="text-sm text-muted-foreground">{project.timeline}</p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              Technologies et compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {project.socialLinks && Object.keys(project.socialLinks).length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Restez en contact</h2>
              <div className="flex flex-wrap gap-2">
                {project.socialLinks.website && (
                  <a
                    href={project.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                  >
                    <Globe className="h-4 w-4" />
                    Site web
                  </a>
                )}
                {project.socialLinks.github && (
                  <a
                    href={project.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {project.socialLinks.twitter && (
                  <a
                    href={project.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                )}
                {project.socialLinks.linkedin && (
                  <a
                    href={project.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {project.socialLinks.discord && (
                  <a
                    href={project.socialLinks.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Discord
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Créé le {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Par {project.creator}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              onClick={handleJoinProject}
              disabled={isFull}
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {isFull ? "Équipe complète" : "Rejoindre le projet"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
