import axios from "../../api/axios";
import styled, { ThemeProvider, css, keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback, CSSProperties } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Home from "./Home";
import Category from "./Category";
import Products from "./Products";
import NotFound from "./NotFound";
import Qna from "./Qna";
import Login from "./Login";
import Cart from "./Cart";
import Buy from "./Buy";
import Usersign from "./Usersign";
import { ColumnType, TaskType } from "../adminPage/Category";
import { cartListType } from "./Cart";
import { darkTheme, lightTheme } from "@styles/theme";
import { selectCurrentUser } from "../../store/userSlice";
import "./Shop.scss";
import Fulfillment from "src/pages/shop/fulfillment";
import Shipping from "src/pages/shop/Shipping";
import Account from "src/pages/shop/Account";
import OrderList from "src/pages/shop/OrderList";
import OrdersDetail from "src/pages/shop/OrdersDetail";
import CheckOut from "src/pages/shop/CheckOut";
import Review from "src/pages/shop/Review";
import Finish from "src/pages/shop/finish";
import Icons from "@styles/icons";

let currentPath = "";

const navRate = (props) => props.theme.navRate;
const navVisibleRate = (props) => props.theme.navVisibleRate;
const navColorRate = (props) => props.theme.navColorRate;

// 스마트폰 화면
const navMobileRate = (props) => props.theme.navMobileRate;
const navMobileVisibleRate = (props) => props.theme.navMobileVisibleRate;
const navMobileColorRate = (props) => props.theme.navMobileColorRate;

interface Type {
  number?: number;
  boolean?: boolean;
  height?: number;
  isHeight?: boolean;
  isSubCateShow?: boolean;
  isNavSecondMenuShow?: boolean | null;
  name?: string;
  isNavFirstMenuShow?: boolean | null;
  isVisible?: boolean;
  isSubVisible?: boolean;
  selectedCateName?: string;
  total?: number;
  isMobile?: boolean;
  grouptotal?: number;
  isFooterShow?: boolean;
  selectedFooterName?: string;
  isHome?: boolean;
  isDarkMode?: boolean;
}

// 모바일 - 메뉴 뒤로가기 애니메이션 시작
const NavMenuBackOpen = keyframes`
  0% {
    opacity: 0;
    transform: translate(4px);
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
`;

// 모바일 - 메뉴 뒤로가기 애니메이션 종료
const NavMenuBackClose = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const NavTabMenuAnimationIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-20px);
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
`;

const NavTabMenuAnimationOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(0px);
    visibility: visible;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-20px);
    visibility: hidden;
  }
`;

// 모바일 메뉴 우측 화살표 애니메이션 시작
const arrowhoverin = keyframes`
  0% {
    opacity: 0;
    transform: translate(-4px);
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
`;

// 모바일 메뉴 우측 화살표 애니메이션 종료
const arrowhoverout = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const SubMenuAnimationIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(8px);
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
`;

const SubMenuAnimationOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(0px);
  }
  100% {
    opacity: 0;
    transform: translate(8px);
  }
`;

const SubMenuAnimationUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const SectionUlAnimationOpen = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const SectionUlAnimationClose = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

export const NavHeight = styled.div<Type>`
  --nav-height-rate: ${navRate};
  --nav-visibility-rate: ${navVisibleRate};
  --nav-background-color-rate: ${navColorRate};
  --nav-mobile-height-rate: ${navMobileRate};
  --nav-mobile-visibility-rate: ${navMobileVisibleRate};
  --nav-mobile-background-color-rate: ${navMobileColorRate};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  height: 48px;
  max-height: 44px;
  background-color: ${(props) => props.theme.navMain};
  backdrop-filter: saturate(180%) blur(20px);

  ${(props) =>
    !props.isHome &&
    css`
      display: block;
      position: absolute;
      background-color: ${(props) => props.theme.navMain};
        ${props.isDarkMode &&
      css`
        background-color: black;
      `}
    `}

  @media only screen and (max-width: 833px) {
    max-height: none;

    & .NavTab-Menu-li {
      width: 100%;
      justify-content: flex-start;
      padding: 3px 48px 4px;
    }
  }
`;

export const MainWrap = styled.div`
  // 결제 관련 부분 공통 inner
  .shipping-inner,
  .fulfillment-inner,
  .checkout-inner {
    max-width: 1030px;
    width: 100%;
    padding: 0 20px;

    header {
      display: flex;
      justify-content: space-between;
      padding-top: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid #d2d2d7;

      span {
        font-size: 24px;
        font-weight: 500;
      }

      .price {
        display: flex;
        align-items: center;

        span {
          font-size: 14px;
          font-weight: 300;
          color: var(--blue-color);
        }
      }
    }
  }

  // 결제 관련 컨텐츠 공통
  .contents {
    opacity: 0;
    transition-duration: 0.4s;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }
  
  .contents.visible {
    opacity: 1;
  }

  // 메인을 제외한 모든 페이지는 상단 고정이 되지 않음.
  .NavWrap {
    position: relative;
  }

  @media only screen and (max-width: 833px) {
    & {
      min-height: 0px;
      max-height: none;
      position: relative;
    }
  }
`;

export const NavWrap = styled.div<Type>`
  z-index: 6;
  width: 100%;

  @media only screen and (max-width: 833px) {
    ${(props) =>
      props.isHeight
        ? css`
            height: 100dvh;
            background: ${(props) => props.theme.navMobileBG};
            /* background-color: rgba(65, 65, 65, 0.486); */

            transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
              opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 0.1s,
              background var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
          `
        : css`
            height: 48px;
            background: ${(props) => props.theme.navSubBG};
            /* background-color: rgba(65, 65, 65, 0.486); */

            transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
              opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 200ms,
              background var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
          `}
  }
`;

export const NavInner = styled.div<Type>`
  max-width: 1024px;
  width: 100%;
  padding: 0 22px;
  margin: 0 auto;

  &.NavTabMobileMenu {
    display: none;
  }

  @media only screen and (max-width: 833px) {
    display: flex;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(22, 22, 23, 0.8);
    transition: background 455.5ms cubic-bezier(0.4, 0, 0.6, 1) 80ms;

    ${(props) =>
      props.isHeight
        ? css`
            height: 100dvh;
            background: ${(props) => props.theme.navSubBGOpened};
            overflow-x: hidden;
            overflow-y: scroll;
            transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
              opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 0.1s,
              background var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
          `
        : css`
            height: 48px;
            background: ${(props) => props.theme.navSubBG};
            transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
              opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 200ms,
              background var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
          `}
  }
`;

// 모바일 - 메뉴 뒤로가기
const NavMenuBack = styled.div<Type>`
  display: none;

  @media only screen and (max-width: 833px) {
    display: block;
    position: absolute;
    z-index: 3;
    width: 48px;
    height: 48px;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transform: translate(4px) scale(1);
    transform-origin: center;
    transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1), transform 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-end;
    fill: ${(props) => props.theme.navSub};

    svg {
      transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
    }

    &:hover {
      fill: ${(props) => props.theme.navMainHover};
    }

    & > button {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      padding: 0;
    }

    ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            visibility: visible;
            opacity: 1;
            transform: translate(0) scale(1);
            transition: visibility 0.24s step-start;
            pointer-events: auto;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 0.16s, transform 0.24s cubic-bezier(0.4, 0, 0.6, 1) 0.16s,
              visibility 0.24s step-start 0.16s;
          `
        : css`
            visibility: hidden;
            opacity: 0;
            transform: translate(0) scale(0.8);
            transition: visibility 0.24s step-end;
            transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 0s, transform 0.24s cubic-bezier(0.4, 0, 0.6, 1) 0s, visibility 0.24s step-end 0s;
          `}
  }
`;

export const NavFlex = styled.div<Type>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  cursor: default;
  margin: 0 -8px;
  width: auto;
  height: 44px;
  user-select: none;
  list-style: none;

  @media only screen and (max-width: 833px) {
    display: flex;
    flex: 1;
    position: relative;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    height: auto;
    box-sizing: border-box;
    padding-inline-end: 48px;
  }
`;

const NavTabMenuWrap = styled.div<Type>`
  --nav-mobile-height-rate: ${navMobileRate};
  --nav-mobile-visibility-rate: ${navMobileVisibleRate};

  @media only screen and (min-width: 834px) {
    display: contents;
  }

  @media only screen and (max-width: 833px) {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

    ${(props) =>
      props.isVisible
        ? css`
            visibility: visible;
            transition: visibility ${(props) => props.theme.navMobileVisibleRate} cubic-bezier(0.4, 0, 0.6, 1);
          `
        : css`
            visibility: hidden;
            transition: visibility ${(props) => props.theme.navMobileVisibleRate} cubic-bezier(0.4, 0, 0.6, 1);
          `};

    ${(props) =>
      props.isNavSecondMenuShow &&
      css`
        visibility: hidden;
        transition: visibility ${(props) => props.theme.navMobileVisibleRate} cubic-bezier(0.4, 0, 0.6, 1);
      `}
  }
`;

export const NavTabMenu = styled.div<Type>`
  --nav-height-rate: ${navRate};
  --nav-mobile-visibility-rate: ${navMobileVisibleRate};
  --nav-background-color-rate: ${navColorRate};

  /* svg {
    fill: ${(props) => props.theme.navText};
    transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  }

  svg:hover {
    fill: ${(props) => props.theme.navMainHover};
  } */

  @media only screen and (min-width: 834px) {
    & {
      display: inherit;
    }
  }

  // 모바일 첫번째 메뉴 li 전체
  @media only screen and (max-width: 833px) {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 0;
    transform: none;
    padding-top: 50px;
    box-sizing: border-box;
    background-color: transparent;

    ${(props) =>
      props.isVisible
        ? css`
            /* visibility: visible; */
            /* opacity: 1; */
            width: 100%;
            pointer-events: auto;
          `
        : css`
            /* visibility: hidden; */
            /* opacity: 0; */
          `};

    & .NavTab-Menu-li {
      width: 100%;
      justify-content: flex-start;
      padding: 3px 3px 4px 48px;
    }
  }
`;

const NavTabWrap = styled.div<Type>`
  height: 44px;

  &:hover {
    .NavTabLink {
      color: ${(props) => props.theme.navMainHover};
    }
  }

  @media only screen and (max-width: 833px) {
    width: auto;
    height: auto;
    transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

    ${(props) =>
      props.isVisible
        ? css`
            /* opacity: 1; */
            pointer-events: auto;
            transform: none;
          `
        : css`
            /* opacity: 0; */
            pointer-events: none;
          `};
  }
`;

export const NavTabLogo = styled.div<Type>`
  .AppleLogo, .Search, .Cart{
    svg {
      fill: ${(props) => props.theme.navText};
      transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
    }
  }

  .AppleLogo, .Search, .Cart{
    svg:hover {
      fill: ${(props) => props.theme.navMainHover};
    }
  }

  @media only screen and (max-width: 833px) {
    display: block;
    width: 48px;
    height: 100%;
    text-align: left;
    transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

    &.NavTabLogo {
      flex-grow: 1;
    }

    &.NavTab-Right {
      flex-grow: 0;
    }
  }
`;

export const NavTab = styled.div<Type>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  cursor: pointer;
  height: 44px;
  z-index: 1;

  // 모바일
  @media only screen and (max-width: 833px) {
    height: 100%;

    &:hover {
      .NavTabLink {
        color: ${(props) => props.theme.navMainHover};
      }
    }

    // 처음 메뉴 열릴때
    /* ${(props) =>
      props.isSubCateShow
        ? css`
            &.NavTab-Menu-li {
              opacity: 1;
              pointer-events: auto;
              transform: translateY(0px);
              transition-duration: 0.24s;
              transition-delay: calc(0.2s + (var(--nav-item-number) * 20ms));
            }
          `
        : css`
            &.NavTab-Menu-li {
              opacity: 0;
              pointer-events: none;
              transform: translateY(-8px);
              transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
              transition-delay: 0s;
            }
          `} */

    ${(props) =>
      props.isVisible &&
      props.isNavSecondMenuShow === null &&
      css`
        transition-property: opacity, transform, visibility;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0px);
        transition-duration: 0.24s;
        transition-delay: calc(0.2s + (var(--nav-item-number) * 20ms));
        transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1), cubic-bezier(0.4, 0, 0.6, 1), step-start;
      `}

    ${(props) =>
      !props.isVisible &&
      css`
        transition-property: opacity, transform, visibility;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px);
        transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
        transition-delay: 0s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1), cubic-bezier(0.4, 0, 0.6, 1), step-start;
      `}

          ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            animation: ${NavTabMenuAnimationOut} 0.5s cubic-bezier(0.4, 0, 0.6, 1) forwards;
          `
        : css`
            animation: ${NavTabMenuAnimationIn} 0.5s cubic-bezier(0.4, 0, 0.6, 1) backwards;
          `}

      /* ${(props) =>
      !props.isSubCateShow &&
      css`
        animation: ${SubMenuAnimationUp} 0.5s cubic-bezier(0.4, 0, 0.6, 1) backwards;
      `} */
  }


`;

export const NavTabLink = styled.a<Type>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  padding: 0 8px;
  height: 44px;
  z-index: 1;

  color: ${(props) => props.theme.navText};
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  white-space: nowrap;
  position: relative;
  cursor: pointer;

  &.cart {
    position: relative;
  }

  .AppleLogo-medium,
  .Search-medium,
  .Cart-medium {
    display: block;
  }

  .AppleLogo-large,
  .Search-large,
  .Cart-large {
    display: none;
  }

  @media only screen and (max-width: 833px) {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 600;
    height: 48px;
    padding: 0 16px;
    color: ${(props) => props.theme.navText};
    transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

    ${(props) =>
      props.isVisible
        ? css`
            &.iconwrap {
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1), visibility 0.24s step-end;
              pointer-events: none;
            }
          `
        : css`
            &.iconwrap {
              opacity: 1;
              visibility: visible;
              transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.24s step-start 80ms;
              pointer-events: auto;
            }
          `}

    &.category {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 3px;
      padding-bottom: 4px;
      padding-inline-start: 48px;
      padding-inline-end: 48px;
    }

    &.applelogo {
      width: max-content;
      font-size: 19px;
      line-height: 1.2105263158;
      font-weight: 600;
    }

    .AppleLogo-medium,
    .Search-medium,
    .Cart-medium {
      display: none;
    }

    .AppleLogo-large,
    .Search-large,
    .Cart-large {
      display: block;
    }
  }
`;

// 모바일 메뉴 화살표
const NavTabArrow = styled.span`
  display: none;

  svg {
    visibility: hidden;
  }

  @media only screen and (max-width: 833px) {
    & {
      display: flex;
      align-items: center;
      height: 40px;
      position: absolute;
      right: 50px;
      margin-top: -1px;
      margin-inline-end: -48px;
      padding-inline-end: 19px;
      opacity: 0;
      color: ${(props) => props.theme.navSub};
      transform-origin: center;
      animation: ${arrowhoverout} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;

      svg {
        width: 100%;
        visibility: visible;
        fill: currentColor;
        transform: scaleX(-1) translateZ(0);
      }

      .NavTab:hover & {
        visibility: visible;
        transition: visibility 0.24s step-start;
        opacity: 1;
        animation: ${arrowhoverin} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;
      }
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 4px;
  z-index: 1;
  width: 1.3em;
  height: 1.3em;
  box-sizing: border-box;
  float: none;
  color: ${(props) => props.theme.navCartBadge};
  font-size: 10px;
  letter-spacing: -0.008em;
  line-height: 1.3;
  text-align: center;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    display: block;
    width: 1.3em;
    height: 100%;
    background: ${(props) => props.theme.navCartBadgeBG};
    border-radius: 1.3em;
  }
`;

const BadgeNumber = styled.span`
  display: block;
  position: relative;
  left: -1px;
  z-index: 2;
  user-select: none;
`;

// PC - 상단 메뉴
// 모바일 - 두번째 메뉴
// PC는 상단에 노출된 메뉴바가 모바일 첫번째 메뉴 목록이다.
// 메뉴바에 hover시 등장하는 메뉴 목록은 모바일 두번째 메뉴 목록이다.
export const SubMenu = styled.div<Type>`
  --nav-height-rate: ${navRate};
  --nav-visibility-rate: ${navVisibleRate};

  overflow: hidden;
  margin-top: -44px;
  position: absolute;
  left: 0;
  right: 0;
  height: ${(props) => props.height}px;
  background: ${(props) => props.theme.navSubBGOpened};
  transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s,
    visibility var(--nav-visibility-rate) step-end 0s;

  ${(props) =>
    props.isVisible
      ? css`
          visibility: visible;
          transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s,
          visibility var(--nav-visibility-rate) step-start 0s;

          .SubMenuInner {
            opacity: 1;
            transition: opacity 0.15s cubic-bezier(0.4, 0, 0.6, 1);
            z-index: 2;
          }
        `
      : css`
          visibility: hidden;
          transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s,
          visibility var(--nav-visibility-rate) step-end 0s;

          .SubMenuInner {
            opacity: 0;
            transition: opacity 0.15s cubic-bezier(0.4, 0, 0.6, 1);
            z-index: 1;
          }
        `};

  ${(props) =>
    !props.isSubCateShow &&
    css`
      height: 44px;
      visibility: hidden;
          transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s,
          visibility var(--nav-visibility-rate) step-end 0.12s;
    `};

  @media only screen and (max-width: 833px) {
    & {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transform: none;
      background-color: transparent;
      overflow: hidden;
      width: 100%;
      height: 100%;

      ${(props) =>
        props.isNavFirstMenuShow &&
        css`
          visibility: hidden;
          pointer-events: none;
          animation: ${SubMenuAnimationOut} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;
          transition: height var(--nav-visibility-rate) cubic-bezier(0.4, 0, 0.6, 1),
            visibility var(--nav-visibility-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s;
        `};

      ${(props) =>
        props.isNavSecondMenuShow
          ? css`
              visibility: visible;
              pointer-events: auto;
              animation: ${SubMenuAnimationIn} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both 0.16s;
              transition: height var(--nav-visibility-rate) cubic-bezier(0.4, 0, 0.6, 1),
                visibility var(--nav-visibility-rate) cubic-bezier(0.4, 0, 0.6, 1);
              z-index: 2;
            `
          : css``};

    }
  }
`;

// 상단 메뉴바 높이
export const SubMenuHeight = styled.div`
  margin-top: 44px;
  max-height: calc(100% - 44px);
  overflow-y: hidden;

  @media only screen and (max-width: 833px) {
    padding-top: 50px;
    padding-left: 48px;
    padding-right: 48px;
  }
`;

export const SubMenuInner = styled.div<Type>`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  padding: 40px 22px 84px 22px;
  position: relative;
  opacity: 0;
  transition: opacity 0.12s cubic-bezier(0.4, 0, 0.6, 1), background-color 20ms cubic-bezier(.4,0,.6,1);

  ${(props) =>
    props.name === "cart"
      ? `
    flex-direction: column;
      `
      : `
  `};

/* ${(props) =>
    props.isVisible
    ? css`
      
        `
      : css`

          .SubMenuInner {
            opacity: 0;
            transition: opacity 0.15s cubic-bezier(0.4, 0, 0.6, 1);
            z-index: 1;
          }
        `}; */

  .submenu-search-wrap {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: calc(100% + 15px);
    height: 2.3529411765em;

    button {
      display: flex;
      position: relative;
      margin-inline-start: -6px;
      fill: rgb(134, 134, 139);
      order: -1;
      transition: fill .32s cubic-bezier(.4,0,.6,1);
      padding: 0;
    }

    input {
      font-size: 24px;
      line-height: 1.1666666667;
      font-weight: 600;
      letter-spacing: .009em;
      position: relative;
      z-index: 1;
      margin-inline-start: -30px;
      margin-inline-end: -31px;
      padding-inline-start: 34px;
      padding-inline-end: 34px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      border-radius: 0;
      color: #e8e8ed;
      line-height: 1;
    }

    input:focus {
      /* border: none; */
      outline: none;
    }
  }

.search-inner {
  transition: color 20ms cubic-bezier(.4,0,.6,1), background-color 20ms cubic-bezier(.4,0,.6,1), fill 20ms cubic-bezier(.4,0,.6,1);
}

  .search-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #e8e8ed;
  }

  .search-list:hover {
    .search-text {
      color: #ffffff;
    }
    .search-icon {
      fill: #ffffff;
    }
    background-color: rgb(29, 29, 31);
  }
  
.search-li {
  padding: 0;
}

.search-bottom {
  margin-top: 32px;
}

  .search-icon, .search-text {
    transition: color 20ms cubic-bezier(.4,0,.6,1), , fill 20ms cubic-bezier(.4,0,.6,1);
  }


  @media only screen and (max-width: 833px) {
    padding: 0;
    flex-wrap: wrap;
    height: auto;

    /* :last-child {
      padding-bottom: 92px;
    } */

      .submenu-search-wrap {


    button {
      margin-inline-start: -8px;
        width: 2.2352941176em;
        height: 2.2352941176em;
        span {
          display: flex;
        }
    }

    input {
      font-size: 28px;
        font-weight: 600;
    }
  }
  }
`;

// 메뉴 리스트 전체
export const SubMenuList = styled.div<Type>`
  --nav-group-count: 1;
  --nav-group-total: ${(props) => props.grouptotal};
  --nav-group-number: ${(props) => props.number};
  --nav-group-delay: min(
    (var(--nav-group-count) * 80ms) + ((var(--nav-group-number) - var(--nav-group-count)) * 40ms),
    var(--nav-group-number) * 80ms
  );

  &.main, &.sub {
    padding-inline-end: 88px;
  }

  &.cart {
    display: flex;
    flex-direction: row;
  }

  .top-wrap {
    display: flex;
    width: 100%;

    .left {
      flex-basis: 50%;
    }
  
    .right {
      flex-basis: 50%;
      text-align: right;

      a {
      }
    }
  }


  &.search-list-wrap {
    width: 100%;
  }

  ${(props) =>
    props.isVisible
    ? css`
      .search-list-wrap {
        opacity: 1;
        transition-duration: 0.32s;
        transition-delay: 0s;
      }
        `
    : css`
      .search-list-wrap {
        opacity: 0;
        transition-duration: 0.32s
        transition-delay: 0s;
      }
        `};


  @media only screen and (max-width: 833px) {

    &.cart {
      display: flex;
      flex-direction: column;
    }

    & > div.left {
      width: 50%;
    }

    & > div.right {
      margin-top: 20px;
      width: 385px;
    }

    &:first-child {
      flex: 100%;
    }

    &.main {
      flex-basis: 75%;
    }

    &.sub {
      max-width: 50%;
    }
  }
`;

const SubMenuLink = styled(Link)`
  display: flex;
`;

export const SubMenuListItem = styled.ul<Type>`
  display: inline-block;

  svg {
    fill: #86868b;
  }

  @media only screen and (max-width: 833px) {
    display: block;
    padding-bottom: 52px;

    &.cart {
      max-width: 30%;
    }
  }
`;

export const SubMenuText = styled.h2<Type>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  display: block;
  color: #86868b;
  font-size: 12px;
  font-weight: 400;
  transition-property: opacity, transform;

  &.main {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 12px;
  }

  ${(props) =>
    props.isVisible
      ? css`
          opacity: 1;
          transform: translateY(0px);
          transition-duration: 0.32s;
          transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms + 0.1s);
        `
      : css`
          opacity: 0;
          transform: translateY(-4px);
          transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
          transition-delay: 0s;
        `};

  &.cart-main-h2 {
    color: ${(props) => props.theme.navSub};
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
    user-select: none;
  }

  &.cart-profile-text {
    padding-bottom: 6px;
    margin-top: 36px;
  }

  @media only screen and (max-width: 833px) {
    font-size: 17px;
    font-weight: 400;
    margin: 10px 0;

    &.main {
      font-size: 16px;
      margin-bottom: 15px;
    }

    &.cart-profile-text {
      margin-top: 56px;
      padding-bottom: 7px;
  }

    ${(props) =>
      props.isVisible
        ? css`
            opacity: 1;
            transform: translateY(0px);
            transition-duration: 0.32s;
            transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms + 0.1s);
          `
        : css`
            opacity: 0;
            transform: translateY(-4px);
            transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
            transition-delay: 0s;
          `};
  }
`;

// 메뉴 리스트 낱개
export const SubMenuLi = styled.div<Type>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  color: #86868b;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0;
  transition-property: opacity, transform;
  
  &.cart-profile {
    margin: 10px 0;
  }

  &.cart-profile:hover {
    svg {
      fill: #fff;
    }
  }

  ${(props) =>
    props.isVisible
      ? css`
          & {
            opacity: 1;
            transform: translateY(0px);
            transition-duration: 0.32s;
            transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms + 0.1s);
          }

          &.search-delay {
            opacity: 1;
            transform: translateY(0px);
            transition-duration: 0.32s;
            transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms + 0.2s);
          }
        `
      : css`
          & {
            opacity: 0;
            transform: translateY(-4px);
            transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
            transition-delay: 0s;
          }
        `};

  &.a {
    display: flex;
    align-items: center;
    cursor: pointer;

    // 장바구니 아이콘
    & > svg {
      fill: #6e6e73;
    }
  }

  &.sub {
    font-size: 12px;
    font-weight: 600;
  }

  &.cart-h2 {
    padding: 0;
  }

  &.cart-profile {
    padding: 0;
    display: flex;
    align-items: center;
  }

  &.cart {
    padding: 0;
    padding-bottom: 24px;
  }

  &.cart:last-child {
    padding-bottom: 0;
  }

  @media only screen and (max-width: 833px) {
    display: flex;
    padding: 3px 0px 4px;
    font-size: 17px;
    font-weight: 600;

    &.cart {
      width: 100%;
    }

    &.cart-profile {
      margin: 12px 0;
      cursor: pointer;

      svg {
        width: 16px;
        height: 25px;
      }
    }

    &.search-list {
      margin: 8px 0;

      svg {
        width: 16px;
        height: 25px;
      }
    }
  }
`;

export const SubMenuName = styled.span<Type>`
  color: ${(props) => props.theme.navText};
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: ${(props) => props.theme.navMainHover};
  }

  &.main {
    font-size: 25px;
    font-weight: 600;
  }

  &.cart {
    font-size: 11px;
    color: #86868b;
  }

  &.cart .login, &.cart .shopping {
    cursor: pointer;
    color: #2997ff;
    text-decoration: underline;
  }

  &.cart-name {
    padding-left: 10px;
    color: ${(props) => props.theme.navSub};
  }

  @media only screen and (max-width: 833px) {

    &.main {
      font-size: 26px;
      font-weight: 700;
      padding-top: 7px;
      padding-bottom: 7px;
    }

    &.subtext {
      font-size: 16px;
      font-weight: 700;
      padding-top: 7px;
      padding-bottom: 7px;
    }

    &.cart {
    font-size: 17px;
    font-weight: 400;
  }

  &.cart-name {
    padding-left: 15px;
  }
  }
`;

export const SubList = styled.li<Type>``;

export const ContainerUlBtn = styled.div<Type>``;

export const CartWrap = styled.div`
  width: 1024px;
  min-height: 300px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 84px;
`;

export const CartUl = styled.div``;
export const CartLi = styled.div``;
export const Blur = styled.div<Type>`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;

  ${(props) =>
    props.boolean
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
      /* z-index: 3; */
    }
  }
`;

// 네비게이션 장바구니 탭
const NavCart = {
  H2: styled.h2`
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 600;
    letter-spacing: 0.009em;
    margin-bottom: 24px;
    color: ${(props) => props.theme.cartText};
  `,
  NameWrap: styled.div`
    display: flex;
  `,
  ImageWrap: styled.div`
    display: flex;
    align-items: center;

    width: 64px;
    height: 64px;

    img {
      width: 100%;
    }
  `,
  ItemWrap: styled.div``,
  Count: styled.div`
    margin-left: 3px;
    color: ${(props) => props.theme.cartCountText};
  `,
  Item: styled.div``,
  Link: styled(Link)`
    --cart-button-background: ${(props) => props.theme.navCartBtnBG};
    --cart-button-color: ${(props) => props.theme.navSub};

    display: inline-flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    padding: 1px 8px 1px 2px;
  `,
  Name: styled.span`
    --nav-item-number: 1;
    font-size: 12px;
    font-weight: 600;
    padding-left: 24px;
    color: ${(props) => props.theme.cartText};
    max-width: 392px;
  `,
  Button: styled(Link)`
    background: ${(props) => props.theme.navCartBtnBG};
    color: ${(props) => props.theme.navCartBtn};
    padding: 8px 16px;
    border-radius: 980px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.1764805882;
    height: 36px;

    &:hover {
      background: ${(props) => props.theme.navCartBtnBGHover};
      color: white;
    }
  `,

  // 프로필

  ProfileLink: styled(Link)`
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    color: #6e6e73;
  `,
};

const NavMobileMenu = {
  Wrap: styled.div<Type>`
    display: none;

    @media only screen and (max-width: 833px) {
      display: block;
      width: 48px;
      z-index: 3;
      margin: 0;
      position: absolute;
      inset-inline-end: max(0px, -16px);
    }
  `,
  Btn: styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    opacity: 0.8;
    width: 48px;
    height: 48px;
    cursor: pointer;
    outline-offset: -7px;
    transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1), color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

    & > svg > polyline {
      stroke: ${(props) => props.theme.navText};
      transition: stroke 0.32s cubic-bezier(0.4, 0, 0.6, 1);
    }

    &:hover {
      & > svg > polyline {
        stroke: ${(props) => props.theme.navMainHover};
      }
    }

    @media only screen and (max-width: 833px) {
    }
  `,
};

const FooterWrap = styled.div`
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  background-color: ${(props) => props.theme.footerBG};

  * {
    font-size: 1em;
    font-weight: inherit;

    a:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.footerLinkColor};
    }
  }
`;

const FooterInner = styled.div`
  margin: 0 auto;
  padding: 0 22px;
  max-width: 1024px;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-around;
  padding-top: 20px;
  letter-spacing: -0.01em;
  height: 380px;
  gap: 15px;

  // footer 부분 세로로 전환하기
  @media only screen and (max-width: 833px) {
    & {
      gap: 0;
      flex-direction: column;
      height: auto;
    }
  }
`;

const Column = styled.div<Type>`
  @media only screen and (min-width: 833px) {
    ${(props) => {
      switch (props.name) {
        case "Apple 지갑":
          return css``;
        case "엔터테인먼트":
          return css`
            flex-grow: 1;
          `;
        case "Apple Store":
          return css`
            height: 280px;
          `;
        case "교육":
          return css`
            height: 150px;
          `;
        // case "Apple의 가치관":
        case "Apple 정보":
          return css``;
        default:
          return "";
      }
    }}
  }

  @media only screen and (max-width: 833px) {
    width: 100%;
  }
`;

const ColumnSection = styled.div`
  &:not(:first-child) {
    padding-top: 24px;
  }

  @media only screen and (max-width: 833px) {
    &:not(:first-child) {
      padding-top: 0px;
    }
  }
`;

// footer 제목
const ColumnTitle = styled.button<Type>`
  color: ${(props) => props.theme.footerDirectoryTitleColor};
  font-weight: 600;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.footerBG};
  border: none;
  padding: 0;

  @media only screen and (max-width: 833px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
    margin-bottom: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.footerBorderColor};
  }
`;

const FooterArrow = {
  Wrap: styled.div<Type>`
    display: none;
    /* position: absolute; */
    /* top: 0; */
    /* right: 0; */
    z-index: 3;

    @media only screen and (max-width: 833px) {
      & {
        display: block;

        ${(props) =>
          props.isFooterShow
            ? css`
                // inset-inline-end: 10px;
              `
            : `

        `};
      }
    }
  `,
  Btn: styled.span`
    background-color: transparent;
    border: none;
    width: 11px;
    height: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    & > svg > polyline {
      stroke: ${(props) => props.theme.footerDirectoryTitleColor};
      transition: stroke 0.32s cubic-bezier(0.4, 0, 0.6, 1);
    }

    /* &:hover {
      & > svg > polyline {
        stroke: ${(props) => props.theme.navMainHover};
      }
    } */

    @media only screen and (max-width: 833px) {
      & {
        /* display: block; */
      }
    }
  `,
};

const ColumnTitleText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const SectionUl = styled.ul<Type>`
  @media only screen and (max-width: 833px) {
    & {
      display: none;
      position: relative;
      padding-top: 10px;
      transform: translateY(-50px);

      ${(props) =>
        props.name === props.selectedFooterName
          ? css`
              display: flex;
              flex-direction: column;
              padding-left: 15px;
              animation: ${SectionUlAnimationOpen} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
            `
          : css`
              display: none;
              animation: ${SectionUlAnimationClose} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
            `};
    }
  }
`;

// footer 내용
const SectionList = styled.li<Type>`
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SectionLink = styled.a`
  color: ${(props) => props.theme.footerLinkColor};
`;

const FooterBottom = styled.div`
  padding-top: 34px;

  @media only screen and (max-width: 833px) {
    display: flex;
    flex-direction: column;
  }
`;

const FooterShop = styled.div`
  color: ${(props) => props.theme.footerTextColor};
  margin-bottom: 7px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.footerBorderColor};

  a {
    color: ${(props) => props.theme.footerShopLinkColor};
  }

  a:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.footerShopLinkColor};
  }
`;

const FooterLocale = styled.div`
  float: right;
  margin-top: 5px;
  position: relative;
  top: -3px;
  white-space: nowrap;

  @media only screen and (max-width: 833px) {
    display: block;
    width: 100%;
    float: left;
  }
`;

const FooterLocaleLink = styled.div`
  color: ${(props) => props.theme.footerLinkColor};
`;

const FooterLegal = styled.div`
  position: relative;
  top: -3px;
  display: flex;

  @media only screen and (max-width: 833px) {
    flex-direction: column;
  }
`;

const LegalCopyright = styled.div`
  color: ${(props) => props.theme.footerTextColor};
  margin-right: 30px;
  float: left;
  margin-top: 5px;
  list-style-type: none;
`;

const FooterSeller = styled.div`
  padding-bottom: 20px;
  color: #999;
  font-size: 11px;
`;

const LegalLinks = styled.ul`
  position: relative;
  top: -5px;
  margin-inline-start: 0;
  margin-right: 30px;
  float: left;
  margin-top: 5px;
  list-style-type: none;
`;

const LegalLinkItem = styled.li`
  color: ${(props) => props.theme.footerTextColor};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    height: 10px;
    width: 1px;
    background-color: ${(props) => props.theme.footerPipeColor};
    margin: 3px 0;
  }

  margin-right: 7px;
  display: inline-block;
  margin-top: 5px;
`;

const LegalLink = styled.a`
  color: ${(props) => props.theme.footerLinkColor};
  padding-right: 10px;
  display: inline-block;
  white-space: nowrap;
`;

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = sessionStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : null;
  });

  const [cookies, setCookie] = useCookies(["userjwt"]);

  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null); // 카테고리 클릭시 퀵메뉴
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const [categoryList, setCategoryList] = useState<ColumnType[]>([]);
  const [modifyTime, setModifyTime] = useState(null);

  const [navCart, setNavCart] = useState<cartListType[]>();

  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [isSubCateShow, setIsSubCateShow] = useState<boolean>(false); // 하단 메뉴 켜기/닫기
  const [isSearch, setIsSearch] = useState<boolean>(false); // 검색 메뉴 켜기/닫기
  const [isCart, setIsCart] = useState<boolean>(false); // 카트 메뉴 켜기/닫기
  const [selectedCateName, setSelectedCateName] = useState<string>(""); // 선택된 카테고리

  const [isMobile, setIsMobile] = useState<boolean>(false); // 모바일
  const [isNavFirstMenuShow, setIsNavFirstMenuShow] = useState<boolean | null>(null); // 모바일 메뉴 1번째 탭
  const [isNavSecondMenuShow, setIsNavSecondMenuShow] = useState<boolean | null>(null); // 모바일 메뉴 2번째 탭

  // footer columns
  const [selectedFooterName, setSelectedFooterName] = useState<string>(""); // footer 선택된 이름
  const submenu = useRef<(HTMLDivElement | null)[]>([]);
  const submenuInnerRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHome = !!location.pathname.match(/^\/shop\/?$/);

  // 일반 NavTab
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputSearchRef = useRef<(HTMLInputElement | null)>(null);

  useEffect(() => {
    if (isSearch) {
      inputSearchRef.current?.focus();
    }
  }, [isSearch]);

  // 모바일 전환시 초기화
  useEffect(() => {
    resetMobileSubMenu();
  }, [isMobile]);

  useEffect(() => {
    const savedDarkMode = sessionStorage.getItem("darkMode");
    setIsDarkMode(savedDarkMode ? JSON.parse(savedDarkMode) : null);
  }, [isHome]);

  useEffect(() => {
    if (isDarkMode && isHome) {
      document.body.classList.add("header-dark");
    } else {
      document.body.classList.remove("header-dark");
    }

    return () => {
      document.body.classList.remove("header-dark");
    };
  }, [isDarkMode, isHome]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 833);
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        // 세션 스토리지에서 데이터를 가져옵니다.
        const savedCategoryList = sessionStorage.getItem("categoryList");
        const savedModifyTime = sessionStorage.getItem("sessionTime");
        const savedDarkMode = sessionStorage.getItem("darkMode");

        // 서버로부터 최신 데이터 가져오기
        const res = await axios.post("/smartstore/shop", {
          withCredentials: true,
        });

        if (res.data) {
          const { category, time, cart } = res.data;
          const shop = category.find((list) => list.name === "전체상품");

          // 세션 스토리지에 저장된 modifyTime이 서버의 modifytime과 일치하지 않으면 업데이트
          if (!savedModifyTime || JSON.parse(savedModifyTime).modifytime !== time.modifytime) {
            console.log("세션 시간과 서버 시간이 다르므로 최신화");

            // 상태 업데이트
            setCategoryList(category);
            setModifyTime(time);
            setNavCart(cart);

            // 다크모드 값 설정
            if (shop && shop.darkMode !== undefined && isHome) {
              setIsDarkMode(shop.darkMode);
              sessionStorage.setItem("darkMode", JSON.stringify(shop.darkMode));
            }

            // 세션 스토리지에 업데이트된 데이터 저장
            sessionStorage.setItem("categoryList", JSON.stringify(category));
            sessionStorage.setItem("sessionTime", JSON.stringify(time));
          } else {
            // 서버와 세션 시간이 동일한 경우, 세션 스토리지에서 데이터 사용
            console.log("세션 스토리지에서 데이터 사용");

            if (savedCategoryList) {
              setCategoryList(JSON.parse(savedCategoryList));
            }

            if (savedModifyTime) {
              setModifyTime(JSON.parse(savedModifyTime));
            }

            if (savedDarkMode && isHome) {
              setIsDarkMode(JSON.parse(savedDarkMode));
            }

            setNavCart(cart);
          }
        }
      } catch (err) {
        console.log("데이터 가져오기에 실패했습니다.", err);
      }
    };

    initializeData();
  }, []);
  
  // useEffect(() => {
  //   const userData = async () => {
  //     try {
  //       const res = await axios.post("/smartstore/shop", {
  //         withCredentials: true,
  //       });

  //       if (res.data) {
  //         const { category, time, cart } = res.data;
  //         const shop = category.find((list) => list.name === "전체상품");
  //         console.log(res.data);
  //         console.log(modifyTime);

  //         if (shop && isHome) {
  //           // 메인에서만 다크모드 반영
  //           if (modifyTime && time.modifytime === modifyTime.modifytime) {
  //             console.log("세션스토리지에서 다크모드 값 사용");
  //             const savedDarkMode = sessionStorage.getItem("darkMode");
  //             setIsDarkMode(savedDarkMode ? JSON.parse(savedDarkMode) : null);
  //           } else {
  //             console.log("서버에서 다크모드 값 수정 및 세션 반영");
  //             setIsDarkMode(shop.darkMode);
  //             sessionStorage.setItem("darkMode", JSON.stringify(shop.darkMode));
  //           }
  //         }


  //         if (time.modifytime !== modifyTime.modifytime) {
  //           console.log("세션 시간과 서버 시간이 다르므로 최신화");
  //           setCategoryList(category);
  //           setModifyTime(time);

  //           sessionStorage.setItem("categoryList", JSON.stringify(category));
  //           sessionStorage.setItem("sessionTime", JSON.stringify(time));
  //         }

  //         setNavCart(cart);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   userData();
  // }, [cookies]);

  // PC 초기화
  const resetSubMenu = () => {
    setIsSubCateShow(false);
    setIsCart(false);
    setIsSearch(false);
    setSelectedCateName("");
  };

  // 모바일 초기화
  const resetMobileSubMenu = () => {
    setIsSubCateShow(false);
    setIsCart(false);
    setIsSearch(false);
    setIsNavFirstMenuShow(null);
    setIsNavSecondMenuShow(null);
    setSelectedCateName("");
  };

  // 모바일 메뉴에서 휠스크롤 숨기기 및 우측 padding 계산
  useEffect(() => {
    if (isMobile && isSubCateShow) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const pageY = window.pageYOffset;

      document.body.setAttribute("scrollY", pageY.toString());
      document.documentElement.style.paddingInlineEnd = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";

      document.body.style.overflow = "hidden";
      if (isHome) {
        document.body.style.position = "relative";
        document.body.style.top = "0px";
        document.body.style.left = "0px";
        document.body.style.right = "0px";
      }
    } else {
      document.documentElement.style.paddingInlineEnd = "0";
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("left");
      document.body.style.removeProperty("right");
      document.body.style.removeProperty("bottom");
    }

    return () => {
      document.body.style.overflow = "visible";
      document.documentElement.style.overflow = "visible";
    };
  }, [isHome, isMobile, isSubCateShow]);

  // 833px 이하 모바일 전환
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 페이지 이동 할때마다 모바일 메뉴 초기화
  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;

    resetSubMenu();
    resetMobileSubMenu();
  }, [location]);

  // PC전용 - 서브 메뉴가 내려와 있을때 브라우저로 나갔을 경우 height를 0으로 변경합니다.
  useEffect(() => {
    const blowserOut = (e: any) => {
      console.log("브라우저 바깥으로 나가면 서브메뉴 높이 초기화");
      // 모바일 => PC 전환시 모바일 초기화.
      if (!isMobile) resetMobileSubMenu();
    };
    document.addEventListener("mouseleave", blowserOut);
    return () => {
      document.removeEventListener("mouseleave", blowserOut);
    };
  }, [isSubCateShow, isMobile]);

  // 로그인, 로그아웃
  const account = {
    // 로그인
    login: (e) => {
      e.preventDefault();
      navigate("./login", { state: { from: location.pathname } });
    },

    // 로그아웃
    logOut: async (e) => {
      e.preventDefault();
      // removeCookie("userjwt", { path: '/' });

      try {
        const res = await axios.post("/smartstore/user/logout");

        if (res.data.status) {
          document.cookie = "userjwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.reload();
        } else {
          console.error("로그아웃 요청 실패");
        }
      } catch (error) {
        console.error("로그아웃 요청 중 에러:", error);
      }
    },
  };

  // 태블릿에서는 모바일 형태가 아닌 PC화면으로 출력 되므로 onMouseEnter가 작동하지 않는다.
  // 대신 한번 클릭시 SubMenu가 열리고, 다시 클릭하면 해당 URL로 이동한다.
  const MouseClick = (url: string) => {
    if (isSubCateShow) {
      resetSubMenu();
      navigate(`./${url}`);
      return
    }
  };

  // navTab에 마우스가 들어갔을때 해당 메뉴명을 등록합니다.
  const subMenuOpen = useCallback(
    (e: any, name: string, index: number) => {
      e.stopPropagation();
      // console.log("subMenuOpen");

      if (submenuInnerRef.current && submenuInnerRef.current[index]) {
        const newHeight = (submenuInnerRef.current[index]?.offsetHeight || 0) + 44;
        setCurrentHeight(newHeight);
      }

      if (name === "search") {
        setIsSearch(true);
        setIsCart(false);
        setIsSubCateShow(true);
        setSelectedCateName(name);
        return;
      }

      if (name === "cart") {
        setIsSearch(false);
        setIsCart(true);
        setIsSubCateShow(true);
        setSelectedCateName(name);
        return;
      }

      setIsSubCateShow(true);
      setSelectedCateName(name);

      if (isMobile && name !== "search" && name !== "cart") {
        setIsNavSecondMenuShow(true);
        setIsNavFirstMenuShow(null);
      }
    },
    [isMobile, isNavFirstMenuShow]
  );

  const timerMouseEnter = useCallback(
    (e, name, index) => {
      e.stopPropagation();
      // console.log("NavTab에 마우스 진입");

      if ((!isMobile && name === "search" && isSubCateShow) || (!isMobile && name === "cart" && isSubCateShow)) {
        return;
      }

      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (isMobile) {
        subMenuOpen(e, name, index);
      } else {
        timer.current = setTimeout(() => {
          subMenuOpen(e, name, index);
        }, 100);
      }
    },
    [isMobile, isSubCateShow, subMenuOpen]
  );

  const timerMouseLeave = useCallback((e: any) => {
    e.stopPropagation();
    // console.log("timerMouseLeave");

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    timer.current = setTimeout(() => {
      if (e.relatedTarget && e.relatedTarget.classList) return;
      if (e.relatedTarget && e.relatedTarget.classList && e.relatedTarget?.classList.contains("NavFlex"))
        return;

      resetSubMenu();
    }, 50);
  }, []);

  // 서브메뉴가 내려와있을때 하단으로 나갔을 경우 height를 0으로 변경합니다.
  const subMenuClose = (e: any, name: any) => {
    e.stopPropagation();
    // console.log("subMenuClose");

    if (isMobile) {
      return;
    }

    timer.current = setTimeout(() => {
      if (selectedCateName === name) {
        return;
      }

      setIsSubCateShow(false);
      setIsCart(false);
      setIsSearch(false);
      setSelectedCateName("");
    }, 50);
  };

  // 모바일 뒤로가기 버튼 클릭시
  const NavMenuBackClick = () => {
    setSelectedCateName("menu");
    setIsNavSecondMenuShow(false);
    setIsNavFirstMenuShow(true);
  };

  // 모바일 하단 메뉴 켜기/닫기
  const NavMobileMenuClick = () => {
    // console.log("모바일 메뉴를 눌렀습니다.");

    if (isCart) {
      // 검색 혹은 장바구니를 선택된 상태로 메뉴 클릭시 초기화
      // console.log("모바일 메뉴 isCart");
      setIsSubCateShow(false);
      setIsCart(false);
      return;
    }

    if (isSearch) {
      // console.log("모바일 메뉴 isSearch");
      setIsSubCateShow(false);
      setIsSearch(false);
      return;
    }

    if (isSubCateShow) {
      setIsSubCateShow(false);
      setIsNavFirstMenuShow(null);
      setSelectedCateName("");
    } else {
      setIsSubCateShow(true);
      setIsNavFirstMenuShow(true);
      setSelectedCateName("menu");
    }
    setIsNavSecondMenuShow(null);
  };

  const logo = () => {
    navigate("/shop");
    // window.location.reload();
  }

  // footer 선택
  const SelectFooter = (name: string) => {
    if (name === selectedFooterName) {
      setSelectedFooterName("");
      return;
    }

    setSelectedFooterName(name);
  };

  // 모바일 메뉴 애니메이션
  const animation = {
    open1: {
      points: ["2 12, 16 12", "2 9, 16 9", "3.5 15, 15 3.5"],
    },
    close1: {
      points: ["3.5 15, 15 3.5", "2 9, 16 9", "2 12, 16 12"],
    },
    open2: {
      points: ["2 5, 16 5", "2 9, 16 9", "3.5 3.5, 15 15"],
    },
    close2: {
      points: ["3.5 3.5, 15 15", "2 9, 16 9", "2 5, 16 5"],
    },
  };

  const NavSubMenuList = [
    {
      title: "스토어",
      sections: [
        {
          header: "빠른 링크",
          lists: [
            { name: "매장 찾기", link: "" },
            { name: "주문 상태", link: "" },
            { name: "Apple Trade In", link: "" },
            { name: "할부 방식", link: "" },
            { name: "대학생 프로모션", link: "" },
          ],
        },
        {
          header: "특별 할인 쇼핑하기",
          lists: [
            { name: "인증 리퍼비쉬 제품", link: "" },
            { name: "교육", link: "" },
            { name: "비즈니스", link: "" },
          ],
        },
      ],
    },
    {
      title: "Mac",
      sections: [
        {
          header: "Mac 쇼핑하기",
          lists: [
            { name: "Mac 쇼핑하기", link: "" },
            { name: "Mac 액세서리", link: "" },
            { name: "Apple Trade In", link: "" },
            { name: "할부 방식", link: "" },
            { name: "대학생 프로모션", link: "" },
          ],
        },
        {
          header: "그 외 Mac 관련 항목",
          lists: [
            { name: "Mac 지원", link: "" },
            { name: "Mac을 위한 AppleCare+", link: "" },
            { name: "macOS Sonoma", link: "" },
            { name: "Apple이 만든 앱", link: "" },
            { name: "연속성", link: "" },
            { name: "iCloud+", link: "" },
            { name: "Mac과 비즈니스", link: "" },
            { name: "교육", link: "" },
          ],
        },
      ],
    },
    {
      title: "iPad",
      sections: [
        {
          header: "iPad 쇼핑하기",
          lists: [
            { name: "iPad 쇼핑하기", link: "" },
            { name: "iPad 액세서리", link: "" },
            { name: "Apple Trade In", link: "" },
            { name: "할부 방식", link: "" },
            { name: "대학생 프로모션", link: "" },
          ],
        },
        {
          header: "그 외 iPad 관련 항목",
          lists: [
            { name: "iPad 지원", link: "" },
            { name: "iPad 위한 AppleCare+", link: "" },
            { name: "iPadOS 17", link: "" },
            { name: "Apple이 만든 앱", link: "" },
            { name: "연속성", link: "" },
            { name: "iCloud+", link: "" },
            { name: "교육", link: "" },
          ],
        },
      ],
    },
    {
      title: "iPhone",
      sections: [
        {
          header: "iPhone 쇼핑하기",
          lists: [
            { name: "iPhone 쇼핑하기", link: "" },
            { name: "iPhone 액세서리", link: "" },
            { name: "Apple Trade In", link: "" },
            { name: "할부 방식", link: "" },
          ],
        },
        {
          header: "그 외 iPhone 관련 항목",
          lists: [
            { name: "iPhone 지원", link: "" },
            { name: "iPhone 위한 AppleCare+", link: "" },
            { name: "iOS 17", link: "" },
            { name: "Apple이 만든 앱", link: "" },
            { name: "iPhone의 개인 정보 보호", link: "" },
            { name: "iCloud+", link: "" },
            { name: "Apple 지갑, Apple Pay", link: "" },
            { name: "Siri", link: "" },
          ],
        },
      ],
    },
    {
      title: "Watch",
      sections: [
        {
          header: "Watch 쇼핑하기",
          lists: [
            { name: "Apple Watch 쇼핑하기", link: "" },
            { name: "Apple Watch Studio", link: "" },
            { name: "Apple Watch 밴드", link: "" },
            { name: "Apple Watch 액세서리", link: "" },
            { name: "Apple Trade In", link: "" },
            { name: "할부 방식", link: "" },
          ],
        },
        {
          header: "그 외 Watch 관련 항목",
          lists: [
            { name: "Apple Watch 지원", link: "" },
            { name: "AppleCare+", link: "" },
            { name: "watchOS 10", link: "" },
            { name: "Apple이 만든 앱", link: "" },
          ],
        },
      ],
    },
    {
      title: "AirPods",
      sections: [
        {
          header: "AirPods 쇼핑하기",
          lists: [
            { name: "AirPods 쇼핑하기", link: "" },
            { name: "AirPods 액세서리", link: "" },
          ],
        },
        {
          header: "그 외 AirPods 관련 항목",
          lists: [
            { name: "AirPods 지원", link: "" },
            { name: "헤드폰을 위한 AppleCare+", link: "" },
            { name: "Apple Music", link: "" },
          ],
        },
      ],
    },
    {
      title: "TV 및 홈",
      sections: [
        {
          header: "TV 및 홈 쇼핑하기",
          lists: [
            { name: "Apple TV 4K 쇼핑하기", link: "" },
            { name: "Siri Remote 쇼핑하기", link: "" },
            { name: "TV 및 홈 액세서리", link: "" },
          ],
        },
        {
          header: "그 외 TV 및 홈 관련 항목",
          lists: [
            { name: "Apple TV 지원", link: "" },
            { name: "AppleCare+", link: "" },
            { name: "Apple TV 앱", link: "" },
            { name: "Apple TV+", link: "" },
            { name: "홈 앱", link: "" },
            { name: "Apple Music", link: "" },
            { name: "Siri", link: "" },
            { name: "AirPlay", link: "" },
          ],
        },
      ],
    },
    {
      title: "엔터테인먼트",
      sections: [
        {
          header: "지원",
          lists: [
            { name: "Apple TV+ 지원", link: "" },
            { name: "Apple Music 지원", link: "" },
          ],
        },
      ],
    },
    {
      title: "액세서리",
      sections: [
        {
          header: "액세서리 살펴보기",
          lists: [
            { name: "Apple 제작 정품", link: "" },
            { name: "Beats by Dr. Dre", link: "" },
            { name: "AirTag", link: "" },
          ],
        },
      ],
    },
  ];

  const footerArrowMove = {
    open1: {
      points: ["10.075 0.675 5.5 5.323 0.925 0.675", "10.075 3 5.5 3 0.925 3", "10.075 5.325 5.5 0.676 0.925 5.325"],
    },
    close1: {
      points: ["10.075 5.325 5.5 0.676 0.925 5.325", "10.075 3 5.5 3 0.925 3", "10.075 0.675 5.5 5.323 0.925 0.675"],
    },
  };

  const footerArray = [
    {
      title: "쇼핑 및 알아보기",
      sections: [
        { name: "스토어", link: "" },
        { name: "Mac", link: "" },
        { name: "iPad", link: "" },
        { name: "iPhone", link: "" },
        { name: "Watch", link: "" },
        { name: "AirPods", link: "" },
        { name: "TV 및 홈", link: "" },
        { name: "AirTag", link: "" },
        { name: "액세서리", link: "" },
      ],
    },
    {
      title: "Apple 지갑",
      sections: [
        { name: "지갑", link: "" },
        { name: "Apple Pay", link: "" },
      ],
    },
    {
      title: "계정",
      sections: [
        { name: "Apple ID 관리", link: "" },
        { name: "Apple Store 계정", link: "" },
        { name: "iCloud.com", link: "" },
      ],
    },
    {
      title: "엔터테인먼트",
      sections: [
        { name: "Apple One", link: "" },
        { name: "Apple TV+", link: "" },
        { name: "Apple Music", link: "" },
        { name: "Apple Arcade", link: "" },
        { name: "Apple Podcasts", link: "" },
        { name: "Apple Books", link: "" },
        { name: "App Store", link: "" },
      ],
    },
    {
      title: "Apple Store",
      sections: [
        { name: "매장 찾기", link: "" },
        { name: "Genius Bar", link: "" },
        { name: "Today at Apple", link: "" },
        { name: "Apple 캠프", link: "" },
        { name: "Apple Store 앱", link: "" },
        { name: "인증 리퍼비쉬 제품", link: "" },
        { name: "Apple Trade In", link: "" },
        { name: "할부 방식", link: "" },
        { name: "주문 상태", link: "" },
        { name: "쇼핑 도움말", link: "" },
      ],
    },
    {
      title: "비즈니스",
      sections: [
        { name: "Apple과 비즈니스", link: "" },
        { name: "비즈니스를 위한 제품 쇼핑하기", link: "" },
      ],
    },
    {
      title: "교육",
      sections: [
        { name: "Apple과 교육", link: "" },
        { name: "초중고용 제품 쇼핑하기", link: "" },
        { name: "대학 생활을 위한 제품 쇼핑하기", link: "" },
      ],
    },
    {
      title: "Apple의 가치관",
      sections: [
        { name: "손쉬운 사용", link: "" },
        { name: "교육", link: "" },
        { name: "환경", link: "" },
        { name: "개인정보 보호", link: "" },
        { name: "협력업체에 대한 책임", link: "" },
      ],
    },
    {
      title: "Apple 정보",
      sections: [
        { name: "Newsroom", link: "" },
        { name: "Apple 리더십", link: "" },
        { name: "채용 안내", link: "" },
        { name: "윤리 및 규정 준수", link: "" },
        { name: "이벤트", link: "" },
        { name: "일자리 창출", link: "" },
        { name: "Apple 연락처", link: "" },
      ],
    },
  ];

  const renderSubMenu = (list, sections) => {
    return sections.map((section, sectionidx) => (
      <SubMenuList className="SubMenuList sub" number={sectionidx + 1} grouptotal={3} key={sectionidx}>
        <SubMenuText className="SubMenuText main" number={1} total={list.taskIds.length + 1} isVisible={isSubCateShow}>
          {section.header}
        </SubMenuText>
        <SubMenuListItem className="SubMenuListItem">
          {section.lists.map((sectionlist, sectionListIdx) => (
            <SubMenuLi
              key={sectionListIdx}
              className="SubMenuLi sub"
              name={list.name}
              selectedCateName={selectedCateName}
              number={sectionListIdx + 1}
              isVisible={isSubCateShow}
              total={list.taskIds.length + 1}
            >
              <SubMenuName className="subtext">{sectionlist.name}</SubMenuName>
            </SubMenuLi>
          ))}
        </SubMenuListItem>
      </SubMenuList>
    ));
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <MainWrap className="MainWrap">
        <NavHeight className="NavHeight" isHome={isHome} isDarkMode={isDarkMode}>
          <NavInner className="NavInner" isHeight={isSubCateShow}>
            <NavMenuBack className="NavMenuBack" onClick={NavMenuBackClick} isNavSecondMenuShow={isNavSecondMenuShow}>
              <button>
                <Icons.NavMenuBack></Icons.NavMenuBack>
              </button>
            </NavMenuBack>
            <NavFlex className="NavFlex">
              {/* 로고 */}
              <NavTabLogo className="NavTabLogo" onClick={logo} onMouseEnter={(e: any) => subMenuClose(e, "logo")}>
                <NavTabLink className="NavTabLink applelogo iconwrap" key={0} name={"test"} isVisible={isSubCateShow}>
                  <span className="AppleLogo AppleLogo-medium">
                    <Icons.ApplelogoMedium></Icons.ApplelogoMedium>
                  </span>
                  <span className="AppleLogo AppleLogo-large">
                    <Icons.ApplelogoLarge></Icons.ApplelogoLarge>
                  </span>
                </NavTabLink>
              </NavTabLogo>
              <NavTabMenuWrap
                className="NavTab-Menu-Wrap"
                name={"menu"}
                isVisible={isSubCateShow}
                selectedCateName={selectedCateName}
                isNavSecondMenuShow={isNavSecondMenuShow}
              >
                <NavTabMenu className="NavTab-Menu" isVisible={isSubCateShow}>
                  {categoryList.map((list: any, index: number) => {
                    const customStyles: CSSProperties & { [key: string]: string | number } = {
                      "--nav-item-number": index,
                      "--nav-item-total": categoryList.length,
                    };
                    if (list.navHide) return null;
                    return (
                      <NavTabWrap className="NavTabWrap" key={index} isVisible={isSubCateShow} style={customStyles}>
                        <NavTab
                          className="NavTab"
                          name={list.name}
                          isVisible={isSubCateShow && selectedCateName === "menu"}
                          isNavSecondMenuShow={isNavSecondMenuShow}
                          onClick={isMobile ? (e) => timerMouseEnter(e, list.name || "", index) : () => MouseClick(list.url || "")}
                          onMouseEnter={
                            isMobile
                              ? undefined
                              : (e) => {
                                  timerMouseEnter(e, list.name || "", index);
                                }
                          }
                          onMouseLeave={isMobile ? undefined : (e) => timerMouseLeave(e)}
                        >
                          <NavTabLink className="NavTabLink category" isVisible={isSubCateShow}>
                            <span className="NavTabLink-text">{list.name}</span>
                            <NavTabArrow className="NavTabArrow">
                              <Icons.NavTabArrow></Icons.NavTabArrow>
                            </NavTabArrow>
                          </NavTabLink>
                        </NavTab>
                        <SubMenu
                          className="SubMenu"
                          height={currentHeight}
                          isSubCateShow={isSubCateShow}
                          isVisible={selectedCateName === list.name}
                          name={list.name}
                          selectedCateName={selectedCateName}
                          isNavFirstMenuShow={isNavFirstMenuShow}
                          isNavSecondMenuShow={isNavSecondMenuShow && selectedCateName === list.name}
                          ref={(el) => (submenu.current[index] = el)}
                        >
                          <SubMenuHeight className="SubMenuHeight">
                            <SubMenuInner
                              className="SubMenuInner"
                              isSubCateShow={isSubCateShow}
                              isVisible={selectedCateName === list.name}
                              ref={(el) => (submenuInnerRef.current[index] = el)}
                            >
                              <SubMenuList className="SubMenuList main" number={0} grouptotal={3}>
                                <SubMenuText className="SubMenuText main" number={1} total={list.taskIds.length + 1} isVisible={isSubCateShow}>
                                  {list.name}&nbsp;살펴보기
                                </SubMenuText>
                                <SubMenuListItem className="SubMenuListItem">
                                  {list.taskIds.map((taskId: any, index2: number) => {
                                    if (taskId.navHide) return null;
                                    return (
                                      <SubMenuLi
                                        key={taskId._id}
                                        className="SubMenuLi"
                                        name={list.name}
                                        selectedCateName={selectedCateName}
                                        number={index2 + 2}
                                        isVisible={isSubCateShow}
                                        total={list.taskIds.length + 1}
                                      >
                                        <SubMenuLink
                                          to={taskId.subTaskIds && taskId.subTaskIds.length > 0 ? `./${taskId.url}` : `./products/${taskId.url}`}
                                        >
                                          <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                        </SubMenuLink>
                                      </SubMenuLi>
                                    );
                                  })}
                                </SubMenuListItem>
                              </SubMenuList>
                              {NavSubMenuList.map((sublist) => {
                                if (list.name === sublist.title) {
                                  return renderSubMenu(list, sublist.sections);
                                }
                                return null;
                              })}
                            </SubMenuInner>
                          </SubMenuHeight>
                        </SubMenu>
                      </NavTabWrap>
                    );
                  })}
                </NavTabMenu>
              </NavTabMenuWrap>
              {/* 검색 */}
              <NavTabLogo
                className="NavTab-Right"
                name={"search"}
                isVisible={isSubCateShow}
                onClick={(e: any) => timerMouseEnter(e, "search", categoryList.length)}
                onMouseEnter={(e: any) => subMenuClose(e, "search")}
                onMouseLeave={isMobile ? undefined : (e) => timerMouseLeave(e)}
              >
                <NavTabLink className="NavTabLink iconwrap" key={0} name={"search"} isVisible={isSubCateShow}>
                  <span className="Search Search-medium">
                    <Icons.SearchMedium></Icons.SearchMedium>
                  </span>
                  <span className="Search Search-large">
                    <Icons.SearchLarge></Icons.SearchLarge>
                  </span>
                </NavTabLink>
                <SubMenu
                  className="SubMenu"
                  height={currentHeight}
                  isVisible={isSubCateShow && selectedCateName === "search"}
                  isSubCateShow={isSubCateShow}
                >
                  <SubMenuHeight className="SubMenuHeight">
                    <SubMenuInner className="SubMenuInner search-inner" isVisible={isSubCateShow && selectedCateName === "search"} ref={(el) => (submenuInnerRef.current[categoryList.length] = el)}>
                      <SubMenuList className="SubMenuList search-list-wrap" number={0} grouptotal={1}>
                        <SubMenuLi className="SubMenuLi search-li search-delay" isVisible={isSearch} number={0} total={6}>
                          <div className="submenu-search-wrap">
                            <button>
                              <span>
                              <svg width="38" height="40" viewBox="0 0 38 40" xmlns="http://www.w3.org/2000/svg"><path d="m28.6724 27.8633-5.07-5.07c-.0095-.0095-.0224-.0122-.032-.0213a7.9967 7.9967 0 1 0 -1.8711 1.7625c.0254.03.0357.0681.0642.0967l5.07 5.07a1.3 1.3 0 0 0 1.8389-1.8379zm-18.0035-10.0033a6.5447 6.5447 0 1 1 6.545 6.5449 6.5518 6.5518 0 0 1 -6.545-6.5449z"></path></svg>
                              </span>
                            </button>
                            <input type="text" ref={inputSearchRef} className="submenu-search-input" placeholder="검색" />
                          </div>
                        </SubMenuLi>
                        <div className="search-bottom">
                          <SubMenuLi className="SubMenuLi search-delay" isVisible={isSearch} number={1} total={6}>
                            빠른 링크
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi search-list search-delay" isVisible={isSearch} number={2} total={6}>
                            <div className="search-inner">
                            <span className="search-icon">
                                <svg height="16" viewBox="0 0 9 16" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.6124 8.1035-2.99 2.99a.5.5 0 0 1 -.7071-.7071l2.1366-2.1364h-6.316a.5.5 0 0 1 0-1h6.316l-2.1368-2.1367a.5.5 0 0 1 .7071-.7071l2.99 2.99a.5.5 0 0 1 .0002.7073z"></path></svg>
                            </span>
                              <SubMenuName className="SubMenuName">
                              Apple Store Online에서 쇼핑하기
                              </SubMenuName>
                            </div>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi search-list search-delay" isVisible={isSearch} number={3} total={6}>
                          <div className="search-inner">
                          <span className="search-icon">
                              <svg height="16" viewBox="0 0 9 16" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.6124 8.1035-2.99 2.99a.5.5 0 0 1 -.7071-.7071l2.1366-2.1364h-6.316a.5.5 0 0 1 0-1h6.316l-2.1368-2.1367a.5.5 0 0 1 .7071-.7071l2.99 2.99a.5.5 0 0 1 .0002.7073z"></path></svg>
                            </span>
                            <SubMenuName className="SubMenuName">
                            액세서리
                            </SubMenuName>
                          </div>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi search-list search-delay" isVisible={isSearch} number={4} total={6}>
                          <div className="search-inner">
                            <span className="search-icon">
                                <svg height="16" viewBox="0 0 9 16" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.6124 8.1035-2.99 2.99a.5.5 0 0 1 -.7071-.7071l2.1366-2.1364h-6.316a.5.5 0 0 1 0-1h6.316l-2.1368-2.1367a.5.5 0 0 1 .7071-.7071l2.99 2.99a.5.5 0 0 1 .0002.7073z"></path></svg>
                              </span>
                              <SubMenuName className="SubMenuName">
                              AirPods
                              </SubMenuName>
                          </div>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi search-list search-delay" isVisible={isSearch} number={5} total={6}>
                            <div className="search-inner">
                              <span className="search-icon">
                                  <svg height="16" viewBox="0 0 9 16" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.6124 8.1035-2.99 2.99a.5.5 0 0 1 -.7071-.7071l2.1366-2.1364h-6.316a.5.5 0 0 1 0-1h6.316l-2.1368-2.1367a.5.5 0 0 1 .7071-.7071l2.99 2.99a.5.5 0 0 1 .0002.7073z"></path></svg>
                                </span>
                                <SubMenuName className="SubMenuName">
                                AirTag
                                </SubMenuName>
                            </div>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi search-list search-delay" isVisible={isSearch} number={6} total={6}>
                          <div className="search-inner">
                            <span className="search-icon">
                                <svg height="16" viewBox="0 0 9 16" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.6124 8.1035-2.99 2.99a.5.5 0 0 1 -.7071-.7071l2.1366-2.1364h-6.316a.5.5 0 0 1 0-1h6.316l-2.1368-2.1367a.5.5 0 0 1 .7071-.7071l2.99 2.99a.5.5 0 0 1 .0002.7073z"></path></svg>
                              </span>
                              <SubMenuName className="SubMenuName">
                              Apple Trade In
                              </SubMenuName>
                          </div>
                          </SubMenuLi>
                        </div>
                      </SubMenuList>
                    </SubMenuInner>
                  </SubMenuHeight>
                </SubMenu>
              </NavTabLogo>
              {/* 장바구니 */}
              <NavTabLogo
                className="NavTab-Right"
                name={"cart"}
                isVisible={isSubCateShow}
                onClick={(e: any) => timerMouseEnter(e, "cart", categoryList.length + 1)}
                onMouseEnter={(e: any) => subMenuClose(e, "cart")}
                onMouseLeave={isMobile ? undefined : (e) => timerMouseLeave(e)}
              >
                <NavTabLink key={0} className="NavTabLink iconwrap" name={"cart"} isVisible={isSubCateShow}>
                  <span className="Cart Cart-medium">
                    <Icons.CartMedium></Icons.CartMedium>
                  </span>
                  <span className="Cart Cart-large">
                    <Icons.CartLarge></Icons.CartLarge>
                  </span>
                  {navCart && navCart.length >= 1 && (
                    <Badge className="Badge">
                      <BadgeNumber className="BadgeNumber">{navCart && navCart.length}</BadgeNumber>
                    </Badge>
                  )}
                </NavTabLink>
                <SubMenu
                  className="SubMenu"
                  height={currentHeight}
                  isVisible={isSubCateShow && selectedCateName === "cart"}
                  isSubCateShow={isSubCateShow}
                >
                  <SubMenuHeight className="SubMenuHeight">
                    <SubMenuInner
                      className="SubMenuInner"
                      name={"cart"}
                      selectedCateName={selectedCateName}
                      ref={(el) => (submenuInnerRef.current[categoryList.length + 1] = el)}
                    >
                      <SubMenuList className="SubMenuList" number={0} grouptotal={1}>

                      {navCart && navCart.length !== 0 ? (
                          <>
                            <div className="top-wrap">
                              <div className="left">
                                <SubMenuText className="SubMenuText cart-h2" isVisible={isCart} number={0} total={7}>
                                  <NavCart.H2 className="cart-main-h2">장바구니</NavCart.H2>
                                </SubMenuText>
                                {navCart &&
                                  navCart.map((cart: any, index: number) => {
                                    if (index < 3) {
                                      return (
                                        <SubMenuText key={index} className="SubMenuText cart" isVisible={isCart} number={index + 1} total={7}>
                                          <NavCart.Link to={""} className="NavCart.Link">
                                            <NavCart.ImageWrap className="">
                                              <img src={cart.mainImage} alt="" />
                                            </NavCart.ImageWrap>
                                            <NavCart.NameWrap>
                                              <NavCart.Name className="NavCart.Name">{cart.name} </NavCart.Name>
                                              <NavCart.Count className="NavCart-Count"> {cart.count}</NavCart.Count>
                                            </NavCart.NameWrap>
                                          </NavCart.Link>
                                        </SubMenuText>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })}
                                {navCart.length > 3 && (
                                  <SubMenuText className="SubMenuText" isVisible={isCart} number={4} total={7}>
                                    <div className="globalnav-flyout-item ac-gn-bagview-message">
                                      <span className="ac-gn-bagview-message-text">장바구니에 제품이 1개 더 있음</span>
                                    </div>
                                  </SubMenuText>
                                )}
                              </div>
                              <div className="right">
                                <SubMenuText
                                  className="SubMenuText cart"
                                  number={navCart.length >= 4 ? 5 : navCart.length + 1}
                                  total={7}
                                  isVisible={isCart}
                                >
                                  <NavCart.Button to={"./cart"} className="cartcheck">
                                    장바구니 확인
                                  </NavCart.Button>
                                </SubMenuText>
                              </div>
                            </div>
                        </>
                      ) : (
                        <>
                          <SubMenuText className="SubMenuText cart-main-h2" isVisible={isCart} number={0} total={7}>
                            장바구니가 비어 있습니다.
                          </SubMenuText>
                          <SubMenuText className="SubMenuText cart-login" isVisible={isCart} number={1} total={7}>
                            {cookies.userjwt ? (
                                  <SubMenuName className="cart">
                                    <a className="shopping">
                                    지금 쇼핑하기
                                    </a>
                                  </SubMenuName>
                            ) : (
                              <SubMenuName className="cart">
                                저장해둔 항목이 있는지 확인하려면
                                <a className="login" onClick={account.login}>
                                  &nbsp;로그인&nbsp;
                                </a>
                                하세요.
                              </SubMenuName>
                            )}
                          </SubMenuText>
                        </>
                      )}
                        <SubMenuText className="SubMenuText cart-profile-text" isVisible={isCart} number={2} total={7}>
                          내 프로필
                        </SubMenuText>
                        <SubMenuListItem className="SubMenuListItem cart">
                          <SubMenuLi className="SubMenuLi cart-profile" isVisible={isCart} number={3} total={7}>
                            <NavCart.ProfileLink to={cookies.userjwt ? "./orderlist" : "./usersign"} className="profile">
                              <Icons.Order></Icons.Order>
                              <SubMenuName className="cart-name">주문</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi cart-profile" isVisible={isCart} number={4} total={7}>
                            <NavCart.ProfileLink to={""} className="profile">
                              <Icons.Favorite></Icons.Favorite>
                              <SubMenuName className="cart-name">관심목록</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi cart-profile" isVisible={isCart} number={5} total={7}>
                            <NavCart.ProfileLink to={cookies.userjwt ? "./account" : "./usersign"} className="profile">
                              <Icons.Account />
                              <SubMenuName className="cart-name">계정</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi cart-profile" isVisible={isCart} number={6} total={7}>
                            {!cookies.userjwt ? (
                              <NavCart.ProfileLink to="./login" className="profile">
                                <Icons.Login />
                                <SubMenuName className="cart-name" onClick={account.login}>
                                  로그인
                                </SubMenuName>
                              </NavCart.ProfileLink>
                            ) : (
                              <NavCart.ProfileLink to={""} onClick={account.logOut}>
                                <Icons.Login />
                                <SubMenuName className="cart-name">{user.name}&nbsp;로그아웃</SubMenuName>
                              </NavCart.ProfileLink>
                            )}
                          </SubMenuLi>
                          <SubMenuLi className="SubMenuLi cart-profile" isVisible={isCart} number={7} total={7}>
                            <NavCart.ProfileLink to="../" className="profile">
                              <Icons.Adminpage />
                              <SubMenuName className="cart-name">관리자 페이지</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                        </SubMenuListItem>
                      </SubMenuList>
                    </SubMenuInner>
                  </SubMenuHeight>
                </SubMenu>
              </NavTabLogo>
            </NavFlex>
            {/* 모바일 메뉴 버튼 */}
            <NavMobileMenu.Wrap className="NavTabMobileMenu" onClick={NavMobileMenuClick}>
              <NavMobileMenu.Btn className="NavMobileMenu-Btn">
                <motion.svg width="18" height="18" viewBox="0 0 18 18">
                  <motion.polyline
                    variants={animation}
                    initial="close1"
                    animate={isSubCateShow ? "open1" : "close1"}
                    transition={{ duration: 0.24 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="NavMobileMenu-buttom"
                  />
                  <motion.polyline
                    variants={animation}
                    initial="close2"
                    animate={isSubCateShow ? "open2" : "close2"}
                    transition={{ duration: 0.24 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="NavMobileMenu-top"
                  />
                </motion.svg>
              </NavMobileMenu.Btn>
            </NavMobileMenu.Wrap>
          </NavInner>
        </NavHeight>
        <Blur className="Blur" boolean={isSubCateShow} onMouseEnter={(e: any) => subMenuClose(e, "blur")}></Blur>
        {!isHome && <div className="placeholder"></div>}
        <Routes>
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/products/:id" element={<Products categoryList={categoryList} setNavCart={setNavCart} isMobile={isMobile} />} />
          <Route path="/products/*" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
          <Route
            path="/:id"
            element={
              <Category
                categoryList={categoryList}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/login" element={<Login setNavCart={setNavCart} setCookie={setCookie} />} />
          <Route path="/cart" element={<Cart navCart={navCart} setNavCart={setNavCart} />} />
          <Route path="/fulfillment" element={<Fulfillment />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/account" element={<Account logOut={account.logOut} />} />
          <Route path="/orderlist" element={<OrderList logOut={account.logOut} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/ordersdetail" element={<OrdersDetail />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/review" element={<Review />} />
          <Route path="/finish" element={<Finish setNavCart={setNavCart} />} />
          <Route path="usersign" element={<Usersign />} />
        </Routes>
        <FooterWrap className="FooterWrap">
          <FooterInner className="FooterInner">
            <Columns className="Columns">
              {footerArray.map((list: any, index: number) => (
                <Column key={index} className="Column" name={list.title}>
                  <ColumnSection className="ColumnSection">
                    <ColumnTitle className="ColumnTitle" onClick={() => SelectFooter(list.title)}>
                      <ColumnTitleText>{list.title}</ColumnTitleText>
                      <FooterArrow.Wrap>
                        <FooterArrow.Btn>
                          <motion.svg width="11" height="6" viewBox="0 0 11 6">
                            <motion.polyline
                              variants={footerArrowMove}
                              initial="close1"
                              animate={list.title === selectedFooterName ? "open1" : "close1"}
                              transition={{ duration: 0.24 }}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </FooterArrow.Btn>
                      </FooterArrow.Wrap>
                    </ColumnTitle>
                    <SectionUl name={list.title} selectedFooterName={selectedFooterName}>
                      {list.sections.map((list2: any, index2) => (
                        <SectionList key={index2}>
                          <SectionLink>{list2.name}</SectionLink>
                        </SectionList>
                      ))}
                    </SectionUl>
                  </ColumnSection>
                </Column>
              ))}
            </Columns>
            <FooterBottom>
              <FooterShop>다양한 쇼핑 방법: Apple Store를 방문하거나, 리셀러를 찾아보거나, 080-330-8877번으로 전화하세요.</FooterShop>
              <FooterLocale>
                <FooterLocaleLink>대한민국</FooterLocaleLink>
              </FooterLocale>
              <FooterLegal>
                <LegalCopyright className="ac-gf-footer-legal-copyright">Copyright © 2023 Apple Inc. 모든 권리 보유.</LegalCopyright>
                <LegalLinks className="ac-gf-footer-legal-links">
                  <LegalLinkItem className="ac-gf-footer-legal-links-item">
                    <LegalLink className="ac-gf-footer-legal-link" href="">
                      개인정보 처리방침
                    </LegalLink>
                  </LegalLinkItem>
                  <LegalLinkItem className="ac-gf-footer-legal-links-item">
                    <LegalLink className="ac-gf-footer-legal-link" href="">
                      웹 사이트 이용 약관
                    </LegalLink>
                  </LegalLinkItem>
                  <LegalLinkItem className="ac-gf-footer-legal-links-item">
                    <LegalLink className="ac-gf-footer-legal-link" href="">
                      판매 및 환불
                    </LegalLink>
                  </LegalLinkItem>
                  <LegalLinkItem className="ac-gf-footer-legal-links-item">
                    <LegalLink className="ac-gf-footer-legal-link" href="">
                      법적 고지
                    </LegalLink>
                  </LegalLinkItem>
                  <LegalLinkItem className="ac-gf-footer-legal-links-item">
                    <LegalLink className="ac-gf-footer-legal-link" href="">
                      사이트 맵
                    </LegalLink>
                  </LegalLinkItem>
                </LegalLinks>
              </FooterLegal>
              <FooterSeller>
                <span>사업자등록번호 : 120-81-84429 | </span>
                <span>통신판매업신고번호 : 제 2011-서울강남-00810호 | </span>
                <span>대표이사 : PETER DENWOOD | </span>
                <span>주소 : 서울 특별시 강남구 영동대로 517 | </span>
                <span>대표전화 : 02-6712-6700 | </span>
                <span>팩스 : 02-6928-0000</span>
              </FooterSeller>
            </FooterBottom>
          </FooterInner>
        </FooterWrap>
      </MainWrap>
    </ThemeProvider>
  );
}

export default Shop;
