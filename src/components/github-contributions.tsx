"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionsResponse = {
  total: {
    lastYear?: number;
    [key: string]: number | undefined;
  };
  contributions: ContributionDay[];
};

const contributionClasses = [
  "bg-zinc-900 border-white/[0.04]",
  "bg-zinc-700 border-white/[0.07]",
  "bg-zinc-500 border-white/[0.09]",
  "bg-zinc-300 border-white/[0.12]",
  "bg-white border-white/20",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getMonthLabels(contributions: ContributionDay[]) {
  const labels: Array<{ label: string; column: number }> = [];
  let previousMonth = "";

  contributions.forEach((day, index) => {
    const currentDate = new Date(`${day.date}T00:00:00`);
    const month = currentDate.toLocaleString("en", { month: "short" });

    if (month !== previousMonth) {
      labels.push({ label: month, column: Math.floor(index / 7) + 1 });
      previousMonth = month;
    }
  });

  return labels;
}

export function GithubContributions() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${personal.githubUsername}?y=last`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("GitHub contribution data is unavailable right now.");
        }

        const nextData = (await response.json()) as ContributionsResponse;
        setData(nextData);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Could not load GitHub contributions.");
      } finally {
        setIsLoading(false);
      }
    }

    loadContributions();

    return () => controller.abort();
  }, []);

  const contributions = data?.contributions ?? [];
  const monthLabels = useMemo(() => getMonthLabels(contributions), [contributions]);
  const total = data?.total.lastYear ?? contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <Card className="mt-8 overflow-hidden">
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-sm text-zinc-500">Profile</p>
            <a className="mt-1 inline-flex items-center gap-2 text-zinc-100 hover:underline" href={personal.github} target="_blank" rel="noreferrer">
              {personal.githubLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {data ? (
              <p className="mt-3 text-sm text-zinc-500">
                <span className="font-medium text-zinc-200">{total}</span> contributions in the last year
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {data ? <Badge>Real GitHub Data</Badge> : null}
            <Button asChild variant="secondary">
              <a href={personal.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                View GitHub
              </a>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 flex min-h-40 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-sm text-zinc-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading real contributions...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-sm leading-6 text-zinc-400">{error}</p>
            <p className="mt-2 text-sm text-zinc-500">You can still view the live contribution graph directly on GitHub.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto pb-2">
            <div className="min-w-[760px]">
              <div className="relative mb-2 h-5 font-mono text-xs text-zinc-600" aria-hidden="true">
                {monthLabels.map((month) => (
                  <span
                    key={`${month.label}-${month.column}`}
                    className="absolute"
                    style={{ left: `${(month.column - 1) * 18}px` }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>
              <div
                className="grid grid-flow-col grid-rows-7 gap-1"
                style={{ gridAutoColumns: "14px" }}
                aria-label={`${total} GitHub contributions in the last year`}
              >
                {contributions.map((day) => (
                  <span
                    key={day.date}
                    className={cn("h-3.5 w-3.5 rounded-[3px] border", contributionClasses[day.level])}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                    aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-xs text-zinc-500">
                <span>Last 12 months</span>
                <span className="flex items-center gap-2">
                  Less
                  {contributionClasses.map((className, index) => (
                    <span key={className} className={cn("h-3 w-3 rounded-[3px] border", className)} aria-label={`Contribution intensity ${index}`} />
                  ))}
                  More
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
