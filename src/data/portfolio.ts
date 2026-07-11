import {
  BookOpen,
  Boxes,
  Brain,
  Code2,
  Database,
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
  // TODO: Add a resume URL when the current portfolio includes one.
  resume: "",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  title: "About me",
  intro:
    "I am Nitin Kumar, a MERN stack developer who enjoys building clean, useful web applications.",
  points: [
    "I work with React, Node.js, Express, MongoDB, authentication, and deployments.",
    "I like simple interfaces, readable code, and projects that solve real problems.",
  ],
};

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
];

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
];

export const projects = [
  {
    title: "JobTrackr",
    label: "Featured MERN Project",
    summary: "A MERN job tracker for internship applications, notes, analytics, and follow-ups.",
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
    summary: "A clean JavaScript task app with projects, due dates, reusable modules, and local storage.",
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

export const skillGroups = [
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

export const techStack = [
  "React",
  "Vite",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB Atlas",
  "REST APIs",
  "JWT Authentication",
  "Git",
  "GitHub",
  "Postman",
  "VS Code",
  "Render",
  "Vercel",
];

export const education = [
  {
    school: "Delhi Technological University",
    program: "Computer Science student",
    focus: ["Software engineering internships", "Full-stack development", "Core computer science", "DSA practice"],
    icon: GraduationCap,
  },
  // TODO: Add degree duration, CGPA, coursework, or earlier education when the current portfolio includes it.
];

export const openSourceItems = [
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
  topics: ["Arrays", "Strings", "Linked Lists", "Stacks & Queues", "Trees", "Binary Search", "Graphs", "Dynamic Programming"],
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
  ],
};

export const certifications: string[] = [
  // TODO: Add certifications when the current portfolio includes them.
];

export const socialLinks = [
  { label: "Email", href: `mailto:${personal.email}`, value: personal.email, icon: Mail },
  { label: "GitHub", href: personal.github, value: personal.githubLabel, icon: Github },
  { label: "LinkedIn", href: personal.linkedin, value: personal.linkedinLabel, icon: Linkedin },
  { label: "Portfolio", href: personal.portfolio, value: "nitinkumar2912.github.io/portfolio", icon: Sparkles },
];

export const footerMeta = {
  stack: "Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Lucide React.",
  source: "Personal information preserved from the existing portfolio project.",
};

export const iconMap = {
  book: BookOpen,
  rocket: Rocket,
  terminal: Terminal,
};
