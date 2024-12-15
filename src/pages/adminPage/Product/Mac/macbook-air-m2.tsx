import { useEffect, useState, useRef, useMemo } from "react";
import styled, { css } from "styled-components";

// import "../apple.scss"
import main from "@img/shop/products/Mac/macbook-air-m2/hero_static__6sbma6bp2tu6_large.jpg";
import design from "@img/shop/products/Mac/macbook-air-m2/design_hero_static__b5n04x7u9s9y_large.jpg";
import design2 from "@img/shop/products/Mac/macbook-air-m2/design_sizes_static__cq0zuvy0ja2q_large.jpg";
import midnightTopImage from "@img/shop/products/Mac/macbook-air-m2/design_top_midnight__eq0n2tytqmqa_large.jpg";
import midnightSideImage from "@img/shop/products/Mac/macbook-air-m2/design_side_midnight__cuf5m1wc778m_large.jpg";
import midnightMagSafeImage from "@img/shop/products/Mac/macbook-air-m2/design_magsafe_midnight__e658zyvscro2_large.jpg";
import starlightTopImage from "@img/shop/products/Mac/macbook-air-m2/design_top_starlight__f300qps15oya_large.jpg";
import starlightSideImage from "@img/shop/products/Mac/macbook-air-m2/design_side_starlight__ggbd2jf8c6q2_large.jpg";
import starlightMagSafeImage from "@img/shop/products/Mac/macbook-air-m2/design_magsafe_starlight__g58bw8skh0y2_large.jpg";
import spacegrayTopImage from "@img/shop/products/Mac/macbook-air-m2/design_top_spacegray__crs4ctnuvoom_large.jpg";
import spacegraySideImage from "@img/shop/products/Mac/macbook-air-m2/design_side_spacegray__fj1pupbtp866_large.jpg";
import spacegrayMagSafeImage from "@img/shop/products/Mac/macbook-air-m2/design_magsafe_spacegray__3ai5rdkdvciu_large.jpg";
import silverTopImage from "@img/shop/products/Mac/macbook-air-m2/design_top_silver__bvzz0fm8x56u_large.jpg";
import silverSideImage from "@img/shop/products/Mac/macbook-air-m2/design_side_silver__dul7xao6t5m6_large.jpg";
import silverMagSafeImage from "@img/shop/products/Mac/macbook-air-m2/design_magsafe_silver__fctds1k87eie_large.jpg";

import performance from "@img/shop/products/Mac/macbook-air-m2/performance_hero_static__eq2kslmyiu0y_large.jpg";
import performance2 from "@img/shop/products/Mac/macbook-air-m2/performance_mx__uefa6ex4jkia_large.jpg";

import emoji from "@img/shop/products/Mac/macbook-air-m2/performance_emoji__gfouh1q6yiaa_large.png";

import apps from "@img/shop/products/Mac/macbook-air-m2/apps__f2vfu7ch2oqe_large.jpg";
import plusIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_macos__bgamqjnnwgr6_large.png";

import switch1 from "@img/shop/products/Mac/macbook-air-m2/new_mac_iphone__gjnuxvn4oz2a_large.jpg";
import switch2 from "@img/shop/products/Mac/macbook-air-m2/new_icloud__byry26m5o3py_large.jpg";
import switch3 from "@img/shop/products/Mac/macbook-air-m2/new_migration__ghkh7thxrcqe_large.jpg";
import switch4 from "@img/shop/products/Mac/macbook-air-m2/new_powerful_apps__tqozueeskxeu_large.jpg";
import switch5 from "@img/shop/products/Mac/macbook-air-m2/boc_icon_macos__bgamqjnnwgr6_large.png";

import display from "@img/shop/products/Mac/macbook-air-m2/display_hero_static__e7sc3pt9l3mi_large.jpg";
import light from "@img/shop/products/Mac/macbook-air-m2/boc_icon_brightness__exsml35pk0cy_large.png";
import color from "@img/shop/products/Mac/macbook-air-m2/boc_icon_color__m582ys4s11me_large.png";
import truetone from "@img/shop/products/Mac/macbook-air-m2/boc_icon_true_tone__f7lbxcrvkf2i_large.png";

import hdcameraMask from "@img/shop/products/Mac/macbook-air-m2/display_camera_screen_mask__bdvs9ewi2rrm_large.png";
import hdcameraBG from "@img/shop/products/Mac/macbook-air-m2/display_camera_hw__farrcd1gl4uq_large.jpg";
import hdcamera from "@img/shop/products/Mac/macbook-air-m2/facetime_endframe__dv9f5imj70ia_large.jpg";
import soundsystem from "@img/shop/products/Mac/macbook-air-m2/display_sound__gnu0zge9aoa6_large.jpg";
import hdcameraIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_mic__fjwclagfcuai_large.png";
import soundsystemIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_sound__cn24eng1mzde_large.png";

import keyboard from "@img/shop/products/Mac/macbook-air-m2/magic_keyboard__cxbwo8i3w0wi_large.jpg";
import touchid from "@img/shop/products/Mac/macbook-air-m2/icon_touch_id__d40q5xp77w8y_large.png";
import lockIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_apple_pay__cfc2u6bjhmhe_large.png";
import loginIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_passkeys__fkjsys4l0ju6_large.png";
import applepayIcon from "@img/shop/products/Mac/macbook-air-m2/boc_icon_unlock__es8fv8mbmw02_large.png";

import connectRight from "@img/shop/products/Mac/macbook-air-m2/connectivity_right__flama8j3s9im_large.jpg";
import connectLeft from "@img/shop/products/Mac/macbook-air-m2/connectivity_left__7aosmyw6us26_large.jpg";

import ARIcon from "@img/shop/products/Mac/macbook-air-m2/ar_icon__uav20idjqf2i_large.png";
import midnightAR from "@img/shop/products/Mac/macbook-air-m2/ar_phone_midnight__bxtwm1u1c1hy_large.jpg";
import starlightAR from "@img/shop/products/Mac/macbook-air-m2/ar_phone_starlight__98s79yg4jwy6_large.jpg";
import spacegrayAR from "@img/shop/products/Mac/macbook-air-m2/ar_phone_spacegray__e8rk954shaai_large.jpg";
import silverAR from "@img/shop/products/Mac/macbook-air-m2/ar_phone_silver__fofexghtr3yq_large.jpg";

import accessories from "@img/shop/products/Mac/macbook-air-m2/accessories__d2pv8faxwqie_large.jpg";
import envirIcon from "@img/shop/products/Mac/macbook-air-m2/icon_environment__gm9miv83e4yi_large.png";
import envirHighlight from "@img/shop/products/Mac/macbook-air-m2/environment_highlight__4db4suxm3aam_large.png";

import macAirM1 from "@img/shop/products/Mac/macbook-air-m2/compare_mba_m1__cmow07fo5d36_large.png";
import macAir1315 from "@img/shop/products/Mac/macbook-air-m2/compare_mba_13_15__tnw1r9b3f5e2_large.png";
import macPro13 from "@img/shop/products/Mac/macbook-air-m2/compare_mbp_13__jugmxc0u0haq_large.png";
import macPro1416 from "@img/shop/products/Mac/macbook-air-m2/compare_mbp_14_16__reijn4mpe76q_large.png";
import colorIcon3 from "@img/shop/products/Mac/macbook-air-m2/compare_3_swatches__dkr5shhklmie_large.png";
import colorIcon4 from "@img/shop/products/Mac/macbook-air-m2/compare_4_swatches__epoqs3k07nau_large.png";
import colorIcon2 from "@img/shop/products/Mac/macbook-air-m2/compare_2_swatches__cuwujmost3cm_large.png";

import tradeIn from "@img/shop/products/Mac/macbook-air-m2/trade_in__f88qe6u6wpea_large.jpg";

import business from "@img/shop/products/Mac/macbook-air-m2/business__fd8ur2xe4le2_large.jpg";
import education from "@img/shop/products/Mac/macbook-air-m2/education__ecqe3uqoekya_large.jpg";

import "./macbook-air-m2.scss";

import Modal from "./macbook-air-m2-modal";

interface Circle {
  number: number;
  colorSelect: number;
}

const Circle = styled.label<Circle>`
  border-color: ${(props) => (props.colorSelect === props.number ? "#0071e3" : "")} !important;
  cursor: default;
`;

interface ColorNavText {
  number: number;
  colorSelect: number;
}

const ColorNavText = styled.label<ColorNavText>`
  display: ${(props) => (props.colorSelect === props.number ? "block" : "none")};
`;

interface Tile {
  appsBtn: boolean;
}

interface Display {
  displayBtn: boolean;
}

const TileContent = styled.div<Tile>``;

const TileOverlayContent = styled.div<Tile>``;
const DisplayOverlayContent = styled.div<Display>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fbfbfd;
  opacity: ${(props) => (props.displayBtn ? "1" : "0")};
  transition: opacity 0.35s cubic-bezier(0.35, 0, 0.01, 1);
`;

interface ButtonProps {
  active?: boolean;
}
const styles = css``;

const TileButton = styled.span<ButtonProps>`
  ${styles};
  ${(props) =>
    props.active &&
    css`
      transform: rotate(45deg);
    `};
`;

interface TopBehindProps {
  active?: boolean;
}

const behindStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  background-color: #fbfbfb;
  transition: opacity 0.35s cubic-bezier(0.35, 0, 0.01, 1);
  opacity: 0;
`;

const Behind = styled.div<TopBehindProps>`
  ${behindStyles};
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `};
`;

const ImgWrap = styled.div<TopBehindProps>`
  opacity: 1;
  transition: opacity 0.35s cubic-bezier(0.35, 0, 0.01, 1);

  ${(props) =>
    props.active &&
    css`
      opacity: 0;
    `};
`;

const HDcameraBG = styled.img`
  width: 100%;
`;
const HDcamera = styled.img`
  position: absolute;
  bottom: 0;
  -webkit-mask-image: url(${hdcameraMask});
  mask-image: url(${hdcameraMask});
  mask-repeat: no-repeat;
`;

function MacBookAirM2() {
  const [colorSelect, setColorSelect] = useState<number>(0);
  const [ARcolorSelect, setARColorSelect] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);

  const [appsBtn, setAppsBtn] = useState<boolean>(false);
  const [displayBtn, setDisplayBtn] = useState<boolean>(false);
  const [hdcameraBtn, setHdcameraBtn] = useState<boolean>(false);
  const [soundsystemBtn, setSoundsystemBtn] = useState<boolean>(false);
  const [keyboardBtn, setKeyboardBtn] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      // Clean up when component unmounts
      document.documentElement.style.overflow = "visible";
    };
  }, [showModal]);

  const ColorImages = {
    0: {
      top: midnightTopImage,
      side: midnightSideImage,
      magSafe: midnightMagSafeImage,
    },
    1: {
      top: starlightTopImage,
      side: starlightSideImage,
      magSafe: starlightMagSafeImage,
    },
    2: {
      top: spacegrayTopImage,
      side: spacegraySideImage,
      magSafe: spacegrayMagSafeImage,
    },
    3: {
      top: silverTopImage,
      side: silverSideImage,
      magSafe: silverMagSafeImage,
    },
  };

  const ARColorImages = {
    0: {
      image: midnightAR,
    },
    1: {
      image: starlightAR,
    },
    2: {
      image: spacegrayAR,
    },
    3: {
      image: silverAR,
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0); // 처음 클릭한 지점.
  const [scrollLeft, setScrollLeft] = useState(0); // 움직인 거리.

  // console.log("처음 클릭 지점" + clickPoint);
  // console.log("움직인 거리" + scrollLeft);

  const handleMouseDownEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (containerRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    e.preventDefault();
    const zoomLevel = window.devicePixelRatio; // 브라우저의 디바이스 픽셀 비율

    if (containerRef.current) {
      const walk = e.pageX - clickPoint;

      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // const scrollRef = useRef<HTMLDivElement | null>(null);
  // const [isDrag, setIsDrag] = useState(false);
  // const [startX, setStartX] = useState<number | null>();

  // const onDragStart = (e: any) => {
  //   console.log('onDragStart')
  //   e.preventDefault();
  //   if (scrollRef.current) {
  //     console.log('IsDrag true')
  //     setIsDrag(true);
  //     setStartX(e.pageX + scrollRef.current.scrollLeft);
  //   }
  // };

  // const onDragEnd = () => {
  //   console.log('onDragEnd')

  //   setIsDrag(false);
  // };

  // const onDragMove = (e: any) => {
  //   console.log('onDragMove')

  //   requestAnimationFrame(() => {

  //     if (isDrag) {
  //       if (scrollRef.current) {
  //       const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

  //       if(startX){
  //         scrollRef.current.scrollLeft = startX - e.pageX;
  //       }

  //         if (scrollLeft === 0) {
  //           setStartX(e.pageX);
  //         } else if (scrollWidth <= clientWidth + scrollLeft) {
  //           setStartX(e.pageX + scrollLeft);
  //         }
  //       }
  //     }
  //   })
  // };

  // const throttle = (func: any, ms: any) => {
  //   console.log('throttle')

  //   let throttled = false;
  //   return (...args) => {
  //     if (!throttled) {
  //       throttled = true;
  //       setTimeout(() => {
  //         func(...args);
  //         throttled = false;
  //       }, ms);
  //     }
  //   };
  // };

  // const delay = 100;
  // const onThrottleDragMove = throttle(onDragMove, delay);

  // const handleScroll = (scrollOffset: any) => {
  //   if (scrollRef.current) {
  //     console.log('기능작동')
  //     console.log(scrollOffset)
  //     scrollRef.current.scrollLeft += scrollOffset;
  //   }
  // };

  return (
    <>
      <div className="shop-products">
        {/* MacBook Air 15 모델로 만나다 */}
        <div className="wrap">
          <div className="image-wrap">
            <img src={main} alt="" />
          </div>
          <div style={{ width: "980px", margin: "40px auto 119px" }}>
            <h1 className="title">
              <span className="black">MacBook Air</span> 15 모델로 만나다
            </h1>
            <span className="text" style={{ marginTop: "42px" }}>
              크게 펼치고, 얇게 접다. 새로운 MacBook Air 15 모델은 널찍한 Liquid Retina 디스플레이를
              <br /> 통해, 당신이 좋아하는 모든 걸 위한 더욱 넉넉한 공간을 마련해 줍니다. 여기에 여전히 매력적인 기존 13 모델까지, 이제 Air를 선택해야
              할 이유가 그 어느 때보다 많아졌죠. 두 모델 모두 막강한 성능의 M2 칩과 최대 18시간 가는 배터리를 갖추고 있으며,
              <a href="#footnote-1" className="footnote-number" style={{ marginRight: "6px" }}>
                1
              </a>
              극강의 휴대성을 자랑하는 디자인에 쏜살같이 빠른 성능을 선사합니다.
            </span>
            <ul className="ul" style={{ marginTop: "32px" }}>
              <li className="list">
                <span>M2 칩 탑재 13 모델 ₩1,590,000부터</span>
              </li>
              <li className="list">
                <span>
                  <span className="brown">새로운</span> M2 칩 탑재 15 모델 ₩1,890,000부터
                </span>
              </li>
            </ul>
            <ul className="ul-row" style={{ marginTop: "22px" }}>
              <li className="list">
                <a href="">
                  <span>동영상 보기</span>
                  <span className="icon icon-playcircle"></span>
                </a>
              </li>
              <li className="list">
                <a href="">
                  <span>이벤트 시청하기</span>
                  <span className="icon icon-more"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 디자인 - 원하는 대로. 당신만의 Air. */}
        <div className="wrap">
          <div style={{ width: "980px", margin: "0 auto" }}>
            <h2 className="h2 black">디자인</h2>
            <span className="typography-headline">
              원하는 대로.<br></br>당신만의 Air.
            </span>
          </div>
          <div className="image-wrap">
            <img src={design} className="design" alt="" />
          </div>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <span className="typography-text" style={{ marginTop: "42px" }}>
              누구에게나 <span className="black">꼭 맞는</span> MacBook Air가 있는 법. 맘에 드는 사이즈 고르고, 컬러 고르고, 바로 고고고. 당신이 어떤
              모델을 선택하든, 모두 <span className="black">지구를 염두에 두고 설계</span>되어 견고한 100% 재활용 알루미늄 외장을 갖추었습니다. 여기에
              부하가 큰 작업도 조용히 처리하는 <span className="black">팬리스 디자인</span>까지 자랑하죠.
            </span>
          </div>
        </div>
        {/* part2 */}
        <div className="wrap">
          <div style={{ width: "980px", margin: "60px auto 0" }}>
            <div className="image-wrap grayBG">
              <img src={design2} alt="" />
            </div>
            <span className="typography-sub-text" style={{ margin: "32px 0 80px" }}>
              <span className="black">두 가지 완벽한 사이즈.</span> 13 모델과 15 모델 중 어느 것을 고르든, 두 모델 다 엄청나게 가볍고 두께는 고작 1cm
              남짓 될 정도로 얇기 때문에 어디든 쉽게 들고 다닐 수 있습니다.
            </span>
          </div>
        </div>
        {/* part3 colorSelect */}
        <div className="wrap">
          <div style={{ width: "980px", margin: "0 auto 0" }}>
            <div className="items-wrap">
              <div className="items">
                <div className="grid-wrap">
                  <div className="grid-item item-side">
                    <div className="item-side-image">
                      <img src={ColorImages[colorSelect].side} alt="" />
                    </div>
                  </div>
                  <div className="grid-item item-top">
                    <div className="item-top-image">
                      <img src={ColorImages[colorSelect].top} alt="" />
                    </div>
                    <ul className="colornav-items">
                      <li className="colornav-item current" role="presentation">
                        <input
                          type="radio"
                          name="finishes-gallery-value"
                          className="colornav-value current"
                          id="finishes-gallery-item-1-trigger"
                          value="midnight"
                          data-ac-gallery-trigger="finishes-gallery-midnight"
                          aria-label="미드나이트"
                          role="tab"
                        />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-1-trigger"
                          aria-hidden="true"
                          number={0}
                          colorSelect={colorSelect}
                          onClick={() => setColorSelect(0)}
                        >
                          <span className="colornav-swatch colornav-swatch-midnight">
                            <ColorNavText className="colornav-label" number={0} colorSelect={colorSelect}>
                              미드나이트
                            </ColorNavText>{" "}
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input
                          type="radio"
                          name="finishes-gallery-value"
                          className="colornav-value"
                          id="finishes-gallery-item-2-trigger"
                          value="starlight"
                          data-ac-gallery-trigger="finishes-gallery-starlight"
                          aria-label="스타라이트"
                          role="tab"
                        />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-2-trigger"
                          aria-hidden="true"
                          number={1}
                          colorSelect={colorSelect}
                          onClick={() => setColorSelect(1)}
                        >
                          <span className="colornav-swatch colornav-swatch-starlight">
                            <ColorNavText className="colornav-label" number={1} colorSelect={colorSelect}>
                              스타라이트
                            </ColorNavText>
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input
                          type="radio"
                          name="finishes-gallery-value"
                          className="colornav-value"
                          id="finishes-gallery-item-3-trigger"
                          value="spacegray"
                          data-ac-gallery-trigger="finishes-gallery-spacegray"
                          aria-label="스페이스 그레이"
                          role="tab"
                        />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-3-trigger"
                          aria-hidden="true"
                          number={2}
                          colorSelect={colorSelect}
                          onClick={() => setColorSelect(2)}
                        >
                          <span className="colornav-swatch colornav-swatch-spacegray">
                            <ColorNavText className="colornav-label" number={2} colorSelect={colorSelect}>
                              스페이스 그레이
                            </ColorNavText>
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input
                          type="radio"
                          name="finishes-gallery-value"
                          className="colornav-value"
                          id="finishes-gallery-item-4-trigger"
                          value="silver"
                          data-ac-gallery-trigger="finishes-gallery-silver"
                          aria-label="실버"
                          role="tab"
                        />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-4-trigger"
                          aria-hidden="true"
                          number={3}
                          colorSelect={colorSelect}
                          onClick={() => setColorSelect(3)}
                        >
                          <span className="colornav-swatch colornav-swatch-silver">
                            <ColorNavText className="colornav-label" number={3} colorSelect={colorSelect}>
                              실버
                            </ColorNavText>{" "}
                          </span>
                        </Circle>
                      </li>
                    </ul>
                  </div>
                  <div className="grid-item item-magsafe">
                    <div className="item-magsafe-image">
                      <img src={ColorImages[colorSelect].magSafe} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="typography-sub-text" style={{ margin: "32px 0 80px" }}>
              <span className="black">꿈같은 네 가지 컬러.</span> 어떤 선택을 해도 탈지구급. 여기에 MagSafe 충전 케이블도 각각의 마감에 맞춘 색상으로
              제공되죠.
            </span>
          </div>
        </div>
        {/* 성능 - 엄청난 스피드 게다가 배터리 사용 시간까지? */}
        <div className="wrap section-performance">
          <div style={{ width: "980px", margin: "100px auto 0" }}>
            <h2 className="h2 black">성능</h2>
            <span className="typography-headline">
              엄청난 스피드 게다가
              <br />
              배터리 사용 시간까지?
              <img src={emoji} alt="" style={{ position: "relative", top: "10px", left: "15px" }} />
            </span>
          </div>
          <div className="image-wrap" style={{ marginTop: "57px" }}>
            <img src={performance} className="performance" alt="" />
          </div>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <div className="performance-badges" style={{ margin: "82px 0 42px", height: "220px" }}>
              <div style={{ width: "152px", height: "152px", marginRight: "100px", borderRight: "1px solid #86868b" }}>
                <img src={performance2} alt="Apple M2 칩" style={{ paddingRight: "51px", borderRight: "1px solid #86868b" }} />
              </div>
              <div className="badge badge1">
                <div className="badge-content">
                  <span className="badge-title">최대</span>
                  <span className="badge-value">
                    1.4
                    <span className="badge-unit">배</span>
                  </span>
                  <span className="badge-caption" style={{}}>
                    더 빠른 속도
                    <br />
                    (M1 칩 탑재 <br />
                    MacBook Air 대비)
                    <sup className="footnote footnote-number">
                      <a href="#footnote-2" className="footnote-number">
                        2
                      </a>
                    </sup>
                  </span>
                </div>
              </div>
              <div className="badge badge2">
                <div className="badge-content">
                  <span className="badge-title">최대</span>
                  <span className="badge-value">
                    12<span className="badge-unit">배</span>
                  </span>
                  <span className="badge-caption">
                    더 빠른 속도
                    <br />
                    (Intel 기반 <br /> MacBook Air 중 가장 빠른 모델 대비)
                    <sup className="footnote footnote-number">
                      <a href="#footnote-3" className="footnote-number">
                        3
                      </a>
                    </sup>
                  </span>
                </div>
              </div>
              <div className="badge badge3">
                <div className="badge-content">
                  <span className="badge-title">최대</span>
                  <span className="badge-value">18시간</span>
                  <span className="badge-caption">
                    배터리 사용 시간
                    <sup className="footnote footnote-number">
                      <a href="#footnote-1" className="footnote-number">
                        1
                      </a>
                    </sup>
                  </span>
                </div>
              </div>
            </div>
            <span className="typography-text" style={{ marginTop: "42px" }}>
              M2 칩은 <span className="black">당신이 하는 모든 일에 속도를 더해줍니다.</span> 수업 과제를 위한 동영상을 편집하든, 업무용 사업 계획서를
              공동 작업하든, 또는 좋아하는 프로그램을 스트리밍하는 동시에 온라인 쇼핑을 하든 말이죠. 여기에{" "}
              <span className="black">온종일 가는 배터리 사용 시간</span>까지 가능케 해, 전원 어댑터를 집에 두고 나와도 걱정 없답니다.
            </span>
            <span className="typography-text" style={{ marginTop: "40px", marginBottom: "66px" }}>
              Intel Core i7 프로세서를 탑재한 <span className="black">PC 노트북 대비</span>, MacBook Air는 최대{" "}
              <span className="black">2배 더 빠른 성능</span>,
              <a href="#footnote-1" className="footnote-number">
                4
              </a>{" "}
              최대 <span className="black">50% 더 빠른 웹 브라우징 속도</span>,
              <a href="#footnote-1" className="footnote-number">
                5
              </a>{" "}
              최대 <span className="black">50% 더 긴 배터리 사용 시간</span>을 자랑합니다.
              <a href="#footnote-1" className="footnote-number">
                6
              </a>
            </span>
            <div className="performance-more-btn-wrap">
              <button className="button" onClick={openModal}>
                M2 심층 탐구
              </button>
            </div>
            {showModal && <Modal setShowModal={setShowModal}></Modal>}
          </div>
          <div className="subsection-content">
            <div className="article-subsections tiles grid">
              <div className="subsection-apps grid-item">
                <div className="tile tile-main">
                  <div className="apps-wrapper">
                    <img src={apps} className="apps apps-layer-4" />
                  </div>
                  <TileContent className="tile-content" appsBtn={appsBtn}>
                    <h3 className="tile-subhead typography-custom-tile-subhead-large">
                      당신의 모든 최애 앱이
                      <br />
                      macOS에서 훨훨.
                    </h3>
                  </TileContent>
                  <input type="checkbox" className="tile-overlay-toggle" id="tile-overlay-toggle-apps" />
                  <div className="tile-overlay">
                    <label className="tile-button-wrapper" htmlFor="tile-overlay-toggle-apps" onClick={() => setAppsBtn(!appsBtn)}>
                      <span className="animation-wrapper animate-in">
                        <span className="tile-button">
                          <svg className="tile-icon-alt" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39 39">
                            <path
                              className="st0"
                              d="M19.5,9.8c0.6,0,1,0.4,1,1l0,7.7l7.7,0c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1l-7.7,0l0,7.7c0,0.6-0.4,1-1,1
        					        		    							c-0.6,0-1-0.4-1-1l0-7.7l-7.7,0c-0.6,0-1-0.5-1-1c0-0.6,0.4-1,1-1l7.7,0l0-7.7C18.5,10.2,19,9.8,19.5,9.8L19.5,9.8z"
                            ></path>
                          </svg>
                        </span>
                        <span className="tile-button-text" role="button"></span>
                      </span>
                    </label>
                    <TileOverlayContent className="tile-overlay-content" appsBtn={appsBtn}>
                      <h3 className="visuallyhidden">MacOS 호환성</h3>
                      <div className="tile-overlay-content-inner">
                        <picture
                          id="overview-performance-apps-overlay-boc-icon-macos-1"
                          className="overview-performance-apps-overlay-boc-icon-macos tile-overlay-image loaded"
                        >
                          <img src={plusIcon} />
                        </picture>
                        <div className="typography-tile-overlay-copy tile-overlay-copy">
                          <p style={{ marginTop: "20px" }}>
                            <em>호환성.</em> Apple Silicon에 맞게 최적화된 수천 가지 앱은 물론, Microsoft Excel 및 PowerPoint, Adobe Creative Cloud,
                            Google Suite 등 당신이 즐겨 쓰는 모든 앱이 macOS에서는 전광석화처럼 빠르게 실행됩니다. 여기에, 언제나 앱들이 매끄럽게
                            작동되도록 무료 macOS 소프트웨어 업데이트가 정기적으로 제공되죠.
                          </p>
                        </div>
                      </div>
                    </TileOverlayContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mac이 처음이라면 */}
        <div className="section section-switchers card-gallery" style={{ marginTop: "150px" }}>
          <div className="section-content">
            <div className="article-header">
              <h2 className="article-headline typography-custom-section-headline-reduced">Mac이 처음이라면.</h2>
            </div>
          </div>
          <div id="switch-gallery" className="gallery card-gallery" style={{ scrollPadding: "0px" }}>
            <div
              className="scroll-container"
              ref={containerRef}
              onMouseDown={handleMouseDownEvent}
              onMouseLeave={() => setDragging(false)}
              onMouseUp={() => setDragging(false)}
              onMouseMove={handleMouseMoveEvent}
              // ref={scrollRef}
              //       onMouseDown={onDragStart}
              //       onMouseMove={isDrag ? onThrottleDragMove : undefined}
              //       onMouseUp={onDragEnd}
              //       onMouseLeave={onDragEnd}
            >
              <ul className="item-container">
                <li id="compare-gallery-item-1" className="gallery-item current">
                  <div className="gallery-item-content">
                    <div className="gallery-item-image">
                      <picture id="overview-switchers-new-mac-iphone-1" className="overview-switchers-new-mac-iphone loaded">
                        <img src={switch1} alt="" />
                      </picture>
                    </div>
                    <div className="gallery-item-copy typography-custom-eyebrow-reduced">
                      <span className="black">Mac + iPhone.</span>
                      <p>
                        Mac은 iPhone만큼이나 익히기 쉽습니다. 그뿐만 아니라 친구들과 ‘메시지’ 앱으로 대화를 나눌 때든, AirDrop으로 파일을 전송할 때든,
                        Mac의 능력은 iPhone과 함께할 때 더욱 빛을 발합니다.
                      </p>
                    </div>
                  </div>
                </li>
                <li id="compare-gallery-item-2" data-analytics-gallery-item-id="icloud" className="gallery-item">
                  <div className="gallery-item-content">
                    <div className="gallery-item-image">
                      <picture id="overview-switchers-new-icloud-1" className="overview-switchers-new-icloud loaded">
                        <img src={switch2} alt="" />
                      </picture>
                    </div>
                    <div className="gallery-item-copy typography-custom-eyebrow-reduced">
                      <h3 className="black">iCloud.</h3>
                      <p>
                        당신의 모든 사진, 연락처, 문서 등을 iCloud에 보관해두면, 이 모든 걸 당신의 모든 기기에서 간편하게 열어볼 수 있습니다. 해야 할
                        일 목록을 iPhone에 기록한 후 해당 항목들을 Mac에서 확인하기 등, iCloud의 쓰임새는 무궁무진하답니다.
                      </p>
                    </div>
                  </div>
                </li>
                <li id="compare-gallery-item-3" className="gallery-item">
                  <div className="gallery-item-content">
                    <div className="gallery-item-image">
                      <picture id="overview-switchers-new-migration-1" className="overview-switchers-new-migration loaded">
                        <img src={switch3} alt="" />
                      </picture>
                    </div>
                    <div className="gallery-item-copy typography-custom-eyebrow-reduced">
                      <h3 className="black">마이그레이션 지원.</h3>
                      <p>
                        기존에 쓰던 PC나 Mac에 있는 파일, 앱 등을 쉽게 옮길 수 있습니다. 그리고 도움이 필요할 땐 온라인 채팅, 전화, 매장 방문 예약을
                        통해 언제든 Apple 지원의 도움을 받을 수 있습니다.
                      </p>
                    </div>
                  </div>
                </li>
                <li id="compare-gallery-item-4" data-analytics-gallery-item-id="built-in apps" className="gallery-item">
                  <div className="gallery-item-content">
                    <div className="gallery-item-image">
                      <picture id="overview-switchers-new-powerful-apps-1" className="overview-switchers-new-powerful-apps loaded">
                        <img src={switch4} alt="" />
                      </picture>
                    </div>
                    <div className="gallery-item-copy typography-custom-eyebrow-reduced">
                      <h3 className="black">각종 강력한 앱 기본 탑재.</h3>
                      <p>
                        원대한 아이디어를 펼치기 위한 창작 및 협업을 바로 진행할 수 있도록, Mac은 FaceTime, Freeform, ‘사진’, Keynote 같은 앱을
                        기본으로 탑재하고 있습니다.{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li id="compare-gallery-item-5" className="gallery-item">
                  <div className="gallery-item-content">
                    <div className="gallery-item-image custom-graphic">
                      <div>
                        <ul role="list" aria-label="Mac 특징">
                          <li role="listitem" className="typography typography-manifesto-line icon icon-before icon-check">
                            쉽다.
                          </li>
                          <li role="listitem" className="typography typography-manifesto-line icon icon-before icon-check">
                            강력하다.
                          </li>
                          <li role="listitem" className="typography typography-manifesto-line icon icon-before icon-check">
                            놀랍다.
                          </li>
                          <li role="listitem" className="typography typography-manifesto-line icon icon-before icon-check">
                            Mac은 뭐든 <em>척척.</em>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="gallery-item-copy typography-custom-eyebrow-reduced">
                      <h3 className="black">넵, Mac은 뭐든 척척이죠.</h3>
                      <p>MacBook Air뿐만이 아닙니다. 모든 Mac은 이토록 쉽고, 강력하고, 놀라움으로 가득하도록 설계되었습니다.</p>
                      <a href="/kr/macbook-air-13-and-15-m2/mac-does-that/" className="icon-wrapper typography-custom-cta">
                        <span className="icon-copy">더 알아보기</span>
                        <span className="icon icon-after more"></span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* <div className="paddlenav-container paddlenav-bottom">
              <div className="paddlenav paddlenav-framed paddlenav-compact">
                <ul>
                  <li>
                    <button className="paddlenav-arrow paddlenav-arrow-previous" onClick={() => handleScroll(-100)}></button>
                  </li>
                  <li>
                    <button className="paddlenav-arrow paddlenav-arrow-next" onClick={() => handleScroll(100)}></button>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        {/* 디스플레이, 카메라, 오디오 */}
        {/* 또렷이 앞서다. */}
        <div className="section-display-camera-audio" style={{ marginTop: "150px" }}>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <h2 className="h2 black">디스플레이, 카메라, 오디오</h2>
            <span className="typography-headline">또렷이 앞서다.</span>
          </div>
          <div className="product-contents">
            <div className="subsection-apps grid-item">
              <div className="tile stile-with-overlay">
                <div className="image-wrap">
                  <img src={display} alt="" />
                </div>
                <div className="overlay">
                  <div className="tile-button-wrapper" onClick={() => setDisplayBtn(!displayBtn)}>
                    <span className="animation-wrapper animate-in">
                      <TileButton className="tile-button" active={displayBtn}>
                        <svg className="tile-icon-alt" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39 39">
                          <path
                            className="st0"
                            d="M19.5,9.8c0.6,0,1,0.4,1,1l0,7.7l7.7,0c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1l-7.7,0l0,7.7c0,0.6-0.4,1-1,1
        					        		    							c-0.6,0-1-0.4-1-1l0-7.7l-7.7,0c-0.6,0-1-0.5-1-1c0-0.6,0.4-1,1-1l7.7,0l0-7.7C18.5,10.2,19,9.8,19.5,9.8L19.5,9.8z"
                          ></path>
                        </svg>
                      </TileButton>
                      <span className="tile-button-text" role="button"></span>
                    </span>
                  </div>
                  <DisplayOverlayContent displayBtn={displayBtn}>
                    <div className="tile-overlay-content-inner">
                      <div className="inner-tile-grid">
                        <div className="inside-units brightness">
                          <picture
                            id="overview-display-camera-audio-overlay-boc-icon-brightness-1"
                            className="overview-display-camera-audio-overlay-boc-icon-brightness tile-overlay-image loaded"
                          >
                            <img src={light} alt=" " />
                          </picture>
                          <h4 className="typography-tile-overlay-headline tile-overlay-headline">500 니트 밝기</h4>
                          <div className="typography-tile-overlay-copy tile-overlay-copy">어떤 조명 환경에서도 편안하게 작업할 수 있습니다.</div>
                        </div>
                        <div className="inside-units color">
                          <picture
                            id="overview-display-camera-audio-overlay-boc-icon-color-1"
                            className="overview-display-camera-audio-overlay-boc-icon-color tile-overlay-image loaded"
                          >
                            <img src={color} alt=" " />
                          </picture>
                          <h4 className="typography-tile-overlay-headline tile-overlay-headline">넓은 색영역(P3)</h4>
                          <div className="typography-tile-overlay-copy tile-overlay-copy">
                            더욱 정확하고 생생한 색감으로 사진 및 동영상을 감상하고 편집할 수 있습니다.
                          </div>
                        </div>
                        <div className="inside-units true-tone">
                          <picture
                            id="overview-display-camera-audio-overlay-boc-icon-true-tone-1"
                            className="overview-display-camera-audio-overlay-boc-icon-true-tone tile-overlay-image loaded"
                          >
                            <img src={truetone} alt=" " />
                          </picture>
                          <h4 className="typography-tile-overlay-headline tile-overlay-headline">True Tone 기술</h4>
                          <div className="typography-tile-overlay-copy tile-overlay-copy">
                            True Tone은 주변 조명에 맞게 디스플레이의 색온도를 조절해 시각적으로 더욱 자연스러운 화면을 구현해 줍니다.
                            <br className="small" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DisplayOverlayContent>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <span className="typography-text" style={{ marginTop: "42px" }}>
              <span className="black">10억 개의 색상</span>을 지원하고, 동급의 PC 노트북 대비 최대 <span className="black">2배 높은 해상도</span>를
              자랑하는 MacBook Air의 Liquid Retina 디스플레이는 보는 즉시 당신의 시선을 사로잡습니다. 풍부한 대비와 또렷한 디테일로 사진 및 동영상은
              더욱 생생하게, 짱짱한 선명함으로 텍스트는 더욱 읽기 편하게 보여주죠.
            </span>
          </div>
          <div style={{ width: "980px", margin: "40px auto 0" }}>
            <div className="box-wrap">
              <div className="box left">
                <div className="top">
                  <Behind className="top-behind" active={hdcameraBtn}>
                    <div className="top-behind-inner">
                      <img src={hdcameraIcon} alt="" />
                      <span className="typography-tile-overlay-copy">
                        첨단 빔포밍 알고리즘으로 깨끗한 오디오를 포착하는 <span className="black">3 마이크 어레이</span>가 어디에서든 통화 소리를 크고
                        또렷하게 전달해 줍니다.
                      </span>
                    </div>
                  </Behind>
                  <ImgWrap className="img-wrap-left" active={hdcameraBtn}>
                    <HDcameraBG src={hdcameraBG} alt="" />
                    <HDcamera src={hdcamera} alt="" />
                  </ImgWrap>
                  <div className="tile-button-wrapper" onClick={() => setHdcameraBtn(!hdcameraBtn)}>
                    <span className="animation-wrapper animate-in">
                      <TileButton className="tile-button" active={hdcameraBtn}>
                        <svg className="tile-icon-alt" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39 39">
                          <path
                            className="st0"
                            d="M19.5,9.8c0.6,0,1,0.4,1,1l0,7.7l7.7,0c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1l-7.7,0l0,7.7c0,0.6-0.4,1-1,1
        					        		    							c-0.6,0-1-0.4-1-1l0-7.7l-7.7,0c-0.6,0-1-0.5-1-1c0-0.6,0.4-1,1-1l7.7,0l0-7.7C18.5,10.2,19,9.8,19.5,9.8L19.5,9.8z"
                          ></path>
                        </svg>
                      </TileButton>
                      <span className="tile-button-text" role="button"></span>
                    </span>
                  </div>
                </div>
                <div className="down">
                  <span className="text">
                    HD 카메라. 1080p FaceTime HD 카메라 덕분에, 친구 및 가족과 영상 통화를 할 때나 세계 곳곳의 동료들과 화상 회의를 할 때도 당신의
                    모습을 최고로 멋지게 보여줄 수 있습니다.
                  </span>
                </div>
              </div>
              <div className="box right">
                <div className="top">
                  <Behind className="top-behind" active={soundsystemBtn}>
                    <div className="top-behind-inner">
                      <img src={soundsystemIcon} alt="" />

                      <span className="typography-tile-overlay-copy">
                        <div>
                          <span className="black">MacBook Air 13</span>은 2개의 우퍼와 2개의 트위터가 결합된{" "}
                          <span className="black">4 스피커 사운드 시스템</span>을 탑재하고 있어, 이동 중에도 음악, 영화 등을 즐길 수 있게 해줍니다.
                        </div>
                        <div style={{ marginTop: "15px" }}>
                          <span className="black">MacBook Air 15</span>는 2쌍의 포스 캔슬링 우퍼와 2개의 트위터가 결합된{" "}
                          <span className="black">6 스피커 사운드 시스템</span>으로 두 배 더 깊은 저음역 사운드를 구현합니다.
                          <a href="#footnote-1" className="footnote-number">
                            18
                          </a>
                        </div>
                      </span>
                    </div>
                  </Behind>
                  <ImgWrap className="img-wrap-right" active={soundsystemBtn}>
                    <img src={soundsystem} alt="" />
                  </ImgWrap>
                  <div className="tile-button-wrapper" onClick={() => setSoundsystemBtn(!soundsystemBtn)}>
                    <span className="animation-wrapper animate-in">
                      <TileButton className="tile-button" active={soundsystemBtn}>
                        <svg className="tile-icon-alt" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39 39">
                          <path
                            className="st0"
                            d="M19.5,9.8c0.6,0,1,0.4,1,1l0,7.7l7.7,0c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1l-7.7,0l0,7.7c0,0.6-0.4,1-1,1
        					        		    							c-0.6,0-1-0.4-1-1l0-7.7l-7.7,0c-0.6,0-1-0.5-1-1c0-0.6,0.4-1,1-1l7.7,0l0-7.7C18.5,10.2,19,9.8,19.5,9.8L19.5,9.8z"
                          ></path>
                        </svg>
                      </TileButton>
                      <span className="tile-button-text" role="button"></span>
                    </span>
                  </div>
                </div>
                <div className="down">
                  <span className="text">
                    <span className="black">온몸을 감싸는 듯한 사운드 시스템.</span> MacBook Air의 스피커는 Dolby Atmos를 구현하는 공간 음향을
                    지원하기 때문에 음악 및 영화 감상 시 3차원 음장 효과를 경험할 수 있게 해줍니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 글자 그대로 맘에 쏙. */}
        <div className="section-keyboard" style={{ marginTop: "150px" }}>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <h2 className="h2 black">TOUCH ID 탑재형 MAGIC KEYBOARD</h2>
            <span className="typography-headline">글자 그대로 맘에 쏙.</span>
            <div className="wrap" style={{ marginTop: "40px" }}>
              <Behind className="top-behind" active={keyboardBtn}>
                <div className="top-behind-inner">
                  <div className="top-wrap">
                    <span className="typography-tile-overlay-copy">
                      <span className="black">Touch ID.</span> 안전하게 MacBook Air를 잠금 해제하고, 결제를 진행하는 등 많은 일들이 터치 한 번이면 끝.
                      Touch ID는 또한 여러 암호를 일일이 기억하지 않아도 되도록 도와주죠.
                    </span>
                  </div>
                  <div className="keyboard-grid">
                    <div className="item">
                      <div>
                        <img src={lockIcon} alt="" />
                      </div>
                      <span className="typography-tile-overlay-copy">Mac 잠금</span>
                    </div>
                    <div className="item">
                      <div>
                        <img src={loginIcon} alt="" />
                      </div>
                      <span className="typography-tile-overlay-copy">패스키로 앱 및 웹사이트에 로그인</span>
                    </div>
                    <div className="item">
                      <div>
                        <img src={applepayIcon} alt="" />
                      </div>
                      <span className="typography-tile-overlay-copy">Apple Pay로 결제</span>
                    </div>
                  </div>
                </div>
              </Behind>
              <ImgWrap className="img-wrap-inner" active={keyboardBtn}>
                <img src={keyboard} alt="" />
                <img src={touchid} className="touchid" alt="" />
                <span className="touchid-label imgtext">Touch ID</span>
              </ImgWrap>
              <div className="tile-button-wrapper" onClick={() => setKeyboardBtn(!keyboardBtn)}>
                <span className="animation-wrapper animate-in">
                  <TileButton className="tile-button" active={keyboardBtn}>
                    <svg className="tile-icon-alt" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 39 39">
                      <path
                        className="st0"
                        d="M19.5,9.8c0.6,0,1,0.4,1,1l0,7.7l7.7,0c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1l-7.7,0l0,7.7c0,0.6-0.4,1-1,1
        					        		    							c-0.6,0-1-0.4-1-1l0-7.7l-7.7,0c-0.6,0-1-0.5-1-1c0-0.6,0.4-1,1-1l7.7,0l0-7.7C18.5,10.2,19,9.8,19.5,9.8L19.5,9.8z"
                      ></path>
                    </svg>
                  </TileButton>
                  <span className="tile-button-text" role="button"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 보다 자유로운 커넥션 */}
        {/* 디자인 - 원하는 대로. 당신만의 Air. */}
        <div className="section-connect" style={{ marginTop: "150px" }}>
          <div style={{ width: "980px", margin: "0 auto" }}>
            <h2 className="h2 black">연결성</h2>
            <span className="typography-headline">보다 자유로운 커넥션.</span>
          </div>
          <div style={{ width: "980px", margin: "40px auto 0", position: "relative" }}>
            <div className="product-contents">
              <div style={{ position: "absolute", top: "190px", right: "0" }}>
                <img src={connectRight} alt="" />
                <div className="smart-pin">
                  <div className="pin hardware-pin-1">
                    <span className="pin-caption">MagSafe</span>
                    <span className="pin-bar"></span>
                  </div>
                  <div className="pin hardware-pin-2">
                    <span className="pin-caption">Thunderbolt 포트 2개</span>
                    <span className="pin-bar"></span>
                    <span className="pin-widthbar"></span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", top: "300px", left: "0" }}>
                <img src={connectLeft} alt="" />
                <div className="smart-pin-left">
                  <div className="pin hardware-pin-3">
                    <span className="pin-caption">헤드폰 잭</span>
                    <span className="pin-bar"></span>
                  </div>
                </div>
              </div>
            </div>
            <span className="typography-text" style={{ marginTop: "42px" }}>
              <span className="black">MagSafe 충전 케이블</span>은 자석으로 쉽게 탈부착되기 때문에 누군가의 발끝에 케이블이 걸리더라도 노트북까지
              날아가는 불상사를 피할 수 있습니다. 2개의 <span className="black">Thunderbolt 포트</span>에 고속 액세서리를 연결해 Mac을 충전할 수
              있으며, 최대 6K의 디스플레이도 연결할 수 있죠. 하이 임피던스 헤드폰을 지원하는 헤드폰 잭도 갖추었답니다.
            </span>
          </div>
        </div>
        {/* 당신의 작업 공간에 놓인 MacBook Air의 모습, AR로 보기 */}
        <div className="section-routers" style={{ marginTop: "150px" }}>
          <div className="router-grid">
            <div className="router-item full-width AR">
              <div className="contents-wrap">
                <div className="content">
                  <div className="item left">
                    <img src={ARIcon} alt="" />
                    <div>
                      <h2 className="typography-headline" style={{ marginTop: "20px" }}>
                        당신의 작업
                        <br />
                        공간에 놓인 <br />
                        MacBook Air의 모습,
                        <br />
                        AR로 보기.
                      </h2>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <span>iPhone 또는 iPad에서 이 페이지를 Safari로 열어보세요.</span>
                    </div>
                    <ul className="colornav-items">
                      <li className="colornav-item current" role="presentation">
                        <input type="radio" name="finishes-gallery-value" className="colornav-value current" value="midnight" role="tab" />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-1-trigger"
                          number={0}
                          colorSelect={ARcolorSelect}
                          onClick={() => setARColorSelect(0)}
                        >
                          <span className="colornav-swatch colornav-swatch-midnight">
                            <ColorNavText className="colornav-label" number={0} colorSelect={ARcolorSelect}>
                              미드나이트
                            </ColorNavText>{" "}
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input type="radio" name="finishes-gallery-value" className="colornav-value" value="starlight" role="tab" />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-2-trigger"
                          number={1}
                          colorSelect={ARcolorSelect}
                          onClick={() => setARColorSelect(1)}
                        >
                          <span className="colornav-swatch colornav-swatch-starlight">
                            <ColorNavText className="colornav-label" number={1} colorSelect={ARcolorSelect}>
                              스타라이트
                            </ColorNavText>
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input type="radio" name="finishes-gallery-value" className="colornav-value" value="spacegray" role="tab" />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-3-trigger"
                          number={2}
                          colorSelect={ARcolorSelect}
                          onClick={() => setARColorSelect(2)}
                        >
                          <span className="colornav-swatch colornav-swatch-spacegray">
                            <ColorNavText className="colornav-label" number={2} colorSelect={ARcolorSelect}>
                              스페이스 그레이
                            </ColorNavText>
                          </span>
                        </Circle>
                      </li>
                      <li className="colornav-item" role="presentation">
                        <input type="radio" name="finishes-gallery-value" className="colornav-value" value="silver" role="tab" />
                        <Circle
                          className="colornav-link"
                          htmlFor="finishes-gallery-item-4-trigger"
                          number={3}
                          colorSelect={ARcolorSelect}
                          onClick={() => setARColorSelect(3)}
                        >
                          <span className="colornav-swatch colornav-swatch-silver">
                            <ColorNavText className="colornav-label" number={3} colorSelect={ARcolorSelect}>
                              실버
                            </ColorNavText>{" "}
                          </span>
                        </Circle>
                      </li>
                    </ul>
                  </div>
                  <div className="item right">
                    <div className="item-top-image">
                      <img src={ARColorImages[ARcolorSelect].image} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="router-item router-item-accessories">
              <div className="router-content-wrapper">
                <div className="router-item-content">
                  <h2 className="router-item-eyebrow" style={{ marginBottom: "5px" }}>
                    액세서리
                  </h2>
                  <h3 className="router-item-headline">Mac 액세서리 살펴보기.</h3>
                  <p className="router-button" style={{ marginTop: "14px" }}>
                    <a href="/kr/shop/goto/mac/accessories" className="blue-button">
                      쇼핑하기
                    </a>
                  </p>
                </div>
                <div className="router-item-picture hidden">
                  <img src={accessories} />
                </div>
              </div>
            </div>
            <div className="router-item router-item-enviroment">
              <div className="router-content-wrapper">
                <div className="router-item-content">
                  <picture>
                    <img src={envirIcon} alt="" />
                  </picture>
                  <div style={{ position: "relative" }}>
                    <h3 className="router-item-headline" style={{ position: "relative", zIndex: "1" }}>
                      지구를 염두에 둔 설계.
                    </h3>
                    <img src={envirHighlight} alt="" style={{ position: "absolute", top: "10px", zIndex: "0" }} />
                  </div>
                  <p className="router-item-text" style={{ maxWidth: "500px", marginTop: "10px" }}>
                    재활용 소재 사용, 더욱 친환경적인 공급망 구축, 책임감 있는 포장까지. MacBook Air는 당신의 손에서 가벼운 만큼 환경에 주는 부담 역시
                    가벼울 수 있도록 설계되었습니다.
                  </p>
                  <p className="router-item-link" style={{ marginTop: "11px" }}>
                    <a href="/kr/environment/" className="icon-wrapper">
                      <span className="icon-copy">Apple과 환경에 대해 더 알아보기</span>
                      <span className="icon icon-more"></span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="router-item router-item-compare full-width">
              <div className="section section-compare">
                <div className="content-wrapper" style={{ marginTop: "150px" }}>
                  <h2 className="typography-compare-headline compare-headline large-centered">당신에게 맞는 노트북은?</h2>
                  <a href="/kr/mac/compare/" className="icon-wrapper typography-compare-cta compare-cta">
                    <span className="icon-copy">모든 Mac 모델 비교하기</span>
                    <span className="icon icon-more"></span>
                  </a>
                  <div className="grid grid-container typography-compare-copy">
                    <picture className="overview-routers-compare-mba-m1 macbook-air-m1-product-image product-image loaded">
                      <img src={macAirM1} alt="" />
                    </picture>
                    <picture className="overview-routers-compare-3-swatches macbook-air-m1-product-swatch product-swatch loaded">
                      <img src={colorIcon3} alt="스페이스 그레이, 실버, 골드 중에서 선택 가능" />
                    </picture>
                    <h3 className="macbook-air-m1-product-headline typography-compare-product-name product-headline">
                      MacBook Air 13 <span className="macbook-air-m1-product-eyebrow product-eyebrow typography-compare-product-eyebrow">M1 칩</span>
                    </h3>
                    <p className="macbook-air-m1-product-pricing product-pricing has-dynamic-content" data-pricing-hide="macbook-air-m1">
                      <span>₩1,390,000부터</span>
                    </p>
                    <p className="macbook-air-m1-product-display product-display">
                      33.7cm Retina 디스플레이
                      <sup className="footnote footnote-number">
                        <a href="#footnote-19" aria-label="Footnote 19">
                          19
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-m1-product-processor product-processor">Apple M1 칩</p>
                    <p className="macbook-air-m1-product-memory product-memory">
                      8GB 또는 16GB
                      <br className="small" /> 통합 메모리
                    </p>
                    <p className="macbook-air-m1-product-storage product-storage">
                      256GB~2TB 저장 장치
                      <sup className="footnote footnote-number">
                        <a href="#footnote-20" aria-label="Footnote 20">
                          20
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-m1-product-battery product-battery">
                      최대 18시간의 배터리 사용 시간
                      <sup className="footnote footnote-number">
                        <a href="#footnote-21" aria-label="Footnote 21">
                          21
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-m1-product-biometrics product-biometrics">Touch ID</p>
                    <div className="macbook-air-m1-button-wrapper button-wrapper">
                      <a href="/kr/shop/goto/buy_mac/macbook_air/13_inch_m1" className="blue-button blue-button-reduced">
                        구입하기
                      </a>
                    </div>
                    <div className="macbook-air-m1-compare-link compare-link">
                      <a href="/kr/macbook-air-m1/" className="icon-wrapper">
                        <span className="icon-copy">더 알아보기</span>
                        <span className="icon icon-more"></span>
                      </a>{" "}
                    </div>
                    <picture className="overview-routers-compare-mba-13-15 macbook-air-13-15-product-image product-image loaded">
                      <img src={macAir1315} alt="" />
                    </picture>
                    <picture className="overview-routers-compare-4-swatches macbook-air-13-15-product-swatch product-swatch loaded">
                      <img src={colorIcon4} alt="미드나이트, 스타라이트, 스페이스 그레이, 실버 중에서 선택 가능" />
                    </picture>
                    <h3 className="macbook-air-13-15-product-headline typography-compare-product-name product-headline">
                      <span className="violator violator-frameless violator-frameless-reduced">새로운 15 모델</span> MacBook Air 13 및 15
                      <span className="macbook-air-13-15-product-eyebrow product-eyebrow typography-compare-product-eyebrow">M2 칩</span>
                    </h3>
                    <p className="macbook-air-13-15-product-pricing product-pricing has-dynamic-content">
                      <span>₩1,590,000부터</span>
                    </p>
                    <p className="macbook-air-13-15-product-display product-display">
                      34.5cm 또는 38.9cm Liquid Retina
                      <br className="small" />
                      디스플레이
                      <sup className="footnote footnote-number">
                        <a href="#footnote-19" aria-label="Footnote 19">
                          19
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-13-15-product-processor product-processor">Apple M2 칩</p>
                    <p className="macbook-air-13-15-product-memory product-memory">
                      8GB~24GB
                      <br className="small" /> 통합 메모리
                    </p>
                    <p className="macbook-air-13-15-product-storage product-storage">
                      256GB~2TB 저장 장치
                      <sup className="footnote footnote-number">
                        <a href="#footnote-20" aria-label="Footnote 20">
                          20
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-13-15-product-battery product-battery">
                      최대 18시간의 배터리 사용 시간
                      <sup className="footnote footnote-number">
                        <a href="#footnote-1" aria-label="Footnote 1">
                          1
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-air-13-15-product-biometrics product-biometrics">Touch ID</p>
                    <div className="macbook-air-13-15-button-wrapper button-wrapper">
                      <a href="/kr/shop/goto/buy_mac/macbook_air" className="blue-button blue-button-reduced">
                        {" "}
                        구입하기{" "}
                      </a>
                    </div>
                    <picture className="overview-routers-compare-mbp-13 macbook-pro-13-product-image product-image loaded">
                      <img src={macPro13} alt="" />
                    </picture>
                    <picture className="overview-routers-compare-2-swatches macbook-pro-13-product-swatch product-swatch loaded">
                      <img src={colorIcon2} alt="스페이스 그레이, 실버 중에서 선택 가능" />
                    </picture>
                    <h3 className="macbook-pro-13-product-headline typography-compare-product-name product-headline">
                      MacBook Pro 13 <span className="macbook-pro-13-product-eyebrow product-eyebrow typography-compare-product-eyebrow">M2 칩</span>
                    </h3>
                    <p className="macbook-pro-13-product-pricing product-pricing has-dynamic-content">
                      <span>₩1,790,000부터</span>
                    </p>
                    <p className="macbook-pro-13-product-display product-display">
                      33.7cm Retina 디스플레이
                      <sup className="footnote footnote-number">
                        <a href="#footnote-19" aria-label="Footnote 19">
                          19
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-13-product-processor product-processor">Apple M2 칩</p>
                    <p className="macbook-pro-13-product-memory product-memory">
                      8GB~24GB
                      <br className="small" /> 통합 메모리
                    </p>
                    <p className="macbook-pro-13-product-storage product-storage">
                      256GB~2TB 저장 장치
                      <sup className="footnote footnote-number">
                        <a href="#footnote-20" aria-label="Footnote 20">
                          20
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-13-product-battery product-battery">
                      최대 20시간의 배터리 사용 시간
                      <sup className="footnote footnote-number">
                        <a href="#footnote-22" aria-label="Footnote 22">
                          22
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-13-product-biometrics product-biometrics">Touch Bar 및 Touch ID</p>
                    <div className="macbook-pro-13-button-wrapper button-wrapper">
                      <a href="/kr/shop/goto/buy_mac/macbook_pro_13" className="blue-button blue-button-reduced">
                        구입하기
                      </a>
                    </div>
                    <div className="macbook-pro-13-compare-link compare-link">
                      <a href="/kr/macbook-pro-13/" className="icon-wrapper">
                        <span className="icon-copy">더 알아보기</span>
                        <span className="icon icon-more"></span>
                      </a>{" "}
                    </div>
                    <picture className="overview-routers-compare-mbp-14-16 macbook-pro-14-16-product-image product-image loaded">
                      <img src={macPro1416} alt="" />
                    </picture>
                    <picture className="overview-routers-compare-2-swatches macbook-pro-14-16-product-swatch product-swatch loaded">
                      <img src={colorIcon2} alt="스페이스 그레이, 실버 중에서 선택 가능" />
                    </picture>
                    <h3 className="macbook-pro-14-16-product-headline typography-compare-product-name product-headline">
                      MacBook Pro 14 및 16{" "}
                      <span className="macbook-pro-14-16-product-eyebrow product-eyebrow typography-compare-product-eyebrow">
                        M2 Pro 또는 M2 Max 칩
                      </span>
                    </h3>
                    <p className="macbook-pro-14-16-product-pricing product-pricing has-dynamic-content" data-pricing-hide="macbook-pro-14-16">
                      <span>₩2,790,000부터</span>
                    </p>
                    <p className="macbook-pro-14-16-product-display product-display">
                      35.9cm 또는 41.0cm <br className="large" />
                      Liquid Retina XDR 디스플레이
                      <sup className="footnote footnote-number">
                        <a href="#footnote-19" aria-label="Footnote 19" data-modal-close="">
                          19
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-14-16-product-processor product-processor">
                      Apple M2 Pro 또는 <br className="large" />
                      Apple M2 Max 칩
                    </p>
                    <p className="macbook-pro-14-16-product-memory product-memory">
                      16GB~96GB
                      <br className="small" /> 통합 메모리
                    </p>
                    <p className="macbook-pro-14-16-product-storage product-storage">
                      512GB~8TB 저장 장치
                      <sup className="footnote footnote-number">
                        <a href="#footnote-20" aria-label="Footnote 20" data-modal-close="">
                          20
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-14-16-product-battery product-battery">
                      최대 22시간의 배터리 사용 시간
                      <sup className="footnote footnote-number">
                        <a href="#footnote-23" aria-label="Footnote 23" data-modal-close="">
                          23
                        </a>
                      </sup>
                    </p>
                    <p className="macbook-pro-14-16-product-biometrics product-biometrics">Touch ID</p>
                    <div className="macbook-pro-14-16-button-wrapper button-wrapper">
                      <a href="/kr/shop/goto/buy_mac/macbook_pro_14" className="blue-button blue-button-reduced">
                        구입하기
                      </a>
                    </div>
                    <div className="macbook-pro-14-16-compare-link compare-link">
                      <a href="/kr/macbook-pro-14-and-16/" className="icon-wrapper">
                        <span className="icon-copy">더 알아보기</span>
                        <span className="icon icon-more"></span>
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="router-item router-item-tradein full-width">
              <div className="router-content-wrapper">
                <div className="router-item-content">
                  <h2 className="router-item-eyebrow">Apple Trade In</h2>
                  <h3 className="router-item-headline" style={{ marginTop: "10px" }}>
                    새 MacBook Air 구매 시 <br className="medium custom-br" />
                    사용할 수 있는 크레딧을 받는 법.
                  </h3>
                  <p className="router-item-copy" style={{ marginTop: "10px" }}>
                    보상 판매 대상 컴퓨터를 새 기기 구입 시 사용할 수 있는 크레딧으로 교환해 드리거나, 무상으로 재활용해 드립니다.
                    <br className="small" /> 기기의 가치를 최대한 활용하는 것,
                    <br className="small" /> 당신은 물론 지구에게도 좋은 일이죠.
                    <sup className="footnote footnote-number">
                      <a href="#footnote-24">24</a>
                    </sup>
                  </p>
                  <p className="router-item-cta" style={{ marginTop: "10px" }}>
                    <a href="/kr/shop/goto/trade_in" className="icon-wrapper">
                      <span className="icon-copy">더 알아보기</span>
                      <span className="icon icon-more"></span>{" "}
                    </a>
                  </p>
                </div>
                <div className="router-item-picture align-middle">
                  <picture id="overview-routers-trade-in-1" className="overview-routers-trade-in loaded">
                    <img src={tradeIn} alt="MacBook Air를 정면에서 바라본 모습." />
                  </picture>
                </div>
              </div>
            </div>
            <div className="router-item router-item-business theme-dark full-bleed link-color-alternate">
              <div className="router-content-wrapper">
                <div className="router-item-content">
                  <h2 className="router-item-headline">Apple at Work</h2>
                  <p className="router-item-copy">비즈니스를 한 단계 더 도약시키는 막강한 힘.</p>
                  <ul className="router-item-cta links-stacked">
                    <li>
                      <a href="/kr/business/" className="icon-wrapper">
                        <span className="icon-copy">Apple at Work에 대해 알아보기</span>
                        <span className="icon icon-after more"></span>
                      </a>
                    </li>
                    <li>
                      <a href="/kr/business/mac/" className="icon-wrapper">
                        <span className="icon-copy">비즈니스를 위한 Mac에 대해 더 알아보기</span>
                        <span className="icon icon-after more"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="router-item-picture">
                  <picture className="overview-routers-business">
                    <img src={business} alt="" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="router-item router-item-education theme-dark full-bleed link-color-alternate">
              <div className="router-content-wrapper">
                <div className="router-item-content">
                  <h2 className="router-item-headline">Apple과 교육</h2>
                  <p className="router-item-copy">더 나은 세상을 만들 수 있는 힘을 교육자와 학생들에게.</p>
                  <p className="router-item-cta">
                    <a href="/kr/education/" className="icon-wrapper">
                      <span className="icon-copy">Apple과 교육에 대해 알아보기</span>
                      <span className="icon icon-after more"></span>
                    </a>
                  </p>
                </div>
                <div className="router-item-picture">
                  <picture className="overview-routers-education">
                    <img src={education} alt="" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="ac-gf-content">
          <section className="ac-gf-buystrip">
            <div className="ac-gf-buystrip-info with-3-columns">
              <section className="ac-gf-buystrip-info-column ac-gf-buystrip-info-financing">
                <div className="ac-gf-buystrip-info-content with-cta">
                  <a className="ac-gf-block" href="">
                    <figure className="ac-gf-buystrip-info-icon ac-gf-buystrip-info-icon-financing"></figure>
                    <h3 className="ac-gf-buystrip-info-title">할부 방식</h3>
                    <p className="ac-gf-buystrip-info-copy">
                      무이자 할부를 통해 Apple 제품을 <br />
                      부담&nbsp;없이 구매하실 수 있습니다.
                    </p>
                    <span className="ac-gf-buystrip-info-cta ac-gf-more ac-gf-block-link">더 알아보기</span>
                  </a>
                </div>
              </section>

              <section className="ac-gf-buystrip-info-column ac-gf-buystrip-info-shipping" data-analytics-region="shipping">
                <div className="ac-gf-buystrip-info-content with-cta">
                  <a className="ac-gf-block" href="">
                    <figure className="ac-gf-buystrip-info-icon ac-gf-buystrip-info-icon-shipping"></figure>
                    <h3 className="ac-gf-buystrip-info-title">업무일 기준 무료 익일 배송</h3>
                    <p className="ac-gf-buystrip-info-copy">
                      오후 3시 이전에 주문된
                      <br />
                      재고 보유 제품에 한합니다.
                    </p>
                    <span className="ac-gf-buystrip-info-cta ac-gf-more ac-gf-block-link">더 알아보기</span>
                  </a>
                </div>
              </section>

              <section className="ac-gf-buystrip-info-column ac-gf-buystrip-info-help" data-analytics-region="help">
                <div className="ac-gf-buystrip-info-content with-cta">
                  <a className="ac-gf-block" href="">
                    <figure className="ac-gf-buystrip-info-icon ac-gf-buystrip-info-icon-help"></figure>
                    <h3 className="ac-gf-buystrip-info-title">도움이 필요하다면</h3>
                    <p className="ac-gf-buystrip-info-copy">
                      질문이 있으신가요? 전문가와 전화로 <span className="nowrap">상담하거나</span> 온라인으로 채팅하세요.
                    </p>
                    <p className="ac-gf-buystrip-info-caption">080-330-8877로 전화 주세요.</p>
                    <span className="ac-gf-buystrip-info-cta ac-gf-buystrip-info-cta-chat ac-gf-more ac-gf-block-link">문의하기</span>
                  </a>
                </div>
              </section>
            </div>
          </section>
          <section className="ac-gf-sosumi">
            <ol>
              <li id="footnote-1">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어&nbsp;CPU, 10코어&nbsp;GPU, 8GB&nbsp;RAM 및 256GB&nbsp;SSD를 탑재한
                MacBook&nbsp;Air&nbsp;15 시제품을 사용해 진행했습니다. Apple&nbsp;TV 앱 동영상 재생 테스트는 디스플레이의 밝기를 제일 어두운
                상태로부터 8단계 밝게 한 상태에서 HD&nbsp;1080p 콘텐츠를 재생하는 방식으로 배터리 사용 시간을 측정했습니다. 배터리 사용 시간은 사용
                패턴 및 설정에 따라 다를 수 있습니다. 자세한 내용은 <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-2">
                테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어&nbsp;CPU, 10코어&nbsp;GPU 및 24GB&nbsp;RAM을 탑재한 MacBook&nbsp;Air&nbsp;13
                시제품과 Apple&nbsp;M1, 8코어&nbsp;CPU, 8코어&nbsp;GPU 및 16GB&nbsp;RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성)
                그리고 Intel UHD Graphics 617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용
                제품을 사용해 진행했습니다. Final&nbsp;Cut&nbsp;Pro 10.6.2에서 4K&nbsp;ProRes&nbsp;422 미디어로 이루어진 2분 분량의 복잡한 프로젝트를
                사용해 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-3">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 24GB RAM 및 2TB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 동일한 구성의 MacBook&nbsp;Air&nbsp;15 시제품 그리고 Intel Iris Plus Graphics, 16GB RAM 및 2TB SSD를 탑재한 1.2GHz 쿼드 코어
                Intel&nbsp;Core&nbsp;i7 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다. Final&nbsp;Cut&nbsp;Pro 10.6.6에서 4K ProRes 422
                미디어로 이루어진 2분 분량의 복잡한 프로젝트를 사용해 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-4">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. Adobe Photoshop 24.3.0에서 ‘하늘 선택’, ‘유화’, ‘응용 광각’, ‘사진 프레임’, ‘나무’ 필터 및 기능을 사용해
                테스트했습니다. 오픈 소스 프로젝트는 Apple Clang 14.0.3을 지원하는 Xcode 14.3이 설치되어 있는 macOS 시스템, 그리고 Clang 14.0.6을
                지원하는 Windows 시스템에서 빌드되었습니다. Premiere Pro 23.3.0에서 4096x2160 해상도 및 초당 59.94 프레임의 4K Apple&nbsp;ProRes RAW
                미디어로 구성된 55초 분량의 영상을 초당 29.97 프레임의 Apple&nbsp;ProRes 422로 인코딩 변환하여 테스트했습니다. 성능 테스트는 특정
                컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-5">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;15 시제품 그리고 Intel Iris Xe
                Graphics, 16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해
                진행했습니다. 지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을
                기준으로 비교한 결과입니다. JetStream 2.1, MotionMark 1.2 및 Speedometer 2.1 성능 벤치마크 테스트는 WPA2 Wi‑Fi 네트워크에 연결된
                상태에서 macOS&nbsp;Ventura의 Safari 16.5 및 Windows&nbsp;11 Home의 Chrome v.113.0.5672.93을 사용해 진행했습니다. 성능 테스트는 특정
                컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-6">
                테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 시제품을
                사용해 진행했습니다. 테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한
                MacBook&nbsp;Air&nbsp;15 시제품 그리고 Intel Iris Xe Graphics, 16GB RAM, 512 SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한
                Intel&nbsp;Core&nbsp;i7 기반 PC 판매용 제품을 사용해 진행했습니다. 지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을
                기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로 비교한 결과입니다. macOS에서 Apple&nbsp;TV&nbsp;앱을 사용해 동영상을
                재생하고, Windows에서 영화 및 TV 앱을 사용해 동영상을 재생했습니다. 사용된 모든 기기는 동일한 디스플레이 밝기로 설정하고 네트워크에
                연결하지 않은 상태에서 테스트했습니다. 배터리 사용 시간은 사용 패턴 및 설정에 따라 다를 수 있습니다. 자세한 내용은{" "}
                <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-7">
                테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Pro 13 시제품과 Apple&nbsp;M1,
                8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Pro 13 판매용 제품을 사용해 진행했습니다. 성능 테스트는 업계 표준의 특정
                벤치마크를 사용해 실시했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Pro의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-8">
                <p>
                  테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;13 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Final&nbsp;Cut&nbsp;Pro 10.6.2에서 4K ProRes 422 미디어로 이루어진 2분 분량의 복잡한 프로젝트를 사용해 테스트했습니다. 성능 테스트는
                  특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
                <p>
                  테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;15 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Final&nbsp;Cut&nbsp;Pro 10.6.6에서 4K ProRes 422 미디어로 이루어진 2분 분량의 복잡한 프로젝트를 사용해 테스트했습니다. 성능 테스트는
                  특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
              </li>
              <li id="footnote-9">
                <p>
                  테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;13 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Adobe Photoshop 23.3.1에서 ‘엠보스’, ‘최소값’, ‘가장자리 선명하게’, ‘이미지 회전’, ‘잔물결’ 필터 및 기능을 사용해 테스트했습니다.
                  성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
                <p>
                  테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;15 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Adobe Photoshop 24.4.1에서 ‘엠보스’, ‘최소값’, ‘가장자리 선명하게’, ‘이미지 회전’, ‘잔물결’ 필터 및 기능을 사용해 테스트했습니다.
                  성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
              </li>
              <li id="footnote-10">
                <p>
                  테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재하고 1470x956 해상도로 설정한
                  MacBook&nbsp;Air&nbsp;13 시제품과 Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재하고 1440x900 해상도로 설정한
                  MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics 617, 16GB RAM 및 1TB SSD를 탑재하고 1440x900 해상도로
                  설정한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다. Baldur’s Gate 3 v1.0.0.9를
                  고급 설정으로 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
                <p>
                  테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재하고 1440x932 해상도로 설정한
                  MacBook&nbsp;Air&nbsp;15 시제품과 Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재하고 1440x900 해상도로 설정한
                  MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics 617, 16GB RAM 및 1TB SSD를 탑재하고 1440x900 해상도로
                  설정한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다. Baldur’s Gate 3
                  v4.1.1.1829258을 고급 설정으로 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인
                  성능을 반영합니다.
                </p>
              </li>
              <li id="footnote-11">
                <p>
                  테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;13 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Final&nbsp;Cut&nbsp;Pro 10.6.2에서 4096x2160 해상도 및 초당 59.94 프레임의 4K Apple&nbsp;ProRes RAW 미디어로 구성된 55초 분량의
                  영상을 Apple&nbsp;ProRes 422로 인코딩 변환하여 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                  MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
                <p>
                  테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;15 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Final&nbsp;Cut&nbsp;Pro 10.6.6에서 4096x2160 해상도 및 초당 59.94 프레임의 4K Apple&nbsp;ProRes RAW 미디어로 구성된 55초 분량의
                  영상을 Apple&nbsp;ProRes 422 HQ로 인코딩 변환하여 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                  MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
              </li>
              <li id="footnote-12">
                <p>
                  테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;13 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Pixelmator&nbsp;Pro 2.4.1에서 216KB 이미지를 사용해 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                  MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
                <p>
                  테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU 및 24GB RAM을 탑재한 MacBook&nbsp;Air&nbsp;15 시제품과
                  Apple&nbsp;M1, 8코어 CPU, 8코어 GPU 및 16GB RAM을 탑재한 MacBook&nbsp;Air 판매용 제품(모두 2TB SSD로 구성) 그리고 Intel UHD Graphics
                  617, 16GB RAM 및 1TB SSD를 탑재한 1.6GHz 듀얼 코어 Intel&nbsp;Core&nbsp;i5 기반 MacBook&nbsp;Air 판매용 제품을 사용해 진행했습니다.
                  Pixelmator&nbsp;Pro 3.3.2에서 216KB 이미지를 사용해 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                  MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
                </p>
              </li>
              <li id="footnote-13">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. Premiere Pro 23.3.0에서 4096x2160 해상도 및 초당 59.94 프레임의 4K Apple&nbsp;ProRes RAW 미디어로 구성된 55초
                분량의 영상을 초당 29.97 프레임의 Apple&nbsp;ProRes 422로 인코딩 변환하여 테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해
                실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-14">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. Adobe Photoshop 24.3.0에서 ‘하늘 선택’, ‘유화’, ‘응용 광각’, ‘사진 프레임’, ‘나무’ 필터 및 기능을 사용해
                테스트했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-15">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. Speedometer 2.1 성능 벤치마크 테스트는 WPA2 Wi‑Fi 네트워크에 연결된 상태에서 macOS&nbsp;Ventura의 Safari 16.5 및
                Windows 11 Home의 Chrome v.113.0.5672.93을 사용해 진행했습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며
                MacBook&nbsp;Air의 대략적인 성능을 반영합니다.
              </li>
              <li id="footnote-16">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. 테스트는 모든 제품에 동일한 디스플레이 밝기 설정을 적용한 상태에서 Zoom 5.14.2를 사용해 진행했습니다. 배터리 사용
                시간은 사용 패턴 및 설정에 따라 다를 수 있습니다. 자세한 내용은 <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-17">
                테스트는 2023년 4월과 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 8코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air&nbsp;13 판매용
                제품과 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Air 15 시제품 그리고 Intel Iris Xe Graphics,
                16GB RAM, 512GB SSD 및 테스트 당시 기준 최신 버전의 Windows 11을 탑재한 Intel&nbsp;Core&nbsp;i7 기반 PC 시스템을 사용해 진행했습니다.
                지난 12개월 동안의 공개 판매 데이터를 기준으로 최고 판매 실적을 기록한 Intel&nbsp;Core&nbsp;i7 PC 노트북(15&nbsp;모델)을 기준으로
                비교한 결과입니다. 오픈 소스 프로젝트는 Apple Clang 14.0.3을 지원하는 Xcode 14.3이 설치되어 있는 macOS 시스템, 그리고 Clang 14.0.6을
                지원하는 Windows 시스템에서 빌드되었습니다. 성능 테스트는 특정 컴퓨터 시스템을 사용해 실시되었으며 MacBook&nbsp;Air의 대략적인 성능을
                반영합니다.
              </li>
              <li id="footnote-18">M2 칩 탑재 MacBook&nbsp;Air&nbsp;13과 비교한 결과입니다.</li>
              <li id="footnote-19">
                화면 크기는 대각선 길이입니다. M2 칩 탑재 MacBook&nbsp;Air&nbsp;13 및 15와 MacBook&nbsp;Pro&nbsp;14 및 16의 디스플레이 상단은 모서리가
                둥근 형태입니다. 직사각형 기준으로 측정했을 때, 화면은 대각선 길이 기준 34.46cm, 38.91cm, 35.97cm 및 41.05cm입니다(실제로 보이는
                영역은 이보다 좁음).
              </li>
              <li id="footnote-20">1GB = 10억 바이트, 1TB = 1조 바이트입니다. 실제 포맷된 용량은 더 적습니다.</li>
              <li id="footnote-21">
                테스트는 2020년 10월 Apple에서 Apple&nbsp;M1&nbsp;칩 및 8코어 GPU를 탑재한 MacBook&nbsp;Air 시제품을 사용해 진행했으며, 해당 제품은
                8GB RAM 및 512GB SSD로 구성되었습니다. Apple&nbsp;TV 앱 동영상 재생 테스트는 디스플레이의 밝기를 제일 어두운 상태로부터 8단계 밝게 한
                상태에서 HD&nbsp;1080p 콘텐츠를 재생하는 방식으로 배터리 사용 시간을 측정했습니다. 배터리 사용 시간은 사용 패턴 및 설정에 따라 다를 수
                있습니다. 자세한 내용은 <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-22">
                테스트는 2022년 5월 Apple에서 Apple&nbsp;M2, 8코어 CPU, 10코어 GPU, 8GB RAM 및 256GB SSD를 탑재한 MacBook&nbsp;Pro&nbsp;13 시제품을
                사용해 진행했습니다. Apple&nbsp;TV 앱 동영상 재생 테스트는 디스플레이의 밝기를 제일 어두운 상태로부터 8단계 밝게 한 상태에서
                HD&nbsp;1080p 콘텐츠를 재생하는 방식으로 배터리 사용 시간을 측정했습니다. 배터리 사용 시간은 사용 패턴 및 설정에 따라 다를 수
                있습니다. 자세한 내용은 <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-23">
                테스트는 2022년 11월과 12월 Apple에서 Apple&nbsp;M2&nbsp;Pro, 12코어 CPU, 19코어 GPU, 16GB RAM 및 1TB SSD를 탑재한
                MacBook&nbsp;Pro&nbsp;16 시제품을 사용해 진행했습니다. 무선 웹 테스트는 디스플레이의 밝기를 제일 어두운 상태로부터 8단계 밝게 한
                상태에서 무선으로 인기 웹사이트 25곳을 방문하는 방식으로 배터리 사용 시간을 측정했습니다. Apple&nbsp;TV 앱 동영상 재생 테스트는
                디스플레이의 밝기를 제일 어두운 상태로부터 8단계 밝게 한 상태에서 HD&nbsp;1080p 콘텐츠를 재생하는 방식으로 배터리 사용 시간을
                측정했습니다. 배터리 사용 시간은 사용 패턴 및 설정에 따라 다를 수 있습니다. 자세한 내용은{" "}
                <a href="/kr/batteries/">apple.com/kr/batteries</a>를 참고하십시오.
              </li>
              <li id="footnote-24">
                보상 판매 금액은 보상 판매 대상이 되는 제품의 상태, 연도, 구성에 따라 달라집니다. 일부 기기는 보상 판매 대상이 아닙니다. 크레딧 또는
                Apple&nbsp;Store&nbsp;Gift&nbsp;Card로 보상 판매를 받으려면 19세 이상이어야 합니다. 보상 판매 금액은 적용 가능한 새 기기 구입 시
                적용하거나 Apple&nbsp;Store&nbsp;Gift&nbsp;Card로 받을 수 있습니다. 최종 확정 금액은 보상 판매 대상 기기를 수령한 후, 예상 금액 산정
                시 제시한 기기의 설명과 일치하는지 비교 검수 후 정해집니다. 부가세는 새로 구입한 기기의 총액을 바탕으로 부과됩니다. 일부 매장에서는
                보상 판매를 제공하지 않으며, 매장 내 보상 판매와 온라인 보상 판매 프로그램 간 내용에 차이가 있을 수 있습니다. 일부 매장은 추가 요구
                사항이 있을 수 있습니다. Apple 또는 보상 판매 파트너사는 어떤 보상 판매도 거래를 거부하거나, 보상 판매 수량을 제한할 권리를
                보유합니다. 적용 가능 기기의 보상 판매 및 재활용에 대한 자세한 내용은 Apple의 보상 판매 파트너사에서 확인할 수 있습니다. 규제 및
                제한이 적용될 수 있습니다. 보상 판매 프로그램은 Apple의 파트너이자 독립적으로 운영되는 제3의 업체에 의해 제공됩니다. Apple 및 Apple의
                계열사는 고객과 파트너 간 계약의 당사자가 아닙니다.
              </li>
            </ol>
          </section>
          <nav className="ac-gf-breadcrumbs">
            <a href="/kr/" className="home ac-gf-breadcrumbs-home">
              <span className="ac-gf-breadcrumbs-home-icon" aria-hidden="true">
                
              </span>
            </a>
            <div className="ac-gf-breadcrumbs-path">
              <ol className="ac-gf-breadcrumbs-list" vocab="http://schema.org/" typeof="BreadcrumbList">
                <li className="ac-gf-breadcrumbs-item" property="itemListElement" typeof="ListItem">
                  <a className="ac-gf-breadcrumbs-link" href="/kr/mac/" property="item" typeof="WebPage">
                    <span property="name">Mac</span>
                  </a>
                </li>
                <li className="ac-gf-breadcrumbs-item" property="itemListElement" typeof="ListItem">
                  <a className="ac-gf-breadcrumbs-link" href="/kr/macbook-air/" property="item" typeof="WebPage">
                    <span property="name">MacBook&nbsp;Air</span>
                  </a>
                </li>
                <li className="ac-gf-breadcrumbs-item" property="itemListElement" typeof="ListItem">
                  <span property="name">M2&nbsp;칩 탑재 MacBook&nbsp;Air&nbsp;13&nbsp;및 15</span>
                </li>
              </ol>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default MacBookAirM2;
