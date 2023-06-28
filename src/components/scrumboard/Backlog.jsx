import React from 'react';

const Backlog = ({ projectDescription, splits, handleAddNewSplit, handleDeleteSplit, setSelectedSplit }) => {


    const handleSelectedSplit = (split) => {
        setSelectedSplit(split);
    }

    return (
        <div className="backlog-bg px-5 py-2 mt-2 bg-primary bg-opacity-10 rounded row">
            <div className="project-description container col overflow-auto">
                <h5>Description</h5>
                {projectDescription}
            </div>
            <div className="project-splits col">
                <button className="btn btn-def-hover btn-outline-danger float-end text-danger mt-1" onClick={handleDeleteSplit}>Delete Split</button>
                <button className="btn btn-def-hover btn-outline-primary float-end text-primary me-1 mt-1" onClick={handleAddNewSplit}>Add New Split</button>
                <h5>Splits</h5>
                <div className="split-list w-50">
                    {splits.map((split) => (
                        <button className="btn btn-hover border-warning text-warning float-start" key={split} onClick={() => handleSelectedSplit(split)}>
                            {split}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Backlog;