import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const FILTER_TABS = ['All', 'Draft', 'Sent', 'Paid'];

function formatRand(amount) {
  return `R${(amount || 0).toLocaleString('en-ZA')}`;
}

export default function AdminInvoices() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState('All');
  const [marking, setMarking] = useState(null);

  useEffect(() => {
    api.adminInvoices()
      .then((data) => {
        setInvoices(data.invoices || []);
        setLoading(false);
      })
      .catch(() => {
        setInvoices([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading invoices...</p>
      </div>
    );
  }

  const filtered = filter === 'All' ? invoices : invoices.filter((i) => i.status === filter);

  const totalOutstanding = invoices
    .filter((i) => i.status !== 'Paid' && i.status !== 'Cancelled')
    .reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalPaid = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const handleMarkPaid = async (invoice) => {
    setMarking(invoice.id);
    try {
      await api.adminUpdateInvoice(invoice.id);
      setInvoices((prev) =>
        prev.map((i) =>
          i.id === invoice.id ? { ...i, status: 'Paid', paidDate: new Date().toISOString() } : i
        )
      );
    } catch {
      alert('Failed to mark invoice as paid.');
    }
    setMarking(null);
  };

  return (
    <div className="admin-invoices-page">
      <div className="page-header">
        <h2>All Invoices</h2>
        <p className="page-subtitle">{invoices.length} invoices across all clients.</p>
      </div>

      <div className="admin-metrics" style={{ marginBottom: '20px' }}>
        <div className="admin-metric-card admin-metric-card--compact">
          <div className="admin-metric-card__label">Total Outstanding</div>
          <div className="admin-metric-card__value admin-metric-card__value--warn">{formatRand(totalOutstanding)}</div>
        </div>
        <div className="admin-metric-card admin-metric-card--compact">
          <div className="admin-metric-card__label">Total Paid</div>
          <div className="admin-metric-card__value admin-metric-card__value--green">{formatRand(totalPaid)}</div>
        </div>
      </div>

      <div className="filter-pills" style={{ marginBottom: '20px' }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className={`filter-pill ${filter === tab ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>No invoices match this filter.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="admin-table-view">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv) => (
                    <tr
                      key={inv.id}
                      className={inv.status === 'Overdue' ? 'row--overdue' : inv.status === 'Pending' || inv.status === 'Sent' ? 'row--pending' : ''}
                    >
                      <td><strong>{inv.invoiceNumber || '--'}</strong></td>
                      <td>{inv.clientName || inv.projectName || '--'}</td>
                      <td><span className="platform-badge">{inv.type || '--'}</span></td>
                      <td><strong>{formatRand(inv.amount)}</strong></td>
                      <td className="td-date">{inv.dueDate || '--'}</td>
                      <td>
                        <span className={`status-badge status-badge--${(inv.status || 'draft').toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        {inv.status !== 'Paid' && inv.status !== 'Cancelled' && (
                          <button
                            className="btn btn--success btn--sm"
                            onClick={() => handleMarkPaid(inv)}
                            disabled={marking === inv.id}
                          >
                            {marking === inv.id ? '...' : 'Mark Paid'}
                          </button>
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
            {filtered.map((inv) => (
              <div key={inv.id} className="admin-invoice-card">
                <div className="admin-invoice-card__top">
                  <div>
                    <strong>{inv.invoiceNumber || '--'}</strong>
                    <span className="admin-invoice-card__client">{inv.clientName || inv.projectName || '--'}</span>
                  </div>
                  <span className={`status-badge status-badge--${(inv.status || 'draft').toLowerCase()}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="admin-invoice-card__bottom">
                  <div className="admin-invoice-card__amount">{formatRand(inv.amount)}</div>
                  <div className="admin-invoice-card__meta">
                    {inv.type && <span className="platform-badge">{inv.type}</span>}
                    {inv.dueDate && <span className="admin-invoice-card__date">Due {inv.dueDate}</span>}
                  </div>
                  {inv.status !== 'Paid' && inv.status !== 'Cancelled' && (
                    <button
                      className="btn btn--success btn--sm"
                      onClick={() => handleMarkPaid(inv)}
                      disabled={marking === inv.id}
                      style={{ marginTop: '8px' }}
                    >
                      {marking === inv.id ? 'Updating...' : 'Mark Paid'}
                    </button>
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
