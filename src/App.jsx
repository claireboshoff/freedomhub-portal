import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './lib/api';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import ClientBrain from './components/ClientBrain';
import Services from './components/Services';
import ProjectHub from './components/ProjectHub';
import ProjectFlow from './components/ProjectFlow';
import Financial from './components/Financial';
import HelpDesk from './components/HelpDesk';
import ReviewModal from './components/ReviewModal';
import SignIn from './components/SignIn';

function App() {
  const [client, setClient] = useState(null);
  const [portalAccess, setPortalAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showReview, setShowReview] = useState(null);

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
        setPortalAccess({
          portalActive: data.portalActive,
          portalExpiry: data.portalExpiry,
          maintenancePlan: data.maintenancePlan,
        });
        if (!sessionStorage.getItem('portal_welcomed')) {
          setShowWelcome(true);
        }
        // Check for completed projects needing review
        if (data.pendingReview) {
          setShowReview(data.pendingReview);
        }
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

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('portal_welcomed', '1');
    setShowWelcome(false);
  };

  const handleSignIn = (token) => {
    api.setToken(token);
    setError(null);
    setLoading(true);
    api.auth()
      .then((data) => {
        setClient(data.client);
        setPortalAccess({
          portalActive: data.portalActive,
          portalExpiry: data.portalExpiry,
          maintenancePlan: data.maintenancePlan,
        });
        if (!sessionStorage.getItem('portal_welcomed')) {
          setShowWelcome(true);
        }
        if (data.pendingReview) {
          setShowReview(data.pendingReview);
        }
        setLoading(false);
      })
      .catch((err) => {
        api.clearToken();
        if (err.status === 401) {
          setError('INVALID_TOKEN');
        } else {
          setError('AUTH_FAILED');
        }
        setLoading(false);
      });
  };

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

  if (error === 'NO_TOKEN' || error === 'INVALID_TOKEN') {
    return <SignIn error={error} onSignIn={handleSignIn} />;
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
    <>
      {showWelcome && <Welcome client={client} onComplete={handleWelcomeComplete} />}
      {showReview && <ReviewModal project={showReview} onClose={() => setShowReview(null)} />}
      <Layout client={client}>
        <Routes>
          <Route path="/" element={<Dashboard client={client} portalAccess={portalAccess} />} />
          <Route path="/profile" element={<ClientBrain client={client} onUpdate={setClient} />} />
          <Route path="/services" element={<Services client={client} />} />
          <Route path="/projects" element={<ProjectHub client={client} />} />
          <Route path="/projects/:projectId" element={<ProjectFlow client={client} />} />
          <Route path="/financial" element={<Financial client={client} />} />
          <Route path="/help" element={<HelpDesk client={client} portalAccess={portalAccess} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
