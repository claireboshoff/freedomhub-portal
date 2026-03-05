import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const SECTIONS = [
  {
    key: 'identity',
    title: 'Identity',
    subtitle: 'Who you are and what you do.',
    fields: [
      { name: 'name', label: 'Your Name', type: 'text' },
      { name: 'businessName', label: 'Business Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' },
    ],
  },
  {
    key: 'vision',
    title: 'The Vision',
    subtitle: 'Where you are going and why it matters.',
    fields: [
      { name: 'mission', label: 'Mission Statement', type: 'textarea', placeholder: 'What is the core purpose of your business?' },
      { name: 'vision', label: 'Vision (5-Year)', type: 'textarea', placeholder: 'Where do you see your business in 5 years?' },
      { name: 'usp', label: 'Unique Selling Point', type: 'textarea', placeholder: 'What makes you different from everyone else?' },
    ],
  },
  {
    key: 'brand',
    title: 'The Look',
    subtitle: 'Your brand identity — colours, fonts, and style.',
    fields: [
      { name: 'brandColors', label: 'Brand Colours', type: 'text', placeholder: 'HEX codes: #1a1a1a, #b89b5e, #ffffff' },
      { name: 'fontPreferences', label: 'Font Preferences', type: 'text', placeholder: 'e.g. League Spartan, Inter' },
      { name: 'styleNotes', label: 'Style Notes', type: 'textarea', placeholder: 'Describe the look and feel you want — modern, classic, bold, minimal?' },
    ],
  },
  {
    key: 'files',
    title: 'Files & Assets',
    subtitle: 'Share your logo, brand guide, photos, and documents with us.',
    fields: [
      { name: 'logoLink', label: 'Logo File', type: 'text', placeholder: 'Paste a Google Drive, Dropbox, or WeTransfer link' },
      { name: 'brandGuideLink', label: 'Brand Guidelines', type: 'text', placeholder: 'Style guide, font files, colour specs — share a link' },
      { name: 'photosLink', label: 'Photos & Images', type: 'text', placeholder: 'Team photos, product shots, office images — share a folder link' },
      { name: 'documentsLink', label: 'Other Documents', type: 'text', placeholder: 'Contracts, briefs, reference materials — share a link' },
      { name: 'fileNotes', label: 'Notes about your files', type: 'textarea', placeholder: 'Any context about what you have shared — file names, preferred versions, etc.' },
    ],
  },
  {
    key: 'vault',
    title: 'The Vault',
    subtitle: 'Centralised access details. Stored securely.',
    fields: [
      { name: 'domainRegistrar', label: 'Domain Registrar', type: 'text', placeholder: 'e.g. GoDaddy, Namecheap' },
      { name: 'hostingLogins', label: 'Hosting Details', type: 'textarea', placeholder: 'Provider, login URL, notes (we will request passwords securely when needed)' },
      { name: 'socialHandles', label: 'Social Media Handles', type: 'textarea', placeholder: 'Instagram: @handle\nFacebook: /page\nLinkedIn: /in/name' },
    ],
  },
  {
    key: 'comms',
    title: 'Communication',
    subtitle: 'How you prefer we reach you.',
    fields: [
      { name: 'preferredContact', label: 'Preferred Contact Method', type: 'select', options: ['Email', 'Telegram', 'WhatsApp', 'Phone', 'Teams'] },
      { name: 'email', label: 'Email Address', type: 'text', placeholder: 'your@email.com' },
      { name: 'whatsapp', label: 'WhatsApp Number', type: 'text', placeholder: '+27 81 234 5678' },
      { name: 'telegramId', label: 'Telegram Username', type: 'text', placeholder: '@username' },
      { name: 'teamsEmail', label: 'Microsoft Teams Email', type: 'text', placeholder: 'your@company.com' },
      { name: 'meetingLink', label: 'Meeting Link', type: 'text', placeholder: 'Calendly, Google Meet, Zoom, or Teams link' },
    ],
  },
];

export default function ClientBrain({ client, onUpdate }) {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState('identity');

  useEffect(() => {
    if (client) {
      setFormData({ ...client });
    }
  }, [client]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await api.updateProfile(formData);
      if (onUpdate && result.client) {
        onUpdate(result.client);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save. Please try again.');
    }
    setSaving(false);
  };

  // Calculate completion percentage
  const allFields = SECTIONS.flatMap((s) => s.fields.map((f) => f.name));
  const filledFields = allFields.filter((f) => formData[f] && String(formData[f]).trim());
  const completion = Math.round((filledFields.length / allFields.length) * 100);

  return (
    <div className="brain-page">
      <div className="page-header">
        <h2>Client Brain</h2>
        <p className="page-subtitle">
          Your central profile. Everything we build starts here.
        </p>
      </div>

      <div className="brain-intro">
        <p>The more we know, the better we build. Every detail here shapes the work we do for you — from the tone of your copy to the colours on your site. Fill in what you can. Skip what you do not know yet. You can always come back and add more later.</p>
      </div>

      <div className="brain-completion">
        <div className="brain-completion__bar">
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${completion}%` }} />
          </div>
          <span className="brain-completion__label">{completion}% complete</span>
        </div>
        <p className="brain-completion__hint">
          {completion < 30
            ? 'Just getting started — even a few details help us understand your business better.'
            : completion < 60
            ? 'Good progress. The more context you share, the less back-and-forth we need.'
            : completion < 100
            ? 'Nearly there. A complete profile means we can hit the ground running on every project.'
            : 'Your profile is complete. We have everything we need to do great work.'}
        </p>
      </div>

      <div className="brain-sections">
        {SECTIONS.map((section) => (
          <div key={section.key} className={`brain-section ${expandedSection === section.key ? 'brain-section--open' : ''}`}>
            <button
              className="brain-section__header"
              onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
            >
              <div>
                <h3>{section.title}</h3>
                <p>{section.subtitle}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points={expandedSection === section.key ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>

            {expandedSection === section.key && (
              <div className="brain-section__body">
                {section.fields.map((field) => (
                  <div key={field.name} className="form-group">
                    <label className="form-label">{field.label}</label>

                    {field.type === 'text' && (
                      <input
                        type="text"
                        className="form-input"
                        value={formData[field.name] || ''}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        placeholder={field.placeholder || ''}
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={formData[field.name] || ''}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        placeholder={field.placeholder || ''}
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        className="form-select"
                        value={formData[field.name] || ''}
                        onChange={(e) => updateField(field.name, e.target.value)}
                      >
                        <option value="">Select...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="brain-actions">
        <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Profile'}
        </button>
        {saved && <span className="brain-saved">Profile updated successfully.</span>}
      </div>
    </div>
  );
}
