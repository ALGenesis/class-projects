"use client";

import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between flex-wrap gap-8 mb-8">
          <div className="space-y-4 max-w-lg">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                ProjectHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Là où les grandes idées rencontrent des équipes talentueuses. Construisez quelque chose d'incroyable
              ensemble.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Produit</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Explorer les projets
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Créer un projet
                </Link>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Comment ça marche
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ressources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Restez en contact</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-accent-foreground" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-accent-foreground" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-accent-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2025 Class Projects. Par Amédée G. LOUBAKI.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
