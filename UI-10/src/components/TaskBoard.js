
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import "./TaskBoard.css";
import EditTaskModal  from "./EditTaskModal";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Task 1",
            description: "New task",
            priority: "High",
            status: "New",
            creationDate: "2024-12-01"
        },
        {
            id: 2,
            title: "Task 2",
            description: "New task",
            priority: "Medium",
            status: "In Progress",
            creationDate: "2024-12-01"
        },
        {
            id: 3,
            title: "Task 3",
            description: "New task",
            priority: "Low",
            status: "Completed",
            creationDate: "2024-12-01"
        },

    ]);

    const [taskToEdit, setTaskToEdit] = useState(null);// to store task being edited

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };


    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }


    const updateTask = (updatedTask) => {
        setTasks(
            tasks.map((task) => 
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setTaskToEdit(null);//close modal
    };

    const filterTasksByStatus = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <>
            <div className="taskboard-heading">
                <h3 className='text-primary p-3 task-tracker'>My Task Tracker</h3>
                <NewTask addTask={addTask} className="add-task-btn" />
                {/* <span class="border-bottom"></span> */}
            </div>
            {/* <span class="border-bottom border border-dark"></span> */}
            <div className="taskboard-container">
                <div className="task-column">
                    <h3>New</h3>
                    {filterTasksByStatus("New").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            onEdit={() => setTaskToEdit(task)} />   //set task to be edited
                    ))}
                </div>
                <div className="task-column">
                    <h3>In Progress</h3>
                    {filterTasksByStatus("In Progress").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            onEdit={() => setTaskToEdit(task)} />
                    ))}
                </div>
                <div className="task-column">
                    <h3>Completed</h3>
                    {filterTasksByStatus("Completed").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            onEdit={() => setTaskToEdit(task)} />
                    ))}
                </div>
            </div>


            {taskToEdit && (
                <EditTaskModal
                    task={taskToEdit}
                    updateTask={updateTask}
                    onClose={() => setTaskToEdit(null)}  //close the modal
                />
            )}
        </>
    );
};

export default TaskBoard;
