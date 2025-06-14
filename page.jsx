"use client";
import React, { useState } from "react";

const DatePicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        readOnly
        value={selectedDate ? formatDate(selectedDate) : ""}
        onClick={() => setShowCalendar((prev) => !prev)}
        className="w-full border p-2 rounded"
        placeholder="Select a date"
      />

      {showCalendar && (
        <div className="absolute z-10 mt-1 bg-white border p-4 rounded shadow-lg">
          <div className="flex justify-between mb-2 items-center">
            <button onClick={goToPrevMonth}>&lt;</button>
            <span>
              {today.toLocaleString("default", { month: "long" })} {currentYear}
            </span>
            <button onClick={goToNextMonth}>&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array(firstDay).fill(null).map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}
            {days.map((day) => (
              <div
                key={day}
                className="cursor-pointer p-1 hover:bg-blue-100 rounded"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
