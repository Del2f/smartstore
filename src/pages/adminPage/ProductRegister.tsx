import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useRef, useEffect, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TableProduct from "../../components/admin/TableProductRegi";
import ImageProductRegi from "../../components/admin/ImageProductRegi";
import SubImageProductRegi from "../../components/admin/SubImageProductRegi";
import OptionImage from "../../components/admin/OptionImage";
import { addProductModel } from "../../../../server/Models/ProductModel";
import "./ProductRegister.scss";
import { Column } from "ag-grid-community";

type Props = {
  setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
  setNotice?: React.Dispatch<SetStateAction<any>>;
  setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

interface DropWrap {
  isAddProDrop: boolean;
}

const DropWrap = styled.div<DropWrap>`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${(props) => (props.isAddProDrop ? "0 5px 5px" : "5px 5px 0")};
    border-color: ${(props) => (props.isAddProDrop ? "transparent transparent #767a83" : "#8d8d92 transparent transparent")};
    clear: left;
  }
`;

interface DropMenu {
  isAddProDrop: boolean;
}

const DropMenu = styled.div<DropMenu>`
  display: ${(props) => (props.isAddProDrop ? "block" : "none")};
  position: absolute;
  bottom: -60px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 85px;
  left: 0;
  border-radius: 12px;
  padding: 5px;
  z-index: 2;

  & div {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background-color: white;

    &:hover {
      color: white;
      background-color: #0071e3;
    }
  }
`;

interface OptionDropMenu {
  isOptionDropMenu: boolean;
}

const OptionDropMenu = styled.div<OptionDropMenu>`
  align-items: center;
  padding: 20px;

  ${(props) =>
    props.isOptionDropMenu
      ? `
  display: flex;
  `
      : `
  display: none;
  `}
`;

const OptionUl = styled.ul`
  width: 100%;
`;

const Optionli = styled.li<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  &:hover {
    background-color: #e6e6e6;
    border-radius: 20px;
  }
`;

const OptionImagePreview = styled.div`
  position: absolute;
  z-index: 1;
`;

interface Option {
  optionName1?: string;
  optionValue1?: string;
  optionImage1?: string;
  optionName2?: string;
  optionValue2?: string;
  optionImage2?: string;
  optionName3?: string;
  optionValue3?: string;
  optionImage3?: string;
  optionName4?: string;
  optionValue4?: string;
  optionImage4?: string;
  optionName5?: string;
  optionValue5?: string;
  optionImage5?: string;
  optionName6?: string;
  optionValue6?: string;
  optionImage6?: string;
}

export type OptionList = Array<Array<Option>>;

function ProductRegister(props: Props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  // 상품 수정
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const [category, setCategory] = useState<any>([]);
  const [Name, setName] = useState<string>("");
  const [SubTitle, setSubTitle] = useState<string>("");
  const [Cost, setCost] = useState<Number | null>(null);
  const [Price, setPrice] = useState<Number | null>(null);

  const [OptionType, setOptionType] = useState<number>(0);
  const [OptionList, setOptionList] = useState<any>([]);

  console.log(OptionList);

  const [OptionName1, setOptionName1] = useState<string>("");
  const [OptionName2, setOptionName2] = useState<string>("");
  const [OptionName3, setOptionName3] = useState<string>("");
  const [OptionName4, setOptionName4] = useState<string>("");
  const [OptionName5, setOptionName5] = useState<string>("");
  const [OptionName6, setOptionName6] = useState<string>("");
  const [OptionValue1, setOptionValue1] = useState<string[]>([]);
  const [OptionValue2, setOptionValue2] = useState<string[]>([]);
  const [OptionValue3, setOptionValue3] = useState<string[]>([]);
  const [OptionValue4, setOptionValue4] = useState<string[]>([]);
  const [OptionValue5, setOptionValue5] = useState<string[]>([]);
  const [OptionValue6, setOptionValue6] = useState<string[]>([]);
  const [OptionImage1, setOptionImage1] = useState<string>("");
  const [OptionImage2, setOptionImage2] = useState<string>("");
  const [OptionImage3, setOptionImage3] = useState<string>("");
  const [OptionImage4, setOptionImage4] = useState<string>("");
  const [OptionImage5, setOptionImage5] = useState<string>("");
  const [OptionImage6, setOptionImage6] = useState<string>("");
  const [OptionListIndex1, setOptionListIndex1] = useState<number | null>(null);
  const [OptionListIndex2, setOptionListIndex2] = useState<number | null>(null);

  // 옵션 이미지 개수
  const [OptionImageMax, setOptionImageMax] = useState<number>(8);

  // 중복 클릭 방지

  const [OptionResult, setOptionResult] = useState<any>([]);
  const [addProductResult, setAddProductResult] = useState<InstanceType<typeof addProductModel>[]>([]);
  // const [addProductResult, setAddProductResult] = useState<addProductResult[]>([]);
  // console.log(OptionResult);

  // 옵션 이미지 추가 드롭메뉴
  const [isOptionDropMenu1, setIsOptionDropMenu1] = useState<boolean>(false);
  const [isOptionDropMenu2, setIsOptionDropMenu2] = useState<boolean>(false);
  const [isOptionDropMenu3, setIsOptionDropMenu3] = useState<boolean>(false);
  const [isOptionDropMenu4, setIsOptionDropMenu4] = useState<boolean>(false);
  const [isOptionDropMenu5, setIsOptionDropMenu5] = useState<boolean>(false);
  const [isOptionDropMenu6, setIsOptionDropMenu6] = useState<boolean>(false);
  // console.log("isOptionDropMenu1 + " + isOptionDropMenu1);
  // console.log("isOptionDropMenu2 + " + isOptionDropMenu2);
  // console.log("isOptionDropMenu3 + " + isOptionDropMenu3);
  // console.log("isOptionDropMenu4 + " + isOptionDropMenu4);
  // console.log("isOptionDropMenu5 + " + isOptionDropMenu5);
  // console.log("isOptionDropMenu6 + " + isOptionDropMenu6);

  const [URL, setURL] = useState<string>("");
  const [MainImage, setMainImage] = useState<any>([]);
  const [SubImage, setSubImage] = useState<any>([]);
  const [DetailImage, setDetailImage] = useState<any>([]);
  const [mainSpec, setMainSpec] = useState<any>([]);
  const [spec, setSpec] = useState<any>([]);
  const [Delivery, setDelivery] = useState<Number | null>(null);

  // 오류메시지 상태저장
  const [NameMessage, setNameMessage] = useState<string>("");
  const [SubTitleMessage, setSubTitleMessage] = useState<string>("");
  const [CostMessage, setCostMessage] = useState<string>("");
  const [PriceMessage, setPriceMessage] = useState<string>("");
  const [OptionName1Message, setOptionName1Message] = useState<string>("");
  const [OptionName2Message, setOptionName2Message] = useState<string>("");
  const [OptionName3Message, setOptionName3Message] = useState<string>("");
  const [OptionName4Message, setOptionName4Message] = useState<string>("");
  const [OptionName5Message, setOptionName5Message] = useState<string>("");
  const [OptionName6Message, setOptionName6Message] = useState<string>("");
  const [OptionValue1Message, setOptionValue1Message] = useState<string>("");
  const [OptionValue2Message, setOptionValue2Message] = useState<string>("");
  const [OptionValue3Message, setOptionValue3Message] = useState<string>("");
  const [OptionValue4Message, setOptionValue4Message] = useState<string>("");
  const [OptionValue5Message, setOptionValue5Message] = useState<string>("");
  const [OptionValue6Message, setOptionValue6Message] = useState<string>("");
  const [URLMessage, setURLMessage] = useState<string>("");
  const [DeliveryMessage, setDeliveryMessage] = useState<string>("");

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isSubTitle, setIsSubTitle] = useState<boolean>(false);
  const [isCost, setIsCost] = useState<boolean>(false);
  const [isPrice, setIsPrice] = useState<boolean>(false);
  const [isOptionName1, setIsOptionName1] = useState<boolean>(false);
  const [isOptionName2, setIsOptionName2] = useState<boolean>(false);
  const [isOptionName3, setIsOptionName3] = useState<boolean>(false);
  const [isOptionName4, setIsOptionName4] = useState<boolean>(false);
  const [isOptionName5, setIsOptionName5] = useState<boolean>(false);
  const [isOptionName6, setIsOptionName6] = useState<boolean>(false);
  const [isOptionNameFin, setIsOptionNameFin] = useState<boolean>(false);
  const [isOptionValue1, setIsOptionValue1] = useState<boolean>(false);
  const [isOptionValue2, setIsOptionValue2] = useState<boolean>(false);
  const [isOptionValue3, setIsOptionValue3] = useState<boolean>(false);
  const [isOptionValue4, setIsOptionValue4] = useState<boolean>(false);
  const [isOptionValue5, setIsOptionValue5] = useState<boolean>(false);
  const [isOptionValue6, setIsOptionValue6] = useState<boolean>(false);
  const [isOptionValueFin, setIsOptionValueFin] = useState<boolean>(false);

  const [isOptionList, setIsOptionList] = useState<boolean>(false);

  // 옵션 이미지 중복 클릭
  const [isClicked, setIsClicked] = useState(false);

  const [isURL, setIsURL] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [Submit, setSubmit] = useState<boolean>(false);

  const [inputClickNumber, setInputClickNumber] = useState<number>(0);
  const [inputClick, setInputClick] = useState<boolean>(false);

  // 드롭 메뉴 접기
  const [CategoryDrop, setCategoryDrop] = useState<boolean>(true);
  const [ProductDrop, setProductDrop] = useState<boolean>(true);
  const [PriceDrop, setPriceDrop] = useState<boolean>(true);
  const [OptionDrop, setOptionDrop] = useState<boolean>(true);
  const [ImageDrop, setImageDrop] = useState<boolean>(true);
  const [DetailDrop, setDetailDrop] = useState<boolean>(true);
  const [DeliveryDrop, setDeliveryDrop] = useState<boolean>(true);
  const [AddDrop, setAddDrop] = useState<boolean>(true);
  const [SpecDrop, setSpecDrop] = useState<boolean>(true);

  // 추가상품 리스트 추가
  const [addListType, setAddListType] = useState<number>(0);

  // 추가 상품 value
  const [addName1, setAddName1] = useState<string>("");
  const [addName2, setAddName2] = useState<string>("");
  const [addName3, setAddName3] = useState<string>("");
  const [addName4, setAddName4] = useState<string>("");
  const [addName5, setAddName5] = useState<string>("");
  const [addPrice1, setAddPrice1] = useState<number>(0);
  const [addPrice2, setAddPrice2] = useState<number>(0);
  const [addPrice3, setAddPrice3] = useState<number>(0);
  const [addPrice4, setAddPrice4] = useState<number>(0);
  const [addPrice5, setAddPrice5] = useState<number>(0);
  const [addStock1, setAddStock1] = useState<number>(0);
  const [addStock2, setAddStock2] = useState<number>(0);
  const [addStock3, setAddStock3] = useState<number>(0);
  const [addStock4, setAddStock4] = useState<number>(0);
  const [addStock5, setAddStock5] = useState<number>(0);
  const [addUse1, setAddUse1] = useState<boolean>(true);
  const [addUse2, setAddUse2] = useState<boolean>(true);
  const [addUse3, setAddUse3] = useState<boolean>(true);
  const [addUse4, setAddUse4] = useState<boolean>(true);
  const [addUse5, setAddUse5] = useState<boolean>(true);

  // 추가 상품 사용여부 드롭 메뉴
  const [isAddProDrop1, setIsAddProDrop1] = useState<boolean>(false);
  const [isAddProDrop2, setIsAddProDrop2] = useState<boolean>(false);
  const [isAddProDrop3, setIsAddProDrop3] = useState<boolean>(false);
  const [isAddProDrop4, setIsAddProDrop4] = useState<boolean>(false);
  const [isAddProDrop5, setIsAddProDrop5] = useState<boolean>(false);

  const [isAddName1, setIsAddName1] = useState<boolean>(false);
  const [isAddName2, setIsAddName2] = useState<boolean>(false);
  const [isAddName3, setIsAddName3] = useState<boolean>(false);
  const [isAddName4, setIsAddName4] = useState<boolean>(false);
  const [isAddName5, setIsAddName5] = useState<boolean>(false);
  const [isAddPrice1, setIsAddPrice1] = useState<boolean>(false);
  const [isAddPrice2, setIsAddPrice2] = useState<boolean>(false);
  const [isAddPrice3, setIsAddPrice3] = useState<boolean>(false);
  const [isAddPrice4, setIsAddPrice4] = useState<boolean>(false);
  const [isAddPrice5, setIsAddPrice5] = useState<boolean>(false);
  const [isAddStock1, setIsAddStock1] = useState<boolean>(false);
  const [isAddStock2, setIsAddStock2] = useState<boolean>(false);
  const [isAddStock3, setIsAddStock3] = useState<boolean>(false);
  const [isAddStock4, setIsAddStock4] = useState<boolean>(false);
  const [isAddStock5, setIsAddStock5] = useState<boolean>(false);

  const [isAddProductFinish1, setIsAddProductFinish1] = useState<boolean>(false);
  const [isAddProductFinish2, setIsAddProductFinish2] = useState<boolean>(false);
  const [isAddProductFinish3, setIsAddProductFinish3] = useState<boolean>(false);
  const [isAddProductFinish4, setIsAddProductFinish4] = useState<boolean>(false);
  const [isAddProductFinish5, setIsAddProductFinish5] = useState<boolean>(false);
  const [isAddProductFinishEnd, setIsAddProductFinishEnd] = useState<boolean>(false);

  // console.log(isAddName1);
  // console.log(isAddPrice1);
  // console.log(isAddStock1);
  // console.log(addListType);
  // console.log('isAddProductFinish1 ' + isAddProductFinish1);
  // console.log('isAddProductFinish2 ' + isAddProductFinish2);
  // console.log('isAddProductFinish3 ' + isAddProductFinish3);
  // console.log('isAddProductFinish4 ' + isAddProductFinish4);
  // console.log('isAddProductFinish5 ' + isAddProductFinish5);
  // console.log('isAddProductFinishEnd ' + isAddProductFinishEnd);

  const [addName1Err, setAddName1Err] = useState<string>("");
  const [addName2Err, setAddName2Err] = useState<string>("");
  const [addName3Err, setAddName3Err] = useState<string>("");
  const [addName4Err, setAddName4Err] = useState<string>("");
  const [addName5Err, setAddName5Err] = useState<string>("");

  const [addPrice1Err, setAddPrice1Err] = useState<string>("");
  const [addPrice2Err, setAddPrice2Err] = useState<string>("");
  const [addPrice3Err, setAddPrice3Err] = useState<string>("");
  const [addPrice4Err, setAddPrice4Err] = useState<string>("");
  const [addPrice5Err, setAddPrice5Err] = useState<string>("");

  const [addStock1Err, setAddStock1Err] = useState<string>("");
  const [addStock2Err, setAddStock2Err] = useState<string>("");
  const [addStock3Err, setAddStock3Err] = useState<string>("");
  const [addStock4Err, setAddStock4Err] = useState<string>("");
  const [addStock5Err, setAddStock5Err] = useState<string>("");

  const [addSubmitErr, setAddSubmitErr] = useState<string>("");
  // console.log(addSubmitErr);

  // Ref
  const inputRefName = useRef<HTMLDivElement>(null);
  const inputRefSubTitle = useRef<HTMLDivElement>(null);
  const inputRefCost = useRef<HTMLDivElement>(null);
  const inputRefPrice = useRef<HTMLDivElement>(null);
  const inputRefOptionName1 = useRef<HTMLDivElement>(null);
  const inputRefOptionName2 = useRef<HTMLDivElement>(null);
  const inputRefOptionName3 = useRef<HTMLDivElement>(null);
  const inputRefOptionName4 = useRef<HTMLDivElement>(null);
  const inputRefOptionName5 = useRef<HTMLDivElement>(null);
  const inputRefOptionName6 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue1 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue2 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue3 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue4 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue5 = useRef<HTMLDivElement>(null);
  const inputRefOptionValue6 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu1 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu2 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu3 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu4 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu5 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenu6 = useRef<HTMLDivElement>(null);
  const inputRefOptionDropMenuBtn1 = useRef<HTMLButtonElement>(null);
  const inputRefOptionDropMenuBtn2 = useRef<HTMLButtonElement>(null);
  const inputRefOptionDropMenuBtn3 = useRef<HTMLButtonElement>(null);
  const inputRefOptionDropMenuBtn4 = useRef<HTMLButtonElement>(null);
  const inputRefOptionDropMenuBtn5 = useRef<HTMLButtonElement>(null);
  const inputRefOptionDropMenuBtn6 = useRef<HTMLButtonElement>(null);
  const inputRefURL = useRef<HTMLDivElement>(null);
  const inputRefImage = useRef<HTMLDivElement>(null);
  // const inputRefDetail = useRef<HTMLDivElement>(null);
  const inputRefDelivery = useRef<HTMLDivElement>(null);
  const inputRefMainSpec = useRef<HTMLDivElement>(null);
  const inputRefSpec = useRef<HTMLDivElement>(null);

  const addRefName1 = useRef<HTMLDivElement>(null);
  const addRefName2 = useRef<HTMLDivElement>(null);
  const addRefName3 = useRef<HTMLDivElement>(null);
  const addRefName4 = useRef<HTMLDivElement>(null);
  const addRefName5 = useRef<HTMLDivElement>(null);
  const addRefPrice1 = useRef<HTMLDivElement>(null);
  const addRefPrice2 = useRef<HTMLDivElement>(null);
  const addRefPrice3 = useRef<HTMLDivElement>(null);
  const addRefPrice4 = useRef<HTMLDivElement>(null);
  const addRefPrice5 = useRef<HTMLDivElement>(null);
  const addRefStock1 = useRef<HTMLDivElement>(null);
  const addRefStock2 = useRef<HTMLDivElement>(null);
  const addRefStock3 = useRef<HTMLDivElement>(null);
  const addRefStock4 = useRef<HTMLDivElement>(null);
  const addRefStock5 = useRef<HTMLDivElement>(null);
  const addRefUse1 = useRef<HTMLDivElement>(null);
  const addRefUse2 = useRef<HTMLDivElement>(null);
  const addRefUse3 = useRef<HTMLDivElement>(null);
  const addRefUse4 = useRef<HTMLDivElement>(null);
  const addRefUse5 = useRef<HTMLDivElement>(null);

  const addCommasToNumber = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedCost = Cost !== null ? addCommasToNumber(Cost) : "";
  const formattedPrice = Price !== null ? addCommasToNumber(Price) : "";
  const formattedDelivery = Delivery !== null ? addCommasToNumber(Delivery) : "";

  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 상품명
    setName(e.target.value);
    if (e.target.value === "") {
      setNameMessage("상품명을 입력해 주세요.");
      setIsName(false);
    } else if (e.target.value.length > 100) {
      setNameMessage("100글자 미만으로 입력 해주세요.");
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const SubTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 부제
    setSubTitle(e.target.value);
    if (e.target.value.length > 15) {
      setSubTitleMessage("15글자 미만으로 입력 해주세요.");
      setIsSubTitle(false);
    } else {
      setIsSubTitle(true);
    }
  };

  const CostHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 원가
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    const priceRegex = /^d[1-9]$/;
    const passwordCurrent = e.target.value;
    setCost(Number(passwordCurrent));

    if (e.target.value === "") {
      setCostMessage("필수 정보입니다.");
      setIsCost(false);
      return;
    }

    console.log(e.target.value.length);
    if (e.target.value.length === 1) {
      setCostMessage("최소 10원 이상 입력해주세요.");
      setIsCost(false);
      return;
    }

    if (e.target.value.length === 10) {
      setCostMessage("최대 999,999,990원 이하로 입력해주세요.");
      setIsCost(false);
      return;
    }

    if (priceRegex.test(e.target.value)) {
      setCostMessage("10원 단위로 입력해주세요.");
      setIsPrice(false);
      return;
    } else {
      setCostMessage("");
      setIsCost(true);
    }
  };

  const PriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 가격
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    const priceRegex = /^d[1-9]$/;
    const passwordCurrent = e.target.value;
    setPrice(Number(passwordCurrent));

    if (e.target.value === "") {
      setPriceMessage("필수 정보입니다.");
      setIsPrice(false);
      return;
    }

    if (Cost !== null) {
      if (Number(passwordCurrent) >= Cost) {
        setPriceMessage("상품의 원가와 같거나 높은 금액을 설정 할수 없습니다.");
        setIsPrice(false);
        return;
      }
    }

    if (e.target.value.length === 1) {
      setPriceMessage("최소 10원 이상 입력해주세요.");
      setIsPrice(false);
      return;
    }

    if (e.target.value.length === 10) {
      setPriceMessage("최대 999,999,990원 이하로 입력해주세요.");
      setIsPrice(false);
      return;
    }

    if (priceRegex.test(e.target.value)) {
      setPriceMessage("10원 단위로 입력해주세요.");
      setIsPrice(false);
      return;
    } else {
      setPriceMessage("");
      setIsPrice(true);
    }
  };

  const URLHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // URL
    setURL(e.target.value);
    if (e.target.value === "") {
      setURLMessage("URL 주소를 입력해 주세요.");
      setIsURL(false);
    } else if (e.target.value.length > 20) {
      setURLMessage("URL 주소를 20글자 내로 작성해주세요");
      setIsURL(false);
    } else {
      setIsURL(true);
    }
  };

  const MainSpecHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 메인 스펙
    const data = e.target.value;
    const mainSpecArray = data.split(",").map((item) => item.trim());

    setMainSpec(mainSpecArray);
  };

  const SpecHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 일반 스펙
    const data = e.target.value;
    const specArray = data.split(",").map((item) => item.trim());

    setSpec(specArray);
  };

  const DeliveryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 배송비 핸들러
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    const priceRegex = /^d[1-9]$/;
    const passwordCurrent = e.target.value;
    setDelivery(Number(passwordCurrent));

    if (e.target.value === "") {
      setDeliveryMessage("필수 정보입니다.");
      setIsDelivery(false);
      return;
    }

    if (e.target.value.length === 1) {
      setDeliveryMessage("최소 10원 이상 입력해주세요.");
      setIsDelivery(false);
      return;
    }

    if (e.target.value.length === 10) {
      setDeliveryMessage("최대 999,999,990원 이하로 입력해주세요.");
      setIsDelivery(false);
      return;
    }

    if (priceRegex.test(e.target.value)) {
      setDeliveryMessage("10원 단위로 입력해주세요.");
      setIsDelivery(false);
      return;
    } else {
      setDeliveryMessage("");
      setIsDelivery(true);
    }
  };

  const pagefold = async () => {
    // 페이지 접기
    setCategoryDrop((e) => !e);
  };

  // 옵션 함수 모음
  const option = {
    // 옵션 드롭 메뉴
    DropMenu: (listIndex: number, setIsOptionDropMenu: React.Dispatch<SetStateAction<boolean>>) => {
      setIsOptionDropMenu((e) => !e);
      setOptionListIndex1(listIndex);
    },
    ImageHandler: (optionIndex: number) => {
      // console.log(type);
      // console.log(index);

      setOptionListIndex2(optionIndex);
    },
    DropMenuHandler1: () => {
      // if(!isOptionName1 && !isOptionValue1){
      //   return;
      // } else if (isOptionDropMenu2 || isOptionDropMenu3 || isOptionDropMenu4 || isOptionDropMenu5 || isOptionDropMenu6) {
      //   return;
      // }

      option.DropMenu(0, setIsOptionDropMenu1);
      setIsOptionDropMenu2(false);
      setIsOptionDropMenu3(false);
      setIsOptionDropMenu4(false);
      setIsOptionDropMenu5(false);
      setIsOptionDropMenu6(false);
    },
    DropMenuHandler2: () => {
      // if(!isOptionName2 && !isOptionValue2){
      //   return;
      // } else if (isOptionDropMenu1 || isOptionDropMenu3 || isOptionDropMenu4 || isOptionDropMenu5 || isOptionDropMenu6) {
      //   return;
      // }

      option.DropMenu(1, setIsOptionDropMenu2);
      setIsOptionDropMenu1(false);
      setIsOptionDropMenu3(false);
      setIsOptionDropMenu4(false);
      setIsOptionDropMenu5(false);
      setIsOptionDropMenu6(false);
    },
    DropMenuHandler3: () => {
      if (!isOptionName3 && !isOptionValue3) {
        return;
      } else if (isOptionDropMenu1 || isOptionDropMenu2 || isOptionDropMenu4 || isOptionDropMenu5 || isOptionDropMenu6) {
        return;
      }

      option.DropMenu(2, setIsOptionDropMenu3);
      setIsOptionDropMenu1(false);
      setIsOptionDropMenu2(false);
      setIsOptionDropMenu4(false);
      setIsOptionDropMenu5(false);
      setIsOptionDropMenu6(false);
    },
    DropMenuHandler4: () => {
      if (!isOptionName4 && !isOptionValue4) {
        return;
      } else if (isOptionDropMenu1 || isOptionDropMenu2 || isOptionDropMenu3 || isOptionDropMenu5 || isOptionDropMenu6) {
        return;
      }

      option.DropMenu(3, setIsOptionDropMenu4);
    },
    DropMenuHandler5: () => {
      if (!isOptionName5 && !isOptionValue5) {
        return;
      } else if (isOptionDropMenu1 || isOptionDropMenu2 || isOptionDropMenu3 || isOptionDropMenu4 || isOptionDropMenu6) {
        return;
      }

      option.DropMenu(4, setIsOptionDropMenu5);
    },
    DropMenuHandler6: () => {
      if (!isOptionName6 && !isOptionValue6) {
        return;
      } else if (isOptionDropMenu1 || isOptionDropMenu2 || isOptionDropMenu3 || isOptionDropMenu4 || isOptionDropMenu5) {
        return;
      }

      option.DropMenu(5, setIsOptionDropMenu6);
    },
    // 옵션 추가
    PlusHandler: () => {
      if (OptionType === 5) {
        return;
      } else {
        setOptionType((e) => e + 1);
      }
    },
    // 옵션 삭제
    MinusHandler: () => {
      if (OptionType === 0) {
        return;
      } else {
        setOptionType((e) => e - 1);
      }
    },
    // 옵션명- 01
    NameHandler: (
      e: React.ChangeEvent<HTMLInputElement>,
      setOptionName: React.Dispatch<SetStateAction<string>>,
      setIsOptionName: React.Dispatch<SetStateAction<boolean>>,
      setOptionNameMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setOptionName(e.target.value);

      if (e.target.value === "") {
        setIsOptionName(false);
        setOptionNameMessage("옵션명을 입력 해주세요.");
      } else if (e.target.value.length > 41) {
        setIsOptionName(false);
        setOptionNameMessage("옵션명을 40글자 이내로 작성 해주세요.");
      } else {
        setIsOptionName(true);
      }
    },
    // 옵션값- 01
    ValueHandler: (
      e: React.ChangeEvent<HTMLInputElement>,
      setOptionValue: React.Dispatch<SetStateAction<string[]>>,
      setIsOptionValue: React.Dispatch<SetStateAction<boolean>>,
      setOptionValueMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const dataSlice = e.target.value.split(",");

      setOptionValue(dataSlice);
      if (dataSlice[dataSlice.length - 1] === "") {
        setIsOptionValue(false);
        setOptionValueMessage("입력되지 않은 옵션값이 있습니다.");
      } else {
        setIsOptionValue(true);
      }
    },
    Name1Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName1, setIsOptionName1, setOptionName1Message);
    },
    Name2Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName2, setIsOptionName2, setOptionName2Message);
    },
    Name3Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName3, setIsOptionName3, setOptionName3Message);
    },
    Name4Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName4, setIsOptionName4, setOptionName4Message);
    },
    Name5Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName5, setIsOptionName5, setOptionName5Message);
    },
    Name6Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.NameHandler(e, setOptionName6, setIsOptionName6, setOptionName6Message);
    },
    Value1Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue1, setIsOptionValue1, setOptionValue1Message);
    },
    Value2Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue2, setIsOptionValue2, setOptionValue2Message);
    },
    Value3Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue3, setIsOptionValue3, setOptionValue3Message);
    },
    Value4Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue4, setIsOptionValue4, setOptionValue4Message);
    },
    Value5Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue5, setIsOptionValue5, setOptionValue5Message);
    },
    Value6Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      option.ValueHandler(e, setOptionValue6, setIsOptionValue6, setOptionValue6Message);
    },
    // 옵션목록으로 적용 버튼
    Submit: (e: any) => {
      e.preventDefault();

      console.log("옵션목록으로 적용 버튼");
      if (!(isOptionNameFin && isOptionValueFin)) {
        return;
      }

      setOptionResult("");
      OptionValue1.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue1(false);
          setOptionValue1Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue1Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue1(true);
        }
      });

      OptionValue2?.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue2(false);
          setOptionValue2Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue2Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue2(true);
        }
      });
      OptionValue3?.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue3(false);
          setOptionValue3Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue3Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue3(true);
        }
      });
      OptionValue4?.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue4(false);
          setOptionValue4Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue4Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue4(true);
        }
      });
      OptionValue5?.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue5(false);
          setOptionValue5Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue5Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue5(true);
        }
      });
      OptionValue6?.map((list: any, index: any) => {
        if (list === "") {
          setIsOptionValue6(false);
          setOptionValue6Message("옵션값을 입력 해주세요.");
        } else if (list.length > 21) {
          setOptionValue6Message("하나의 옵션값은 최대 20자로 입력해주세요.");
        } else {
          setIsOptionValue6(true);
        }
      });

      const optiondata = {
        optionPrice: 0,
        optionStock: 0,
        optionStatus: "품절",
        optionUse: "Y",
        deleteBtn: "",
      };

      const result: Array<any> = [];
      setOptionList([]);

      if (OptionType === 0) {
        OptionValue1.forEach((value1, index) => {
          result.push({
            ...optiondata,
            id: result.length,
            optionName1: OptionName1,
            optionValue1: value1,
          });
        });
        const list: OptionList = [
          OptionValue1.map((value, index) => ({
            optionName1: OptionName1,
            optionValue1: value,
          })),
        ];
        setOptionList(list);
      } else if (OptionType === 1) {
        OptionValue1.forEach((value1) => {
          OptionValue2.forEach((value2) => {
            result.push({
              ...optiondata,
              id: result.length,
              optionName1: OptionName1,
              optionValue1: value1,
              optionName2: OptionName2,
              optionValue2: value2,
            });
            const list = [
              OptionValue1.map((value, index) => ({
                optionName1: OptionName1,
                optionValue1: value,
              })),
              OptionValue2.map((value, index) => ({
                optionName2: OptionName2,
                optionValue2: value,
              })),
            ];
            setOptionList(list);
          });
        });
      } else if (OptionType === 2) {
        OptionValue1.forEach((value1) => {
          OptionValue2.forEach((value2) => {
            OptionValue3.forEach((value3) => {
              result.push({
                ...optiondata,
                id: result.length,
                optionName1: OptionName1,
                optionValue1: value1,
                optionName2: OptionName2,
                optionValue2: value2,
                optionName3: OptionName3,
                optionValue3: value3,
              });
            });
          });
        });
        const list: OptionList = [
          OptionValue1.map((value, index) => ({
            optionName1: OptionName1,
            optionValue1: value,
          })),
          OptionValue2.map((value, index) => ({
            optionName2: OptionName2,
            optionValue2: value,
          })),
          OptionValue3.map((value, index) => ({
            optionName3: OptionName3,
            optionValue3: value,
          })),
        ];
        setOptionList(list);
      } else if (OptionType === 3) {
        OptionValue1.forEach((value1) => {
          OptionValue2.forEach((value2) => {
            OptionValue3.forEach((value3) => {
              OptionValue4.forEach((value4) => {
                result.push({
                  ...optiondata,
                  id: result.length,
                  optionName1: OptionName1,
                  optionValue1: value1,
                  optionName2: OptionName2,
                  optionValue2: value2,
                  optionName3: OptionName3,
                  optionValue3: value3,
                  optionName4: OptionName4,
                  optionValue4: value4,
                });
              });
            });
          });
        });
        const list: OptionList = [
          OptionValue1.map((value, index) => ({
            optionName1: OptionName1,
            optionValue1: value,
          })),
          OptionValue2.map((value, index) => ({
            optionName2: OptionName2,
            optionValue2: value,
          })),
          OptionValue3.map((value, index) => ({
            optionName3: OptionName3,
            optionValue3: value,
          })),
          OptionValue4.map((value, index) => ({
            optionName4: OptionName4,
            optionValue4: value,
          })),
        ];
        setOptionList(list);
      } else if (OptionType === 4) {
        OptionValue1.forEach((value1) => {
          OptionValue2.forEach((value2) => {
            OptionValue3.forEach((value3) => {
              OptionValue4.forEach((value4) => {
                OptionValue5.forEach((value5) => {
                  result.push({
                    ...optiondata,
                    id: result.length,
                    optionName1: OptionName1,
                    optionValue1: value1,
                    optionName2: OptionName2,
                    optionValue2: value2,
                    optionName3: OptionName3,
                    optionValue3: value3,
                    optionName4: OptionName4,
                    optionValue4: value4,
                    optionName5: OptionName5,
                    optionValue5: value5,
                  });
                });
              });
            });
          });
        });
        const list: OptionList = [
          OptionValue1.map((value, index) => ({
            optionName1: OptionName1,
            optionValue1: value,
          })),
          OptionValue2.map((value, index) => ({
            optionName2: OptionName2,
            optionValue2: value,
          })),
          OptionValue3.map((value, index) => ({
            optionName3: OptionName3,
            optionValue3: value,
          })),
          OptionValue4.map((value, index) => ({
            optionName4: OptionName4,
            optionValue4: value,
          })),
          OptionValue5.map((value, index) => ({
            optionName5: OptionName5,
            optionValue5: value,
          })),
        ];
        setOptionList(list);
      } else if (OptionType === 5) {
        OptionValue1.forEach((value1) => {
          OptionValue2.forEach((value2) => {
            OptionValue3.forEach((value3) => {
              OptionValue4.forEach((value4) => {
                OptionValue5.forEach((value5) => {
                  OptionValue6.forEach((value6) => {
                    result.push({
                      ...optiondata,
                      id: result.length,
                      optionName1: OptionName1,
                      optionValue1: value1,
                      optionName2: OptionName2,
                      optionValue2: value2,
                      optionName3: OptionName3,
                      optionValue3: value3,
                      optionName4: OptionName4,
                      optionValue4: value4,
                      optionName5: OptionName5,
                      optionValue5: value5,
                      optionName6: OptionName6,
                      optionValue6: value6,
                    });
                  });
                });
              });
            });
          });
        });
        const list: OptionList = [
          OptionValue1.map((value, index) => ({
            optionName1: OptionName1,
            optionValue1: value,
          })),
          OptionValue2.map((value, index) => ({
            optionName2: OptionName2,
            optionValue2: value,
          })),
          OptionValue3.map((value, index) => ({
            optionName3: OptionName3,
            optionValue3: value,
          })),
          OptionValue4.map((value, index) => ({
            optionName4: OptionName4,
            optionValue4: value,
          })),
          OptionValue5.map((value, index) => ({
            optionName5: OptionName5,
            optionValue5: value,
          })),
          OptionValue6.map((value, index) => ({
            optionName6: OptionName6,
            optionValue6: value,
          })),
        ];
        setOptionList(list);
      } else {
        return;
      }
      console.log(result);

      // setOptionResult((data: any) => [...data, optiondata]);
      setOptionResult(result);
    },
  };

  // 추가 상품 함수모음
  const addProducts = {
    NameChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      setAddName: React.Dispatch<React.SetStateAction<string>>,
      setIsAddName: React.Dispatch<React.SetStateAction<boolean>>,
      setAddNameErr: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setAddName(e.target.value);

      if (e.target.value === "") {
        setIsAddName(false);
        setAddNameErr("옵션명을 입력 해주세요.");
      } else if (e.target.value.length > 21) {
        setIsAddName(false);
        setAddNameErr("옵션명을 20글자 이내로 작성 해주세요.");
      } else {
        setIsAddName(true);
      }
    },
    PriceChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      setAddPrice: React.Dispatch<React.SetStateAction<number>>,
      setIsAddPrice: React.Dispatch<React.SetStateAction<boolean>>,
      setAddPriceErr: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const price = e.target.value;
      const regex = /^[0-9]+$/;
      console.log(price);

      if (price === "") {
        setAddPrice(0);
        setIsAddPrice(false);
      }

      if (!regex.test(price)) {
        setAddPriceErr("숫자만 입력해주세요.");
        setIsAddPrice(false);
      } else {
        setAddPrice(Number(price));
        setIsAddPrice(true);
      }
    },
    StockChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      setAddStock: React.Dispatch<React.SetStateAction<number>>,
      setIsAddStock: React.Dispatch<React.SetStateAction<boolean>>,
      setAddStockErr: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const stock = e.target.value;
      const regex = /^[0-9]+$/;

      if (stock === "") {
        setAddStock(0);
        setIsAddStock(false);
      }

      if (!regex.test(stock)) {
        setAddStockErr("숫자만 입력해주세요.");
        setIsAddStock(false);
      } else {
        setAddStock(Number(stock));
        setIsAddStock(true);
      }
    },
    UseChange: (e: boolean, setAddUse: React.Dispatch<React.SetStateAction<boolean>>) => {
      setAddUse(e);
    },

    // 옵션 추가
    PlusHandler: () => {
      if (addListType === 4) {
        return;
      } else {
        setAddListType((e) => e + 1);
        setAddProductResult((prevResult) => [...prevResult, { name: "", price: 0, stock: 0, use: true }]);
      }
    },
    // 옵션 삭제
    MinusHandler: () => {
      if (addListType === 0) {
        return;
      } else {
        setAddListType((e) => e - 1);
        setAddProductResult((prevState) => prevState.slice(0, -1));

        switch (addListType) {
          case 4:
            console.log("case4");
            setAddName5("");
            setAddPrice5(0);
            setAddStock5(0);
            setAddUse5(true);

            setIsAddName5(false);
            setIsAddPrice5(false);
            setIsAddStock5(false);
            setIsAddProductFinish5(false);
            break;
          case 3:
            console.log("case3");

            setAddName4("");
            setAddPrice4(0);
            setAddStock4(0);
            setAddUse4(true);

            setIsAddName4(false);
            setIsAddPrice4(false);
            setIsAddStock4(false);
            setIsAddProductFinish4(false);
            break;
          case 2:
            console.log("case2");

            setAddName3("");
            setAddPrice3(0);
            setAddStock3(0);
            setAddUse3(true);

            setIsAddName3(false);
            setIsAddPrice3(false);
            setIsAddStock3(false);
            setIsAddProductFinish3(false);
            break;
          case 1:
            console.log("case1");

            setAddName2("");
            setAddPrice2(0);
            setAddStock2(0);
            setAddUse2(true);

            setIsAddName2(false);
            setIsAddPrice2(false);
            setIsAddStock2(false);
            setIsAddProductFinish2(false);
            break;
          case 0:
            console.log("case0");

            setAddName1("");
            setAddPrice1(0);
            setAddStock1(0);
            setAddUse1(true);

            setIsAddName1(false);
            setIsAddPrice1(false);
            setIsAddStock1(false);
            setIsAddProductFinish1(false);
            break;
          default:
            break;
        }
      }
    },
    // 상품명
    Name1Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.NameChange(e, setAddName1, setIsAddName1, setAddName1Err);
    },
    Name2Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.NameChange(e, setAddName2, setIsAddName2, setAddName2Err);
    },
    Name3Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.NameChange(e, setAddName3, setIsAddName3, setAddName3Err);
    },
    Name4Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.NameChange(e, setAddName4, setIsAddName4, setAddName4Err);
    },
    Name5Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.NameChange(e, setAddName5, setIsAddName5, setAddName5Err);
    },
    // 가격
    Price1Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.PriceChange(e, setAddPrice1, setIsAddPrice1, setAddPrice1Err);
    },
    Price2Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.PriceChange(e, setAddPrice2, setIsAddPrice2, setAddPrice2Err);
    },
    Price3Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.PriceChange(e, setAddPrice3, setIsAddPrice3, setAddPrice3Err);
    },
    Price4Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.PriceChange(e, setAddPrice4, setIsAddPrice4, setAddPrice4Err);
    },
    Price5Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.PriceChange(e, setAddPrice5, setIsAddPrice5, setAddPrice5Err);
    },
    // 재고
    Stock1Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.StockChange(e, setAddStock1, setIsAddStock1, setAddStock1Err);
    },
    Stock2Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.StockChange(e, setAddStock2, setIsAddStock2, setAddStock2Err);
    },
    Stock3Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.StockChange(e, setAddStock3, setIsAddStock3, setAddStock3Err);
    },
    Stock4Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.StockChange(e, setAddStock4, setIsAddStock4, setAddStock4Err);
    },
    Stock5Handler: (e: React.ChangeEvent<HTMLInputElement>) => {
      addProducts.StockChange(e, setAddStock5, setIsAddStock5, setAddStock5Err);
    },
    // 사용여부
    Use1Handler: (e: boolean) => {
      addProducts.UseChange(e, setAddUse1);
    },
    Use2Handler: (e: boolean) => {
      addProducts.UseChange(e, setAddUse2);
    },
    Use3Handler: (e: boolean) => {
      addProducts.UseChange(e, setAddUse3);
    },
    Use4Handler: (e: boolean) => {
      addProducts.UseChange(e, setAddUse4);
    },
    Use5Handler: (e: boolean) => {
      addProducts.UseChange(e, setAddUse5);
    },
    Submit: (e: any) => {
      e.preventDefault();

      if (addListType <= 4) {
        const isAllProductsFinish = Array.from({ length: addListType + 1 }, (_, i) => `isAddProductFinish${i + 1}`).every((key) => eval(key));
        console.log(isAllProductsFinish);
        setIsAddProductFinishEnd(isAllProductsFinish);
      } else {
        setIsAddProductFinishEnd(false);
        setAddSubmitErr("상품 내용을 전부 입력 해주세요.");
      }

      const addProductObject: InstanceType<typeof addProductModel>[] = [];

      const addData = (name, price, stock, use) => {
        if (name === "" && price === 0 && stock === 0) {
          return;
        }

        addProductObject.push({
          name,
          price,
          stock,
          use,
        });
      };

      if (addListType >= 0) {
        addData(addName1, addPrice1, addStock1, addUse1);
      }

      if (addListType >= 1) {
        addData(addName2, addPrice2, addStock2, addUse2);
      }

      if (addListType >= 2) {
        addData(addName3, addPrice3, addStock3, addUse3);
      }

      if (addListType >= 3) {
        addData(addName4, addPrice4, addStock4, addUse4);
      }

      if (addListType >= 4) {
        addData(addName5, addPrice5, addStock5, addUse5);
      }

      setAddProductResult(addProductObject);
    },
  };

  // // 옵션목록에서 옵션명을 수정했을때 Input에도 반영하기.
  // useEffect(() => {
  //   const editedOptionValues = OptionResult && OptionResult.map((list: any) => list.optionValue1);
  //   setOptionValue1(editedOptionValues);
  // }, [OptionResult]);

  // 재고가 있으면서 사용여부가 Y인 경우에만 판매승인
  useEffect(() => {
    const use = OptionResult.some((list: any) => {
      return list.optionUse === "Y" && list.optionStock > 0;
    });

    if (use) {
      setIsOptionList(true);
    } else {
      setIsOptionList(false);
    }
  }, [OptionResult]);

  // 상품 수정시 실행됩니다.
  useEffect(() => {
    if (id) {
      setIsEdit(true);

      const productedit = async () => {
        const db = await axios.get(`/smartstore/home/product/${id}`);
        try {
          console.log(`${id}의 db 정보를 가져옵니다.`);
          const product = db.data.productEdit;
          console.log(product);

          setCategory(product.category);
          setName(product.name);
          setSubTitle(product.subtitle);
          setCost(product.cost);
          setPrice(product.price);

          setOptionList(product.optionList);
          setOptionType(product.optionList.length - 1);

          if (product.optionList.length === 1) {
            console.log("product.optionList.length === 1");

            setOptionName1(product.optionList[0][0].optionName1);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
          } else if (product.optionList.length === 2) {
            setOptionName1(product.optionList[0][0].optionName1);
            setOptionName2(product.optionList[1][0].optionName2);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });
            product.optionList[1].forEach((option, index) => {
              setOptionValue2((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue2;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
            setIsOptionName2(true);
            setIsOptionValue2(true);
          } else if (product.optionList.length === 3) {
            setOptionName1(product.optionList[0][0].optionName1);
            setOptionName2(product.optionList[1][0].optionName2);
            setOptionName3(product.optionList[2][0].optionName3);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });
            product.optionList[1].forEach((option, index) => {
              setOptionValue2((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue2;
                return updatedValues;
              });
            });
            product.optionList[2].forEach((option, index) => {
              setOptionValue3((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue3;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
            setIsOptionName2(true);
            setIsOptionValue2(true);
            setIsOptionName3(true);
            setIsOptionValue3(true);
          } else if (product.optionList.length === 4) {
            setOptionName1(product.optionList[0][0].optionName1);
            setOptionName2(product.optionList[1][0].optionName2);
            setOptionName3(product.optionList[2][0].optionName3);
            setOptionName4(product.optionList[3][0].optionName4);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });
            product.optionList[1].forEach((option, index) => {
              setOptionValue2((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue2;
                return updatedValues;
              });
            });
            product.optionList[2].forEach((option, index) => {
              setOptionValue3((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue3;
                return updatedValues;
              });
            });
            product.optionList[3].forEach((option, index) => {
              setOptionValue4((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue4;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
            setIsOptionName2(true);
            setIsOptionValue2(true);
            setIsOptionName3(true);
            setIsOptionValue3(true);
            setIsOptionName4(true);
            setIsOptionValue4(true);
          } else if (product.optionList.length === 5) {
            setOptionName1(product.optionList[0][0].optionName1);
            setOptionName2(product.optionList[1][0].optionName2);
            setOptionName3(product.optionList[2][0].optionName3);
            setOptionName4(product.optionList[3][0].optionName4);
            setOptionName5(product.optionList[4][0].optionName5);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });
            product.optionList[1].forEach((option, index) => {
              setOptionValue2((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue2;
                return updatedValues;
              });
            });
            product.optionList[2].forEach((option, index) => {
              setOptionValue3((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue3;
                return updatedValues;
              });
            });
            product.optionList[3].forEach((option, index) => {
              setOptionValue4((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue4;
                return updatedValues;
              });
            });
            product.optionList[4].forEach((option, index) => {
              setOptionValue5((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue5;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
            setIsOptionName2(true);
            setIsOptionValue2(true);
            setIsOptionName3(true);
            setIsOptionValue3(true);
            setIsOptionName4(true);
            setIsOptionValue4(true);
            setIsOptionName5(true);
            setIsOptionValue5(true);
          } else if (product.optionList.length === 6) {
            setOptionName1(product.optionList[0][0].optionName1);
            setOptionName2(product.optionList[1][0].optionName2);
            setOptionName3(product.optionList[2][0].optionName3);
            setOptionName4(product.optionList[3][0].optionName4);
            setOptionName5(product.optionList[4][0].optionName5);
            setOptionName6(product.optionList[5][0].optionName6);

            product.optionList[0].forEach((option, index) => {
              setOptionValue1((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue1;
                return updatedValues;
              });
            });
            product.optionList[1].forEach((option, index) => {
              setOptionValue2((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue2;
                return updatedValues;
              });
            });
            product.optionList[2].forEach((option, index) => {
              setOptionValue3((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue3;
                return updatedValues;
              });
            });
            product.optionList[3].forEach((option, index) => {
              setOptionValue4((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue4;
                return updatedValues;
              });
            });
            product.optionList[4].forEach((option, index) => {
              setOptionValue5((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue5;
                return updatedValues;
              });
            });
            product.optionList[5].forEach((option, index) => {
              setOptionValue6((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = option.optionValue6;
                return updatedValues;
              });
            });

            setIsOptionName1(true);
            setIsOptionValue1(true);
            setIsOptionName2(true);
            setIsOptionValue2(true);
            setIsOptionName3(true);
            setIsOptionValue3(true);
            setIsOptionName4(true);
            setIsOptionValue4(true);
            setIsOptionName5(true);
            setIsOptionValue5(true);
            setIsOptionName6(true);
            setIsOptionValue6(true);
          }

          if (product.addProduct.length === 0) {
            setAddListType(product.addProduct.length);
          } else {
            setAddListType(product.addProduct.length - 1);
          }

          setAddProductResult(product.addProduct);
          if (product.addProduct.length === 1) {
            if (product.addProduct[0]) {
              setAddName1(product.addProduct[0].name);
              setAddPrice1(product.addProduct[0].price);
              setAddStock1(product.addProduct[0].stock);
              setAddUse1(product.addProduct[0].use);

              setIsAddName1(true);
              setIsAddPrice1(true);
              setIsAddStock1(true);
              setIsAddProductFinish1(true);
            }
          } else if (product.addProduct.length === 2) {
            if (product.addProduct[0]) {
              setAddName1(product.addProduct[0].name);
              setAddPrice1(product.addProduct[0].price);
              setAddStock1(product.addProduct[0].stock);
              setAddUse1(product.addProduct[0].use);

              setIsAddName1(true);
              setIsAddPrice1(true);
              setIsAddStock1(true);
              setIsAddProductFinish1(true);
            }
            if (product.addProduct[1]) {
              setAddName2(product.addProduct[1].name);
              setAddPrice2(product.addProduct[1].price);
              setAddStock2(product.addProduct[1].stock);
              setAddUse2(product.addProduct[1].use);

              setIsAddName2(true);
              setIsAddPrice2(true);
              setIsAddStock2(true);
              setIsAddProductFinish2(true);
            }
          } else if (product.addProduct.length === 3) {
            if (product.addProduct[0]) {
              setAddName1(product.addProduct[0].name);
              setAddPrice1(product.addProduct[0].price);
              setAddStock1(product.addProduct[0].stock);
              setAddUse1(product.addProduct[0].use);

              setIsAddName1(true);
              setIsAddPrice1(true);
              setIsAddStock1(true);
              setIsAddProductFinish1(true);
            }
            if (product.addProduct[1]) {
              setAddName2(product.addProduct[1].name);
              setAddPrice2(product.addProduct[1].price);
              setAddStock2(product.addProduct[1].stock);
              setAddUse2(product.addProduct[1].use);

              setIsAddName2(true);
              setIsAddPrice2(true);
              setIsAddStock2(true);
              setIsAddProductFinish2(true);
            }
            if (product.addProduct[2]) {
              setAddName3(product.addProduct[2].name);
              setAddPrice3(product.addProduct[2].price);
              setAddStock3(product.addProduct[2].stock);
              setAddUse3(product.addProduct[2].use);

              setIsAddName3(true);
              setIsAddPrice3(true);
              setIsAddStock3(true);
              setIsAddProductFinish3(true);
            }
          } else if (product.addProduct.length === 4) {
            if (product.addProduct[0]) {
              setAddName1(product.addProduct[0].name);
              setAddPrice1(product.addProduct[0].price);
              setAddStock1(product.addProduct[0].stock);
              setAddUse1(product.addProduct[0].use);

              setIsAddName1(true);
              setIsAddPrice1(true);
              setIsAddStock1(true);
              setIsAddProductFinish1(true);
            }
            if (product.addProduct[1]) {
              setAddName2(product.addProduct[1].name);
              setAddPrice2(product.addProduct[1].price);
              setAddStock2(product.addProduct[1].stock);
              setAddUse2(product.addProduct[1].use);

              setIsAddName2(true);
              setIsAddPrice2(true);
              setIsAddStock2(true);
              setIsAddProductFinish2(true);
            }
            if (product.addProduct[2]) {
              setAddName3(product.addProduct[2].name);
              setAddPrice3(product.addProduct[2].price);
              setAddStock3(product.addProduct[2].stock);
              setAddUse3(product.addProduct[2].use);

              setIsAddName3(true);
              setIsAddPrice3(true);
              setIsAddStock3(true);
              setIsAddProductFinish3(true);
            }
            if (product.addProduct[3]) {
              setAddName4(product.addProduct[3].name);
              setAddPrice4(product.addProduct[3].price);
              setAddStock4(product.addProduct[3].stock);
              setAddUse4(product.addProduct[3].use);

              setIsAddName4(true);
              setIsAddPrice4(true);
              setIsAddStock4(true);
              setIsAddProductFinish4(true);
            }
          } else if (product.addProduct.length === 5) {
            if (product.addProduct[0]) {
              setAddName1(product.addProduct[0].name);
              setAddPrice1(product.addProduct[0].price);
              setAddStock1(product.addProduct[0].stock);
              setAddUse1(product.addProduct[0].use);

              setIsAddName1(true);
              setIsAddPrice1(true);
              setIsAddStock1(true);
              setIsAddProductFinish1(true);
            }
            if (product.addProduct[1]) {
              setAddName2(product.addProduct[1].name);
              setAddPrice2(product.addProduct[1].price);
              setAddStock2(product.addProduct[1].stock);
              setAddUse2(product.addProduct[1].use);

              setIsAddName2(true);
              setIsAddPrice2(true);
              setIsAddStock2(true);
              setIsAddProductFinish2(true);
            }
            if (product.addProduct[2]) {
              setAddName3(product.addProduct[2].name);
              setAddPrice3(product.addProduct[2].price);
              setAddStock3(product.addProduct[2].stock);
              setAddUse3(product.addProduct[2].use);

              setIsAddName3(true);
              setIsAddPrice3(true);
              setIsAddStock3(true);
              setIsAddProductFinish3(true);
            }
            if (product.addProduct[3]) {
              setAddName4(product.addProduct[3].name);
              setAddPrice4(product.addProduct[3].price);
              setAddStock4(product.addProduct[3].stock);
              setAddUse4(product.addProduct[3].use);

              setIsAddName4(true);
              setIsAddPrice4(true);
              setIsAddStock4(true);
              setIsAddProductFinish4(true);
            }
            if (product.addProduct[4]) {
              setAddName5(product.addProduct[4].name);
              setAddPrice5(product.addProduct[4].price);
              setAddStock5(product.addProduct[4].stock);
              setAddUse5(product.addProduct[4].use);

              setIsAddName5(true);
              setIsAddPrice5(true);
              setIsAddStock5(true);
              setIsAddProductFinish5(true);
            }
          }
          setOptionResult(product.option);

          setURL(product.url);
          setMainImage(product.mainImage);
          setSubImage(product.subImage);
          setDetailImage(product.detailImage);
          setMainSpec(product.mainspec);
          setSpec(product.spec);
          setDelivery(product.delivery);

          //유효성 검사 true
          setIsName(true);
          setIsSubTitle(true);
          setIsCost(true);
          setIsPrice(true);
          setIsOptionList(true);
          setIsURL(true);
          setIsImage(true);
          setIsDelivery(true);
          setSubmit(true);
          setIsAddProductFinishEnd(true);
        } catch (error) {
          console.log(error);
        }
      };

      productedit();
    } else if (!id) {
      const productadd = async () => {
        try {
          const res = await axios.post("/smartstore/home/productregister/get", cookies, { withCredentials: true });
          const allProduct = res.data;

          setCategory([allProduct]);
        } catch (err) {
          console.log(err);
        }
      };
      productadd();

      setIsEdit(false);
      setName("");
      setSubTitle("");
      setCost(null);
      setPrice(null);

      setOptionName1("");
      setOptionName2("");
      setOptionName3("");
      setOptionName4("");
      setOptionName5("");
      setOptionName6("");
      setOptionValue1([]);
      setOptionValue2([]);
      setOptionValue3([]);
      setOptionValue4([]);
      setOptionValue5([]);
      setOptionValue6([]);
      setOptionResult([]);
      setURL("");
      setMainImage([]);
      setSubImage([]);
      setDetailImage([]);
      setMainSpec([]);
      setSpec([]);
      setDelivery(null);
    }
  }, [id]);

  // 추가 옵션 유효성 검사
  useEffect(() => {
    if (OptionType === 0) {
      if (isOptionName1 && isOptionValue1) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
    if (OptionType === 1) {
      if (isOptionName1 && isOptionValue1 && isOptionName2 && isOptionValue2) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
    if (OptionType === 2) {
      if (isOptionName1 && isOptionValue1 && isOptionName2 && isOptionValue2 && isOptionName3 && isOptionValue3) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
    if (OptionType === 3) {
      if (isOptionName1 && isOptionValue1 && isOptionName2 && isOptionValue2 && isOptionName3 && isOptionValue3 && isOptionName4 && isOptionValue4) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
    if (OptionType === 4) {
      if (
        isOptionName1 &&
        isOptionValue1 &&
        isOptionName2 &&
        isOptionValue2 &&
        isOptionName3 &&
        isOptionValue3 &&
        isOptionName4 &&
        isOptionValue4 &&
        isOptionName5 &&
        isOptionValue5
      ) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
    if (OptionType === 5) {
      if (
        isOptionName1 &&
        isOptionValue1 &&
        isOptionName2 &&
        isOptionValue2 &&
        isOptionName3 &&
        isOptionValue3 &&
        isOptionName4 &&
        isOptionValue4 &&
        isOptionName5 &&
        isOptionValue5 &&
        isOptionName6 &&
        isOptionValue6
      ) {
        setIsOptionNameFin(true);
        setIsOptionValueFin(true);
      } else {
        setIsOptionNameFin(false);
        setIsOptionValueFin(false);
      }
    }
  }, [
    OptionType,
    OptionName1,
    OptionName2,
    OptionName3,
    OptionName4,
    OptionName5,
    OptionName6,
    OptionValue1,
    OptionValue2,
    OptionValue3,
    OptionValue4,
    OptionValue5,
    OptionValue6,
  ]);

  useEffect(() => {
    const AllTrue = isAddName1 && isAddPrice1 && isAddStock1;

    if (AllTrue) {
      setIsAddProductFinish1(true);
    } else {
      setIsAddProductFinish1(false);
    }

    // 사용여부가 N 이면 조건없이 true
    if (!addUse1) {
      setIsAddProductFinish1(true);
    }

    setAddSubmitErr("");
  }, [addListType, isAddName1, isAddPrice1, isAddStock1, addUse1, isAddProductFinish1]);

  useEffect(() => {
    const AllTrue = isAddName2 && isAddPrice2 && isAddStock2;

    if (AllTrue) {
      setIsAddProductFinish2(true);
    } else {
      setIsAddProductFinish2(false);
    }

    // 사용여부가 N 이면 조건없이 true
    if (!addUse2) {
      setIsAddProductFinish2(true);
    }

    setAddSubmitErr("");
  }, [addListType, isAddName2, isAddPrice2, isAddStock2, addUse2, isAddProductFinish1]);

  useEffect(() => {
    const AllTrue = isAddName3 && isAddPrice3 && isAddStock3;

    if (AllTrue) {
      setIsAddProductFinish3(true);
    } else {
      setIsAddProductFinish3(false);
    }

    // 사용여부가 N 이면 조건없이 true
    if (!addUse3) {
      setIsAddProductFinish3(true);
    }

    setAddSubmitErr("");
  }, [addListType, isAddName3, isAddPrice3, isAddStock3, addUse3, isAddProductFinish3]);

  useEffect(() => {
    const AllTrue = isAddName4 && isAddPrice4 && isAddStock4;

    if (AllTrue) {
      setIsAddProductFinish4(true);
    } else {
      setIsAddProductFinish4(false);
    }

    // 사용여부가 N 이면 조건없이 true
    if (!addUse4) {
      setIsAddProductFinish4(true);
    }

    setAddSubmitErr("");
  }, [addListType, isAddName4, isAddPrice4, isAddStock4, addUse4, isAddProductFinish4]);

  useEffect(() => {
    const AllTrue = isAddName5 && isAddPrice5 && isAddStock5;

    if (AllTrue) {
      setIsAddProductFinish5(true);
    } else {
      setIsAddProductFinish5(false);
    }
    // 사용여부가 N 이면 조건없이 true
    if (!addUse5) {
      setIsAddProductFinish5(true);
    }

    setAddSubmitErr("");
  }, [addListType, isAddName5, isAddPrice5, isAddStock5, addUse5, isAddProductFinish5]);

  useEffect(() => {
    if (addListType === 0) {
      if (!isAddProductFinish1) {
        setIsAddProductFinishEnd(false);
      }
    } else if (addListType === 1) {
      if (!isAddProductFinish1 || !isAddProductFinish2) {
        setIsAddProductFinishEnd(false);
      }
    } else if (addListType === 2) {
      if (!isAddProductFinish1 || !isAddProductFinish2 || !isAddProductFinish3) {
        setIsAddProductFinishEnd(false);
      }
    } else if (addListType === 3) {
      if (!isAddProductFinish1 || !isAddProductFinish2 || !isAddProductFinish3 || !isAddProductFinish4) {
        setIsAddProductFinishEnd(false);
      }
    } else if (addListType === 4) {
      if (!isAddProductFinish1 || !isAddProductFinish2 || !isAddProductFinish3 || !isAddProductFinish4 || !isAddProductFinish5) {
        setIsAddProductFinishEnd(false);
      }
    }
  }, [isAddProductFinish1, isAddProductFinish2, isAddProductFinish3, isAddProductFinish4, isAddProductFinish5]);

  // 추가 상품 Input을 수정 및 삭제시 초기화.
  useEffect(() => {
    console.log("추가 상품 Input을 수정 및 삭제시 초기화.");
    setIsAddProductFinishEnd(false);
  }, [addListType]);

  // 공지사항
  useEffect(() => {
    props.setNotice && props.setNotice(isEdit ? <a>상품 수정</a> : <a>상품 등록</a>);
    props.setNoticeDate && props.setNoticeDate("");
  }, [isEdit]);

  // 옵션 드롭메뉴 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // 옵션 이미지 추가하는 드롭메뉴
      if (
        inputRefOptionDropMenuBtn1.current &&
        !inputRefOptionDropMenuBtn1.current.contains(e.target) &&
        inputRefOptionDropMenu1.current &&
        !inputRefOptionDropMenu1.current.contains(e.target)
      ) {
        setIsOptionDropMenu1(false);
      }
      if (
        inputRefOptionDropMenuBtn2.current &&
        !inputRefOptionDropMenuBtn2.current.contains(e.target) &&
        inputRefOptionDropMenu2.current &&
        !inputRefOptionDropMenu2.current.contains(e.target)
      ) {
        setIsOptionDropMenu2(false);
      }
      if (
        inputRefOptionDropMenuBtn3.current &&
        !inputRefOptionDropMenuBtn3.current.contains(e.target) &&
        inputRefOptionDropMenu3.current &&
        !inputRefOptionDropMenu3.current.contains(e.target)
      ) {
        setIsOptionDropMenu3(false);
      }
      if (
        inputRefOptionDropMenuBtn4.current &&
        !inputRefOptionDropMenuBtn4.current.contains(e.target) &&
        inputRefOptionDropMenu4.current &&
        !inputRefOptionDropMenu4.current.contains(e.target)
      ) {
        setIsOptionDropMenu4(false);
      }
      if (
        inputRefOptionDropMenuBtn5.current &&
        !inputRefOptionDropMenuBtn5.current.contains(e.target) &&
        inputRefOptionDropMenu5.current &&
        !inputRefOptionDropMenu5.current.contains(e.target)
      ) {
        setIsOptionDropMenu5(false);
      }
      if (
        inputRefOptionDropMenuBtn6.current &&
        !inputRefOptionDropMenuBtn6.current.contains(e.target) &&
        inputRefOptionDropMenu6.current &&
        !inputRefOptionDropMenu6.current.contains(e.target)
      ) {
        setIsOptionDropMenu6(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOptionDropMenu1, isOptionDropMenu2]);

  // 모든 인풋 바깥 클릭시 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (inputClickNumber === 1 && inputRefName.current && !inputRefName.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 2 && inputRefPrice.current && !inputRefPrice.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }

      // 옵션명 및 옵션값
      if (inputClickNumber === 20 && inputRefOptionName1.current && !inputRefOptionName1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 21 && inputRefOptionName2.current && !inputRefOptionName2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 22 && inputRefOptionName3.current && !inputRefOptionName3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 23 && inputRefOptionName4.current && !inputRefOptionName4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 24 && inputRefOptionName5.current && !inputRefOptionName5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 25 && inputRefOptionName6.current && !inputRefOptionName6.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }

      if (inputClickNumber === 30 && inputRefOptionValue1.current && !inputRefOptionValue1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 31 && inputRefOptionValue2.current && !inputRefOptionValue2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 32 && inputRefOptionValue3.current && !inputRefOptionValue3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 33 && inputRefOptionValue4.current && !inputRefOptionValue4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 34 && inputRefOptionValue5.current && !inputRefOptionValue5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 35 && inputRefOptionValue6.current && !inputRefOptionValue6.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }

      // 추가 상품
      if (inputClickNumber === 40 && addRefName1.current && !addRefName1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 41 && addRefPrice1.current && !addRefPrice1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 42 && addRefStock1.current && !addRefStock1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (addRefUse1.current && !addRefUse1.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
        setIsAddProDrop1(false);
      }

      if (inputClickNumber === 50 && addRefName2.current && !addRefName2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 51 && addRefPrice2.current && !addRefPrice2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 52 && addRefStock2.current && !addRefStock2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (addRefUse2.current && !addRefUse2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
        setIsAddProDrop2(false);
      }

      if (inputClickNumber === 60 && addRefName3.current && !addRefName3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 61 && addRefPrice3.current && !addRefPrice3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 62 && addRefStock3.current && !addRefStock3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (addRefUse3.current && !addRefUse3.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
        setIsAddProDrop3(false);
      }

      if (inputClickNumber === 70 && addRefName4.current && !addRefName4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 71 && addRefPrice4.current && !addRefPrice4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 72 && addRefStock4.current && !addRefStock4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (addRefUse4.current && !addRefUse4.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
        setIsAddProDrop4(false);
      }

      if (inputClickNumber === 80 && addRefName5.current && !addRefName5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 81 && addRefPrice5.current && !addRefPrice5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 82 && addRefStock5.current && !addRefStock5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (addRefUse5.current && !addRefUse5.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
        setIsAddProDrop5(false);
      }

      if (inputClickNumber === 5 && inputRefDelivery.current && !inputRefDelivery.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 6 && inputRefCost.current && !inputRefCost.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 7 && inputRefSubTitle.current && !inputRefSubTitle.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 8 && inputRefMainSpec.current && !inputRefMainSpec.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 9 && inputRefSpec.current && !inputRefSpec.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 10 && inputRefURL.current && !inputRefURL.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [inputClick]);

  // 최종 상품 등록 체크
  useEffect(() => {
    if (isName && isSubTitle && isPrice && isOptionNameFin && isOptionValueFin && isOptionList && isAddProductFinishEnd && isImage && isDelivery) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  });

  // 최종 상품 데이터
  const productdata = {
    name: Name,
    subtitle: SubTitle,
    cost: Cost,
    price: Price,
    option: OptionResult,
    optionList: OptionList,
    addProduct: addProductResult,
    url: URL,
    mainImage: MainImage,
    subImage: SubImage,
    detailImage: DetailImage,
    delivery: Delivery,
    category: category,
    mainspec: mainSpec,
    spec: spec,
  };

  // console.log(productdata);

  // 등록 버튼
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!Submit) {
      return;
    }

    try {
      // 상품 등록, 상품 수정을 확인합니다.
      console.log(isEdit ? "수정 버튼" : "등록 버튼");

      const endpoint = isEdit ? `/smartstore/home/product/${id}` : "/smartstore/home/productregister";
      await axios.post(endpoint, productdata, { withCredentials: true });

      if (Submit) {
        navigate("/home/product"); // 등록시 상품목록으로
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  // 복사 버튼
  const copyBtn = async (e: any) => {
    if (!Submit) {
      return;
    }

    try {
      await axios.post("/smartstore/home/productregister", productdata, { withCredentials: true });

      if (Submit) {
        navigate("/home/product"); // 등록시 상품목록으로
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <div className="ProductRegister-layout-wrap">
        <div className="layout-inner">
          <div className="content">
            <div className="product-register-area">
              <ul className="product-register-list">
                {/* 카테고리 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={pagefold}>
                    <div className="text-wrap">
                      <label className="text">카테고리</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={CategoryDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={CategoryDrop ? "info showmenu" : "info"}>
                    {productdata.category.map((list, index) => (
                      <>
                        <span
                          key={list.id}
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#f1f1f1",
                            padding: "5px 10px",
                            marginRight: index !== productdata.category.length - 1 ? "7px" : "0",
                            fontSize: "12px"
                          }}
                        >
                          {list.name}
                        </span>
                      </>
                    ))}
                  </div>
                </li>
                {/* 상품명 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setProductDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">상품명</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={ProductDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={ProductDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>상품명</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefName}>
                          <div id={inputClick && inputClickNumber === 1 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              name="name"
                              placeholder="상품명"
                              className="input"
                              value={Name}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(1);
                              }}
                              onChange={NameHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                    </div>
                  </div>
                  <div className={ProductDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>부제목</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefSubTitle}>
                          <div id={inputClick && inputClickNumber === 7 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              name="name"
                              placeholder="부제목"
                              className="input"
                              value={SubTitle}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(7);
                              }}
                              onChange={SubTitleHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={isSubTitle ? "error" : "error-active"}>{SubTitleMessage}</div>
                  </div>
                </li>
                {/* 판매가 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setPriceDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">판매가</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={PriceDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={PriceDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>원가</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefCost}>
                          <div id={inputClick && inputClickNumber === 6 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              maxLength={10}
                              name="productprice"
                              placeholder="숫자만 입력"
                              className="input"
                              value={formattedCost}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(6);
                              }}
                              onChange={CostHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={!isCost ? "error-active" : "error-active"}>{CostMessage}</div>
                    </div>
                  </div>
                  <div className={PriceDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>판매가</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefPrice}>
                          <div id={inputClick && inputClickNumber === 2 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              maxLength={10}
                              name="productprice"
                              placeholder="숫자만 입력"
                              className="input"
                              value={formattedPrice}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(2);
                              }}
                              onChange={PriceHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={!isPrice ? "error-active" : "error-active"}>{PriceMessage}</div>
                    </div>
                  </div>
                </li>
                {/* 옵션 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setOptionDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">옵션</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={OptionDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={OptionDrop ? "menu show" : "menu hide"}>
                    <div className="inner-menu-list flex flex-align-center">
                      <div className="menu-left">
                        <span>옵션입력</span>
                      </div>
                      <div className="menu-right">
                        <div className="input-item input-item-name">
                          <div className="input-area" style={{ display: "flex", alignItems: "start" }}>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", flex: "80%" }}>
                              {/* 옵션명 */}
                              {OptionType >= 0 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명</span>
                                    </div>
                                    <div ref={inputRefOptionName1} id={inputClick && inputClickNumber === 20 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName1}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(20);
                                        }}
                                        onChange={option.Name1Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName1 ? "error-active name" : "error"}>{OptionName1Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue1}
                                      id={inputClick && inputClickNumber === 30 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue1}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(30);
                                        }}
                                        onChange={option.Value1Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler1} ref={inputRefOptionDropMenuBtn1}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu1}
                                        ref={inputRefOptionDropMenu1}
                                      >
                                        <OptionUl>
                                          <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                          {isOptionDropMenu1 &&
                                            OptionList[0]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue1}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue1 ? "error-active value" : "error"}>{OptionValue1Message}</div>
                                  </div>
                                </div>
                              )}
                              {OptionType >= 1 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명2</span>
                                    </div>
                                    <div ref={inputRefOptionName2} id={inputClick && inputClickNumber === 21 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName2}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(21);
                                        }}
                                        onChange={option.Name2Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName2 ? "error-active name" : "error"}>{OptionName2Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값2</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue2}
                                      id={inputClick && inputClickNumber === 31 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue2}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(31);
                                        }}
                                        onChange={option.Value2Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler2} ref={inputRefOptionDropMenuBtn2}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu2}
                                        ref={inputRefOptionDropMenu2}
                                      >
                                        <OptionUl>
                                        <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                        {isOptionDropMenu2 &&
                                            OptionList[1]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue2}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue2 ? "error-active value" : "error"}>{OptionValue2Message}</div>
                                  </div>
                                </div>
                              )}
                              {OptionType >= 2 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명3</span>
                                    </div>
                                    <div ref={inputRefOptionName3} id={inputClick && inputClickNumber === 22 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName3}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(22);
                                        }}
                                        onChange={option.Name3Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName3 ? "error-active name" : "error"}>{OptionName3Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값3</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue3}
                                      id={inputClick && inputClickNumber === 32 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue3}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(32);
                                        }}
                                        onChange={option.Value3Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler3} ref={inputRefOptionDropMenuBtn3}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu3}
                                        ref={inputRefOptionDropMenu3}
                                      >
                                        <OptionUl>
                                        <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                        {isOptionDropMenu3 &&
                                            OptionList[2]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue3}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue3 ? "error-active value" : "error"}>{OptionValue3Message}</div>
                                  </div>
                                </div>
                              )}
                              {OptionType >= 3 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명4</span>
                                    </div>
                                    <div ref={inputRefOptionName4} id={inputClick && inputClickNumber === 23 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName4}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(23);
                                        }}
                                        onChange={option.Name4Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName4 ? "error-active name" : "error"}>{OptionName4Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값4</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue4}
                                      id={inputClick && inputClickNumber === 33 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue4}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(33);
                                        }}
                                        onChange={option.Value4Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler4} ref={inputRefOptionDropMenuBtn4}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu4}
                                        ref={inputRefOptionDropMenu4}
                                      >
                                        <OptionUl>
                                        <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                        {isOptionDropMenu4 &&
                                            OptionList[3]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue4}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue4 ? "error-active value" : "error"}>{OptionValue4Message}</div>
                                  </div>
                                </div>
                              )}
                              {OptionType >= 4 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명5</span>
                                    </div>
                                    <div ref={inputRefOptionName5} id={inputClick && inputClickNumber === 24 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName5}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(24);
                                        }}
                                        onChange={option.Name5Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName5 ? "error-active name" : "error"}>{OptionName5Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값5</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue5}
                                      id={inputClick && inputClickNumber === 34 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue5}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(34);
                                        }}
                                        onChange={option.Value5Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler5} ref={inputRefOptionDropMenuBtn5}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu5}
                                        ref={inputRefOptionDropMenu5}
                                      >
                                        <OptionUl>
                                        <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                        {isOptionDropMenu5 &&
                                            OptionList[4]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue5}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue5 ? "error-active value" : "error"}>{OptionValue5Message}</div>
                                  </div>
                                </div>
                              )}
                              {OptionType >= 5 && (
                                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                  <div className="input-box" style={{ flex: "30%" }}>
                                    <div className="input-box-title">
                                      <span>옵션명6</span>
                                    </div>
                                    <div ref={inputRefOptionName6} id={inputClick && inputClickNumber === 25 ? "input-inner-active" : "input-inner"}>
                                      <input
                                        type="text"
                                        className="input"
                                        maxLength={20}
                                        name="productOptionName"
                                        placeholder="예시 : 컬러"
                                        value={OptionName6}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(25);
                                        }}
                                        onChange={option.Name6Handler}
                                      />
                                    </div>
                                    <div className={!isOptionName6 ? "error-active name" : "error"}>{OptionName6Message}</div>
                                  </div>
                                  <div className="input-box">
                                    <div className="input-box-title">
                                      <span>옵션값6</span>
                                    </div>
                                    <div
                                      ref={inputRefOptionValue6}
                                      id={inputClick && inputClickNumber === 35 ? "input-inner-active" : "input-inner"}
                                      className="option-input-wrap"
                                    >
                                      <input
                                        type="text"
                                        className="input"
                                        name="productOptionValue"
                                        placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                        id="OptionInputValue"
                                        value={OptionValue6}
                                        onClick={() => {
                                          setInputClick(true);
                                          setInputClickNumber(35);
                                        }}
                                        onChange={option.Value6Handler}
                                      />
                                      <button className="dropmenu-btn" onClick={option.DropMenuHandler6} ref={inputRefOptionDropMenuBtn6}>
                                        <span>+</span>
                                      </button>
                                      <OptionDropMenu
                                        className="option-input-list"
                                        isOptionDropMenu={isOptionDropMenu6}
                                        ref={inputRefOptionDropMenu6}
                                      >
                                        <OptionUl>
                                        <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                                            <div style={{ flex: "25%" }}>옵션값</div>
                                            <div style={{ flex: "75%" }}>옵션 사진</div>
                                          </div>
                                        {isOptionDropMenu6 &&
                                            OptionList[5]?.map((list: any, index: number) => (
                                              <Optionli key={index} onClick={() => option.ImageHandler(index)}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>{list.optionValue6}</div>
                                                <div>
                                                  <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    {[...Array(OptionImageMax)].map((_, index2: any) => (
                                                      <OptionImage
                                                        index={index2}
                                                        optionImage={list.optionImage}
                                                        OptionListIndex1={OptionListIndex1}
                                                        OptionListIndex2={OptionListIndex2}
                                                        OptionList={OptionList}
                                                        setOptionList={setOptionList}
                                                        isClicked={isClicked}
                                                        setIsClicked={setIsClicked}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              </Optionli>
                                            ))}
                                        </OptionUl>
                                      </OptionDropMenu>
                                    </div>
                                    <div className={!isOptionValue6 ? "error-active value" : "error"}>{OptionValue6Message}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div style={{ display: "flex", marginTop: "35px" }}>
                              <div className="circle-btn-wrap2" onClick={option.PlusHandler} style={{marginRight: "5px"}}>
                                <span className="text">+</span>
                              </div>
                              <div className="circle-btn-wrap2" onClick={option.MinusHandler}>
                                <span className="text">-</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apply-btn-wrap">
                          <button className={isOptionNameFin && isOptionValueFin ? "apply-btn-active" : "apply-btn"} onClick={option.Submit}>
                            <span className="apply-btn-text">옵션목록으로 적용</span>
                            <span className="apply-btn-icon"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="inner-menu-list">
                      <div className="menu-bottom">
                        <TableProduct
                          OptionType={OptionType}
                          optionResult={OptionResult}
                          setOptionResult={setOptionResult}
                          optionSubmit={option.Submit}
                          setOptionValue={setOptionValue1}
                          OptionList={OptionList}
                          OptionName1={OptionName1}
                          OptionName2={OptionName2}
                          OptionName3={OptionName3}
                          OptionName4={OptionName4}
                          OptionName5={OptionName5}
                          OptionName6={OptionName6}
                          isEdit={isEdit}
                        ></TableProduct>
                      </div>
                    </div>
                  </div>
                </li>
                {/* 추가 상품 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setAddDrop(!AddDrop)}>
                    <div className="text-wrap">
                      <label className="text">추가 상품</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={AddDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={AddDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>상품 목록</span>
                    </div>
                    <div className="menu-right" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ display: "flex" }}>
                        <div className="input-item">
                          {addListType >= 0 && (
                            <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>상품명</span>
                                </div>
                                <div ref={addRefName1} id={inputClick && inputClickNumber === 40 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    placeholder="예시: Final Cut Pro"
                                    value={addName1}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(40);
                                    }}
                                    onChange={addProducts.Name1Handler}
                                  />
                                </div>
                                <div className={!isAddName1 ? "error-active name" : "error"}>{addName1Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>가격</span>
                                </div>
                                <div ref={addRefPrice1} id={inputClick && inputClickNumber === 41 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 440,000원"
                                    value={addPrice1}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(41);
                                    }}
                                    onChange={addProducts.Price1Handler}
                                  />
                                </div>
                                <div className={!isAddPrice1 ? "error-active name" : "error"}>{addPrice1Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "30%" }}>
                                <div className="input-box-title">
                                  <span>재고</span>
                                </div>
                                <div ref={addRefStock1} id={inputClick && inputClickNumber === 42 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 200"
                                    value={addStock1}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(42);
                                    }}
                                    onChange={addProducts.Stock1Handler}
                                  />
                                </div>
                                <div className={!isAddStock1 ? "error-active name" : "error"}>{addStock1Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "20%" }}>
                                <div className="option-use">
                                  <div className="input-box-title">
                                    <span>사용여부</span>
                                  </div>
                                  <div
                                    ref={addRefUse1}
                                    id={isAddProDrop1 ? "input-inner-active" : "input-inner"}
                                    style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
                                    onClick={() => setIsAddProDrop1((e) => !e)}
                                  >
                                    <DropWrap
                                      isAddProDrop={isAddProDrop1}
                                      onClick={() => {
                                        setInputClick(true);
                                        setInputClickNumber(43);
                                      }}
                                    >
                                      {addUse1 ? <div className="item">Y</div> : <div className="item">N</div>}
                                    </DropWrap>
                                    <DropMenu isAddProDrop={isAddProDrop1}>
                                      <div onClick={() => addProducts.Use1Handler(true)}>Y</div>
                                      <div onClick={() => addProducts.Use1Handler(false)}>N</div>
                                    </DropMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {addListType >= 1 && (
                            <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>상품명</span>
                                </div>
                                <div ref={addRefName2} id={inputClick && inputClickNumber === 50 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    placeholder="예시: Final Cut Pro"
                                    value={addName2}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(50);
                                    }}
                                    onChange={addProducts.Name2Handler}
                                  />
                                </div>
                                <div className={!isAddName2 ? "error-active name" : "error"}>{addName2Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>가격</span>
                                </div>
                                <div ref={addRefPrice2} id={inputClick && inputClickNumber === 51 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 440,000원"
                                    value={addPrice2}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(51);
                                    }}
                                    onChange={addProducts.Price2Handler}
                                  />
                                </div>
                                <div className={!isAddPrice2 ? "error-active name" : "error"}>{addPrice2Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "30%" }}>
                                <div className="input-box-title">
                                  <span>재고</span>
                                </div>
                                <div ref={addRefStock2} id={inputClick && inputClickNumber === 52 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 200"
                                    value={addStock2}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(52);
                                    }}
                                    onChange={addProducts.Stock2Handler}
                                  />
                                </div>
                                <div className={!isAddStock2 ? "error-active name" : "error"}>{addStock2Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "20%" }}>
                                <div className="option-use">
                                  <div className="input-box-title">
                                    <span>사용여부</span>
                                  </div>
                                  <div
                                    ref={addRefUse2}
                                    id={isAddProDrop2 ? "input-inner-active" : "input-inner"}
                                    style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
                                    onClick={() => setIsAddProDrop2((e) => !e)}
                                  >
                                    <DropWrap
                                      isAddProDrop={isAddProDrop2}
                                      onClick={() => {
                                        setInputClick(true);
                                        setInputClickNumber(53);
                                      }}
                                    >
                                      {addUse2 ? <div className="item">Y</div> : <div className="item">N</div>}
                                    </DropWrap>
                                    <DropMenu isAddProDrop={isAddProDrop2}>
                                      <div onClick={() => addProducts.Use2Handler(true)}>Y</div>
                                      <div onClick={() => addProducts.Use2Handler(false)}>N</div>
                                    </DropMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {addListType >= 2 && (
                            <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>상품명</span>
                                </div>
                                <div ref={addRefName3} id={inputClick && inputClickNumber === 60 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    placeholder="예시: Final Cut Pro"
                                    value={addName3}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(60);
                                    }}
                                    onChange={addProducts.Name3Handler}
                                  />
                                </div>
                                <div className={!isAddName3 ? "error-active name" : "error"}>{addName3Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>가격</span>
                                </div>
                                <div ref={addRefPrice3} id={inputClick && inputClickNumber === 61 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 440,000원"
                                    value={addPrice3}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(61);
                                    }}
                                    onChange={addProducts.Price3Handler}
                                  />
                                </div>
                                <div className={!isAddPrice3 ? "error-active name" : "error"}>{addPrice3Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "30%" }}>
                                <div className="input-box-title">
                                  <span>재고</span>
                                </div>
                                <div ref={addRefStock3} id={inputClick && inputClickNumber === 62 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 200"
                                    value={addStock3}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(62);
                                    }}
                                    onChange={addProducts.Stock3Handler}
                                  />
                                </div>
                                <div className={!isAddStock3 ? "error-active name" : "error"}>{addStock3Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "20%" }}>
                                <div className="option-use">
                                  <div className="input-box-title">
                                    <span>사용여부</span>
                                  </div>
                                  <div
                                    ref={addRefUse3}
                                    id={isAddProDrop3 ? "input-inner-active" : "input-inner"}
                                    style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
                                    onClick={() => setIsAddProDrop3((e) => !e)}
                                  >
                                    <DropWrap
                                      isAddProDrop={isAddProDrop3}
                                      onClick={() => {
                                        setInputClick(true);
                                        setInputClickNumber(63);
                                      }}
                                    >
                                      {addUse3 ? <div className="item">Y</div> : <div className="item">N</div>}
                                    </DropWrap>
                                    <DropMenu isAddProDrop={isAddProDrop3}>
                                      <div onClick={() => addProducts.Use3Handler(true)}>Y</div>
                                      <div onClick={() => addProducts.Use3Handler(false)}>N</div>
                                    </DropMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {addListType >= 3 && (
                            <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>상품명</span>
                                </div>
                                <div ref={addRefName4} id={inputClick && inputClickNumber === 70 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    placeholder="예시: Final Cut Pro"
                                    value={addName4}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(70);
                                    }}
                                    onChange={addProducts.Name4Handler}
                                  />
                                </div>
                                <div className={!isAddName4 ? "error-active name" : "error"}>{addName4Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>가격</span>
                                </div>
                                <div ref={addRefPrice4} id={inputClick && inputClickNumber === 71 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 440,000원"
                                    value={addPrice4}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(71);
                                    }}
                                    onChange={addProducts.Price4Handler}
                                  />
                                </div>
                                <div className={!isAddPrice4 ? "error-active name" : "error"}>{addPrice4Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "30%" }}>
                                <div className="input-box-title">
                                  <span>재고</span>
                                </div>
                                <div ref={addRefStock4} id={inputClick && inputClickNumber === 72 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 200"
                                    value={addStock4}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(72);
                                    }}
                                    onChange={addProducts.Stock4Handler}
                                  />
                                </div>
                                <div className={!isAddStock4 ? "error-active name" : "error"}>{addStock4Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "20%" }}>
                                <div className="option-use">
                                  <div className="input-box-title">
                                    <span>사용여부</span>
                                  </div>
                                  <div
                                    ref={addRefUse4}
                                    id={isAddProDrop4 ? "input-inner-active" : "input-inner"}
                                    style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
                                    onClick={() => setIsAddProDrop4((e) => !e)}
                                  >
                                    <DropWrap
                                      isAddProDrop={isAddProDrop4}
                                      onClick={() => {
                                        setInputClick(true);
                                        setInputClickNumber(73);
                                      }}
                                    >
                                      {addUse4 ? <div className="item">Y</div> : <div className="item">N</div>}
                                    </DropWrap>
                                    <DropMenu isAddProDrop={isAddProDrop4}>
                                      <div onClick={() => addProducts.Use4Handler(true)}>Y</div>
                                      <div onClick={() => addProducts.Use4Handler(false)}>N</div>
                                    </DropMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {addListType >= 4 && (
                            <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>상품명</span>
                                </div>
                                <div ref={addRefName5} id={inputClick && inputClickNumber === 80 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    placeholder="예시: Final Cut Pro"
                                    value={addName5}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(80);
                                    }}
                                    onChange={addProducts.Name5Handler}
                                  />
                                </div>
                                <div className={!isAddName5 ? "error-active name" : "error"}>{addName5Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "50%" }}>
                                <div className="input-box-title">
                                  <span>가격</span>
                                </div>
                                <div ref={addRefPrice5} id={inputClick && inputClickNumber === 81 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 440,000원"
                                    value={addPrice5}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(81);
                                    }}
                                    onChange={addProducts.Price5Handler}
                                  />
                                </div>
                                <div className={!isAddPrice5 ? "error-active name" : "error"}>{addPrice5Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "30%" }}>
                                <div className="input-box-title">
                                  <span>재고</span>
                                </div>
                                <div ref={addRefStock5} id={inputClick && inputClickNumber === 82 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    className="input"
                                    maxLength={10}
                                    placeholder="예시: 200"
                                    value={addStock5}
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(82);
                                    }}
                                    onChange={addProducts.Stock5Handler}
                                  />
                                </div>
                                <div className={!isAddStock5 ? "error-active name" : "error"}>{addStock5Err}</div>
                              </div>
                              <div className="input-box" style={{ flex: "20%" }}>
                                <div className="option-use">
                                  <div className="input-box-title">
                                    <span>사용여부</span>
                                  </div>
                                  <div
                                    ref={addRefUse5}
                                    id={isAddProDrop5 ? "input-inner-active" : "input-inner"}
                                    style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
                                    onClick={() => setIsAddProDrop5((e) => !e)}
                                  >
                                    <DropWrap
                                      isAddProDrop={isAddProDrop5}
                                      onClick={() => {
                                        setInputClick(true);
                                        setInputClickNumber(83);
                                      }}
                                    >
                                      {addUse5 ? <div className="item">Y</div> : <div className="item">N</div>}
                                    </DropWrap>
                                    <DropMenu isAddProDrop={isAddProDrop5}>
                                      <div onClick={() => addProducts.Use5Handler(true)}>Y</div>
                                      <div onClick={() => addProducts.Use5Handler(false)}>N</div>
                                    </DropMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div style={{ display: "flex", marginTop: "43px" }}>
                          <div className="circle-btn-wrap2" onClick={addProducts.PlusHandler} style={{marginRight: "5px"}}>
                            <span className="text">+</span>
                          </div>
                          <div className="circle-btn-wrap2" onClick={addProducts.MinusHandler}>
                            <span className="text">-</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="normal-blue-btn" style={{ width: "200px", height: "40px", marginTop: "20px" }} onClick={addProducts.Submit}>
                          {!isAddProductFinishEnd ? <span className="text">등록</span> : <span className="text">등록 완료</span>}
                        </div>
                      </div>
                      <div className={isAddProductFinishEnd ? "error" : "error-active"}>{addSubmitErr}</div>
                    </div>
                  </div>
                </li>
                {/* 스펙 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setSpecDrop(!SpecDrop)}>
                    <div className="text-wrap">
                      <label className="text">스펙</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={SpecDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={SpecDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>메인 스펙</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefMainSpec}>
                          <div id={inputClick && inputClickNumber === 8 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              name="name"
                              placeholder="메인 스펙 (,로 구분)"
                              className="input"
                              value={mainSpec}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(8);
                              }}
                              onChange={MainSpecHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={isName ? "error" : "error-active"}>{NameMessage}</div> */}
                  </div>
                  <div className={SpecDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>스펙</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefSpec}>
                          <div id={inputClick && inputClickNumber === 9 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              name="name"
                              placeholder="부제목 (,로 구분)"
                              className="input"
                              value={spec}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(9);
                              }}
                              onChange={SpecHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={isSubTitle ? "error" : "error-active"}>{SubTitleMessage}</div> */}
                  </div>
                </li>
                {/* 메인사진 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setImageDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">메인 사진</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={ImageDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={ImageDrop ? "menu show" : "menu hide"}>
                    <div className="inner-menu-list flex flex-align-center">
                      <div className="menu-left">
                        <span>메인 사진</span>
                      </div>
                      <div className="menu-right">
                        <div className="input-item">
                          {/* 메인 사진*/}
                          <ImageProductRegi
                            setIsImage={setIsImage}
                            setMainImage={setMainImage}
                            MainImage={MainImage}
                            SubImage={SubImage}
                            DetailImage={DetailImage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="inner-menu-list flex flex-align-center">
                      <div className="menu-left">
                        <span>추가 사진</span>
                      </div>
                      <div className="menu-right">
                        <div className="input-item">
                          {/* 추가 사진 */}
                          <div className="input-area">
                            <div className="input-box" ref={inputRefImage}>
                              <div className="Image-box"></div>
                              <SubImageProductRegi SubImage={SubImage} setSubImage={setSubImage} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {/* 상세 사진 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setDetailDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">상세 사진</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={DetailDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={DetailDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>URL 주소</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefName}>
                          <div id={inputClick && inputClickNumber === 10 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              name="name"
                              placeholder="URL 주소"
                              className="input"
                              value={URL}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(10);
                              }}
                              onChange={URLHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={isURL ? "error" : "error-active"}>{URLMessage}</div>
                    </div>
                  </div>
                </li>
                {/* 배송비 */}
                <li className="product-register-item">
                  <div className="title flex flex-ju-bt flex-align-center" onClick={() => setDeliveryDrop((e) => !e)}>
                    <div className="text-wrap">
                      <label className="text">배송비</label>
                    </div>
                    <div className="btn-wrap">
                      <button className="showdropmenu">
                        <span className={DeliveryDrop ? "icon-arrow reverse" : "icon-arrow"}></span>
                      </button>
                    </div>
                  </div>
                  <div className={DeliveryDrop ? "menu flex flex-align-center" : "menu hide"}>
                    <div className="menu-left">
                      <span>배송비</span>
                    </div>
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-box" ref={inputRefDelivery}>
                          <div id={inputClick && inputClickNumber === 3 ? "input-inner-active" : "input-inner"}>
                            <input
                              type="text"
                              maxLength={10}
                              name="productDelivery"
                              placeholder="숫자만 입력"
                              className="input"
                              value={formattedDelivery}
                              onClick={() => {
                                setInputClick(true);
                                setInputClickNumber(3);
                              }}
                              onChange={DeliveryHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={!isDelivery ? "error-active" : "error-active"}>{DeliveryMessage}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="btn-area">
              {isEdit ? (
                <>
                  <button type="submit" className={Submit ? "btn-area-btn btn-area-btn-active" : "btn-area-btn"} onClick={handleSubmit}>
                    <span className="btn-txt">상품 수정</span>
                  </button>
                  <button type="submit" className={Submit ? "btn-area-btn btn-area-btn-active" : "btn-area-btn"} onClick={copyBtn}>
                    <span className="btn-txt">상품 복사</span>
                  </button>
                </>
              ) : (
                <button type="submit" className={Submit ? "btn-area-btn btn-area-btn-active" : "btn-area-btn"} onClick={handleSubmit}>
                  <span className="btn-txt">상품 등록</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductRegister;
