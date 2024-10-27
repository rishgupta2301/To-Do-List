// src/components/WeeklyProgress.js
import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import '../styles/WeeklyProgress.css';

const WeeklyProgress = () => {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="weekly-progress">
      <p>Weekly Progress: {Math.round(completionPercentage)}%</p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
