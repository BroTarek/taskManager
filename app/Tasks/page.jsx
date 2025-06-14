"use client";
import React, { useEffect, useState } from "react";

const TaskPage = () => {
  const [tasks, setTasks] = useState({});
  const [tasksValue, setTasksValue] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    let temptasks = [];

    if (stored) {
      const parsed = JSON.parse(stored);
      setTasks(parsed);

      Object.values(parsed).forEach((taskList) => {
        temptasks.push(...taskList);
      });

      setTasksValue(temptasks);
    }
  }, []);

  const handleDragStart = (e, i) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedItemIndex(i);
  };
  const handleDrop = (e) => {
    
    setTasksInProgress([...tasksInProgress,tasksValue[draggedItemIndex]])
    
    setTasksValue(tasksValue.filter((t,i)=>i!==draggedItemIndex))
  }; 
   const handleDragEnd = (e) => {
    setDraggedItemIndex(null)
  };
    const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  console.log(tasksValue);
  return (
  <div style={styles.container}>
      <section style={styles.section}>
        <h2>Assigned Tasks</h2>
        <ul>
          {tasksValue.map((t, i) => (
            <li
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              key={i}
              style={styles.taskCard}
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={styles.section}
      >
        <h2>In Progress</h2>
        <ul>
          {tasksInProgress.map((t, i) => (
            <li
              key={i}
              style={styles.taskCard}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h2>Finished</h2>
        {/* Drag-drop to finished section can be added similarly */}
      </section>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
  },
  section: {
    flex: 1,
    background: "#f0f0f0",
    padding: "1rem",
    borderRadius: "8px",
    minHeight: "200px",
  },
  taskCard: {
    background: "#fff",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "4px",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
    cursor: "grab",
  },
};
;

export default TaskPage;
