import 'styled-components'
import { theme } from '@styles/theme';

declare module 'styled-components' {

 // ThemeProvider theme에 적용할 타입으로, theme의 속성과 동일하게 작성
  export interface DefaultTheme extends theme {
      navMain: string;
      navMainHover: string;
      navBG: string;
      navMobileBG: string;
      navSubBG: string;
      navSubHeader: string;
      navSub: string;
      navCartBtnBG: string;
      navCartBtnBGHover: string;
      navCartBtn: string;
      navCartBadgeBG: string;
      navCartBadge: string;
      chapterNavBG: string;
      chapterNavText: string;
      chapterNavTextHover: string;

      footerBG: string;
      footerTextColor: string;
      footerDirectoryTitleColor: string;
      footerDirectoryTitleColorHover: string;
      footerPipeColor: string;
      footerLinkColor: string;
      footerShopLinkColor: string;
      footerBorderColor: string;


      background1: string;
      background2: string;
      text: string;
      textHover: string;
      keyBg1: string;
      keyBg2: string;
      boardBg: string;
      boardBorder1: string;
      boardBorder2: string;
      button1: string;
      button2: string;
      color: {
        correct: string;
        present: string;
        absent: string;
      };
      navRate: string;
      navVisibleRate: string;
      navColorRate: string;
  }
}