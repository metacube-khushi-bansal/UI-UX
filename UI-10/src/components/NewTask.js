import React, { useState } from "react";
import "./NewTask.css";

const NewTask = ({ addTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("New"); // Default to "New"
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().slice(0, 10) // Today's date in YYYY-MM-DD format
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status,
      creationDate,
    };

    addTask(newTask);

    // Reset form fields
    setShowForm(false);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("New");
    setCreationDate(new Date().toISOString().slice(0, 10));
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="add-task-button">
          Add Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="new-task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Status Dropdown */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Creation Date (Read-Only) */}
          <input
            type="date"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
            required
          />

          <div className="form-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewTask;
