import React, { useState, useEffect } from "react";
import CreateProjectForm from "../scrumboard/project/CreateProjectForm";

const Sidebar = (props) => {
    // Состояния
    const [projects, setProjects] = useState([]); // список проектов
    const [selectedProject, setSelectedProject] = useState(null); // выбранный проект
    const [showEditModal, setShowEditModal] = useState(false); // флаг отображения модального окна редактирования проекта
    const { showSidebar, setShowSidebar, onProjectSelect } = props; // пропсы

    // Загрузка проектов из localStorage при монтировании компонента
    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects"));
        if (storedProjects) {
            setProjects(storedProjects);
        }
    }, []);

    // Сохранение проектов в localStorage при изменении списка проектов
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    // Переключение видимости боковой панели
    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Добавление нового проекта в список проектов
    const handleAddProject = (project) => {
        const newProject = {
            ...project,
        };
        setProjects([...projects, newProject]);
    };

    // Редактирование существующего проекта в списке проектов
    const handleEditProject = (projectId, projectName, projectDescription) => {
        const updatedProjects = projects.map((project) => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    projectName: projectName,
                    projectDescription: projectDescription,
                };
            }
            return project;
        });
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        handleCloseModal();
    };

    // Удаление проекта из списка проектов
    const handleDeleteProject = (projectId) => {
        const updatedProjects = projects.filter((p) => p.projectId !== projectId);
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };

    // Закрытие модального окна редактирования проекта
    const handleCloseModal = () => {
        setSelectedProject(null);
        setShowEditModal(false);
    };

    // Обработка выбора проекта из списка
    const handleProjectSelect = (projectId) => {
        const selectedProject = projects.find((project) => project.projectId === projectId);
        setSelectedProject(selectedProject);
        onProjectSelect(selectedProject);
    };

    return (
        <div className="container">
            {/* Кнопка переключения боковой панели */}
            <div className="fixed-bottom fixed-left p-3">
                <button
                    className="btn btn-secondary btn-outline-warning"
                    onClick={handleToggleSidebar}
                >
                    {/* Иконка кнопки переключения боковой панели */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                            fill="currentColor"
                        />
                        <path
                            d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                            fill="currentColor"
                        />
                        <path
                            d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>

            {/* Боковая панель */}
            {showSidebar && (
                <div className="sidebar overflow-auto z-1">
                    {/* Заголовок боковой панели */}
                    <div className="d-flex justify-content-center mt-3">
                        <h3 className="fw-bold text-truncate">PROJECTS BOARD</h3>
                    </div>

                    {/* Список проектов */}
                    <section className="board-list container ps-0 mt-1">
                        <div className="col-auto">
                            <div className="list-group row flex-row" id="list-tab">
                                {/* Проход по списку проектов и создание кнопки для каждого проекта */}
                                {projects.map((project) => (
                                    <div key={project.projectId} className="d-flex pe-0">
                                        <button
                                            className={`list-group-item project-name bg-secondary text-start ps-3 pe-0 mt-1 flex-grow-1 border-0 border-end-0 text-white fs-5 text-truncate ${selectedProject && selectedProject.projectId === project.projectId ? 'active' : ''}`}
                                            onClick={() => handleProjectSelect(project.projectId)}
                                        >
                                            {project.projectName}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Форма создания нового проекта */}
                            <CreateProjectForm onAddProject={handleAddProject} />
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Sidebar;