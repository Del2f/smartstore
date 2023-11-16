// import { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styled, { css } from "styled-components";

// import "./Intro.scss";

// const LayoutInner = styled.div`
//   margin-left: auto;
//   margin-right: auto;
//   width: 980px;
// `;

// const LoginArea = styled.div`
//   max-width: 300px;
//   height: 480px;
//   margin: 0 auto 90px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const LoginH2 = styled.h2`
//   padding-top: 34px;
//   font-size: 40px;
//   font-weight: 700;
// `;

// const LoginH3 = styled.h3`
//   font-size: 24px;
//   font-weight: 600;
// `;

// const LoginBox = styled.div`
//   margin-top: 20px;
//   width: 100%;
//   position: relative;
// `;

// const LoginItem = css`
//   position: relative;
//   width: 100%;
//   height: 44px;
//   font-size: 15px;
//   border-radius: 6px;
//   border: 1px solid #d6d6d6;
//   background: transparent;
//   margin: 0;
//   vertical-align: top;
//   transition: 0.32s cubic-bezier(0.4, 0, 0.6, 1);
//   z-index: 1;
// `;

// const InputStyle = css`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   padding-left: 15px;
//   padding-right: 43px;
//   border-radius: 6px;
//   border: 0;

//   &:focus {
//     border: 0;
//     outline: 0;
//   }

//   &::placeholder {
//     color: #a1a1a1;
//     font-weight: 100;
//   }
// `;

// const LoginItemID = styled.div`
//   ${LoginItem}
// `;

// const LoginInputID = styled.input`
//   ${InputStyle}
// `;

// const LoginItemPW = styled.div`
//   ${LoginItem}
// `;

// const LoginInputPW = styled.input`
//   ${InputStyle}
// `;

// interface LoginList {
//   Id: String;
//   Password: String;
//   InputFocus: string;
//   pwInputShow: Boolean;
//   inputClick: Boolean;
//   inputClickNumber: Number;
// }

// const LoginList = styled.ul<LoginList>`
//   --pw-height: ${(props) => (props.pwInputShow ? `44px` : `0px`)};
//   --input-opacity: ${(props) => (props.pwInputShow ? `1` : `0`)};
//   /* min-height: 158px; */
//   /* max-height: none; */

//   @keyframes fade-in {
//     0% {
//       opacity: 0;
//     }

//     to {
//       opacity: 0.6;
//     }
//   }

//   ${(props) =>
//     props.InputFocus === "id"
//       ? `
//   ${LoginItemID}{
//     border: 1px solid #0070c9;
//       border-width: 1px;
//       box-shadow: 0 0 0 1px #0070c9;
//       outline: 0;
//       z-index: 2;
//     }
    
//     ${InputBtn}{
//         z-index: 2;
//       }



//     `
//       : `
// ${LoginItemPW}{
//   border: 1px solid #0070c9;
//   border-width: 1px;
//   box-shadow: 0 0 0 1px #0070c9;
//   outline: 0;
//   z-index: 2;
// }

// ${InputBtn2}{
//         z-index: 2;
//       }
// `}

//   ${(props) =>
//     props.pwInputShow === false && props.Id.length > 0
//       ? `
//       ${InputBtn}{
//         cursor: pointer;
//         & > i { 
//           color: #494949;
//         }
//       }
//       `
//       : `

//   `}

//   ${(props) =>
//     props.pwInputShow === true && props.Password.length > 0
//       ? `
//       ${InputBtn2}{
//         cursor: pointer;
//         & > i { 
//           color: #494949;
//         }
//       }
//       `
//       : `
//       ${InputBtn2}{
//         cursor: pointer;
//         & > i { 
//           color: #929292;
//         }
//       }
//   `}

//   ${(props) =>
//     props.pwInputShow
//       ? `

//       ${LoginItemID} {
//         border-top-left-radius: 6px;
//         border-top-right-radius: 6px;
//         border-bottom-left-radius: 0;
//         border-bottom-right-radius: 0;
//       }

//       ${LoginItemPW} {
//         opacity: 1;
//       }

//       ${LoginItemPW} {
//         border-top-left-radius: 0;
//         border-top-right-radius: 0;
//         border-bottom-left-radius: 6px;
//         border-bottom-right-radius: 6px;
//       }

//       ${InputBtn}{
//         opacity: 0;
//         visibility: hidden;
//         transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-end 80ms;
//       }

//       ${InputBtn2}{
//         opacity: 1;
//         visibility: visible;
//         transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-start 80ms;
//       }
//       `
//       : `
//       ${LoginItemPW} {
//         opacity: 0;
//       }

//       ${InputBtn}{
//         opacity: 1;
//         visibility: visible;
//         transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-start 80ms;
//       }

//       ${InputBtn2}{
//         opacity: 0;
//         visibility: hidden;
//         transition: opacity .32s cubic-bezier(.4, 0, .6, 1) 80ms, visibility .32s step-end 80ms;
//       }
//     `};
// `;

// interface LoginError {
//   isError: Boolean;
// }

// const LoginError = styled.div<LoginError>`
//   ${(props) =>
//     props.isError
//       ? `
//       display: block;
//       `
//       : `
//       display: none;
//   `};

//   color: #503e30;
//   background-color: #fae9a3;
//   position: absolute;
//   width: 100%;
//   margin-left: -50%;
//   border-radius: 5px;
//   left: 50%;
//   border: 1px solid rgba(185, 149, 1, 0.47);
//   box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.1);
//   margin-top: 15px;
//   padding: 11px;
//   text-align: center;

//   &::before {
//     width: 15px;
//     height: 15px;
//     background-color: #fae9a3;
//     content: "";
//     position: absolute;
//     left: 47.2%;
//     -webkit-transform: rotate(135deg) skewX(5deg) skewY(5deg);
//     -ms-transform: rotate(135deg) skewX(5deg) skewY(5deg);
//     -o-transform: rotate(135deg) skewX(5deg) skewY(5deg);
//     transform: rotate(135deg) skewX(5deg) skewY(5deg);
//     top: -8px;
//     border-left: 1px solid rgba(185, 149, 1, 0.47);
//     border-bottom: 1px solid rgba(185, 149, 1, 0.47);
//     box-shadow: -1px 1px 2px -1px rgba(185, 149, 1, 0.47);
//   }

//   & > p {
//     font-size: 13px;
//     font-weight: 600;
//   }

//   & > a {
//     color: #503e30;
//     text-decoration: underline;
//   }

//   & > a > span {
//     font-size: 12px;
//     font-weight: 500;
//   }
// `;

// interface LoginBtn {}

// const InputBtn = styled.button<LoginBtn>`
//   position: absolute;
//   background: transparent;
//   margin: 0;
//   border: 1px solid transparent;
//   top: 6px;
//   right: 10px;
//   padding: 0 1px 0 2px;
//   z-index: 1;

//   & > i {
//     font-size: 26px;
//     vertical-align: top;
//     color: #929292;
//   }

//   i:before {
//     font-family: shared-icons;
//     vertical-align: middle;
//     line-height: 1;
//     font-weight: 400;
//     font-style: normal;
//     content: "\f127";
//   }
// `;

// const InputBtn2 = styled(InputBtn)`
//   top: 3em;
//   cursor: pointer;

//   & > i {
//     color: #494949;
//   }
// `;

// function Intro() {
//   const navigate = useNavigate();
//   const [showNavdropmenu, setShowNavdropmenu] = useState(false);

//   // 유효성 검사
//   const [isError, setIsError] = useState<boolean>(false);

//   const [pwInputShow, setPwInputShow] = useState(false);
//   const [IDDeleteIconShow, setIDDeleteIconShow] = useState(false);
//   const [PWDeleteIconShow, setPWDeleteIconShow] = useState(false);

//   const [inputClickNumber, setInputClickNumber] = useState<Number>(0);
//   const [inputClick, setInputClick] = useState<Boolean>(false);

//   const idinput = useRef<any>(null);
//   const pwinput = useRef<any>(null);
//   const navdropmenu = useRef<HTMLLIElement>(null);
//   const inputRef = useRef<HTMLUListElement>(null);

//   const IDinputDelete = () => {
//     idinput.current.value = null;
//   };

//   const PWinputDelete = () => {
//     pwinput.current.value = null;
//   };

//   useEffect(() => {
//     const clickOutside1 = (e: any) => {
//       if (showNavdropmenu && navdropmenu.current && !navdropmenu.current.contains(e.target)) {
//         setShowNavdropmenu(false);
//       }
//     };
//     document.addEventListener("mousedown", clickOutside1);
//     return () => {
//       // Cleanup the event listener
//       document.removeEventListener("mousedown", clickOutside1);
//     };
//   }, [showNavdropmenu]);

//   return (
//     <>
//       <Link to="./commerce/login">
//         <button className="btn btn-login">
//           <span>로그인하기</span>
//         </button>
//       </Link>
//       <Link to="./commerce">
//         <button className="btn btn-join">
//           <span>가입하기</span>
//         </button>
//       </Link>
//       <form onSubmit={(e) => LoginBtn(e)}>
//         <div className="userlogin-layout-wrap">
//           <LayoutInner className="LayoutInner">
//             <LoginH2>더욱 빠르게 결제하시려면 로그인하세요.</LoginH2>
//             <LoginArea className="LoginArea">
//               <LoginH3 className="LoginH3">Apple Store에 로그인하세요</LoginH3>
//               <LoginBox className="LoginBox">
//                 <LoginList
//                   className="LoginList"
//                   ref={inputRef}
//                   Id={Id}
//                   Password={Password}
//                   pwInputShow={pwInputShow}
//                   inputClick={inputClick}
//                   inputClickNumber={inputClickNumber}
//                   InputFocus={InputFocus}
//                 >
//                   <LoginItemID className="LoginItem">
//                     <LoginInputID
//                       type="text"
//                       name="id"
//                       placeholder="아이디"
//                       className="LoginInput"
//                       ref={idinput}
//                       onKeyDown={handleKeyDown}
//                       onClick={() => {
//                         setInputClick(true);
//                         setInputClickNumber(1);
//                       }}
//                       onFocus={() => handleFocus("id")}
//                       onBlur={handleBlur}
//                       onChange={IdHandler}
//                     />
//                     <span className={IDDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon"} onClick={IDinputDelete}></span>
//                   </LoginItemID>
//                   <LoginItemPW className="LoginItem PW">
//                     <LoginInputPW
//                       type="password"
//                       name="password"
//                       placeholder="비밀번호"
//                       className="login-input"
//                       ref={pwinput}
//                       onClick={() => {
//                         setInputClick(true);
//                         setInputClickNumber(2);
//                       }}
//                       onFocus={() => handleFocus("pw")}
//                       onBlur={handleBlur}
//                       onChange={PasswordHandler}
//                     />
//                     <span className={PWDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon"} onClick={PWinputDelete}></span>
//                   </LoginItemPW>
//                   <InputBtn type="submit" className="id">
//                     <i className="shared-icon"></i>
//                   </InputBtn>
//                   <InputBtn2 type="submit" className="pw">
//                     <i className="shared-icon"></i>
//                   </InputBtn2>
//                 </LoginList>
//                 <LoginError isError={isError}>
//                   <p className="login-error">Apple&nbsp;ID 또는 암호가 올바르지 않습니다.</p>
//                   <a className="login-error under" target="_blank">
//                     <span className="">암호를 잊으셨습니까?</span>
//                   </a>
//                 </LoginError>
//               </LoginBox>
//             </LoginArea>
//           </LayoutInner>
//         </div>
//       </form>
//     </>
//   );
// }

// export default Intro;
