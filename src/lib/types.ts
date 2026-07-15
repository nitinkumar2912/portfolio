export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsResponse = {
  year: number;
  total: number;
  contributions: ContributionDay[];
  fetchedAt: string;
  source: string;
  username: string;
};

export type Project = {
  readonly title: string;
  readonly label: string;
  readonly summary: string;
  readonly description: string;
  readonly problem: string;
  readonly built: string;
  readonly features: readonly string[];
  readonly stack: readonly string[];
  readonly github: string;
  readonly demo: string;
  readonly featured: boolean;
};

export type SkillGroup = {
  readonly title: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly items: readonly string[];
};

export type EducationItem = {
  readonly school: string;
  readonly program: string;
  readonly focus: readonly string[];
  readonly icon: React.ComponentType<{ className?: string }>;
};

export type SocialLink = {
  readonly label: string;
  readonly href: string;
  readonly value: string;
  readonly icon: React.ComponentType<{ className?: string }>;
};

import type React from "react";
