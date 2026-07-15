import { FileText, Github, Mail } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { ProfileLogo } from "@/components/profile-logo";
import { personal } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="about" className="container pt-14 pb-8 sm:pt-20 sm:pb-10">
      <FadeIn className="max-w-2xl">
        <div className="flex items-center gap-4">
          <ProfileLogo className="h-14 w-14 bg-white" priority />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">{personal.name}</h1>
            <p className="mt-1 text-zinc-500">{personal.role}</p>
          </div>
        </div>

        {/* Availability badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-400">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Open to Opportunities
        </div>

        <div className="mt-8 space-y-6 text-base leading-8 text-zinc-400">
          <p>I am Nitin Kumar, a MERN stack developer focused on building clean and useful web applications.</p>
          <p>Education: Computer Science student at Delhi Technological University.</p>
          <p>
            I work with React, Node.js, Express, and MongoDB. I like simple interfaces, readable code, and projects
            that solve real problems.
          </p>
          <p>
            You can find my work on{" "}
            <a className="font-medium text-zinc-100 transition hover:text-white" href={personal.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            or reach out via{" "}
            <a className="font-medium text-zinc-100 transition hover:text-white" href={`mailto:${personal.email}`} aria-label="Send email to Nitin Kumar">
              email
            </a>
            .
          </p>
        </div>

        <div className="mt-7 flex items-center gap-4 text-sm text-zinc-500">
          <a className="inline-flex items-center gap-2 transition hover:text-zinc-100" href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="Visit Nitin Kumar's GitHub profile">
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a className="inline-flex items-center gap-2 transition hover:text-zinc-100" href={`mailto:${personal.email}`} aria-label="Send email to Nitin Kumar">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a className="inline-flex items-center gap-2 transition hover:text-zinc-100" href={personal.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume">
            <FileText className="h-4 w-4" />
            Resume
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
