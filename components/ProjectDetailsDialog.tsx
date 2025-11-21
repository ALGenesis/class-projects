"use client";

import { Project } from "@/types/project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import { toast } from "sonner";

interface ProjectDetailsDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectDetailsDialog = ({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) => {
  const handleJoinProject = () => {
    toast.success("🎉 Vous avez rejoint le projet avec succès !", {
      description: `Vous faites maintenant partie de ${project.title}. L'équipe sera informée.`,
    });
    onOpenChange(false);
  };

  const isFull = project.currentMembers >= project.teamSize;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-3">
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
          <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-base pt-2 leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {project.images && project.images.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Images du projet</h4>
              <div className="grid grid-cols-2 gap-3">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden bg-accent/20 border border-border hover:border-primary/50 transition-colors"
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
              <h4 className="text-sm font-semibold text-foreground">À propos de ce projet</h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          )}

          <Separator />

          {project.goals && project.goals.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Objectifs du projet
              </h4>
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
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                Profils recherchés
              </h4>
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
              <h4 className="text-sm font-semibold text-foreground">Pré-requis</h4>
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
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Planning
              </h4>
              <p className="text-sm text-muted-foreground">{project.timeline}</p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Technologies et compétences
            </h4>
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
              <h4 className="text-sm font-semibold text-foreground">Restez en contact</h4>
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
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button
            onClick={handleJoinProject}
            disabled={isFull}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {isFull ? "Équipe complète" : "Rejoindre le projet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
