import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

export default function CertificateView() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cert, setCert] = useState(null);

  useEffect(() => {
    api
      .certificateDetail(certId)
      .then((data) => {
        setCert(data.certificate || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load certificate');
        setLoading(false);
      });
  }, [certId]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <h3>Certificate not found</h3>
        <p>{error}</p>
        <button className="btn btn--primary" onClick={() => navigate('/learn/certificates')}>
          Back to Certificates
        </button>
      </div>
    );
  }

  const issuedFormatted = cert.issuedDate
    ? new Date(cert.issuedDate).toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const handleShare = () => {
    const msg = `I just earned my "${cert.courseTitle}" certificate from FreedomHub Academy! Certificate ID: ${cert.certificateId}`;
    navigator.clipboard.writeText(msg).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Action buttons - hidden in print */}
      <div className="cert-actions" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/learn/certificates')}>
          Back to Certificates
        </button>
        <button className="btn btn--primary btn--sm" onClick={() => window.print()}>
          Download PDF
        </button>
        <button className="btn btn--ghost btn--sm" onClick={handleShare}>
          Share
        </button>
      </div>

      {/* Certificate */}
      <div
        className="certificate-frame"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            border: '3px solid #c5a55a',
            margin: '16px',
            borderRadius: '4px',
            position: 'relative',
          }}
        >
          {/* Inner decorative border */}
          <div
            style={{
              border: '1px solid #c5a55a',
              margin: '6px',
              padding: '48px 40px',
              borderRadius: '2px',
              textAlign: 'center',
              position: 'relative',
              background: 'linear-gradient(180deg, #faf9f6 0%, #fff 30%, #fff 70%, #faf9f6 100%)',
            }}
          >
            {/* Corner ornaments */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
              const isTop = corner.includes('top');
              const isLeft = corner.includes('left');
              return (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',
                    [isTop ? 'top' : 'bottom']: '8px',
                    [isLeft ? 'left' : 'right']: '8px',
                    width: '24px',
                    height: '24px',
                    borderTop: isTop ? '2px solid #c5a55a' : 'none',
                    borderBottom: !isTop ? '2px solid #c5a55a' : 'none',
                    borderLeft: isLeft ? '2px solid #c5a55a' : 'none',
                    borderRight: !isLeft ? '2px solid #c5a55a' : 'none',
                  }}
                />
              );
            })}

            {/* Logo */}
            <img
              src={logoUrl}
              alt="FreedomHub"
              style={{ height: '48px', marginBottom: '24px' }}
            />

            {/* Heading */}
            <h1
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#c5a55a',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
              }}
            >
              Certificate of Completion
            </h1>

            {/* Divider */}
            <div
              style={{
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #c5a55a, transparent)',
                margin: '16px auto 24px',
              }}
            />

            {/* Preamble */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#888',
                margin: '0 0 12px 0',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              This is to certify that
            </p>

            {/* Client name */}
            <h2
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '36px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              {cert.clientName || 'Student'}
            </h2>

            {/* Completion text */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#888',
                margin: '0 0 16px 0',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              has successfully completed
            </p>

            {/* Course title */}
            <h3
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '24px',
                fontWeight: 600,
                color: '#c5a55a',
                margin: '0 0 24px 0',
                lineHeight: 1.3,
              }}
            >
              {cert.courseTitle}
            </h3>

            {/* Score */}
            {cert.completionScore != null && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#666',
                  margin: '0 0 24px 0',
                }}
              >
                with a score of{' '}
                <span style={{ color: '#c5a55a', fontWeight: 700, fontSize: '18px' }}>
                  {cert.completionScore}%
                </span>
              </p>
            )}

            {/* Date */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#666',
                margin: '0 0 32px 0',
              }}
            >
              Completed on {issuedFormatted}
            </p>

            {/* Signature area */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '48px',
                marginTop: '16px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '160px',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '8px',
                    paddingBottom: '4px',
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#2d2d2d',
                  }}
                >
                  FreedomHub Academy
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Issued by
                </span>
              </div>
            </div>

            {/* Certificate ID */}
            <p
              style={{
                fontFamily: "'Inter', monospace",
                fontSize: '11px',
                color: '#bbb',
                marginTop: '32px',
                marginBottom: 0,
                letterSpacing: '0.5px',
              }}
            >
              Certificate ID: {cert.certificateId}
            </p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-frame,
          .certificate-frame * {
            visibility: visible;
          }
          .certificate-frame {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .cert-actions {
            display: none !important;
          }
          nav, header, aside, footer,
          .sidebar, .layout__sidebar, .layout__topbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
