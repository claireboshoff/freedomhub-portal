const BASE_URL = 'https://n8nion8n-production-124b.up.railway.app/webhook/portal-api';

function getToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    localStorage.setItem('portal_token', token);
    sessionStorage.setItem('portal_token', token);
    // Clean token from URL for security
    const url = new URL(window.location);
    url.searchParams.delete('token');
    window.history.replaceState({}, '', url.pathname + url.hash);
    return token;
  }
  return localStorage.getItem('portal_token') || sessionStorage.getItem('portal_token');
}

function setToken(token) {
  localStorage.setItem('portal_token', token);
  sessionStorage.setItem('portal_token', token);
}

function clearToken() {
  localStorage.removeItem('portal_token');
  sessionStorage.removeItem('portal_token');
}

async function request(route, options = {}) {
  const token = getToken();
  if (!token) {
    throw new Error('NO_TOKEN');
  }

  const { body } = options;
  const params = new URLSearchParams({ token, route });

  if (body) {
    params.append('payload', JSON.stringify(body));
  }

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error || `Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  getToken,
  setToken,
  clearToken,

  // Auth
  auth() {
    return request('auth');
  },

  // Client Brain (Profile)
  updateProfile(profileData) {
    return request('update-profile', { method: 'POST', body: profileData });
  },

  // Services & Briefs
  getServiceRequests() {
    return request('service-requests');
  },
  submitServiceRequest(serviceType, formData) {
    return request('service-request', { method: 'POST', body: { serviceType, ...formData } });
  },

  // Projects
  getProjects() {
    return request('projects');
  },
  getProject(projectId) {
    return request('project', { body: { projectId } });
  },
  getProjectUpdates(projectId) {
    return request('project-updates', { body: { projectId } });
  },
  getProjectContracts(projectId) {
    return request('project-contracts', { body: { projectId } });
  },
  getProjectInvoices(projectId) {
    return request('project-invoices', { body: { projectId } });
  },
  approveProject(projectId) {
    return request('approve-project', { method: 'POST', body: { projectId } });
  },
  completeProject(projectId) {
    return request('complete-project', { method: 'POST', body: { projectId } });
  },
  submitProjectFeedback(projectId, feedback) {
    return request('project-feedback', { method: 'POST', body: { projectId, feedback } });
  },
  approveScope(projectId, addons, totalCost) {
    return request('approve-scope', { method: 'POST', body: { projectId, addons, totalCost } });
  },
  amendScope(projectId, notes) {
    return request('amend-scope', { method: 'POST', body: { projectId, notes } });
  },
  acceptContract(projectId, acceptedBy) {
    return request('accept-contract', { method: 'POST', body: { projectId, acceptedBy } });
  },
  confirmPayment(projectId) {
    return request('confirm-payment', { method: 'POST', body: { projectId } });
  },

  // Financial
  getContracts() {
    return request('contracts');
  },
  signContract(contractId, signatureData) {
    return request('sign-contract', { method: 'POST', body: { contractId, ...signatureData } });
  },
  getInvoices() {
    return request('invoices');
  },

  // Helpdesk
  getTickets() {
    return request('tickets');
  },
  submitTicket(ticketData) {
    return request('ticket', { method: 'POST', body: ticketData });
  },

  // Maintenance
  getMaintenanceLog() {
    return request('maintenance-log');
  },

  // Reviews
  submitReview(projectId, reviewData) {
    return request('review', { method: 'POST', body: { projectId, ...reviewData } });
  },

  // Academy / Courses
  coursesPublished() {
    return request('courses-published');
  },
  courseDetail(slug) {
    return request('course-detail', { body: { slug } });
  },
  myEnrollments() {
    return request('my-enrollments');
  },
  enroll(courseId) {
    return request('enroll', { body: { courseId } });
  },
  myProgress() {
    return request('my-progress');
  },
  leaderboard(courseId) {
    return request('leaderboard', { body: { courseId } });
  },
  lessonDetail(lessonId) {
    return request('lesson-detail', { body: { lessonId } });
  },
  markComplete(lessonId) {
    return request('mark-complete', { body: { lessonId } });
  },
  submitReflection(lessonId, response) {
    return request('submit-reflection', { body: { lessonId, response } });
  },
  quizData(lessonId) {
    return request('quiz-data', { body: { lessonId } });
  },
  submitQuiz(lessonId, answers, score) {
    return request('submit-quiz', { body: { lessonId, answers, score } });
  },
  myCertificates() {
    return request('my-certificates');
  },
  certificateDetail(certificateId) {
    return request('certificate-detail', { body: { certificateId } });
  },

  // Admin
  adminDashboard() {
    return request('admin-dashboard');
  },
  adminClients() {
    return request('admin-clients');
  },
  adminProjects() {
    return request('admin-projects');
  },
  adminInvoices() {
    return request('admin-invoices');
  },
  adminTickets() {
    return request('admin-tickets');
  },
  adminTicketReply(ticketId, reply) {
    return request('admin-ticket-reply', { body: { ticketId, reply } });
  },
  adminUpdateProject(projectId, updates) {
    return request('admin-update-project', { body: { projectId, ...updates } });
  },
  adminUpdateInvoice(invoiceId) {
    return request('admin-update-invoice', { body: { invoiceId } });
  },

  // Coaching
  coachingClients() {
    return request('coaching-clients');
  },
  coachingClientDetail(clientId) {
    return request('coaching-client-detail', { body: { clientId } });
  },
  updateCoachingProfile(clientId, profileData) {
    return request('update-coaching-profile', { body: { clientId, ...profileData } });
  },

};
