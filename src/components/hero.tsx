import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="about" className="container pt-20 pb-12 sm:pt-28 sm:pb-16">
      <FadeIn>
        <div className="inline-flex max-w-full items-center gap-2 text-sm font-medium text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          Open to internships and MERN projects
        </div>

        <h1 className="mt-10 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-zinc-100 sm:text-5xl lg:text-6xl">
          I build clean MERN applications.{" "}
          <span className="text-zinc-500">
            Practical interfaces, reliable APIs, and projects that solve real problems.
          </span>
        </h1>

        <div className="mt-8 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
          <p>
            I&apos;m Nitin Kumar, a Computer Science student at Delhi Technological University focused on React,
            Node.js, Express, MongoDB, and internship-ready full-stack products.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Button asChild className="rounded-sm px-5">
            <a href="#projects">
              See selected work
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>

          <div className="flex items-center gap-4 text-zinc-500">
            <a className="transition hover:text-zinc-100" href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="Visit Nitin Kumar's GitHub profile">
              <Github className="h-5 w-5" />
            </a>
            <a className="transition hover:text-zinc-100" href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit Nitin Kumar's LinkedIn profile">
              <Linkedin className="h-5 w-5" />
            </a>
            <a className="transition hover:text-zinc-100" href={`mailto:${personal.email}`} aria-label="Send email to Nitin Kumar">
              <Mail className="h-5 w-5" />
            </a>
            <a className="transition hover:text-zinc-100" href={personal.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume">
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
