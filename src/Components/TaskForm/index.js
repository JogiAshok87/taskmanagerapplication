import React, { useState,useEffect} from 'react';
import './index.css'


const TaskForm = ({ task, addTask, updateTask, cancelEdit }) => {
    const [newTask, setNewTask] = useState(task || {
      title: '',
      description: '',
      priority: 'low',
      dueDate: '',
      completed: false,
    });

    useEffect(() => {
        if (task) {
          setNewTask(task);
        } else {
          setNewTask({
            title: '',
            description: '',
            priority: 'low',
            dueDate: '',
            completed: false,
          });
        }
      }, [task]);
  
    const handleChange = (e) => {
      setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newTask.title || !newTask.description || !newTask.dueDate) {
        alert('Please fill in all required fields.');
        return;
      }
      if (task) {
        updateTask(task.id, newTask);
      } else {
        addTask(newTask);
      }
      setNewTask({
        title: '',
        description: '',
        priority: 'low',
        dueDate: '',
        completed: false,
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleChange}
          required
        ></textarea>
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          className='datapicer'
          required
        />
        <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
        {task && <button onClick={cancelEdit}>Cancel</button>}
      </form>
    );
  };

  export default TaskForm