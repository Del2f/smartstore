import axios from "../../api/axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Usersign.scss";
import { regionsType } from "../../types/regions";
import privacyIcon from "@img/privacy-icon.png";
import regionsJson from "../../regions.json";
import { useCookies } from "react-cookie";

function Usersign() {
  const navigate = useNavigate();

  const [cookies] = useCookies(["userjwt"]);

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));

  // 오류메시지 상태저장
  const [PasswordMessage, setPasswordMessage] = useState<string>("");
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState<string>("");
  const [NameMessage, setNameMessage] = useState<string>("");
  const [PhoneMessage, setPhoneMessage] = useState<string>("");
  const [EmailMessage, setEmailMessage] = useState<string>("");
  const [EmailAuthMessage, setEmailAuthMessage] = useState<string>("");
  const [TimeOverMessage, setTimeOverMessage] = useState<string>("");
  const [AgreeMessage, setAgreeMessage] = useState<string>("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean | null>(null);
  const [isName, setIsName] = useState<boolean | null>(null);

  const [isEmail, setIsEmail] = useState<boolean | null>(null); // 이메일 검사
  const [isEmail2, setIsEmail2] = useState<boolean | null>(null); // 인증 코드 검사
  const [isEmailCodeSend, setIsEmailCodeSend] = useState<boolean | null>(null); // 인증 코드 전송 여부
  const [isEmailModal, setIsEmailModal] = useState<boolean>(false); // 이메일 검사 모달창
  const [isTimeOver, setIsTimeOver] = useState<boolean | null>(null); // 인증 코드 시간 초과
  const [countdown, setCountdown] = useState<number>(60); // 카운트다운 초기화

  const [isPhone, setIsPhone] = useState<boolean | null>(null);
  const [isAgree, setIsAgree] = useState<boolean | null>(null);
  const [Submit, setSubmit] = useState<boolean>(false);

  const is = {
    isName: isName,
    isEmail: isEmail,
    isEmail2: isEmail2,
    isPassword: isPassword,
    isPasswordConfirm: isPasswordConfirm,
    isPhone: isPhone,
    isAgree: isAgree,
    Submit: Submit,
    isEmailModal: isEmailModal,
    isEmailCodeSend: isEmailCodeSend,
  };

  const error = {
    name: NameMessage,
    email: EmailMessage,
    email2: EmailAuthMessage,
    password: PasswordMessage,
    passwordConfirm: PasswordConfirmMessage,
    phone: PhoneMessage,
    agree: AgreeMessage,
  };

  // console.log(is);
  // console.log(error);

  const inputRefPW = useRef<HTMLDivElement>(null);
  const inputRefPW2 = useRef<HTMLDivElement>(null);
  const inputRefName = useRef<HTMLDivElement>(null);
  const inputRefNum = useRef<HTMLDivElement>(null);
  const inputRefEmail = useRef<HTMLDivElement>(null);

  const [selectedRegion, setSelectedRegion] = useState("+82 (대한민국)");

  const dropMenuRef = useRef(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const regions: regionsType[] = regionsJson as regionsType[];

  const userdata = {
    name: name,
    email: email,
    password: password,
    passwordconfirm: passwordConfirm,
    phone: phone,
    // postcode: PostCode,
    // address: Address,
    // detailaddress: DetailAddress,
  };

  // 테스트용 데이터
  // useEffect(() => {
  //   console.log("테스트용 데이터 입력");
  //   setName("정영일");
  //   setEmail("thanks6@naver.com");
  //   setPassword("45124512a");
  //   setPasswordConfirm("45124512a");
  //   setPhone("01064734511");

  //   setIsName(true);
  //   setIsEmail(true);
  //   setIsPassword(true);
  //   setIsPasswordConfirm(true);
  //   setIsPhone(true);
  // }, []);

  useEffect(() => {
    if (cookies.userjwt) {
      navigate("/shop");
      return;
    }
  }, []);

  // 현재 가입 조건 실시간 확인
  useEffect(() => {
    if (!(isName && isEmail && isPassword && isPasswordConfirm && isPhone && isAgree)) {
      setSubmit(false);
      return;
    }
  }, [isName, isEmail, isPassword, isPasswordConfirm, isPhone, isAgree]);

  useEffect(() => {
    const emailAuth = async () => {
      if (Submit) {
        timeReset(); // 전송 버튼 클릭 시 카운트 다운 및 시간 초과 메시지 초기화
        setIsEmailModal(true);
        setIsEmailCodeSend(true);
  
        const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
        const emailData = {
          name: name,
          email: email,
          auth: code,
        };
  
        try {
          const res = await axios.post("/smartstore/user/usersign/sendEmail", emailData, { withCredentials: true });
          console.log(res.data);
  
          if (res.data.status) {
            // 정상적으로 전달받을 시 이메일 코드를 생성합니다.
            setAuthCode(code);
            return;
          }
        } catch (errors) {
          console.log(errors);
        }
      }
    };

    emailAuth();
  }, [Submit]);

  // input checkbox를 빠르게 클릭하면 focus가 해제 되는것을 방지.
  const handleClick = () => {
    setTimeout(() => {
      if (checkboxRef.current) {
        checkboxRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    let timer;

    if (isEmail2) {
      setIsEmailCodeSend(null);
      setCountdown(60);
      return;
    }

    if (countdown > 0 && isEmailCodeSend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsEmail2(null);
      setSubmit(false);

      setAuthCode(null); // 인증 코드 초기화
      setIsEmailCodeSend(null); // 이메일 코드 전송 상태 초기화
      setIsTimeOver(true); // 시간 초과
      setTimeOverMessage("인증 시간이 초과 되었습니다. 재시도 해주세요.");
      setEmailAuthMessage("");
    }
    return () => clearTimeout(timer);
  }, [countdown, isEmailCodeSend, isEmail2]);

  useEffect(() => {
    if (isEmailModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트가 언마운트될 때 스크롤 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEmailModal]);

  const timeReset = (): Promise<void> => {
    return new Promise((resolve) => {
      setCountdown(60);
      setCode(['', '', '', '', '', '']);

      setIsEmail2(null);
      setIsTimeOver(null);
      setIsEmailCodeSend(null);

      setEmailAuthMessage("");
      setTimeOverMessage("");
    });
  };

  const handleSelectChange = (e: any) => {
    const selectedValue = e.target.value;
    setSelectedRegion(selectedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value === "" || /^[0-9]$/.test(value)) {
      // Allow numeric input or empty string
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input field
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^[0-9]{6}$/.test(pasteData)) {
      // Only process if the pasted data is a 6-digit number
      const newCode = pasteData.split("");
      setCode(newCode);
      newCode.forEach((digit, idx) => {
        const input = document.getElementById(`code-input-${idx}`);
        if (input) {
          (input as HTMLInputElement).value = digit;
        }
      });
      // Move focus to the last input field
      const lastInput = document.getElementById(`code-input-5`);
      if (lastInput) {
        (lastInput as HTMLInputElement).focus();
      }
    }
    e.preventDefault(); // Prevent the default paste behavior
  };

  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCurrent = e.target.value;
    setName(nameCurrent);
    setIsName(null);
    setNameMessage("");

    if (nameCurrent.length > 2 && nameCurrent.length < 5) {
      setIsName(true);
      setNameMessage("");
      return;
    }
  };

  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    console.log("PasswordHandler");

    setPassword(passwordCurrent);
    // setIsPassword(null);
    setPasswordMessage("");

    if (passwordRegex.test(passwordCurrent)) {
      setIsPassword(true);
      setPasswordMessage("");
      return;
    }
  };

  const PasswordConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PWC = e.target.value;
    setPasswordConfirm(PWC);
    setIsPasswordConfirm(null);
    setPasswordConfirmMessage("");

    if (password === PWC) {
      setIsPasswordConfirm(true);
      setPasswordConfirmMessage("");
      return;
    }
  };

  const PhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const phoneCurrent = e.target.value;
    setPhone(phoneCurrent);
    setPhoneMessage("");
    setIsPhone(null);

    if (phoneRegex.test(phoneCurrent)) {
      setIsPhone(true);
      setPhoneMessage("");
      return;
    }
  };

  // const AddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // const phoneRegex =/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
  //   const AddressCurrent = e.target.value;
  //   setAddress(AddressCurrent);

  //   if (!AddressCurrent) {
  //     // setAddressMessage('휴대전화 번호만 입력할 수 있습니다.')
  //     // setIsPhone(false)
  //     // if (e.target.value == ''){
  //     setAddressMessage("주소를 입력해 주세요.");
  //     setIsAddress(false);
  //     // }
  //   } else {
  //     setIsAddress(true);
  //   }
  // };

  // const addresshandle = {
  //   // 버튼 클릭 이벤트
  //   clickButton: () => {
  //     setOpenPostcode((current) => !current);
  //   },

  //   // 주소 선택 이벤트
  //   selectAddress: (data: any) => {
  //     console.log(`
  //               주소: ${data.address},
  //               우편번호: ${data.zonecode}
  //           `);
  //     setIsAddress(true);
  //     setOpenPostcode(false);
  //     setPostCode(data.zonecode);
  //     setAddress(data.address);
  //   },
  // };

  const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    setEmailMessage("");
    setIsEmail(null);

    setIsEmailCodeSend(false);

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (email && emailRegex.test(email)) {
      setIsEmail(true);
      setEmailMessage("");
      return;
    }
  };

  const agreeHandler = () => {
    if (isAgree) {
      setIsAgree(null);
      setAgreeMessage("");
    }
    if (!isAgree) {
      setIsAgree(true);
      setAgreeMessage("");
    }
  };

  // const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
  //   console.log("handleBlur실행");

  //   let value: string;
  //   if (typeof e === "string") {
  //     value = e;
  //   } else if (e === null) {
  //     value = "";
  //   } else {
  //     value = e.target.value;
  //   }

  //   if (!value) {
  //     return;
  //   }

  //   if (type === "name") {
  //     const nameCurrent = value;
  //     setName(nameCurrent);
  //     // errorhandle(e.target.value, type);
  //     return;
  //   }

  //   if (type === "email") {
  //     const emailCurrent = value;
  //     setEmail(emailCurrent);
  //     // errorhandle(e.target.value, type);
  //     return;
  //   }

  //   if (type === "pass") {
  //     const passwordCurrent = value;
  //     setPassword(passwordCurrent);
  //     // errorhandle(e.target.value, type);
  //     return;
  //   }

  //   if (type === "pass2") {
  //     const password2Current = value;
  //     setPasswordConfirm(password2Current);
  //     // errorhandle(e.target.value, type);
  //     return;
  //   }

  //   if (type === "phone") {
  //     const phoneCurrent = value;
  //     setPhone(phoneCurrent);
  //     // errorhandle(e.target.value, type);
  //     return;
  //   }
  // };

  // 에러 체크
  const errorhandle = async (
    from: string,
    type: string,
    state: string | null,
    isState: boolean | null,
    setIsState: React.Dispatch<React.SetStateAction<boolean | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // setIsState(null);
    setMessage("");

    if (type === "name") {
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
          setMessage("이름을 입력하십시오.");
          return;
        }
      }

      if (state && (state.length < 2 || state.length > 5)) {
        setMessage("2글자 이상 5글자 미만으로 입력 해주세요.");
        setIsState(false);
        return;
      } else {
        setMessage("");
        setIsState(true);
        return;
      }
    }

    if (type === "email") {
      const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      setIsEmail(null);
      setIsEmail2(null);
      setMessage("");

      if (from === "onblur") {
        if (!state) {
          setIsEmail(null);
          setIsEmail2(null);
          return;
        }
      } else {
        if (!state) {
          setIsEmail(false);
          setMessage("Apple ID로 사용할 유효한 이메일 주소를 입력하십시오.");
          return;
        }
      }

      if (!emailRegex.test(state)) {
        setMessage("Apple ID로 사용할 유효한 이메일 주소를 입력하십시오.");
        setIsEmail(false);
        return;
      } else {
        try {
          const res = await axios.post("/smartstore/user/usersign/emailcheck", { email }, { withCredentials: true });

          if (res.data.error === "duplicate") {
            // 중복 체크
            setEmailMessage("해당 이메일 주소를 사용할 수 없습니다. 다른 주소를 선택하십시오.");
            setIsEmail(false);
            return;
          } else {
            setIsEmail(true);
            return;
          }
        } catch (errors) {
          console.log(errors);
        }
        return;
      }
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z]).{6,}$/;

    if (type === "pass") {
      if ((from === "submit" && state === null) || "") {
        setIsState(false);
        return;
      }

      if (state && !passwordRegex.test(state)) {
        setIsState(false);
        setMessage("최소 6자 이상 숫자와 소문자를 함께 사용하세요.");
        return;
      } else {
        if ((state !== passwordConfirm) && (passwordConfirm !== null)) {
          setIsState(false);
          setIsPasswordConfirm(null);
          setMessage('비밀번호가 일치하지 않습니다.');
          setPasswordConfirmMessage('');
          return;
        }

        if (state && passwordConfirm && state === passwordConfirm) {
          setIsState(true);
          setIsPasswordConfirm(true);
          setMessage('');
          setPasswordConfirmMessage('');
          return;
        } 
      }
    }

    if (type === "pass2") {
      console.log("pass2");

      if ((from === "onblur" && state === null) || "") {
        setIsState(null);
        setMessage("");
        return;
      }
      if ((from === "submit" && state === null) || "") {
        setIsState(false);
        setMessage("암호를 재입력하십시오.");
        return;
      }

      if (password === '' && state === '') {
        setIsState(null);
        setMessage("");
      }

      if (state && password && state === password) {
        setIsState(true);
        setMessage("");
        return;
      }

      if (state !== password) {
        if (state === '' || null) {
          setIsState(null);
          setMessage("");
          return;
        }
        setIsState(false);
        setMessage("비밀번호가 일치하지 않습니다.");
        setIsPassword(null);
        setPasswordMessage('');
        return;
      }
    }

    if (type === "phone") {
      const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      setIsPhone(null);
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
        setPhoneMessage("휴대전화 번호만 입력할 수 있습니다.");
        setIsPhone(false);
      } else {
        setIsPhone(true);
      }
    }

    if (type === "agree") {
      setIsState(null);
      setMessage("");

      if (!isState) {
        setMessage("사용자의 개인 정보 수집, 사용 및 처리에 동의해야 합니다.");
        setIsState(false);
        return;
      } else {
        setMessage("");
        setIsState(true);
        return;
      }
    }
  };

  // 아이디 인증 버튼
  // const idAuthBtn = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post("/smartstore/user/usersign/idcheck", userdata, { withCredentials: true });

  //     if (res.data.errorId === "아이디중복") {
  //       setIdMessage("이미 가입된 아이디 입니다.");
  //       setIsId(false);
  //       setIsId2(false);
  //     } else if (res.data.errorId === "아이디입력안함") {
  //       setIdMessage("아이디를 입력 해주세요.");
  //       setIsId(false);
  //       setIsId2(false);
  //     } else if (res.data.errorId === false) {
  //       setIdMessage("아이디를 다시 확인해주세요.");
  //       setIsId(false);
  //       setIsId2(false);
  //     } else {
  //       setIdMessage("가입 가능한 아이디 입니다.");
  //       setIsId(true);
  //       setIsId2(true);
  //     }
  //   } catch (errors) {
  //     console.log(errors);
  //   }
  // };

  // 이메일 인증 전송 버튼
  const emailAuthBtn = async (e: any) => {
    e.preventDefault();

    if (isEmailCodeSend) {
      // 코드가 전송 되었는데 코드 재전송을 눌렀을때
      setIsEmail2(false);
      setEmailAuthMessage("전송된 코드를 입력하거나 60초를 기다려 주세요.");
      return;
    }

    if (!(isName && isEmail && isPassword && isPasswordConfirm && isPhone && isAgree)) {
      console.log("에러 체크");
      errorhandle("submit", "name", name, isName, setIsName, setNameMessage);
      errorhandle("submit", "email", email, isEmail, setIsEmail, setEmailMessage);
      errorhandle("submit", "pass", password, isPassword, setIsPassword, setPasswordMessage);
      errorhandle("submit", "pass2", passwordConfirm, isPasswordConfirm, setIsPasswordConfirm, setPasswordConfirmMessage);
      errorhandle("submit", "phone", phone, isPhone, setIsPhone, setPhoneMessage);
      errorhandle("submit", "agree", "agree", isAgree, setIsAgree, setAgreeMessage);
      return;
    } else {
      console.log("에러 없음");
      setSubmit(true);

      return;
    }
  };

  // 이메일 인증 확인 버튼
  const AuthCodeCheck = async (e: any) => {
    e.preventDefault();

    const authCodeInput = code.join("");
    console.log(authCodeInput);
    console.log(authCode);
    if (isTimeOver || isEmail2) {
      // 인증시간 초과 혹은 인증 확인되었을때 return
      return;
    }

    if (authCodeInput === authCode) {
      console.log("코드가 확인 되었습니다.");
      setAuthCode(null);
      setIsEmail2(true);

      setIsTimeOver(false);
      setEmailAuthMessage("인증 코드가 확인 되었습니다.");

      try {
        const res = await axios.post("/smartstore/user/usersign", userdata, { withCredentials: true });
        
        if (res.data.errorEmail === "이메일중복") {
          setEmailMessage("이미 가입된 이메일 입니다.");
          setIsEmail(false);
          return;
        }

        if (res.data.errorPassword === "비밀번호서로다름") {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
          return;
        }

        console.log(res.data);
        if (res.data.status) {
          navigate("/shop"); // 가입완료시 메인화면으로 이동
          return;
        }
      } catch (errors) {
        console.log(errors);
      }
      return;
    } else {
      console.log("코드 값이 다릅니다.");
      setIsEmail2(false);
      setEmailAuthMessage("인증 코드가 일치 하지 않습니다.");
      return;
    }
  };

  // 이메일 인증 취소 버튼
  const AuthCodeCancel = () => {
    timeReset();
    setSubmit(false);
    setIsEmailModal(false);
  };

  // 핸드폰번호 국가 선택 모달닫기
  // useEffect(() => {
  //   const clickOutsidePhoneNum = (e: any) => {
  //     // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  //     // useRef의 current 값은 선택한 DOM을 말함.
  //     // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

  //     if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
  //       setShowdrop(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", clickOutsidePhoneNum);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", clickOutsidePhoneNum);
  //   };
  // }, [showdropmenu]);

  return (
    <>
      <div className="localnav-content">
        <div className="localnav-inner flex flex-ju-bt flex-vertical-center">
          <div>
            <h3 className="localnav-title">Apple ID</h3>
          </div>
          <div className="flex flex-vertical-center flex-ju-bt gap-20px">
            <span className="localnav-menu">로그인</span>
            <span className="localnav-menu">Apple ID 생성</span>
            <span className="localnav-menu">FAQ</span>
          </div>
        </div>
      </div>
      <div className="user-usersign-layout-wrap">
        <div className="content">
          <div className="signup-area">
            <h1 className="signup-area-title">Apple ID 생성</h1>
            <h2 className="sub-title">하나의 Apple ID로 모든 Apple 서비스를 이용할 수 있습니다.</h2>
            <div className="section first">
              {/* 이름 */}
              <div className="section-inner">
                <div className="signup-id-pc">
                  <div className="input-item">
                    <div className="input-area">
                      <div className="input-wrap" ref={inputRefName}>
                        <input
                          type="text"
                          className={`input2 ${isName !== null && !isName ? "error" : ""} ${name ? "not-empty" : ""}`}
                          value={name || ""}
                          onBlur={(e) => errorhandle("onblur", "name", name, isName, setIsName, setNameMessage)}
                          onChange={NameHandler}
                        />
                        <span className={`input2-text ${isName !== null && !isName ? "input-text-error" : ""}`}>이름</span>
                      </div>
                    </div>
                  </div>
                  <div className={`error-wrap ${isName !== null && !isName ? "error-message-active" : ""}`}>
                    <span>{NameMessage}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="section second">
              {/* 이메일 */}
              <div className="section-inner">
                <div className="signup-id-pc">
                  <div className="input-item">
                    <div className="input-area">
                      <div className="input-wrap" ref={inputRefEmail}>
                        <input
                          type="text"
                          className={`margin-bottom-4px input2 ${isEmail !== null && !isEmail ? "error" : ""} ${email && "not-empty"}`}
                          value={email || ""}
                          onBlur={(e) => errorhandle("onblur", "email", email, isEmail, setIsEmail, setEmailMessage)}
                          onChange={EmailHandler}
                        />
                        <span className={`input2-text ${isEmail !== null && !isEmail ? "input-text-error" : ""}`}>name@example.com</span>
                      </div>
                      {/* <button
                        className={`input-auth-btn ${isEmail && "input-auth-btn-active"} ${isEmail !== null && !isEmail ? "error-opacity" : ""}`}
                        onClick={emailAuthBtn}
                      >
                        <span className={"input-auth-text"}>전송</span>
                      </button> */}
                      <div
                        className={`error-wrap success-default-message ${isEmailCodeSend && "success-message-active"} ${
                          isEmail !== null && !isEmail ? "error-message-active" : ""
                        }`}
                      >
                        <span>{EmailMessage}</span>
                      </div>
                      <div className="input-default-message">
                        <span>새 Apple ID로 사용될 주소입니다.</span>
                      </div>
                    </div>
                  </div>
                  {/* 인증번호 */}
                  {/* <div className="input-area">
                    <div className="input-wrap" ref={inputRefEmail2}>
                      <input
                        type="text"
                        className={`input2 ${isTimeOver || (isEmail2 !== null && !isEmail2) ? "margin-bottom-4px error" : ""} ${
                          authCodeInput ? "not-empty" : ""
                        }`}
                        onChange={onAuthCodeHandler}
                      />
                      <span className={`input2-text ${isTimeOver || (isEmail2 !== null && !isEmail2) ? "input-text-error" : ""}`}>인증번호</span>
                    </div>
                    <button className={`input-auth-btn ${isEmail2 && "input-auth-btn-active"}`} onClick={AuthCodeCheck}>
                      <span className="input-auth-text">확인</span>
                    </button>
                    <div className={`error-wrap ${isTimeOver ? "error-message-active" : "error-default"}`}>
                      <span>{TimeOverMessage}</span>
                    </div>
                    <div className={`error-wrap ${isEmail2 !== null && !isEmail2 ? "error-message-active" : "error-default"}`}>
                      <span>{EmailAuthMessage}</span>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* 비밀번호 */}
              <div className="section-inner">
                <div className="signup-id-pc">
                  <div className="input-item">
                    <div className="input-area">
                      <div className="input-wrap" ref={inputRefPW}>
                        <input
                          type="password"
                          className={`input2 ${isPassword !== null && !isPassword ? "error" : ""} ${password ? "not-empty" : ""}`}
                          value={password || ""}
                          onBlur={(e) => errorhandle("onblur", "pass", password, isPassword, setIsPassword, setPasswordMessage)}
                          onChange={PasswordHandler}
                        />
                        <span className={`input2-text ${isPassword !== null && !isPassword ? "input-text-error" : ""}`}>암호</span>
                      </div>
                    </div>
                    <div
                      className={`${PasswordMessage.length > 1 && isPassword !== null && !isPassword ? "error-message-active" : "error-default"}`}
                    >
                      {PasswordMessage}
                    </div>
                  </div>
                </div>
              </div>
              {/* 비밀번호 재확인 */}
              <div className="section-inner">
                <div className="signup-id-pc">
                  <div className="input-item">
                    <div className="input-area">
                      <div className="input-wrap" ref={inputRefPW2}>
                        <input
                          type="password"
                          className={`input2 ${isPasswordConfirm !== null && !isPasswordConfirm ? "error" : ""} ${
                            passwordConfirm ? "not-empty" : ""
                          }`}
                          value={passwordConfirm || ""}
                          onBlur={(e) =>
                            errorhandle("onblur", "pass2", passwordConfirm, isPasswordConfirm, setIsPasswordConfirm, setPasswordConfirmMessage)
                          }
                          onChange={PasswordConfirmHandler}
                        />
                        <span className={`input2-text ${isPasswordConfirm !== null && !isPasswordConfirm ? "input-text-error" : ""}`}>암호 확인</span>
                      </div>
                    </div>
                    <div className={`${isPasswordConfirm !== null && !isPasswordConfirm ? "error-message-active" : ""}`}>
                      {PasswordConfirmMessage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section third">
              {/* 핸드폰 번호 */}
              <div className="section-inner signup-number">
                <div className="signup-id-pc">
                  <div className="input-item">
                    <div className="input-area">
                      <div className="input-wrap regions" ref={dropMenuRef}>
                        <select className="select" value={selectedRegion} onChange={handleSelectChange}>
                          {regions.map((region, index) => (
                            <option key={index} className="option" value={`${region.name}(${region.code})`}>
                              {region.code} ({region.name})
                            </option>
                          ))}
                        </select>
                        <span className="icon arrow"></span>
                      </div>
                      <div className="input-area2">
                        <div className="input-wrap" ref={inputRefNum}>
                          <input
                            type="text"
                            className={`input2 ${isPhone !== null && !isPhone ? "error" : ""} ${phone ? "not-empty" : ""}`}
                            value={phone || ""}
                            onBlur={(e) => errorhandle("onblur", "phone", phone, isPhone, setIsPhone, setPhoneMessage)}
                            onChange={PhoneHandler}
                          />
                          <span className={`input2-text ${isPhone !== null && !isPhone ? "input-text-error" : ""}`}>전화번호</span>
                        </div>
                        {/* <div className="input-btn-wrap">
                            <button className={isPhone ? "input-btn-active" : "input-btn"}>
                              <span className="text">인증</span>
                            </button> 
                          </div> */}
                      </div>
                    </div>
                    <div className={`error-wrap ${isPhone !== null && !isPhone ? "error-message-active" : ""}`}>
                      <span>{PhoneMessage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 주소dom */}
            {/* <div className="section-inner">
                <div className="signup-id-pc">
                  <div className="text">
                    <div className="input-item">
                      <div className="input-area">
                        <div className="input-wrap" ref={inputRefAddress}>
                          <div className="addresstop">
                            <input
                              type="text"
                              name="address"
                              placeholder="주소"
                              className="input"
                              value={Address}
                              // onChange={AddressHandler}
                            />
                            <div className="findAddressBtnWrap">
                              <button className="findAddressBtn" onClick={addresshandle.clickButton}>
                                <span className="text">주소검색</span>
                              </button>
                            </div>
                          </div>
                          <div className="addresstop">
                            <input
                              type="text"
                              name="address"
                              placeholder="우편번호"
                              className="input"
                              value={PostCode}
                              onClick={() => {
                                setInputClick(true);
                              }}
                              // onChange={AddressHandler}
                            />
                          </div>

                          <input
                            type="text"
                            name="address"
                            placeholder="상세주소"
                            className="input"
                            value={DetailAddress}
                            onClick={() => {
                              setInputClick(true);
                            }}
                            onChange={(e) => setDetailAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={isAddress ? "error" : "error-active"}>{AddressMessage}</div>
                  </div>
                  <div className="postcode-wrap">
                    {openPostcode && (
                      <DaumPostcode
                        onComplete={addresshandle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                      />
                    )}
                  </div>
                </div>
              </div> */}
            <div className="section fourth">
              <div className="section-inner">
                <div className="checkbox-wrap">
                  <input type="checkbox" className="checkbox-input" id="checkbox01" ref={checkboxRef} onChange={agreeHandler} onClick={handleClick} />
                  <label className="checkbox-label" htmlFor="checkbox01">
                    <span className="checkbox-icon"></span>
                    <div className="agree-desc">
                      <span className="agree-text">Apple의 개인정보 처리방침</span>에 따라 개인 정보를 수집, 사용, 타사에 대한 제공 및 처리하는 데
                      동의합니다.
                    </div>
                    <div className={`${isAgree !== null && !isAgree ? "error-message-active" : ""}`}>{AgreeMessage}</div>
                  </label>
                </div>
              </div>
            </div>
            <div className="privacy-wrap">
              <div className="privacy-icon">
                <img src={privacyIcon} alt="" />
              </div>
              <span className="privacy-desc">
                Apple&nbsp;ID 정보를 사용해 안전하게 계정에 로그인하고 데이터에 액세스합니다. Apple에서는 보안, 지원 및 보고 목적으로 특정 데이터를
                기록합니다. 동의하는 경우, Apple 서비스의 사용 정보에 기반한 마케팅 이메일과 소식 전송에 Apple&nbsp;ID 정보를 사용할 수 있습니다.
              </span>
              <div className="btn-wrap flex flex-ju-center">
                <button type="submit" className="continue-btn" onClick={emailAuthBtn}>
                  <span className="continue-text">계속</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`email-modal ${isEmailModal ? "show" : "hide"} `}>
        <div className="email-content">
          <div className="email-content-inner">
            <div className="text-ct icon-wrap">
              <i className="mail-icon"></i>
            </div>
            <h2 className="text-ct">
              새 Apple ID를 생성하려면 <br />
              이메일 주소를 확인하십시오.
            </h2>
            <div className="desc">
              <div className="text-ct">확인 코드가 포함된 이메일이 {email} 주소로 전송 되었습니다.</div>
              <div className="text-ct">코드를 입력하십시오. {isEmailCodeSend && <span className="time-text">{countdown}s</span>}</div>
            </div>
            <div className="flex flex-ju-center input-wrap gap-10px" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="input2 codeInput"
                />
              ))}
            </div>
            <div className={`text-ct error-wrap ${isTimeOver ? "error-message-active" : "error-default"}`}>
              <span>{TimeOverMessage}</span>
            </div>
            <div className={`text-ct error-wrap ${isEmail2 !== null && !isEmail2 ? "error-message-active" : "error-default"}`}>
              <span>{EmailAuthMessage}</span>
            </div>
            <div className="btn-area flex flex-wrap flex-ju-bt">
              <button className="continue-btn gradient-btn2" onClick={emailAuthBtn}>
                <span className="continue-text gradient-btn2-text">새 코드 보내기</span>
              </button>
              <span className="flex gap-6px">
                <button className="continue-btn gradient-btn2" onClick={AuthCodeCancel}>
                  <span className="continue-text gradient-btn2-text">취소</span>
                </button>
                <button className="continue-btn" onClick={AuthCodeCheck}>
                  <span className="continue-text">계속</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usersign;
