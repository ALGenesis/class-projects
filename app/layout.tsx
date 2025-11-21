import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="fr">
      <body
      >
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
