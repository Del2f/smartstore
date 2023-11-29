import axios from "../../api/axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import "./Usersign.scss";

interface Country {
  name: string;
  number: number;
}

const Options = styled.div``;

function Usersign() {
  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [Name, setName] = useState("");
  // const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailAuthModal, setEmailAuthModal] = useState(false);
  const [AuthCode, setAuthCode] = useState("");
  const [AuthCodeInput, setAuthCodeInput] = useState("");

  // 휴대폰 국가 코드 선택
  // const [PhoneCountry, setPhoneCountry] = useState<Country | null>({ name: "대한민국", number: 82 });
  // console.log(PhoneCountry);

  // 오류 메시지 상태저장
  const [IdMessage, setIdMessage] = useState<string>("");
  const [PasswordMessage, setPasswordMessage] = useState<string>("");
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState<string>("");
  const [NameMessage, setNameMessage] = useState<string>("");
  const [PhoneMessage, setPhoneMessage] = useState<string>("");
  const [EmailMessage, setEmailMessage] = useState<string>("");

  // 유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isId2, setIsId2] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isEmail2, setIsEmail2] = useState<boolean>(false);
  const [Agree, setAgree] = useState<boolean>(false);
  const [Submit, setSubmit] = useState<boolean>(false);

  const handlers = {
    IdHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsId(false);
      setIsId2(false);
      setId(e.target.value);
  
      if (e.target.value.length < 5 || e.target.value.length > 10) {
        setIdMessage("5글자 이상 10글자 미만으로 입력 해주세요.");
        setIsId(false);
        if (e.target.value === "") {
          setIdMessage("로그인 아이디를 입력해 주세요.");
          setIsId(false);
        }
      } else {
        setIsId(true);
      }
    },
    // 아이디 인증 버튼
    idAuthBtn: async (e: any) => {
      e.preventDefault();
  
      try {
        const res = await axios.post("/smartstore/commerce/usersign/idcheck", userdata, { withCredentials: true });
  
        console.log(res.data);
        if (res.data.errorId == "아이디중복") {
          setIdMessage("이미 가입된 아이디 입니다.");
          setIsId(false);
          setIsId2(false);
        } else if (res.data.errorId == "아이디입력안함") {
          setIdMessage("아이디를 입력 해주세요.");
          setIsId(false);
          setIsId2(false);
        } else if (res.data.errorId == false) {
          setIdMessage("아이디를 다시 확인해주세요.");
          setIsId(false);
          setIsId2(false);
        } else if (res.data.status == true) {
          setIdMessage("가입 가능한 아이디 입니다.");
          setIsId(true);
          setIsId2(true);
        }
      } catch (errors) {
        console.log(errors);
      }
    },
    PasswordHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
  
      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("최소 8자 이상 대소문자, 숫자 및 특수문자를 함께 사용하세요.");
        setIsPassword(false);
        if (e.target.value === "") {
          setPasswordMessage("비밀번호를 입력해 주세요.");
          setIsPassword(false);
        }
      } else {
        setIsPassword(true);
      }
    },
    PasswordConfirmHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      const PWC = e.target.value;
      setPasswordConfirm(PWC);
  
      if (Password !== PWC) {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
        return;
      }
      if (e.target.value === "") {
        setPasswordConfirmMessage("비밀번호를 다시 한 번 입력해 주세요.");
        setIsPasswordConfirm(false);
        return;
      } else {
        setIsPasswordConfirm(true);
      }
    },
    NameHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setNameMessage("2글자 이상 5글자 미만으로 입력 해주세요.");
        setIsName(false);
        if (e.target.value === "") {
          setNameMessage("이름을 입력해 주세요.");
          setIsName(false);
        }
      } else {
        setIsName(true);
      }
    },
    // 휴대폰 국가코드 변경
    // CountryChange: (selected: Country) => {
    //   setPhoneCountry(selected);
    //   setShowdrop(false);
    // },
    // PhoneHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    //   const phoneCurrent = e.target.value;
    //   setPhone(phoneCurrent);
  
    //   if (!phoneRegex.test(phoneCurrent)) {
    //     setPhoneMessage("휴대전화 번호만 입력할 수 있습니다.");
    //     setIsPhone(false);
    //     if (e.target.value === "") {
    //       setPhoneMessage("휴대전화 번호를 입력해 주세요.");
    //       setIsPhone(false);
    //     }
    //   } else {
    //     setIsPhone(true);
    //   }
    // },
    EmailHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if(e.target.value === ""){
        setIsEmail(false);
      }
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  
      if (!emailRegex.test(Email)) {
        setEmailMessage("올바른 이메일 형식으로 입력해 주세요.");
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    },
    onAuthCodeHandler: (e: any) => {
      setAuthCodeInput(e.target.value);
    },
    AuthCodeCheck: (e: any) => {
      e.preventDefault();
  
      if (AuthCodeInput === AuthCode) {
        setIsEmail2(true);
        alert("이메일 인증에 성공하셨습니다");
      } else {
        setIsEmail2(false);
        alert("인증 코드가 일치하지 않습니다.");
      }
    },
    // 이메일 인증 버튼
    emailAuthBtn: async (e: any) => {
      e.preventDefault();

      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      if (!emailRegex.test(Email)) {
        setEmailMessage("올바른 이메일 형식으로 입력해 주세요.");
        setIsEmail(false);
        setIsEmail2(false);
        return;
      }

      const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
      const emailData = {
        id: Id,
        email: Email,
        auth: code,
      };

      try {
        const res = await axios.post("/smartstore/commerce/usersign/sendEmail", emailData, { withCredentials: true });
        
        console.log(res.data);


        if (res.data.errorEmail == "이메일중복") {
          setEmailMessage("이미 가입된 이메일 입니다.");
          setIsEmail(false);
          setIsEmail2(false);
        } else {
          setIsEmail(true);
          setEmailAuthModal(true);
          setAuthCode(code);
        }
      } catch (errors) {
        console.log(errors);
      }
    },
    agree: () => {
      setAgree(!Agree);
    },
    handleSubmit: async (e: any) => {
      e.preventDefault();
  
      // 모든 유효성 검사 통과 여부
      if (Submit == false) {
        return;
      }
  
      try {
        const data = await axios.post("/smartstore/commerce/usersign", userdata, { withCredentials: true }).then((res) => {
          if (res.data.errorEmail == "이메일중복") {
            setEmailMessage("이미 가입된 이메일 입니다.");
            setIsEmail(false);
          }
  
          if (res.data.errorPassword == "비밀번호서로다름") {
            setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
            setIsPasswordConfirm(false);
            return;
          }
  
          if (Submit == true) {
            navigate("/"); // 가입완료시 메인화면으로 이동
          }
        });
      } catch (errors) {
        console.log(errors);
      }
    }
  }

  // 최종 유저 데이터
  const userdata = {
    id: Id,
    password: Password,
    passwordconfirm: PasswordConfirm,
    name: Name,
    // phoneCountry: PhoneCountry,
    // phone: Phone,
    email: Email,
  };

  const [inputClickNumber, setInputClickNumber] = useState(0);
  const [inputClick, setInputClick] = useState(false);

  const inputRefID = useRef<HTMLDivElement>(null);
  const inputRefPW = useRef<HTMLDivElement>(null);
  const inputRefPW2 = useRef<HTMLDivElement>(null);
  const inputRefName = useRef<HTMLDivElement>(null);
  const inputRefNum = useRef<HTMLDivElement>(null);
  const inputRefEmail = useRef<HTMLDivElement>(null);
  const inputRefEmail2 = useRef<HTMLDivElement>(null);

  const [showdropmenu, setShowdrop] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutsidePhoneNum = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
        setShowdrop(false);
      }
    };

    document.addEventListener("mousedown", clickOutsidePhoneNum);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutsidePhoneNum);
    };
  }, [showdropmenu]);

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (inputClickNumber === 1 && inputRefID.current && !inputRefID.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 2 && inputRefPW.current && !inputRefPW.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 3 && inputRefPW2.current && !inputRefPW2.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 4 && inputRefName.current && !inputRefName.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 5 && inputRefNum.current && !inputRefNum.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 6 && inputRefEmail.current && !inputRefEmail.current.contains(e.target)) {
        setInputClick(false);
        setInputClickNumber(0);
      }
      if (inputClickNumber === 7 && inputRefEmail.current && !inputRefEmail.current.contains(e.target)) {
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

  // 메뉴 파트1 옵션 마우스 올렸을때
  useEffect(() => {
    showdropmenu === false
      ? $(".selectize-dropdown-content").children(".option").removeClass("active")
      : $(".selectize-dropdown-content").children(".selected").addClass("active");
    $(".selectize-dropdown-content").on("mouseover", function (e) {
      $(".option").removeClass("active");
      $(e.target).addClass("active");
    });
  });

  // 모든 유효성 검사 통과 체크하기.
  useEffect(() => {
    if (isId && isId2 && isPassword && isPasswordConfirm && isName && isEmail && isEmail2 && Agree) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  });

  // 국가코드 데이터 모음
  // const countries: Country[] = [
  //   { name: "대한민국", number: 82 },
  //   { name: "중국", number: 86 },
  //   { name: "미국", number: 1 },
  //   { name: "영국", number: 44 },
  //   { name: "이탈리아", number: 39 },
  //   { name: "독일", number: 49 },
  //   { name: "프랑스", number: 33 },
  //   { name: "일본", number: 81 },
  //   { name: "뉴질랜드", number: 64 },
  //   { name: "호주", number: 61 },
  //   { name: "대만", number: 886 },
  //   { name: "홍콩", number: 852 },
  //   { name: "싱가포르", number: 65 },
  //   { name: "스위스", number: 41 },
  //   { name: "캐나다", number: 1 },
  //   { name: "아르헨티나", number: 54 },
  //   { name: "베트남", number: 84 },
  //   { name: "스페인", number: 34 },
  //   { name: "인도네시아", number: 62 },
  //   { name: "키르기스스탄", number: 996 },
  //   { name: "필리핀", number: 63 },
  //   { name: "아일랜드", number: 353 },
  //   { name: "핀란드", number: 358 },
  //   { name: "스웨덴", number: 46 },
  //   { name: "태국", number: 66 },
  //   { name: "브라질", number: 55 },
  //   { name: "인도", number: 91 },
  //   { name: "오스트리아", number: 43 },
  //   { name: "스리랑카", number: 94 },
  //   { name: "아랍에미리트", number: 971 },
  //   { name: "네덜란드", number: 31 },
  //   { name: "폴란드", number: 48 },
  //   { name: "세르비아", number: 381 },
  //   { name: "벨기에", number: 32 },
  //   { name: "슬로베니아", number: 386 },
  //   { name: "루마니아", number: 40 },
  //   { name: "덴마크", number: 45 },
  //   { name: "모로코", number: 212 },
  //   { name: "니카라과", number: 505 },
  //   { name: "포르투갈", number: 351 },
  //   { name: "체코", number: 420 },
  //   { name: "사우디아라비아", number: 966 },
  //   { name: "쿠웨이트", number: 965 },
  //   { name: "요르단", number: 962 },
  //   { name: "카타르", number: 974 },
  //   { name: "터키", number: 90 },
  //   { name: "말레이시아", number: 60 },
  //   { name: "불가리아", number: 359 },
  //   { name: "마카오", number: 853 },
  //   { name: "노르웨이", number: 47 },
  //   { name: "헝가리", number: 36 },
  //   { name: "과테말라", number: 502 },
  //   { name: "베네수엘라", number: 58 },
  //   { name: "네팔", number: 977 },
  //   { name: "피지", number: 679 },
  //   { name: "튀니지", number: 216 },
  //   { name: "그리스", number: 30 },
  //   { name: "우즈베키스탄", number: 998 },
  //   { name: "몰타", number: 356 },
  //   { name: "타지키스탄", number: 992 },
  //   { name: "파키스탄", number: 92 },
  //   { name: "남아프리카공화국", number: 27 },
  //   { name: "몽골", number: 976 },
  //   { name: "룩셈부르크", number: 352 },
  //   { name: "쿠바", number: 53 },
  //   { name: "이스라엘", number: 972 },
  //   { name: "아제르바이잔", number: 994 },
  //   { name: "방글라데시", number: 880 },
  //   { name: "페루", number: 51 },
  //   { name: "멕시코", number: 52 },
  //   { name: "코스타리카", number: 506 },
  //   { name: "카자흐스탄", number: 7 },
  //   { name: "나이지리아", number: 234 },
  //   { name: "에스토니아", number: 372 },
  //   { name: "이집트", number: 20 },
  //   { name: "콜롬비아", number: 57 },
  //   { name: "벨라루스", number: 375 },
  //   { name: "미얀마", number: 95 },
  //   { name: "파라과이", number: 595 },
  //   { name: "캄보디아", number: 855 },
  //   { name: "우크라이나", number: 380 },
  //   { name: "엘살바도르", number: 503 },
  //   { name: "세인트루시아", number: 1 },
  //   { name: "리투아니아", number: 370 },
  // ];

  return (
    <>
      <form method="POST" onSubmit={(e) => handlers.handleSubmit(e)}>
        <div className="usersign-layout-wrap">
          <div className="layout-inner">
            <div className="content">
              <h2 className="signup-title">관리자 회원가입</h2>
              <div className="signup-area">
                <h3 className="signup-area-title">
                  회원 정보 입력
                  {/* <span className="accent">필수항목</span> */}
                </h3>
                <ul className="signup-list">
                  <li className="signup-item">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>로그인 아이디</span>
                          {/* <span className="icon-point" /> */}
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="input-box" ref={inputRefID}>
                              <div className={inputClick && inputClickNumber == 1 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="text"
                                  name="id"
                                  placeholder="로그인 아이디"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(1);
                                  }}
                                  onChange={handlers.IdHandler}
                                />
                              </div>
                            </div>
                            <div className="input-btn-wrap">
                              <button className={isId2 == true ? "input-btn input-btn-active" : "input-btn"} onClick={handlers.idAuthBtn}>
                                <span className="text">인증</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className={isId ? "error" : "error-active"}>{IdMessage}</div>
                      </div>
                    </div>
                  </li>
                  <li className="signup-item">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>비밀번호</span>
                          {/* <span className="icon-point" /> */}
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="input-box" ref={inputRefPW}>
                              <div className={inputClick && inputClickNumber == 2 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="password"
                                  name="password"
                                  autoComplete="new-password"
                                  placeholder="비밀번호"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(2);
                                  }}
                                  onChange={handlers.PasswordHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={isPassword ? "error" : "error-active"}>{PasswordMessage}</div>
                      </div>
                    </div>
                  </li>
                  <li className="signup-item">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>비밀번호 확인</span>
                          {/* <span className="icon-point" /> */}
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="input-box" ref={inputRefPW2}>
                              <div className={inputClick && inputClickNumber == 3 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="password"
                                  name="pwcheck"
                                  autoComplete="new-password"
                                  placeholder="비밀번호 확인"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(3);
                                  }}
                                  onChange={handlers.PasswordConfirmHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={isPasswordConfirm ? "error" : "error-active"}>{PasswordConfirmMessage}</div>
                      </div>
                    </div>
                  </li>
                  <li className="signup-item">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>이름</span>
                          {/* <span className="icon-point" /> */}
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="input-box" ref={inputRefName}>
                              <div className={inputClick && inputClickNumber == 4 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="이름"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(4);
                                  }}
                                  onChange={handlers.NameHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="signup-item signup-number">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>휴대전화 번호</span>
                          <span className="icon-help" />
                          <span className="icon-point" />
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="selectize-control" ref={dropmenu}>
                              <div className={showdropmenu ? "selectize-input check" : "selectize-input"} onClick={() => setShowdrop((e) => !e)}>
                                <div className="item">{PhoneCountry?.name + " +" + PhoneCountry?.number}</div>
                              </div>
                              <div className={showdropmenu ? "selectize-dropdown dropdown-active" : "selectize-dropdown"}>
                                <div className="selectize-dropdown-content">
                                  {countries.map((list: Country, index: number) => (
                                    <Options className="option" onClick={() => handlers.CountryChange(list)}>
                                      {list.name + " +" + list.number}
                                    </Options>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="input-area2">
                              <div className="input-number-box" ref={inputRefNum}>
                                <div id={inputClick && inputClickNumber == 5 ? "input-inner-active" : "input-inner"}>
                                  <input
                                    type="text"
                                    name="phone"
                                    placeholder="휴대전화 번호"
                                    className="input"
                                    onClick={() => {
                                      setInputClick(true);
                                      setInputClickNumber(5);
                                    }}
                                    onChange={handlers.PhoneHandler}
                                  />
                                </div>
                              </div>
                              <div className="input-btn-wrap">
                                <button className="input-btn">
                                  <span className="text">인증</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={isPhone ? "error" : "error-active"}>{PhoneMessage}</div>
                      </div>
                    </div>
                  </li> */}
                  <li className="signup-item">
                    <div className="signup-id-pc">
                      <div className="text">
                        <label className="title">
                          <span>이메일 인증</span>
                          {/* <span className="icon-point" /> */}
                        </label>
                        <div className="input-item">
                          <div className="input-area">
                            <div className="input-box" ref={inputRefEmail}>
                              <div className={inputClick && inputClickNumber == 6 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="이메일 인증"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(6);
                                  }}
                                  onChange={handlers.EmailHandler}
                                />
                              </div>
                            </div>
                            <div className="input-btn-wrap">
                              <button className={isEmail ? "input-btn input-btn-active" : "input-btn"} onClick={handlers.emailAuthBtn}>
                                <span className="text">인증번호</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className={EmailAuthModal ? "input-item-mailauth-active" : "input-item-mailauth"}>
                          <div className="input-area">
                            <div className="input-box" ref={inputRefEmail2}>
                              <div className={inputClick && inputClickNumber == 7 ? "input-inner input-inner-active" : "input-inner"}>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="인증번호"
                                  className="input"
                                  onClick={() => {
                                    setInputClick(true);
                                    setInputClickNumber(7);
                                  }}
                                  onChange={handlers.onAuthCodeHandler}
                                />
                              </div>
                            </div>
                            <div className="input-btn-wrap">
                              <button className={isEmail2 ? "input-btn input-btn-active" : "input-btn"} onClick={handlers.AuthCodeCheck}>
                                <span className="text">확인</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className={isEmail ? "error" : "error-active"}>{EmailMessage}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="agree-area">
                <h3 className="agree-title">약관 동의</h3>
                <ul className="agree-check-list">
                  <li className="agree-check-item flex">
                    <input type="checkbox" className="blind" id="checkbox01" onChange={handlers.agree} />
                    <label className="agree-check-box" htmlFor="checkbox01">
                      <span className="agree-ico-box"></span>
                      <span className="agree-ico" />
                    </label>
                    <div className="agree-desc">
                      <a href="{() => false}">
                        <span className="agree-txt">개인정보 수집 및 이용</span>
                      </a>
                      에 동의합니다.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="btn-area">
                <button type="submit" className={Submit ? "btn-area-btn btn-area-btn-active" : "btn-area-btn"}>
                  <span className="btn-txt">가입</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Usersign;
