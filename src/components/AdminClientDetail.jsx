import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function formatRand(amount) {
  return `R${(amount || 0).toLocaleString('en-ZA')}`;
}

export default function AdminClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    Promise.all([
      api.adminClients().catch(() => ({ clients: [] })),
      api.adminProjects().catch(() => ({ projects: [] })),
      api.adminInvoices().catch(() => ({ invoices: [] })),
      api.adminTickets().catch(() => ({ tickets: [] })),
    ]).then(([clientData, projData, invData, tickData]) => {
      const allClients = clientData.clients || [];
      const found = allClients.find((c) => c.id === id);
      setClient(found || null);

      const clientName = found?.name || '';
      const clientId = found?.id || '';

      setProjects(
        (projData.projects || []).filter(
          (p) => p.clientId === clientId || p.clientName === clientName
        )
      );
      setInvoices(
        (invData.invoices || []).filter(
          (i) => i.clientId === clientId || i.clientName === clientName
        )
      );
      setTickets(
        (tickData.tickets || []).filter(
          (t) => t.clientId === clientId || t.clientName === clientName
        )
      );
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading client details...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="admin-client-detail-page">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/admin/clients')}>
          Back to Clients
        </button>
        <div className="empty-state-card" style={{ marginTop: '20px' }}>
          <p>Client not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-client-detail-page">
      <button className="btn btn--ghost btn--sm" onClick={() => navigate('/admin/clients')} style={{ marginBottom: '16px' }}>
        Back to Clients
      </button>

      {/* Client Info Card */}
      <div className="admin-client-info-card">
        <div className="admin-client-info-card__avatar">
          {(client.name || client.businessName || 'C').charAt(0).toUpperCase()}
        </div>
        <div className="admin-client-info-card__details">
          <h2>{client.name || '--'}</h2>
          {(client.businessName || client.company) && (
            <p className="admin-client-info-card__business">{client.businessName || client.company}</p>
          )}
          <div className="admin-client-info-card__meta">
            {client.email && <span>{client.email}</span>}
            {client.phone && <span>{client.phone}</span>}
            {client.maintenancePlan && (
              <span className="admin-plan-badge">{client.maintenancePlan}</span>
            )}
            <span className={`status-badge status-badge--${(client.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
              {client.status || 'Active'}
            </span>
          </div>
        </div>
      </div>

      <div className="admin-detail-grid">
        {/* Projects */}
        <div className="card">
          <div className="card__header">
            <h3>Projects ({projects.length})</h3>
          </div>
          <div className="card__body">
            {projects.length === 0 ? (
              <p className="empty-state">No projects for this client.</p>
            ) : (
              <div className="dash-list">
                {projects.map((p) => (
                  <div key={p.id} className="dash-item">
                    <div className="dash-item__info">
                      <strong>{p.name}</strong>
                      <span className="dash-item__meta">{p.serviceType} -- {p.currentPhase || '--'}</span>
                    </div>
                    <span className={`status-badge status-badge--${(p.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                      {p.status}
                    </span>
                    <div className="dash-item__progress">
                      <div className="progress-bar progress-bar--sm">
                        <div className="progress-bar__fill" style={{ width: `${p.buildProgress || 0}%` }} />
                      </div>
                      <span>{p.buildProgress || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invoices */}
        <div className="card">
          <div className="card__header">
            <h3>Invoices ({invoices.length})</h3>
          </div>
          <div className="card__body">
            {invoices.length === 0 ? (
              <p className="empty-state">No invoices for this client.</p>
            ) : (
              <div className="dash-list">
                {invoices.map((inv) => (
                  <div key={inv.id} className="dash-item">
                    <div className="dash-item__info">
                      <strong>{inv.invoiceNumber || '--'}</strong>
                      <span className="dash-item__meta">{inv.type || '--'} -- {formatRand(inv.amount)}</span>
                    </div>
                    <span className={`status-badge status-badge--${(inv.status || 'draft').toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tickets */}
        <div className="card card--full">
          <div className="card__header">
            <h3>Tickets ({tickets.length})</h3>
          </div>
          <div className="card__body">
            {tickets.length === 0 ? (
              <p className="empty-state">No tickets from this client.</p>
            ) : (
              <div className="dash-list">
                {tickets.map((t) => (
                  <div key={t.id} className="dash-item">
                    <span className={`ticket-priority ticket-priority--${(t.priority || 'medium').toLowerCase()}`}>
                      {t.priority || 'Medium'}
                    </span>
                    <div className="dash-item__info">
                      <strong>{t.subject || 'No subject'}</strong>
                      <span className="dash-item__meta">
                        {t.date ? new Date(t.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' }) : '--'}
                      </span>
                    </div>
                    <span className={`status-badge status-badge--${(t.status || 'open').toLowerCase().replace(/\s+/g, '-')}`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
