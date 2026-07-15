import { FileText, Github } from "lucide-react";

import { ProfileLogo } from "@/components/profile-logo";
import { Button } from "@/components/ui/button";
import { navItems, personal } from "@/data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/78 backdrop-blur-xl">
      <nav className="container flex min-h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <a href="#about" className="flex items-center gap-3" aria-label={`${personal.name} — go to about section`}>
          <ProfileLogo className="h-9 w-9" size={36} priority />
          <span className="hidden text-sm font-medium text-zinc-200 sm:inline">{personal.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm text-zinc-500 transition hover:text-zinc-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="GitHub">
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <a href={personal.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume">
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
