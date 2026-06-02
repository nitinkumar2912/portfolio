import React, { useEffect, useRef } from "react";

const personal = {
  name: "Nitin Kumar",
  email: "nitinkumar29122501@gmail.com",
  portfolio: "https://nitinkumar2912.github.io/portfolio/",
  github: "https://github.com/nitinkumar2912",
  linkedin: "https://www.linkedin.com/in/nitin-kumar-30790336a/",
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#open-source" },
  { label: "DSA", href: "#dsa" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["C++", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React", "Vite", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MongoDB Atlas"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Render", "Vercel"],
  },
  {
    title: "Core CS",
    items: ["DBMS", "OOP", "Operating Systems", "Computer Networks"],
  },
  {
    title: "DSA",
    items: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Trees",
      "Graphs",
      "Binary Search",
      "Sliding Window",
      "Dynamic Programming",
    ],
  },
];

const projects = [
  {
    title: "JobTrackr",
    label: "Featured MERN Project",
    description:
      "A production-ready MERN job application tracker built for managing internship and placement pipelines with authentication, analytics, notes, reminders, and deployment-ready architecture.",
    features: [
      "JWT Authentication",
      "MongoDB Atlas",
      "Analytics Dashboard",
      "Kanban Board",
      "Interview Notes",
      "Recruiter Tracking",
      "Follow-up Reminders",
      "Activity Timeline",
      "Render Deployment",
      "Vercel Deployment",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB Atlas", "JWT", "Render", "Vercel"],
    github: "https://github.com/nitinkumar2912/JobTracker",
    demo: "https://job-tracker-client-murex.vercel.app",
    featured: true,
  },
  {
    title: "TopTodo",
    label: "JavaScript Productivity App",
    description:
      "A modular task management application focused on project organization, due date scheduling, persistent task data, and a clean component-based interface.",
    features: [
      "Project Organization",
      "Due Date Scheduling",
      "Local Storage Persistence",
      "Webpack Architecture",
      "Reusable Components",
      "Clean UI",
    ],
    stack: ["JavaScript", "Webpack", "date-fns", "Local Storage"],
    github: "https://github.com/nitinkumar2912/TopTodo",
    demo: "https://nitinkumar2912.github.io/TopTodo/",
    featured: false,
  },
];

const dsaTopics = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Binary Search",
  "Graphs",
  "Dynamic Programming",
];

const dsaPracticeCards = [
  {
    title: "Problem Solving",
    content:
      "Arrays, Strings, Linked Lists, Trees, Graphs, Binary Search, and Sliding Window patterns.",
  },
  {
    title: "Approach",
    content:
      "Optimized solutions with focus on time complexity, space complexity, and edge cases.",
  },
  {
    title: "Current Focus",
    content:
      "Dynamic Programming, Graphs, and advanced problem-solving patterns.",
  },
];

const floatingTech = ["React", "Node", "MongoDB", "JWT", "DSA", "GitHub"];

const workflowHighlights = [
  {
    label: "Full Stack",
    value: "MERN Applications",
    detail: "React interfaces connected to Express APIs, MongoDB Atlas, and auth flows.",
  },
  {
    label: "Internship Prep",
    value: "Projects + DSA",
    detail: "Real deployments paired with consistent problem-solving practice.",
  },
  {
    label: "Engineering Habits",
    value: "Clean Delivery",
    detail: "Readable code, version control, API testing, and production-minded iteration.",
  },
];

const aboutPoints = [
  "Computer Science student at Delhi Technological University focused on software engineering internships and practical full-stack development.",
  "Building MERN stack applications with React, Node.js, Express.js, MongoDB Atlas, REST APIs, JWT authentication, and deployment workflows.",
  "Strengthening core computer science through DBMS, OOP, operating systems, computer networks, and structured DSA practice.",
  "Learning open source collaboration by reading larger codebases, understanding issues, and preparing for meaningful pull request contributions.",
];

const openSourceItems = [
  {
    title: "Workflow Foundations",
    copy: "Learning how maintainers structure repositories, review pull requests, document issues, and keep collaboration traceable on GitHub.",
  },
  {
    title: "Large Codebase Reading",
    copy: "Practicing how to navigate unfamiliar modules, trace data flow, understand ownership boundaries, and make focused changes.",
  },
  {
    title: "GSoC Preparation",
    copy: "Building the habits needed for real-world programs: issue tracking, proposal thinking, contribution history, and communication clarity.",
  },
];

function usePointerParallax() {
  const targetRef = useRef(null);

  useEffect(() => {
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateParallax = () => {
      frameId = 0;
      const target = targetRef.current;
      if (!target) return;

      target.style.setProperty("--mx", `${(-pointerY * 8).toFixed(2)}deg`);
      target.style.setProperty("--my", `${(pointerX * 9).toFixed(2)}deg`);
      target.style.setProperty("--tx", `${(pointerX * 12).toFixed(2)}px`);
      target.style.setProperty("--ty", `${(pointerY * 12).toFixed(2)}px`);
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;

      if (!frameId) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return targetRef;
}

function useScrollReveal() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${Math.min(100, Math.max(0, nextProgress)) / 100}`,
      );
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);
}

function AmbientStage() {
  return (
    <div className="ambient-stage" aria-hidden="true">
      <span className="ambient-beam ambient-beam-one" />
      <span className="ambient-beam ambient-beam-two" />
      <span className="ambient-ring ambient-ring-one" />
      <span className="ambient-ring ambient-ring-two" />
      <span className="depth-particle depth-particle-one" />
      <span className="depth-particle depth-particle-two" />
      <span className="depth-particle depth-particle-three" />
      <span className="depth-particle depth-particle-four" />
    </div>
  );
}

function ScrollProgress() {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span />
    </div>
  );
}

function CodeCube() {
  return (
    <div className="cube-wrap" aria-hidden="true">
      <div className="cube">
        <span className="cube-face cube-front">UI</span>
        <span className="cube-face cube-back">API</span>
        <span className="cube-face cube-right">DB</span>
        <span className="cube-face cube-left">DSA</span>
        <span className="cube-face cube-top">JS</span>
        <span className="cube-face cube-bottom">CS</span>
      </div>
    </div>
  );
}

function HeroVisual() {
  const parallaxRef = usePointerParallax();

  return (
    <div ref={parallaxRef} className="hero-visual animate-fade-up [animation-delay:120ms]">
      <div className="hologram-orbit">
        {floatingTech.map((item, index) => (
          <span
            key={item}
            className="orbit-chip"
            style={{ "--slot": index, "--delay": `${index * -1.35}s` }}
          >
            {item}
          </span>
        ))}
      </div>

      <CodeCube />

      <div className="code-terminal">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-slate-500">portfolio.jsx</span>
        </div>
        <pre className="overflow-hidden whitespace-pre-wrap text-sm leading-7 text-slate-300">
          <code>{`const nitin = {
  education: "CS Student, DTU",
  focus: ["MERN Stack", "DSA", "Open Source"],
  building: "Full-stack applications",
  internshipReady: true
};`}</code>
        </pre>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/78 backdrop-blur-xl">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3" aria-label="Nitin Kumar home">
          <span className="logo-mark grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-slate-950">
            NK
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">Nitin Kumar</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

function SectionHeading({ kicker, title, copy }) {
  return (
    <div className="reveal-on-scroll">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="section-shell grid min-h-[calc(100vh-4rem)] items-center py-20">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            Computer Science Student at DTU
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            MERN stack developer building
            <span className="block accent-text">full-stack applications.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-slate-100 sm:text-xl">
            Nitin Kumar turns product ideas into clean React interfaces, practical Express APIs, and deployment-ready MERN projects.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I am preparing for software engineering internships through real projects, consistent DSA practice, and open source learning.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="primary-button">View Projects</a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="secondary-button">GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="secondary-button">LinkedIn</a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function WorkflowStrip() {
  return (
    <section className="section-shell py-8" aria-label="Professional highlights">
      <div className="freelance-strip reveal-on-scroll">
        {workflowHighlights.map((item, index) => (
          <article key={item.label} className="workflow-card" style={{ "--delay": `${index * 110}ms` }}>
            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span>{item.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="About"
          title="A CS student building like an engineer"
          copy="I focus on strong fundamentals, practical implementation, and project work that maps directly to software engineering internship expectations."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {aboutPoints.map((point, index) => (
            <div
              key={point}
              className="reveal-on-scroll tilt-card glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"
              style={{ "--delay": `${index * 80}ms` }}
            >
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-sm font-bold text-cyan-200">
                0{index + 1}
              </span>
              <p className="leading-7 text-slate-300">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Skills"
          title="Technical toolkit"
          copy="A focused stack for building web applications, plus the core computer science and DSA topics that support long-term engineering growth."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              className="reveal-on-scroll tilt-card skill-card glass-panel rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.075] hover:shadow-glow"
              style={{ "--delay": `${index * 70}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-cyan-200">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Projects"
          title="Selected engineering work"
          copy="Two focused projects that show full-stack execution, product thinking, modular JavaScript, deployment, and clean presentation for recruiter review."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`reveal-on-scroll project-card glass-panel group flex flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 ${
                project.featured ? "featured-project min-h-[34rem]" : "min-h-[30rem]"
              }`}
            >
              <div className="project-card-shine" aria-hidden="true" />
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      {project.label}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold text-white">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                    {project.featured ? "Featured" : "Project"}
                  </span>
                </div>

                <p className="mt-5 text-base leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Features</h4>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <span key={feature} className="feature-pill">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Tech Stack</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="secondary-button">
                    GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="primary-button">
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section id="open-source" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Open Source"
          title="Open Source Journey"
          copy="I am learning how professional software teams collaborate in public: from reading real codebases to understanding pull requests, issue tracking, and contribution etiquette."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {openSourceItems.map((item, index) => (
            <article
              key={item.title}
              className="reveal-on-scroll tilt-card glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/35"
              style={{ "--delay": `${index * 90}ms` }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="reveal-on-scroll mt-6 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/55 p-5 sm:grid-cols-3">
          {["Pull Requests", "Issue Tracking", "GitHub Collaboration"].map((item) => (
            <span key={item} className="rounded-2xl bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-slate-200 ring-1 ring-white/10">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dsa() {
  return (
    <section id="dsa" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="DSA"
          title="Data Structures & Algorithms"
          copy="Focused on building strong problem-solving skills through consistent practice of core data structures, algorithms, and interview-focused patterns."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-on-scroll tilt-card glass-panel rounded-3xl p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
              DSA Foundation
            </p>
            <h3 className="mt-4 text-3xl font-extrabold text-white">Interview-oriented practice</h3>
            <div className="mt-6 grid gap-3">
              {dsaPracticeCards.map((item) => (
                <div key={item.title} className="dsa-focus-card">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll tilt-card glass-panel rounded-3xl p-6">
            <div className="dsa-progress-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Problem Solving Progress
              </p>
              <h3 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                150+ <span className="text-2xl text-cyan-200 sm:text-3xl">DSA Problems</span>
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
                Focus Areas: Problem Solving • Pattern Recognition • Interview Preparation
              </p>
            </div>

            <h3 className="mt-7 text-xl font-bold text-white">Core Topics</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Core areas I practice regularly while improving implementation speed, clarity, and correctness.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {dsaTopics.map((topic, index) => (
                <div key={topic} className="topic-tile rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  <span className="text-xs font-bold text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-semibold text-slate-100">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { label: "Email", meta: personal.email, href: `mailto:${personal.email}?subject=Software%20Engineering%20Internship%20Opportunity`, icon: "EM" },
    { label: "GitHub", meta: "github.com/nitinkumar2912", href: personal.github, icon: "GH" },
    { label: "LinkedIn", meta: "linkedin.com/in/nitin-kumar-30790336a", href: personal.linkedin, icon: "IN" },
    { label: "Portfolio", meta: "nitinkumar2912.github.io/portfolio", href: personal.portfolio, icon: "PF" },
  ];

  return (
    <section id="contact" className="animated-section py-20">
      <div className="section-shell">
        <div className="reveal-on-scroll contact-panel glass-panel rounded-3xl p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">Let us talk internships and engineering work</h2>
              <p className="section-copy">
                I am open to software engineering internships, MERN stack opportunities, project feedback, and open source collaboration.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${personal.email}`} className="primary-button">Email Me</a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="secondary-button">LinkedIn</a>
              </div>
            </div>

            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="contact-link"
                >
                  <span className="contact-icon">{link.icon}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-white">{link.label}</span>
                    <span className="contact-meta">{link.meta}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Nitin Kumar. Built with React, Vite, and Tailwind CSS.</p>
        <a href="#home" className="font-medium text-slate-300 hover:text-cyan-200">
          Back to top
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollReveal();
  useScrollProgress();

  return (
    <main className="relative">
      <AmbientStage />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <WorkflowStrip />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <Dsa />
      <Contact />
      <Footer />
    </main>
  );
}
