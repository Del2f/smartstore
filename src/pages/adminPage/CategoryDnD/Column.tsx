import axios from "../../../api/axios";
import styled from "styled-components";
import { SetStateAction } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../Category";
import { DndState } from "../Category";
import Task from "./Task";

interface Title {
  column: ColumnType;
  selectedList: any;
  selectedId: string | null;
}

const Title = styled.h3<Title>`
  font-size: 16px;
  font-weight: 800;
  margin: 10px;
  padding: 5px;
  border-radius: 13px;

  ${({column, selectedId}) => (column.darkMode ? `
  color: rgba(255,255,255,.8);
  `:`
  color: rgba(0,0,0,.8);
  `)};

  transition: background-color 0.3s ease;

`;

interface ITaskList {
  column: ColumnType;
  isDraggingOver: boolean;
}

const TaskList = styled.div<ITaskList>`
  padding: 10px;
  flex-grow: 1;
  border-radius: 10px;
  margin: 8px 8px;
`;

interface Container {
  column: ColumnType;
  selectedList: any;
}

const Container = styled.div<Container>`
  width: 100%;
  margin: 8px 0;
  border-radius: 20px;

  ${({column, selectedList}) => (column.darkMode ? `
  color: white;
  background-color: ${(column._id === selectedList._id ? "black" : "#3b3b3b")};
  `:`
  color: rgba(0,0,0,.8);
  background-color: ${(column._id === selectedList._id ? "#cecece" : "#f5f5f7")};
  `)};

  transition: background-color 0.3s ease;

`;

interface IColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
  dnd: DndState;
  isSelected: boolean;
  isSelectedTask: boolean;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>;
  setIsSelectedTask: React.Dispatch<SetStateAction<boolean>>;
  setIsSelectedSubTask: React.Dispatch<SetStateAction<boolean>>;
  selectedList: any;
  setSelectedList: React.Dispatch<any>;
  setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
  setSelectedURL: React.Dispatch<SetStateAction<string | undefined>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<SetStateAction<string | null>>;
  setAddedProductList: React.Dispatch<any>;
  setIconImg: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChapNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setIsAdverListClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setSelectedAdverID: React.Dispatch<React.SetStateAction<string>>;
  setIsAdvertiseEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Column = ({
  column,
  tasks,
  index,
  dnd,
  isSelected,
  setIsSelected,
  isSelectedTask,
  setIsSelectedTask,
  setIsSelectedSubTask,
  selectedList,
  setSelectedList,
  setSelectedName,
  setSelectedURL,
  selectedId,
  setSelectedId,
  setAddedProductList,
  setIconImg,
  setSelectedNavHide,
  setSelectedChapNavHide,
  setSelectedDarkMode,
  setInitialName,
  setAdvertise,
  setIsAdverListClick,
  setSelectedAdvertise,
  setSelectedAdverID,
  setIsAdvertiseEdit,
}: IColumnProps) => {

  const Selected = async (e: any) => {
    const draggableId = e.target.getAttribute('data-rbd-drag-handle-draggable-id');
    const selectedColumn = dnd.columns.find((list: any) => list._id === draggableId);
    console.log(selectedColumn);

    if (selectedColumn) {
      setSelectedAdvertise([]);
      setSelectedAdverID("");

      setSelectedList(selectedColumn);
      setSelectedName(selectedColumn.name);
      setSelectedURL(selectedColumn.url);
      if(selectedColumn.advertise){
        setAdvertise(selectedColumn.advertise);
      }

      setInitialName(selectedColumn.name);
      setSelectedId(selectedColumn._id);
      setIconImg("");

      if(selectedColumn.navHide){
        setSelectedNavHide(true);
      } else {
        setSelectedNavHide(false);
      }
  
      if(selectedColumn.darkMode){
        setSelectedDarkMode(true);
      } else {
        setSelectedDarkMode(false);
      }

      if (selectedList._id === selectedColumn._id) {
        setAddedProductList([]);
        setSelectedList("");
        setSelectedName("");
        setSelectedURL("");
        setInitialName("");
        setAdvertise([]);
        setSelectedAdvertise([]);
        setSelectedAdverID('');
        setSelectedId(null);
        setSelectedNavHide(false);
        setSelectedDarkMode(false);
        setIsAdverListClick(false);
  
        setIsSelected(false);
        setIsSelectedTask(false);
        setIsSelectedSubTask(false);

        setIsAdvertiseEdit(false);
        return;
      }
    } 

    setIsSelected(true);
    setIsSelectedTask(false);
    setIsSelectedSubTask(false);

    try {
      const res = await axios.post("/smartstore/home/category/productcategorylist", selectedColumn, { withCredentials: true });
      const { Advertises, productList } = res.data;

      setAdvertise(Advertises);
      setAddedProductList(productList);
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
              <TaskList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} column={column}>
                <>
                  {tasks &&
                    tasks.map((task, taskidx) => {
                      const subtasks = task.subTaskIds && task.subTaskIds.map((subtaskId: any) => subtaskId );
                      return (
                      <Task
                        key={task._id}
                        task={task}
                        subtasks={subtasks}
                        index={taskidx}
                        dnd={dnd}
                        column={column}
                        isSelectedTask={isSelectedTask}
                        setIsSelected={setIsSelected}
                        selectedList={selectedList}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        setSelectedList={setSelectedList}
                        setIsSelectedTask={setIsSelectedTask}
                        setIsSelectedSubTask={setIsSelectedSubTask}
                        setSelectedName={setSelectedName}
                        setSelectedURL={setSelectedURL}
                        setAddedProductList={setAddedProductList}
                        setIconImg={setIconImg}
                        setSelectedNavHide={setSelectedNavHide}
                        setSelectedChapNavHide={setSelectedChapNavHide}
                        setSelectedDarkMode={setSelectedDarkMode}
                        setInitialName={setInitialName}
                        setAdvertise={setAdvertise}
                        setIsAdverListClick={setIsAdverListClick}
                        setSelectedAdvertise={setSelectedAdvertise}
                        setSelectedAdverID={setSelectedAdverID}
                        setIsAdvertiseEdit={setIsAdvertiseEdit}
                      />
                    )})}
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
