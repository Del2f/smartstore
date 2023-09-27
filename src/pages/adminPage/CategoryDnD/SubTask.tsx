import axios from "../../../api/axios";
import React, { SetStateAction } from "react";
import styled from "styled-components";
import { DndState } from "../Category";
import { Draggable } from "react-beautiful-dnd";
import { ColumnType, TaskType, SubTaskType } from "../Category";

interface IContainer {
  isDragDisabled: boolean;
  isDragging: boolean;
  column: ColumnType;
  subtask: SubTaskType;
  selectedList: any;
  selectedId: string | null;
}

const Container = styled.div<IContainer>`
  font-size: 11px;
  border-radius: 10px;
  padding: 6px 8px;
  margin-bottom: 3px;

  ${({column, subtask, selectedList}) => (subtask.darkMode ? `
  color: rgba(255,255,255,.8);
  background-color: ${subtask._id === selectedList._id ? "#1b1b1b" : "#272727"};
  `:`
  color: rgba(0,0,0,.8);
  background-color: ${subtask._id === selectedList._id ? "#c9c9c9" : "#e4e4e4"};
  `)};

  transition: background-color 0.3s ease, color 0.3s ease;

  &:last-child {
    margin-bottom: 0px;
  }

  & img, span {
    pointer-events: none;
  }
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
}

const SubTask = ({
  subtask,
  subtasks,
  index,
  column,
  dnd,
  isSelectedTask,
  selectedList,
  selectedId,
  setSelectedId,
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
}: ISubTaskProps) => {
  const isDragDisabled = subtask._id === "";

  const flatColumnInTaskIds = dnd.columns.flatMap((column) => column.taskIds); // 모든 taskIds를 배열로 평탄화 하여 나열합니다.
  const flatSubTasks = flatColumnInTaskIds.flatMap((taskId) => taskId.subTaskIds); // 모든 subTaskIds 배열로 평탄화 하여 나열합니다.

  const subTaskSelected = async (e: any) => {
    const draggableId = e.target.getAttribute("data-rbd-drag-handle-draggable-id");
    const selectedSubTask = flatSubTasks && flatSubTasks.filter((list: any) => list !== undefined).find((list: any) => list._id === draggableId);

    if (selectedSubTask) {
      setSelectedList(selectedSubTask);
      setSelectedName(selectedSubTask.name);
      setSelectedURL(selectedSubTask.url);

      setInitialName(selectedSubTask.name);
      setSelectedId(selectedSubTask._id);
      if (selectedSubTask.icon) {
        setIconImg(selectedSubTask.icon);
      } else {
        setIconImg("");
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
        setIconImg("");
        setSelectedNavHide(false);
        setSelectedChapNavHide(false);
        setSelectedDarkMode(false);
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

  return (
    <Draggable draggableId={subtask._id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          subtask={subtask}
          column={column}
          selectedList={selectedList}
          selectedId={selectedId}
          onClick={subTaskSelected}
        >
          {subtask.icon ? <img src={subtask.icon} style={{ width: "10px", height: "10px", marginRight: "5px" }} alt="" /> : ""}
          <span style={{ display: "inline-block" }}>{subtask.name}</span>
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(SubTask);
