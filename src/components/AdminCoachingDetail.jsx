import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const TYPE_COLORS = {
  'Life Coaching': '#8a8a8a',
  'Business Coaching': '#C5A55A',
  'Holistic Coaching': '#2D2D2D',
};

const CATEGORY_COLORS = {
  'Personal Growth': '#8a8a8a',
  'Business': '#C5A55A',
  'Health & Wellness': '#a88d44',
  'Mindset': '#2D2D2D',
  'Relationships': '#C5A55A',
  'Financial': '#a88d44',
};

function formatDate(d) {
  if (!d) return '--';
  return new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminCoachingDetail() {
  const { coachingClientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});

  useEffect(() => {
    api.coachingClientDetail(coachingClientId)
      .then((data) => {
        setClient(data.client || null);
        setSessions(data.sessions || []);
        setGoals(data.goals || []);
        setTodos(data.todos || []);
        setProjects(data.projects || []);
        setInvoices(data.invoices || []);
        setContracts(data.contracts || []);
        if (data.client) {
          setProfileForm({
            name: data.client.name || '',
            email: data.client.email || '',
            phone: data.client.phone || '',
            business: data.client.business || '',
            bio: data.client.bio || '',
            notes: data.client.notes || '',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [coachingClientId]);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading coaching profile...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="admin-coaching-detail">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/admin/coaching')}>
          Back to Coaching
        </button>
        <div className="empty-state-card" style={{ marginTop: '20px' }}>
          <p>Client not found.</p>
        </div>
      </div>
    );
  }

  const sessionsLeft = (client.totalSessions || 0) - (client.sessionsUsed || 0);
  const sessionPct = client.totalSessions ? Math.round((client.sessionsUsed / client.totalSessions) * 100) : 0;
  const completedSessions = sessions.filter((s) => s.status === 'Completed');
  const upcomingSessions = sessions.filter((s) => s.status === 'Scheduled');
  const achievedGoals = goals.filter((g) => g.status === 'Achieved');
  const todosDone = todos.filter((t) => t.status === 'Done');
  const todosOpen = todos.filter((t) => t.status !== 'Done');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: `Sessions (${sessions.length})` },
    { id: 'goals', label: `Goals (${goals.length})` },
    { id: 'todos', label: `To Do (${todosOpen.length})` },
    { id: 'projects', label: `Projects (${projects.length})` },
    { id: 'financial', label: `Financial (${invoices.length})` },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="admin-coaching-detail">
      <button className="btn btn--ghost btn--sm" onClick={() => navigate('/admin/coaching')} style={{ marginBottom: '16px' }}>
        Back to Coaching
      </button>

      {/* Client Header */}
      <div className="coaching-profile-card">
        <div className="coaching-profile-card__avatar">
          {(client.name || 'C').charAt(0).toUpperCase()}
        </div>
        <div className="coaching-profile-card__info">
          <h2>{client.name}</h2>
          {client.business && <p className="coaching-profile-card__business">{client.business}</p>}
          <div className="coaching-profile-card__meta">
            {client.email && <span>{client.email}</span>}
            {client.phone && <span>{client.phone}</span>}
            {client.coachingType && (
              <span className="coaching-type-badge" style={{ background: TYPE_COLORS[client.coachingType] || '#666', color: '#fff' }}>
                {client.coachingType}
              </span>
            )}
            <span className={`status-badge status-badge--${(client.status || 'active').toLowerCase()}`}>
              {client.status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="coaching-stats-row">
        <div className="coaching-stat">
          <span className="coaching-stat__number">{sessionsLeft}</span>
          <span className="coaching-stat__label">Sessions Left</span>
          <div className="progress-bar progress-bar--sm" style={{ marginTop: '8px' }}>
            <div className="progress-bar__fill" style={{ width: `${sessionPct}%` }} />
          </div>
          <span className="coaching-stat__sub">{client.sessionsUsed || 0} of {client.totalSessions || 0} used</span>
        </div>
        <div className="coaching-stat">
          <span className="coaching-stat__number">{completedSessions.length}</span>
          <span className="coaching-stat__label">Completed Sessions</span>
        </div>
        <div className="coaching-stat">
          <span className="coaching-stat__number">{achievedGoals.length}/{goals.length}</span>
          <span className="coaching-stat__label">Goals Achieved</span>
        </div>
        <div className="coaching-stat">
          <span className="coaching-stat__number">{todosDone.length}/{todos.length}</span>
          <span className="coaching-stat__label">Tasks Done</span>
        </div>
        <div className="coaching-stat">
          <span className="coaching-stat__number">{formatDate(client.contractStart)}</span>
          <span className="coaching-stat__label">Contract Start</span>
        </div>
        <div className="coaching-stat">
          <span className="coaching-stat__number">{formatDate(client.contractEnd)}</span>
          <span className="coaching-stat__label">Contract End</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="coaching-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`coaching-tab ${activeTab === tab.id ? 'coaching-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="coaching-tab-content">
        {activeTab === 'overview' && (
          <div className="coaching-overview">
            {/* Upcoming Sessions */}
            <div className="card">
              <div className="card__header"><h3>Upcoming Sessions</h3></div>
              <div className="card__body">
                {upcomingSessions.length === 0 ? (
                  <p className="empty-state">No upcoming sessions scheduled.</p>
                ) : (
                  <div className="dash-list">
                    {upcomingSessions.map((s) => (
                      <div key={s.id} className="dash-item">
                        <div className="dash-item__info">
                          <strong>{s.title || `Session ${s.sessionNumber}`}</strong>
                          <span className="dash-item__meta">{formatDate(s.date)} -- {s.type || '1:1'} -- {s.duration || 60}min</span>
                        </div>
                        <span className="status-badge status-badge--scheduled">Scheduled</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active Goals */}
            <div className="card">
              <div className="card__header"><h3>Active Goals</h3></div>
              <div className="card__body">
                {goals.filter((g) => g.status === 'In Progress').length === 0 ? (
                  <p className="empty-state">No active goals.</p>
                ) : (
                  <div className="dash-list">
                    {goals.filter((g) => g.status === 'In Progress').map((g) => (
                      <div key={g.id} className="dash-item">
                        <div className="dash-item__info">
                          <strong>{g.title}</strong>
                          <span className="dash-item__meta">
                            {g.category && (
                              <span className="coaching-category-badge" style={{ background: CATEGORY_COLORS[g.category] || '#666', color: '#fff' }}>
                                {g.category}
                              </span>
                            )}
                            Target: {formatDate(g.targetDate)}
                          </span>
                        </div>
                        <div className="dash-item__progress">
                          <div className="progress-bar progress-bar--sm">
                            <div className="progress-bar__fill" style={{ width: `${g.progress || 0}%` }} />
                          </div>
                          <span>{g.progress || 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Open Todos */}
            <div className="card">
              <div className="card__header"><h3>Open Tasks</h3></div>
              <div className="card__body">
                {todosOpen.length === 0 ? (
                  <p className="empty-state">All tasks completed.</p>
                ) : (
                  <div className="dash-list">
                    {todosOpen.map((t) => (
                      <div key={t.id} className="dash-item">
                        <div className="dash-item__info">
                          <strong>{t.task}</strong>
                          <span className="dash-item__meta">Due: {formatDate(t.dueDate)}</span>
                        </div>
                        <span className={`status-badge status-badge--${(t.status || 'to-do').toLowerCase().replace(/\s+/g, '-')}`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="coaching-sessions-list">
            {sessions.length === 0 ? (
              <div className="empty-state-card"><p>No sessions recorded yet.</p></div>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="coaching-session-card">
                  <div className="coaching-session-card__header">
                    <div>
                      <strong>{s.title || `Session ${s.sessionNumber}`}</strong>
                      <span className="coaching-session-card__date">{formatDate(s.date)}</span>
                    </div>
                    <div className="coaching-session-card__tags">
                      {s.type && <span className="platform-badge">{s.type}</span>}
                      {s.duration && <span className="platform-badge">{s.duration}min</span>}
                      <span className={`status-badge status-badge--${(s.status || 'completed').toLowerCase()}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                  {s.notes && (
                    <div className="coaching-session-card__section">
                      <h4>Session Notes</h4>
                      <p>{s.notes}</p>
                    </div>
                  )}
                  {s.transcript && (
                    <div className="coaching-session-card__section">
                      <h4>Transcript</h4>
                      <div className="coaching-transcript">{s.transcript}</div>
                    </div>
                  )}
                  {s.videoUrl && (
                    <div className="coaching-session-card__section">
                      <h4>Video Replay</h4>
                      <a href={s.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                        Watch Replay
                      </a>
                    </div>
                  )}
                  {s.homework && (
                    <div className="coaching-session-card__section">
                      <h4>Homework / Action Items</h4>
                      <p>{s.homework}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="coaching-goals-list">
            {goals.length === 0 ? (
              <div className="empty-state-card"><p>No goals set yet.</p></div>
            ) : (
              goals.map((g) => (
                <div key={g.id} className="coaching-goal-card">
                  <div className="coaching-goal-card__header">
                    <div>
                      <strong>{g.title}</strong>
                      {g.category && (
                        <span className="coaching-category-badge" style={{ background: CATEGORY_COLORS[g.category] || '#666', color: '#fff' }}>
                          {g.category}
                        </span>
                      )}
                    </div>
                    <span className={`status-badge status-badge--${(g.status || 'not-started').toLowerCase().replace(/\s+/g, '-')}`}>
                      {g.status}
                    </span>
                  </div>
                  {g.description && <p className="coaching-goal-card__desc">{g.description}</p>}
                  <div className="coaching-goal-card__progress">
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: `${g.progress || 0}%` }} />
                    </div>
                    <span className="coaching-goal-card__pct">{g.progress || 0}%</span>
                  </div>
                  {g.targetDate && (
                    <span className="coaching-goal-card__target">Target: {formatDate(g.targetDate)}</span>
                  )}
                  {g.achievements && (
                    <div className="coaching-goal-card__achievements">
                      <h4>Achievements</h4>
                      <p>{g.achievements}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'todos' && (
          <div className="coaching-todos-list">
            {todos.length === 0 ? (
              <div className="empty-state-card"><p>No tasks assigned yet.</p></div>
            ) : (
              <>
                {todosOpen.length > 0 && (
                  <div className="coaching-todo-section">
                    <h3>Open ({todosOpen.length})</h3>
                    {todosOpen.map((t) => (
                      <div key={t.id} className="coaching-todo-item">
                        <div className="coaching-todo-item__check coaching-todo-item__check--open" />
                        <div className="coaching-todo-item__info">
                          <strong>{t.task}</strong>
                          {t.notes && <p>{t.notes}</p>}
                        </div>
                        <div className="coaching-todo-item__meta">
                          {t.dueDate && <span>Due: {formatDate(t.dueDate)}</span>}
                          <span className={`status-badge status-badge--${(t.status || 'to-do').toLowerCase().replace(/\s+/g, '-')}`}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {todosDone.length > 0 && (
                  <div className="coaching-todo-section">
                    <h3>Completed ({todosDone.length})</h3>
                    {todosDone.map((t) => (
                      <div key={t.id} className="coaching-todo-item coaching-todo-item--done">
                        <div className="coaching-todo-item__check coaching-todo-item__check--done" />
                        <div className="coaching-todo-item__info">
                          <strong>{t.task}</strong>
                        </div>
                        <span className="status-badge status-badge--done">Done</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

        {activeTab === 'projects' && (
          <div className="coaching-projects-list">
            {projects.length === 0 ? (
              <div className="empty-state-card"><p>No projects linked to this client.</p></div>
            ) : (
              <div className="dash-list">
                {projects.map((p) => (
                  <div key={p.id} className="dash-item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/projects`)}>
                    <div className="dash-item__info">
                      <strong>{p.name}</strong>
                      <span className="dash-item__meta">
                        {p.service && <span className="platform-badge">{p.service}</span>}
                        {p.startDate && <span>Started: {formatDate(p.startDate)}</span>}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {p.progress > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '100px' }}>
                          <div className="progress-bar progress-bar--sm" style={{ flex: 1 }}>
                            <div className="progress-bar__fill" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span style={{ fontSize: '12px', color: '#999' }}>{p.progress}%</span>
                        </div>
                      )}
                      <span className={`status-badge status-badge--${(p.status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="coaching-financial">
            {/* Contracts */}
            {contracts.length > 0 && (
              <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card__header"><h3>Contracts</h3></div>
                <div className="card__body">
                  <div className="dash-list">
                    {contracts.map((c) => (
                      <div key={c.id} className="dash-item">
                        <div className="dash-item__info">
                          <strong>{c.title}</strong>
                          <span className="dash-item__meta">
                            {c.type && <span className="platform-badge">{c.type}</span>}
                            {c.signedDate ? `Signed: ${formatDate(c.signedDate)}` : `Created: ${formatDate(c.createdDate)}`}
                          </span>
                        </div>
                        <span className={`status-badge status-badge--${(c.status || 'draft').toLowerCase()}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Invoices */}
            {invoices.length === 0 && contracts.length === 0 ? (
              <div className="empty-state-card"><p>No financial records for this client.</p></div>
            ) : invoices.length > 0 && (
              <div className="card">
                <div className="card__header"><h3>Invoices</h3></div>
                <div className="card__body">
                  <div className="dash-list">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="dash-item">
                        <div className="dash-item__info">
                          <strong>{inv.number || 'Invoice'}</strong>
                          <span className="dash-item__meta">
                            {inv.project && <span>{inv.project}</span>}
                            {inv.dueDate && <span>Due: {formatDate(inv.dueDate)}</span>}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <strong style={{ color: 'var(--gold)' }}>R{(inv.amount || 0).toLocaleString()}</strong>
                          <span className={`status-badge status-badge--${(inv.status || 'draft').toLowerCase()}`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="coaching-profile-edit">
            <div className="card">
              <div className="card__header">
                <h3>Client Profile</h3>
                {!editingProfile && (
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditingProfile(true)}>Edit</button>
                )}
              </div>
              <div className="card__body">
                {editingProfile ? (
                  <div className="coaching-profile-form">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text' },
                      { key: 'email', label: 'Email', type: 'text' },
                      { key: 'phone', label: 'Phone', type: 'text' },
                      { key: 'business', label: 'Business', type: 'text' },
                      { key: 'bio', label: 'Bio', type: 'textarea' },
                      { key: 'notes', label: 'Notes', type: 'textarea' },
                    ].map((field) => (
                      <div key={field.key} className="form-field">
                        <label>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={profileForm[field.key] || ''}
                            onChange={(e) => setProfileForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            rows={3}
                          />
                        ) : (
                          <input
                            type="text"
                            value={profileForm[field.key] || ''}
                            onChange={(e) => setProfileForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          />
                        )}
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={async () => {
                          try {
                            await api.updateCoachingProfile(coachingClientId, profileForm);
                            setClient((prev) => ({ ...prev, ...profileForm }));
                            setEditingProfile(false);
                          } catch (e) {
                            alert('Failed to save: ' + e.message);
                          }
                        }}
                      >
                        Save
                      </button>
                      <button className="btn btn--ghost btn--sm" onClick={() => setEditingProfile(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="coaching-profile-view">
                    <div className="coaching-profile-row"><span>Name:</span> <strong>{client.name}</strong></div>
                    <div className="coaching-profile-row"><span>Email:</span> <strong>{client.email || '--'}</strong></div>
                    <div className="coaching-profile-row"><span>Phone:</span> <strong>{client.phone || '--'}</strong></div>
                    <div className="coaching-profile-row"><span>Business:</span> <strong>{client.business || '--'}</strong></div>
                    <div className="coaching-profile-row"><span>Type:</span> <strong>{client.coachingType || '--'}</strong></div>
                    <div className="coaching-profile-row"><span>Status:</span> <strong>{client.status || '--'}</strong></div>
                    <div className="coaching-profile-row"><span>Contract:</span> <strong>{formatDate(client.contractStart)} — {formatDate(client.contractEnd)}</strong></div>
                    <div className="coaching-profile-row"><span>Sessions:</span> <strong>{client.sessionsUsed || 0} / {client.totalSessions || 0}</strong></div>
                    {client.bio && <div className="coaching-profile-row" style={{ flexDirection: 'column' }}><span>Bio:</span> <p>{client.bio}</p></div>}
                    {client.notes && <div className="coaching-profile-row" style={{ flexDirection: 'column' }}><span>Notes:</span> <p>{client.notes}</p></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Bio / Notes */}
      {client.bio && activeTab === 'overview' && (
        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card__header"><h3>Client Bio</h3></div>
          <div className="card__body"><p>{client.bio}</p></div>
        </div>
      )}
      {client.notes && activeTab === 'overview' && (
        <div className="card" style={{ marginTop: '12px' }}>
          <div className="card__header"><h3>Notes</h3></div>
          <div className="card__body"><p>{client.notes}</p></div>
        </div>
      )}
    </div>
  );
}
