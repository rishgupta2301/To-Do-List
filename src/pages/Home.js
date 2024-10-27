// src/pages/Home.js
import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import WeeklyProgress from '../components/WeeklyProgress';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import { TaskContext } from '../context/TaskContext';
import "../styles/Home.css";

function Home() {
  const { tasks, addTask, toggleTaskCompletion, editTask, deleteTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null); // Track task being edited

  const handleAddTask = (task) => {
    if (taskToEdit) {
      editTask({ ...task, id: taskToEdit.id });
      setTaskToEdit(null);
    } else {
      addTask(task);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal function
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  task.description.toLowerCase().includes(searchQuery.toLowerCase()) // Search by description too
);


  return (
    <div className="home-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={() => setSearchQuery(searchQuery)}>
          Search
        </button>
      </div>
      <Header />
      <WeeklyProgress tasks={tasks} /> 
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        +
      </button>
      <TaskList tasks={filteredTasks} toggleTaskStatus={toggleTaskCompletion} onEditTask={handleEditTask} 
        onDeleteTask={handleDeleteTask}  />
      {/* Pass both onSave and onClose functions to the modal */}
      {isModalOpen && (
        <AddTaskModal onSave={handleAddTask} onClose={handleCloseModal} taskToEdit={taskToEdit} />
      )}
    </div>
  );
}

export default Home;
