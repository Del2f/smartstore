import axios from "../../api/axios";
import styled, { css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import CheckBox from "../../components/CheckBox2";
import { cartListType } from "./Cart";


const FinishWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f7;

  .header-wrap {
    text-align: center;
    padding: 150px 0;

    h1 {
      font-size: 40px;
      font-weight: 600;
    }

    h3 {
      font-size: 18px;
      font-weight: 500;
      margin-top: 30px;
    }
    
    .email{
      margin-top: 10px;
      font-weight: 600;
      font-family: SF Pro KR, SF Pro Text, SF Pro Icons, SF Pro Display;
    }

    .ordernumber{
      margin-top: 30px;
      color: #06c;
      font-weight: 500;
    }
  }
`;

interface Props {
  setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
  }

function Finish({ setNavCart }:Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["userjwt"]);
  const [user, setUser] = useState<any>(null);

  const [visible, setVisible] = useState<boolean>(false);

  const { orderData } = location.state || {};

  console.log(orderData);

  useEffect(() => {
    setVisible(true); // 컴포넌트가 마운트될 때 visible을 true로 설정
    setNavCart([]);
  }, []);

  useEffect(() => {
    if (!orderData) {
      navigate("/shop", { replace: true }); // orderData가 없으면 /shop으로 리디렉션하고 히스토리 교체
    }
  }, [navigate, orderData]);

  // 뒤로 가기 이벤트를 막는 처리
  useEffect(() => {
    const handleBackNavigation = (event: PopStateEvent) => {
      event.preventDefault();
      navigate("/shop"); // 뒤로가기 시 /shop 페이지로 이동
    };

    window.history.pushState({}, "", window.location.pathname); // 빈 객체를 전달하여 타입 호환성 문제 해결

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  return (
    <FinishWrap>
      <div className="checkout-inner">
        <div className={`contents ${visible ? "visible" : ""}`}>
          <div className="header-wrap">
            <h1>모든 준비가 완료되었습니다.</h1>
            <h3>확인 내역 및 배송 관련 업데이트를 다음 연락처로 보내드리겠습니다.</h3>
            <div className="email">
              <span>{orderData && orderData.email}</span>
            </div>
            <div className="ordernumber">
              <span>주문번호: {orderData && orderData.orderNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </FinishWrap>
  );
}

export default Finish;
