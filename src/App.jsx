import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './lib/api';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Analytics from './components/Analytics';
import Reports from './components/Reports';

function App() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setError('NO_TOKEN');
      setLoading(false);
      return;
    }

    api
      .auth()
      .then((data) => {
        setClient(data.client);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          setError('INVALID_TOKEN');
        } else {
          setError('AUTH_FAILED');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="spinner" />
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  if (error === 'NO_TOKEN') {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="auth-logo">FreedomHub</div>
          <h2>Client Portal</h2>
          <p>Please use the link provided by your account manager to access your portal.</p>
          <p className="text-muted">No access token found in the URL.</p>
        </div>
      </div>
    );
  }

  if (error === 'INVALID_TOKEN') {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="auth-logo">FreedomHub</div>
          <h2>Access Denied</h2>
          <p>Your access token is invalid or has expired. Please contact your account manager for a new link.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="auth-logo">FreedomHub</div>
          <h2>Something went wrong</h2>
          <p>We could not authenticate your session. Please try again or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout client={client}>
      <Routes>
        <Route path="/" element={<Dashboard client={client} />} />
        <Route path="/calendar" element={<Calendar client={client} />} />
        <Route path="/analytics" element={<Analytics client={client} />} />
        <Route path="/reports" element={<Reports client={client} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
