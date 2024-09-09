import axios from "../../api/axios";
import styled, { css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import CheckBox from "../../components/CheckBox2";

const ReviewWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .arrow-right {
    padding: 0;
    margin-top: 15px;
    color: #0066cc;
  }

  .arrow-right::after {
    top: -1px;
  }

  .header-wrap {
    margin-bottom: 50px;
    margin-top: 63px;

    h1 {
      font-size: 40px;
      font-weight: 600;
    }

    h2 {
      font-size: 32px;
      font-weight: 600;
      margin-top: 30px;
    }
  }

  .cart-wrap {
    .cart-inner {
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
    }
  }

  .details-wrap {
    display: flex;
    padding: 60px 0;
    border-bottom: 1px solid #d2d2d7;

    h2 {
      font-size: 24px;
      font-weight: 600;
    }

    h3 {
      font-size: 17px;
      font-weight: 600;
    }

    .first {
      flex-basis: 25%;
      max-width: 25%;
    }
    .second {
      flex-basis: 75%;
      max-width: 75%;
    }

    h3,
    .address,
    .contact {
      line-height: 1.6;
    }

    .address-wrap {
      h2 {
        font-size: 17px;
        font-weight: 400;
        font-weight: 600;
        line-height: 1.6;
        margin-top: 50px;
        margin-bottom: 10px;
      }

      .address {
        span {
          padding-right: 5px;
        }
      }
    }
  }

  .agree-wrap {
    padding: 60px 0;
    border-bottom: 1px solid #d2d2d7;

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 45px;
    }
  }

  .result-btn-wrap {
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    max-width: 50%;

    @media only screen and (max-width: 833px) {
      max-width: 100%;
    }

    button {
      display: flex;
      justify-content: center;
      border: 0;
      border-radius: 12px;
      height: auto;
      background-color: var(--btn-background-color);

      span {
        color: var(--white-color);
        font-size: 17px;
        font-weight: 400;
      }
    }
  }
`;

const CartList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .count-select {
    display: none;
    width: 80px;
  }

  li {
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

const PaymentFooter = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 600;
    padding-top: 39px;
  }

  .payment-footer-inner {
    margin-top: 41px;
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
  }
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 30px;
    padding-top: 39px;

    .large-4 {
      margin-inline-start: auto;
    }

    button {
      width: 100%;
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

    .caption {
      padding-top: 14px;
      font-size: 12px;
      font-weight: 400;

      span {
        line-height: 1.4;
      }
    }
  }
`;

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["userjwt"]);
  const [user, setUser] = useState<any>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});

  const [cartList, setCartList] = useState<any>();
  const [payment, setPayment] = useState<number>(0);
  const [isAgree, setIsAgree] = useState<boolean | null>(null);
  const [agreeMessage, setAgreeMessage] = useState<string>(
    "Apple 개인정보 취급방침에 따라 개인정보를 수집하고, 사용하고, 제3자에 제공하고, 처리한다는 점에 동의합니다."
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>();

  console.log(data);

  useEffect(() => { 
    setVisible(true); // 컴포넌트가 마운트될 때 visible을 true로 설정
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/smartstore/review", { withCredentials: true });
        setData(res.data);

        setCartList(res.data.orders);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // 장바구니 상품 최종 결제금액
  useEffect(() => {
    const result = cartList?.reduce((acc: any, cur: any) => {
      acc += (cur.price + cur.option.optionPrice) * cur.count;
      return acc;
    }, 0);
    setPayment(result);
  }, [cartList]);

  useEffect(() => {
    if (isAgree) {
      setErrorMessage("");
    }
  }, [isAgree]);

  // 오늘 날짜로부터 이틀 후 날짜를 계산
  const today = new Date();
  let twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);

  // 요일 배열
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  // 출고 날짜 조정
  const orderDay = today.getDay();
  if (orderDay === 5 || orderDay === 6 || orderDay === 0) {
    // 금요일, 토요일, 일요일인 경우
    const daysToAdd = 8 - orderDay; // 월요일까지 남은 일 수 계산
    twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + daysToAdd);
  }

  // 날짜를 "요일 YYYY/MM/DD" 포맷으로 변환
  const formattedDate = `${weekdays[twoDaysLater.getDay()]} ${twoDaysLater.getFullYear()}/${String(twoDaysLater.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(twoDaysLater.getDate()).padStart(2, "0")}`;

  function maskEmail(email: string) {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return email; // localPart가 너무 짧아서 마스킹하지 않음
    }
    const maskedLocalPart = `${localPart[0]}*****${localPart[localPart.length - 1]}`;
    return `${maskedLocalPart}@${domain}`;
  }

  function maskPhone(phone: string) {
    if (!phone) return "";
    const generateRepeatedString = (str, count) => {
      return str.repeat(count);
    };
    const result = generateRepeatedString("*", phone.length - 2);

    const last = phone.slice(-2);
    const maskedLocalPart = `${result}${last}`;
    return `${maskedLocalPart}`;
  }

  const errorhandle = () => {
    setIsAgree(false);
    setErrorMessage("이 주문에 관한 Apple의 개인정보처리방침을 읽고 귀하의 개인정보처리에 관해 동의하여 주십시오.");
  };

  const submit = async () => {
    if (!isAgree) {
      errorhandle();
    } else {
      try {
        const res = await axios.post("/smartstore/reviewfinish", data, { withCredentials: true });
        console.log(res.data);
        navigate("/shop/finish", { state: { orderData: res.data } });
      } catch (errors) {
        console.log(errors);
      }
    }
  };

  return (
    <ReviewWrap>
      <div className="checkout-inner">
        <header>
          <div>
            <span>결제</span>
          </div>
        </header>
        <div className={`contents ${visible ? "visible" : ""}`}>
          <div className="header-wrap">
            <h1>주문하시겠습니까?</h1>
            <h1>입력하신 사항이 모두 정확한지 확인해주십시오.</h1>
            <h2>출고: {formattedDate}</h2>
          </div>
          <CartList className="cart-ul">
            {cartList &&
              cartList?.map((cart: any, index: number) => (
                <li key={index} className={`list`}>
                  <div className="list-inner">
                    <div className="image-wrap">
                      <img src={cart?.product.mainImage[0]} alt="" />
                    </div>
                    <div className="cart-info">
                      <div className="cart-info-top">
                        <div className="name">
                          <span>{cart.name}</span>
                          <span className="option">{cart.option.values.map((value) => value)}</span>
                        </div>
                        <div className="count">
                          <div>
                            <span>{cart.count}</span>
                          </div>
                        </div>
                        <div className="price">
                          <span>₩{((cart.price + cart.option.optionPrice) * cart.count).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </CartList>
          <div className="details-wrap">
            <div className="first">
              <h2>배송 상세 정보</h2>
              <button className="arrow-right">변경</button>
            </div>
            <div className="second flex">
              <div className="large-6">
                <h3>배송지</h3>
                <div className="address-wrap">
                <div className="address">
              <span>{user && (user.subaddress?.receiver || user.address?.receiver)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.state || user.address?.state)}</span>
              <span>{user && (user.subaddress?.cities || user.address?.cities)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.zipcode || user.address?.zipcode)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.street || user.address?.street)}</span>
              <span>{user && (user.subaddress?.accesscode || user.address?.accesscode)}</span>
            </div>
                </div>
              </div>
              <div className="large-6">
                <h3>연락처 정보:</h3>
                <div className="contact">{user && maskEmail(user.email2)}</div>
                <div className="contact">{user && maskPhone(user.phone)}</div>
              </div>
            </div>
          </div>
          <div className="details-wrap">
            <div className="first">
              <h2>결제 상세 정보</h2>
              <button className="arrow-right">변경</button>
            </div>
            <div className="second flex">
              <div className="large-6">
                <h3>결제 수단:</h3>
                <div className="address-wrap">
                  <div className="address">
                    <span>신용 카드</span>
                  </div>
                </div>
              </div>
              <div className="large-6">
          <div className="address-wrap">
            <h3>청구 주소:</h3>
            <div className="address">
              <span>{user && (user.subaddress?.receiver || user.address?.receiver)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.state || user.address?.state)}</span>
              <span>{user && (user.subaddress?.cities || user.address?.cities)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.zipcode || user.address?.zipcode)}</span>
            </div>
            <div className="address">
              <span>{user && (user.subaddress?.street || user.address?.street)}</span>
              <span>{user && (user.subaddress?.accesscode || user.address?.accesscode)}</span>
            </div>
          </div>
              </div>
            </div>
          </div>
          <div className="agree-wrap">
            <h2>이용 약관</h2>
            <div>
              <CheckBox isState={isAgree} setIsState={setIsAgree} message={agreeMessage}></CheckBox>
            </div>
            <div className={`${isAgree !== null && !isAgree ? "error-message-active" : ""}`}>
              <span>{errorMessage}</span>
            </div>
          </div>
          <PaymentFooter>
            <h2>총계</h2>
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
            </div>
            <div className="footer">
              <div className="large-4">
                <button onClick={submit}>
                  <span>KG이니시스로 계속 진행</span>
                </button>
                <div className="caption">
                  <span>
                    'KG 이니시스로 계속 진행'을 클릭하면 구입건에 판매 약관이 적용되고 Apple에서 송장을 이메일로 보내 드린다는 데 동의한 것으로
                    간주됩니다.
                  </span>
                </div>
              </div>
            </div>
          </PaymentFooter>
        </div>
      </div>
    </ReviewWrap>
  );
}

export default Review;
