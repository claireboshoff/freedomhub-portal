import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

/* ── Helpers ── */

function getCountdown(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function isJoinable(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target - now;
  // Joinable 15 minutes before start
  return diff <= 15 * 60 * 1000;
}

function formatSessionDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function formatSessionTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(mins) {
  if (!mins) return '';
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function getSessionStatus(session) {
  if (session.status === 'cancelled') return 'cancelled';
  if (session.status === 'live') return 'live';
  if (session.status === 'completed') return 'completed';
  const now = new Date();
  const start = new Date(session.dateTime);
  const end = new Date(start.getTime() + (session.durationMinutes || 60) * 60 * 1000);
  if (now >= start && now <= end) return 'live';
  if (now > end) return 'completed';
  return 'scheduled';
}

/* ── Icons ── */

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const PlayCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

/* ── Status Pill ── */

function StatusPill({ status }) {
  const config = {
    scheduled: { label: 'Scheduled', bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', dot: false },
    live: { label: 'Live Now', bg: 'rgba(239,68,68,0.1)', color: '#ef4444', dot: true },
    completed: { label: 'Completed', bg: 'rgba(107,114,128,0.08)', color: '#6b7280', dot: false },
    cancelled: { label: 'Cancelled', bg: 'rgba(107,114,128,0.08)', color: '#9ca3af', dot: false },
  };
  const c = config[status] || config.scheduled;

  return (
    <span className="ls-status-pill" style={{ background: c.bg, color: c.color }}>
      {c.dot && <span className="ls-pulse-dot" />}
      {c.label}
    </span>
  );
}

/* ── LiveSessionCard ── */

function LiveSessionCard({ session, isPast }) {
  const [expanded, setExpanded] = useState(false);
  const status = getSessionStatus(session);
  const countdown = !isPast ? getCountdown(session.dateTime) : null;
  const joinable = !isPast && isJoinable(session.dateTime);
  const hostInitial = (session.hostName || 'H').charAt(0).toUpperCase();

  return (
    <div className={`ls-card ${isPast ? 'ls-card--past' : ''} ${status === 'cancelled' ? 'ls-card--cancelled' : ''}`}>
      <div className="ls-card__header">
        <div className="ls-card__icon" style={{ color: isPast ? 'var(--gray-400)' : 'var(--gold)' }}>
          {isPast ? <PlayCircleIcon /> : <VideoIcon />}
        </div>
        <div className="ls-card__main">
          <div className="ls-card__title-row">
            <h4 className={`ls-card__title ${status === 'cancelled' ? 'ls-card__title--cancelled' : ''}`}>
              {session.title}
            </h4>
            <StatusPill status={status} />
          </div>
          <div className="ls-card__meta">
            <div className="ls-card__host">
              <span className="ls-card__avatar" style={{ background: isPast ? 'var(--gray-400)' : 'var(--gold)' }}>
                {hostInitial}
              </span>
              <span className="ls-card__host-name">{session.hostName || 'Instructor'}</span>
            </div>
            <span className="ls-card__date">
              <CalendarIcon /> {formatSessionDate(session.dateTime)}
            </span>
            <span className="ls-card__time">
              <ClockIcon /> {formatSessionTime(session.dateTime)}
              {session.durationMinutes ? ` (${formatDuration(session.durationMinutes)})` : ''}
            </span>
          </div>
          {countdown && status === 'scheduled' && (
            <div className="ls-card__countdown">
              Starts in {countdown}
            </div>
          )}
        </div>
      </div>

      {session.description && (
        <div className="ls-card__desc-toggle">
          <button
            className="ls-card__desc-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide details' : 'Show details'}
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          {expanded && (
            <p className="ls-card__description">{session.description}</p>
          )}
        </div>
      )}

      <div className="ls-card__actions">
        {!isPast && status !== 'cancelled' && (
          session.meetingUrl ? (
            <a
              href={joinable ? session.meetingUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--primary btn--sm ${!joinable ? 'btn--disabled' : ''}`}
              onClick={(e) => { if (!joinable) e.preventDefault(); }}
              title={!joinable ? 'Join link activates 15 minutes before session' : ''}
            >
              {status === 'live' ? 'Join Now' : 'Join Session'}
            </a>
          ) : (
            <span className="ls-card__no-link">Link coming soon</span>
          )
        )}
        {isPast && status === 'completed' && (
          session.recordingUrl ? (
            <a
              href={session.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
            >
              Watch Recording
            </a>
          ) : (
            <span className="ls-card__no-link">Recording coming soon</span>
          )
        )}
      </div>
    </div>
  );
}

/* ── Mini Calendar ── */

function MiniCalendar({ sessions }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const sessionDates = new Set(
    sessions.map((s) => {
      const d = new Date(s.dateTime);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`e-${i}`} className="ls-cal__cell ls-cal__cell--empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${month}-${d}`;
    const hasSession = sessionDates.has(key);
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    cells.push(
      <div
        key={d}
        className={`ls-cal__cell ${isToday ? 'ls-cal__cell--today' : ''}`}
      >
        {d}
        {hasSession && <span className="ls-cal__dot" />}
      </div>
    );
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  }

  return (
    <div className="ls-cal">
      <div className="ls-cal__nav">
        <button onClick={prevMonth} className="ls-cal__nav-btn">&lsaquo;</button>
        <span className="ls-cal__month">{monthName}</span>
        <button onClick={nextMonth} className="ls-cal__nav-btn">&rsaquo;</button>
      </div>
      <div className="ls-cal__days">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="ls-cal__day-label">{d}</div>
        ))}
      </div>
      <div className="ls-cal__grid">
        {cells}
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function CourseLiveSessions() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tickRef = useRef(null);

  // Force re-render for countdown updates
  const [, setTick] = useState(0);

  useEffect(() => {
    loadData();
    // Tick every 30 seconds for countdown updates
    tickRef.current = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(tickRef.current);
  }, [slug]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const courseRes = await api.courseDetail(slug);
      setCourse(courseRes.course);
      const sessionsRes = await api.courseLiveSessions(courseRes.course.id);
      setSessions(sessionsRes.sessions || []);
    } catch (err) {
      setError(err.message || 'Failed to load live sessions');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading live sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-page">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
          &larr; Back to Course
        </button>
        <div className="card" style={{ marginTop: '1rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--red, #ef4444)' }}>{error}</p>
          <button className="btn btn--primary" onClick={loadData} style={{ marginTop: '1rem' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const upcoming = sessions
    .filter((s) => {
      const status = getSessionStatus(s);
      return status === 'scheduled' || status === 'live';
    })
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const past = sessions
    .filter((s) => {
      const status = getSessionStatus(s);
      return status === 'completed' || status === 'cancelled';
    })
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  return (
    <div className="portal-page">
      <style>{`
        .ls-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .ls-layout {
            grid-template-columns: 1fr;
          }
        }

        .ls-section {
          margin-bottom: 32px;
        }
        .ls-section__title {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 16px 0;
        }

        /* Card */
        .ls-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 12px;
          box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .ls-card:hover {
          box-shadow: var(--shadow, 0 2px 8px rgba(0,0,0,0.08));
        }
        .ls-card--past {
          opacity: 0.75;
        }
        .ls-card--past:hover {
          opacity: 1;
        }
        .ls-card--cancelled {
          opacity: 0.6;
        }
        .ls-card__header {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .ls-card__icon {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ls-card__main {
          flex: 1;
          min-width: 0;
        }
        .ls-card__title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .ls-card__title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0;
        }
        .ls-card__title--cancelled {
          text-decoration: line-through;
          color: var(--gray-400);
        }

        .ls-card__meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.8125rem;
          color: var(--gray-500);
        }
        .ls-card__host {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ls-card__avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-size: 0.6875rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .ls-card__host-name {
          font-weight: 500;
          color: var(--charcoal);
        }
        .ls-card__date,
        .ls-card__time {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ls-card__countdown {
          margin-top: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ls-card__countdown::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          display: inline-block;
        }

        .ls-card__desc-toggle {
          margin-top: 10px;
          border-top: 1px solid var(--gray-100);
          padding-top: 8px;
        }
        .ls-card__desc-btn {
          background: none;
          border: none;
          color: var(--gray-400);
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0;
        }
        .ls-card__desc-btn:hover {
          color: var(--charcoal);
        }
        .ls-card__description {
          font-size: 0.8125rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin: 8px 0 0 0;
          white-space: pre-line;
        }

        .ls-card__actions {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ls-card__no-link {
          font-size: 0.8125rem;
          color: var(--gray-400);
          font-style: italic;
        }

        .btn--disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Status pill */
        .ls-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
        .ls-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: ls-pulse 1.4s ease-in-out infinite;
        }
        @keyframes ls-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        /* Mini Calendar */
        .ls-cal {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius);
          padding: 16px;
          box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
        }
        .ls-cal__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ls-cal__nav-btn {
          background: none;
          border: none;
          font-size: 1.125rem;
          color: var(--gray-500);
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .ls-cal__nav-btn:hover {
          background: var(--gray-50);
          color: var(--charcoal);
        }
        .ls-cal__month {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--charcoal);
        }
        .ls-cal__days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0;
          margin-bottom: 4px;
        }
        .ls-cal__day-label {
          text-align: center;
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--gray-400);
          text-transform: uppercase;
          padding: 2px 0;
        }
        .ls-cal__grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0;
        }
        .ls-cal__cell {
          text-align: center;
          font-size: 0.75rem;
          color: var(--gray-600);
          padding: 4px 0;
          position: relative;
          line-height: 1.6;
        }
        .ls-cal__cell--empty {
          visibility: hidden;
        }
        .ls-cal__cell--today {
          font-weight: 700;
          color: var(--gold);
        }
        .ls-cal__dot {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          margin: 0 auto;
        }

        /* Empty state */
        .ls-empty {
          text-align: center;
          padding: 48px 24px;
          color: var(--gray-400);
        }
        .ls-empty__icon {
          margin-bottom: 12px;
          color: var(--gray-300);
        }
        .ls-empty__text {
          font-size: 0.9375rem;
          margin: 0;
        }
      `}</style>

      <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/learn/${slug}`)}>
        &larr; Back to {course?.title || 'Course'}
      </button>

      <div className="page-header" style={{ marginTop: '8px' }}>
        <h2>Live Sessions</h2>
        <p className="page-subtitle">{course?.title}</p>
      </div>

      {sessions.length === 0 ? (
        <div className="ls-empty">
          <div className="ls-empty__icon">
            <VideoIcon />
          </div>
          <p className="ls-empty__text">No live sessions scheduled for this course yet.</p>
        </div>
      ) : (
        <div className="ls-layout">
          <div className="ls-main">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div className="ls-section">
                <h3 className="ls-section__title">Upcoming Sessions</h3>
                {upcoming.map((s) => (
                  <LiveSessionCard key={s.id} session={s} isPast={false} />
                ))}
              </div>
            )}

            {/* Past */}
            {past.length > 0 && (
              <div className="ls-section">
                <h3 className="ls-section__title">Past Sessions</h3>
                {past.map((s) => (
                  <LiveSessionCard key={s.id} session={s} isPast={true} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar calendar */}
          <div className="ls-sidebar">
            <MiniCalendar sessions={sessions} />
          </div>
        </div>
      )}
    </div>
  );
}
