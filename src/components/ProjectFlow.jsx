import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const PHASES = [
  { key: 'Staging & Audit', label: 'Research & Audit', short: 'A', description: 'We research your business, competitors, and online presence.' },
  { key: 'Proposal/Deposit', label: 'Proposal & Agreement', short: 'B', description: 'Review scope, sign agreement, and pay deposit to start.' },
  { key: 'Build', label: 'Build', short: 'C', description: 'Our team brings your project to life. Track progress in real-time.' },
  { key: 'Review & Refine', label: 'Review & Refine', short: 'D', description: 'Review the work. Approve or request changes.' },
  { key: 'Launch', label: 'Launch', short: 'E', description: 'Final handoff. We go live once everything is approved and settled.' },
];

const ADDON_OPTIONS = [
  { id: 'maintenance-basic', name: 'Monthly Maintenance (Basic)', price: 1000, frequency: '/month', category: 'maintenance' },
  { id: 'maintenance-standard', name: 'Monthly Maintenance (Standard)', price: 2500, frequency: '/month', category: 'maintenance' },
  { id: 'maintenance-premium', name: 'Monthly Maintenance (Premium)', price: 5000, frequency: '/month', category: 'maintenance' },
  { id: 'seo-retainer', name: 'Monthly SEO Retainer', price: 7500, frequency: '/month', category: 'seo' },
  { id: 'local-seo', name: 'Local SEO (Google Business)', price: 5000, frequency: '/month', category: 'seo' },
  { id: 'geo', name: 'GEO (AI Search Optimisation)', price: 5000, frequency: '/month', category: 'seo' },
  { id: 'blog-content', name: 'Blog Content (4 articles/month)', price: 6000, frequency: '/month', category: 'content' },
  { id: 'social-12', name: 'Social Media (12 posts/month)', price: 5500, frequency: '/month', category: 'social' },
  { id: 'social-20', name: 'Social Media (20 posts/month)', price: 9000, frequency: '/month', category: 'social' },
  { id: 'logo-basic', name: 'Logo Design (Basic)', price: 3500, frequency: '', category: 'design' },
  { id: 'logo-premium', name: 'Logo + Brand Guidelines', price: 8000, frequency: '', category: 'design' },
  { id: 'chatbot', name: 'Website Chatbot', price: 10000, frequency: '', category: 'automation' },
  { id: 'whatsapp', name: 'WhatsApp Automation', price: 18000, frequency: '', category: 'automation' },
  { id: 'email-automation', name: 'Email Automation Sequences', price: 14000, frequency: '', category: 'automation' },
];

function ProposalSection({ project, projectId, onUpdate }) {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [amendMode, setAmendMode] = useState(false);
  const [amendNotes, setAmendNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [scopeApproved, setScopeApproved] = useState(false);

  const basePrice = 0; // Pricing is handled by Claire, not auto-calculated
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApproveScope = async () => {
    setSubmitting(true);
    try {
      const addons = selectedAddons.map((id) => ADDON_OPTIONS.find((a) => a.id === id)).filter(Boolean);
      await api.approveScope(projectId, addons, addonTotal);
      setScopeApproved(true);
      onUpdate({ ...project, status: 'Awaiting Contract', currentPhase: 'Proposal/Deposit', latestUpdate: 'Scope approved — awaiting agreement' });
    } catch {
      alert('Failed to approve scope. Please try again.');
    }
    setSubmitting(false);
  };

  const handleAmend = async () => {
    if (!amendNotes.trim()) return;
    setSubmitting(true);
    try {
      await api.amendScope(projectId, amendNotes);
      setAmendMode(false);
      setAmendNotes('');
      onUpdate({ ...project, latestUpdate: 'Amendment requested — under review' });
    } catch {
      alert('Failed to submit amendment. Please try again.');
    }
    setSubmitting(false);
  };

  if (scopeApproved || project.status === 'Awaiting Contract') {
    return (
      <div className="flow-card">
        <h3>Scope Approved</h3>
        <p>Your scope has been approved. We are preparing your agreement now. You will receive it shortly.</p>
        {project.latestUpdate && <p className="flow-update-text">{project.latestUpdate}</p>}
      </div>
    );
  }

  return (
    <div className="flow-card">
      <h3>Review Your Scope</h3>
      <p>Based on your brief and our research, here is what we recommend. Review the scope below, add any extras you need, then approve to proceed.</p>

      {project.latestUpdate && (
        <div className="flow-update" style={{ marginBottom: '20px' }}>
          <strong>Latest:</strong> <span>{project.latestUpdate}</span>
        </div>
      )}

      <div className="addons-section">
        <h4>Optional Add-ons</h4>
        <p className="addons-hint">Select any additional services you would like included. Monthly services are billed separately.</p>

        <div className="addons-grid">
          {ADDON_OPTIONS.map((addon) => (
            <label key={addon.id} className={`addon-item ${selectedAddons.includes(addon.id) ? 'addon-item--selected' : ''}`}>
              <input
                type="checkbox"
                checked={selectedAddons.includes(addon.id)}
                onChange={() => toggleAddon(addon.id)}
              />
              <div className="addon-item__info">
                <strong>{addon.name}</strong>
                <span className="addon-item__price">R {addon.price.toLocaleString()}{addon.frequency}</span>
              </div>
            </label>
          ))}
        </div>

        {selectedAddons.length > 0 && (
          <div className="addons-summary">
            <strong>Selected add-ons total:</strong> R {addonTotal.toLocaleString()}
            {selectedAddons.some((id) => ADDON_OPTIONS.find((a) => a.id === id)?.frequency) && (
              <span className="addons-note"> (monthly services billed separately)</span>
            )}
          </div>
        )}
      </div>

      {!amendMode ? (
        <div className="flow-decision">
          <button className="btn btn--success" onClick={handleApproveScope} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Approve Scope'}
          </button>
          <button className="btn btn--outline" onClick={() => setAmendMode(true)}>
            Request Changes
          </button>
        </div>
      ) : (
        <div className="flow-feedback">
          <h4>What would you like changed?</h4>
          <textarea
            className="form-textarea"
            rows={4}
            value={amendNotes}
            onChange={(e) => setAmendNotes(e.target.value)}
            placeholder="Tell us what you would like added, removed, or changed..."
          />
          <div className="flow-feedback__actions">
            <button className="btn btn--primary" onClick={handleAmend} disabled={submitting || !amendNotes.trim()}>
              {submitting ? 'Submitting...' : 'Submit Changes'}
            </button>
            <button className="btn btn--ghost" onClick={() => setAmendMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContractSection({ project, projectId, contracts, client, onUpdate }) {
  const [accepted, setAccepted] = useState(false);
  const [acceptName, setAcceptName] = useState(client?.name || '');
  const [acceptChecked, setAcceptChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAccept = async () => {
    if (!acceptChecked || !acceptName.trim()) return;
    setSubmitting(true);
    try {
      await api.acceptContract(projectId, acceptName);
      setAccepted(true);
      onUpdate({ ...project, status: 'Awaiting Payment', latestUpdate: `Agreement accepted by ${acceptName}` });
    } catch {
      alert('Failed to accept agreement. Please try again.');
    }
    setSubmitting(false);
  };

  if (accepted || project.status === 'Awaiting Payment') {
    return (
      <div className="flow-card">
        <h3>Agreement Signed</h3>
        <p>Thank you. Your agreement has been accepted. Your deposit invoice will follow shortly.</p>
      </div>
    );
  }

  if (!contracts.length) {
    return (
      <div className="flow-card">
        <h3>Agreement</h3>
        <p className="empty-state">Your agreement is being prepared. You will be notified when it is ready for review.</p>
      </div>
    );
  }

  return (
    <div className="flow-card">
      <h3>Review & Accept Agreement</h3>
      <p>Please review the agreement below and accept to proceed.</p>

      {contracts.map((c) => (
        <div key={c.id} className="contract-item">
          <div className="contract-item__header">
            <strong>{c.name}</strong>
            <span className={`status-badge status-badge--${(c.status || '').toLowerCase()}`}>{c.status}</span>
          </div>
          {c.documentUrl && (
            <a href={c.documentUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm" style={{ marginTop: '8px' }}>
              View Agreement PDF
            </a>
          )}
        </div>
      ))}

      <div className="contract-accept">
        <label className="contract-accept__check">
          <input
            type="checkbox"
            checked={acceptChecked}
            onChange={(e) => setAcceptChecked(e.target.checked)}
          />
          <span>I have read and accept the terms of the agreement</span>
        </label>
        <div className="contract-accept__name">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            value={acceptName}
            onChange={(e) => setAcceptName(e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <button
          className="btn btn--success"
          onClick={handleAccept}
          disabled={submitting || !acceptChecked || !acceptName.trim()}
        >
          {submitting ? 'Submitting...' : 'Accept Agreement'}
        </button>
      </div>
    </div>
  );
}

function PaymentSection({ project, projectId, invoices, onUpdate }) {
  const depositInvoices = invoices.filter((i) => i.type === 'Deposit');
  const finalInvoices = invoices.filter((i) => i.type === 'Final');
  const pendingInvoices = [...depositInvoices, ...finalInvoices].filter((i) => i.status !== 'Paid');

  if (!pendingInvoices.length && project.status === 'Active') {
    return null; // No pending payments, build is underway
  }

  return (
    <div className="flow-card">
      <h3>Payment</h3>
      {pendingInvoices.length > 0 ? (
        <>
          <p>Please settle the following to proceed:</p>
          {pendingInvoices.map((inv) => (
            <div key={inv.id} className="invoice-item">
              <div className="invoice-item__info">
                <strong>{inv.invoiceNumber}</strong>
                <span className="invoice-item__type">{inv.type}</span>
              </div>
              <div className="invoice-item__amount">R {(inv.amount || 0).toLocaleString()}</div>
              <span className={`status-badge status-badge--${(inv.status || '').toLowerCase()}`}>{inv.status}</span>
            </div>
          ))}
          <div className="payment-methods">
            <h4>Payment Options</h4>
            <div className="payment-method">
              <strong>EFT</strong>
              <p>Claire Boshoff | FNB | Acc: 6280643239F</p>
              <p className="payment-ref">Reference: {pendingInvoices[0]?.invoiceNumber || project.name}</p>
            </div>
            <div className="payment-method">
              <strong>PayPal</strong>
              <p>Pay securely online via PayPal (FreedomHub / CBS Enterprise)</p>
            </div>
          </div>
          <p className="payment-note">Once payment is made, we will confirm receipt and your project will proceed to the next phase.</p>
        </>
      ) : (
        <p className="empty-state">No outstanding invoices. Your invoice will appear here once ready.</p>
      )}
    </div>
  );
}

export default function ProjectFlow({ client }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getProject(projectId),
      api.getProjectUpdates(projectId).catch(() => ({ updates: [] })),
      api.getProjectContracts(projectId).catch(() => ({ contracts: [] })),
      api.getProjectInvoices(projectId).catch(() => ({ invoices: [] })),
    ]).then(([projData, updData, contData, invData]) => {
      setProject(projData.project);
      setUpdates(updData.updates || []);
      setContracts(contData.contracts || []);
      setInvoices(invData.invoices || []);
      setLoading(false);
    }).catch(() => {
      navigate('/projects');
    });
  }, [projectId]);

  if (loading) {
    return <div className="page-loading"><div className="spinner" /><p>Loading project...</p></div>;
  }

  if (!project) {
    return <div className="error-message">Project not found.</div>;
  }

  // Map statuses to phases for the timeline
  const phaseFromStatus = () => {
    const status = project.status || '';
    const phase = project.currentPhase || '';
    if (phase) return phase;
    if (status === 'Awaiting Contract') return 'Proposal/Deposit';
    if (status === 'Awaiting Payment') return 'Proposal/Deposit';
    if (status === 'Active') return 'Build';
    if (status === 'Complete') return 'Launch';
    return 'Staging & Audit';
  };

  const effectivePhase = phaseFromStatus();
  const currentPhaseIndex = PHASES.findIndex((p) => p.key === effectivePhase);
  const progress = project.buildProgress || 0;

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await api.approveProject(projectId);
      setProject((prev) => ({ ...prev, currentPhase: 'Launch', status: 'Active' }));
    } catch {
      alert('Failed to approve. Please try again.');
    }
    setSubmitting(false);
  };

  const handleFeedback = async () => {
    if (!feedback.trim()) return;
    setSubmitting(true);
    try {
      await api.submitProjectFeedback(projectId, feedback);
      setProject((prev) => ({ ...prev, status: 'Active' }));
      setFeedbackMode(false);
      setFeedback('');
    } catch {
      alert('Failed to submit feedback. Please try again.');
    }
    setSubmitting(false);
  };

  const handleProjectUpdate = (updatedProject) => {
    setProject(updatedProject);
  };

  return (
    <div className="project-flow">
      <button className="btn btn--ghost btn--sm flow-back" onClick={() => navigate('/projects')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        All Projects
      </button>

      <div className="flow-header">
        <div className="flow-header__info">
          <span className="flow-header__type">{project.serviceType}</span>
          <h2>{project.name}</h2>
          <span className={`status-badge status-badge--${(project.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
            {project.status}
          </span>
        </div>
        <div className="flow-header__progress">
          <div className="progress-ring" data-progress={progress}>
            <svg viewBox="0 0 36 36">
              <path className="progress-ring__bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="progress-ring__fill" strokeDasharray={`${progress}, 100`} d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="flow-timeline">
        {PHASES.map((phase, i) => {
          const isComplete = i < currentPhaseIndex;
          const isCurrent = i === currentPhaseIndex;

          return (
            <div key={phase.key} className={`flow-phase ${isComplete ? 'flow-phase--complete' : ''} ${isCurrent ? 'flow-phase--current' : ''}`}>
              <div className="flow-phase__marker">
                <span className="flow-phase__letter">{phase.short}</span>
              </div>
              <div className="flow-phase__info">
                <strong>{phase.label}</strong>
                <p>{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase-specific content */}
      <div className="flow-content">

        {/* Phase A: Research & Audit */}
        {effectivePhase === 'Staging & Audit' && (
          <div className="flow-card">
            <h3>Research in Progress</h3>
            {project.latestUpdate ? (
              <p>{project.latestUpdate}</p>
            ) : (
              <p className="empty-state">We are researching your business, competitors, and online presence. Your Digital Presence Report will appear here once complete.</p>
            )}
          </div>
        )}

        {/* Phase B: Proposal & Agreement */}
        {effectivePhase === 'Proposal/Deposit' && (
          <>
            {/* Step 1: Scope approval (if not yet approved) */}
            {(project.status === 'Awaiting Contract' && !contracts.length) && (
              <ProposalSection
                project={project}
                projectId={projectId}
                onUpdate={handleProjectUpdate}
              />
            )}

            {/* Step 2: Contract (if scope approved, contract exists) */}
            {contracts.length > 0 && project.status !== 'Awaiting Payment' && (
              <ContractSection
                project={project}
                projectId={projectId}
                contracts={contracts}
                client={client}
                onUpdate={handleProjectUpdate}
              />
            )}

            {/* Step 3: Payment (if contract signed) */}
            {(project.status === 'Awaiting Payment' || invoices.some((i) => i.status !== 'Paid')) && (
              <PaymentSection
                project={project}
                projectId={projectId}
                invoices={invoices}
                onUpdate={handleProjectUpdate}
              />
            )}
          </>
        )}

        {/* Phase C: Build */}
        {effectivePhase === 'Build' && (
          <div className="flow-card">
            <h3>Build Progress</h3>
            <div className="build-progress">
              <div className="progress-bar progress-bar--lg">
                <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="build-progress__labels">
                <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
              </div>
            </div>
            {project.latestUpdate && (
              <div className="flow-update">
                <strong>Latest update:</strong>
                <p>{project.latestUpdate}</p>
              </div>
            )}
          </div>
        )}

        {/* Phase D: Review */}
        {effectivePhase === 'Review & Refine' && (
          <div className="flow-card">
            <h3>Review Your Project</h3>
            {project.stagingUrl && (
              <div className="flow-staging">
                <p>Your project is ready for review:</p>
                <a href={project.stagingUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  View Staging Site
                </a>
              </div>
            )}
            {project.latestUpdate && (
              <div className="flow-update">
                <p>{project.latestUpdate}</p>
              </div>
            )}

            {!feedbackMode ? (
              <div className="flow-decision">
                <button className="btn btn--success" onClick={handleApprove} disabled={submitting}>
                  I Approve &mdash; Move to Launch
                </button>
                <button className="btn btn--outline" onClick={() => setFeedbackMode(true)}>
                  I Need Changes
                </button>
              </div>
            ) : (
              <div className="flow-feedback">
                <h4>What changes do you need?</h4>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Describe the changes you would like..."
                />
                <div className="flow-feedback__actions">
                  <button className="btn btn--primary" onClick={handleFeedback} disabled={submitting || !feedback.trim()}>
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button className="btn btn--ghost" onClick={() => setFeedbackMode(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase E: Launch */}
        {effectivePhase === 'Launch' && (
          <div className="flow-card">
            {project.liveUrl ? (
              <div className="flow-live">
                <h3>Your project is live!</h3>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  View Live Site
                </a>
              </div>
            ) : (
              <>
                <h3>Launch Phase</h3>
                {project.latestUpdate ? <p>{project.latestUpdate}</p> : <p className="empty-state">Preparing for launch...</p>}
              </>
            )}
          </div>
        )}

        {/* Project Updates Timeline */}
        {updates.length > 0 && (
          <div className="flow-card">
            <h3>Project Timeline</h3>
            <div className="updates-timeline">
              {updates.map((update) => (
                <div key={update.id} className="update-entry">
                  <div className="update-entry__dot" />
                  <div className="update-entry__content">
                    <div className="update-entry__header">
                      <strong>{update.title}</strong>
                      <span className="update-entry__phase">{update.phase}</span>
                      <span className="update-entry__date">{update.date}</span>
                    </div>
                    <p>{update.update}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
