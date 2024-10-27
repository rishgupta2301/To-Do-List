// src/components/TaskList.js
import React, { useState } from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, toggleTaskStatus, onEditTask, onDeleteTask }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="task-list-container">

      {searchQuery && filteredTasks.length === 0 && (
        <p className="no-results">No tasks found</p>
      )}

      {!searchQuery && <p className="task-header">Tasks Today</p>}

      {filteredTasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
            />
            <span className="checkmark"></span>
          </label>

          <div className="task-details">
            <h4 className="task-title">{task.title}</h4>
          </div>

          <div className="task-actions">
            <button className="edit-btn" onClick={() => onEditTask(task)}>
              <img width="20" height="20" src="https://img.icons8.com/ios/50/create-new.png" alt="edit"/>
            </button>
            <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
              <img width="20" height="20" src="https://img.icons8.com/ios/50/waste.png" alt="delete"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
