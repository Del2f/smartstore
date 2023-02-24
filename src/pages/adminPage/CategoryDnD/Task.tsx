import React, { SetStateAction } from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

interface IContainer {
    isDragDisabled: boolean;
    isDragging: boolean;
    task: {
        _id: string;
        name: string;
    };
    selectedList: any;
}

const Container = styled.div<IContainer>`
    border: 1px solid #f1f1f1;
    border-color: ${(props) => (props.isDragging ? "#c1c7d3" : "f0f0f0")};
    font-size: 12px;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 8px;

    background-color: ${(props) => (props.isDragDisabled ? "black" : props.isDragging ? "#b0b5c0" : "#f1f1f1")};
    background-color: ${(props) => (props.task._id == props.selectedList._id ? "#7986a0" : "f0f0f0")};
    transition: background-color 0.3s ease;

`;

interface ITaskProps {
    task: {
        _id: string;
        name: string;
    };
    index: number;
    categoryList: any;
    subCategoryList: any;
    setIsSelected: React.Dispatch<SetStateAction<boolean>>;
    selectedList: any;
    setSelectedList: React.Dispatch<any>;
    setIsSelectedTask: React.Dispatch<any>;
    setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
}

const Task = ({ task, index, categoryList, selectedList, subCategoryList, setIsSelected, setSelectedList, setIsSelectedTask, setSelectedName}: ITaskProps) => {
    const isDragDisabled = task._id === "";

    const Selected = (e: any) => {
        const select = e.target.textContent;
        const data = subCategoryList.filter((list: any) => list.name == select);
        setIsSelected(false);
        setIsSelectedTask(true);
        setSelectedList(data[0]);
        setSelectedName(data[0].name);
    };

    return (
        <Draggable draggableId={task._id} index={index} isDragDisabled={isDragDisabled}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={isDragDisabled}
                    task={task}
                    selectedList={selectedList}
                    onClick={Selected}
                >
                    {task.name}
                </Container>
            )}
        </Draggable>
    );
};

export default React.memo(Task);
