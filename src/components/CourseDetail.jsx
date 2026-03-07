import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

const CONTENT_ICONS = {
  video: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  ),
  audio: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="8" x2="4" y2="16" />
      <line x1="8" y1="5" x2="8" y2="19" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  ),
  article: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  meditation: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  podcast: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  mixed: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function formatDuration(minutes) {
  if (minutes === null || minutes === undefined) return null;
  const num = Number(minutes);
  if (!Number.isFinite(num) || num <= 0) return null;
  if (num < 60) return `${Math.round(num)} min`;
  const h = Math.floor(num / 60);
  const m = Math.round(num % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatType(type) {
  if (!type || typeof type !== 'string') return 'Course';
  // Handle camelCase / slug-like strings: "coursebusiness" -> "Coursebusiness" is ugly,
  // but "course-business" -> "Course Business" is fine.
  // Split on hyphens, underscores, or camelCase boundaries
  const words = type
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()
    .split(/\s+/);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function getTypeBadgeStyle(type) {
  switch (type) {
    case 'quest':
      return { background: 'linear-gradient(135deg, #c5a55a 0%, #e8d5a3 100%)', color: '#2d2d2d' };
    case 'challenge':
      return { background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', color: '#fff' };
    default:
      return { background: 'linear-gradient(135deg, #2d2d2d 0%, #444 100%)', color: '#fff' };
  }
}

const STYLES = `
  /* ===== CourseDetail — cd__ prefix ===== */

  @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  .cd__page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2d2d2d;
  }

  .cd__back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #666;
    background: none;
    border: 1px solid #e0ddd8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 1.5rem;
  }
  .cd__back-btn:hover {
    color: #2d2d2d;
    border-color: #c5a55a;
    background: #faf9f6;
  }

  /* ---------- Loading / Error ---------- */
  .cd__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    gap: 1rem;
    color: #999;
    font-size: 0.95rem;
  }
  .cd__spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e0ddd8;
    border-top-color: #c5a55a;
    border-radius: 50%;
    animation: cd__spin 0.8s linear infinite;
  }
  @keyframes cd__spin {
    to { transform: rotate(360deg); }
  }
  .cd__error-card {
    margin-top: 1rem;
    text-align: center;
    padding: 2.5rem 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .cd__error-text {
    color: #ef4444;
    font-size: 0.95rem;
    margin: 0 0 1rem;
  }

  /* ---------- Hero ---------- */
  .cd__hero {
    display: flex;
    gap: 2rem;
    margin-bottom: 2.5rem;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    overflow: hidden;
  }
  .cd__hero-thumb {
    flex: 0 0 420px;
    min-height: 280px;
    position: relative;
    overflow: hidden;
  }
  .cd__hero-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .cd__hero-placeholder {
    width: 100%;
    height: 100%;
    min-height: 280px;
    background: linear-gradient(135deg, #2d2d2d 0%, #444 40%, #c5a55a 100%);
  }
  .cd__hero-content {
    flex: 1;
    padding: 2rem 2.5rem 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Badges */
  .cd__badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }
  .cd__badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 20px;
  }
  .cd__badge--category {
    background: #faf9f6;
    color: #c5a55a;
    border: 1px solid #e8d5a3;
  }

  /* Title */
  .cd__title {
    font-family: 'League Spartan', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0 0 0.75rem;
    line-height: 1.2;
  }

  /* Description */
  .cd__description {
    font-size: 0.95rem;
    line-height: 1.65;
    color: #555;
    margin-bottom: 1rem;
  }
  .cd__description p {
    margin: 0 0 0.5rem;
  }

  /* Meta row */
  .cd__meta {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }
  .cd__meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }
  .cd__meta-item::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c5a55a;
  }

  /* Action buttons */
  .cd__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .cd__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  .cd__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .cd__btn--primary {
    background: linear-gradient(135deg, #c5a55a 0%, #b8943f 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(197,165,90,0.3);
  }
  .cd__btn--primary:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(197,165,90,0.4);
    transform: translateY(-1px);
  }
  .cd__btn--outline {
    background: transparent;
    color: #c5a55a;
    border: 1.5px solid #c5a55a;
  }
  .cd__btn--outline:hover {
    background: #faf9f6;
  }
  .cd__btn--ghost {
    background: transparent;
    color: #c5a55a;
    font-weight: 600;
    padding: 0.65rem 1rem;
  }
  .cd__btn--ghost:hover {
    background: rgba(197,165,90,0.08);
    border-radius: 8px;
  }

  /* ---------- Progress Bar ---------- */
  .cd__progress {
    margin-bottom: 2rem;
    background: #fff;
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .cd__progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
  }
  .cd__progress-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2d2d2d;
  }
  .cd__progress-pct {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c5a55a;
  }
  .cd__progress-track {
    width: 100%;
    height: 8px;
    background: #f0ede6;
    border-radius: 4px;
    overflow: hidden;
  }
  .cd__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #c5a55a 0%, #e8d5a3 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  /* ---------- Two-Column Layout ---------- */
  .cd__layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2rem;
    align-items: start;
  }

  /* ---------- Modules / Course Content ---------- */
  .cd__modules {
    min-width: 0;
  }
  .cd__modules-heading {
    font-family: 'League Spartan', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0 0 1rem;
  }

  .cd__module {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 0.75rem;
    overflow: hidden;
    border: 1px solid #f0ede6;
    transition: border-color 0.2s ease;
  }
  .cd__module--open {
    border-color: #e8d5a3;
  }
  .cd__module-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    transition: background 0.15s ease;
  }
  .cd__module-header:hover {
    background: #faf9f6;
  }
  .cd__module-header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }
  .cd__module-title {
    font-family: 'League Spartan', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #2d2d2d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cd__module-count {
    font-size: 0.8rem;
    color: #999;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Lessons */
  .cd__lessons {
    border-top: 1px solid #f0ede6;
  }
  .cd__lesson {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem 0.85rem 2.75rem;
    border-bottom: 1px solid #faf9f6;
    transition: background 0.15s ease;
  }
  .cd__lesson:last-child {
    border-bottom: none;
  }
  .cd__lesson--clickable {
    cursor: pointer;
  }
  .cd__lesson--clickable:hover {
    background: #faf9f6;
  }
  .cd__lesson--completed {
    opacity: 0.7;
  }
  .cd__lesson--locked {
    opacity: 0.45;
  }
  .cd__lesson-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: #c5a55a;
  }
  .cd__lesson-title {
    flex: 1;
    font-size: 0.9rem;
    color: #2d2d2d;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cd__lesson-duration {
    font-size: 0.78rem;
    color: #aaa;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cd__lesson-status {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 20px;
  }

  /* ---------- Sidebar ---------- */
  .cd__sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .cd__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    overflow: hidden;
  }
  .cd__card-header {
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid #f0ede6;
  }
  .cd__card-header h3 {
    font-family: 'League Spartan', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #2d2d2d;
    margin: 0;
  }
  .cd__card-body {
    padding: 1.25rem;
  }

  /* Instructor card */
  .cd__instructor-profile {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .cd__instructor-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c5a55a 0%, #e8d5a3 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'League Spartan', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .cd__instructor-info {
    min-width: 0;
  }
  .cd__instructor-name {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    color: #2d2d2d;
    margin-bottom: 0.25rem;
  }
  .cd__instructor-bio {
    font-size: 0.83rem;
    line-height: 1.55;
    color: #777;
    margin: 0;
  }

  /* Stats card */
  .cd__stats-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .cd__stats-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65rem 0;
    border-bottom: 1px solid #f7f5f0;
  }
  .cd__stats-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .cd__stats-item:first-child {
    padding-top: 0;
  }
  .cd__stats-label {
    font-size: 0.83rem;
    color: #888;
  }
  .cd__stats-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d2d2d;
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 900px) {
    .cd__hero {
      flex-direction: column;
    }
    .cd__hero-thumb {
      flex: none;
      min-height: 200px;
      max-height: 240px;
    }
    .cd__hero-content {
      padding: 1.5rem;
    }
    .cd__title {
      font-size: 1.5rem;
    }
    .cd__layout {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .cd__page {
      padding: 1rem 1rem 3rem;
    }
    .cd__hero-thumb {
      min-height: 160px;
      max-height: 200px;
    }
    .cd__hero-content {
      padding: 1.25rem;
    }
    .cd__title {
      font-size: 1.3rem;
    }
    .cd__actions {
      flex-direction: column;
      align-items: stretch;
    }
    .cd__btn {
      width: 100%;
      justify-content: center;
    }
    .cd__lesson {
      padding-left: 1.25rem;
    }
  }
`;

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    loadCourseData();
  }, [slug]);

  async function loadCourseData() {
    setLoading(true);
    setError(null);
    try {
      const [courseRes, enrollmentsRes] = await Promise.all([
        api.courseDetail(slug),
        api.myEnrollments(),
      ]);
      setCourse(courseRes.course);

      // Use enrollment from course-detail if available, otherwise check myEnrollments
      if (courseRes.enrollment) {
        // Merge with full enrollment data from myEnrollments for completedLessons
        const fullEnrollment = enrollmentsRes?.enrollments?.find(
          (e) => e.courseId === courseRes.course.id || e.courseSlug === courseRes.course.slug
        );
        setEnrollment(fullEnrollment || courseRes.enrollment);
      } else {
        const myEnrollment = enrollmentsRes?.enrollments?.find(
          (e) => e.courseId === courseRes.course.id || e.courseSlug === courseRes.course.slug
        );
        setEnrollment(myEnrollment || null);
      }

      // Expand first module by default
      if (courseRes.course.modules?.length > 0) {
        setExpandedModules({ [courseRes.course.modules[0].id]: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }

  async function handleEnroll() {
    setEnrolling(true);
    try {
      const res = await api.enroll(course.id);
      setEnrollment(res.enrollment || { courseId: course.id, status: 'active', completedLessons: [] });
    } catch (err) {
      setError(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  }

  function toggleModule(moduleId) {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }

  function isLessonCompleted(lessonId) {
    if (!enrollment) return false;
    return enrollment.completedLessons?.includes(lessonId) || false;
  }

  function isLessonLocked(lesson) {
    if (!enrollment) return false;
    if (!lesson.dripDay) return false;
    const enrolledDate = enrollment.enrolledAt ? new Date(enrollment.enrolledAt) : new Date();
    const unlockDate = new Date(enrolledDate);
    unlockDate.setDate(unlockDate.getDate() + lesson.dripDay);
    return new Date() < unlockDate;
  }

  function getCurrentLessonId() {
    if (!enrollment || !course?.modules) return null;
    for (const mod of course.modules) {
      for (const lesson of mod.lessons || []) {
        if (!isLessonCompleted(lesson.id) && !isLessonLocked(lesson)) {
          return lesson.id;
        }
      }
    }
    // All completed — return first lesson for review
    return course.modules[0]?.lessons?.[0]?.id || null;
  }

  function getEnrollmentStatus() {
    if (!enrollment) return 'not-enrolled';
    if (enrollment.status === 'completed') return 'completed';
    return 'enrolled';
  }

  function getTotalDuration() {
    if (!course?.modules) return 0;
    return course.modules.reduce((total, mod) => {
      return total + (mod.lessons || []).reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
    }, 0);
  }

  function getCompletionRate() {
    if (!enrollment || !course?.modules) return null;
    const totalLessons = course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
    if (totalLessons === 0) return null;
    const completed = enrollment.completedLessons?.length || 0;
    return Math.round((completed / totalLessons) * 100);
  }

  if (loading) {
    return (
      <div className="cd__page">
        <style>{STYLES}</style>
        <div className="cd__loading">
          <div className="cd__spinner" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cd__page">
        <style>{STYLES}</style>
        <button className="cd__back-btn" onClick={() => navigate('/learn')}>
          &#8592; Back to Academy
        </button>
        <div className="cd__error-card">
          <p className="cd__error-text">{error}</p>
          <button className="cd__btn cd__btn--primary" onClick={loadCourseData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!course) return null;

  const status = getEnrollmentStatus();
  const totalDuration = getTotalDuration();
  const completionRate = getCompletionRate();
  const sortedModules = [...(course.modules || [])].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <div className="cd__page">
      <style>{STYLES}</style>

      <button className="cd__back-btn" onClick={() => navigate('/learn')}>
        &#8592; Back to Academy
      </button>

      {/* Course Hero */}
      <div className="cd__hero">
        <div className="cd__hero-thumb">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} />
          ) : (
            <div className="cd__hero-placeholder" />
          )}
        </div>
        <div className="cd__hero-content">
          <div className="cd__badges">
            <span className="cd__badge" style={getTypeBadgeStyle(course.type)}>
              {formatType(course.type)}
            </span>
            {course.category && (
              <span className="cd__badge cd__badge--category">{course.category}</span>
            )}
          </div>
          <h2 className="cd__title">{course.title}</h2>
          {course.description && (
            <div
              className="cd__description"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          )}
          <div className="cd__meta">
            <span className="cd__meta-item">
              {course.lessonCount || sortedModules.reduce((s, m) => s + (m.lessons?.length || 0), 0)} lessons
            </span>
            {formatDuration(course.estimatedDuration || totalDuration) && (
              <span className="cd__meta-item">
                {formatDuration(course.estimatedDuration || totalDuration)}
              </span>
            )}
            {course.enrollmentCount != null && (
              <span className="cd__meta-item">
                {course.enrollmentCount} enrolled
              </span>
            )}
          </div>
          <div className="cd__actions">
            {status === 'not-enrolled' && (
              <button
                className="cd__btn cd__btn--outline"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? 'Requesting...' : 'Request Access'}
              </button>
            )}
            {status === 'enrolled' && (
              <button
                className="cd__btn cd__btn--primary"
                onClick={() => {
                  const lessonId = getCurrentLessonId();
                  if (lessonId) navigate(`/learn/${slug}/lesson/${lessonId}`);
                }}
              >
                Continue Learning
              </button>
            )}
            {status === 'completed' && (
              <button
                className="cd__btn cd__btn--outline"
                onClick={() => {
                  const lessonId = getCurrentLessonId();
                  if (lessonId) navigate(`/learn/${slug}/lesson/${lessonId}`);
                }}
              >
                Review Course
              </button>
            )}
            {status !== 'not-enrolled' && (
              <>
                <button
                  className="cd__btn cd__btn--ghost"
                  onClick={() => navigate(`/learn/${slug}/community`)}
                >
                  Community
                </button>
                <button
                  className="cd__btn cd__btn--ghost"
                  onClick={() => navigate(`/learn/${slug}/live`)}
                >
                  Live Sessions
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Not Enrolled Banner */}
      {status === 'not-enrolled' && (
        <div className="cd__progress" style={{ background: '#faf9f6', border: '1px solid #e8d5a3' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LockIcon />
            <span style={{ fontSize: '0.9rem', color: '#555' }}>
              You are not enrolled in this course. Lessons are locked. Request access or contact your admin to be enrolled.
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {completionRate != null && status !== 'not-enrolled' && (
        <div className="cd__progress">
          <div className="cd__progress-header">
            <span className="cd__progress-label">Your Progress</span>
            <span className="cd__progress-pct">{completionRate}%</span>
          </div>
          <div className="cd__progress-track">
            <div className="cd__progress-fill" style={{ width: `${completionRate}%` }} />
          </div>
        </div>
      )}

      {/* Two-Column Layout: Content + Sidebar */}
      <div className="cd__layout">
        {/* Course Modules */}
        <div className="cd__modules">
          {sortedModules.length > 0 && (
            <>
              <h3 className="cd__modules-heading">Course Content</h3>
              {sortedModules.map((mod) => {
                const isOpen = !!expandedModules[mod.id];
                const sortedLessons = [...(mod.lessons || [])].sort(
                  (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
                );
                const completedCount = sortedLessons.filter((l) => isLessonCompleted(l.id)).length;

                return (
                  <div key={mod.id} className={`cd__module ${isOpen ? 'cd__module--open' : ''}`}>
                    <button
                      className="cd__module-header"
                      onClick={() => toggleModule(mod.id)}
                    >
                      <div className="cd__module-header-left">
                        <ChevronIcon open={isOpen} />
                        <span className="cd__module-title">{mod.title}</span>
                      </div>
                      <span className="cd__module-count">
                        {enrollment
                          ? `${completedCount}/${sortedLessons.length} lessons`
                          : `${sortedLessons.length} lessons`}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="cd__lessons">
                        {sortedLessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);
                          const locked = isLessonLocked(lesson);
                          const notEnrolled = !enrollment;
                          const canNavigate = enrollment && !locked;

                          return (
                            <div
                              key={lesson.id}
                              className={`cd__lesson${completed ? ' cd__lesson--completed' : ''}${(locked || notEnrolled) ? ' cd__lesson--locked' : ''}${canNavigate ? ' cd__lesson--clickable' : ''}`}
                              onClick={() => {
                                if (canNavigate) navigate(`/learn/${slug}/lesson/${lesson.id}`);
                              }}
                              role={canNavigate ? 'button' : undefined}
                              tabIndex={canNavigate ? 0 : undefined}
                              onKeyDown={(e) => {
                                if (canNavigate && (e.key === 'Enter' || e.key === ' ')) {
                                  e.preventDefault();
                                  navigate(`/learn/${slug}/lesson/${lesson.id}`);
                                }
                              }}
                            >
                              <span className="cd__lesson-icon">
                                {CONTENT_ICONS[lesson.contentType] || CONTENT_ICONS.article}
                              </span>
                              <span className="cd__lesson-title">{lesson.title}</span>
                              {formatDuration(lesson.durationMinutes) && (
                                <span className="cd__lesson-duration">
                                  {formatDuration(lesson.durationMinutes)}
                                </span>
                              )}
                              <span className="cd__lesson-status">
                                {completed && <CheckIcon />}
                                {(locked || notEnrolled) && <LockIcon />}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="cd__sidebar">
          {/* Instructor Card */}
          {course.creator && (
            <div className="cd__card">
              <div className="cd__card-header">
                <h3>Instructor</h3>
              </div>
              <div className="cd__card-body">
                <div className="cd__instructor-profile">
                  <div className="cd__instructor-avatar">
                    {(course.creator.name || 'I').charAt(0).toUpperCase()}
                  </div>
                  <div className="cd__instructor-info">
                    <span className="cd__instructor-name">{course.creator.name}</span>
                    {course.creator.bio && (
                      <p className="cd__instructor-bio">{course.creator.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Stats Card */}
          <div className="cd__card">
            <div className="cd__card-header">
              <h3>Course Stats</h3>
            </div>
            <div className="cd__card-body">
              <div className="cd__stats-list">
                {course.enrollmentCount != null && (
                  <div className="cd__stats-item">
                    <span className="cd__stats-label">Enrollments</span>
                    <span className="cd__stats-value">{course.enrollmentCount}</span>
                  </div>
                )}
                {completionRate != null && (
                  <div className="cd__stats-item">
                    <span className="cd__stats-label">Your Progress</span>
                    <span className="cd__stats-value">{completionRate}%</span>
                  </div>
                )}
                {formatDuration(course.estimatedDuration || totalDuration) && (
                  <div className="cd__stats-item">
                    <span className="cd__stats-label">Total Duration</span>
                    <span className="cd__stats-value">
                      {formatDuration(course.estimatedDuration || totalDuration)}
                    </span>
                  </div>
                )}
                {course.lessonCount != null && (
                  <div className="cd__stats-item">
                    <span className="cd__stats-label">Lessons</span>
                    <span className="cd__stats-value">{course.lessonCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
