import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const CATEGORIES = ['All', 'Business', 'Marketing', 'Leadership', 'Mindset', 'Finance', 'Wellness'];
const CONTENT_TYPES = ['All', 'Video', 'Audio', 'Article', 'Meditation'];

const STORAGE_KEY = 'cs__recent_searches';
const MAX_RECENT = 5;

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecentSearch(query) {
  if (!query.trim()) return;
  const recent = getRecentSearches().filter((s) => s !== query);
  recent.unshift(query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function clearRecentSearches() {
  localStorage.removeItem(STORAGE_KEY);
}

/* Content type icons */
function ContentTypeIcon({ type }) {
  const t = (type || '').toLowerCase();
  if (t === 'video') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
  }
  if (t === 'audio') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    );
  }
  if (t === 'meditation') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    );
  }
  // Article / default
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* Skeleton loader */
function SkeletonCard() {
  return (
    <div className="cs__skeleton-card">
      <div className="cs__skeleton-line cs__skeleton-line--title" />
      <div className="cs__skeleton-line cs__skeleton-line--text" />
      <div className="cs__skeleton-line cs__skeleton-line--short" />
    </div>
  );
}

export default function CourseSearch() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [contentType, setContentType] = useState('All');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const doSearch = useCallback(
    (q, cat, ct) => {
      if (!q.trim()) {
        setResults(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      const filters = {};
      if (cat && cat !== 'All') filters.category = cat;
      if (ct && ct !== 'All') filters.contentType = ct;

      api
        .searchCourses(q, filters)
        .then((data) => {
          setResults(data);
          saveRecentSearch(q.trim());
          setRecentSearches(getRecentSearches());
        })
        .catch(() => {
          setResults({ courses: [], lessons: [] });
        })
        .finally(() => setLoading(false));
    },
    []
  );

  // Debounced search on query/filter change
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      doSearch(query, category, contentType);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, category, contentType, doSearch]);

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const hasResults =
    results && (results.courses?.length > 0 || results.lessons?.length > 0);
  const noResults =
    results && results.courses?.length === 0 && results.lessons?.length === 0;
  const showRecent = !query.trim() && recentSearches.length > 0;

  return (
    <div className="cs__page">
      <style>{`
        .cs__page {
          max-width: 860px;
          margin: 0 auto;
        }
        .cs__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gray-500);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-body);
          margin-bottom: 20px;
          transition: color var(--transition);
        }
        .cs__back:hover { color: var(--charcoal); }
        .cs__search-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .cs__search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
          pointer-events: none;
        }
        .cs__search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius);
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--charcoal);
          background: var(--white);
          transition: border-color var(--transition), box-shadow var(--transition);
          box-shadow: var(--shadow-sm);
        }
        .cs__search-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(197,165,90,0.15);
        }
        .cs__search-input::placeholder { color: var(--gray-400); }

        /* Filter chips */
        .cs__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cs__filter-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray-500);
          display: flex;
          align-items: center;
          margin-right: 4px;
        }
        .cs__chip {
          padding: 5px 14px;
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          background: var(--white);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
          color: var(--gray-600);
        }
        .cs__chip:hover { border-color: var(--gold); }
        .cs__chip--active {
          background: var(--charcoal);
          color: var(--white);
          border-color: var(--charcoal);
        }

        /* Recent searches */
        .cs__recent {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .cs__recent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .cs__recent-header h4 {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-600);
          margin: 0;
        }
        .cs__recent-clear {
          background: none;
          border: none;
          color: var(--gray-400);
          font-size: 0.75rem;
          cursor: pointer;
          font-family: var(--font-body);
        }
        .cs__recent-clear:hover { color: var(--red); }
        .cs__recent-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cs__recent-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .cs__recent-item:hover {
          border-color: var(--gold);
          background: rgba(197,165,90,0.06);
        }

        /* Section headers */
        .cs__section {
          margin-bottom: 28px;
        }
        .cs__section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .cs__section-header h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .cs__section-count {
          font-size: 0.75rem;
          font-weight: 600;
          background: var(--gray-100);
          color: var(--gray-500);
          padding: 2px 8px;
          border-radius: 12px;
        }

        /* Course result cards */
        .cs__course-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cs__course-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 18px 20px;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .cs__course-card:hover {
          border-color: var(--gold);
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .cs__course-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(197,165,90,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gold);
        }
        .cs__course-body {
          flex: 1;
          min-width: 0;
        }
        .cs__course-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 4px;
        }
        .cs__course-desc {
          font-size: 0.8125rem;
          color: var(--gray-500);
          line-height: 1.5;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cs__course-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cs__category-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(197,165,90,0.12);
          color: var(--gold-dark);
        }
        .cs__lesson-count {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .cs__enrolled-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--green-light);
          color: #065f46;
        }

        /* Lesson result cards */
        .cs__lesson-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cs__lesson-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 14px 18px;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .cs__lesson-card:hover {
          border-color: var(--gold);
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }
        .cs__lesson-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--gray-50);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gray-500);
        }
        .cs__lesson-body {
          flex: 1;
          min-width: 0;
        }
        .cs__lesson-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 2px;
        }
        .cs__lesson-course {
          font-size: 0.75rem;
          color: var(--gray-400);
        }
        .cs__lesson-duration {
          font-size: 0.75rem;
          color: var(--gray-400);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* No results */
        .cs__no-results {
          text-align: center;
          padding: 48px 24px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
        }
        .cs__no-results-icon {
          color: var(--gray-300);
          margin-bottom: 16px;
        }
        .cs__no-results h3 {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          color: var(--charcoal);
          margin: 0 0 8px;
        }
        .cs__no-results p {
          color: var(--gray-500);
          font-size: 0.875rem;
          margin: 0 0 20px;
          line-height: 1.5;
        }
        .cs__suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .cs__suggestion {
          padding: 6px 14px;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 20px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .cs__suggestion:hover {
          border-color: var(--gold);
          background: rgba(197,165,90,0.06);
        }

        /* Skeleton loading */
        .cs__skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cs__skeleton-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .cs__skeleton-line {
          height: 14px;
          background: var(--gray-100);
          border-radius: 4px;
          animation: cs__pulse 1.5s ease-in-out infinite;
        }
        .cs__skeleton-line--title {
          width: 55%;
          height: 16px;
          margin-bottom: 10px;
        }
        .cs__skeleton-line--text {
          width: 80%;
          margin-bottom: 8px;
        }
        .cs__skeleton-line--short {
          width: 35%;
        }
        @keyframes cs__pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .cs__course-card {
            flex-direction: column;
            gap: 10px;
          }
          .cs__course-icon {
            width: 36px;
            height: 36px;
          }
          .cs__filters {
            gap: 6px;
          }
          .cs__chip {
            padding: 4px 10px;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <button className="cs__back" onClick={() => navigate('/learn')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Academy
      </button>

      <div className="page-header">
        <h2>Search Courses</h2>
        <p className="page-subtitle">Find courses and lessons across the entire academy.</p>
      </div>

      {/* Search bar */}
      <div className="cs__search-wrap">
        <div className="cs__search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          className="cs__search-input"
          placeholder="Search courses, lessons, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filter chips */}
      <div className="cs__filters">
        <span className="cs__filter-label">Category:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cs__chip${category === cat ? ' cs__chip--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="cs__filters">
        <span className="cs__filter-label">Type:</span>
        {CONTENT_TYPES.map((ct) => (
          <button
            key={ct}
            className={`cs__chip${contentType === ct ? ' cs__chip--active' : ''}`}
            onClick={() => setContentType(ct)}
          >
            {ct}
          </button>
        ))}
      </div>

      {/* Recent searches */}
      {showRecent && (
        <div className="cs__recent">
          <div className="cs__recent-header">
            <h4>Recent Searches</h4>
            <button className="cs__recent-clear" onClick={handleClearRecent}>
              Clear all
            </button>
          </div>
          <div className="cs__recent-list">
            {recentSearches.map((term) => (
              <button
                key={term}
                className="cs__recent-item"
                onClick={() => handleRecentClick(term)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="cs__skeleton-list">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Results */}
      {!loading && hasResults && (
        <>
          {/* Courses section */}
          {results.courses?.length > 0 && (
            <div className="cs__section">
              <div className="cs__section-header">
                <h3>Courses</h3>
                <span className="cs__section-count">{results.courses.length}</span>
              </div>
              <div className="cs__course-list">
                {results.courses.map((course) => (
                  <div
                    key={course.id}
                    className="cs__course-card"
                    onClick={() => navigate(`/learn/${course.slug}`)}
                  >
                    <div className="cs__course-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="cs__course-body">
                      <h4 className="cs__course-title">{course.title}</h4>
                      {course.description && (
                        <p className="cs__course-desc">{course.description}</p>
                      )}
                      <div className="cs__course-meta">
                        {course.category && (
                          <span className="cs__category-badge">{course.category}</span>
                        )}
                        {course.lessonCount != null && (
                          <span className="cs__lesson-count">
                            {course.lessonCount} lesson{course.lessonCount !== 1 ? 's' : ''}
                          </span>
                        )}
                        {course.enrolled && (
                          <span className="cs__enrolled-badge">Enrolled</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons section */}
          {results.lessons?.length > 0 && (
            <div className="cs__section">
              <div className="cs__section-header">
                <h3>Lessons</h3>
                <span className="cs__section-count">{results.lessons.length}</span>
              </div>
              <div className="cs__lesson-list">
                {results.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="cs__lesson-card"
                    onClick={() => navigate(`/learn/${lesson.courseSlug}/lesson/${lesson.id}`)}
                  >
                    <div className="cs__lesson-icon">
                      <ContentTypeIcon type={lesson.contentType} />
                    </div>
                    <div className="cs__lesson-body">
                      <div className="cs__lesson-title">{lesson.title}</div>
                      <div className="cs__lesson-course">{lesson.courseTitle}</div>
                    </div>
                    {lesson.duration && (
                      <span className="cs__lesson-duration">{lesson.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* No results */}
      {!loading && noResults && (
        <div className="cs__no-results">
          <div className="cs__no-results-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="8" x2="14" y2="14" />
              <line x1="14" y1="8" x2="8" y2="14" />
            </svg>
          </div>
          <h3>No results found</h3>
          <p>
            We could not find anything matching "{query}". Try a different keyword or browse by category.
          </p>
          <div className="cs__suggestions">
            {['Leadership', 'Marketing', 'Mindset', 'Business'].map((s) => (
              <button
                key={s}
                className="cs__suggestion"
                onClick={() => setQuery(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
