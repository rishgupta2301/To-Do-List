import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button className="complete-toggle">{task.completed ? 'Incomplete' : 'Complete'}</button>
    </div>
  );
}

export default TaskItem;
