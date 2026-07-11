import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { personal } from "@/data/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(personal.portfolio),
  title: `${personal.name} | MERN Stack Developer`,
  description:
    "Nitin Kumar is a Computer Science student at Delhi Technological University, MERN stack developer, DSA enthusiast, and open source learner building internship-ready full-stack projects.",
  authors: [{ name: personal.name }],
  openGraph: {
    title: `${personal.name} | MERN Stack Developer`,
    description: "Developer portfolio featuring MERN projects, DSA practice, and open source learning.",
    type: "website",
    url: personal.portfolio,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
