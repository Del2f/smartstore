import axios from "../api/axios";
import styled, { css } from "styled-components";
import { SET_TOKEN } from "../store/authSlice";
import { AdminLogin } from "../store/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const LayoutInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 980px;
`;

const LoginArea = styled.div`
  max-width: 300px;
  height: 480px;
  margin: 0 auto 90px;
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
    ${props => props.size === "apple" && `
      transform: scale(1);
    `}
    ${props => props.size === "saw" && `
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
`;

const LoginItem = css`
  position: relative;
  width: 100%;
  height: 44px;
  font-size: 15px;
  border-radius: var(--input-border-radius);
  border: 1px solid #d6d6d6;
  background: transparent;
  margin: 0;
  vertical-align: top;
  transition: 0.32s cubic-bezier(0.4, 0, 0.6, 1);
`;

const InputStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 43px;
  border-radius: var(--input-border-radius);
  border: 0;

  &:focus {
    border: 0;
    outline: 0;
  }

  &::placeholder {
    color: #a1a1a1;
    font-weight: 100;
  }
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
      ? `
    ${LoginItemID}{
      border: 1px solid #0070c9;
      border-width: 1px;
      box-shadow: 0 0 0 1px #0070c9;
      outline: 0;
      z-index: 2;
    }
    
    ${InputBtn}{
      z-index: 2;
    }
    `
      : `
    ${LoginItemPW}{
      border: 1px solid #0070c9;
      border-width: 1px;
      box-shadow: 0 0 0 1px #0070c9;
      outline: 0;
      z-index: 2;
    }
    ${InputBtn2}{
      z-index: 2;
    }
`}

  ${(props) =>
    props.pwInputShow === false && props.Id.length > 0
      ? `
      ${InputBtn}{
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
      ? `
      ${InputBtn2}{
        cursor: pointer;
        & > i { 
          color: #494949;
        }
      }
      `
      : `
      ${InputBtn2}{
        cursor: pointer;
        & > i { 
          color: #929292;
        }
      }
  `}

  ${(props) =>
    props.pwInputShow
      ? `

      ${LoginItemID} {
        border-top-left-radius: var(--input-border-radius);
        border-top-right-radius: var(--input-border-radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      ${LoginItemPW} {
        opacity: 1;
      }

      ${LoginItemPW} {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: var(--input-border-radius);
        border-bottom-right-radius: var(--input-border-radius);
      }

      ${InputBtn}{
        opacity: 0;
        visibility: hidden;
        transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-end 80ms;
      }

      ${InputBtn2}{
        opacity: 1;
        visibility: visible;
        transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-start 80ms;
      }
      `
      : `
      ${LoginItemPW} {
        opacity: 0;
      }

      ${InputBtn}{
        opacity: 1;
        visibility: visible;
        transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-start 80ms;
      }

      ${InputBtn2}{
        opacity: 0;
        visibility: hidden;
        transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-end 80ms;
      }
    `};
`;

interface LoginError {
  isError: Boolean;
}

const LoginError = styled.div<LoginError>`
  ${(props) =>
    props.isError
      ? `
      display: block;
      `
      : `
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
  top: 6px;
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
  top: 3em;
  cursor: pointer;

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
`

interface Props {
  // setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
}

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    try {
      const res = await axios.post("/smartstore/commerce/loginbtn", userdata, { withCredentials: true });

      if (res.data.error == "아이디및비밀번호오류") {
        setErrorMessage("아이디 혹은 비밀번호가 틀렸습니다.");
        setIsError(true);
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
          <SVG size={"saw"}>
            <svg id="Outlined" xmlns="http://www.w3.org/2000/svg" className="ac-gn-bagview-nav-svgicon" width="11" height="16" viewBox="0 0 16 25">
              <path
                id="art_"
                d="M15.6094,12.3252a.5142.5142,0,0,0-.2959-.2959l-.5972-.2324a6.6665,6.6665,0,0,0-.16-.917l.4809-.42a.5172.5172,0,0,0-.3291-.9073l-.6372-.0136c-.0654-.1377-.1343-.2784-.2139-.4151s-.1635-.2636-.2519-.3935l.3076-.5576a.517.517,0,0,0-.62-.7393l-.6035.2051a6.68,6.68,0,0,0-.7134-.5977l.0986-.6328a.5172.5172,0,0,0-.43-.5918.54.54,0,0,0-.4052.1084l-.5015.4033A6.911,6.911,0,0,0,9.87,6.01l-.124-.6328a.5178.5178,0,0,0-.9512-.167l-.333.5507a7.2576,7.2576,0,0,0-.92.0039L7.2056,5.207a.518.518,0,0,0-.9512.167l-.125.6377a6.6192,6.6192,0,0,0-.8652.31l-.501-.4063a.5176.5176,0,0,0-.8364.4834l.0991.6358a6.6073,6.6073,0,0,0-.7017.5947L2.71,7.417a.5173.5173,0,0,0-.6211.7392l.3134.5694a6.7192,6.7192,0,0,0-.4653.7959l-.6421.0117a.516.516,0,0,0-.5083.5264.52.52,0,0,0,.1763.38l.4849.4238a6.8261,6.8261,0,0,0-.16.9111l-.6006.23a.5176.5176,0,0,0-.001.9658l.5972.2324a6.6665,6.6665,0,0,0,.16.917l-.4809.419a.5184.5184,0,0,0-.05.7314.52.52,0,0,0,.3789.1758l.6367.0137c.063.1318.1333.2754.2144.416.0673.1172.143.2246.2163.3281l.04.0566-.312.5664a.5176.5176,0,0,0,.2036.7032.52.52,0,0,0,.416.0361l.5967-.2031a6.82,6.82,0,0,0,.7207.5937l-.0991.6348a.5153.5153,0,0,0,.0933.3857.5187.5187,0,0,0,.7421.0977l.5064-.4082a6.6137,6.6137,0,0,0,.8628.3193l.1245.6358a.5139.5139,0,0,0,.22.33.53.53,0,0,0,.3877.0782.5193.5193,0,0,0,.3433-.24l.3388-.56.0577.0049a4.8076,4.8076,0,0,0,.7871.0019l.0669-.0058.3383.5625a.518.518,0,0,0,.9512-.167l.1245-.6348a6.6152,6.6152,0,0,0,.8589-.3193l.5088.4131a.5176.5176,0,0,0,.8364-.4834l-.0991-.6358a6.6173,6.6173,0,0,0,.7017-.5947l.6142.2119a.5174.5174,0,0,0,.6211-.7392l-.3135-.5694a6.6548,6.6548,0,0,0,.4649-.7959l.6421-.0117a.5168.5168,0,0,0,.5088-.5264.5166.5166,0,0,0-.1768-.38l-.4849-.4238a6.6694,6.6694,0,0,0,.16-.9111l.6006-.2315a.5177.5177,0,0,0,.2969-.6689ZM6.4941,13.9043,4.7666,16.8926a5.4449,5.4449,0,0,1,.0044-8.792L6.5,11.0986A2.0525,2.0525,0,0,0,6.4941,13.9043Zm2.1646-1.7822a.7608.7608,0,1,1-.4609-.3555A.7543.7543,0,0,1,8.6587,12.1221ZM7.54,10.499,5.8154,7.5068A5.4579,5.4579,0,0,1,7.9907,7.041h.0239a5.4693,5.4693,0,0,1,5.4068,4.8633l-3.457-.0029a2.0363,2.0363,0,0,0-.18-.43A2.0586,2.0586,0,0,0,7.54,10.499Zm-.0058,4.0049a2.0556,2.0556,0,0,0,2.435-1.4023l3.4512.0029a5.4455,5.4455,0,0,1-7.6147,4.3877Z"
                fill="6E6E73"
              ></path>
            </svg>
          </SVG>
          <LoginArea className="LoginArea">
            <LoginH3 className="LoginH3">Apple Store 관리자 로그인.</LoginH3>
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
                <LoginItemID className="LoginItem">
                  <LoginInputID
                    type="text"
                    name="id"
                    placeholder="아이디"
                    className="LoginInput"
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
                  <span className={IDDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon"} onClick={IDinputDelete}></span>
                </LoginItemID>
                <LoginItemPW className="LoginItem PW">
                  <LoginInputPW
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    className="login-input"
                    ref={pwinput}
                    onClick={() => {
                      setInputClick(true);
                      setInputClickNumber(2);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => handleFocus("pw")}
                    onBlur={handleBlur}
                    onChange={PasswordHandler}
                  />
                  <span className={PWDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon"} onClick={PWinputDelete}></span>
                </LoginItemPW>
                <InputBtn className="id" onClick={LoginBtn}>
                  <i className="shared-icon"></i>
                </InputBtn>
                <InputBtn2 className="pw" onClick={LoginBtn}>
                  <i className="shared-icon"></i>
                </InputBtn2>
              </LoginList>
              <Link to={"./signup"}>
                <SignUpBtn>
                  <span>가입</span>
                </SignUpBtn>
              </Link>

              <LoginError isError={isError}>
                <p className="login-error">ID 또는 암호가 올바르지 않습니다.</p>
                {/* <a className="login-error under" target="_blank">
                  <span className="">암호를 잊으셨습니까?</span>
                </a> */}
              </LoginError>
            </LoginBox>
          </LoginArea>
        </LayoutInner>
      </div>
    </>
  );
}

export default Login;
