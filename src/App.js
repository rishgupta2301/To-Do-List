// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskProvider  from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
