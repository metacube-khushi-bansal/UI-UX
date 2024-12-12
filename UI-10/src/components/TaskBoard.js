import React, { useState } from "react";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import "./TaskBoard.css";
import EditTaskModal from "./EditTaskModal";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Task 1",
            description: "New task",
            priority: "High",
            status: "New",
            creationDate: "2024-12-01",
        },
        {
            id: 2,
            title: "Task 2",
            description: "New task",
            priority: "Medium",
            status: "In Progress",
            creationDate: "2024-12-01",
        },
        {
            id: 3,
            title: "Task 3",
            description: "New task",
            priority: "Low",
            status: "Completed",
            creationDate: "2024-12-01",
        },
    ]);

    const [taskToEdit, setTaskToEdit] = useState(null);
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const updateTask = (updatedTask) => {
        setTasks(
            tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setTaskToEdit(null);
    };

    const filterTasksByStatus = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    const handleDragStart = (taskId) => {
        setDraggedTaskId(taskId);
    };

    const handleDrop = (newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === draggedTaskId ? { ...task, status: newStatus } : task
            )
        );
        setDraggedTaskId(null);
    };

    return (
        <>
            <div className="taskboard-heading">
                <h3 className="text-primary p-3 task-tracker">My Task Tracker</h3>
                <NewTask addTask={addTask} className="add-task-btn" />
            </div>

            <div className="taskboard-container">
                {["New", "In Progress", "Completed"].map((status) => (
                    <div
                        key={status}
                        className="task-column"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
                    >
                        <h3>{status}</h3>
                        {filterTasksByStatus(status).map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                onEdit={() => setTaskToEdit(task)}
                                onDragStart={handleDragStart}
                                
                            />
                        ))}
                    </div>
                ))}
            </div>

            {taskToEdit && (
                <EditTaskModal
                    task={taskToEdit}
                    updateTask={updateTask}
                    onClose={() => setTaskToEdit(null)}
                />
            )}
        </>
    );
};

export default TaskBoard;
