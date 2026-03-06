import React, { useState } from 'react';
import logo from '../assets/logo.png';

function SignIn({ error, onSignIn }) {
  const [token, setToken] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setSubmitting(true);
    onSignIn(token.trim());
  };

  return (
    <div className="auth-screen">
      <div className="auth-card signin-card">
        <img src={logo} alt="FreedomHub" className="signin-logo-img" />
        <h2>Client Portal</h2>
        <p className="signin-subtitle">
          Sign in using the access code from your welcome email, or click the link we sent you.
        </p>

        {error === 'INVALID_TOKEN' && (
          <div className="signin-error">
            That access code doesn't seem right. Please check your welcome email and try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="signin-form">
          <label htmlFor="token-input" className="signin-label">Access Code</label>
          <input
            id="token-input"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your access code from your welcome email"
            className="signin-input"
            autoFocus
            disabled={submitting}
          />
          <button
            type="submit"
            className="signin-btn"
            disabled={!token.trim() || submitting}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="signin-help">
          Don't have an access code? Contact <a href="mailto:info@freedomhub.io">info@freedomhub.io</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
