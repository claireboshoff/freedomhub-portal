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
  if (body) {
    Object.entries(body).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, v);
    });
  }
  const url = `${BASE_URL}?${params.toString()}`;

  const fetchOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

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

  auth() {
    return request('auth');
  },

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
    return request('approve', {
      body: { recordId, action: 'approve', table },
    });
  },

  reviseContent(recordId, notes, table = 'approvals') {
    return request('approve', {
      body: { recordId, action: 'revise', notes, table },
    });
  },
};
