import React from 'react';

const ProjectInfo = ({projectName, handleEditClick, onUpdateProject, onDeleteProject, onBackClick}) => {

    const handleEditProject = () => {
        handleEditClick();
    }

    return (
            <div className="project-info row bg-white bg-opacity-10 rounded-pill h-auto">
                <div className="col d-flex align-items-center justify-content-center">
                    <div className="project-name fs-5 fw-bold">{projectName}</div>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                    <button className="btn btn-hover border-warning text-warning me-2" onClick={handleEditProject}>Edit Project</button>
                    <button className="btn btn-primary" onClick={onBackClick}>Back</button>
                </div>
            </div>
    );
};

export default ProjectInfo;