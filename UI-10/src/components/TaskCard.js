import React from "react";
import "./TaskCard.css";
const TaskCard = ({ task }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case "High":
                return "high-priority";
            case "Medium":
                return "medium-priority";
            case "Low":
                return "low-priority";
            default:
                return "";
        }
    };
    return (
        <div className={`task-card ${getPriorityClass(task.priority)}`}>
            <h4>{task.title}</h4><p>{task.description}</p>{" "}
        </div>
    );
};
export default TaskCard;
