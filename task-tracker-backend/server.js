const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- Database Setup (PostgreSQL) ---
const pool = new Pool({
  user: 'runner',
  host: 'localhost',
  database: 'task_tracker',
  password: 'password123',
  port: 5432,
});

// --- API Endpoints ---

// 1. GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json({ "message": "success", "data": result.rows });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// 2. POST /tasks
app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.json({
            "message": "success",
            "data": result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// 3. PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
    const { title, completed } = req.body;
    const id = req.params.id;
    
    // Dynamic query construction to handle partial updates
    // (This is a simplified version for learning)
    try {
        // First check if task exists
        const current = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (current.rows.length === 0) {
             return res.status(404).json({"error": "Task not found"});
        }
        
        const newTitle = title !== undefined ? title : current.rows[0].title;
        const newCompleted = completed !== undefined ? completed : current.rows[0].completed;

        const result = await pool.query(
            'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
            [newTitle, newCompleted, id]
        );

        res.json({
            "message": "success",
            "data": result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// 4. DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
        res.json({ "message": "deleted", "rowsAffected": result.rowCount });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// --- Start Server ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
});
