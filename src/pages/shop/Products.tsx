import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GmIdType } from "./Shop";
import { ColumnType, TaskType, SubTaskType } from "../adminPage/Category";
import { cartListType } from "../shop/Cart";
import { productList } from "./Category";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

import "./Products.scss";

import MacBookAirM2 from "../adminPage/Product/Mac/macbook-air-m2";

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

// 상품 전체 Wrap
const ProductNav = styled.div`
  position: sticky;
  box-sizing: content-box;
  height: 66px;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1024px;
`;

// 상품 전체 Wrap
const Product = styled.div`
  /* display: flex;
  justify-content: center; */
`;

// 상품 상단 Nav
const ProductWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 3;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
`;

interface ProductBG {}

const ProductBG = styled.div<ProductBG>`
  position: absolute;
  left: 0;
  top: 0;
  margin-top: calc(-1 * 44px);
  padding-top: 44px;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: background 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  /* background: var(--localnav-background); */
`;

const ProductContent = styled.div`
  margin: 0 auto;
  max-width: 980px;
  padding: 0 22px;
  position: relative;
  z-index: 2;

  &::before {
    content: " ";
    display: table;
  }

  &::after {
    content: " ";
    display: table;
  }
`;

const ProductTitle = styled.div`
  height: 66px;
  color: #000;
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  font-size: 21px;
  line-height: 1.14286;
  font-weight: 600;
  letter-spacing: 0.011em;
  cursor: default;
  display: block;
  float: left;
  margin: 14px 0 -14px;
  padding: 0;
  white-space: nowrap;
`;

const Home = styled.a`
  display: flex;
  flex-direction: column-reverse;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.88;

  color: #000;
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
`;

const Subtitle = styled.span`
  opacity: 0.64;
  font-size: 12px;
  line-height: 1.41667;
  font-weight: 400;
`;

const ProductMenu = styled.div`
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  float: right;
  margin-top: -3px;
  letter-spacing: 0em;
`;

const MenuWrap = styled.div`
  padding-top: 34px;
  float: left;
`;

const MenuItems = styled.ul``;

const MenuItem = styled.li`
  margin-left: 24px;
  float: left;
  list-style: none;

  & > a,
  span {
    color: #000;
    display: inline-block;
    line-height: 22px;
    white-space: nowrap;
    opacity: 0.88;
    text-decoration: none;
  }

  & > span {
    color: #000;
    opacity: 0.56;
    cursor: default;
  }
`;

const Actions = styled.div`
  padding-top: 34px;
  float: left;
`;
const ActionButton = styled.div`
  margin-left: 24px;
  float: left;
`;
const ActionLink = styled.a`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  background: #0071e3;
  color: #fff;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 980px;
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  border-style: solid;
  border-width: 1px;
  min-width: 25px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  --sk-button-margin-horizontal: 10px;
  --sk-button-margin-vertical: 10px;
`;

interface Props {
  gmId: GmIdType;
  categoryList: ColumnType[];
  setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
}

function Products({ gmId, categoryList, setNavCart }: Props) {
  const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState<productList | null>();
  const cost = (product && parseInt(product?.cost)) || 0;
  const price = (product && parseInt(product?.price)) || 0;
  const salePercent = ((cost - price) / cost) * 100;
  const salePercentInt = Math.floor(salePercent);
  const scroll = useRef<any>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [selectedBtnColor, setSelectedBtnColor] = useState(0);
  const [URL, setURL] = useState<string>("");
  const [isIdNotFound, setIsIdNotFound] = useState<boolean>(false);

  console.log(URL);
  console.log(product);

  // // 마우스 스크롤 상단고정
  const [scrollY, setScrollY] = useState(0);
  const quickmenuY = scroll.current ? scroll.current.getBoundingClientRect().top + window.pageYOffset : 500;

  // 장바구니 상품 랜덤ID 부여하기
  const randomId = uuidv4().replace(/-/g, "");

  // 선택된 옵션 리스트
  const [selected, setSelected] = useState<any>([]); // 선택된 옵션
  // console.log(selected);

  // 상품 영수증
  const [count, setCount] = useState<any>(1); // 개수 합계
  const [sum, setSum] = useState<any>(0); // 가격 합계

  // 우측상단 퀵메뉴
  const [isQuickColumns, setIsQuickColumns] = useState<boolean>(false);
  const [isQuickTasks, setIsQuickTasks] = useState<boolean>(false);

  // 상품 메인 이미지, 추가 이미지
  const [img, setImg] = useState([]);
  const mainImage = product && product?.mainImage;
  const subImage = product && product?.subImage;
  const images = [...(Array.isArray(mainImage) ? mainImage : []), ...(subImage ? subImage : [])];

  // 상품 정보 좌측
  const [imgList, setImgList] = useState([]);
  const [seeImg, setSeeImg] = useState(0);

  const [showdropmenu, setShowdrop] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ProductData = async () => {
      try {
        const res = await axios.post(`/smartstore/shop/products/${id}`, { withCredentials: true });

        setProduct(res.data);
        setURL(res.data.url);
      } catch (err) {
        console.log(err);
        setIsIdNotFound(true);
      }
    };

    ProductData();
  }, [id]);

  // // 상세정보 바로가기
  const productPages = (e: any) => {
    setTimeout(() => {
      scroll.current.scrollIntoView();
    }, 500);
    e.preventDefault();
  };

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

  // 상품 결과. 장바구니로 전송 할수 있습니다.
  const result = {
    user: cookies,
    product: product,
    selected: [
      {
        id: randomId,
        list: selected,
      },
    ],
    count: count,
    total: sum,
  };

  // 상품의 카테고리를 찾습니다.
  const category = product && product?.category;
  // console.log(category);

  // 서브 카테고리가 있는 경우 입니다.
  const task = category?.filter((list: any) => list.type == "task");

  // 서브 카테고리가 있으며 해당 카테고리의 부모를 찾습니다.
  const columnTask = categoryList.filter((list: any) => {
    if (task && task[0]?.parentID) {
      return list._id == task[0].parentID;
    }
    return false;
  });

  // 서브 카테고리가 없으며 메인 카테고리만 있는 경우 입니다.
  const column =
    category?.find((list: any) => list.type === "column" && list.name !== "전체상품") || category?.find((list: any) => list.name === "전체상품");
  // console.log(column);

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

    // console.log(product && parseInt(product?.price) * count)
    // const findIndex = selected.filter((list: any) => list.option == e.target.innerHTML)
    // console.log(findIndex)

    const select = {
      id: randomId,
      optionName: product && product?.option[0].optionName,
      option: e.target.innerHTML,
      count: 1,
      price: price,
    };

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
    product?.option.map((list: any, index: any) => (
      <li key={index} value={list.id} className="option" onClick={select}>
        {list.optionValue}
      </li>
    ));

  // 상품 개수 증가
  const increase = (e: any) => {
    const findIndex = selected.findIndex((element: any) => element.id == e.target.value);
    let copyArray = [...selected];
    console.log(copyArray);

    if (findIndex != -1) {
      copyArray[findIndex] = { ...copyArray[findIndex], count: (copyArray[findIndex].count += 1), price: copyArray[findIndex].count * price };
    }

    setSelected([...copyArray]);
  };

  // 상품 개수 감소
  const decrease = (e: any) => {
    const findIndex = selected.findIndex((element: any) => element.id == e.target.value);
    let copyArray = [...selected];

    if (findIndex != -1) {
      copyArray[findIndex] = { ...copyArray[findIndex], count: (copyArray[findIndex].count -= 1), price: copyArray[findIndex].count * price };
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
                    fillRule="evenodd"
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
    if (!selected[0]) {
      alert("옵션을 선택 해주세요");
    } else {
      alert("상품이 장바구니에 추가 되었습니다.");
      setSelected([]);
      try {
        const res = await axios.post("/smartstore/cart/cartAdd", result, { withCredentials: true });
        console.log(res.data);
        setNavCart(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const componentMap = {
    "macbook-air-m2": MacBookAirM2,
    // 다른 URL과 컴포넌트를 추가할 수 있습니다.
  };
  console.log(componentMap);

  const selectProduct = () => {
    const SelectedComponent = componentMap[URL];

    if (SelectedComponent) {
      return <SelectedComponent />;
    } else {
      // 해당하는 id가 없을 경우에 대한 처리 (예: 빈 컴포넌트 반환)
      return null;
    }
  };

  return (
    <>
      {!isIdNotFound ? (
        <>
          <ProductNav id="ac-localnav" className="js no-touch css-sticky ac-localnav-stacked">
            <ProductWrap className="ac-ln-wrapper">
              <ProductBG className="ac-ln-background"></ProductBG>
              <ProductContent className="ac-ln-content">
                <ProductTitle className="ac-ln-title">
                  <Home href="/kr/macbook-air-13-and-15-m2/">
                    {product && product.name}
                    <Subtitle className="ac-ln-title-subhead">부제목</Subtitle>{" "}
                  </Home>
                </ProductTitle>
                <ProductMenu className="ac-ln-menu">
                  <MenuWrap className="ac-ln-menu-tray">
                    <MenuItems className="ac-ln-menu-items">
                      <MenuItem className="ac-ln-menu-item">
                        <span className="ac-ln-menu-link current">개요</span>
                      </MenuItem>
                      <MenuItem className="ac-ln-menu-item">
                        <a href="/kr/macbook-air-13-and-15-m2/specs/" className="ac-ln-menu-link">
                          제품 사양
                        </a>
                      </MenuItem>
                      <MenuItem className="ac-ln-menu-item">
                        <a href="/kr/macbook-air-13-and-15-m2/compare/" className="ac-ln-menu-link">
                          비교하기
                        </a>
                      </MenuItem>
                      <MenuItem className="ac-ln-menu-item">
                        <a href="/kr/macbook-air-13-and-15-m2/mac-does-that/" className="ac-ln-menu-link">
                          Mac이 처음이라면
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </MenuWrap>
                  <Actions className="ac-ln-actions">
                    <ActionButton className="ac-ln-action ac-ln-action-button">
                      <ActionLink className="ac-ln-button" href="/kr/shop/goto/buy_mac/macbook_air">
                        구입하기
                      </ActionLink>
                    </ActionButton>
                  </Actions>
                </ProductMenu>
              </ProductContent>
            </ProductWrap>
          </ProductNav>
          <Product>{selectProduct()}</Product>
        </>
      ) : (
        <>
          <div style={{ margin: "150px auto" }}>
            <div style={{ fontSize: "48px", fontWeight: "700", textAlign: "center" }}>
              <p>등록된 상품이</p>
              <p>없는 듯 하네요.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Products;
