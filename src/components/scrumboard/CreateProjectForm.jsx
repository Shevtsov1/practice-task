import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CreateProjectForm = ({ onAddProject }) => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setProjectName("");
        setProjectDescription("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectId: Math.random(),
            projectName: projectName,
            projectDescription: projectDescription,
            tasks: [],
            splits: [],
        };
        setProjectName("");
        setProjectDescription("");
        onAddProject(newProject);
        handleCloseModal();
        window.location.reload();
    };

    return (
        <>
            <Button className="d-flex justify-content-center border-1 border-light-subtle ms-auto me-auto mt-3 ps-3 pe-3 fs-6 fw-bold" variant="secondary" onClick={handleShowModal}>
                Create Project
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="projectName" className="form-label">Project Name</label>
                            <input type="text" value={projectName} onChange={(event) => setProjectName(event.target.value)}
                                   className="form-control" id="projectName" placeholder="Enter project name" autoComplete="off"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="projectDescription" className="form-label">Project Description</label>
                            <textarea value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)}
                                      className="form-control" id="projectDescription" placeholder="Enter project description" autoComplete="off"/>
                        </div>
                        <Button type="submit" className="btn btn-primary">Create Project</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateProjectForm;