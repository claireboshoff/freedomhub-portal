import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Dashboard({ client, portalAccess }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getProjects().catch(() => ({ projects: [] })),
      api.getInvoices().catch(() => ({ invoices: [] })),
      api.getTickets().catch(() => ({ tickets: [] })),
      api.getMaintenanceLog().catch(() => ({ log: [] })),
    ]).then(([projData, invData, tickData, maintData]) => {
      setProjects(projData.projects || []);
      setInvoices(invData.invoices || []);
      setTickets(tickData.tickets || []);
      setMaintenance(maintData.log || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const activeProjects = projects.filter((p) => p.status === 'Active' || p.status === 'Awaiting Approval');
  const pendingInvoices = invoices.filter((i) => i.status === 'Pending' || i.status === 'Sent' || i.status === 'Overdue');
  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress');
  const profileComplete = client?.mission && client?.brandColors && client?.usp;
  const recentMaintenance = maintenance.slice(0, 3);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Welcome back{client?.name ? `, ${client.name.split(' ')[0]}` : ''}.</h2>
        <p className="page-subtitle">Here is everything happening across your account.</p>
      </div>

      {/* Profile completion nudge */}
      {!profileComplete && (
        <div className="nudge-card" onClick={() => navigate('/profile')}>
          <div className="nudge-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          </div>
          <div>
            <strong>Complete your profile</strong>
            <p>Your Client Brain powers everything we build. The more we know, the better we deliver.</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card metric-card--clickable" onClick={() => navigate('/projects')}>
          <div className="metric-card__label">Active Projects</div>
          <div className="metric-card__value">{activeProjects.length}</div>
          <div className="metric-card__sub">{projects.length} total</div>
        </div>
        <div className="metric-card metric-card--clickable" onClick={() => navigate('/financial')}>
          <div className="metric-card__label">Pending Invoices</div>
          <div className="metric-card__value">{pendingInvoices.length}</div>
          {pendingInvoices.length > 0 && (
            <div className="metric-card__sub metric-card__sub--warn">Action needed</div>
          )}
        </div>
        <div className="metric-card metric-card--clickable" onClick={() => navigate('/help')}>
          <div className="metric-card__label">Open Tickets</div>
          <div className="metric-card__value">{openTickets.length}</div>
        </div>
        <div className="metric-card metric-card--clickable" onClick={() => navigate('/services')}>
          <div className="metric-card__label">Services</div>
          <div className="metric-card__value metric-card__value--text">Browse</div>
          <div className="metric-card__sub">Start a new project</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Active Projects */}
        <div className="card">
          <div className="card__header">
            <h3>Active Projects</h3>
            <button className="btn btn--ghost btn--sm" onClick={() => navigate('/projects')}>View All</button>
          </div>
          <div className="card__body">
            {activeProjects.length > 0 ? (
              <div className="dash-list">
                {activeProjects.slice(0, 4).map((p) => (
                  <div key={p.id} className="dash-item" onClick={() => navigate(`/projects/${p.id}`)}>
                    <div className="dash-item__info">
                      <strong>{p.name}</strong>
                      <span className="dash-item__meta">{p.serviceType} &mdash; {p.currentPhase}</span>
                    </div>
                    <div className="dash-item__progress">
                      <div className="progress-bar progress-bar--sm">
                        <div className="progress-bar__fill" style={{ width: `${p.buildProgress || 0}%` }} />
                      </div>
                      <span>{p.buildProgress || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No active projects. <button className="link-button" onClick={() => navigate('/services')}>Start one</button></p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="card">
          <div className="card__header">
            <h3>Needs Your Attention</h3>
          </div>
          <div className="card__body">
            {pendingInvoices.length === 0 && projects.filter((p) => p.status === 'Awaiting Approval').length === 0 && projects.filter((p) => p.status === 'Awaiting Contract').length === 0 ? (
              <p className="empty-state">All caught up. Nothing requires your action right now.</p>
            ) : (
              <div className="dash-list">
                {projects.filter((p) => p.status === 'Awaiting Contract').map((p) => (
                  <div key={`c-${p.id}`} className="dash-item dash-item--warn" onClick={() => navigate(`/projects/${p.id}`)}>
                    <span className="dash-item__badge dash-item__badge--orange">Contract</span>
                    <span>{p.name} &mdash; awaiting your signature</span>
                  </div>
                ))}
                {pendingInvoices.map((inv) => (
                  <div key={`i-${inv.id}`} className="dash-item dash-item--warn" onClick={() => navigate('/financial')}>
                    <span className={`dash-item__badge ${inv.status === 'Overdue' ? 'dash-item__badge--red' : 'dash-item__badge--yellow'}`}>
                      {inv.status === 'Overdue' ? 'Overdue' : 'Invoice'}
                    </span>
                    <span>{inv.invoiceNumber} &mdash; R{inv.amount?.toLocaleString()}</span>
                  </div>
                ))}
                {projects.filter((p) => p.status === 'Awaiting Approval').map((p) => (
                  <div key={`a-${p.id}`} className="dash-item dash-item--info" onClick={() => navigate(`/projects/${p.id}`)}>
                    <span className="dash-item__badge dash-item__badge--blue">Review</span>
                    <span>{p.name} &mdash; ready for your review</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Maintenance Log — maintenance plan clients only */}
        {portalAccess?.maintenancePlan === 'Active' ? (
          <div className="card card--full">
            <div className="card__header">
              <h3>Behind the Scenes</h3>
              <span className="card__badge">{maintenance.length} updates</span>
            </div>
            <div className="card__body">
              {recentMaintenance.length > 0 ? (
                <div className="dash-list">
                  {recentMaintenance.map((m) => (
                    <div key={m.id} className="dash-item">
                      <span className={`maint-badge maint-badge--${(m.type || 'other').toLowerCase().replace(/\s+/g, '-')}`}>
                        {m.type}
                      </span>
                      <div className="dash-item__info">
                        <span>{m.description}</span>
                        <span className="dash-item__meta">{m.date} {m.timeSpent && `(${m.timeSpent})`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">Maintenance activity will appear here as we work on your systems.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="card card--full">
            <div className="card__header">
              <h3>Monthly Maintenance</h3>
            </div>
            <div className="card__body">
              <div className="upsell-card">
                <p><strong>See what happens behind the scenes.</strong></p>
                <p>Security updates, backups, performance tuning — all logged transparently. Available on maintenance plans from R500/month.</p>
                <button className="btn btn--primary btn--sm" onClick={() => navigate('/help')}>Learn More</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
