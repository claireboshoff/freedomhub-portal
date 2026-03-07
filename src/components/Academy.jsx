import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const TYPE_COLORS = {
  course: '#C5A55A',
  quest: '#8b5cf6',
  challenge: '#ef4444',
  'meditation series': '#10b981',
  'podcast series': '#0ea5e9',
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

  useEffect(() => {
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
  const level = progress?.level || 1;
  const badges = progress?.badges || [];
  const featuredCourses = courses.filter((c) => c.featured);
  const enrollmentMap = {};
  enrollments.forEach((e) => {
    enrollmentMap[e.courseId] = e;
  });

  return (
    <div className="academy-page">
      <div className="page-header">
        <h2>Academy</h2>
        <p className="page-subtitle">
          Learn, grow, and level up. Courses, quests, and challenges built for your journey.
        </p>
      </div>

      {/* Gamification Stats */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12z" />
              <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
          <div className="metric-card__label">Current Streak</div>
          <div className="metric-card__value">{streak}</div>
          <div className="metric-card__sub">day{streak !== 1 ? 's' : ''}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="metric-card__label">Total XP</div>
          <div className="metric-card__value">{xp.toLocaleString()}</div>
          <div className="metric-card__sub">experience points</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7" />
              <path d="M4 22h16" />
              <path d="M10 22V8a2 2 0 0 0-2-2H6" />
              <path d="M14 22V8a2 2 0 0 1 2-2h2" />
              <path d="M8 6h8" />
            </svg>
          </div>
          <div className="metric-card__label">Level</div>
          <div className="metric-card__value">{level}</div>
          <div className="metric-card__sub">keep going</div>
        </div>
        <div className="metric-card" onClick={() => navigate('/learn/certificates')} style={{ cursor: 'pointer' }}>
          <div className="metric-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <div className="metric-card__label">My Certificates</div>
          <div className="metric-card__value" style={{ fontSize: '14px', color: 'var(--gold)' }}>View All</div>
          <div className="metric-card__sub">earned awards</div>
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

      {/* Featured Courses */}
      <div className="academy-section">
        <div className="academy-section__header">
          <h3>Featured Courses</h3>
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
        ) : (
          <div className="empty-state">
            <p>No featured courses yet. Check back soon.</p>
          </div>
        )}
      </div>

      <div className="academy-bottom-grid">
        {/* Leaderboard */}
        <div className="card">
          <div className="card__header">
            <h3>Leaderboard</h3>
          </div>
          <div className="card__body">
            {leaderboard.length > 0 ? (
              <div className="leaderboard-list">
                {leaderboard.slice(0, 5).map((entry) => (
                  <div key={entry.rank} className="leaderboard-item">
                    <span className="leaderboard-item__rank">#{entry.rank}</span>
                    <span className="leaderboard-item__name">{entry.name}</span>
                    <span className="leaderboard-item__xp">{entry.xp.toLocaleString()} XP</span>
                    <span className="leaderboard-item__level">Lv {entry.level}</span>
                  </div>
                ))}
                {userRank && userRank > 5 && (
                  <>
                    <div className="leaderboard-divider">...</div>
                    <div className="leaderboard-item leaderboard-item--you">
                      <span className="leaderboard-item__rank">#{userRank}</span>
                      <span className="leaderboard-item__name">You</span>
                      <span className="leaderboard-item__xp">{xp.toLocaleString()} XP</span>
                      <span className="leaderboard-item__level">Lv {level}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <p>No leaderboard data yet. Start learning to climb the ranks.</p>
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <div className="card__header">
            <h3>My Badges</h3>
          </div>
          <div className="card__body">
            {badges.length > 0 ? (
              <div className="badges-grid">
                {badges.map((badge, i) => (
                  <div key={i} className="badge-item" title={badge.description || badge.name}>
                    <div className="badge-item__icon">
                      {badge.icon || (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6" />
                          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                        </svg>
                      )}
                    </div>
                    <span className="badge-item__name">{badge.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Complete courses and challenges to earn badges.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
