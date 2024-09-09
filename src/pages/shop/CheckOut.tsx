import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";
import AddressEdit, { AddressEditRef } from "../../components/AddressEdit";
import AddressList from "../../components/AddressList";

const CheckOutWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .header-wrap {
    margin-bottom: 50px;
    margin-top: 63px;

    h1 {
      font-size: 40px;
      font-weight: 600;
    }
  }

  .selector-wrap {
    padding-bottom: 100px;
    border-bottom: 1px solid #d2d2d7;

    .selector {
      display: flex;
      align-items: center;
      border: 2px solid #0071e3;
      padding: 14px;
      border-radius: 12px;
      flex-basis: 50%;
      max-width: 50%;
      min-height: 4.8823529412rem;

      span {
        font-weight: 600;
      }
    }
  }

  .address-wrap {
    padding-bottom: 50px;
    border-bottom: 1px solid #d2d2d7;

    h2 {
      font-size: 17px;
      font-weight: 400;
      font-weight: 600;
      line-height: 1.6;
      margin-top: 50px;
      margin-bottom: 10px;
    }

    .address {
      line-height: 1.5;

      span {
        padding-right: 5px;
      }
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

function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["userjwt"]);
  const [user, setUser] = useState<any>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});

  const [cartList, setCartList] = useState<cartListType[]>();
  const [payment, setPayment] = useState<number>(0);

  console.log(selectedAddress);

  useEffect(() => {
    setVisible(true); // 컴포넌트가 마운트될 때 visible을 true로 설정
  }, []);

  useEffect(() => {
    const result = cartList?.reduce((acc: any, cur: any) => {
      acc += (cur.price + cur.option.optionPrice) * cur.count;
      return acc;
    }, 0);
    setPayment(result);
  }, [cartList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/smartstore/checkout", { withCredentials: true });
        console.log(res);
        setCartList(res.data.orders);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     const selected = user.address.find((addr) => addr.selected);
  //     setSelectedAddress(selected);
  //   }
  // }, [user]);

  const submit = () => {
    navigate("/shop/review");
  };

  return (
    <CheckOutWrap>
      <div className="checkout-inner">
        <header>
          <div>
            <span>결제</span>
          </div>
          <div className="price">
            <span>주문 요약 정보 표시: </span>
            <span>₩{payment && payment.toLocaleString()}</span>
          </div>
        </header>
        <div className={`contents ${visible ? "visible" : ""}`}>
          <div className="header-wrap">
            <h1>어떻게 결제하시겠습니까?</h1>
          </div>
          <div className="selector-wrap">
            <div className="selector">
              <span>신용 카드 또는 직불 카드, 할부</span>
            </div>
          </div>
          <div className="address-wrap">
            <h2>청구 주소</h2>
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
        <div className="result-btn-wrap">
          <button className="form-button" onClick={submit}>
            <span>주문 검토</span>
          </button>
        </div>
      </div>
    </CheckOutWrap>
  );
}

export default CheckOut;
