import axios from "../../api/axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import TableProductRegi from "../../components/admin/TableProductRegi";
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
  optionPrice?: string;
}

export interface options {
  name?: string;
  values?: string[];
  image?: string[][] | null;
  price?: string[];
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

  const [options, setOptions] = useState<options[]>([{ name: "", values: [], image: [], price: [] }]);
  console.log(options);

  const [OptionResult, setOptionResult] = useState<any>([]);
  
  const [addProductResult, setAddProductResult] = useState<InstanceType<typeof addProductModel>[]>([]);

  // 옵션 이미지 드롭메뉴
  const [isOptionDropMenu, setIsOptionDropMenu] = useState<boolean[]>([false]);

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

  const [OptionNameMessage, setOptionNameMessage] = useState<string[]>([]);
  const [OptionValueMessage, setOptionValueMessage] = useState<string[]>([]);
  console.log(OptionValueMessage)

  const [URLMessage, setURLMessage] = useState<string>("");
  const [DeliveryMessage, setDeliveryMessage] = useState<string>("");

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isSubTitle, setIsSubTitle] = useState<boolean>(false);
  const [isCost, setIsCost] = useState<boolean>(false);
  const [isPrice, setIsPrice] = useState<boolean>(false);

  const [isOptionName, setIsOptionName] = useState<boolean[]>([]);
  const [isOptionValue, setIsOptionValue] = useState<boolean[]>([]);
  console.log(isOptionName)
  console.log(isOptionValue)

  const [isOptionNameFin, setIsOptionNameFin] = useState<boolean>(false);
  const [isOptionValueFin, setIsOptionValueFin] = useState<boolean>(false);

  const [isOptionList, setIsOptionList] = useState<boolean>(false);

  // 옵션 이미지 중복 클릭
  const [isClicked, setIsClicked] = useState(false);

  const [isURL, setIsURL] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [Submit, setSubmit] = useState<boolean>(false);

  const [inputClickNumber, setInputClickNumber] = useState<number>(0);
  const [inputClickValue, setInputClickValue] = useState<string>("");
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
  console.log(isAddProductFinishEnd)

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

  // 핸들러 모음
  const Handler = {
  // 상품명
   Name: (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    // 부제목
  SubTitle: (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value);
    if (e.target.value.length > 15) {
      setSubTitleMessage("15글자 미만으로 입력 해주세요.");
      setIsSubTitle(false);
    } else {
      setIsSubTitle(true);
    }
  },
  // 원가
  Cost: (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    const priceRegex = /^d[1-9]$/;
    const passwordCurrent = e.target.value;
    setCost(Number(passwordCurrent));

    if (e.target.value === "") {
      setCostMessage("필수 정보입니다.");
      setIsCost(false);
      return;
    }

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
  },
  Price: (e: React.ChangeEvent<HTMLInputElement>) => {
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
  },
  URL: (e: React.ChangeEvent<HTMLInputElement>) => {
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
  },
 MainSpec: (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    const mainSpecArray = data.split(",").map((item) => item.trim());

    setMainSpec(mainSpecArray);
  },
  Spec: (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    const specArray = data.split(",").map((item) => item.trim());

    setSpec(specArray);
  },
  Delivery: (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }
  }

  // 페이지 접기
  const pagefold = async () => {
    setCategoryDrop((e) => !e);
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

  // 초기화 및 상품 수정시 데이터 불러오기.
  useEffect(() => {
    if (id) {
      setIsEdit(true);

      const productedit = async () => {
        const db = await axios.get(`/smartstore/home/product/${id}`);
        try {
          const product = db.data.productEdit;
          console.log(product);

          setCategory(product.category);
          setName(product.name);
          setSubTitle(product.subtitle);
          setCost(product.cost);
          setPrice(product.price);

          setOptionResult(product.option);
          setOptions(product.optionList);

          setAddProductResult(product.addProduct);
          if (product.addProduct.length === 0) {
            setAddListType(product.addProduct.length);
          } else {
            setAddListType(product.addProduct.length - 1);
          }
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

          const trueArray = Array(product.optionList.length).fill(true);
          
            setIsOptionName(trueArray);
            setIsOptionValue(trueArray);

          setIsOptionNameFin(true);
          setIsOptionValueFin(true);
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
      console.log("상품 등록");
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

      setOptionResult([]);
      setOptions([{ name: "", values: [], image: [], price: [] }]);

      setAddListType(0);
      setAddName1("");
      setAddName2("");
      setAddName3("");
      setAddName4("");
      setAddName5("");
      setAddPrice1(0);
      setAddPrice2(0);
      setAddPrice3(0);
      setAddPrice4(0);
      setAddPrice5(0);
      setAddStock1(0);
      setAddStock2(0);
      setAddStock3(0);
      setAddStock4(0);
      setAddStock5(0);
      setAddUse1(true);
      setAddUse2(true);
      setAddUse3(true);
      setAddUse4(true);
      setAddUse5(true);

      setURL("");
      setMainImage([]);
      setSubImage([]);
      setDetailImage([]);
      setMainSpec([]);
      setSpec([]);
      setDelivery(null);
    }
  }, [id]);

  // 옵션 유효성 검사
  useEffect(() => {
    setIsOptionNameFin(false);
    setIsOptionValueFin(false);

    // 배열 내 모든 요소가 true인지 확인하는 함수
    const allTrue = (arr: boolean[]): boolean => arr.every((item) => item);

    if (allTrue(isOptionName) && allTrue(isOptionValue) && isOptionName.length === isOptionValue.length) {
      setIsOptionNameFin(true);
      setIsOptionValueFin(true);
    }
  }, [options]);

  // 추가 옵션 유효성 검사
  const useProductFinishEffect = (isAddName, isAddPrice, isAddStock, setIsAddProductFinish, addUse) => {
    useEffect(() => {
      const AllTrue = isAddName && isAddPrice && isAddStock;

      if (AllTrue || !addUse) {
        setIsAddProductFinish(true);
      } else {
        setIsAddProductFinish(false);
      }

      setAddSubmitErr("");
    }, [isAddName, isAddPrice, isAddStock, addUse]);
  };

  useProductFinishEffect(isAddName1, isAddPrice1, isAddStock1, setIsAddProductFinish1, addUse1);
  useProductFinishEffect(isAddName2, isAddPrice2, isAddStock2, setIsAddProductFinish2, addUse2);
  useProductFinishEffect(isAddName3, isAddPrice3, isAddStock3, setIsAddProductFinish3, addUse3);
  useProductFinishEffect(isAddName4, isAddPrice4, isAddStock4, setIsAddProductFinish4, addUse4);
  useProductFinishEffect(isAddName5, isAddPrice5, isAddStock5, setIsAddProductFinish5, addUse5);

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

  // // 추가 상품 Input을 수정 및 삭제시 초기화.
  // useEffect(() => {
  //   console.log("추가 상품 Input을 수정 및 삭제시 초기화.");
  //   setIsAddProductFinishEnd(false);
  // }, [addListType]);

  // 공지사항
  useEffect(() => {
    props.setNotice && props.setNotice(isEdit ? <a>상품 수정</a> : <a>상품 등록</a>);
    props.setNoticeDate && props.setNoticeDate("");
  }, [isEdit]);

  // 모든 인풋 바깥 클릭시 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      // if (inputClickNumber === 1 && inputRefName.current && !inputRefName.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 2 && inputRefPrice.current && !inputRefPrice.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }

      // // 추가 상품
      // if (inputClickNumber === 100 && addRefName1.current && !addRefName1.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 101 && addRefPrice1.current && !addRefPrice1.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 102 && addRefStock1.current && !addRefStock1.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (addRefUse1.current && !addRefUse1.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      //   setIsAddProDrop1(false);
      // }

      // if (inputClickNumber === 200 && addRefName2.current && !addRefName2.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 201 && addRefPrice2.current && !addRefPrice2.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 202 && addRefStock2.current && !addRefStock2.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (addRefUse2.current && !addRefUse2.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      //   setIsAddProDrop2(false);
      // }

      // if (inputClickNumber === 60 && addRefName3.current && !addRefName3.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 61 && addRefPrice3.current && !addRefPrice3.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 62 && addRefStock3.current && !addRefStock3.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (addRefUse3.current && !addRefUse3.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      //   setIsAddProDrop3(false);
      // }

      // if (inputClickNumber === 70 && addRefName4.current && !addRefName4.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 71 && addRefPrice4.current && !addRefPrice4.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 72 && addRefStock4.current && !addRefStock4.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (addRefUse4.current && !addRefUse4.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      //   setIsAddProDrop4(false);
      // }

      // if (inputClickNumber === 80 && addRefName5.current && !addRefName5.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 81 && addRefPrice5.current && !addRefPrice5.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 82 && addRefStock5.current && !addRefStock5.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (addRefUse5.current && !addRefUse5.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      //   setIsAddProDrop5(false);
      // }

      // if (inputClickNumber === 5 && inputRefDelivery.current && !inputRefDelivery.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 6 && inputRefCost.current && !inputRefCost.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 7 && inputRefSubTitle.current && !inputRefSubTitle.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 8 && inputRefMainSpec.current && !inputRefMainSpec.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 9 && inputRefSpec.current && !inputRefSpec.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
      // if (inputClickNumber === 10 && inputRefURL.current && !inputRefURL.current.contains(e.target)) {
      //   setInputClick(false);
      //   setInputClickNumber(0);
      // }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [inputClick]);

  // 최종 상품 등록 체크
  useEffect(() => {
    if (isName && isSubTitle && isPrice && isOptionNameFin && isOptionValueFin && isAddProductFinishEnd && isImage && isOptionList && isDelivery) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [isName, isSubTitle, isPrice, isOptionNameFin, isOptionValueFin, isAddProductFinishEnd, isImage, isDelivery, isOptionList]);

  // 최종 상품 데이터
  const productdata = {
    name: Name,
    subtitle: SubTitle,
    cost: Cost,
    price: Price,
    option: OptionResult,
    optionList: options,
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

  console.log(productdata)

  // 등록 버튼
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!Submit) {
      return;
    }

    try {
      // 상품 등록, 상품 수정을 확인합니다.
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

  // 옵션 함수 모음
  const optionAPI = {
    // 옵션 드롭 메뉴
    DropMenuHandler: (index: number) => {
      const NewIsOptionDropMenu = [...isOptionDropMenu];

      if (isOptionName[index] && isOptionValue[index]) {
        NewIsOptionDropMenu.map((boolean) => false);
        NewIsOptionDropMenu[index] = true;
        setIsOptionDropMenu(NewIsOptionDropMenu);
        return;
      }
    },
    // 옵션 추가
    PlusHandler: () => {
      if (options.length === 6) {
        return;
      } else {
        const addOption = { name: "", values: [], image: [], price: [] };
        const NewIsOptionName = [...isOptionName];
        const NewIsOptionValue = [...isOptionValue];
        const NewIsOptionDropMenu = [...isOptionDropMenu];

        NewIsOptionName.push(false);
        NewIsOptionValue.push(false);
        NewIsOptionDropMenu.push(false);

        setOptions([...options, addOption]);
        setIsOptionName(NewIsOptionName);
        setIsOptionValue(NewIsOptionValue);
        setIsOptionDropMenu(NewIsOptionDropMenu);
      }
    },
    // 옵션 삭제
    MinusHandler: () => {
      if (options.length === 1) {
        return;
      } else {
        const NewOptions = [...options];
        const NewIsOptionName = [...isOptionName];
        const NewIsOptionValue = [...isOptionValue];
        const NewIsOptionDropMenu = [...isOptionDropMenu];

        NewOptions.pop();
        NewIsOptionName.pop();
        NewIsOptionValue.pop();
        NewIsOptionDropMenu.pop();

        setOptions(NewOptions);
        setIsOptionName(NewIsOptionName);
        setIsOptionValue(NewIsOptionValue);
        setIsOptionDropMenu(NewIsOptionDropMenu);
      }
    },
    // 옵션명
    NameHandler: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const values = e.target.value;
      const newOptions = [...options];
      const newIsOptionName = [...isOptionName];
      const newNameMessages = [...OptionNameMessage];
      const newIsOptionDropMenu = [...isOptionDropMenu];

      newOptions[index] = { ...newOptions[index], name: e.target.value };

      if (values === "") {
        newIsOptionName[index] = false;
        newIsOptionDropMenu[index] = false;
        newNameMessages[index] = "옵션명을 입력해주세요.";
      } else if (values.length > 40) {
        newIsOptionName[index] = false;
        newIsOptionDropMenu[index] = false;
        newNameMessages[index] = "옵션명을 40글자 이내로 작성해주세요.";
      } else {
        newIsOptionName[index] = true;
        newNameMessages[index] = "";
      }

      setOptions(newOptions);
      setOptionNameMessage(newNameMessages);
      setIsOptionName(newIsOptionName);
      setIsOptionDropMenu(newIsOptionDropMenu);
    },
    // 옵션값
    ValueHandler: (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const dataSlice = e.target.value.split(",");
      const newOptions = [...options];
      const newIsOptionValue = [...isOptionValue];
      const newValueMessages = [...OptionValueMessage];
      const newIsOptionDropMenu = [...isOptionDropMenu];

      newOptions[index] = { ...newOptions[index], values: dataSlice, price: Array(dataSlice.length).fill(0), image: Array(dataSlice.length).fill([""]) };

      if (dataSlice[dataSlice.length - 1] === "") {
        newIsOptionValue[index] = false;
        newIsOptionDropMenu[index] = false;
        newValueMessages[index] = "입력되지 않은 옵션값이 있습니다.";
      } else {
        newIsOptionValue[index] = true;
        newValueMessages[index] = "";
      }

      setOptions(newOptions);
      setOptionValueMessage(newValueMessages);
      setIsOptionValue(newIsOptionValue);
      setIsOptionDropMenu(newIsOptionDropMenu);
    },
    // 옵션목록으로 적용 버튼
    Submit: (e: any) => {
      e.preventDefault();

      if (!(isOptionNameFin && isOptionValueFin)) {
        return;
      }

      setOptionResult("");

      const optiondata = {
        optionPrice: 0,
        optionStock: 0,
        optionStatus: "품절",
        optionUse: "Y",
        deleteBtn: "",
      };

      const result: Array<any> = [];

      if (options.length === 1) {
        if (options[0]?.values && options[0]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {  
            result.push({
              ...optiondata,
              name: [options[0].name],
              values: [value],
              optionName1: options[0].name,
              optionValue1: value,
              optionPrice: options[0].price && options[0].price[index]
            });
          });
        }
      } else if (options.length === 2) {
        if (options[0]?.values && options[1]?.values && options[0]?.price && options[1]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[1].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {
            options[1].values?.forEach((value2, index2) => {
              const price1 = options[0].price ? parseInt(options[0].price[index] || "0") : 0;
              const price2 = options[1].price ? parseInt(options[1].price[index2] || "0") : 0;
              const totalPrice = price1 + price2;

              result.push({
                ...optiondata,  
                name: [options[0].name, options[1].name],
                values: [value, value2],
                optionName1: options[0].name,
                optionValue1: value,
                optionName2: options[1].name,
                optionValue2: value2,
                optionPrice: totalPrice
              });
            });
          });
        }
      } else if (options.length === 3) {
        if (options[0]?.values && options[1]?.values && options[2]?.values && options[0]?.price && options[1]?.price && options[2]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[1].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[2].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {
            options[1].values?.forEach((value2, index2) => {
              options[2].values?.forEach((value3, index3) => {
                const price1 = options[0].price ? parseInt(options[0].price[index] || "0") : 0;
                const price2 = options[1].price ? parseInt(options[1].price[index2] || "0") : 0;
                const price3 = options[2].price ? parseInt(options[2].price[index3] || "0") : 0;
                const totalPrice = price1 + price2 + price3;

                result.push({
                  ...optiondata,
                  name: [options[0].name, options[1].name, options[2].name],
                  values: [value, value2, value3],
                  optionName1: options[0].name,
                  optionValue1: value,
                  optionName2: options[1].name,
                  optionValue2: value2,
                  optionName3: options[2].name,
                  optionValue3: value3,
                  optionPrice: totalPrice

                });
              });
            });
          });
        }
      } else if (options.length === 4) {
        if (options[0]?.values && options[1]?.values && options[2]?.values && options[3]?.values && options[0]?.price && options[1]?.price && options[2]?.price && options[3]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[1].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[2].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[3].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {
            options[1].values?.forEach((value2, index2) => {
              options[2].values?.forEach((value3, index3) => {
                options[3].values?.forEach((value4, index4) => {
                  const price1 = options[0].price ? parseInt(options[0].price[index] || "0") : 0;
                  const price2 = options[1].price ? parseInt(options[1].price[index2] || "0") : 0;
                  const price3 = options[2].price ? parseInt(options[2].price[index3] || "0") : 0;
                  const price4 = options[3].price ? parseInt(options[3].price[index4] || "0") : 0;
                  const totalPrice = price1 + price2 + price3 + price4;

                  result.push({
                    ...optiondata,
                    name: [options[0].name, options[1].name, options[2].name, options[3].name],
                    values: [value, value2, value3, value4],
                    optionName1: options[0].name,
                    optionValue1: value,
                    optionName2: options[1].name,
                    optionValue2: value2,
                    optionName3: options[2].name,
                    optionValue3: value3,
                    optionName4: options[3].name,
                    optionValue4: value4,
                    optionPrice: totalPrice

                  });
                });
              });
            });
          });
        }
      } else if (options.length === 5) {
        if (options[0]?.values && options[1]?.values && options[2]?.values && options[3]?.values && options[4]?.values && options[0]?.price && options[1]?.price && options[2]?.price && options[3]?.price && options[4]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[1].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[2].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[3].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[4].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {
            options[1].values?.forEach((value2, index2) => {
              options[2].values?.forEach((value3, index3) => {
                options[3].values?.forEach((value4, index4) => {
                  options[4].values?.forEach((value5, index5) => {
                    const price1 = options[0].price ? parseInt(options[0].price[index] || "0") : 0;
                    const price2 = options[1].price ? parseInt(options[1].price[index2] || "0") : 0;
                    const price3 = options[2].price ? parseInt(options[2].price[index3] || "0") : 0;
                    const price4 = options[3].price ? parseInt(options[3].price[index4] || "0") : 0;
                    const price5 = options[4].price ? parseInt(options[4].price[index5] || "0") : 0;
                    const totalPrice = price1 + price2 + price3 + price4 + price5;

                    result.push({
                      ...optiondata,
                      name: [options[0].name, options[1].name, options[2].name, options[3].name, options[4].name],
                      values: [value, value2, value3, value4, value5],
                      optionName1: options[0].name,
                      optionValue1: value,
                      optionName2: options[1].name,
                      optionValue2: value2,
                      optionName3: options[2].name,
                      optionValue3: value3,
                      optionName4: options[3].name,
                      optionValue4: value4,
                      optionName5: options[4].name,
                      optionValue5: value5,
                      optionPrice: totalPrice
                    });
                  });
                });
              });
            });
          });
        }
      } else if (options.length === 6) {
        if (options[0]?.values && options[1]?.values && options[2]?.values && options[3]?.values && options[4]?.values && options[5]?.values && options[0]?.price && options[1]?.price && options[2]?.price && options[3]?.price && options[4]?.price && options[5]?.price) {
          let totalPrice = 0;

          options[0].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[1].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[2].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[3].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })
          options[4].price?.forEach((price) => {
            totalPrice += parseInt(price);
          })

          options[0].values.forEach((value, index) => {
            options[1].values?.forEach((value2, index2) => {
              options[2].values?.forEach((value3, index3) => {
                options[3].values?.forEach((value4, index4) => {
                  options[4].values?.forEach((value5, index5) => {
                    options[5].values?.forEach((value6 ,index6) => {
                      const price1 = options[0].price ? parseInt(options[0].price[index] || "0") : 0;
                      const price2 = options[1].price ? parseInt(options[1].price[index2] || "0") : 0;
                      const price3 = options[2].price ? parseInt(options[2].price[index3] || "0") : 0;
                      const price4 = options[3].price ? parseInt(options[3].price[index4] || "0") : 0;
                      const price5 = options[4].price ? parseInt(options[4].price[index5] || "0") : 0;
                      const price6 = options[5].price ? parseInt(options[5].price[index6] || "0") : 0;
                      const totalPrice = price1 + price2 + price3 + price4 + price5 + price6;

                      result.push({
                        ...optiondata,
                        name: [options[0].name, options[1].name, options[2].name, options[3].name, options[4].name, options[5].name],
                        values: [value, value2, value3, value4, value5, value6],
                        optionName1: options[0].name,
                        optionValue1: value,
                        optionName2: options[1].name,
                        optionValue2: value2,
                        optionName3: options[2].name,
                        optionValue3: value3,
                        optionName4: options[3].name,
                        optionValue4: value4,
                        optionName5: options[4].name,
                        optionValue5: value5,
                        optionName6: options[5].name,
                        optionValue6: value6,
                        optionPrice: totalPrice
                      });
                    });
                  });
                });
              });
            });
          });
        }
      } else {
        return;
      }
      setOptionResult(result);
    },
  };

  // 옵션
  const Options = (optionNameMessage, optionValueMessage, isOptionDropMenu) => {
    const [isFocusedName, setIsFocusedName] = useState<boolean[]>([]);
    const [isFocusedValue, setIsFocusedValue] = useState<boolean[]>([]);
    const [isFocusedPrice, setIsFocusedPrice] = useState<boolean[]>([]);
    console.log(isFocusedPrice)

    const inputNameRefs = useRef<Array<HTMLDivElement | null>>([]);
    const inputValueRefs = useRef<Array<HTMLDivElement | null>>([]);
    const inputPriceRefs = useRef<Array<HTMLDivElement | null>>([]);
    const DropMenuRefs = useRef<Array<HTMLDivElement | null>>([]);

    // input 마우스 클릭시 테두리 효과 boolean
    const handleInputFocus = (state: boolean[], index: number, type: string) => {
      const focusedState = [...state];

      if (type === "name") {
        focusedState[index] = true;
        setIsFocusedName(focusedState);
      } else if (type === "value"){
        focusedState[index] = true;
        setIsFocusedValue(focusedState);
      } else if (type === "price"){
        focusedState[index] = true;
        setIsFocusedPrice(focusedState);
      }
    };

  // 옵션 가격 변경
    const OptionPriceChange = (index, index2, value) => {
      const newOptions = [...options];
      const option = newOptions[index];

      if (option.price !== undefined) {
        option.price[index2] = value;
      }
      setOptions(newOptions);
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        inputNameRefs.current.forEach((ref, index) => {
          if (isFocusedName[index] && ref && !ref.contains(e.target)) {
            const focusedState = [...isFocusedName];
            focusedState[index] = false;
            setIsFocusedName(focusedState);
          }
        });
        inputValueRefs.current.forEach((ref, index) => {
          if (isFocusedValue[index] && ref && !ref.contains(e.target)) {
            const focusedState = [...isFocusedValue];
            focusedState[index] = false;
            setIsFocusedValue(focusedState);
          }
        });
        inputPriceRefs.current.forEach((ref, index) => {
          if (isFocusedPrice[index] && ref && !ref.contains(e.target)) {
            const focusedState = [...isFocusedPrice];
            focusedState[index] = false;
            setIsFocusedPrice(focusedState);
          }
        });

        DropMenuRefs.current.forEach((ref, index) => {
          if (isOptionDropMenu[index] && ref && !ref.contains(e.target)) {
            const focusedState = [...isOptionDropMenu];
              focusedState[index] = false;
              setIsOptionDropMenu(focusedState);
            }
        });
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isFocusedName, isFocusedValue, isFocusedPrice, isOptionDropMenu]);

    return options.map((option, index) => {
      inputNameRefs.current[index] = inputNameRefs.current[index] || null;
      inputValueRefs.current[index] = inputValueRefs.current[index] || null;
      DropMenuRefs.current[index] = inputValueRefs.current[index] || null;

      return (
        <div key={index} style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
          <div className="input-box" style={{ flex: "30%" }}>
            <div className="input-box-title">
              <span>옵션명{index + 1}</span>
            </div>
            <div ref={(el) => (inputNameRefs.current[index] = el)} id={isFocusedName[index] ? "input-inner-active" : "input-inner"}>
              <input
                type="text"
                className="input"
                maxLength={20}
                name="productOptionName"
                placeholder="예시 : 컬러"
                value={options[index]?.name}
                onClick={() => {
                  handleInputFocus(isFocusedName, index, "name");
                }}
                onChange={(e) => optionAPI.NameHandler(e, index)}
              />
            </div>
            <div className={!isOptionName[index] ? "error-active name" : "error"}>{optionNameMessage[index]}</div>
          </div>
          <div className="input-box">
            <div className="input-box-title">
              <span>옵션값{index + 1}</span>
            </div>
            <div
              ref={(el) => (inputValueRefs.current[index] = el)}
              id={isFocusedValue[index] ? "input-inner-active" : "input-inner"}
              className="option-input-wrap"
            >
              <input
                type="text"
                className="input"
                name="productOptionValue"
                placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                id="OptionInputValue"
                value={option.values}
                onClick={() => {
                  handleInputFocus(isFocusedValue, index, "value");
                }}
                onChange={(e) => optionAPI.ValueHandler(e, index)}
              />

              <button className="dropmenu-btn" onClick={() => optionAPI.DropMenuHandler(index)}>
                <span>+</span>
              </button>
              <OptionDropMenu className="option-input-list"  isOptionDropMenu={isOptionDropMenu[index]} ref={(el) => (DropMenuRefs.current[index] = el)}>
                <OptionUl>
                  <div style={{ display: "flex", padding: "20px", fontWeight: "600" }}>
                    <div style={{ flex: "25%" }}>옵션 값</div>
                    <div style={{ flex: "50%" }}>옵션 사진</div>
                    <div style={{ flex: "20%" }}>옵션 가격</div>
                  </div>
                  <ul>
                  {isOptionDropMenu &&
                    option.values?.map((value, index2) => (
                      <Optionli key={index2}>
                        <div style={{ display: "flex", flexDirection: "column" }}>{value}</div>
                        <div>
                          <div style={{ display: "flex" }}>
                            {option.image && option.image[index2].map((image, imageIdx) => (
                              <OptionImage
                                index={index}
                                index2={index2}
                                image={image}
                                imageIdx={imageIdx}
                                optionImage={option.image && option.image}
                                isClicked={isClicked}
                                setIsClicked={setIsClicked}
                                options={options}
                                setOptions={setOptions}
                              />
                            ))}
                          </div>
                        </div>
                        <div
                          ref={(el) => (inputPriceRefs.current[index] = el)} id={isFocusedPrice[index2] ? "input-inner-active" : "input-inner"}
                          className="option-input-wrap"
                        >
                          <input
                            type="text"
                            className="input"
                            placeholder="옵션 금액"
                            value={option.price && option.price[index2]}
                            onClick={() => {
                              handleInputFocus(isFocusedPrice, index2, "price");
                            }}
                            onChange={(e) => OptionPriceChange(index, index2, e.target.value)}
                          />
                        </div>
                      </Optionli>
                    ))}
                  </ul>
                </OptionUl>
              </OptionDropMenu>
            </div>
            <div className={!isOptionValue[index] ? "error-active value" : "error"}>{optionValueMessage[index]}</div>
          </div>
        </div>
      );
    });
  };

  // 추가 상품 함수모음
  const addProducts = {
    ResetHandler: () => {
      setIsAddProductFinishEnd(false);
    },
    NameChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      setAddName: React.Dispatch<React.SetStateAction<string>>,
      setIsAddName: React.Dispatch<React.SetStateAction<boolean>>,
      setAddNameErr: React.Dispatch<React.SetStateAction<string>>
    ) => {
      addProducts.ResetHandler();
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
      addProducts.ResetHandler();
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
      addProducts.ResetHandler();
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

  // 추가 옵션
  const AddOptions = (
    addName,
    addPrice,
    addStock,
    addUse,
    setAddUse,
    setAddName,
    setIsAddName,
    setAddNameErr,
    setAddPrice,
    setIsAddPrice,
    setAddPriceErr,
    setAddStock,
    setIsAddStock,
    setAddStockErr,
    index,
    addRefName,
    addRefPrice,
    addRefStock,
    addRefUse,
    isAddProDrop,
    setIsAddProDrop
  ) => (
    <div className="input-area" style={{ display: "flex", alignItems: "start", flexDirection: "row", width: "100%" }}>
      <div className="input-box" style={{ flex: "50%" }}>
        <div className="input-box-title">
          <span>상품명</span>
        </div>
        <div ref={addRefName} id={inputClick && inputClickNumber === index * 100 ? "input-inner-active" : "input-inner"}>
          <input
            type="text"
            className="input"
            placeholder="예시: Final Cut Pro"
            value={addName}
            onClick={() => {
              setInputClick(true);
              setInputClickNumber(index * 100);
            }}
            onChange={(e) => addProducts.NameChange(e, setAddName, setIsAddName, setAddNameErr)}
          />
        </div>
        <div className={!`isAddName${index}` ? "error-active name" : "error"}>{`addNameErr${index}`}</div>
      </div>
      <div className="input-box" style={{ flex: "50%" }}>
        <div className="input-box-title">
          <span>가격</span>
        </div>
        <div ref={addRefPrice} id={inputClick && inputClickNumber === index * 100 + 1 ? "input-inner-active" : "input-inner"}>
          <input
            type="text"
            className="input"
            maxLength={10}
            placeholder="예시: 440,000원"
            value={addPrice}
            onClick={() => {
              setInputClick(true);
              setInputClickNumber(index * 100 + 1);
            }}
            onChange={(e) => addProducts.PriceChange(e, setAddPrice, setIsAddPrice, setAddPriceErr)}
          />
        </div>
        <div className={!`isAddPrice${index}` ? "error-active name" : "error"}>{`addPriceErr${index}`}</div>
      </div>
      <div className="input-box" style={{ flex: "30%" }}>
        <div className="input-box-title">
          <span>재고</span>
        </div>
        <div ref={addRefStock} id={inputClick && inputClickNumber === index * 100 + 2 ? "input-inner-active" : "input-inner"}>
          <input
            type="text"
            className="input"
            maxLength={10}
            placeholder="예시: 200"
            value={addStock}
            onClick={() => {
              setInputClick(true);
              setInputClickNumber(index * 100 + 2);
            }}
            onChange={(e) => addProducts.StockChange(e, setAddStock, setIsAddStock, setAddStockErr)}
          />
        </div>
        <div className={!`isAddStock${index}` ? "error-active name" : "error"}>{`addStockErr${index}`}</div>
      </div>
      <div className="input-box" style={{ flex: "20%" }}>
        <div className="option-use">
          <div className="input-box-title">
            <span>사용여부</span>
          </div>
          <div
            ref={addRefUse}
            id={isAddProDrop ? "input-inner-active" : "input-inner"}
            style={{ height: "40px", display: "flex", alignItems: "center", position: "relative" }}
            onClick={() => setIsAddProDrop((e) => !e)}
          >
            <DropWrap
              isAddProDrop={isAddProDrop}
              onClick={() => {
                setInputClick(true);
                // setInputClickNumber(index + 103);
              }}
            >
              {addUse ? <div className="item">Y</div> : <div className="item">N</div>}
            </DropWrap>
            <DropMenu isAddProDrop={isAddProDrop}>
              <div onClick={() => addProducts.UseChange(true, setAddUse)}>Y</div>
              <div onClick={() => addProducts.UseChange(false, setAddUse)}>N</div>
            </DropMenu>
          </div>
        </div>
      </div>
    </div>
  );

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
                        <span
                          key={index}
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#f1f1f1",
                            padding: "5px 10px",
                            marginRight: index !== productdata.category.length - 1 ? "7px" : "0",
                            fontSize: "12px",
                          }}
                        >
                          {list.name}
                        </span>
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
                              onChange={(e) => Handler.Name(e)}
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
                              onChange={(e) => Handler.SubTitle(e)}
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
                              onChange={(e) => Handler.Cost(e)}
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
                              onChange={(e) => Handler.Price(e)}
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
                              {/* 옵션 */}
                              {Options(
                                OptionNameMessage,
                                OptionValueMessage,
                                isOptionDropMenu
                              )}
                            </div>
                            <div style={{ display: "flex", marginTop: "35px" }}>
                              <div className="circle-btn-wrap2" onClick={optionAPI.PlusHandler} style={{ marginRight: "5px" }}>
                                <span className="text">+</span>
                              </div>
                              <div className="circle-btn-wrap2" onClick={optionAPI.MinusHandler}>
                                <span className="text">-</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apply-btn-wrap">
                          <button className={isOptionNameFin && isOptionValueFin ? "apply-btn-active" : "apply-btn"} onClick={optionAPI.Submit}>
                            <span className="apply-btn-text">옵션목록으로 적용</span>
                            <span className="apply-btn-icon"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="inner-menu-list">
                      <div className="menu-bottom">
                        <TableProductRegi
                          optionResult={OptionResult}
                          setOptionResult={setOptionResult}
                          optionSubmit={optionAPI.Submit}
                          options={options}
                          isEdit={isEdit}
                        ></TableProductRegi>
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
                          {addListType >= 0 &&
                            AddOptions(
                              addName1,
                              addPrice1,
                              addStock1,
                              addUse1,
                              setAddUse1,
                              setAddName1,
                              setIsAddName1,
                              setAddName1Err,
                              setAddPrice1,
                              setIsAddPrice1,
                              setAddPrice1Err,
                              setAddStock1,
                              setIsAddStock1,
                              setAddStock1Err,
                              1,
                              addRefName1,
                              addRefPrice1,
                              addRefStock1,
                              addRefUse1,
                              isAddProDrop1,
                              setIsAddProDrop1
                            )}
                          {addListType >= 1 &&
                            AddOptions(
                              addName2,
                              addPrice2,
                              addStock2,
                              addUse2,
                              setAddUse2,
                              setAddName2,
                              setIsAddName2,
                              setAddName2Err,
                              setAddPrice2,
                              setIsAddPrice2,
                              setAddPrice2Err,
                              setAddStock2,
                              setIsAddStock2,
                              setAddStock2Err,
                              2,
                              addRefName2,
                              addRefPrice2,
                              addRefStock2,
                              addRefUse2,
                              isAddProDrop2,
                              setIsAddProDrop2
                            )}
                          {addListType >= 2 &&
                            AddOptions(
                              addName3,
                              addPrice3,
                              addStock3,
                              addUse3,
                              setAddUse3,
                              setAddName3,
                              setIsAddName3,
                              setAddName3Err,
                              setAddPrice3,
                              setIsAddPrice3,
                              setAddPrice3Err,
                              setAddStock3,
                              setIsAddStock3,
                              setAddStock3Err,
                              3,
                              addRefName3,
                              addRefPrice3,
                              addRefStock3,
                              addRefUse3,
                              isAddProDrop3,
                              setIsAddProDrop3
                            )}
                          {addListType >= 3 &&
                            AddOptions(
                              addName4,
                              addPrice4,
                              addStock4,
                              addUse4,
                              setAddUse4,
                              setAddName4,
                              setIsAddName4,
                              setAddName4Err,
                              setAddPrice4,
                              setIsAddPrice4,
                              setAddPrice4Err,
                              setAddStock4,
                              setIsAddStock4,
                              setAddStock4Err,
                              4,
                              addRefName4,
                              addRefPrice4,
                              addRefStock4,
                              addRefUse4,
                              isAddProDrop4,
                              setIsAddProDrop4
                            )}
                          {addListType >= 4 &&
                            AddOptions(
                              addName5,
                              addPrice5,
                              addStock5,
                              addUse5,
                              setAddUse5,
                              setAddName5,
                              setIsAddName5,
                              setAddName5Err,
                              setAddPrice5,
                              setIsAddPrice5,
                              setAddPrice5Err,
                              setAddStock5,
                              setIsAddStock5,
                              setAddStock5Err,
                              5,
                              addRefName5,
                              addRefPrice5,
                              addRefStock5,
                              addRefUse5,
                              isAddProDrop5,
                              setIsAddProDrop5
                            )}
                        </div>
                        <div style={{ display: "flex", marginTop: "43px" }}>
                          <div className="circle-btn-wrap2" onClick={addProducts.PlusHandler} style={{ marginRight: "5px" }}>
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
                              onChange={(e) => Handler.MainSpec(e)}
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
                              onChange={(e) => Handler.Spec(e)}
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
                              onChange={(e) => Handler.URL(e)}
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
                              onChange={(e) => Handler.Delivery(e)}
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
