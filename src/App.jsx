import React, { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "DSA", href: "#dsa" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "C++", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Vite", "Responsive UI"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js"],
  },
  {
    title: "Database",
    items: ["MongoDB"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    title: "Core CS Subjects",
    items: ["DBMS", "Operating System", "OOPs", "Computer Networks"],
  },
  {
    title: "Concepts",
    items: [
      "Arrays",
      "Binary Search",
      "Sliding Window",
      "Two Pointers",
      "REST APIs",
      "CRUD",
      "Problem Solving",
    ],
  },
];

const projects = [
  {
    title: "TopTodo",
    description:
      "A modern Todo application with clean UI and project organization features. Currently upgrading it into a full-stack application using Node.js, Express, MongoDB, and JWT authentication.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/nitinkumar2912/TopTodo.git",
    demo: "https://nitinkumar2912.github.io/TopTodo/",
  },
];

const dsaTopics = [
  "Arrays",
  "Binary Search",
  "Sliding Window",
  "Two Pointers",
  "Kadane's Algorithm",
];

const floatingTech = ["React", "Node", "Mongo", "DSA", "API", "Git"];

const workflowHighlights = [
  {
    label: "Frontend",
    value: "Responsive UI",
    detail: "Clean layouts that work across mobile, tablet, and desktop.",
  },
  {
    label: "Backend",
    value: "API Thinking",
    detail: "Express, MongoDB, auth flows, and practical full-stack patterns.",
  },
  {
    label: "Delivery",
    value: "Project Mindset",
    detail: "Readable code, GitHub-ready work, and steady iteration.",
  },
];

const processSteps = [
  "Understand the feature and user flow",
  "Design clean responsive UI",
  "Build frontend and API structure",
  "Test, refine, and ship",
];

function usePointerParallax() {
  const [style, setStyle] = useState({
    "--mx": "0deg",
    "--my": "0deg",
    "--tx": "0px",
    "--ty": "0px",
  });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      setStyle({
        "--mx": `${(-y * 10).toFixed(2)}deg`,
        "--my": `${(x * 12).toFixed(2)}deg`,
        "--tx": `${(x * 18).toFixed(2)}px`,
        "--ty": `${(y * 18).toFixed(2)}px`,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return style;
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
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

function ScrollProgress({ progress }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress / 100})` }} />
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
  const parallaxStyle = usePointerParallax();

  return (
    <div
      className="hero-visual animate-fade-up [animation-delay:120ms]"
      style={parallaxStyle}
    >
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
          <span className="h-3 w-3 rounded-full bg-rose-400"></span>
          <span className="h-3 w-3 rounded-full bg-amber-300"></span>
          <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
          <span className="ml-3 text-xs font-medium text-slate-500">
            portfolio.jsx
          </span>
        </div>
        <pre className="overflow-hidden whitespace-pre-wrap text-sm leading-7 text-slate-300">
          <code>{`const developer = {
  name: "Nitin Kumar",
  focus: ["Full-stack web", "DSA", "Backend"],
  currentlyLearning: ["Node.js", "MongoDB", "JWT"],
  goal: "Build reliable projects and prepare for placements"
};`}</code>
        </pre>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3">
          <span className="logo-mark grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-slate-950">
            NK
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">
            Nitin Kumar
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
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
          Hire-ready
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
    <section
      id="home"
      className="section-shell grid min-h-[calc(100vh-4rem)] items-center py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            Computer Science student at DTU
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            Nitin Kumar
            <span className="block accent-text">Full Stack Developer</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-slate-200">
            Computer Science Student | Full Stack Developer | DSA Learner
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Passionate about building modern web applications and improving
            problem-solving skills through DSA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="primary-button">
              View Projects
            </a>
            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function WorkflowStrip() {
  return (
    <section className="section-shell py-8">
      <div className="freelance-strip reveal-on-scroll">
        {workflowHighlights.map((item, index) => (
          <article
            key={item.label}
            className="workflow-card"
            style={{ "--delay": `${index * 110}ms` }}
          >
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
  const points = [
    "DTU Computer Science student building a strong foundation in software development.",
    "Currently learning DSA, backend development, and full-stack web development.",
    "Interested in scalable applications, clean APIs, and modern UI/UX.",
    "Preparing for placements with consistent practice and real-world project work.",
  ];

  return (
    <section id="about" className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="About"
          title="Learning with a builder mindset"
          copy="I am focused on becoming a practical software engineer: strong fundamentals, useful projects, and steady improvement."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {points.map((point, index) => (
            <div
              key={point}
              className="reveal-on-scroll tilt-card glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"
              style={{ animationDelay: `${index * 80}ms` }}
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
          title="Skills & Technologies"
          copy="Technologies, computer science fundamentals, and problem-solving concepts I am actively learning and building with."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="reveal-on-scroll tilt-card glass-panel rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.075] hover:shadow-glow"
            >
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
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
          title="Practical projects with room to grow"
          copy="Current work is intentionally focused: clean UI, organized code, and backend concepts that map to internship-ready development."
        />

        <div className="mt-10 grid max-w-3xl gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="reveal-on-scroll project-card glass-panel group flex min-h-[22rem] flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="project-card-shine" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">
                    Featured Project
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                  MERN
                </span>
              </div>

              <p className="mt-5 flex-1 text-base leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                >
                  Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="animated-section py-20">
      <div className="section-shell">
        <SectionHeading
          kicker="Workflow"
          title="How I approach client-style work"
          copy="A simple delivery process that keeps projects focused, polished, and easy to improve."
        />

        <div className="process-timeline mt-10">
          {processSteps.map((step, index) => (
            <div
              key={step}
              className="reveal-on-scroll process-step"
              style={{ "--delay": `${index * 130}ms` }}
            >
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
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
          title="Problem solving, one topic at a time"
          copy="My DSA journey is focused on understanding patterns deeply and applying them consistently in coding practice."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-on-scroll tilt-card glass-panel rounded-3xl p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
              LeetCode Practice
            </p>
            <h3 className="mt-4 text-4xl font-extrabold text-white">
              In progress
            </h3>
            <p className="mt-4 leading-7 text-slate-300">
              Solving LeetCode problems regularly while building notes around
              reusable patterns, edge cases, and time complexity.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Current focus</p>
              <p className="mt-2 font-semibold text-slate-100">
                Arrays, search patterns, and window-based problems
              </p>
            </div>
          </div>

          <div className="reveal-on-scroll tilt-card glass-panel rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">Topics learned</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {dsaTopics.map((topic) => (
                <div
                  key={topic}
                  className="topic-tile rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <p className="font-semibold text-slate-100">{topic}</p>
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
    { label: "GitHub", href: "https://github.com/nitinkumar2912" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nitin-kumar-30790336a/",
    },
    {
      label: "Email",
      detail: "nitinkumar29122501@gmail.com",
      href: "mailto:nitinkumar29122501@gmail.com?subject=Portfolio%20Opportunity",
    },
  ];

  return (
    <section id="contact" className="animated-section py-20">
      <div className="section-shell">
        <div className="reveal-on-scroll contact-panel glass-panel rounded-3xl p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">
                Open to internships, collaboration, and feedback
              </h2>
              <p className="section-copy">
                I am building projects, improving DSA, and preparing for
                placement-focused development opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={index === 0 ? "primary-button" : "secondary-button"}
                >
                  <span className="flex flex-col items-center gap-1 leading-tight">
                    <span>{link.label}</span>
                    {link.detail ? (
                      <span className="text-xs font-medium text-slate-400">
                        {link.detail}
                      </span>
                    ) : null}
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
  const scrollProgress = useScrollProgress();

  return (
    <main className="relative">
      <AmbientStage />
      <ScrollProgress progress={scrollProgress} />
      <Navbar />
      <Hero />
      <WorkflowStrip />
      <About />
      <Skills />
      <Projects />
      <Process />
      <Dsa />
      <Contact />
      <Footer />
    </main>
  );
}
