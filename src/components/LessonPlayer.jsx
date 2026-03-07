import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const CONTENT_ICONS = {
  video: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  ),
  audio: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="8" x2="4" y2="16" /><line x1="8" y1="5" x2="8" y2="19" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="16" y1="7" x2="16" y2="17" /><line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  ),
  article: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  meditation: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  podcast: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  mixed: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success, #22c55e)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function formatDuration(minutes) {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function LessonPlayer({ client }) {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [savingReflection, setSavingReflection] = useState(false);
  const [xpToast, setXpToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const reflectionTimer = useRef(null);

  useEffect(() => {
    loadLesson();
    return () => {
      if (reflectionTimer.current) clearTimeout(reflectionTimer.current);
    };
  }, [lessonId]);

  async function loadLesson() {
    setLoading(true);
    setError(null);
    setCompleted(false);
    setReflection('');
    setReflectionSaved(false);
    try {
      const res = await api.lessonDetail(lessonId);
      setLesson(res.lesson);
      setAllLessons(res.allLessons || []);
      setEnrollment(res.enrollment || null);
      // Check if this lesson is already completed
      const thisLesson = (res.allLessons || []).find(l => l.id === lessonId);
      if (thisLesson?.completed) setCompleted(true);
    } catch (err) {
      setError(err.message || 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkComplete() {
    if (completing || completed) return;
    setCompleting(true);
    try {
      const res = await api.markComplete(lessonId);
      setCompleted(true);
      if (res.xpEarned > 0) {
        setXpToast(`+${res.xpEarned} XP`);
        setTimeout(() => setXpToast(null), 3000);
      }
      // Update allLessons to reflect completion
      setAllLessons(prev => prev.map(l => l.id === lessonId ? { ...l, completed: true } : l));
      if (res.courseComplete) {
        setXpToast('Course Complete!');
        setTimeout(() => setXpToast(null), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to mark complete');
    } finally {
      setCompleting(false);
    }
  }

  function handleReflectionChange(value) {
    setReflection(value);
    setReflectionSaved(false);
    if (reflectionTimer.current) clearTimeout(reflectionTimer.current);
    reflectionTimer.current = setTimeout(() => {
      saveReflection(value);
    }, 2000);
  }

  async function saveReflection(text) {
    if (!text.trim()) return;
    setSavingReflection(true);
    try {
      await api.submitReflection(lessonId, text);
      setReflectionSaved(true);
    } catch (err) {
      // silent fail for auto-save
    } finally {
      setSavingReflection(false);
    }
  }

  function getNavLessons() {
    const currentIdx = allLessons.findIndex(l => l.id === lessonId);
    return {
      prev: currentIdx > 0 ? allLessons[currentIdx - 1] : null,
      next: currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null,
    };
  }

  function getModuleGroups() {
    const groups = [];
    let currentGroup = null;
    for (const l of allLessons) {
      const modTitle = l.moduleTitle || 'Lessons';
      if (!currentGroup || currentGroup.title !== modTitle) {
        currentGroup = { title: modTitle, moduleId: l.moduleId, lessons: [] };
        groups.push(currentGroup);
      }
      currentGroup.lessons.push(l);
    }
    return groups;
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading lesson...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-page">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
          Back to Course
        </button>
        <div className="card" style={{ marginTop: '1rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--color-error, #ef4444)' }}>{error}</p>
          <button className="btn btn--primary" onClick={loadLesson} style={{ marginTop: '1rem' }}>Retry</button>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  const { prev, next } = getNavLessons();
  const moduleGroups = getModuleGroups();

  return (
    <div className="lp">
      {/* XP Toast */}
      {xpToast && (
        <div className="lp__xp-toast">{xpToast}</div>
      )}

      {/* Mobile sidebar toggle */}
      <button
        className="lp__sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`lp__sidebar ${sidebarOpen ? 'lp__sidebar--open' : ''}`}>
        <div className="lp__sidebar-header">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
            Back to Course
          </button>
          <h4 className="lp__course-title">{lesson.courseTitle}</h4>
          {enrollment && (
            <div className="lp__progress-bar">
              <div className="lp__progress-fill" style={{ width: `${enrollment.progressPercent || 0}%` }} />
            </div>
          )}
        </div>

        <div className="lp__sidebar-lessons">
          {moduleGroups.map((group, gi) => (
            <div key={gi} className="lp__module-group">
              <div className="lp__module-title">{group.title}</div>
              {group.lessons.map((l) => (
                <button
                  key={l.id}
                  className={`lp__nav-lesson ${l.id === lessonId ? 'lp__nav-lesson--active' : ''} ${l.completed ? 'lp__nav-lesson--completed' : ''}`}
                  onClick={() => {
                    navigate(`/learn/${slug}/lesson/${l.id}`);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="lp__nav-icon">
                    {l.completed ? <CheckIcon /> : (CONTENT_ICONS[l.contentType] || CONTENT_ICONS.article)}
                  </span>
                  <span className="lp__nav-title">{l.title}</span>
                  {l.durationMinutes > 0 && (
                    <span className="lp__nav-duration">{formatDuration(l.durationMinutes)}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lp__content">
        <div className="lp__header">
          {lesson.moduleTitle && (
            <span className="lp__module-label">{lesson.moduleTitle}</span>
          )}
          <h2 className="lp__title">{lesson.title}</h2>
          <div className="lp__meta">
            <span className="lp__meta-item">
              {CONTENT_ICONS[lesson.contentType] || CONTENT_ICONS.article}
              {lesson.contentType}
            </span>
            {lesson.durationMinutes > 0 && (
              <span className="lp__meta-item">{formatDuration(lesson.durationMinutes)}</span>
            )}
          </div>
        </div>

        {/* Video Player */}
        {lesson.videoUrl && (lesson.contentType === 'video' || lesson.contentType === 'mixed') && (
          <div className="lp__video">
            {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
              <iframe
                src={lesson.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : lesson.videoUrl.includes('vimeo.com') ? (
              <iframe
                src={lesson.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                title={lesson.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls preload="metadata">
                <source src={lesson.videoUrl} />
                Your browser does not support video playback.
              </video>
            )}
          </div>
        )}

        {/* Audio Player */}
        {lesson.audioUrl && (lesson.contentType === 'audio' || lesson.contentType === 'podcast' || lesson.contentType === 'meditation' || lesson.contentType === 'mixed') && (
          <div className={`lp__audio ${lesson.contentType === 'meditation' ? 'lp__audio--meditation' : ''}`}>
            {lesson.contentType === 'meditation' && (
              <div className="lp__meditation-visual">
                <div className="lp__meditation-circle" />
              </div>
            )}
            <audio controls preload="metadata" style={{ width: '100%' }}>
              <source src={lesson.audioUrl} />
              Your browser does not support audio playback.
            </audio>
          </div>
        )}

        {/* Written Content */}
        {lesson.writtenContent && (
          <div className="lp__article" dangerouslySetInnerHTML={{ __html: lesson.writtenContent }} />
        )}

        {/* Attachments */}
        {lesson.attachments?.length > 0 && (
          <div className="lp__attachments">
            <h4>Resources</h4>
            <div className="lp__attachment-list">
              {lesson.attachments.map((att, i) => (
                <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="lp__attachment">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{att.filename}</span>
                  {att.size && <span className="lp__attachment-size">{(att.size / 1024).toFixed(0)} KB</span>}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Reflection Journal */}
        {lesson.reflectionPrompt && (
          <div className="lp__reflection">
            <h4>Reflection</h4>
            <p className="lp__reflection-prompt">{lesson.reflectionPrompt}</p>
            <textarea
              className="lp__reflection-input"
              placeholder="Write your thoughts..."
              value={reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              rows={4}
            />
            <div className="lp__reflection-status">
              {savingReflection && <span>Saving...</span>}
              {reflectionSaved && !savingReflection && <span style={{ color: 'var(--color-success, #22c55e)' }}>Saved (+5 XP)</span>}
            </div>
          </div>
        )}

        {/* Mark Complete + Navigation */}
        <div className="lp__actions">
          {!completed ? (
            <button
              className="btn btn--primary"
              onClick={handleMarkComplete}
              disabled={completing}
            >
              {completing ? 'Completing...' : 'Mark as Complete'}
            </button>
          ) : (
            <div className="lp__completed-badge">
              <CheckIcon /> Completed
            </div>
          )}
        </div>

        <div className="lp__nav-buttons">
          {prev ? (
            <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}/lesson/${prev.id}`)}>
              Previous: {prev.title}
            </button>
          ) : <span />}
          {next ? (
            <button className="btn btn--primary btn--sm" onClick={() => navigate(`/learn/${slug}/lesson/${next.id}`)}>
              Next: {next.title}
            </button>
          ) : (
            <button className="btn btn--outline btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
              Back to Course
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
