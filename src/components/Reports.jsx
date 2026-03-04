import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getReports()
      .then((data) => {
        setReports(data.reports || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reports');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Group reports by month
  const grouped = {};
  reports.forEach((r) => {
    let monthKey = 'Undated';
    if (r.date) {
      const d = new Date(r.date);
      monthKey = d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' });
    }
    if (!grouped[monthKey]) grouped[monthKey] = [];
    grouped[monthKey].push(r);
  });

  const months = Object.keys(grouped);

  return (
    <div className="reports-page">
      <div className="page-header">
        <h2>Reports</h2>
        <p className="page-subtitle">Download and review your marketing reports.</p>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state-card">
          <p>No reports available yet. Reports will appear here as they are generated.</p>
        </div>
      ) : (
        <div className="reports-list">
          {months.map((month) => (
            <div key={month} className="reports-month">
              <h3 className="reports-month__title">{month}</h3>
              <div className="reports-month__grid">
                {grouped[month].map((report) => (
                  <div key={report.id} className="report-card">
                    <div className="report-card__icon">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div className="report-card__info">
                      <h4 className="report-card__name">{report.name}</h4>
                      {report.type && <span className="report-card__type">{report.type}</span>}
                      {report.date && <span className="report-card__date">{report.date}</span>}
                      {report.summary && <p className="report-card__summary">{report.summary}</p>}
                    </div>
                    <div className="report-card__actions">
                      {report.fileUrl ? (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--primary btn--sm"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="report-card__no-file">No file attached</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
