import axios from "../../api/axios";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import { citiesType } from "../../types/cities";
import citiesJson from "../../cities.json";
import CheckBox from "../../components/CheckBox2";
import address from "../../pages/shop/Shipping";

interface Type {
  // type: string;
  // isInputAnimation: boolean;
}

const OrdersListEditPage = styled.div<Type>`
  position: fixed;
  top: 0;
  background: #0000007a;
  backface-visibility: visible;
  height: 100%;
  z-index: 5;
  width: 100%;

  .padding-left {
    padding-left: 20px;
  }

  .select {
    border: 1px solid #86868b;
    border-radius: 12px;
  }

  .inner-wrap {
    background: #0000;
    padding: 0;
    margin: auto;
    max-width: 816px;

    .maxwidth {
      flex-basis: 75%;
      max-width: 75%;
      width: 100%;
    }

    .inner {
      position: relative;
      background: #fff;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0px;
      padding: 60px 0 40px;
      justify-content: center;

      .left {
        padding-inline-end: 0.4117647059rem;
      }

      .right {
        padding-inline-start: 0.4117647059rem;
      }

      .title-wrap {
        flex-basis: 100%;
        max-width: 100%;

        h2 {
          font-size: 36px;
          font-weight: 700;
          text-align: center;
          padding: 10px 0 40px;
          line-height: 1.2;
        }
      }

      .margin {
        margin-bottom: 0px;
      }

      .list {
        margin-bottom: 15px;
      }

      .normal-blue-btn {
        width: 100%;
        padding: 30px 20px;

        .text {
          font-size: 17px;
          font-weight: 400;
        }
      }

      .cancel-btn {
        display: flex;
        justify-content: center;
        color: #06c;
        width: 100%;
        padding: 30px 20px;
        .text {
          cursor: pointer;
        }
      }

      .arrow {
        top: 27px;
      }

      .input-wrap {
        flex-direction: column;
        align-items: flex-start;
        box-sizing: content-box;

        .select-wrap {
          position: relative;
          width: 100%;
        }
      }

      .error-message-active {
        width: 100%;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    align-self: flex-end;
    padding: 0;
    cursor: pointer;
    height: 44px;
    justify-content: center;
    margin-inline-end: 20px;
    margin-top: 20px;
    order: -1;
    width: 44px;
    z-index: 1;
    border: 0;
    background: none;

    span {
      align-items: center;
      background: #e8e8ed;
      border-radius: 50%;
      color: #6e6e73;
      display: flex;
      height: 36px;
      outline: none;
      position: relative;
      transition: color 0.1s linear, background 0.1s linear;
      width: 36px;

      svg {
        fill: currentColor;
        height: 20px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 20px;
      }
    }
  }
`;

interface Props {
  type: number;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setData: any;
  setRowData: any;
}

export interface AddressEditRef {
  allErrorHandle: () => void;
}

const OrdersListEdit = ({ type, isShow, setIsShow, data, setData, setRowData }: Props) => {
  console.log(data);

  const statusMessages = {
    0: "주문 접수",
    1: "처리 중",
    2: "출고 준비중",
    3: "출고됨",
    4: "배송됨",
  };
  
  const getStatusMessage = (type) => {
    return (
      <>
        {statusMessages[type]}을(를) {statusMessages[type + 1]}으로
        <br />
         변경 하시겠습니까?
      </>
    );
  };

  const submit = async () => {
    console.log('submit');
    try {
      const res = await axios.post("/smartstore/home/orders/edit", { type, data }, { withCredentials: true });
      console.log(res.data);

      setRowData(res.data.orders);
      setIsShow(false);
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <OrdersListEditPage>
      <div className="inner-wrap">
        <div className="inner">
          <div className="maxwidth">
            <button type="button" className="close-btn" onClick={() => setIsShow(!isShow)}>
              <span>
                <svg width="21" height="21" role="img" aria-hidden="true">
                  <path fill="none" d="M0 0h21v21H0z"></path>
                  <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
            <div className="title-wrap">
              <h2>{getStatusMessage(type)}</h2>
            </div>
            <button className="normal-blue-btn" onClick={submit}>
              <span className="text">확인</span>
            </button>
            <div className="cancel-btn" onClick={() => setIsShow(!isShow)}>
              <span className="text">취소</span>
            </div>
          </div>
        </div>
      </div>
    </OrdersListEditPage>
  );
};

export default OrdersListEdit;
