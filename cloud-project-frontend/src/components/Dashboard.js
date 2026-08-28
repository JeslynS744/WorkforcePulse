/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

// Curated Warm Sand & Emerald palette
const PALETTE = ['#0f766e', '#b45309', '#15803d', '#6d28d9', '#0369a1', '#be123c', '#78716c', '#047857'];

const Dashboard = ({ refreshKey }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/users/stats`);
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics stats:', err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [refreshKey, fetchStats]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="custom-spinner"></div>
        <p className="loading-text">Synthesizing Workforce Intelligence...</p>
      </div>
    );
  }

  if (!stats || stats.totalEmployees === 0) {
    return (
      <div className="dashboard-empty glass-card animate-fade-in">
        <div className="empty-icon">🏢</div>
        <h2>No Workforce Records Found</h2>
        <p>Your database is currently empty. Click <strong>"➕ Add Employee"</strong> in the top header to begin building your organization directory!</p>
      </div>
    );
  }

  // Filter local analytics data if user changes filter controls
  let filteredSalaryData = stats.salaryExpData || [];
  if (selectedDept !== 'All') {
    filteredSalaryData = filteredSalaryData.filter(d => d.department === selectedDept);
  }

  const formatSalaryLakhs = (val) => `₹ ${(val / 100000).toFixed(1)} L`;

  const tooltipStyle = {
    backgroundColor: '#1c1917',
    borderColor: '#44403c',
    borderRadius: '10px',
    color: '#fafaf9',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.25)',
    fontSize: '0.82rem',
    padding: '10px 14px'
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Executive Overview Header */}
      <div className="dashboard-header-card glass-card">
        <div className="header-left">
          <div className="status-indicator-pill">
            <span className="live-dot"></span>
            <span>Real-Time Database Sync</span>
          </div>
          <h1 className="dashboard-title">Executive Workforce Intelligence</h1>
          <p className="dashboard-subtitle">
            Comprehensive headcount distribution, compensation benchmarking, and regional talent analytics.
          </p>
        </div>
        <div className="header-stat-badge">
          <span className="header-stat-label">Active Records</span>
          <span className="header-stat-num">{stats.totalEmployees}</span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="kpi-grid">
        <div className="kpi-card glass-card kpi-emerald">
          <div className="kpi-icon icon-emerald">👥</div>
          <div className="kpi-info">
            <span className="kpi-label">Total Headcount</span>
            <span className="kpi-value">{stats.totalEmployees}</span>
            <span className="kpi-sub">Across {stats.departmentData.length} Departments</span>
          </div>
        </div>

        <div className="kpi-card glass-card kpi-green">
          <div className="kpi-icon icon-green">💼</div>
          <div className="kpi-info">
            <span className="kpi-label">Average Annual CTC</span>
            <span className="kpi-value">{formatSalaryLakhs(stats.avgSalary)}</span>
            <span className="kpi-sub">Organization Wide Median</span>
          </div>
        </div>

        <div className="kpi-card glass-card kpi-amber">
          <div className="kpi-icon icon-amber">🏢</div>
          <div className="kpi-info">
            <span className="kpi-label">Leading Department</span>
            <span className="kpi-value">{stats.topDepartment}</span>
            <span className="kpi-sub">Largest Team Share</span>
          </div>
        </div>

        <div className="kpi-card glass-card kpi-purple">
          <div className="kpi-icon icon-purple">📍</div>
          <div className="kpi-info">
            <span className="kpi-label">Regional Footprint</span>
            <span className="kpi-value">{stats.stateCount} States</span>
            <span className="kpi-sub">Geographic Coverage</span>
          </div>
        </div>
      </div>

      {/* Global Interactive Filter Bar */}
      <div className="filter-bar glass-card">
        <div className="filter-left">
          <span className="filter-badge">⚡ Interactive Slice:</span>
          <div className="filter-group">
            <label htmlFor="dept-filter-select">Department:</label>
            <select 
              id="dept-filter-select"
              className="form-select" 
              value={selectedDept} 
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments ({stats.totalEmployees})</option>
              <option value="Engineering">Engineering</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        {selectedDept !== 'All' && (
          <button className="btn btn-secondary btn-sm" onClick={() => setSelectedDept('All')}>
            Reset Filter
          </button>
        )}
      </div>

      {/* Modern Charts Grid */}
      <div className="charts-grid">
        {/* Chart 1: Salary vs Experience */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div className="chart-title-row">
              <h3>📈 Compensation vs Experience Progression</h3>
              <span className="chart-tag">CTC Scale</span>
            </div>
            <span className="chart-desc">Annual salary benchmarks (₹ Lakhs) correlated by tenure</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={filteredSalaryData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="experience" name="Experience" unit=" yrs" stroke="var(--chart-axis)" fontSize={12} />
                <YAxis dataKey="salary" name="Salary" unit=" L" stroke="var(--chart-axis)" fontSize={12} />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(val, name, item) => [`₹ ${val} Lakhs/yr (${item.payload.role})`, 'Compensation']}
                  labelFormatter={(exp) => `Experience: ${exp} years`}
                />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
                <Bar dataKey="salary" name="Annual Salary (₹ Lakhs)" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Headcount Donut */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div className="chart-title-row">
              <h3>🍩 Department Headcount Share</h3>
              <span className="chart-tag">Team Mix</span>
            </div>
            <span className="chart-desc">Proportional distribution across business divisions</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={stats.departmentData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={108}
                  paddingAngle={4}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {stats.departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Regional Talent Heatmap */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div className="chart-title-row">
              <h3>🗺️ Geographic Talent Footprint</h3>
              <span className="chart-tag">Locations</span>
            </div>
            <span className="chart-desc">Regional employee concentration across states</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.stateData} margin={{ top: 10, right: 10, bottom: 25, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="state" stroke="var(--chart-axis)" fontSize={11} angle={-25} textAnchor="end" interval={0} height={50} />
                <YAxis stroke="var(--chart-axis)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" name="Employees" fill="#b45309" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Top Skillset Inventory */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div className="chart-title-row">
              <h3>⚡ Core Skillset Inventory</h3>
              <span className="chart-tag">Capabilities</span>
            </div>
            <span className="chart-desc">Most prevalent technical & domain proficiencies</span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.skillsData} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis type="number" stroke="var(--chart-axis)" fontSize={12} allowDecimals={false} />
                <YAxis dataKey="skill" type="category" stroke="var(--chart-axis)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" name="Proficient Employees" fill="#15803d" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
