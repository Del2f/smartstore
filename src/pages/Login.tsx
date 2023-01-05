    import axiosPrivate from "../api/axios";
    import { useState, useRef, useEffect } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { useDispatch } from "react-redux";
    import $ from 'jquery';
    import "bootstrap/dist/css/bootstrap.min.css";
    import { useCookies } from "react-cookie";
    import { loginUser } from '../store/userSlice';
    
    import "./Login.scss";

    function Login() {

        const cookies = useCookies();
        const dispatch = useDispatch();
        const navigate = useNavigate(); // 다른 페이지로 이동히게 해주는 Hook.
        const [Id, setId] = useState("");
        const [Password, setPassword] = useState("");
        
        //오류메시지 상태저장
        const [ErrorMessage, setErrorMessage] = useState<string>('');

        // 유효성 검사
        const [isError, setIsError] = useState<boolean>(false);

        const IdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setId(e.target.value)
        }

        const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
        }

        //     useEffect(() => {
        //     if (cookies[0].jwt) {
        //     navigate("/home");
        //     }
        // }, [cookies, navigate]);

            const userdata = {
                id: Id,
                password: Password,
            };

        const handleSubmit = async (e : any) => {
            e.preventDefault();
            try {
            const data = await axiosPrivate.post( "/smartstore/commerce/login", userdata,
            { withCredentials: true })
            
            .then((res) => {
                console.log(res.data.user)
                
                if (res.data.error === '아이디및비밀번호오류'){
                    setErrorMessage('아이디 혹은 비밀번호가 틀렸습니다.')
                    setIsError(false)
                } else if (res.data.status === true){
                    dispatch(loginUser( res.data.user ));
                    navigate("/home");
                }
            })
            } catch (err) {
                console.log(err)
            }
        };

            const [inputClickNumber, setInputClickNumber] = useState(0);
            const [inputClick, setInputClick] = useState(false);
            const inputRef = useRef<HTMLUListElement>(null);
            
            const mouseEnter = (e:any) => {
                $(e.target).addClass('login-item-hover')
            }

            const mouseLeave = (e:any) => {
                $('.login-item').removeClass('login-item-hover');
            }

            useEffect(() => {
                    const clickOutside = (e : any) => {
            
                    // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
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
                <div className="layout-wrap">
                    <div className="layout-inner">
                        <div className="login-content">
                            <h2 className="login-title">로그인</h2>
                            <div className="login-desc">네이버 커머스 ID로 로그인해 주세요.</div>
                            <div className="login-notice">기존 스마트스토어센터 회원님은 <strong className="bold">사용 중인 아이디로 로그인</strong>해 주세요.<br></br>
                            이미 네이버 커머스 ID 회원 전환을 하신 회원님은 <strong className="bold">전환한 아이디로 로그인</strong>해 주세요.</div>
                            <div className="n-commerce-find">
                                <a href="{() => false}" className="n-commerce-text">네이버 커머스 ID 알아보기</a>
                            </div>
                            <div className="login-area">
                                <div className="login-login-content">
                                    <ul className="login-type">
                                        <li className="login-type-item">네이버 아이디로 로그인</li>
                                    </ul>
                                    <div className="login-content-box">
                                        <ul className="login-list" ref={inputRef}>
                                            <li className={ inputClick && inputClickNumber === 1 ? "login-item login-item-active" : "login-item"}  onMouseEnter={ mouseEnter } onMouseLeave={ mouseLeave } >
                                                <input type="text" name="id" placeholder="아이디" className="login-input" onClick={() => { setInputClick(true); setInputClickNumber(1);}} onChange={IdHandler}/>
                                            </li>
                                            <li className={ inputClick && inputClickNumber === 2 ? "login-item login-item-active" : "login-item"} onMouseEnter={ mouseEnter } onMouseLeave={ mouseLeave } >
                                                <input type="password" name="password" placeholder="비밀번호" className="login-input" onClick={() => { setInputClick(true); setInputClickNumber(2);}} onChange={PasswordHandler}/>
                                            </li>
                                        </ul>
                                            <div className={isError ? "error" : "error-active" }>{ErrorMessage}</div>
                                        <div className="login-btn-wrap">
                                            <button type="submit" className="login-btn">
                                                <span className="login-btn-text">로그인</span>
                                            </button>
                                        </div>
                                        <ul className="login-help">
                                            <li className="login-help-item">
                                                <a href="{() => false}">
                                                    <span className="login-help-text">아이디 찾기</span>
                                                </a>
                                            </li>
                                            <li className="login-help-item">
                                                <a href="{() => false}">
                                                    <span className="login-help-text">비밀번호 찾기</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="login-help-box">
                                    <span className="login-help-text">네이버 커머스 ID 회원이 아닌 스마트스토어센터 이용자이신가요?</span>
                                    <button type="button" className="login-help-btn">
                                        <i className="login-help-btn-icon"></i>
                                    </button>

                                </div>
                                <div className="login-subnotice">
                                    <span className="login-subnotice-text">아직 네이버 커머스 ID 회원이 아니신가요?</span>
                                    <a href="{() => false}" className="login-subnotice-signup">
                                        <span className="login-subnotice-signup-text"><Link to="../usersign">회원가입하기</Link></span>
                                    </a>
                                </div>
                                <ul className="login-notice-list">
                                    <li className="login-notice-list-item">
                                        기존 스마트스토어센터 회원님들은 네이버 커머스 ID로 회원 전환을 하시면 기존과 동일하게 스마트스토어센터를 이용할 수 있습니다.
                                    </li>
                                    <li className="login-notice-list-item">
                                        <strong className="bold">스마트스토어센터 아이디를 여러 개로 운영 중이라면, 사용 중인 모든 아이디를 전환해 주셔야 합니다.</strong>
                                    </li>
                                    <li className="login-notice-list-item">
                                        회원 <strong className="bold">전환 후에는 전환한 아이디로만 서비스 이용</strong>이 가능합니다
                                    </li>
                                    <li className="login-notice-list-item">
                                        <a href="{() => false}">
                                            <span className="login-notice-list-text">네이버 커머스 ID 회원 전환 관련 FAQ 모아보기</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </>
        );
        }

    export default Login;
