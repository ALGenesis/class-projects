"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>
                {project.currentMembers}/{project.teamSize}
              </span>
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          <Button size="sm">
            Voir les détails
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
