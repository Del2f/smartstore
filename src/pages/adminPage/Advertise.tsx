import axios from "../../api/axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectToken } from "../../store/authSlice";
import TableProductList from "../../components/admin/TableProductList";
import AdvertiseImage from "../../components/admin/AdvertiseImage";
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
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
`;
const ProductList = styled.div`
  position: relative;
  width: 1000px;
  background-color: white;
  padding: 20px 40px;
  border-radius: 20px;
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
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
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
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
`;

const AdverList = styled.div`
  position: relative;
  width: 600px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const AdverBlur = styled.div<showAdverList>`
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

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
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
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
  margin: 30px 0;
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

function Advertise(props: Props) {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.selectedList) {
      setIsError(true);
      setTimeout(() => {
        navigate("../category");
      }, 3000);
    } else {
      const data = location.state;
      console.log(data);

      setIsAdvertise(true);
      setIsAdvertiseEdit(data.isAdvertiseEdit);

      if (data.selectedList.type === "column") {
        setIsSelected(true);
      } else if (data.selectedList.type === "task") {
        setIsSelectedTask(true);
      } else if (data.selectedList.type === "subtask") {
        setIsSelectedSubTask(true);
      }

      if (data.isAdvertiseEdit) {
        setSelectedAdverID(data.selectedAdverID);
        setSelectedAdvertise(data.advertise);

        setAdname(data.advertise[0].name);
        setAdType(data.advertise[0].type);
        setAdSubTitle(data.advertise[0].subtitle);
        setAdMainTitle(data.advertise[0].maintitle);
        setAdDetail(data.advertise[0].detail);
        setAdSubDetail(data.advertise[0].subdetail);
        setAdImage(data.advertise[0].image);
        setAdBackColor(data.advertise[0].backcolor);
        setAdURL(data.advertise[0].url);

        setIsAdName(true);
        setIsAdSubTitle(true);
        setIsAdMainTitle(true);
        setIsAdDetail(true);
        setIsAdSubDetail(true);
        setIsAdImage(true);
        setIsBackColor(true);
        setIsAdURL(true);
      }

      setSelectedList(data.selectedList);
    }
  }, []);

  const [selectedList, setSelectedList] = useState<any>([]);
  console.log(selectedList);

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

  // 텍스트 클릭 여부
  const [isSubTitleClick, setIsSubTitleClick] = useState<boolean>(false);
  const [isMainTitleClick, setIsMainTitleClick] = useState<boolean>(false);
  const [isDetailClick, setIsDetailClick] = useState<boolean>(false);
  const [isSubDetailClick, setIsSubDetailClick] = useState<boolean>(false);

  // 텍스트 컬러
  const [SubTitleColor, setSubTitleColor] = useState<string>("");
  const [MainTitleColor, setMainTitleColor] = useState<string>("");
  const [DetailColor, setDetailColor] = useState<string>("");
  const [SubDetailColor, setSubDetailColor] = useState<string>("");

  console.log(isSubTitleClick);
  console.log(isMainTitleClick);
  console.log(isDetailClick);
  console.log(isSubDetailClick);

  // 유효성 검사
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isSelectedTask, setIsSelectedTask] = useState<boolean>(false);
  const [isSelectedSubTask, setIsSelectedSubTask] = useState<boolean>(false);

  // console.log(isSelected);
  // console.log(isSelectedTask);
  // console.log(isSelectedSubTask);

  // 광고페이지 전환
  const [isAdvertise, setIsAdvertise] = useState<boolean>(false);
  const [isAdvertiseEdit, setIsAdvertiseEdit] = useState<boolean>(false);

  // 정상적으로 advertise 페이지로 이동하지 않았을때
  const [isError, setIsError] = useState<boolean>(false);

  // 우측 상품목록
  const [selectedProductList, setSelectedProductList] = useState<any>([]);

  // Ref
  const inputRef = useRef<any>();
  const blurWrapRef = useRef<any>();
  const blurRef = useRef<any>();
  const colorRef = useRef<any>();
  const imgRef = useRef<any>();

  const [selectedAdvertise, setSelectedAdvertise] = useState<Advertise[]>([]);
  const [selectedAdverID, setSelectedAdverID] = useState<string>("");

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

  // 배경 색상
  const [colorSelector, setColorSelector] = useState<boolean>(false);

  // 광고 관련 함수 모음.
  const Advertise = {
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

      // if (!isProductClick) {
      //   console.log("카테고리가 등록된 상품이 선택되지 않았습니다.");
      //   return;
      // }

      setIsAdURL(false);
      setAdProduct([]);
      setAdURL("");
    },
    adSubmit: async (e: any) => {
      e.preventDefault();

      console.log("adSubmit");

      if (isSelectedSubTask) {
        console.log("subTask는 광고를 노출 할 수 없습니다.");
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

          let newAdvertise;
          if (isAdvertiseEdit) {
            newAdvertise = {
              _id: selectedAdverID,
              type: adType,
              name: adName,
              subtitle: adSubTitle,
              maintitle: adMainTitle,
              detail: adDetail,
              subdetail: adSubDetail,
              image: adImage,
              url: adURL,
              backcolor: adBackColor,
              product_id: adProduct[0]._id,
            };
          } else {
            newAdvertise = {
              type: adType,
              name: adName,
              subtitle: adSubTitle,
              maintitle: adMainTitle,
              detail: adDetail,
              subdetail: adSubDetail,
              image: adImage,
              url: adURL,
              backcolor: adBackColor,
              product_id: adProduct[0]._id,
            };
          }
          console.log(newAdvertise);

          console.log("업로드전");
          try {
            const res = await axios.post(
              "/smartstore/home/category/advertise",
              { isAdvertiseEdit, newAdvertise, selectedList },
              { withCredentials: true }
            );
            const { success, Advertises } = res.data;
            console.log("업로드후");

            console.log(res);
            if (success) {
              console.log("success");

              setAdvertise(Advertises);
              setIsAdvertise(false);

              // 광고 등록후 초기화
              Advertise.InputReset();
              navigate("../category");
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("내용을 전부 입력해주세요.");
          setIsAdFinish(false);
          setErrAdFinish("내용을 전부 입력해주세요.");
        }
      } else {
        console.log("카테고리를 선택 해주세요.");
        setIsAdFinish(false);
        setErrAdFinish("카테고리를 선택 해주세요.");
      }

      if (!adProduct[0]) {
        console.log("상품을 선택해주세요.");
        setErrAdFinish("상품을 선택 해주세요.");
        setIsAdURL(false);
        return;
      }
    },
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
      } catch (err) {
        console.log(err);
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

  return (
    <>
      <div className="SellerSubframe home-category">
        <div className="product-list">
          <div className="panel panel-seller">
            {isError && (
              <div className="modal blur">
                <div className="modalpage">
                  <h1>정상적인 페이지가 아닙니다.</h1>
                  <span>카테고리를 선택후 광고 등록을 해주세요.</span>
                </div>
              </div>
            )}
            <div className="panel-heading">
              <div className="pull-left">
                <h3 className="panel-title">
                  광고 등록
                  <span className="text-primary"></span>
                </h3>
              </div>
            </div>
            <div className="panel-body flex">
              <div className="box-wrap">
                <div className="box second flex flex-ju-bt flex-di-row">
                  <div ref={inputRef} style={{ padding: "0 20px" }}>
                    <div>
                      <div className="second-product-list">
                        <div className="wrap">
                          <div>{selectedList.name}</div>
                          <h3 className="cateInfo-title">카테고리 광고</h3>
                          <div className="cateInfo-input-wrap">
                            <div className="cateInfo-input">
                              <h5 className="cateInfo-name">광고 이름</h5>
                              <div id="input-inner">
                                <input
                                  type="text"
                                  value={adName}
                                  maxLength={20}
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
                            <TypeBox number={0} selectedType={adType}>
                              <img src={type1} alt="" />
                              <input type="radio" name="selectedType" value="0" checked={adType === 0} onChange={Advertise.adTypeChange} />
                            </TypeBox>
                            <TypeBox number={1} selectedType={adType}>
                              <img src={type2} alt="" />
                              <input type="radio" name="selectedType" value="1" checked={adType === 1} onChange={Advertise.adTypeChange} />
                            </TypeBox>
                            <TypeBox number={2} selectedType={adType}>
                              <img src={type3} alt="" />
                              <input type="radio" name="selectedType" value="2" checked={adType === 2} onChange={Advertise.adTypeChange} />
                            </TypeBox>
                          </TypeBoxWrap>
                          <h3 className="cateInfo-title">광고 미리보기</h3>
                          <div ref={imgRef}>
                            {adType === 0 && (
                              <AdverPreview adBackColor={adBackColor}>
                                <div id="input-inner" style={{ marginTop: "50px" }}>
                                  <input
                                    type="text"
                                    value={adSubTitle}
                                    maxLength={20}
                                    placeholder="가장 위에 들어갑니다."
                                    className="input adsubtitle adver-input-type1"
                                    onChange={Advertise.adSubTitle}
                                    onFocus={() => setIsSubTitleClick(true)}
                                    onBlur={() => setIsSubTitleClick(false)}
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
                                    onFocus={() => setIsMainTitleClick(true)}
                                    onBlur={() => setIsMainTitleClick(false)}
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
                                    style={{ backgroundColor: "transparent" }}
                                    onFocus={() => setIsDetailClick(true)}
                                    onBlur={() => setIsDetailClick(false)}
                                  />
                                  <div className={isAdDetail ? "error" : "error-active"}>{ErrAdDetail}</div>
                                </div>
                                <div id="input-inner">
                                  <textarea
                                    value={adSubDetail}
                                    maxLength={50}
                                    placeholder="특징 및 가격"
                                    className="input adsubdetail adver-input-type1"
                                    onChange={Advertise.adSubDetail}
                                    style={{ backgroundColor: "transparent" }}
                                    onFocus={() => setIsSubDetailClick(true)}
                                    onBlur={() => setIsSubDetailClick(false)}
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
                                  isAdvertiseEdit={isAdvertiseEdit}
                                ></AdvertiseImage>
                              </AdverPreview>
                            )}
                            {adType === 1 && (
                              <AdverPreview adBackColor={adBackColor}>
                                <div id="input-inner" style={{ marginTop: "50px" }}>
                                  <input
                                    type="text"
                                    value={adSubTitle}
                                    maxLength={20}
                                    placeholder="가장 위에 들어갑니다."
                                    className="input adsubtitle adver-input-type1"
                                    onChange={Advertise.adSubTitle}
                                    onFocus={() => setIsSubTitleClick(true)}
                                    onBlur={() => setIsSubTitleClick(false)}
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
                                    onFocus={() => setIsMainTitleClick(true)}
                                    onBlur={() => setIsMainTitleClick(false)}
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
                                    style={{ backgroundColor: "transparent" }}
                                    onFocus={() => setIsDetailClick(true)}
                                    onBlur={() => setIsDetailClick(false)}
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
                                  isAdvertiseEdit={isAdvertiseEdit}
                                ></AdvertiseImage>
                                <div id="input-inner">
                                  <textarea
                                    value={adSubDetail}
                                    maxLength={50}
                                    placeholder="특징 및 가격"
                                    className="input adsubdetail adver-input-type1"
                                    onChange={Advertise.adSubDetail}
                                    style={{ backgroundColor: "transparent" }}
                                    onFocus={() => setIsSubDetailClick(true)}
                                    onBlur={() => setIsSubDetailClick(false)}
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
                            {adType === 2 && (
                              <AdverPreviewColumn adBackColor={adBackColor}>
                                <div style={{}}>
                                  <div className="adver-input-type3-wrap" style={{ marginTop: "40px" }}>
                                    <input
                                      type="text"
                                      value={adSubTitle}
                                      maxLength={20}
                                      placeholder="가장 위에 들어갑니다."
                                      className="input adsubtitle adver-input-type3"
                                      onChange={Advertise.adSubTitle}
                                      onFocus={() => setIsSubTitleClick(true)}
                                      onBlur={() => setIsSubTitleClick(false)}
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
                                      onFocus={() => setIsMainTitleClick(true)}
                                      onBlur={() => setIsMainTitleClick(false)}
                                    />
                                    <div className={isAdMainTitle ? "error" : "error-active"}>{ErrAdMainTitle}</div>
                                  </div>
                                  <div className="adver-input-type3-wrap">
                                    <textarea
                                      value={adDetail}
                                      maxLength={50}
                                      placeholder="상품에 대한 내용"
                                      className="input addetail adver-input-type3"
                                      onChange={Advertise.adDetail}
                                      style={{ backgroundColor: "transparent" }}
                                      onFocus={() => setIsDetailClick(true)}
                                      onBlur={() => setIsDetailClick(false)}
                                    />
                                    <div className={isAdDetail ? "error" : "error-active"}>{ErrAdDetail}</div>
                                  </div>
                                  <div className="adver-input-type3-wrap">
                                    <textarea
                                      value={adSubDetail}
                                      maxLength={50}
                                      placeholder="특징 및 가격"
                                      className="input adsubdetail adver-input-type3"
                                      onChange={Advertise.adSubDetail}
                                      style={{ backgroundColor: "transparent" }}
                                      onFocus={() => setIsSubDetailClick(true)}
                                      onBlur={() => setIsSubDetailClick(false)}
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
                                  isAdvertiseEdit={isAdvertiseEdit}
                                ></AdvertiseImage>
                              </AdverPreviewColumn>
                            )}
                          </div>
                          {adImage && (
                            <div className="cateInfo-input-wrap" style={{ width: "100%" }} ref={colorRef}>
                              <div
                                className="cateInfo-input"
                                onClick={Advertise.adColorSelect}
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
                              <div style={{ display: "flex" }}>
                                {adProduct &&
                                  adProduct.map((list: any, index: any) => {
                                    return (
                                      <li
                                        key={index}
                                        value={list.name}
                                        className="adproduct-list"
                                        // style={{
                                        //   backgroundColor: isProductClick ? "#f5f5f7" : "#fff",
                                        // }}
                                        // onClick={() => setIsProductClick((boolean) => !boolean)}
                                      >
                                        <div className="edit flex flex-ju-center flex-align-center" style={{ padding: "0 15px" }}>
                                          <img src={list.mainImage[0]} style={{ width: "40px", marginRight: "5px", padding: "5px" }}></img>
                                          <span>{list.name}</span>
                                        </div>
                                        {/* <DeleteBtn
                                          className="modal-close-button"
                                          style={{ position: "absolute", right: "0px", zIndex: "10" }}
                                          isAdImage={props.isAdImage}
                                          onClick={Advertise.ProductDelete}
                                        >
                                          <span className="modal-close-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                              <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
                                            </svg>
                                          </span>
                                        </DeleteBtn> */}
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
                          </div>
                          <AdSubmitBtn onClick={Advertise.adSubmit}>{isAdvertiseEdit ? <span>수정</span> : <span>등록</span>}</AdSubmitBtn>
                          <div className={isAdFinish ? "error" : "error-active"} style={{ textAlign: "right" }}>
                            {ErrAdFinish}
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
        <BlurWrap isProductListShow={isProductListShow} ref={blurWrapRef}>
          <ProductListWrap isProductListShow={isProductListShow} ref={blurRef}>
            <ProductList>
              <h5 className="box-name">상품 목록</h5>
              <TableProductList
                isAdvertise={isAdvertise}
                setSelectedProductList={setSelectedProductList}
                selectedAdvertise={selectedAdvertise}
                adProduct={adProduct}
                setAdProduct={setAdProduct}
              ></TableProductList>
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

export default Advertise;
