import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function AdminClients() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.adminClients()
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => {
        setClients([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading clients...</p>
      </div>
    );
  }

  const searchLower = search.toLowerCase();
  const filtered = clients.filter((c) => {
    const name = (c.name || '').toLowerCase();
    const business = (c.businessName || c.company || '').toLowerCase();
    const email = (c.email || '').toLowerCase();
    return name.includes(searchLower) || business.includes(searchLower) || email.includes(searchLower);
  });

  return (
    <div className="admin-clients-page">
      <div className="page-header">
        <h2>All Clients</h2>
        <p className="page-subtitle">{clients.length} clients in the system.</p>
      </div>

      <div className="admin-search-bar">
        <input
          type="text"
          className="form-input"
          placeholder="Search by name, business, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>{search ? 'No clients match your search.' : 'No clients found.'}</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="admin-table-view">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Business</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="admin-clickable-row"
                      onClick={() => navigate(`/admin/clients/${c.id}`)}
                    >
                      <td><strong>{c.name || '--'}</strong></td>
                      <td>{c.businessName || c.company || '--'}</td>
                      <td className="admin-email-cell">{c.email || '--'}</td>
                      <td>
                        <span className={`status-badge status-badge--${(c.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                          {c.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        {c.maintenancePlan ? (
                          <span className="admin-plan-badge">{c.maintenancePlan}</span>
                        ) : (
                          <span className="admin-plan-badge admin-plan-badge--none">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="admin-cards-view">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="admin-client-card"
                onClick={() => navigate(`/admin/clients/${c.id}`)}
              >
                <div className="admin-client-card__top">
                  <div className="admin-client-card__avatar">
                    {(c.name || c.businessName || 'C').charAt(0).toUpperCase()}
                  </div>
                  <div className="admin-client-card__info">
                    <strong>{c.name || '--'}</strong>
                    <span>{c.businessName || c.company || ''}</span>
                  </div>
                  <span className={`status-badge status-badge--${(c.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                    {c.status || 'Active'}
                  </span>
                </div>
                <div className="admin-client-card__bottom">
                  <span className="admin-client-card__email">{c.email || '--'}</span>
                  {c.maintenancePlan && (
                    <span className="admin-plan-badge">{c.maintenancePlan}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
