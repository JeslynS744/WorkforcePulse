const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable CORS for cross-origin requests

// Sample mock HR data for automatic database initialization
const sampleEmployees = [
    { name: "Aarav Sharma", email: "aarav.sharma@enterprise.com", age: 29, state: "Karnataka", gender: "Male", department: "Engineering", role: "Senior Frontend Lead", experience: 7, salary: 1850000, skills: ["React", "TypeScript", "Redux", "Docker"] },
    { name: "Priya Patel", email: "priya.patel@enterprise.com", age: 26, state: "Gujarat", gender: "Female", department: "Data & AI", role: "Data Scientist", experience: 4, salary: 1400000, skills: ["Python", "TensorFlow", "SQL", "MongoDB"] },
    { name: "Rohan Verma", email: "rohan.verma@enterprise.com", age: 34, state: "Delhi", gender: "Male", department: "Engineering", role: "DevOps Engineer", experience: 9, salary: 2200000, skills: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
    { name: "Ananya Iyer", email: "ananya.iyer@enterprise.com", age: 24, state: "Tamil Nadu", gender: "Female", department: "Design", role: "UI/UX Designer", experience: 2, salary: 750000, skills: ["Figma", "UI/UX", "CSS", "Wireframing"] },
    { name: "Vikram Singh", email: "vikram.singh@enterprise.com", age: 38, state: "Punjab", gender: "Male", department: "Product", role: "Principal Product Manager", experience: 12, salary: 2800000, skills: ["Roadmapping", "Agile", "Analytics", "Strategy"] },
    { name: "Sneha Reddi", email: "sneha.reddi@enterprise.com", age: 27, state: "AP", gender: "Female", department: "Engineering", role: "Fullstack Developer", experience: 5, salary: 1250000, skills: ["Node.js", "React", "MongoDB", "Express"] },
    { name: "Karan Malhotra", email: "karan.malhotra@enterprise.com", age: 31, state: "Maharashtra", gender: "Male", department: "Sales", role: "Account Executive", experience: 6, salary: 1100000, skills: ["CRM", "Negotiation", "Salesforce", "Lead Gen"] },
    { name: "Diya Chatterjee", email: "diya.chatterjee@enterprise.com", age: 28, state: "West Bengal", gender: "Female", department: "Marketing", role: "Growth Marketer", experience: 5, salary: 980000, skills: ["SEO", "Google Analytics", "Content", "SEM"] },
    { name: "Kabir Das", email: "kabir.das@enterprise.com", age: 23, state: "Bihar", gender: "Male", department: "Engineering", role: "Junior Software Engineer", experience: 1, salary: 550000, skills: ["JavaScript", "HTML", "CSS", "Git"] },
    { name: "Meera Nair", email: "meera.nair@enterprise.com", age: 30, state: "Kerala", gender: "Female", department: "HR", role: "HR Business Partner", experience: 6, salary: 1050000, skills: ["Recruitment", "Employee Relations", "Payroll"] },
    { name: "Arjun Deshmukh", email: "arjun.deshmukh@enterprise.com", age: 33, state: "Maharashtra", gender: "Male", department: "Engineering", role: "Backend Architect", experience: 8, salary: 2100000, skills: ["Node.js", "Microservices", "Redis", "Docker"] },
    { name: "Kavya Menon", email: "kavya.menon@enterprise.com", age: 25, state: "Kerala", gender: "Female", department: "Data & AI", role: "ML Engineer", experience: 3, salary: 1150000, skills: ["Python", "PyTorch", "NLP", "Pandas"] },
    { name: "Siddharth Joshi", email: "siddharth.joshi@enterprise.com", age: 36, state: "Rajasthan", gender: "Male", department: "Finance", role: "Financial Controller", experience: 10, salary: 2400000, skills: ["Financial Modeling", "Budgeting", "Excel", "ERP"] },
    { name: "Tanya Kapoor", email: "tanya.kapoor@enterprise.com", age: 29, state: "Haryana", gender: "Female", department: "Product", role: "Technical Product Manager", experience: 6, salary: 1650000, skills: ["Scrum", "Jira", "API Specs", "User Stories"] },
    { name: "Aditya Bhat", email: "aditya.bhat@enterprise.com", age: 32, state: "Karnataka", gender: "Male", department: "Engineering", role: "Cloud Architect", experience: 8, salary: 2350000, skills: ["AWS", "Terraform", "Security", "Kubernetes"] },
    { name: "Neha Gupta", email: "neha.gupta@enterprise.com", age: 26, state: "UP", gender: "Female", department: "HR", role: "Talent Acquisition Specialist", experience: 3, salary: 720000, skills: ["Sourcing", "Interviewing", "Linkedin Recruiter"] },
    { name: "Rahul Saxena", email: "rahul.saxena@enterprise.com", age: 28, state: "Madhya Pradesh", gender: "Male", department: "Sales", role: "Enterprise Sales Rep", experience: 4, salary: 920000, skills: ["B2B Sales", "Cold Outreach", "Demos"] },
    { name: "Ishita Roy", email: "ishita.roy@enterprise.com", age: 27, state: "West Bengal", gender: "Female", department: "Design", role: "Product Designer", experience: 4, salary: 1080000, skills: ["Figma", "Design Systems", "Prototyping"] },
    { name: "Manish Kumar", email: "manish.kumar@enterprise.com", age: 35, state: "Bihar", gender: "Male", department: "Engineering", role: "QA Automation Lead", experience: 9, salary: 1750000, skills: ["Cypress", "Selenium", "Jest", "CI/CD"] },
    { name: "Pooja Reddy", email: "pooja.reddy@enterprise.com", age: 30, state: "AP", gender: "Female", department: "Marketing", role: "Brand Manager", experience: 6, salary: 1180000, skills: ["Campaigns", "Copywriting", "PR", "Social Media"] },
    { name: "Deepak Choudhary", email: "deepak.choudhary@enterprise.com", age: 37, state: "Rajasthan", gender: "Male", department: "Finance", role: "Senior Accountant", experience: 11, salary: 1600000, skills: ["Taxation", "Auditing", "Tally", "Compliance"] },
    { name: "Simran Kaur", email: "simran.kaur@enterprise.com", age: 25, state: "Punjab", gender: "Female", department: "Engineering", role: "Frontend Developer", experience: 2, salary: 800000, skills: ["React", "JavaScript", "TailwindCSS"] },
    { name: "Yash Mehta", email: "yash.mehta@enterprise.com", age: 31, state: "Gujarat", gender: "Male", department: "Product", role: "UX Researcher", experience: 7, salary: 1500000, skills: ["User Interviews", "Usability Testing", "Analytics"] },
    { name: "Varun Bansal", email: "varun.bansal@enterprise.com", age: 29, state: "Delhi", gender: "Male", department: "Data & AI", role: "Data Engineer", experience: 5, salary: 1550000, skills: ["Spark", "SQL", "Airflow", "Python"] },
    { name: "Ritu Sunu", email: "ritu.sunu@enterprise.com", age: 27, state: "Odisha", gender: "Female", department: "HR", role: "People Operations Manager", experience: 4, salary: 890000, skills: ["HRIS", "Onboarding", "Policy"] }
];

// API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Connect to MongoDB (support Cloud Atlas, Docker Compose & Local fallback)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userinfo';

mongoose.connect(mongoURI)
    .then(async () => {
        console.log(`Connected to MongoDB at ${mongoURI}`);
        // Auto-seed if database is currently empty
        try {
            const count = await User.countDocuments();
            if (count === 0) {
                await User.insertMany(sampleEmployees);
                console.log(`Auto-seeded ${sampleEmployees.length} initial HR records into database!`);
            }
        } catch (seedErr) {
            console.error('Error during auto-seeding:', seedErr);
        }
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
