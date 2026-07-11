"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function FadeIn({ children, className, delay = 0, as = "div" }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0.74, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
