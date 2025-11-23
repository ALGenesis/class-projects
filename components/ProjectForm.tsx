"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Project, ProjectCategory } from "@/types/project";
import { toast } from "sonner";
import { Plus, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categories: ProjectCategory[] = [
  "Web Development",
  "Mobile App",
  "Design",
  "Marketing",
  "AI/ML",
  "Other",
];

const defaultFormData = {
  title: "",
  description: "",
  longDescription: "",
  category: "" as ProjectCategory,
  teamSize: "4",
  tags: "",
  timeline: "",
  goals: [""],
  requirements: [""],
  lookingFor: [""],
  images: [""],
  website: "",
  github: "",
  twitter: "",
  linkedin: "",
  discord: "",
};

export type ProjectFormValues = typeof defaultFormData;

interface ProjectFormProps {
  mode: "create" | "edit";
  /**
   * Pour le mode "edit", les données initiales doivent être fournies
   * (titre, description, etc.). Pour le mode "create", laisser undefined
   * pour utiliser les valeurs par défaut.
   */
  initialValues?: ProjectFormValues;
  /**
   * ID du projet pour le mode "edit" (utilisé dans l'URL PATCH et la redirection).
   */
  projectId?: string;
}

export function ProjectForm({ mode, initialValues, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProjectFormValues>(
    initialValues ?? defaultFormData
  );

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (mode === "edit" && !projectId) {
      toast.error("ID de projet manquant");
      return;
    }

    const socialLinks: Project["socialLinks"] = {};
    if (formData.website) socialLinks.website = formData.website;
    if (formData.github) socialLinks.github = formData.github;
    if (formData.twitter) socialLinks.twitter = formData.twitter;
    if (formData.linkedin) socialLinks.linkedin = formData.linkedin;
    if (formData.discord) socialLinks.discord = formData.discord;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload: Partial<Project> & {
      tags: string[];
      goals: string[];
      requirements: string[];
      lookingFor: string[];
      images: string[];
      socialLinks?: Project["socialLinks"];
      teamSize: number;
    } = {
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription || undefined,
      category: formData.category,
      teamSize: parseInt(formData.teamSize),
      timeline: formData.timeline || undefined,
      tags: tagsArray,
      goals: formData.goals.filter((g) => g.trim()),
      requirements: formData.requirements.filter((r) => r.trim()),
      lookingFor: formData.lookingFor.filter((l) => l.trim()),
      images: formData.images.filter((img) => img.trim()),
      socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
    };

    try {
      setSaving(true);

      if (mode === "create") {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const message = await res.text();
          toast.error("Échec de la création du projet", {
            description: message || "Erreur inattendue du serveur",
          });
          return;
        }

        toast.success("🎉 Projet créé avec succès !", {
          description: "Votre projet est maintenant en ligne et visible par les autres.",
        });

        router.push("/projects");
      } else {
        const res = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const message = await res.text();
          toast.error("Échec de la mise à jour du projet", {
            description: message || "Erreur inattendue du serveur",
          });
          return;
        }

        toast.success("Projet mis à jour avec succès !", {
          description: "Les modifications ont été enregistrées.",
        });

        router.push(`/projects/${projectId}`);
      }
    } catch (error) {
      console.error("Error saving project", error);
      toast.error(
        mode === "create"
          ? "Échec de la création du projet"
          : "Échec de la mise à jour du projet",
        {
          description: "Veuillez réessayer plus tard.",
        }
      );
    } finally {
      setSaving(false);
    }
  };

  const handleArrayFieldChange = (
    field: "goals" | "requirements" | "lookingFor" | "images",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: "goals" | "requirements" | "lookingFor" | "images") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (
    field: "goals" | "requirements" | "lookingFor" | "images",
    index: number
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [""] });
  };

  const handleCancel = () => {
    if (mode === "edit" && projectId) {
      router.push(`/projects/${projectId}`);
    } else {
      router.push("/projects");
    }
  };

  const isEdit = mode === "edit";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du projet</CardTitle>
        <CardDescription>
          {isEdit
            ? "Modifiez les informations de votre projet pour qu'elles soient toujours à jour"
            : "Fournissez des informations détaillées pour attirer les bons membres d'équipe"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Informations de base
            </h3>

            <div className="space-y-2">
              <Label htmlFor="title">Titre du projet *</Label>
              <Input
                id="title"
                placeholder="Ex : Gestionnaire de tâches avec IA"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Brève description *</Label>
              <Textarea
                id="description"
                placeholder="Un aperçu rapide de votre projet (2-3 phrases)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDescription">Description détaillée</Label>
              <Textarea
                id="longDescription"
                placeholder="Décrivez en détail votre projet, son objectif, sa cible et ce qui le rend unique..."
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData({ ...formData, longDescription: e.target.value })
                }
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as ProjectCategory })
                  }
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">Taille de l'équipe</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="2"
                  max="20"
                  value={formData.teamSize}
                  onChange={(e) =>
                    setFormData({ ...formData, teamSize: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Images du projet
            </h3>
            <p className="text-sm text-muted-foreground">
              Ajoutez des URLs d'images pour présenter votre projet
            </p>

            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://exemple.com/image.jpg"
                  value={image}
                  onChange={(e) =>
                    handleArrayFieldChange("images", index, e.target.value)
                  }
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField("images", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("images")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une image
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Objectifs du projet</h3>

            {formData.goals.map((goal, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Ex : Lancer un MVP en 3 mois"
                  value={goal}
                  onChange={(e) =>
                    handleArrayFieldChange("goals", index, e.target.value)
                  }
                />
                {formData.goals.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField("goals", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("goals")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un objectif
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Profils recherchés
            </h3>
            <p className="text-sm text-muted-foreground">
              Quels rôles ou compétences recherchez-vous ?
            </p>

            {formData.lookingFor.map((role, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Ex : Développeur Frontend"
                  value={role}
                  onChange={(e) =>
                    handleArrayFieldChange("lookingFor", index, e.target.value)
                  }
                />

                {formData.lookingFor.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField("lookingFor", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("lookingFor")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un rôle
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Pré-requis
            </h3>

            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Ex : Expérience avec React et TypeScript"
                  value={req}
                  onChange={(e) =>
                    handleArrayFieldChange("requirements", index, e.target.value)
                  }
                />
                {formData.requirements.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayField("requirements", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("requirements")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un pré-requis
            </Button>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Informations complémentaires
            </h3>

            <div className="space-y-2">
              <Label htmlFor="timeline">Planning / Durée</Label>
              <Input
                id="timeline"
                placeholder="Ex : 3-6 mois"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({ ...formData, timeline: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags / Technologies</Label>
              <Input
                id="tags"
                placeholder="React, TypeScript, Design (séparés par des virgules)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Liens sociaux
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  placeholder="https://votreprojet.com"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/utilisateur/projet"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/utilisateur"
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/utilisateur"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord">Discord</Label>
                <Input
                  id="discord"
                  placeholder="https://discord.gg/invitation"
                  value={formData.discord}
                  onChange={(e) =>
                    setFormData({ ...formData, discord: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving
                ? isEdit
                  ? "Enregistrement..."
                  : "Création..."
                : isEdit
                  ? "Enregistrer les modifications"
                  : "Créer le projet"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={saving}
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProjectFormHeader({ mode }: { mode: "create" | "edit" }) {
  const isEdit = mode === "edit";

  return (
    <div className="text-center space-y-4 mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/20">
        <Sparkles className="h-4 w-4 text-accent-foreground" />
        <span className="text-sm font-medium text-accent-foreground">
          {isEdit ? "Mettez à jour votre projet" : "Commencez votre aventure"}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground">
        {isEdit ? (
          <>
            Modifier votre <span className="text-primary">projet</span>
          </>
        ) : (
          <>
            Créez votre <span className="text-primary">projet</span>
          </>
        )}
      </h1>
      <p className="text-lg text-muted-foreground">
        {isEdit
          ? "Ajustez les informations de votre projet à tout moment"
          : "Partagez votre vision et construisez une équipe pour la réaliser"}
      </p>
    </div>
  );
}
