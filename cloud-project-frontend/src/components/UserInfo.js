// src/components/UserInfo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserInfo.css';
import axios from 'axios'; // Make sure to import axios

const UserInfo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        state: '',
        gender: ''
    });

    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/add', formData);
            console.log(response.data); // Log the response for debugging
            setSuccessMessage('User data added successfully!'); // Set success message
        } catch (error) {
            console.error('Error adding user:', error);
            setSuccessMessage('Failed to add user.'); // Set error message
        }
    };

    const handleViewVisualization = () => {
        navigate('/visualization'); // Use navigate to go to the visualization page
    };

    return (
        <div className="user-info-container">
            <h2>User Information</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>State</label>
                <select name="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="AP">AP</option>
                    <option value="Bihar">Bihar</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="UP">UP</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                </select>

                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <button type="submit">Submit</button>
            </form>

            {/* Success Message */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Visualization Button */}
            <button onClick={handleViewVisualization} style={{ marginTop: '10px' }}>
                View Visualization
            </button>
        </div>
    );
};

export default UserInfo;
