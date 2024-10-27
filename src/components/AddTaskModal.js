// src/components/AddTaskModal.js
import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

const AddTaskModal = ({ onSave, onClose, taskToEdit }) => {
  const [taskTitle, setTaskTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [taskDescription, setTaskDescription] = useState(taskToEdit ? taskToEdit.description : "");
  const [taskDate, setTaskDate] = useState(taskToEdit ? taskToEdit.date : "");
  const [taskTime, setTaskTime] = useState(taskToEdit ? taskToEdit.time : "");

  useEffect(() => {
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
      setTaskDate(taskToEdit.date);
      setTaskTime(taskToEdit.time);
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (taskTitle && taskDate) {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        time: taskTime,
        completed: taskToEdit ? taskToEdit.completed : false,
      };
      onSave(newTask);
      onClose();
    } else {
      alert("Please enter both title and date.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="modal-input"
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="modal-input"
        ></textarea>
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          className="modal-input"
          required
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="add-task-button" onClick={handleSave}>
            {taskToEdit ? "Save Changes" : "Create"}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
