/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <div className="brand-badge-icon">
          <span className="brand-glyph">✦</span>
        </div>
        <div className="brand-meta">
          <div className="brand-heading">
            <span className="brand-title">Workforce</span>
            <span className="brand-title-accent">Pulse</span>
            <span className="brand-version-tag">ENTERPRISE</span>
          </div>
          <span className="brand-tag">Workforce & Talent Intelligence Suite</span>
        </div>
      </div>

      <nav className="navbar-tabs">
        <button 
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Executive Dashboard</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'directory' ? 'active' : ''}`}
          onClick={() => setActiveTab('directory')}
        >
          <span className="tab-icon">🗂️</span>
          <span className="tab-label">Talent Directory</span>
        </button>
      </nav>

      <div className="navbar-actions">
        <button 
          className="btn btn-primary add-btn"
          onClick={onOpenAddModal}
          title="Add a new employee record to the database"
        >
          <span className="btn-plus">➕</span>
          <span>Add Employee</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
