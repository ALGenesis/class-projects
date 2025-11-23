export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  currentMembers: number;
  tags: string[];
  createdAt: string;
  creator: string;
  creatorId?: string;
   memberIds?: string[];
  longDescription?: string;
  images?: string[];
  goals?: string[];
  requirements?: string[];
  socialLinks?: {
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
  };
  timeline?: string;
  lookingFor?: string[];
}

export type ProjectCategory =
  | "Web Development"
  | "Mobile App"
  | "Design"
  | "Marketing"
  | "AI/ML"
  | "Other";
