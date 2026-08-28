/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Gujarat', 
  'Kerala', 'AP', 'West Bengal', 'Punjab', 'Rajasthan', 
  'Haryana', 'UP', 'Bihar', 'Madhya Pradesh', 'Odisha'
];

const DEPARTMENTS = [
  'Engineering', 'Data & AI', 'Product', 'Design', 
  'Sales', 'Marketing', 'HR', 'Finance'
];

const EmployeeModal = ({ isOpen, onClose, employeeToEdit, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: 'Software Engineer',
    age: '',
    experience: '',
    salary: '',
    state: 'Karnataka',
    gender: 'Male',
    skills: ''
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name || '',
        email: employeeToEdit.email || '',
        department: employeeToEdit.department || 'Engineering',
        role: employeeToEdit.role || '',
        age: employeeToEdit.age || '',
        experience: employeeToEdit.experience || '',
        salary: employeeToEdit.salary || '',
        state: employeeToEdit.state || 'Karnataka',
        gender: employeeToEdit.gender || 'Male',
        skills: Array.isArray(employeeToEdit.skills) ? employeeToEdit.skills.join(', ') : ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
        role: 'Software Engineer',
        age: 26,
        experience: 3,
        salary: 900000,
        state: 'Karnataka',
        gender: 'Male',
        skills: 'React, Node.js, SQL'
      });
    }
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Process skills into array
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const payload = {
        ...formData,
        age: Number(formData.age),
        experience: Number(formData.experience),
        salary: Number(formData.salary),
        skills: skillsArray
      };

      if (employeeToEdit && employeeToEdit._id) {
        await axios.put(`${API_BASE_URL}/users/${employeeToEdit._id}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/users/add`, payload);
      }

      setSubmitting(false);
      onSaveSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving employee:', err);
      setError(err.response?.data?.error || 'Failed to save employee profile.');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-fade-in" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
              {employeeToEdit ? '✏️ Edit Talent Profile' : '➕ Add New Employee'}
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {employeeToEdit ? 'Update employee compensation, role and skills' : 'Enter new personnel details to sync with MongoDB database'}
            </span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}>✕</button>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'var(--danger-light)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', marginBottom: '16px', fontSize: '0.84rem', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="e.g. Aarav Sharma" />
            </div>

            <div className="form-group">
              <label className="form-label">Work Email *</label>
              <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="e.g. aarav@enterprise.com" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select name="department" className="form-select" value={formData.department} onChange={handleChange} required>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Job Title / Designation *</label>
              <input type="text" name="role" className="form-input" value={formData.role} onChange={handleChange} required placeholder="e.g. Senior Frontend Lead" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Age (Years) *</label>
              <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} required min="18" max="70" />
            </div>

            <div className="form-group">
              <label className="form-label">Experience (Years) *</label>
              <input type="number" name="experience" className="form-input" value={formData.experience} onChange={handleChange} required min="0" max="45" />
            </div>

            <div className="form-group">
              <label className="form-label">Annual CTC (₹) *</label>
              <input type="number" name="salary" className="form-input" value={formData.salary} onChange={handleChange} required min="100000" placeholder="e.g. 1500000" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">State / Location *</label>
              <select name="state" className="form-select" value={formData.state} onChange={handleChange} required>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gender *</label>
              <select name="gender" className="form-select" value={formData.gender} onChange={handleChange} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Key Competencies & Skills (Comma-separated)</label>
            <input type="text" name="skills" className="form-input" value={formData.skills} onChange={handleChange} placeholder="e.g. React, TypeScript, Docker, Kubernetes, AWS" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Persisting to DB...' : (employeeToEdit ? 'Save Changes' : 'Create Record')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
