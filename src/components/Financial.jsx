import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import AgreementViewer from './AgreementViewer';

export default function Financial({ client }) {
  const [activeTab, setActiveTab] = useState('invoices');
  const [contracts, setContracts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingContract, setViewingContract] = useState(null);

  useEffect(() => {
    Promise.all([
      api.getContracts().catch(() => ({ contracts: [] })),
      api.getInvoices().catch(() => ({ invoices: [] })),
    ]).then(([contData, invData]) => {
      setContracts(contData.contracts || []);
      setInvoices(invData.invoices || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="page-loading"><div className="spinner" /><p>Loading financial data...</p></div>;
  }

  const totalOwed = invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Sent' || i.status === 'Overdue')
    .reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalPaid = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + (i.amount || 0), 0);
  const overdueCount = invoices.filter((i) => i.status === 'Overdue').length;

  return (
    <div className="financial-page">
      <div className="page-header">
        <h2>Financial & Legal</h2>
        <p className="page-subtitle">Contracts, invoices, and payment history — all in one place.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card__label">Outstanding</div>
          <div className="metric-card__value">R{totalOwed.toLocaleString()}</div>
          {overdueCount > 0 && <div className="metric-card__sub metric-card__sub--warn">{overdueCount} overdue</div>}
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Total Paid</div>
          <div className="metric-card__value">R{totalPaid.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Contracts</div>
          <div className="metric-card__value">{contracts.length}</div>
          <div className="metric-card__sub">{contracts.filter((c) => c.status === 'Signed').length} signed</div>
        </div>
      </div>

      <div className="helpdesk-tabs">
        <button className={`helpdesk-tab ${activeTab === 'invoices' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('invoices')}>
          Invoices
          {overdueCount > 0 && <span className="helpdesk-tab__count">{overdueCount}</span>}
        </button>
        <button className={`helpdesk-tab ${activeTab === 'contracts' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('contracts')}>
          Contracts
        </button>
        <button className={`helpdesk-tab ${activeTab === 'history' ? 'helpdesk-tab--active' : ''}`} onClick={() => setActiveTab('history')}>
          Payment History
        </button>
      </div>

      {activeTab === 'invoices' && (
        <div className="financial-section">
          {invoices.length === 0 ? (
            <div className="empty-state-card"><p>No invoices yet.</p></div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Project</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className={inv.status === 'Overdue' ? 'row--overdue' : inv.status === 'Pending' ? 'row--pending' : ''}>
                      <td><strong>{inv.invoiceNumber}</strong></td>
                      <td>{inv.projectName || '—'}</td>
                      <td><span className="platform-badge">{inv.type}</span></td>
                      <td><strong>R{(inv.amount || 0).toLocaleString()}</strong></td>
                      <td className="td-date">{inv.dueDate || '—'}</td>
                      <td>
                        <span className={`status-badge status-badge--${(inv.status || 'draft').toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="financial-section">
          {contracts.length === 0 ? (
            <div className="empty-state-card"><p>No contracts on file.</p></div>
          ) : (
            <div className="contracts-list">
              {contracts.map((contract) => (
                <div key={contract.id} className="contract-card">
                  <div className="contract-card__icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="contract-card__info">
                    <strong>{contract.name}</strong>
                    <div className="contract-card__meta">
                      <span className="platform-badge">{contract.type}</span>
                      {contract.projectName && <span>{contract.projectName}</span>}
                      {contract.signedDate && <span>Signed {contract.signedDate}</span>}
                    </div>
                  </div>
                  <span className={`status-badge status-badge--${(contract.status || 'draft').toLowerCase()}`}>
                    {contract.status}
                  </span>
                  <button
                    className={`btn ${contract.status === 'Sent' || contract.status === 'Draft' ? 'btn--primary' : 'btn--outline'} btn--sm`}
                    onClick={() => setViewingContract({
                      ...contract,
                      clientName: client?.name,
                      clientCompany: client?.businessName || client?.company,
                      clientEmail: client?.email,
                    })}
                  >
                    {contract.status === 'Sent' ? 'Review & Sign' : contract.status === 'Draft' ? 'Review & Sign' : 'View'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {viewingContract && (
        <AgreementViewer
          contract={viewingContract}
          onClose={() => setViewingContract(null)}
          onSigned={(contractId) => {
            setContracts((prev) =>
              prev.map((c) => (c.id === contractId ? { ...c, status: 'Signed', signedDate: new Date().toISOString() } : c))
            );
            setTimeout(() => setViewingContract(null), 2000);
          }}
        />
      )}

      {activeTab === 'history' && (
        <div className="financial-section">
          {invoices.filter((i) => i.status === 'Paid').length === 0 ? (
            <div className="empty-state-card"><p>No payments recorded yet.</p></div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Project</th>
                    <th>Amount</th>
                    <th>Paid Date</th>
                    <th>Method</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.filter((i) => i.status === 'Paid').map((inv) => (
                    <tr key={inv.id}>
                      <td>{inv.invoiceNumber}</td>
                      <td>{inv.projectName || '—'}</td>
                      <td><strong>R{(inv.amount || 0).toLocaleString()}</strong></td>
                      <td className="td-date">{inv.paidDate || '—'}</td>
                      <td>{inv.paymentMethod || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
