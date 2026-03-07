import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const TYPE_COLORS = {
  'Life Coaching': '#8a8a8a',
  'Business Coaching': '#C5A55A',
  'Holistic Coaching': '#2D2D2D',
};

export default function AdminCoaching() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.coachingClients()
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading coaching clients...</p>
      </div>
    );
  }

  const filters = ['All', 'Active', 'Paused', 'Completed', 'Prospect'];
  const filtered = filter === 'All' ? clients : clients.filter((c) => c.status === filter);

  return (
    <div className="admin-coaching-page">
      <div className="page-header">
        <h2>Coaching Clients</h2>
        <p className="page-subtitle">{clients.length} coaching clients total.</p>
      </div>

      <div className="filter-pills" style={{ marginBottom: '20px' }}>
        {filters.map((tab) => (
          <button
            key={tab}
            className={`filter-pill ${filter === tab ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
            {tab !== 'All' && (
              <span className="admin-filter-count">
                {clients.filter((c) => c.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>No coaching clients {filter !== 'All' ? `with status "${filter}"` : 'yet'}.</p>
        </div>
      ) : (
        <div className="admin-coaching-list">
          {filtered.map((client) => {
            const sessionsLeft = (client.totalSessions || 0) - (client.sessionsUsed || 0);
            const sessionPct = client.totalSessions ? Math.round((client.sessionsUsed / client.totalSessions) * 100) : 0;
            return (
              <button
                key={client.id}
                className="admin-coaching-card"
                onClick={() => navigate(`/admin/coaching/${client.id}`)}
              >
                <div className="admin-coaching-card__avatar">
                  {(client.name || 'C').charAt(0).toUpperCase()}
                </div>
                <div className="admin-coaching-card__info">
                  <strong>{client.name}</strong>
                  <span className="admin-coaching-card__meta">
                    {client.business && <span>{client.business}</span>}
                    {client.coachingType && (
                      <span className="coaching-type-badge" style={{ background: TYPE_COLORS[client.coachingType] || '#666', color: '#fff' }}>
                        {client.coachingType}
                      </span>
                    )}
                  </span>
                </div>
                <div className="admin-coaching-card__sessions">
                  <div className="progress-bar progress-bar--sm" style={{ width: '80px' }}>
                    <div className="progress-bar__fill" style={{ width: `${sessionPct}%` }} />
                  </div>
                  <span className="admin-coaching-card__count">
                    {client.sessionsUsed || 0}/{client.totalSessions || 0} sessions
                  </span>
                </div>
                <span className={`status-badge status-badge--${(client.status || 'active').toLowerCase()}`}>
                  {client.status || 'Active'}
                </span>
                <svg className="admin-coaching-card__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
