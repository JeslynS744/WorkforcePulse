import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TalentDirectory from './components/TalentDirectory';
import EmployeeModal from './components/EmployeeModal';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (emp) => {
    setEmployeeToEdit(emp);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={handleOpenAddModal}
      />

      <main className="main-content">
        {activeTab === 'dashboard' ? (
          <Dashboard refreshKey={refreshKey} />
        ) : (
          <TalentDirectory 
            onOpenAddModal={handleOpenAddModal}
            onEditEmployee={handleEditEmployee}
            refreshKey={refreshKey}
            triggerRefresh={triggerRefresh}
          />
        )}
      </main>

      <EmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeToEdit={employeeToEdit}
        onSaveSuccess={triggerRefresh}
      />
    </div>
  );
}

export default App;