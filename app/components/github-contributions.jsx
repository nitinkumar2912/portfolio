import { useEffect, useMemo, useState } from 'react';
import config from '~/config.json';
import styles from './github-contributions.module.css';

const refreshInterval = 5 * 60 * 1000;

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function getCalendarPosition(date) {
  const currentDate = new Date(`${date}T00:00:00`);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const firstSunday = new Date(yearStart);
  firstSunday.setDate(yearStart.getDate() - yearStart.getDay());
  const daysSinceFirstSunday = Math.floor(
    (currentDate.getTime() - firstSunday.getTime()) / 86_400_000
  );

  return {
    column: Math.floor(daysSinceFirstSunday / 7) + 1,
    row: currentDate.getDay() + 1,
  };
}

function getMonthLabels(contributions) {
  const labels = [];
  let previousMonth = '';

  contributions.forEach(day => {
    const date = new Date(`${day.date}T00:00:00`);
    const month = date.toLocaleString('en', { month: 'short' });

    if (month !== previousMonth) {
      labels.push({ label: month, column: getCalendarPosition(day.date).column });
      previousMonth = month;
    }
  });

  return labels;
}

export function GithubContributions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    let active = true;

    async function loadContributions(showLoading = false) {
      if (showLoading) setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/api/github-contributions', {
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'GitHub contribution data is unavailable right now.');
        }

        if (active) {
          setData(result);
          setUpdatedAt(new Date().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' }));
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Could not load GitHub contributions.');
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadContributions(true);
    const interval = window.setInterval(() => loadContributions(), refreshInterval);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const contributions = data?.contributions ?? [];
  const monthLabels = useMemo(() => getMonthLabels(contributions), [contributions]);
  const columnCount = useMemo(
    () => contributions.reduce((max, day) => Math.max(max, getCalendarPosition(day.date).column), 0),
    [contributions]
  );
  const total = data?.total ?? 0;
  const year = data?.year ?? new Date().getFullYear();

  return (
    <div className={styles.calendar}>
      {isLoading ? (
        <p className={styles.status} role="status">Loading GitHub contributions…</p>
      ) : error && !data ? (
        <p className={styles.status} role="status">
          {error}{' '}
          <a href={`https://github.com/${config.github}`} target="_blank" rel="noopener noreferrer">
            View GitHub
          </a>
        </p>
      ) : (
        <>
          {error ? <p className={styles.updateNotice} role="status">Showing the last available calendar. {error}</p> : null}
          <div
            className={styles.scrollArea}
            role="region"
            aria-label="Scrollable GitHub contribution calendar"
            tabIndex={0}
          >
            <div className={styles.calendarContent}>
              <div className={styles.months} aria-hidden="true">
                {monthLabels.map(month => (
                  <span key={`${month.label}-${month.column}`} style={{ left: `${(month.column - 1) * 16}px` }}>
                    {month.label}
                  </span>
                ))}
              </div>
              <div
                className={styles.grid}
                style={{ gridTemplateColumns: `repeat(${columnCount}, 12px)` }}
                aria-label={`${total} GitHub contributions in ${year}`}
              >
                {contributions.map(day => {
                  const position = getCalendarPosition(day.date);
                  const label = `${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`;

                  return (
                    <span
                      key={day.date}
                      className={styles.day}
                      data-level={day.level}
                      style={{ gridColumnStart: position.column, gridRowStart: position.row }}
                      title={label}
                      aria-label={label}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.calendarFooter}>
            <p>
              <strong>{total}</strong> contributions in {year} on{' '}
              <a href={`https://github.com/${config.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
              {updatedAt ? <span className={styles.updated}> · Updated {updatedAt}</span> : null}
            </p>
            <div className={styles.legend} aria-label="Contribution intensity legend">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(level => <span key={level} className={styles.legendCell} data-level={level} />)}
              <span>More</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
