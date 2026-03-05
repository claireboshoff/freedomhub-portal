import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const PHASE_LABELS = ['Staging & Audit', 'Proposal & Deposit', 'Build', 'Review & Refine', 'Launch', 'Complete'];

export default function ProjectHub({ client }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page-loading"><div className="spinner" /><p>Loading projects...</p></div>;
  }

  const filtered = filter === 'all'
    ? projects
    : filter === 'active'
    ? projects.filter((p) => !['Complete', 'Cancelled'].includes(p.status))
    : projects.filter((p) => p.status === 'Complete');

  return (
    <div className="project-hub">
      <div className="page-header">
        <h2>Project Hub</h2>
        <p className="page-subtitle">Every project, from brief to launch. Click into any project for the full view.</p>
      </div>

      <div className="filters">
        <div className="filter-pills">
          {['all', 'active', 'complete'].map((f) => (
            <button key={f} className={`filter-pill ${filter === f ? 'filter-pill--active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => navigate('/services')}>
          New Project
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="projects-empty">
          <div className="projects-empty__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>No projects {filter !== 'all' ? `(${filter})` : 'yet'}</h3>
          <p>Head to <strong>Services</strong> to start your first project.</p>
        </div>
      ) : (
        <div className="project-grid">
          {filtered.map((project) => {
            const phaseIndex = PHASE_LABELS.indexOf(project.currentPhase);
            const progress = project.buildProgress || (phaseIndex >= 0 ? Math.round(((phaseIndex + 1) / PHASE_LABELS.length) * 100) : 0);
            const hasGate = project.status === 'Awaiting Contract' || project.status === 'Awaiting Payment';

            return (
              <button
                key={project.id}
                className={`project-file ${hasGate ? 'project-file--gated' : ''} ${project.status === 'Complete' ? 'project-file--complete' : ''}`}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="project-file__top">
                  <span className="project-file__type">{project.serviceType}</span>
                  <span className={`status-badge status-badge--${(project.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="project-file__name">{project.name}</h3>

                {hasGate && (
                  <div className="project-file__gate">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{project.status === 'Awaiting Contract' ? 'Contract required' : 'Payment required'}</span>
                  </div>
                )}

                <div className="project-file__progress">
                  <div className="progress-bar progress-bar--sm">
                    <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span>{progress}%</span>
                </div>

                <div className="project-file__phase">
                  {PHASE_LABELS.map((label, i) => (
                    <div
                      key={label}
                      className={`phase-pip ${i < phaseIndex ? 'phase-pip--done' : ''} ${i === phaseIndex ? 'phase-pip--current' : ''}`}
                      title={label}
                    />
                  ))}
                </div>

                <div className="project-file__footer">
                  {project.startDate && <span>Started {project.startDate}</span>}
                  {project.estDelivery && <span>Est. {project.estDelivery}</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
