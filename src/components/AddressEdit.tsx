import axios from "../api/axios";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import { citiesType } from "../types/cities";
import citiesJson from "../cities.json";
import CheckBox from "../components/CheckBox2";
import address from "../pages/shop/Shipping";

interface Type {
  type: string;
  isInputAnimation: boolean;
}

const AddressEditPage = styled.div<Type>`
  ${(props) =>
    props.isInputAnimation
      ? css`
          .input-text,
          .input2-text {
            transition-timing-function: ease-in;
            transition-duration: 0.125s;
          }
        `
      : css``}

  ${(props) =>
    props.type === "block"
      ? css`
          position: static;
          margin-top: 5px;
        `
      : css`
          position: fixed;
          top: 0;
          background: #0000007a;
          backface-visibility: visible;
          height: 100%;
          z-index: 5;
        `}

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

    ${(props) =>
      props.type === "block"
        ? css``
        : css`
            margin: auto;
            max-width: 816px;
          `}

    .maxwidth {
      flex-basis: 75%;
      max-width: 75%;
      width: 100%;

      ${(props) =>
        props.type === "block"
          ? css`
              max-width: 100%;
              flex-basis: 100%;
              padding: 20px 0;

              @media only screen and (max-width: 833px) {
                max-width: 100%;
              }
            `
          : css``}
    }

    .inner {
      position: relative;
      background: #fff;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;

      ${(props) =>
        props.type === "block"
          ? css`
              align-items: flex-start;
            `
          : css`
              margin: 40px 0px;
              padding: 60px 0 40px;
              justify-content: center;
            `}

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

    ${(props) =>
      props.type === "block"
        ? css`
            display: none;
          `
        : css``}

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
  type: string;
  get: boolean;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<any>;
  setIsAll?: React.Dispatch<React.SetStateAction<boolean>>;
  isNewAddress?: boolean | null;
  setIsNewAddress?: React.Dispatch<React.SetStateAction<boolean | null>>;
  setAddressData?: React.Dispatch<React.SetStateAction<any>>;
}

export interface AddressEditRef {
  allErrorHandle: () => void;
}

const AddressEdit = forwardRef<AddressEditRef, Props>(
  ({ type, get, isShow, setIsShow, setUser, setIsAll, isNewAddress, setIsNewAddress, setAddressData }, ref) => {
    const citiesArray: citiesType[] = citiesJson as citiesType[];
    const [isInputAnimation, setIsInputAnimation] = useState<boolean>(false);

    // 주소 편집
    const [selectedAddress, setSelectedAddress] = useState<any>({});
    const [receiver, setReceiver] = useState<string | null>(null);
    const [state, setState] = useState<string | null>("시/도");
    const [cities, setCities] = useState<string | null>(null);
    const [zipcode, setZipcode] = useState<string | null>(null);
    const [street, setStreet] = useState<string | null>(null);
    const [accesscode, setAccesscode] = useState<string | null>(null);

    const [isReceiver, setIsReceiver] = useState<boolean | null>(null);
    const [isState, setIsState] = useState<boolean | null>(null);
    const [isCities, setIsCities] = useState<boolean | null>(null);
    const [isZipcode, setIsZipcode] = useState<boolean | null>(null);
    const [isStreet, setIsStreet] = useState<boolean | null>(null);
    const [isAccesscode, setIsAccesscode] = useState<boolean | null>(null);

    const [receiverMessage, setReceiverMessage] = useState<string>("");
    const [stateMessage, setStateMessage] = useState<string>("");
    const [citiesMessage, setCitiesMessage] = useState<string>("");
    const [zipcodeMessage, setZipcodeMessage] = useState<string>("");
    const [streetMessage, setStreetMessage] = useState<string>("");
    const [accesscodeMessage, setAccesscodeMessage] = useState<string>("");

    const [checkboxMessage, setCheckboxMessage] = useState<string>("이 주소를 내 주소록에 저장합니다.");
    const dropMenuRef = useRef(null);

    const data = {
      // 주소 등록
      isNewAddress: isNewAddress,
      address: {
        receiver: receiver,
        state: state,
        cities: cities,
        zipcode: zipcode,
        street: street,
        accesscode: accesscode,
        selected: false,
      },
    };

    console.log(data);

    const dataEdit = {
      // 주소 편집
      ...selectedAddress,
      receiver: receiver,
      state: state,
      cities: cities,
      zipcode: zipcode,
      street: street,
      accesscode: accesscode,
    };

    const data2 = {
      // 결제전 새 주소 사용시 주소록 저장 여부
      receiver: receiver,
      state: state,
      cities: cities,
      zipcode: zipcode,
      street: street,
      accesscode: accesscode,
    };

    const is = {
      isReceiver: isReceiver,
      isState: isState,
      isCities: isCities,
      isZipcode: isZipcode,
      isStreet: isStreet,
      isAccesscode: isAccesscode,
    };

    console.log(is);

    useImperativeHandle(ref, () => ({
      allErrorHandle,
    }));

    // 테스트용 데이터
    useEffect(() => {
      // setReceiver('정영일');
      // setState('서울');
      // setCities('은평구');
      // setZipcode('12345');
      // setStreet('연서로 빌라');
      // setAccesscode('1234');

      setIsReceiver(null);
      setIsState(null);
      setIsCities(null);
      setIsZipcode(null);
      setIsStreet(null);
      setIsInputAnimation(false);

      // 새 주소 사용으로 진입시 유저 정보를 불러오지 않음.
      if (!get) {
        return;
      }

      const fetchData = async () => {
        try {
          const res = await axios.get("/smartstore/account", { withCredentials: true });
          const data = res.data.address;
          const data2 = res.data.subaddress;
          console.log(data);

          if (data2 && Object.keys(data2).length > 0 && type === "block") {
            console.log('머지1');
            setSelectedAddress(data2);
            setReceiver(data2.receiver);
            setState(data2.state);
            setCities(data2.cities);
            setZipcode(data2.zipcode);
            setStreet(data2.street);
            setAccesscode(data2.accesscode);

            setIsReceiver(true);
            setIsState(true);
            setIsCities(true);
            setIsZipcode(true);
            setIsStreet(true);
            return;
          }

          const selectedAddress = data.find((addr) => addr.selected);
          console.log(selectedAddress);
          if (data && type === "fixed") {
            console.log('머지2');

            setSelectedAddress(selectedAddress); // 주소 전체

            setReceiver(selectedAddress.receiver);
            setState(selectedAddress.state);
            setCities(selectedAddress.cities);
            setZipcode(selectedAddress.zipcode);
            setStreet(selectedAddress.street);
            setAccesscode(selectedAddress.accesscode);

            setIsReceiver(true);
            setIsState(true);
            setIsCities(true);
            setIsZipcode(true);
            setIsStreet(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);

    // 수정된 각 데이터 반영.
    useEffect(() => {
      if (isReceiver || isState || isCities || isZipcode || isStreet) {
        if (setAddressData) {
          setAddressData(data2);
        }
      }
    }, [receiver, state, cities, zipcode, street, accesscode]);

    // 각 유효성 검사 true시 setIsNewAddressAll true로 전환.
    useEffect(() => {
      if (isReceiver && isState && isCities && isZipcode && isStreet) {
        console.log("all true");
        if (setIsAll) {
          setIsAll(true);
          return;
        }
      } else {
        if (setIsAll) {
          setIsAll(false);
          return;
        }
      }
    }, [isReceiver, isState, isCities, isZipcode, isStreet]);

    // 에러 체크
    const errorhandle = async (
      from: string,
      type: string,
      statedata: string | null,
      isState: boolean | null,
      setIsState: React.Dispatch<React.SetStateAction<boolean | null>>,
      setMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setIsState(null);
      setMessage("");

      if (type === "receiver") {
        if (from === "onblur") {
          if (!statedata) {
            setIsState(null);
            return;
          }
        } else {
          if (!statedata) {
            setIsState(false);
            setMessage("이름을 입력하십시오.");
            return;
          }
        }

        if (statedata && (statedata.length < 2 || statedata.length > 5)) {
          setMessage("2글자 이상 5글자 미만으로 입력 해주세요.");
          setIsState(false);
          return;
        } else {
          setMessage("");
          setIsState(true);
          return;
        }
      }

      if (type === "state") {
        console.log("state onblur");
        console.log(statedata);

        if (from === "onblur") {
          if (statedata === "시/도") {
            setIsState(null);
            return;
          } else {
            setIsState(true);
            setMessage("");
            return;
          }
        } else {
          if (statedata === "시/도") {
            setIsState(false);
            setMessage("시/도를 선택하십시오.");
            return;
          } else {
            setIsState(true);
            setMessage("");
            return;
          }
        }
      }

      if (type === "cities") {
        setIsState(null);
        setMessage("");

        if (from === "onblur") {
          if (!statedata) {
            setIsState(null);
            return;
          }
        } else {
          if (!statedata) {
            setIsState(false);
            setMessage("지역/도시를 입력하십시오.");
            return;
          }
        }

        if (statedata && statedata.length < 1) {
          setMessage("1글자 이상 입력 해주세요.");
          setIsState(false);
          return;
        } else {
          setMessage("");
          setIsState(true);
          return;
        }
      }

      if (type === "zipcode") {
        const zipcodeRegex = /^\d{5}$/;

        setIsState(null);
        setMessage("");

        if (from === "onblur") {
          if (!statedata) {
            setIsState(null);
            return;
          }
        } else {
          if (!statedata) {
            setIsState(false);
            setMessage("우편번호를 입력 하십시오.");
            return;
          }
        }

        if (zipcode && !zipcodeRegex.test(zipcode)) {
          setMessage("우편번호 5글자를 입력 해주세요.");
          setIsState(false);
          return;
        } else {
          setMessage("");
          setIsState(true);
          return;
        }
      }

      if (type === "street") {
        console.log("street");
        setIsState(null);
        setMessage("");

        if (from === "onblur") {
          if (!statedata) {
            console.log(street);
            setIsState(null);
            setMessage("");
            return;
          } else {
            console.log("내용이 있으므로 true");
            setIsState(true);
            setMessage("");
            return;
          }
        } else {
          if (!statedata) {
            setIsState(false);
            setMessage("나머지 주소를 입력 하십시오.");
            return;
          } else {
            setIsState(true);
            setMessage("");
            return;
          }
        }
      }

      // if (type === "accesscode") {
      //   setIsState(null);
      //   setMessage("");

      //   if (from === "onblur") {
      //     if (!statedata) {
      //       setIsState(null);
      //       return;
      //     }
      //   } else {
      //     if (!statedata) {
      //       setIsState(false);
      //       setMessage("나머지 주소를 입력 하십시오.");
      //       return;
      //     }
      //   }

      //   if (!numberRegex.test(statedata)) {
      //     setMessage("숫자만 입력 하십시오.");
      //     setIsState(false);
      //     return;
      //   } else {
      //     setMessage("");
      //     setIsState(true);
      //     return;
      //   }
      // }
    };

    const addressEditChange = (e, type) => {
      const { value } = e.target;
      setIsInputAnimation(true);

      if (type === "receiver") {
        setReceiver(value);

        if (value.length > 2 && value.length < 5) {
          setIsReceiver(true);
          setReceiverMessage("");
          return;
        }
      }

      if (type === "state") {
        setState(value);
        setIsState(null);
        setStateMessage("");

        if (value === "시/도") {
          setIsState(null);
          setStateMessage("");
          return;
        } else {
          setIsState(true);
          setStateMessage("");
          return;
        }
      }

      if (type === "cities") {
        setCities(value);
        setIsCities(null);
        setCitiesMessage("");
      }

      if (type === "zipcode") {
        setZipcode(value);
        setIsZipcode(null);
        setZipcodeMessage("");
      }

      if (type === "street") {
        setStreet(value);
        setIsStreet(null);
        setStreetMessage("");
      }

      if (type === "accesscode") {
        setAccesscode(value);
      }
    };

    const allErrorHandle = () => {
      errorhandle("submit", "receiver", receiver, isReceiver, setIsReceiver, setReceiverMessage);
      errorhandle("submit", "state", state, isState, setIsState, setStateMessage);
      errorhandle("submit", "cities", cities, isCities, setIsCities, setCitiesMessage);
      errorhandle("submit", "zipcode", zipcode, isZipcode, setIsZipcode, setZipcodeMessage);
      errorhandle("submit", "street", street, isStreet, setIsStreet, setStreetMessage);
    };

    const submit = async () => {
      if (!(isReceiver && isState && isCities && isZipcode && isStreet)) {
        // 에러 검사
        console.log("엥러검사");
        allErrorHandle();
      } else {
        if (isNewAddress) {
          // 주소 새로 등록
          try {
            const res = await axios.post("/smartstore/newaddress", data, { withCredentials: true });
            console.log(res.data);

            setUser((prevUser) => ({
              ...prevUser,
              address: res.data.user,
            }));
            setIsShow(false);
          } catch (errors) {
            console.log(errors);
          }
          return;
        } else {
          // 주소 수정
          try {
            const res = await axios.post("/smartstore/addressedit", dataEdit, { withCredentials: true });
            console.log(res.data);

            setUser((prevUser) => ({
              ...prevUser,
              address: res.data.user,
            }));
            setIsShow(false);
          } catch (errors) {
            console.log(errors);
          }
        }
        return;
      }
    };

    return (
      <AddressEditPage type={type} isInputAnimation={isInputAnimation}>
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
              {type !== "block" && (
                <div className="title-wrap">
                  <h2>배송 주소를 편집하세요.</h2>
                </div>
              )}
              <div className={`${isReceiver !== null && !isReceiver ? "margin" : "list"} input-wrap`}>
                <input
                  type="text"
                  className={`input2 ${isReceiver !== null && !isReceiver ? "error" : ""} ${receiver ? "not-empty" : ""}`}
                  value={receiver || ""}
                  onBlur={(e) => errorhandle("onblur", "receiver", receiver, isReceiver, setIsReceiver, setReceiverMessage)}
                  onChange={(e) => addressEditChange(e, "receiver")}
                />
                <span className="input2-text">이름</span>
              </div>
              <div className={`error-wrap ${isReceiver !== null && !isReceiver ? "error-message-active" : ""}`}>
                <span>{receiverMessage}</span>
              </div>
              <div className={`${isState === null || isCities === null || (isState && isCities) ? "list" : "margin"} flex`}>
                <div className={"large-6 left"}>
                  <div className="input-wrap" ref={dropMenuRef}>
                    <div className="select-wrap">
                      <select
                        className={`select ${isState !== null && !isState ? "error" : ""}`}
                        value={state || ""}
                        onChange={(e) => addressEditChange(e, "state")}
                        onBlur={(e) => errorhandle("onblur", "state", state, isState, setIsState, setStateMessage)}
                      >
                        {citiesArray.map((region, index) => (
                          <option key={index} className="option" value={`${region.name}`}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                      <span className="arrow"></span>
                    </div>
                  </div>
                  <div className={`error-wrap ${isState !== null && !isState ? "error-message-active" : ""}`}>
                    <span>{stateMessage}</span>
                  </div>
                </div>
                <div className={"large-6 right"}>
                  <div className="input-wrap">
                    <input
                      type="text"
                      className={`input2 ${isCities !== null && !isCities ? "error" : ""} ${cities && "not-empty"}`}
                      value={cities || ""}
                      onBlur={(e) => errorhandle("onblur", "cities", cities, isCities, setIsCities, setCitiesMessage)}
                      onChange={(e) => addressEditChange(e, "cities")}
                    />
                    <span className="input2-text">지역/도시</span>
                  </div>
                  <div className={`error-wrap ${isCities !== null && !isCities ? "error-message-active" : ""}`}>
                    <span>{citiesMessage}</span>
                  </div>
                </div>
              </div>
              <div className={`${isZipcode !== null && !isZipcode ? "margin" : "list"} input-wrap`}>
                <input
                  type="text"
                  className={`input2 ${isZipcode !== null && !isZipcode ? "error" : ""} ${zipcode && "not-empty"}`}
                  value={zipcode || ""}
                  maxLength={5}
                  onBlur={(e) => errorhandle("onblur", "zipcode", zipcode, isZipcode, setIsZipcode, setZipcodeMessage)}
                  onChange={(e) => addressEditChange(e, "zipcode")}
                />
                <span className="input2-text">우편 번호</span>
              </div>
              <div className={`error-wrap ${isZipcode !== null && !isZipcode ? "error-message-active" : ""}`}>
                <span>{zipcodeMessage}</span>
              </div>
              <div className={`${isStreet !== null && !isStreet ? "margin" : "list"} input-wrap`}>
                <input
                  type="text"
                  className={`input2 ${isStreet !== null && !isStreet ? "error" : ""} ${street && "not-empty"}`}
                  value={street || ""}
                  onBlur={(e) => errorhandle("onblur", "street", street, isStreet, setIsStreet, setStreetMessage)}
                  onChange={(e) => addressEditChange(e, "street")}
                />
                <span className="input2-text">건물 번지, 이름 또는 거리 이름</span>
              </div>
              <div className={`error-wrap ${isStreet !== null && !isStreet ? "error-message-active" : ""}`}>
                <span>{streetMessage}</span>
              </div>
              <div className={`${isAccesscode !== null && !isAccesscode ? "margin" : "list"} input-wrap`}>
                <input
                  type="text"
                  className={`input2 ${isAccesscode !== null && !isAccesscode ? "error" : ""} ${accesscode && "not-empty"}`}
                  value={accesscode || ""}
                  onBlur={(e) => errorhandle("onblur", "accesscode", accesscode, isAccesscode, setIsAccesscode, setAccesscodeMessage)}
                  onChange={(e) => addressEditChange(e, "accesscode")}
                />
                <span className="input2-text">아파트 등의 건물 출입 코드(선택 사항)</span>
              </div>
              <div className={`error-wrap ${isAccesscode !== null && !isAccesscode ? "error-message-active" : ""}`}>
                <span>{accesscodeMessage}</span>
              </div>
              {type !== "block" ? (
                <>
                  <button className="normal-blue-btn" onClick={submit}>
                    <span className="text">저장</span>
                  </button>
                  <div className="cancel-btn" onClick={() => setIsShow(!isShow)}>
                    <span className="text">취소</span>
                  </div>
                </>
              ) : (
                <CheckBox isState={isNewAddress} setIsState={setIsNewAddress} message={checkboxMessage}></CheckBox>
              )}
            </div>
          </div>
        </div>
      </AddressEditPage>
    );
  }
);

export default AddressEdit;
