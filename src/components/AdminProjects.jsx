import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const STATUS_TABS = ['All', 'Active', 'Awaiting Contract', 'Awaiting Payment', 'Complete'];
const STATUS_OPTIONS = ['Active', 'Awaiting Contract', 'Awaiting Payment', 'Awaiting Approval', 'Paused', 'Complete', 'Cancelled'];

function formatRand(amount) {
  return `R${(amount || 0).toLocaleString('en-ZA')}`;
}

export default function AdminProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [updateNote, setUpdateNote] = useState('');
  const [progressVal, setProgressVal] = useState(0);
  const [statusVal, setStatusVal] = useState('');

  useEffect(() => {
    api.adminProjects()
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading projects...</p>
      </div>
    );
  }

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.status === filter);

  const handleExpand = (project) => {
    if (expandedId === project.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(project.id);
    setStatusVal(project.status || 'Active');
    setProgressVal(project.buildProgress || 0);
    setUpdateNote('');
  };

  const handleSave = async (project) => {
    setUpdating(project.id);
    try {
      const updates = {
        status: statusVal,
        buildProgress: Number(progressVal),
      };
      if (updateNote.trim()) {
        updates.updateNote = updateNote.trim();
      }
      await api.adminUpdateProject(project.id, updates);
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? { ...p, status: statusVal, buildProgress: Number(progressVal), lastUpdateTitle: updateNote.trim() || p.lastUpdateTitle, lastUpdateDate: new Date().toISOString() }
            : p
        )
      );
      setUpdateNote('');
    } catch {
      alert('Failed to update project.');
    }
    setUpdating(null);
  };

  return (
    <div className="admin-projects-page">
      <div className="page-header">
        <h2>All Projects</h2>
        <p className="page-subtitle">{projects.length} projects across all clients.</p>
      </div>

      <div className="filter-pills" style={{ marginBottom: '20px' }}>
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            className={`filter-pill ${filter === tab ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
            {tab !== 'All' && (
              <span className="admin-filter-count">
                {projects.filter((p) => p.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <p>No projects match this filter.</p>
        </div>
      ) : (
        <div className="admin-projects-list">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`admin-project-item ${expandedId === project.id ? 'admin-project-item--expanded' : ''}`}
            >
              <button className="admin-project-item__header" onClick={() => handleExpand(project)}>
                <div className="admin-project-item__main">
                  <strong>{project.name}</strong>
                  <span className="admin-project-item__client">{project.clientName || '--'}</span>
                </div>
                <div className="admin-project-item__meta">
                  {project.serviceType && <span className="platform-badge">{project.serviceType}</span>}
                  <span className={`status-badge status-badge--${(project.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                    {project.status}
                  </span>
                </div>
                <div className="admin-project-item__progress-wrap">
                  <div className="progress-bar progress-bar--sm">
                    <div className="progress-bar__fill" style={{ width: `${project.buildProgress || 0}%` }} />
                  </div>
                  <span className="admin-project-item__pct">{project.buildProgress || 0}%</span>
                </div>
                <svg className="admin-project-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points={expandedId === project.id ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                </svg>
              </button>

              {expandedId === project.id && (
                <div className="admin-project-detail">
                  <div className="admin-project-detail__info">
                    <div className="admin-detail-row">
                      <span className="admin-detail-label">Phase</span>
                      <span>{project.currentPhase || '--'}</span>
                    </div>
                    <div className="admin-detail-row">
                      <span className="admin-detail-label">Service</span>
                      <span>{project.serviceType || '--'}</span>
                    </div>
                    <div className="admin-detail-row">
                      <span className="admin-detail-label">Start Date</span>
                      <span>{project.startDate || '--'}</span>
                    </div>
                    <div className="admin-detail-row">
                      <span className="admin-detail-label">Due Date</span>
                      <span>{project.dueDate || '--'}</span>
                    </div>
                  </div>

                  <div className="admin-project-actions">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={statusVal}
                        onChange={(e) => setStatusVal(e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Progress: {progressVal}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={progressVal}
                        onChange={(e) => setProgressVal(e.target.value)}
                        className="admin-range-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Update Note</label>
                      <textarea
                        className="form-textarea"
                        rows={2}
                        placeholder="Add a progress note..."
                        value={updateNote}
                        onChange={(e) => setUpdateNote(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn--primary"
                      onClick={() => handleSave(project)}
                      disabled={updating === project.id}
                    >
                      {updating === project.id ? 'Saving...' : 'Save Changes'}
                    </button>
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
