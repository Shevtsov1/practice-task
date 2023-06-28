import React, { useCallback, useEffect, useState } from 'react';
import ScrumBoard from './ScrumBoard';
import EditProjectModal from '../scrumboard/EditProjectModal';
import NewTaskForm from "./NewTaskForm";
import Backlog from "./Backlog";
import ProjectInfo from "./ProjectInfo";

const ProjectDetails = ({ project }) => {
    const [projects, setProjects] = useState(JSON.parse(localStorage.getItem('projects')) || []);
    const [projectName, setProjectName] = useState(project.projectName);
    const [projectDescription, setProjectDescription] = useState(project.projectDescription);
    const [splits, setSplits] = useState(project.splits);
    const [tasks, setTasks] = useState(project.tasks);
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [selectedSplit, setSelectedSplit] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAmountOfWork, setTaskAmountOfWork] = useState(0);
    const [taskComplexity, setTaskComplexity] = useState(0);
    const [taskRisk, setTaskRisk] = useState(0);
    const [taskSplitId, setTaskSplitId] = useState(0);
    const [taskStage, setTaskStage] = useState('backlog');
    const stages = [
        { id: "backlog", title: "Backlog" },
        { id: "todo", title: "Todo" },
        { id: "doing", title: "Doing" },
        { id: "done", title: "Done" },
    ];

    useEffect(() => {
        const updatedProject = {...project, projectName, projectDescription, splits};
        const updatedProjects = projects.map(p => p.projectId === updatedProject.projectId ? updatedProject : p);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    }, [projectName, projectDescription, splits]);

    const handleUpdateProject = useCallback((updatedProject) => {
        const updatedProjects = projects.map(p =>
            p.projectId === updatedProject.projectId ? updatedProject : p
        );
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
    }, [projects]);

    const handleDeleteProject = (projectToDelete) => {
        const updatedProjects = projects.filter(p => p.projectId !== projectToDelete.projectId);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
        setShowEditProjectModal(false);
        window.location.reload();
    };

    const handleEditProjectClick = () => {
        setShowEditProjectModal(true);
    };

    const handleSplitClick = (split) => {
        setSelectedSplit(split);
    };

    const handleCreateTaskClick = () => {
        setShowCreateTaskModal(!showCreateTaskModal);
    };

    const handleSave = (name, description) => {
        setProjectName(name);
        setProjectDescription(description);

        const updatedProject = {
            ...project,
            projectName: name,
            projectDescription: description,
        };

        const updatedProjects = projects.map(p =>
            p.projectId === updatedProject.projectId ? updatedProject : p
        );
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);

        setShowEditProjectModal(false);
    };

    const handleCancel = () => {
        setShowEditProjectModal(false);
    };

    const handleAddSplit = () => {
        const splitsLenght = splits.length;
        const newSplit = splitsLenght+1;

        const updatedSplits = [...splits, newSplit];
        setSplits(updatedSplits);
        const updatedProject = {
            ...projects,
            splits: updatedSplits
        };
        handleUpdateProject(updatedProject);
        window.location.reload();
    }

    const handleDeleteSplit = () => {
        const splitsLenght = splits.length;

        const updatedSplits = splits.slice(0,-1);
        setSplits(updatedSplits);
        const updatedProject = {
            ...project,
            splits: updatedSplits
        };
        handleUpdateProject(updatedProject);
        window.location.reload();
    }

    const onBackClick = () => {
        setSelectedSplit(null);
    }

    const handleAddNewTask = ( { taskTitle, taskDescription, taskAmountOfWork, taskComplexity, taskRisk, taskSplitId, taskStage} ) => {
        const newTask = {
            taskId: tasks.length + 1,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskStoryPoints: {
                taskAmountOfWork: taskAmountOfWork,
                taskComplexity: taskComplexity,
                taskRisk: taskRisk,
            },
            taskSplitId: taskSplitId,
            taskStage: taskStage
        };

        const updatedTasks = [...tasks, newTask];
        const updatedProject = {
            ...project,
            tasks: updatedTasks
        };
        handleUpdateProject(updatedProject);

        setTaskTitle('');
        setTaskDescription('');
        setTaskAmountOfWork(0);
        setTaskComplexity(0);
        setTaskRisk(0);
    };

    return (
        <>
            <ProjectInfo
                projectName={projectName}
                projectDescription={projectDescription}
                handleEditClick={handleEditProjectClick}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
                onBackClick={onBackClick}
            />
            {showCreateTaskModal && (
                <NewTaskForm
                    project={project}
                    handleAddNewTask={handleAddNewTask}
                    selectedSplit={selectedSplit}
                />
            )}
            {selectedSplit ?
                <ScrumBoard
                    project={project}
                    tasks={tasks}
                    stages={stages}
                    selectedSplit={selectedSplit}
                    handleCreateTaskClick={handleCreateTaskClick}
                /> : <Backlog
                    projectDescription={projectDescription}
                    splits={splits}
                    handleAddNewSplit={handleAddSplit}
                    handleDeleteSplit={handleDeleteSplit}
                    handleSplitClick={handleSplitClick}
                    setSelectedSplit={setSelectedSplit}
                 />
            }

            {showEditProjectModal && (
                <EditProjectModal
                    show={showEditProjectModal}
                    onSave={handleSave}
                    onClose={handleCancel}
                    onDeleteProject={handleDeleteProject}
                    project={project}
                />
            )}
        </>
    );
};

export default ProjectDetails;