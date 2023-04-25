import axios from "../../../api/axios";
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
    selectedId: string | null;
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
    isSelectedTask: boolean;
    setIsSelected: React.Dispatch<SetStateAction<boolean>>;
    setIsSelectedTask: React.Dispatch<any>;
    categoryList: any;
    subCategoryList: any;
    selectedList: any;
    selectedId: string | null;
    setSelectedId: React.Dispatch<SetStateAction<string | null>>;
    setSelectedList: React.Dispatch<any>;
    setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
    setAddedProductList: React.Dispatch<any>;

}

const Task = ({ task, index, isSelectedTask, categoryList, selectedList, selectedId, setSelectedId, subCategoryList, setIsSelected, setSelectedList, setIsSelectedTask, setSelectedName, setAddedProductList }: ITaskProps) => {
    const isDragDisabled = task._id === "";

    const Selected = async (e: any) => {
        const select = e.target.textContent;
        const data = subCategoryList.filter((list: any) => list.name == select);
        setIsSelected(false);
        setIsSelectedTask(true);
        setSelectedList(data[0]);
        setSelectedName(data[0].name);
        setSelectedId(data[0]._id);

        if (selectedList.name == e.target.textContent) {
            setIsSelected(false);
            setIsSelectedTask(false);
            setSelectedList("");
            setSelectedName("");
        }

        try {
            const res = await axios.post("/smartstore/home/category/productcategorylist", data[0], { withCredentials: true });
            console.log(res.data.productList);
            setAddedProductList(res.data.productList);
        } catch (err) {
            console.log(err);
        }
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
                    selectedId={selectedId}
                    onClick={Selected}
                >
                    {task.name}
                </Container>
            )}
        </Draggable>
    );
};

export default React.memo(Task);
