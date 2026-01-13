import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const API_URL = 'http://localhost:3000/tasks'

  // 1. Fetch Tasks (GET)
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTasks(data.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // 2. Add Task (POST)
  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask })
      })
      if (response.ok) {
        setNewTask('') // Clear input
        fetchTasks()   // Refresh list
      }
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  // 3. Toggle Complete (PUT)
  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      })
      if (response.ok) fetchTasks()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  // 4. Delete Task (DELETE)
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) fetchTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      
      {/* Form */}
      <form onSubmit={addTask} className="task-form">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task..." 
        />
        <button type="submit">Add</button>
      </form>

      {/* List */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id, task.completed)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              X
            </button>
          </li>
        ))}
      </ul>
      <footer>© 2026 Task Tracker Inc.</footer> {/* Add this line */}
    </div>
  )
}

export default App
