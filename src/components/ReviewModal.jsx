import React, { useState } from 'react';
import { api } from '../lib/api';

export default function ReviewModal({ project, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.submitReview(project.id, { rating, feedback, sentiment });
      setSubmitted(true);
    } catch {
      alert('Failed to submit review.');
    }
    setSubmitting(false);
  };

  const isHappy = rating >= 4;

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal review-modal">
          <div className="modal__body" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 style={{ marginTop: '16px' }}>Thank you for your feedback!</h3>
            {isHappy ? (
              <p style={{ marginTop: '12px', color: '#6b7280' }}>
                We are glad you had a great experience. Would you mind leaving us a Google review?
              </p>
            ) : (
              <p style={{ marginTop: '12px', color: '#6b7280' }}>
                We appreciate your honesty. Your feedback has been sent directly to your account manager.
              </p>
            )}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {isHappy && (
                <a href="https://g.page/r/YOUR_REVIEW_LINK/review" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  Leave a Google Review
                </a>
              )}
              <button className="btn btn--outline" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal review-modal">
        <div className="modal__header">
          <h3>How was your experience?</h3>
          <button className="modal__close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal__body">
          <p style={{ marginBottom: '8px', color: '#6b7280' }}>
            Your project <strong>{project.name}</strong> is complete. We would love your feedback.
          </p>

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${star <= (hover || rating) ? 'star--active' : ''}`}
                onClick={() => { setRating(star); setSentiment(star >= 4 ? 'Happy' : star >= 3 ? 'Neutral' : 'Unhappy'); }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill={star <= (hover || rating) ? '#C5A55A' : 'none'} stroke={star <= (hover || rating) ? '#C5A55A' : '#d1d5db'} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>

          {rating > 0 && (
            <>
              <textarea
                className="form-textarea"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={rating >= 4 ? 'What did you enjoy most?' : 'What could we improve?'}
                style={{ marginTop: '16px' }}
              />
              <div className="modal__actions">
                <button className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
                <button className="btn btn--ghost" onClick={onClose}>Skip</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
