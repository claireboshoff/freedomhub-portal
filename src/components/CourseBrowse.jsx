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
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="course-browse-page">
      <div className="page-header">
        <h2>Browse Courses</h2>
        <p className="page-subtitle">
          Find the right course, quest, or challenge for where you are right now.
        </p>
      </div>

      {/* Search */}
      <div className="course-browse__search">
        <div className="search-input-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="filter-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill${activeCategory === cat ? ' filter-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Type Filters */}
      <div className="filter-pills" style={{ marginTop: '8px' }}>
        {TYPES.map((type) => (
          <button
            key={type}
            className={`filter-pill${activeType === type ? ' filter-pill--active' : ''}`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filtered.length > 0 ? (
        <div className="course-grid" style={{ marginTop: '24px' }}>
          {filtered.map((course) => {
            const typeLower = (course.type || 'course').toLowerCase();
            const typeColor = TYPE_COLORS[typeLower] || '#C5A55A';

            return (
              <div
                key={course.id}
                className="card course-card"
                onClick={() => navigate(`/learn/${course.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="course-card__thumbnail">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} />
                  ) : (
                    <div className="course-card__placeholder" />
                  )}
                  <span
                    className="course-card__type-pill"
                    style={{ background: typeColor }}
                  >
                    {course.type || 'Course'}
                  </span>
                </div>
                <div className="card__body course-card__body">
                  <h4 className="course-card__title">{course.title}</h4>
                  {course.category && (
                    <span className="course-card__category">{course.category}</span>
                  )}
                  {course.description && (
                    <p className="course-card__desc">{course.description}</p>
                  )}
                  <div className="course-card__meta">
                    {course.lessonCount != null && (
                      <span>
                        {course.lessonCount} lesson{course.lessonCount !== 1 ? 's' : ''}
                      </span>
                    )}
                    {course.estimatedDuration && (
                      <span>{course.estimatedDuration}</span>
                    )}
                    {course.enrollmentCount != null && course.enrollmentCount > 0 && (
                      <span>{course.enrollmentCount.toLocaleString()} enrolled</span>
                    )}
                  </div>
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
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: '24px' }}>
          <p>No courses match your filters. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
