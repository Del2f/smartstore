import axios from "../api/axios";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import citiesJson from "../cities.json";
import CheckBox from "./CheckBox2";
import address from "../pages/shop/Shipping";

const AddressListPage = styled.div`
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

      .input-wrap {
        margin-bottom: 10px;
      }
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
        margin-top: 20px;

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

        .inner-right {
          div {
            position: relative;
            margin: 0;
          }
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
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<any>;
}

const AddressList = ({ isShow, setIsShow, setUser }: Props) => {
  const [selected, setSelected] = useState<string>("");
  const [addressList, setAddressList] = useState<any>([]);

  console.log(addressList);

  // 테스트용 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/smartstore/account", { withCredentials: true });
        const data = res.data.address;
        
        if (data) {
          console.log(data);
          setAddressList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const selectChange = (id) => {
    console.log('selectChange');

    const updatedAddressList = addressList.map((list) => ({
      ...list,
      selected: list._id === id,
    }));

    setAddressList(updatedAddressList);
  };

  const addressDelete = (e, id) => {
    console.log('addressDelete');
    e.stopPropagation()

    const updatedAddressList = addressList.filter((list) => list._id !== id);
    const noAddress = updatedAddressList.find((list) => list.selected);

    console.log(updatedAddressList);
    // 선택된 주소를 지워서 더이상 선택된 주소가 없을때
    if (!noAddress) {
      if (updatedAddressList.length > 0) {
        updatedAddressList[0].selected = true;
      }
      setAddressList(updatedAddressList);
      return;
    } else {
      setAddressList(updatedAddressList);
      return;
    }

  };

  const submit = async () => {
    try {
      const res = await axios.post("/smartstore/addselect", addressList, { withCredentials: true });
      console.log(res.data);

      setUser((prevUser) => ({
        ...prevUser,
        address: res.data.user,
      }));
      setIsShow(false);
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <AddressListPage>
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
            {addressList.length > 0 ? (
              <div className="title-wrap">
                <h2>주소를 선택 하세요.</h2>
              </div>
            ) : (
              <div className="title-wrap">
                <h2>등록된 주소가 없습니다.</h2>
              </div>
            )}
            {addressList.map((list) => {
              if (!list) {
                return null;
              }
              return (
                <div className="input-wrap" key={list._id}>
                  <button
                    key={list.id}
                    className={`shop-info-button address-btn ${list.selected ? "selected" : ""}`}
                    onClick={() => selectChange(list._id)}
                  >
                    <div className="inner-left">
                      <h3>{list.receiver}</h3>
                      <h4>{list.street}</h4>
                    </div>
                    <div className="inner-right">
                      <div className="close-btn" onClick={(e) => addressDelete(e, list._id)}>
                        <span>
                          <svg width="21" height="21" role="img" aria-hidden="true">
                            <path fill="none" d="M0 0h21v21H0z"></path>
                            <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
              <button className="normal-blue-btn" onClick={submit}>
                <span className="text">저장</span>
              </button>
            <div className="cancel-btn" onClick={() => setIsShow(!isShow)}>
              <span className="text">취소</span>
            </div>
          </div>
        </div>
      </div>
    </AddressListPage>
  );
};

export default AddressList;
