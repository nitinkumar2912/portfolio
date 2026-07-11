import { ArrowUpRight, Github, Mail } from "lucide-react";

import { GithubContributions } from "@/components/github-contributions";
import { FadeIn } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  about,
  certifications,
  dsa,
  education,
  openSourceItems,
  personal,
  projects,
  skillGroups,
  socialLinks,
  techStack,
} from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="container py-12 sm:py-16">
      <FadeIn className="max-w-2xl">
        <p className="font-mono text-sm text-zinc-500">About</p>
        <div className="mt-5 flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white text-base font-semibold text-zinc-950">
            NK
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-100">{personal.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">{personal.role}</p>
          </div>
        </div>
        <h3 className="mt-8 text-2xl font-semibold tracking-normal text-zinc-100 sm:text-3xl">{about.title}</h3>
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-400">{about.intro}</p>
        <div className="mt-6 space-y-3">
          {about.points.map((point) => (
            <p key={point} className="border-l border-white/10 pl-4 text-sm leading-6 text-zinc-500">
              {point}
            </p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="container py-8 sm:py-10">
      <FadeIn>
        <h2 className="text-xl font-medium text-zinc-400">Projects</h2>
      </FadeIn>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.08}>
            <article className="card-hover h-full border border-dashed border-white/15 bg-white/[0.02] p-3">
              <a href={project.demo} target="_blank" rel="noreferrer" className="group block">
                <div className="grid aspect-[16/8.5] place-items-center bg-black">
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-100">{project.title}</p>
                    <p className="mx-auto mt-2 max-w-48 text-xs leading-4 text-zinc-500">{project.summary}</p>
                  </div>
                </div>
              </a>

              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 text-base font-semibold text-zinc-100">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-white text-zinc-950">
                    <Github className="h-3 w-3" />
                  </span>
                  <span className="truncate">{project.title}</span>
                </h3>
                <div className="flex shrink-0 items-center gap-3 text-sm text-zinc-400">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-zinc-100"
                  >
                    Demo
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-zinc-100"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">{project.summary}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-py container">
      <FadeIn>
        <h2 className="text-xl font-medium text-zinc-400">Skills</h2>
      </FadeIn>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <FadeIn key={group.title} delay={index * 0.04}>
              <Card className="card-hover h-full">
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-3 text-base font-semibold text-zinc-100">
                      <Icon className="h-4 w-4 text-zinc-500" />
                      {group.title}
                    </h3>
                    <span className="font-mono text-xs text-zinc-600">{String(group.items.length).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} className="inline-flex items-center gap-1.5">
                        <Icon className="h-3 w-3 text-zinc-500" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

export function TechStackSection() {
  return (
    <section id="tech-stack" className="section-py container">
      <SectionHeading eyebrow="Tech Stack" title="Tools I use to ship" />
      <FadeIn className="mt-8 flex flex-wrap gap-2">
        {techStack.map((item) => (
          <Badge key={item} className="px-3 py-1.5 font-mono text-sm">
            {item}
          </Badge>
        ))}
      </FadeIn>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="section-py container">
      <SectionHeading eyebrow="Education" title="Computer science foundation" />
      <div className="mt-8 grid gap-4">
        {education.map((item) => {
          const Icon = item.icon;
          return (
            <FadeIn key={item.school}>
              <Card className="card-hover">
                <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100">{item.school}</h3>
                    <p className="mt-2 text-zinc-500">{item.program}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.focus.map((focus) => (
                        <Badge key={focus}>{focus}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

export function OpenSourceAndDsaSection() {
  return (
    <section id="open-source" className="container py-12 sm:py-16">
      <SectionHeading
        eyebrow="Open Source + DSA"
        title="Practice that compounds"
        copy="Small daily reps across GitHub, core CS, and DSA."
      />
      <div className="mt-7 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {openSourceItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <Card className="card-hover">
                <CardContent className="p-4">
                  <p className="font-mono text-xs text-zinc-600">Open Source 0{index + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-zinc-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.copy}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <Card className="h-full">
            <CardContent className="p-4 sm:p-5">
              <p className="font-mono text-sm text-zinc-500">Problem Solving Progress</p>
              <h3 className="mt-3 text-3xl font-semibold text-zinc-100">
                {dsa.total} <span className="text-lg text-zinc-500">{dsa.label}</span>
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{dsa.focus}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {dsa.cards.map((card) => (
                  <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                    <h4 className="text-sm font-semibold text-zinc-100">{card.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{card.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {dsa.topics.map((topic) => (
                  <Badge key={topic}>{topic}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}

export function GithubContributionsSection() {
  return (
    <section id="github-contributions" className="section-py container">
      <FadeIn>
        <h2 className="text-xl font-medium text-zinc-400">GitHub Contributions</h2>
      </FadeIn>
      <FadeIn>
        <GithubContributions />
      </FadeIn>
    </section>
  );
}

export function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="section-py container">
      <SectionHeading eyebrow="Certifications" title="Verified learning" />
      <FadeIn className="mt-8 flex flex-wrap gap-2">
        {certifications.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </FadeIn>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section-py container">
      <FadeIn>
        <div className="corner-frame rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-center sm:p-10">
          <p className="font-mono text-sm text-zinc-500">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-zinc-100">Let us talk internships and engineering work</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-7 text-zinc-400">
            I am open to software engineering internships, MERN stack opportunities, project feedback, and open source collaboration.
          </p>
          <div className="mt-7 flex justify-center">
            <Button asChild>
              <a href={`mailto:${personal.email}?subject=Software%20Engineering%20Internship%20Opportunity`}>
                <Mail className="h-4 w-4" />
                Email Me
              </a>
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <FadeIn key={link.label} delay={index * 0.05}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="card-hover block rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
                <span className="flex items-center gap-3 text-zinc-100">
                  <Icon className="h-4 w-4 text-zinc-500" />
                  {link.label}
                </span>
                <span className="mt-2 block break-words text-sm text-zinc-500">{link.value}</span>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
