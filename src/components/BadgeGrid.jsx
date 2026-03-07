import React, { useState } from 'react';

/**
 * All 14 badge definitions with SVG icons.
 */
const ALL_BADGES = [
  {
    id: 'first-steps',
    name: 'First Steps',
    criteria: 'Complete your first lesson',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16c0 0 2-2 4-2s4 4 4 4" />
        <path d="M12 16c0 0 2-2 4-2s4 4 4 4" />
        <circle cx="8" cy="8" r="2" fill={color} opacity="0.3" />
        <circle cx="16" cy="6" r="2" fill={color} opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    criteria: 'Score 100% on any quiz',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color} opacity="0.2" />
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    criteria: 'Achieve a 7-day streak',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z" fill={color} opacity="0.2" />
        <path d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z" />
      </svg>
    ),
  },
  {
    id: 'month-master',
    name: 'Month Master',
    criteria: 'Achieve a 30-day streak',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z" fill={color} opacity="0.15" />
        <path d="M12 2C8 7 4 10 4 14a8 8 0 0 0 16 0c0-4-4-7-8-12z" />
        <path d="M12 9c-1.5 2.5-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-3.5-3-6z" fill={color} opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'century',
    name: 'Century',
    criteria: 'Achieve a 100-day streak',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" fill={color} opacity="0.2" />
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 'course-complete',
    name: 'Course Complete',
    criteria: 'Finish any course',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill={color} opacity="0.2" />
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    id: 'quest-conqueror',
    name: 'Quest Conqueror',
    criteria: 'Complete a quest',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" stroke={color} strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'top-10',
    name: 'Top 10',
    criteria: 'Reach top 10 on the leaderboard',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill={color} opacity="0.2" />
      </svg>
    ),
  },
  {
    id: 'helpful-hand',
    name: 'Helpful Hand',
    criteria: '10 community replies',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
        <path d="M15 13h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3l-3 3v-3h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" fill={color} opacity="0.15" />
      </svg>
    ),
  },
  {
    id: 'thought-leader',
    name: 'Thought Leader',
    criteria: '5 posts with 3+ likes',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4.5 7.5L12 19l2.5-2.5C17 14.5 19 12 19 9a7 7 0 0 0-7-7z" fill={color} opacity="0.15" />
        <circle cx="12" cy="9" r="3" />
        <path d="M12 19v3" />
        <path d="M8 22h8" />
      </svg>
    ),
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    criteria: 'Complete 5 courses',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill={color} opacity="0.15" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    id: 'deep-thinker',
    name: 'Deep Thinker',
    criteria: 'Submit 20 reflections',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        <path d="M15 5l4 4" />
      </svg>
    ),
  },
  {
    id: 'live-wire',
    name: 'Live Wire',
    criteria: 'Attend 5 live sessions',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" fill={color} opacity="0.4" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
        <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
  {
    id: 'certified-pro',
    name: 'Certified Pro',
    criteria: 'Earn 3 certificates',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" fill={color} opacity="0.15" />
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

export default function BadgeGrid({ earnedBadges = [] }) {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const earnedIds = new Set(earnedBadges.map((b) => b.id || b.badgeId || b.name?.toLowerCase().replace(/\s+/g, '-')));
  const earnedCount = ALL_BADGES.filter((b) => earnedIds.has(b.id)).length;

  return (
    <div className="badge-grid-widget">
      <style>{`
        .badge-grid-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
        }
        .badge-grid-widget__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .badge-grid-widget__title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .badge-grid-widget__count {
          font-size: 0.8125rem;
          color: var(--gray-500);
          font-weight: 500;
        }
        .badge-grid-widget__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 16px;
        }
        .badge-grid-widget__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px 4px;
          border-radius: 8px;
          transition: background 0.2s;
          position: relative;
        }
        .badge-grid-widget__item:hover {
          background: var(--gray-50);
        }
        .badge-grid-widget__icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.2s;
        }
        .badge-grid-widget__item:hover .badge-grid-widget__icon-wrap {
          transform: scale(1.1);
        }
        .badge-grid-widget__icon-wrap--earned {
          background: linear-gradient(135deg, rgba(197,165,90,0.1), rgba(197,165,90,0.05));
          border: 2px solid var(--gold);
          box-shadow: 0 0 8px rgba(197,165,90,0.2);
        }
        .badge-grid-widget__icon-wrap--locked {
          background: var(--gray-100);
          border: 2px solid var(--gray-200);
          opacity: 0.5;
        }
        .badge-grid-widget__lock {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: var(--gray-300);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-grid-widget__name {
          font-size: 0.6875rem;
          font-weight: 500;
          text-align: center;
          line-height: 1.2;
          max-width: 80px;
        }
        .badge-grid-widget__name--earned {
          color: var(--charcoal);
        }
        .badge-grid-widget__name--locked {
          color: var(--gray-400);
        }
        /* Tooltip / detail overlay */
        .badge-grid-widget__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: badge-overlay-in 0.2s ease;
        }
        @keyframes badge-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .badge-grid-widget__detail {
          background: var(--white);
          border-radius: var(--radius);
          padding: 32px;
          max-width: 320px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-lg);
          animation: badge-detail-in 0.25s ease;
        }
        @keyframes badge-detail-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .badge-grid-widget__detail-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .badge-grid-widget__detail-icon--earned {
          background: linear-gradient(135deg, rgba(197,165,90,0.15), rgba(197,165,90,0.05));
          border: 3px solid var(--gold);
        }
        .badge-grid-widget__detail-icon--locked {
          background: var(--gray-100);
          border: 3px solid var(--gray-200);
        }
        .badge-grid-widget__detail-icon svg {
          width: 36px;
          height: 36px;
        }
        .badge-grid-widget__detail-name {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 8px;
        }
        .badge-grid-widget__detail-status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .badge-grid-widget__detail-status--earned {
          color: var(--gold);
        }
        .badge-grid-widget__detail-status--locked {
          color: var(--gray-400);
        }
        .badge-grid-widget__detail-criteria {
          font-size: 0.875rem;
          color: var(--gray-500);
          margin-bottom: 20px;
        }
        .badge-grid-widget__detail-close {
          background: var(--gray-100);
          border: none;
          border-radius: 6px;
          padding: 8px 24px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
          cursor: pointer;
          font-family: var(--font-body);
          transition: background 0.2s;
        }
        .badge-grid-widget__detail-close:hover {
          background: var(--gray-200);
        }
      `}</style>

      <div className="badge-grid-widget__header">
        <h3 className="badge-grid-widget__title">Badges</h3>
        <span className="badge-grid-widget__count">{earnedCount} of {ALL_BADGES.length} earned</span>
      </div>

      <div className="badge-grid-widget__grid">
        {ALL_BADGES.map((badge) => {
          const isEarned = earnedIds.has(badge.id);
          const color = isEarned ? '#c5a55a' : '#9ca3af';
          return (
            <div
              key={badge.id}
              className="badge-grid-widget__item"
              onClick={() => setSelectedBadge(badge)}
            >
              <div className={`badge-grid-widget__icon-wrap ${isEarned ? 'badge-grid-widget__icon-wrap--earned' : 'badge-grid-widget__icon-wrap--locked'}`}>
                {badge.icon(color)}
                {!isEarned && (
                  <div className="badge-grid-widget__lock">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                )}
              </div>
              <span className={`badge-grid-widget__name ${isEarned ? 'badge-grid-widget__name--earned' : 'badge-grid-widget__name--locked'}`}>
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>

      {selectedBadge && (
        <div className="badge-grid-widget__overlay" onClick={() => setSelectedBadge(null)}>
          <div className="badge-grid-widget__detail" onClick={(e) => e.stopPropagation()}>
            <div className={`badge-grid-widget__detail-icon ${earnedIds.has(selectedBadge.id) ? 'badge-grid-widget__detail-icon--earned' : 'badge-grid-widget__detail-icon--locked'}`}>
              {selectedBadge.icon(earnedIds.has(selectedBadge.id) ? '#c5a55a' : '#9ca3af')}
            </div>
            <div className="badge-grid-widget__detail-name">{selectedBadge.name}</div>
            <div className={`badge-grid-widget__detail-status ${earnedIds.has(selectedBadge.id) ? 'badge-grid-widget__detail-status--earned' : 'badge-grid-widget__detail-status--locked'}`}>
              {earnedIds.has(selectedBadge.id) ? 'Earned' : 'Locked'}
            </div>
            <div className="badge-grid-widget__detail-criteria">{selectedBadge.criteria}</div>
            <button className="badge-grid-widget__detail-close" onClick={() => setSelectedBadge(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
