import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function formatRand(amount) {
  return `R${(amount || 0).toLocaleString('en-ZA')}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.adminClients().catch(() => ({ clients: [] })),
      api.adminProjects().catch(() => ({ projects: [] })),
      api.adminInvoices().catch(() => ({ invoices: [] })),
      api.adminTickets().catch(() => ({ tickets: [] })),
    ]).then(([clientData, projData, invData, tickData]) => {
      setData({
        clients: clientData.clients || [],
        projects: projData.projects || [],
        invoices: invData.invoices || [],
        tickets: tickData.tickets || [],
      });
      setLoading(false);
    }).catch(() => {
      setError('Failed to load admin data.');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading command center...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const { clients, projects, invoices, tickets } = data;

  const activeClients = clients.filter((c) => c.status === 'Active');
  const activeProjects = projects.filter((p) => p.status === 'Active');
  const awaitingContract = projects.filter((p) => p.status === 'Awaiting Contract');
  const awaitingPayment = projects.filter((p) => p.status === 'Awaiting Payment');
  const completeProjects = projects.filter((p) => p.status === 'Complete');
  const pendingInvoices = invoices.filter((i) => i.status !== 'Paid' && i.status !== 'Cancelled');
  const pendingTotal = pendingInvoices.reduce((sum, i) => sum + (i.amount || 0), 0);
  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress');

  // Recent activity: last 5 project updates sorted by date
  const recentActivity = projects
    .filter((p) => p.lastUpdateDate)
    .sort((a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate))
    .slice(0, 5);

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h2>Command Center</h2>
        <p className="page-subtitle">Agency-wide overview across all clients.</p>
      </div>

      <div className="admin-metrics">
        <div className="admin-metric-card" onClick={() => navigate('/admin/clients')}>
          <div className="admin-metric-card__label">Active Clients</div>
          <div className="admin-metric-card__value">{activeClients.length}</div>
          <div className="admin-metric-card__sub">{clients.length} total</div>
        </div>
        <div className="admin-metric-card" onClick={() => navigate('/admin/projects')}>
          <div className="admin-metric-card__label">Active Projects</div>
          <div className="admin-metric-card__value">{activeProjects.length}</div>
          <div className="admin-metric-card__sub">{projects.length} total</div>
        </div>
        <div className="admin-metric-card" onClick={() => navigate('/admin/invoices')}>
          <div className="admin-metric-card__label">Pending Invoices</div>
          <div className="admin-metric-card__value">{pendingInvoices.length}</div>
          <div className="admin-metric-card__sub admin-metric-card__sub--warn">
            {formatRand(pendingTotal)} outstanding
          </div>
        </div>
        <div className="admin-metric-card" onClick={() => navigate('/admin/tickets')}>
          <div className="admin-metric-card__label">Open Tickets</div>
          <div className="admin-metric-card__value">{openTickets.length}</div>
          <div className="admin-metric-card__sub">{tickets.length} total</div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Projects by Status */}
        <div className="card">
          <div className="card__header">
            <h3>Projects by Status</h3>
          </div>
          <div className="card__body">
            <div className="admin-status-breakdown">
              <div className="admin-status-row">
                <span className="status-badge status-badge--active">Active</span>
                <span className="admin-status-count">{activeProjects.length}</span>
              </div>
              <div className="admin-status-row">
                <span className="status-badge status-badge--awaiting-contract">Awaiting Contract</span>
                <span className="admin-status-count">{awaitingContract.length}</span>
              </div>
              <div className="admin-status-row">
                <span className="status-badge status-badge--awaiting-payment">Awaiting Payment</span>
                <span className="admin-status-count">{awaitingPayment.length}</span>
              </div>
              <div className="admin-status-row">
                <span className="status-badge status-badge--complete">Complete</span>
                <span className="admin-status-count">{completeProjects.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card__header">
            <h3>Recent Activity</h3>
          </div>
          <div className="card__body">
            {recentActivity.length > 0 ? (
              <div className="admin-activity-feed">
                {recentActivity.map((p) => (
                  <div key={p.id} className="admin-activity-item">
                    <div className="admin-activity-date">
                      {p.lastUpdateDate
                        ? new Date(p.lastUpdateDate).toLocaleDateString('en-ZA', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : '--'}
                    </div>
                    <div className="admin-activity-info">
                      <strong>{p.lastUpdateTitle || 'Update'}</strong>
                      <span className="admin-activity-project">{p.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No recent project updates.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card card--full">
          <div className="card__header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card__body">
            <div className="admin-quick-actions">
              <button className="btn btn--primary" onClick={() => navigate('/admin/projects')}>
                View All Projects
              </button>
              <button className="btn btn--outline" onClick={() => navigate('/admin/invoices')}>
                View Invoices
              </button>
              <button className="btn btn--outline" onClick={() => navigate('/admin/tickets')}>
                View Tickets
              </button>
              <button className="btn btn--outline" onClick={() => navigate('/admin/clients')}>
                View All Clients
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
