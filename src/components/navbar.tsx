"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import { ProfileLogo } from "@/components/profile-logo";
import { Button } from "@/components/ui/button";
import { navItems, personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function TypewriterName({ text }: { text: string }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedText(text);
      return;
    }

    setTypedText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 95);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span className="hidden min-w-[5.8rem] whitespace-nowrap text-sm font-medium text-zinc-200 sm:inline-flex">
      <span>{typedText}</span>
      <span className="typewriter-cursor ml-0.5" aria-hidden="true">
        |
      </span>
    </span>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled
          ? "border-white/10 bg-[#0a0a0a]/78 backdrop-blur-xl"
          : "border-transparent bg-transparent backdrop-blur-0",
      )}
    >
      <nav className="container flex min-h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <a
          href="#about"
          className="group flex min-w-0 items-center gap-3 text-zinc-200 transition hover:text-white"
          aria-label={`${personal.name} — go to about section`}
        >
          <ProfileLogo className="h-9 w-9 shrink-0" size={36} priority />
          <TypewriterName text={personal.name} />
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm text-zinc-500 transition hover:text-zinc-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Email">
            <a href={`mailto:${personal.email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
