// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    state: { type: String, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true, default: 'Engineering' },
    role: { type: String, required: true, default: 'Software Engineer' },
    experience: { type: Number, required: true, default: 2 },
    salary: { type: Number, required: true, default: 600000 },
    skills: { type: [String], default: [] }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;