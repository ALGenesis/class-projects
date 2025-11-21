"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Project, ProjectCategory } from "@/types/project";
import { toast } from "sonner";
import { Sparkles, Plus, X } from "lucide-react";

const categories: ProjectCategory[] = [
  "Web Development",
  "Mobile App",
  "Design",
  "Marketing",
  "AI/ML",
  "Other",
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "" as ProjectCategory,
    teamSize: "4",
    tags: "",
    creator: "",
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
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.creator) {
      toast.error("Please fill in all required fields");
      return;
    }

    const socialLinks: Project["socialLinks"] = {};
    if (formData.website) socialLinks.website = formData.website;
    if (formData.github) socialLinks.github = formData.github;
    if (formData.twitter) socialLinks.twitter = formData.twitter;
    if (formData.linkedin) socialLinks.linkedin = formData.linkedin;
    if (formData.discord) socialLinks.discord = formData.discord;

    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription || undefined,
      category: formData.category,
      teamSize: parseInt(formData.teamSize),
      currentMembers: 1,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
      creator: formData.creator,
      timeline: formData.timeline || undefined,
      goals: formData.goals.filter((g) => g.trim()),
      requirements: formData.requirements.filter((r) => r.trim()),
      lookingFor: formData.lookingFor.filter((l) => l.trim()),
      images: formData.images.filter((img) => img.trim()),
      socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
    };

    const existingProjects = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("projects")) || "[]"
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("projects", JSON.stringify([newProject, ...existingProjects]));
    }

    toast.success("🎉 Project created successfully!", {
      description: "Your project is now live and visible to others.",
    });

    router.push("/projects");
  };

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/20">
              <Sparkles className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                Start Your Journey
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Create Your <span className="text-primary">Project</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your vision and build a team to make it happen
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide detailed information to attract the right team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Basic Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., AI-Powered Task Manager"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="A brief overview of your project (2-3 sentences)"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Detailed Description</Label>
                    <Textarea
                      id="longDescription"
                      placeholder="Provide a comprehensive description of your project, its purpose, target audience, and what makes it unique..."
                      value={formData.longDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, longDescription: e.target.value })
                      }
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value as ProjectCategory })
                        }
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
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
                      <Label htmlFor="teamSize">Team Size</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="creator">Your Name *</Label>
                    <Input
                      id="creator"
                      placeholder="John Doe"
                      value={formData.creator}
                      onChange={(e) =>
                        setFormData({ ...formData, creator: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Project Images
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add image URLs to showcase your project
                  </p>

                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="https://example.com/image.jpg"
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
                    Add Image
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Project Goals</h3>

                  {formData.goals.map((goal, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Launch MVP within 3 months"
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
                    Add Goal
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Looking For
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    What roles or skills are you looking for?
                  </p>

                  {formData.lookingFor.map((role, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Frontend Developer"
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
                    Add Role
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Requirements
                  </h3>

                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Experience with React and TypeScript"
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
                    Add Requirement
                  </Button>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3-6 months"
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
                      placeholder="React, TypeScript, Design (comma-separated)"
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
                    Social Links
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://yourproject.com"
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
                        placeholder="https://github.com/username/repo"
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
                        placeholder="https://twitter.com/username"
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
                        placeholder="https://linkedin.com/in/username"
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
                        placeholder="https://discord.gg/invite"
                        value={formData.discord}
                        onChange={(e) =>
                          setFormData({ ...formData, discord: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="flex-1">
                    Create Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/projects")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
