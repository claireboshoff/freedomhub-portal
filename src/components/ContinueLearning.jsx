import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function ContinueLearning() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    api.continueLearning()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="cl__card cl__card--loading">
        <style>{clStyles}</style>
        <div className="spinner" style={{ width: 24, height: 24 }} />
      </div>
    );
  }

  if (!data) return null;

  const { currentCourse, streak, xp, level, levelTitle } = data;

  if (!currentCourse) {
    return (
      <div className="cl__card">
        <style>{clStyles}</style>
        <div className="cl__empty">
          <div className="cl__empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <p className="cl__empty-text">Start your learning journey</p>
          <button className="cl__btn cl__btn--primary" onClick={() => navigate('/learn/browse')}>
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const pct = currentCourse.totalLessons > 0
    ? Math.round((currentCourse.lessonsCompleted / currentCourse.totalLessons) * 100)
    : 0;

  return (
    <div className="cl__card">
      <style>{clStyles}</style>

      <div className="cl__header-row">
        <h3 className="cl__heading">Continue Learning</h3>
        <div className="cl__meta-badges">
          {streak > 0 && (
            <span className="cl__streak">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z"/></svg>
              {streak}
            </span>
          )}
          <span className="cl__level" title={`Level ${level}: ${levelTitle}`}>
            Lv{level}
          </span>
          <span className="cl__xp">{xp} XP</span>
        </div>
      </div>

      <div className="cl__course-row">
        {currentCourse.thumbnail ? (
          <img className="cl__thumb" src={currentCourse.thumbnail} alt={currentCourse.title} />
        ) : (
          <div className="cl__thumb cl__thumb--placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </div>
        )}
        <div className="cl__course-info">
          <div className="cl__course-title">{currentCourse.title}</div>
          <div className="cl__progress-wrap">
            <div className="cl__progress-bar">
              <div className="cl__progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="cl__progress-text">{currentCourse.lessonsCompleted}/{currentCourse.totalLessons} lessons</span>
          </div>
          {currentCourse.nextLessonTitle && (
            <div className="cl__next-lesson">Next: {currentCourse.nextLessonTitle}</div>
          )}
        </div>
      </div>

      <button
        className="cl__btn cl__btn--primary cl__btn--full"
        onClick={() => navigate(`/learn/${currentCourse.slug}/lesson/${currentCourse.nextLessonId}`)}
      >
        Continue
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

const clStyles = `
  .cl__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 20px;
    margin-bottom: 20px;
  }
  .cl__card--loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }
  .cl__header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .cl__heading {
    font-family: 'League Spartan', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0;
  }
  .cl__meta-badges {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cl__streak {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #c5a55a;
  }
  .cl__level {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #c5a55a;
    border-radius: 10px;
    padding: 2px 8px;
  }
  .cl__xp {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #888;
  }
  .cl__course-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 14px;
  }
  .cl__thumb {
    width: 72px;
    height: 52px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
    background: #f0ede6;
  }
  .cl__thumb--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cl__course-info {
    flex: 1;
    min-width: 0;
  }
  .cl__course-title {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2d2d2d;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cl__progress-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cl__progress-bar {
    flex: 1;
    height: 6px;
    background: #eee;
    border-radius: 3px;
    overflow: hidden;
  }
  .cl__progress-fill {
    height: 100%;
    background: #c5a55a;
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  .cl__progress-text {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: #999;
    white-space: nowrap;
  }
  .cl__next-lesson {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #888;
    margin-top: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cl__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 20px;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }
  .cl__btn--primary {
    background: #c5a55a;
    color: #fff;
  }
  .cl__btn--primary:hover {
    background: #b3944e;
  }
  .cl__btn--full {
    width: 100%;
  }
  .cl__empty {
    text-align: center;
    padding: 8px 0;
  }
  .cl__empty-icon {
    margin-bottom: 8px;
  }
  .cl__empty-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #888;
    margin: 0 0 12px;
  }
`;
