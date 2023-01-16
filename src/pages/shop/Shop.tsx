import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";

import Home from "./Home";
import Category from "./Category";
import Products from "./Products";
import NotFound from "./NotFound";

import { selectCurrentUser } from '../../store/userSlice';

import "./Shop.scss";
import "../../components/flex.css";

let currentPath = "";

function Shop () {

    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userjwt']);

    // useEffect(() => {
    //     const verifyUser = async () => {
    //       if (!cookies.userjwt) { // 토큰이 없으면 로그인 페이지로 이동.
    //         // navigate("/user/login");
    //         console.log('유저가 로그인을 하지 않았습니다')

    //       } else {
    //         const { data } = await axios.post(
    //           "http://localhost:8080/smartstore/shop",
    //           {},
    //           {
    //             withCredentials: true,
    //           }
    //         );
    //         if (!data.status) {
    //           removeCookie("userjwt");
    //           navigate("/shop");
    //         } else
    //           console.log(`Hi ${data.user} `);
    //           console.log(data);
    //       }
    //     };
    //     verifyUser();
    //   }, [cookies, navigate, removeCookie]);
    
    const location = useLocation();
    
    useEffect(() => {
        if(currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
      }, [location]);

    //   로그인 관련

    const logOut = () => {
        console.log('로그아웃')
        removeCookie("userjwt", { path: '/' });
        navigate("/shop");
    };

    return(
        <>
            <div className="shop-main-wrap">
                <div className="header-middle-wrap">
                    <div className="header-wrap">
                        <div className="header-inner">
                            <div className="line-top-naver-user flex flex-ju-bt flex-align-center">
                                <div className="left">
                                    <a href="{() => false}" className="naver-logo"></a>
                                    <a href="{() => false}" className="naver-shopping"></a>
                                </div>
                                <div className="right">
                                    <div className={ cookies.userjwt ? "user-loginbtn-wrap display-none" : "user-loginbtn-wrap"}>
                                        <button className="user-loginbtn">
                                            <Link to="../">
                                                <span>관리자 페이지</span>
                                            </Link>
                                        </button>
                                        <button className="user-loginbtn">
                                            <Link to="../user/login">
                                                <span>로그인</span>
                                            </Link>
                                        </button>
                                    </div>
                                    <div className={ !cookies.userjwt ? "user-logged-wrap display-none" : "user-logged-wrap"}>
                                        <a href="{() => false}">마이페이지</a>
                                        <a href="{() => false}">장바구니</a>
                                        <a href="{() => false}">{user.name}</a>
                                        <button className="user-loginbtn" onClick={ logOut }>
                                            <span>로그아웃</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="line-middle-shoplogo flex flex-ju-bt flex-align-center">
                                <div className="left flex flex-align-center">
                                    <button className="alarm-btn flex flex-ju-center flex-align-center">
                                        <span className="alarm-logo"></span>
                                        <span className="btn-text">알림받기</span>
                                    </button>
                                    <span className="alarm-customer flex flex-ju-center flex-align-center">관심고객수 0
                                        <button className="alarm-customer-icon"></button>
                                    </span>
                                </div>
                                <Link to="/shop">
                                    <h1 className="shoplogo"></h1>
                                </Link>
                                <div className="right">
                                    <div className="search-wrap">
                                        <input type="text" className="input" placeholder="검색어를 입력해보세요."/>
                                        <button className="search-btn">
                                            <span className="search-btn-icon"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="line-bottom-menulist flex flex-ju-bt flex-align-center">
                                <div className="menulist-wrap flex flex-ju-sa flex-align-center">
                                    <a href="{() => false}" className="menu">
                                        <Link to="category">
                                        베스트
                                        </Link>
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        Mac
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        iPad
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        iPhone
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        Watch
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        AirPods
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        Apple TV
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        액세서리
                                        <span className="menu-icon"></span>
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        전체상품
                                        <span className="menu-icon"></span>
                                    </a>
                                </div>
                                <div className="seller-menu-wrap flex flex-ju-sa flex-align-center">
                                    <a href="{() => false}" className="menu">
                                        묻고 답하기
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        공지사항
                                    </a>
                                    <a href="{() => false}" className="menu">
                                        리뷰이벤트
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/category" element={<Category/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>

                <div className="footer-wrap">
                    <div className="footer-inner">
                        <div className="footer-top flex">
                            <div className="first flex flex-align-center">
                                <span className="icon"></span>
                                <span className="text">반품 배송비, 반품 배송주소 등은 해당 상품 페이지 내 안내를 참고해주세요.</span>
                            </div>
                            <div className="second flex flex-align-center">
                                <span className="seller-name">사업자 이름</span>
                            </div>
                            <div className="third flex flex-align-center">
                                <span className="seller-number">02-000-0000</span>
                                <span className="seller-auth">인증</span>
                                <button>잘못된 번호 신고
                                    <span className="icon"></span>
                                </button>
                            </div>
                            <div className="fourth flex flex-align-center">
                                <button>판매자정보
                                    <span className="icon"></span>
                                </button>
                            </div>
                        </div>
                        <div className="footer-main">
                            <div className="first">
                                <span>네이버 약관</span>
                                <span>네이버페이 약관</span>
                                <span>전자금융거래 약관</span>
                                <span>개인정보처리방침</span>
                                <span>책임의 한계와 법적고지</span>
                                <span>청소년보호정책</span>
                                <span>지식재산권신고센터</span>
                                <span>안전거래 가이드</span>
                                <span>쇼핑&페이 고객센터</span>
                            </div>
                            <div className="second flex">
                                <div className="naver-info">
                                    <h2>네이버㈜</h2>
                                    <div>사업자등록번호 220-81-62517</div><span className="bar"></span>
                                    <div>통신판매업신고번호 2006-경기성남-0692호</div><br></br>
                                    <div>대표이사 최수연</div><span className="bar"></span>
                                    <div>경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561</div><br></br>
                                    <div>전화 1588-3819</div><span className="bar"></span>
                                    <div>이메일 helpcustomer@naver.com</div><span className="bar"></span>
                                    <div>사업자등록정보 확인</div><br></br>
                                    <div>호스팅 서비스 제공 : NAVER Cloud</div>
                                </div>
                                <div className="customer-service">
                                    <h2>고객센터</h2>
                                    <div>강원도 춘천시 퇴계로 89 강원전문건설회관</div><br></br>
                                    <div>전화 1588-3819</div><button>전화전클릭</button><br></br>
                                    <div>결제도용신고 1588-3816</div><br></br>
                                    <strong>1:1문의 바로가기</strong><br></br>
                                </div>
                                <div className="report">
                                    <h2>전자금융거래 분쟁처리</h2>
                                    <div>전화 1588-3819</div><br></br>
                                    <strong>1:1문의 바로가기</strong><br></br>
                                </div>
                            </div>
                            <div className="third">
                                <div>네이버㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</div>
                                <a href="{() => false}">자세히보기</a>
                            </div>
                            <div className="fourth">
                                <a href="{() => false}" className="naver-logo"></a>
                                <span>Copyright © <strong>NAVER Corp</strong>.All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop;