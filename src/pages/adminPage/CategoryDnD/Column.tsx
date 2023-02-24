import styled from "styled-components";
import { SetStateAction } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

interface IColumnProps {
  column: { _id: string; name: string; taskIds: string[], type:number; };
  tasks: {
    _id: string;
    name: string;
  }[];
  index: number;
  categoryList: any;
  subCategoryList: any;
  isSelected: boolean;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>;
  selectedList: any;
  setSelectedList: React.Dispatch<any>;
  setIsSelectedTask: React.Dispatch<any>;
  setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
}

interface Title {
  column: any;
  selectedList: any;
}

const Title = styled.h3<Title>`
  font-size: 14px;
  padding: 12px;
  /* border: 1px solid  */
  border-radius: 8px;
  margin: 10px;
  background-color: ${(props) => (props.column._id == props.selectedList._id ? "#747fa3" : "#dddddd")};
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

const Column = ({ column, tasks, index, categoryList, subCategoryList, isSelected, setIsSelected, selectedList, setSelectedList, setIsSelectedTask, setSelectedName }: IColumnProps) => {

  const Selected = (e: any) => {
    const select = e.target.textContent;
    const data = categoryList.filter((list: any) => list.name == select);
    setIsSelected(true);
    setIsSelectedTask(false);
    setSelectedList(data[0]);
    setSelectedName(data[0].name)
  };
  
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} column={column} selectedList={selectedList} >
          <Title {...provided.dragHandleProps} onClick={Selected} column={column} selectedList={selectedList}>{column.name}</Title>
          <Droppable droppableId={column._id} type="task">
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <>
                  {tasks && tasks.map((task, idx) => (
                    <Task key={task._id} task={task} index={idx} categoryList={categoryList} subCategoryList={subCategoryList} setIsSelected={setIsSelected} selectedList={selectedList} setSelectedList={setSelectedList} setIsSelectedTask={setIsSelectedTask} setSelectedName={setSelectedName}/>
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
