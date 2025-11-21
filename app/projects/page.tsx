"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedProjects = typeof window !== "undefined" ? localStorage.getItem("projects") : null;
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(sampleProjects);
      if (typeof window !== "undefined") {
        localStorage.setItem("projects", JSON.stringify(sampleProjects));
      }
    }
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Discover <span className="text-primary">Amazing Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join collaborative teams and build something incredible together
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
