import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NewTask = ({ addTask }) => {
  const [show, setShow] = useState(false); // Modal visibility state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("New"); // Default status
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().slice(0, 10) // Today's date in YYYY-MM-DD format
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    // Reset form fields and close modal
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("New");
    setCreationDate(new Date().toISOString().slice(0, 10));
    handleClose();
  };

  return (
    <>
      {/* Add Task Button */}
      <Button variant="primary" onClick={handleShow} className="add-task-btn" >
        Add Task
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Creation Date</Form.Label>
              <Form.Control
                type="date"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="me-2">
              Add Task
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewTask;
