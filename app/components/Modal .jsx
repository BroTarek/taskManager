import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, date }) => {
  const [task, setTask] = useState("");

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const saved = JSON.parse(localStorage.getItem("tasks") || "{}");

    // Save under date key
    saved[date] = [...(saved[date] || []), task];

    localStorage.setItem("tasks", JSON.stringify(saved));
    setTask("");
    onClose(); // Close modal
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Add task for {date}</h3>
        <form onSubmit={handleSave}>
          <label htmlFor='task'>Enter task</label><br />
          <input
            name='task'
            id='task'
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    position: 'relative',
    minWidth: '300px'
  }
};

export default Modal;
