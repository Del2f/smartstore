// import axios from 'axios';
// import { useState, useRef, useEffect } from "react";
// import $ from "jquery";

    import { Link } from "react-router-dom";

    function Signup() {

    return (
        <>
        <div className="layout-wrap">
            <div className="layout-inner">
            <div className="signup-content">
                <h2 className="signup-title">회원가입</h2>
                <div className="signup-desc">
                스마트스토어센터, 커머스솔루션마켓, 커머스API센터를<br></br>
                <strong>네이버 커머스 ID 하나</strong>로 편리하게 이용할 수
                있어요.
                </div>
                <div className="signup-notice">
                ※ 네이버 커머스 ID에 회원가입 완료 후, 개별 서비스 가입이
                진행됩니다.
                </div>
                <div className="n-commerce-find">
                <a href="{() => false}" className="n-commerce-text">
                    네이버 커머스 ID 알아보기
                </a>
                </div>
                <div className="signup-img-wrap">
                    <div className="signup-img"></div>
                </div>
                <div className="signup-btn-area">
                    <div className="signup-btn-content">
                        <Link to="usersign">
                            <button type="button" className="signup-btn">
                                <span className="signup-btn-icon-wrap">
                                    <div className="signup-btn-icon"></div>
                                </span>
                                <span className="signup-btn-title">네이버 아이디로 가입하기</span>
                                <span className="signup-btn-desc">네이버 회원 정보로 간편하게 가입 하실 수 있습니다.</span>
                                <span className="signup-btn-arrow-wrap">
                                    <span className="signup-btn-arrow-pc"/>
                                    <span className="signup-btn-arrow-m"/>
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div className="signup-subnotice">
                            <span className="signup-subnotice-text">
                            이미 네이버 커머스 ID 회원이신가요?
                            </span>
                        <a href="{() => false}" className="signup-subnotice-signup">
                            <span className="signup-subnotice-signup-text">
                                <Link to="/commerce/login">
                                로그인하기
                                </Link>
                            </span>
                        </a>
                    </div>
                </div>
                <ul className="signup-notice-list">
                <li className="signup-notice-list-item">
                    네이버 아이디로 가입하시면 네이버 톡톡, 예약, 알림 등 네이버가 제공하는 다양한 비즈니스 서비스를 간편하게 연결하실 수 있습니다.
                </li>
                <li className="signup-notice-list-item">
                    네이버 아이디가 단체 아이디 (사업자 아이디) 유형일 경우, 네이버 커머스 ID 회원으로 가입하실 수 없습니다.
                </li>
                <li className="signup-notice-list-item">
                    만 14세 미만일 경우 회원 가입이 불가하며, 네이버 회원 정보가 만 14세 미만일 경우도 네이버 커머스 ID 회원으로 가입하실 수 없습니다.
                </li>
                <li className="signup-notice-list-item">
                    구매자의 개인 정보를 조회할 수 있는 서비스에 로그인할 경우, 계정 도용 시 구매자 개인 정보 보호 등을 위하여 2단계 인증 절차가 필수로 진행됩니다.
                </li>
                </ul>
            </div>
            </div>
        </div>
        </>
    );
    }

    export default Signup;
