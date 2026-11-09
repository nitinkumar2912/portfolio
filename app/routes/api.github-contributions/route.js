import { json } from '~/utils/server-runtime.server';
import config from '~/config.json';

const contributionsUrl = `https://github.com/users/${config.github}/contributions`;
const fetchTimeoutMs = 8000;
const cacheTtlMs = 5 * 60 * 1000;
let cachedData = null;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? '';
}

function getTooltipText(html, id) {
  const match = html.match(
    new RegExp(`<tool-tip[^>]*for="${escapeRegExp(id)}"[^>]*>([\\s\\S]*?)<\\/tool-tip>`)
  );
  return match ? decodeHtml(match[1].replace(/\s+/g, ' ').trim()) : '';
}

function getCountFromTooltip(tooltip) {
  if (!tooltip || tooltip.startsWith('No contributions')) return 0;
  return Number(tooltip.match(/([\d,]+)\s+contribution/)?.[1]?.replace(/,/g, '') ?? 0);
}

function parseContributions(html) {
  const currentYear = new Date().getUTCFullYear();
  const dayTags = html.match(/<td\b(?=[^>]*ContributionCalendar-day)(?=[^>]*data-date="[^"]+")[^>]*>/g) ?? [];
  const contributions = dayTags
    .map(tag => {
      const date = getAttribute(tag, 'data-date');
      const id = getAttribute(tag, 'id');
      const level = Number(getAttribute(tag, 'data-level'));

      if (!date || !id || !Number.isInteger(level) || level < 0 || level > 4) return null;

      return { date, count: getCountFromTooltip(getTooltipText(html, id)), level };
    })
    .filter(day => day && day.date.startsWith(`${currentYear}-`))
    .sort((first, second) => first.date.localeCompare(second.date));

  return {
    year: currentYear,
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    contributions,
  };
}

function noCacheHeaders() {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };
}

export async function loader() {
  if (cachedData && Date.now() < cachedData.expiresAt) {
    return json(cachedData.payload, { headers: { 'Cache-Control': 'no-store' } });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);

  try {
    const response = await fetch(contributionsUrl, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'nitin-kumar-portfolio',
      },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error('GitHub contribution data is unavailable right now.');

    const data = parseContributions(await response.text());
    if (data.contributions.length === 0) throw new Error('GitHub returned an empty contribution calendar.');

    const payload = {
      ...data,
      username: config.github,
      source: contributionsUrl,
      fetchedAt: new Date().toISOString(),
    };
    cachedData = { payload, expiresAt: Date.now() + cacheTtlMs };

    return json(payload, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (cachedData) return json(cachedData.payload, { headers: { 'Cache-Control': 'no-store' } });

    return json(
      { error: error instanceof Error ? error.message : 'Could not load GitHub contributions.' },
      { status: 502, headers: noCacheHeaders() }
    );
  } finally {
    clearTimeout(timeout);
  }
}
