// src/components/UserVisualization.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Colors for Pie chart

function UserVisualization() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/all'); // Adjust backend URL
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (userData.length === 0) {
    return <p>No users found.</p>;
  }

  // Prepare data for age graph (Bar Chart)
  const ageData = userData.map(user => ({
    name: user.name,
    age: user.age
  }));

  // Prepare data for gender graph (Pie Chart)
  const genderData = [
    { name: 'Male', value: userData.filter(user => user.gender === 'Male').length },
    { name: 'Female', value: userData.filter(user => user.gender === 'Female').length },
    { name: 'Other', value: userData.filter(user => user.gender === 'Other').length }
  ];

  // Prepare data for state graph (Bar Chart for states)
  const stateData = [
    { state: 'Tamil Nadu', count: userData.filter(user => user.state === 'Tamil Nadu').length },
    { state: 'Kerala', count: userData.filter(user => user.state === 'Kerala').length },
    { state: 'Karnataka', count: userData.filter(user => user.state === 'Karnataka').length },
    { state: 'AP', count: userData.filter(user => user.state === 'AP').length },
    { state: 'Maharashtra', count: userData.filter(user => user.state === 'Maharashtra').length },
    { state: 'Gujarat', count: userData.filter(user => user.state === 'Gujarat').length },
    { state: 'West Bengal', count: userData.filter(user => user.state === 'West Bengal').length },
    { state: 'Rajasthan', count: userData.filter(user => user.state === 'Rajasthan').length },
    { state: 'Punjab', count: userData.filter(user => user.state === 'Punjab').length },
    { state: 'Delhi', count: userData.filter(user => user.state === 'Delhi').length },
    { state: 'UP', count: userData.filter(user => user.state === 'UP').length },
    { state: 'Madhya Pradesh', count: userData.filter(user => user.state === 'Madhya Pradesh').length },
    { state: 'Bihar', count: userData.filter(user => user.state === 'Bihar').length },
    { state: 'Odisha', count: userData.filter(user => user.state === 'Odisha').length },
    { state: 'Haryana', count: userData.filter(user => user.state === 'Haryana').length }
    
  ];

  return (
    <div className="user-visualization-container">
      <h2>User Data Visualization</h2>

      {/* Bar Chart for Ages */}
      <h3>Users' Age Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="age" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart for Gender Distribution */}
      <h3>Gender Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={genderData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart for State Distribution */}
      <h3>State Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stateData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserVisualization;

