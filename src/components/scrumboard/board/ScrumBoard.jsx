import {DragDropContext} from "react-beautiful-dnd";
import React, {useState} from "react";
import styled from "styled-components";
import DraggableElement from "./DraggableElement";


function ScrumBoard({tasks, stages, handleCreateTaskClick, selectedSplit }) {

    const tasksForSelectedSplit = tasks.filter(element => element.taskSplitId === selectedSplit);
    const [taskData, setTaskData] = useState(tasksForSelectedSplit);

    const ListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    column-gap: 20px;
    row-gap: 30px;
    margin-top: 30px;
  `;

    const handleDragEnd = (result) => {

        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceColumn = taskData.find(
            (column) => column.id === source.droppableId
        );
        const destinationColumn = taskData.find(
            (column) => column.id === destination.droppableId
        );
        const task = sourceColumn.task.find((task) => task.taskId === draggableId);

        sourceColumn.task.splice(source.index, 1);
        destinationColumn.task.splice(destination.index, 0, task);

        // Обновляем состояние
        setTaskData([...taskData]);

        // Сохраняем изменения в localStorage
        localStorage.setItem("projects", JSON.stringify(taskData));
    };

    const calculateStoryPointsSum = (listKey) => {
        let storyPointsSum = 0;
        taskData
            .filter((element) => element.taskStage === listKey)
            .forEach((element) => {
                storyPointsSum =
                    parseInt(element.taskStoryPoints.taskAmountOfWork, 10) +
                    parseInt(element.taskStoryPoints.taskComplexity, 10) +
                    parseInt(element.taskStoryPoints.taskRisk, 10);
            });
        return storyPointsSum;
    };

    return (
        <div>
            <div className="btn-add-task float-start">
                <button
                    className="btn btn-secondary btn-outline-warning float-start py-1 mt-2"
                    onClick={handleCreateTaskClick}
                >
                    {/* Иконка кнопки переключения боковой панели */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523
             13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6
              12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315
             3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523
              4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4
               4.44772 4 5V19Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
            <br/>
            <DragDropContext onDragEnd={handleDragEnd} className="drag-drop-context">
                <div className="container">
                    <ListGrid className="list-grid row">
                        {stages.map((listKey) => (
                            <DraggableElement className="draggable"
                                              elements={taskData.filter(element => element.taskStage === listKey.id)}
                                              key={listKey.id}
                                              prefix={listKey.title}
                                              stages={stages}
                                              taskData={taskData}
                                              setTaskData={setTaskData}
                                              storyPointsSum={calculateStoryPointsSum(listKey.id)}
                            />
                        ))}
                    </ListGrid>
                </div>
            </DragDropContext>
        </div>
    );
}

export default ScrumBoard;