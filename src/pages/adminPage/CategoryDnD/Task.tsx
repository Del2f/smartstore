import axios from "../../../api/axios";
import React, { SetStateAction, useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

import { DndState } from "../Category";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../Category";
import SubTask from "./SubTask";
import { admin } from "@styles/icons";

const scale = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  
`;

interface Title {
  column: ColumnType;
  task: TaskType;
  selectedList: any;
}

interface type {
  type: string;
  task: TaskType;
  selectedList: any;
  isHovered?: boolean;
  column?: ColumnType;
}

interface Icon {
  icon: string;
  column: ColumnType;
}

interface ISubTaskList {
  isDraggingOver: boolean;
  task: TaskType;
  isPold: boolean;
}

interface IContainer {
  isDragging: boolean;
  column: ColumnType;
  task: TaskType;
  selectedList: any;
  isHovered?: boolean;
  isPold: boolean;
}

const ContainerWrap = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: margin-bottom 0.3s ease-in-out;

  ${(props) =>
    !props.isPold
      ? css`
          pointer-events: none;
        `
      : css`
          pointer-events: auto;
        `};

  ${(props) =>
    props.task._id === props.selectedList._id
      ? css`
          /* margin-bottom: 30px; */
        `
      : css``}

  ${(props) =>
    props.isHovered &&
    css`
      margin-bottom: 40px;
    `}
`;

const Title = styled.h3<Title>`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  border-radius: 13px;
  margin: 5px;
  transition: background-color 0.3s ease;

  /* ${({ column, task, selectedList }) =>
    column.darkMode
      ? `
  color: rgba(255,255,255,.8);
  background-color: ${task._id === selectedList._id ? "black" : "black"};
  `
      : `
  color: rgba(0,0,0,.8);
  background-color: ${task._id === selectedList._id ? "#b8b8b8" : "#f3f3f3"};
  `}; */

  & img,
  span {
    pointer-events: none;
  }
`;

const SubTaskList = styled.div<ISubTaskList>`
  flex-grow: 1;
  width: 100%;
  padding: 10px;

  ${(props) =>
    props.task && props.task.subTaskIds?.length !== 0
      ? css`
          /* margin: 10px; */
          /* padding: 10px; */
        `
      : css`
          /* margin: 0; */
        `}

  ${(props) =>
    !props.isPold
      ? css`
          pointer-events: none;
          max-height: 30px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.24s step-end 80ms, max-height 0.5s cubic-bezier(0.4, 0, 0.6, 1);
        `
      : css`
          pointer-events: auto;
          max-height: 150vh;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.24s step-start 80ms, max-height 0.5s cubic-bezier(0.4, 0, 0.6, 1);
        `};
`;

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* position: relative; */
  width: 100%;
  font-size: 12px;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 25px;
  transition: background-color 0.3s ease, margin-bottom 0.3s ease-in-out, max-height 0.5s ease-in-out;

  .pold-btn-task {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;

    ${(props) =>
      props.task._id === props.selectedList._id
        ? css`
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, height 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-end 80ms;
          `
        : css`
            opacity: 1;
            visibility: visible;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, height 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-start 80ms;
          `};
  }

  /* ${(props) =>
    !props.isPold
      ? css`
          max-height: 50px;
          overflow: hidden;
        `
      : css`
          max-height: 100vh;
          overflow: hidden;
        `} */

  ${({ column, task, selectedList }) =>
    column.darkMode
      ? css`
          color: rgba(255, 255, 255, 0.8);

          ${task._id === selectedList._id
            ? css`
                background-color: #131313;
              `
            : css`
                background-color: #2c2c2c;
              `}
        `
      : css`
          color: rgba(0, 0, 0, 0.8);

          .addbutton > path {
            fill: rgba(158, 40, 40, 0.8);
          }

          ${task._id === selectedList._id
            ? css`
                background-color: #c2c2c2;
              `
            : css`
                background-color: #ececec;
              `}
        `};

  .close-btn-task {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    padding: 0;
    cursor: pointer;
    justify-content: center;
    margin-inline-end: 3px;
    margin-top: 2px;
    order: -1;
    width: 35px;
    height: 35px;
    border: 0;
    background: none;

    ${(props) =>
      props.task._id === props.selectedList._id
        ? css`
            opacity: 1;
            visibility: visible;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.24s step-start 80ms;
          `
        : css`
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-end;
          `};

    span {
      align-items: center;
      border-radius: 50%;
      color: #6e6e73;
      display: flex;
      outline: none;
      position: relative;
      transition: color 0.1s linear, background 0.1s linear;

      svg {
        position: absolute;
        fill: currentColor;
        left: 50%;
        width: 20px;
        height: 20px;
        transform: translateX(-50%);
      }
    }
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  pointer-events: none;
`;

const Icon = styled.svg<Icon>`
  width: 20px;
  height: 20px;
  background-image: url(${(props) => props.icon});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  ${({ column }) =>
    column.darkMode
      ? css`
          filter: brightness(100);
        `
      : css``};
`;

const AddButton = styled.div<type>`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25px;
  cursor: pointer;
  left: 50%;
  bottom: -37px;
  transition: fill 0.3s ease-in-out;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 20px;
    font-weight: 500;
  }

  & > svg {
    width: 14px;
    height: 14px;
  }

  ${(props) =>
    props.column && props.column.darkMode
      ? css`
          path {
            fill: #f5f5f7;
          }
          &:hover {
            path {
              fill: #dbdbdb;
            }
          }
        `
      : css`
          path {
            fill: #353535;
          }

          &:hover {
            path {
              fill: #272727;
            }
          }
        `};

  path {
  }

  ${(props) =>
    props.type === "inner" &&
    css`
      bottom: -11px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    `}

  ${(props) =>
    props.task._id === props.selectedList._id
      ? css`
          opacity: 1;
          visibility: visible;
          transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, height 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-start 80ms;

          ${props.type === "outer" && css``}
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, height 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-end 80ms;
        `};
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
  setSelectedList: React.Dispatch<any>;
  setSelectedName: React.Dispatch<SetStateAction<string | undefined>>;
  setSelectedURL: React.Dispatch<SetStateAction<string | undefined>>;
  setAddedProductList: React.Dispatch<any>;
  setIconImg: React.Dispatch<React.SetStateAction<string[]>>;
  setInitialName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChapNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setIsAdverListClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setSelectedAdverID: React.Dispatch<React.SetStateAction<string>>;
  setIsAdvertiseEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<SetStateAction<number | null>>;
  setIsCategoryAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryType: React.Dispatch<React.SetStateAction<string | null>>;
  isDrag: boolean;
  selectedPold: boolean;
  setSelectedPold: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChangePold: (type: string, id: string) => void;
  height: number;
  setHeight: React.Dispatch<SetStateAction<number>>;
  setAddHeight: React.Dispatch<SetStateAction<number>>;
  isHeight: boolean;
  setIsHeight: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = ({
  dnd,
  task,
  column,
  subtasks,
  index,
  isSelectedTask,
  selectedList,
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
  setSelectedIndex,
  setIsCategoryAddModal,
  setIsCategoryDeleteModal,
  setIsCategoryType,
  isDrag,
  selectedPold,
  setSelectedPold,
  setSelectedMessage,
  onChangePold,
  height,
  setHeight,
  setAddHeight,
  isHeight,
  setIsHeight,
}: ITaskProps) => {
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const taskRef = useRef<HTMLDivElement | null>(null);

  const taskSelected = async (e: any) => {
    const draggableId = e.target.getAttribute("data-rbd-drag-handle-draggable-id");
    const selectedTask = dnd.tasks.find((list: any) => list._id === draggableId);
    setSelectedIndex(index);

    if (selectedTask) {
      setSelectedAdvertise([]);
      setSelectedAdverID("");

      // console.log(selectedTask);

      setSelectedList(selectedTask);
      setSelectedName(selectedTask.name);
      setSelectedURL(selectedTask.url);

      setSelectedMessage(selectedTask.message);
      setInitialName(selectedTask.name);

      if (selectedTask.advertise) {
        setAdvertise(selectedTask.advertise);
      }

      if (selectedTask.icon) {
        setIconImg(selectedTask.icon);
      } else {
        setIconImg([]);
      }

      if (selectedTask.navHide) {
        setSelectedNavHide(true);
      } else {
        setSelectedNavHide(false);
      }

      if (selectedTask.chapterNavHide) {
        setSelectedChapNavHide(true);
      } else {
        setSelectedChapNavHide(false);
      }

      if (selectedTask.darkMode) {
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
        setIconImg([]);
        setAdvertise([]);
        setSelectedAdvertise([]);
        setSelectedAdverID("");
        setSelectedNavHide(false);
        setSelectedChapNavHide(false);
        setSelectedDarkMode(false);
        setIsAdverListClick(false);
        setIsAdvertiseEdit(false);
        setSelectedMessage('');
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

  const AddButtonClick = (type: string) => {
    setIsCategoryAddModal(true);
    setIsCategoryType(type);
  };

  const DeleteButtonClick = () => {
    setIsCategoryDeleteModal(true);
  };

  useEffect(() => {
    let timer;
    if (selectedList.subTaskIds?.length === 0) {
      setShowAddButton(true); // 조건이 참이면 바로 보여줌
    } else {
      // 조건이 거짓이 되면 300ms 후에 사라짐
      timer = setTimeout(() => {
        setShowAddButton(false);
      }, 300);
    }
    // 컴포넌트가 unmount 되거나 조건이 다시 변경될 때 타이머 클리어
    return () => clearTimeout(timer);
  }, [selectedList]);

  const animation = {
    open1: {
      points: ["15 1.13, 8.5 7.72, 2 1.13", "15.85 4.42, 8.5 4.42, 1.15 4.42", "15 7.72, 8.5 1.13, 2 7.72"],
    },
    close1: {
      points: ["15 7.72, 8.5 1.13, 2 7.72", "15.85 4.42, 8.5 4.42, 1.15 4.42", "15 1.13, 8.5 7.72, 2 1.13"],
    },
    open2: {
      points: ["15 1.13, 8.5 7.72, 2 1.13", "15.85 4.42, 8.5 4.42, 1.15 4.42", "15 7.72, 8.5 1.13, 2 7.72"],
    },
    close2: {
      points: ["15 7.72, 8.5 1.13, 2 7.72", "15.85 4.42, 8.5 4.42, 1.15 4.42", "15 1.13, 8.5 7.72, 2 1.13"],
    },
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <ContainerWrap className="container-wrap" task={task} selectedList={selectedList} isHovered={hoveredIndex === index} isPold={column.pold}>
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            column={column}
            task={task}
            selectedList={selectedList}
            isDragging={snapshot.isDragging}
            isHovered={hoveredIndex === index}
            isPold={task.pold}
          >
            {task && task.subTaskIds?.length !== 0 && (
              <button className="pold-btn-task" onClick={() => onChangePold("task", task._id)}>
                <motion.svg width="15" height="15" viewBox="0 0 17 8.85">
                  <motion.polyline
                    variants={animation}
                    initial={false}
                    animate={task.pold ? "open1" : "close1"}
                    transition={{ duration: 0.32 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="accordion-icon-shape"
                  />
                  <motion.polyline
                    variants={animation}
                    initial={false}
                    animate={task.pold ? "open2" : "close2"}
                    transition={{ duration: 0.32 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="accordion-icon-shape"
                  />
                </motion.svg>
              </button>
            )}
            <button type="button" className="close-btn-task" onClick={DeleteButtonClick}>
              <span>
                <svg width="21" height="21" role="img" aria-hidden="true">
                  <path fill="none" d="M0 0h21v21H0z"></path>
                  <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
            <Title {...provided.dragHandleProps} onClick={taskSelected} task={task} selectedList={selectedList} column={column}>
              {task.icon ? (
                <IconWrap>
                  <Icon icon={task.icon[0]} column={column} />
                </IconWrap>
              ) : (
                ""
              )}
              <span style={{ display: "inline-block" }}>{task.name}</span>
            </Title>
            {showAddButton && (
              <AddButton
                className="addbutton"
                type={"inner"}
                task={task}
                selectedList={selectedList}
                onClick={() => AddButtonClick("inner")}
                column={column}
              >
                <admin.Plus width="18px" height="18px" fill={"#0071e3"}></admin.Plus>
              </AddButton>
            )}
            <Droppable droppableId={task._id} type="subtask" isDropDisabled={!column.pold}>
              {(provided, snapshot) => (
                <SubTaskList
                  {...provided.droppableProps}
                  ref={(el) => {
                    provided.innerRef(el);
                    taskRef.current = el; // innerRef와 별도로 containerRef도 설정
                  }}
                  isDraggingOver={snapshot.isDraggingOver}
                  isPold={task.pold || snapshot.isDraggingOver}
                  task={task}
                >
                  {subtasks &&
                    subtasks.map((subtask: any, subtaskidx: number) => {
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
                          setSelectedIndex={setSelectedIndex}
                          setIsCategoryAddModal={setIsCategoryAddModal}
                          setIsCategoryDeleteModal={setIsCategoryDeleteModal}
                          setIsCategoryType={setIsCategoryType}
                          isDrag={isDrag}
                          setSelectedMessage={setSelectedMessage}
                        />
                      );
                    })}
                  {provided.placeholder}
                </SubTaskList>
              )}
            </Droppable>
          </Container>
          <AddButton
            className="addbutton"
            type={"outer"}
            task={task}
            selectedList={selectedList}
            onClick={() => AddButtonClick("outer")}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <admin.Plus width="18px" height="18px" fill={"#0071e3"}></admin.Plus>
          </AddButton>
        </ContainerWrap>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
