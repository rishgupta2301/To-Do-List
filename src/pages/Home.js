// src/pages/Home.js
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import WeeklyProgress from "../components/WeeklyProgress";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import { TaskContext } from "../context/TaskContext";
import DateCarousel from "../components/DateCarousel";
import { format } from "date-fns";
import "../styles/Home.css";

function Home() {
  const { tasks, addTask, toggleTaskCompletion, editTask, deleteTask } =
    useContext(TaskContext);
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

  const completedCount = tasks.filter((task) => task.completed).length;
  const incompleteCount = tasks.length - completedCount;

  const filteredTasks = tasks
    .filter(
      (task) =>
        format(new Date(task.date), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    )
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        <button
          className="search-button"
          onClick={() => setSearchQuery(searchQuery)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="white"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
        </button>
      </div>
      <DateCarousel
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      {/* <Header /> */}
      <div className="task-summary">
        <div className="task-box completed">
          <h3>Task Complete</h3>
          <p>{completedCount}</p>
        </div>
        <div className="task-box incomplete">
          <h3>Task Pending</h3>
          <p>{incompleteCount}</p>
        </div>
      </div>
      <WeeklyProgress tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        toggleTaskStatus={toggleTaskCompletion}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        +
      </button>
      {/* Pass both onSave and onClose functions to the modal */}
      {isModalOpen && (
        <AddTaskModal
          onSave={handleAddTask}
          onClose={handleCloseModal}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  );
}

export default Home;
