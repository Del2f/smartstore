import axios from "../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";

const ShippingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 50%;
    height: 83px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #86868b;
    background-color: transparent;
    border-radius: 12px;
    padding: 20px;
    margin-top: 20px;

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
  }

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

  h1 {
    letter-spacing: 0.01em;
    margin-top: 18px;
    padding: 46px 0 25px;
    text-align: left;
    font-size: 38px;
    font-weight: 700;
  }

  .address {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 40px;
    padding-bottom: 40px;

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
      text-align: left;
    }

    .selected {
      border: 2px solid #0071e3;
    }
  }

  .contact {
    .selected {
      border: 2px solid #0071e3;
    }

    button {
      position: relative;
      height: 60px;

      span {
        position: absolute;
        top: 10px;
        color: #86868b;

        font-size: 11px;
        font-weight: 300;
      }

      input {
        margin-top: 15px;
        width: 100%;
        border: 0;
        outline: 0;
      }
    }
  }

  .result-btn-wrap {
    display: flex;
    padding-bottom: 30px;
    padding-top: 39px;

    button {
      display: flex;
      justify-content: center;
      border: 0;
      border-radius: 12px;
      height: auto;
      background-color: var(--btn-background-color);

      span {
        color: var(--white-color);
        font-size: 15px;
      }
    }
  }
`;

function Shipping() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

  const [cartList, setCartList] = useState<cartListType[]>();
  const [payment, setPayment] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  const [addressType, setAddressType] = useState<string | null>("default");
  const [selectedBtn, setSelectedBtn] = useState<string | null>("");

  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  console.log(user);

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
        const res = await axios.post("/smartstore/shipping", {}, { withCredentials: true });
        setCartList(res.data.cart);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const emailChange = (e) => {
    const { value } = e.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    setIsEmail(emailPattern.test(value));
  };

  const phoneChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setPhone(numericValue);
    setIsPhone(true);
  };

  return (
    <>
      <ShippingWrap>
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
          <h1>주문하신 제품을 어떻게 받으시겠습니까?</h1>
          <div className="address">
            <h2>주소 선택:</h2>
            <button className={`address-btn ${addressType === "default" && "selected"}`} onClick={() => setAddressType("default")}>
              <div>
                <h3>{user && user?.name}</h3>
                <h4>{user && user?.address}</h4>
              </div>
              <div>
                <span>기본값</span>
              </div>
            </button>
            {/* 새로운 주소 미구현 */}
            {/* <button className="address-btn">
              <div>
                <h3>새 주소 사용</h3>
              </div>
            </button> */}
          </div>
          <div className="contact">
            <h2>연락처 정보를 알려주십시오.</h2>
            <button className={`address-btn ${selectedBtn === "email" && "selected"}`} onClick={() => setSelectedBtn("email")}>
              <span>이메일 주소</span>
              <input type="text" value={email} onChange={emailChange} />
            </button>
            <button className={`address-btn ${selectedBtn === "phone" && "selected"}`} onClick={() => setSelectedBtn("phone")}>
              <span>휴대폰 번호</span>
              <input type="text" value={phone} onChange={phoneChange} />
            </button>
          </div>
          <div className="result-btn-wrap">
            <button className="result-btn">
              <span>주문 검토</span>
            </button>
          </div>
        </div>
      </ShippingWrap>
    </>
  );
}

export default Shipping;
