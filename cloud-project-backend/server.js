const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable CORS for cross-origin requests

// API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Connect to MongoDB (support Cloud Atlas, Docker Compose & Local fallback)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userinfo';

mongoose.connect(mongoURI)
    .then(() => {
        console.log(`Connected to MongoDB at ${mongoURI}`);
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Serve compiled React frontend files in Production (Single-URL Deployment)
const frontendBuildPath = path.join(__dirname, '../cloud-project-frontend/build');
const indexPath = path.join(frontendBuildPath, 'index.html');

if (fs.existsSync(frontendBuildPath)) {
    app.use(express.static(frontendBuildPath));
}

// Any request that doesn't match API routes returns the React Single-Page Application
app.get('*', (req, res) => {
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(200).send('Backend API is live! Frontend build is compiling or not found in build directory.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
