import { DefaultTheme } from "styled-components";

const navRate = "240ms";
const navVisibleRate = "240ms";
const navColorRate = "240ms";

const navMobileRate = "400ms";
const navMobileVisibleRate = "263.5ms";
const navMobileColorRate = "430ms";

const color = {
  correct: "#5babab",
  present: "#fdb800",
  absent: "#908790",
};

export const lightTheme : DefaultTheme = {
  navMain: "rgba(0,0,0,.8)",
  navMainHover: "#000000",
  navBG: "rgba(251, 251, 253, 0)",
  navMobileBG: "#fafafc",
  navSubBG: "#fbfbfd",
  navSubHeader: "rgb(110,110,115)",
  navSub: "#333336",
  navCartBtnBG: "rgb(0, 113, 227)",
  navCartBtnBGHover: "#0077ED",
  navCartBtn: "rgb(255, 255, 255)",
  navCartBadgeBG: "rgb(0, 0, 0)",
  navCartBadge: "rgb(255, 255, 255)",
  chapterNavBG: "#fff",
  chapterNavText: "#1d1d1f",
  chapterNavTextHover: "#06c",
  footerBG: "#f5f5f7",
  footerTextColor: "#6e6e73",
  footerDirectoryTitleColor: "#1d1d1f",
  footerDirectoryTitleColorHover: "#1d1d1f",
  footerPipeColor: "#424245",
  footerLinkColor: "#424245",
  footerShopLinkColor: "#06c",
  footerBorderColor: "#d2d2d7",


  background1: "#fefefe",
  background2: "#fefefe", // 다이얼로그
  text: "#202124",
  textHover: "rgba(255,255,255,.8)",
  keyBg1: "#e3e1e3",
  keyBg2: "#cfcbcf",
  boardBg: "white",
  boardBorder1: "#cfcbcf",
  boardBorder2: "#202124", // 활성화시
  button1: "#e3e1e3",
  button2: "908790",
  color: { ...color },
  navRate: navRate,
  navVisibleRate: navVisibleRate,
  navColorRate: navColorRate,
  navMobileRate: navMobileRate,
  navMobileVisibleRate: navMobileVisibleRate,
  navMobileColorRate: navMobileColorRate,

};

export const darkTheme : DefaultTheme = {
  navMain: "rgba(255,255,255,.8)",
  navMainHover: "#ffffff",
  navBG: "black",
  navMobileBG: "#161617",
  navSubBG: "#161617",
  navSubHeader: "rgb(134,134,139)", 
  navSub: "#E8E8ED",
  navCartBtnBG: "rgb(0, 113, 227)",
  navCartBtnBGHover: "#0077ED",
  navCartBtn: "rgb(255, 255, 255)",
  navCartBadgeBG: "rgb(0, 0, 0)",
  navCartBadge: "rgb(255, 255, 255)",
  chapterNavBG: "black",
  chapterNavText: "#f5f5f7",
  chapterNavTextHover: "#2997ff",
  footerBG: "#f5f5f7",
  footerTextColor: "#6e6e73",
  footerDirectoryTitleColor: "#1d1d1f",
  footerDirectoryTitleColorHover: "#1d1d1f",
  footerPipeColor: "#424245",
  footerLinkColor: "#424245",
  footerShopLinkColor: "#06c",
  footerBorderColor: "#d2d2d7",


  background1: "#202124",
  background2: "#38393e", // 다이얼로그
  text: "rgba(255,255,255,.8)",
  textHover: "rgba(255,255,255,.8)",
  keyBg1: "#403c40",
  keyBg2: "#766c76",
  boardBg: "#131213",
  boardBorder1: "#766c76",
  boardBorder2: "#e3e1e3", // 활성화시
  button1: "#5c565c",
  button2: "#908790",
  color: { ...color },
  navRate: navRate,
  navVisibleRate: navVisibleRate,
  navColorRate: navColorRate,
  navMobileRate: navMobileRate,
  navMobileVisibleRate: navMobileVisibleRate,
  navMobileColorRate: navMobileColorRate,
};

export const theme = {
    lightTheme, darkTheme
}

export default theme;