import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { ParticleField } from "@/components/particle-field";
import { personal } from "@/data/portfolio";

const description =
  "Nitin Kumar is a Computer Science student at Delhi Technological University, MERN stack developer, DSA enthusiast, and open source learner building internship-ready full-stack projects.";

export const metadata: Metadata = {
  metadataBase: new URL(personal.portfolio),
  title: `${personal.name} | MERN Stack Developer`,
  description,
  authors: [{ name: personal.name }],
  keywords: [
    "Nitin Kumar",
    "MERN stack developer",
    "portfolio",
    "React developer",
    "Node.js",
    "full stack developer",
    "Delhi Technological University",
    "DTU",
    "software engineer",
    "web developer",
    "MongoDB",
    "Express.js",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${personal.name} | MERN Stack Developer`,
    description:
      "Developer portfolio featuring MERN projects, DSA practice, and open source learning.",
    type: "website",
    url: personal.portfolio,
    siteName: `${personal.name} Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${personal.name} | MERN Stack Developer`,
    description:
      "Developer portfolio featuring MERN projects, DSA practice, and open source learning.",
  },
  alternates: {
    canonical: personal.portfolio,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: personal.portfolio,
  email: personal.email,
  jobTitle: personal.role,
  sameAs: [personal.github, personal.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Delhi Technological University",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ParticleField />
        <div className="noise" aria-hidden="true" />
        {/* Floating ambient orbs */}
        <div aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        {children}
      </body>
    </html>
  );
}
