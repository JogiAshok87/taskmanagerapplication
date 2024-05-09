import './App.css'
import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

// App Component
export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || []);
    console.log('Stored tasks:', storedTasks);
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('Tasks stored in local storage:', updatedTasks);
      return updatedTasks;
    });
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => task.id === id ? { ...task, ...updatedTask } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('Tasks stored in local storage:', updatedTasks);
      return updatedTasks;
    });
    setEditingTask(null);
  };

  const toggleCompleted = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('Tasks stored in local storage:', updatedTasks);
      return updatedTasks;
    });
  };

  const editTask = (id) => {
    setEditingTask(tasks.find((task) => task.id === id));
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('Tasks stored in local storage:', updatedTasks);
      return updatedTasks;
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm
        task={editingTask}
        addTask={addTask}
        updateTask={updateTask}
        cancelEdit={cancelEdit} />
      <TaskList
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        editTask={editTask}
        deleteTask={deleteTask} />
    </div>
  );
};


export default App;