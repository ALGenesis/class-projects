"use client";

import { ProjectForm, ProjectFormHeader } from "@/components/ProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <ProjectFormHeader mode="create" />
          <ProjectForm mode="create" />
        </div>
      </main>
    </div>
  );
}

