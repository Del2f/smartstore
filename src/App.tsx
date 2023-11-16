import axios from "./api/axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { selectCurrentAdmin } from "./store/adminSlice";
import { useCookies } from "react-cookie";

import Home from "./pages/adminPage/Home";
import Product from "./pages/adminPage/Product";
import ProductRegister from "./pages/adminPage/ProductRegister";
import Category from "./pages/adminPage/Category";
import Advertise from "./pages/adminPage/Advertise";

import $ from "jquery";
import "./App.scss";

let currentPath = "";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentAdmin);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [showdropmenu, setShowdrop] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);
  
  // 관리자의 로그인 상태를 확인.
  // checkAdmin 미들웨어가 실행되면서 프론트엔드로 status를 보내줍니다.
  // App에 Routing 되어있는 component들은 함께 적용됩니다.

  useEffect(() => {
    const verifyUser = async () => {
      console.log('쿠키 확인')

      if (!cookies.jwt) {
        navigate("/");
      }

      try {
        const res = await axios.post("/smartstore/home", {}, { withCredentials: true });
          if (!res.data.status) {
            removeCookie("jwt");
            navigate("/");
          } else {
            console.log(`안녕하세요 ${res.data.user} 님. 관리자 페이지 입니다.`);
          }
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

  // useEffect(() => {
  //   if (currentPath === location.pathname) window.location.reload();
  //   currentPath = location.pathname;
  // }, [location]);

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
        <div className="navi flex flex-ju-bt flex-align-center" style={{ width: "1280px" }}>
          <div className="nav-left flex flex-align-center">
            <ul className="nav-logo flex flex-wrap flex-align-center">
              <li>
                <a
                  className="sell-shop"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <svg height="44" viewBox="0 0 14 44" width="31px" xmlns="http://www.w3.org/2000/svg">
                    <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <ul className="quick-link flex flex-wrap flex-align-center">
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
          <Route path="/advertise" element={<Advertise />} />
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
