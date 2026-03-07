import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function MyProgress() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.myLearningProgress()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load progress');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading your progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mp__error">
        <p>{error}</p>
        <button className="btn btn--primary" onClick={() => navigate('/learn')}>Back to Academy</button>
      </div>
    );
  }

  const { stats, activeCourses, completedCourses, activityDays, badges, learningStats } = data;

  // Build 30-day calendar
  const today = new Date();
  const calendarDays = [];
  const activitySet = new Set(activityDays || []);
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    calendarDays.push({
      date: dateStr,
      dayLabel: d.getDate(),
      active: activitySet.has(dateStr),
    });
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="mp__page">
      <style>{`
        .mp__page {
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 16px 60px;
        }
        .mp__header {
          margin-bottom: 28px;
        }
        .mp__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #c5a55a;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-bottom: 12px;
        }
        .mp__back:hover {
          text-decoration: underline;
        }
        .mp__title {
          font-family: 'League Spartan', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0;
        }
        .mp__stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (max-width: 700px) {
          .mp__stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        .mp__stat-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
          text-align: center;
        }
        .mp__stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .mp__stat-value {
          font-family: 'League Spartan', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .mp__stat-value--gold {
          color: #c5a55a;
        }
        .mp__section {
          margin-bottom: 32px;
        }
        .mp__section-title {
          font-family: 'League Spartan', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0 0 16px;
        }
        .mp__courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .mp__course-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .mp__course-thumb {
          width: 100%;
          height: 140px;
          object-fit: cover;
          background: #f0ede6;
        }
        .mp__course-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .mp__course-title {
          font-family: 'League Spartan', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #2d2d2d;
          margin: 0 0 10px;
        }
        .mp__progress-wrap {
          margin-bottom: 8px;
        }
        .mp__progress-bar {
          width: 100%;
          height: 8px;
          background: #eee;
          border-radius: 4px;
          overflow: hidden;
        }
        .mp__progress-fill {
          height: 100%;
          background: #c5a55a;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .mp__progress-fill--complete {
          background: #10b981;
        }
        .mp__progress-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .mp__course-meta {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #999;
          margin-bottom: 12px;
        }
        .mp__course-actions {
          margin-top: auto;
        }
        .mp__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background 0.2s;
        }
        .mp__btn--primary {
          background: #c5a55a;
          color: #fff;
        }
        .mp__btn--primary:hover {
          background: #b3944e;
        }
        .mp__btn--ghost {
          background: transparent;
          color: #c5a55a;
          border: 1px solid #c5a55a;
        }
        .mp__btn--ghost:hover {
          background: rgba(197,165,90,0.08);
        }
        .mp__calendar {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
        }
        .mp__calendar-grid {
          display: grid;
          grid-template-columns: repeat(15, 1fr);
          gap: 4px;
        }
        @media (max-width: 600px) {
          .mp__calendar-grid { grid-template-columns: repeat(10, 1fr); }
        }
        .mp__cal-day {
          aspect-ratio: 1;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #999;
          background: #f5f5f5;
        }
        .mp__cal-day--active {
          background: #c5a55a;
          color: #fff;
        }
        .mp__cal-day--today {
          border: 2px solid #2d2d2d;
        }
        .mp__badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
        }
        .mp__badge-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 16px;
          text-align: center;
        }
        .mp__badge-card--locked {
          opacity: 0.45;
        }
        .mp__badge-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          font-size: 24px;
        }
        .mp__badge-icon--earned {
          background: rgba(197,165,90,0.15);
        }
        .mp__badge-icon--locked {
          background: #f0f0f0;
        }
        .mp__badge-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 4px;
        }
        .mp__badge-desc {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #999;
          margin-bottom: 4px;
        }
        .mp__badge-date {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #c5a55a;
          font-weight: 500;
        }
        .mp__learning-stats {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
        }
        .mp__ls-item {
          text-align: center;
        }
        .mp__ls-value {
          font-family: 'League Spartan', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .mp__ls-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
          margin-top: 2px;
        }
        .mp__empty {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 32px;
          text-align: center;
          color: #999;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
        }
      `}</style>

      {/* Header */}
      <div className="mp__header">
        <button className="mp__back" onClick={() => navigate('/learn')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Academy
        </button>
        <h1 className="mp__title">My Learning Journey</h1>
      </div>

      {/* Stats Row */}
      <div className="mp__stats-row">
        <div className="mp__stat-card">
          <div className="mp__stat-label">Courses Enrolled</div>
          <div className="mp__stat-value">{stats?.coursesEnrolled || 0}</div>
        </div>
        <div className="mp__stat-card">
          <div className="mp__stat-label">Courses Completed</div>
          <div className="mp__stat-value">{stats?.coursesCompleted || 0}</div>
        </div>
        <div className="mp__stat-card">
          <div className="mp__stat-label">Total XP</div>
          <div className="mp__stat-value mp__stat-value--gold">{stats?.totalXp || 0}</div>
        </div>
        <div className="mp__stat-card">
          <div className="mp__stat-label">Current Streak</div>
          <div className="mp__stat-value">{stats?.currentStreak || 0}<span style={{ fontSize: '18px', marginLeft: '2px' }}>d</span></div>
        </div>
      </div>

      {/* Active Courses */}
      <div className="mp__section">
        <h2 className="mp__section-title">Active Courses</h2>
        {activeCourses && activeCourses.length > 0 ? (
          <div className="mp__courses-grid">
            {activeCourses.map((course) => {
              const pct = course.totalLessons > 0 ? Math.round((course.lessonsCompleted / course.totalLessons) * 100) : 0;
              return (
                <div key={course.courseId} className="mp__course-card">
                  {course.thumbnail ? (
                    <img className="mp__course-thumb" src={course.thumbnail} alt={course.title} />
                  ) : (
                    <div className="mp__course-thumb" />
                  )}
                  <div className="mp__course-body">
                    <h3 className="mp__course-title">{course.title}</h3>
                    <div className="mp__progress-wrap">
                      <div className="mp__progress-bar">
                        <div className="mp__progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mp__progress-text">{course.lessonsCompleted}/{course.totalLessons} lessons ({pct}%)</div>
                    </div>
                    <div className="mp__course-meta">Last active: {formatDate(course.lastActivity)}</div>
                    <div className="mp__course-actions">
                      <button
                        className="mp__btn mp__btn--primary"
                        onClick={() => navigate(`/learn/${course.slug}/lesson/${course.nextLessonId}`)}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mp__empty">No active courses. <button className="mp__btn mp__btn--ghost" style={{ marginLeft: 8 }} onClick={() => navigate('/learn/browse')}>Browse Courses</button></div>
        )}
      </div>

      {/* Completed Courses */}
      {completedCourses && completedCourses.length > 0 && (
        <div className="mp__section">
          <h2 className="mp__section-title">Completed Courses</h2>
          <div className="mp__courses-grid">
            {completedCourses.map((course) => (
              <div key={course.courseId} className="mp__course-card">
                {course.thumbnail ? (
                  <img className="mp__course-thumb" src={course.thumbnail} alt={course.title} />
                ) : (
                  <div className="mp__course-thumb" />
                )}
                <div className="mp__course-body">
                  <h3 className="mp__course-title">{course.title}</h3>
                  <div className="mp__progress-wrap">
                    <div className="mp__progress-bar">
                      <div className="mp__progress-fill mp__progress-fill--complete" style={{ width: '100%' }} />
                    </div>
                    <div className="mp__progress-text">Completed {formatDate(course.completedDate)}</div>
                  </div>
                  <div className="mp__course-actions">
                    {course.certificateId && (
                      <button
                        className="mp__btn mp__btn--ghost"
                        onClick={() => navigate(`/learn/certificate/${course.certificateId}`)}
                      >
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak Calendar */}
      <div className="mp__section">
        <h2 className="mp__section-title">Streak Calendar</h2>
        <div className="mp__calendar">
          <div className="mp__calendar-grid">
            {calendarDays.map((day) => {
              const isToday = day.date === today.toISOString().split('T')[0];
              let cls = 'mp__cal-day';
              if (day.active) cls += ' mp__cal-day--active';
              if (isToday) cls += ' mp__cal-day--today';
              return (
                <div key={day.date} className={cls} title={day.date}>
                  {day.dayLabel}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badge Collection */}
      <div className="mp__section">
        <h2 className="mp__section-title">Badge Collection</h2>
        {badges && badges.length > 0 ? (
          <div className="mp__badges-grid">
            {badges.map((badge) => {
              const earned = !!badge.earnedDate;
              return (
                <div key={badge.id} className={`mp__badge-card ${earned ? '' : 'mp__badge-card--locked'}`}>
                  <div className={`mp__badge-icon ${earned ? 'mp__badge-icon--earned' : 'mp__badge-icon--locked'}`}>
                    {earned ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="2"><path d="M12 15l-3 3 1-4-3-3h4L12 7l1 4h4l-3 3 1 4z"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><circle cx="12" cy="12" r="8"/><path d="M12 8v0"/></svg>
                    )}
                  </div>
                  <div className="mp__badge-name">{badge.name}</div>
                  <div className="mp__badge-desc">{badge.description}</div>
                  {earned && <div className="mp__badge-date">Earned {formatDate(badge.earnedDate)}</div>}
                  {!earned && <div className="mp__badge-desc">Locked</div>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mp__empty">No badges available yet.</div>
        )}
      </div>

      {/* Learning Stats */}
      {learningStats && (
        <div className="mp__section">
          <h2 className="mp__section-title">Learning Stats</h2>
          <div className="mp__learning-stats">
            <div className="mp__ls-item">
              <div className="mp__ls-value">{formatTime(learningStats.totalMinutes)}</div>
              <div className="mp__ls-label">Total Time</div>
            </div>
            <div className="mp__ls-item">
              <div className="mp__ls-value">{learningStats.lessonsCompleted || 0}</div>
              <div className="mp__ls-label">Lessons Completed</div>
            </div>
            <div className="mp__ls-item">
              <div className="mp__ls-value">{learningStats.quizzesTaken || 0}</div>
              <div className="mp__ls-label">Quizzes Taken</div>
            </div>
            <div className="mp__ls-item">
              <div className="mp__ls-value">{learningStats.avgQuizScore != null ? `${learningStats.avgQuizScore}%` : '--'}</div>
              <div className="mp__ls-label">Avg Quiz Score</div>
            </div>
            <div className="mp__ls-item">
              <div className="mp__ls-value">{learningStats.reflectionsSubmitted || 0}</div>
              <div className="mp__ls-label">Reflections</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
