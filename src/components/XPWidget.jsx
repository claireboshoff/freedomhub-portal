import React, { useState, useEffect } from 'react';
import { getLevelTitle, getNextLevelTitle, getNextLevelXP, getLevelXP, getLevelProgress } from '../lib/levels';

/**
 * XPWidget — Circular progress ring showing XP progress toward next level.
 */
export default function XPWidget({ xp = 0, level = 1 }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = getLevelProgress(xp, level);
  const title = getLevelTitle(level);
  const nextTitle = getNextLevelTitle(level);
  const nextXP = getNextLevelXP(level);
  const currentXP = getLevelXP(level);
  const isMaxLevel = nextXP === null;

  // Animate the ring on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  // SVG circle math
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="xp-widget">
      <style>{`
        .xp-widget {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .xp-widget__ring-container {
          position: relative;
          width: ${size}px;
          height: ${size}px;
        }
        .xp-widget__ring-bg {
          fill: none;
          stroke: var(--gray-200);
          stroke-width: ${strokeWidth};
        }
        .xp-widget__ring-fill {
          fill: none;
          stroke: var(--gold);
          stroke-width: ${strokeWidth};
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: center;
          transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 0 4px rgba(197, 165, 90, 0.3));
        }
        .xp-widget__ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .xp-widget__level-num {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
        }
        .xp-widget__level-title {
          font-size: 0.6875rem;
          color: var(--gold-dark);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .xp-widget__xp-count {
          font-family: var(--font-heading);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .xp-widget__xp-count span {
          color: var(--gray-400);
          font-weight: 400;
        }
        .xp-widget__next {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
      `}</style>

      <div className="xp-widget__ring-container">
        <svg width={size} height={size}>
          <circle
            className="xp-widget__ring-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <circle
            className="xp-widget__ring-fill"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="xp-widget__ring-text">
          <div className="xp-widget__level-num">Lv {level}</div>
          <div className="xp-widget__level-title">{title}</div>
        </div>
      </div>

      <div className="xp-widget__xp-count">
        {xp.toLocaleString()} <span>/ {isMaxLevel ? 'MAX' : nextXP.toLocaleString()} XP</span>
      </div>

      {!isMaxLevel && nextTitle && (
        <div className="xp-widget__next">Next: {nextTitle}</div>
      )}
      {isMaxLevel && (
        <div className="xp-widget__next" style={{ color: 'var(--gold)' }}>Maximum level reached</div>
      )}
    </div>
  );
}
