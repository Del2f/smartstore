import axios from "../../api/axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import Home from "./Home";
import Category from "./Category";
import Products from "./Products";
import NotFound from "./NotFound";
import Qna from "./Qna";

import { selectCurrentUser } from "../../store/userSlice";

import "./Shop.scss";

let currentPath = "";

const ContainerUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    color: #808080;
`;

const List = styled.li`
    margin: 20px;
    position: relative;
    
    & > a {
        color: #808080;
    }
`;

interface SubCategoryUl {
    isSubCateShow: boolean;
}

const SubCategoryUl = styled.ul<SubCategoryUl>`
    display: ${(props) => (props.isSubCateShow ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: -30px;
    top: 35px;
    width: 100px;
    background-color: white;
    z-index: 100;
    padding: 5px;
`;

const SubList = styled.li`
    & > a {
        color: #474747;

    }
`;

export interface categoryListType {
    type: 'column' | 'task';
    name: string;
    taskIds?: any[];
    user: string;
    _id: string;
    parentID?: string;
}

export interface GmId {
    id: string;
}

function Shop() {
    const location = useLocation();

    useEffect(() => {
        if (currentPath === location.pathname) window.location.reload();
        currentPath = location.pathname;
    }, [location]);

    const user = useSelector(selectCurrentUser);
    console.log(user)

    const navigate = useNavigate();

    // 카테고리 클릭시 퀵메뉴
    const [selectedColumn, setSelectedColumn] = useState<categoryListType | null | undefined>();
    const [selectedTask, setSelectedTask] = useState<categoryListType | null | undefined>();

    // 암호화된 id를 입력.
    const [gmId, setGmId] = useState<GmId>({id: "thanks6"});

    useEffect(() => {
        const userData = async () => {
            try {
                const res = await axios.post("/smartstore/shop", gmId, { withCredentials: true });
                setCategoryList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        userData();
    }, []);

    const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

    // 카테고리 클릭시 해당 카테고리의 id가 저장되어 중복클릭을 방지
    const [isCategoryClick, setIsCategoryClick] = useState<boolean>(false);
    const [clickedLinkId, setClickedLinkId] = useState(null);

    useEffect(() => {
        const categoryReset = async () => {
            if (!isCategoryClick) {
                await setClickedLinkId(null);
                // console.log("카테고리 영역이 아니므로 초기화를 진행합니다.");
            }
            setIsCategoryClick(false);
        };
        categoryReset();
    }, [location]);

    const [categoryList, setCategoryList] = useState<Array<{
        type: string,
        name: string,
        taskIds: any[],
        user: string,
        _id: string
    }>>([]);

    const [isSubCateShow, setIsSubCateShow] = useState<boolean>(false);

    const SubCategoryShow = () => {
        setIsSubCateShow(true);
    };

    const SubCategoryHide = () => {
        setIsSubCateShow(false);
    };

    //   로그인 관련
    const logOut = () => {
        removeCookie("userjwt", { path: "/" });
        navigate("/shop");
    };

    return (
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
                                    <div className={cookies.userjwt ? "user-loginbtn-wrap display-none" : "user-loginbtn-wrap"}>
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
                                    <div className={!cookies.userjwt ? "user-logged-wrap display-none" : "user-logged-wrap"}>
                                        <button className="user-loginbtn">    
                                            <Link to={""}>마이페이지</Link>
                                        </button>
                                        <button className="user-loginbtn">    
                                            <Link to={"/cart"}>장바구니</Link>
                                        </button>
                                        <span className="user-name">    
                                            <Link to={""}>{user.name}</Link>
                                        </span>
                                        <button className="user-loginbtn" onClick={logOut}>
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
                                    <span className="alarm-customer flex flex-ju-center flex-align-center">
                                        관심고객수 0<button className="alarm-customer-icon"></button>
                                    </span>
                                </div>
                                <Link to="/shop">
                                    <h1 className="shoplogo"></h1>
                                </Link>
                                <div className="right">
                                    <div className="search-wrap">
                                        <input type="text" className="input" placeholder="검색어를 입력해보세요." />
                                        <button className="search-btn">
                                            <span className="search-btn-icon"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="line-bottom-menulist flex flex-ju-bt flex-align-center">
                                <div className="menulist-wrap flex flex-ju-sa flex-align-center">
                                    <ContainerUl>
                                        {categoryList.map((list: any, index: any) => {
                                            if (list.taskIds.length > 0) {
                                                return (
                                                    <List onMouseLeave={SubCategoryHide} key={index}>
                                                        <Link
                                                            to={`./${list._id}`}
                                                            onMouseEnter={SubCategoryShow}
                                                            onClick={(e) => {
                                                                if (list._id == clickedLinkId) {
                                                                    e.preventDefault();
                                                                } else {
                                                                    setClickedLinkId(list._id);
                                                                    setIsCategoryClick(true);
                                                                }
                                                            }}
                                                        >
                                                            {list.name}
                                                        </Link>
                                                        <SubCategoryUl isSubCateShow={isSubCateShow}>
                                                            {list.taskIds.map((taskIds: any, index: any) => {
                                                                return (
                                                                    <SubList key={index}>
                                                                        <Link
                                                                            to={`./${taskIds._id}`}
                                                                            onClick={(e) => {
                                                                                if (taskIds._id == clickedLinkId) {
                                                                                    e.preventDefault();
                                                                                } else {
                                                                                    setClickedLinkId(taskIds._id);
                                                                                    setIsCategoryClick(true);
                                                                                }
                                                                            }}
                                                                        >
                                                                            {taskIds.name}
                                                                        </Link>
                                                                    </SubList>
                                                                );
                                                            })}
                                                        </SubCategoryUl>
                                                    </List>
                                                );
                                            } else {
                                                return (
                                                    <List>
                                                        <Link
                                                            to={`./${list._id}`}
                                                            onClick={(e) => {
                                                                if (list._id == clickedLinkId) {
                                                                    e.preventDefault();
                                                                } else {
                                                                    setClickedLinkId(list._id);
                                                                    setIsCategoryClick(true);
                                                                }
                                                            }}
                                                        >
                                                            {list.name}
                                                        </Link>
                                                        <span className="menu-icon"></span>
                                                    </List>
                                                );
                                            }
                                        })}
                                    </ContainerUl>
                                </div>
                                <div className="seller-menu-wrap flex flex-ju-sa flex-align-center">
                                    <Link to={"qna"} className="menu">묻고 답하기</Link>
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
                        <Route path="*" element={<NotFound />} />
                        <Route path="/products/:id" element={<Products gmId={gmId} categoryList={categoryList} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />} />
                        <Route path="/:id" element={<Category gmId={gmId} categoryList={categoryList} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/qna" element={<Qna />} />
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
                                <button>
                                    잘못된 번호 신고
                                    <span className="icon"></span>
                                </button>
                            </div>
                            <div className="fourth flex flex-align-center">
                                <button>
                                    판매자정보
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
                                    <div>사업자등록번호 220-81-62517</div>
                                    <span className="bar"></span>
                                    <div>통신판매업신고번호 2006-경기성남-0692호</div>
                                    <br></br>
                                    <div>대표이사 최수연</div>
                                    <span className="bar"></span>
                                    <div>경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561</div>
                                    <br></br>
                                    <div>전화 1588-3819</div>
                                    <span className="bar"></span>
                                    <div>이메일 helpcustomer@naver.com</div>
                                    <span className="bar"></span>
                                    <div>사업자등록정보 확인</div>
                                    <br></br>
                                    <div>호스팅 서비스 제공 : NAVER Cloud</div>
                                </div>
                                <div className="customer-service">
                                    <h2>고객센터</h2>
                                    <div>강원도 춘천시 퇴계로 89 강원전문건설회관</div>
                                    <br></br>
                                    <div>전화 1588-3819</div>
                                    <button>전화전클릭</button>
                                    <br></br>
                                    <div>결제도용신고 1588-3816</div>
                                    <br></br>
                                    <strong>1:1문의 바로가기</strong>
                                    <br></br>
                                </div>
                                <div className="report">
                                    <h2>전자금융거래 분쟁처리</h2>
                                    <div>전화 1588-3819</div>
                                    <br></br>
                                    <strong>1:1문의 바로가기</strong>
                                    <br></br>
                                </div>
                            </div>
                            <div className="third">
                                <div>네이버㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</div>
                                <a href="{() => false}">자세히보기</a>
                            </div>
                            <div className="fourth">
                                <a href="{() => false}" className="naver-logo"></a>
                                <span>
                                    Copyright © <strong>NAVER Corp</strong>.All Rights Reserved.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
