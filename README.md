# 📝 Task Tracker

A full-stack application to manage daily tasks. Built to demonstrate CRUD operations, database integration, and frontend-backend communication.

## 🚀 Tech Stack

* **Frontend:** React (Vite), CSS Modules
* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **Infrastructure:** Google Cloud Platform (Compute Engine)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js:** v18+ (Recommended to use `nvm`)
* **PostgreSQL:** v14+ installed and running locally

## 🛠️ Local Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/task-tracker.git](https://github.com/YOUR_USERNAME/task-tracker.git)
cd task-tracker-project
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd task-tracker-backend
npm install
```

**Database Configuration:**
1.  Make sure Postgres is running.
2.  Create the database and user:
    ```sql
    CREATE DATABASE task_tracker;
    CREATE USER runner WITH ENCRYPTED PASSWORD 'password123';
    GRANT ALL PRIVILEGES ON DATABASE task_tracker TO runner;
    ```
3.  Run the migrations (or create table manually):
    ```sql
    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    );
    ```

Start the server:
```bash
node server.js
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd task-tracker-frontend
npm install
```

Start the React app:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 📡 API Documentation

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all tasks | None |
| `POST` | `/tasks` | Create a new task | `{ "title": "Buy milk" }` |
| `PUT` | `/tasks/:id` | Update task status | `{ "completed": true }` |
| `DELETE` | `/tasks/:id` | Delete a task | None |

---

## ☁️ Deployment (Manual)

Current deployment is hosted on a Google Cloud VM.

1.  **SSH into VM:**
    ```bash
    gcloud compute ssh task-tracker ...
    ```
2.  **Pull latest changes:**
    ```bash
    git pull origin main
    ```
3.  **Restart Server:**
    (Currently running via node command, future updates will use Docker).
