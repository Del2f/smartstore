import axios from "../../api/axios";
import styled, { ThemeProvider, css, keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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

let currentPath = "";

const navRate = (props) => props.theme.navRate;
const navVisibleRate = (props) => props.theme.navVisibleRate;
const navColorRate = (props) => props.theme.navColorRate;

// 스마트폰 화면
const navMobileRate = (props) => props.theme.navMobileRate;
const navMobileVisibleRate = (props) => props.theme.navMobileVisibleRate;
const navMobileColorRate = (props) => props.theme.navMobileColorRate;

interface SubListType {}
interface ContainerUlBtnType {
  number: number;
}
interface BlurType {
  boolean: boolean;
}

interface NavWrapType {
  isSubCateShow: boolean;
}

interface NavHeightType {
  height?: string;
  isSubCateShow?: boolean;
  selectedCateName?: string;
}

interface NavMenuBackType {
  isNavSecondMenuShow: boolean;
}

interface NavTabMenuType {
  isSubCateShow?: boolean;
  isNavFirstMenuShow?: boolean;
  isNavSecondMenuShow?: boolean;
}

interface NavTabType {
  name?: string;
  selectedCateName?: string;
  number?: number;
  isSubCateShow?: boolean;
  total?: number;
  isMobile?: boolean;
  isNavFirstMenuShow?: boolean;
  isNavSecondMenuShow?: boolean;
}

interface NavTabLinkType {}

interface NavTabTextType {
  name: string;
  selectedCateName: string;
  isSubCateShow: boolean;
}

interface SubMenuType {
  name: string;
  height: string;
  selectedCateName: string;
  isSubCateShow: boolean;
  isNavFirstMenuShow?: boolean;
  isNavSecondMenuShow?: boolean;
}

interface SubMenuHeightType {
  height: string;
  isSubCateShow?: boolean;
  isNavSecondMenuShow?: boolean;
}

interface SubMenuInnerType {
  name: string;
  selectedCateName: string;
}

interface SubMenuListType {
  number: number;
  grouptotal: number;
}

interface SubMenuListItemType {}

interface SubMenuTextType {
  isSubCateShow: boolean;
  number: number;
  total: number;
}

interface SubMenuLiType {
  number: number;
  total: number;
  name: string;
  selectedCateName: string;
  isSubCateShow: boolean;
  isNavSecondMenuShow?: boolean;
}

interface SubMenuNameType {}

export interface GmIdType {
  id: string;
}


const NavHeightWrap = styled.div<NavHeightType>`
  height: 48px;
`

export const NavHeight = styled.div<NavHeightType>`
  --nav-height-rate: ${navRate};
  --nav-visibility-rate: ${navVisibleRate};
  --nav-background-color-rate: ${navColorRate};

  --nav-mobile-height-rate: ${navMobileRate};
  --nav-mobile-visibility-rate: ${navMobileVisibleRate};
  --nav-mobile-background-color-rate: ${navMobileColorRate};

  width: 100%;
  position: absolute;
  height: 48px;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  backdrop-filter: saturate(180%) blur(20px);

  ${(props) =>
    props.isSubCateShow
      ? css`
          background: ${(props) => props.theme.navSubBG};
          height: ${props.height};
          transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1), visibility var(--nav-visibility-rate) step-start,
            background var(--nav-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1);
        `
      : css`
          background: ${(props) => props.theme.navBG};
          height: 44px;
          transition: height var(--nav-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.12s, visibility var(--nav-visibility-rate) step-end 0.12s,
            background var(--nav-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 0.15s;
        `};

  @media only screen and (max-width: 833px) {
    & {
      /* position: fixed; */
      /* top: 0; */
      /* width: 100%; */
      /* z-index: 4; */
      /* background-color: var(--nav-background-color); */
      /* display: flex;
      flex-direction: column;
      overflow: scroll;
      z-index: 3;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; */
    }

    ${(props) =>
      props.isSubCateShow &&
      css`
        /* opacity: 1; */
        background: ${(props) => props.theme.navSubBG};
        height: 100dvh;
        overflow-x: hidden;
        overflow-y: scroll;
        transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
          /* opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 0.1s, */ background
            var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
      `}

    ${(props) =>
      !props.isSubCateShow &&
      css`
        /* opacity: 0; */
        background: ${(props) => props.theme.navBG};
        height: 48px;
        transition: height var(--nav-mobile-height-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms,
          opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 200ms,
          background var(--nav-mobile-background-color-rate) cubic-bezier(0.4, 0, 0.6, 1) 80ms;
      `}

    & .NavTab-Menu-li {
      width: 100%;
      justify-content: flex-start;
      padding: 3px 48px 4px;
    }
  }
`;

interface mainwrap {
  isMobile: boolean;
  isSubCateShow: boolean;
}

export const MainWrap = styled.div<mainwrap>`
  // 메인에서는 nav바가 상단 고정.
  .NavWrap-home {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  // 메인을 제외한 모든 페이지는 상단 고정이 되지 않음.
  .NavWrap {
    position: relative;
  }

  @media only screen and (max-width: 833px) {
    & {
      min-height: 0px;
      max-height: none;
    }
  }
`;

export const NavWrap = styled.div<NavWrapType>`
  /* display: flex; */
  /* justify-content: center; */
  z-index: 6;
  width: 100%;
  /* background-color: ${(props) => props.theme.navBG}; */

`;

interface NavInner {
  isSubCateShow: boolean;
  isHome: RegExpMatchArray | null;
}

export const NavInner = styled.div<NavInner>`
  font-size: 11px;
  max-width: 1024px;
  width: 100%;
  padding: 0 22px;
  margin: 0 auto;
  /* z-index: 4; */
  /* background-color: ${(props) => props.theme.navBG}; */

  &.NavTabMobileMenu {
    display: none;
  }

  @media only screen and (max-width: 833px) {
    & {
      display: flex;
      position: absolute;
      width: 100%;
      top: 0;
      padding: 0;

      ${(props) =>
        props.isSubCateShow && props.isHome &&
        css`
          /* padding-inline-end: 17px; */
        `}
    }

    &.NavTabMobileMenu {
      display: flex;
      z-index: 6;
    }
  }
`;

interface NavFlexType {
  isSubCateShow: boolean;
}

export const NavFlex = styled.ul<NavFlexType>`
  display: flex;
  align-items: center;
  width: 100%;

  justify-content: space-between;

  @media only screen and (max-width: 833px) {
    & {
      height: 48px;
    }

    .NavTab-Logo {
      flex-grow: 1;
      justify-content: flex-start;
    }

    ${(props) =>
      props.isSubCateShow &&
      css`
        opacity: 0;
        visibility: hidden;
        transition: 
          opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1),
          visibility ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1) 0.6s;
      `}

    ${(props) =>
      !props.isSubCateShow &&
      css`
        opacity: 1;
        visibility: visible;
        transition: opacity ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1),
          visibility ${(props) => props.theme.navMobileOpacityRate} cubic-bezier(0.4, 0, 0.6, 1);
      `}
  }
`;

export const NavLogo = styled.div<NavTabType>`
  display: none;

  @media only screen and (max-width: 833px) {
    & {
      display: block;
    }
  }

  svg {
    fill: ${(props) => props.theme.navMain};
    transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  }

  svg:hover {
    fill: ${(props) => props.theme.navMainHover};
  }
`;

const NavTabMenuWrap = styled.div<NavTabType>`
  --nav-mobile-height-rate: ${navMobileRate};

  position: absolute;
  width: 100%;
  top: 0;
  z-index: 4;

  overflow: hidden;

  @media only screen and (min-width: 834px) {
    & {
      display: contents;
    }
  }

  @media only screen and (max-width: 833px) {
    & {
      height: 100%;

      ${(props) =>
        props.isNavFirstMenuShow
          ? css`
              visibility: visible;
              transition: visibility var(--nav-mobile-height-rate) step-start;
            `
          : css`
              visibility: hidden;
              transition: visibility var(--nav-mobile-height-rate) step-end;
            `}
    }
  }
`;

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

// 모바일 - 메뉴 뒤로가기
const NavMenuBack = styled.div<NavMenuBackType>`
  display: none;

  @media only screen and (max-width: 833px) {
    position: absolute;
    display: block;
    width: 48px;
    height: 48px;
    pointer-events: auto;
    z-index: 6;
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
            transition: visibility 0.24s step-start;
            pointer-events: auto;
            animation: ${NavMenuBackOpen} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;
          `
        : css`
            visibility: hidden;
            transition: visibility 0.24s step-end;
            animation: ${NavMenuBackClose} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;
          `}
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
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-20px);
  }
`;

export const NavTabMenu = styled.div<NavTabMenuType>`
  --nav-height-rate: ${navRate};
  --nav-mobile-visibility-rate: ${navMobileVisibleRate};
  --nav-background-color-rate: ${navColorRate};

  svg {
    fill: ${(props) => props.theme.navMain};
    transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  }

  svg:hover {
    fill: ${(props) => props.theme.navMainHover};
  }

  @media only screen and (min-width: 834px) {
    & {
      display: contents;
    }
  }

  // 모바일 첫번째 메뉴 li 전체
  @media only screen and (max-width: 833px) {
    & {
      background-color: transparent;
      z-index: 5;
      padding-top: 50px;
      padding-bottom: 84px;
      position: relative;
      height: auto;
    }

    & .NavTab-Menu-li {
      width: 100%;
      justify-content: flex-start;
      padding: 3px 48px 4px;
    }
  }
`;

const NavTabSubMenuWrap = styled.div`
  
`

const NavTabWrap = styled.div<NavTabMenuType>`
  z-index: 1;

  @media only screen and (max-width: 833px) {
    width: 100%;
    background-color: transparent;
    height: auto;

    ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            /* z-index: 3; */
            /* visibility: hidden; */
            animation: ${NavTabMenuAnimationOut} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
            /* opacity: 0; */
            /* transform: translateX(-20px); */
            /* transition-duration: 0.3s; */
          `
        : css`
            /* z-index: 5; */
            /* visibility: visible; */
            animation: ${NavTabMenuAnimationIn} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
            /* opacity: 1; */
            /* transform: translateX(0px); */
            /* transition-duration: 0.3s; */
          `}
  }
`;

export const NavTab = styled.li<NavTabType>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative; */
  cursor: pointer;
  height: 44px;
  z-index: 1;

  // 모바일
  @media only screen and (max-width: 833px) {
    & {
      height: 100%;
    }

    ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            /* visibility: hidden; */
            /* z-index: 3; */
            /* animation: ${NavTabMenuAnimationOut} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both; */
            /* opacity: 0; */
            /* transform: translateX(-20px); */
            /* transition-duration: 0.3s; */
          `
        : css`
            /* z-index: 5; */
            /* visibility: visible; */
            /* animation: ${NavTabMenuAnimationIn} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both; */
            /* opacity: 1; */
            /* transform: translateX(0px); */
            /* transition-duration: 0.3s; */
          `}

    &.NavTab-Menu-li {
      /* transition-property: opacity, transform, visibility; */
      /* transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1), cubic-bezier(0.4, 0, 0.6, 1), step-start; */
      /* transition-delay: calc(.2s + (var(--nav-item-number) * 20ms));
      transition-duration: .24s; */
    }

    &:hover {
      .NavTabText {
        color: ${(props) => props.theme.navMainHover};
      }
    }

    // 처음 메뉴 열릴때
    ${(props) =>
      props.isNavFirstMenuShow
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
          `}

    &.NavTab-Right {
      width: 48px;
    }
  }

  // 애플, 검색, 장바구니 아이콘
  svg {
    fill: ${(props) => props.theme.navMain};
    transition: fill 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  }

  svg:hover {
    fill: ${(props) => props.theme.navMainHover};
  }
`;

export const NavTabLink = styled(Link)<NavTabLinkType>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &.search {
    pointer-events: none;
  }

  @media only screen and (max-width: 833px) {
    & {
      pointer-events: none;
    }
  }
`;

export const NavTabText = styled.span<NavTabTextType>`
  color: ${(props) => props.theme.navMain};
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  white-space: nowrap;

  &.cart {
    position: relative;
  }

  ${(props) =>
    props.selectedCateName === props.name
      ? `
    color: ${props.theme.navMainHover};
    `
      : `
  `};

  .AppleLogo-medium {
    display: block;
  }

  .AppleLogo-large {
    display: none;
  }

  .Search-medium {
    display: block;
  }

  .Search-large {
    display: none;
  }

  .Cart-medium {
    display: block;
  }

  .Cart-large {
    display: none;
  }

  @media only screen and (max-width: 833px) {
    & {
      font-size: 26px;
      font-weight: 700;
      padding-top: 7px;
      padding-bottom: 7px;
    }



    .AppleLogo {
      padding: 0 16px;
    }

    .AppleLogo-medium {
      display: none;
    }

    .AppleLogo-large {
      display: block;
    }

    .Search-medium {
      display: none;
    }

    .Search-large {
      display: block;
    }

    .Cart-medium {
      display: none;
    }

    .Cart-large {
      display: block;
    }
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

// 모바일 메뉴 화살표
const NavTabArrow = styled.span<NavTabType>`
  display: none;

  svg {
    visibility: hidden;
  }

  @media only screen and (max-width: 833px) {
    & {
      display: flex;
      align-items: center;
      height: 40px;
      position: relative;
      margin-top: -1px;
      margin-inline-end: -48px;
      padding-inline-end: 19px;
      opacity: 0;
      color: ${(props) => props.theme.navSub};
      transform-origin: center;
      animation: ${arrowhoverout} 0.24s cubic-bezier(0.4, 0, 0.6, 1) both;

      svg {
        visibility: visible;
        position: absolute;
        right: 0;
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
  left: 13px;
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
  z-index: 2;
  user-select: none;
`;

const SubMenuAnimationIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(20px);
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
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(20px);
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

// PC - 상단 메뉴
// 모바일 - 두번째 메뉴
// PC는 상단에 노출된 메뉴바가 모바일 첫번째 메뉴 목록이다.
// 메뉴바에 hover시 등장하는 메뉴 목록은 모바일 두번째 메뉴 목록이다.
export const SubMenu = styled.div<SubMenuType>`
  --nav-height-rate: ${navRate};
  --nav-visibility-rate: ${navVisibleRate};
  --height: ${(props) => props.height};

  margin-top: 44px;
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  cursor: default;
  transition-property: opacity, visibility;

  ${(props) =>
    props.selectedCateName === props.name
      ? css`
          opacity: 1;
          visibility: visible;
          transition-duration: 0.32s;
          transition-delay: 0s;
          pointer-events: auto;
          z-index: 5;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition-duration: 0.32s;
          transition-delay: 0s;
          pointer-events: none;
          z-index: 4;
        `};

  @media only screen and (max-width: 833px) {
    & {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin-top: 0;
      padding-top: 50px;

      ${(props) =>
        props.isNavFirstMenuShow &&
        css`
          animation: ${SubMenuAnimationOut} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
        `};

      ${(props) =>
        props.isNavSecondMenuShow &&
        css`
          animation: ${SubMenuAnimationIn} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
        `}

      ${(props) =>
        !props.isSubCateShow &&
        css`
          animation: ${SubMenuAnimationUp} 0.5s cubic-bezier(0.4, 0, 0.6, 1) both;
        `}
    }
  }
`;

// 상단 메뉴바 높이
export const SubMenuHeight = styled.div<SubMenuHeightType>`
  --height: ${(props) => props.height};
  height: calc(var(--height) - 44px);
  overflow-y: hidden;

  @media only screen and (max-width: 833px) {
    & {
      height: 100%;
      padding-left: 48px;
    }
    // 모바일 메뉴 두번째 페이지
    ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            &.SubMenuHeight {
              opacity: 1;
              transform: translateX(0px);
              transition-duration: 0.6s;
              transition-delay: 0s;
            }
          `
        : css`
            &.SubMenuHeight {
              opacity: 0;
              transform: translateX(0px);
              transition-duration: 0.6s;
              transition-delay: 0s;
            }
          `}

    ${(props) =>
      props.isSubCateShow
        ? css`
            &.SubMenuHeight.firstmenu {
              opacity: 1;
            }
          `
        : css`
            &.SubMenuHeight.firstmenu {
              opacity: 0;
            }
          `}
  }
`;

export const SubMenuInner = styled.div<SubMenuInnerType>`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  height: 100%;
  padding: 40px 22px 84px 22px;
  z-index: 4;
  position: relative;

  ${(props) =>
    props.name === "cart"
      ? `
    flex-direction: column;
      `
      : `
  `};

  @media only screen and (max-width: 833px) {
    padding: 0;
    flex-wrap: wrap;
    height: auto;
  }
`;

// 메뉴 리스트 전체
export const SubMenuList = styled.div<SubMenuListType>`
  --nav-group-count: 1;
  --nav-group-total: ${(props) => props.grouptotal};
  --nav-group-number: ${(props) => props.number};
  --nav-group-delay: min(
    (var(--nav-group-count) * 80ms) + ((var(--nav-group-number) - var(--nav-group-count)) * 40ms),
    var(--nav-group-number) * 80ms
  );

  &.main {
    padding-inline-end: 88px;
  }

  &.cart {
    display: flex;
    flex-direction: row;
  }

  & > div.left {
    width: 50%;
  }

  & > div.right {
    width: 50.5%;
    text-align: right;
    margin-top: -4px;
  }

  @media only screen and (max-width: 833px) {
    &:first-child {
      flex: 100%;
    }
  }
`;

const SubMenuLink = styled(Link)`
  display: flex;
`;

export const SubMenuListItem = styled.ul<SubMenuListItemType>`
  display: inline-block;

  @media only screen and (max-width: 833px) {
    display: block;
    padding-bottom: 52px;
  }
`;

export const SubMenuText = styled.h2<SubMenuTextType>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  display: block;
  color: ${(props) => props.theme.navSubHeader};
  transition-property: opacity, transform;

  &.main {
    font-size: 12px;
    margin-bottom: 12px;
  }

  ${(props) =>
    props.isSubCateShow
      ? css`
          opacity: 1;
          transform: translateY(0px);
          transition-duration: 0.32s;
          transition-delay: calc(var(--nav-group-delay) + 80ms);
        `
      : css`
          opacity: 0;
          transform: translateY(-4px);
          transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
          transition-delay: 0s;
        `};

  &.cart-main-h2 {
    color: ${(props) => props.theme.navSub};
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    user-select: none;
  }

  &.cart-profile-text {
    font-size: 11px;
    padding-bottom: 6px;
    margin-top: 36px;
    color: #6e6e73;
  }

  @media only screen and (max-width: 833px) {
    &.main {
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
`;

// 메뉴 리스트 낱개
export const SubMenuLi = styled.li<SubMenuLiType>`
  --nav-item-number: ${(props) => props.number};
  --nav-item-total: ${(props) => props.total};

  padding: 7px 0;
  transition-property: opacity, transform;

  ${(props) =>
    props.isSubCateShow
      ? css`
          opacity: 1;
          transform: translateY(0px);
          transition-duration: 0.32s;
          transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms);
        `
      : css`
          opacity: 0;
          transform: translateY(-4px);
          transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
          transition-delay: 0s;
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
    width: 480px;
    padding-bottom: 24px;
  }

  &.cart:last-child {
    padding-bottom: 0;
  }

  @media only screen and (max-width: 833px) {
    display: flex;
    padding: 3px 0px 4px;
    height: 100%;

    /* ${(props) =>
      props.isNavSecondMenuShow
        ? css`
            opacity: 1;
            transform: translateX(0px);
            transition-duration: 0.32s;
            transition-delay: calc(var(--nav-group-delay) + var(--nav-item-number) * 20ms + 80ms);
          `
        : css`
            opacity: 0;
            transform: translateX(40px);
            transition-duration: min(0.16s + (20ms * calc(var(--nav-item-total) - var(--nav-item-number))), 0.24s);
            transition-delay: 0s;
          `} */
  }
`;

export const SubMenuName = styled.span<SubMenuNameType>`
  color: ${(props) => props.theme.navMain};
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.navMainHover};
  }

  &.main {
    font-size: 25px;
    font-weight: 600;
  }

  &.cart {
    font-size: 11px;
    color: ${(props) => props.theme.navSub};
  }

  &.login {
    cursor: pointer;
    color: ${(props) => props.theme.navSub};
    text-decoration: underline;
  }

  &.cartprofile {
    font-size: 11px;
    font-weight: 600;
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
  }
`;

export const SubList = styled.li<SubListType>``;

export const ContainerUlBtn = styled.div<ContainerUlBtnType>``;

export const CartWrap = styled.div`
  width: 1024px;
  min-height: 300px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 84px;
`;

export const CartUl = styled.div``;
export const CartLi = styled.div``;
export const Blur = styled.div<BlurType>`
  background: rgba(232, 232, 237, 0.4);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1;

  ${(props) =>
    props.boolean
      ? css`
          opacity: 1;
          visibility: visible;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1) 120ms, visibility 0.4s step-start 120ms;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1) 120ms, visibility 0.4s step-end 120ms;
        `};

  @media only screen and (max-width: 833px) {
    & {
      /* z-index: 3; */
    }
  }
`;

// const cart = css`
//   opacity: 0;
//   transform: translateY(-4px);
//   transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) calc(var(--nav-item-number) * 20ms + ((var(--nav-group-number, 0) + 1) * 80ms)),
//     transform 0.32s cubic-bezier(0.4, 0, 0.6, 1) calc(var(--nav-item-number) * 20ms + ((var(--nav-group-number, 0) + 1) * 80ms));
// `;

// 네비게이션 장바구니 탭
const NavCart = {
  H2: styled.h2`
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 600;
    letter-spacing: 0.009em;
    margin-bottom: 24px;
    color: #333336;
  `,

  ItemWrap: styled.div``,
  Item: styled.div``,
  Link: styled(Link)`
    --cart-button-background: ${(props) => props.theme.navCartBtnBG};
    --cart-button-color: ${(props) => props.theme.navSub};

    display: inline-flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    padding: 1px 8px 1px 2px;

    &.cartcheck {
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
      }
    }
  `,
  Name: styled.span`
    --nav-item-number: 1;
    font-size: 12px;
    font-weight: 600;
    padding-left: 24px;
    color: #333336;
    max-width: 392px;
  `,

  // 프로필

  ProfileLink: styled(Link)`
    display: inline-flex;
    align-items: center;
    margin: 6px 0;
    overflow: hidden;
    color: #6e6e73;
  `,
};

const NavMobileMenu = {
  Wrap: styled.div<NavTabMenuType>`
    display: none;
    /* position: absolute; */
    /* top: 0; */
    /* right: 0; */

    @media only screen and (max-width: 833px) {
      & {
        display: block;

        ${(props) =>
          props.isSubCateShow
            ? css`
                // inset-inline-end: 10px;
              `
            : `

        `};
      }
    }
  `,
  Btn: styled.button`
    background-color: transparent;
    border: none;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    & > svg > polyline {
      stroke: ${(props) => props.theme.navMain};
      transition: stroke 0.32s cubic-bezier(0.4, 0, 0.6, 1);
    }

    &:hover {
      & > svg > polyline {
        stroke: ${(props) => props.theme.navMainHover};
      }
    }

    @media only screen and (max-width: 833px) {
      & {
        /* display: block; */
      }
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

interface FooterColumnType {
  name: string;
}

const Column = styled.div<FooterColumnType>`
  /* flex-basis: 25%; */
  /* flex-basis: 100%; */

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

interface SectionListType {
  name?: string;
  isFooterShow?: boolean;
  selectedFooterName?: string;
}

// footer 제목
const ColumnTitle = styled.button<SectionListType>`
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
  Wrap: styled.div<SectionListType>`
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
  Btn: styled.button`
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

const SectionUl = styled.ul<SectionListType>`
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
const SectionList = styled.li<SectionListType>`
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SectionItem = styled.li`
  display: block;
  pointer-events: auto;

  &:not(:last-child) {
    margin-bottom: 0.8em;
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
    /* border-right: 1px solid  */
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

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // 다크 모드

  // 암호화된 id를 입력.
  const [gmId] = useState<GmIdType>({ id: "thanks6" });
  const [cookies, removeCookie] = useCookies(["userjwt"]);

  // 카테고리 클릭시 퀵메뉴
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const [categoryList, setCategoryList] = useState<ColumnType[]>(() => {
    const savedCategoryList = sessionStorage.getItem("categoryList");
    return savedCategoryList ? JSON.parse(savedCategoryList) : [];
  });

  const [modifyTime, setModifyTime] = useState(() => {
    const savedModifyTime = sessionStorage.getItem("modifyTime");
    return savedModifyTime ? JSON.parse(savedModifyTime) : null;
  });

  const [navCart, setNavCart] = useState<cartListType[]>();

  const [isSubCateShow, setIsSubCateShow] = useState<boolean>(false); // 하단 메뉴 켜기/닫기
  const [selectedCateName, setSelectedCateName] = useState<string>(""); // 선택된 카테고리
  const [height, setHeight] = useState<string>("44px"); // 하단 메뉴 높이 PC전용

  const [isMobile, setIsMobile] = useState<boolean>(false); // 모바일
  const [isNavFirstMenuShow, setIsNavFirstMenuShow] = useState<boolean>(false); // 모바일 메뉴 1번째 탭
  const [isNavSecondMenuShow, setIsNavSecondMenuShow] = useState<boolean>(false); // 모바일 메뉴 2번째 탭

  // console.log("isMobile " + isMobile);
  // console.log("selectedCateName " + selectedCateName);
  console.log("isSubCateShow " + isSubCateShow);
  // console.log("isNavFirstMenuShow " + isNavFirstMenuShow);
  // console.log("isNavSecondMenuShow " + isNavSecondMenuShow);

  // footer columns
  const [selectedFooterName, setSelectedFooterName] = useState<string>(""); // footer 선택된 이름

  const submenu = useRef<HTMLDivElement>(null);

  const isHome = location.pathname.match(/^\/shop\/?$/);

  // 페이지 이동시 카테고리 닫기
  useEffect(() => {
    setHeight("44px");
    setIsSubCateShow(false);
  }, [location]);

  useEffect(() => {
    setIsSubCateShow(false);
    setIsNavFirstMenuShow(false);
    setIsNavSecondMenuShow(false);
  }, [isMobile]);

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
      if(isHome) document.body.style.position = "relative";
      // document.body.style.top = `-${pageY}px`;
      document.body.style.top = "0px";
      document.body.style.left = "0px";
      document.body.style.right = "0px";
      // document.body.style.bottom = "0px";
    } else {
      // document.documentElement.style.paddingRight = "0";
      document.documentElement.style.paddingInlineEnd = "0";

      document.documentElement.style.overflow = "auto";

      document.body.style.overflow = "auto";
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("left");
      document.body.style.removeProperty("right");
      document.body.style.removeProperty("bottom");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isMobile, isSubCateShow]);

  // 833px 이하 모바일 전환
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 833);
    };

    // 컴포넌트가 마운트될 때 한 번 호출
    handleResize();

    // 창 크기 변경 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;

    // 페이지 이동할때마다 모바일 메뉴 초기화
    setIsSubCateShow(false);
    setIsNavFirstMenuShow(false);
    setIsNavSecondMenuShow(false);
    setSelectedCateName("");
  }, [location]);

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.post("/smartstore/shop", gmId, {
          withCredentials: true,
        });
        const newModifyTime = res.data.modifytime;
        console.log(res.data);

        const shop = res.data.category.find(list => list.name === '전체상품');
        if (shop) {
          setIsDarkMode(shop.darkMode);
        }

        if (newModifyTime !== modifyTime) {
          updateCategoryList(res.data.category);
          setModifyTime(newModifyTime);
          sessionStorage.setItem("modifyTime", JSON.stringify(newModifyTime));
        }

        updateCategoryList(res.data.category);
      } catch (err) {
        console.log(err);
      }
    };
    userData();
  }, [gmId]);

  // 임시로 nav 높이 설정. Ref로 높이계산은 실패. length에 곱한 높이를 계산 해야겠음.
  useEffect(() => {
    const categoryHeightMap = {
      스토어: "476px",
      Mac: "552px",
      iPad: "514px",
      iPhone: "476px",
      Watch: "476px",
      AirPods: "414px",
      "TV 및 홈": "358px",
      엔터테인먼트: "490px",
      액세서리: "452px",
      고객지원: "490px",
      search: "388px",
    };

    const defaultHeight = "423px";

    if (selectedCateName === "cart" && navCart) {
      const newHeight = 423 + navCart.length * 60;
      setHeight(`${newHeight}px`);
    } else {
      setHeight(categoryHeightMap[selectedCateName] || defaultHeight);
    }
  }, [selectedCateName, navCart]);

  // PC전용 - 서브 메뉴가 내려와 있을때 브라우저로 나갔을 경우 height를 0으로 변경합니다.
  useEffect(() => {
    const blowserOut = (e: any) => {
      console.log("blowser Out");

      if (!isMobile) {
        setIsSubCateShow(false);
        setIsNavFirstMenuShow(false);
        setIsNavSecondMenuShow(false);
        setSelectedCateName("");
      }
    };
    document.addEventListener("mouseleave", blowserOut);
    return () => {
      document.removeEventListener("mouseleave", blowserOut);
    };
  }, [isSubCateShow]);

  // 로그인, 로그아웃
  const account = {
    // 로그인
    login: () => {
      navigate("./login");
      setHeight("44px");
      setIsSubCateShow(false);
    },

    // 로그아웃
    logOut: () => {
      navigate("/shop");
      removeCookie("userjwt", {
        path: "/",
      });
    },
  };

  const updateCategoryList = (newCategoryList: any) => {
    setCategoryList(newCategoryList);
    sessionStorage.setItem("categoryList", JSON.stringify(newCategoryList));
  };

  // nav tab에 마우스가 들어갔을때 해당 메뉴명을 등록합니다.
  const subMenuOpen = (e: any, name: string) => {
    e.stopPropagation();

    if (name === "search" || name === "cart") {
      // setIsNavFirstMenuShow(true);
    }

    if (isNavFirstMenuShow) {
      setIsNavSecondMenuShow(true);
    }

    setSelectedCateName(name);
    setIsSubCateShow(true);
  };

  // 일반 NavTab
  let timer: ReturnType<typeof setTimeout>;

  // NavTab에 마우스 진입
  const timerMouseEnter = (e: any, name: string) => {
    e.stopPropagation();
    console.log("timerMouseEnter");

    // PC 검색, 장바구니 열린 상태에서 재클릭시 창 닫기.
    if ((name === "search" && isSubCateShow === true) || (name === "cart" && isSubCateShow === true)) {
      setIsSubCateShow(false);
      setSelectedCateName("");
      return;
    }

    if (isMobile) {
      subMenuOpen(e, name);
    } else {
      // 함수 실행후 50ms 안으로 실행.
      timer = setTimeout(() => {
        subMenuOpen(e, name);
      }, 100);
    }
  };

  // NavTab에서 마우스 나가면
  const timerMouseLeave = (e: any) => {
    e.stopPropagation();
    console.log("timerMouseLeave");

    // NavTab에서 마우스 나갈때 제외시킬 className
    // 브라우저로 나갔을때는 제외한다.
    if (e.relatedTarget && e.relatedTarget.classList) {
      if (e.relatedTarget.classList.contains("SubMenuInner")) {
        return;
      }

      if (e.relatedTarget.classList.contains("NavFlex")) {
        return;
      }

      // submenu가 내려와있는 상태에서 navheight로 마우스가 나갔을때 제외
      if (isSubCateShow && e.relatedTarget.classList.contains("NavHeight")) {
        return;
      }
    }

    setIsSubCateShow(false);
    setSelectedCateName("");

    // 50ms 넘지않을시 취소.
    clearTimeout(timer);
  };

  // 서브메뉴가 내려와있을때 하단으로 나갔을 경우 height를 0으로 변경합니다.
  const subMenuClose = (e: any, name: any) => {
    e.stopPropagation();
    console.log("subMenuClose");

    if (isMobile) {
      return;
    }

    timer = setTimeout(() => {
      if (selectedCateName === name) {
        return;
      }

      setIsSubCateShow(false);
      setSelectedCateName("");
    }, 50);
  };

  // 모바일 뒤로가기 버튼 클릭시
  const NavMenuBackClick = () => {
    setSelectedCateName("");
    setIsNavSecondMenuShow(false);
  };

  // 모바일 하단 메뉴 켜기/닫기
  const NavMobileMenuClick = () => {
    console.log("NavMobileMenuClick");
    if (selectedCateName === "search" || selectedCateName === "cart") {
      // 검색 혹은 장바구니를 선택된 상태로 메뉴 클릭시 초기화
      setIsSubCateShow(!isSubCateShow);
      setIsNavFirstMenuShow(false);
      setIsNavSecondMenuShow(false);
      setSelectedCateName("");
      return;
    }

    setIsSubCateShow(!isSubCateShow);
    setIsNavFirstMenuShow(!isNavFirstMenuShow);
    setIsNavSecondMenuShow(false);
    setSelectedCateName("");
  };

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
        { name: "스토어", href: "" },
        { name: "Mac", href: "" },
        { name: "iPad", href: "" },
        { name: "iPhone", href: "" },
        { name: "Watch", href: "" },
        { name: "AirPods", href: "" },
        { name: "TV 및 홈", href: "" },
        { name: "AirTag", href: "" },
        { name: "액세서리", href: "" },
      ],
    },
    {
      title: "Apple 지갑",
      sections: [
        { name: "지갑", href: "" },
        { name: "Apple Pay", href: "" },
      ],
    },
    {
      title: "계정",
      sections: [
        { name: "Apple ID 관리", href: "" },
        { name: "Apple Store 계정", href: "" },
        { name: "iCloud.com", href: "" },
      ],
    },
    {
      title: "엔터테인먼트",
      sections: [
        { name: "Apple One", href: "" },
        { name: "Apple TV+", href: "" },
        { name: "Apple Music", href: "" },
        { name: "Apple Arcade", href: "" },
        { name: "Apple Podcasts", href: "" },
        { name: "Apple Books", href: "" },
        { name: "App Store", href: "" },
      ],
    },
    {
      title: "Apple Store",
      sections: [
        { name: "매장 찾기", href: "" },
        { name: "Genius Bar", href: "" },
        { name: "Today at Apple", href: "" },
        { name: "Apple 캠프", href: "" },
        { name: "Apple Store 앱", href: "" },
        { name: "인증 리퍼비쉬 제품", href: "" },
        { name: "Apple Trade In", href: "" },
        { name: "할부 방식", href: "" },
        { name: "주문 상태", href: "" },
        { name: "쇼핑 도움말", href: "" },
      ],
    },
    {
      title: "비즈니스",
      sections: [
        { name: "Apple과 비즈니스", href: "" },
        { name: "비즈니스를 위한 제품 쇼핑하기", href: "" },
      ],
    },
    {
      title: "교육",
      sections: [
        { name: "Apple과 교육", href: "" },
        { name: "초중고용 제품 쇼핑하기", href: "" },
        { name: "대학 생활을 위한 제품 쇼핑하기", href: "" },
      ],
    },
    {
      title: "Apple의 가치관",
      sections: [
        { name: "손쉬운 사용", href: "" },
        { name: "교육", href: "" },
        { name: "환경", href: "" },
        { name: "개인정보 보호", href: "" },
        { name: "협력업체에 대한 책임", href: "" },
      ],
    },
    {
      title: "Apple 정보",
      sections: [
        { name: "Newsroom", href: "" },
        { name: "Apple 리더십", href: "" },
        { name: "채용 안내", href: "" },
        { name: "윤리 및 규정 준수", href: "" },
        { name: "이벤트", href: "" },
        { name: "일자리 창출", href: "" },
        { name: "Apple 연락처", href: "" },
      ],
    },
  ];

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <MainWrap className="MainWrap" isMobile={isMobile} isSubCateShow={isSubCateShow}>
          <NavHeightWrap>
            <NavHeight
              className={isHome ? "NavHeight NavWrap-home" : "NavHeight"}
              height={height}
              selectedCateName={selectedCateName}
              isSubCateShow={isSubCateShow}
            >
              <NavWrap className={isHome ? "NavWrap-home" : "NavWrap"} isSubCateShow={isSubCateShow}>
                <NavMenuBack className="NavMenuBack" onClick={NavMenuBackClick} isNavSecondMenuShow={isNavSecondMenuShow}>
                  <button>
                    <span>
                      <svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg">
                        <path d="m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z"></path>
                      </svg>
                    </span>
                  </button>
                </NavMenuBack>
                <NavInner className="NavInner" isSubCateShow={isSubCateShow} isHome={isHome}>
                  <NavFlex className="NavFlex" isSubCateShow={isSubCateShow}>
                    {/* 로고 */}
                    <NavTab className="NavTab NavTab-Logo" name={"apple"} selectedCateName={selectedCateName} isMobile={isMobile}>
                      <a href="/smartstore/shop">
                        <NavTabText className="NavTabText" isSubCateShow={isSubCateShow} key={0} name={"test"} selectedCateName={selectedCateName}>
                          <span className="AppleLogo AppleLogo-medium">
                            <svg height="44" viewBox="0 0 14 44" xmlns="http://www.w3.org/2000/svg">
                              <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
                            </svg>
                          </span>
                          <span className="AppleLogo AppleLogo-large">
                            <svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg">
                              <path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path>
                            </svg>
                          </span>
                        </NavTabText>
                      </a>
                    </NavTab>
                    {/* PC 메뉴 */}
                    {!isMobile && (
                      <NavTabMenuWrap className="NavTabMenuWrap" isNavFirstMenuShow={isNavFirstMenuShow}>
                        <NavMenuBack className="NavMenuBack" onClick={NavMenuBackClick} isNavSecondMenuShow={isNavSecondMenuShow}>
                          <button>
                            <span>
                              <svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg">
                                <path d="m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z"></path>
                              </svg>
                            </span>
                          </button>
                        </NavMenuBack>
                        <NavTabMenu className="NavTab-Menu" isNavSecondMenuShow={isNavSecondMenuShow}>
                          {categoryList.map((list: any, index: any) => {
                            if (list.navHide) return null; // 숨겨진 메뉴는 출력 하지 않음.
                            if (list.taskIds.length > 0) {
                              return (
                                <>
                                  <NavTabWrap className="NavTabWrap" key={index}>
                                    <NavTab
                                      className="NavTab NavTab-Menu-li"
                                      onMouseEnter={(e) => timerMouseEnter(e, list.name)}
                                      onMouseLeave={(e) => timerMouseLeave(e)}
                                      name={list.name}
                                      number={index + 1}
                                      total={categoryList.length}
                                      selectedCateName={selectedCateName}
                                      isNavFirstMenuShow={isNavFirstMenuShow}
                                      isNavSecondMenuShow={isNavSecondMenuShow}
                                    >
                                      <NavTabLink to={`./${list.url}`} className="Link">
                                        <NavTabText
                                          className="NavTabText"
                                          isSubCateShow={isSubCateShow}
                                          key={index}
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                        >
                                          {list.name}
                                        </NavTabText>
                                      </NavTabLink>
                                      <NavTabArrow className="NavTabArrow" isSubCateShow={isSubCateShow} number={index + 1}>
                                        <svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg">
                                          <path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path>
                                        </svg>
                                      </NavTabArrow>
                                    </NavTab>
                                    {!isMobile && (
                                      <SubMenu
                                        className="SubMenu"
                                        isSubCateShow={isSubCateShow}
                                        name={list.name}
                                        selectedCateName={selectedCateName}
                                        height={height}
                                        isNavFirstMenuShow={isNavFirstMenuShow}
                                        isNavSecondMenuShow={isNavSecondMenuShow}
                                      >
                                        <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                                          <SubMenuInner className="SubMenuInner" name={list.name} selectedCateName={selectedCateName} ref={submenu}>
                                            <SubMenuList className="SubMenuList main" number={0} grouptotal={3}>
                                              {!isMobile && (
                                                <SubMenuText
                                                  className="main"
                                                  isSubCateShow={isSubCateShow}
                                                  number={1}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  {list.name}&nbsp;살펴보기
                                                </SubMenuText>
                                              )}
                                              <SubMenuListItem>
                                                {list.taskIds.map((taskId: any, index2: any) => {
                                                  if (taskId.navHide) return null;
                                                  if (taskId.subTaskIds && taskId.subTaskIds.length > 0) {
                                                    return (
                                                      <>
                                                        <SubMenuLi
                                                          key={index2}
                                                          name={list.name}
                                                          selectedCateName={selectedCateName}
                                                          className="SubMenuLi"
                                                          number={isMobile ? index2 + 1 : index2 + 2}
                                                          isSubCateShow={isSubCateShow}
                                                          total={list.taskIds.length + 1}
                                                          isNavSecondMenuShow={isNavSecondMenuShow}
                                                        >
                                                          <SubMenuLink to={`./${taskId.url}`}>
                                                            <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                                          </SubMenuLink>
                                                        </SubMenuLi>
                                                      </>
                                                    );
                                                  } else {
                                                    return (
                                                      <>
                                                        <SubMenuLi
                                                          key={index2}
                                                          name={list.name}
                                                          selectedCateName={selectedCateName}
                                                          className="SubMenuLi"
                                                          number={index2 + 2}
                                                          isSubCateShow={isSubCateShow}
                                                          total={list.taskIds.length + 1}
                                                          isNavSecondMenuShow={isNavSecondMenuShow}
                                                        >
                                                          <SubMenuLink to={`./products/${taskId.url}`}>
                                                            <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                                          </SubMenuLink>
                                                        </SubMenuLi>
                                                      </>
                                                    );
                                                  }
                                                })}
                                              </SubMenuListItem>
                                            </SubMenuList>
                                            <SubMenuList className="SubMenuList main" number={1} grouptotal={3}>
                                              <SubMenuText className="main" isSubCateShow={isSubCateShow} number={1} total={list.taskIds.length + 1}>
                                                {list.name}&nbsp;쇼핑하기
                                              </SubMenuText>
                                              <SubMenuListItem>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={2}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트1</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={3}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트2</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={4}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트3</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={5}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트4</SubMenuName>
                                                </SubMenuLi>
                                              </SubMenuListItem>
                                            </SubMenuList>
                                            <SubMenuList className="SubMenuList main" number={2} grouptotal={3}>
                                              <SubMenuText className="main" isSubCateShow={isSubCateShow} number={1} total={list.taskIds.length + 1}>
                                                그 외 {list.name}&nbsp;관련 항목
                                              </SubMenuText>
                                              <SubMenuListItem>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={2}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트1</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={3}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트2</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={4}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트3</SubMenuName>
                                                </SubMenuLi>
                                                <SubMenuLi
                                                  name={list.name}
                                                  selectedCateName={selectedCateName}
                                                  className="SubMenuLi sub"
                                                  number={5}
                                                  isSubCateShow={isSubCateShow}
                                                  total={list.taskIds.length + 1}
                                                >
                                                  <SubMenuName className="subtext">테스트4</SubMenuName>
                                                </SubMenuLi>
                                              </SubMenuListItem>
                                            </SubMenuList>
                                          </SubMenuInner>
                                        </SubMenuHeight>
                                      </SubMenu>
                                    )}
                                  </NavTabWrap>
                                </>
                              );
                            } else {
                              return (
                                <NavTab
                                  className="NavTab NavTab-Menu-li"
                                  onMouseEnter={(e) => timerMouseEnter(e, list.name)}
                                  onMouseLeave={(e) => timerMouseLeave(e)}
                                  name={list.name}
                                  number={index + 1}
                                  total={categoryList.length}
                                  selectedCateName={selectedCateName}
                                  isSubCateShow={isSubCateShow}
                                  isNavSecondMenuShow={isNavSecondMenuShow}
                                >
                                  <NavTabLink to={`./${list.url}`}>
                                    <NavTabText
                                      className="NavTabText"
                                      isSubCateShow={isSubCateShow}
                                      name={list.name}
                                      selectedCateName={selectedCateName}
                                    >
                                      {list.name}
                                    </NavTabText>
                                  </NavTabLink>
                                </NavTab>
                              );
                            }
                          })}
                        </NavTabMenu>
                      </NavTabMenuWrap>
                    )}
                    {/* 검색 */}
                    <NavTab
                      className="NavTab NavTab-Right"
                      name={"search"}
                      selectedCateName={selectedCateName}
                      onMouseEnter={(e: any) => subMenuClose(e, "search")}
                      onClick={(e: any) => timerMouseEnter(e, "search")}
                      onMouseLeave={isMobile ? undefined : (e) => timerMouseLeave(e)}
                    >
                      <NavTabText className="NavTabText" isSubCateShow={isSubCateShow} key={0} name={"search"} selectedCateName={selectedCateName}>
                        <span className="Search Search-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 0 15 44">
                            <path
                              name="search"
                              d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"
                            ></path>
                          </svg>
                        </span>
                        <span className="Search Search-large">
                          <svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16.2294 29.9556-4.1755-4.0821a6.4711 6.4711 0 1 0 -1.2839 1.2625l4.2005 4.1066a.9.9 0 1 0 1.2588-1.287zm-14.5294-8.0017a5.2455 5.2455 0 1 1 5.2455 5.2527 5.2549 5.2549 0 0 1 -5.2455-5.2527z"></path>
                          </svg>
                        </span>
                      </NavTabText>
                      <SubMenu className="SubMenu" isSubCateShow={isSubCateShow} name={"search"} selectedCateName={selectedCateName} height={height}>
                        <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                          <SubMenuInner className="SubMenuInner" name={"search"} selectedCateName={selectedCateName}>
                            <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                              <SubMenuText isSubCateShow={isSubCateShow} number={0} total={9}>
                                검색
                              </SubMenuText>
                              <SubMenuListItem>
                                <SubMenuLi
                                  name={"search"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi"
                                  number={1}
                                  isSubCateShow={isSubCateShow}
                                  total={9}
                                ></SubMenuLi>
                              </SubMenuListItem>
                            </SubMenuList>
                          </SubMenuInner>
                        </SubMenuHeight>
                      </SubMenu>
                    </NavTab>
                    {/* 장바구니 */}
                    <NavTab
                      className="NavTab NavTab-Right"
                      name={"cart"}
                      selectedCateName={selectedCateName}
                      onMouseEnter={(e: any) => subMenuClose(e, "cart")}
                      onClick={(e: any) => timerMouseEnter(e, "cart")}
                      onMouseLeave={isMobile ? undefined : (e) => timerMouseLeave(e)}
                    >
                      <NavTabText className="NavTabText" isSubCateShow={isSubCateShow} key={0} name={"cart"} selectedCateName={selectedCateName}>
                        <span className="Cart Cart-medium">
                          <svg height="44" viewBox="0 0 14 44" xmlns="http://www.w3.org/2000/svg">
                            <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                          </svg>
                        </span>
                        <span className="Cart Cart-large">
                          <svg height="48" viewBox="0 0 17 48" width="17" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path>
                          </svg>
                        </span>
                        {navCart && navCart.length > 1 && (
                          <>
                            <Badge>
                              <BadgeNumber>{navCart && navCart.length}</BadgeNumber>
                            </Badge>
                          </>
                        )}
                      </NavTabText>
                      <SubMenu className="SubMenu" isSubCateShow={isSubCateShow} name={"cart"} selectedCateName={selectedCateName} height={height}>
                        <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                          <SubMenuInner className="SubMenuInner" name={"cart"} selectedCateName={selectedCateName}>
                            {navCart && navCart.length !== 0 ? (
                              <>
                                <SubMenuList className="SubMenuList cart" number={0} grouptotal={3}>
                                  <div className="left">
                                    <SubMenuLi
                                      name={"cart"}
                                      selectedCateName={selectedCateName}
                                      className="SubMenuLi cart-h2"
                                      number={0}
                                      isSubCateShow={isSubCateShow}
                                      total={7}
                                    >
                                      <NavCart.H2 className="cart-main-h2">장바구니</NavCart.H2>
                                    </SubMenuLi>
                                    {navCart &&
                                      navCart.map((list: any, index: any) => {
                                        if (index < 3) {
                                          return (
                                            <SubMenuLi
                                              name={"cart"}
                                              selectedCateName={selectedCateName}
                                              className="SubMenuLi cart"
                                              number={index + 1}
                                              isSubCateShow={isSubCateShow}
                                              total={7}
                                            >
                                              <NavCart.Link to={""} className="NavCart.Link">
                                                <img src={list.product.mainImage} width="64" height="64" alt="" />
                                                <NavCart.Name className="NavCart.Name">{list.product.name}</NavCart.Name>
                                              </NavCart.Link>
                                            </SubMenuLi>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })}
                                    {navCart.length > 3 && (
                                      <SubMenuLi
                                        name={"cart"}
                                        className="SubMenuLi"
                                        isSubCateShow={isSubCateShow}
                                        selectedCateName={selectedCateName}
                                        number={4}
                                        total={7}
                                      >
                                        <div className="globalnav-flyout-item ac-gn-bagview-message">
                                          <span className="ac-gn-bagview-message-text">장바구니에 제품이 1개 더 있음</span>
                                        </div>
                                      </SubMenuLi>
                                    )}
                                  </div>
                                  <div className="right">
                                    <SubMenuLi
                                      name={"cart"}
                                      selectedCateName={selectedCateName}
                                      className="SubMenuLi cart"
                                      number={navCart.length >= 4 ? 5 : navCart.length + 1}
                                      isSubCateShow={isSubCateShow}
                                      total={7}
                                    >
                                      <NavCart.Link to={"./cart"} className="cartcheck">
                                        장바구니 확인
                                      </NavCart.Link>
                                    </SubMenuLi>
                                  </div>
                                </SubMenuList>
                              </>
                            ) : (
                              <>
                                <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                                  <SubMenuText className="cart-main-h2" isSubCateShow={isSubCateShow} number={0} total={7}>
                                    장바구니가 비어있습니다.
                                  </SubMenuText>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart"
                                    number={1}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    {cookies.userjwt ? (
                                      <SubMenuName className="cart">지금 쇼핑하기</SubMenuName>
                                    ) : (
                                      <SubMenuName className="cart">
                                        저장해둔 항목이 있는지 확인하려면
                                        <span className="login" onClick={account.login}>
                                          &nbsp;로그인&nbsp;
                                        </span>
                                        하세요.
                                      </SubMenuName>
                                    )}
                                  </SubMenuLi>
                                </SubMenuList>
                              </>
                            )}

                            {/* <SubMenuList className="SubMenuList cart2" number={1} grouptotal={3}>
                            <SubMenuListItem>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi"
                                number={1}
                                isSubCateShow={isSubCateShow}
                                total={9}
                              >
                                {!cookies.userjwt ? (
                                  <>

                                  </>
                                ) : (
                                  <>
                                  </>
                                )}
                              </SubMenuLi>
                            </SubMenuListItem>
                          </SubMenuList> */}

                            <SubMenuList className="SubMenuList" number={2} grouptotal={3}>
                              <SubMenuText className="cart-profile-text" isSubCateShow={isSubCateShow} number={2} total={7}>
                                내 프로필
                              </SubMenuText>
                              <SubMenuListItem>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart-profile"
                                  number={3}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  <NavCart.ProfileLink to={""} className="profile">
                                    <svg
                                      id="Outlined"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ac-gn-bagview-nav-svgicon"
                                      width="11"
                                      height="16"
                                      viewBox="0 0 16 25"
                                    >
                                      <path
                                        id="art_"
                                        d="M14.5146,9.5234a2.56,2.56,0,0,0-1.11-1.4228l-4.25-2.3975a2.3909,2.3909,0,0,0-2.31,0l-4.25,2.3975a2.2971,2.2971,0,0,0-.6025.5107A2.2684,2.2684,0,0,0,1.4,10.1475v4.705a2.3546,2.3546,0,0,0,1.1953,2.0469l4.25,2.3975a2.3541,2.3541,0,0,0,2.31,0l4.25-2.3975A2.3546,2.3546,0,0,0,14.6,14.8525v-4.705A2.3322,2.3322,0,0,0,14.5146,9.5234ZM7.4,12.9453v5.2871L3.1851,15.8545a1.153,1.153,0,0,1-.585-1.002L2.603,10.24Zm.6-1.04L3.147,9.17a.4347.4347,0,0,1,.0385-.0244l1.7623-.9941,4.895,2.7158Zm5.4-1.666v4.6132a1.153,1.153,0,0,1-.585,1.002L8.6,18.2324V12.9453ZM8.5649,6.748l4.25,2.3975a.4347.4347,0,0,1,.0385.0244l-1.7842,1.0059L6.1733,7.46l1.2618-.712A1.1731,1.1731,0,0,1,8.5649,6.748Z"
                                        fill="6E6E73"
                                      ></path>
                                    </svg>
                                    <SubMenuName className="cartprofile">주문</SubMenuName>
                                  </NavCart.ProfileLink>
                                </SubMenuLi>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart-profile"
                                  number={4}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  <NavCart.ProfileLink to={""} className="profile">
                                    <svg
                                      id="Outlined"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ac-gn-bagview-nav-svgicon"
                                      width="11"
                                      height="16"
                                      viewBox="0 0 16 25"
                                    >
                                      <path
                                        id="art_"
                                        d="M10.3,5.15H5.7a2.3022,2.3022,0,0,0-2.3,2.3V19.0381a.8642.8642,0,0,0,.19.5869.67.67,0,0,0,.5313.2246.7441.7441,0,0,0,.438-.1465,4.8685,4.8685,0,0,0,.5366-.4765l2.8931-2.8858,2.9165,2.8867a6.4062,6.4062,0,0,0,.5307.4717.7286.7286,0,0,0,.4429.15.6684.6684,0,0,0,.5308-.2246.8619.8619,0,0,0,.19-.5869V7.45A2.3022,2.3022,0,0,0,10.3,5.15ZM4.6,7.45A1.102,1.102,0,0,1,5.7,6.35h4.6A1.102,1.102,0,0,1,11.4,7.45l-.0005,10.5781L8.832,15.4863a1.186,1.186,0,0,0-1.665.001L4.6,18.0293Z"
                                        fill="6E6E73"
                                      ></path>
                                    </svg>
                                    <SubMenuName className="cartprofile">관심목록</SubMenuName>
                                  </NavCart.ProfileLink>
                                </SubMenuLi>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart-profile"
                                  number={5}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  <NavCart.ProfileLink to={""} className="profile">
                                    <svg
                                      id="Outlined"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ac-gn-bagview-nav-svgicon"
                                      width="11"
                                      height="16"
                                      viewBox="0 0 16 25"
                                    >
                                      <path
                                        id="art_"
                                        d="M15.6094,12.3252a.5142.5142,0,0,0-.2959-.2959l-.5972-.2324a6.6665,6.6665,0,0,0-.16-.917l.4809-.42a.5172.5172,0,0,0-.3291-.9073l-.6372-.0136c-.0654-.1377-.1343-.2784-.2139-.4151s-.1635-.2636-.2519-.3935l.3076-.5576a.517.517,0,0,0-.62-.7393l-.6035.2051a6.68,6.68,0,0,0-.7134-.5977l.0986-.6328a.5172.5172,0,0,0-.43-.5918.54.54,0,0,0-.4052.1084l-.5015.4033A6.911,6.911,0,0,0,9.87,6.01l-.124-.6328a.5178.5178,0,0,0-.9512-.167l-.333.5507a7.2576,7.2576,0,0,0-.92.0039L7.2056,5.207a.518.518,0,0,0-.9512.167l-.125.6377a6.6192,6.6192,0,0,0-.8652.31l-.501-.4063a.5176.5176,0,0,0-.8364.4834l.0991.6358a6.6073,6.6073,0,0,0-.7017.5947L2.71,7.417a.5173.5173,0,0,0-.6211.7392l.3134.5694a6.7192,6.7192,0,0,0-.4653.7959l-.6421.0117a.516.516,0,0,0-.5083.5264.52.52,0,0,0,.1763.38l.4849.4238a6.8261,6.8261,0,0,0-.16.9111l-.6006.23a.5176.5176,0,0,0-.001.9658l.5972.2324a6.6665,6.6665,0,0,0,.16.917l-.4809.419a.5184.5184,0,0,0-.05.7314.52.52,0,0,0,.3789.1758l.6367.0137c.063.1318.1333.2754.2144.416.0673.1172.143.2246.2163.3281l.04.0566-.312.5664a.5176.5176,0,0,0,.2036.7032.52.52,0,0,0,.416.0361l.5967-.2031a6.82,6.82,0,0,0,.7207.5937l-.0991.6348a.5153.5153,0,0,0,.0933.3857.5187.5187,0,0,0,.7421.0977l.5064-.4082a6.6137,6.6137,0,0,0,.8628.3193l.1245.6358a.5139.5139,0,0,0,.22.33.53.53,0,0,0,.3877.0782.5193.5193,0,0,0,.3433-.24l.3388-.56.0577.0049a4.8076,4.8076,0,0,0,.7871.0019l.0669-.0058.3383.5625a.518.518,0,0,0,.9512-.167l.1245-.6348a6.6152,6.6152,0,0,0,.8589-.3193l.5088.4131a.5176.5176,0,0,0,.8364-.4834l-.0991-.6358a6.6173,6.6173,0,0,0,.7017-.5947l.6142.2119a.5174.5174,0,0,0,.6211-.7392l-.3135-.5694a6.6548,6.6548,0,0,0,.4649-.7959l.6421-.0117a.5168.5168,0,0,0,.5088-.5264.5166.5166,0,0,0-.1768-.38l-.4849-.4238a6.6694,6.6694,0,0,0,.16-.9111l.6006-.2315a.5177.5177,0,0,0,.2969-.6689ZM6.4941,13.9043,4.7666,16.8926a5.4449,5.4449,0,0,1,.0044-8.792L6.5,11.0986A2.0525,2.0525,0,0,0,6.4941,13.9043Zm2.1646-1.7822a.7608.7608,0,1,1-.4609-.3555A.7543.7543,0,0,1,8.6587,12.1221ZM7.54,10.499,5.8154,7.5068A5.4579,5.4579,0,0,1,7.9907,7.041h.0239a5.4693,5.4693,0,0,1,5.4068,4.8633l-3.457-.0029a2.0363,2.0363,0,0,0-.18-.43A2.0586,2.0586,0,0,0,7.54,10.499Zm-.0058,4.0049a2.0556,2.0556,0,0,0,2.435-1.4023l3.4512.0029a5.4455,5.4455,0,0,1-7.6147,4.3877Z"
                                        fill="6E6E73"
                                      ></path>
                                    </svg>
                                    <SubMenuName className="cartprofile">계정</SubMenuName>
                                  </NavCart.ProfileLink>
                                </SubMenuLi>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart-profile"
                                  number={6}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  {!cookies.userjwt ? (
                                    <>
                                      <NavCart.ProfileLink to="./login" className="profile">
                                        <svg
                                          id="Outlined"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="ac-gn-bagview-nav-svgicon"
                                          width="11"
                                          height="16"
                                          viewBox="0 0 16 25"
                                        >
                                          <path
                                            id="art_"
                                            d="M15.09,12.5a7.1,7.1,0,1,1-7.1-7.1A7.1077,7.1077,0,0,1,15.09,12.5ZM7.99,6.6a5.89,5.89,0,0,0-4.4609,9.7471c.6069-.9658,2.48-1.6787,4.4609-1.6787s3.8545.7129,4.4615,1.6787A5.89,5.89,0,0,0,7.99,6.6ZM7.99,8.4A2.5425,2.5425,0,0,0,5.5151,11,2.5425,2.5425,0,0,0,7.99,13.6,2.5424,2.5424,0,0,0,10.4653,11,2.5424,2.5424,0,0,0,7.99,8.4Z"
                                            fill="6E6E73"
                                          ></path>
                                        </svg>
                                        <SubMenuName className="cartprofile" onClick={account.login}>
                                          로그인
                                        </SubMenuName>
                                      </NavCart.ProfileLink>
                                    </>
                                  ) : (
                                    <>
                                      <NavCart.ProfileLink to={""} onClick={account.logOut}>
                                        <svg
                                          id="Outlined"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="ac-gn-bagview-nav-svgicon"
                                          width="11"
                                          height="16"
                                          viewBox="0 0 16 25"
                                        >
                                          <path
                                            id="art_"
                                            d="M15.09,12.5a7.1,7.1,0,1,1-7.1-7.1A7.1077,7.1077,0,0,1,15.09,12.5ZM7.99,6.6a5.89,5.89,0,0,0-4.4609,9.7471c.6069-.9658,2.48-1.6787,4.4609-1.6787s3.8545.7129,4.4615,1.6787A5.89,5.89,0,0,0,7.99,6.6ZM7.99,8.4A2.5425,2.5425,0,0,0,5.5151,11,2.5425,2.5425,0,0,0,7.99,13.6,2.5424,2.5424,0,0,0,10.4653,11,2.5424,2.5424,0,0,0,7.99,8.4Z"
                                            fill="6E6E73"
                                          ></path>
                                        </svg>
                                        <SubMenuName className="cartprofile">{user.name}&nbsp;로그아웃</SubMenuName>
                                      </NavCart.ProfileLink>
                                    </>
                                  )}
                                </SubMenuLi>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart-profile"
                                  number={7}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  <NavCart.ProfileLink to="../" className="profile">
                                    <svg
                                      id="Outlined"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ac-gn-bagview-nav-svgicon"
                                      width="11"
                                      height="16"
                                      viewBox="0 0 16 25"
                                    >
                                      <path
                                        id="art_"
                                        d="M15.6094,12.3252a.5142.5142,0,0,0-.2959-.2959l-.5972-.2324a6.6665,6.6665,0,0,0-.16-.917l.4809-.42a.5172.5172,0,0,0-.3291-.9073l-.6372-.0136c-.0654-.1377-.1343-.2784-.2139-.4151s-.1635-.2636-.2519-.3935l.3076-.5576a.517.517,0,0,0-.62-.7393l-.6035.2051a6.68,6.68,0,0,0-.7134-.5977l.0986-.6328a.5172.5172,0,0,0-.43-.5918.54.54,0,0,0-.4052.1084l-.5015.4033A6.911,6.911,0,0,0,9.87,6.01l-.124-.6328a.5178.5178,0,0,0-.9512-.167l-.333.5507a7.2576,7.2576,0,0,0-.92.0039L7.2056,5.207a.518.518,0,0,0-.9512.167l-.125.6377a6.6192,6.6192,0,0,0-.8652.31l-.501-.4063a.5176.5176,0,0,0-.8364.4834l.0991.6358a6.6073,6.6073,0,0,0-.7017.5947L2.71,7.417a.5173.5173,0,0,0-.6211.7392l.3134.5694a6.7192,6.7192,0,0,0-.4653.7959l-.6421.0117a.516.516,0,0,0-.5083.5264.52.52,0,0,0,.1763.38l.4849.4238a6.8261,6.8261,0,0,0-.16.9111l-.6006.23a.5176.5176,0,0,0-.001.9658l.5972.2324a6.6665,6.6665,0,0,0,.16.917l-.4809.419a.5184.5184,0,0,0-.05.7314.52.52,0,0,0,.3789.1758l.6367.0137c.063.1318.1333.2754.2144.416.0673.1172.143.2246.2163.3281l.04.0566-.312.5664a.5176.5176,0,0,0,.2036.7032.52.52,0,0,0,.416.0361l.5967-.2031a6.82,6.82,0,0,0,.7207.5937l-.0991.6348a.5153.5153,0,0,0,.0933.3857.5187.5187,0,0,0,.7421.0977l.5064-.4082a6.6137,6.6137,0,0,0,.8628.3193l.1245.6358a.5139.5139,0,0,0,.22.33.53.53,0,0,0,.3877.0782.5193.5193,0,0,0,.3433-.24l.3388-.56.0577.0049a4.8076,4.8076,0,0,0,.7871.0019l.0669-.0058.3383.5625a.518.518,0,0,0,.9512-.167l.1245-.6348a6.6152,6.6152,0,0,0,.8589-.3193l.5088.4131a.5176.5176,0,0,0,.8364-.4834l-.0991-.6358a6.6173,6.6173,0,0,0,.7017-.5947l.6142.2119a.5174.5174,0,0,0,.6211-.7392l-.3135-.5694a6.6548,6.6548,0,0,0,.4649-.7959l.6421-.0117a.5168.5168,0,0,0,.5088-.5264.5166.5166,0,0,0-.1768-.38l-.4849-.4238a6.6694,6.6694,0,0,0,.16-.9111l.6006-.2315a.5177.5177,0,0,0,.2969-.6689ZM6.4941,13.9043,4.7666,16.8926a5.4449,5.4449,0,0,1,.0044-8.792L6.5,11.0986A2.0525,2.0525,0,0,0,6.4941,13.9043Zm2.1646-1.7822a.7608.7608,0,1,1-.4609-.3555A.7543.7543,0,0,1,8.6587,12.1221ZM7.54,10.499,5.8154,7.5068A5.4579,5.4579,0,0,1,7.9907,7.041h.0239a5.4693,5.4693,0,0,1,5.4068,4.8633l-3.457-.0029a2.0363,2.0363,0,0,0-.18-.43A2.0586,2.0586,0,0,0,7.54,10.499Zm-.0058,4.0049a2.0556,2.0556,0,0,0,2.435-1.4023l3.4512.0029a5.4455,5.4455,0,0,1-7.6147,4.3877Z"
                                        fill="6E6E73"
                                      ></path>
                                    </svg>
                                    <SubMenuName className="cartprofile">관리자 페이지</SubMenuName>
                                  </NavCart.ProfileLink>
                                </SubMenuLi>
                              </SubMenuListItem>
                            </SubMenuList>
                          </SubMenuInner>
                        </SubMenuHeight>
                      </SubMenu>
                    </NavTab>
                  </NavFlex>
                  {/* 모바일 메뉴 버튼 */}
                  <NavMobileMenu.Wrap className="NavMobileMenu-Wrap NavTabMobileMenu" onClick={NavMobileMenuClick} isSubCateShow={isSubCateShow}>
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
              </NavWrap>
              {/* 모바일 메뉴 */}
              {isMobile && (
                <>
                  <NavTabMenuWrap className="NavTabMenuWrap" isNavFirstMenuShow={isNavFirstMenuShow}>
                    <NavTabMenu className="NavTab-Menu" isNavSecondMenuShow={isNavSecondMenuShow}>
                      {categoryList.map((list: any, index: any) => {
                        if (list.navHide) return null; // 숨겨진 메뉴는 출력 하지 않음.
                        return (
                          <>
                            <NavTabSubMenuWrap className="NavTabSubMenuWrap">
                              <NavTabWrap className="NavTabWrap" isNavSecondMenuShow={isNavSecondMenuShow} key={index}>
                                <NavTab
                                  className="NavTab NavTab-Menu-li"
                                  onClick={list.taskIds.length > 0 ? (e) => timerMouseEnter(e, list.name) : () => navigate(`./${list.url}`)}
                                  name={list.name}
                                  number={index + 1}
                                  total={categoryList.length}
                                  selectedCateName={selectedCateName}
                                  isNavFirstMenuShow={isNavFirstMenuShow}
                                  isNavSecondMenuShow={isNavSecondMenuShow}
                                >
                                  <NavTabLink to={`./${list.url}`} className="Link">
                                    <NavTabText
                                      className="NavTabText"
                                      isSubCateShow={isSubCateShow}
                                      key={index}
                                      name={list.name}
                                      selectedCateName={selectedCateName}
                                    >
                                      {list.name}
                                    </NavTabText>
                                  </NavTabLink>
                                  <NavTabArrow className="NavTabArrow" isSubCateShow={isSubCateShow} number={index + 1}>
                                    <svg height="48" viewBox="0 0 9 48" width="9" xmlns="http://www.w3.org/2000/svg">
                                      <path d="m8.1155 30.358a.6.6 0 1 1 -.831.8653l-7-6.7242a.6.6 0 0 1 -.0045-.8613l7-6.8569a.6.6 0 1 1 .84.8574l-6.5582 6.4238z"></path>
                                    </svg>
                                  </NavTabArrow>
                                </NavTab>
                              </NavTabWrap>
                              <SubMenu
                                className="SubMenu"
                                isSubCateShow={isSubCateShow}
                                name={list.name}
                                selectedCateName={selectedCateName}
                                height={height}
                                isNavFirstMenuShow={isNavFirstMenuShow}
                                isNavSecondMenuShow={isNavSecondMenuShow}
                              >
                                <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                                  <SubMenuInner className="SubMenuInner" name={list.name} selectedCateName={selectedCateName} ref={submenu}>
                                    <SubMenuList className="SubMenuList main" number={0} grouptotal={3}>
                                      <SubMenuListItem>
                                        {list.taskIds.map((taskId: any, index2: any) => {
                                          if (taskId.navHide) return null;
                                          return (
                                            <>
                                              <SubMenuLi
                                                key={index2}
                                                name={list.name}
                                                selectedCateName={selectedCateName}
                                                className="SubMenuLi"
                                                number={index2 + 1}
                                                isSubCateShow={isSubCateShow}
                                                total={list.taskIds.length + 1}
                                                isNavSecondMenuShow={isNavSecondMenuShow}
                                              >
                                                <SubMenuLink
                                                  to={`./${taskId.subTaskIds && taskId.subTaskIds.length > 0 ? "" : "products/"}${taskId.url}`}
                                                >
                                                  <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                                </SubMenuLink>
                                              </SubMenuLi>
                                            </>
                                          );
                                        })}
                                      </SubMenuListItem>
                                    </SubMenuList>
                                    <SubMenuList className="SubMenuList main" number={1} grouptotal={3}>
                                      <SubMenuText className="main" isSubCateShow={isSubCateShow} number={1} total={list.taskIds.length + 1}>
                                        {list.name}&nbsp;쇼핑하기
                                      </SubMenuText>
                                      <SubMenuListItem>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={2}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트1</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={3}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트2</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={4}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트3</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={5}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트4</SubMenuName>
                                        </SubMenuLi>
                                      </SubMenuListItem>
                                    </SubMenuList>
                                    <SubMenuList className="SubMenuList main" number={2} grouptotal={3}>
                                      <SubMenuText className="main" isSubCateShow={isSubCateShow} number={1} total={list.taskIds.length + 1}>
                                        그 외 {list.name}&nbsp;관련 항목
                                      </SubMenuText>
                                      <SubMenuListItem>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={2}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트1</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={3}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트2</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={4}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트3</SubMenuName>
                                        </SubMenuLi>
                                        <SubMenuLi
                                          name={list.name}
                                          selectedCateName={selectedCateName}
                                          className="SubMenuLi sub"
                                          number={5}
                                          isSubCateShow={isSubCateShow}
                                          total={list.taskIds.length + 1}
                                        >
                                          <SubMenuName className="subtext">테스트4</SubMenuName>
                                        </SubMenuLi>
                                      </SubMenuListItem>
                                    </SubMenuList>
                                  </SubMenuInner>
                                </SubMenuHeight>
                              </SubMenu>
                            </NavTabSubMenuWrap>
                          </>
                        );
                      })}
                    </NavTabMenu>
                    <SubMenu
                      className="SubMenu-Mobile"
                      isSubCateShow={isSubCateShow}
                      name={"search"}
                      selectedCateName={selectedCateName}
                      height={height}
                    >
                      <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                        <SubMenuInner className="SubMenuInner" name={"search"} selectedCateName={selectedCateName}>
                          <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                            <SubMenuText isSubCateShow={isSubCateShow} number={0} total={9}>
                              검색
                            </SubMenuText>
                            <SubMenuListItem>
                              <SubMenuLi
                                name={"search"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi"
                                number={1}
                                isSubCateShow={isSubCateShow}
                                total={9}
                              ></SubMenuLi>
                            </SubMenuListItem>
                          </SubMenuList>
                        </SubMenuInner>
                      </SubMenuHeight>
                    </SubMenu>
                    <SubMenu
                      className="SubMenu-Mobile"
                      isSubCateShow={isSubCateShow}
                      name={"cart"}
                      selectedCateName={selectedCateName}
                      height={height}
                    >
                      <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                        <SubMenuInner className="SubMenuInner" name={"cart"} selectedCateName={selectedCateName}>
                          {navCart && navCart.length !== 0 ? (
                            <>
                              <SubMenuList className="SubMenuList cart" number={0} grouptotal={3}>
                                <div className="left">
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-h2"
                                    number={0}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.H2 className="cart-main-h2">장바구니</NavCart.H2>
                                  </SubMenuLi>
                                  {navCart &&
                                    navCart.map((list: any, index: any) => {
                                      if (index < 3) {
                                        return (
                                          <SubMenuLi
                                            key={index}
                                            name={"cart"}
                                            selectedCateName={selectedCateName}
                                            className="SubMenuLi cart"
                                            number={index + 1}
                                            isSubCateShow={isSubCateShow}
                                            total={7}
                                          >
                                            <NavCart.Link to={""} className="NavCart.Link">
                                              <img src={list.product.mainImage} width="64" height="64" alt="" />
                                              <NavCart.Name className="NavCart.Name">{list.product.name}</NavCart.Name>
                                            </NavCart.Link>
                                          </SubMenuLi>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })}
                                  {navCart.length > 3 && (
                                    <SubMenuLi
                                      name={"cart"}
                                      className="SubMenuLi"
                                      isSubCateShow={isSubCateShow}
                                      selectedCateName={selectedCateName}
                                      number={4}
                                      total={7}
                                    >
                                      <div className="globalnav-flyout-item ac-gn-bagview-message">
                                        <span className="ac-gn-bagview-message-text">장바구니에 제품이 1개 더 있음</span>
                                      </div>
                                    </SubMenuLi>
                                  )}
                                </div>
                                <div className="right">
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart"
                                    number={navCart.length >= 4 ? 5 : navCart.length + 1}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.Link to={"./cart"} className="cartcheck">
                                      장바구니 확인
                                    </NavCart.Link>
                                  </SubMenuLi>
                                </div>
                              </SubMenuList>
                            </>
                          ) : (
                            <>
                              <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                                <SubMenuText className="cart-main-h2" isSubCateShow={isSubCateShow} number={0} total={7}>
                                  장바구니가 비어있습니다.
                                </SubMenuText>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi cart"
                                  number={1}
                                  isSubCateShow={isSubCateShow}
                                  total={7}
                                >
                                  {cookies.userjwt ? (
                                    <SubMenuName className="cart">지금 쇼핑하기</SubMenuName>
                                  ) : (
                                    <SubMenuName className="cart">
                                      저장해둔 항목이 있는지 확인하려면
                                      <span className="login" onClick={account.login}>
                                        &nbsp;로그인&nbsp;
                                      </span>
                                      하세요.
                                    </SubMenuName>
                                  )}
                                </SubMenuLi>
                              </SubMenuList>
                            </>
                          )}

                          {/* <SubMenuList className="SubMenuList cart2" number={1} grouptotal={3}>
                              <SubMenuListItem>
                                <SubMenuLi
                                  name={"cart"}
                                  selectedCateName={selectedCateName}
                                  className="SubMenuLi"
                                  number={1}
                                  isSubCateShow={isSubCateShow}
                                  total={9}
                                >
                                  {!cookies.userjwt ? (
                                    <>

                                    </>
                                  ) : (
                                    <>
                                    </>
                                  )}
                                </SubMenuLi>
                              </SubMenuListItem>
                            </SubMenuList> */}

                          <SubMenuList className="SubMenuList" number={2} grouptotal={3}>
                            <SubMenuText className="cart-profile-text" isSubCateShow={isSubCateShow} number={2} total={7}>
                              내 프로필
                            </SubMenuText>
                            <SubMenuListItem>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi cart-profile"
                                number={3}
                                isSubCateShow={isSubCateShow}
                                total={7}
                              >
                                <NavCart.ProfileLink to={""} className="profile">
                                  <svg
                                    id="Outlined"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ac-gn-bagview-nav-svgicon"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 16 25"
                                  >
                                    <path
                                      id="art_"
                                      d="M14.5146,9.5234a2.56,2.56,0,0,0-1.11-1.4228l-4.25-2.3975a2.3909,2.3909,0,0,0-2.31,0l-4.25,2.3975a2.2971,2.2971,0,0,0-.6025.5107A2.2684,2.2684,0,0,0,1.4,10.1475v4.705a2.3546,2.3546,0,0,0,1.1953,2.0469l4.25,2.3975a2.3541,2.3541,0,0,0,2.31,0l4.25-2.3975A2.3546,2.3546,0,0,0,14.6,14.8525v-4.705A2.3322,2.3322,0,0,0,14.5146,9.5234ZM7.4,12.9453v5.2871L3.1851,15.8545a1.153,1.153,0,0,1-.585-1.002L2.603,10.24Zm.6-1.04L3.147,9.17a.4347.4347,0,0,1,.0385-.0244l1.7623-.9941,4.895,2.7158Zm5.4-1.666v4.6132a1.153,1.153,0,0,1-.585,1.002L8.6,18.2324V12.9453ZM8.5649,6.748l4.25,2.3975a.4347.4347,0,0,1,.0385.0244l-1.7842,1.0059L6.1733,7.46l1.2618-.712A1.1731,1.1731,0,0,1,8.5649,6.748Z"
                                      fill="6E6E73"
                                    ></path>
                                  </svg>
                                  <SubMenuName className="cartprofile">주문</SubMenuName>
                                </NavCart.ProfileLink>
                              </SubMenuLi>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi cart-profile"
                                number={4}
                                isSubCateShow={isSubCateShow}
                                total={7}
                              >
                                <NavCart.ProfileLink to={""} className="profile">
                                  <svg
                                    id="Outlined"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ac-gn-bagview-nav-svgicon"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 16 25"
                                  >
                                    <path
                                      id="art_"
                                      d="M10.3,5.15H5.7a2.3022,2.3022,0,0,0-2.3,2.3V19.0381a.8642.8642,0,0,0,.19.5869.67.67,0,0,0,.5313.2246.7441.7441,0,0,0,.438-.1465,4.8685,4.8685,0,0,0,.5366-.4765l2.8931-2.8858,2.9165,2.8867a6.4062,6.4062,0,0,0,.5307.4717.7286.7286,0,0,0,.4429.15.6684.6684,0,0,0,.5308-.2246.8619.8619,0,0,0,.19-.5869V7.45A2.3022,2.3022,0,0,0,10.3,5.15ZM4.6,7.45A1.102,1.102,0,0,1,5.7,6.35h4.6A1.102,1.102,0,0,1,11.4,7.45l-.0005,10.5781L8.832,15.4863a1.186,1.186,0,0,0-1.665.001L4.6,18.0293Z"
                                      fill="6E6E73"
                                    ></path>
                                  </svg>
                                  <SubMenuName className="cartprofile">관심목록</SubMenuName>
                                </NavCart.ProfileLink>
                              </SubMenuLi>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi cart-profile"
                                number={5}
                                isSubCateShow={isSubCateShow}
                                total={7}
                              >
                                <NavCart.ProfileLink to={""} className="profile">
                                  <svg
                                    id="Outlined"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ac-gn-bagview-nav-svgicon"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 16 25"
                                  >
                                    <path
                                      id="art_"
                                      d="M15.6094,12.3252a.5142.5142,0,0,0-.2959-.2959l-.5972-.2324a6.6665,6.6665,0,0,0-.16-.917l.4809-.42a.5172.5172,0,0,0-.3291-.9073l-.6372-.0136c-.0654-.1377-.1343-.2784-.2139-.4151s-.1635-.2636-.2519-.3935l.3076-.5576a.517.517,0,0,0-.62-.7393l-.6035.2051a6.68,6.68,0,0,0-.7134-.5977l.0986-.6328a.5172.5172,0,0,0-.43-.5918.54.54,0,0,0-.4052.1084l-.5015.4033A6.911,6.911,0,0,0,9.87,6.01l-.124-.6328a.5178.5178,0,0,0-.9512-.167l-.333.5507a7.2576,7.2576,0,0,0-.92.0039L7.2056,5.207a.518.518,0,0,0-.9512.167l-.125.6377a6.6192,6.6192,0,0,0-.8652.31l-.501-.4063a.5176.5176,0,0,0-.8364.4834l.0991.6358a6.6073,6.6073,0,0,0-.7017.5947L2.71,7.417a.5173.5173,0,0,0-.6211.7392l.3134.5694a6.7192,6.7192,0,0,0-.4653.7959l-.6421.0117a.516.516,0,0,0-.5083.5264.52.52,0,0,0,.1763.38l.4849.4238a6.8261,6.8261,0,0,0-.16.9111l-.6006.23a.5176.5176,0,0,0-.001.9658l.5972.2324a6.6665,6.6665,0,0,0,.16.917l-.4809.419a.5184.5184,0,0,0-.05.7314.52.52,0,0,0,.3789.1758l.6367.0137c.063.1318.1333.2754.2144.416.0673.1172.143.2246.2163.3281l.04.0566-.312.5664a.5176.5176,0,0,0,.2036.7032.52.52,0,0,0,.416.0361l.5967-.2031a6.82,6.82,0,0,0,.7207.5937l-.0991.6348a.5153.5153,0,0,0,.0933.3857.5187.5187,0,0,0,.7421.0977l.5064-.4082a6.6137,6.6137,0,0,0,.8628.3193l.1245.6358a.5139.5139,0,0,0,.22.33.53.53,0,0,0,.3877.0782.5193.5193,0,0,0,.3433-.24l.3388-.56.0577.0049a4.8076,4.8076,0,0,0,.7871.0019l.0669-.0058.3383.5625a.518.518,0,0,0,.9512-.167l.1245-.6348a6.6152,6.6152,0,0,0,.8589-.3193l.5088.4131a.5176.5176,0,0,0,.8364-.4834l-.0991-.6358a6.6173,6.6173,0,0,0,.7017-.5947l.6142.2119a.5174.5174,0,0,0,.6211-.7392l-.3135-.5694a6.6548,6.6548,0,0,0,.4649-.7959l.6421-.0117a.5168.5168,0,0,0,.5088-.5264.5166.5166,0,0,0-.1768-.38l-.4849-.4238a6.6694,6.6694,0,0,0,.16-.9111l.6006-.2315a.5177.5177,0,0,0,.2969-.6689ZM6.4941,13.9043,4.7666,16.8926a5.4449,5.4449,0,0,1,.0044-8.792L6.5,11.0986A2.0525,2.0525,0,0,0,6.4941,13.9043Zm2.1646-1.7822a.7608.7608,0,1,1-.4609-.3555A.7543.7543,0,0,1,8.6587,12.1221ZM7.54,10.499,5.8154,7.5068A5.4579,5.4579,0,0,1,7.9907,7.041h.0239a5.4693,5.4693,0,0,1,5.4068,4.8633l-3.457-.0029a2.0363,2.0363,0,0,0-.18-.43A2.0586,2.0586,0,0,0,7.54,10.499Zm-.0058,4.0049a2.0556,2.0556,0,0,0,2.435-1.4023l3.4512.0029a5.4455,5.4455,0,0,1-7.6147,4.3877Z"
                                      fill="6E6E73"
                                    ></path>
                                  </svg>
                                  <SubMenuName className="cartprofile">계정</SubMenuName>
                                </NavCart.ProfileLink>
                              </SubMenuLi>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi cart-profile"
                                number={6}
                                isSubCateShow={isSubCateShow}
                                total={7}
                              >
                                {!cookies.userjwt ? (
                                  <>
                                    <NavCart.ProfileLink to="./login" className="profile">
                                      <svg
                                        id="Outlined"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ac-gn-bagview-nav-svgicon"
                                        width="11"
                                        height="16"
                                        viewBox="0 0 16 25"
                                      >
                                        <path
                                          id="art_"
                                          d="M15.09,12.5a7.1,7.1,0,1,1-7.1-7.1A7.1077,7.1077,0,0,1,15.09,12.5ZM7.99,6.6a5.89,5.89,0,0,0-4.4609,9.7471c.6069-.9658,2.48-1.6787,4.4609-1.6787s3.8545.7129,4.4615,1.6787A5.89,5.89,0,0,0,7.99,6.6ZM7.99,8.4A2.5425,2.5425,0,0,0,5.5151,11,2.5425,2.5425,0,0,0,7.99,13.6,2.5424,2.5424,0,0,0,10.4653,11,2.5424,2.5424,0,0,0,7.99,8.4Z"
                                          fill="6E6E73"
                                        ></path>
                                      </svg>
                                      <SubMenuName className="cartprofile" onClick={account.login}>
                                        로그인
                                      </SubMenuName>
                                    </NavCart.ProfileLink>
                                  </>
                                ) : (
                                  <>
                                    <NavCart.ProfileLink to={""} onClick={account.logOut}>
                                      <svg
                                        id="Outlined"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ac-gn-bagview-nav-svgicon"
                                        width="11"
                                        height="16"
                                        viewBox="0 0 16 25"
                                      >
                                        <path
                                          id="art_"
                                          d="M15.09,12.5a7.1,7.1,0,1,1-7.1-7.1A7.1077,7.1077,0,0,1,15.09,12.5ZM7.99,6.6a5.89,5.89,0,0,0-4.4609,9.7471c.6069-.9658,2.48-1.6787,4.4609-1.6787s3.8545.7129,4.4615,1.6787A5.89,5.89,0,0,0,7.99,6.6ZM7.99,8.4A2.5425,2.5425,0,0,0,5.5151,11,2.5425,2.5425,0,0,0,7.99,13.6,2.5424,2.5424,0,0,0,10.4653,11,2.5424,2.5424,0,0,0,7.99,8.4Z"
                                          fill="6E6E73"
                                        ></path>
                                      </svg>
                                      <SubMenuName className="cartprofile">{user.name}&nbsp;로그아웃</SubMenuName>
                                    </NavCart.ProfileLink>
                                  </>
                                )}
                              </SubMenuLi>
                              <SubMenuLi
                                name={"cart"}
                                selectedCateName={selectedCateName}
                                className="SubMenuLi cart-profile"
                                number={7}
                                isSubCateShow={isSubCateShow}
                                total={7}
                              >
                                <NavCart.ProfileLink to="../" className="profile">
                                  <svg
                                    id="Outlined"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ac-gn-bagview-nav-svgicon"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 16 25"
                                  >
                                    <path
                                      id="art_"
                                      d="M15.6094,12.3252a.5142.5142,0,0,0-.2959-.2959l-.5972-.2324a6.6665,6.6665,0,0,0-.16-.917l.4809-.42a.5172.5172,0,0,0-.3291-.9073l-.6372-.0136c-.0654-.1377-.1343-.2784-.2139-.4151s-.1635-.2636-.2519-.3935l.3076-.5576a.517.517,0,0,0-.62-.7393l-.6035.2051a6.68,6.68,0,0,0-.7134-.5977l.0986-.6328a.5172.5172,0,0,0-.43-.5918.54.54,0,0,0-.4052.1084l-.5015.4033A6.911,6.911,0,0,0,9.87,6.01l-.124-.6328a.5178.5178,0,0,0-.9512-.167l-.333.5507a7.2576,7.2576,0,0,0-.92.0039L7.2056,5.207a.518.518,0,0,0-.9512.167l-.125.6377a6.6192,6.6192,0,0,0-.8652.31l-.501-.4063a.5176.5176,0,0,0-.8364.4834l.0991.6358a6.6073,6.6073,0,0,0-.7017.5947L2.71,7.417a.5173.5173,0,0,0-.6211.7392l.3134.5694a6.7192,6.7192,0,0,0-.4653.7959l-.6421.0117a.516.516,0,0,0-.5083.5264.52.52,0,0,0,.1763.38l.4849.4238a6.8261,6.8261,0,0,0-.16.9111l-.6006.23a.5176.5176,0,0,0-.001.9658l.5972.2324a6.6665,6.6665,0,0,0,.16.917l-.4809.419a.5184.5184,0,0,0-.05.7314.52.52,0,0,0,.3789.1758l.6367.0137c.063.1318.1333.2754.2144.416.0673.1172.143.2246.2163.3281l.04.0566-.312.5664a.5176.5176,0,0,0,.2036.7032.52.52,0,0,0,.416.0361l.5967-.2031a6.82,6.82,0,0,0,.7207.5937l-.0991.6348a.5153.5153,0,0,0,.0933.3857.5187.5187,0,0,0,.7421.0977l.5064-.4082a6.6137,6.6137,0,0,0,.8628.3193l.1245.6358a.5139.5139,0,0,0,.22.33.53.53,0,0,0,.3877.0782.5193.5193,0,0,0,.3433-.24l.3388-.56.0577.0049a4.8076,4.8076,0,0,0,.7871.0019l.0669-.0058.3383.5625a.518.518,0,0,0,.9512-.167l.1245-.6348a6.6152,6.6152,0,0,0,.8589-.3193l.5088.4131a.5176.5176,0,0,0,.8364-.4834l-.0991-.6358a6.6173,6.6173,0,0,0,.7017-.5947l.6142.2119a.5174.5174,0,0,0,.6211-.7392l-.3135-.5694a6.6548,6.6548,0,0,0,.4649-.7959l.6421-.0117a.5168.5168,0,0,0,.5088-.5264.5166.5166,0,0,0-.1768-.38l-.4849-.4238a6.6694,6.6694,0,0,0,.16-.9111l.6006-.2315a.5177.5177,0,0,0,.2969-.6689ZM6.4941,13.9043,4.7666,16.8926a5.4449,5.4449,0,0,1,.0044-8.792L6.5,11.0986A2.0525,2.0525,0,0,0,6.4941,13.9043Zm2.1646-1.7822a.7608.7608,0,1,1-.4609-.3555A.7543.7543,0,0,1,8.6587,12.1221ZM7.54,10.499,5.8154,7.5068A5.4579,5.4579,0,0,1,7.9907,7.041h.0239a5.4693,5.4693,0,0,1,5.4068,4.8633l-3.457-.0029a2.0363,2.0363,0,0,0-.18-.43A2.0586,2.0586,0,0,0,7.54,10.499Zm-.0058,4.0049a2.0556,2.0556,0,0,0,2.435-1.4023l3.4512.0029a5.4455,5.4455,0,0,1-7.6147,4.3877Z"
                                      fill="6E6E73"
                                    ></path>
                                  </svg>
                                  <SubMenuName className="cartprofile">관리자 페이지</SubMenuName>
                                </NavCart.ProfileLink>
                              </SubMenuLi>
                            </SubMenuListItem>
                          </SubMenuList>
                        </SubMenuInner>
                      </SubMenuHeight>
                    </SubMenu>
                  </NavTabMenuWrap>
                </>
              )}
            </NavHeight>
          </NavHeightWrap>

          <Routes>
            <Route path="/buy/:id" element={<Buy />} />
            <Route path="/products/:id" element={<Products gmId={gmId} categoryList={categoryList} setNavCart={setNavCart} isMobile={isMobile} />} />
            <Route path="/products/*" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
            <Route
              path="/:id"
              element={
                <Category
                  gmId={gmId}
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
            {/* <Route path="/mac" element={<Mac />} /> */}
            <Route path="/qna" element={<Qna />} />
            <Route path="/login" element={<Login setNavCart={setNavCart} />} />
            <Route path="/cart" element={<Cart setNavCart={setNavCart} />} />
            <Route path="usersign" element={<Usersign />} />
          </Routes>
          <FooterWrap className="FooterWrap">
            <FooterInner className="FooterInner">
              <Columns className="Columns">
                {footerArray.map((list: any) => (
                  <Column className="Column" name={list.title}>
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
                        {list.sections.map((list2: any) => (
                          <SectionList>
                            <SectionLink>{list2.name}</SectionLink>
                          </SectionList>
                        ))}
                      </SectionUl>
                    </ColumnSection>
                  </Column>
                ))}
              </Columns>
              <FooterBottom>
                <FooterShop>
                  다양한 쇼핑 방법: <a href="">Apple Store를 방문</a>하거나, <a href="">리셀러</a>를 찾아보거나, 080-330-8877번으로 전화하세요.
                </FooterShop>
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
          <Blur className="Blur" boolean={isSubCateShow} onMouseEnter={(e: any) => subMenuClose(e, "blur")}></Blur>
        </MainWrap>
      </ThemeProvider>
    </>
  );
}

export default Shop;
