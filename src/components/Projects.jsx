import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const PHASE_CONFIG = [
  { key: 'discovery', label: 'Discovery', icon: 'search' },
  { key: 'strategy', label: 'Strategy', icon: 'lightbulb' },
  { key: 'content', label: 'Content', icon: 'edit' },
  { key: 'design', label: 'Design', icon: 'palette' },
  { key: 'development', label: 'Build', icon: 'code' },
  { key: 'review', label: 'Review', icon: 'eye' },
  { key: 'launch', label: 'Launch', icon: 'rocket' },
];

const phaseIcons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  lightbulb: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  edit: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  palette: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  eye: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  rocket: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
};

function PhaseTimeline({ phases, currentPhase }) {
  const currentIndex = PHASE_CONFIG.findIndex((p) => p.key === currentPhase);

  return (
    <div className="phase-timeline">
      {PHASE_CONFIG.map((phase, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        const status = isComplete ? 'complete' : isCurrent ? 'current' : 'upcoming';
        const phaseData = phases?.find((p) => p.key === phase.key);

        return (
          <div key={phase.key} className={`phase-step phase-step--${status}`}>
            <div className="phase-step__connector" />
            <div className="phase-step__dot">
              {isComplete ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                phaseIcons[phase.icon]
              )}
            </div>
            <div className="phase-step__info">
              <span className="phase-step__label">{phase.label}</span>
              {phaseData?.date && (
                <span className="phase-step__date">{phaseData.date}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Projects({ client }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2>Projects</h2>
        <p className="page-subtitle">
          Track every project from brief to launch. Nothing falls through the cracks.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <div className="projects-empty__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>No active projects yet</h3>
          <p>
            Once you submit a service brief, your project will appear here with real-time progress tracking.
            Head over to <strong>Services</strong> to get started.
          </p>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map((project) => {
            const isExpanded = expanded === project.id;
            const currentPhaseIndex = PHASE_CONFIG.findIndex((p) => p.key === project.currentPhase);
            const progress = currentPhaseIndex >= 0
              ? Math.round(((currentPhaseIndex + 1) / PHASE_CONFIG.length) * 100)
              : 0;

            return (
              <div key={project.id} className={`project-card ${isExpanded ? 'project-card--expanded' : ''}`}>
                <button
                  className="project-card__header"
                  onClick={() => setExpanded(isExpanded ? null : project.id)}
                >
                  <div className="project-card__title-row">
                    <h3>{project.name}</h3>
                    <span className={`status-badge status-badge--${(project.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                      {project.status || 'Active'}
                    </span>
                  </div>
                  <div className="project-card__meta">
                    <span>{project.type}</span>
                    {project.startDate && <span>Started {project.startDate}</span>}
                    {project.estimatedDelivery && <span>Est. delivery: {project.estimatedDelivery}</span>}
                  </div>
                  <div className="project-card__progress">
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="progress-bar__label">{progress}% complete</span>
                  </div>
                  <div className="project-card__expand-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={isExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="project-card__body">
                    <PhaseTimeline phases={project.phases} currentPhase={project.currentPhase} />

                    {project.latestUpdate && (
                      <div className="project-update">
                        <h4>Latest Update</h4>
                        <p>{project.latestUpdate}</p>
                        {project.latestUpdateDate && (
                          <span className="project-update__date">{project.latestUpdateDate}</span>
                        )}
                      </div>
                    )}

                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="project-deliverables">
                        <h4>Deliverables</h4>
                        <ul>
                          {project.deliverables.map((d, i) => (
                            <li key={i} className={d.complete ? 'deliverable--complete' : ''}>
                              <span className="deliverable__check">
                                {d.complete ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                                )}
                              </span>
                              {d.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.nextAction && (
                      <div className="project-next">
                        <strong>Next step:</strong> {project.nextAction}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
