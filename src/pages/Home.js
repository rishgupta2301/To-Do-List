// src/pages/Home.js
import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import WeeklyProgress from '../components/WeeklyProgress';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import { TaskContext } from '../context/TaskContext';
import DateCarousel from '../components/DateCarousel';
import { format } from 'date-fns';
import "../styles/Home.css";

function Home() {
  const { tasks, addTask, toggleTaskCompletion, editTask, deleteTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null); // Track task being edited
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  const filteredTasks = tasks
  .filter((task) => format(new Date(task.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
  .filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="home-page">
      <DateCarousel selectedDate={selectedDate} onDateSelect={setSelectedDate} />
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
      <div className="task-summary">
        <div className="task-box completed">
          <h3>Completed Tasks</h3>
          <p>{completedTasks.length}</p>
        </div>
        <div className="task-box incomplete">
          <h3>Incomplete Tasks</h3>
          <p>{incompleteTasks.length}</p>
        </div>
      </div>
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
