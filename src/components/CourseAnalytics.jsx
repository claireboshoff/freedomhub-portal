import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function CourseAnalytics() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    api.adminCourseAnalytics(courseId)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load analytics');
        setLoading(false);
      });
  }, [courseId]);

  const sortedStudents = useMemo(() => {
    if (!data || !data.students) return [];
    const list = [...data.students];
    list.sort((a, b) => {
      let valA, valB;
      if (sortKey === 'name') {
        valA = (a.name || '').toLowerCase();
        valB = (b.name || '').toLowerCase();
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (sortKey === 'progress') {
        valA = a.totalLessons ? a.lessonsCompleted / a.totalLessons : 0;
        valB = b.totalLessons ? b.lessonsCompleted / b.totalLessons : 0;
      }
      if (sortKey === 'lastActivity') {
        valA = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        valB = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
      }
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });
    return list;
  }, [data, sortKey, sortDir]);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  function sortIndicator(key) {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
  }

  function formatDate(dateStr) {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function statusColor(status) {
    if (status === 'Completed') return '#22c55e';
    if (status === 'Active') return '#c5a55a';
    return '#9ca3af';
  }

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button
          onClick={() => navigate('/admin/courses')}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: '#c5a55a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!data || !data.course) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
        <p>No analytics data found for this course.</p>
        <button
          onClick={() => navigate('/admin/courses')}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: '#c5a55a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const { course, metrics, weeklyEnrollments, modules, quizzes, students, topPerformers } = data;
  const safeMetrics = metrics || {};
  const safeWeekly = weeklyEnrollments || [];
  const safeModules = modules || [];
  const safeQuizzes = quizzes || [];
  const safeTopPerformers = topPerformers || [];
  const maxWeeklyCount = Math.max(...safeWeekly.map((w) => w.count), 1);

  return (
    <div className="ca__page">
      <style>{`
        .ca__page {
          max-width: 1060px;
          margin: 0 auto;
          padding: 24px 16px 48px;
          font-family: 'Inter', sans-serif;
          color: #2d2d2d;
          background: #faf9f6;
          min-height: 100vh;
        }

        /* Back button */
        .ca__back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c5a55a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          margin-bottom: 20px;
          transition: opacity 0.2s;
        }
        .ca__back-btn:hover { opacity: 0.85; }

        /* Header */
        .ca__header { margin-bottom: 24px; }
        .ca__header h1 {
          margin: 0 0 4px;
          font-family: 'League Spartan', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #2d2d2d;
        }
        .ca__header p {
          margin: 0;
          font-size: 14px;
          color: #9ca3af;
        }

        /* Metrics row */
        .ca__metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .ca__metrics { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ca__metrics { grid-template-columns: 1fr; }
        }
        .ca__metric-card {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }
        .ca__metric-value {
          font-size: 32px;
          font-weight: 700;
          font-family: 'League Spartan', sans-serif;
          color: #2d2d2d;
          line-height: 1.1;
        }
        .ca__metric-label {
          font-size: 12px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 6px;
        }

        /* Card */
        .ca__card {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .ca__card h2 {
          margin: 0 0 16px;
          font-family: 'League Spartan', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2d2d2d;
        }

        /* Bar chart */
        .ca__bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 160px;
          padding-top: 10px;
        }
        .ca__bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .ca__bar-count {
          font-size: 11px;
          font-weight: 600;
          color: #2d2d2d;
          margin-bottom: 4px;
        }
        .ca__bar {
          width: 100%;
          max-width: 44px;
          background: #c5a55a;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          transition: height 0.3s ease;
        }
        .ca__bar-label {
          font-size: 10px;
          color: #9ca3af;
          margin-top: 6px;
          text-align: center;
          white-space: nowrap;
        }

        /* Module table */
        .ca__table-wrap { overflow-x: auto; }
        .ca__table {
          width: 100%;
          border-collapse: collapse;
        }
        .ca__table th {
          text-align: left;
          padding: 10px 12px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
          border-bottom: 2px solid #f3f4f6;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }
        .ca__table td {
          padding: 12px;
          font-size: 13px;
          border-bottom: 1px solid #f9fafb;
          color: #2d2d2d;
        }
        .ca__table tr:last-child td { border-bottom: none; }
        .ca__table th.ca__sortable {
          cursor: pointer;
          user-select: none;
        }
        .ca__table th.ca__sortable:hover { color: #c5a55a; }

        /* Progress bar inline */
        .ca__progress-bar {
          display: inline-block;
          width: 80px;
          height: 6px;
          background: #f3f4f6;
          border-radius: 3px;
          overflow: hidden;
          vertical-align: middle;
          margin-right: 8px;
        }
        .ca__progress-fill {
          height: 100%;
          background: #c5a55a;
          border-radius: 3px;
          transition: width 0.3s;
        }

        /* Status badge */
        .ca__badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Quiz section */
        .ca__quiz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .ca__quiz-item {
          background: #faf9f6;
          border-radius: 8px;
          padding: 16px;
        }
        .ca__quiz-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 10px;
          color: #2d2d2d;
        }
        .ca__quiz-stat {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
          color: #4b5563;
        }
        .ca__quiz-stat span:last-child { font-weight: 600; color: #2d2d2d; }
        .ca__quiz-hardest {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #9ca3af;
        }
        .ca__quiz-hardest strong { color: #2d2d2d; font-weight: 500; }

        /* Top performers */
        .ca__top-list { list-style: none; padding: 0; margin: 0; }
        .ca__top-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #f9fafb;
        }
        .ca__top-item:last-child { border-bottom: none; }
        .ca__top-rank {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #c5a55a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          font-family: 'League Spartan', sans-serif;
          flex-shrink: 0;
        }
        .ca__top-name {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          color: #2d2d2d;
        }
        .ca__top-xp {
          font-size: 14px;
          font-weight: 700;
          color: #c5a55a;
        }
        .ca__top-lessons {
          font-size: 12px;
          color: #9ca3af;
          min-width: 90px;
          text-align: right;
        }

        /* Empty state */
        .ca__empty {
          text-align: center;
          padding: 24px;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .ca__table th:nth-child(4),
          .ca__table td:nth-child(4),
          .ca__table th:nth-child(5),
          .ca__table td:nth-child(5) { display: none; }
          .ca__bar-chart { height: 120px; }
        }
      `}</style>

      {/* Back button */}
      <button className="ca__back-btn" onClick={() => navigate('/admin/courses')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Courses
      </button>

      {/* Header */}
      <div className="ca__header">
        <h1>{course.title} -- Analytics</h1>
        <p>Performance overview and student engagement data</p>
      </div>

      {/* Key Metrics */}
      <div className="ca__metrics">
        <div className="ca__metric-card">
          <div className="ca__metric-value">{safeMetrics.totalEnrollments || 0}</div>
          <div className="ca__metric-label">Total Enrollments</div>
        </div>
        <div className="ca__metric-card">
          <div className="ca__metric-value" style={{ color: '#22c55e' }}>
            {safeMetrics.completionRate || 0}%
          </div>
          <div className="ca__metric-label">Completion Rate</div>
        </div>
        <div className="ca__metric-card">
          <div className="ca__metric-value" style={{ color: '#c5a55a' }}>
            {safeMetrics.avgQuizScore || 0}%
          </div>
          <div className="ca__metric-label">Avg Quiz Score</div>
        </div>
        <div className="ca__metric-card">
          <div className="ca__metric-value">{safeMetrics.activeLearners || 0}</div>
          <div className="ca__metric-label">Active Learners (7d)</div>
        </div>
      </div>

      {/* Enrollment Trend Chart */}
      {safeWeekly.length > 0 && (
        <div className="ca__card">
          <h2>Enrollment Trend (Last 12 Weeks)</h2>
          <div className="ca__bar-chart">
            {safeWeekly.map((w, i) => (
              <div key={i} className="ca__bar-col">
                <span className="ca__bar-count">{w.count}</span>
                <div
                  className="ca__bar"
                  style={{ height: `${(w.count / maxWeeklyCount) * 100}%` }}
                />
                <span className="ca__bar-label">{w.week ? w.week.replace('2026-', '') : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Breakdown */}
      <div className="ca__card">
        <h2>Module Breakdown</h2>
        {safeModules.length === 0 ? (
          <div className="ca__empty">No module data available yet.</div>
        ) : (
          <div className="ca__table-wrap">
            <table className="ca__table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Lessons</th>
                  <th>Completion Rate</th>
                  <th>Avg Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {safeModules.map((mod) => (
                  <tr key={mod.id}>
                    <td style={{ fontWeight: 500 }}>{mod.title}</td>
                    <td>{mod.lessonCount}</td>
                    <td>
                      <span className="ca__progress-bar">
                        <span className="ca__progress-fill" style={{ width: `${mod.completionRate || 0}%` }} />
                      </span>
                      {mod.completionRate || 0}%
                    </td>
                    <td>{mod.avgTimeMinutes != null ? `${mod.avgTimeMinutes} min` : '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quiz Performance */}
      <div className="ca__card">
        <h2>Quiz Performance</h2>
        {safeQuizzes.length === 0 ? (
          <div className="ca__empty">No quiz data available yet.</div>
        ) : (
          <div className="ca__quiz-grid">
            {safeQuizzes.map((quiz) => (
              <div key={quiz.id} className="ca__quiz-item">
                <div className="ca__quiz-title">{quiz.title}</div>
                <div className="ca__quiz-stat">
                  <span>Avg Score</span>
                  <span>{quiz.avgScore != null ? `${quiz.avgScore}%` : '--'}</span>
                </div>
                <div className="ca__quiz-stat">
                  <span>Pass Rate</span>
                  <span>{quiz.passRate != null ? `${quiz.passRate}%` : '--'}</span>
                </div>
                {quiz.hardestQuestion && (
                  <div className="ca__quiz-hardest">
                    Hardest: <strong>{quiz.hardestQuestion}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Progress */}
      <div className="ca__card">
        <h2>Student Progress</h2>
        {sortedStudents.length === 0 ? (
          <div className="ca__empty">No student data available yet.</div>
        ) : (
          <div className="ca__table-wrap">
            <table className="ca__table">
              <thead>
                <tr>
                  <th className="ca__sortable" onClick={() => handleSort('name')}>
                    Student{sortIndicator('name')}
                  </th>
                  <th>Enrolled</th>
                  <th className="ca__sortable" onClick={() => handleSort('progress')}>
                    Lessons{sortIndicator('progress')}
                  </th>
                  <th className="ca__sortable" onClick={() => handleSort('lastActivity')}>
                    Last Activity{sortIndicator('lastActivity')}
                  </th>
                  <th>Quiz Avg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((s) => {
                  const pct = s.totalLessons ? Math.round((s.lessonsCompleted / s.totalLessons) * 100) : 0;
                  return (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td style={{ fontSize: '12px', color: '#9ca3af' }}>{formatDate(s.enrolledDate)}</td>
                      <td>
                        <span className="ca__progress-bar">
                          <span className="ca__progress-fill" style={{ width: `${pct}%` }} />
                        </span>
                        {s.lessonsCompleted}/{s.totalLessons}
                      </td>
                      <td style={{ fontSize: '12px', color: '#9ca3af' }}>{formatDate(s.lastActivity)}</td>
                      <td>{s.quizAvg != null ? `${s.quizAvg}%` : '--'}</td>
                      <td>
                        <span
                          className="ca__badge"
                          style={{
                            background: statusColor(s.status) + '18',
                            color: statusColor(s.status),
                          }}
                        >
                          {s.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top Performers */}
      {safeTopPerformers.length > 0 && (
        <div className="ca__card">
          <h2>Top Performers</h2>
          <ul className="ca__top-list">
            {safeTopPerformers.slice(0, 5).map((p, i) => (
              <li key={p.id} className="ca__top-item">
                <div className="ca__top-rank">{i + 1}</div>
                <div className="ca__top-name">{p.name}</div>
                <div className="ca__top-xp">{p.xp} XP</div>
                <div className="ca__top-lessons">{p.lessonsCompleted} lessons</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
