import axios from "../../../api/axios";

import styled from "styled-components";
import { SetStateAction } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

interface IColumnProps {
    column: { _id: string; name: string; taskIds: string[]; type: number };
    tasks: {
        _id: string;
        name: string;
    }[];
    index: number;
    
    categoryList: any;
    subCategoryList: any;

    isSelected: boolean;
    isSelectedTask: boolean;

    setIsSelected: React.Dispatch<SetStateAction<boolean>>;
    setIsSelectedTask: React.Dispatch<any>;

    selectedList: any;
    setSelectedList: React.Dispatch<any>;
    setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;

    selectedId: string | null;
    setSelectedId: React.Dispatch<SetStateAction<string | null>>;

    setAddedProductList: React.Dispatch<any>;
}

interface Title {
    column: any;
    selectedList: any;
    selectedId: string | null;
}

const Title = styled.h3<Title>`
    font-size: 14px;
    padding: 12px;
    /* border: 1px solid  */
    border-radius: 8px;
    margin: 10px;
    background-color: ${(props) => (props.column._id == props.selectedId ? "#747fa3" : "#dddddd")};
    transition: background-color 0.3s ease;
`;

interface ITaskList {
    isDraggingOver: boolean;
}

const TaskList = styled.div<ITaskList>`
    padding: 10px;
    flex-grow: 1;
    border-radius: 10px;
    margin: 0px 8px 8px 8px;
    background-color: ${(props) => (props.isDraggingOver ? "#f4f6fa" : "white")};
`;

interface Container {
    column: any;
    selectedList: any;
}

const Container = styled.div<Container>`
    margin: 8px;
    background-color: white;
    border-radius: 10px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;

const Column = ({
    column,
    tasks,
    index,
    categoryList,
    subCategoryList,
    isSelected,
    setIsSelected,
    isSelectedTask,
    setIsSelectedTask,
    selectedList,
    setSelectedList,
    setSelectedName,
    selectedId,
    setSelectedId,
    setAddedProductList,
}: IColumnProps) => {
    
    const Selected = async (e: any) => {
        const select = e.target.textContent;
        const data = categoryList.filter((list: any) => list.name == select);
        setIsSelected(true);
        setIsSelectedTask(false);
        setSelectedList(data[0]);
        setSelectedName(data[0].name);
        setSelectedId(data[0]._id);

        if (selectedList.name == e.target.textContent) {
            setIsSelected(false);
            setIsSelectedTask(false);
            setSelectedList("");
            setSelectedName("");
            setSelectedId(null);
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
        <Draggable draggableId={column._id} index={index}>
            {(provided) => ( 
                <Container ref={provided.innerRef} {...provided.draggableProps} column={column} selectedList={selectedList}>
                    <Title {...provided.dragHandleProps} onClick={Selected} column={column} selectedList={selectedList} selectedId={selectedId}>
                        {column.name}
                    </Title>
                    <Droppable droppableId={column._id} type="task">
                        {(provided, snapshot) => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                <>
                                    {tasks &&
                                        tasks.map((task, idx) => (
                                            <Task
                                                key={task._id}
                                                task={task}
                                                index={idx}
                                                isSelectedTask={isSelectedTask}
                                                categoryList={categoryList}
                                                subCategoryList={subCategoryList}
                                                setIsSelected={setIsSelected}
                                                selectedList={selectedList}
                                                selectedId={selectedId}
                                                setSelectedId={setSelectedId}
                                                setSelectedList={setSelectedList}
                                                setIsSelectedTask={setIsSelectedTask}
                                                setSelectedName={setSelectedName}
                                                setAddedProductList={setAddedProductList}
                                            />
                                        ))}
                                    {provided.placeholder}
                                </>
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
};

export default Column;
