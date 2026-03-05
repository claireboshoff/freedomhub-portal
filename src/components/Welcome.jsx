import React, { useState } from 'react';

const steps = [
  {
    title: 'Your Growth, Handled.',
    subtitle: 'Welcome to your command center',
    body: 'This portal is where the magic happens. Everything we build, optimise, and launch for your business lives right here — so you always know exactly where things stand.',
    detail: 'No more back-and-forth emails. No more wondering "where are we at?" Just clarity, control, and results.',
  },
  {
    title: 'Brief Us. We Build It.',
    subtitle: 'Done-for-you services',
    body: 'Need a website? A landing page? A full social media campaign? Simply fill in a brief — tell us what you need and who it is for. We handle the rest.',
    detail: 'Your brief feeds directly into our build pipeline. No detail gets lost. No meeting required.',
  },
  {
    title: 'Watch It Come to Life.',
    subtitle: 'Real-time progress tracking',
    body: 'Every project moves through clear phases — from discovery to launch. You will see exactly where your project is, what is happening next, and when to expect delivery.',
    detail: 'Approve work, leave feedback, and track milestones — all from one place.',
  },
  {
    title: 'We Have Got Your Back.',
    subtitle: 'Support when you need it',
    body: 'Questions? Changes? Something not working? Our help desk is built right in. Raise a ticket, check our knowledge base, or request a call.',
    detail: 'Your account manager gets notified instantly. Most requests are handled within 24 hours.',
  },
];

export default function Welcome({ client, onComplete }) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <div className="welcome-progress">
          {steps.map((_, i) => (
            <div key={i} className={`welcome-progress__dot ${i <= step ? 'welcome-progress__dot--active' : ''}`} />
          ))}
        </div>

        <div className="welcome-content" key={step}>
          <p className="welcome-eyebrow">{current.subtitle}</p>
          <h2 className="welcome-title">{current.title}</h2>
          <p className="welcome-body">{current.body}</p>
          <p className="welcome-detail">{current.detail}</p>
        </div>

        <div className="welcome-actions">
          {step > 0 && (
            <button className="btn btn--ghost" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <div className="welcome-actions__spacer" />
          {isLast ? (
            <button className="btn btn--primary" onClick={onComplete}>
              Let's Go
            </button>
          ) : (
            <button className="btn btn--primary" onClick={() => setStep(step + 1)}>
              Next
            </button>
          )}
        </div>

        <button className="welcome-skip" onClick={onComplete}>
          Skip intro
        </button>
      </div>
    </div>
  );
}
