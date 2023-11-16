import axios from "../../../api/axios";
import React, { SetStateAction } from "react";
import styled from "styled-components";
import { DndState } from "../Category"
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../Category";
import SubTask from "./SubTask";

interface Title {
  column: ColumnType;
  task: TaskType;
  selectedList: any;
}

const Title = styled.h3<Title>`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 13px;
  margin: 2px;
  transition: background-color 0.3s ease;
  
  /* ${({column, task, selectedList}) => (column.darkMode ? `
  color: rgba(255,255,255,.8);
  background-color: ${(task._id === selectedList._id ? "black" : "black")};
  `:`
  color: rgba(0,0,0,.8);
  background-color: ${(task._id === selectedList._id ? "#b8b8b8" : "#f3f3f3")};
  `)}; */

  & img, span {
    pointer-events: none;
  }
`;

interface ISubTaskList {
  isDraggingOver: boolean;
}

const SubTaskList = styled.div<ISubTaskList>`
  flex-grow: 1;
  margin: 5px 7px;
`;

interface IContainer {
  isDragging: boolean;
  column: ColumnType;
  task: TaskType;
  selectedList: any;
  selectedId: string | null;
}

const Container = styled.div<IContainer>`
  font-size: 12px;
  border-radius: 15px;
  padding: 8px;
  margin-bottom: 8px;

  ${({column, task, selectedList}) => (column.darkMode ? `
  color: rgba(255,255,255,.8);
  background-color: ${task._id === selectedList._id ? "#1d1d1d" : "#2c2c2c"};
  `:`
  color: rgba(0,0,0,.8);
  background-color: ${task._id === selectedList._id ? "#dddddd" : "#ececec"};
  `)};

  transition: background-color 0.3s ease;
`;

interface ITaskProps {
  dnd: DndState;
  index: number;
  task: TaskType;
  column: ColumnType;
  subtasks: any;
  selectedList: any;
  isSelectedTask: boolean;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>;
  setIsSelectedTask: React.Dispatch<SetStateAction<boolean>>;
  setIsSelectedSubTask: React.Dispatch<SetStateAction<boolean>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<SetStateAction<string | null>>;
  setSelectedList: React.Dispatch<any>;
  setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
  setSelectedURL: React.Dispatch<SetStateAction<string | undefined>>;
  setAddedProductList: React.Dispatch<any>;
  setIconImg: React.Dispatch<React.SetStateAction<string>>;
  setInitialName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChapNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setIsAdverListClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setSelectedAdverID: React.Dispatch<React.SetStateAction<string>>;
  setIsAdvertiseEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = ({
  dnd,
  task,
  column,
  subtasks,
  index,
  isSelectedTask,
  selectedList,
  selectedId,
  setSelectedId,
  setIsSelected,
  setSelectedList,
  setIsSelectedTask,
  setIsSelectedSubTask,
  setSelectedName,
  setSelectedURL,
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
}: ITaskProps) => {

  const taskSelected = async (e: any) => {
    const draggableId = e.target.getAttribute('data-rbd-drag-handle-draggable-id');
    const selectedTask = dnd.tasks.find((list: any) => list._id === draggableId);
    console.log(selectedTask);

    if(selectedTask){
      setSelectedAdvertise([]);
      setSelectedAdverID("");

      setSelectedList(selectedTask);
      setSelectedName(selectedTask.name);
      setSelectedURL(selectedTask.url);
      setInitialName(selectedTask.name);
      setSelectedId(selectedTask._id);
      
      if(selectedTask.advertise){
        setAdvertise(selectedTask.advertise);
      }

      if(selectedTask.icon){
        setIconImg(selectedTask.icon);
      } else {
        setIconImg("");
      }
  
      if(selectedTask.navHide){
        setSelectedNavHide(true);
      } else {
        setSelectedNavHide(false);
      }
  
      if(selectedTask.chapterNavHide){
        setSelectedChapNavHide(true);
      } else {
        setSelectedChapNavHide(false);
      }
  
      if(selectedTask.darkMode){
        setSelectedDarkMode(true);
      } else {
        setSelectedDarkMode(false);
      }

      if (selectedList._id === selectedTask._id) {
        setIsSelected(false);
        setIsSelectedTask(false);
        setIsSelectedSubTask(false);
        setAddedProductList([]);
        setSelectedList("");
        setSelectedName("");
        setSelectedURL("");
        setInitialName("");
        setIconImg("");
        setAdvertise([]);
        setSelectedAdvertise([]);
        setSelectedAdverID('');
        setSelectedNavHide(false);
        setSelectedChapNavHide(false);
        setSelectedDarkMode(false);
        setIsAdverListClick(false);
        setIsAdvertiseEdit(false);
        return;
      }
    }

    setIsSelected(false);
    setIsSelectedTask(true);
    setIsSelectedSubTask(false);

    try {
      const res = await axios.post("/smartstore/home/category/productcategorylist", selectedTask, { withCredentials: true });
      const { Advertises, productList } = res.data;

      setAdvertise(Advertises);
      setAddedProductList(productList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          column={column}
          task={task}
          selectedList={selectedList}
          selectedId={selectedId}
        >
          <Title {...provided.dragHandleProps} onClick={taskSelected} task={task} selectedList={selectedList} column={column}>
            {task.icon ? (
              <img src={task.icon} style={{height: "20px", marginRight: "8px"}} alt="" />
            ) : ""}
            <span style={{ display: "inline-block" }}>
              {task.name}
            </span>
          </Title>
          <Droppable droppableId={task._id} type="subtask">
            {(provided, snapshot) => (
              <SubTaskList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                <>
                  {subtasks &&
                    subtasks.map((subtask, subtaskidx) => {
                      return (
                      <SubTask
                        key={subtask._id}
                        subtask={subtask}
                        subtasks={subtasks}
                        index={subtaskidx}
                        column={column}
                        dnd={dnd}
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
                      />
                    )
                    })}
                      {provided.placeholder}
                </>

              </SubTaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
