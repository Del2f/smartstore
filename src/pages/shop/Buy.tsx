import axios from "../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { productList } from "./Category";
import "./Buy.scss";
import ProductCarousel from "@components/shop/buy/ProductCarousel";
import OptionSelect from "@components/shop/buy/OptionSelect";

const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(25px);
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface StickyBar {
  showStickyBar: boolean;
}

const StickyBar = styled.div<StickyBar>`
  inset-inline-start: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;

  .stickybar-content {
    background-color: #fff;
    position: sticky;
    top: 0;
    transform: translateY(-100%);
    transition: transform 0.5s ease-in-out;

    .stickybar-fulfillment {
      .stickybar-fulfillment-inner-wrap {
        border-bottom: 1px solid #e8e8ed;
        position: relative;

        .stickybar-fulfillment-inner {
          margin: auto;
          max-width: 2632px;
          min-width: 980px;
          width: 87.5%;

          .stickybar-fulfillment-inner-height {
            display: flex;
            justify-content: flex-end;
            height: 30px;
            margin-top: 12px;
            margin-bottom: 12px;

            .stickybar-text {
              margin-left: 5px;
              font-size: 13px;
              font-weight: 400;
            }
          }

          .stickybar-fulfillment-delivery-icon {
            display: flex;
            align-items: center;
          }

          .stickybar-fulfillment-pickup-icon {
            display: flex;
            align-items: center;
          }

          .stickybar-fulfillment-pickup-icon::before {
            background: #d2d2d7;
            content: "";
            display: inline-block;
            height: 18px;
            margin-top: 0;
            margin-inline: 20px 20px;
            width: 1px;
          }

          .stickybar-fulfillment-pickup-icon svg {
            height: 1.4705882353rem;
            margin: 0;
            width: 1.4705882353rem;
          }
        }
      }
    }
  }

  .stickybar-header {
    border-bottom: 1px solid #e8e8ed;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 0;
  }

  .stickybar-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    max-width: 2632px;
    min-width: 980px;
    width: 87.5%;

    .stickybar-header-inner-text {
      color: ${(props) => props.theme.text2};
      font-size: 21px;
      font-weight: 700;
      letter-spacing: 0.011em;
      line-height: 1.381002381;
      padding: 0;
      text-decoration: none;
    }

    .stickybar-header-inner-price {
      font-size: 17px;
      font-weight: 600;
    }
  }

  ${(props) =>
    props.showStickyBar
      ? css`
          .stickybar-content {
            pointer-events: auto;
            transform: translateY(0);
          }
        `
      : css``}
`;

const Container = styled.div`
  width: 87.5%;
  margin: auto;
  min-width: 980px;
  max-width: 2632px;
`;

const PriceWrap = styled.div`
  display: inline-block;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  &.fade-out {
    animation: ${fadeOutDown} 0.6s forwards;
  }

  &.fade-in {
    animation: ${fadeInUp} 0.6s forwards;
  }
`;

const OptionBox = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

interface Cart {
  isOptionSelectFin: boolean;
}

const Cart = styled.div<Cart>`
  display: flex;
  justify-content: center;
  background-color: #f5f5f7;
  width: 100%;
  padding: 39px 6.25% 0;

  .cart-inner {
    display: flex;
    justify-content: center;
    max-width: 1240px;
    margin: 0 auto;
  }

  .cart-left {
    margin-inline-end: auto;
    padding-inline-end: 10px;

    h2 {
      font-size: 37px;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 1.2105263158;
    }

    .cart-title-main {
      color: ${(props) => props.theme.text2};
    }

    .cart-title-sub {
      color: #86868b;
    }

    .cart-image-wrap {
      display: flex;
      justify-content: center;
      padding-top: 42px;

      img {
        width: 70%;
        height: auto;
      }
    }
  }

  .cart-center {
    padding-right: 40px;
    max-width: 420px;
    min-width: 360px;

    .cart-center-top {
      padding-bottom: 44px;

      .cart-center-cardwrap {
        padding-top: 22px;

        .cart-center-card-title {
          color: #6e6e73;
          font-size: 14px;
          font-weight: 400;
        }

        .cart-center-card-content {
          display: block;
          color: #06c;
          font-size: 14px;
          font-weight: 400;
          padding-top: 14px;
          text-decoration: underline;
        }
      }
    }

    .cart-center-favorite {
      border-top: 1px solid #d2d2d7;
      padding-top: 22px;
      padding-bottom: 21px;

      .cart-center-favorite-disabled {
        ${props => props.isOptionSelectFin ? css`
        opacity: 1;
        ` : css`
          opacity: 0.32;
        `}
      }

      .cart-center-favorite-title {
        font-size: 14px;
        font-weight: 600;
      }

      .cart-center-favorite-content {
        font-size: 14px;
        font-weight: 400;
        padding-top: 10px;
        line-height: 1.5714285714;
      }

      .cart-center-favorite-btn {
        padding-top: 10px;
        fill: currentColor;
        color: #0066cc;

        span {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }

    .cart-center-footer {
      border-top: 1px solid #d2d2d7;
      font-size: 14px;
      font-weight: 400;
      padding: 24px 0 32px;
    }

    .cart-center-title:not(:last-child) {
      padding-bottom: 10px;
    }

    .cart-center-price {
      font-weight: 600;
    }
  }

  .cart-right {
    font-size: 14px;
    font-weight: 400;
    max-width: 328px;
    min-width: 260px;

    .cart-right-pickup {
      display: flex;
      line-height: 22px;

      .cart-right-pickup-icon {
        width: 30px;
      }

      .cart-right-pickup-textwrap {
        display: flex;
        flex-direction: column;
        
        button {
          color: #06c;
          border: none;
          padding: 0;
        }
        
        .cart-right-pickup-btn::after {
          padding-left: 5px;
          content: "";
          color: inherit;
          display: inline-block;
          font-family: SF Pro Icons;
          font-size: inherit;
          font-style: normal;
          font-weight: inherit;
          line-height: 1;
          position: relative;
          text-decoration: underline;
          z-index: 1;
          text-decoration: none;
        }
      }
    }

    .cart-right-arrival {
      display: flex;
      padding-top: 20px;
      line-height: 22px;


      .cart-right-arrival-icon {
        width: 30px;
      }

      .cart-right-arrival-textwrap {
        display: flex;
        flex-direction: column;

        button {
          color: #06c;
          border: none;
          padding: 0;
        }
        
        .cart-right-arrival-btn::after {
          padding-left: 5px;
          content: "";
          color: inherit;
          display: inline-block;
          font-family: SF Pro Icons;
          font-size: inherit;
          font-style: normal;
          font-weight: inherit;
          line-height: 1;
          position: relative;
          text-decoration: underline;
          z-index: 1;
          text-decoration: none;
        }
      }
    }

    .cart-right-btn-wrap {
      padding-top: 48px;

      .cart-right-btn {

        ${props => props.isOptionSelectFin ? css`
        opacity: 1;
        ` : css`
          opacity: 0.32;
        `}
        width: 100%;
        background-color: var(--btn-background-color);
        font-size: 13px;
        color: var(--white-color);
        border-radius: var(--btn-border-radius);
        border: 0;
        padding: 15px 22px;
      }
    }

  }
`;

function Buy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [cookies] = useCookies(['userjwt']);

  // 상품 정보
  const [product, setProduct] = useState<productList | null>();

  // 옵션 추가금 붙기전 price. (상단 sticky 애니메이션용)
  const [oldPrice, setOldPrice] = useState<number>(0);
  const [animate, setAnimate] = useState<string>("fade-in");

  // 상단 sticky bar 출력
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // 결제 관련
  // 결제 금액
  const [price, setPrice] = useState<number>(0);

  // 선택된 옵션
  const [selectOptions, setSelectOptions] = useState<any>([]);
  const [optionID, setOptionID] = useState<string>('');

  // 옵션 유효성 검사
  const [isOptionSelect, setIsOptionSelect] = useState<boolean[]>([]);

  // 옵션 투명도 boolean
  const [isOptionDisabled, setIsOptionDisabled] = useState<boolean[]>([]);

  // 옵션 유효성 검사 최종
  const [isOptionSelectFin, setIsOptionSelectFin] = useState<boolean>(false);

  // console.log(product); 
  // console.log(price); 
  // console.log(selectOptions);
   
  console.log(isOptionSelect); 
  console.log(isOptionSelectFin); 

  // 상품의 정보를 불러옵니다.
  // 해당 상품 페이지로 진입 했을때, 세션 스토리지에 저장된 옵션을 먼저 가져옵니다.
  
  useEffect(() => {
    const pathname = getPathname();
    const savedOptions = sessionStorage.getItem(pathname);
    const savedOptionsParsed = savedOptions ? JSON.parse(savedOptions) : [];

    const ProductData = async () => {
      try {
        const res = await axios.post(`/smartstore/shop/buy/${id}`, { withCredentials: true });
        if (res) {
          setProduct(res.data);
          if (product && parseInt(product.price) > 0) {
            setPrice(parseInt(product.price));
          }

          // savedOptionsParsed.length만큼 true로 전환
          let initialOptionSelect = Array(res.data.optionList.length).fill(false);
          let initialIsOptionDisabled = Array(res.data.optionList.length).fill(false);
          initialIsOptionDisabled[0] = true;

          // 세션 스토리지에 선택된 옵션이 있을 경우
          if (savedOptions) {
            console.log(JSON.parse(savedOptions));

            setSelectOptions(JSON.parse(savedOptions));

            if (product?.optionList.length === JSON.parse(savedOptions).length) {
              console.log('모든 옵션이 선택 되어 있다.');
              for (let i = 0; i < initialOptionSelect.length; i++) {
                initialOptionSelect[i] = true;
                initialIsOptionDisabled[i + 1] = true;
              }
            } else {
              // 세션 스토리지에 선택된 만큼 true를 입력
              for (let i = 0; i < savedOptionsParsed.length; i++) {
                initialOptionSelect[i] = true;
                initialIsOptionDisabled[i + 1] = true;
              }
              console.log('모든 옵션이 선택 되지 않았다.')
            }
          }

          setIsOptionSelect(initialOptionSelect);
          setIsOptionDisabled(initialIsOptionDisabled);
        }
      } catch (err) {
        console.log(err);
      }
    };
    ProductData();
  }, []);

  useEffect(() => {
    if (product) {
      const findProductOption = (product, selectOptions) => {
        // selectOptions 배열의 value만 추출하여 배열로 만듭니다.
        const selectedValues = selectOptions.map(option => option.value);
        // products 배열을 순회하면서 조건에 맞는 product를 찾습니다.
        return product.option.find(option => {
          // product의 values 배열이 selectOptions의 모든 value를 포함하고 있는지 확인합니다.
          return selectedValues.every(value => option.values.includes(value));
        });
      };
    
      const findedProductOption = findProductOption(product, selectOptions);
      console.log(findedProductOption);

      const addPrice = findedProductOption.optionPrice;
      console.log(parseInt(product.price) + parseInt(addPrice));

      setOptionID(findedProductOption._id);
      setPrice(parseInt(product.price) + parseInt(addPrice));

    }
  },[isOptionSelectFin, selectOptions])

  const getPathname = () => {
    return window.location.pathname;
  };
  // selectOptions(선택된 옵션)값이 변경될 때마다 세션 스토리지에 저장합니다.
  useEffect(() => {
    const pathname = getPathname();
    sessionStorage.setItem(pathname, JSON.stringify(selectOptions));
  }, [selectOptions]); // selectOptions가 변경될 때마다 호출

  // 가격이 변동될때마다 상단 sticky bar의 가격 부분에 애니메이션을 작동 시킵니다.
  useEffect(() => {
    if (price) {
      setAnimate("fade-out");
      const timeout = setTimeout(() => {
        setOldPrice(price);
        setAnimate("fade-in");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [price]);

  // 스크롤 높이에 따른 sticky bar 출력 유무를 결정합니다.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 옵션 유효성 검사 배열이 모두 true일때 최종적으로 true를 반환 합니다.
  useEffect(() => {
    const allTrue = isOptionSelect.every(boolean => boolean === true);

    // 선택된 옵션이 없을시 중지
    if (isOptionSelect.length === 0) {
      console.log('옵션이 없다');
      return;
    }

    setIsOptionSelectFin(allTrue);
  },[selectOptions])

  const cartBtn = async () => {

    if (!isOptionSelectFin) {
      console.log('옵션이 전부 선택되지 않았습니다.');
      return;
    }

    const usercart = { productID: product?._id, optionID: optionID, count: 1 };

    // 구매전 로그인 여부 확인
    const verifyUser = async () => {

      if (!cookies.userjwt) {
        navigate(`/shop/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      try {
        const res = await axios.post("/smartstore/user/login", {}, { withCredentials: true });
        console.log(res);
  
        if (!res.data.status) {
          console.log('로그인이 되어 있지 않습니다.');
          navigate(`/shop/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        } 
      } catch (errors) {
        console.log(errors);
      }
    };

    verifyUser();

    try {
      const res = await axios.post(`/smartstore/cart/cartadd`, { usercart }, { withCredentials: true });
      console.log(res.data);

      if (res.status === 200) {
        navigate('/shop/cart');
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StickyBar showStickyBar={showStickyBar}>
        <div className="stickybar-content">
          <div>
            <div className="stickybar-header">
              <div className="stickybar-header-inner">
                <div className="stickybar-header-inner-text">{product?.name}</div>
                <PriceWrap className={`stickybar-header-inner-price ${animate}`}>￦{oldPrice.toLocaleString()}부터</PriceWrap>
              </div>
            </div>
            <div className="stickybar-fulfillment">
              <div className="stickybar-fulfillment-inner-wrap">
                <div className="stickybar-fulfillment-inner">
                  <div className="stickybar-fulfillment-inner-height">
                    <div className="stickybar-fulfillment-delivery-icon">
                      <svg width="25" height="25" viewBox="0 0 25 25">
                        <g>
                          <rect width="25" height="25" fill="none"></rect>
                          <path
                            d="M23.4824,12.8467,20.5615,9.6382A1.947,1.947,0,0,0,18.9863,9H17V6.495a2.5,2.5,0,0,0-2.5-2.5H3.5A2.5,2.5,0,0,0,1,6.495v9.75a2.5,2.5,0,0,0,2.5,2.5h.5479A2.7457,2.7457,0,0,0,6.75,21.02,2.6183,2.6183,0,0,0,9.4222,19H16.103a2.7445,2.7445,0,0,0,5.3467-.23h.7349A1.6564,1.6564,0,0,0,24,16.9805V14.1724A1.9371,1.9371,0,0,0,23.4824,12.8467ZM8.4263,18.745a1.7394,1.7394,0,0,1-3.3526,0,1.5773,1.5773,0,0,1,.0157-1,1.7382,1.7382,0,0,1,3.3213,0,1.5782,1.5782,0,0,1,.0156,1ZM9.447,18a2.7258,2.7258,0,0,0-5.394-.255H3.5a1.5016,1.5016,0,0,1-1.5-1.5V6.495a1.5017,1.5017,0,0,1,1.5-1.5h11a1.5016,1.5016,0,0,1,1.5,1.5V18Zm10.9715.77a1.7385,1.7385,0,0,1-3.3369,0,1.5727,1.5727,0,0,1,0-1,1.742,1.742,0,1,1,3.3369,1ZM23,16.9805c0,.5684-.2285.79-.8154.79H21.45A2.73,2.73,0,0,0,17,16.165V10h1.9863a.9758.9758,0,0,1,.8379.3135l2.9268,3.2148a.95.95,0,0,1,.249.6441ZM21.6762,13.62A.5117.5117,0,0,1,21.85,14H18.5435A.499.499,0,0,1,18,13.4718V11h1.0725a.7592.7592,0,0,1,.594.2676Z"
                            fill="#1d1d1f"
                          ></path>
                        </g>
                      </svg>
                      <span className="stickybar-text">무료배송</span>
                    </div>
                    <div className="stickybar-fulfillment-pickup-icon">
                      <svg enable-background="new 0 0 25 25" viewBox="0 0 25 25">
                        <path d="m0 0h25v25h-25z" fill="none"></path>
                        <path
                          d="m18.5 5.0005h-1.7755c-.1332-2.2255-1.967-4.0005-4.2245-4.0005s-4.0913 1.775-4.2245 4.0005h-1.7755c-1.3789 0-2.5 1.1216-2.5 2.5v11c0 1.3784 1.1211 2.4995 2.5 2.4995h12c1.3789 0 2.5-1.1211 2.5-2.4995v-11c0-1.3784-1.1211-2.5-2.5-2.5zm-6-3.0005c1.7058 0 3.0935 1.3264 3.2245 3.0005h-6.449c.131-1.6741 1.5187-3.0005 3.2245-3.0005zm7.5 16.5005c0 .8271-.6729 1.5-1.5 1.5h-12c-.8271 0-1.5-.6729-1.5-1.5v-11c0-.8271.6729-1.5005 1.5-1.5005h12c.8271 0 1.5.6734 1.5 1.5005zm-4.8633-7.5066c-.0377.0378-.7383.4304-.7383 1.3289 0 1.0344.8965 1.3968.9266 1.4044 0 .0227-.1356.5059-.4746.9891-.2938.4228-.6177.8532-1.0848.8532-.4746 0-.5876-.2794-1.1375-.2794-.5273 0-.7157.2869-1.1451.2869-.4369 0-.7383-.3926-1.0848-.8834-.3917-.5663-.7232-1.4572-.7232-2.3028 0-1.3515.8814-2.0688 1.7402-2.0688.4671 0 .8437.302 1.13.302.2787 0 .7006-.3171 1.2204-.3171.2034-.0001.9115.015 1.3711.687zm-2.5538-.7626c-.0377 0-.0678-.0076-.0979-.0076 0-.0227-.0075-.0755-.0075-.1284 0-.3624.1883-.7097.3842-.9438.2486-.2945.6629-.521 1.017-.5285.0075.0378.0075.0831.0075.1359 0 .3624-.1507.7097-.3616.974-.2336.287-.6253.4984-.9417.4984z"
                          fill="#1d1d1f"
                        ></path>
                      </svg>
                      <span className="stickybar-text">매장에서 픽업</span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StickyBar>
      <Container className="Container">
        <div className="pb-header-wrapper">
          <div className="pb-header-left">
            <div>
              {/* <span className="violator-frameless">New</span> */}
              <h1 className="fwl">{product?.name} 구입하기</h1>
            </div>
            <div>
              <span>₩{price.toLocaleString()} 부터</span>
            </div>
          </div>
          <div className="pb-header-right">
            <div className="pb-header-learnmorelink-items">
              <div className="pb-header-learnmorelink">
                보상 판매로 ₩50,000–₩1,060,000 더 저렴하게
                <span className="visuallyhidden">Footnote </span>**
              </div>
              <div className="pb-header-learnmorelink">
                <div>신용 카드 할부</div>
              </div>
            </div>
          </div>
        </div>
        <OptionBox className="OptionBox">
          <ProductCarousel mainimage={product?.mainImage} subimage={product?.subImage}></ProductCarousel>
          <OptionSelect
            product={product}
            price={price}
            setPrice={setPrice}
            isOptionSelect={isOptionSelect}
            setIsOptionSelect={setIsOptionSelect}
            selectOptions={selectOptions}
            setSelectOptions={setSelectOptions}
            isOptionDisabled={isOptionDisabled}
            setIsOptionDisabled={setIsOptionDisabled}
          ></OptionSelect>
        </OptionBox>
      </Container>
      <Cart className="Cart" isOptionSelectFin={isOptionSelectFin}>
        <div className="cart-inner">
          <div className="cart-left">
            <h2 className="cart-title-main">
              당신의 새<br />
              {product?.name}입니다.
            </h2>
            <h2 className="cart-title-sub">당신이 원하는 대로</h2>
            <div className="cart-image-wrap">
              <img src={product?.mainImage[0]} alt="" />
            </div>
          </div>
          <div className="cart-center">
            <div className="cart-center-top">
              <div className="cart-center-title">{product?.name}</div>
              {selectOptions.map((option) => (
                <div className="cart-center-title">{option.value}</div>
              ))}
              <div className="cart-center-price">￦{price.toLocaleString()}</div>
              <div className="cart-center-cardwrap">
                <div className="cart-center-card-title">약 ￦{(price / 12).toLocaleString()}의 VAT 포함</div>
                <a className="cart-center-card-content">최대 12 개월 신용 카드 할부</a>
              </div>
            </div>
            <div className="cart-center-favorite">
              <div className="cart-center-favorite-disabled">
                <h3 className="cart-center-favorite-title">시간이 좀 더 필요하신가요?</h3>
                <div className="cart-center-favorite-content">선택한 기기를 관심 목록에 모두 저장해두고 언제든 살펴보던 곳부터 다시 이어보세요.</div>
                <div className="cart-center-favorite-btn">
                  <svg width="21" height="21" className="as-svgicon as-svgicon-bookmark as-svgicon-tiny as-svgicon-bookmarktiny" role="img" aria-hidden="true"><path fill="none" d="M0 0h21v21H0z"></path><path d="M12.8 4.25a1.202 1.202 0 0 1 1.2 1.2v10.818l-2.738-2.71a1.085 1.085 0 0 0-1.524 0L7 16.269V5.45a1.202 1.202 0 0 1 1.2-1.2h4.6m0-1H8.2A2.2 2.2 0 0 0 6 5.45v11.588a.768.768 0 0 0 .166.522.573.573 0 0 0 .455.19.644.644 0 0 0 .38-.128 5.008 5.008 0 0 0 .524-.467l2.916-2.885a.084.084 0 0 1 .118 0l2.916 2.886a6.364 6.364 0 0 0 .52.463.628.628 0 0 0 .384.131.573.573 0 0 0 .456-.19.768.768 0 0 0 .165-.522V5.45a2.2 2.2 0 0 0-2.2-2.2Z"></path></svg>
                  <span>나중을 위해 저장</span>
                </div>
              </div>
            </div>
            <div className="cart-center-footer">
              <span>거주 지역의 배송에 관한 자세한 정보는 '결제'단계에서 볼 수 있습니다.</span>
            </div>
          </div>
          <div className="cart-right">
            <div>
              <div className="cart-right-pickup">
                <div className="cart-right-pickup-icon">
                  <svg viewBox="0 0 25 25" className="as-svgicon as-svgicon-applestorepickup as-svgicon-reduced as-svgicon-applestorepickupreduced" role="img" aria-hidden="true" width="25px" height="25px"><path fill="none" d="M0 0h25v25H0z"></path><path d="M18.5 5h-1.775a4.231 4.231 0 0 0-8.45 0H6.5A2.5 2.5 0 0 0 4 7.5v11A2.5 2.5 0 0 0 6.5 21h12a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 18.5 5Zm-6-3a3.245 3.245 0 0 1 3.225 3h-6.45A3.245 3.245 0 0 1 12.5 2ZM20 18.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 5 18.5v-11A1.5 1.5 0 0 1 6.5 6h12A1.5 1.5 0 0 1 20 7.5Z"></path><path d="M14.4 12.448a1.592 1.592 0 0 1 .738-1.328 1.607 1.607 0 0 0-1.37-.687c-.52 0-.941.317-1.22.317s-.663-.3-1.129-.3a1.861 1.861 0 0 0-1.739 2.068 4.32 4.32 0 0 0 .723 2.3c.346.491.648.883 1.084.883s.617-.287 1.144-.287c.55 0 .663.279 1.137.279s.791-.43 1.084-.853a3.24 3.24 0 0 0 .474-.989 1.516 1.516 0 0 1-.926-1.403ZM12.583 10.357a1.346 1.346 0 0 0 .941-.5 1.594 1.594 0 0 0 .361-.974.731.731 0 0 0-.008-.136 1.5 1.5 0 0 0-1.016.528 1.547 1.547 0 0 0-.384.943c0 .053.008.106.008.128.03.004.06.011.098.011Z"></path></svg>
                </div>
                <div className="cart-right-pickup-textwrap">
                  <span>픽업:</span>
                  <button className="cart-right-pickup-btn">
                    <span>재고 확인</span>
                  </button>
                </div>
              </div>
              <div className="cart-right-arrival">
                <div className="cart-right-arrival-icon">
                  <svg className="as-svgicon-rtl-mirrored as-svgicon as-svgicon-boxtruck as-svgicon-reduced as-svgicon-boxtruckreduced" viewBox="0 0 25 25" role="img" aria-hidden="true" width="25px" height="25px"><path fill="none" d="M0 0h25v25H0z"></path><path fill="#1d1d1f" d="m23.482 12.847-2.92-3.209A1.947 1.947 0 0 0 18.985 9H17V6.495a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v9.75a2.5 2.5 0 0 0 2.5 2.5h.548A2.746 2.746 0 0 0 6.75 21.02 2.618 2.618 0 0 0 9.422 19h6.681a2.744 2.744 0 0 0 5.347-.23h.735A1.656 1.656 0 0 0 24 16.98v-2.808a1.937 1.937 0 0 0-.518-1.325ZM8.426 18.745a1.74 1.74 0 0 1-3.352 0 1.577 1.577 0 0 1 .015-1 1.738 1.738 0 0 1 3.322 0 1.578 1.578 0 0 1 .015 1ZM9.447 18a2.726 2.726 0 0 0-5.394-.255H3.5a1.502 1.502 0 0 1-1.5-1.5v-9.75a1.502 1.502 0 0 1 1.5-1.5h11a1.502 1.502 0 0 1 1.5 1.5V18Zm10.972.77a1.738 1.738 0 0 1-3.337 0 1.573 1.573 0 0 1 0-1 1.742 1.742 0 1 1 3.337 1ZM23 16.98c0 .569-.229.79-.815.79h-.735A2.73 2.73 0 0 0 17 16.165V10h1.986a.976.976 0 0 1 .838.314l2.927 3.214a.95.95 0 0 1 .249.644Zm-1.324-3.36a.512.512 0 0 1 .174.38h-3.306a.499.499 0 0 1-.544-.528V11h1.073a.76.76 0 0 1 .594.268Z"></path></svg>
                </div>
                <div className="cart-right-arrival-textwrap">
                  <span>도착:</span>
                  <span>2024/05/20</span>
                  <button className="cart-right-arrival-btn">
                    <span>추가 배송 옵션 확인</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-right-btn-wrap">
              <button className="cart-right-btn" onClick={cartBtn}>
                <span>장바구니에 담기</span>
              </button>
            </div>
          </div>
        </div>
      </Cart>
    </>
  );
}

export default Buy;
