import React from "react";
import "./TaskCard.css";
const TaskCard = ({ task,deleteTask,onEdit }) => {
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
    const styles = {
        margin: "4px",
        fontSize: "25px",
        color: "red"
    };

    const editStyles = {
        margin: "4px",
        fontSize: "25px",
        color: "blue"
    }

    return (
        <div className={`task-card ${getPriorityClass(task.priority)}`}>
            <div className="task-card-container">
                <div>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>{" "}
                </div>
                <div className="icon-container">
                    <button className="delete-btn" onClick={()=>deleteTask(task.id)}>  
                        <i class="fa fa-trash-o" style={styles}></i>
                    </button>


                     {/* disabling the updating option for the completed tasks, they can only be deleted */}
                     { task.status !== "Completed" &&
                     ( <button className="edit-btn" onClick={onEdit}>
                        <i class="fa fa-edit" style={editStyles}></i>
                    </button>
                     )

                    }
                   

                </div>
            </div>

        </div>
    );
};
export default TaskCard;
