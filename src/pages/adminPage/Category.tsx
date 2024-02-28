import axios from "../../api/axios";
import { AxiosError } from "axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { selectToken } from "../../store/authSlice";
// import TableProductList from "../../components/admin/TableProductList";
import CategoryIconRegi from "../../components/admin/CategoryIconRegi";
import AdvertiseImage from "../../components/admin/AdvertiseImage";
import Column from "./CategoryDnD/Column";
import type1 from "@img/home/category/type1.png";
import type2 from "@img/home/category/type2.png";
import type3 from "@img/home/category/type3.png";
import "./Category.scss";
import SaveModal from "../../components/admin/CategorySave";

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
  margin-right: 10px;
  border: none;
  border-radius: 15px;
  background-color: var(--blue-color);
  padding: 8px 15px;

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

interface showAdverList {
  isAdverListShow: boolean;
}

const AdverListWrap = styled.div<showAdverList>`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isAdverListShow
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
   `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
`;

const AdverList = styled.div`
  position: relative;
  width: 600px;
  background-color: white;
  padding: 30px 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const AdverBlur = styled.div<showAdverList>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  backdrop-filter: blur(20px);

  ${(props) =>
    props.isAdverListShow
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
  `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
`;

const AdverBlurWrap = styled.div<showAdverList>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isAdverListShow
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
  border-radius: 15px;
  background-color: ${(props) => props.adBackColor};

  & input {
    background-color: transparent;
  }
`;

interface Modal {
  isAdvertiseModal: boolean;
}

const Modal = styled.div<Modal>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);

  ${(props) =>
    props.isAdvertiseModal
      ? `
      visibility: visible;
      `
      : `
      visibility: hidden;
  `}
`;
const ModalInner = styled.div<Modal>`
  position: relative;
  width: 600px;
  background-color: white;
  padding: 30px 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;

  ${(props) =>
    props.isAdvertiseModal
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
  `}

  span {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding: 20px;
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
  advertise?: Advertise[] | undefined;
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
  advertise?: Advertise[] | undefined;
}

export interface DndState {
  columnOrder: Array<string>;
  columns: Array<ColumnType>;
  tasks: Array<TaskType>;
}

export interface Advertise {
  _id?: string | undefined;
  type: number;
  name: string;
  subtitle: string;
  maintitle: string;
  detail: string;
  subdetail: string;
  url: string;
  backcolor: string;
  product_id: string;
  image: string;
}
export const InputWrap = styled.div`
  margin-top: 10px;

  & > .input-text {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const Error = styled.div`
  position: absolute;
`

function Category(props: Props) {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    props.setNoticeIcon && props.setNoticeIcon("");
    props.setNotice && props.setNotice("카테고리 관리");
    props.setNoticeDate && props.setNoticeDate("");
  }, []);

  // 우측 상품목록
  const [selectedProductList, setSelectedProductList] = useState<any>([]);
  // console.log(selectedProductList);

  // 중앙 카테고리에 등록된 상품 목록
  const [addedProductList, setAddedProductList] = useState<any>([]);

  const [iconImg, setIconImg] = useState<string>("");

  const [addedErrMessage, setAddedErrMessage] = useState<string>("");
  const [addedSelected, setAddedSelected] = useState<any>([]);
  const [addedSelectedName, setAddedSelectedName] = useState<string | null>();
  const [isAddedSelected, setIsAddedSelected] = useState<boolean>(false);

  const [selectedList, setSelectedList] = useState<any>([]);
  console.log(selectedList);

  const [selectedName, setSelectedName] = useState<string>();
  const [selectedURL, setSelectedURL] = useState<string>();

  const [initialName, setInitialName] = useState<string>();
  const [selectedNavHide, setSelectedNavHide] = useState<boolean>(false);
  const [selectedChapNavHide, setSelectedChapNavHide] = useState<boolean>(false);
  const [selectedDarkMode, setSelectedDarkMode] = useState<boolean>(false);
  const [selectedColumnDarkMode, setSelectedColumnDarkMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  console.log(selectedColumnDarkMode);

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
  const AdverBlurWrapRef = useRef<any>();
  const AdverBlurRef = useRef<any>();
  const AdvertiseModalRef = useRef<any>();
  const blurWrapRef = useRef<any>();
  const blurRef = useRef<any>();
  const colorRef = useRef<any>();
  const imgRef = useRef<any>();

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
  const [isAdvertiseEdit, setIsAdvertiseEdit] = useState<boolean>(false);

  // console.log("isAdvertise " + isAdvertise);
  // console.log("isAdvertiseEdit " + isAdvertiseEdit);

  // 광고 목록 클릭 여부
  const [isAdverListClick, setIsAdverListClick] = useState<boolean>(false);
  const [selectedAdvertise, setSelectedAdvertise] = useState<Advertise[]>([]);
  const [selectedAdverID, setSelectedAdverID] = useState<string>("");

  // console.log(isAdverListClick);
  // console.log(selectedAdvertise);
  // console.log(selectedAdverID);

  // 광고페이지의 광고타입을 지정합니다.
  const [adName, setAdname] = useState<string>("");
  const [adType, setAdType] = useState<number>(0);
  const [adSubTitle, setAdSubTitle] = useState<string>("");
  const [adMainTitle, setAdMainTitle] = useState<string>("");
  const [adDetail, setAdDetail] = useState<string>("");
  const [adSubDetail, setAdSubDetail] = useState<string>("");
  const [adURL, setAdURL] = useState<string>("");
  const [adBackColor, setAdBackColor] = useState<string>("");
  const [adProduct, setAdProduct] = useState<any>([]);
  const [adImage, setAdImage] = useState<string>("");
  // console.log(adProduct);

  // 광고 페이지 상품 클릭 여부
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

  // console.log(advertise);

  const [isAdFinish, setIsAdFinish] = useState<boolean>(false);

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

  // 광고 목록창 boolean
  const [isAdverListShow, setIsAdverListShow] = useState<boolean>(false);

  // 배경 색상
  const [colorSelector, setColorSelector] = useState<boolean>(false);

  // 광고 등록 모달창
  const [isAdvertiseModal, setIsAdvertiseModal] = useState<boolean>(false);

  // 저장 모달창
  const [isSaveModal, setIsSaveModal] = useState<boolean>(false);
  // console.log(isAdvertiseModal);

  // 광고 관련 함수 모음.
  const Advertise = {
    Link: () => {
      if (selectedList.length === 0) {
        console.log("선택된 카테고리가 없습니다.");
        setIsAdvertiseModal(true);
        return;
      }

      if (!isAdvertiseEdit) {
        navigate("../advertise", { state: { selectedList: selectedList, isAdvertiseEdit: isAdvertiseEdit } });
      } else {
        navigate("../advertise", {
          state: { selectedList: selectedList, isAdvertiseEdit: isAdvertiseEdit, advertise: selectedAdvertise, selectedAdverID: selectedAdverID },
        });
      }
    },
    advertiseListShow: () => {
      setIsAdverListShow(true);
    },
    advertiseShow: () => {
      setIsAdvertise(true);
    },
    advertiseEdit: () => {
      console.log("광고 수정 버튼을 누름");

      const data = advertise.filter((list: any) => list._id === selectedAdverID);
      setSelectedAdvertise(data);
      console.log(data);

      setIsAdvertise(true);
      setIsAdvertiseEdit(true);

      setAdname(data[0].name);
      setIsAdName(true);

      setAdType(data[0].type);

      setAdSubTitle(data[0].subtitle);
      setIsAdSubTitle(true);

      setAdMainTitle(data[0].maintitle);
      setIsAdMainTitle(true);

      setAdDetail(data[0].detail);
      setIsAdDetail(true);

      setAdSubDetail(data[0].subdetail);
      setIsAdSubDetail(true);

      setAdImage(data[0].image);
      setIsAdImage(true);

      setAdBackColor(data[0].backcolor);
      setIsBackColor(true);

      setAdURL(data[0].url);
      setIsAdURL(true);
    },
    // 광고 목록 리스트 클릭시
    adListSelect: (id: string) => {
      const data = advertise.filter((list: any) => list._id === id);
      console.log(data);

      if (selectedAdverID === id) {
        setIsAdverListClick(false);
        setSelectedAdverID("");
      } else {
        setIsAdverListClick(true);
        if (data[0]._id) {
          setSelectedAdverID(data[0]._id);
        }
      }
    },
    // 광고 목록 선택 버튼
    adListSelectBtn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // const select = e.currentTarget.textContent;
      console.log("adListSelectBtn");
      const data = advertise.filter((list: any) => list._id === selectedAdverID);
      console.log(data);

      if (data.length === 1) {
        console.log("data.length === 1");
        setSelectedAdvertise(data);
        setIsAdvertiseEdit(true);
      } else {
        console.log("data.length !== 1");

        Advertise.InputReset();
        setSelectedAdvertise([]);
        setIsAdvertiseEdit(false);
      }
      setIsAdverListShow(false);
    },
    adverListClose: () => {
      setIsAdverListShow(false);
    },
    cateInfoShow: () => {
      setIsAdvertise(false);
    },
    adName: (e: any) => {
      setAdname(e.target.value);

      if (e.target.value.length === 0) {
        setIsAdName(false);
        setErrAdName("광고 이름을 입력해주세요.");
        return;
      }

      if (e.target.value.length > 21) {
        setIsAdName(false);
        setErrAdName("20글자 내로 입력해주세요.");
      } else {
        setAdname(e.target.value);
        setIsAdName(true);
      }
    },
    adTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdType(Number(e.target.value));
    },
    adSubTitle: (e: any) => {
      if (e.target.value.length > 21) {
        setErrAdSubTitle("20글자 내로 입력해주세요.");
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
      if (e.target.value.length > 51) {
        setErrAdSubDetail("50글자 내로 입력해주세요.");
        setIsAdSubDetail(false);
      } else {
        setAdSubDetail(e.target.value);
        setIsAdSubDetail(true);
      }
    },
    // 등록된 상품 클릭시
    // adProductClick: () => {
    //   setIsProductClick(true);
    // },
    adColorSelect: () => {
      console.log("colorSelectHandler");
      setColorSelector((e) => !e);
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
    // adSubmit: async (e: any) => {
    //   e.preventDefault();

    //   if (isSelectedSubTask) {
    //     setIsAdFinish(false);
    //     setErrAdFinish("해당 카테고리는 광고를 노출 할 수 없습니다.");
    //     return;
    //   }

    //   if (isSelected || isSelectedTask) {
    //     setIsAdFinish(true);
    //     setErrAdFinish("");

    //     if (isAdName && isAdSubTitle && isAdMainTitle && isAdDetail && isAdSubDetail && isAdURL && isBackColor) {
    //       setIsAdFinish(true);
    //       setErrAdFinish("");

    //       let newAdvertise;
    //       if (isAdvertiseEdit) {
    //         newAdvertise = {
    //           _id: selectedAdverID,
    //           type: adType,
    //           name: adName,
    //           subtitle: adSubTitle,
    //           maintitle: adMainTitle,
    //           detail: adDetail,
    //           subdetail: adSubDetail,
    //           image: adImage,
    //           url: adURL,
    //           backcolor: adBackColor,
    //           product_id: adProduct[0]._id,
    //         };
    //       } else {
    //         newAdvertise = {
    //           type: adType,
    //           name: adName,
    //           subtitle: adSubTitle,
    //           maintitle: adMainTitle,
    //           detail: adDetail,
    //           subdetail: adSubDetail,
    //           image: adImage,
    //           url: adURL,
    //           backcolor: adBackColor,
    //           product_id: adProduct[0]._id,
    //         };
    //       }

    //       try {
    //         const res = await axios.post(
    //           "/smartstore/home/category/advertise",
    //           { isAdvertiseEdit, newAdvertise, selectedList },
    //           { withCredentials: true }
    //         );
    //         const { success, Advertises } = res.data;

    //         console.log(res);
    //         if (success) {
    //           setAdvertise(Advertises);
    //           setIsAdvertise(false);

    //           // 광고 등록후 초기화
    //           Advertise.InputReset();
    //         }
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     } else {
    //       setIsAdFinish(false);
    //       setErrAdFinish("내용을 전부 입력해주세요.");
    //     }
    //   } else {
    //     setIsAdFinish(false);
    //     setErrAdFinish("카테고리를 선택 해주세요.");
    //   }

    //   if (!adProduct[0]) {
    //     setErrAdFinish("상품을 선택 해주세요.");
    //     setIsAdURL(false);
    //     return;
    //   }
    // },
    Delete: async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      e.stopPropagation();
      const advertiseID = id;
      const updatedAdvertise = advertise.filter((item) => item._id !== advertiseID);
      console.log(updatedAdvertise);

      try {
        const res = await axios.post("/smartstore/home/category/adverdelete", { advertiseID, selectedList }, { withCredentials: true });
        if (res.data.success) {
          console.log(res.data);
          setAdvertise(updatedAdvertise);
        }
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
      }

      // if (isSelectedSubTask) {
      //   setIsAdFinish(false);
      //   setErrAdFinish("해당 카테고리는 광고를 노출 할 수 없습니다.");
      //   return;
      // }

      // if (isSelected || isSelectedTask) {
      //   setIsAdFinish(true);
      //   setErrAdFinish("");

      //   if (isAdName && isAdSubTitle && isAdMainTitle && isAdDetail && isAdSubDetail && isAdURL && isBackColor) {
      //     setIsAdFinish(true);
      //     setErrAdFinish("");

      //     const newAdvertise = {
      //       type: selectedType,
      //       name: adName,
      //       subtitle: adSubTitle,
      //       maintitle: adMainTitle,
      //       detail: adDetail,
      //       subdetail: adSubDetail,
      //       image: adImage,
      //       url: adURL,
      //       backcolor: adBackColor,
      //       product_id: adProduct[0]._id,
      //     };

      //     console.log(advertise);

      //   } else {
      //     setIsAdFinish(false);
      //     setErrAdFinish("내용을 전부 입력해주세요.");
      //   }
      // } else {
      //   setIsAdFinish(false);
      //   setErrAdFinish("카테고리를 선택 해주세요.");
      // }

      // if (!adProduct[0]) {
      //   setErrAdFinish("상품을 선택 해주세요.");
      //   setIsAdURL(false);
      //   return;
      // }
    },
    InputReset: () => {
      console.log("Advertise InputReset");

      setIsAdvertiseEdit(false);

      setAdname("");
      setAdType(0);
      setAdSubTitle("");
      setAdMainTitle("");
      setAdDetail("");
      setAdSubDetail("");
      setAdURL("");
      setAdBackColor("");
      setAdProduct([]);
      setAdImage("");

      setIsProductClick(false);
      setIsAdName(false);
      setIsAdSubTitle(false);
      setIsAdMainTitle(false);
      setIsAdDetail(false);
      setIsAdSubDetail(false);
      setIsAdURL(false);
      setIsAdImage(false);
      setIsBackColor(false);
      setIsAdFinish(false);
    },
  };

  // 유저 카테고리 가져오기
  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.post("/smartstore/home/category", token, { withCredentials: true });
        // console.log(res.data);

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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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

        console.log();

        // setCategoryList(res.data);
        setDnd(sendingDND);
        setAddColumn("");
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
        } catch (err: unknown) {
          console.log(err);
          if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
            navigate("../home");
          }
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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
        setIsSaveModal(true);

      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }

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
        setIsSaveModal(true);

      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
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
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
      }
    } else {
      console.log("아무것도 선택하지 않았을때 저장");
      setNameMessage("");

      const updatedDnd = dnd;

      try {
        await axios.post("/smartstore/home/category/edit", { updatedDnd }, { withCredentials: true });
        setIsSaveModal(true);
      } catch (err: unknown) {
        console.log(err);
        if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
          navigate("../home");
        }
      }
    }
  };

  // 상품 목록에서 바깥 클릭시 닫힘 기능
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

  // 광고 목록에서 바깥 클릭시 닫힘 기능
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (AdverBlurRef.current && !AdverBlurRef.current.contains(e.target)) {
        setIsAdverListShow(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isAdverListShow]);

  // 광고 등록에서 바깥 클릭시 닫힘 기능
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (AdvertiseModalRef.current && !AdvertiseModalRef.current.contains(e.target)) {
        setIsAdvertiseModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isAdvertiseModal]);

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
        } catch (err: unknown) {
          console.log(err);
          if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
            navigate("../home");
          }
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
          } catch (err: unknown) {
            console.log(err);
            if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
              navigate("../home");
            }
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
            } catch (err: unknown) {
              console.log(err);
              if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
                navigate("../home");
              }
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
              } catch (err: unknown) {
                console.log(err);
                if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
                  navigate("../home");
                }
              }
            }
          }
        }
      }
    },
    [dnd]
  );

  // 배경 색상 선택 바깥 클릭시 색상선택 false
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (colorRef.current && !colorRef.current.contains(e.target) && !imgRef.current.contains(e.target)) {
        console.log("clickOutside");
        setColorSelector(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [colorSelector]);

  useEffect(() => {
    setSelectedColumnDarkMode(selectedList.darkMode);

  },[selectedList])

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
            <div className="panel-body flex" style={{ paddingBottom: "30px" }}>
              <div className="box-wrap flex">
                {!isAdvertise && (
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
                                        setAdvertise={setAdvertise}
                                        setIsAdverListClick={setIsAdverListClick}
                                        setSelectedAdvertise={setSelectedAdvertise}
                                        setSelectedAdverID={setSelectedAdverID}
                                        setIsAdvertiseEdit={setIsAdvertiseEdit}
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
                )}

                <div className="box second flex flex-ju-bt flex-di-row">
                  <div ref={inputRef} style={{ padding: "0 20px" }}>
                    <div>
                      <h3 className="cateInfo-title">카테고리 추가</h3>
                      <div className="btn-list">
                        <InputWrap className="cateInfo-bg-input">
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
                        </InputWrap>
                        <Error className={isAdd ? "error-active" : "error"}>{AddMessage}</Error>
                      </div>
                      <div className="second-product-list">
                        <div className="wrap">
                          <h2 className="cateInfo-title">카테고리 정보</h2>
                          <InputWrap className="cateInfo-input">
                            <h5 className="cateInfo-name">이름</h5>
                            <div id="input-inner">
                              <input type="text" value={selectedName} placeholder="이름을 입력하세요" className="input" onChange={onChange} />
                              <Error className={isName ? "error-active" : "error"}>{NameMessage}</Error>
                            </div>
                          </InputWrap>
                          <InputWrap className="cateInfo-input">
                            <h5 className="cateInfo-name">URL 주소</h5>
                            <div id="input-inner">
                              <input type="text" value={selectedURL} placeholder="URL 주소" className="input" onChange={onChangeURL} />
                            </div>
                          </InputWrap>
                          <InputWrap className="cateInfo-input">
                            <h5 className="cateInfo-name">광고 목록</h5>
                            <span className="input-text">{selectedAdvertise[0]?.name}</span>
                            <div>
                              <AdvertiseBtn onClick={Advertise.advertiseListShow}>
                                <span>광고 목록</span>
                              </AdvertiseBtn>
                              {selectedAdvertise.length === 1 ? (
                                <AdvertiseBtn onClick={Advertise.Link}>
                                  <span>광고 수정</span>
                                </AdvertiseBtn>
                              ) : (
                                <AdvertiseBtn onClick={Advertise.Link}>
                                  <span>광고 등록</span>
                                </AdvertiseBtn>
                              )}
                            </div>
                          </InputWrap>
                          <div style={{ marginTop: "10px", color: "#ff3627" }}>
                            <span>{addedErrMessage}</span>
                          </div>
                          <CategoryIconRegi
                            iconImg={iconImg}
                            setIconImg={setIconImg}
                            isSelectedTask={isSelectedTask}
                            isSelectedSubTask={isSelectedSubTask}
                            selectedDarkMode={selectedDarkMode}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer"></div>
          </div>
        </div>
        <SaveModal isBoolean={isSaveModal} setIsBoolean={setIsSaveModal}></SaveModal>
        <AdverBlurWrap isAdverListShow={isAdverListShow} ref={AdverBlurWrapRef} className="modal">
          <AdverListWrap isAdverListShow={isAdverListShow} ref={AdverBlurRef}>
            <AdverList>
              <button className="modal-close-button" style={{ position: "absolute", top: "0" }} onClick={Advertise.adverListClose}>
                <span className="modal-close-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
                  </svg>
                </span>
              </button>
              {advertise.length >= 1 && <h5 className="box-name">상품 목록</h5>}
              {advertise?.length === 0 && (
                <div style={{ textAlign: "center", padding: "20px", fontSize: "20px", fontWeight: "700" }}>등록된 광고가 없습니다.</div>
              )}
              <ul>
                {advertise.map((list: any, index: any) => {
                  return (
                    <li
                      key={index}
                      value={list.name}
                      style={{
                        backgroundColor: list._id === selectedAdverID ? "#ececec" : "#f5f5f7",
                        padding: "10px 10px",
                        position: "relative",
                        marginBottom: "5px",
                        borderRadius: "12px",
                        userSelect: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => Advertise.adListSelect(list._id)}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {list.image && <img src={list.image} style={{ width: "80px", marginRight: "5px", padding: "5px", marginLeft: "10px" }}></img>}
                        <span>{list.name}</span>
                        <button
                          onClick={(e) => Advertise.Delete(e, list._id)}
                          style={{ backgroundColor: "transparent", border: "none", color: "#0071e3" }}
                        >
                          삭제
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {advertise?.length !== 0 && (
                <div className="text-btn-wrap" style={{ marginRight: "10px", justifyContent: "end", marginTop: "10px", alignItems: "center" }}>
                  <span style={{ marginRight: "10px", color: "red", fontWeight: "600", fontSize: "14px" }}>{ErrProductList}</span>
                  {advertise.length >= 1 && (
                    <button
                      className="text-btn"
                      onClick={(e) => Advertise.adListSelectBtn(e)}
                      style={{ width: "100px", height: "30px", borderRadius: "20px", backgroundColor: "#0071e3" }}
                    >
                      <span className="text" style={{ color: "white" }}>
                        선택
                      </span>
                    </button>
                  )}
                </div>
              )}
            </AdverList>
          </AdverListWrap>
          <AdverBlur className="AdverBlur" isAdverListShow={isAdverListShow}></AdverBlur>
        </AdverBlurWrap>
        <Modal isAdvertiseModal={isAdvertiseModal} className="modal">
          <ModalInner isAdvertiseModal={isAdvertiseModal} ref={AdvertiseModalRef}>
            <span>카테고리가 선택 되지 않았습니다.</span>
            <button className="modal-close-button" style={{ position: "absolute", top: "0" }} onClick={() => setIsAdvertiseModal(false)}>
              <span className="modal-close-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
          </ModalInner>
        </Modal>
      </div>
    </>
  );
}

export default Category;
