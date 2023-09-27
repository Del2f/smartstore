import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Buy from "./Buy";

import { productList } from "./Category";
import { ObjectId } from "mongodb";

import { useCookies } from "react-cookie";

import checkIcon from "@img/icon-check-16.00020358.svg";
import { v4 as uuidv4 } from "uuid";

const Wrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #f4f4f4;
`;

const Top = styled.div`
  width: 100%;
  background-color: #fff;
`;

const Middle = styled.div`
  width: 100%;
  min-height: 700px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const Bottom = styled.div``;

const ResultFixedWrap = styled.div`
  height: 80px;
  background-color: #03c75a;
  display: flex;
  justify-content: center;
  padding: 12px 0;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
`;

const ResultFixed = styled.div`
  width: 1280px;
  display: flex;
  justify-content: flex-end;
`;

const ResultFixedPrice = styled.button`
  background-color: transparent;
  display: inline-block;
  font-weight: bold;
  line-height: 48px;
  vertical-align: top;
  border: 0px;

  span {
    color: white;
    margin-right: 10px;
  }
`;
const ResultFixedBtn = styled.button`
  display: inline-block;
  width: 224px;
  max-width: none;
  margin-left: 29px;
  border-radius: 6px;
  box-shadow: none;
  border: 0;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  vertical-align: top;
`;

const ResultFixedBtnLink = styled(Link)`
  /* &:hover {
        text-decoration: none;
    } */
`;

const TopInner = styled.div`
  margin: 0 150px;
  padding: 50px 0;
`;

const AllCheckWrap = styled.div`
  border-top: 1px solid #e7e7e7;
`;

const AllCheck = styled.div`
  margin: 0 150px;
  padding: 50px 0;
`;

const AllCheckWrapName = styled.span``;

const OrderText = styled.span``;

const OrderCount = styled.span``;

const OrderUnit = styled.span``;

// 장바구니 상품 리스트
const ListWrap = styled.ul`
  /* width: 1280px; */
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 40px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.05);

  &:first-child {
    margin-top: 50px;
  }

  &:last-child {
    margin-bottom: 110px;
  }
`;

const ListTop = styled.div`
  display: flex;
`;
const ListLeft = styled.div``;

const ImgWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.div`
  border-radius: 20px;
  padding: 20px;

  img {
    width: 100px;
    border-radius: 20px;
    /* border: 1px solid black; */
  }
`;
const ProductText = styled.div`
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 350px;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
`;

const Name = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: 0;
    align-items: center;
    width: 22px;
    height: 22px;
    padding: 5px;
    margin-bottom: 2px;
    svg {
      width: 13px;
      height: 13px;
    }
  }
`;
const ProductPrice = styled.div`
  font-size: 15px;
  font-weight: 400;

  del {
    color: #aaaaaa;
    font-weight: 100;
    font-size: 13px;
  }
`;

// 전체체크

const AllCheckBox = styled.input`
  display: none;
  position: absolute;

  &:checked {
    + .agree-check-box .agree-ico-box {
      border-color: #03c75a;
      background-color: #03c75a;
    }
    + .agree-check-box .agree-ico {
      display: block;
    }
  }
`;

const CheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
`;

interface ICheckBox {
  isAllCheck: boolean;
  checkedID: any;
}

// 장바구니 옵션
const CheckBox = styled.input.attrs({ type: "checkbox" })<ICheckBox>`
  display: none;
  position: absolute;
`;

const Label = styled.label`
  display: inline-block;
  margin-right: 12px;
  cursor: pointer;
  position: relative;
`;

interface ICheckIconBox {
  checked: any;
}

const CheckIconBox = styled.span<ICheckIconBox>`
  display: block;
  position: relative;
  width: 19px;
  height: 19px;
  border: 1.2px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? "#03c75a" : "none")};
  border-color: ${(props) => (props.checked ? "#03c75a" : "#d3d3d3")};
`;

const AllCheckIconBox = styled.span`
  display: block;
  position: relative;
  width: 19px;
  height: 19px;
  border: 1.2px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

interface ICheckIcon {
  checked: any;
}

const CheckIcon = styled.span<ICheckIcon>`
  display: ${(props) => (props.checked ? "block" : "none")};

  position: absolute;
  top: 1px;
  right: 0;
  bottom: 0;
  left: 1px;
  width: 17px;
  height: 17px;
  content: "";
  background: url(${checkIcon}) 0px 0px no-repeat;
`;

const AllCheckIcon = styled.span`
  display: none;
  position: absolute;
  top: 1px;
  right: 0;
  bottom: 0;
  left: 1px;
  width: 17px;
  height: 17px;
  content: "";
  background: url(${checkIcon}) 0px 0px no-repeat;
`;

const Selected = styled.div`
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const OptionType = styled.span``;

const OptionName = styled.span`
  width: 300px;
  padding: 10px 20px;
  border-right: 1px solid #e0e0e0;
`;

const OptionNameList = styled.div`
  padding: 12px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const OptionList = styled.div`
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

// 장바구니 금액
const Text = styled.div``;
const Price = styled.div`
  font-weight: 700;
`;
const Unit = styled.span``;

const OptionPrice = styled.div`
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DeliveryName = styled.div`
  font-size: 14px;
  color: #4b4b4b;
`;

const DeliveryWrap = styled.div`
  padding-left: 20px;
  border-left: 1px solid #e0e0e0;

  display: flex;
  width: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OptionPriceNum = styled.div``;

const OptionPriceName = styled.div`
  font-size: 14px;
  color: #4b4b4b;
`;

const OptionPriceShipping = styled.div`
  font-size: 12px;
  color: #808080;
`;

const OptionCount = styled.span``;
const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  gap: 30px;
`;
const SelectPrice = styled.div``;
const DeliveryPrice = styled.div``;
const SalePrice = styled.div`
  position: relative;
  padding-right: 30px;

  ${Price} {
    color: #f85151;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    max-height: 46px;
    background-color: #d1d4d7;
    content: "";
  }
`;
const ResultPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* flex-wrap: wrap; */

  ${Price} {
    color: #00c63a;
  }
`;

export interface selectedType {
  id: number;
  option: string;
  count: number;
}

export interface cartListType {
  product: productList;
  selected: selectedType[];
  count: string;
  total: string;
  _id: ObjectId;
}

// interface cartCheckType {
//     product: productList;
//     selected: selectedType[];
//     count: string;
//     total: string;
//     _id: ObjectId;
//     orderID: ObjectId;
//     length: number;
//     [index: string]: any;
// }

interface ICheckedID {
  [index: number]: string;
  length: number;
  some: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => boolean;
  filter: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => string[];
  [Symbol.iterator](): IterableIterator<string>;
  includes(searchElement: string, fromIndex?: number): boolean;
}

interface Props {
  setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
}

function Cart({ setNavCart }:Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const randomId = uuidv4().replace(/-/g, "");

  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

  const [cartList, setCartList] = useState<cartListType[]>();
  console.log(cartList);

  const [selectedLength, setSelectedLength] = useState<number>();

  const [checkedID, setCheckedID] = useState<ICheckedID>([]);
  const [cartCheck, setCartCheck] = useState<any>([]);

  const [cartResult, setCartResult] = useState<any>();
  const [cartLogin, setCartLogin] = useState<any>(false);
  const [isAllCheck, setIsAllCheck] = useState<any>(false);

  const [isCheck, setIsCheck] = useState<any>(false);
  console.log(isCheck);

  // 유저의 로그인 상태를 확인.
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.userjwt) {
        navigate("/shop");
      }

      try {
        const res = await axios.post("/smartstore/cart", {}, { withCredentials: true });
        console.log(res.data)

        if (res.data.status == false) {
          navigate("/shop");
        }

        const sum = res.data.cart.reduce((acc: any, cur: any) => acc + cur.selected.length, 0);
        setSelectedLength(sum);
        // setNavCart(res.data.cart);
        setCartList(res.data.cart);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  // 유저 장바구니 리스트 불러오기.
  // useEffect(() => {
  //   const cartData = async () => {
  //     try {
  //       console.log("실행");
  //       const res = await axios.post(`/smartstore/cart/cartList`, cookies, { withCredentials: true });
  //       console.log(res.data);

  //       const sum = res.data.reduce((acc: any, cur: any) => acc + cur.selected.length, 0);

  //       setSelectedLength(sum);
  //       setCartList(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   cartData();
  // }, []);

  // 장바구니 상품 최소 1개 이상 체크시 결제가능
  useEffect(() => {
    if (checkedID.length > 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [checkedID]);

  // 장바구니 상품 최종 결제금액
  useEffect(() => {
    // const test = cartCheck?.reduce((acc: any, cur: any) => acc.total + cur.total)
    // console.log(test);
    // cartCheck.reduce((acc: any, cur: any) => acc.total + cur.total)
    const result1 = cartCheck?.reduce((acc: any, cur: any) => {
      if (cur.total != 0) {
        acc += cur.total;
        // if (cur.product) {
        //     cur.product.delivery = Number(cur.product.delivery);
        //     acc += cur.product.delivery;
        // }
      }
      return acc;
    }, 0);
    // console.log(result);
    // const maxDelivery = Math.max(...cartCheck.map((list: any) => list.product.delivery));
    // console.log(maxDelivery);
    // const result2 = result1 + maxDelivery;

    setCartResult(result1);
  }, [cartCheck]);

  // 전체상품 선택 체크박스 클릭시
  const allCheck = () => {
    if (isAllCheck) {
      setIsAllCheck(false);
      setCheckedID([]);
    } else {
      const allSelected = cartList?.reduce((acc: any, cur: any) => {
        console.log(cur.selected.id);
        return [...acc, ...cur.selected.map((list: any) => list.id)];
      }, []);
      // console.log(allSelected);

      if (allSelected) {
        setCheckedID(allSelected);
        setIsAllCheck(true);
      }
    }
  };

  // 장바구니 낱개상품 체크박스 클릭시
  const check = (e: any) => {
    const checkboxID = e.target.id;
    if (checkedID.includes(checkboxID)) {
      setCheckedID(checkedID.filter((id: any) => id !== checkboxID));
    } else {
      setCheckedID([...checkedID, checkboxID]);
    }
  };

  // 장바구니 낱개상품 삭제버튼
  const cartDelete = async (e: any) => {
    // console.log(checkboxID);
    // const result = cartList?.map((list: any) => {
    //     const newSelected = list.selected.filter((selected: any) => selected.id !== checkboxID )
    //     return { ...list, selected: newSelected }
    // } )
    // setCartList(result)

    try {
      const checkboxID = e.currentTarget.id;
      console.log(e.currentTarget.id)

      const res = await axios.post("/smartstore/cart/cartdelete/", { checkboxID }, { withCredentials: true });
      console.log(res.data);

      setNavCart(res.data);
      setCartList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 상품을 선택하지 않았을때.
  const isCheckAlert = () => {
    if (!isCheck) {
      alert("상품을 선택 해주세요.");
    }
  };

  // 장바구니 상품 체크된 상품만 정리되는 코드.
  useEffect(() => {
    const filteredCartList = cartList?.map((item: any) => {
      if (item.selected) {
        const filteredSelected = item.selected.filter((selectedItem: any) => {
          return checkedID.some((checkedItem: any) => {
            return selectedItem.id === checkedItem;
          });
        });
        return { ...item, selected: filteredSelected };
      }
      return item;
    });

    // console.log(filteredCartList);

    // const result = filteredCartList?.filter((list: any) => list.selected.length > 0);
    const newResult = filteredCartList?.map((item: any) => {
      const newSelected = item.selected.map((selectedItem: any) => {
        const newListItem = selectedItem.list.map((listItem: any) => listItem.count);
        const newTotalCount = newListItem.reduce((acc: any, cur: any) => acc + cur);
        return { ...selectedItem, totalcount: newTotalCount };
      });

      const totalCount = newSelected.reduce((acc: any, cur: any) => acc + cur.totalcount, 0);
      const totalPrice = totalCount * item.product.price;
      return { ...item, selected: newSelected, count: totalCount, total: totalPrice, orderID: randomId };
    });

    setCartCheck(newResult);
    // if(newResult != undefined){
    // }
    // setCartCheck(newResult && newResult[0] ? newResult : undefined);
  }, [checkedID]);

  const cart = (
    <ListWrap>
      {cartList &&
        cartList?.map((cartlist: any, index: any) => (
          <>
            <List key={index} className="List">
              <ListTop>
                <ListLeft>
                  {cartlist.selected?.map((selected: any, index: any) => (
                    <>
                      <Selected className="selected">
                        <CheckBoxWrap>
                          <CheckBox type="checkbox" id={selected.id} name="checkbox" onChange={check} isAllCheck={isAllCheck} checkedID={checkedID} />
                          <Label className="agree-check-box" htmlFor={selected.id}>
                            <CheckIconBox className="agree-ico-box" checked={checkedID.includes(selected.id)}></CheckIconBox>
                            <CheckIcon className="agree-ico" checked={checkedID.includes(selected.id)} />
                          </Label>
                        </CheckBoxWrap>
                        <ImgWrap>
                          <Img>
                            <img src={cartlist.product.mainImage} alt="" />
                          </Img>
                        </ImgWrap>
                        <ProductText>
                          <Name>
                            <div>
                              <svg width="48" height="15" viewBox="0 0 48 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#IcoNpayPlus_svg__clip0_1450:8150)">
                                  <path d="M47 0H34.141l-3.124 7.686L34.142 15H47a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" fill="#1E9BF5"></path>
                                  <path
                                    d="M42.652 6.505v-2.97h-1.99v2.97h-2.97v1.99h7.93v-1.99h-2.97zm-1.98 2.253l-.012 2.707h1.99V10.21c0-.943-1-1.453-1.978-1.453zM1.114 1.115h12.77v12.77H1.114V1.114z"
                                    fill="#fff"
                                  ></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.746 4V7.5L6.15 4H4v6.998h2.252v-3.5l2.596 3.5h2.15V4H8.746z"
                                    fill="#03C75A"
                                  ></path>
                                  <path
                                    d="M0 1v13a1 1 0 0 0 1 1h33.142a.858.858 0 0 0 .858-.857V.857A.857.857 0 0 0 34.142 0H1a1 1 0 0 0-1 1zm1.3 12.698V1.3h12.398v12.398H1.3z"
                                    fill="#03C75A"
                                  ></path>
                                  <path
                                    d="M16.83 3.606h2.502c.346-.008.693.04 1.026.143.26.08.5.213.702.393.183.166.324.373.41.604.09.24.135.496.133.754v.193c0 .263-.049.523-.142.769-.092.242-.24.458-.43.634a2.1 2.1 0 0 1-.714.428c-.32.113-.66.169-.999.162h-1.325v2.55h-1.165v-6.63h.001zm1.177.984v2.106h1.168a1.64 1.64 0 0 0 .912-.22c.219-.144.33-.415.33-.8V5.51a1.071 1.071 0 0 0-.082-.45.72.72 0 0 0-.235-.288.923.923 0 0 0-.364-.142 2.194 2.194 0 0 0-.46-.041l-1.269.001zm5.842 5.722c-.546 0-.969-.125-1.269-.374a1.27 1.27 0 0 1-.45-1.044V8.6c-.002-.194.03-.388.096-.572.066-.177.176-.334.322-.456.175-.142.377-.246.595-.305.294-.08.598-.118.901-.11h1.161v-.195c0-.312-.073-.537-.217-.675-.145-.137-.374-.206-.685-.207-.52 0-1.024.178-1.429.506l-.57-.846c.274-.188.567-.346.874-.474a2.866 2.866 0 0 1 1.142-.208c.277-.002.553.035.82.11.233.066.453.173.648.32.18.131.327.305.428.505.105.212.158.447.153.684v3.56h-1.04l-.019-.623a.817.817 0 0 1-.234.298c-.11.09-.231.164-.363.219a2.238 2.238 0 0 1-.864.18zm1.353-2.255H24.07c-.308 0-.52.058-.64.176a.627.627 0 0 0-.18.468v.11a.462.462 0 0 0 .178.387c.15.104.333.154.516.144.47 0 .82-.114 1.048-.34a.589.589 0 0 0 .183-.335c.021-.155.03-.31.029-.465l-.003-.145zm3.092-2.889l1.142 3.744h.037l1.159-3.744h1.233l-2.626 7.178-1.085-.377.653-1.665L27 5.169h1.293z"
                                    fill="#fff"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="IcoNpayPlus_svg__clip0_1450:8150">
                                    <path fill="#fff" d="M0 0h48v15H0z"></path>
                                  </clipPath>
                                </defs>
                              </svg>
                              &nbsp;{cartlist.product.name}
                            </div>

                            <button type="button" className="btn_delete--1OJG6GLwYt" id={selected._id} onClick={cartDelete}>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ico_delete--3ASzyXvISn"
                              >
                                <path
                                  d="M14.278 1.12l.722.72-6.278 6.28L15 14.397l-.722.722L8 8.841 1.722 15.12 1 14.397l6.278-6.278L1 1.841l.722-.722L8 7.397l6.278-6.278z"
                                  fill="#BDC0C6"
                                ></path>
                              </svg>
                            </button>
                          </Name>
                          <ProductPrice>
                            {cartlist.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            <span>원</span>
                            <del>
                              &nbsp;
                              {cartlist.product.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </del>
                          </ProductPrice>
                        </ProductText>
                        <OptionList key={index}>
                          <OptionName>
                            {selected.list.map((order: any, index: any) => (
                              <OptionNameList key={index}>
                                <OptionType>{cartlist.product.option[0].optionName}&nbsp;</OptionType>
                                <span>&nbsp;{order.option}&nbsp;/&nbsp;</span>
                                <span>&nbsp;{order.count}</span>
                                <span>개</span>
                              </OptionNameList>
                            ))}
                          </OptionName>
                          <OptionCount>{/* {list.count} */}</OptionCount>
                          <OptionPrice>
                            <OptionPriceName>상품금액</OptionPriceName>
                            <OptionPriceNum>
                              {selected.list
                                .reduce((acc: any, cur: any) => acc + cur.price, 0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </OptionPriceNum>
                            <OptionPriceShipping></OptionPriceShipping>
                          </OptionPrice>
                          {/* <DeliveryWrap>
                                        <DeliveryName>배송비</DeliveryName>
                                        {cartlist.product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </DeliveryWrap> */}
                        </OptionList>
                      </Selected>
                    </>
                  ))}
                </ListLeft>

                <DeliveryWrap>
                  <DeliveryName>배송비</DeliveryName>
                  {cartlist.product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                </DeliveryWrap>
              </ListTop>

              <PriceWrap>
                {cartCheck ? (
                  cartCheck?.map((list: any) => {
                    if (cartlist._id === list._id) {
                      return (
                        <>
                          <SelectPrice>
                            <Text>선택상품금액</Text>
                            <Price>{(list.product.cost * list.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Price>
                          </SelectPrice>
                          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#C7C7C7" d="M.502 6h14v2h-14z"></path>
                            <path fill="#C7C7C7" d="M6.502 0h2v14h-2z"></path>
                          </svg>
                          <DeliveryPrice>
                            <Text>배송비</Text>
                            <Price>{list.count != 0 ? list.product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원" : "0원"}</Price>
                          </DeliveryPrice>
                          <svg width="15" height="2" viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#C7C7C7" d="M.502 0h14v2h-14z"></path>
                          </svg>
                          <SalePrice>
                            <Text>할인예상금액</Text>
                            <Price>{(list.product.cost * list.count - list.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Price>
                          </SalePrice>
                          <ResultPrice>
                            <Text>주문금액</Text>
                            <Price>
                              {list.count != 0 ? (Number(list.product.delivery) + list.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                              <Unit>원</Unit>
                            </Price>
                          </ResultPrice>
                        </>
                      );
                    }
                  })
                ) : (
                  <>
                    <SelectPrice>
                      <Text>선택상품금액</Text>
                      <Price>0원</Price>
                    </SelectPrice>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#C7C7C7" d="M.502 6h14v2h-14z"></path>
                      <path fill="#C7C7C7" d="M6.502 0h2v14h-2z"></path>
                    </svg>
                    <DeliveryPrice>
                      <Text>배송비</Text>
                      <Price>0원</Price>
                    </DeliveryPrice>
                    <svg width="15" height="2" viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#C7C7C7" d="M.502 0h14v2h-14z"></path>
                    </svg>
                    <SalePrice>
                      <Text>할인예상금액</Text>
                      <Price>0원</Price>
                    </SalePrice>
                    <ResultPrice>
                      <Text>주문금액</Text>
                      <Price>0원</Price>
                    </ResultPrice>
                  </>
                )}
              </PriceWrap>
            </List>
          </>
        ))}
    </ListWrap>
  );

  return (
    <>
      <Wrap>
        <Top>
          <TopInner>
            <OrderText>주문 </OrderText>
            <OrderCount>{selectedLength}</OrderCount>
            <OrderUnit>건</OrderUnit>
          </TopInner>
          <AllCheckWrap>
            <AllCheck>
              <AllCheckBox type="checkbox" id={"allcheck"} name="checkbox" onChange={allCheck} />
              <Label className="agree-check-box" htmlFor={"allcheck"}>
                <AllCheckIconBox className="agree-ico-box"></AllCheckIconBox>
                <AllCheckIcon className="agree-ico" />
              </Label>
              <AllCheckWrapName>전체 선택</AllCheckWrapName>
            </AllCheck>
          </AllCheckWrap>
        </Top>
        <Middle>{cart}</Middle>
        <ResultFixedWrap>
          <ResultFixed>
            <ResultFixedPrice>
              <span>총 주문금액</span>
              <span>{checkedID.length === 0 ? "0" : cartResult?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
            </ResultFixedPrice>
            {/* <ResultFixedBtnLink to={{pathname: `/buy/${cartCheck && cartCheck.length > 0 ? cartCheck[0].orderID : ""}`, state: {cartCheck}} as Partial<To>}> */}
            <ResultFixedBtnLink to={isCheck ? `/buy/${cartCheck[0].orderID}` : ""} state={cartCheck} onClick={isCheckAlert}>
              <ResultFixedBtn>
                <span>주문하기</span>
              </ResultFixedBtn>
            </ResultFixedBtnLink>
          </ResultFixed>
        </ResultFixedWrap>
      </Wrap>
    </>
  );
}

export default Cart;
