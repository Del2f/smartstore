import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";
import { fulfillmentIcons } from "../../styles/icons";

const FulfillmentWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
        padding: 25px 40px;
        border: 1px solid #86868b;

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
        margin-inline-start: -1px;
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
      padding: 20px 0;

      .option {
        display: flex;
        align-items: center;

        .image-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
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
          line-height: 1.5;
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
  const [fulfillmentType, setFulfillmentType] = useState<string | null>("delivery");
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
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.userjwt) {
        navigate("/shop");
      }

      try {
        const res = await axios.post("/smartstore/fulfillment", {}, { withCredentials: true });
        console.log(res.data);
        setCartList(res.data.orders);
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
        <div className="fulfillment-inner">
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
                <fulfillmentIcons.delivery></fulfillmentIcons.delivery>
                <span>배송을 원합니다</span>
              </button>
              <button className={`pickup ${fulfillmentType === "pickup" && "selected"}`} onClick={() => setFulfillmentType("pickup")}>
                <fulfillmentIcons.pickup></fulfillmentIcons.pickup>
                <span>직접 픽업하겠습니다</span>
              </button>
            </div>
          </div>
          {fulfillmentType === "delivery" && (
            <div className="result">
              <h2>재고가 있으며, 배송 준비가 끝났습니다.</h2>
              <div className="options">
                {cartList?.map((cartItem, index) => (
                  <div className="option" key={index}>
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
                    <li>표준 배송은 월요일 - 금요일 오전 08:00 - 오후 8:00 에 이루어집니다.</li>
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
          {fulfillmentType === "pickup" && (
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
