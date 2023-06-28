import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  width: 70%;
  padding: 10px;
  border-radius: 6px;
  background: var(--grey-900);
`;

const DraggableElement = ({ prefix, stages, elements, taskData, setTaskData, storyPointsSum }) => {

    return (
        <DroppableStyles className="droppable-styles col h-auto">
            <ColumnHeader className={`column-header ${prefix}`}>
                <span className="dot me-1">●</span>
                {prefix}
            </ColumnHeader>
            <Droppable className="droppable" droppableId={`${prefix}`}>
                {(provided, snapshot) => (
                    <div
                        className={`droppable-styles col h-auto ${snapshot.isDraggingOver ? 'bg-light' : ''}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {elements.map((item, index) => (
                            <ListItem
                                className="ListItem"
                                key={item.taskId}
                                item={item}
                                index={index + 1}
                                dragHandleProps={provided.dragHandleProps}
                                taskData={taskData}
                                setTaskData={setTaskData}
                                storyPointsSum={storyPointsSum}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </DroppableStyles>
    );
}

export default DraggableElement;