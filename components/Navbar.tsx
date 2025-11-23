"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export const Navbar = () => {

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { user } = useUser();

  const navLinks = [
    {name: 'Acceuil', href : '/'},
    {name: 'Explorer les projets', href : '/projects'},
    {name: 'Mon espace', href : '/my-space'},
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className=" hidden md:flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Class Projects
            </span>
          </Link>

          <SignedIn>
            <nav className="flex gap-6 font-medium">

              {navLinks.map( (link) =>{
                  return (
                  <Link 
                  key={link.name} 
                  className={`hover:text-primary transition-all duration-500 ease-in  `}
                  href={link.href}>
                  {link.name}
                  </Link>)
              })}

            </nav>
          </SignedIn>

          <SignedIn>
            <div className="flex items-center gap-3">
            
            <Link href="/create">
              <Button size="sm" className="text-sm font-medium">
                Créer un projet
              </Button>
            </Link>

            <UserButton/> 
          </div>
         
          </SignedIn>


          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton
              mode="modal"
              >
                <Button
                variant="outline"
                size="sm"
                className="text-sm font-medium"
              >
                S'inscrire 
              </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button size="sm" className="text-sm font-medium">
                Se connecter
                </Button>
              </SignUpButton>
          </div>
          </SignedOut>          

        </div>

        {/* Mobile navbar */}
        <div id="mobile-navbar" className="flex items-center justify-between md:hidden">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Class Projects
            </span>
          </Link>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2 rounded-md border border-border bg-background/80 hover:bg-accent transition-colors"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Panneau coulissant mobile */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 z-50 w-64 h-screen bg-background backdrop-blur-sm border-l border-border transform transition-transform duration-300 ease-in-out ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-base font-semibold">Menu</span>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-4 flex flex-col justify-between h-[90%]">
            <SignedIn>
              <nav className="flex flex-col gap-3 font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsMobileOpen(false)}
                    className="py-2 px-1 rounded-sm hover:bg-primary/20 w-full text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/create" onClick={() => setIsMobileOpen(false)}>
                  <Button size="sm" className="text-sm font-medium w-full justify-center">
                    Créer un projet
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <UserButton />
                  {user && (
                    <div className="flex flex-col text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {user.fullName || user.firstName || user.username || "Utilisateur"}
                      </span>
                      {user.primaryEmailAddress?.emailAddress && (
                        <span>{user.primaryEmailAddress.emailAddress}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium w-full justify-center"
                  >
                    S'inscrire
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button size="sm" className="text-sm font-medium w-full justify-center">
                    Se connecter
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>

      </div>
    </nav>
  );
};
