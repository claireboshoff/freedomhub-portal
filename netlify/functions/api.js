const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const TABLES = {
  clients: 'tblzoPlOyNh8C4jwK',
  campaigns: 'tbluLuKiqM1OyxjFu',
  content: 'tblqVKIum1Y92qKzc',
  analytics: 'tblt5HUjyQzSpBSTx',
  approvals: 'tblg1mZy63d6luqwC',
  reports: 'tblgs1nVVt1mudHau',
  sentinel: 'tblvq4kKnhen1WqiO',
};

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
  'Content-Type': 'application/json',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

async function airtableFetch(tableId, options = {}) {
  const { filterFormula, sort, maxRecords } = options;
  const params = new URLSearchParams();
  if (filterFormula) params.append('filterByFormula', filterFormula);
  if (sort) params.append('sort[0][field]', sort.field);
  if (sort && sort.direction) params.append('sort[0][direction]', sort.direction);
  if (maxRecords) params.append('maxRecords', maxRecords.toString());

  const url = `${AIRTABLE_URL}/${tableId}?${params.toString()}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable error ${res.status}: ${err}`);
  }
  return res.json();
}

async function airtablePatch(tableId, recordId, fields) {
  const url = `${AIRTABLE_URL}/${tableId}/${recordId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable PATCH error ${res.status}: ${err}`);
  }
  return res.json();
}

async function validateToken(token) {
  if (!token) return null;
  const data = await airtableFetch(TABLES.clients, {
    filterFormula: `{Portal Token} = "${token}"`,
    maxRecords: 1,
  });
  if (!data.records || data.records.length === 0) return null;
  return data.records[0];
}

export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/api', '').replace(/^\//, '');
  const params = event.queryStringParameters || {};
  const token = params.token;

  // Validate token for all routes
  let client;
  try {
    client = await validateToken(token);
  } catch (err) {
    return respond(500, { error: 'Authentication service error' });
  }

  if (!client) {
    return respond(401, { error: 'Invalid or missing token' });
  }

  const clientName = client.fields['Name'] || client.fields['Client Name'] || '';
  const clientId = client.id;

  try {
    // --- AUTH ---
    if (path === 'auth') {
      return respond(200, {
        client: {
          id: clientId,
          name: clientName,
          email: client.fields['Email'] || '',
          company: client.fields['Company'] || clientName,
          logo: client.fields['Logo'] ? client.fields['Logo'][0]?.url : null,
        },
      });
    }

    // --- CAMPAIGNS ---
    if (path === 'campaigns') {
      const data = await airtableFetch(TABLES.campaigns, {
        filterFormula: `FIND("${clientName}", {Client})`,
      });
      return respond(200, {
        campaigns: data.records.map((r) => ({
          id: r.id,
          name: r.fields['Name'] || r.fields['Campaign Name'] || '',
          status: r.fields['Status'] || '',
          startDate: r.fields['Start Date'] || '',
          endDate: r.fields['End Date'] || '',
          platform: r.fields['Platform'] || '',
          objective: r.fields['Objective'] || '',
        })),
      });
    }

    // --- CONTENT CALENDAR ---
    if (path === 'content') {
      const data = await airtableFetch(TABLES.content, {
        filterFormula: `FIND("${clientName}", {Client})`,
        sort: { field: 'Date', direction: 'desc' },
      });
      return respond(200, {
        content: data.records.map((r) => ({
          id: r.id,
          title: r.fields['Title'] || r.fields['Name'] || '',
          status: r.fields['Status'] || '',
          platform: r.fields['Platform'] || '',
          date: r.fields['Date'] || r.fields['Scheduled Date'] || '',
          type: r.fields['Type'] || r.fields['Content Type'] || '',
          copy: r.fields['Copy'] || r.fields['Caption'] || '',
          mediaUrl: r.fields['Media'] ? r.fields['Media'][0]?.url : null,
          campaign: r.fields['Campaign'] || '',
          notes: r.fields['Notes'] || r.fields['Revision Notes'] || '',
        })),
      });
    }

    // --- ANALYTICS ---
    if (path === 'analytics') {
      const data = await airtableFetch(TABLES.analytics, {
        filterFormula: `FIND("${clientName}", {Client})`,
        sort: { field: 'Date', direction: 'desc' },
      });
      return respond(200, {
        analytics: data.records.map((r) => ({
          id: r.id,
          date: r.fields['Date'] || '',
          platform: r.fields['Platform'] || '',
          impressions: r.fields['Impressions'] || 0,
          reach: r.fields['Reach'] || 0,
          engagement: r.fields['Engagement'] || 0,
          engagementRate: r.fields['Engagement Rate'] || 0,
          clicks: r.fields['Clicks'] || 0,
          contentTitle: r.fields['Content Title'] || r.fields['Content'] || '',
        })),
      });
    }

    // --- APPROVALS (pending items) ---
    if (path === 'approvals') {
      const data = await airtableFetch(TABLES.approvals, {
        filterFormula: `AND(FIND("${clientName}", {Client}), {Status} = "Pending Approval")`,
      });
      return respond(200, {
        approvals: data.records.map((r) => ({
          id: r.id,
          title: r.fields['Title'] || r.fields['Name'] || '',
          type: r.fields['Type'] || r.fields['Content Type'] || '',
          platform: r.fields['Platform'] || '',
          copy: r.fields['Copy'] || r.fields['Caption'] || '',
          mediaUrl: r.fields['Media'] ? r.fields['Media'][0]?.url : null,
          date: r.fields['Date'] || r.fields['Scheduled Date'] || '',
          campaign: r.fields['Campaign'] || '',
        })),
      });
    }

    // --- APPROVE/REVISE ---
    if (path === 'approve' && event.httpMethod === 'PATCH') {
      const body = JSON.parse(event.body || '{}');
      const { recordId, action, notes, table } = body;

      if (!recordId || !action) {
        return respond(400, { error: 'recordId and action are required' });
      }

      const targetTable = table === 'content' ? TABLES.content : TABLES.approvals;
      const fields = {};

      if (action === 'approve') {
        fields['Status'] = 'Approved';
      } else if (action === 'revise') {
        fields['Status'] = 'Revision Needed';
        if (notes) {
          fields['Revision Notes'] = notes;
          fields['Notes'] = notes;
        }
      } else {
        return respond(400, { error: 'action must be "approve" or "revise"' });
      }

      const result = await airtablePatch(targetTable, recordId, fields);
      return respond(200, { success: true, record: result });
    }

    // --- REPORTS ---
    if (path === 'reports') {
      const data = await airtableFetch(TABLES.reports, {
        filterFormula: `FIND("${clientName}", {Client})`,
        sort: { field: 'Date', direction: 'desc' },
      });
      return respond(200, {
        reports: data.records.map((r) => ({
          id: r.id,
          name: r.fields['Name'] || r.fields['Report Name'] || '',
          date: r.fields['Date'] || '',
          type: r.fields['Type'] || r.fields['Report Type'] || '',
          fileUrl: r.fields['File'] ? r.fields['File'][0]?.url : null,
          summary: r.fields['Summary'] || '',
        })),
      });
    }

    // --- SENTINEL INTEL ---
    if (path === 'sentinel') {
      const data = await airtableFetch(TABLES.sentinel, {
        filterFormula: `FIND("${clientName}", {Client})`,
        sort: { field: 'Date', direction: 'desc' },
      });
      return respond(200, {
        intel: data.records.map((r) => ({
          id: r.id,
          title: r.fields['Title'] || r.fields['Name'] || '',
          date: r.fields['Date'] || '',
          priority: r.fields['Priority'] || '',
          category: r.fields['Category'] || r.fields['Type'] || '',
          summary: r.fields['Summary'] || r.fields['Description'] || '',
          source: r.fields['Source'] || '',
          actionRequired: r.fields['Action Required'] || false,
        })),
      });
    }

    return respond(404, { error: `Unknown route: ${path}` });
  } catch (err) {
    console.error('API Error:', err);
    return respond(500, { error: 'Internal server error' });
  }
}
