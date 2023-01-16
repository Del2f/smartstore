import "./shop.scss";
// import { useState, useRef, useEffect } from "react";
// import $ from 'jquery';
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

    function Shop() {

    return (
        <>
        <div className="main-wrap">
            <div className="header-wrap">
                <div className="header-inner flex flex-ju-start flex-align-center">
                    <span className="header-icon"/>
                    <span className="header-logo"/>
                </div>
            </div>
            <Routes>  
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/signup/*" element={<Signup />} /> */}
                {/* <Route path="/signup/usersign" element={<Usersign />} /> */}
            </Routes> 
            <div className="login-footer-wrap">
                <div className="footer-inner">
                    <ul className="footer-link-list">
                        <li className="footer-link-item">
                            <a href="" className="footer-link">
                                <span className="footer-text">개인정보 처리방침</span>
                            </a>
                        </li>
                    </ul>
                    <div className="footer-copyright-pc">
                        <a href="" className="footer-link-logo">
                            <i className="naver-logo"></i>
                        </a>
                        <span className="footer-link-text">Copyright&nbsp;
                        <a href="">
                            <span>©<b>NAVER Corp.</b></span>
                        </a>
                        &nbsp;All Rights Reserved.
                        </span>
                    </div>
                    <div className="footer-copyright-m">
                        <a href="">
                            <span>©<b>NAVER Corp.</b></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
    }

export default Shop;
