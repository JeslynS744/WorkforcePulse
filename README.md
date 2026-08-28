# 🌿 WorkforcePulse — Enterprise Workforce & HR Intelligence Suite

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Docker-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

**WorkforcePulse** is an enterprise-grade, full-stack HR & Workforce Analytics platform built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides executive teams with real-time workforce headcount metrics, compensation benchmarking, interactive data slicing, and an intuitive talent directory with full CRUD capabilities.

Designed with a bespoke **Warm Sand & Forest Emerald** design language, modern typography, and responsive data visualizations powered by **Recharts**.

---

## ✨ Key Features

### 📊 Executive Workforce Dashboard
* **Real-Time KPI Metrics:** Instant calculation of total active headcount, organization-wide median annual CTC, top hiring division, and geographic footprint across states.
* **Compensation vs. Experience Progression:** Dynamic bar charts correlating annual compensation (in ₹ Lakhs) with years of professional experience.
* **Department Headcount Donut Chart:** Visual breakdown of employee distribution across business units (Engineering, Data & AI, Product, Design, Sales, Marketing, HR, Finance).
* **Geographic Talent Heatmap:** Regional headcount distribution across Indian states.
* **In-Demand Skillset Inventory:** Horizontal ranking of prevalent technical proficiencies (React, Python, Docker, AWS, Kubernetes, etc.).
* **Interactive Slicing & Filtering:** Filter analytics in real-time by department with instantaneous recalculation.

### 🗂️ Interactive Talent Directory
* **Search & Multi-Filter Engine:** Instant search across employee name, role, email, and specific skillset keywords.
* **Location & Division Filters:** Filter talent pools by Indian states and business departments.
* **Full CRUD Operations:** Add new employees, update existing compensation/roles, and remove records directly through a sleek modal interface.
* **Dynamic Avatar Avatars & Tags:** Algorithmic gradient avatars generated from employee names, soft tinted department badges, and formatted CTC chips.

### 🎨 Warm Sand & Forest Emerald Design System
* High-end, organic editorial aesthetic tailored for executive decision-making.
* Pure vanilla CSS design tokens (no bulky third-party CSS frameworks).
* Crisp typography combining **Outfit** and **Plus Jakarta Sans**.
* Fully responsive across mobile, tablet, and widescreen desktop monitors.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Recharts (Data Visualizations), Axios, Custom CSS Tokens, HTML5 |
| **Backend** | Node.js, Express.js REST API, Mongoose ODM, CORS |
| **Database** | MongoDB (Cloud MongoDB Atlas / Local MongoDB 7.0 Container) |
| **Containerization** | Docker, Docker Compose |
| **Deployment** | Render.com (Single-URL Unified Full-Stack Service) |

---

## 📁 Repository Structure

```text
WorkforcePlus/
├── 📁 cloud-project-backend/         # Express.js REST API Server
│   ├── 📁 models/                   # Mongoose Database Schemas (User.js)
│   ├── 📁 routes/                   # API Route Handlers (userRoutes.js)
│   ├── 📄 Dockerfile                # Backend Container Configuration
│   ├── 📄 package.json              # Backend Dependencies & Scripts
│   └── 📄 server.js                 # Express Application Entrypoint
│
├── 📁 cloud-project-frontend/        # React.js Single Page Application
│   ├── 📁 public/                   # Static HTML Template & Assets
│   ├── 📁 src/
│   │   ├── 📁 components/           # UI Components (Dashboard, Navbar, TalentDirectory, Modal)
│   │   ├── 📄 App.js                # Core App Component & State Management
│   │   ├── 📄 config.js             # API Endpoint Configuration (Cloud & Local)
│   │   ├── 📄 index.css             # Warm Sand & Emerald Design System
│   │   └── 📄 index.js              # React DOM Entrypoint
│   ├── 📄 Dockerfile                # Frontend Container Configuration
│   └── 📄 package.json              # Frontend Dependencies & Build Scripts
│
├── 📄 .gitignore                    # Git Ignore Rules (ignores node_modules & builds)
├── 📄 docker-compose.yml            # Multi-Container Orchestration (Mongo, Backend, Frontend)
├── 📄 package.json                  # Root Monorepo Scripts for Render Deployment
└── 📄 README.md                     # Documentation & Setup Guide
```

---

## 🚀 Running Locally

### Option 1: Using Docker Compose (Recommended - Zero Configuration)
Ensure Docker Desktop is installed and running, then execute:

```bash
# Clone the repository
git clone https://github.com/JeslynS744/WorkforcePlus.git
cd WorkforcePlus

# Build and start all 3 containers (MongoDB, Backend, Frontend)
docker-compose up --build
```

* **Frontend UI:** `http://localhost:3000`
* **Backend API:** `http://localhost:5000`
* **MongoDB Database:** `localhost:27017`

---

### Option 2: Manual Local Setup (Without Docker)

#### 1. Start the Backend:
```bash
cd cloud-project-backend
npm install
npm start
```
*(Backend runs on `http://localhost:5000`)*

#### 2. Start the Frontend:
```bash
cd ../cloud-project-frontend
npm install
npm start
```
*(Frontend opens automatically at `http://localhost:3000`)*

---

## 🌐 Cloud Deployment (Render Single-URL Setup)

This project is configured for **Single-URL Deployment** on Render where the Express backend builds and serves the React frontend alongside the API from one single domain.

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete workforce pulse app"
   git push -u origin main
   ```

2. Open **[Render.com](https://dashboard.render.com)** and create a new **Web Service**.
3. Connect your **`WorkforcePlus`** repository and configure:
   * **Root Directory:** *(Leave blank)*
   * **Runtime:** `Node`
   * **Build Command:** `npm run build`
   * **Start Command:** `npm start`
   * **Instance Type:** `Free`

4. Add your **Environment Variable**:
   * **Key:** `MONGODB_URI`
   * **Value:** `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/workforce?retryWrites=true&w=majority`

5. Click **Deploy Web Service**. Render will generate your live production URL:
   ```text
   https://workforce-plus.onrender.com
   ```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users/stats` | Fetches aggregated workforce analytics (KPIs, department share, salary correlation, skills inventory) |
| `GET` | `/users/all` | Retrieves employee list with optional query parameters (`search`, `department`, `state`) |
| `POST` | `/users/add` | Creates a new employee record in MongoDB |
| `PUT` | `/users/:id` | Updates an existing employee profile |
| `DELETE` | `/users/:id` | Deletes an employee from the directory |

---

## 📄 License
This project is developed for educational and enterprise workforce intelligence demonstration.
