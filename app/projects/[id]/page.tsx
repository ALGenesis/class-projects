"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const id = params?.id as string | undefined;
    if (!id) {
      setLoading(false);
      return;
    }

  

    const loadProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data: Project = await res.json();
          setProject(data);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Failed to load project", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params]);

  const handleUpdateProject = () => {
    if (!project) return;
    router.push(`/update/${project.id}`);
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 204) {
        const message = await res.text();
        toast.error("Impossible de supprimer le projet", {
          description: message || "Erreur inattendue du serveur",
        });
        return;
      }

      toast.success("Projet supprimé avec succès", {
        description: "Le projet a été retiré de la plateforme.",
      });
      setDeleteDialogOpen(false);
      router.push("/projects");
    } catch (error) {
      console.error("Failed to delete project", error);
      toast.error("Impossible de supprimer le projet", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleJoinProject = () => {
    if (!project) return;
    toast.success("🎉 Vous avez rejoint le projet avec succès !", {
      description: `Vous faites maintenant partie de ${project.title}. L'équipe sera informée.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du projet…</p>
        </div>
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
  const isOwner = project.creatorId && user?.id === project.creatorId;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2"
              onClick={() => router.push('/projects')}
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
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleUpdateProject}
                >
                  Mettre à jour
                </Button>
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <Button
                    variant="destructive"
                    className="gap-2"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Supprimer
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Supprimer ce projet ?</DialogTitle>
                      <DialogDescription>
                        Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce projet ?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleting}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteProject}
                        className="gap-2"
                        disabled={deleting}
                      >
                        {deleting ? "Suppression..." : "Confirmer la suppression"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Button
                onClick={handleJoinProject}
                disabled={isFull}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                {isFull ? "Équipe complète" : "Rejoindre le projet"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
