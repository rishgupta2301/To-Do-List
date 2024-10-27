// src/pages/Search.js

import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import Header from '../components/Header';

function Search() {
  const { tasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>{
    return (
      task?.description.toLowerCase().includes(searchTerm.toLowerCase())
      ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
  }
  );

  return (
    <div className="search-page">
      <Header />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default Search;
