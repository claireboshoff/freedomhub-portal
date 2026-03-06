import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const FILTER_TABS = ['All', 'Open', 'In Progress', 'Answered'];

export default function AdminTickets() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(null);

  useEffect(() => {
    api.adminTickets()
      .then((data) => {
        setTickets(data.tickets || []);
        setLoading(false);
      })
      .catch(() => {
        setTickets([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading tickets...</p>
      </div>
    );
  }

  const filtered = filter === 'All'
    ? tickets
    : tickets.filter((t) => {
        if (filter === 'Answered') return t.status === 'Answered' || t.status === 'Resolved';
        return t.status === filter;
      });

  const handleReply = async (ticket) => {
    if (!replyText.trim()) return;
    setReplying(ticket.id);
    try {
      await api.adminTicketReply(ticket.id, replyText.trim());
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticket.id
            ? { ...t, reply: replyText.trim(), status: 'Answered' }
            : t
        )
      );
      setReplyText('');
    } catch {
      alert('Failed to send reply.');
    }
    setReplying(null);
  };

  return (
    <div className="admin-tickets-page">
      <div className="page-header">
        <h2>All Tickets</h2>
        <p className="page-subtitle">{tickets.length} tickets across all clients.</p>
      </div>

      <div className="filter-pills" style={{ marginBottom: '20px' }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className={`filter-pill ${filter === tab ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
            {tab !== 'All' && (
              <span className="admin-filter-count">
                {tickets.filter((t) => {
                  if (tab === 'Answered') return t.status === 'Answered' || t.status === 'Resolved';
                  return t.status === tab;
                }).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>No tickets match this filter.</p>
        </div>
      ) : (
        <div className="admin-tickets-list">
          {filtered.map((ticket) => (
            <div
              key={ticket.id}
              className={`admin-ticket-item ${expandedId === ticket.id ? 'admin-ticket-item--expanded' : ''}`}
            >
              <button
                className="admin-ticket-item__header"
                onClick={() => {
                  setExpandedId(expandedId === ticket.id ? null : ticket.id);
                  setReplyText('');
                }}
              >
                <div className="admin-ticket-item__main">
                  <span className={`ticket-priority ticket-priority--${(ticket.priority || 'medium').toLowerCase()}`}>
                    {ticket.priority || 'Medium'}
                  </span>
                  <h4>{ticket.subject || 'No subject'}</h4>
                </div>
                <div className="admin-ticket-item__meta">
                  <span className="admin-ticket-item__client-name">{ticket.clientName || '--'}</span>
                  <span className={`status-badge status-badge--${(ticket.status || 'open').toLowerCase().replace(/\s+/g, '-')}`}>
                    {ticket.status}
                  </span>
                  <span className="admin-ticket-item__date">
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })
                      : '--'}
                  </span>
                </div>
                <svg className="admin-ticket-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points={expandedId === ticket.id ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                </svg>
              </button>

              {expandedId === ticket.id && (
                <div className="admin-ticket-body">
                  <div className="ticket-message">
                    <div className="ticket-message__header">
                      <strong>{ticket.clientName || 'Client'}</strong>
                      {ticket.category && <span>{ticket.category}</span>}
                    </div>
                    <p>{ticket.message}</p>
                  </div>

                  {ticket.reply && (
                    <div className="ticket-message ticket-message--team">
                      <div className="ticket-message__header"><strong>FreedomHub Team</strong></div>
                      <p>{ticket.reply}</p>
                    </div>
                  )}

                  <div className="admin-reply-form">
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="admin-reply-form__actions">
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => handleReply(ticket)}
                        disabled={replying === ticket.id || !replyText.trim()}
                      >
                        {replying === ticket.id ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
