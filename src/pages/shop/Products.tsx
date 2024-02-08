import axios from "../../api/axios";
import styled, {css} from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GmIdType } from "./Shop";
import { ColumnType, TaskType, SubTaskType } from "../adminPage/Category";
import { cartListType } from "../shop/Cart";
import { productList } from "./Category";
import "./Products.scss";
import MacBookAirM2 from "../adminPage/Product/Mac/macbook-air-m2";

interface Type {
  number?: number;
  total?: number;
  isSideMenu?: boolean;
}

// 상품 전체 Wrap
const ProductNav = styled.div<Type>`
  position: relative;
  height: 66px;
  width: 100%;

  @media only screen and (min-width: 1024px) {
    min-width: 1024px;
  }
  
  @media only screen and (max-width: 833px) {
    z-index: 2;

    ${(props) =>
      props.isSideMenu &&
      css`
      `}
  }
`;

// 상품 전체 Wrap
const Product = styled.div`
  /* display: flex;
  justify-content: center; */
`;

// 상품 상단 Nav
const ProductWrap = styled.div<Type>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  /* min-height: 100%; */
  /* backdrop-filter: saturate(180%) blur(20px); */
  
  @media only screen and (max-width: 833px) {
    /* z-index: 2; */
    border-bottom: 1px solid rgba(0, 0, 0, 0.181818);

    ${(props) =>
      props.isSideMenu
        ? css`
            transition: background 0.5s cubic-bezier(0.28, 0.11, 0.32, 1), height 300ms cubic-bezier(0.4, 0, 0.6, 1) 0.1s;
            background-color: #fbfbfd;
            height: 260px;
          `
        : css`
            transition: background 0.5s cubic-bezier(0.28, 0.11, 0.32, 1), height 400ms cubic-bezier(0.4, 0, 0.6, 1) 0.6s;
            background-color: #fbfbfd;
            height: 63px;
          `}
  }
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
  /* z-index: 1; */
  transition: background 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  /* background: var(--localnav-background); */
`;

const ProductContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 980px;
  padding: 0 22px;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.181818);
  
  @media only screen and (max-width: 833px) {
    display: flex;
    /* z-index: 2; */
    flex-direction: column;
    border-bottom: 0;
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
  margin: 14px 0 -14px;
  padding: 0;
`;

const Home = styled.a`
  display: flex;
  flex-direction: column-reverse;
  margin: 0;
  text-decoration: none;
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

const ProductMenu = styled.div<Type>`
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  float: right;
  margin-top: -3px;
  letter-spacing: 0em;
`;

const MenuWrap = styled.div<Type>`
  padding-top: 34px;
  float: left;

  @media only screen and (max-width: 833px) {
    width: 100%;
  }
`;

const MenuItems = styled.ul`
  @media only screen and (max-width: 833px) {
    display: flex;
    flex-direction: column;
  }
`;

const MenuItem = styled.li<Type>`
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

  @media only screen and (max-width: 833px) {
    display: flex;
    align-items: center;
    height: 44px;
    &:not(:first-child){
      border-top: 1px solid rgba(0, 0, 0, 0.181818);
    }

    ${(props) =>
      props.isSideMenu
        ? css`
            opacity: 1;
            pointer-events: auto;

            transform: translateY(0px);
            transition-duration: 0.7s;
            transition-delay: calc((${props.total} - ${props.number}) * 0.1s);
          `
        : css`
            opacity: 0;
            pointer-events: none;

            transform: translateY(-30px);
            transition-duration: 0.7s;
            transition-delay: calc((${props.number}) * 0.1s);
          `}
  }
`;

// 구입하기 버튼
const BuyBtnWrap = styled.div`
  padding-top: 32px;
  float: left;

  @media only screen and (max-width: 833px) {
    position: absolute;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    top: 0;
    right: 0;
  }
`;

const BuyBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  float: left;
  @media only screen and (max-width: 833px) {
    margin-left: 18px;
  }
`;

const BuyBtnLink = styled(Link)`
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
`;

const IconWrap = styled.div<Type>`
  display: none;
  margin-right: -11px;
  cursor: pointer;
  overflow: hidden;
  width: 40px;
  /* height: 30px; */

  @media only screen and (max-width: 833px) {
    display: block;
  }
`;

const Icon = styled.span<Type>`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1), transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
  transform: translateY(0);
  opacity: 0.8;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 15px;
    width: 11px;
    height: 1px;
    transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1), transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
    background: #000;
  }

  &::before {
    right: 50%;
    border-radius: 0.5px 0 0 0.5px;
  }
  &::after {
    left: 50%;
    border-radius: 0 0.5px 0.5px 0;
  }

  ${(props) =>
    props.isSideMenu
      ? css`
          &::before {
            transform-origin: 100% 0%;
            transform: rotate(-40deg) scaleY(1.1);
          }
          &::after {
            transform-origin: 0% 0%;
            transform: rotate(40deg) scaleY(1.1);
          }
          transform: translateY(-8px);
        `
      : css`
          &::before {
            transform-origin: 100% 100%;
            transform: rotate(40deg) scaleY(1.1);
          }
          &::after {
            transform-origin: 0% 100%;
            transform: rotate(-40deg) scaleY(1.1);
          }
        `}
`;

const Blur = styled.div<Type>`
  background: rgba(232, 232, 237, 0.4);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  ${(props) =>
    props.isSideMenu
      ? css`
          opacity: 1;
          visibility: visible;
          transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-start 80ms;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s step-end 80ms;
        `};

  @media only screen and (max-width: 833px) {
    & {
      /* visibility: hidden; */
    }
  }
`;

interface Props {
  gmId: GmIdType;
  categoryList: ColumnType[];
  setNavCart: React.Dispatch<React.SetStateAction<cartListType[] | undefined>>;
  isMobile: boolean;
}

// smartstore/shop/products/상품명
// 샵에서 상품 구매할때 나오는 페이지
function Products({ gmId, categoryList, setNavCart, isMobile }: Props) {
  const { id } = useParams();

  const [product, setProduct] = useState<productList | null>();
  const [URL, setURL] = useState<string>("");

  // 구입하기 버튼 옆에있는거
  const [isSideMenu, setIsSideMenu] = useState<boolean>(false);
  const [isIdNotFound, setIsIdNotFound] = useState<boolean>(false);

  const [showdropmenu, setShowdrop] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);

  // 구매창 상단 고정
  const stickyNavRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const stickyDiv = stickyNavRef.current;

  //     if (stickyDiv) {
  //       const scrollPosition = window.scrollY;

  //       if (scrollPosition > stickyDiv.offsetTop) {
  //         stickyDiv.style.position = "fixed";
  //         stickyDiv.style.top = "0";
  //       } else {
  //         stickyDiv.style.position = "static";
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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

  const componentMap = {
    "macbook-air-m2": MacBookAirM2,
    // 다른 URL과 컴포넌트를 추가할 수 있습니다.
  };

  const sidemenu = [
    {
      title: "개요",
      href: "",
    },
    {
      title: "제품 사양",
      href: "",
    },
    {
      title: "비교하기",
      href: "",
    },
  ];

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
          <ProductNav className="ProductNav" ref={stickyNavRef} isSideMenu={isSideMenu}>
            <Blur isSideMenu={isSideMenu}></Blur>
            <ProductWrap className="ProductWrap" isSideMenu={isSideMenu}>
              {/* <ProductBG className="ac-ln-background"></ProductBG> */}
              <ProductContent className="ProductContent">
                <ProductTitle className="ProductTitle">
                  <Home href="">
                    {product && product.name}
                    <Subtitle className="Subtitle">부제목</Subtitle>{" "}
                  </Home>
                </ProductTitle>
                <ProductMenu className="ProductMenu">
                  <MenuWrap className="MenuWrap">
                    <MenuItems className="MenuItems">
                      {sidemenu.map((list, index) => (
                        <MenuItem className="MenuItem" number={index + 1} total={sidemenu.length + 1} isSideMenu={isSideMenu}>
                          <span>{list.title}</span>
                        </MenuItem>
                      ))}
                      {/* <MenuItem className="MenuItem" number={1} isSideMenu={isSideMenu}>
                        <span>개요</span>
                      </MenuItem>
                      <MenuItem className="MenuItem" number={2} isSideMenu={isSideMenu}>
                        <a href="">제품 사양</a>
                      </MenuItem>
                      <MenuItem className="MenuItem" number={3} isSideMenu={isSideMenu}>
                        <a href="">비교하기</a>
                      </MenuItem> */}
                      {/* <MenuItem className="MenuItem">
                          <a href="">
                            Mac이 처음이라면
                          </a>
                        </MenuItem> */}
                    </MenuItems>
                  </MenuWrap>
                  <BuyBtnWrap className="buy-btn-wrap">
                    <IconWrap className="buy-btn-icon-wrap" isSideMenu={isSideMenu} onClick={() => setIsSideMenu(!isSideMenu)}>
                      <Icon className="buy-btn-icon" isSideMenu={isSideMenu}></Icon>
                    </IconWrap>
                    <BuyBtn className="buy-btn">
                      <BuyBtnLink className="buy-btn-link" to={`../buy/${URL}`}>
                        구입하기
                      </BuyBtnLink>
                    </BuyBtn>
                  </BuyBtnWrap>
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
