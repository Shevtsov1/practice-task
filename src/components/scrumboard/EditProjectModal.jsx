import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditProjectModal = ({ show, onClose, onSave, onDeleteProject, project }) => {
    const [projectName, setProjectName] = useState(project.projectName);
    const [projectDescription, setProjectDescription] = useState(project.projectDescription);

    const handleSave = () => {
        if (project) {
            onSave(projectName, projectDescription);
        }
    };

    const handleDelete = () => {
        if (project) {
            const confirmDelete = window.confirm("Are you sure you want to delete this project?");
            if (confirmDelete) {
                onDeleteProject(project);
            }
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setProjectDescription(event.target.value);
    };

    return (
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" value={projectName} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Description:</Form.Label>
                    <Form.Control as="textarea" value={projectDescription} onChange={handleDescriptionChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProjectModal;