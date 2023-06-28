import React, { useState } from 'react';
const validateForm = (formData) => {
    return Object.values(formData).every((value) => value !== '');
};

const NewTaskForm = ({ selectedSplit, handleAddNewTask }) => {
    const [formData, setFormData] = useState({
        taskTitle: '',
        taskDescription: '',
        taskAmountOfWork: '',
        taskComplexity: '',
        taskRisk: '',
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formIsValid) {
            handleAddNewTask({
                ...formData,
                taskSplitId: selectedSplit,
                taskStage: "backlog",
            });
            setFormData({
                taskTitle: '',
                taskDescription: '',
                taskAmountOfWork: '',
                taskComplexity: '',
                taskRisk: '',
            });
            setFormIsValid(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setFormIsValid(validateForm({ ...formData, [name]: value }));
    };

    return (
        <div className="new-task-form containe bg-white bg-opacity-10 rounded p-2 ps-3 my-2">
            <h3 className="ms-5">Create a New Task</h3>
            <form className="col dflez" onSubmit={handleSubmit}>
                <label htmlFor="taskTitle">Title:</label>
                <input
                    type="text"
                    className="row form-control w-50"
                    id="taskTitle"
                    name="taskTitle"
                    value={formData.taskTitle}
                    onChange={handleInputChange}
                />
                <label htmlFor="taskDescription">Description:</label>
                <textarea
                    id="taskDescription"
                    className="row form-control"
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleInputChange}
                />
                <label htmlFor="taskAmountOfWork">Amount of Work:</label>
                <input
                    type="number"
                    className="row form-control w-25"
                    id="taskAmountOfWork"
                    min="1"
                    max="5"
                    name="taskAmountOfWork"
                    value={formData.taskAmountOfWork}
                    onChange={handleInputChange}
                />
                <label htmlFor="taskComplexity">Complexity:</label>
                <input
                    type="number"
                    className="row form-control w-25"
                    id="taskComplexity"
                    min="1"
                    max="5"
                    name="taskComplexity"
                    value={formData.taskComplexity}
                    onChange={handleInputChange}
                />
                <label htmlFor="taskRisk">Risk:</label>
                <input
                    type="number"
                    className="row form-control w-25"
                    id="taskRisk"
                    min="1"
                    max="5"
                    name="taskRisk"
                    value={formData.taskRisk}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-hover border-warning text-warning mt-2"
                    disabled={!formIsValid}
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default NewTaskForm;