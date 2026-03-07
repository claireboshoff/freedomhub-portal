import React, { useState, useEffect, lazy, Suspense } from 'react';
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

// Academy / Courses (lazy loaded)
const Academy = lazy(() => import('./components/Academy'));
const CourseBrowse = lazy(() => import('./components/CourseBrowse'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const LessonPlayer = lazy(() => import('./components/LessonPlayer'));
const MyCertificates = lazy(() => import('./components/MyCertificates'));
const CertificateView = lazy(() => import('./components/CertificateView'));
const CourseCommunity = lazy(() => import('./components/CourseCommunity'));

// Admin components (lazy loaded)
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AdminClients = lazy(() => import('./components/AdminClients'));
const AdminProjects = lazy(() => import('./components/AdminProjects'));
const AdminInvoices = lazy(() => import('./components/AdminInvoices'));
const AdminTickets = lazy(() => import('./components/AdminTickets'));
const AdminClientDetail = lazy(() => import('./components/AdminClientDetail'));
const AdminCoaching = lazy(() => import('./components/AdminCoaching'));
const AdminCoachingDetail = lazy(() => import('./components/AdminCoachingDetail'));

function App() {
  const [client, setClient] = useState(null);
  const [portalAccess, setPortalAccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showReview, setShowReview] = useState(null);

  const handleAuthData = (data) => {
    setClient(data.client);
    setIsAdmin(data.isAdmin || false);
    setPortalAccess({
      portalActive: data.portalActive,
      portalExpiry: data.portalExpiry,
      maintenancePlan: data.maintenancePlan,
    });
    if (!data.isAdmin && !sessionStorage.getItem('portal_welcomed')) {
      setShowWelcome(true);
    }
    if (data.pendingReview) {
      setShowReview(data.pendingReview);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setError('NO_TOKEN');
      setLoading(false);
      return;
    }

    api
      .auth()
      .then(handleAuthData)
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
      .then(handleAuthData)
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
          <div className="auth-logo">
            <img src={new URL('./assets/logo.png', import.meta.url).href} alt="FreedomHub" style={{ height: '56px', marginBottom: '8px' }} />
          </div>
          <h2>Something went wrong</h2>
          <p>We could not authenticate your session. Please try again or contact support.</p>
        </div>
      </div>
    );
  }

  const adminFallback = <div style={{ padding: '40px', textAlign: 'center' }}><div className="spinner" /></div>;

  return (
    <>
      {showWelcome && <Welcome client={client} onComplete={handleWelcomeComplete} />}
      {showReview && <ReviewModal project={showReview} onClose={() => setShowReview(null)} />}
      <Layout client={client} isAdmin={isAdmin}>
        <Routes>
          {/* Client routes */}
          <Route path="/" element={isAdmin ? <Suspense fallback={adminFallback}><AdminDashboard /></Suspense> : <Dashboard client={client} portalAccess={portalAccess} />} />
          <Route path="/profile" element={<ClientBrain client={client} onUpdate={setClient} />} />
          <Route path="/learn" element={<Suspense fallback={adminFallback}><Academy client={client} /></Suspense>} />
          <Route path="/learn/browse" element={<Suspense fallback={adminFallback}><CourseBrowse client={client} /></Suspense>} />
          <Route path="/learn/:slug" element={<Suspense fallback={adminFallback}><CourseDetail client={client} /></Suspense>} />
          <Route path="/learn/certificates" element={<Suspense fallback={adminFallback}><MyCertificates client={client} /></Suspense>} />
          <Route path="/learn/certificate/:certId" element={<Suspense fallback={adminFallback}><CertificateView client={client} /></Suspense>} />
          <Route path="/learn/:slug/lesson/:lessonId" element={<Suspense fallback={adminFallback}><LessonPlayer client={client} /></Suspense>} />
          <Route path="/learn/:slug/community" element={<Suspense fallback={adminFallback}><CourseCommunity client={client} /></Suspense>} />
          <Route path="/services" element={<Services client={client} />} />
          <Route path="/projects" element={<ProjectHub client={client} />} />
          <Route path="/projects/:projectId" element={<ProjectFlow client={client} />} />
          <Route path="/financial" element={<Financial client={client} />} />
          <Route path="/help" element={<HelpDesk client={client} portalAccess={portalAccess} />} />

          {/* Admin routes */}
          {isAdmin && (
            <>
              <Route path="/admin/clients" element={<Suspense fallback={adminFallback}><AdminClients /></Suspense>} />
              <Route path="/admin/clients/:clientId" element={<Suspense fallback={adminFallback}><AdminClientDetail /></Suspense>} />
              <Route path="/admin/projects" element={<Suspense fallback={adminFallback}><AdminProjects /></Suspense>} />
              <Route path="/admin/invoices" element={<Suspense fallback={adminFallback}><AdminInvoices /></Suspense>} />
              <Route path="/admin/tickets" element={<Suspense fallback={adminFallback}><AdminTickets /></Suspense>} />
              <Route path="/admin/coaching" element={<Suspense fallback={adminFallback}><AdminCoaching /></Suspense>} />
              <Route path="/admin/coaching/:coachingClientId" element={<Suspense fallback={adminFallback}><AdminCoachingDetail /></Suspense>} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
