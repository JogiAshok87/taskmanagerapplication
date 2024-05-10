import React, { useState} from 'react';

import './index.css'

const Task = ({ task, toggleCompleted, editTask, deleteTask }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div
        className="task"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: isHovered ? '#f5f5f5' : '#ccc',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div className="task-info">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task.id)}
          />
          <div className='task-description'>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Priority: </strong> {task.priority}</p>
            <p><strong>Due Date: </strong> {task.dueDate}</p>
          </div>
        </div>
        <div className="task-actions">
          <button onClick={() => editTask(task.id)} className='edit-btn'>Edit</button>
          <button onClick={() => deleteTask(task.id)} className='delete-btn'>Delete</button>
        </div>
      </div>
    );
  };

  export default Task