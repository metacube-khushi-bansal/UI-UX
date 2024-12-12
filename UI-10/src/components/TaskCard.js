import React from "react";
import "./TaskCard.css";
const TaskCard = ({ task, deleteTask, onEdit, onDragStart }) => {
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
    const styles = { margin: "4px", fontSize: "25px", color: "#bb0101" };
    const editStyles = { margin: "4px", fontSize: "25px", color: "blue" };
    return (
        <div
            className={`task-card ${getPriorityClass(task.priority)}`}
            draggable
            onDragStart={() => onDragStart(task.id)}
        >
            {" "}
            <div className="task-card-container grabbable">
                {" "}
                <div className="">
                    <h4>{task.title}</h4>{" "}
                    <p>{task.description}</p>{" "}
                </div>
                {" "}
                <div className="icon-container">
                    {" "}
                    <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                        {" "}
                        <i className="fa fa-trash-o" style={styles}></i>{" "}
                    </button>
                    {/* Disable updating for completed tasks */}{" "}
                    {task.status !== "Completed" && (
                        <button className="edit-btn" onClick={onEdit}>
                            {" "}
                            <i className="fa fa-edit" style={editStyles}></i>
                            {" "}
                        </button>
                    )}
                    {" "}
                </div>
                {" "}
            </div>
            {" "}
        </div>
    );
};
export default TaskCard;
