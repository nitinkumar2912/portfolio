import {
  BookOpen,
  Boxes,
  Brain,
  Code2,
  Database,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";

import type { EducationItem, Project, SkillGroup, SocialLink } from "@/lib/types";

export const personal = {
  name: "Nitin Kumar",
  role: "MERN Stack Developer",
  headline: "Building clean web applications.",
  email: "nitinkumar29122501@gmail.com",
  portfolio: "https://nitinkumar2912.github.io/portfolio/",
  github: "https://github.com/nitinkumar2912",
  githubLabel: "github.com/nitinkumar2912",
  githubUsername: "nitinkumar2912",
  linkedin: "https://www.linkedin.com/in/nitin-kumar-30790336a/",
  linkedinLabel: "linkedin.com/in/nitin-kumar-30790336a",
  educationSummary: "Delhi Technological University",
  location: "Delhi Technological University",
  resume: "https://drive.google.com/file/d/1Oa_r-ZJj5R8F5nMu7Q-ZTZFPBvQD3W8B/view?usp=drive_link",
} as const;

export const navItems: readonly { readonly label: string; readonly href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  title: "About me",
  intro:
    "I am Nitin Kumar, a MERN stack developer who enjoys building clean, useful web applications.",
  points: [
    "I work with React, Node.js, Express, MongoDB, authentication, and deployments.",
    "I like simple interfaces, readable code, and projects that solve real problems.",
  ] as const,
} as const;

export const highlights = [
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
] as const;

export const experience = [
  {
    company: "Software Engineering Internship Preparation",
    role: "MERN Stack Developer",
    type: "Project-based learning",
    period: "Current",
    summary:
      "Preparing for software engineering internships through real projects, consistent DSA practice, and open source learning.",
    bullets: [
      "Built deployment-ready MERN projects with authentication, analytics, REST APIs, and production-minded structure.",
      "Practicing DSA topics including arrays, strings, linked lists, trees, graphs, binary search, sliding window, and dynamic programming.",
      "Learning open source workflows around larger codebases, pull requests, issue tracking, contribution history, and communication clarity.",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB Atlas", "JWT", "GitHub"],
  },
  // TODO: Add professional roles, companies, dates, and achievements when the current portfolio includes them.
] as const;

export const projects: readonly Project[] = [
  {
    title: "JobTrackr",
    label: "Featured MERN Project",
    summary: "A MERN job tracker for internship applications, notes, analytics, and follow-ups.",
    description:
      "A production-ready MERN job application tracker built for managing internship and placement pipelines with authentication, analytics, notes, reminders, and deployment-ready architecture.",
    problem:
      "Tracking internship applications across spreadsheets, emails, and bookmarks falls apart fast. You lose follow-up dates, forget which recruiter you spoke to, and have no clear picture of where each application stands.",
    built:
      "A full-stack MERN application with JWT authentication, a Kanban pipeline board, analytics dashboard, interview notes, recruiter tracking, and follow-up reminders. Data lives in MongoDB Atlas, the API runs on Express with Render, and the React frontend is deployed on Vercel.",
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
    thumbnail: "/projects/jobtrackr.png",
    github: "https://github.com/nitinkumar2912/JobTracker",
    demo: "https://job-tracker-client-murex.vercel.app",
    featured: true,
  },
  {
    title: "TopTodo",
    label: "JavaScript Productivity App",
    summary: "A clean JavaScript task app with projects, due dates, reusable modules, and local storage.",
    description:
      "A modular task management application focused on project organization, due date scheduling, persistent task data, and a clean component-based interface.",
    problem:
      "Most to-do apps either oversimplify tasks into a flat list or overwhelm with features. Students and developers need something in between — project-level grouping, due dates, and persistence without sign-up friction.",
    built:
      "A modular vanilla JavaScript app with Webpack, organized around project folders, due-date scheduling with date-fns, and local storage persistence. Components are reusable and the architecture is clean enough to extend without a framework.",
    features: [
      "Project Organization",
      "Due Date Scheduling",
      "Local Storage Persistence",
      "Webpack Architecture",
      "Reusable Components",
      "Clean UI",
    ],
    stack: ["JavaScript", "Webpack", "date-fns", "Local Storage"],
    thumbnail: "/projects/toptodo.png",
    github: "https://github.com/nitinkumar2912/TopTodo",
    demo: "https://nitinkumar2912.github.io/TopTodo/",
    featured: false,
  },
  {
    title: "Ghub Chatify",
    label: "Real-Time Chat Application",
    summary: "A full-featured real-time chat app with custom JWT auth, Socket.io messaging, and cloud deployments.",
    description:
      "A production-grade real-time chat platform with custom authentication, presence indicators, image uploads, and a polished React UI.",
    problem:
      "Most chat tutorials skip the hard parts — custom auth, real-time presence, rate limiting, and production deployment. Building a chat app that handles all of these end-to-end is the gap between a tutorial project and a real product.",
    built:
      "A real-time messaging platform with custom JWT authentication, Socket.io for instant messaging, online/offline presence indicators, typing and notification sounds, Cloudinary image uploads, welcome emails via Resend, and Arcjet-powered API rate limiting. The frontend uses React with Tailwind CSS, DaisyUI, and Zustand for state management.",
    features: [
      "Custom JWT Authentication",
      "Real-time Messaging (Socket.io)",
      "Online/Offline Presence",
      "Notification & Typing Sounds",
      "Welcome Emails (Resend)",
      "Image Uploads (Cloudinary)",
      "REST API (Express)",
      "MongoDB Persistence",
      "API Rate-Limiting (Arcjet)",
      "Zustand State Management",
      "DaisyUI Components",
      "Sevalla Deployment",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "Zustand", "Cloudinary"],
    github: "https://github.com/nitinkumar2912/Ghub-chatify-app",
    demo: "",
    featured: false,
  },
];

export const skillGroups: readonly SkillGroup[] = [
  { title: "Languages", icon: Code2, items: ["C++", "JavaScript", "SQL", "HTML", "CSS"] },
  { title: "Frontend", icon: Layers3, items: ["React", "Vite", "Tailwind CSS"] },
  { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"] },
  { title: "Database", icon: Database, items: ["MongoDB", "MongoDB Atlas"] },
  { title: "Tools", icon: Wrench, items: ["Git", "GitHub", "Postman", "VS Code", "Render", "Vercel"] },
  { title: "Core CS", icon: Brain, items: ["DBMS", "OOP", "Operating Systems", "Computer Networks"] },
  {
    title: "DSA",
    icon: Boxes,
    items: ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Binary Search", "Sliding Window", "Dynamic Programming"],
  },
];

export const techLogos: readonly { readonly name: string; readonly icon: string }[] = [
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

export const education: readonly EducationItem[] = [
  {
    school: "Delhi Technological University",
    program: "Computer Science student",
    focus: ["Software engineering internships", "Full-stack development", "Core computer science", "DSA practice"],
    icon: GraduationCap,
  },
  // TODO: Add degree duration, CGPA, coursework, or earlier education when the current portfolio includes it.
];

export const openSourceItems: readonly { readonly title: string; readonly copy: string }[] = [
  {
    title: "Workflow Foundations",
    copy: "Reading repositories, issues, and pull requests to understand how real teams collaborate.",
  },
  {
    title: "Large Codebase Reading",
    copy: "Tracing modules and data flow so changes stay focused and understandable.",
  },
  {
    title: "GSoC Preparation",
    copy: "Building proposal habits, contribution history, and clear project communication.",
  },
];

export const dsa = {
  total: "150+",
  label: "DSA Problems",
  focus: "Problem solving, pattern recognition, and interview preparation.",
  topics: ["Arrays", "Strings", "Linked Lists", "Stacks & Queues", "Trees", "Binary Search", "Graphs", "Dynamic Programming"] as const,
  cards: [
    {
      title: "Problem Solving",
      content: "Arrays, Strings, Linked Lists, Trees, Graphs, Binary Search, and Sliding Window patterns.",
    },
    {
      title: "Approach",
      content: "Optimized solutions with focus on time complexity, space complexity, and edge cases.",
    },
    {
      title: "Current Focus",
      content: "Dynamic Programming, Graphs, and advanced problem-solving patterns.",
    },
  ] as const,
} as const;

export const certifications: readonly string[] = [
  // TODO: Add certifications when the current portfolio includes them.
];

export const socialLinks: readonly SocialLink[] = [
  { label: "Email", href: `mailto:${personal.email}`, value: personal.email, icon: Mail },
  { label: "GitHub", href: personal.github, value: personal.githubLabel, icon: Github },
  { label: "LinkedIn", href: personal.linkedin, value: personal.linkedinLabel, icon: Linkedin },
  { label: "Resume", href: personal.resume, value: "View Resume", icon: FileText },
];

export const footerMeta = {
  source: "Designed and built by Nitin Kumar.",
} as const;

export const iconMap = {
  book: BookOpen,
  rocket: Rocket,
  terminal: Terminal,
  sparkles: Sparkles,
} as const;
