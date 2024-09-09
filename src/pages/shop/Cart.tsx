import axios from "../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { productList } from "./Category";
import { ObjectId } from "mongodb";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

const deleteAnimationIn = keyframes`
    0% {
      max-height: 0;
      opacity: 0;
    }
    50% {
      max-height: 600px;
      opacity: 0;
    }
    to {
      max-height: 600px;
      opacity: 1;
    }
`;

const deleteAnimationOut = keyframes`
    0% {
      max-height: 600px;
      opacity: 1;
    }
    50% {
      max-height: 600px;
      opacity: 0;
    }
    to {
      max-height: 0;
      opacity: 0;
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface CartList {
  showCountIndex: number | null;
  isDeleting: boolean;
}

const CartWrapWrap = styled.div`
  position: relative;
`;

const CartWrap = styled.div`
  margin: auto;
  padding: 50px 0;
  max-width: 980px;

  h1 {
    font-size: 40px;
    font-weight: 600;
  }

  h2 {
    font-size: 17px;
    font-weight: 400;
    margin-top: 25px;
  }

  .margin {
    margin-top: 32px;
    max-width: 50%;
  }

  .submit-btn {
    padding: 17px 30px;

    background-color: white;
    border: 1px solid #06c;

    .text {
      color: #06c;
      font-weight: 500;
    }
  }

  .submit-btn:hover {
    background-color: #06c;
    border: 1px solid #06c;

    .text {
      color: white;
      font-weight: 500;
    }
  }
`;

const PaymentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #d2d2d7;
  padding-bottom: 60px;
  padding-top: 10px;
  text-align: center;

  h1 {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.1;
    padding-bottom: 2px;
  }

  .cart-message {
    padding-top: 20px;
    font-size: 15px;
  }

  button {
    margin-top: 38px;
    width: 290px;
    border: 0;
    border-radius: var(--btn-border-radius);
    background-color: var(--btn-background-color);
    padding: 10px 15px;

    span {
      color: var(--white-color);
      font-size: 13px;
    }
  }
`;

const CartList = styled.ul<CartList>`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .count-select {
    display: none;
    width: 80px;
  }

  ${(props) =>
    props.showCountIndex !== undefined &&
    css`
      .count-select-${props.showCountIndex} {
        display: flex;
        flex-direction: column;
        line-height: 1.12;
        z-index: 2;

        .number:hover {
          color: var(--white-color);
          background-color: var(--blue-color);
          cursor: pointer;
        }
      }
    `}

  li {
    &.deleting {
      animation: ${deleteAnimationOut} 0.6s linear forwards;
    }
    &.restoring {
      animation: ${deleteAnimationIn} 0.6s linear forwards;
    }

    .list-inner {
      display: flex;
      border-bottom: 1px solid #d2d2d7;
      padding-bottom: 76px;
      margin-bottom: 0;
      padding-top: 78px;
    }

    .image-wrap {
      margin-top: 2px;
      text-align: center;
      width: 203px;
      height: 203px;
      flex-basis: 25%;
      max-width: 25%;
      margin-right: 20px;

      img {
        width: 100%;
      }
    }

    .cart-info {
      flex-basis: 75%;
      max-width: 75%;

      .cart-info-top {
        display: flex;
        flex-direction: row;
        font-size: 24px;
        font-weight: 600;

        .name {
          flex-basis: 50%;
          max-width: 50%;
          padding-inline-end: 20px;

          .option {
            line-height: 1.3;
          }
        }

        .count {
          position: relative;
          width: 14%;

          .count-icon::after {
            padding-left: 8px;
            content: "";
            font-family: SF Pro Icons;
            color: var(--btn-background-color);
          }

          .count-select {
            position: absolute;
            top: 30px;
          }
        }

        .price {
          display: flex;
          flex-direction: column;
          text-align: right;
          width: 36%;

          .price-delete-btn {
            margin-top: 12px;
            text-align: end;
            border: 0;
            background-color: transparent;

            font-size: 16px;
            font-weight: 400;
            padding: 0;
            span {
              color: var(--blue-color);
            }
          }
        }
      }
    }
  }
`;

const Backup = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  background-color: var(--blue-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;

  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--white-color);
  }

  button {
    background-color: transparent;
    border: 0;
  }
`;

const PaymentFooter = styled.div`
  margin-top: 80px;

  .payment-footer-inner {
    max-width: 75%;
    margin-inline-start: 25%;

    .price-wrap,
    .total-wrap,
    .delivery-wrap {
      display: flex;
      justify-content: space-between;
      line-height: 1.6;
    }

    .price-wrap,
    .delivery-wrap {
      font-size: 16px;
      font-weight: 400;
    }

    .total-wrap {
      font-size: 24px;
      font-weight: 700;
    }

    .top {
    }

    .middle {
      border-top: 1px solid #d2d2d7;
      margin-top: 16px;
      padding-top: 19px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      button {
        margin-top: 35px;
        width: 360px;

        border: 0;
        border-radius: var(--btn-border-radius);
        background-color: var(--btn-background-color);
        padding: 18px 15px;
        border-radius: 12px;

        span {
          color: var(--white-color);
          font-size: 16px;
        }
      }
    }
  }
`;

export interface selectedType {
  id: number;
  option: string;
  count: number;
}

export interface cartListType {
  _id: ObjectId;
  productID: string;
  optionID: string;
  mainImage: string;
  option: any;
  delivery: number;
  count: number;
  name: string;
}

interface ICheckedID {
  [index: number]: string;
  length: number;
  some: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => boolean;
  filter: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => string[];
  [Symbol.iterator](): IterableIterator<string>;
  includes(searchElement: string, fromIndex?: number): boolean;
}

interface Props {
  navCart: cartListType[] | undefined;
  setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
}

function Cart({ navCart, setNavCart }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const randomId = uuidv4().replace(/-/g, "");

  const [cookies] = useCookies(["userjwt"]);

  const [backupCartList, setBackupCartList] = useState<any>([]);
  const [isAnimating, setIsAnimating] = useState({});
  const [cartList, setCartList] = useState<cartListType[]>();
  const [payment, setPayment] = useState<number>(0);

  // count창 출력 여부
  const [showCountIndex, setShowCountIndex] = useState<number | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);

  const setCountRef = useCallback((element, index) => {
    refs.current[index] = element;
  }, []);

  console.log(navCart);

  // 유저의 로그인 상태를 확인 하면서, 장바구니를 최신화 합니다.
  useEffect(() => {
    setBackupCartList([]);

    const verifyUser = async () => {
      if (!cookies.userjwt) {
        navigate("/shop");
        return;
      }

      try {
        const res = await axios.post("/smartstore/cart/cartList", {}, { withCredentials: true });
        console.log(res.data);
        // window.scrollTo(0, 0);

        setCartList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  // 장바구니 상품 최종 결제금액
  useEffect(() => {
    const result = cartList?.reduce((acc: any, cur: any) => {
      acc += (cur.price + cur.option.optionPrice) * cur.count;
      return acc;
    }, 0);
    setPayment(result);
  }, [cartList]);

  // 컴포넌트 나가거나 새로고침 시 서버로 삭제 요청 전송
  useEffect(() => {
    const handleBeforeUnload = async () => {
      const deleteIndices = backupCartList.map((item) => item.index);
      try {
        const res = await axios.post("/smartstore/cart/delete", { indices: deleteIndices }, { withCredentials: true });
        console.log(res.data);
        const newArray = res.data.map(data => ({
          name: data.name,
          mainImage: data.mainImage,
          count: data.count
        }));

        setNavCart(newArray);
      } catch (err) {
        console.log(err);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [backupCartList]);

  const showCount = (index: number) => {
    if (showCountIndex === index) {
      setShowCountIndex(null);
      return;
    }
    setShowCountIndex(index);
    console.log(index);
  };

  const CountHandler = async (index: number, e: any) => {
    const newCount = e.target.innerHTML;
    const count = {
      index: index,
      count: newCount,
    };

    try {
      const res = await axios.post("/smartstore/cart/edit", count, { withCredentials: true });
      console.log(res.data);
      setCartList(res.data);
    } catch (err) {
      console.log(err);
    }

    setShowCountIndex(null);
  };

  // 상품 개수창 바깥 클릭시 닫기
  const handleClickOutside = (event) => {
    if (refs.current.every((ref) => ref && !ref.contains(event.target))) {
      setShowCountIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const DeleteHandler = (index: number) => {
    if (cartList) {
      const backup = cartList[index];
      setBackupCartList((prev) => [...prev, { ...backup, index }]);
      setIsAnimating((prev) => ({ ...prev, [index]: "deleting" }));

      setTimeout(() => {
        const updatedCartList = cartList.filter((_, i) => i !== index);
        setCartList(updatedCartList);
        setIsAnimating((prev) => ({ ...prev, [index]: "" }));
        setShowCountIndex(null);
      }, 600); // 애니메이션 시간이 끝난 후 삭제
    }
  };

  const CancelDeleteHandler = () => {
    if (cartList) {
      const restoreItem = backupCartList.pop();
      if (restoreItem) {
        const updatedCartList = [...cartList];
        updatedCartList.splice(restoreItem.index, 0, restoreItem);

        setIsAnimating((prev) => ({ ...prev, [restoreItem.index]: "restoring" }));
        setCartList(updatedCartList);

        setTimeout(() => {
          setIsAnimating((prev) => ({ ...prev, [restoreItem.index]: "" }));
          setBackupCartList([...backupCartList]); // Remove the restored item from the backup list
        }, 600); // 복원 애니메이션 시간이 끝난 후
      }
    }
  };

  const fulfillment = () => {
    if (cartList && cartList.length > 0) {
      navigate("../fulfillment");
    }
  };

  return (
    <CartWrapWrap className="CartWrapWrap">
      <CartWrap className="CartWrap">
        {cartList && cartList.length === 0 && backupCartList.length === 0 ? (
          <>
            <div className="large-9">
              <h1>장바구니가 비어 있습니다.</h1>
              <h2>모든 주문에 무료 배송 서비스가 제공됩니다.</h2>
              <div className="margin">
                <div className="submit-btn-wrap">
                  <button className="submit-btn" onClick={() => navigate("/shop")}>
                    <span className="text">쇼핑 계속하기</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <PaymentHeader>
              <h1>장바구니 총액: ₩{payment && payment.toLocaleString()}</h1>
              <span className="cart-message">모든 주문에 무료 배송 서비스가 제공됩니다.</span>
              <button onClick={fulfillment}>
                <span>결제</span>
              </button>
            </PaymentHeader>
            <CartList className="cart-ul" showCountIndex={showCountIndex} isDeleting={!!backupCartList}>
              {cartList &&
                cartList?.map((cart: any, index: number) => (
                  <li key={index} className={`list ${isAnimating[index]}`}>
                    <div className="list-inner">
                      <div className="image-wrap">
                        <img src={cart?.mainImage[0]} alt="" />
                      </div>
                      <div className="cart-info">
                        <div className="cart-info-top">
                          <div className="name">
                            <span>{cart.name}</span>
                            <span className="option">{cart.option.values.map((value) => value)}</span>
                          </div>
                          <div className="count">
                            <div onClick={() => showCount(index)}>
                              <span>{cart.count}</span>
                              <span className="count-icon"></span>
                            </div>
                            <div className={`count-select count-select-${index}`} ref={(element) => setCountRef(element, index)}>
                              {[...Array(9).keys()].map((i) => (
                                <div key={i} className="number" onClick={(e) => CountHandler(index, e)}>
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="price">
                            <span>₩{((cart.price + cart.option.optionPrice) * cart.count).toLocaleString()}</span>
                            <div>
                              <button className="price-delete-btn" onClick={() => DeleteHandler(index)}>
                                <span>삭제</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </CartList>
            <PaymentFooter>
              <div className="payment-footer-inner">
                <div className="top">
                  <div className="price-wrap">
                    <div>소계</div>
                    <div>₩{payment && payment.toLocaleString()}</div>
                  </div>
                  <div className="delivery-wrap">
                    <div>배송</div>
                    <div>무료</div>
                  </div>
                </div>
                <div className="middle">
                  <div className="total-wrap">
                    <div>총계</div>
                    <div>₩{payment && payment.toLocaleString()}</div>
                  </div>
                </div>
                <div className="footer">
                  <button onClick={fulfillment}>
                    <span>결제</span>
                  </button>
                </div>
              </div>
            </PaymentFooter>
          </>
        )}
      </CartWrap>
      {/* 삭제된 항목 복원 UI */}
      {backupCartList.length > 0 && (
        <Backup className={`Backup ${isAnimating}`}>
          <span>장바구니에서 {backupCartList[backupCartList.length - 1].name} 제품이 제거되었습니다.</span>
          <button onClick={CancelDeleteHandler}>
            <span>실행 취소</span>
          </button>
        </Backup>
      )}
    </CartWrapWrap>
  );
}

export default Cart;
