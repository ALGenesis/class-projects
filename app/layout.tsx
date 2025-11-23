import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import {Footer} from "@/components/Footer"


export const metadata: Metadata = {
  title: "Class Projects",
  description: "Créer une equipe de reve autour de votre projet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className="">
          <Navbar />

          {children}
          <Toaster richColors position="top-center" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
