import axios from "../api/axios";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

interface Type {
  isInputAnimation: boolean;
}

const ContactEditPage = styled.div<Type>`
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

  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: visible;
  background: #0000007a;
  z-index: 5;

  .select {
    border: 1px solid #86868b;
    border-radius: 12px;
  }

  .inner-wrap {
    background: #0000;
    max-width: 816px;
    padding: 0;
    margin: auto;
    display: flex;
    justify-content: center;

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
      justify-content: center;
      align-items: center;
      margin: 40px 20px;
      padding: 60px 0 40px;

      .left {
        padding-inline-end: 0.4117647059rem;
      }

      .right {
        padding-inline-start: 0.4117647059rem;
      }

      .title-wrap {
        flex-basis: 100%;
        max-width: 100%;
        padding: 30px 0;

        h2 {
          font-size: 36px;
          font-weight: 700;
          text-align: center;
          padding: 10px 0 40px;
        }

        span {
          line-height: 1.5;
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
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<any>;
}

const ContactEdit = ({ isShow, setIsShow, setUser }: Props) => {
  const [isInputAnimation, setIsInputAnimation] = useState<boolean>(false);

  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [isPhone, setIsPhone] = useState<boolean | null>(null);

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [phoneMessage, setPhoneMessage] = useState<string>("");

  const data = {
    email: email,
    phone: phone,
  };

  const is = {
    isEmail: isEmail,
    isPhone: isPhone,
  };

  // 테스트용 데이터
  useLayoutEffect(() => {
    // setReceiver('정영일');
    // setState('서울');
    // setCities('은평구');
    // setZipcode('12345');
    // setStreet('연서로 빌라');
    // setAccesscode('1234');

    const fetchData = async () => {
      try {
        const res = await axios.get("/smartstore/account", { withCredentials: true });
        const email2 = res.data.email2;
        const phone = res.data.phone;

        if (res.data) {
          setEmail(email2);
          setPhone(phone);

          setIsEmail(true);
          setIsPhone(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  console.log(is);

  // 에러 체크
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
      const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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

  const contactEditChange = (e, type) => {
    const { value } = e.target;
    setIsInputAnimation(true);

    if (type === "email") {
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      setEmail(value);
      setEmailMessage("");
      setIsEmail(null);

      if (email && emailRegex.test(value)) {
        setIsEmail(true);
        setEmailMessage("");
        return;
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

  const submit = async () => {
    if (!(isEmail && isPhone)) {
      console.log("에러");
      errorhandle("submit", "email", email, isEmail, setIsEmail, setEmailMessage);
      errorhandle("submit", "phone", phone, isPhone, setIsPhone, setPhoneMessage);
      return;
    } else {
      console.log("에러 없음");
      try {
        const res = await axios.post("/smartstore/contact", data, { withCredentials: true });
        console.log(res.data);

        // setUser(prevUser => ({
        //   ...prevUser,
        //   address: res.data.user
        // }));
        setIsShow(false);
      } catch (errors) {
        console.log(errors);
      }
      return;
    }
  };

  return (
    <ContactEditPage isInputAnimation={isInputAnimation}>
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
              <h2>연락처 정보를 수정하세요.</h2>
              <span>
                청구 연락처는 이메일을 통해 자동으로 배송 관련 알림을 받게 됩니다. 추가 이메일 주소로도 알림을 보내려면 아래에 해당 주소를 입력하세요.
                문자 메시지로도 배송 관련 정보를 받아보려면 아래에 휴대폰 번호를 추가하세요.
              </span>
            </div>
            <div className={`${isEmail !== null && !isEmail ? "margin" : "list"} input-wrap`}>
              <input
                type="text"
                className={`input2 ${isEmail !== null && !isEmail ? "error" : ""} ${email ? "not-empty" : ""}`}
                value={email || ""}
                onBlur={(e) => errorhandle("onblur", "email", email, isEmail, setIsEmail, setEmailMessage)}
                onChange={(e) => contactEditChange(e, "email")}
              />
              <span className="input2-text">이메일 주소(선택사항)</span>
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
                onChange={(e) => contactEditChange(e, "phone")}
              />
              <span className="input2-text">휴대폰 번호</span>
            </div>
            <div className={`error-wrap ${isPhone !== null && !isPhone ? "error-message-active" : ""}`}>
              <span>{phoneMessage}</span>
            </div>
            <button className="normal-blue-btn" onClick={submit}>
              <span className="text">저장</span>
            </button>
            <div className="cancel-btn" onClick={() => setIsShow(!isShow)}>
              <span className="text">취소</span>
            </div>
          </div>
        </div>
      </div>
    </ContactEditPage>
  );
};

export default ContactEdit;
