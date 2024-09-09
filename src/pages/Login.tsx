import axios from "../api/axios";
import styled, { css } from "styled-components";
import { SET_TOKEN } from "../store/authSlice";
import { AdminLogin } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Spinner from "../components/Spinner";

const LayoutInner = styled.div`
  margin-left: auto;
  margin-right: auto;

  .input-text,
  .input2-text {
    transition-timing-function: ease-in;
    transition-duration: 0.125s;
  }
`;

const LoginArea = styled.div`
padding: 0 20px;
  max-width: 480px;
  height: 480px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SVG = styled.div<any>`
  padding-top: 34px;
  font-size: 40px;
  font-weight: 700;

  svg {
    ${(props) =>
      props.size === "apple" &&
      css`
        transform: scale(1);
      `}
    ${(props) =>
      props.size === "saw" &&
      css`
        transform: scale(5);
        fill: #2e2e2e;
      `}
  }
`;

const LoginH3 = styled.h3`
  font-size: 24px;
  font-weight: 600;
`;

const LoginBox = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;

  .signup-wrap {
    margin-top: 20px;
  }
`;

const LoginItem = css`
  font-size: 15px;
  margin: 0;
  transition: 0.32s cubic-bezier(0.4, 0, 0.6, 1);
`;

const InputStyle = css`
`;

const LoginItemID = styled.div`
  ${LoginItem}
`;

const LoginInputID = styled.input`
  ${InputStyle}
`;

const LoginItemPW = styled.div`
  ${LoginItem}
`;

const LoginInputPW = styled.input`
  ${InputStyle}
`;

interface LoginList {
  Id: String;
  Password: String;
  InputFocus: string;
  pwInputShow: Boolean;
  inputClick: Boolean;
  inputClickNumber: Number;
}

const LoginList = styled.ul<LoginList>`
  --pw-height: ${(props) => (props.pwInputShow ? `44px` : `0px`)};
  --input-opacity: ${(props) => (props.pwInputShow ? `1` : `0`)};
  /* min-height: 158px; */
  /* max-height: none; */

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    to {
      opacity: 0.6;
    }
  }

  ${(props) =>
    props.InputFocus === "id"
      ? css`
          ${InputBtn} {
          }
        `
      : css``}

  ${(props) =>
    props.InputFocus === "pw" &&
    css`
      .input-wrap {
        .input-pass {
          border-top-width: 2px;
        }
      }
    `}

  ${(props) =>
    !props.pwInputShow && props.Id.length > 0
      ? css`
          ${InputBtn} {
            cursor: pointer;
            & > i {
              color: #494949;
            }
          }
        `
      : `

  `}

  ${(props) =>
    props.pwInputShow === true && props.Password.length > 0
      ? css`
          ${InputBtn2} {
            cursor: pointer;
            & > i {
              color: #494949;
            }
          }
        `
      : css`
          ${InputBtn2} {
            cursor: pointer;
            & > i {
              color: #929292;
            }
          }
        `}

  ${(props) =>
    props.pwInputShow
      ? css`
          .input-id {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .input-pass {
            border-top-width: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          ${LoginItemPW} {
            opacity: 1;
          }

          ${InputBtn} {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-end 80ms;
          }

          ${InputBtn2} {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
          }
        `
      : css`
          ${LoginItemPW} {
            display: none;
            opacity: 0;
          }

          ${InputBtn} {
            opacity: 1;
            visibility: visible;
            transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
          }

          ${InputBtn2} {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-end 80ms;
          }
        `};
`;

interface LoginError {
  isError: Boolean;
}

const LoginError = styled.div<LoginError>`
  ${(props) =>
    props.isError
      ? css`
          display: block;
        `
      : css`
          display: none;
        `};

  color: #503e30;
  background-color: #fae9a3;
  position: absolute;
  width: 100%;
  margin-left: -50%;
  border-radius: var(--input-border-radius);
  left: 50%;
  border: 1px solid rgba(185, 149, 1, 0.47);
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  padding: 11px;
  text-align: center;

  &::before {
    width: 15px;
    height: 15px;
    background-color: #fae9a3;
    content: "";
    position: absolute;
    left: 47.2%;
    -webkit-transform: rotate(135deg) skewX(5deg) skewY(5deg);
    -ms-transform: rotate(135deg) skewX(5deg) skewY(5deg);
    -o-transform: rotate(135deg) skewX(5deg) skewY(5deg);
    transform: rotate(135deg) skewX(5deg) skewY(5deg);
    top: -8px;
    border-left: 1px solid rgba(185, 149, 1, 0.47);
    border-bottom: 1px solid rgba(185, 149, 1, 0.47);
    box-shadow: -1px 1px 2px -1px rgba(185, 149, 1, 0.47);
  }

  & > p {
    font-size: 13px;
    font-weight: 600;
  }

  & > a {
    color: #503e30;
    text-decoration: underline;
  }

  & > a > span {
    font-size: 12px;
    font-weight: 500;
  }
`;

interface LoginBtn {}

const InputBtn = styled.button<LoginBtn>`
  position: absolute;
  background: transparent;
  margin: 0;
  border: 1px solid transparent;
  top: 14px;
  right: 10px;
  padding: 0 1px 0 2px;
  z-index: 2;

  & > i {
    font-size: 26px;
    vertical-align: top;
    color: #929292;
  }

  i:before {
    font-family: shared-icons;
    vertical-align: middle;
    line-height: 1;
    font-weight: 400;
    font-style: normal;
    content: "\f127";
  }
`;

const InputBtn2 = styled(InputBtn)`
  top: 11px;
  cursor: pointer;

   .spinner-wrap {
    position: relative;
    top: 15px;
    right: 15px;
  } 

  & > i {
    color: #494949;
  }
`;

const SignUpBtn = styled.button`
  margin-top: 15px;
  padding: 7px 15px;
  border: none;
  border-radius: 15px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: var(--black2-color);
  }
`;

interface Props {
  // setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
}

function Login() {
  const [cookies] = useCookies(["jwt"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [Id, setId] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [InputFocus, setInputFocus] = useState<string>("");

  // 오류메시지 상태저장
  const [ErrorMessage, setErrorMessage] = useState<string>("");

  const [pwInputShow, setPwInputShow] = useState(false);
  const [IDDeleteIconShow, setIDDeleteIconShow] = useState(false);
  const [PWDeleteIconShow, setPWDeleteIconShow] = useState(false);
  const [inputClickNumber, setInputClickNumber] = useState<Number>(0);

  // 유효성 검사
  const [isError, setIsError] = useState<boolean>(false);

  const [inputClick, setInputClick] = useState<Boolean>(false);

  const idinput = useRef<any>(null);
  const pwinput = useRef<any>(null);
  const inputRef = useRef<HTMLUListElement>(null);

  const IdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("IdHandler");

    setId(e.target.value);

    // 아이디 인풋 X아이콘 유무
    if (e.target.value) {
      setIDDeleteIconShow(true);
    } else if (!e.target.value) {
      setIDDeleteIconShow(false);
      setPwInputShow(false);
    }
  };

  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("PasswordHandler");
    setPassword(e.target.value);

    // 패스워드 인풋 X아이콘 유무
    if (e.target.value) {
      setPWDeleteIconShow(true);
    } else if (!e.target.value) {
      setPWDeleteIconShow(false);
      setIsError(false);
    }
  };

  const IDinputDelete = () => {
    idinput.current.value = null;
  };

  const PWinputDelete = () => {
    pwinput.current.value = null;
  };

  const userdata = {
    id: Id,
    password: Password,
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("handleKeyDown");
    if (e.key === "Enter") {
      LoginBtn(e);
      pwinput.current.focus();
      setInputFocus("pw");
    }
  };

  // 로그인 버튼
  const LoginBtn = async (e: any) => {
    e.preventDefault();
    console.log("admin 로그인 시도");

    if (pwInputShow === false) {
      setPwInputShow(true);
      return;
    }

    setIsLoading(true); // 스피너 표시

    try {
      const res = await axios.post("/smartstore/commerce/loginbtn", userdata, { withCredentials: true });

      if (res.data.error == "아이디및비밀번호오류") {
        setTimeout(() => {
          setIsLoading(false);
          setErrorMessage("아이디 혹은 비밀번호가 틀렸습니다.");
          setIsError(true);
        }, 1000); // 스피너 지연 시간 후에 숨김
        return;
      }

      dispatch(AdminLogin(res.data.user));
      dispatch(SET_TOKEN(res.data.token));
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = (name: any) => {
    setInputFocus(name);
  };

  const handleBlur = () => {
    setInputFocus("");
  };

  // 유저의 로그인 상태를 확인.
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (cookies.jwt) {
  //       navigate("/home");
  //     }

  //     try {
  //       const res = await axios.post("/smartstore/user/login", { withCredentials: true });
  //       console.log(res);
  //       if (res.data.status == false) {
  //         // window.onpopstate = function (event) {
  //         //   if (event) {
  //         //     event.preventDefault();
  //         //   }
  //         //   navigate(-2);
  //         // };
  //       }
  //     } catch (errors) {
  //       console.log(errors);
  //     }
  //   };
  //   verifyUser();
  // }, [cookies, navigate]);

  // 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (inputClick && inputRef.current && !inputRef.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [inputClick]);

  return (
    <>
      <div className="userlogin-layout-wrap">
        <LayoutInner className="LayoutInner">
          <LoginArea className="LoginArea">
            <LoginH3 className="LoginH3">Apple Store 관리자 로그인</LoginH3>
            <LoginBox className="LoginBox">
              <LoginList
                className="LoginList"
                ref={inputRef}
                Id={Id}
                Password={Password}
                pwInputShow={pwInputShow}
                inputClick={inputClick}
                inputClickNumber={inputClickNumber}
                InputFocus={InputFocus}
              >
                <LoginItemID className="input-wrap">
                  <LoginInputID
                    type="text"
                    className={`input-id input ${Id ? "not-empty" : ""}`}
                    ref={idinput}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                      setInputClick(true);
                      setInputClickNumber(1);
                    }}
                    onFocus={() => handleFocus("id")}
                    onBlur={handleBlur}
                    onChange={IdHandler}
                  />
                  <span className="input-text">아이디</span>
                  <span className={!IDDeleteIconShow ? "delete-icon-none delete-icon" : "delete-icon"} onClick={IDinputDelete}></span>
                </LoginItemID>
                <LoginItemPW className="input-wrap">
                  <LoginInputPW
                    type="password"
                    className={`input-pass input ${Password ? "not-empty" : ""}`}
                    ref={pwinput}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                      setInputClick(true);
                      setInputClickNumber(2);
                    }}
                    onFocus={() => handleFocus("pw")}
                    onBlur={handleBlur}
                    onChange={PasswordHandler}
                  />
                  <span className="input-text">암호</span>
                  <span className={!PWDeleteIconShow ? "delete-icon-none delete-icon" : "delete-icon"} onClick={PWinputDelete}></span>
                  <InputBtn2 type="submit" className="pw" onClick={LoginBtn}>
                    {isLoading ? (
                      <div className="spinner-wrap">
                        <Spinner />
                      </div>
                    ) : (
                      <i className="shared-icon"></i>
                    )}
                  </InputBtn2>
                </LoginItemPW>
              </LoginList>
              <LoginError isError={isError}>
                <p className="login-error">관리자 ID 또는 암호가 올바르지 않습니다.</p>
                {/* <a className="login-error under" target="_blank">
                  <span className="">암호를 잊으셨습니까?</span>
                </a> */}
              </LoginError>
              {!pwInputShow && (
                <button className="gray-btn" onClick={(e) => LoginBtn(e)}>
                  <span className="text">암호로 계속 진행</span>
                </button>
              )}
            </LoginBox>
          </LoginArea>
        </LayoutInner>
      </div>
    </>
  );
}

export default Login;
