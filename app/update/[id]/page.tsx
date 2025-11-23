"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Project } from "@/types/project";
import { toast } from "sonner";
import { ProjectForm, ProjectFormHeader, ProjectFormValues } from "@/components/ProjectForm";

export default function UpdateProjectPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<ProjectFormValues | undefined>(
    undefined
  );

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          toast.error("Impossible de charger le projet");
          return;
        }
        const project: Project = await res.json();

        const values: ProjectFormValues = {
          title: project.title || "",
          description: project.description || "",
          longDescription: (project.longDescription as string) || "",
          category: project.category as any,
          teamSize: String(project.teamSize || 4),
          tags: (project.tags || []).join(", "),
          timeline: (project.timeline as string) || "",
          goals: project.goals && project.goals.length > 0 ? project.goals : [""],
          requirements:
            project.requirements && project.requirements.length > 0
              ? project.requirements
              : [""],
          lookingFor:
            project.lookingFor && project.lookingFor.length > 0
              ? project.lookingFor
              : [""],
          images: project.images && project.images.length > 0 ? project.images : [""],
          website: project.socialLinks?.website || "",
          github: project.socialLinks?.github || "",
          twitter: project.socialLinks?.twitter || "",
          linkedin: project.socialLinks?.linkedin || "",
          discord: project.socialLinks?.discord || "",
        };

        setInitialValues(values);
      } catch (error) {
        console.error("Failed to load project", error);
        toast.error("Impossible de charger le projet");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement du projet…</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Projet introuvable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <ProjectFormHeader mode="edit" />
          <ProjectForm mode="edit" projectId={id} initialValues={initialValues} />
        </div>
      </main>
    </div>
  );
}
 