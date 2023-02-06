import axios from "../../api/axios";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from '../../store/userSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
// import $ from 'jquery';
// import Signup from '../Signup';


    function Login() {
        
        const dispatch = useDispatch();
        const navigate = useNavigate(); // 다른 페이지로 이동히게 해주는 Hook.
        const [Id, setId] = useState("");
        const [Password, setPassword] = useState("");

        const idinput = useRef<any>(null);
        const pwinput = useRef<any>(null);

        const [IDDeleteIconShow, setIDDeleteIconShow] = useState(false);
        const [PWDeleteIconShow, setPWDeleteIconShow] = useState(false);
        
        //오류메시지 상태저장
        const [ErrorMessage, setErrorMessage] = useState<string>('');

        // 유효성 검사
        const [isError, setIsError] = useState<boolean>(false);

        const IdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setId(e.target.value)

            // 아이디 인풋 X아이콘 유무
            if(e.target.value){
                setIDDeleteIconShow(true);
            } else if (!e.target.value){
                setIDDeleteIconShow(false);
            }
        }

        const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
            
            // 패스워드 인풋 X아이콘 유무
            if(e.target.value){
                setPWDeleteIconShow(true);
            } else if (!e.target.value){
                setPWDeleteIconShow(false);
            }
        }

        const IDinputDelete = () => {
            idinput.current.value = null
        }

        const PWinputDelete = () => {
            pwinput.current.value = null
        }

        const userdata = {
            id: Id,
            password: Password,
        };

        // 로그인 버튼
        const handleSubmit = async (e: any) => {
            e.preventDefault();

            if (!idinput.current.value) {
                console.log('아이디공백')
                setErrorMessage('아이디를 입력 해주세요')
                setIsError(false)
                return
            }

            if (!pwinput.current.value) {
                console.log('비밀번호공백')
                setErrorMessage('비밀번호를 입력 해주세요')
                setIsError(false)
                return
            }

            try {
            const data = await axios.post("/smartstore/user/login", userdata, { withCredentials: true })
                .then((res: any) => {
                    if (res.data.error == '아이디및비밀번호오류'){
                        setErrorMessage('아이디 혹은 비밀번호가 틀렸습니다.')
                        setIsError(false)
                    } else if (res.data.status == true){
                        dispatch(loginUser( res.data.user ));
                        navigate("/shop");
                    }
                })
            } catch (err) {
                console.log(err)
            }
        };

        const [inputClickNumber, setInputClickNumber] = useState(0);
        const [inputClick, setInputClick] = useState(false);
        const inputRef = useRef<HTMLUListElement>(null);

         // 모달의 바깥쪽을 눌렀을 때 창 닫기
        useEffect(() => {
                const clickOutside = (e : any) => {
            

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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="userlogin-layout-wrap">
                    <div className="layout-inner">
                        <div className="login-content">
                            <div className="naver-logo-wrap">
                                <a href="{() => false}" className="naver-logo"></a>
                            </div>
                            <div className="login-area">
                                <div className="login-login-content">
                                    <ul className="login-type">
                                        <li className="login-type-item flex flex-ju-center flex-align-center">
                                            <span className="login-icon"></span>
                                            <span className="login-text">ID 로그인</span>
                                        </li>
                                    </ul>
                                    <div className="login-content-box">
                                        <ul className="login-list" ref={inputRef}>
                                            <li className="login-item" id={ inputClick && inputClickNumber == 1 ? "login-item-id-active" : "login-item-id"}>
                                                <span className={ inputClick && inputClickNumber == 1 ? "id-icon-active id-icon" : "id-icon"}></span>
                                                <input type="text" name="id" placeholder="아이디" className="login-input" ref={idinput} onClick={() => { setInputClick(true); setInputClickNumber(1);}} onChange={IdHandler}/>
                                                <span className={ IDDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon" } onClick={ IDinputDelete } ></span>
                                            </li>
                                            <li className="login-item" id={ inputClick && inputClickNumber == 2 ? "login-item-pw-active" : "login-item-pw"}>
                                                <span className={ inputClick && inputClickNumber == 2 ? "pw-icon-active pw-icon" : "pw-icon"}></span>
                                                <input type="password" name="password" placeholder="비밀번호" className="login-input" ref={pwinput} onClick={() => { setInputClick(true); setInputClickNumber(2);}} onChange={PasswordHandler}/>
                                                <span className={ PWDeleteIconShow == false ? "delete-icon-none delete-icon" : "delete-icon" } onClick={ PWinputDelete }></span>
                                            </li>
                                        </ul>
                                            <div className={isError ? "error" : "error-active" }>{ErrorMessage}</div>
                                        <div className="login-btn-wrap">
                                            <button type="submit" className="login-btn">
                                                <span className="login-btn-text">로그인</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="login-service">
                                    <ul className="login-help flex flex-ju-center">
                                        <li className="login-help-item">
                                            <a href="{() => false}">
                                                <span className="login-help-text">비밀번호 찾기</span>
                                            </a>
                                        </li>
                                        <li className="login-help-item">
                                            <a href="{() => false}">
                                                <span className="login-help-text">아이디 찾기</span>
                                            </a>
                                        </li>
                                        <li className="login-help-item">
                                            <Link to="../usersign">
                                                <span className="login-help-text">회원가입하기</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </>
        );
        }

    export default Login;
