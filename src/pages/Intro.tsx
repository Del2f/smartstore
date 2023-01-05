import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/flex.css";
import "./Intro.scss";
import SwiperIntro from "../components/Intro/Swiper_lntro";

function Intro() {
  const navigate = useNavigate();
  const [showNavdropmenu, setShowNavdropmenu] = useState(false);
  const navdropmenu = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const clickOutside1 = (e: any) => {
      if (
        showNavdropmenu &&
        navdropmenu.current &&
        !navdropmenu.current.contains(e.target)
      ) {
        setShowNavdropmenu(false);
      }
    };
    document.addEventListener("mousedown", clickOutside1);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside1);
    };
  }, [showNavdropmenu]);

  return (
    <>
      <div className="intro-main-wrap">
        <div className="intro">
          <div className="navi flex flex-ju-bt flex-align-center">
            <div className="nav-left flex flex-align-center">
              <ul className="nav-logo flex flex-wrap flex-align-center">
                <li>
                  <a className="naver-logo"></a>
                </li>
                <li>
                  <a
                    className="sell-shop"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    스마트스토어센터
                  </a>
                </li>
              </ul>
              <ul className="quick-link flex flex-wrap flex-align-center">
                <li>
                  <a>
                    <span className="txt">쇼핑파트너센터</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span className="txt">커머스솔루션마켓</span>
                    <i className="icon-beta"></i>
                  </a>
                </li>
                <li ref={navdropmenu}>
                  <a onClick={() => setShowNavdropmenu((e) => !e)}>
                    <span className="txt">네이버광고</span>
                    <i
                      className={
                        showNavdropmenu
                          ? "fn fn-up2 arrow"
                          : "fn fn-down2 arrow"
                      }
                    ></i>
                  </a>
                  <ul
                    className={
                      showNavdropmenu
                        ? "nav-dropdown-menu nav-dropdown-menu-active"
                        : "nav-dropdown-menu"
                    }
                  >
                    <li>검색광고</li>
                    <li>성과형 디스플레이광고</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="service-intro">
            <div className="inner">
              <div className="info-area">
                <div className="text-area">
                  <h2>
                    나만의 온라인 쇼핑몰<strong>네이버 스마트스토어</strong>
                  </h2>
                  <p>
                    온라인에서 상품을 팔고 싶은데, 쇼핑몰이 없으시다고요?
                    <br></br>
                    누구나 쉽게 만드는 스마트스토어로 시작하세요.
                  </p>
                </div>
                <div className="btn-area">
                  <Link to="./commerce/login">
                    <button className="btn btn-login">
                      <span>로그인하기</span>
                    </button>
                  </Link>
                  <Link to="./commerce">
                    <button className="btn btn-join">
                      <span>가입하기</span>
                    </button>
                  </Link>
                </div>
                <ul className="link-area">
                  <li>
                    <i className="fn fn-info1"></i>
                    <p className="text">
                      네이버 커머스 ID로 스마트스토어센터를 이용하세요.
                    </p>
                    <a>
                      <span>네이버 커머스 ID 알아보기</span>
                      <i className="fn-shopping"></i>
                    </a>
                  </li>
                  <li>
                    <i className="fn fn-info1"></i>
                    <p className="text">
                      <strong>
                        기존 스마트스토어센터를 이용하시던 회원님들은 로그인 후
                        네이버 커머스 ID 회원으로 <br></br>
                        전환
                      </strong>
                      하셔야 스마트스토어센터 이용이 가능합니다.
                    </p>
                  </li>
                </ul>
                <div className="intro-banner">
                  <span className="image"></span>
                  <div className="info">
                    <strong>뭐가 다른지 모르시겠다고요?</strong>
                    <p>
                      네이버 쇼핑과 스마트스토어, 수수료까지 <br></br>한방에
                      이해하기
                    </p>
                    <a href="{() => false}" className="link">
                      자세히 보기
                      <i className="fn-shopping"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tip-area">
                <a href="{() => false}" className="tip-area-inner">
                  <strong className="title">
                    <label htmlFor="" className="label">
                      <i className="tip-icon"></i>
                    </label>
                    <span className="text">윈도 노출</span>
                  </strong>
                  <span className="detail">
                    윈도 노출 신청 조건을 확인해 주세요.
                    <i className="fn-shopping"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="service-join">
          <h2 className="title">
            <p className="text"></p>
          </h2>
          <ul className="join-list">
            <li className="document">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
            <li className="window">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
            <li className="safety-service">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
            <li className="manual">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
            <li className="fee">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
            <li className="training-cource">
              <a href="{() => false}" className="inner">
                <h3 className="icon"></h3>
                <h3 className="sub-title"></h3>
                <p className="detail"></p>
              </a>
            </li>
          </ul>
        </div>
        <div className="service-use">
          <h2 className="title">
            <p className="text"></p>
          </h2>
          <SwiperIntro />
          <div className="footer-wrap">
            <div className="inner-footer-wrap">
              <div className="footer">
                <ul className="provision flex flex-ju-center">
                  <li>
                    <a href="{() => false}">이용약관</a>
                  </li>
                  <li>
                    <a href="{() => false}">전자금융거래 이용약관</a>
                  </li>
                  <li>
                    <a href="{() => false}">
                      <strong className="strong">개인정보 처리방침</strong>
                    </a>
                  </li>
                  <li>
                    <a href="{() => false}">청소년 보호정책</a>
                  </li>
                  <li>
                    <a href="{() => false}">책임의 한계와 법적고지</a>
                  </li>
                  <li>
                    <a href="{() => false}">안전거래가이드</a>
                  </li>
                  <li>
                    <a href="{() => false}">고객센터</a>
                  </li>
                </ul>
                <p className="dsc">
                  네이버㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
                  상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
                  <br></br>
                  또한 판매자와 구매자간의 직거래에 대하여 당사는 관여하지 않기
                  때문에 거래에 대해서는 책임을 지지 않습니다.
                </p>
                <ul className="provision flex flex-ju-center flex-align-center">
                  <li>사업자등록번호 : 220-81-62517</li>
                  <li>통신판매업신고번호 : 제2006-경기성남-0692호</li>
                  <li>대표이사 : 최수연</li>
                  <li>
                    <a href="{() => false}" className="btn-box">
                      사업자정보확인
                    </a>
                  </li>
                </ul>
                <ul className="provision flex flex-ju-center flex-align-center">
                  <li>
                    주소 : 경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561
                  </li>
                  <li>
                    <a href="{() => false}" className="btn-box">
                      전화상담 (전화 전 클릭)
                    </a>
                  </li>
                  <li className="talktalk-wrap">
                    <a href="{() => false}" className="btn-box">
                      <a href="{() => false}" className="talktalk-icon-sm"></a>
                      톡톡상담
                    </a>
                  </li>
                </ul>
                <address className="address flex flex-ju-center flex-align-center">
                  <p className="logo"></p>
                  Copyright ©&nbsp;
                  <a href="{() => false}">
                    <strong>NAVER Corp.</strong>
                  </a>
                  &nbsp;All rights reserved.
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
