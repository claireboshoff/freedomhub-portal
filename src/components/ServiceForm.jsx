import React, { useState } from 'react';

export default function ServiceForm({ service, onSubmit, onBack }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const currentStep = service.steps[step];
  const isLast = step === service.steps.length - 1;
  const isReview = step === service.steps.length;

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMulticheck = (name, option) => {
    const current = formData[name] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updateField(name, updated);
  };

  const canProceed = () => {
    if (!currentStep) return true;
    return currentStep.fields
      .filter((f) => f.required)
      .every((f) => {
        const val = formData[f.name];
        if (f.type === 'multicheck') return val && val.length > 0;
        return val && String(val).trim() !== '';
      });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="service-form">
        <div className="service-form__success">
          <div className="service-form__success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2>Brief Submitted</h2>
          <p>
            We have received your {service.title.toLowerCase()} brief and will be in touch shortly.
            You can track the progress of this project under the <strong>Projects</strong> tab.
          </p>
          <p className="service-form__success-note">
            Expect a response within 24 hours.
          </p>
          <button className="btn btn--primary" onClick={onBack}>
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  if (isReview) {
    return (
      <div className="service-form">
        <div className="service-form__header">
          <button className="btn btn--ghost btn--sm" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            All Services
          </button>
          <h2>{service.title} — Review</h2>
          <p className="page-subtitle">Check your answers before submitting.</p>
        </div>

        <div className="service-form__steps-indicator">
          {service.steps.map((s, i) => (
            <div key={i} className="step-dot step-dot--complete" />
          ))}
          <div className="step-dot step-dot--active" />
        </div>

        <div className="service-form__review">
          {service.steps.map((s, i) => (
            <div key={i} className="review-section">
              <div className="review-section__header">
                <h4>{s.title}</h4>
                <button className="btn btn--ghost btn--sm" onClick={() => setStep(i)}>Edit</button>
              </div>
              <div className="review-section__fields">
                {s.fields.map((field) => {
                  const val = formData[field.name];
                  if (!val || (Array.isArray(val) && val.length === 0)) return null;
                  return (
                    <div key={field.name} className="review-field">
                      <span className="review-field__label">{field.label}</span>
                      <span className="review-field__value">
                        {Array.isArray(val) ? val.join(', ') : val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="service-form__actions">
          <button className="btn btn--ghost" onClick={() => setStep(step - 1)}>Back</button>
          <button className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Brief'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-form">
      <div className="service-form__header">
        <button className="btn btn--ghost btn--sm" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          All Services
        </button>
        <h2>{service.title}</h2>
        <p className="page-subtitle">{currentStep.title}</p>
      </div>

      <div className="service-form__steps-indicator">
        {service.steps.map((s, i) => (
          <div
            key={i}
            className={`step-dot ${i < step ? 'step-dot--complete' : ''} ${i === step ? 'step-dot--active' : ''}`}
          />
        ))}
        <div className="step-dot" />
      </div>

      <div className="service-form__body" key={step}>
        {currentStep.fields.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="form-required">*</span>}
            </label>

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
                rows={4}
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

            {field.type === 'multicheck' && (
              <div className="form-multicheck">
                {field.options.map((opt) => (
                  <label key={opt} className="form-checkbox">
                    <input
                      type="checkbox"
                      checked={(formData[field.name] || []).includes(opt)}
                      onChange={() => toggleMulticheck(field.name, opt)}
                    />
                    <span className="form-checkbox__mark" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="service-form__actions">
        <button className="btn btn--ghost" onClick={() => (step > 0 ? setStep(step - 1) : onBack())}>
          {step > 0 ? 'Back' : 'Cancel'}
        </button>
        <button
          className="btn btn--primary"
          onClick={() => setStep(step + 1)}
          disabled={!canProceed()}
        >
          {isLast ? 'Review Brief' : 'Next'}
        </button>
      </div>
    </div>
  );
}
