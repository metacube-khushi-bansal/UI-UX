import React, { useState } from "react";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    
    setTasks([...tasks, newTask]);
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="taskboard-container">
      <NewTask addTask={addTask} />
      <div className="task-column">
        <h3>New</h3>
        {filterTasksByStatus("New").map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="task-column">
        <h3>In Progress</h3>
        {filterTasksByStatus("In Progress").map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="task-column">
        <h3>Completed</h3>
        {filterTasksByStatus("Completed").map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
