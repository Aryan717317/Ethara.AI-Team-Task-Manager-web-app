# Taskify — Team Task Manager

A production-ready, full-stack team task management web app with role-based access control, project management, Kanban-style task boards, and role-aware dashboards.

## Features

- **Authentication** — Register/Login with JWT, first user gets Admin role
- **Role-Based Access Control** — Admin vs Member permissions enforced server & client side
- **Project Management** — Create projects, add/remove members, track progress
- **Task Management** — Full CRUD with priorities, due dates, assignees, status tracking
- **Kanban Board** — Visual task board with Todo / In Progress / Done columns
- **Dashboard** — Role-aware stats, overdue alerts, progress tracking
- **Team Management** — Admin panel for user roles and team overview

## Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcrypt |
| Validation | Zod |
| Env config | dotenv |

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| HTTP | Axios (interceptors) |
| Routing | React Router v6 |
| State | React Context |
| Notifications | react-hot-toast |

## Local Development

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:5173`.

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret (min 32 chars) |
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS |
| `NODE_ENV` | `development` or `production` |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

## API Routes

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| POST | `/api/auth/register` | — | — | Create account |
| POST | `/api/auth/login` | — | — | Login |
| GET | `/api/auth/me` | ✅ | Any | Get current user |
| GET | `/api/projects` | ✅ | Any | List projects (scoped) |
| POST | `/api/projects` | ✅ | Admin | Create project |
| GET | `/api/projects/:id` | ✅ | Any | Get project + stats |
| PATCH | `/api/projects/:id` | ✅ | Admin | Update project |
| DELETE | `/api/projects/:id` | ✅ | Admin | Delete project |
| POST | `/api/projects/:id/members` | ✅ | Admin | Add member |
| DELETE | `/api/projects/:id/members/:userId` | ✅ | Admin | Remove member |
| GET | `/api/tasks/my` | ✅ | Any | My assigned tasks |
| GET | `/api/tasks/project/:projectId` | ✅ | Any | Tasks in project |
| POST | `/api/tasks/project/:projectId` | ✅ | Admin | Create task |
| PATCH | `/api/tasks/:id` | ✅ | Any | Update task |
| DELETE | `/api/tasks/:id` | ✅ | Admin | Delete task |
| GET | `/api/users` | ✅ | Admin | List all users |
| PATCH | `/api/users/:id/role` | ✅ | Admin | Change user role |
| GET | `/api/dashboard` | ✅ | Any | Dashboard stats |

## Deployment (Railway)

1. Push to GitHub
2. Create Railway project with MongoDB Atlas
3. Add backend service (root: `/backend`)
4. Add frontend service (root: `/frontend`)
5. Set environment variables on each service

## Author

Aryan Bharat Kumar

## License

MIT
