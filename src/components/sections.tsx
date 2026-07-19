import { ArrowUpRight, Github } from "lucide-react";

import { ContactPanel } from "@/components/contact-panel";
import { GithubContributions } from "@/components/github-contributions";
import { FadeIn } from "@/components/motion";
import { ProfileLogo } from "@/components/profile-logo";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
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
  techLogos,
} from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="container py-8 sm:py-10">
      <FadeIn className="max-w-2xl">
        <p className="font-mono text-sm text-zinc-500">About</p>
        <div className="mt-5 flex items-center gap-4">
          <ProfileLogo className="h-14 w-14 bg-white" />
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
    <section id="projects" className="container py-6 sm:py-8">
      <FadeIn>
        <h2 className="text-xl font-medium text-zinc-400">Projects</h2>
      </FadeIn>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.08}>
            <article className="card-hover h-full border border-dashed border-white/15 bg-white/[0.02] p-3">
              <a href={project.demo || project.github} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${project.title} ${project.demo ? "live demo" : "source code"}`}>
                <div className="relative grid aspect-[16/8.5] place-items-center overflow-hidden bg-black">
                  {project.thumbnail ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} project thumbnail`}
                        className="h-full w-full object-cover object-top opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden="true" />
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-medium text-zinc-100">{project.title}</p>
                      <p className="mx-auto mt-2 max-w-48 text-xs leading-4 text-zinc-500">{project.summary}</p>
                    </div>
                  )}
                  {!project.demo && (
                    <span className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
                      In active development
                    </span>
                  )}
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
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition hover:text-zinc-100"
                      aria-label={`${project.title} live demo`}
                    >
                      Demo
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-emerald-400/70 text-xs font-medium">In Progress</span>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-zinc-100"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </div>
              </div>

              <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-500">
                <p>
                  <span className="font-semibold text-zinc-100">The problem.</span>{" "}
                  {project.problem}
                </p>
                <p>
                  <span className="font-semibold text-zinc-100">What I built.</span>{" "}
                  {project.built}
                </p>
              </div>

              {/* Tech stack badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-badge rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
                  <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label={`${group.title} skills`}>
                    {group.items.map((item) => (
                      <Badge key={item} className="inline-flex items-center gap-1.5" role="listitem">
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

export function TechLogosRow() {
  const marqueeLogos = [...techLogos, ...techLogos];

  return (
    <section className="container py-4 sm:py-5">
      <FadeIn>
        <div className="tech-marquee overflow-hidden">
          <div className="tech-marquee-track flex w-max items-center gap-4">
            {marqueeLogos.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="group relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-zinc-800/80 transition hover:z-20 hover:bg-zinc-700/80 sm:h-14 sm:w-14"
                aria-label={tech.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={30}
                  height={30}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  loading="lazy"
                />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-zinc-950 px-2 py-0.5 text-[10px] font-medium text-zinc-300 opacity-0 shadow-lg shadow-black/30 transition group-hover:opacity-100">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
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
    <section id="open-source" className="container py-8 sm:py-10">
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
    <section id="contact" className="container py-4 sm:py-7">
      <FadeIn>
        <div className="contact-panel corner-frame relative mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-4 shadow-glow sm:rounded-2xl sm:px-6 sm:py-6">
          <span className="contact-line contact-line-1" aria-hidden="true" />
          <span className="contact-line contact-line-2" aria-hidden="true" />
          <span className="contact-line contact-line-3" aria-hidden="true" />
          <ContactPanel />
        </div>
      </FadeIn>
    </section>
  );
}
