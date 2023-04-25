import axios from "../../api/axios";
import styled from "styled-components";

import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GmId, categoryListType } from "./Shop";

import { productList } from "./Category";
import { useCookies } from "react-cookie";

import { v4 as uuidv4 } from 'uuid';

import "./Products.scss";

interface Props {
    gmId: GmId;
    categoryList: Array<{
        type: string;
        name: string;
        taskIds: any[];
        user: string;
        _id: string;
    }>;
    selectedColumn: categoryListType | null | undefined;
    setSelectedColumn: React.Dispatch<React.SetStateAction<categoryListType | null | undefined>>;
    selectedTask: categoryListType | null | undefined;
    setSelectedTask: React.Dispatch<React.SetStateAction<categoryListType | null | undefined>>;
}

interface Column {
    isQuickColumns: boolean;
}

const Column = styled.ul<Column>`
    display: ${(props) => (props.isQuickColumns ? "block" : "none")};
    position: absolute;
    background-color: #fff;
    z-index: 3;
    width: 50px;
    top: 20px;
    left: 20px;
`;

interface Task {
    isQuickTasks: boolean;
}

const Task = styled.ul<Task>`
    display: ${(props) => (props.isQuickTasks ? "block" : "none")};
    position: absolute;
    background-color: #fff;
    z-index: 3;
    width: 50px;
    top: 20px;
    left: 20px;
`;

const List = styled.li`
    display: flex;
`;

function Products({ gmId, categoryList }: Props) {

    const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

    const { id } = useParams();
    const [product, setProduct] = useState<productList[] | null>([]);

    console.log(product);

    const cost = (product && parseInt(product[0]?.cost)) || 0;
    const price = (product && parseInt(product[0]?.price)) || 0;
    console.log(price)
    const salePercent = ((cost - price) / cost) * 100;
    const salePercentInt = Math.floor(salePercent);

    // 장바구니 상품 랜덤ID 부여하기
    const randomId = uuidv4().replace(/-/g, '');

    useEffect(() => {
        const ProductData = async () => {
            try {
                const res = await axios.post(`/smartstore/shop/products/${id}`, { withCredentials: true });

                // console.log(res.data);

                setProduct([res.data]);
            } catch (err) {
                console.log(err);
            }
        };

        ProductData();
    }, [id]);

    const scroll = useRef<any>(null);
    const [scrollActive, setScrollActive] = useState(false);
    const [selectedBtnColor, setSelectedBtnColor] = useState(0);

    // // 상세정보 바로가기
    const productPages = (e: any) => {
        setTimeout(() => {
            scroll.current.scrollIntoView();
        }, 500);
        e.preventDefault();
    };

    // // 마우스 스크롤 상단고정
    const [scrollY, setScrollY] = useState(0);
    const quickmenuY = scroll.current ? scroll.current.getBoundingClientRect().top + window.pageYOffset : 500;

    const scrollFixed = () => {
        if (!scroll.current) return;
        if (scrollY > quickmenuY) {
            setSelectedBtnColor(0);
            setScrollY(window.pageYOffset);
            setScrollActive(true);
        } else {
            setScrollY(window.pageYOffset);
            setScrollActive(false);
        }
    };

    useEffect(() => {
        const scrollListener = () => {
            window.addEventListener("scroll", scrollFixed);
        };
        scrollListener();
        return () => {
            window.removeEventListener("scroll", scrollFixed);
        };
    });

    // 선택된 옵션 리스트
    const [selected, setSelected] = useState<any>([]); // 선택된 옵션
    console.log(selected)
    
    // 상품 영수증
    const [count, setCount] = useState<any>(1); // 개수 합계
    const [sum, setSum] = useState<any>(0); // 가격 합계

    // 상품 결과. 장바구니로 전송 할수 있습니다.
    const result = {
        user: cookies,
        product: product,
        selected: [{
            id: randomId,
            list: selected,
        }],
        count: count,
        total: sum,
    }

    console.log(result)

    // 상품의 카테고리를 찾습니다.
    const category = product && product[0]?.category;
    // console.log(category);

    // 서브 카테고리가 있는 경우 입니다.
    const task = category?.filter((list: any) => list.type == "task");
    // console.log(task);

    // 서브 카테고리가 있으며 해당 카테고리의 부모를 찾습니다.
    const columnTask = categoryList.filter((list: any) => {
        if (task && task[0]?.parentID) {
            return list._id == task[0].parentID;
        }
        return false;
    });
    // console.log(columnTask);

    // 서브 카테고리가 없으며 메인 카테고리만 있는 경우 입니다.
    const column = category?.find((list: any) => list.type === "column" && list.name !== "전체상품") || category?.find((list: any) => list.name === "전체상품");
    // console.log(column);

    // 우측상단 퀵메뉴
    const [isQuickColumns, setIsQuickColumns] = useState<boolean>(false);
    const [isQuickTasks, setIsQuickTasks] = useState<boolean>(false);

    const QuickColumnShow = () => {
        setIsQuickColumns(!isQuickColumns);
    };

    const QuickTaskShow = () => {
        setIsQuickTasks(!isQuickTasks);
    };

    const quickMenuColumn = (
        <Column isQuickColumns={isQuickColumns}>
            {categoryList.map((list: any) => (
                <List>
                    <Link to={`../../shop/${list._id}`}>{list.name}</Link>
                </List>
            ))}
        </Column>
    );

    // 상품 메인 이미지, 추가 이미지
    const [img, setImg] = useState([]);
    const mainImage = product && product[0]?.mainImage;
    const subImage = product && product[0]?.subImage;
    const images = [...(Array.isArray(mainImage) ? mainImage : []), ...(subImage ? subImage : [])];

    // 상품 정보 좌측
    const [imgList, setImgList] = useState([]);
    const [seeImg, setSeeImg] = useState(0);

    const subimgList = images.map((list: any, index: any) => {
        return (
            <li key={index}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <img src={list} onMouseOver={() => setSeeImg(index)} className={seeImg === index ? "img-sub img-sub-selected" : "img-sub"} />
                </a>
            </li>
        );
    });

    // 상품 이미지 스와이퍼 좌측 버튼
    const onLeftBtnClick = () => {
        if (seeImg === 0) {
            setSeeImg(images.length - 1);
        } else {
            setSeeImg(seeImg - 1);
        }
    };

    // 상품 이미지 스와이퍼 우측 버튼
    const onRightBtnClick = () => {
        if (seeImg === images.length - 1) {
            setSeeImg(0);
        } else {
            setSeeImg(seeImg + 1);
        }
    };

    // 상품 옵션 선택
    let select = (e: any) => {
        setShowdrop(false); // 옵션 모달창 끄기

        console.log(product && parseInt(product[0]?.price) * count)
        // const findIndex = selected.filter((list: any) => list.option == e.target.innerHTML)
        // console.log(findIndex)

        const select = {
            id: randomId,
            optionName: product && product[0]?.option[0].optionName,
            option: e.target.innerHTML,
            count: 1,
            price: price

        }

        const checked = selected.filter((it: any) => it.option === select.option);

        if (checked[0]) {
            checked[0].count++;
            checked[0].price += price;
        } else {
            setSelected([...selected, select]);
            setSum(sum + price);
        }
    };

    // 상품 옵션 리스트 만들기
    const optionList =
        product &&
        product[0]?.option.map((list: any, index: any) => (
            <li key={index} value={list.id} className="option" onClick={select}>
                {list.optionValue}
            </li>
        ));

    // 상품 개수 증가
    const increase = (e: any) => {
        const findIndex = selected.findIndex((element: any) => element.id == e.target.value);
        let copyArray = [...selected];
        console.log(copyArray)

        if (findIndex != -1) {
            copyArray[findIndex] = { ...copyArray[findIndex], count: (copyArray[findIndex].count += 1), price: (copyArray[findIndex].count * price) };
        }

        setSelected([...copyArray]);
    };

    // 상품 개수 감소
    const decrease = (e: any) => {

        const findIndex = selected.findIndex((element: any) => element.id == e.target.value);
        let copyArray = [...selected];

        if (findIndex != -1) {
            copyArray[findIndex] = { ...copyArray[findIndex], count: (copyArray[findIndex].count -= 1), price: (copyArray[findIndex].count * price) };
        }

        if (copyArray[findIndex].count <= 0) {
            copyArray[findIndex] = { ...copyArray[findIndex], count: (copyArray[findIndex].count = 1), price: price };
        }

        setSelected([...copyArray]);
    };

    // 상품 삭제
    const onRemove = (e: any) => {
        let copyArray = [...selected];

        const deleteList = copyArray.filter((element: any) => element.id != e.currentTarget.value);
        console.log(deleteList);
        setSelected([...deleteList]);
    };

    // 상품 최종 결제 금액 계산
    useEffect(() => {
        let countSum = 0;
        selected.forEach((number: any) => (countSum += number.count));
        setCount(countSum);
        setSum(countSum * price);
    });

    // 상품 선택된 옵션 리스트
    const resultList = selected.map((list: any, index: any) => {
        return (
            <li key={index}>
                <div className="select-product">
                    <div className="select-product-name">{list.option}</div>
                    <div className="select-product-count flex flex-ju-bt flex-align-center">
                        <div className="input-wrap flex flex-ju-center flex-align-center">
                            <button className="minus" value={list.id} onClick={decrease}></button>
                            <div className="number">{list.count}</div>
                            <button className="plus" value={list.id} onClick={increase}></button>
                        </div>
                        <div className="price-wrap">
                            <span className="price">{(price * list.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className="unit">원</span>
                            <button className="delete-btn" value={list.id} onClick={onRemove}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13">
                                    <path
                                        fill="#222"
                                        fill-rule="evenodd"
                                        d="M8 8H7V7h1v1zm1 1H8V8h1v1zm1 1H9V9h1v1zm1 1h-1v-1h1v1zm1 1h-1v-1h1v1zm1 1h-1v-1h1v1zM6 7V6h1v1H6zM5 8V7h1v1H5zM4 9V8h1v1H4zm-1 1V9h1v1H3zm-1 1v-1h1v1H2zm-1 1v-1h1v1H1zm-1 1v-1h1v1H0zm5-8h1v1H5V5zM4 4h1v1H4V4zM3 3h1v1H3V3zM2 2h1v1H2V2zM1 1h1v1H1V1zM0 0h1v1H0V0zm8 5v1H7V5h1zm1-1v1H8V4h1zm1-1v1H9V3h1zm1-1v1h-1V2h1zm1-1v1h-1V1h1zm1-1v1h-1V0h1z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        );
    });

    const [showdropmenu, setShowdrop] = useState(false);
    const dropmenu = useRef<HTMLDivElement>(null);

    // 옵션창 바깥 눌렀을때 끄는 기능
    useEffect(() => {
        const clickOutside = (e: any) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            // useRef의 current 값은 선택한 DOM을 말함.
            // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

            if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
                setShowdrop(false);
                // console.log('바깥을 눌렀습니다')
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [showdropmenu]);


    // 장바구니 추가 버튼
    const cartBtn = async () => {
        if(!selected[0]){
            alert('옵션을 선택 해주세요');
        } else {
            try {
                const res = await axios.post("/smartstore/cart/cartAdd", result, { withCredentials: true });
                // setCategoryList(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <div className="products-wrap">
                <div className="products-inner flex flex-ju-center">
                    <div className="products-inner2">
                        <div className="top-menu flex flex-ju-bt">
                            <div className="send-wrap">
                                <ul className="send">
                                    <li>
                                        <a href="{() => false}" className="blog"></a>
                                    </li>
                                    <li>
                                        <a href="{() => false}" className="cafe"></a>
                                    </li>
                                    <li>
                                        <a href="{() => false}" className="keep"></a>
                                    </li>
                                    <li className="release-list">
                                        <a href="{() => false}" className="release"></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="quick-menu flex flex-ju-center flex-align-center">
                                <a href="{() => false}">홈</a>
                                <span className="bar"></span>
                                {task && task[0] ? (
                                    <>
                                        <a className="type-first" onClick={QuickColumnShow}>
                                            {columnTask && columnTask[0]?.name}
                                            {quickMenuColumn}
                                        </a>
                                        <a className="type-second" onClick={QuickTaskShow}>
                                            {task && task[0].name}
                                            {
                                                <Task isQuickTasks={isQuickTasks}>
                                                    {categoryList.map((list: any) => {
                                                        // list의 _id와 url 파라미터의 id가 일치하는지 확인
                                                        if (columnTask && columnTask[0]._id == list._id) {
                                                            // list의 taskIds가 배열인지 확인
                                                            if (Array.isArray(list.taskIds)) {
                                                                // list의 taskIds를 반복하여 name을 출력
                                                                return list.taskIds.map((task: any) => (
                                                                    <List>
                                                                        <Link to={`../../shop/${task._id}`}>{task.name}</Link>
                                                                    </List>
                                                                ));
                                                            }
                                                        }
                                                    })}
                                                </Task>
                                            }
                                        </a>
                                    </>
                                ) : (
                                    <a className="type-first" onClick={QuickColumnShow}>
                                        {column && column?.name}
                                        {quickMenuColumn}
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="product-info-wrap flex flex-ju-center flex-wrap">
                            <div className="product-info-top flex">
                                <div className="product-info-left">
                                    <div className="img-wrap">
                                        <img src={images[seeImg]} alt="error" className="img" />
                                        <button className="left-btn" onClick={onLeftBtnClick}></button>
                                        <button className="right-btn" onClick={onRightBtnClick}></button>
                                    </div>
                                    <div className="img-sub-wrap flex flex-ju-center">
                                        <ul>{subimgList}</ul>
                                    </div>
                                    <div className="review-wrap flex flex-align-center">
                                        <span className="review-text">리뷰수</span>
                                        <span className="review-count number">0</span>
                                        <span className="circle"></span>
                                        <span className="review-text">사용자 총 평점</span>
                                        <span className="review-min-score number">0</span>
                                        <span className="bar"></span>
                                        <span className="review-max-score number">0</span>
                                    </div>
                                </div>
                                <div className="product-info-right">
                                    <div className="name-price-wrap">
                                        <h3 className="name">{product && product[0]?.name}</h3>
                                        <div className="price-wrap flex flex-ju-bt">
                                            <span className="sale-percent">
                                                <span className="number">{salePercentInt}</span>
                                                <span className="unit">%</span>
                                            </span>
                                            <div className="origin-sale-wrap">
                                                <del className="original-price">
                                                    <span className="number">{product && product[0]?.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                    <span className="unit">원</span>
                                                </del>
                                                <strong className="sale-price">
                                                    <span className="number">{product && product[0]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                    <span className="unit">원</span>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lotte-card flex flex-align-center">
                                        <span className="icon-card"></span>
                                        <span className="text">네이버페이 쇼핑엔로카 최대 36개월 무이자할부</span>
                                        <button className="icon-question-mark"></button>
                                    </div>
                                    {/* <div className="sale-info">
                                        <div className="top flex flex-ju-bt flex-align-center">
                                            <div className="top-left">
                                                <span className="username">유저이름</span>
                                                <span className="text">님만을 위한 혜택</span>
                                            </div>
                                            <div className="top-right">
                                                <button className="coupon-wrap">
                                                    <span className="coupon-text">쿠폰받기</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="middle">
                                            <div className="middle-top flex flex-ju-bt flex-align-center">
                                                <span className="sale-text-wrap flex flex-ju-bt flex-align-center">
                                                    <span className="sale-text">최대 할인가</span>
                                                    <button className="sale-text-icon"></button>
                                                </span>
                                                <span className="sale-number-wrap flex flex-ju-bt flex-align-center">
                                                    <span className="number">3,127,160</span>
                                                    <span className="unit">원</span>
                                                </span>
                                            </div>
                                            <ul className="middle-middle">
                                                <li className="flex flex-ju-bt">
                                                    <span>알림받기 등의 고객 5% 상품중복할인</span>
                                                    <span>
                                                        <span>-164,640원</span>
                                                    </span>
                                                </li>
                                                <li className="flex flex-ju-bt">
                                                    <span>애플 공식... 전 고객 2% 장바구니할인</span>
                                                    <span>
                                                        <span>-1,000원</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bottom">
                                            <div className="bottom-top flex flex-ju-bt flex-align-center">
                                                <span className="point-max-text">최대 적립 포인트</span>
                                                <span className="point-max-number-wrap flex flex-align-center">
                                                    <span className="point-max-number">53,228</span>
                                                    <span className="point-max-unit">원</span>
                                                    <button className="point-max-icon"></button>
                                                </span>
                                            </div>
                                            <ul className="bottom-middle">
                                                <li className="flex flex-ju-bt">
                                                    <span>기본적립</span>
                                                    <span>
                                                        <span>32,928원</span>
                                                    </span>
                                                </li>
                                                <li className="flex flex-ju-bt">
                                                    <a href="{() => false}" className="flex flex-align-center">
                                                        <span className="membership-icon"></span>
                                                        <span>멤버십 추가 적립</span>
                                                        <span className="arrow-icon"></span>
                                                    </a>
                                                    <span>
                                                        <span>20,000원</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    <div className="event-info">
                                        <ul>
                                            <li>
                                                <span>무이자할부</span>
                                                <span className="bar"></span>
                                                <span>카드 자세히 보기</span>
                                                <button className="icon-question-mark"></button>
                                            </li>
                                            <li>
                                                <span>이벤트</span>
                                                <span className="bar"></span>
                                                <span>알림설정 5% 쿠폰할인 + 롯데/하나카드 간편결제 5% 적립혜택</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="delivery-info">
                                        <div className="top">
                                            <span>택배배송</span>
                                            <span className="bar"></span>
                                            <span>{product && product[0]?.delivery}</span>
                                            <span>원</span>
                                            <span className="circle"></span>
                                            <span className="delivery-company">CJ대한통운</span>
                                        </div>
                                    </div>
                                    <div className="option-info">
                                        <div className="selectize-control" ref={dropmenu}>
                                            <div className={showdropmenu ? "selectize-input check" : "selectize-input"} onClick={() => setShowdrop((e) => !e)}>
                                                <div className="item">{product && product[0]?.option[0].optionName}</div>
                                            </div>
                                            <div className={showdropmenu ? "selectize-dropdown dropdown-active" : "selectize-dropdown"}>
                                                <div className="selectize-dropdown-content">{optionList}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-info">
                                        <ul className="cart-wrap">{resultList}</ul>
                                    </div>
                                    <div className="sum flex flex-ju-bt flex-align-center">
                                        <div className="sum-left">
                                            <strong className="sum-left-text">총 상품 금액</strong>
                                            <button className="icon-question-mark"></button>
                                        </div>
                                        <div className="sum-right flex flex-align-center">
                                            <div className="sum-count-wrap">
                                                <span className="sum-right-text">`총 수량 </span>
                                                <span className="sum-count">{count}</span>
                                                <span className="sum-unit">개</span>
                                            </div>
                                            <div className="bar"></div>
                                            <div className="sum-price-wrap">
                                                <span className="sum-price">{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                <span className="sum-unit">원</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <div className="btn-buy-wrap">
                                            <a href="{() => false}" className="btn-buy"></a>
                                        </div>
                                        <div className="bottom flex flex-align-center">
                                            <div className="btn-keep-wrap">
                                                <a href="{() => false}" className="btn-keep">
                                                    <div className="btn-keep-inner flex flex-ju-center flex-align-center">
                                                        <span className="btn-keep-icon"></span>
                                                        <span className="btn-keep-icon2"></span>
                                                        <span className="btn-keep-number">0</span>
                                                    </div>
                                                </a>
                                            </div>
                                            {/* 장바구니 버튼 */}
                                            <div className="btn-cart-wrap">
                                                {/* <Link to={`../../shop/${list._id}`} className="btn-cart">{list.name}</Link> */}
                                                <span onClick={cartBtn} className="btn-cart"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tip flex flex-align-center">
                                        <span className="tip-icon"></span>
                                        <span className="tip-text">쇼핑할 때 필독</span>
                                        <a href="{() => false}" className="tip-right">
                                            <span className="tip-text">안전거래TIP</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="product-info-bottom">
                                <div className="top-review">
                                    <div className="top-review-text-wrap flex flex-ju-bt">
                                        <span className="top-review-left">
                                            <span className="top-review-text">사진/동영상</span>
                                            <span className="top-review-number">(4)</span>
                                        </span>
                                        <span className="top-review-right">
                                            <button className="moreview-btn">더보기</button>
                                            <button className="leftbtn"></button>
                                            <button className="rightbtn"></button>
                                        </span>
                                    </div>
                                    <ul className="top-review-list-wrap flex flex-wrap">
                                        <li className="review-list">
                                            <a href="{() => false}" className="review-list-link flex flex-ju-bt">
                                                <div className="review-list-left">
                                                    <div className="review-info-wrap">
                                                        <div className="score-wrap">
                                                            <span className="score">
                                                                <span className="under score4"></span>
                                                                <span className="number">4</span>
                                                            </span>
                                                        </div>
                                                        <div className="review-info">
                                                            <span className="username">test4</span>
                                                            <span className="circle"></span>
                                                            <span className="review-date">22.12.23</span>
                                                            <span className="circle"></span>
                                                            <span className="selected-option">색상 선택: 실버</span>
                                                        </div>
                                                    </div>
                                                    <div className="review-text"></div>
                                                </div>
                                                <div className="review-list-right">
                                                    <img src="/img/shop/products/macbookpro/review/04.jpeg" alt="" className="img" />
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="quick-menu flex flex-ju-center" ref={scroll}>
                                    <span className={selectedBtnColor === 0 ? "menu selected" : "menu"} onClick={productPages}>
                                        상세정보
                                    </span>
                                    <span className="menu menu-review">
                                        리뷰&nbsp;
                                        <span className="menu-number review-count">0</span>
                                    </span>
                                    <span className="menu menu-qna">
                                        Q&A&nbsp;
                                        <span className="menu-number qna-count">0</span>
                                    </span>
                                    <span className="menu">반품/교환정보</span>
                                </div>
                                <div className={scrollActive === false ? "quick-menu-scroll scroll-fixed-active" : "quick-menu-scroll"}>
                                    <div className="wrap">
                                        <div className="product-info">
                                            <div className="img-wrap">
                                                <img src={images[0]} alt="error" className="img" />
                                            </div>
                                            <div className="product-name">{product && product[0]?.name}</div>
                                            <div className="product-price flex flex-align-center">
                                                <span className="sale-price">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                <span className="sale-unit">원</span>
                                                <del className="origin-price">
                                                    {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    <span className="origin-unit">원</span>
                                                </del>
                                            </div>
                                            <button className="btn-buy"></button>
                                        </div>
                                        <div className="fixed-quick-menu flex flex-ju-center">
                                            <span className={selectedBtnColor === 0 ? "menu selected" : "menu"} onClick={productPages}>
                                                상세정보
                                            </span>
                                            <span className="menu menu-review">
                                                리뷰&nbsp;
                                                <span className="menu-number review-count">0</span>
                                            </span>
                                            <span className="menu menu-qna">
                                                Q&A&nbsp;
                                                <span className="menu-number qna-count">0</span>
                                            </span>
                                            <span className="menu">반품/교환정보</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="caution">
                                    <div className="caution-top-wrap">
                                        <div className="caution-top">
                                            <span className="caution-icon"></span>
                                            <span className="caution-title">직거래 유도 주의 안내</span>
                                        </div>
                                    </div>
                                    <div className="caution-bottom">
                                        <span className="text1">스마트스토어를 통해 톡톡 / 상품문의 등을 활용하여 </span>
                                        <span className="text2">현금결제를 유도하는 경우 사기의 가능성이 있으니 절대 결제하지 마시고&nbsp;</span>
                                        <span className="text3">네이버페이 고객센터로 문의 주시기 바랍니다.</span>
                                    </div>
                                </div>
                                <div className="product-pages">
                                    {product &&
                                        product[0]?.detailImage?.map((list: any) => {
                                            return <img src={list} alt="" />;
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
