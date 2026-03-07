import React, { useState, useEffect } from 'react';
import { getLevelTitle } from '../lib/levels';

/**
 * LevelUpModal — Celebration modal with CSS-only confetti effect.
 * Shows once per session per level (tracked via sessionStorage).
 */
export default function LevelUpModal({ level, previousLevel }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!level || !previousLevel || level <= previousLevel) return;

    const storageKey = `levelup_shown_${level}`;
    if (sessionStorage.getItem(storageKey)) return;

    // Show modal after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(storageKey, 'true');
    }, 600);

    return () => clearTimeout(timer);
  }, [level, previousLevel]);

  if (!visible) return null;

  const title = getLevelTitle(level);

  // Generate confetti particles
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    color: ['#c5a55a', '#d4b96e', '#ef4444', '#8b5cf6', '#10b981', '#0ea5e9', '#f59e0b'][i % 7],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="levelup-modal__overlay">
      <style>{`
        .levelup-modal__overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: levelup-overlay-in 0.3s ease;
        }
        @keyframes levelup-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .levelup-modal__confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .levelup-modal__confetti {
          position: absolute;
          top: -10px;
          border-radius: 2px;
          animation: levelup-confetti-fall linear forwards;
          opacity: 0;
        }
        @keyframes levelup-confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .levelup-modal__card {
          background: var(--white);
          border-radius: 16px;
          padding: 48px 40px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          animation: levelup-card-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes levelup-card-in {
          from { transform: scale(0.5) translateY(40px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .levelup-modal__star {
          margin-bottom: 16px;
          animation: levelup-star-pulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes levelup-star-pulse {
          from { transform: scale(1); filter: drop-shadow(0 0 8px rgba(197,165,90,0.4)); }
          to { transform: scale(1.1); filter: drop-shadow(0 0 16px rgba(197,165,90,0.6)); }
        }
        .levelup-modal__heading {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .levelup-modal__level {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1;
          margin-bottom: 4px;
        }
        .levelup-modal__title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gold-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .levelup-modal__message {
          font-size: 0.9375rem;
          color: var(--gray-500);
          margin-bottom: 28px;
          line-height: 1.5;
        }
        .levelup-modal__btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--white);
          border: none;
          border-radius: 8px;
          padding: 12px 40px;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .levelup-modal__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(197, 165, 90, 0.4);
        }
      `}</style>

      <div className="levelup-modal__confetti-container">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="levelup-modal__confetti"
            style={{
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size * 1.5}px`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              transform: `rotate(${c.rotation}deg)`,
            }}
          />
        ))}
      </div>

      <div className="levelup-modal__card">
        <div className="levelup-modal__star">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
              fill="#c5a55a"
              stroke="#a88d44"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="levelup-modal__heading">Level Up!</div>
        <div className="levelup-modal__level">{level}</div>
        <div className="levelup-modal__title">{title}</div>
        <div className="levelup-modal__message">
          You have reached Level {level}. Keep learning and earning XP to unlock new achievements.
        </div>
        <button className="levelup-modal__btn" onClick={() => setVisible(false)}>
          Continue
        </button>
      </div>
    </div>
  );
}
