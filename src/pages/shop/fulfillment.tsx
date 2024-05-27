import axios from "../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";

const FulfillmentWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    max-width: 980px;
    width: 100%;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #d2d2d7;

    span {
      font-size: 24px;
      font-weight: 500;
    }

    .price {
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        font-weight: 300;
        color: var(--blue-color);
      }
    }
  }

  .fulfillment-type {
    border-bottom: 1px solid #d2d2d7;
    padding-bottom: 30px;

    h1 {
      letter-spacing: 0.01em;
      margin-top: 18px;
      padding: 46px 0 25px;
      text-align: center;
      font-size: 38px;
      font-weight: 700;
    }

    .button-wrap {
      display: flex;
      justify-content: center;

      button {
        background-color: transparent;
        border-color: #86868b;
        padding: 25px 40px;
        border-width: 1px;

        span {
          font-size: 16px;
          font-weight: 600;
          padding-left: 7px;
        }
      }

      .delivery {
        border-end-start-radius: 12px;
        border-start-start-radius: 12px;
      }

      .pickup {
        border-end-end-radius: 12px;
        border-start-end-radius: 12px;
      }

      .selected {
        border-color: #06c;
        border-width: 1px;
        box-shadow: inset 0 0 0 1px #06c;
        z-index: 1;
        outline: 0;
      }
    }
  }

  .result {
    margin-top: 40px;
    padding-bottom: 40px;

    h2 {
      font-size: 22px;
      font-weight: 700;
    }

    .options {
      margin-top: 40px;
      .option {
        display: flex;

        .image-wrap {
          width: 80px;
          height: 80px;

          img {
            width: 100%;
          }
        }

        .product-names {
          display: flex;
          flex-direction: column;
          padding-left: 20px;
          font-size: 14px;
          font-weight: 300;
        }
      }
    }

    .delivery-result {
      display: flex;
      justify-content: center;
      flex-direction: row;
      border-bottom: 1px solid #d2d2d7;
      padding-bottom: 40px;

      .left {
        h2 {
          font-size: 16px;
          font-weight: 500;
        }
        h3 {
          font-size: 16px;
          font-weight: 600;
        }

        span {
          font-size: 16px;
          font-weight: 400;
        }
        h4 {
          font-size: 12px;
          font-weight: 400;
          margin-top: 5px;
        }
        flex-basis: 50%;

        .left-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border: 2px solid #0071e3;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;

          span {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }

      .right {
        flex-basis: 50%;
        margin-left: 40px;
        margin-top: 40px;

        h3 {
          font-size: 15px;
          margin-left: 10px;
          font-weight: 600;
        }

        ul {
          li {
            list-style-type: disc;
            margin-top: 6px;
            margin-inline-start: 15px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6;
          }
        }
      }
    }

    .result-btn-wrap {
      display: flex;
      padding-bottom: 30px;
      padding-top: 39px;

      .enabled {
        opacity: 1;
      }

      .disabled {
        opacity: 0.32;
      }

      button {
        flex-basis: 50%;
        border: 0;
        border-radius: var(--btn-border-radius);
        background-color: var(--btn-background-color);
        padding: 20px 15px;

        span {
          color: var(--white-color);
          font-size: 15px;
        }
      }
    }
  }
`;

function Fulfillment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

  const [cartList, setCartList] = useState<cartListType[]>();
  const [payment, setPayment] = useState<number>(0);
  const [fulfillmentType, setFulfillmentType] = useState<string | null>('delivery');
  console.log(fulfillmentType);

  // 장바구니 상품 최종 결제금액
  useEffect(() => {
    const result = cartList?.reduce((acc: any, cur: any) => {
      acc += (cur.price + cur.option.optionPrice) * cur.count;
      return acc;
    }, 0);
    setPayment(result);
  }, [cartList]);

  // 유저의 로그인 상태를 확인 하면서, 장바구니를 최신화 합니다.
  useLayoutEffect(() => {
    const verifyUser = async () => {
      if (!cookies.userjwt) {
        navigate("/shop");
      }

      try {
        const res = await axios.post("/smartstore/fulfillment", {}, { withCredentials: true });
        console.log(res.data);
        setCartList(res.data.cart);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const shippingBtn = () => {
    if (fulfillmentType === null) { 
      return;
    }

    navigate("/shop/shipping");
  };

  return (
    <>
      <FulfillmentWrap>
        <div className="inner">
          <header>
            <div>
              <span>결제</span>
            </div>
            <div className="price">
              <span>주문 요약 정보 표시: </span>
              <span>₩{payment && payment.toLocaleString()}</span>
            </div>
          </header>
          <div className="fulfillment-type">
            <h1>주문하신 제품을 어떻게 받으시겠습니까?</h1>
            <div className="button-wrap">
              <button className={`delivery ${fulfillmentType === "delivery" && "selected"}`} onClick={() => setFulfillmentType("delivery")}>
                <svg
                  viewBox="0 0 35 35"
                  className="as-svgicon as-svgicon-shipping as-svgicon-base as-svgicon-shippingbase"
                  role="img"
                  aria-hidden="true"
                  width="35px"
                  height="35px"
                >
                  <path fill="none" d="M0 0h35v35H0z"></path>
                  <path d="m27.687 10.547-9-4.852a2.5 2.5 0 0 0-2.373 0l-9 4.852A2.5 2.5 0 0 0 6 12.748v9.471a2.494 2.494 0 0 0 1.313 2.2l9 4.852a2.5 2.5 0 0 0 2.373 0l9-4.852a2.5 2.5 0 0 0 1.314-2.2v-9.471a2.5 2.5 0 0 0-1.313-2.201Zm-10.9-3.971a1.5 1.5 0 0 1 1.424 0l9 4.852c.041.022.072.055.11.081l-4.41 2.507-9.628-5.55Zm-4.538 2.446 9.651 5.566-4.4 2.5-9.823-5.58c.038-.026.07-.059.111-.081ZM7.788 23.539A1.5 1.5 0 0 1 7 22.219v-9.471a1.494 1.494 0 0 1 .069-.436L17 17.957v10.516a1.494 1.494 0 0 1-.212-.082ZM28 22.219a1.5 1.5 0 0 1-.788 1.32l-9 4.851a1.481 1.481 0 0 1-.212.082V17.957l9.931-5.646a1.5 1.5 0 0 1 .069.436Z"></path>
                </svg>
                <span>배송을 원합니다</span>
              </button>
              <button className={`pickup ${fulfillmentType === "pickup" && "selected"}`} onClick={() => setFulfillmentType("pickup")}>
                <svg
                  viewBox="0 0 35 35"
                  className="as-svgicon as-svgicon-applestorepickup as-svgicon-base as-svgicon-applestorepickupbase"
                  role="img"
                  aria-hidden="true"
                  width="35px"
                  height="35px"
                >
                  <path fill="none" d="M0 0h35v35H0z"></path>
                  <path d="M25.5 7h-2.529a5.493 5.493 0 0 0-10.942 0H9.5A3.5 3.5 0 0 0 6 10.5v15A3.5 3.5 0 0 0 9.5 29h16a3.5 3.5 0 0 0 3.5-3.5v-15A3.5 3.5 0 0 0 25.5 7Zm-8-4a4.488 4.488 0 0 1 4.446 4h-8.892A4.488 4.488 0 0 1 17.5 3ZM28 25.5a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 7 25.5v-15A2.5 2.5 0 0 1 9.5 8h16a2.5 2.5 0 0 1 2.5 2.5Z"></path>
                  <path d="M20.272 17.075a2.326 2.326 0 0 1 1.078-1.94 2.348 2.348 0 0 0-2-1c-.759 0-1.375.463-1.782.463s-.968-.441-1.65-.441a2.719 2.719 0 0 0-2.541 3.021 6.311 6.311 0 0 0 1.056 3.363c.506.717.946 1.29 1.584 1.29s.9-.419 1.672-.419c.8 0 .968.408 1.661.408s1.155-.628 1.584-1.246a4.733 4.733 0 0 0 .693-1.444 2.215 2.215 0 0 1-1.355-2.055ZM17.621 14.021A1.966 1.966 0 0 0 19 13.294a2.328 2.328 0 0 0 .528-1.422 1.076 1.076 0 0 0-.011-.2 2.19 2.19 0 0 0-1.485.772 2.26 2.26 0 0 0-.561 1.378c0 .077.011.154.011.187.04.001.084.012.139.012Z"></path>
                </svg>
                <span>직접 픽업하겠습니다</span>
              </button>
            </div>
                  </div>
                  {fulfillmentType === 'delivery' && (
                    <div className="result">
                        <h2>재고가 있으며, 배송 준비가 끝났습니다.</h2>
                        <div className="options">
                        {cartList?.map((cartItem) => (
                            <div className="option">
                            <div className="image-wrap">
                                <img src={cartItem.mainImage} alt="" />
                            </div>
                            <div className="product-names">
                                <span>{cartItem.name}</span>
                                {cartItem.count > 1 && <span>수량: {cartItem.count}</span>}
                            </div>
                            </div>
                        ))}
                        </div>
                        <div className="delivery-result">
                        <div className="left">
                            <h2>배송 방법:</h2>
                            <label className="left-btn">
                            <div>
                                <h3>익일</h3>
                                <h4>표준 배송</h4>
                            </div>
                            <div>
                                <span>무료</span>
                            </div>
                            </label>
                        </div>
                        <div className="right">
                            <h3>유의해야 할 점:</h3>
                            <ul>
                            <li>배송업체에서 배송 시 서명을 받을 수도 있습니다.</li>
                            <li>표준 배송은 월요일-금요일 오전 08:00-오후8:00에 이루어집니다.</li>
                            </ul>
                        </div>
                        </div>
                        <div className="result-btn-wrap">
                        <button className={`result-btn ${fulfillmentType === null ? "disabled" : "enabled"}`} onClick={shippingBtn}>
                            <span>배송 주소까지 계속</span>
                        </button>
                        </div>
                    </div>
                  )}
                  {fulfillmentType === 'pickup' && (
                    <div className="result">
                        <h2>구현중</h2>
                    </div>
                  )}
        </div>
      </FulfillmentWrap>
    </>
  );
}

export default Fulfillment;
