import React from 'react';

/**
 * StreakWidget — Shows current streak, longest streak, and 7-day activity heatmap.
 */
export default function StreakWidget({ streak = 0, longestStreak = 0, lastActive }) {
  // Determine if streak is at risk (last active was yesterday or earlier)
  const now = new Date();
  const lastActiveDate = lastActive ? new Date(lastActive) : null;
  const daysSinceActive = lastActiveDate
    ? Math.floor((now - lastActiveDate) / (1000 * 60 * 60 * 24))
    : null;
  const isAtRisk = daysSinceActive === 1;
  const isActive = daysSinceActive === 0;
  const hasGlow = streak > 7;

  // Build 7-day heatmap (most recent 7 days, Mon-Sun labels)
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const todayDay = today.getDay(); // 0=Sun
  // Build array from 6 days ago to today
  const heatmap = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    // A day is "active" if it falls within the streak window
    const daysAgo = i;
    const wasActive = streak > 0 && daysAgo < streak && (isActive || (isAtRisk && daysAgo > 0));
    heatmap.push({
      label: dayLabels[dayOfWeek === 0 ? 6 : dayOfWeek - 1],
      active: wasActive,
    });
  }

  const statusMessage =
    streak === 0
      ? 'Start your streak!'
      : isAtRisk
        ? 'Keep it going! Log in today.'
        : 'Keep it going!';

  return (
    <div className="streak-widget">
      <style>{`
        .streak-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }
        .streak-widget__top {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .streak-widget__flame {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .streak-widget__flame svg {
          filter: drop-shadow(0 2px 6px rgba(239, 68, 68, 0.3));
        }
        .streak-widget__count {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
        }
        .streak-widget__count--glow {
          text-shadow: 0 0 12px rgba(197, 165, 90, 0.5), 0 0 24px rgba(197, 165, 90, 0.3);
          animation: streak-glow 2s ease-in-out infinite alternate;
        }
        @keyframes streak-glow {
          from { text-shadow: 0 0 8px rgba(197, 165, 90, 0.3), 0 0 16px rgba(197, 165, 90, 0.15); }
          to { text-shadow: 0 0 16px rgba(197, 165, 90, 0.6), 0 0 32px rgba(197, 165, 90, 0.3); }
        }
        .streak-widget__label {
          font-size: 0.875rem;
          color: var(--gray-500);
          font-weight: 500;
        }
        .streak-widget__info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .streak-widget__longest {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .streak-widget__heatmap {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .streak-widget__day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .streak-widget__day-label {
          font-size: 0.625rem;
          color: var(--gray-400);
          font-weight: 600;
          text-transform: uppercase;
        }
        .streak-widget__dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--gray-200);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .streak-widget__dot--active {
          background: var(--gold);
          box-shadow: 0 0 6px rgba(197, 165, 90, 0.4);
        }
        .streak-widget__status {
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .streak-widget__status--ok {
          color: var(--green);
        }
        .streak-widget__status--risk {
          color: var(--amber, #f59e0b);
        }
        .streak-widget__status--start {
          color: var(--gray-500);
        }
      `}</style>

      <div className="streak-widget__top">
        <div className="streak-widget__flame">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z"
              fill={streak > 0 ? '#ef4444' : '#d1d5db'}
              stroke={streak > 0 ? '#dc2626' : '#9ca3af'}
              strokeWidth="1.5"
            />
            <path
              d="M12 9c-1.5 2.5-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-3.5-3-6z"
              fill={streak > 0 ? '#fbbf24' : '#e5e7eb'}
              stroke="none"
            />
          </svg>
        </div>
        <div className="streak-widget__info">
          <div className={`streak-widget__count${hasGlow ? ' streak-widget__count--glow' : ''}`}>
            {streak}
          </div>
          <div className="streak-widget__label">day{streak !== 1 ? 's' : ''} streak</div>
          <div className="streak-widget__longest">
            Longest: {longestStreak} day{longestStreak !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="streak-widget__heatmap">
        {heatmap.map((day, i) => (
          <div key={i} className="streak-widget__day">
            <span className="streak-widget__day-label">{day.label}</span>
            <div className={`streak-widget__dot${day.active ? ' streak-widget__dot--active' : ''}`} />
          </div>
        ))}
      </div>

      <div
        className={`streak-widget__status ${
          streak === 0
            ? 'streak-widget__status--start'
            : isAtRisk
              ? 'streak-widget__status--risk'
              : 'streak-widget__status--ok'
        }`}
      >
        {statusMessage}
      </div>
    </div>
  );
}
