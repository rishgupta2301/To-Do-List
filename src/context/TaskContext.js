import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        // Sample task for testing
        { id: 1, title: "Sample Task", description: "This is a sample task", date: new Date(), completed: false }
      ]);
  const [completedTasks, setCompletedTasks] = useState(0);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      date: task.date || new Date().toISOString(), // Default to today if no date provided
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, completedTasks ,toggleTaskCompletion}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
