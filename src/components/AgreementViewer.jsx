import React, { useState, useRef } from 'react';
import { api } from '../lib/api';

const AGREEMENT_SECTIONS = [
  {
    title: '1. Definitions',
    content: `In this Agreement, unless the context indicates otherwise:

**"Service Provider"** means Claire Boshoff, trading as FreedomHub, with principal place of business in Durban, South Africa.

**"Client"** means the individual or entity identified in the project proposal or service order who engages the Service Provider for services.

**"Services"** means the done-for-you services described in the applicable Project Scope, which may include but are not limited to: website design and development, landing page creation, social media campaign management, search engine optimisation (SEO), AI and automation system builds, content creation, CRM setup, and ongoing retainer support.

**"Deliverables"** means all work products, files, designs, code, copy, and digital assets created by the Service Provider for the Client under this Agreement.

**"Project Scope"** means the specific scope of work, deliverables, timeline, and investment outlined in the project proposal or service order accepted by the Client.

**"Portal"** means the FreedomHub Client Portal through which the Client may access project updates, approve deliverables, view financial records, and communicate with the Service Provider.`,
  },
  {
    title: '2. Scope of Services',
    content: `**2.1** The Service Provider agrees to perform the Services as described in the Project Scope. The Project Scope forms part of this Agreement and will be provided separately for each engagement.

**2.2** The following done-for-you services are available and may be included in a Project Scope:

**(a) Website Design & Development** — Strategic, conversion-focused website builds including information architecture, copywriting, visual design, responsive development, SEO optimisation, and deployment.

**(b) Landing Pages** — Research-driven, conversion-engineered landing pages with lead capture, email integration, analytics tracking, and A/B testing capability.

**(c) Social Media Campaigns** — Multi-platform content creation, scheduling, and optimisation across platforms including Instagram, Facebook, LinkedIn, TikTok, X (Twitter), YouTube, and Pinterest.

**(d) SEO & Visibility** — On-page and technical SEO, schema markup, local SEO optimisation, Google Business Profile setup, AI search engine optimisation (GEO), and content strategy.

**(e) AI & Automation Systems** — Custom workflow automation, client onboarding systems, invoice and payment automation, data synchronisation, email sequences, WhatsApp business automation, CRM setup, and chatbot development.

**(f) Monthly Agency Retainer** — Ongoing support including website maintenance, content updates, automation monitoring, performance reporting, priority support, and strategy sessions.

**2.3** Any work requested outside the agreed Project Scope constitutes a change request and must be agreed to in writing. Change requests may affect the timeline, cost, and deliverables. The Service Provider will provide a revised quote before proceeding with any out-of-scope work.

**2.4** The Service Provider reserves the right to use AI-assisted tools, automation software, and third-party services in the delivery of Services, provided the final output meets the quality standards and specifications agreed upon.`,
  },
  {
    title: '3. Investment & Payment Terms',
    content: `**3.1 Project-Based Work**
A 50% deposit of the total project fee is required before work commences. The remaining 50% is due upon project completion, prior to final handover or deployment to production, unless otherwise specified in the Project Scope.

**3.2 Monthly Retainers**
Retainer fees are billed monthly in advance on the 1st of each month. Payment is due within 7 days of invoice date.

**3.3 Currency & Methods**
All fees are quoted in South African Rand (ZAR) unless otherwise agreed. The Service Provider accepts payment via:
- Bank transfer (EFT)
- PayPal
- Other methods as agreed in writing

For international clients, fees may be quoted in USD, EUR, or GBP at the Service Provider's discretion.

**3.4 Late Payments**
Invoices not paid within 7 days of the due date are considered overdue. The Service Provider reserves the right to:
(a) Pause all work on the project until the account is settled;
(b) Withhold delivery of completed Deliverables;
(c) Charge interest at the rate of 2% per month on overdue amounts;
(d) Suspend access to hosted services, websites, or automation systems.

**3.5 Operating Costs**
Third-party costs such as hosting, domain registration, software subscriptions, stock media, and paid advertising spend are the responsibility of the Client and are billed separately, unless explicitly included in the Project Scope.

**3.6 Taxes**
All quoted fees are exclusive of VAT. Should VAT become applicable, it will be added to invoices in accordance with South African tax law.`,
  },
  {
    title: '4. Project Timeline & Delivery',
    content: `**4.1** Estimated project timelines will be provided in the Project Scope. Start dates are subject to receipt of the deposit and all required materials from the Client.

**4.2** Timelines are estimates only. The Service Provider will make reasonable efforts to meet agreed deadlines but is not liable for delays caused by:
(a) Late or incomplete feedback from the Client;
(b) Delayed provision of required assets, content, or access credentials;
(c) Scope changes or additional requests;
(d) Third-party service outages or platform changes;
(e) Force majeure events.

**4.3** The Client agrees to respond to requests for feedback, approvals, or information within 5 business days. If the Client fails to respond within 10 business days of a request, the Service Provider may:
(a) Proceed based on its professional judgement;
(b) Place the project on hold until a response is received;
(c) Adjust the timeline accordingly without penalty.

**4.4** If a project is placed on hold due to Client inaction for more than 30 days, the Service Provider reserves the right to close the project. Reactivation may require a new deposit and revised timeline.`,
  },
  {
    title: '5. Client Responsibilities',
    content: `The Client agrees to:

**5.1** Provide all required information, brand assets, content, images, access credentials, and materials in a timely manner as requested by the Service Provider.

**5.2** Designate a single point of contact who has authority to make decisions, provide approvals, and give feedback on behalf of the Client.

**5.3** Respond to feedback requests, approval requests, and communications within 5 business days.

**5.4** Review and test all Deliverables during the review period and provide clear, consolidated feedback.

**5.5** Ensure that all content, images, and materials provided to the Service Provider are owned by the Client or properly licensed, and do not infringe on any third-party intellectual property rights, trademarks, or copyrights.

**5.6** Maintain current and accurate billing information.

**5.7** Not share Portal access credentials with unauthorised third parties.`,
  },
  {
    title: '6. Revisions & Approvals',
    content: `**6.1** Each Project Scope will specify the number of revision rounds included. Unless otherwise stated, the default is 2 rounds of revisions per major deliverable.

**6.2** A "revision" means a set of changes to existing approved work. New features, additional pages, or significant scope changes are not revisions — they are change requests covered under Section 2.3.

**6.3** Additional revision rounds beyond those included will be billed at the Service Provider's standard hourly rate, which will be communicated to the Client before proceeding.

**6.4** Revisions must be submitted as a single, consolidated set of feedback per revision round. The Service Provider is not obligated to accommodate piecemeal feedback submitted across multiple communications for the same revision round.

**6.5** If the Client does not request revisions within 7 days of receiving a deliverable for review, the deliverable will be deemed approved.

**6.6** Final sign-off on Deliverables may be provided through the Portal or in writing via email. Once the Client provides final approval, no further revisions are included without additional cost.`,
  },
  {
    title: '7. Intellectual Property',
    content: `**7.1** Upon receipt of full and final payment, the Client is granted full ownership of all custom Deliverables created specifically for the Client under this Agreement, including but not limited to: website designs, landing pages, custom graphics, copy, and bespoke code.

**7.2** The Service Provider retains ownership of:
(a) Pre-existing tools, templates, frameworks, code libraries, and processes used in the delivery of Services;
(b) General knowledge, techniques, and methodologies developed or refined during the engagement;
(c) Any Deliverables for which full payment has not been received.

**7.3** The Client grants the Service Provider a non-exclusive, perpetual licence to reference and display the project in the Service Provider's portfolio, case studies, and marketing materials, unless the Client requests in writing to opt out of this.

**7.4** Third-party assets (fonts, stock images, plugins, software licences) remain subject to their respective licence terms and are not transferred to the Client through this Agreement.`,
  },
  {
    title: '8. Confidentiality',
    content: `**8.1** Both parties agree to keep the other party's confidential business information private and not disclose it to third parties without prior written consent.

**8.2** "Confidential Information" includes but is not limited to: business strategies, financial information, customer data, trade secrets, technical processes, login credentials, and any information marked as confidential.

**8.3** This obligation of confidentiality survives the termination of this Agreement for a period of 2 years.

**8.4** Confidential Information does not include information that:
(a) Is or becomes publicly available through no fault of the receiving party;
(b) Was already known to the receiving party prior to disclosure;
(c) Is independently developed by the receiving party;
(d) Is required to be disclosed by law or court order.`,
  },
  {
    title: '9. Data Protection & POPIA Compliance',
    content: `**9.1** Both parties agree to comply with the Protection of Personal Information Act (POPIA) of South Africa and any other applicable data protection laws.

**9.2** The Service Provider will process the Client's personal information only as necessary for the performance of Services under this Agreement.

**9.3** The Service Provider implements reasonable technical and organisational measures to protect personal information against unauthorised access, loss, or destruction.

**9.4** Where the Service Provider processes personal information on behalf of the Client (e.g., customer data within a CRM, website form submissions, or email lists), the Service Provider acts as an "operator" under POPIA and will:
(a) Process such data only on the Client's instructions;
(b) Keep such data secure and confidential;
(c) Delete or return such data upon termination of the engagement, as directed by the Client.

**9.5** The Client is responsible for ensuring that any personal information provided to the Service Provider has been collected lawfully and that the Client has the necessary consents to share it.

**9.6** For international clients, the Service Provider will comply with applicable data protection requirements including GDPR where relevant.`,
  },
  {
    title: '10. Hosting, Domains & Third-Party Services',
    content: `**10.1** Unless otherwise agreed, the Client is responsible for maintaining and paying for their own hosting, domain registration, and third-party service subscriptions.

**10.2** Where the Service Provider manages hosting or domains on behalf of the Client, the Client acknowledges that:
(a) Continued access requires timely payment of hosting and maintenance fees;
(b) The Service Provider is not liable for downtime, data loss, or service interruptions caused by the hosting provider or third-party platforms;
(c) The Service Provider will make reasonable efforts to resolve issues promptly but does not guarantee uptime.

**10.3** The Service Provider may recommend specific hosting providers, tools, or platforms. The Client is free to choose alternative providers, but the Service Provider is not responsible for compatibility issues arising from the Client's choice of infrastructure.`,
  },
  {
    title: '11. Warranties & Limitation of Liability',
    content: `**11.1** The Service Provider warrants that:
(a) Services will be performed with reasonable skill and care in a professional manner;
(b) Deliverables will substantially conform to the agreed Project Scope;
(c) The Service Provider has the right to enter into this Agreement and perform the Services.

**11.2** The Service Provider does NOT warrant:
(a) Specific business outcomes, revenue increases, search rankings, conversion rates, or traffic volumes;
(b) Uninterrupted or error-free operation of websites, automation systems, or third-party integrations;
(c) That third-party platforms (Google, Meta, social media platforms, hosting providers) will not change their algorithms, policies, or services.

**11.3** The Service Provider's total liability for all claims arising out of or in connection with this Agreement shall not exceed the total fees paid by the Client under this Agreement in the 12 months preceding the claim.

**11.4** The Service Provider is not liable for:
(a) Indirect, incidental, special, or consequential damages;
(b) Loss of revenue, profit, data, or business opportunity;
(c) Damages arising from the Client's failure to maintain backups;
(d) Actions or omissions of third-party service providers;
(e) Content provided by the Client that infringes third-party rights.`,
  },
  {
    title: '12. Termination',
    content: `**12.1** Either party may terminate this Agreement with 14 days' written notice to the other party.

**12.2** The Service Provider may terminate this Agreement immediately if:
(a) The Client fails to pay any invoice within 30 days of the due date;
(b) The Client materially breaches this Agreement and fails to remedy the breach within 14 days of written notice;
(c) The Client becomes insolvent, enters liquidation, or files for bankruptcy.

**12.3** Upon termination:
(a) The Client shall pay for all Services performed and expenses incurred up to the date of termination;
(b) The deposit is non-refundable if work has commenced;
(c) The Service Provider will deliver all completed Deliverables for which payment has been received;
(d) Any outstanding Deliverables for which payment has not been received remain the property of the Service Provider;
(e) Each party shall return or destroy the other party's confidential information.

**12.4** For monthly retainers, either party may terminate with 30 days' written notice. The retainer will continue for the remainder of the notice period and any work in progress will be completed.

**12.5** The provisions of Sections 7 (Intellectual Property), 8 (Confidentiality), 9 (Data Protection), and 11 (Limitation of Liability) survive termination of this Agreement.`,
  },
  {
    title: '13. Dispute Resolution',
    content: `**13.1** The parties agree to attempt to resolve any dispute arising out of or in connection with this Agreement through good-faith negotiation.

**13.2** If the dispute cannot be resolved through negotiation within 30 days, either party may refer the matter to mediation under the rules of the Arbitration Foundation of Southern Africa (AFSA).

**13.3** If mediation fails within 60 days, either party may pursue resolution through the courts of the Republic of South Africa, which shall have exclusive jurisdiction.

**13.4** During any dispute, the Client shall continue to pay undisputed amounts and the Service Provider shall continue to perform undisputed Services.`,
  },
  {
    title: '14. General Provisions',
    content: `**14.1 Entire Agreement** — This Agreement, together with any accepted Project Scope, constitutes the entire agreement between the parties and supersedes all prior discussions, negotiations, and agreements.

**14.2 Amendments** — This Agreement may only be amended in writing, signed or digitally accepted by both parties.

**14.3 Assignment** — Neither party may assign their rights or obligations under this Agreement without the prior written consent of the other party.

**14.4 Force Majeure** — Neither party shall be liable for failure to perform obligations due to circumstances beyond its reasonable control, including but not limited to: natural disasters, pandemics, government actions, internet outages, power failures, or acts of war.

**14.5 Severability** — If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

**14.6 Waiver** — A failure by either party to enforce any right under this Agreement does not constitute a waiver of that right.

**14.7 Notices** — All formal notices under this Agreement shall be delivered via email to the addresses provided by each party. Notices are deemed received on the date of delivery as confirmed by the email service.

**14.8 Governing Law** — This Agreement is governed by and construed in accordance with the laws of the Republic of South Africa.

**14.9 Relationship** — The parties are independent contractors. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship.`,
  },
];

export default function AgreementViewer({ contract, onClose, onSigned }) {
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(contract?.status === 'Signed');
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const today = new Date().toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSign = async () => {
    if (!fullName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!agreed) {
      setError('Please confirm that you have read and agree to the terms.');
      return;
    }

    setSigning(true);
    setError(null);

    try {
      await api.signContract(contract?.id, {
        fullName: fullName.trim(),
        designation: designation.trim(),
        signedDate: new Date().toISOString(),
        ipAddress: 'client-portal',
      });
      setSigned(true);
      if (onSigned) onSigned(contract?.id);
    } catch (err) {
      setError('Failed to submit your signature. Please try again or contact us at hello@freedomhub.io.');
      setSigning(false);
    }
  };

  return (
    <div className="agreement-overlay">
      <div className="agreement-viewer" ref={scrollRef}>
        <div className="agreement-viewer__header">
          <div>
            <h2>Service Agreement</h2>
            <p className="agreement-viewer__subtitle">
              {contract?.projectName || 'FreedomHub Done-for-You Services'}
            </p>
          </div>
          <button className="agreement-viewer__close" onClick={onClose} title="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="agreement-viewer__body">
          {/* Header / Preamble */}
          <div className="agreement-preamble">
            <div className="agreement-brand">
              <span className="agreement-brand__logo">FH</span>
              <span className="agreement-brand__text">FreedomHub</span>
            </div>

            <h1 className="agreement-title">Service Agreement</h1>
            <p className="agreement-meta">Effective Date: {contract?.date || today}</p>

            <div className="agreement-parties">
              <div className="agreement-party">
                <span className="agreement-party__label">Service Provider</span>
                <strong>Claire Boshoff</strong>
                <span>trading as FreedomHub</span>
                <span>hello@freedomhub.io</span>
              </div>
              <div className="agreement-party__divider">and</div>
              <div className="agreement-party">
                <span className="agreement-party__label">Client</span>
                <strong>{contract?.clientName || 'The Client'}</strong>
                {contract?.clientCompany && <span>{contract.clientCompany}</span>}
                {contract?.clientEmail && <span>{contract.clientEmail}</span>}
              </div>
            </div>

            {contract?.projectName && (
              <div className="agreement-project">
                <span className="agreement-project__label">Project</span>
                <strong>{contract.projectName}</strong>
                {contract?.projectType && <span className="platform-badge">{contract.projectType}</span>}
              </div>
            )}

            <p className="agreement-intro">
              This Service Agreement ("Agreement") sets out the terms and conditions under which
              Claire Boshoff, trading as FreedomHub ("Service Provider"), will provide done-for-you
              services to the Client. By signing this Agreement or accepting it digitally through
              the FreedomHub Client Portal, the Client agrees to be bound by these terms.
            </p>
          </div>

          {/* Agreement Sections */}
          {AGREEMENT_SECTIONS.map((section, idx) => (
            <div key={idx} className="agreement-section">
              <h3 className="agreement-section__title">{section.title}</h3>
              <div
                className="agreement-section__content"
                dangerouslySetInnerHTML={{
                  __html: section.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br/>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>'),
                }}
              />
            </div>
          ))}

          {/* Signature Area */}
          <div className="agreement-signature">
            <h3 className="agreement-signature__title">Digital Acceptance</h3>

            {signed ? (
              <div className="agreement-signed">
                <div className="agreement-signed__badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Signed
                </div>
                <p>
                  This agreement was signed digitally{contract?.signedBy ? ` by ${contract.signedBy}` : ''}
                  on {contract?.signedDate ? new Date(contract.signedDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : today}.
                </p>
              </div>
            ) : (
              <div className="agreement-sign-form">
                <p className="agreement-sign-form__intro">
                  By typing your full legal name below and checking the acceptance box, you are
                  digitally signing this Agreement. This digital signature has the same legal
                  effect as a handwritten signature under South African law (Electronic
                  Communications and Transactions Act, 2002).
                </p>

                <div className="agreement-sign-form__fields">
                  <div className="form-group">
                    <label className="form-label">
                      Full Legal Name <span className="form-required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. John David Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Title / Designation</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Director, Owner, CEO (optional)"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="text" className="form-input" value={today} disabled />
                  </div>
                </div>

                {fullName.trim() && (
                  <div className="agreement-sign-form__preview">
                    <span className="agreement-sign-form__preview-label">Your signature</span>
                    <span className="agreement-sign-form__signature">{fullName}</span>
                  </div>
                )}

                <label className="agreement-sign-form__checkbox">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    I have read and understood the terms of this Service Agreement in full. I agree
                    to be bound by these terms on behalf of myself and/or the entity I represent.
                  </span>
                </label>

                {error && <div className="error-message">{error}</div>}

                <div className="agreement-sign-form__actions">
                  <button className="btn btn--outline" onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    className="btn btn--primary"
                    onClick={handleSign}
                    disabled={!agreed || !fullName.trim() || signing}
                  >
                    {signing ? 'Submitting...' : 'Sign Agreement'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="agreement-footer">
            <p>FreedomHub | hello@freedomhub.io | freedomhub.io</p>
            <p>Durban, South Africa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
