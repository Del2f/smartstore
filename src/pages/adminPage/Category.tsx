import axios from "../../api/axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";
import TableProductList from "../../components/admin/TableProductList";
import CategoryIconRegi from "../../components/admin/CategoryIconRegi";
import AdvertiseImage from "../../components/admin/AdvertiseImage";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./CategoryDnD/Column";
import type1 from "@img/home/category/type1.png";
import type2 from "@img/home/category/type2.png";
import type3 from "@img/home/category/type3.png";

type Props = {
  setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
  setNotice?: React.Dispatch<SetStateAction<string>>;
  setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const CategoryInfoUl = styled.ul`
  display: flex;
`;

const CategoryInfoLi = styled.li``;

// 이름 체크박스

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  position: relative;
  width: 100px;
  height: 30px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: var(--gray-color);

  & h5 {
    font-size: 12px;
    font-weight: 800;
  }
`;

interface Input {
  checked: boolean;
}

const Input = styled.input.attrs({ type: "checkbox" })<Input>`
  display: none;
`;

const CustomCheckbox = styled.span`
  display: inline-block;
  position: absolute;
  top: -1px;
  left: -1px;
  width: 20px;
  height: 20px;
  border-radius: 20px;

  ${Input}:checked + & {
    content: "";
    width: 100px;
    height: 30px;
    border: 2px solid var(--blue-color);
  }
`;

const AdvertiseBtn = styled.button`
  position: absolute;
  right: 15px;
  border: none;
  border-radius: 15px;
  background-color: var(--blue-color);
  padding: 8px 15px;
  bottom: 5px;

  & span {
    color: var(--white-color);
    font-weight: 600;
  }
`;

const AdvertiseListBtn = styled.button`
  border: none;
  border-radius: 15px;
  background-color: var(--blue-color);
  padding: 8px 15px;
  bottom: 5px;

  & span {
    color: var(--white-color);
    font-weight: 600;
  }
`;

interface TypeBox {
  number: number;
  selectedType: number;
}

const TypeBoxWrap = styled.div`
  display: flex;
  gap: 15px;
`;

const TypeBox = styled.label<TypeBox>`
  height: 100%;

  & img {
    width: 100%;
    border-radius: 13px;
    outline: ${({ selectedType, number }) => (selectedType === number ? "2px solid #0071e3" : "none")};
  }

  & input {
    display: none;
  }
`;

const AdSubmitBtn = styled.button`
  margin-top: 30px;
  display: inline-block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: var(--btn-blue-color);

  & span {
    display: inline-block;
    color: var(--white-color);
    font-size: 16px;
    font-weight: 700;
  }
`;

interface showProductList {
  isProductListShow: boolean;
}

const ProductListWrap = styled.div<showProductList>`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isProductListShow
      ? `
opacity: 1;
visibility: visible;
`
      : `
opacity: 0;
visibility: hidden;
   `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
`;
const ProductList = styled.div`
  position: relative;
  width: 1000px;
`;

const Blur = styled.div<showProductList>`
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  ${(props) =>
    props.isProductListShow
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
  `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
`;

const BlurWrap = styled.div<showProductList>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isProductListShow
      ? `
      visibility: visible;
      `
      : `
      visibility: hidden;
  `}
`;

interface adverPreview {
  adBackColor: string;
}

const AdverPreview = styled.div<adverPreview>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  /* border: 1px solid; */
  /* border-color: var(--input-border-color); */
  border-radius: 15px;
  background-color: ${(props) => props.adBackColor};

  & input {
    background-color: transparent;
  }
`;

const AdverPreviewColumn = styled.div<adverPreview>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  /* border: 1px solid; */
  /* border-color: var(--input-border-color); */
  border-radius: 15px;
  background-color: ${(props) => props.adBackColor};

  & input {
    background-color: transparent;
  }
`;

export interface SubTaskType {
  type: string;
  _id: string;
  parentID: string;
  name: string | undefined;
  url: string | undefined;
  user: string;
  icon?: string;
  navHide?: boolean;
  chapterNavHide?: boolean;
  darkMode?: boolean;
}

export interface TaskType {
  type: string;
  _id: string;
  parentID: string;
  name: string | undefined;
  url: string | undefined;
  user: string;
  icon?: string;
  navHide?: boolean;
  chapterNavHide?: boolean;
  darkMode?: boolean;
  subTaskIds?: SubTaskType[] | null;
}

export interface ColumnType {
  type: string;
  _id: string;
  name: string | undefined;
  url: string | undefined;
  taskIds: Array<TaskType>;
  user: string;
  navHide?: boolean;
  darkMode?: boolean;
}

export interface DndState {
  columnOrder: Array<string>;
  columns: Array<ColumnType>;
  tasks: Array<TaskType>;
}

export interface Advertise {
  type: number;
  name: string;
  subtitle: string;
  maintitle: string;
  detail: string;
  subdetail: string;
  url: string;
  backcolor: string;
}

function Category(props: Props) {
  const token = useSelector(selectToken);

  useEffect(() => {
    props.setNoticeIcon && props.setNoticeIcon("");
    props.setNotice && props.setNotice("카테고리 관리");
    props.setNoticeDate && props.setNoticeDate("");
    setIsCategory(true);
  }, []);

  // 카테고리 페이지 접속시 true로 반환.
  const [isCategory, setIsCategory] = useState<boolean>(false);

  // 우측 상품목록
  const [selectedProductList, setSelectedProductList] = useState<any>([]);

  // 중앙 카테고리에 등록된 상품 목록
  const [addedProductList, setAddedProductList] = useState<any>([]);

  const [iconImg, setIconImg] = useState<string>("");

  const [addedErrMessage, setAddedErrMessage] = useState<string>("");
  const [addedSelected, setAddedSelected] = useState<any>([]);
  const [addedSelectedName, setAddedSelectedName] = useState<string | null>();
  const [isAddedSelected, setIsAddedSelected] = useState<boolean>(false);

  const [selectedList, setSelectedList] = useState<any>([]);
  const [selectedName, setSelectedName] = useState<string>();
  const [selectedURL, setSelectedURL] = useState<string>();

  const [initialName, setInitialName] = useState<string>();
  const [selectedNavHide, setSelectedNavHide] = useState<boolean>(false);
  const [selectedChapNavHide, setSelectedChapNavHide] = useState<boolean>(false);
  const [selectedDarkMode, setSelectedDarkMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [addColumn, setAddColumn] = useState<string>("");

  // 오류 메세지
  const [AddMessage, setAddMessage] = useState<string>("");
  const [NameMessage, setNameMessage] = useState<string>("");

  // 유효성 검사
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isSelectedTask, setIsSelectedTask] = useState<boolean>(false);
  const [isSelectedSubTask, setIsSelectedSubTask] = useState<boolean>(false);

  const [isName, setIsName] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  // Ref
  const inputRef = useRef<any>();
  const listRef = useRef<any>(null);
  const blurWrapRef = useRef<any>();
  const blurRef = useRef<any>();
  const colorRef = useRef<any>();
  const imgRef = useRef<any>();

  // 카테고리 등록된 상품
  // const addedRefs = useRef<any>(null);
  // const addedBtnArea = useRef<any>(null);

  // 카테고리 DND로 전송할 데이터
  const [dnd, setDnd] = useState<DndState>({
    columnOrder: [],
    columns: [],
    tasks: [],
  });
  console.log(dnd);

  const flatColumn = dnd.columns.flatMap((column) => column); // dnd.columns를 배열로 평탄화 하여 나열합니다.
  const flatColumnInTaskIds = dnd.columns.flatMap((column) => column.taskIds); // 모든 taskIds를 배열로 평탄화 하여 나열합니다.
  const flatSubTasks = flatColumnInTaskIds.flatMap((taskId) => taskId.subTaskIds); // 모든 subTaskIds 배열로 평탄화 하여 나열합니다.

  // 광고페이지 전환
  const [isAdvertise, setIsAdvertise] = useState<boolean>(false);
  // console.log("isAdvertise " + isAdvertise);

  // 광고페이지의 광고타입을 지정합니다.
  const [selectedType, setSelectedType] = useState<number>(0);
  const [adName, setAdname] = useState<string>("");
  const [adSubTitle, setAdSubTitle] = useState<string>("");
  const [adMainTitle, setAdMainTitle] = useState<string>("");
  const [adDetail, setAdDetail] = useState<string>("");
  const [adSubDetail, setAdSubDetail] = useState<string>("");
  const [adURL, setAdURL] = useState<string>("");
  const [adBackColor, setAdBackColor] = useState<string>("");
  const [adProduct, setAdProduct] = useState<any>([]);
  const [adImage, setAdImage] = useState<string>("");

  // 광고페이지 상품 클릭 여부
  const [isProductClick, setIsProductClick] = useState<boolean>(false);

  const [isAdName, setIsAdName] = useState<boolean>(false);
  const [isAdSubTitle, setIsAdSubTitle] = useState<boolean>(false);
  const [isAdMainTitle, setIsAdMainTitle] = useState<boolean>(false);
  const [isAdDetail, setIsAdDetail] = useState<boolean>(false);
  const [isAdSubDetail, setIsAdSubDetail] = useState<boolean>(false);
  const [isAdURL, setIsAdURL] = useState<boolean>(false);
  const [isAdImage, setIsAdImage] = useState<boolean>(false);
  const [isBackColor, setIsBackColor] = useState<boolean>(false);

  const [advertise, setAdvertise] = useState<Advertise[]>([]);

  const [isAdFinish, setIsAdFinish] = useState<boolean>(false);
  console.log(isAdFinish);

  // 광고 등록 에러 메세지
  const [ErrAdName, setErrAdName] = useState<string>("");
  const [ErrAdSubTitle, setErrAdSubTitle] = useState<string>("");
  const [ErrAdMainTitle, setErrAdMainTitle] = useState<string>("");
  const [ErrAdDetail, setErrAdDetail] = useState<string>("");
  const [ErrAdSubDetail, setErrAdSubDetail] = useState<string>("");
  const [ErrAdURL, setErrAdURL] = useState<string>("");
  const [ErrAdFinish, setErrAdFinish] = useState<string>("");
  const [ErrProductList, setErrProductList] = useState<string>("");

  // 상품 목록창 boolean
  const [isProductListShow, setIsProductListShow] = useState<boolean>(false);

  const [colorSelector, setColorSelector] = useState<boolean>(false);
  console.log(colorSelector);

  // console.log(isAdSubTitle);
  // console.log(isAdMainTitle);
  // console.log(isAdDetail);
  // console.log(isAdSubDetail);
  // console.log(isAdURL);

  // 광고 관련 함수 모음.
  const Advertise = {
    advertiseShow: () => {
      setIsAdvertise(true);
      setIsCategory(false);
    },
    cateInfoShow: () => {
      setIsAdvertise(false);
      setIsCategory(true);
    },
    adName: (e: any) => {
      setAdname(e.target.value);

      if (e.target.value.length === 0) {
        setIsAdName(false);
        setErrAdName("광고 이름을 입력해주세요.");
        return;
      }

      if (e.target.value.length > 11) {
        setIsAdName(false);
        setErrAdName("10글자 내로 입력해주세요.");
      } else {
        setAdname(e.target.value);
        setIsAdName(true);
      }
    },
    adSubTitle: (e: any) => {
      if (e.target.value.length > 11) {
        setErrAdSubTitle("10글자 내로 입력해주세요.");
        setIsAdSubTitle(false);
        return;
      } else {
        setAdSubTitle(e.target.value);
        setIsAdSubTitle(true);
      }
    },
    adMainTitle: (e: any) => {
      if (e.target.value.length > 16) {
        setErrAdMainTitle("15글자 내로 입력해주세요.");
        setIsAdMainTitle(false);
        return;
      } else {
        setAdMainTitle(e.target.value);
        setIsAdMainTitle(true);
      }
    },
    adDetail: (e: any) => {
      if (e.target.value.length > 51) {
        setErrAdDetail("50글자 내로 입력해주세요.");
        setIsAdDetail(false);
      } else {
        setAdDetail(e.target.value);
        setIsAdDetail(true);
      }
    },
    adSubDetail: (e: any) => {
      if (e.target.value.length > 31) {
        setErrAdSubDetail("30글자 내로 입력해주세요.");
        setIsAdSubDetail(false);
      } else {
        setAdSubDetail(e.target.value);
        setIsAdSubDetail(true);
      }
    },
    // 등록된 상품 클릭시
    adProductClick: () => {
      setIsProductClick(true);
    },
    ProductListShow: () => {
      setIsProductListShow(true);
      setErrProductList("");
    },
    ProductListClose: () => {
      setIsProductListShow(false);
    },
    // 상품 추가 버튼
    ProductAdd: async (e: any) => {
      e.preventDefault();

      if (!selectedProductList[0]) {
        setErrProductList("상품을 선택 해주세요.");
        setIsAdURL(false);
        return;
      }

      if (!selectedProductList[0]?.url || selectedProductList[0]?.url === "") {
        setErrProductList("상품의 URL이 없습니다. 상품 수정으로 URL을 등록해주세요.");
        setIsAdURL(false);
        return;
      }

      Advertise.ProductListClose();

      setIsAdURL(true);
      setAdProduct(selectedProductList);
      setAdURL(selectedProductList[0].url);
    },

    // 상품 삭제 버튼
    ProductDelete: async (e: any) => {
      e.preventDefault();

      if (!isProductClick) {
        console.log("카테고리가 등록된 상품이 선택되지 않았습니다.");
        return;
      }

      setAdProduct([]);
      setAdURL("");
    },

    adSubmit: async (e: any) => {
      e.preventDefault();

      if (isSelectedSubTask) {
        setIsAdFinish(false);
        setErrAdFinish("해당 카테고리는 광고를 노출 할 수 없습니다.");
        return;
      }

      if (isSelected || isSelectedTask) {
        setIsAdFinish(true);
        setErrAdFinish("");

        if (isAdName && isAdSubTitle && isAdMainTitle && isAdDetail && isAdSubDetail && isAdURL && isBackColor) {
          setIsAdFinish(true);
          setErrAdFinish("");

          const newAdvertise = {
            type: selectedType,
            name: adName,
            subtitle: adSubTitle,
            maintitle: adMainTitle,
            detail: adDetail,
            subdetail: adSubDetail,
            url: adURL,
            backcolor: adBackColor,
          };

          setAdvertise([...advertise, newAdvertise]);
          console.log(advertise);

          try {
            await axios.post("/smartstore/home/category/advertise", { newAdvertise, selectedList }, { withCredentials: true });
          } catch (err) {
            console.log(err);
          }
        } else {
          setIsAdFinish(false);
          setErrAdFinish("내용을 전부 입력해주세요.");
        }
      } else {
        setIsAdFinish(false);
        setErrAdFinish("카테고리를 선택 해주세요.");
      }

      if (!selectedProductList[0]) {
        setErrAdFinish("상품을 선택 해주세요.");
        setIsAdURL(false);
        return;
      }
    },
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(Number(e.target.value));
  };

  // 유저 카테고리 가져오기
  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.post("/smartstore/home/category", token, { withCredentials: true });
        console.log(res.data);

        const columnOrder: any = new Array();
        const columns: any = new Array();
        const tasks: any = new Array();

        res.data.category.map((list: any) => {
          columnOrder.push(list._id);
        });
        columns.push(...res.data.category);
        tasks.push(...res.data.subCategory);

        const sendingDND = {
          columnOrder: columnOrder,
          columns: columns,
          tasks: tasks,
        };

        // 불러오면서 초기화
        console.log("admin의 카테고리 값을 불러오면서 초기화 합니다");
        setSelectedId("");
        setIsSelected(false);
        setIsSelectedTask(false);
        setIsSelectedSubTask(false);
        setSelectedList([]);

        setDnd(sendingDND);
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, []);

  // 카테고리 이름 입력
  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    setAddColumn(input);
    setAddMessage("");
    if (input.length > 20) {
      setAddMessage("20글자 이내로 작성해주세요.");
      return;
    }
  };

  // 추가하려는 메인 카테고리
  const addCategory = {
    beforeData: dnd,
    newData: addColumn,
  };

  // 추가하려는 서브 카테고리
  const addSubCategory = {
    beforeData: dnd,
    parentID: selectedList._id,
    name: addColumn,
    icon: iconImg,
  };

  // 추가하려는 서브테스크 카테고리
  const addSubTaskCategory = {
    beforeData: dnd,
    findID: selectedList._id,
    parentID: selectedList.parentID,
    user: selectedList.user,
    name: addColumn,
    icon: iconImg,
  };

  // 카테고리 추가
  const categoryAdd = async () => {
    if (addColumn === "") {
      setAddMessage("카테고리 이름을 입력해주세요.");
      return;
    }
    setSelectedName("");

    // if (isSelectedTask) {
    //   setAddMessage("세부 카테고리는 추가 할수 없습니다.");
    //   return;
    // }

    if (isSelected) {
      console.log("서브카테고리 추가");
      try {
        const res = await axios.post("/smartstore/home/category/subplus", addSubCategory, { withCredentials: true });
        console.log(res.data);

        const newColumnIndex = dnd.columns.findIndex((list: any) => list._id === res.data.newTask._id);

        dnd.columns.splice(newColumnIndex, 1, res.data.newTask);

        const sendingDND = {
          columnOrder: dnd.columnOrder,
          columns: dnd.columns,
          tasks: res.data.sub,
        };

        // setSubCategoryList(res.data.sub);
        setDnd(sendingDND);
        setAddColumn("");
      } catch (err) {
        console.log(err);
      }
    } else if (isSelectedTask) {
      console.log("서브테스크 카테고리 추가");
      try {
        const res = await axios.post("/smartstore/home/category/subtaskplus", addSubTaskCategory, { withCredentials: true });
        console.log(res.data);

        const newColumnIndex = dnd.tasks.findIndex((list: any) => list._id === res.data.newTask._id);

        dnd.tasks.splice(newColumnIndex, 1, res.data.newTask);

        const sendingDND = {
          columnOrder: dnd.columnOrder,
          columns: res.data.columns,
          tasks: res.data.tasks,
        };
        console.log(sendingDND);

        setDnd(sendingDND);
        setAddColumn("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post("/smartstore/home/category/plus", addCategory, { withCredentials: true });
        console.log(res.data);

        const newColumnOrder = res.data.map((list: any) => list._id);
        const newColumns = res.data;

        const sendingDND = {
          columnOrder: newColumnOrder,
          columns: newColumns,
          tasks: dnd.tasks,
        };

        // setCategoryList(res.data);
        setDnd(sendingDND);
        setAddColumn("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 카테고리 삭제
  const categoryDelete = async () => {
    if (isSelected) {
      console.log("Column 삭제");

      const deletedColumnOrder = dnd.columnOrder.filter((list: any) => list !== selectedList._id);
      const deletedColumns = dnd.columns.filter((list: any) => list._id !== selectedList._id);

      const findDeleteColumn = dnd.columns.filter((list: any) => list._id === selectedList._id);
      const deleteList = findDeleteColumn[0].taskIds.map((list: any) => list._id);
      const deletedTasks = dnd.tasks.filter((list: any) => !deleteList.includes(list._id));

      const updatedDnd = {
        columnOrder: deletedColumnOrder,
        columns: deletedColumns,
        tasks: deletedTasks,
      };

      setIsSelected(false);
      setIsSelectedTask(false);
      setIsSelectedSubTask(false);
      setDnd(updatedDnd);

      try {
        await axios.post("/smartstore/home/category/delete", { updatedDnd, selectedList }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    } else if (isSelectedTask) {
      console.log("Task 삭제");

      const columnToUpdate = dnd.columns.find((column) => column._id === selectedList.parentID);

      if (columnToUpdate) {
        const updatedTaskIds = columnToUpdate.taskIds.filter((taskId) => taskId._id !== selectedList._id);
        const updatedTasks = dnd.tasks.filter((list: any) => list._id !== selectedList._id);
        const updatedColumns = dnd.columns.map((column) => (column._id === columnToUpdate._id ? { ...column, taskIds: updatedTaskIds } : column));

        setDnd({ ...dnd, columns: updatedColumns, tasks: updatedTasks });

        const updatedDnd = {
          columnOrder: dnd.columnOrder,
          columns: updatedColumns,
          tasks: updatedTasks,
        };

        try {
          await axios.post("/smartstore/home/category/delete", { updatedDnd, selectedList }, { withCredentials: true });
        } catch (err) {
          console.log(err);
        }
      }

      // 초기화
      setSelectedName("");
      setIsSelected(false);
      setIsSelectedTask(false);
      setIsSelectedSubTask(false);
    } else if (isSelectedSubTask) {
      console.log("SubTask 삭제");

      const updatedColumns = dnd.columns.map((column) => {
        const updatedTaskIds = column.taskIds.map((taskid) => {
          const updatedSubTaskIds = taskid.subTaskIds?.filter((subTask) => subTask._id !== selectedList._id);
          return { ...taskid, subTaskIds: updatedSubTaskIds };
        });

        return { ...column, taskIds: updatedTaskIds };
      });

      const updatedTasks = dnd.tasks.map((task) => {
        const updatedSubTaskIds = task.subTaskIds?.filter((subTask) => subTask._id !== selectedList._id);

        return { ...task, subTaskIds: updatedSubTaskIds };
      });

      console.log(updatedColumns);
      console.log(updatedTasks);

      setDnd({ ...dnd, columns: updatedColumns, tasks: updatedTasks });

      const updatedDnd = {
        columnOrder: dnd.columnOrder,
        columns: updatedColumns,
        tasks: updatedTasks,
      };

      try {
        await axios.post("/smartstore/home/category/delete", { updatedDnd, selectedList }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    } else {
      setAddMessage("삭제할 카테고리를 선택 해주세요.");
    }

    // 초기화
    setSelectedName("");
    setIsSelected(false);
    setIsSelectedTask(false);
    setIsSelectedSubTask(false);
  };

  // 카테고리 이름
  const onChange = (e: any) => {
    if (isSelected || isSelectedTask || isSelectedSubTask) {
      setSelectedName(e.target.value);
    }
  };

  // URL 주소
  const onChangeURL = (e: any) => {
    if (isSelected || isSelectedTask || isSelectedSubTask) {
      setSelectedURL(e.target.value);
    }
  };

  // 저장 버튼
  const CategoryEdit = async (e: any) => {
    e.preventDefault();

    const duplication = dnd.columns.find((list: any) => {
      return list.name === selectedName && selectedName !== initialName;
    });

    // if (duplication) {
    //   setNameMessage("이미 등록된 카테고리 명 입니다.");
    //   return;
    // }

    // if (selectedList.name === "전체상품" || selectedList.name === "베스트") {
    //   setNameMessage("해당 카테고리는 이름을 변경 할 수 없습니다.");
    //   return;
    // }

    // if (selectedList && selectedName!.length > 10) {
    //     setNameMessage("10글자 미만으로 입력 해주세요.");
    //     return;
    // }

    if (isSelected) {
      console.log("Column 저장");

      if (selectedName === "") {
        setNameMessage("카테고리 이름을 입력해 주세요.");
        return;
      }
      setNameMessage("");

      const updatedColumns = dnd.columns.map((column) => {
        if (column._id === selectedList._id) {
          return {
            ...column,
            name: selectedName,
            icon: iconImg,
            navHide: selectedNavHide,
            chapterNavHide: selectedChapNavHide,
            darkMode: selectedDarkMode,
            url: selectedURL,
          };
        }
        return column;
      });

      setDnd({ ...dnd, columns: updatedColumns });

      const updatedDnd = {
        columnOrder: dnd.columnOrder,
        columns: updatedColumns,
        tasks: dnd.tasks,
      };

      try {
        await axios.post("/smartstore/home/category/edit", { updatedDnd, selectedList, selectedName }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    } else if (isSelectedTask) {
      console.log("Task 저장");

      if (selectedName === "") {
        setNameMessage("카테고리 이름을 입력해 주세요.");
        return;
      }
      setNameMessage("");

      // dnd = 최종 업로드될 카테고리 배열.
      // 선택한 서브 카테고리를 dnd의 서브 카테고리에서 _id로 찾는다.
      const updatedColumns = dnd.columns.map((column) => {
        const updatedTaskIds = column.taskIds.map((taskid) => {
          if (taskid._id === selectedList._id) {
            return {
              ...taskid,
              name: selectedName,
              icon: iconImg,
              navHide: selectedNavHide,
              chapterNavHide: selectedChapNavHide,
              darkMode: selectedDarkMode,
              url: selectedURL,
            };
          }
          return taskid;
        });
        return { ...column, taskIds: updatedTaskIds };
      });
      console.log(updatedColumns);

      const updatedTasks = dnd.tasks.map((task) => {
        if (task._id === selectedList._id) {
          return {
            ...task,
            name: selectedName,
            icon: iconImg,
            navHide: selectedNavHide,
            chapterNavHide: selectedChapNavHide,
            darkMode: selectedDarkMode,
            url: selectedURL,
          };
        }
        return task;
      });
      console.log(updatedTasks);

      setDnd({ ...dnd, columns: updatedColumns, tasks: updatedTasks });

      const updatedDnd = {
        columnOrder: dnd.columnOrder,
        columns: updatedColumns,
        tasks: updatedTasks,
      };

      try {
        await axios.post("/smartstore/home/category/edit", { updatedDnd, selectedList, selectedName }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    } else if (isSelectedSubTask) {
      console.log("SubTask 저장");

      if (selectedName === "") {
        setNameMessage("카테고리 이름을 입력해 주세요.");
        return;
      }
      setNameMessage("");

      const updatedColumns = dnd.columns.map((column) => {
        const updatedTaskIds = column.taskIds.map((taskid) => {
          const updatedSubTaskIds = taskid.subTaskIds?.map((subTask) => {
            if (subTask._id === selectedList._id) {
              return {
                ...subTask,
                name: selectedName,
                icon: iconImg,
                navHide: selectedNavHide,
                chapterNavHide: selectedChapNavHide,
                darkMode: selectedDarkMode,
                url: selectedURL,
              };
            }
            return subTask;
          });
          return { ...taskid, subTaskIds: updatedSubTaskIds };
        });
        return { ...column, taskIds: updatedTaskIds };
      });
      console.log(updatedColumns);

      const updatedTasks = dnd.tasks.map((task) => {
        const updatedSubTaskIds = task.subTaskIds?.map((subTask) => {
          if (subTask._id === selectedList._id) {
            return {
              ...subTask,
              name: selectedName,
              icon: iconImg,
              navHide: selectedNavHide,
              chapterNavHide: selectedChapNavHide,
              darkMode: selectedDarkMode,
              url: selectedURL,
            };
          }
          return subTask;
        });
        return { ...task, subTaskIds: updatedSubTaskIds };
      });

      setDnd({ ...dnd, columns: updatedColumns, tasks: updatedTasks });

      const updatedDnd = {
        columnOrder: dnd.columnOrder,
        columns: updatedColumns,
        tasks: updatedTasks,
      };

      try {
        await axios.post("/smartstore/home/category/edit", { updatedDnd, selectedList, selectedName }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("아무것도 선택하지 않았을때 저장");
      setNameMessage("");

      const updatedDnd = dnd;

      try {
        await axios.post("/smartstore/home/category/edit", { updatedDnd }, { withCredentials: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 등록된 상품 클릭시
  const AddedProductClick = (name: string, e: React.MouseEvent<HTMLLIElement>) => {
    const select = e.currentTarget.textContent;
    const data = addedProductList.filter((list: any) => list.name === select);
    setIsAddedSelected(true);
    setAddedSelected(data);
    setAddedSelectedName(name);
  };

  // 상품 추가 버튼
  const ProductAdd = async (e: any) => {
    e.preventDefault();

    const productCategoryAdd = {
      selectedProduct: selectedProductList,
      selectedCategory: selectedList,
    };

    if (!selectedProductList[0]) {
      console.log("상품선택이 안됨");
      return;
    } else if (!selectedList) {
      console.log("카테고리 선택이 안됨");
      return;
    }

    try {
      const res = await axios.post("/smartstore/home/category/productcategoryadd", productCategoryAdd, { withCredentials: true });
      console.log(res.data);

      setAddedProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 상품 삭제 버튼
  const ProductDelete = async (e: any) => {
    e.preventDefault();

    if (!addedSelected[0]) {
      console.log("카테고리가 등록된 상품이 선택되지 않았습니다.");
      return;
    }

    console.log(addedSelected[0].category);
    console.log(selectedList._id);
    const copy = selectedList._id;
    console.log(copy);
    const addedDelete = addedSelected[0].category.filter((list: any) => list._id != selectedList._id);
    console.log(addedDelete);

    const data = {
      selectedCategory: selectedList,
      addedSelected: addedSelected,
      addedDelete: addedDelete,
    };

    try {
      const res = await axios.post("/smartstore/home/category/productcategorydelete", data, { withCredentials: true });
      console.log(res.data);
      setAddedProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 카테고리 리스트 바깥 클릭시 선택 해제
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (listRef.current && !listRef.current.contains(e.target) && !inputRef.current.contains(e.target) && !blurWrapRef.current.contains(e.target)) {
        setIsSelected(false);
        setIsSelectedTask(false);
        setIsSelectedSubTask(false);
        setSelectedId(null);
        setSelectedList([]);
        setAddedProductList([]);
        setSelectedName("");
        setSelectedURL("");
        setIconImg("");
        setSelectedNavHide(false);
        setSelectedChapNavHide(false);
        setSelectedDarkMode(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectedList]);

  // 상품목록에서 바깥 클릭시 닫힘 기능
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (blurRef.current && !blurRef.current.contains(e.target)) {
        setIsProductListShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isProductListShow]);

  // // 카테고리 등록된 상품 리스트 선택 해제
  // useEffect(() => {
  //   const clickOutside = (e: any) => {
  //     if (isAddedSelected && addedRefs.current && !addedRefs.current.contains(e.target)) {
  //       setAddedSelectedName(null);
  //       setIsAddedSelected(false);
  //       setAddedSelected("");
  //     }
  //   };

  //   document.addEventListener("mousedown", clickOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", clickOutside);
  //   };
  // }, [addedBtnArea]);

  // 카테고리 드래그시 dnd 업데이트
  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && source.index === destination.index) return;

      // column 이동 했을때
      if (type === "column") {
        console.log("column 이동");
        const newColumnOrder = Array.from(dnd.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const finishDraggableTask2 = dnd.columns.filter((list: any) => list._id === draggableId);

        const newColumns = Array.from(dnd.columns);
        newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, ...finishDraggableTask2);

        const newDnd = { ...dnd };
        newDnd.columnOrder = newColumnOrder;
        newDnd.columns = newColumns;

        console.log(newDnd);
        setDnd(newDnd);

        // 이동한 카테고리를 저장하면서 dnd를 업데이트 합니다.
        try {
          await axios.post("/smartstore/home/category/order", { newDnd }, { withCredentials: true });
        } catch (err) {
          console.log(err);
        }
      }

      // Task 이동 했을때
      if (type === "task") {
        console.log("task이동");

        const startColumn = dnd.columns.filter((list: any) => list._id === source.droppableId);
        const finishColumn = dnd.columns && dnd.columns.filter((list: any) => list._id === destination.droppableId);

        const startIndex = dnd.columns && dnd.columns.findIndex((list: any) => list._id === source.droppableId);
        const finishIndex = dnd.columns && dnd.columns.findIndex((list: any) => list._id === destination.droppableId);

        const finishDraggableTask = startColumn[0].taskIds && startColumn[0].taskIds.filter((list: any) => list._id === draggableId);
        finishDraggableTask[0].parentID = finishColumn[0]._id;

        const tasksIndex = dnd.tasks && dnd.tasks.findIndex((list: any) => list._id === finishDraggableTask[0]._id);
        dnd.tasks && dnd.tasks.splice(tasksIndex, 1, finishDraggableTask[0]);

        if (startColumn[0]._id === finishColumn[0]._id) {
          // 같은 column에서 task를 이동했을때.
          const newTaskIds = Array.from(startColumn[0].taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, ...finishDraggableTask);

          const newDnd = { ...dnd };
          newDnd.columns[startIndex].taskIds = newTaskIds;

          setDnd(newDnd);
          // 이동한 카테고리를 저장하면서 dnd를 업데이트 합니다.
          try {
            await axios.post("/smartstore/home/category/order", { newDnd }, { withCredentials: true });
          } catch (err) {
            console.log(err);
          }
        } else {
          // 다른 column 카테고리로 task 카테고리를 이동 시켰을때
          const startTaskIds = Array.from(startColumn[0].taskIds);
          startTaskIds.splice(source.index, 1);

          const newStartColumn = {
            ...startColumn[0],
            taskIds: startTaskIds,
          };
          console.log(newStartColumn);

          const finishTaskIds = Array.from(finishColumn[0].taskIds);
          finishTaskIds.splice(destination.index, 0, ...finishDraggableTask);

          const newFinishColumn = {
            ...finishColumn[0],
            taskIds: finishTaskIds,
          };

          const newDnd = { ...dnd };

          newDnd.columns[startIndex] = newStartColumn;
          newDnd.columns[finishIndex] = newFinishColumn;

          setDnd(newDnd);
          // 이동한 카테고리를 저장하면서 dnd를 업데이트 합니다.
          try {
            await axios.post("/smartstore/home/category/order", { newDnd }, { withCredentials: true });
          } catch (err) {
            console.log(err);
          }
        }
      }

      // subtask 이동 했을때
      if (type === "subtask") {
        // 드래그한 subTask. (object)
        const addSubTask = flatSubTasks.find((taskId) => taskId?._id === draggableId);
        const startTask = flatColumnInTaskIds.find((taskId) => taskId._id === source.droppableId);
        const finishTask = flatColumnInTaskIds.find((taskId) => taskId._id === destination.droppableId);

        // 현재 subTask가 포함된 column을 찾습니다.
        const columnIdx = flatColumn.findIndex((column) => column._id === startTask?.parentID);
        console.log(addSubTask);

        // subTask가 다른 Task로 넘어갈때 필요한 Column Index
        const startIndex = flatColumn
          .map((column) => column.taskIds.findIndex((task) => task._id === source.droppableId))
          .filter((index) => index !== -1)
          .find((index) => true);
        const finishIndex = flatColumn
          .map((column) => column.taskIds.findIndex((task) => task._id === destination.droppableId))
          .filter((index) => index !== -1)
          .find((index) => true);

        console.log(source.droppableId);
        console.log(destination.droppableId);

        console.log(startTask);
        console.log(finishTask);

        // Task Index.
        console.log(startIndex);
        console.log(finishIndex);

        // SubTask Index.
        console.log(source.index);
        console.log(destination.index);
        if (addSubTask && startTask && finishTask && startIndex !== undefined) {
          if (startTask._id === finishTask._id) {
            // 드래그를 시작한 subTask의 부모 ID를 이동할 task의 _id로 변경해줍니다.
            addSubTask.parentID = finishTask._id;

            const newDnd = { ...dnd };

            // 새롭게 정렬된 subTask 배열.
            const subTask = newDnd.columns[columnIdx].taskIds[startIndex].subTaskIds;
            subTask?.splice(source.index, 1);
            subTask?.splice(destination.index, 0, addSubTask);

            // dnd.tasks에서도 새롭게 정렬하기위해 Index를 찾습니다.
            const tasksIndex = newDnd.tasks.findIndex((task) => task._id === source.droppableId);
            newDnd.tasks[tasksIndex].subTaskIds = subTask;

            setDnd(newDnd);
            try {
              await axios.post("/smartstore/home/category/order", { newDnd }, { withCredentials: true });
              // setDnd({ ...dnd, columns: res.data.category, tasks: res.data.subcategory });
            } catch (err) {
              console.log(err);
            }
          } else {
            // 다른 카테고리로 서브 카테고리를 이동 시켰을때
            if (startTask) {
              console.log("다른 task이동");

              startTask.subTaskIds?.splice(source.index, 1);
              // const newStartTask = {
              //   ...startTask ,
              //   subTaskIds: startSubTaskIds,

              // };
              console.log(startTask);

              finishTask.subTaskIds?.splice(destination.index, 0, addSubTask);

              const newDnd = { ...dnd };
              console.log(newDnd);
              // newDnd.columns[startIndex] = newStartTask;
              // newDnd.columns[finishIndex] = newFinishTask;

              setDnd(newDnd);
              // 이동한 카테고리를 저장하면서 dnd를 업데이트 합니다.
              try {
                await axios.post("/smartstore/home/category/order", { newDnd }, { withCredentials: true });
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      }
    },
    [dnd]
  );

  const colorSelectHandler = () => {
    setColorSelector((e) => !e);
  };

  // 배경 색상 선택 바깥 클릭시 색상선택 false
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (colorRef.current && !colorRef.current.contains(e.target) && !imgRef.current.contains(e.target)) {
        setColorSelector(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [colorSelector]);

  return (
    <>
      <div className="SellerSubframe home-category">
        <div className="product-list">
          <div className="panel panel-seller">
            <div className="panel-heading">
              <div className="pull-left">
                <h3 className="panel-title">
                  카테고리 등록
                  <span className="text-primary"></span>
                </h3>
              </div>
            </div>
            <div className="panel-body flex">
              <div className="box-wrap flex">
                <div className="box first flex flex-ju-bt flex-di-row">
                  <div className="category-list">
                    <div ref={listRef} style={{ width: "350px" }}>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="all-columns" direction="vertical" type="column">
                          {(provided) => (
                            <Container {...provided.droppableProps} ref={provided.innerRef}>
                              {dnd.columns &&
                                dnd.columns.map((column: any, index: any) => {
                                  const tasks = column.taskIds && column.taskIds.map((taskId: any) => taskId);
                                  return (
                                    <Column
                                      key={column._id}
                                      index={index}
                                      dnd={dnd}
                                      column={column}
                                      tasks={tasks}
                                      isSelected={isSelected}
                                      isSelectedTask={isSelectedTask}
                                      setIsSelected={setIsSelected}
                                      setIsSelectedTask={setIsSelectedTask}
                                      setIsSelectedSubTask={setIsSelectedSubTask}
                                      selectedList={selectedList}
                                      setSelectedList={setSelectedList}
                                      setSelectedName={setSelectedName}
                                      setSelectedURL={setSelectedURL}
                                      selectedId={selectedId}
                                      setSelectedId={setSelectedId}
                                      setAddedProductList={setAddedProductList}
                                      setIconImg={setIconImg}
                                      setSelectedNavHide={setSelectedNavHide}
                                      setSelectedChapNavHide={setSelectedChapNavHide}
                                      setSelectedDarkMode={setSelectedDarkMode}
                                      setInitialName={setInitialName}
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </Container>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </div>
                </div>
                <div className="box second flex flex-ju-bt flex-di-row">
                  <div ref={inputRef} style={{ padding: "0 20px" }}>
                    <div>
                      {!isAdvertise ? (
                        <>
                          <h3 className="cateInfo-title">카테고리 추가</h3>
                          <div className="btn-list">
                            <div className="cateInfo-bg-input">
                              <div id="input-inner" style={{ display: "flex", alignItems: "center", padding: "0px", width: "100%" }}>
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="카테고리 이름을 입력후 추가 버튼을 눌러주세요"
                                  maxLength={20}
                                  value={addColumn}
                                  onChange={inputValue}
                                  style={{}}
                                />
                                <div className="text-btn-wrap" style={{ marginRight: "5px" }}>
                                  <button className="text-btn" onClick={categoryAdd}>
                                    <span className="text">추가</span>
                                  </button>
                                  <button className="text-btn" onClick={categoryDelete}>
                                    <span className="text">삭제</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className={isAdd ? "error" : "error-active"}>{AddMessage}</div>
                          </div>
                          <div className="second-product-list">
                            <div className="wrap">
                              <h2 className="cateInfo-title">카테고리 정보</h2>
                              <div className="cateInfo-input" style={{ marginTop: "15px" }}>
                                <h5 className="cateInfo-name">이름</h5>
                                <div id="input-inner">
                                  <input type="text" value={selectedName} placeholder="이름을 입력하세요" className="input" onChange={onChange} />
                                </div>
                              </div>
                              <div className="cateInfo-input" style={{ marginTop: "15px" }}>
                                <h5 className="cateInfo-name">URL 주소</h5>
                                <div id="input-inner">
                                  <input type="text" value={selectedURL} placeholder="URL 주소" className="input" onChange={onChangeURL} />
                                </div>
                              </div>
                              <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                              <div style={{ position: "relative" }}>
                                <ul className="cateInfo-input">
                                  <h5 className="cateInfo-name">광고 목록</h5>
                                  {advertise.map((list: any, index: any) => {
                                    return (
                                      <li
                                        key={index}
                                        value={list.name}
                                        className="category-list"
                                        style={{
                                          backgroundColor: list.name === addedSelectedName && isAddedSelected ? "#e0e0e0" : "#fff",
                                        }}
                                        onClick={(e) => AddedProductClick(list.name, e)}
                                      >
                                        <div className="edit flex flex-ju-center flex-align-center">
                                          <img src={list.mainImage[0]} style={{ width: "40px", marginRight: "5px", padding: "5px" }}></img>
                                          <span>{list.name}</span>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <AdvertiseBtn onClick={Advertise.advertiseShow}>
                                  <span>광고 등록</span>
                                </AdvertiseBtn>
                              </div>
                              <div style={{ marginTop: "10px", color: "#ff3627" }}>
                                <span>{addedErrMessage}</span>
                              </div>
                              <CategoryIconRegi
                                iconImg={iconImg}
                                setIconImg={setIconImg}
                                isSelectedTask={isSelectedTask}
                                isSelectedSubTask={isSelectedSubTask}
                              ></CategoryIconRegi>
                              <CategoryInfoUl>
                                <CategoryInfoLi>
                                  <Label>
                                    <h5>다크 모드</h5>
                                    <Input
                                      type="checkbox"
                                      onChange={(e) => setSelectedDarkMode(e.target.checked)}
                                      checked={selectedDarkMode}
                                      disabled={!selectedList}
                                    />
                                    <CustomCheckbox />
                                  </Label>
                                </CategoryInfoLi>
                                <CategoryInfoLi>
                                  <Label>
                                    <h5>메인 메뉴 숨김</h5>
                                    <Input
                                      type="checkbox"
                                      onChange={(e) => setSelectedNavHide(e.target.checked)}
                                      checked={selectedNavHide}
                                      disabled={!selectedList}
                                    />
                                    <CustomCheckbox />
                                  </Label>
                                </CategoryInfoLi>
                                {selectedList.type === "task" ? (
                                  <CategoryInfoLi>
                                    <Label>
                                      <h5>챕터 메뉴 숨김</h5>
                                      <Input
                                        type="checkbox"
                                        onChange={(e) => setSelectedChapNavHide(e.target.checked)}
                                        checked={selectedChapNavHide}
                                        disabled={!selectedList}
                                      />
                                      <CustomCheckbox />
                                    </Label>
                                  </CategoryInfoLi>
                                ) : (
                                  ``
                                )}
                              </CategoryInfoUl>
                              <div className="submit-btn-wrap" style={{ marginTop: "50px" }}>
                                <button className="submit-btn" onClick={CategoryEdit}>
                                  <span className="text">저장</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="second-product-list">
                            <div className="wrap">
                              <div style={{ position: "relative" }}>
                                <AdvertiseListBtn onClick={Advertise.cateInfoShow}>
                                  <span>카테고리 정보</span>
                                </AdvertiseListBtn>
                              </div>
                              <h3 className="cateInfo-title">카테고리 광고</h3>
                              <div className="cateInfo-input-wrap">
                                <div className="cateInfo-input">
                                  <h5 className="cateInfo-name">광고 이름</h5>
                                  <div id="input-inner">
                                    <input
                                      type="text"
                                      value={adName}
                                      maxLength={10}
                                      placeholder="시작하는 광고의 이름을 적어주세요."
                                      className="input"
                                      onChange={Advertise.adName}
                                    />
                                  </div>
                                </div>
                                <div className={isAdName ? "error" : "error-active"}>{ErrAdName}</div>
                              </div>
                              <h3 className="cateInfo-title">광고 타입을 지정</h3>
                              <TypeBoxWrap>
                                <TypeBox number={0} selectedType={selectedType}>
                                  <img src={type1} alt="" />
                                  <input type="radio" name="selectedType" value="0" checked={selectedType === 0} onChange={handleTypeChange} />
                                </TypeBox>
                                <TypeBox number={1} selectedType={selectedType}>
                                  <img src={type2} alt="" />
                                  <input type="radio" name="selectedType" value="1" checked={selectedType === 1} onChange={handleTypeChange} />
                                </TypeBox>
                                <TypeBox number={2} selectedType={selectedType}>
                                  <img src={type3} alt="" />
                                  <input type="radio" name="selectedType" value="2" checked={selectedType === 2} onChange={handleTypeChange} />
                                </TypeBox>
                              </TypeBoxWrap>
                              <h3 className="cateInfo-title">광고 미리보기</h3>
                              <div ref={imgRef}>
                                {selectedType === 0 && (
                                  <AdverPreview adBackColor={adBackColor}>
                                    <div id="input-inner">
                                      <input
                                        type="text"
                                        value={adSubTitle}
                                        maxLength={10}
                                        placeholder="가장 위에 들어갑니다."
                                        className="input adsubtitle adver-input-type1"
                                        onChange={Advertise.adSubTitle}
                                      />
                                      <div className={isAdSubTitle ? "error" : "error-active"}>{ErrAdSubTitle}</div>
                                    </div>
                                    <div id="input-inner">
                                      <input
                                        type="text"
                                        value={adMainTitle}
                                        maxLength={15}
                                        placeholder="가장 큰 제목 입니다."
                                        className="input admaintitle adver-input-type1"
                                        onChange={Advertise.adMainTitle}
                                      />
                                      <div className={isAdMainTitle ? "error" : "error-active"}>{ErrAdMainTitle}</div>
                                    </div>
                                    <div id="input-inner">
                                      <textarea
                                        value={adDetail}
                                        maxLength={50}
                                        placeholder="상품에 대한 내용"
                                        className="input addetail adver-input-type1"
                                        onChange={Advertise.adDetail}
                                      />
                                      <div className={isAdDetail ? "error" : "error-active"}>{ErrAdDetail}</div>
                                    </div>
                                    <div id="input-inner">
                                      <textarea
                                        value={adSubDetail}
                                        maxLength={30}
                                        placeholder="특징 및 가격"
                                        className="input adsubdetail adver-input-type1"
                                        onChange={Advertise.adSubDetail}
                                      />
                                      <div className={isAdSubDetail ? "error" : "error-active"}>{ErrAdSubDetail}</div>
                                    </div>
                                    <div id="input-inner" style={{ marginTop: "14px" }}>
                                      <div className="adver-btn">
                                        <span className="text">구입하기</span>
                                      </div>
                                      <div className="adver-btn2">
                                        <span className="text">더 알아보기</span>
                                      </div>
                                    </div>
                                    <AdvertiseImage
                                      className={"AdvertiseImage"}
                                      adImage={adImage}
                                      setAdImage={setAdImage}
                                      isAdImage={isAdImage}
                                      setIsAdImage={setIsAdImage}
                                      setAdBackColor={setAdBackColor}
                                      setIsBackColor={setIsBackColor}
                                      colorSelector={colorSelector}
                                      setColorSelector={setColorSelector}
                                    ></AdvertiseImage>
                                  </AdverPreview>
                                )}
                                {selectedType === 1 && (
                                  <AdverPreview adBackColor={adBackColor}>
                                    <div id="input-inner">
                                      <input
                                        type="text"
                                        value={adSubTitle}
                                        maxLength={10}
                                        placeholder="가장 위에 들어갑니다."
                                        className="input adsubtitle adver-input-type1"
                                        onChange={Advertise.adSubTitle}
                                      />
                                      <div className={isAdSubTitle ? "error" : "error-active"}>{ErrAdSubTitle}</div>
                                    </div>
                                    <div id="input-inner">
                                      <input
                                        type="text"
                                        value={adMainTitle}
                                        maxLength={15}
                                        placeholder="가장 큰 제목 입니다."
                                        className="input admaintitle adver-input-type1"
                                        onChange={Advertise.adMainTitle}
                                      />
                                      <div className={isAdMainTitle ? "error" : "error-active"}>{ErrAdMainTitle}</div>
                                    </div>
                                    <div id="input-inner">
                                      <textarea
                                        value={adDetail}
                                        maxLength={15}
                                        placeholder="상품에 대한 내용"
                                        className="input addetail adver-input-type1"
                                        onChange={Advertise.adDetail}
                                      />
                                      <div className={isAdDetail ? "error" : "error-active"}>{ErrAdDetail}</div>
                                    </div>
                                    <AdvertiseImage
                                      className={"AdvertiseImage"}
                                      adImage={adImage}
                                      setAdImage={setAdImage}
                                      isAdImage={isAdImage}
                                      setIsAdImage={setIsAdImage}
                                      setAdBackColor={setAdBackColor}
                                      setIsBackColor={setIsBackColor}
                                      colorSelector={colorSelector}
                                      setColorSelector={setColorSelector}
                                    ></AdvertiseImage>
                                        <div id="input-inner">
                                          <textarea
                                            value={adSubDetail}
                                            maxLength={15}
                                            placeholder="특징 및 가격"
                                            className="input adsubdetail adver-input-type1"
                                            onChange={Advertise.adSubDetail}
                                          />
                                      <div className={isAdSubDetail ? "error" : "error-active"}>{ErrAdSubDetail}</div>
                                    </div>
                                        <div id="input-inner" style={{ marginTop: "14px" }}>
                                          <div className="adver-btn">
                                            <span className="text">구입하기</span>
                                          </div>
                                          <div className="adver-btn2">
                                            <span className="text">더 알아보기</span>
                                          </div>
                                    </div>
                                  </AdverPreview>
                                )}
                                {selectedType === 2 && (
                                  <AdverPreviewColumn adBackColor={adBackColor}>
                                    <div>
                                      <div className="adver-input-type3-wrap">
                                        <input
                                          type="text"
                                          value={adSubTitle}
                                          maxLength={10}
                                          placeholder="가장 위에 들어갑니다."
                                          className="input adsubtitle adver-input-type3"
                                          onChange={Advertise.adSubTitle}
                                        />
                                        <div className={isAdSubTitle ? "error" : "error-active"}>{ErrAdSubTitle}</div>
                                      </div>
                                      <div className="adver-input-type3-wrap">
                                        <input
                                          type="text"
                                          value={adMainTitle}
                                          maxLength={15}
                                          placeholder="가장 큰 제목 입니다."
                                          className="input admaintitle adver-input-type3"
                                          onChange={Advertise.adMainTitle}
                                        />
                                        <div className={isAdMainTitle ? "error" : "error-active"}>{ErrAdMainTitle}</div>
                                      </div>
                                      <div className="adver-input-type3-wrap">
                                        <textarea
                                          value={adDetail}
                                          maxLength={15}
                                          placeholder="상품에 대한 내용"
                                          className="input addetail adver-input-type3"
                                          onChange={Advertise.adDetail}
                                        />
                                        <div className={isAdDetail ? "error" : "error-active"}>{ErrAdDetail}</div>
                                      </div>
                                      <div className="adver-input-type3-wrap">
                                        <textarea
                                          value={adSubDetail}
                                          maxLength={30}
                                          placeholder="특징 및 가격"
                                          className="input adsubdetail adver-input-type3"
                                          onChange={Advertise.adSubDetail}
                                        />
                                        <div className={isAdSubDetail ? "error" : "error-active"}>{ErrAdSubDetail}</div>
                                      </div>
                                      <div className="adver-input-type3-wrap" style={{ marginTop: "15px" }}>
                                        <div className="adver-btn">
                                          <span className="text">구입하기</span>
                                        </div>
                                        <div className="adver-btn2">
                                          <span className="text">더 알아보기</span>
                                        </div>
                                      </div>
                                    </div>
                                    <AdvertiseImage
                                      className={"AdvertiseImage"}
                                      adImage={adImage}
                                      setAdImage={setAdImage}
                                      isAdImage={isAdImage}
                                      setIsAdImage={setIsAdImage}
                                      setAdBackColor={setAdBackColor}
                                      setIsBackColor={setIsBackColor}
                                      colorSelector={colorSelector}
                                      setColorSelector={setColorSelector}
                                    ></AdvertiseImage>
                                  </AdverPreviewColumn>
                                )}
                              </div>
                              {adImage && (
                                <div className="cateInfo-input-wrap" style={{ width: "100%" }} ref={colorRef}>
                                  <div
                                    className="cateInfo-input"
                                    onClick={colorSelectHandler}
                                    style={{ outline: colorSelector ? "2px solid #0071e3" : "none" }}
                                  >
                                    <h5 className="cateInfo-name">배경 색상 선택</h5>
                                    <div
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        marginRight: "20px",
                                        backgroundColor: adBackColor ?? "transparent",
                                        border: "1px solid #86868b",
                                        borderRadius: "8px",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                              <div className="cateInfo-input-wrap">
                                <div className="cateInfo-input">
                                  <h5 className="cateInfo-name">상품 연결</h5>
                                  {adProduct &&
                                    adProduct.map((list: any, index: any) => {
                                      return (
                                        <li
                                          key={index}
                                          value={list.name}
                                          className="adproduct-list"
                                          style={{
                                            backgroundColor: isProductClick ? "#f5f5f7" : "#fff",
                                          }}
                                          onClick={() => setIsProductClick((boolean) => !boolean)}
                                        >
                                          <div className="edit flex flex-ju-center flex-align-center" style={{ padding: "0 15px" }}>
                                            <img src={list.mainImage[0]} style={{ width: "40px", marginRight: "5px", padding: "5px" }}></img>
                                            <span>{list.name}</span>
                                          </div>
                                        </li>
                                      );
                                    })}
                                  <div className="text-btn-wrap" style={{ marginRight: "10px" }}>
                                    <button className="text-btn" onClick={Advertise.ProductListShow}>
                                      <span className="text">추가</span>
                                    </button>
                                    <button className="text-btn" onClick={Advertise.ProductDelete}>
                                      <span className="text">삭제</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <AdSubmitBtn onClick={Advertise.adSubmit}>
                                <span>등록</span>
                              </AdSubmitBtn>
                              <div className={isAdFinish ? "error" : "error-active"} style={{ textAlign: "right" }}>
                                {ErrAdFinish}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer"></div>
          </div>
        </div>
        <BlurWrap isProductListShow={isProductListShow} ref={blurWrapRef}>
          <ProductListWrap isProductListShow={isProductListShow} ref={blurRef}>
            <ProductList>
              <h5 className="box-name">상품 목록</h5>
              <TableProductList isAdvertise={isAdvertise} setSelectedProductList={setSelectedProductList}></TableProductList>
              <div className="text-btn-wrap" style={{ marginRight: "10px", justifyContent: "end", marginTop: "10px", alignItems: "center" }}>
                <span style={{ marginRight: "10px", color: "red", fontWeight: "600", fontSize: "14px" }}>{ErrProductList}</span>
                <button
                  className="text-btn"
                  onClick={Advertise.ProductAdd}
                  style={{ width: "100px", height: "30px", borderRadius: "20px", backgroundColor: "#0071e3" }}
                >
                  <span className="text" style={{ color: "white" }}>
                    추가
                  </span>
                </button>
                <button
                  className="text-btn"
                  onClick={Advertise.ProductListClose}
                  style={{ width: "100px", height: "30px", borderRadius: "20px", backgroundColor: "#0071e3" }}
                >
                  <span className="text" style={{ color: "white" }}>
                    닫기
                  </span>
                </button>
              </div>
            </ProductList>
          </ProductListWrap>
          <Blur className="blur" isProductListShow={isProductListShow}></Blur>
        </BlurWrap>
      </div>
    </>
  );
}

export default Category;