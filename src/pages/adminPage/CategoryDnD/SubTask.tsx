import axios from "../../../api/axios";
import React, { SetStateAction, useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { DndState } from "../Category";
import { Draggable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType } from "../Category";
import { admin } from "@styles/icons";

interface IContainer {
  isDragDisabled: boolean;
  isDragging: boolean;
  column: ColumnType;
  subtask: SubTaskType;
  selectedList: any;
}

interface Container {
  type: string;
  subtask: SubTaskType;
  selectedList: any;
  isHovered?: boolean;
}

interface Icon {
  icon: string;
  column: ColumnType;
}

const ContainerWrap = styled.div<any>`
  position: relative;
  width: 100%;
  transition: margin-bottom 0.3s ease-in-out;

  ${(props) =>
    props.subtask._id === props.selectedList._id
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

const Container = styled.div<IContainer>`
  position: relative;
  font-size: 11px;
  border-radius: 10px;
  padding: 10px 8px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, margin-bottom 0.3s ease-in-out;

  ${({ column, subtask, selectedList }) =>
    column.darkMode
      ? css`
          color: rgba(255, 255, 255, 0.8);
          background-color: ${subtask._id === selectedList._id ? "#1b1b1b" : "#242424"};
        `
      : css`
          color: rgba(0, 0, 0, 0.8);
          background-color: ${subtask._id === selectedList._id ? "#d4d4d4" : "#e0e0e0"};
        `};

  ${(props) =>
    props.subtask._id === props.selectedList._id
      ? css`
          /* margin-bottom: 30px; */
        `
      : css``};

  .close-btn-subtask {
    position: absolute;
    top: 2px;
    right: 1px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    padding: 0;
    cursor: pointer;
    justify-content: center;
    margin-inline-end: 4px;
    margin-top: 3px;
    order: -1;
    width: 20px;
    height: 20px;
    border: 0;
    background: none;

    ${(props) =>
      props.subtask._id === props.selectedList._id
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
        position: absolute;
        left: 50%;
        width: 20px;
        height: 20px;
        transform: translateX(-50%);
      }
    }
  }

  & img,
  span {
    pointer-events: none;
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
  width: 15px;
  height: 15px;
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

const AddButton = styled.div<Container>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.6, 1) 0.1s;
  left: 0;
  right: 0;
  bottom: -28px;
  color: black;
  height: 28px;

  & > svg {
    width: 14px;
    height: 14px;
  }

  path {
    fill: #f5f5f7;
    transition: fill 0.3s ease-in-out;
  }

  &:hover {
    path {
      fill: #292929;
    }
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  ${(props) =>
    props.subtask._id === props.selectedList._id
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
`;

interface ISubTaskProps {
  subtask: SubTaskType;
  subtasks: TaskType[];
  column: ColumnType;
  index: number;
  dnd: DndState;
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
  setInitialName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChapNavHide: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<SetStateAction<number | null>>;
  setIsCategoryAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryType: React.Dispatch<React.SetStateAction<string | null>>;
  isDrag: boolean;
  setSelectedMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SubTask = ({
  subtask,
  subtasks,
  index,
  column,
  dnd,
  isSelectedTask,
  selectedList,
  setIsSelected,
  setSelectedList,
  setIsSelectedTask,
  setSelectedName,
  setSelectedURL,
  setAddedProductList,
  setIconImg,
  setSelectedNavHide,
  setSelectedChapNavHide,
  setSelectedDarkMode,
  setInitialName,
  setIsSelectedSubTask,
  setSelectedIndex,
  setIsCategoryAddModal,
  setIsCategoryDeleteModal,
  setIsCategoryType,
  isDrag,
  setSelectedMessage,
}: ISubTaskProps) => {
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDragDisabled = subtask._id === "";

  const flatColumnInTaskIds = dnd.columns.flatMap((column) => column.taskIds); // 모든 taskIds를 배열로 평탄화 하여 나열합니다.
  const flatSubTasks = flatColumnInTaskIds.flatMap((taskId) => taskId.subTaskIds); // 모든 subTaskIds 배열로 평탄화 하여 나열합니다.

  const subTaskSelected = async (e: any) => {
    const draggableId = e.target.getAttribute("data-rbd-drag-handle-draggable-id");
    const selectedSubTask = flatSubTasks && flatSubTasks.filter((list: any) => list !== undefined).find((list: any) => list._id === draggableId);
    setSelectedIndex(index);

    if (selectedSubTask) {
      setSelectedList(selectedSubTask);
      setSelectedName(selectedSubTask.name);
      setSelectedURL(selectedSubTask.url);
      setSelectedMessage(selectedSubTask.message);

      setInitialName(selectedSubTask.name);
      if (selectedSubTask.icon) {
        setIconImg(selectedSubTask.icon);
      } else {
        setIconImg([]);
      }

      if (selectedSubTask.navHide) {
        setSelectedNavHide(true);
      } else {
        setSelectedNavHide(false);
      }

      if (selectedSubTask.chapterNavHide) {
        setSelectedChapNavHide(true);
      } else {
        setSelectedChapNavHide(false);
      }

      if (selectedSubTask.darkMode) {
        setSelectedDarkMode(true);
      } else {
        setSelectedDarkMode(false);
      }

      if (selectedList._id === selectedSubTask._id) {
        setIsSelected(false);
        setIsSelectedTask(false);
        setIsSelectedSubTask(false);
        setAddedProductList([]);
        setSelectedList("");
        setSelectedName("");
        setSelectedURL("");
        setInitialName("");
        setIconImg([]);
        setSelectedNavHide(false);
        setSelectedChapNavHide(false);
        setSelectedDarkMode(false);
        setSelectedMessage('');
        return;
      }
    }

    setIsSelected(false);
    setIsSelectedTask(false);
    setIsSelectedSubTask(true);

    try {
      const res = await axios.post("/smartstore/home/category/productcategorylist", selectedSubTask, { withCredentials: true });
      setAddedProductList(res.data.productList);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (containerRef.current) {
  //     setSubTasksLoad(true);
  //   }
  // }, []);

  const AddButtonClick = (type: string) => {
    setIsCategoryAddModal(true);
    setIsCategoryType(type);
  };

  const DeleteButtonClick = () => {
    setIsCategoryDeleteModal(true);
  };

  return (
    <Draggable draggableId={subtask._id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <ContainerWrap className="container-wrap" subtask={subtask} selectedList={selectedList} isHovered={hoveredIndex === index}>
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={(el) => {
              provided.innerRef(el);
              containerRef.current = el;
            }}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
            subtask={subtask}
            column={column}
            selectedList={selectedList}
            onClick={subTaskSelected}
          >
            <button type="button" className="close-btn-subtask" onClick={DeleteButtonClick}>
              <span>
                <svg width="21" height="21" role="img" aria-hidden="true">
                  <path fill="none" d="M0 0h21v21H0z"></path>
                  <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
            {subtask.icon && (
              <IconWrap>
                <Icon icon={subtask.icon[0]} column={column} />
              </IconWrap>
            )}
            <span style={{ display: "inline-block" }}>{subtask.name}</span>
            <AddButton
              type={"outer"}
              subtask={subtask}
              selectedList={selectedList}
              onClick={() => AddButtonClick("outer")}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <admin.Plus width="18px" height="18px" fill={"#0071e3"}></admin.Plus>
            </AddButton>
          </Container>
        </ContainerWrap>
      )}
    </Draggable>
  );
};

export default React.memo(SubTask);
