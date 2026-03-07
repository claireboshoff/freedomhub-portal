import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const CATEGORIES = ['All', 'Business', 'Wellness', 'Marketing', 'Mindset', 'Skills', 'Finance', 'Coaching'];
const TYPES = ['All', 'Courses', 'Quests', 'Challenges', 'Meditation Series', 'Podcast Series'];

const TYPE_COLORS = {
  course: '#C5A55A',
  quest: '#8b5cf6',
  challenge: '#ef4444',
  'meditation series': '#10b981',
  'podcast series': '#0ea5e9',
};

const TYPE_MAP = {
  Courses: 'course',
  Quests: 'quest',
  Challenges: 'challenge',
  'Meditation Series': 'meditation series',
  'Podcast Series': 'podcast series',
};

const GRADIENT_PLACEHOLDERS = [
  'linear-gradient(135deg, #c5a55a 0%, #2d2d2d 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)',
  'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
  'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%)',
  'linear-gradient(135deg, #c5a55a 0%, #78633a 100%)',
];

export default function CourseBrowse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');

  useEffect(() => {
    api.coursesPublished()
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = courses;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          (c.title || '').toLowerCase().includes(q) ||
          (c.description || '').toLowerCase().includes(q) ||
          (c.category || '').toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter(
        (c) => (c.category || '').toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (activeType !== 'All') {
      const mapped = TYPE_MAP[activeType];
      if (mapped) {
        result = result.filter(
          (c) => (c.type || '').toLowerCase() === mapped
        );
      }
    }

    return result;
  }, [courses, search, activeCategory, activeType]);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="br__loading">
          <div className="br__spinner" />
          <p className="br__loading-text">Loading courses...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="br__page">
        {/* Back link */}
        <button className="br__back-link" onClick={() => navigate('/learn')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Academy
        </button>

        {/* Header */}
        <div className="br__header">
          <h2 className="br__title">Browse Courses</h2>
          <p className="br__subtitle">
            Find the right course, quest, or challenge for where you are right now.
          </p>
        </div>

        {/* Search */}
        <div className="br__search-wrap">
          <div className="br__search-inner">
            <svg className="br__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="br__search-input"
              placeholder="Search courses, topics, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="br__filters">
          <span className="br__filter-label">Category</span>
          <div className="br__pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`br__pill${activeCategory === cat ? ' br__pill--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="br__filters" style={{ marginTop: '8px' }}>
          <span className="br__filter-label">Type</span>
          <div className="br__pills">
            {TYPES.map((type) => (
              <button
                key={type}
                className={`br__pill${activeType === type ? ' br__pill--active' : ''}`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="br__results-bar">
          <span className="br__results-count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="br__grid">
            {filtered.map((course, idx) => {
              const typeLower = (course.type || 'course').toLowerCase();
              const typeColor = TYPE_COLORS[typeLower] || '#C5A55A';
              const gradient = GRADIENT_PLACEHOLDERS[idx % GRADIENT_PLACEHOLDERS.length];

              return (
                <div
                  key={course.id}
                  className="br__card"
                  onClick={() => navigate(`/learn/${course.slug}`)}
                >
                  {/* Thumbnail */}
                  <div className="br__card-thumb">
                    {course.thumbnail ? (
                      <img className="br__card-img" src={course.thumbnail} alt={course.title} />
                    ) : (
                      <div className="br__card-placeholder" style={{ background: gradient }} />
                    )}
                    <span
                      className="br__type-pill"
                      style={{ backgroundColor: typeColor }}
                    >
                      {course.type || 'Course'}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="br__card-body">
                    <h4 className="br__card-title">{course.title}</h4>

                    {course.category && (
                      <span className="br__category-tag">{course.category}</span>
                    )}

                    {course.description && (
                      <p className="br__card-desc">{course.description}</p>
                    )}

                    <div className="br__card-meta">
                      {course.lessonCount != null && (
                        <span className="br__meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                          {course.lessonCount} lesson{course.lessonCount !== 1 ? 's' : ''}
                        </span>
                      )}
                      {course.estimatedDuration && (
                        <span className="br__meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {course.estimatedDuration}
                        </span>
                      )}
                      {course.enrollmentCount != null && course.enrollmentCount > 0 && (
                        <span className="br__meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          {course.enrollmentCount.toLocaleString()} enrolled
                        </span>
                      )}
                    </div>

                    <div className="br__card-footer">
                      {course.price && course.price > 0 ? (
                        <span className="br__price-badge">
                          R{course.price.toLocaleString()}
                          {course.priceUsd ? ` / $${course.priceUsd}` : ''}
                        </span>
                      ) : (
                        <span className="br__price-badge br__price-badge--free">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="br__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <p className="br__empty-text">No courses match your filters.</p>
            <p className="br__empty-hint">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </>
  );
}

const styles = `
  /* ── CourseBrowse (br__ prefix) ── */

  .br__page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 32px 24px 64px;
    font-family: 'Inter', sans-serif;
    color: #2d2d2d;
    background: #faf9f6;
    min-height: 100vh;
  }

  /* Back link */
  .br__back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #c5a55a;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    margin-bottom: 24px;
    transition: color 0.2s;
  }
  .br__back-link:hover {
    color: #a8893e;
  }

  /* Header */
  .br__header {
    margin-bottom: 28px;
  }
  .br__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }
  .br__subtitle {
    font-size: 15px;
    color: #6b6b6b;
    margin: 0;
    line-height: 1.5;
  }

  /* Search */
  .br__search-wrap {
    margin-bottom: 20px;
  }
  .br__search-inner {
    position: relative;
    display: flex;
    align-items: center;
  }
  .br__search-icon {
    position: absolute;
    left: 16px;
    color: #999;
    pointer-events: none;
  }
  .br__search-input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #2d2d2d;
    background: #fff;
    border: 1.5px solid #e5e2db;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .br__search-input::placeholder {
    color: #aaa;
  }
  .br__search-input:focus {
    border-color: #c5a55a;
    box-shadow: 0 0 0 3px rgba(197,165,90,0.12);
  }

  /* Filters */
  .br__filters {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .br__filter-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #999;
    min-width: 62px;
  }
  .br__pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .br__pill {
    padding: 7px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    background: #fff;
    border: 1.5px solid #e5e2db;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .br__pill:hover {
    border-color: #c5a55a;
    color: #c5a55a;
  }
  .br__pill--active {
    background: #c5a55a;
    border-color: #c5a55a;
    color: #fff;
  }
  .br__pill--active:hover {
    background: #b8943e;
    border-color: #b8943e;
    color: #fff;
  }

  /* Results bar */
  .br__results-bar {
    margin: 20px 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }
  .br__results-count {
    font-size: 13px;
    color: #999;
    font-weight: 500;
  }

  /* Grid */
  .br__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  /* Card */
  .br__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }
  .br__card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  /* Thumbnail */
  .br__card-thumb {
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
    background: #f0ede6;
  }
  .br__card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .br__card-placeholder {
    width: 100%;
    height: 100%;
  }

  /* Type pill */
  .br__type-pill {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #fff;
    border-radius: 14px;
    white-space: nowrap;
  }

  /* Card body */
  .br__card-body {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .br__card-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #2d2d2d;
    margin: 0 0 8px;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  /* Category tag */
  .br__category-tag {
    display: inline-block;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 600;
    color: #c5a55a;
    background: rgba(197,165,90,0.1);
    border-radius: 6px;
    margin-bottom: 10px;
    align-self: flex-start;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Description */
  .br__card-desc {
    font-size: 13px;
    color: #777;
    line-height: 1.55;
    margin: 0 0 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  /* Meta */
  .br__card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 14px;
  }
  .br__meta-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #999;
  }
  .br__meta-item svg {
    flex-shrink: 0;
  }

  /* Footer / Price */
  .br__card-footer {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid #f2f0eb;
  }
  .br__price-badge {
    display: inline-block;
    padding: 6px 16px;
    font-size: 14px;
    font-weight: 700;
    color: #2d2d2d;
    background: linear-gradient(135deg, rgba(197,165,90,0.15) 0%, rgba(197,165,90,0.08) 100%);
    border: 1px solid rgba(197,165,90,0.25);
    border-radius: 8px;
    font-family: 'League Spartan', sans-serif;
    letter-spacing: 0.01em;
  }
  .br__price-badge--free {
    color: #10b981;
    background: rgba(16,185,129,0.08);
    border-color: rgba(16,185,129,0.2);
  }

  /* Empty state */
  .br__empty {
    text-align: center;
    padding: 64px 24px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-top: 24px;
  }
  .br__empty-text {
    font-family: 'League Spartan', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #2d2d2d;
    margin: 16px 0 4px;
  }
  .br__empty-hint {
    font-size: 14px;
    color: #999;
    margin: 0;
  }

  /* Loading */
  .br__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    background: #faf9f6;
  }
  .br__spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e5e2db;
    border-top-color: #c5a55a;
    border-radius: 50%;
    animation: br__spin 0.7s linear infinite;
  }
  @keyframes br__spin {
    to { transform: rotate(360deg); }
  }
  .br__loading-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #999;
    margin: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .br__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }
  @media (max-width: 640px) {
    .br__page {
      padding: 20px 16px 48px;
    }
    .br__title {
      font-size: 26px;
    }
    .br__grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .br__card-thumb {
      height: 160px;
    }
    .br__filters {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    .br__filter-label {
      min-width: unset;
    }
  }
`;
