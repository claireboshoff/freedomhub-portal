import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { api } from '../lib/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusColors = {
  Draft: '#94a3b8',
  Drafted: '#94a3b8',
  'Pending Approval': '#f59e0b',
  Pending: '#f59e0b',
  Approved: '#10b981',
  Scheduled: '#6366f1',
  Published: '#C5A55A',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [content, setContent] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [sentinel, setSentinel] = useState([]);
  const [approvalCount, setApprovalCount] = useState(0);

  useEffect(() => {
    Promise.all([
      api.getCampaigns().catch(() => ({ campaigns: [] })),
      api.getContent().catch(() => ({ content: [] })),
      api.getAnalytics().catch(() => ({ analytics: [] })),
      api.getSentinel().catch(() => ({ intel: [] })),
      api.getApprovals().catch(() => ({ approvals: [] })),
    ])
      .then(([campData, contentData, analyticsData, sentinelData, approvalData]) => {
        setCampaigns(campData.campaigns || []);
        setContent(contentData.content || []);
        setAnalytics(analyticsData.analytics || []);
        setSentinel(sentinelData.intel || []);
        setApprovalCount((approvalData.approvals || []).length);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Compute content status counts
  const statusCounts = {};
  content.forEach((item) => {
    const s = item.status || 'Unknown';
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });

  const statusLabels = Object.keys(statusCounts);
  const statusValues = Object.values(statusCounts);
  const statusBgColors = statusLabels.map((s) => statusColors[s] || '#cbd5e1');

  const doughnutData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusValues,
        backgroundColor: statusBgColors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true, font: { family: 'Inter', size: 12 } },
      },
    },
  };

  // Compute key metrics
  const totalImpressions = analytics.reduce((sum, a) => sum + (a.impressions || 0), 0);
  const totalEngagement = analytics.reduce((sum, a) => sum + (a.engagement || 0), 0);
  const avgEngagementRate =
    analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + (a.engagementRate || 0), 0) / analytics.length).toFixed(2)
      : '0';

  // Top platform
  const platformImpressions = {};
  analytics.forEach((a) => {
    if (a.platform) {
      platformImpressions[a.platform] = (platformImpressions[a.platform] || 0) + (a.impressions || 0);
    }
  });
  const topPlatform =
    Object.keys(platformImpressions).length > 0
      ? Object.entries(platformImpressions).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  // Active campaigns
  const activeCampaigns = campaigns.filter(
    (c) => c.status === 'Active' || c.status === 'In Progress' || c.status === 'Running'
  );

  // Recent sentinel items (top 3 high priority)
  const highPrioritySentinel = sentinel
    .filter((s) => s.priority === 'High' || s.priority === 'Critical' || s.priority === 'Urgent')
    .slice(0, 3);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p className="page-subtitle">Welcome back. Here is an overview of your marketing activity.</p>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card__label">Active Campaigns</div>
          <div className="metric-card__value">{activeCampaigns.length}</div>
          <div className="metric-card__sub">{campaigns.length} total</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Total Impressions</div>
          <div className="metric-card__value">{totalImpressions.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Avg Engagement Rate</div>
          <div className="metric-card__value">{avgEngagementRate}%</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Top Platform</div>
          <div className="metric-card__value metric-card__value--text">{topPlatform}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Content Status Chart */}
        <div className="card">
          <div className="card__header">
            <h3>Content Status</h3>
            <span className="card__badge">{content.length} items</span>
          </div>
          <div className="card__body">
            {content.length > 0 ? (
              <div className="chart-container chart-container--doughnut">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            ) : (
              <p className="empty-state">No content items yet</p>
            )}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card">
          <div className="card__header">
            <h3>Pending Approvals</h3>
            {approvalCount > 0 && <span className="card__badge card__badge--warning">{approvalCount}</span>}
          </div>
          <div className="card__body">
            {approvalCount > 0 ? (
              <>
                <p className="card__text">
                  You have <strong>{approvalCount}</strong> content item{approvalCount !== 1 ? 's' : ''} waiting for
                  your review.
                </p>
                <button className="btn btn--primary" onClick={() => navigate('/calendar')}>
                  View Pending Approvals
                </button>
              </>
            ) : (
              <p className="empty-state">All caught up -- no pending approvals.</p>
            )}
          </div>
        </div>

        {/* Sentinel Intel */}
        <div className="card card--full">
          <div className="card__header">
            <h3>Sentinel Intel Highlights</h3>
          </div>
          <div className="card__body">
            {highPrioritySentinel.length > 0 ? (
              <div className="intel-list">
                {highPrioritySentinel.map((item) => (
                  <div key={item.id} className="intel-item">
                    <div className="intel-item__header">
                      <span className={`intel-badge intel-badge--${(item.priority || '').toLowerCase()}`}>
                        {item.priority}
                      </span>
                      <span className="intel-item__category">{item.category}</span>
                      <span className="intel-item__date">{item.date}</span>
                    </div>
                    <h4 className="intel-item__title">{item.title}</h4>
                    <p className="intel-item__summary">{item.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No high-priority intel at this time.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
