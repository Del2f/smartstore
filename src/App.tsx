import axios from "./api/axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { selectCurrentAdmin } from "./store/adminSlice";
import { menuSlice, showMenu } from "./store/menuSlice";
import { useCookies } from "react-cookie";

import Home from "./pages/adminPage/Home";
import Product from "./pages/adminPage/Product";
import ProductRegister from "./pages/adminPage/ProductRegister";
import Category from "./pages/adminPage/Category";
import Accordion from "./components/admin/Accordion";

import $ from "jquery";
import "./App.scss";
import cat from "@img/cat.jpeg";

let currentPath = "";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentAdmin);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;
  }, [location]);

  // 관리자의 로그인 상태를 확인.
  // checkAdmin 미들웨어가 실행되면서 프론트엔드로 status를 보내줍니다.
  // App에 Routing 되어있는 component들은 함께 적용됩니다.

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/commerce/login");
      }

      try {
        const data = await axios.post("/smartstore/home", {}, { withCredentials: true }).then((res) => {
          if (!res.data.status) {
            removeCookie("jwt");
            navigate("/commerce/login");
          } else {
            console.log(`안녕하세요 ${res.data.user} 님. 관리자 페이지 입니다.`);
          }
        });
      } catch (errors) {
        console.log(errors);
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  // 로그아웃 버튼을 누르면 쿠키를 삭제한다.
  const logOut = () => {
    removeCookie("jwt", { path: "/" });
  };

  const [showdropmenu, setShowdrop] = useState(false);
  const [showNavdropmenu, setShowNavdropmenu] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);
  const navdropmenu = useRef<HTMLLIElement>(null);

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
        setShowdrop(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showdropmenu]);

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside1 = (e: any) => {
      if (showNavdropmenu && navdropmenu.current && !navdropmenu.current.contains(e.target)) {
        setShowNavdropmenu(false);
      }
    };

    document.addEventListener("mousedown", clickOutside1);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside1);
    };
  }, [showNavdropmenu]);

  const contents1 = (
    <div className="contents">
      <li></li>
      <li></li>
      {/* <li>
                <Link to="productnew">상품 일괄등록</Link>
            </li>
            <li>
                <Link to="productnew">상품 카탈로그 가격관리</Link>
            </li>
            <li>
                <Link to="productnew">연관상품 관리</Link>
            </li>
            <li>
                <Link to="productnew">사진 보관함</Link>
            </li>
            <li>
                <Link to="productnew">배송정보 관리</Link>
            </li>
            <li>
                <Link to="productnew">템플릿 관리</Link>
            </li>
            <li>
                <Link to="productnew">공지사항 관리</Link>
            </li>
            <li>
                <Link to="productnew">구독 관리</Link>
            </li> */}
    </div>
  );
  const contents2 = (
    <div className="contents">
      <li>선물 수락대기</li>
      <li>미결제 확인</li>
      <li>발주(주문)확인/발송관리</li>
      <li>배송현황 관리</li>
      <li>구매확정 내역</li>
      <li>취소 관리</li>
      <li>반품 관리</li>
      <li>교환 관리</li>
      <li>판매방해 고객관리</li>
      <li>반품안심케어</li>
    </div>
  );
  const contents3 = (
    <div className="contents">
      <li>정산 내역(일별/건별)</li>
      <li>항목별 정산 내역</li>
      <li>빠른정산</li>
      <li>부가세신고 내역</li>
      <li>세금계산서 조회</li>
      <li>충전금 관리</li>
      <li>초보판매자 정산가이드</li>
    </div>
  );
  const contents4 = (
    <div className="contents">
      <li>문의 관리</li>
      <li>고객문의 관리</li>
      <li>리뷰 관리</li>
      <li>리뷰이벤트 관리</li>
    </div>
  );
  const contents5 = (
    <div className="contents">
      <li>톡톡 상담하기</li>
      <li>톡톡 쇼핑챗봇/AI FAQ 설정</li>
    </div>
  );
  const contents6 = (
    <div className="contents">
      {/* <li>스마트스토어</li> */}
      <li></li>
      <li></li>
      {/* <li>쇼핑 스토리 관리</li> */}
      {/* <li>라이브 예고 페이지 관리</li> */}
      {/* <li>스토어 관리</li> */}
      {/* <li>CLOVA MD 상품추천</li> */}
    </div>
  );
  const contents7 = (
    <div className="contents">
      <li>쇼핑윈도 노출 제안</li>
      <li>기획전 관리</li>
      <li>럭키투데이 제안 관리</li>
      <li>노출 서비스 관리</li>
    </div>
  );
  const contents8 = (
    <div className="contents">
      <li>혜택 등록</li>
      <li>혜택 조회/수정</li>
      <li>혜택 리포트</li>
      <li>고객등급 관리</li>
      <li>포인트 지급내역 조회</li>
    </div>
  );
  const contents9 = (
    <div className="contents">
      <li>마케팅 보내기</li>
      <li>마케팅 이력</li>
      <li>마케팅 통계</li>
    </div>
  );
  const contents10 = (
    <div className="contents">
      <li>솔루션 목록</li>
    </div>
  );
  const contents11 = (
    <div className="contents">
      <li>요약</li>
      <li>판매분석</li>
      <li>마케팅분석</li>
      <li>쇼핑행동분석</li>
      <li>시장벤치마크</li>
      <li>판매성과예측</li>
      <li>고객현황</li>
      <li>재구매통계</li>
    </div>
  );
  const contents12 = (
    <div className="contents">
      <li>탑탑 소개</li>
      <li>탑탑 리포트</li>
      <li>탑탑 입점 제안</li>
    </div>
  );
  const contents13 = (
    <div className="contents">
      <li>원쁠딜 소개</li>
      <li>제안 관리</li>
      <li>공지/FAQ</li>
    </div>
  );
  const contents14 = (
    <div className="contents">
      <li>판매자지원프로그램</li>
    </div>
  );
  const contents15 = (
    <div className="contents">
      <li>판매자 정보</li>
      <li>정보변경 신청</li>
      <li>상품판매권한 신청</li>
      <li>심사내역 조회</li>
      <li>판매자 등급</li>
      <li>매니저 관리</li>
    </div>
  );
  const contents16 = (
    <div className="contents">
      <li>지식재산권 침해관리</li>
    </div>
  );
  const contents17 = (
    <div className="contents">
      <li>풀필먼트 서비스신청</li>
    </div>
  );
  const contents18 = (
    <div className="contents">
      <li>공지 사항</li>
    </div>
  );

  let menuChange = (e: any) => {
    $(".option").removeClass("selected");
    $(e.target).addClass("selected");

    const clone = $(e.target).clone();

    $(".selectize-input").empty();
    $(".selectize-input").append(clone);
    $(".selectize-input").children(".option").attr("class", "item");

    setShowdrop(false);
  };

  // 메뉴 파트1 옵션 마우스 올렸을때
  useEffect(() => {
    showdropmenu == false
      ? $(".selectize-dropdown-content").children(".option").removeClass("active")
      : $(".selectize-dropdown-content").children(".selected").addClass("active");

    $(".selectize-dropdown-content").on("mouseover", function (e) {
      $(".option").removeClass("active");
      $(e.target).addClass("active");
    });
  });

  return (
    <div className="App">
      <div className="flex flex-ju-center flex-align-center">
        <div className="navi flex flex-ju-bt flex-align-center" style={{width: "1300px"}}>
          <div className="nav-left flex flex-align-center">
            <ul className="nav-logo flex flex-wrap flex-align-center">
              <li>
                <a
                  className="sell-shop"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  관리자 페이지
                </a>
              </li>
            </ul>
            <ul className="quick-link flex flex-wrap flex-align-center">
              <li ref={navdropmenu}>
                <a onClick={() => setShowNavdropmenu((e) => !e)}>
                  <span className="txt">네이버광고</span>
                  <i className={showNavdropmenu ? "fn fn-up2 arrow" : "fn fn-down2 arrow"}></i>
                </a>
                <ul className={showNavdropmenu ? "nav-dropdown-menu nav-dropdown-menu-active" : "nav-dropdown-menu"}>
                  <li>검색광고</li>
                  <li>성과형 디스플레이광고</li>
                </ul>
              </li>
              <li>
                <Link to="/shop">
                  <span className="txt">내 상점</span>
                </Link>
              </li>
              <li>
                <Link to="product">상품 조회/수정</Link>
              </li>
              <li>
                <Link to="productregister">상품 등록</Link>
              </li>
              <li>
                <Link to="category">카테고리 관리</Link>
              </li>
              <li>
                <Link to="advertisement">광고 관리</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right flex flex-align-center">
            <ul className="nav-user flex">
              <li>
                <a>
                  <span className="login-id">{user.id} 님</span>
                  <span className="my-info">내정보</span>
                </a>
              </li>
              <li>
                <i className="icon-alarm">
                  <i className="icon-alarm-new"></i>
                </i>
              </li>
              <li>
                <a onClick={logOut} className="logout">
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="seller-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductRegister />} />
          <Route path="/productregister" element={<ProductRegister />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          {/* <Route path="*" element={<Notfound/>}/> */}
        </Routes>
      </div>
      {/* <div className="home-footer-wrap">
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
              네이버㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.<br></br>
              또한 판매자와 구매자간의 직거래에 대하여 당사는 관여하지 않기 때문에 거래에 대해서는 책임을 지지 않습니다.
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
              <li>주소 : 경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561</li>
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
      </div> */}
    </div>
  );
}

export default App;
