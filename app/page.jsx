"use client";
import React, { useState, useEffect } from "react";
import Modal from "./components/Modal ";
import Link from "next/link";

const App = () => {
  const thisYear = 2025;
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // format: YYYY-MM-DD

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const lastDay = new Date(thisYear, monthIndex + 1, 0).getDate();
    const tempWeeks = [];
    let week = Array(7).fill(null);

    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(thisYear, monthIndex, i);
      const dayOfWeek = date.getDay();
      week[dayOfWeek] = i;

      if (dayOfWeek === 6 || i === lastDay) {
        tempWeeks.push([...week]);
        week = Array(7).fill(null);
      }
    }

    setWeeks(tempWeeks);
  }, [monthIndex]);

  const handleCellClick = (day) => {
    if (!day) return;
    const dateKey = `${thisYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateKey);
    setIsModalOpen(true);
  };

  return (
    <>
      <h1>Calendar for {monthNames[monthIndex]} {thisYear}</h1>
      <Link href={"/Tasks"}>see your tasks</Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setMonthIndex(prev => (prev === 0 ? 11 : prev - 1))}>Prev</button>
        <button onClick={() => setMonthIndex(prev => (prev === 11 ? 0 : prev + 1))}>Next</button>
      </div>

      <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>{weekDays.map((day, i) => <th key={i}>{day}</th>)}</tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={j}
                  onClick={() => handleCellClick(day)}
                  style={{ cursor: day ? "pointer" : "default" }}
                >
                  {day || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
      />
    </>
  );
};

export default App;
