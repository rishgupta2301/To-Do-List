// src/components/TaskList.js
import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, toggleTaskStatus, onEditTask, onDeleteTask }) => {
  const formatDate = (date) => {
    return date instanceof Date ? date.toLocaleDateString() : date;
  };
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          <div className="task-details">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <p className="task-date">Date: {formatDate(task.date)}</p>
            <p className="task-time">Time: {task.time}</p>
          </div>
          <div className="task-actions">
            <button
              className={`status-btn ${task.completed ? "completed" : "incomplete"}`}
              onClick={() => toggleTaskStatus(task.id)}
            >
              {task.completed ? "Completed" : "Incomplete"}
            </button>
            <button className="edit-btn" onClick={() => onEditTask(task)}>
            <img width="20" height="20" src="https://img.icons8.com/ios/50/create-new.png" alt="create-new"/>
            </button>
            <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
            <img width="20" height="20" src="https://img.icons8.com/ios/50/waste.png" alt="waste"/>
            </button>
          </div>
        {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
