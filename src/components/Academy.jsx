import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { getLevelTitle } from '../lib/levels';
import StreakWidget from './StreakWidget';
import XPWidget from './XPWidget';
import BadgeGrid from './BadgeGrid';
import LevelUpModal from './LevelUpModal';

const TYPE_COLORS = {
  course: '#C5A55A',
  quest: '#8b5cf6',
  challenge: '#ef4444',
  'meditation series': '#10b981',
  'podcast series': '#0ea5e9',
};

/* Medal SVGs for top 3 leaderboard spots */
const MEDAL_ICONS = {
  1: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" fill="#c5a55a" stroke="#a88d44" strokeWidth="1" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill="#c5a55a" stroke="#a88d44" strokeWidth="1" />
      <text x="12" y="10.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">1</text>
    </svg>
  ),
  2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      <text x="12" y="10.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">2</text>
    </svg>
  ),
  3: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" fill="#b45309" stroke="#92400e" strokeWidth="1" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill="#b45309" stroke="#92400e" strokeWidth="1" />
      <text x="12" y="10.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">3</text>
    </svg>
  ),
};

function CourseCard({ course, enrolled, onClick }) {
  const typeLower = (course.type || 'course').toLowerCase();
  const typeColor = TYPE_COLORS[typeLower] || '#C5A55A';

  return (
    <div className="card course-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="course-card__thumbnail">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} />
        ) : (
          <div className="course-card__placeholder" />
        )}
        <span className="course-card__type-pill" style={{ background: typeColor }}>
          {course.type || 'Course'}
        </span>
      </div>
      <div className="card__body course-card__body">
        <h4 className="course-card__title">{course.title}</h4>
        {course.category && (
          <span className="course-card__category">{course.category}</span>
        )}
        <div className="course-card__meta">
          {course.lessonCount != null && (
            <span>{course.lessonCount} lesson{course.lessonCount !== 1 ? 's' : ''}</span>
          )}
          {course.estimatedDuration && (
            <span>{course.estimatedDuration}</span>
          )}
        </div>
        {enrolled ? (
          <div className="course-card__progress">
            <div className="progress-bar progress-bar--sm">
              <div
                className="progress-bar__fill"
                style={{ width: `${enrolled.progressPercent || 0}%` }}
              />
            </div>
            <span className="course-card__progress-text">
              {enrolled.progressPercent || 0}%
            </span>
          </div>
        ) : (
          <div className="course-card__price">
            {course.price && course.price > 0 ? (
              <span className="course-card__price-badge">
                R{course.price.toLocaleString()}
                {course.priceUsd ? ` / $${course.priceUsd}` : ''}
              </span>
            ) : (
              <span className="course-card__price-badge course-card__price-badge--free">
                Free
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Academy() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  // Track previous level for LevelUpModal
  const [previousLevel, setPreviousLevel] = useState(null);

  useEffect(() => {
    // Read previously known level from sessionStorage
    const storedLevel = sessionStorage.getItem('academy_known_level');
    if (storedLevel) setPreviousLevel(parseInt(storedLevel, 10));

    Promise.all([
      api.myEnrollments().catch(() => ({ enrollments: [] })),
      api.coursesPublished().catch(() => ({ courses: [] })),
      api.myProgress().catch(() => ({ xp: 0, streak: 0, longestStreak: 0, level: 1, badges: [], lastActive: null })),
      api.leaderboard().catch(() => ({ leaderboard: [], userRank: null })),
    ]).then(([enrData, crsData, progData, lbData]) => {
      setEnrollments(enrData.enrollments || []);
      setCourses(crsData.courses || []);
      setProgress(progData);
      setLeaderboard(lbData.leaderboard || []);
      setUserRank(lbData.userRank);

      // Set previous level for modal detection
      const currentLevel = progData?.level || 1;
      if (!storedLevel) {
        // First visit this session — store level, don't trigger modal
        setPreviousLevel(currentLevel);
      }
      sessionStorage.setItem('academy_known_level', String(currentLevel));

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading your academy...</p>
      </div>
    );
  }

  const xp = progress?.xp || 0;
  const streak = progress?.streak || 0;
  const longestStreak = progress?.longestStreak || 0;
  const level = progress?.level || 1;
  const badges = progress?.badges || [];
  const lastActive = progress?.lastActive || null;
  const enrollmentMap = {};
  enrollments.forEach((e) => {
    enrollmentMap[e.courseId] = e;
  });
  // Enrolled course IDs from enrollments data
  const enrolledCourseIds = new Set(enrollments.map(e => e.courseId));
  // Also use the enrolled flag from courses-published
  courses.forEach(c => { if (c.enrolled) enrolledCourseIds.add(c.id); });
  // Courses the client is NOT enrolled in
  const availableCourses = courses.filter(c => !enrolledCourseIds.has(c.id));
  const featuredAvailable = availableCourses.filter(c => c.featured);
  const featuredCourses = featuredAvailable.length > 0 ? featuredAvailable : availableCourses.slice(0, 4);

  return (
    <div className="academy-page">
      <style>{`
        .academy-progress-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .academy-progress-row {
            grid-template-columns: 1fr;
          }
        }
        .academy-quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .academy-quick-stat {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition), box-shadow var(--transition);
        }
        .academy-quick-stat:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .academy-quick-stat--clickable {
          cursor: pointer;
        }
        .academy-quick-stat__icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .academy-quick-stat__text {
          display: flex;
          flex-direction: column;
        }
        .academy-quick-stat__value {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1.2;
        }
        .academy-quick-stat__label {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        /* Enhanced leaderboard */
        .leaderboard-enhanced {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        .leaderboard-enhanced__header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .leaderboard-enhanced__header h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .leaderboard-enhanced__body {
          padding: 8px 0;
        }
        .leaderboard-enhanced__row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          transition: background 0.15s;
        }
        .leaderboard-enhanced__row:hover {
          background: var(--gray-50);
        }
        .leaderboard-enhanced__row--you {
          background: rgba(197, 165, 90, 0.06);
        }
        .leaderboard-enhanced__rank {
          width: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .leaderboard-enhanced__rank-text {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gray-400);
        }
        .leaderboard-enhanced__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--white);
          flex-shrink: 0;
        }
        .leaderboard-enhanced__name {
          flex: 1;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .leaderboard-enhanced__xp {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gold-dark);
          white-space: nowrap;
        }
        .leaderboard-enhanced__level {
          font-size: 0.6875rem;
          color: var(--gray-400);
          white-space: nowrap;
          min-width: 40px;
          text-align: right;
        }
        .leaderboard-enhanced__divider {
          text-align: center;
          padding: 4px 0;
          color: var(--gray-300);
          font-size: 0.75rem;
        }
        .leaderboard-enhanced__empty {
          padding: 24px 20px;
          text-align: center;
          color: var(--gray-400);
          font-size: 0.875rem;
        }

        /* Bottom grid for leaderboard + badges side by side */
        .academy-bottom-grid-v2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .academy-bottom-grid-v2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h2>Academy</h2>
          <p className="page-subtitle">
            Learn, grow, and level up. Courses, quests, and challenges built for your journey.
          </p>
        </div>
        <button
          className="btn btn--outline btn--sm"
          onClick={() => navigate('/learn/search')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginTop: '4px' }}
          title="Search courses"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
      </div>

      {/* Level Up Modal */}
      <LevelUpModal level={level} previousLevel={previousLevel} />

      {/* Streak + XP Widgets */}
      <div className="academy-progress-row">
        <StreakWidget streak={streak} longestStreak={longestStreak} lastActive={lastActive} />
        <XPWidget xp={xp} level={level} />
      </div>

      {/* Quick Stats */}
      <div className="academy-quick-stats">
        <div className="academy-quick-stat">
          <div className="academy-quick-stat__icon" style={{ background: 'rgba(197,165,90,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="academy-quick-stat__text">
            <div className="academy-quick-stat__value">{xp.toLocaleString()}</div>
            <div className="academy-quick-stat__label">Total XP</div>
          </div>
        </div>
        <div className="academy-quick-stat">
          <div className="academy-quick-stat__icon" style={{ background: 'rgba(139,92,246,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="academy-quick-stat__text">
            <div className="academy-quick-stat__value">{enrollments.length}</div>
            <div className="academy-quick-stat__label">Enrolled</div>
          </div>
        </div>
        <div className="academy-quick-stat">
          <div className="academy-quick-stat__icon" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="academy-quick-stat__text">
            <div className="academy-quick-stat__value">{badges.length}</div>
            <div className="academy-quick-stat__label">Badges</div>
          </div>
        </div>
        <div
          className="academy-quick-stat academy-quick-stat--clickable"
          onClick={() => navigate('/learn/certificates')}
        >
          <div className="academy-quick-stat__icon" style={{ background: 'rgba(197,165,90,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <div className="academy-quick-stat__text">
            <div className="academy-quick-stat__value" style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>View All</div>
            <div className="academy-quick-stat__label">Certificates</div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {enrollments.length > 0 && (
        <div className="academy-section">
          <div className="academy-section__header">
            <h3>Continue Learning</h3>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => navigate('/learn/browse')}
            >
              Browse All
            </button>
          </div>
          <div className="course-grid">
            {enrollments.map((enr) => (
              <CourseCard
                key={enr.courseId}
                course={{
                  id: enr.courseId,
                  title: enr.courseTitle,
                  thumbnail: enr.courseThumbnail,
                  slug: enr.courseSlug,
                  type: 'course',
                }}
                enrolled={enr}
                onClick={() => navigate(`/learn/${enr.courseSlug}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Browse Available Courses */}
      <div className="academy-section">
        <div className="academy-section__header">
          <h3>Browse Available Courses</h3>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => navigate('/learn/browse')}
          >
            View All
          </button>
        </div>
        {featuredCourses.length > 0 ? (
          <div className="course-grid">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrolled={enrollmentMap[course.id]}
                onClick={() => navigate(`/learn/${course.slug}`)}
              />
            ))}
          </div>
        ) : enrollments.length > 0 ? (
          <div className="empty-state">
            <p>You are enrolled in all available courses. Check back soon for new content.</p>
          </div>
        ) : (
          <div className="empty-state">
            <p>No courses available yet. Check back soon.</p>
          </div>
        )}
      </div>

      {/* Leaderboard + Badges side by side */}
      <div className="academy-bottom-grid-v2">
        {/* Enhanced Leaderboard */}
        <div className="leaderboard-enhanced">
          <div className="leaderboard-enhanced__header">
            <h3>Leaderboard</h3>
            {userRank && (
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                Your rank: #{userRank}
              </span>
            )}
          </div>
          <div className="leaderboard-enhanced__body">
            {leaderboard.length > 0 ? (
              <>
                {leaderboard.slice(0, 10).map((entry) => {
                  const avatarColors = ['#c5a55a', '#8b5cf6', '#ef4444', '#10b981', '#0ea5e9', '#f59e0b', '#6366f1'];
                  const avatarColor = avatarColors[(entry.rank - 1) % avatarColors.length];
                  const initial = (entry.name || '?').charAt(0).toUpperCase();
                  const isYou = entry.isCurrentUser;

                  return (
                    <div
                      key={entry.rank}
                      className={`leaderboard-enhanced__row${isYou ? ' leaderboard-enhanced__row--you' : ''}`}
                    >
                      <div className="leaderboard-enhanced__rank">
                        {MEDAL_ICONS[entry.rank] || (
                          <span className="leaderboard-enhanced__rank-text">#{entry.rank}</span>
                        )}
                      </div>
                      <div
                        className="leaderboard-enhanced__avatar"
                        style={{ background: avatarColor }}
                      >
                        {initial}
                      </div>
                      <span className="leaderboard-enhanced__name">
                        {entry.name}{isYou ? ' (You)' : ''}
                      </span>
                      <span className="leaderboard-enhanced__xp">
                        {entry.xp.toLocaleString()} XP
                      </span>
                      <span className="leaderboard-enhanced__level">
                        Lv {entry.level}
                      </span>
                    </div>
                  );
                })}
                {userRank && userRank > 10 && (
                  <>
                    <div className="leaderboard-enhanced__divider">...</div>
                    <div className="leaderboard-enhanced__row leaderboard-enhanced__row--you">
                      <div className="leaderboard-enhanced__rank">
                        <span className="leaderboard-enhanced__rank-text">#{userRank}</span>
                      </div>
                      <div
                        className="leaderboard-enhanced__avatar"
                        style={{ background: '#c5a55a' }}
                      >
                        Y
                      </div>
                      <span className="leaderboard-enhanced__name">You</span>
                      <span className="leaderboard-enhanced__xp">
                        {xp.toLocaleString()} XP
                      </span>
                      <span className="leaderboard-enhanced__level">
                        Lv {level}
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="leaderboard-enhanced__empty">
                No leaderboard data yet. Start learning to climb the ranks.
              </div>
            )}
          </div>
        </div>

        {/* Badge Grid */}
        <BadgeGrid earnedBadges={badges} />
      </div>
    </div>
  );
}
