import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const FAQ_ITEMS = [
  {
    q: 'How long does a website build take?',
    a: 'Most websites are delivered within 2-4 weeks, depending on complexity. We will give you an estimated timeline after reviewing your brief.',
  },
  {
    q: 'What do I need to provide?',
    a: 'At minimum: your logo, brand colours, and answers to the brief questions. If you have photos, testimonials, or written content, even better. We can create everything you do not have.',
  },
  {
    q: 'How does the approval process work?',
    a: 'We share work-in-progress at key milestones. You review and either approve or request revisions — all through this portal. Nothing goes live without your sign-off.',
  },
  {
    q: 'What happens if I need changes during the build?',
    a: 'During the Review phase, you can submit feedback directly. The project loops back to Build with your notes. No limit on reasonable revisions.',
  },
  {
    q: 'How do payments work?',
    a: 'A deposit secures your build slot. The final payment is due before launch. All invoices are visible under Financial. We accept EFT and card.',
  },
  {
    q: 'What is included in portal access?',
    a: 'Every project comes with 30 days of free portal access after completion. During that period you have full access to your dashboard, project files, support tickets, and the maintenance log. After 30 days, portal access continues as part of a monthly maintenance plan — keeping your systems updated, secure, and supported.',
  },
  {
    q: 'What does the monthly maintenance plan include?',
    a: 'Ongoing portal access, security updates, backups, performance monitoring, priority support tickets, and a live maintenance log proving exactly what we do behind the scenes. Plans start from R500/month depending on your setup. No lock-in — cancel anytime.',
  },
  {
    q: 'What is the maintenance log?',
    a: 'Available on maintenance plans only. It is a transparent, real-time record of every update, backup, security patch, and performance tweak we do on your systems — even when you are not looking. Proof of ongoing value.',
  },
  {
    q: 'Can I make changes after launch?',
    a: 'During your first 30 days, minor revisions are included. After that, changes and support are handled through your maintenance plan. You can always raise a ticket or brief a new project through the portal.',
  },
  {
    q: 'What if I need something not listed?',
    a: 'Raise a support ticket or choose the closest service and describe your needs. We will tailor the scope to match.',
  },
];

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];
const CATEGORY_OPTIONS = ['General Question', 'Change Request', 'Bug Report', 'Billing', 'Feature Request', 'Other'];

export default function HelpDesk({ client, portalAccess }) {
  const [activeTab, setActiveTab] = useState('faq');
  const [tickets, setTickets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: '', category: '', priority: 'Medium', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);

  useEffect(() => {
    Promise.all([
      api.getTickets().catch(() => ({ tickets: [] })),
      api.getMaintenanceLog().catch(() => ({ log: [] })),
    ]).then(([tickData, maintData]) => {
      setTickets(tickData.tickets || []);
      setMaintenance(maintData.log || []);
      setLoading(false);
    });
  }, []);

  const handleSubmitTicket = async () => {
    if (!formData.subject.trim() || !formData.message.trim()) return;
    setSubmitting(true);
    try {
      const result = await api.submitTicket(formData);
      setTickets((prev) => [
        {
          id: result.id || Date.now(),
          subject: formData.subject,
          category: formData.category,
          priority: formData.priority,
          message: formData.message,
          status: 'Open',
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setSubmitted(true);
      setFormData({ subject: '', category: '', priority: 'Medium', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setActiveTab('tickets');
      }, 2000);
    } catch {
      alert('Failed to submit ticket. Please try again.');
    }
    setSubmitting(false);
  };

  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;

  return (
    <div className="helpdesk-page">
      <div className="page-header">
        <h2>Help Desk</h2>
        <p className="page-subtitle">Questions? Changes? We are here for you.</p>
      </div>

      <div className="helpdesk-tabs">
        <button className={`helpdesk-tab ${activeTab === 'faq' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('faq')}>
          Knowledge Base
        </button>
        <button className={`helpdesk-tab ${activeTab === 'tickets' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('tickets')}>
          My Tickets
          {openTickets > 0 && <span className="helpdesk-tab__count">{openTickets}</span>}
        </button>
        {portalAccess?.maintenancePlan === 'Active' && (
          <button className={`helpdesk-tab ${activeTab === 'maintenance' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('maintenance')}>
            Maintenance Log
          </button>
        )}
      </div>

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div className="helpdesk-faq">
          <div className="faq-header">
            <h3>Frequently Asked Questions</h3>
            <button className="btn btn--primary btn--sm" onClick={() => { setShowForm(true); setActiveTab('tickets'); }}>
              Raise a Ticket
            </button>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-item ${expandedFaq === i ? 'faq-item--open' : ''}`}>
                <button className="faq-item__question" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={expandedFaq === i ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                  </svg>
                </button>
                {expandedFaq === i && (
                  <div className="faq-item__answer"><p>{item.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tickets */}
      {activeTab === 'tickets' && (
        <div className="helpdesk-tickets">
          <div className="tickets-header">
            <h3>{showForm ? 'New Ticket' : 'Your Tickets'}</h3>
            {!showForm && (
              <button className="btn btn--primary btn--sm" onClick={() => setShowForm(true)}>New Ticket</button>
            )}
          </div>

          {showForm && (
            <div className="ticket-form card">
              <div className="card__body">
                {submitted ? (
                  <div className="ticket-form__success">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p>Ticket submitted. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="form-label">Subject <span className="form-required">*</span></label>
                      <input type="text" className="form-input" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Brief description" />
                    </div>
                    <div className="form-row form-row--half">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                          <option value="">Select...</option>
                          {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Priority</label>
                        <select className="form-select" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                          {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message <span className="form-required">*</span></label>
                      <textarea className="form-textarea" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe what you need help with..." />
                    </div>
                    <div className="ticket-form__actions">
                      <button className="btn btn--ghost" onClick={() => setShowForm(false)}>Cancel</button>
                      <button className="btn btn--primary" onClick={handleSubmitTicket} disabled={submitting || !formData.subject.trim() || !formData.message.trim()}>
                        {submitting ? 'Submitting...' : 'Submit Ticket'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {!showForm && tickets.length === 0 && (
            <div className="empty-state-card"><p>No tickets yet. Click "New Ticket" if you need help.</p></div>
          )}

          {!showForm && tickets.length > 0 && (
            <div className="tickets-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className={`ticket-item ${expandedTicket === ticket.id ? 'ticket-item--expanded' : ''}`}>
                  <button className="ticket-item__header" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                    <div className="ticket-item__title-row">
                      <span className={`ticket-priority ticket-priority--${(ticket.priority || 'medium').toLowerCase()}`}>{ticket.priority}</span>
                      <h4>{ticket.subject}</h4>
                    </div>
                    <div className="ticket-item__meta">
                      <span className={`status-badge status-badge--${(ticket.status || 'open').toLowerCase().replace(/\s+/g, '-')}`}>{ticket.status}</span>
                      {ticket.category && <span className="ticket-item__category">{ticket.category}</span>}
                      <span className="ticket-item__date">{ticket.date ? new Date(ticket.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' }) : ''}</span>
                    </div>
                    <svg className="ticket-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points={expandedTicket === ticket.id ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                    </svg>
                  </button>
                  {expandedTicket === ticket.id && (
                    <div className="ticket-item__body">
                      <div className="ticket-message"><p>{ticket.message}</p></div>
                      {ticket.reply && (
                        <div className="ticket-message ticket-message--team">
                          <div className="ticket-message__header"><strong>FreedomHub Team</strong></div>
                          <p>{ticket.reply}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Maintenance Log — maintenance plan clients only */}
      {activeTab === 'maintenance' && portalAccess?.maintenancePlan === 'Active' && (
        <div className="helpdesk-maintenance">
          <div className="maintenance-header">
            <h3>Behind the Scenes</h3>
            <p>Everything we do to keep your systems running smoothly — even when you are not looking.</p>
          </div>
          {maintenance.length === 0 ? (
            <div className="empty-state-card"><p>Maintenance activity will appear here as we work on your systems.</p></div>
          ) : (
            <div className="maintenance-list">
              {maintenance.map((entry) => (
                <div key={entry.id} className="maintenance-item">
                  <div className="maintenance-item__date">
                    <span className="maintenance-item__day">{entry.date ? new Date(entry.date).getDate() : '—'}</span>
                    <span className="maintenance-item__month">{entry.date ? new Date(entry.date).toLocaleDateString('en-ZA', { month: 'short' }) : ''}</span>
                  </div>
                  <div className="maintenance-item__content">
                    <div className="maintenance-item__header">
                      <span className={`maint-badge maint-badge--${(entry.type || 'other').toLowerCase().replace(/\s+/g, '-')}`}>
                        {entry.type}
                      </span>
                      {entry.timeSpent && <span className="maintenance-item__time">{entry.timeSpent}</span>}
                    </div>
                    <p>{entry.description}</p>
                    {entry.notes && <p className="maintenance-item__notes">{entry.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
