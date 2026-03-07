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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success, #22c55e)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function formatDuration(minutes) {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function getTypeBadgeClass(type) {
  switch (type) {
    case 'quest': return 'badge badge--quest';
    case 'challenge': return 'badge badge--challenge';
    default: return 'badge badge--course';
  }
}

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

      const myEnrollment = enrollmentsRes?.enrollments?.find(
        (e) => e.courseId === courseRes.course.id || e.courseSlug === courseRes.course.slug
      );
      setEnrollment(myEnrollment || null);

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
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-page">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/learn')}>
          ← Back to Academy
        </button>
        <div className="card" style={{ marginTop: '1rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--color-error, #ef4444)' }}>{error}</p>
          <button className="btn btn--primary" onClick={loadCourseData} style={{ marginTop: '1rem' }}>
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
    <div className="portal-page">
      <button className="btn btn--ghost btn--sm" onClick={() => navigate('/learn')}>
        ← Back to Academy
      </button>

      {/* Course Hero */}
      <div className="course-hero">
        <div className="course-hero__thumbnail">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} />
          ) : (
            <div className="course-hero__placeholder" />
          )}
        </div>
        <div className="course-hero__content">
          <div className="course-hero__badges">
            <span className={getTypeBadgeClass(course.type)}>
              {course.type || 'course'}
            </span>
            {course.category && (
              <span className="badge badge--category">{course.category}</span>
            )}
          </div>
          <h2 className="course-hero__title">{course.title}</h2>
          {course.description && (
            <div
              className="course-hero__description"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          )}
          <div className="course-hero__meta">
            <span className="course-hero__meta-item">
              {course.lessonCount || sortedModules.reduce((s, m) => s + (m.lessons?.length || 0), 0)} lessons
            </span>
            {(course.estimatedDuration || totalDuration > 0) && (
              <span className="course-hero__meta-item">
                {formatDuration(course.estimatedDuration || totalDuration)}
              </span>
            )}
            {course.enrollmentCount != null && (
              <span className="course-hero__meta-item">
                {course.enrollmentCount} enrolled
              </span>
            )}
          </div>
          <div className="course-hero__actions">
            {status === 'not-enrolled' && (
              <button
                className="btn btn--primary"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling
                  ? 'Enrolling...'
                  : course.price && course.price > 0
                    ? `Enroll — R${course.price}`
                    : 'Start Learning'}
              </button>
            )}
            {status === 'enrolled' && (
              <button
                className="btn btn--primary"
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
                className="btn btn--outline"
                onClick={() => {
                  const lessonId = getCurrentLessonId();
                  if (lessonId) navigate(`/learn/${slug}/lesson/${lessonId}`);
                }}
              >
                Review Course
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Modules */}
      {sortedModules.length > 0 && (
        <div className="course-modules">
          <h3 className="course-modules__heading">Course Content</h3>
          {sortedModules.map((mod) => {
            const isOpen = !!expandedModules[mod.id];
            const sortedLessons = [...(mod.lessons || [])].sort(
              (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
            );
            const completedCount = sortedLessons.filter((l) => isLessonCompleted(l.id)).length;

            return (
              <div key={mod.id} className={`course-module ${isOpen ? 'course-module--open' : ''}`}>
                <button
                  className="course-module__header"
                  onClick={() => toggleModule(mod.id)}
                >
                  <div className="course-module__header-left">
                    <ChevronIcon open={isOpen} />
                    <span className="course-module__title">{mod.title}</span>
                  </div>
                  <span className="course-module__lesson-count">
                    {enrollment
                      ? `${completedCount}/${sortedLessons.length} lessons`
                      : `${sortedLessons.length} lessons`}
                  </span>
                </button>
                {isOpen && (
                  <div className="course-module__lessons">
                    {sortedLessons.map((lesson) => {
                      const completed = isLessonCompleted(lesson.id);
                      const locked = isLessonLocked(lesson);
                      const canNavigate = enrollment && !locked;

                      return (
                        <div
                          key={lesson.id}
                          className={`course-lesson ${completed ? 'course-lesson--completed' : ''} ${locked ? 'course-lesson--locked' : ''} ${canNavigate ? 'course-lesson--clickable' : ''}`}
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
                          <span className="course-lesson__icon">
                            {CONTENT_ICONS[lesson.contentType] || CONTENT_ICONS.article}
                          </span>
                          <span className="course-lesson__title">{lesson.title}</span>
                          {lesson.durationMinutes && (
                            <span className="course-lesson__duration">
                              {formatDuration(lesson.durationMinutes)}
                            </span>
                          )}
                          <span className="course-lesson__status">
                            {completed && <CheckIcon />}
                            {locked && <LockIcon />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="course-sidebar">
        {/* Instructor Card */}
        {course.creator && (
          <div className="card course-instructor">
            <div className="card__header">
              <h3>Instructor</h3>
            </div>
            <div className="card__body">
              <div className="course-instructor__profile">
                <div className="course-instructor__avatar">
                  {(course.creator.name || 'I').charAt(0).toUpperCase()}
                </div>
                <div className="course-instructor__info">
                  <span className="course-instructor__name">{course.creator.name}</span>
                  {course.creator.bio && (
                    <p className="course-instructor__bio">{course.creator.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Stats Card */}
        <div className="card course-stats">
          <div className="card__header">
            <h3>Course Stats</h3>
          </div>
          <div className="card__body">
            <div className="course-stats__list">
              {course.enrollmentCount != null && (
                <div className="course-stats__item">
                  <span className="course-stats__label">Enrollments</span>
                  <span className="course-stats__value">{course.enrollmentCount}</span>
                </div>
              )}
              {completionRate != null && (
                <div className="course-stats__item">
                  <span className="course-stats__label">Your Progress</span>
                  <span className="course-stats__value">{completionRate}%</span>
                </div>
              )}
              {(course.estimatedDuration || totalDuration > 0) && (
                <div className="course-stats__item">
                  <span className="course-stats__label">Total Duration</span>
                  <span className="course-stats__value">
                    {formatDuration(course.estimatedDuration || totalDuration)}
                  </span>
                </div>
              )}
              {course.lessonCount != null && (
                <div className="course-stats__item">
                  <span className="course-stats__label">Lessons</span>
                  <span className="course-stats__value">{course.lessonCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
