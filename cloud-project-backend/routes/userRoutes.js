// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

// Mock data generator for initial seeding
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

// Route to add a new user / employee
router.post('/add', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to create user' });
    }
});

// Route to fetch all users (with optional filtering & search)
router.get(['/all', '/'], async (req, res) => {
    try {
        const { search, department, state, gender } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { role: { $regex: search, $options: 'i' } },
                { skills: { $regex: search, $options: 'i' } }
            ];
        }
        if (department && department !== 'All') {
            query.department = department;
        }
        if (state && state !== 'All') {
            query.state = state;
        }
        if (gender && gender !== 'All') {
            query.gender = gender;
        }

        const users = await User.find(query).sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for HR Analytics & Recharts Statistics Aggregation
router.get('/stats', async (req, res) => {
    try {
        const users = await User.find();
        
        if (users.length === 0) {
            return res.json({
                totalEmployees: 0,
                avgSalary: 0,
                topDepartment: 'N/A',
                stateCount: 0,
                salaryExpData: [],
                departmentData: [],
                stateData: [],
                genderData: [],
                skillsData: []
            });
        }

        // 1. Core KPIs
        const totalEmployees = users.length;
        const totalSalary = users.reduce((sum, u) => sum + (u.salary || 0), 0);
        const avgSalary = Math.round(totalSalary / totalEmployees);
        const statesSet = new Set(users.map(u => u.state));

        // 2. Department Breakdown (Headcount & Total Payroll)
        const deptMap = {};
        users.forEach(u => {
            const dept = u.department || 'Engineering';
            if (!deptMap[dept]) deptMap[dept] = { count: 0, totalSalary: 0 };
            deptMap[dept].count += 1;
            deptMap[dept].totalSalary += (u.salary || 0);
        });

        const departmentData = Object.keys(deptMap).map(dept => ({
            name: dept,
            count: deptMap[dept].count,
            avgSalary: Math.round(deptMap[dept].totalSalary / deptMap[dept].count)
        })).sort((a, b) => b.count - a.count);

        const topDepartment = departmentData.length > 0 ? departmentData[0].name : 'N/A';

        // 3. Salary vs Experience Data Points
        const salaryExpData = users.map(u => ({
            name: u.name,
            experience: u.experience || 0,
            salary: Math.round((u.salary || 0) / 100000), // in Lakhs for clear chart reading
            actualSalary: u.salary,
            department: u.department,
            role: u.role
        })).sort((a, b) => a.experience - b.experience);

        // 4. State Distribution
        const stateMap = {};
        users.forEach(u => {
            const st = u.state || 'Unknown';
            stateMap[st] = (stateMap[st] || 0) + 1;
        });

        const stateData = Object.keys(stateMap).map(st => ({
            state: st,
            count: stateMap[st]
        })).sort((a, b) => b.count - a.count);

        // 5. Gender Distribution
        const genderMap = {};
        users.forEach(u => {
            const g = u.gender || 'Other';
            genderMap[g] = (genderMap[g] || 0) + 1;
        });
        const genderData = Object.keys(genderMap).map(g => ({
            name: g,
            value: genderMap[g]
        }));

        // 6. Skill Inventory Counts
        const skillMap = {};
        users.forEach(u => {
            if (Array.isArray(u.skills)) {
                u.skills.forEach(s => {
                    skillMap[s] = (skillMap[s] || 0) + 1;
                });
            }
        });
        const skillsData = Object.keys(skillMap)
            .map(s => ({ skill: s, count: skillMap[s] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8); // Top 8 skills

        res.json({
            totalEmployees,
            avgSalary,
            topDepartment,
            stateCount: statesSet.size,
            salaryExpData,
            departmentData,
            stateData,
            genderData,
            skillsData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user route
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'Employee not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user route
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully', id: req.params.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Seed Database Route
router.post('/seed', async (req, res) => {
    try {
        await User.deleteMany({}); // Reset database with fresh mock records
        const created = await User.insertMany(sampleEmployees);
        res.status(201).json({ message: `Successfully seeded ${created.length} HR records!`, count: created.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
