import axios from "../../api/axios";
import styled, {css} from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cartListType } from "./Cart";
import AddressEdit, { AddressEditRef } from "../../components/AddressEdit";
import AddressList from "../../components/AddressList";

interface Type {
  isInputAnimation: boolean;
}

const ShippingWrap = styled.div<Type>`
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

  display: flex;
  justify-content: center;
  align-items: center;

  .margin {
    margin-bottom: 0px;
  }

  .list {
    margin-bottom: 15px;
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
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
    max-width: 50%;

    @media only screen and (max-width: 833px) {
      max-width: 100%;
    }

    h2 {
      margin-bottom: 20px;
    }

    h3,
    h4 {
      text-align: left;
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
    }

    h4 {
      font-size: 12px;
      font-weight: 400;
      margin-top: 5px;
    }

    .selected {
      border-color: #0070c9;
      border-width: 2px;
      outline: none;
      box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
    }

    .shop-info-button.selected .inner-left,
    inner-right {
      box-sizing: border-box;
      transition: box-shadow 0.3s ease;

      span {
        font-size: 16px;
        font-weight: 400;
      }
    }

    .btn-wrap {
      display: flex;
      line-height: 1.5;
      gap: 15px;
      margin: 10px 0 20px 0;

      span,
      button {
        color: var(--blue-color);
        font-size: 14px;
        font-weight: 400;
      }
    }

    .address-edit-btn {
    }

    .newaddress {
      transition-duration: 0.4s;
      transition-property: height;
      transition-timing-function: ease-in-out;
    }
  }

  .contact {
    max-width: 50%;

    h2 {
      margin-bottom: 20px;
    }

    @media only screen and (max-width: 833px) {
      max-width: 100%;
    }
  }

  .result-btn-wrap {
    display: flex;
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
        font-size: 15px;
      }
    }
  }
`;

function Shipping() {
  const [isInputAnimation, setIsInputAnimation] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["userjwt"]);

  const [cartList, setCartList] = useState<cartListType[]>();
  const [payment, setPayment] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  const [selectedAddress, setSelectedAddress] = useState<any>({});

  const [addressType, setAddressType] = useState<string | null>("default");

  const [addressData, setAddressData] = useState<any>();

  const [email, setEmail] = useState<string>("");
  const [emailMarked, setEmailMarked] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [phone, setPhone] = useState<string>("");

  const [isAddressEdit, setIsAddressEdit] = useState<boolean>(false);
  const [isAddressList, setIsAddressList] = useState<boolean>(false);

  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [isPhone, setIsPhone] = useState<boolean | null>(null);

  const [isAddressGet, setIsAddressGet] = useState<boolean>(false);

  // 새 주소 사용 UI 보기/숨기기
  const [isNewAddressShow, setIsNewAddressShow] = useState<boolean>(false);

  // 새 주소 사용시 전체 유효성 검사
  const [isNewAddressAll, setIsNewAddressAll] = useState<boolean>(false);

  // 새 주소 저장 여부
  const [isNewAddress, setIsNewAddress] = useState<boolean | null>(null);

  // 전체 유효성 검사
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [phoneMessage, setPhoneMessage] = useState<string>("");

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const addressEditRef = useRef<AddressEditRef>(null);

  console.log("isNewAddressAll 새주소 전체유효성검사" + isNewAddressAll);
  // console.log("isNewAddress 새주소 저장합니깡?" + isNewAddress);

  const data = { // 기존 주소 사용시
    address: selectedAddress,
    isNewAddress: isNewAddress,
    email: email,
    phone: phone,
    payment: payment
  }

  const data2 = { // 새 주소 사용시
    address: addressData,
    isNewAddress: isNewAddress,
    email: email,
    phone: phone,
    payment: payment
  }

  // console.log(addressData);
  // console.log(data);
  // console.log(isEmail);
  // console.log(isPhone);
  // console.log(payment);
  console.log(isNewAddressAll);

  useEffect(() => {
    if (user) {
      const selected = user.address.find((addr) => addr.selected);
      setSelectedAddress(selected);
    }
  },[user])

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
        const res = await axios.post("/smartstore/shipping", {}, { withCredentials: true });
        console.log(res.data);
        if (res.data.user.subaddress && Object.keys(res.data.user.subaddress).length > 0) {
          setIsAddressGet(true);
          setIsNewAddressShow(true);
          setAddressType('newaddress');
        } else {
          setIsAddressGet(false);
        }


        setCartList(res.data.carts);
        setEmail(res.data.user.email2);
        setEmailMarked(maskEmail(res.data.user.email2));
        setPhone(res.data.user.phone);
        setUser(res.data.user);
        console.log(res.data.user);

        setIsEmail(true);
        setIsPhone(true);

        // 주소가 하나도 없는 경우 새 주소 사용이 기본값으로 선택 된다
        if (res.data.user.address.length === 0) {
          addressTypeChange("newaddress");
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  // 이메일 input을 클릭시 전체 선택만 합니다.
  useEffect(() => {
    const handleMouseDown = (event) => {
      // 마우스 다운 이벤트를 감지하여 input 요소 외부에서의 더블 클릭 시에도 전체 선택 유지
      if (!isDelete) {
        if (inputEmailRef.current && inputEmailRef.current?.contains(event.target)) {
          console.log("isDelete true인데 외 되는거냐");
          event.preventDefault(); // 기본 동작 방지
          inputEmailRef.current?.select(); // 전체 선택
        }
      }

      document.addEventListener("mousedown", handleMouseDown);
    };

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const addressChange = (e, type) => {
    const { value } = e.target;

    if (type === "email") {
      console.log("변경");
      setEmail(value);
      setEmailMarked(value);
      setEmailMessage("");
      setIsEmail(null);

      if (value === "" || !emailPattern.test(value)) {
        setIsDelete(true);
        setEmailMessage("");
      }
    }

    if (type === "phone") {
      const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      setPhone(value);
      setPhoneMessage("");
      setIsPhone(null);

      if (phoneRegex.test(value)) {
        setIsPhone(true);
        setPhoneMessage("");
        return;
      }
    }
  };

  const handleFocus = () => {
    // input 요소를 select 메소드를 사용하여 전체 선택

    if (!isDelete) {
      setIsEditable(true);
      inputEmailRef.current?.select();
      return;
    }
  };

  function maskEmail(email: string) {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return email; // localPart가 너무 짧아서 마스킹하지 않음
    }
    const maskedLocalPart = `${localPart[0]}*****${localPart[localPart.length - 1]}`;
    return `${maskedLocalPart}@${domain}`;
  }

  const errorhandle = async (
    from: string,
    type: string,
    state: string | null,
    isState: boolean | null,
    setIsState: React.Dispatch<React.SetStateAction<boolean | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setIsState(null);
    setMessage("");

    if (type === "email") {
      inputEmailRef.current?.setSelectionRange(0, 0);
      if (!isDelete) {
        return;
      }

      const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      setIsState(null);
      setMessage("");

      if (from === "onblur") {
        if (!state) {
          setIsState(null);
          setIsEditable(true);
          return;
        }
      } else {
        if (!state) {
          setIsState(false);
          setMessage("유효한 이메일 주소를 입력하십시오.");
          return;
        }
      }

      if (!emailRegex.test(state)) {
        setMessage("유효한 이메일 주소를 입력하십시오.");
        setIsState(false);
        return;
      } else {
        setIsState(true);
        return;
      }
    }

    if (type === "phone") {
      const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      setIsState(null);
      setMessage("");

      if (from === "onblur") {
        if (!state) {
          setIsState(null);
          return;
        }
      } else {
        if (!state) {
          setIsState(false);
          setMessage("유효한 전화번호를 입력하십시오.");
          return;
        }
      }

      if (!phoneRegex.test(state)) {
        setMessage("휴대전화 번호만 입력할 수 있습니다.");
        setIsState(false);
      } else {
        setIsState(true);
      }
    }
  };

  const addressTypeChange = (type) => {
    if (type === "default") {
      setAddressType(type);
      setIsNewAddressShow(false);
    }

    if (type === "newaddress") {
      setAddressType(type);
      setIsNewAddressShow(true);
      setIsAddressGet(true);
      setIsNewAddress(null);
    }
  };

  const addressSave = (type) => {
    setIsAddressEdit(!isAddressEdit);
    setIsAddressGet(false);

    if (type === "edit") {
      setIsAddressGet(true);
      setIsNewAddress(null);
    }
  };

  const submit = async () => {
    if (addressType === 'default') {
      console.log('default');
      // 기존의 주소 사용
      if (isEmail && isPhone) {
        // 이메일과 핸드폰번호까지 입력 되었다면
        console.log('기존의 주소를 사용하며 이메일과 핸드폰 번호까지 입력이 완료 되었습니다.')
        try {
          const res = await axios.post("/smartstore/address", {}, { withCredentials: true });
          console.log(res.data);
          navigate("/shop/checkout");
          return;
        } catch (errors) {
          console.log(errors);
        }
        return;
      }
      return;
    } else {
      console.log('새 주소 사용');
      // 새 주소 사용
      if (addressEditRef.current) {
        addressEditRef.current.allErrorHandle();
        if (isNewAddressAll && isEmail && isPhone) {
          console.log('새로운 주소를 사용하며 이메일과 핸드폰 번호까지 입력이 완료 되었습니다.')
          try {
            const res = await axios.post("/smartstore/newaddress", data2, { withCredentials: true });
            console.log(res.data);
            navigate("/shop/checkout");
            return;
          } catch (errors) {
            console.log(errors);
          }
        }
        return;
      }
    }
  };

  return (
    <>
      <ShippingWrap isInputAnimation={isInputAnimation}>
        <div className="shipping-inner">
          <header>
            <div>
              <span>결제</span>
            </div>
            <div className="price">
              <span>주문 요약 정보 표시: </span>
              <span>₩{payment && payment.toLocaleString()}</span>
            </div>
          </header>
          <h1>주문하신 제품이 어디로 배송되길 원하십니까?</h1>
          <div className="address">
            <h2>주소 선택:</h2>
            <div className="input-wrap">
              {user?.address?.length > 0 ? (
                (() => {
                  const selectedAddress = user.address.find((addr) => addr.selected);
                  if (selectedAddress) {
                    return (
                      <button
                        className={`shop-info-button address-btn ${addressType === "default" && "selected"}`}
                        onClick={() => addressTypeChange("default")}
                      >
                        <div className="inner-left">
                          <h3>{selectedAddress.receiver}</h3>
                          <h4>{selectedAddress.street}</h4>
                        </div>
                        <div className="inner-right">
                          <span>기본값</span>
                        </div>
                      </button>
                    );
                  }
                })()
              ) : (
                <></>
              )}
            </div>
            {user?.address?.length > 0 && (
              <>
                <div className="btn-wrap">
                  <button className="address-edit-btn" onClick={() => addressSave("edit")}>
                    <span>이 주소 편집</span>
                    <span className="icon icon-pluscircle"></span>
                  </button>
                  <button className="arrow-btn" onClick={() => setIsAddressList(!isAddressList)}>
                    목록
                  </button>
                </div>
              </>
            )}  
            <div className="input-wrap">
              <button
                className={`shop-info-button address-btn ${addressType === "newaddress" && "selected"}`}
                onClick={() => addressTypeChange("newaddress")}
              >
                <div className="inner-left">
                  <h3>새 주소 사용</h3>
                </div>
              </button>
            </div>
            <div className={`newaddress ${addressType === "newaddress" ? "show" : "hide"}`}>
              {isNewAddressShow && (
                <AddressEdit
                  ref={addressEditRef}
                  type={"block"}
                  get={isAddressGet}
                  isShow={isNewAddressShow}
                  setIsShow={setIsAddressEdit}
                  setUser={setUser}
                  setIsAll={setIsNewAddressAll}
                  isNewAddress={isNewAddress}
                  setIsNewAddress={setIsNewAddress}
                  setAddressData={setAddressData}
                ></AddressEdit>
              )}
            </div>
          </div>
          <div className="contact">
            <h2>연락처 정보를 알려주십시오.</h2>
            <div className={`${isEmail !== null && !isEmail ? "margin" : "list"} input-wrap`}>
              <input
                type="text"
                className={`input2 ${isEmail !== null && !isEmail ? "error" : ""} ${email ? "not-empty" : ""}`}
                ref={inputEmailRef}
                value={isDelete ? email : emailMarked}
                onFocus={handleFocus}
                onBlur={(e) => errorhandle("onblur", "email", email, isEmail, setIsEmail, setEmailMessage)}
                readOnly={!isEditable}
                onChange={(e) => addressChange(e, "email")}
              />
              <span className="input2-text">이메일 주소</span>
            </div>
            <div className={`error-wrap ${isEmail !== null && !isEmail ? "error-message-active" : ""}`}>
              <span>{emailMessage}</span>
            </div>
            <div className={`${isPhone !== null && !isPhone ? "margin" : "list"} input-wrap`}>
              <input
                type="text"
                className={`input2 ${isPhone !== null && !isPhone ? "error" : ""} ${phone && "not-empty"}`}
                value={phone || ""}
                maxLength={11}
                onBlur={(e) => errorhandle("onblur", "phone", phone, isPhone, setIsPhone, setPhoneMessage)}
                onChange={(e) => addressChange(e, "phone")}
              />
              <span className="input2-text">휴대폰 번호</span>
            </div>
            <div className={`error-wrap ${isPhone !== null && !isPhone ? "error-message-active" : ""}`}>
              <span>{phoneMessage}</span>
            </div>
          </div>
          <div className="result-btn-wrap">
            <button className="form-button" onClick={submit}>
              <span>결제 페이지로 이동</span>
            </button>
          </div>
        </div>
      </ShippingWrap>
      {isAddressEdit && <AddressEdit type={"fixed"} get={isAddressGet} isNewAddress={isNewAddress} isShow={isAddressEdit} setIsShow={setIsAddressEdit} setUser={setUser}></AddressEdit>}
      {isAddressList && <AddressList isShow={isAddressList} setIsShow={setIsAddressList} setUser={setUser}></AddressList>}
    </>
  );
}

export default Shipping;
