"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { personal } from "@/data/portfolio";
import type { ContributionDay, ContributionsResponse } from "@/lib/types";
import { cn } from "@/lib/utils";

const contributionClasses = [
  "bg-zinc-900/70 border-zinc-800/80",
  "bg-zinc-700 border-zinc-700",
  "bg-zinc-500 border-zinc-500",
  "bg-zinc-300 border-zinc-300",
  "bg-white border-white",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getContributionLabel(day: ContributionDay) {
  return `${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`;
}

function getMonthLabels(contributions: ContributionDay[]) {
  const labels: Array<{ label: string; column: number }> = [];
  let previousMonth = "";

  contributions.forEach((day) => {
    const currentDate = new Date(`${day.date}T00:00:00`);
    const month = currentDate.toLocaleString("en", { month: "short" });

    if (month !== previousMonth) {
      labels.push({ label: month, column: getCalendarPosition(day.date).column });
      previousMonth = month;
    }
  });

  return labels;
}

function getCalendarPosition(date: string) {
  const currentDate = new Date(`${date}T00:00:00`);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const firstSunday = new Date(yearStart);
  firstSunday.setDate(yearStart.getDate() - yearStart.getDay());

  const daysSinceFirstSunday = Math.floor((currentDate.getTime() - firstSunday.getTime()) / 86_400_000);

  return {
    column: Math.floor(daysSinceFirstSunday / 7) + 1,
    row: currentDate.getDay() + 1,
  };
}

async function fetchWithRetry(url: string, retries = 1): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok && retries > 0) {
      return fetchWithRetry(url, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
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

        const response = await fetchWithRetry("/api/github-contributions");

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
  const total = data?.total ?? contributions.reduce((sum, day) => sum + day.count, 0);
  const year = data?.year ?? new Date().getFullYear();
  const columnCount = useMemo(
    () => contributions.reduce((max, day) => Math.max(max, getCalendarPosition(day.date).column), 0),
    [contributions],
  );

  return (
    <div className="mt-8 max-w-[720px] overflow-x-auto overflow-y-visible pb-6">
      {isLoading ? (
        <div className="flex h-32 items-center text-sm text-zinc-500">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading GitHub contributions...
        </div>
      ) : error ? (
        <div className="text-sm leading-6 text-zinc-500">
          {error}{" "}
          <a className="underline decoration-zinc-500 underline-offset-4 hover:text-zinc-200" href={personal.github} target="_blank" rel="noopener noreferrer">
            View GitHub.
          </a>
        </div>
      ) : (
        <div className="w-max min-w-[690px]">
          <div className="relative mb-2 h-5 text-sm font-medium text-zinc-300" aria-hidden="true">
            {monthLabels.map((month) => (
              <span
                key={`${month.label}-${month.column}`}
                className="absolute"
                style={{ left: `${(month.column - 1) * 16}px` }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 12px)`,
              gridTemplateRows: "repeat(7, 12px)",
            }}
            aria-label={`${total} GitHub contributions in ${year}`}
          >
            {contributions.map((day) => {
              const position = getCalendarPosition(day.date);

              return (
                <span
                  key={day.date}
                  className="group relative block h-3 w-3"
                  style={{ gridColumnStart: position.column, gridRowStart: position.row }}
                >
                  <span
                    className={cn(
                      "block h-3 w-3 rounded-[2px] border transition group-hover:ring-1 group-hover:ring-zinc-200/70",
                      contributionClasses[day.level],
                    )}
                    title={getContributionLabel(day)}
                    aria-label={getContributionLabel(day)}
                  />
                  <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max max-w-56 -translate-x-1/2 rounded-md border border-white/10 bg-zinc-950 px-2.5 py-1.5 text-center text-[11px] font-medium leading-4 text-zinc-100 opacity-0 shadow-xl shadow-black/40 transition group-hover:opacity-100">
                    {getContributionLabel(day)}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm text-zinc-500">
            <p>
              <span className="text-zinc-400">{total}</span> contributions in {year} on{" "}
              <a className="underline decoration-zinc-500 underline-offset-4 hover:text-zinc-200" href={personal.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
            <div className="flex shrink-0 items-center gap-1.5" aria-label="Contribution intensity legend">
              <span>Less</span>
              {contributionClasses.map((className, index) => (
                <span key={className} className={cn("h-3 w-3 rounded-[2px] border", className)} aria-label={`Contribution intensity ${index}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
