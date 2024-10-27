// src/components/TaskSummary.js

import React from 'react';
import './TaskSummary.css';

function TaskSummary({ completed, total }) {
  return (
    <div className="task-summary">
      <h2>This Week</h2>
      <div className="task-summary-info">
        <p>Tasks Completed</p>
        <p><strong>{completed}</strong> of <strong>{total}</strong></p>
      </div>
    </div>
  );
}

export default TaskSummary;
