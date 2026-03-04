import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { api } from '../lib/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getAnalytics()
      .then((data) => {
        setAnalytics(data.analytics || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load analytics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (analytics.length === 0) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <h2>Analytics</h2>
        </div>
        <div className="empty-state-card">
          <p>No analytics data available yet. Data will appear here once your campaigns are running.</p>
        </div>
      </div>
    );
  }

  // Sort by date ascending for charts
  const sorted = [...analytics].sort((a, b) => (a.date > b.date ? 1 : -1));

  // Last 30 days engagement over time
  const last30 = sorted.slice(-30);
  const engagementLineData = {
    labels: last30.map((a) => {
      if (!a.date) return '';
      const d = new Date(a.date);
      return d.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Engagement',
        data: last30.map((a) => a.engagement || 0),
        borderColor: '#C5A55A',
        backgroundColor: 'rgba(197, 165, 90, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'Impressions',
        data: last30.map((a) => a.impressions || 0),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true, font: { family: 'Inter', size: 12 } },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
    },
  };

  // Platform comparison (bar chart)
  const platformData = {};
  analytics.forEach((a) => {
    if (!a.platform) return;
    if (!platformData[a.platform]) {
      platformData[a.platform] = { impressions: 0, engagement: 0, count: 0 };
    }
    platformData[a.platform].impressions += a.impressions || 0;
    platformData[a.platform].engagement += a.engagement || 0;
    platformData[a.platform].count++;
  });

  const platformLabels = Object.keys(platformData);
  const barData = {
    labels: platformLabels,
    datasets: [
      {
        label: 'Impressions',
        data: platformLabels.map((p) => platformData[p].impressions),
        backgroundColor: '#C5A55A',
        borderRadius: 6,
      },
      {
        label: 'Engagement',
        data: platformLabels.map((p) => platformData[p].engagement),
        backgroundColor: '#2D2D2D',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true, font: { family: 'Inter', size: 12 } },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
    },
  };

  // Summary metrics
  const totalReach = analytics.reduce((sum, a) => sum + (a.reach || 0), 0);
  const totalImpressions = analytics.reduce((sum, a) => sum + (a.impressions || 0), 0);
  const avgEngRate =
    analytics.length > 0
      ? (analytics.reduce((sum, a) => sum + (a.engagementRate || 0), 0) / analytics.length).toFixed(2)
      : '0';
  const totalClicks = analytics.reduce((sum, a) => sum + (a.clicks || 0), 0);

  // Best day of week
  const dayEngagement = {};
  analytics.forEach((a) => {
    if (!a.date) return;
    const day = new Date(a.date).toLocaleDateString('en-US', { weekday: 'long' });
    dayEngagement[day] = (dayEngagement[day] || 0) + (a.engagement || 0);
  });
  const bestDay =
    Object.keys(dayEngagement).length > 0
      ? Object.entries(dayEngagement).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  // Top 10 performing content
  const topContent = [...analytics]
    .filter((a) => a.contentTitle)
    .sort((a, b) => (b.engagement || 0) - (a.engagement || 0))
    .slice(0, 10);

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h2>Analytics</h2>
        <p className="page-subtitle">Performance data across all your marketing channels.</p>
      </div>

      {/* Summary Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card__label">Total Reach</div>
          <div className="metric-card__value">{totalReach.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Total Impressions</div>
          <div className="metric-card__value">{totalImpressions.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Avg Engagement Rate</div>
          <div className="metric-card__value">{avgEngRate}%</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Total Clicks</div>
          <div className="metric-card__value">{totalClicks.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-card__label">Best Day</div>
          <div className="metric-card__value metric-card__value--text">{bestDay}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card">
          <div className="card__header">
            <h3>Engagement Over Time</h3>
            <span className="card__badge">Last 30 entries</span>
          </div>
          <div className="card__body">
            <div className="chart-container chart-container--line">
              <Line data={engagementLineData} options={lineOptions} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3>Platform Comparison</h3>
          </div>
          <div className="card__body">
            <div className="chart-container chart-container--bar">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Content Table */}
      {topContent.length > 0 && (
        <div className="card card--full">
          <div className="card__header">
            <h3>Top Performing Content</h3>
          </div>
          <div className="card__body">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Content</th>
                    <th>Platform</th>
                    <th>Date</th>
                    <th>Impressions</th>
                    <th>Engagement</th>
                    <th>Eng. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topContent.map((item, i) => (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.contentTitle}</td>
                      <td>
                        <span className="platform-badge">{item.platform}</span>
                      </td>
                      <td>{item.date}</td>
                      <td>{(item.impressions || 0).toLocaleString()}</td>
                      <td>{(item.engagement || 0).toLocaleString()}</td>
                      <td>{item.engagementRate ? `${item.engagementRate}%` : '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
