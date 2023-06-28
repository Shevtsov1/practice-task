import { Draggable } from "react-beautiful-dnd";
import React, {useState} from "react";
import styled from "styled-components";
import EditTaskModal from "../tasks/EditTaskModal";

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, taskData, setTaskData, storyPointsSum }) => {


    return (
        <Draggable draggableId={String(item.taskId)} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        className="drag-item text-black"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        draggable={!snapshot.isDragging}
                        data-rbd-draggable-context-id="0"
                        data-rbd-draggable-id={item.taskId}
                    >
                            <>
                                <DragItem>
                                    <CardHeader className="card-header text-truncate">{item.taskTitle}<hr className="hr my-1"/></CardHeader>
                                    {item.taskDescription}
                                    <hr className="hr my-1 text-truncate"/>
                                    <CardFooter className="card-footer">
                                        <span>A{item.taskStoryPoints.taskAmountOfWork}</span>
                                        <span>C{item.taskStoryPoints.taskComplexity}</span>
                                        <span>R{item.taskStoryPoints.taskRisk}</span>
                                        <span>
                                            S{storyPointsSum}
                                        </span>
                                        <Author className="author">{item.id}</Author>
                                    </CardFooter>
                                </DragItem>
                            </>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default ListItem;