import axios from "../../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

import { SetStateAction, useState, useEffect, useRef, useCallback } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../Category";
import { DndState } from "../Category";
import Task from "./Task";
import { admin } from "@styles/icons";
import SubTask from "src/pages/adminPage/CategoryDnD/SubTask";

interface Title {
  column: ColumnType;
  selectedList: any;
}

interface ITaskList {
  column: ColumnType;
  isDraggingOver: boolean;
  isPold: boolean;
  height?: number;
}

interface Container {
  type?: string;
  column: ColumnType;
  selectedList: any;
  isDragging?: boolean;
  isHovered?: boolean;
  isDrag?: boolean;
  isPold?: boolean;
  height?: number;
}

interface AddButton {
  isVisible: boolean;
}

const ContainerWrap = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: margin-bottom 0.3s ease-in-out;

  ${(props) => (props.column._id === props.selectedList._id ? css`` : css``)}

  ${(props) =>
    props.isHovered &&
    css`
      margin-bottom: 30px;
    `}
`;

const Title = styled.h3<Title>`
  font-size: 16px;
  font-weight: 800;
  margin: 5px;
  padding: 5px;
  border-radius: 13px;
  transition: background-color 0.3s ease;

  ${({ column }) =>
    column.darkMode
      ? css`
          color: rgba(255, 255, 255, 0.8);
        `
      : css`
          color: rgba(0, 0, 0, 0.8);
        `};
`;

const TaskList = styled.div<ITaskList>`
  padding: 10px;
  flex-grow: 1;
  border-radius: 10px;
  /* margin: 8px 8px; */
  width: 100%;

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

const Container = styled.div<Container>`
  position: relative;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 40px;
  transition: background-color 0.3s ease, margin-bottom 0.3s ease-in-out, max-height 0.5s cubic-bezier(0.4, 0, 0.6, 1);

  .pold-btn {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 12px;
    right: 10px;

    ${(props) =>
      props.column._id === props.selectedList._id
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

  ${({ column, selectedList }) =>
    column.darkMode
      ? css`
          color: white;
          ${column._id === selectedList._id
            ? css`
                background-color: #181818;
              `
            : css`
                background-color: #3b3b3b;
              `}
        `
      : css`
          color: rgba(0, 0, 0, 0.8);
          ${column._id === selectedList._id
            ? css`
                background-color: #cecece;
              `
            : css`
                background-color: #f5f5f7;
              `}
        `};

  .close-btn-column {
    position: absolute;
    top: 3px;
    right: 3px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    padding: 0;
    cursor: pointer;
    justify-content: center;
    margin-inline-end: 5px;
    margin-top: 5px;
    order: -1;
    width: 35px;
    height: 35px;
    border: 0;
    background: none;

    ${(props) =>
      props.column._id === props.selectedList._id
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
        fill: currentColor;
        height: 20px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 20px;
      }
    }
  }
`;

const AddButton = styled.div<Container>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 40px;
  bottom: -20px;
  transition: fill 0.3s ease-in-out;

  path {
    fill: #353535;
  }

  &:hover {
    path {
      fill: #272727;
    }
  }

  ${(props) =>
    props.type === "inner" &&
    css`
      width: 30px;
      height: 30px;
      bottom: 0px;
    `}

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }

  ${(props) =>
    props.column._id === props.selectedList._id
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
  setAddedProductList: React.Dispatch<any>;
  setIconImg: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChapNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setIsAdverListClick: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAdvertise: React.Dispatch<React.SetStateAction<Advertise[]>>;
  setSelectedAdverID: React.Dispatch<React.SetStateAction<string>>;
  setIsAdvertiseEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsCategoryAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryType: React.Dispatch<React.SetStateAction<string | null>>;
  isDrag: boolean;
  selectedPold: boolean;
  setSelectedPold: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChangePold: (type: string, id: string) => void;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isHeight: boolean;
  setIsHeight: React.Dispatch<React.SetStateAction<boolean>>;
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
  isDisabled,
  setIsDisabled,
  isHeight,
  setIsHeight,
}: IColumnProps) => {
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [addHeight, setAddHeight] = useState<number>(0);

  const columnRef = useRef<HTMLDivElement | null>(null);

  const Selected = async (e: any, index: number) => {
    const draggableId = e.target.getAttribute("data-rbd-drag-handle-draggable-id");
    const selectedColumn = dnd.columns.find((list: any) => list._id === draggableId);
    setSelectedIndex(index);

    if (selectedColumn) {
      setSelectedAdvertise([]);
      setSelectedAdverID("");

      console.log(selectedColumn);

      setSelectedList(selectedColumn);
      setSelectedName(selectedColumn.name);
      setSelectedURL(selectedColumn.url);

      if (selectedColumn.advertise) {
        setAdvertise(selectedColumn.advertise);
      }

      setInitialName(selectedColumn.name);
      setIconImg([]);

      if (selectedColumn.navHide) {
        setSelectedNavHide(true);
      } else {
        setSelectedNavHide(false);
      }

      if (selectedColumn.darkMode) {
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
        setSelectedAdverID("");
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

  const AddButtonClick = (type: string) => {
    setIsCategoryAddModal(true);
    setIsCategoryType(type);
  };

  const DeleteButtonClick = () => {
    setIsCategoryDeleteModal(true);
  };

  useEffect(() => {
    if (columnRef.current) {
      setHeight(columnRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (selectedList.taskIds?.length === 0) {
      setShowAddButton(true); // 조건이 참이면 바로 보여줌
    } else {
      // 조건이 거짓이 되면 300ms 후에 사라짐
      timer = setTimeout(() => {
        setShowAddButton(false);
      }, 300);
    }
    // 컴포넌트가 unmount 되거나 조건이 다시 변경될 때 타이머 클리어
    return () => clearTimeout(timer);
  }, [selectedList, tasks]);

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
    <Draggable draggableId={column._id} index={index}>
      {(provided, snapshot) => (
        <ContainerWrap className="container-wrap" column={column} selectedList={selectedList} isHovered={hoveredIndex === index}>
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            column={column}
            selectedList={selectedList}
            className={"container-column"}
            isDragging={snapshot.isDragging}
            isHovered={hoveredIndex === index}
            isPold={column.pold}
            height={height}
          >
            {column && column.taskIds?.length !== 0 && (
              <button
                className="pold-btn"
                onClick={() => {
                  onChangePold("column", column._id);
                }}
              >
                <motion.svg width="15" height="15" viewBox="0 0 17 8.85">
                  <motion.polyline
                    variants={animation}
                    initial={false}
                    animate={column.pold ? "open1" : "close1"}
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
                    animate={column.pold ? "open2" : "close2"}
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
            <button type="button" className="close-btn-column" onClick={DeleteButtonClick}>
              <span>
                <svg width="21" height="21" role="img" aria-hidden="true">
                  <path fill="none" d="M0 0h21v21H0z"></path>
                  <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
            <Title {...provided.dragHandleProps} onClick={(e) => Selected(e, index)} column={column} selectedList={selectedList}>
              {column.name}
            </Title>
            {showAddButton && (
              <AddButton type={"inner"} className="addbutton" column={column} selectedList={selectedList} onClick={() => AddButtonClick("inner")}>
                <admin.Plus width="18px" height="18px" fill={"#0071e3"}></admin.Plus>
              </AddButton>
            )}
            <Droppable droppableId={column._id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={(el) => {
                    provided.innerRef(el);
                    columnRef.current = el; // innerRef와 별도로 containerRef도 설정
                  }}
                  // ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  column={column}
                  isPold={column.pold || snapshot.isDraggingOver}
                  className="tasklist"
                  height={height}
                >
                  {tasks &&
                    tasks.map((task: any, taskidx: number) => {
                      const subtasks = task.subTaskIds && task.subTaskIds.map((subtaskId: any) => subtaskId);
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
                          setSelectedIndex={setSelectedIndex}
                          setIsCategoryAddModal={setIsCategoryAddModal}
                          setIsCategoryDeleteModal={setIsCategoryDeleteModal}
                          setIsCategoryType={setIsCategoryType}
                          isDrag={isDrag}
                          selectedPold={selectedPold}
                          setSelectedPold={setSelectedPold}
                          setSelectedMessage={setSelectedMessage}
                          onChangePold={onChangePold}
                          height={height}
                          setHeight={setHeight}
                          setAddHeight={setAddHeight}
                          isHeight={isHeight}
                          setIsHeight={setIsHeight}
                        />
                      );
                    })}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
          <AddButton
            type={"outer"}
            className={`addButton ${snapshot.isDragging ? "drag" : ""}`}
            column={column}
            selectedList={selectedList}
            onClick={() => AddButtonClick("outer")}
            isHovered={hoveredIndex === index}
            isDrag={isDrag}
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

export default Column;
