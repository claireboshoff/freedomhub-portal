import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const STATUS_OPTIONS = ['All', 'Draft', 'Pending Approval', 'Approved', 'Revision Needed', 'Scheduled', 'Published'];
const PLATFORM_OPTIONS = ['All', 'Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok', 'Google'];

export default function Calendar() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState(null);
  const [reviseModal, setReviseModal] = useState(null);
  const [reviseNotes, setReviseNotes] = useState('');
  const [previewItem, setPreviewItem] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchContent = () => {
    setLoading(true);
    api
      .getContent()
      .then((data) => {
        setContent(data.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load content');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleApprove = async (item) => {
    setActionLoading(item.id);
    try {
      await api.approveContent(item.id, 'content');
      setContent((prev) => prev.map((c) => (c.id === item.id ? { ...c, status: 'Approved' } : c)));
      setSuccessMsg(`"${item.title}" has been approved.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
      alert('Failed to approve. Please try again.');
    }
    setActionLoading(null);
  };

  const handleReviseSubmit = async () => {
    if (!reviseModal) return;
    setActionLoading(reviseModal.id);
    try {
      await api.reviseContent(reviseModal.id, reviseNotes, 'content');
      setContent((prev) =>
        prev.map((c) => (c.id === reviseModal.id ? { ...c, status: 'Revision Needed', notes: reviseNotes } : c))
      );
      setSuccessMsg(`Revision notes sent for "${reviseModal.title}".`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
      alert('Failed to submit revision. Please try again.');
    }
    setReviseModal(null);
    setReviseNotes('');
    setActionLoading(null);
  };

  const filtered = content.filter((item) => {
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    if (platformFilter !== 'All' && item.platform !== platformFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h2>Content Calendar</h2>
        <p className="page-subtitle">View, approve, and manage your content pipeline.</p>
      </div>

      {successMsg && <div className="success-banner">{successMsg}</div>}

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Platform</label>
          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group filter-group--count">
          <span>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Content Table */}
      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>No content items match your filters.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className={item.status === 'Pending Approval' ? 'row--pending' : ''}>
                  <td className="td-date">{item.date || '--'}</td>
                  <td>
                    <button className="link-button" onClick={() => setPreviewItem(item)}>
                      {item.title || 'Untitled'}
                    </button>
                  </td>
                  <td>
                    <span className="platform-badge">{item.platform || '--'}</span>
                  </td>
                  <td>{item.type || '--'}</td>
                  <td>
                    <span className={`status-badge status-badge--${(item.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {(item.status === 'Pending Approval' || item.status === 'Pending') && (
                      <div className="action-buttons">
                        <button
                          className="btn btn--sm btn--success"
                          disabled={actionLoading === item.id}
                          onClick={() => handleApprove(item)}
                        >
                          {actionLoading === item.id ? '...' : 'Approve'}
                        </button>
                        <button
                          className="btn btn--sm btn--outline"
                          disabled={actionLoading === item.id}
                          onClick={() => setReviseModal(item)}
                        >
                          Revise
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="modal-overlay" onClick={() => setPreviewItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>{previewItem.title}</h3>
              <button className="modal__close" onClick={() => setPreviewItem(null)}>
                &times;
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__meta">
                <span className={`status-badge status-badge--${(previewItem.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                  {previewItem.status}
                </span>
                <span className="platform-badge">{previewItem.platform}</span>
                <span>{previewItem.date}</span>
                {previewItem.type && <span>{previewItem.type}</span>}
              </div>
              {previewItem.mediaUrl && (
                <div className="modal__media">
                  <img src={previewItem.mediaUrl} alt={previewItem.title} />
                </div>
              )}
              {previewItem.copy && (
                <div className="modal__copy">
                  <h4>Copy</h4>
                  <p>{previewItem.copy}</p>
                </div>
              )}
              {previewItem.notes && (
                <div className="modal__notes">
                  <h4>Notes</h4>
                  <p>{previewItem.notes}</p>
                </div>
              )}
              {(previewItem.status === 'Pending Approval' || previewItem.status === 'Pending') && (
                <div className="modal__actions">
                  <button
                    className="btn btn--success"
                    disabled={actionLoading === previewItem.id}
                    onClick={() => {
                      handleApprove(previewItem);
                      setPreviewItem(null);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn--outline"
                    onClick={() => {
                      setReviseModal(previewItem);
                      setPreviewItem(null);
                    }}
                  >
                    Request Revision
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Revise Modal */}
      {reviseModal && (
        <div className="modal-overlay" onClick={() => setReviseModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>Request Revision</h3>
              <button className="modal__close" onClick={() => setReviseModal(null)}>
                &times;
              </button>
            </div>
            <div className="modal__body">
              <p>
                Provide revision notes for: <strong>{reviseModal.title}</strong>
              </p>
              <textarea
                className="revision-textarea"
                rows={5}
                placeholder="Describe what changes you would like..."
                value={reviseNotes}
                onChange={(e) => setReviseNotes(e.target.value)}
              />
              <div className="modal__actions">
                <button className="btn btn--primary" disabled={!reviseNotes.trim()} onClick={handleReviseSubmit}>
                  Submit Revision Notes
                </button>
                <button className="btn btn--ghost" onClick={() => setReviseModal(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
