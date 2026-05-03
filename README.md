# 🚀 Taskify — Modern Team Task Manager

[![Railway Deployment](https://img.shields.io/badge/Deployed%20with-Railway-blueviolet?style=flat-square)](https://railway.app)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)](https://github.com/Aryan717317/Ethara.AI-Team-Task-Manager-web-app)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**Taskify** is a high-performance, full-stack team collaboration platform designed for modern workflows. Built with the **MERN stack** (MongoDB, Express, React, Node.js), it provides a seamless interface for managing projects, tracking tasks with Kanban boards, and monitoring team productivity through role-aware dashboards.

---

## ✨ Key Features

### 🏢 Project & Team Management
- **Role-Based Access Control (RBAC):** Distinct permissions for **Admins** (full control) and **Members** (task-focused access).
- **Team Workspace:** Centralized hub for managing user roles, project memberships, and team-wide productivity.
- **Dynamic Project Stats:** Real-time calculation of project completion rates, overdue tasks, and workload distribution.

### 📋 Task Lifecycle
- **Kanban Boards:** Visualize progress with intuitive Drag-and-Drop style columns (To Do, In Progress, Done).
- **Task Granularity:** Set priorities (High, Medium, Low), due dates, and assign specific team members to each task.
- **Overdue Alerts:** Automatic highlighting of overdue tasks to ensure nothing falls through the cracks.

### 📊 Intelligence & UI
- **Unified Dashboard:** Personalized view showing "My Tasks," active projects, and critical performance metrics.
- **Modern Aesthetics:** Built with **Tailwind CSS** using a premium "Glassmorphism" aesthetic and smooth micro-animations.
- **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile workflows.

---

## 🛠 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Lightning-fast UI development & HMR |
| **Styling** | Tailwind CSS v3 | Utility-first responsive design |
| **Backend** | Node.js + Express | Robust RESTful API architecture |
| **Database** | MongoDB + Mongoose | Flexible document-based data modeling |
| **Auth** | JWT + bcrypt | Secure password hashing & stateless sessions |
| **Validation** | Zod | Schema-first request & response validation |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 1. Clone & Install
```bash
git clone https://github.com/Aryan717317/Ethara.AI-Team-Task-Manager-web-app.git
cd Ethara.AI-Team-Task-Manager-web-app
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MONGODB_URI and JWT_SECRET
npm run seed   # Create default admin: admin@taskify.com / password123
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
# Update VITE_API_URL to http://localhost:5000/api
npm run dev
```

---

## ☁️ Deployment Guide (Railway)

### 1. Database Provisioning
In Railway, click **New** -> **Database** -> **Add MongoDB**. Copy the `MONGODB_URI`.

### 2. Backend Service
- Add a new GitHub service pointing to your repo.
- **Root Directory:** `/backend`
- **Environment Variables:**
  - `PORT`: `5000`
  - `MONGODB_URI`: (Your Railway MongoDB URI)
  - `JWT_SECRET`: (Generate a random string)
  - `CLIENT_URL`: `https://your-frontend-domain.up.railway.app`

### 3. Frontend Service
- Add another instance of the GitHub repo.
- **Root Directory:** `/frontend`
- **Environment Variables:**
  - `VITE_API_URL`: `https://your-backend-domain.up.railway.app/api`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npx serve -s dist -l 3000`

---

## 🛡 API Architecture (RBAC)

| Method | Endpoint | Auth | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | 🔓 | Public | Join the platform |
| `GET` | `/projects` | 🔒 | Member/Admin | View accessible projects |
| `POST` | `/projects` | 🔒 | Admin | Create a new project |
| `POST` | `/tasks` | 🔒 | Admin | Assign new team tasks |
| `PATCH` | `/tasks/:id` | 🔒 | Assignee/Admin | Update task status |
| `GET` | `/users` | 🔒 | Admin | Manage team directory |

---

## 👤 Author

**Aryan Bharat Kumar**
- GitHub: [@Aryan717317](https://github.com/Aryan717317)
- University Acc: 22BAI71264@cuchd.in

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
