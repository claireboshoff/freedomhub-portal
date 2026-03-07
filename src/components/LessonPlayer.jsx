import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import QuizSection from './QuizSection';

/* ---- Content Type Icons (16x16 inline SVG, matches CourseDetail) ---- */
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

const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--green, #10b981)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

/* ---- Helpers ---- */
function formatDuration(minutes) {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function estimateReadTime(text) {
  if (!text) return null;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function parseVimeoId(url) {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function groupLessonsByModule(allLessons) {
  const modules = {};
  const moduleOrder = [];
  for (const lesson of allLessons) {
    const key = lesson.moduleId || '__default';
    if (!modules[key]) {
      modules[key] = {
        id: key,
        title: lesson.moduleTitle || 'Lessons',
        lessons: [],
      };
      moduleOrder.push(key);
    }
    modules[key].lessons.push(lesson);
  }
  for (const key of moduleOrder) {
    modules[key].lessons.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  return moduleOrder.map((k) => modules[k]);
}

/* ---- Playback Speed Controls ---- */
function SpeedControls({ currentSpeed, onSpeedChange }) {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  return (
    <div className="speed-controls">
      <span className="speed-controls__label">Speed:</span>
      {speeds.map((s) => (
        <button
          key={s}
          className={`speed-controls__btn ${currentSpeed === s ? 'speed-controls__btn--active' : ''}`}
          onClick={() => onSpeedChange(s)}
        >
          {s}x
        </button>
      ))}
    </div>
  );
}

/* ---- Sleep Timer (for meditation) ---- */
function SleepTimer({ onTimerEnd }) {
  const [remaining, setRemaining] = useState(null);
  const intervalRef = useRef(null);
  const callbackRef = useRef(onTimerEnd);
  callbackRef.current = onTimerEnd;

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function startTimer(minutes) {
    clearInterval(intervalRef.current);
    const total = minutes * 60;
    setRemaining(total);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current);
          callbackRef.current();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function cancelTimer() {
    clearInterval(intervalRef.current);
    setRemaining(null);
  }

  return (
    <div className="sleep-timer">
      <span className="sleep-timer__label">Sleep Timer:</span>
      <div className="sleep-timer__buttons">
        {[15, 30, 45, 60].map((m) => (
          <button key={m} className="btn btn--outline btn--sm" onClick={() => startTimer(m)}>
            {m}m
          </button>
        ))}
        {remaining !== null && (
          <button className="btn btn--ghost btn--sm" onClick={cancelTimer}>Cancel</button>
        )}
      </div>
      {remaining !== null && (
        <div className="sleep-timer__display">
          {formatTimer(remaining)} remaining
        </div>
      )}
    </div>
  );
}

/* ---- XP Notification ---- */
function XPNotification({ xp, visible }) {
  if (!visible) return null;
  return (
    <div className="xp-notification">
      +{xp} XP
    </div>
  );
}

/* ==================================================================
   MAIN COMPONENT
   ================================================================== */
export default function LessonPlayer() {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();

  // Data state
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [xpNotification, setXpNotification] = useState({ visible: false, xp: 0 });

  // Reflection state
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaveStatus, setReflectionSaveStatus] = useState(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [reflectionXp, setReflectionXp] = useState(null);
  const reflectionTimerRef = useRef(null);

  // Quiz state
  const [quizData, setQuizData] = useState(null);

  // Media state
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  /* ---- Load lesson data ---- */
  useEffect(() => {
    loadLesson();
    return () => clearTimeout(reflectionTimerRef.current);
  }, [lessonId]);

  async function loadLesson() {
    setLoading(true);
    setError(null);
    setCompleted(false);
    setReflectionText('');
    setReflectionSaveStatus(null);
    setReflectionSubmitted(false);
    setReflectionXp(null);
    setPlaybackSpeed(1);
    setQuizData(null);
    try {
      const res = await api.lessonDetail(lessonId);
      setLesson(res.lesson);
      setAllLessons(res.allLessons || []);
      setEnrollment(res.enrollment || null);

      // Check if current lesson is already completed
      if (res.enrollment?.completedLessons?.includes(lessonId)) {
        setCompleted(true);
      } else {
        const thisLesson = (res.allLessons || []).find((l) => l.id === lessonId);
        if (thisLesson?.completed) setCompleted(true);
      }

      // Expand the module containing the current lesson
      const currentLesson = (res.allLessons || []).find((l) => l.id === lessonId);
      if (currentLesson?.moduleId) {
        setExpandedModules((prev) => ({ ...prev, [currentLesson.moduleId]: true }));
      }

      // Load quiz data if quiz is enabled
      if (res.lesson?.quizEnabled) {
        try {
          const qRes = await api.quizData(lessonId);
          if (qRes && qRes.questions) {
            setQuizData(qRes);
          }
        } catch (_quizErr) {
          // Quiz data load failure is non-fatal
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  }

  /* ---- Computed values ---- */
  const modules = groupLessonsByModule(allLessons);
  const flatLessons = modules.flatMap((m) => m.lessons);
  const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === flatLessons.length - 1;
  const totalLessons = flatLessons.length;
  const lessonNumber = currentIndex + 1;
  const progressPercent = enrollment?.progressPercent ?? (
    totalLessons > 0
      ? Math.round(((enrollment?.completedLessons?.length || 0) / totalLessons) * 100)
      : 0
  );

  function isLessonCompleted(id) {
    if (enrollment?.completedLessons?.includes(id)) return true;
    const l = allLessons.find((x) => x.id === id);
    return l?.completed || false;
  }

  function isLessonLocked(l) {
    if (!l.dripDay || !enrollment) return false;
    const enrolledDate = enrollment.enrolledAt ? new Date(enrollment.enrolledAt) : new Date();
    const unlockDate = new Date(enrolledDate);
    unlockDate.setDate(unlockDate.getDate() + l.dripDay);
    return new Date() < unlockDate;
  }

  /* ---- Mark Complete ---- */
  async function handleMarkComplete() {
    if (completed || marking) return;
    setMarking(true);
    try {
      const res = await api.markComplete(lessonId);
      setCompleted(true);

      // Update enrollment state
      setEnrollment((prev) => ({
        ...prev,
        progressPercent: res.newProgress ?? prev?.progressPercent,
        completedLessons: [...(prev?.completedLessons || []), lessonId],
      }));
      setAllLessons((prev) =>
        prev.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
      );

      // Show XP notification
      const xp = res.xpEarned || 10;
      setXpNotification({ visible: true, xp });
      setTimeout(() => setXpNotification({ visible: false, xp: 0 }), 3000);

      // Auto-navigate to next lesson after 1.5s
      if (res.nextLessonId) {
        setTimeout(() => navigate(`/learn/${slug}/lesson/${res.nextLessonId}`), 1500);
      } else if (nextLesson && !isLastLesson) {
        setTimeout(() => navigate(`/learn/${slug}/lesson/${nextLesson.id}`), 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to mark lesson complete');
    } finally {
      setMarking(false);
    }
  }

  /* ---- Reflection auto-save ---- */
  function handleReflectionChange(value) {
    setReflectionText(value);
    setReflectionSaveStatus('saving');
    clearTimeout(reflectionTimerRef.current);
    reflectionTimerRef.current = setTimeout(() => {
      setReflectionSaveStatus('saved');
    }, 1200);
  }

  async function handleReflectionSubmit() {
    if (!reflectionText.trim()) return;
    setReflectionSaveStatus('saving');
    try {
      const res = await api.submitReflection(lessonId, reflectionText);
      setReflectionSubmitted(true);
      setReflectionSaveStatus('saved');
      if (res.xpEarned) {
        setReflectionXp(res.xpEarned);
      }
    } catch (err) {
      setReflectionSaveStatus(null);
      setError(err.message || 'Failed to submit reflection');
    }
  }

  /* ---- Playback speed ---- */
  function handleSpeedChange(speed) {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }

  /* ---- Sleep timer callback ---- */
  const handleSleepTimerEnd = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
  }, []);

  /* ---- Quiz complete handler ---- */
  async function handleQuizComplete({ score, passed, answers }) {
    try {
      await api.submitQuiz(lessonId, answers, score);
    } catch (_err) {
      // Submit failure is non-fatal — score is shown in UI regardless
    }
    if (passed) {
      const xp = score === 100 ? 20 : 15;
      setXpNotification({ visible: true, xp });
      setTimeout(() => setXpNotification({ visible: false, xp: 0 }), 3000);
    }
  }

  /* ---- Navigation helpers ---- */
  function goToLesson(id) {
    navigate(`/learn/${slug}/lesson/${id}`);
    setSidebarOpen(false);
  }

  /* ---- Loading / Error ---- */
  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className="portal-page">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
          &larr; Back to Course
        </button>
        <div className="card" style={{ marginTop: '1rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--red)' }}>{error}</p>
          <button className="btn btn--primary" onClick={loadLesson} style={{ marginTop: '1rem' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  const contentType = lesson.contentType || 'article';
  const isVideo = contentType === 'video';
  const isAudio = contentType === 'audio' || contentType === 'podcast';
  const isMeditation = contentType === 'meditation';
  const isArticle = contentType === 'article';
  const isMixed = contentType === 'mixed';

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="lesson-player">
      {/* Mobile sidebar toggle */}
      <button
        className="lesson-player__sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle lesson navigation"
      >
        <MenuIcon />
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="lesson-sidebar__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ---- LEFT SIDEBAR ---- */}
      <aside className={`lesson-sidebar ${sidebarOpen ? 'lesson-sidebar--open' : ''}`}>
        <div className="lesson-sidebar__course-title">
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => navigate(`/learn/${slug}`)}
            style={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start' }}
          >
            &larr; {lesson.courseTitle || 'Course'}
          </button>
        </div>

        <nav className="lesson-sidebar__nav">
          {modules.map((mod) => {
            const isOpen = !!expandedModules[mod.id];
            return (
              <div key={mod.id} className="lesson-sidebar__module">
                <button
                  className="lesson-sidebar__module-header"
                  onClick={() =>
                    setExpandedModules((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))
                  }
                >
                  <ChevronIcon open={isOpen} />
                  <span className="lesson-sidebar__module-title">{mod.title}</span>
                </button>
                {isOpen && (
                  <ul className="lesson-sidebar__lessons">
                    {mod.lessons.map((l) => {
                      const isCurrent = l.id === lessonId;
                      const done = isLessonCompleted(l.id);
                      const locked = isLessonLocked(l);
                      return (
                        <li
                          key={l.id}
                          className={[
                            'lesson-sidebar__lesson',
                            isCurrent && 'lesson-sidebar__lesson--current',
                            done && 'lesson-sidebar__lesson--completed',
                            locked && 'lesson-sidebar__lesson--locked',
                          ].filter(Boolean).join(' ')}
                          onClick={() => { if (!locked) goToLesson(l.id); }}
                          role={locked ? undefined : 'button'}
                          tabIndex={locked ? -1 : 0}
                          onKeyDown={(e) => {
                            if (!locked && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault();
                              goToLesson(l.id);
                            }
                          }}
                        >
                          <span className="lesson-sidebar__lesson-icon">
                            {CONTENT_ICONS[l.contentType] || CONTENT_ICONS.article}
                          </span>
                          <span className="lesson-sidebar__lesson-title">{l.title}</span>
                          <span className="lesson-sidebar__lesson-meta">
                            {l.durationMinutes ? formatDuration(l.durationMinutes) : ''}
                          </span>
                          <span className="lesson-sidebar__lesson-status">
                            {done && <CheckIcon size={14} />}
                            {locked && <LockIcon />}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="lesson-sidebar__progress">
          <div className="lesson-sidebar__progress-label">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="lesson-sidebar__progress-bar-track">
            <div
              className="lesson-sidebar__progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ---- RIGHT CONTENT AREA ---- */}
      <main className="lesson-content">
        {/* Top Bar */}
        <div className="lesson-topbar">
          <div className="lesson-topbar__breadcrumb">
            <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
              {lesson.courseTitle || 'Course'}
            </button>
            <span className="lesson-topbar__sep">/</span>
            <span className="lesson-topbar__module">{lesson.moduleTitle || 'Module'}</span>
            <span className="lesson-topbar__sep">/</span>
            <span className="lesson-topbar__current">{lesson.title}</span>
          </div>
          <div className="lesson-topbar__progress">
            <span className="lesson-topbar__progress-text">
              Lesson {lessonNumber} of {totalLessons}
            </span>
            <div className="lesson-topbar__progress-bar">
              <div
                className="lesson-topbar__progress-fill"
                style={{ width: `${totalLessons > 0 ? (lessonNumber / totalLessons) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div className="lesson-topbar__nav">
            <button
              className="btn btn--outline btn--sm"
              disabled={!prevLesson}
              onClick={() => prevLesson && goToLesson(prevLesson.id)}
            >
              &larr; Prev
            </button>
            <button
              className="btn btn--outline btn--sm"
              disabled={!nextLesson}
              onClick={() => nextLesson && goToLesson(nextLesson.id)}
            >
              Next &rarr;
            </button>
          </div>
        </div>

        {/* Lesson Title */}
        <h1 className="lesson-content__title">{lesson.title}</h1>

        {/* Error inline */}
        {error && (
          <div className="lesson-content__error">
            <p>{error}</p>
            <button className="btn btn--ghost btn--sm" onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {/* ---- VIDEO CONTENT ---- */}
        {(isVideo || (isMixed && lesson.videoUrl)) && (
          <div className="video-section">
            <div className="video-container">
              {(() => {
                const ytId = parseYouTubeId(lesson.videoUrl);
                const vimeoId = parseVimeoId(lesson.videoUrl);
                if (ytId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?rel=0`}
                      title={lesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                if (vimeoId) {
                  return (
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                      title={lesson.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    ref={videoRef}
                    src={lesson.videoUrl}
                    controls
                    playsInline
                    onLoadedMetadata={() => {
                      if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
                    }}
                  />
                );
              })()}
            </div>
            {/* Speed controls only for native video (not YouTube/Vimeo iframes) */}
            {lesson.videoUrl && !parseYouTubeId(lesson.videoUrl) && !parseVimeoId(lesson.videoUrl) && (
              <SpeedControls currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} />
            )}
          </div>
        )}

        {/* ---- AUDIO / PODCAST CONTENT ---- */}
        {(isAudio && lesson.audioUrl) && (
          <div className="audio-section">
            <div className="audio-player">
              <div className="audio-player__waveform" />
              <audio
                ref={audioRef}
                src={lesson.audioUrl}
                controls
                onLoadedMetadata={() => {
                  if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
                }}
              />
            </div>
            <SpeedControls currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} />
          </div>
        )}

        {/* ---- MEDITATION CONTENT ---- */}
        {isMeditation && (
          <div className="audio-section audio-section--meditation">
            <div className="meditation-ambient" />
            {lesson.audioUrl ? (
              <>
                <div className="audio-player">
                  <div className="audio-player__waveform" />
                  <audio
                    ref={audioRef}
                    src={lesson.audioUrl}
                    controls
                    onLoadedMetadata={() => {
                      if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
                    }}
                  />
                </div>
                <SpeedControls currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} />
              </>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem', position: 'relative', zIndex: 1 }}>
                Meditation audio not yet available.
              </p>
            )}
            <SleepTimer onTimerEnd={handleSleepTimerEnd} />
          </div>
        )}

        {/* ---- ARTICLE CONTENT ---- */}
        {isArticle && lesson.writtenContent && (
          <div className="article-section">
            <div className="article-section__read-time">
              {estimateReadTime(lesson.writtenContent)}
            </div>
            <div className="article-content">
              {lesson.writtenContent.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* ---- MIXED: written content below video ---- */}
        {isMixed && lesson.writtenContent && (
          <div className="article-section">
            <div className="article-content">
              {lesson.writtenContent.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* ---- ATTACHMENTS ---- */}
        {lesson.attachments && lesson.attachments.length > 0 && (
          <div className="attachments-section">
            <h3 className="attachments-section__heading">Attachments</h3>
            <ul className="attachment-list">
              {lesson.attachments.map((file, i) => (
                <li key={i} className="attachment-item">
                  <span className="attachment-item__icon"><FileIcon /></span>
                  <span className="attachment-item__name">{file.name || file.filename}</span>
                  {file.size && (
                    <span className="attachment-item__size">{file.size}</span>
                  )}
                  <a
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--sm attachment-item__download"
                  >
                    <DownloadIcon /> Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---- REFLECTION JOURNAL ---- */}
        {lesson.reflectionPrompt && (
          <div className="reflection-section">
            <h3 className="reflection-section__heading">Reflection Journal</h3>
            <p className="reflection-section__prompt">{lesson.reflectionPrompt}</p>
            <textarea
              className="reflection-box"
              placeholder="Write your reflection..."
              value={reflectionText}
              onChange={(e) => handleReflectionChange(e.target.value)}
              disabled={reflectionSubmitted}
              rows={5}
            />
            <div className="reflection-section__footer">
              <span className="reflection-section__save-status">
                {reflectionSaveStatus === 'saving' && 'Saving...'}
                {reflectionSaveStatus === 'saved' && 'Saved'}
              </span>
              <span className="reflection-section__xp-hint">
                {reflectionSubmitted && reflectionXp
                  ? `+${reflectionXp} XP earned`
                  : '+5 XP for completing your reflection'}
              </span>
              {!reflectionSubmitted ? (
                <button
                  className="btn btn--primary btn--sm"
                  onClick={handleReflectionSubmit}
                  disabled={!reflectionText.trim()}
                >
                  Submit Reflection
                </button>
              ) : (
                <span className="reflection-section__submitted">
                  <CheckIcon size={14} /> Submitted
                </span>
              )}
            </div>
          </div>
        )}

        {/* ---- QUIZ ---- */}
        {lesson.quizEnabled && quizData && (
          <QuizSection
            lessonId={lessonId}
            quizData={quizData}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {/* ---- DISCUSSION PLACEHOLDER ---- */}
        <div className="placeholder-card">
          <h3>Discussion</h3>
          <p>Discussion coming soon -- Sprint 12</p>
        </div>

        {/* ---- BOTTOM ACTIONS ---- */}
        <div className="lesson-bottom-actions">
          <div className="lesson-bottom-actions__left">
            {prevLesson && (
              <button className="btn btn--outline" onClick={() => goToLesson(prevLesson.id)}>
                &larr; Previous Lesson
              </button>
            )}
          </div>
          <div className="lesson-bottom-actions__center">
            {!completed ? (
              <button
                className="btn btn--success"
                onClick={handleMarkComplete}
                disabled={marking}
              >
                {marking ? 'Marking...' : 'Mark Complete'}
              </button>
            ) : (
              <span className="lesson-completed-badge">
                <CheckIcon size={18} /> Completed
              </span>
            )}
          </div>
          <div className="lesson-bottom-actions__right">
            {isLastLesson ? (
              <button className="btn btn--primary" onClick={() => navigate(`/learn/${slug}`)}>
                Complete Course
              </button>
            ) : nextLesson ? (
              <button className="btn btn--primary" onClick={() => goToLesson(nextLesson.id)}>
                Next Lesson &rarr;
              </button>
            ) : null}
          </div>
        </div>

        {/* XP Notification */}
        <XPNotification xp={xpNotification.xp} visible={xpNotification.visible} />
      </main>

      {/* ---- INLINE STYLES ---- */}
      <style>{`
        /* ========== LESSON PLAYER LAYOUT ========== */
        .lesson-player {
          display: flex;
          min-height: calc(100vh - var(--topbar-height, 64px));
          position: relative;
        }

        /* ========== SIDEBAR ========== */
        .lesson-sidebar {
          width: 300px;
          flex-shrink: 0;
          background: var(--white);
          border-right: 1px solid var(--gray-200);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: calc(100vh - var(--topbar-height, 64px));
          position: sticky;
          top: var(--topbar-height, 64px);
        }

        .lesson-sidebar__course-title {
          padding: 16px;
          border-bottom: 1px solid var(--gray-200);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .lesson-sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .lesson-sidebar__module-header {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--charcoal);
          text-align: left;
          transition: background var(--transition);
        }
        .lesson-sidebar__module-header:hover {
          background: var(--gray-50);
        }

        .lesson-sidebar__module-title {
          flex: 1;
          line-height: 1.3;
        }

        .lesson-sidebar__lessons {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lesson-sidebar__lesson {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 8px 36px;
          font-size: 0.8125rem;
          color: var(--gray-600);
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: background var(--transition), border-color var(--transition);
        }
        .lesson-sidebar__lesson:hover:not(.lesson-sidebar__lesson--locked) {
          background: var(--gray-50);
        }
        .lesson-sidebar__lesson--current {
          background: rgba(197, 165, 90, 0.08);
          border-left-color: var(--gold);
          color: var(--charcoal);
          font-weight: 600;
        }
        .lesson-sidebar__lesson--completed .lesson-sidebar__lesson-title {
          color: var(--gray-400);
        }
        .lesson-sidebar__lesson--locked {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lesson-sidebar__lesson-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .lesson-sidebar__lesson-title {
          flex: 1;
          line-height: 1.3;
        }
        .lesson-sidebar__lesson-meta {
          font-size: 0.6875rem;
          color: var(--gray-400);
          flex-shrink: 0;
        }
        .lesson-sidebar__lesson-status {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          width: 16px;
        }

        /* Sidebar Progress */
        .lesson-sidebar__progress {
          padding: 16px;
          border-top: 1px solid var(--gray-200);
        }
        .lesson-sidebar__progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gray-500);
          margin-bottom: 6px;
        }
        .lesson-sidebar__progress-bar-track {
          height: 6px;
          background: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
        }
        .lesson-sidebar__progress-bar-fill {
          height: 100%;
          background: var(--gold);
          border-radius: 3px;
          transition: width 400ms ease;
        }

        /* Sidebar overlay + toggle (mobile) */
        .lesson-sidebar__overlay {
          display: none;
        }
        .lesson-player__sidebar-toggle {
          display: none;
        }

        /* ========== MAIN CONTENT ========== */
        .lesson-content {
          flex: 1;
          min-width: 0;
          padding: 24px 32px 48px;
          max-width: 900px;
        }

        .lesson-content__title {
          font-size: 1.5rem;
          color: var(--charcoal);
          margin-bottom: 24px;
        }

        .lesson-content__error {
          background: var(--red-light);
          border: 1px solid var(--red);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--red);
        }

        /* ========== TOP BAR ========== */
        .lesson-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--gray-200);
          flex-wrap: wrap;
        }

        .lesson-topbar__breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--gray-500);
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        .lesson-topbar__sep {
          color: var(--gray-300);
        }
        .lesson-topbar__module {
          color: var(--gray-500);
        }
        .lesson-topbar__current {
          color: var(--charcoal);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lesson-topbar__progress {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .lesson-topbar__progress-text {
          font-size: 0.75rem;
          color: var(--gray-500);
          white-space: nowrap;
        }
        .lesson-topbar__progress-bar {
          width: 80px;
          height: 4px;
          background: var(--gray-200);
          border-radius: 2px;
          overflow: hidden;
        }
        .lesson-topbar__progress-fill {
          height: 100%;
          background: var(--gold);
          border-radius: 2px;
          transition: width 300ms ease;
        }

        .lesson-topbar__nav {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        /* ========== VIDEO ========== */
        .video-section {
          margin-bottom: 24px;
        }
        .video-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: #000;
          border-radius: var(--radius);
          overflow: hidden;
        }
        .video-container iframe,
        .video-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ========== AUDIO ========== */
        .audio-section {
          margin-bottom: 24px;
          position: relative;
        }
        .audio-section--meditation {
          border-radius: var(--radius);
          overflow: hidden;
          padding: 32px 24px;
        }
        .audio-player {
          position: relative;
          z-index: 1;
        }
        .audio-player audio {
          width: 100%;
          border-radius: var(--radius-sm);
        }
        .audio-player__waveform {
          height: 48px;
          margin-bottom: 12px;
          border-radius: var(--radius-sm);
          background:
            repeating-linear-gradient(
              90deg,
              var(--gray-200) 0px,
              var(--gray-200) 2px,
              transparent 2px,
              transparent 6px
            );
          background-size: 6px 100%;
          opacity: 0.5;
          animation: waveformPulse 2s ease-in-out infinite alternate;
        }
        @keyframes waveformPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        /* Meditation ambient background */
        .meditation-ambient {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: var(--radius);
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea);
          background-size: 600% 600%;
          animation: meditationGradient 20s ease infinite;
          opacity: 0.15;
        }
        @keyframes meditationGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ========== SPEED CONTROLS ========== */
        .speed-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 0.8125rem;
          position: relative;
          z-index: 1;
        }
        .speed-controls__label {
          color: var(--gray-500);
          font-weight: 500;
          margin-right: 4px;
        }
        .speed-controls__btn {
          padding: 4px 10px;
          border: 1px solid var(--gray-200);
          border-radius: 999px;
          background: var(--white);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-body);
        }
        .speed-controls__btn:hover {
          border-color: var(--gold);
          color: var(--gold-dark);
        }
        .speed-controls__btn--active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--white);
        }

        /* ========== SLEEP TIMER ========== */
        .sleep-timer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .sleep-timer__label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--gray-500);
        }
        .sleep-timer__buttons {
          display: flex;
          gap: 6px;
        }
        .sleep-timer__display {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--purple);
          padding: 4px 12px;
          background: var(--purple-light);
          border-radius: 999px;
        }

        /* ========== ARTICLE ========== */
        .article-section {
          margin-bottom: 24px;
        }
        .article-section__read-time {
          font-size: 0.8125rem;
          color: var(--gray-400);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .article-content {
          max-width: 65ch;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--charcoal);
        }
        .article-content p {
          margin-bottom: 1.25em;
        }

        /* ========== ATTACHMENTS ========== */
        .attachments-section {
          margin-bottom: 24px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
        }
        .attachments-section__heading {
          font-size: 1rem;
          margin-bottom: 12px;
          color: var(--charcoal);
        }
        .attachment-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .attachment-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: var(--gray-50);
          border-radius: var(--radius-sm);
        }
        .attachment-item__icon {
          flex-shrink: 0;
          color: var(--gray-500);
          display: flex;
          align-items: center;
        }
        .attachment-item__name {
          flex: 1;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        .attachment-item__size {
          font-size: 0.75rem;
          color: var(--gray-400);
          flex-shrink: 0;
        }
        .attachment-item__download {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          text-decoration: none;
        }

        /* ========== REFLECTION JOURNAL ========== */
        .reflection-section {
          margin-bottom: 24px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
        }
        .reflection-section__heading {
          font-size: 1rem;
          color: var(--charcoal);
          margin-bottom: 8px;
        }
        .reflection-section__prompt {
          font-size: 0.9375rem;
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 12px;
          font-style: italic;
        }
        .reflection-box {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--gray-200);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--charcoal);
          resize: vertical;
          min-height: 100px;
          transition: border-color var(--transition);
          box-sizing: border-box;
        }
        .reflection-box:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(197, 165, 90, 0.15);
        }
        .reflection-box:disabled {
          background: var(--gray-50);
          color: var(--gray-500);
        }
        .reflection-section__footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .reflection-section__save-status {
          font-size: 0.75rem;
          color: var(--gray-400);
          font-weight: 500;
        }
        .reflection-section__xp-hint {
          font-size: 0.75rem;
          color: var(--gold-dark);
          font-weight: 600;
          flex: 1;
        }
        .reflection-section__submitted {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--green);
        }

        /* ========== PLACEHOLDER CARDS ========== */
        .placeholder-card {
          padding: 20px;
          background: var(--gray-50);
          border: 1px dashed var(--gray-300);
          border-radius: var(--radius);
          margin-bottom: 24px;
          text-align: center;
        }
        .placeholder-card h3 {
          font-size: 0.9375rem;
          color: var(--gray-500);
          margin-bottom: 4px;
        }
        .placeholder-card p {
          font-size: 0.8125rem;
          color: var(--gray-400);
        }

        /* ========== BOTTOM ACTIONS ========== */
        .lesson-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0 0;
          border-top: 1px solid var(--gray-200);
          margin-top: 24px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .lesson-bottom-actions__left,
        .lesson-bottom-actions__right {
          flex: 1;
        }
        .lesson-bottom-actions__right {
          text-align: right;
        }
        .lesson-bottom-actions__center {
          flex-shrink: 0;
        }

        .lesson-completed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--green);
          padding: 8px 20px;
          background: var(--green-light);
          border-radius: var(--radius-sm);
        }

        /* ========== XP NOTIFICATION ========== */
        .xp-notification {
          position: fixed;
          bottom: 32px;
          right: 32px;
          background: var(--gold);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          animation: xpSlideIn 0.4s ease, xpFadeOut 0.6s ease 2.4s forwards;
        }
        @keyframes xpSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes xpFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        /* ========== RESPONSIVE (< 768px) ========== */
        @media (max-width: 768px) {
          .lesson-player {
            flex-direction: column;
          }

          .lesson-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 200;
            width: 280px;
            max-height: 100vh;
            transform: translateX(-100%);
            transition: transform 300ms ease;
            box-shadow: none;
          }
          .lesson-sidebar--open {
            transform: translateX(0);
            box-shadow: var(--shadow-lg);
          }

          .lesson-sidebar__overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 199;
            background: rgba(0, 0, 0, 0.4);
          }

          .lesson-player__sidebar-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: calc(var(--topbar-height, 64px) + 12px);
            left: 12px;
            z-index: 100;
            width: 40px;
            height: 40px;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow);
            cursor: pointer;
          }

          .lesson-content {
            padding: 16px;
            max-width: 100%;
          }

          .lesson-topbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .lesson-topbar__breadcrumb {
            width: 100%;
          }

          .lesson-topbar__nav {
            width: 100%;
            justify-content: space-between;
          }

          .video-container {
            border-radius: var(--radius-sm);
          }

          .audio-player audio {
            width: 100%;
          }

          .lesson-bottom-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .lesson-bottom-actions__left,
          .lesson-bottom-actions__center,
          .lesson-bottom-actions__right {
            text-align: center;
          }

          .xp-notification {
            left: 50%;
            right: auto;
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}
