import axios from "./api/axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import { selectToken } from "./store/authSlice";
import { selectCurrentUser } from "./store/userSlice";
import { menuSlice, showMenu } from "./store/menuSlice";

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
    const user = useSelector(selectCurrentUser);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

    // 공지사항
    const [noticeIcon, setNoticeIcon] = useState();
    const [notice, setNotice] = useState("");
    const [noticeDate, setNoticeDate] = useState("");

    useEffect(() => {
        if (currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
    }, [location]);

    // 유저의 로그인 상태를 확인.
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/commerce/login");
            }

            try {
                const data = await axios.post("/smartstore", {}, { withCredentials: true }).then((res) => {
                    if (!res.data.status) {
                        removeCookie("jwt");
                        navigate("/commerce/login");
                    } else {
                        console.log(`Hi ${res.data.user}`);
                        // console.log(res.data);
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

    const [showmainmenu, setShowmainmenu] = useState(false);
    const [showdropmenu, setShowdrop] = useState(false);
    const [showNavdropmenu, setShowNavdropmenu] = useState(false);

    const dropmenu = useRef<HTMLDivElement>(null);

    // 좌측 메뉴 숨김상태 전송
    useEffect(() => {
        dispatch(showMenu(showmainmenu));
    });

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

    const navdropmenu = useRef<HTMLLIElement>(null);

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

    // const [menu1, setMenu1] = useState([
    //   { name: "상품 조회/수정", link: "product"},
    //   { name: "상품 등록", link: "productregister"},

    // ])

    const contents1 = (
        <div className="contents">
            <li>
                <Link to="product">상품 조회/수정</Link>
            </li>
            <li>
                <Link to="productregister">상품 등록</Link>
            </li>
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
            <li>
                <Link to="category">카테고리 관리</Link>
            </li>
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
        showdropmenu == false ? $(".selectize-dropdown-content").children(".option").removeClass("active") : $(".selectize-dropdown-content").children(".selected").addClass("active");

        $(".selectize-dropdown-content").on("mouseover", function (e) {
            $(".option").removeClass("active");
            $(e.target).addClass("active");
        });
    });

    return (
        <div className="App">
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
                                    navigate("/home");
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
                        <li>
                            <a>도움말</a>
                        </li>
                        <li>
                            <a className="nav-talk-btn">
                                <i className="fn talktalk-icon"></i>
                                &nbsp;톡톡상담
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={showmainmenu ? "main-menu main-menu-hide" : "main-menu"}>
                <a className={showmainmenu ? "main-menu-btn show-btn" : "main-menu-btn hide-btn"} onClick={() => setShowmainmenu((e) => !e)}></a>
                <div className="menu-store">
                    <a>
                        <span className="thumb">
                            <img src={cat} alt="abc" className="img-circle" />
                        </span>
                        <span className="shopname">포트폴리오</span>
                    </a>
                </div>
                <div className="order-check">
                    <form className="test">
                        <div className="selectize-control" ref={dropmenu}>
                            <div className={showdropmenu ? "selectize-input check" : "selectize-input"} onClick={() => setShowdrop((e) => !e)}>
                                <div data-value="COLLECTOR_name" className="item">
                                    수취인명
                                </div>
                            </div>
                            <div className={showdropmenu ? "selectize-dropdown dropdown-active" : "selectize-dropdown"}>
                                <div className="selectize-dropdown-content">
                                    <div data-value="COLLECTOR_name" className="option selected" onClick={menuChange}>
                                        수취인명
                                    </div>
                                    <div data-value="PURCHACER_NAME" className="option" onClick={menuChange}>
                                        구매자명
                                    </div>
                                    <div data-value="PURCHACER_TEL_NO" className="option" onClick={menuChange}>
                                        구매자연락처
                                    </div>
                                    <div data-value="PURCHACER_ID" className="option" onClick={menuChange}>
                                        구매자ID
                                    </div>
                                    <div data-value="ORDER_NO" className="option" onClick={menuChange}>
                                        주문번호
                                    </div>
                                    <div data-value="PRODUCT_ORDER_NO" className="option" onClick={menuChange}>
                                        상품주문번호
                                    </div>
                                    <div data-value="PRODUCT_NO" className="option" onClick={menuChange}>
                                        상품번호
                                    </div>
                                    <div data-value="INVOICE_NO" className="option" onClick={menuChange}>
                                        운송장번호
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="seller-input-wrap">
                            <input className="seller-input"></input>
                            <button className="seller-input-Btn">
                                {/* <Search className='search-icon'/> */}
                                <i className="fn fn-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="side-menu">
                    <div className="menu-list" id="menu-list">
                        <Accordion title="상품관리" className="list list-01" contents={contents1} />
                        {/* <Accordion title="판매관리 " className="list icon-npay" contents={contents2} /> */}
                        {/* <Accordion title="정산관리 " className="list icon-npay" contents={contents3} /> */}
                        {/* <Accordion title="문의/리뷰관리" className="list list-04" contents={contents4} /> */}
                        {/* <Accordion title="톡톡상담관리 " className="list fn talktalk-icon" contents={contents5} /> */}
                        <Accordion title="스토어 전시관리 " className="list list-06 label-new" contents={contents6} />
                        {/* <Accordion title="노출관리" className="list list-07" contents={contents7} /> */}
                        {/* <Accordion title="고객혜택관리" className="list list-08" contents={contents8} /> */}
                        {/* <Accordion title="마케팅메세지" className="list list-09" contents={contents9} /> */}
                        {/* <Accordion title="커머스솔루션" className="list list-10 icon-beta label-new" contents={contents10} /> */}
                        {/* <Accordion title="통계 " className="list list-11 label-new" contents={contents11} /> */}
                        {/* <Accordion title="탑탑" className="list list-12" contents={contents12} /> */}
                        {/* <Accordion title="원쁠딜 " className="list list-13 label-new" contents={contents13} /> */}
                        {/* <Accordion title="판매자지원프로그램" className="list list-14" contents={contents14} /> */}
                        {/* <Accordion title="판매자정보" className="list list-15" contents={contents15} /> */}
                        {/* <Accordion title="지식재산권침해관리" className="list list-16" contents={contents16} /> */}
                        {/* <Accordion title="물류 관리 " className="list list-17 label-new" contents={contents17} /> */}
                        {/* <Accordion title="공지사항" className="list list-18" contents={contents18} /> */}
                    </div>
                    {/* <div className="outer_link">
                        <h2 className="title">교육 프로그램 바로가기</h2>
                        <div className="outer_menu">
                            <a className="link">
                                온라인 교육
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                            <a className="link">
                                쇼핑 라이브 교육
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                        </div>
                        <h2 className="title">네이버 비즈니스 금융센터</h2>
                        <div className="outer_menu">
                            <a className="link">
                                정책지원금
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                            <a className="link">
                                빠른정산
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                            <a className="link">
                                사업자 대출
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                            <a className="link">
                                사업자 보험
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                        </div>
                        <h2 className="title">공식 블로그 바로가기</h2>
                        <div className="outer_menu">
                            <a className="link">
                                네이버쇼핑 파트너
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                            <a className="link">
                                쇼핑윈도
                                <i className="fn-booking fn-booking-newlayer" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div> */}
                    <div className="talktalk_Btn_wrap">
                        <button className="talktalk_Btn">
                            <i className="fn talktalk-icon"></i>
                            톡톡상담
                        </button>
                    </div>
                </div>
            </div>
            <div className={showmainmenu == true ? "seller-content seller-content-hide" : "seller-content"}>
                <div className="Notice">
                    <div className="NoticeWrapper">
                        <a className="text-wrap">
                                {noticeIcon}
                            <span className="notice-title">{notice}</span>
                            <span className="notice-date">{noticeDate}</span>
                        </a>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Home Showmainmenu={showmainmenu} setNotice={setNotice} setNoticeDate={setNoticeDate} setNoticeIcon={setNoticeIcon}/>} />
                    <Route path="/product/:id" element={<ProductRegister setNotice={setNotice} setNoticeDate={setNoticeDate} setNoticeIcon={setNoticeIcon}/>} />
                    <Route path="/productregister" element={<ProductRegister setNotice={setNotice} setNoticeDate={setNoticeDate} setNoticeIcon={setNoticeIcon}/>} />
                    <Route path="/category" element={<Category setNotice={setNotice} setNoticeDate={setNoticeDate} setNoticeIcon={setNoticeIcon}/>} />
                    <Route path="/product" element={<Product setNotice={setNotice} setNoticeDate={setNoticeDate} setNoticeIcon={setNoticeIcon}/>} />
                    {/* <Route path="*" element={<Notfound/>}/> */}
                </Routes>
            </div>
            <div className="home-footer-wrap">
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
            </div>
        </div>
    );
}

export default App;
