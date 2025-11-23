"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

export default function MySpacePage() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          setProjects([]);
          return;
        }
        const data: Project[] = await res.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to load projects", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const userId = user?.id;

  const userProjects = projects.filter((project) => {
    if (!userId) return false;
    const isOwner = project.creatorId === userId;
    const isMember = project.memberIds?.includes(userId);
    return isOwner || isMember;
  });

  const filteredProjects = userProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement de vos projets…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Mon <span className="text-primary">espace projets</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Retrouvez ici les projets que vous avez créés ou que vous avez rejoints.
            </p>
          </div>

          {userId ? (
            <>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Recherchez dans vos projets par nom, description ou tags..."
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
                    Vous n'avez encore aucun projet correspondant à cette recherche.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Connectez-vous pour voir les projets que vous avez créés ou rejoints.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
