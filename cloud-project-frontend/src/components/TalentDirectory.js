/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './TalentDirectory.css';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #2563eb, #38bdf8)',
  'linear-gradient(135deg, #059669, #34d399)',
  'linear-gradient(135deg, #7c3aed, #c084fc)',
  'linear-gradient(135deg, #d97706, #fbbf24)',
  'linear-gradient(135deg, #e11d48, #fb7185)',
  'linear-gradient(135deg, #0891b2, #67e8f9)',
  'linear-gradient(135deg, #4f46e5, #818cf8)'
];

const TalentDirectory = ({ onOpenAddModal, onEditEmployee, refreshKey, triggerRefresh }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (deptFilter !== 'All') params.department = deptFilter;
      if (stateFilter !== 'All') params.state = stateFilter;

      const res = await axios.get(`${API_BASE_URL}/users/all`, { params });
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setLoading(false);
    }
  }, [search, deptFilter, stateFilter]);

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey, fetchEmployees]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the talent directory?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        triggerRefresh();
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert('Failed to delete employee record.');
      }
    }
  };

  const getDepartmentBadgeClass = (dept) => {
    switch (dept) {
      case 'Engineering': return 'badge-engineering';
      case 'Data & AI': return 'badge-data';
      case 'Design': return 'badge-design';
      case 'Product': return 'badge-product';
      case 'Sales': return 'badge-sales';
      case 'Marketing': return 'badge-marketing';
      case 'HR': return 'badge-hr';
      case 'Finance': return 'badge-finance';
      default: return 'badge-default';
    }
  };

  const formatSalary = (val) => {
    if (!val) return '₹ 0';
    return `₹ ${(val / 100000).toFixed(2)} L/yr`;
  };

  const getInitials = (name) => {
    if (!name) return 'EP';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarBg = (name) => {
    if (!name) return AVATAR_GRADIENTS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % AVATAR_GRADIENTS.length;
    return AVATAR_GRADIENTS[idx];
  };

  return (
    <div className="directory-container animate-fade-in">
      {/* Directory Filter Bar */}
      <div className="directory-header glass-card">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by name, role, email, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        <div className="filter-controls">
          <select className="form-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Data & AI">Data & AI</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <select className="form-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="All">All Locations</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Kerala">Kerala</option>
            <option value="Punjab">Punjab</option>
            <option value="AP">AP</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <span>➕</span> Add Employee
          </button>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="table-card glass-card">
        <div className="table-summary-bar">
          <div className="summary-text">
            <span>Workforce Directory</span>
            <span className="summary-count-badge">{employees.length} Records</span>
          </div>
          {(search || deptFilter !== 'All' || stateFilter !== 'All') && (
            <span className="active-filter-indicator">Filtered View Active</span>
          )}
        </div>

        {loading ? (
          <div className="table-loading">
            <div className="custom-spinner"></div>
            <span>Fetching talent records...</span>
          </div>
        ) : employees.length === 0 ? (
          <div className="table-empty">
            <div className="empty-table-icon">👥</div>
            <h4>No Employee Profiles Found</h4>
            <p>Try clearing your search query or filter selections.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="talent-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role & Division</th>
                  <th>Tenure / Age</th>
                  <th>Annual CTC</th>
                  <th>Location</th>
                  <th>Key Skills</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar-circle" style={{ background: getAvatarBg(emp.name) }}>
                          {getInitials(emp.name)}
                        </div>
                        <div className="user-details">
                          <span className="user-name">{emp.name}</span>
                          <span className="user-email">{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-cell">
                        <span className="user-role">{emp.role}</span>
                        <span className={`badge ${getDepartmentBadgeClass(emp.department)}`}>
                          {emp.department}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="exp-cell">
                        <span className="exp-highlight">{emp.experience || 0} yrs exp</span>
                        <span className="age-sub">{emp.age} yrs old</span>
                      </div>
                    </td>
                    <td>
                      <span className="salary-badge">{formatSalary(emp.salary)}</span>
                    </td>
                    <td>
                      <span className="location-pill">📍 {emp.state}</span>
                    </td>
                    <td>
                      <div className="skills-pill-group">
                        {Array.isArray(emp.skills) && emp.skills.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="skill-pill">{s}</span>
                        ))}
                        {Array.isArray(emp.skills) && emp.skills.length > 3 && (
                          <span className="skill-pill-more">+{emp.skills.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-btn-group">
                        <button className="action-btn edit-action" onClick={() => onEditEmployee(emp)} title="Edit Record">
                          ✏️
                        </button>
                        <button className="action-btn delete-action" onClick={() => handleDelete(emp._id, emp.name)} title="Delete Record">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentDirectory;
