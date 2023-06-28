import React, { useEffect, useState } from "react";
import Sidebar from "./bars/Sidebar";
import Navbar from "./bars/Navbar";
import BasePageInfo from "./BasePageInfo";
import ProjectDetails from "./scrumboard/project/ProjectDetails";

function Home() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showSidebar, setShowSidebar] = useState(
        localStorage.getItem("showSidebar") === "true"
    );
    const [showBasePageInfo, setShowBasePageInfo] = useState(true);
    const [selectedSplitName, setSelectedSplitName] = useState(null);
    useEffect(() => {
        localStorage.setItem("showSidebar", showSidebar.toString());
    }, [showSidebar]);

    useEffect(() => {
        const lastShowSidebar = localStorage.getItem("showSidebar") === "true";
        if (lastShowSidebar !== showSidebar) {
            setShowSidebar(lastShowSidebar);
        }
    }, [showSidebar]);


    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };


    const handleProjectSelect = (selectedProject) => {
        setSelectedProject(selectedProject);
        setShowBasePageInfo(false);
    };

    const handleBasePageInfoClick = () => {
        setSelectedProject(null);
        setShowBasePageInfo(true);
        setSelectedSplitName(null);
    };

    const handleSplitClick = (split) => {
        setSelectedSplitName(split.splitName);
    };

    const handleProjectUpdate = (updatedProject) => {
        setSelectedProject(updatedProject);
    };

    return (
        <div className="Home">
            <section className="section-header">
                <Navbar
                    onLogosClick={handleBasePageInfoClick}
                    onProjectSelect={handleProjectSelect}
                    onProjectUpdate={handleProjectUpdate}
                />
                <Sidebar
                    showSidebar={showSidebar}
                    setShowSidebar={handleToggleSidebar}
                    onProjectSelect={handleProjectSelect}
                />
            </section>
            <section
                className={`section-main px-5 py-4 overflow-auto z-0 ${
                    showSidebar ? "section-main-80" : "section-main-100"
                }`}
            >
                {showBasePageInfo ? (
                    <BasePageInfo onClick={handleBasePageInfoClick} />
                ) : (
                    <ProjectDetails
                        project={selectedProject}
                        selectedSplitName={selectedSplitName}
                        onSplitClick={handleSplitClick}
                        onProjectUpdate={handleProjectUpdate}
                    />
                )}
            </section>
        </div>
    );
}

export default Home;