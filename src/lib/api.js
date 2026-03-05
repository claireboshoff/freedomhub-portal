const BASE_URL = 'https://n8nion8n-production-124b.up.railway.app/webhook/portal-api';

function getToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    sessionStorage.setItem('portal_token', token);
    return token;
  }
  return sessionStorage.getItem('portal_token');
}

async function request(route, options = {}) {
  const token = getToken();
  if (!token) {
    throw new Error('NO_TOKEN');
  }

  const { method = 'GET', body } = options;
  const params = new URLSearchParams({ token, route });

  const fetchOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body && method === 'POST') {
    fetchOptions.body = JSON.stringify(body);
  } else if (body) {
    Object.entries(body).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, typeof v === 'object' ? JSON.stringify(v) : v);
    });
  }

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url, fetchOptions);
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
  submitProjectFeedback(projectId, feedback) {
    return request('project-feedback', { method: 'POST', body: { projectId, feedback } });
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

  // Legacy (marketing portal)
  getCampaigns() {
    return request('campaigns');
  },
  getContent() {
    return request('content');
  },
  getAnalytics() {
    return request('analytics');
  },
  getApprovals() {
    return request('approvals');
  },
  getReports() {
    return request('reports');
  },
  getSentinel() {
    return request('sentinel');
  },
  approveContent(recordId, table = 'approvals') {
    return request('approve', { body: { recordId, action: 'approve', table } });
  },
  reviseContent(recordId, notes, table = 'approvals') {
    return request('approve', { body: { recordId, action: 'revise', notes, table } });
  },
};
