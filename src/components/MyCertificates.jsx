import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function MyCertificates() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    api
      .myCertificates()
      .then((data) => {
        setCertificates(data.certificates || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load certificates');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading your certificates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button className="btn btn--primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="certificates-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2>My Certificates</h2>
            <p className="page-subtitle">Your earned certificates of completion.</p>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={() => navigate('/learn')}>
            Back to Academy
          </button>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: '16px', opacity: 0.6 }}
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5L12 15l-3 1.5.5-3.5L7 10.5l3.5-.5L12 7z" />
          </svg>
          <h3 style={{ marginBottom: '8px', color: 'var(--charcoal)' }}>No certificates yet</h3>
          <p style={{ color: 'var(--gray-500)', marginBottom: '20px' }}>
            Complete a course to earn your first certificate.
          </p>
          <button className="btn btn--primary" onClick={() => navigate('/learn')}>
            Explore Academy
          </button>
        </div>
      ) : (
        <div className="course-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="card cert-card" style={{ overflow: 'hidden' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
                  padding: '24px 20px',
                  textAlign: 'center',
                  borderBottom: '3px solid var(--gold)',
                  position: 'relative',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c5a55a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginBottom: '8px' }}
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
                <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                  {cert.courseTitle}
                </h4>
              </div>
              <div className="card__body" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray-500)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Certificate ID</span>
                    <span style={{ fontFamily: 'monospace', color: 'var(--charcoal)' }}>{cert.certificateId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Issued</span>
                    <span style={{ color: 'var(--charcoal)' }}>
                      {new Date(cert.issuedDate).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {cert.completionScore != null && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Score</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{cert.completionScore}%</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button
                    className="btn btn--primary btn--sm"
                    style={{ flex: 1 }}
                    onClick={() => navigate(`/learn/certificate/${cert.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn--ghost btn--sm"
                    style={{ flex: 1 }}
                    onClick={() => {
                      const msg = `I just earned my "${cert.courseTitle}" certificate from FreedomHub Academy! Certificate ID: ${cert.certificateId}`;
                      navigator.clipboard.writeText(msg).then(() => {
                        alert('Copied to clipboard!');
                      });
                    }}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
