import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";
import AddressEdit from "../../components/AddressEdit";
import ContactEdit from "../../components/ContactEdit";
import AddressList from "../../components/AddressList";

const AccountWrap = styled.div`
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
}

function Account({ logOut }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["userjwt"]);

  const [cartList, setCartList] = useState<cartListType[]>();
  const [ordersList, setOrdersList] = useState<any>([]);
  const [payment, setPayment] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [isAddressGet, setIsAddressGet] = useState<boolean>(false);
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
  const [isAddressEdit, setIsAddressEdit] = useState<boolean>(false);
  const [isAddressList, setIsAddressList] = useState<boolean>(false);
  const [isContackEdit, setIsContackEdit] = useState<boolean>(false);

  // console.log(ordersList);

  // 유저의 로그인 상태를 확인
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.userjwt) {
        navigate("/shop");
        return;
      }

      try {
        const res = await axios.post("/smartstore/shipping", {}, { withCredentials: true });
        console.log(res);

        setCartList(res.data.carts);
        setUser(res.data.user);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setOrdersList(res.data.user.orders);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

  const addressSave = (type) => {
    setIsAddressEdit(!isAddressEdit);
    setIsAddressGet(false);

    if (type === "edit") {
      setIsAddressGet(true);
      setIsNewAddress(false);
    }

    if (type === "push") {
      setIsAddressGet(false);
      setIsNewAddress(true);
    }
  };

  const orderCheck = () => {
    navigate('../orderlist');
  };
  
  const favoriteCheck = () => {};

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
      <AccountWrap>
        <header>
          <div className="header-inner">
            <div className="header-top flex flex-ju-bt flex-align-center">
              <span>계정</span>
              <button className="arrow-right" onClick={logOut}>
                로그아웃
              </button>
            </div>
            <h1>{user && user.name} 님, 안녕하세요.</h1>
          </div>
        </header>
        <div className="order-favorite-wrap">
          <div className="order">
            <h2>주문 사항</h2>
            <p>배송을 조회하고, 주문을 변경 또는 취소하거나 반품을 신청하세요.</p>
            <button className="arrow-right" onClick={orderCheck}>
              주문 기록 확인
            </button>
          </div>
          <div className="favorite">
            <h2>관심 목록</h2>
            <p>온라인에서든 Apple Store에서든 관심 있는 제품을 쉽게 저장해두고, 나중에 여기에서 다시 살펴볼 수 있습니다.</p>
            <button className="arrow-right" onClick={favoriteCheck}>
              관심 목록 보기
            </button>
          </div>
        </div>
        <div className="account-setting-wrap">
          <div className="inner">
            <h2>계정 설정</h2>
            <div className="flex options">
              <div className="column">
                <h3>배송</h3>
              </div>
              <div className="column">
                <h4>배송 주소</h4>
                {user?.address?.length > 0 ? (
                  (() => {
                    const selectedAddress = user.address.find((addr) => addr.selected);
                    if (selectedAddress) {
                      return (
                        <>
                          <div className="address">{selectedAddress.receiver}</div>
                          <div className="address">
                            {selectedAddress.state} {selectedAddress.cities},
                          </div>
                          <div className="address">{selectedAddress.zipcode}</div>
                          <div className="address">{selectedAddress.street}</div>
                          <div className="address">{selectedAddress.accesscode}</div>
                          <button className="arrow-right" onClick={() => addressSave("edit")}>
                            편집
                          </button>
                          <button className="arrow-right" onClick={() => addressSave("push")}>
                            등록
                          </button>
                          <button className="arrow-right" onClick={() => setIsAddressList(!isAddressList)}>
                            목록
                          </button>
                        </>
                      );
                    }
                  })()
                ) : (
                  <>
                    <div className="address">등록된 주소가 없습니다.</div>
                    <button className="arrow-right" onClick={() => addressSave("push")}>
                      등록
                    </button>
                    <button className="arrow-right" onClick={() => setIsAddressList(!isAddressList)}>
                      목록
                    </button>
                  </>
                )}
              </div>
              <div className="column">
                <h4>연락처 정보</h4>
                <button className="arrow-right" onClick={() => setIsContackEdit(!isContackEdit)}>
                  편집
                </button>
              </div>
            </div>
          </div>
        </div>
        {isAddressEdit && (
          <AddressEdit
            type={"fixed"}
            get={isAddressGet}
            isNewAddress={isNewAddress}
            isShow={isAddressEdit}
            setIsShow={setIsAddressEdit}
            setUser={setUser}
          ></AddressEdit>
        )}
        {isAddressList && <AddressList isShow={isAddressList} setIsShow={setIsAddressList} setUser={setUser}></AddressList>}
        {isContackEdit && <ContactEdit isShow={isContackEdit} setIsShow={setIsContackEdit} setUser={setUser}></ContactEdit>}
      </AccountWrap>
    </>
  );
}

export default Account;
