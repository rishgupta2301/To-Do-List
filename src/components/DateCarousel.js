// src/components/DateCarousel.js
import React, { useState, useEffect } from 'react';
import '../styles/DateCarousel.css';
import { format, addDays } from 'date-fns';

const DateCarousel = ({ selectedDate, onDateSelect }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Generate dates for the current week
    const today = new Date();
    const weekDates = Array.from({ length: 7 }, (_, i) => addDays(today, i));
    setDates(weekDates);
  }, []);

  return (
    <div className="date-carousel">
      {dates.map((date) => (
        <button
          key={date}
          className={`date-button ${format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'selected' : ''}`}
          onClick={() => onDateSelect(date)}
        >
          <p className="day">{format(date, 'EEE')}</p>
          <p className="date">{format(date, 'd')}</p>
        </button>
      ))}
    </div>
  );
};

export default DateCarousel;
