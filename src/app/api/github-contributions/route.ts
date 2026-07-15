import { NextResponse } from "next/server";

import { personal } from "@/data/portfolio";
import type { ContributionDay } from "@/lib/types";

const CONTRIBUTIONS_URL = `https://github.com/users/${personal.githubUsername}/contributions`;
const FETCH_TIMEOUT_MS = 8_000;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ---------------------------------------------------------------------------
// In-memory cache to avoid scraping GitHub on every client request.
// ---------------------------------------------------------------------------
let cachedData: {
  payload: Record<string, unknown>;
  expiresAt: number;
} | null = null;

// ---------------------------------------------------------------------------
// HTML parsing helpers
// ---------------------------------------------------------------------------

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtml(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getAttribute(tag: string, name: string) {
  return tag.match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? "";
}

function getTooltipText(html: string, id: string) {
  const tooltipMatch = html.match(
    new RegExp(`<tool-tip[^>]*for="${escapeRegExp(id)}"[^>]*>([\\s\\S]*?)<\\/tool-tip>`),
  );

  return tooltipMatch ? decodeHtml(tooltipMatch[1].replace(/\s+/g, " ").trim()) : "";
}

function getCountFromTooltip(tooltip: string) {
  if (!tooltip || tooltip.startsWith("No contributions")) {
    return 0;
  }

  return Number(tooltip.match(/([\d,]+)\s+contribution/)?.[1]?.replace(/,/g, "") ?? 0);
}

function parseContributions(html: string) {
  const currentYear = new Date().getUTCFullYear();
  const dayTags = html.match(/<td\b(?=[^>]*ContributionCalendar-day)(?=[^>]*data-date="[^"]+")[^>]*>/g) ?? [];
  const allDays = dayTags
    .map((tag): ContributionDay | null => {
      const date = getAttribute(tag, "data-date");
      const id = getAttribute(tag, "id");
      const level = Number(getAttribute(tag, "data-level"));
      const tooltip = getTooltipText(html, id);

      if (!date || !id || level < 0 || level > 4) {
        return null;
      }

      return {
        date,
        count: getCountFromTooltip(tooltip),
        level: level as ContributionDay["level"],
      };
    })
    .filter((day): day is ContributionDay => Boolean(day))
    .sort((a, b) => a.date.localeCompare(b.date));
  const days = allDays.filter((day) => day.date.startsWith(`${currentYear}-`));

  return {
    year: currentYear,
    total: days.reduce((sum, day) => sum + day.count, 0),
    contributions: days,
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET() {
  // Return cached data if fresh
  if (cachedData && Date.now() < cachedData.expiresAt) {
    return NextResponse.json(cachedData.payload, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "nitin-kumar-portfolio",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("GitHub contribution data is unavailable right now.");
    }

    const html = await response.text();
    const data = parseContributions(html);

    if (data.contributions.length === 0) {
      throw new Error("GitHub returned an empty contribution calendar.");
    }

    const payload = {
      ...data,
      username: personal.githubUsername,
      source: CONTRIBUTIONS_URL,
      fetchedAt: new Date().toISOString(),
    };

    // Populate cache
    cachedData = {
      payload,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    // Serve stale cache on error if available
    if (cachedData) {
      return NextResponse.json(cachedData.payload, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Could not load GitHub contributions.",
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  }
}
