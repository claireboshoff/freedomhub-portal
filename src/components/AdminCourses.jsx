import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function EnrollClientModal({ course, onClose, onSuccess }) {
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolling, setEnrolling] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    api.adminClients()
      .then(data => setClients(data.clients || []))
      .catch(() => setFeedback({ type: 'error', text: 'Failed to load clients' }))
      .finally(() => setLoadingClients(false));
  }, []);

  const filtered = clients.filter(c => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (c.name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q);
  });

  async function handleEnroll(clientId) {
    setEnrolling(clientId);
    setFeedback(null);
    try {
      await api.adminEnrollClient(course.id, clientId);
      setFeedback({ type: 'success', text: 'Client enrolled successfully!' });
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err.message || 'Failed to enroll client';
      setFeedback({ type: 'error', text: msg.includes('Already enrolled') ? 'Client is already enrolled in this course.' : msg });
    } finally {
      setEnrolling(null);
    }
  }

  return (
    <div className="ac__modal-overlay" onClick={onClose}>
      <div className="ac__modal" onClick={e => e.stopPropagation()}>
        <div className="ac__modal-header">
          <h3>Enroll Client</h3>
          <button className="ac__modal-close" onClick={onClose}>&times;</button>
        </div>
        <p className="ac__modal-course-title">Course: <strong>{course.title}</strong></p>
        {feedback && (
          <div className={`ac__modal-feedback ac__modal-feedback--${feedback.type}`}>
            {feedback.text}
          </div>
        )}
        <input
          type="text"
          className="ac__search ac__modal-search"
          placeholder="Search clients by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="ac__modal-client-list">
          {loadingClients ? (
            <div className="ac__modal-loading">Loading clients...</div>
          ) : filtered.length === 0 ? (
            <div className="ac__modal-loading">No clients found</div>
          ) : (
            filtered.map(cl => (
              <div key={cl.id} className="ac__modal-client-row">
                <div className="ac__modal-client-info">
                  <span className="ac__modal-client-name">{cl.name}</span>
                  <span className="ac__modal-client-email">{cl.email}</span>
                </div>
                <button
                  className="ac__btn ac__btn--primary ac__btn--sm"
                  disabled={enrolling === cl.id}
                  onClick={() => handleEnroll(cl.id)}
                >
                  {enrolling === cl.id ? '...' : 'Enroll'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [togglingId, setTogglingId] = useState(null);
  const [enrollModal, setEnrollModal] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.adminCourses();
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(e, course) {
    e.stopPropagation();
    const newStatus = course.status === 'Published' ? 'Draft' : 'Published';
    try {
      setTogglingId(course.id);
      await api.adminToggleCourseStatus(course.id, newStatus);
      setCourses(prev =>
        prev.map(c => (c.id === course.id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert('Failed to update status: ' + (err.message || 'Unknown error'));
    } finally {
      setTogglingId(null);
    }
  }

  const filtered = useMemo(() => {
    let list = courses;
    if (filter === 'Published') list = list.filter(c => c.status === 'Published');
    if (filter === 'Draft') list = list.filter(c => c.status === 'Draft');
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => (c.title || '').toLowerCase().includes(q));
    }
    return list;
  }, [courses, filter, search]);

  const stats = useMemo(() => ({
    total: courses.length,
    published: courses.filter(c => c.status === 'Published').length,
    draft: courses.filter(c => c.status === 'Draft').length,
    enrollments: courses.reduce((sum, c) => sum + (c.enrolled || c.enrollments || c.enrollmentCount || 0), 0),
  }), [courses]);

  function formatDate(d) {
    if (!d) return '--';
    const date = new Date(d);
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  if (error && !loading) {
    return (
      <div className="ac__container">
        <style>{acStyles}</style>
        <div className="ac__error">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="ac__btn ac__btn--primary" onClick={loadCourses}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ac__container">
      <style>{acStyles}</style>

      {/* Header */}
      <div className="ac__header">
        <h1 className="ac__title">Course Management</h1>
        <button
          className="ac__btn ac__btn--primary"
          onClick={() => navigate('/admin/courses/new')}
        >
          + Create Course
        </button>
      </div>

      {/* Stats Row */}
      {loading ? (
        <div className="ac__stats">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="ac__stat-card ac__skeleton">&nbsp;</div>
          ))}
        </div>
      ) : (
        <div className="ac__stats">
          <div className="ac__stat-card">
            <span className="ac__stat-value">{stats.total}</span>
            <span className="ac__stat-label">Total Courses</span>
          </div>
          <div className="ac__stat-card">
            <span className="ac__stat-value ac__stat-value--green">{stats.published}</span>
            <span className="ac__stat-label">Published</span>
          </div>
          <div className="ac__stat-card">
            <span className="ac__stat-value ac__stat-value--gold">{stats.draft}</span>
            <span className="ac__stat-label">Draft</span>
          </div>
          <div className="ac__stat-card">
            <span className="ac__stat-value">{stats.enrollments}</span>
            <span className="ac__stat-label">Total Enrollments</span>
          </div>
        </div>
      )}

      {/* Filter Tabs + Search */}
      <div className="ac__toolbar">
        <div className="ac__tabs">
          {['All', 'Published', 'Draft'].map(tab => (
            <button
              key={tab}
              className={`ac__tab ${filter === tab ? 'ac__tab--active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="ac__search"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Course List */}
      {loading ? (
        <div className="ac__list">
          {[1, 2, 3].map(i => (
            <div key={i} className="ac__card ac__skeleton-card">
              <div className="ac__skeleton ac__skeleton-thumb" />
              <div className="ac__skeleton-body">
                <div className="ac__skeleton ac__skeleton-line ac__skeleton-line--wide" />
                <div className="ac__skeleton ac__skeleton-line ac__skeleton-line--med" />
                <div className="ac__skeleton ac__skeleton-line ac__skeleton-line--short" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="ac__empty">
          <div className="ac__empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
          </div>
          <h3>No courses found</h3>
          <p>{search ? 'Try a different search term.' : 'Create your first course to get started.'}</p>
          {!search && filter === 'All' && (
            <button
              className="ac__btn ac__btn--primary"
              onClick={() => navigate('/admin/courses/new')}
            >
              + Create Course
            </button>
          )}
        </div>
      ) : (
        <div className="ac__list">
          {filtered.map(course => (
            <div key={course.id} className="ac__card">
              <div className="ac__card-thumb">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} />
                ) : (
                  <div className="ac__card-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c5a55a" strokeWidth="1.5" opacity="0.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  </div>
                )}
              </div>
              <div className="ac__card-body">
                <div className="ac__card-top">
                  <h3 className="ac__card-title">{course.title}</h3>
                  <span className={`ac__badge ${course.status === 'Published' ? 'ac__badge--published' : 'ac__badge--draft'}`}>
                    {course.status || 'Draft'}
                  </span>
                </div>
                <div className="ac__card-meta">
                  {course.category && <span className="ac__meta-item">Category: {course.category}</span>}
                  <span className="ac__meta-item">{course.moduleCount ?? course.modules ?? 0} modules</span>
                  <span className="ac__meta-item">{course.lessonCount ?? course.lessons ?? 0} lessons</span>
                  <span className="ac__meta-item">{course.enrolled ?? course.enrollments ?? course.enrollmentCount ?? 0} enrolled</span>
                  <span className="ac__meta-item">Created: {formatDate(course.createdAt || course.created)}</span>
                </div>
                <div className="ac__card-actions">
                  <button
                    className="ac__btn ac__btn--primary ac__btn--sm"
                    onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="ac__btn ac__btn--ghost ac__btn--sm"
                    onClick={() => navigate(`/learn/${course.slug}`)}
                  >
                    View
                  </button>
                  <button
                    className="ac__btn ac__btn--ghost ac__btn--sm"
                    onClick={() => navigate(`/admin/courses/${course.id}/analytics`)}
                  >
                    Analytics
                  </button>
                  <button
                    className="ac__btn ac__btn--ghost ac__btn--sm"
                    onClick={() => setEnrollModal(course)}
                  >
                    Enroll Client
                  </button>
                  <button
                    className="ac__btn ac__btn--outline ac__btn--sm"
                    disabled={togglingId === course.id}
                    onClick={(e) => handleToggleStatus(e, course)}
                  >
                    {togglingId === course.id
                      ? '...'
                      : course.status === 'Published'
                      ? 'Unpublish'
                      : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {enrollModal && (
        <EnrollClientModal
          course={enrollModal}
          onClose={() => setEnrollModal(null)}
          onSuccess={loadCourses}
        />
      )}
    </div>
  );
}

const acStyles = `
  .ac__container {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 20px;
    font-family: 'Inter', sans-serif;
    color: #2d2d2d;
  }
  .ac__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ac__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }

  /* Buttons */
  .ac__btn {
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border-radius: 8px;
    transition: opacity 0.2s, background 0.2s;
    font-size: 14px;
    padding: 10px 20px;
  }
  .ac__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ac__btn--primary {
    background: #c5a55a;
    color: #fff;
  }
  .ac__btn--primary:hover:not(:disabled) {
    background: #b8973f;
  }
  .ac__btn--ghost {
    background: transparent;
    color: #c5a55a;
    border: none;
  }
  .ac__btn--ghost:hover:not(:disabled) {
    background: rgba(197,165,90,0.08);
  }
  .ac__btn--outline {
    background: transparent;
    color: #2d2d2d;
    border: 1px solid #ddd;
  }
  .ac__btn--outline:hover:not(:disabled) {
    border-color: #c5a55a;
    color: #c5a55a;
  }
  .ac__btn--sm {
    padding: 6px 14px;
    font-size: 13px;
  }

  /* Stats */
  .ac__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 28px;
  }
  .ac__stat-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .ac__stat-value {
    font-family: 'League Spartan', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #2d2d2d;
  }
  .ac__stat-value--green { color: #22c55e; }
  .ac__stat-value--gold { color: #c5a55a; }
  .ac__stat-label {
    font-size: 13px;
    color: #888;
  }

  /* Toolbar */
  .ac__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ac__tabs {
    display: flex;
    gap: 4px;
    background: #f3f3f3;
    border-radius: 8px;
    padding: 3px;
  }
  .ac__tab {
    border: none;
    background: transparent;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px;
    color: #888;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }
  .ac__tab--active {
    background: #fff;
    color: #2d2d2d;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .ac__search {
    padding: 10px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    min-width: 220px;
    outline: none;
    transition: border-color 0.2s;
  }
  .ac__search:focus {
    border-color: #c5a55a;
  }

  /* Course List */
  .ac__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .ac__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    overflow: hidden;
  }
  .ac__card-thumb {
    width: 140px;
    min-height: 120px;
    background: #f5f0e6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ac__card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ac__card-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ac__card-body {
    flex: 1;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ac__card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .ac__card-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }
  .ac__badge {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .ac__badge--published {
    background: #e6f4ea;
    color: #1e7e34;
  }
  .ac__badge--draft {
    background: #fff3e0;
    color: #b26a00;
  }
  .ac__card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    font-size: 13px;
    color: #888;
  }
  .ac__card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
  }

  /* Empty */
  .ac__empty {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .ac__empty-icon {
    margin-bottom: 12px;
  }
  .ac__empty h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    margin: 0 0 8px;
    color: #2d2d2d;
  }
  .ac__empty p {
    color: #888;
    margin: 0 0 20px;
    font-size: 14px;
  }

  /* Error */
  .ac__error {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .ac__error h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 20px;
    margin: 0 0 8px;
    color: #c0392b;
  }
  .ac__error p {
    color: #888;
    margin: 0 0 20px;
    font-size: 14px;
  }

  /* Skeletons */
  .ac__skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ac__shimmer 1.5s infinite;
    border-radius: 10px;
  }
  @keyframes ac__shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .ac__skeleton-card {
    min-height: 120px;
    display: flex;
    gap: 16px;
    padding: 18px 20px;
    background: #fff;
  }
  .ac__skeleton-thumb {
    width: 100px;
    height: 80px;
    flex-shrink: 0;
  }
  .ac__skeleton-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ac__skeleton-line {
    height: 14px;
  }
  .ac__skeleton-line--wide { width: 70%; }
  .ac__skeleton-line--med { width: 50%; }
  .ac__skeleton-line--short { width: 30%; }

  /* Modal */
  .ac__modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .ac__modal {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    width: 480px;
    max-width: 90vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .ac__modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
  }
  .ac__modal-header h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #2d2d2d;
  }
  .ac__modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #888;
    line-height: 1;
    padding: 0 4px;
  }
  .ac__modal-close:hover {
    color: #2d2d2d;
  }
  .ac__modal-course-title {
    padding: 12px 20px 0;
    font-size: 14px;
    color: #555;
    margin: 0;
  }
  .ac__modal-feedback {
    margin: 12px 20px 0;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
  }
  .ac__modal-feedback--success {
    background: #e6f4ea;
    color: #1e7e34;
  }
  .ac__modal-feedback--error {
    background: #fdecea;
    color: #c0392b;
  }
  .ac__modal-search {
    margin: 12px 20px 0;
    width: calc(100% - 40px);
  }
  .ac__modal-client-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ac__modal-loading {
    text-align: center;
    padding: 24px 0;
    color: #888;
    font-size: 14px;
  }
  .ac__modal-client-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  .ac__modal-client-row:hover {
    border-color: #c5a55a;
  }
  .ac__modal-client-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ac__modal-client-name {
    font-size: 14px;
    font-weight: 600;
    color: #2d2d2d;
  }
  .ac__modal-client-email {
    font-size: 12px;
    color: #888;
  }

  @media (max-width: 640px) {
    .ac__card {
      flex-direction: column;
    }
    .ac__card-thumb {
      width: 100%;
      min-height: 100px;
    }
    .ac__toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    .ac__search {
      min-width: unset;
    }
  }
`;
