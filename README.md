# TaskFlow — Modern MERN Stack Task Management Platform

<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" height="50" alt="React" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Dark.svg" height="50" alt="Tailwind CSS" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg" height="50" alt="NodeJS" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg" height="50" alt="MongoDB" />
  <br/>
  <h3>🚀 A Premium, High-Performance MERN Stack Task Orchestrator</h3>
  <p>Engineered with Modern Glassmorphism, Advanced State Synchronization, and an Adaptive Dual-Theme Engine.</p>
</div>

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Architecture & Design Aesthetics](#-architecture--design-aesthetics)
4. [Tech Stack Breakdown](#-tech-stack-breakdown)
5. [Project Structure](#-project-structure)
6. [API Interface & Endpoints](#-api-interface--endpoints)
7. [Environment Configuration](#-environment-configuration)
8. [Local Installation Guide](#-local-installation-guide)
9. [Deployment Protocols](#-deployment-protocols)
10. [Verification & Building](#-verification--building)

---

## 📖 Overview

**TaskFlow** is a premium, enterprise-ready full-stack Task Management Platform. Leveraging the high performance of **MongoDB**, **Express**, **React**, and **Node.js (MERN)**, it features a fluid Trello/Linear-inspired workspace dashboard. 

The application utilizes server-side query processing (paginating, filtering, and query debouncing) alongside robust **JWT-based sessions** and a custom-designed global state manager. The UI/UX is built using high-fidelity Vanilla CSS layers compiled via Tailwind CSS, offering an adaptive, eye-catching dual-theme experience.

---

## ✨ Key Features

### 🌑 Dual-Theme Engine (New!)
- **Dynamic Switcher**: Interactive Toggle Switch located in the main header navigation featuring smooth scaling animations on hover and tap.
- **System Preference Detection**: Automatically syncs the app context (`light` or `dark`) with local OS configuration on initial launch.
- **State Persistence**: Choice is cached directly inside `localStorage` ensuring seamless rendering across reload instances.
- **Glassmorphism Styling**: Fully upgraded design tokens featuring opaque white backdrops (`bg-white/95`) and strong blurs (`backdrop-blur-lg`) in light mode, preventing underlying content from bleeding through modal layouts.

### 🔐 Robust User Security
- **Bcrypt Password Salting**: Passwords are securely hashed on the server before database storage.
- **Stateful JWT Interceptor**: Authenticated requests carry standard Authorization Bearer Tokens. Sessions last for 30 days and are seamlessly protected via secure middleware layers.

### 📊 Powerful CRUD & Real-Time Orchestration
- **Task Management**: Create, read, update, and delete tasks instantly with toast notification success feedback.
- **Smart Due Dates**: Relative scheduling markers highlighting urgent or overdue tasks.
- **Priority & Status Badging**: Harmonized HSL badges detailing low, medium, or high priority, along with task completion states (Pending, In Progress, Completed).

### 🔍 Query Engine
- **Server-Side Pagination**: Handles data sorting and partition loading dynamically.
- **Debounced Live Search**: Prevents redundant network spam by delaying backend calls until the user finishes typing.
- **Status & Priority Aggregates**: Dashboard analytics summarizing current progress, tasks remaining, and real-time visual progress percentage tracks.

---

## 🏗️ Architecture & Design Aesthetics

TaskFlow is developed around the principles of **modular design and premium visual aesthetics**:

```
 ┌─────────────────────────────────────────────────────────┐
 │                Client UI Layer (React 18)               │
 └────────────────────────────┬────────────────────────────┘
                              │ HTTPS + JWT Bearer Tokens
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                 Express.js Router Middleware            │
 └────────────────────────────┬────────────────────────────┘
                              │ Object-Data Modeling (Mongoose)
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │                     MongoDB Database                    │
 └─────────────────────────────────────────────────────────┘
```

- **Transitions**: Smooth HSL color changes (`transition-colors duration-300`) applied globally to prevent visual flash when toggling themes.
- **Skeleton Loaders**: Custom shimmer animations (`shimmer-bg` with keyframed background translation) prevent content shift during database retrievals.
- **No Placeholders**: Leverages descriptive custom illustrations and empty states to maintain clean design integrity.

---

## 🛠️ Tech Stack Breakdown

### Backend Services
- **Runtime Environment**: Node.js
- **API Framework**: Express.js
- **Cloud Database**: MongoDB Atlas
- **Object Modeling (ODM)**: Mongoose
- **Secured Encryption**: bcryptjs (v2.4.3)
- **Token Signature**: jsonwebtoken (v9.0.2)
- **CORS Protection**: cross-origin request filters

### Frontend Services
- **Application Engine**: React 18
- **Bundler Platform**: Vite (v8.0)
- **Styling Architecture**: Tailwind CSS v3
- **Navigation Routing**: React Router DOM (v7.1)
- **Asynchronous HTTP Client**: Axios (v1.16)
- **Feedback Layer**: React Hot Toast (v2.6)
- **Date Manipulation**: date-fns (v4.3)

---

## 📁 Project Structure

```
task/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & configuration
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, and profile fetching
│   │   └── taskController.js     # Task CRUD orchestration
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT bearer authentication validator
│   │   └── errorMiddleware.js    # Global API error exception filters
│   ├── models/
│   │   ├── User.js               # MongoDB User Mongoose Schema
│   │   └── Task.js               # MongoDB Task Mongoose Schema
│   ├── routes/
│   │   ├── authRoutes.js         # User registration and endpoint routes
│   │   └── taskRoutes.js         # Task action routing
│   ├── utils/
│   │   └── generateToken.js      # JWT generation signing utility
│   ├── .env                      # Server configuration vars
│   └── server.js                 # Node/Express Entrypoint Server
│
└── frontend/
    ├── public/                   # Static browser assets
    └── src/
        ├── api/
        │   └── axios.js          # Shared base Axios client
        ├── components/
        │   ├── Navbar.jsx        # Navigation Header & Theme Toggle
        │   ├── Sidebar.jsx       # Dynamic Action Drawer panel
        │   ├── TaskCard.jsx      # High-contrast task details container
        │   ├── TaskForm.jsx      # Creation/editing form modal overlay
        │   ├── SearchBar.jsx     # Live input container
        │   ├── FilterBar.jsx     # Status and priority selectors
        │   ├── Loader.jsx        # Spinning progress overlays
        │   └── EmptyState.jsx    # Visual zero-state graphics
        ├── context/
        │   ├── AuthContext.jsx   # Authentication context engine
        │   └── ThemeContext.jsx  # Adaptive Light/Dark theme context engine
        ├── pages/
        │   ├── Login.jsx         # Sign-in page
        │   ├── Register.jsx      # Sign-up page
        │   └── Dashboard.jsx     # Main workspace analytics & grid view
        ├── routes/
        │   └── ProtectedRoute.js # Route guard component
        ├── App.jsx               # Navigation router root
        ├── index.css             # Main styling layer & HSL tokens
        └── main.jsx              # React mounting file
```

---

## 🔌 API Interface & Endpoints

### Authentication Gateway (`/api/auth`)
| Method | Endpoint | Description | Auth Token |
|---|---|---|---|
| **POST** | `/register` | Sign up a new user profile | None |
| **POST** | `/login` | Authenticate credentials and receive token | None |
| **GET** | `/me` | Fetch active user information | `Bearer Token` |

### Task Orchestrator Gateway (`/api/tasks`)
| Method | Endpoint | Description | Auth Token |
|---|---|---|---|
| **GET** | `/` | Fetch authenticated user's tasks | `Bearer Token` |
| **POST** | `/` | Create a new task instance | `Bearer Token` |
| **PUT** | `/:id` | Update an existing task | `Bearer Token` |
| **DELETE** | `/:id` | Terminate a task | `Bearer Token` |

---

## 🔒 Environment Configuration

### Backend variables (`backend/.env`)
Create a `.env` file within the `backend` folder:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=mern_taskmanager_super_secret_jwt_key_2024_production_ready
PORT=5000
NODE_ENV=development
```

---

## 🚀 Local Installation Guide

Follow these sequential steps to run a local instance:

### Step 1: Install System Dependencies
Make sure you have Node.js (v18+) and npm (v8+) installed.

### Step 2: Install Backend Node Modules
Navigate to the `backend/` directory, install modules, and run the server:
```bash
cd backend
npm install
npm run dev
```
The console will log:
```text
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: ac-hd4pfac-shard-00-00.1jfmx4k.mongodb.net
```

### Step 3: Install Frontend Node Modules
Open a separate terminal, navigate to the `frontend/` directory, install modules, and launch Vite:
```bash
cd frontend
npm install
npm run dev
```
Vite will serve the client application at:
```text
  VITE v8.0.14  ready in 3947 ms

  ➜  Local:   http://localhost:5173/
```

---

## 🌐 Deployment Protocols

### Client Hosting (Vercel)
1. Push your changes to your remote GitHub repository.
2. Link the repository to your [Vercel](https://vercel.com) Dashboard.
3. Configure the Root Directory to `frontend`.
4. Vercel will automatically discover standard Vite scripts and deploy.

### Backend Hosting (Render)
1. Create a Web Service instance inside [Render](https://render.com).
2. Point Render to your repository and set the Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure environmental parameters matching your `backend/.env` file inside Render's Environment Variables tab.

---

## 🏗️ Verification & Building

To verify code correctness and trigger a production-ready assembly of the static frontend files:
```bash
cd frontend
npm run build
```
Vite will compile and package the application resources inside the `frontend/dist` directory:
```text
transforming...✓ 397 modules transformed.
rendering chunks...
dist/index.html                   1.13 kB
dist/assets/index-CrUWJgPc.css   32.96 kB
dist/assets/index-DYpD64Jh.js   353.04 kB
✓ built in 4.44s
```
This indicates the app has compiled perfectly and is fully deployable!

---

<div align="center">
  <p>Designed and built with ❤️ using the MERN Stack.</p>
</div>
