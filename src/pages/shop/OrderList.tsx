import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";
import AddressEdit from "../../components/AddressEdit";
import ContactEdit from "../../components/ContactEdit";
import AddressList from "../../components/AddressList";

const OrderListWrap = styled.div`
  .arrow-right {
    display: block;
    color: #0066cc;
    font-size: 12px;
    font-weight: 300;
    padding-left: 0;
    margin-top: 10px;
  }

  button::after {
  }

  h2 {
    font-size: 32px;
    font-weight: 600;
  }

  .inner {
    max-width: 980px;
    width: 100%;
  }

  header {
    background-color: #f5f5f7;
    padding-bottom: 28px;

    .header-inner {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: auto;
      width: 100%;
      max-width: 1030px;
      padding: 0 20px;

      .header-top {
        width: 100%;
        height: 52px;
        border-bottom: 1px solid #cececf;
      }

      span {
        font-size: 21px;
        font-weight: 600;
        color: #000;
      }
    }

    .orders-wrap {
      width: 100%;
      margin-top: 30px;

      .order {
        display: flex;
        flex-direction: row;
        margin: auto;
        border-radius: 20px;
        background-color: white;
        margin-bottom: 15px;
        max-height: 300px;
      }

      .image-wrap-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 50%;
        margin: 0 50px;
      }

      .image-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
        padding: 20px;
        max-width: 300px;
        min-height: 300px;

        img {
          width: 100%;
          max-height: 100%;
          /* height: 100%; */
        }
      }

      .text-wrap {
        width: 100%;
        padding: 40px 0px;
        flex-basis: 50%;

        .month {
        }

        .day {
          font-size: 32px;
          font-weight: 600;
        }

        .status-wrap {
          font-weight: 600;
        }

        .product-name-wrap {
          margin-top: 10px;

          h3 {
            margin-top: 20px;
          }
        }

        .order-details {
          margin-top: 15px;
        }

        .arrow-btn {
          margin-top: 20px;
        }
      }
    }

    h1 {
      display: block;
      width: 100%;
      font-size: 32px;
      font-weight: 600;
      padding-top: 59px;
    }
  }

  .orders-null {
    width: 100%;

    h1 {
      font-size: 40px;
      font-weight: 600;
      margin: 86px 0 54px;
    }

    h3 {
      font-size: 17px;
      font-weight: 400;
    }
  }

  .order-favorite-wrap {
    display: flex;
    justify-content: center;
    padding: 50px 25px;
    gap: 20px;
    max-width: 1030px;
    margin: auto;

    .order,
    .favorite {
      background-color: #f5f5f7;
      border-radius: 18px;
      max-width: 475px;
      flex-basis: 475px;
      padding: 40px 42px;

      p {
        padding: 20px 0;
        line-height: 1.58;
      }

      button {
        font-size: 16px;
      }
      button:after {
        font-size: 20px;
      }
    }
  }

  .account-setting-wrap {
    max-width: 1030px;
    padding: 50px 25px;
    margin: auto;

    .inner {
      display: flex;
      flex-direction: column;

      .options {
        min-height: 150px;
      }

      h2 {
        margin-bottom: 47px;
      }

      h3 {
        font-size: 24px;
        font-weight: 600;
      }

      h4 {
        font-weight: 600;
        line-height: 1.58;
      }

      button {
        font-size: inherit;
      }

      .column {
        flex-basis: 25%;
        max-width: 25%;

        .address {
          line-height: 1.6;
        }
      }
    }
  }
`;

interface Props {
  logOut: (e) => void;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function OrderList({ logOut, setIsDarkMode }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["userjwt"]);

  const [ordersList, setOrdersList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);

  // 유저의 로그인 상태를 확인
  useEffect(() => {
    const verifyUser = async () => {
      setIsDarkMode(false);

      if (!cookies.userjwt) {
        navigate("/shop");
        return;
      }

      try {
        const res = await axios.post("/smartstore/shipping", {}, { withCredentials: true });

        setUser(res.data.user);
        setOrdersList(res.data.user.orders);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

  const statusMessages = {
    0: "주문 접수",
    1: "처리 중",
    2: "출고 준비중",
    3: "출고됨",
    4: "배송됨",
  };

  const ordersdetail = (id) => {
    navigate("/shop/ordersdetail", { state: { id } });
  };

  return (
    <>
      <OrderListWrap>
        <header>
          <div className="header-inner">
            {ordersList.length >= 1 ? (
              <>
                <div className="header-top flex flex-ju-bt flex-align-center">
                  <span>계정</span>
                  <button className="arrow-right" onClick={logOut}>
                    로그아웃
                  </button>
                </div>
                <h1>{user && user.name} 님, 안녕하세요.</h1>
                <div className="orders-wrap">
                  {ordersList &&
                    ordersList.map((list, index) => {
                      const lastUpdateStatus = list.update.length > 0 ? list.update[list.update.length - 1].status : null;
                      const statusMessage = statusMessages[lastUpdateStatus] || "상태 없음";

                      // 날짜 문자열에서 월과 일을 추출
                      const date = new Date(list.date);
                      const month = date.toLocaleString("ko-KR", { month: "long" }); // "7월" 형태로 출력
                      const day = date.getDate(); // 일만 추출

                      // list.update 배열의 가장 마지막 요소의 date를 추출
                      const lastUpdate = list.update.length > 0 ? new Date(list.update[list.update.length - 1].date) : null;
                      const lastUpdateFormatted = lastUpdate
                        ? `${lastUpdate.toLocaleString("ko-KR", { month: "long" })} ${lastUpdate.getDate()}일`
                        : "날짜 없음";

                      return (
                        <div key={index} className="order">
                          <div className="image-wrap-wrap">
                            <div className="image-wrap">
                              <img src={list.orders[0].product.mainImage} alt="" />
                            </div>
                          </div>
                          <div className="text-wrap">
                            <h3>{month}</h3>
                            <h3 className="day">{day}</h3>
                            <div className="order-details">
                              <div className="status-wrap">
                                <span>{statusMessage} </span>
                                <span>{lastUpdateFormatted}</span>
                              </div>
                              <div className="product-name-wrap">
                                <h3>
                                  {list.orders[0].product.name}
                                  {list.orders.length > 1 ? ` 외 ${list.orders.length - 1}가지의 상품` : null}
                                </h3>
                              </div>
                            </div>
                            <button className="arrow-btn" onClick={() => ordersdetail(list._id)}>
                              세부 정보 보기
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <div className="orders-null">
                <h1>주문하신 제품.</h1>
                <h3>주문하신 상품이 없습니다.</h3>
              </div>
            )}
          </div>
        </header>
      </OrderListWrap>
    </>
  );
}

export default OrderList;
