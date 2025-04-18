import axios from "../../api/axios";
import styled, { css, keyframes } from "styled-components";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ObjectId } from "mongodb";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../adminPage/Category";
import "./Category.scss";

import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

interface AdverInnerType extends AdverInner, Type {}
interface TypeImage extends Type, Image {}
interface Image {
  src: string;
}

interface AdverInner {
  backcolor: string;
}

interface Type {
  type: number;
}

interface ChapterNavItems {}

// 카테고리 클릭후 나오는 상품 메인사진

const AdverWrap = styled.div`
  &:first-child {
    /* padding: 30px 0; */
  }
`;

const AdverWrap2 = styled.div<AdverInner>`
  display: flex;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.backcolor};
  overflow: hidden;
`;

const AdverWidth = styled.div`
  display: flex;
  /* width: 980px; */
`;

const Adver = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const AdverInner = styled.div<Type>`
  min-height: 672px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  text-align: center;
  width: 100%;

  ${(props) =>
    props.type === 0 &&
    css`
      padding: 60px 0;
    `}

  ${(props) =>
    props.type === 1 &&
    css`
      padding: 60px 0;
    `}

  ${(props) =>
    props.type === 2 &&
    css`
      display: flex;
      justify-content: flex-end;
      align-items: center;

      flex-direction: row;
      /* max-width: 1440px; */
      height: 800px;
    `}

    @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;
        max-width: 1440px;
        height: 800px;
        /* margin-left: auto; */
        /* margin-right: auto; */
        margin-bottom: 100px;
      `}
  }
`;

const AdverTextWrap = styled.div<Type>`
  ${(props) =>
    props.type === 0 &&
    `

  `}
  ${(props) =>
    props.type === 1 &&
    `

  `}
  ${(props) =>
    props.type === 2 &&
    css`
      display: flex;
      flex-direction: column;
      flex: 50%;
    `}

      @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* margin-bottom: 200px; */
      `}
  }
`;

const AdverImageWrap = styled.div<Type>`
  ${(props) =>
    props.type === 0 &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0px;
      margin-bottom: 0px;
    `}

    @media only screen and (max-width: 400px) {
    ${(props) =>
      props.type === 0 &&
      css`
      margin-top: 0px;
      margin-bottom: 0px;
      `}
  }

  ${(props) =>
    props.type === 1 &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 170px;
      margin-bottom: 100px;
    `}

  ${(props) =>
    props.type === 2 &&
    css`
      flex-basis: 50%;
      max-width: 50%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `}

      @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
  }
`;

const AdverImage = styled.img<TypeImage>`
  ${(props) =>
  props.type === 0 &&
  css`
    
    max-width: 100%;
    max-height: 800px;


  `}

  @media only screen and (max-width: 400px) {
    ${(props) =>
      props.type === 0 &&
      css`
        max-width: 400px;
        max-height: 800px;
      `}
  }

  ${(props) =>
  props.type === 1 && css`
  max-width: 700px;
  max-height: 800px;
  
    

  `}
  ${(props) =>
    props.type === 2 &&
    css`
      max-width: 700px;
      max-height: 800px;
    `}

      @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        max-width: 400px;
        max-height: 800px;
      `}
  }

  @media only screen and (max-width: 1250px) {
    ${(props) =>
      props.type === 2 &&
      css`
        max-width: 500px;
        max-height: 800px;
      `}
  }
`;

const AdverMainTitle = styled.h2<Type>`
  font-size: 56px;
  font-weight: 600;
  color: #1d1d1f;
  margin-top: 4px;

  ${(props) =>
    props.type === 2 &&
    css`
      font-size: 60px;
      font-weight: 700;
      letter-spacing: -3px;
      text-align: left;
    `}
`;

const AdverSubTitle = styled.span<Type>`
  margin-top: 8px;
  font-size: 17px;
  font-weight: 500;

  ${(props) =>
    props.type === 2 &&
    css`
      text-align: left;
    `}
`;

const AdverSubDetail = styled.span<Type>`
  display: block;
  font-size: 17px;
  font-weight: 300;
  color: #1d1d1f;
  margin-top: 30px;
  line-height: 1.58824;

  ${(props) =>
    props.type === 2 &&
    css`
      text-align: left;
    `}

  @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        margin-top: 20px;
      `}
  }
`;

const AdverDetail = styled.span<Type>`
  display: block;
  margin-top: 4px;
  font-size: 31px;
  font-weight: 700;
  color: #1d1d1f;
  line-height: 1.21875;

  ${(props) =>
    props.type === 2 &&
    css`
      text-align: left;
      font-size: 28px;
      max-width: 460px;
    `}

  @media only screen and (max-width: 1000px) {
    ${(props) =>
      props.type === 2 &&
      css`
        margin-top: 20px;
        font-size: 20px;
        max-width: 320px;
      `}
  }
`;

const Links = styled.div<Type>`
  margin-top: 14px;

  ${(props) =>
    props.type === 0 &&
    `
  `}
  ${(props) =>
    props.type === 1 &&
    `
  `}
  ${(props) =>
    props.type === 2 &&
    css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
    `}
`;

const BuyLink = styled(Link)`
    min-width: 28px;
`;

const DetailLink = styled(Link)`
  margin-top: 14px;
  font-size: 21px;
  font-weight: 400;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  line-height: 1.17648;
  font-weight: 400;
  min-width: 28px;
  color: #06c;
  margin: 0 10px;

  &:after {
    position: relative;
    font-family: "SF Pro Icons";
    content: "\f301";
    font-weight: 500;
    top: -0.08em;
    padding-left: 0.3em;
  }
`;

const ScoreWrap = styled.div``;

const ShippingWrap = styled.div``;

export interface productList {
  _id: ObjectId;
  userID: ObjectId;
  category1: {
    name: string;
    code: number;
  };
  category2: {
    name: string;
    code: number;
    parentname: string;
    parentcode: number;
  };
  category3: {
    name: string;
    code: number;
    parentname: string;
    parentcode: number;
  };
  category4: {
    name: string;
    code: number;
    parentname: string;
    parentcode: number;
  };
  name: string;
  cost: string;
  price: string;
  option: [
    {
      id: Number;
      optionName: String;
      optionValue: String;
      optionPrice: Number;
      optionStatus: String;
      optionStock: String;
      optionUse: String;
      deleteBtn: String;
      optionName1: String;
      optionValue1: String;
      optionName2: String;
      optionValue2: String;
      optionName3: String;
      optionValue3: String;
      optionName4: String;
      optionValue4: String;
      optionName5: String;
      optionValue5: String;
      optionName6: String;
      optionValue6: String;
    }
  ];
  optionList: [
    {
      name: string;
      values: string[];
      image: [string[]];
      price: number[];
    }
  ];
  mainImage: string[];
  subImage: string[] | null;
  detailImage: string[] | null;
  delivery: string;
  category: Array<{
    name: String;
    type: String;
    user: String;
    _id: String;
    parentID?: String;
  }>;
  __v: number;
}

const chapterNavAni = keyframes`
  0% {
    opacity: 0;
  }
  1% {
    transform: translateX(160px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 아이콘 네비게이션
const ChapterNav = styled.div`
  position: relative;
  padding: 16px 0;
  text-align: center;
  width: 100%;
  height: 120px;
  background-color: ${(props) => props.theme.chapterNavBG};
  overflow: hidden;
  white-space: nowrap;

  @media only screen and (max-width: 833px) {
  }
`;

const ChapterNavWrap = styled.div`
  height: 100%;
  position: relative;
`;

const ChapterNavItems = styled.ul<ChapterNavItems>`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding-bottom: 50px;
  margin: 0 34px;
  scroll-behavior: smooth;
`;

const Buttons = styled.button`
  border: 0 solid ${(props) => props.theme.chapterNavArrowBorderColor};
  border-radius: 0;
  /* color: ${(props) => props.theme.chapterNavArrowColor}; */
  opacity: 0.8;
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
  width: calc(34px - 1px);
  transition: opacity ${(props) => props.theme.navMobileColorRate} ease-out;
  background-color: transparent;
`;

interface ChapterNavButtonsType {
  isChapterNavScroll: boolean;
}

const ChapterNavButtons = styled.div<ChapterNavButtonsType>`
  opacity: ${(props) => (props.isChapterNavScroll ? "1" : "0")};
  transition: opacity ${(props) => props.theme.navMobileColorRate} ease-out;
`;

interface ButtonsType {
  scrollLeft?: number | null;
  scrollWidth?: number;
  clientWidth?: number;
}

const LeftButton = styled(Buttons)<ButtonsType>`
  left: 0;
  border-right-width: 1px;
  opacity: ${({ scrollLeft }) => (scrollLeft === 0 ? 0 : 1)};
  color: ${(props) => props.theme.chapterNavArrowColor};

  /* &::after {
    content: "";
    font-family: SF Pro Icons;
  } */

  &:hover {
    ${(props) =>
      props.scrollLeft !== 0 &&
      css`
        opacity: 1;
        transition: opacity ${(props) => props.theme.chapterNavButtonHoverRate} linear;
      `}
  }
`;

const RightButton = styled(Buttons)<ButtonsType>`
  right: 0;
  border-left-width: 1px;
  color: ${(props) => props.theme.chapterNavArrowColor};

  opacity: ${({ scrollLeft, clientWidth, scrollWidth }) =>
    (scrollLeft && clientWidth && scrollWidth && scrollLeft + clientWidth >= scrollWidth) ||
    (scrollLeft && clientWidth && scrollWidth && scrollLeft + clientWidth === scrollWidth)
      ? 0
      : 1};

  /* &::after {
    content: "";
    font-family: SF Pro Icons;
  } */

  &:hover {
    ${(props) =>
      props.scrollLeft === 0 &&
      css`
        opacity: 1;
        transition: opacity ${(props) => props.theme.chapterNavButtonHoverRate} linear;
      `}
  }
`;

interface ChapterNavItem {
  columnname?: string | undefined;
  taskname: string;
  isChapterNavRender: boolean;
}

const ChapterNavItem = styled.li<ChapterNavItem>`
  display: inline-block;
  vertical-align: top;
  margin: 0 -0.1176470588em;
  padding: 0 20px;

  &:first-child {
    margin-left: 0;
    padding-left: 4px;
  }

  &:last-child {
    margin-right: 0;
    padding-right: 4px;
  }

  ${(props) =>
    props.isChapterNavRender &&
    css`
      animation: ${chapterNavAni} 0.35s backwards;
    `}

  // Watch
  ${(props) => {
    if (props.columnname === "Watch") {
      return css`
        padding: 0 9px;
        &:last-child {
          margin-right: 0;
          padding: 0 4px 0 9px;
        }
      `;
    }
  }}

  ${(props) => {
    if (props.taskname === "비교하기") {
      return css`
        padding: 0 16px;
      `;
    }
    if (props.taskname === "밴드") {
      return css`
        padding: 0 15px;
      `;
    }
    if (props.taskname === "AirPods") {
      return css`
        padding: 0 20px;
      `;
    }
    if (props.taskname === "watchOS 10") {
      return css`
        padding: 0 20px;
      `;
    }
  }}

  // 엔터테인먼트
  ${(props) =>
    props.columnname === "엔터테인먼트" &&
    css`
      padding: 0 15px;
    `};

  // 고객지원
  ${(props) =>
    props.columnname === "고객지원" &&
    css`
      width: 130px;
      padding: 0 10px;
      opacity: 1;
      transform: translateX(0);

      &:first-child {
        padding: 0 10px;
      }
      &:last-child {
        padding: 0 10px;
      }
    `};
`;

interface ChapterNavLink {
  columnname: string | undefined;
  taskname: string;
}

const ChapterNavLink = styled(Link)<ChapterNavLink>`
  display: block;
  color: #1d1d1f;
  padding: 0;
  margin-top: 3px;
  position: relative;
  z-index: 1;

  .LazyLoad {
    /* max-height: 52px; */
    
    img {
      width: auto;
      height: 54px;
    }
  }

  // 고객지원
  ${(props) => {
    if (props.columnname === "고객지원") {
      return css`
        gap: 16px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      `;

      if (props.taskname === "iPhone") {
        return `

      `;
      }
    }
  }}
`;

interface ChapterNavIcon {
  columnname: string | undefined;
  taskname: string;
  icon?: string;
  width?: number;
  height?: number;
  parentID: string;
  darkMode?: boolean;
}

const ChapterNavIcon = styled.svg<ChapterNavIcon>`
  display: block;
  /* width: 100%; */
  height: 100px;
  margin: 0 auto 7px;
  /* width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-size: ${(props) => props.width}px ${(props) => props.height}px; */
  /* background-repeat: no-repeat; */
  /* background-image: url(${(props) => props.icon}); */
  margin-bottom: 4px;

  ${(props) =>
    props.darkMode &&
    css`
      filter: brightness(100);
    `}

  // Mac
  ${(props) => {
    if (props.parentID === "64ff1ccbe3ac394d8361dae7") {
      switch (props.taskname) {
        case "Mac Pro":
        case "Sonoma":
          return css`
            width: 35px;
            height: 54px;
            background-size: 35px 54px;
          `;
        case "Mac mini":
        case "Mac Studio":
          return css`
            width: 28px;
            height: 54px;
            background-size: 28px 54px;
          `;
        case "MacBook Pro 13":
          return css`
            width: 54px;
            height: 54px;
            background-size: 54px 54px;
          `;
        default:
          return "";
      }
    }
  }}

  // MacBook Air
  ${(props) => {
    if (props.parentID === "64ff27d33c9faa3d2f6fbb9f") {
      switch (props.taskname) {
        case "Sonoma":
          return css`
            width: 35px;
            height: 54px;
            background-size: 35px 54px;
          `;
        default:
          return "";
      }
    }
  }}

  // MacBook Pro
  ${(props) => {
    if (props.parentID === "64ff27dc3c9faa3d2f6fbbfb") {
      switch (props.taskname) {
        case "MacBook Pro 13":
          return css`
            width: 54px;
            height: 54px;
            background-size: 54px 54px;
          `;
        default:
          return "";
      }
    }
  }}

  // iPad
  ${(props) => {
    if (props.parentID === "64ff1cd6e3ac394d8361dc68") {
      switch (props.taskname) {
        case "iPad Pro":
          return css`
            width: 41px;
            height: 54px;
            background-size: 41px 54px;
          `;
        case "iPad Air":
        case "액세서리":
        case "iPadOS 17":
          return css`
            width: 30px;
            height: 54px;
            background-size: 30px 54px;
          `;
        case "Apple Pencil":
          return css`
            width: 3px;
            height: 54px;
            background-size: 3px 54px;
          `;
        case "키보드":
          return css`
            width: 63px;
            height: 54px;
            background-size: 63px 54px;
          `;
        default:
          return "";
      }
    }
  }}

  // 다른 방법 기록용
  ${(props) => {
    const sizes = {
      "iPhone SE": { width: 19, height: 54 },
      AirTag: { width: 30, height: 54 },
      "iOS 17": { width: 32, height: 54 },
    };

    const { taskname, parentID } = props;

    if (parentID === "64ff1cdfe3ac394d8361ddee" && sizes[taskname]) {
      const { width, height } = sizes[taskname];
      return css`
        width: ${width}px;
        height: ${height}px;
        background-size: ${width}px ${height}px;
      `;
    }
  }}

  ${(props) => {
    const sizes = {
      "iPad(10세대)": { width: 30, height: 54 },
      "iPad(9세대)": { width: 30, height: 54 },
      "Apple Pencil": { width: 3, height: 54 },
      키보드: { width: 63, height: 54 },
      액세서리: { width: 31, height: 54 },
      "iPadOS 17": { width: 32, height: 54 },
    };

    const { taskname, parentID } = props;

    if (parentID === "64ff28633c9faa3d2f6fc2ed" && sizes[taskname]) {
      const { width, height } = sizes[taskname];
      return css`
        width: ${width}px;
        height: ${height}px;
        background-size: ${width}px ${height}px;
      `;
    }
  }}

  // Watch
  ${(props) => {
    if (props.parentID === "64ff1d19e3ac394d8361df79") {
      switch (props.taskname) {
        case "밴드":
          return css`
            width: 17px;
            height: 54px;
            background-size: 17px 54px;
          `;
        case "watchOS 10":
          return css`
            width: 35px;
            height: 54px;
            background-size: 35px 54px;
          `;
        default:
          return "";
      }
    }
  }}

  // TV 및 홈
  ${(props) => {
    if (props.parentID === "64ff1d24e3ac394d8361e29e") {
      switch (props.taskname) {
        case "Apple TV 앱":
          return css`
            width: 50px;
            height: 54px;
            background-size: 50px 54px;
          `;
        case "Apple TV+":
          return css`
            width: 47px;
            height: 54px;
            background-size: 47px 54px;
          `;
      }
    }
  }}

// 액세서리
  ${(props) => {
    if (props.taskname === "iPad" && props.parentID === "64ff1d2fe3ac394d8361e5d7") {
      return css`
        width: 47px;
        height: 54px;
        background-size: 47px 54px;
      `;
    }
  }}

  // 고객지원
  ${(props) => {
    if (props.parentID === "64ff1d34e3ac394d8361e77b") {
      switch (props.taskname) {
        case "iPhone":
          return css`
            width: 34px;
            height: 68px;
            background-size: 34px 68px;
          `;
        case "Mac":
          return css`
            width: 96px;
            height: 68px;
            background-size: 96px 68px;
          `;
        case "iPad":
          return css`
            width: 80px;
            height: 68px;
            background-size: 80px 68px;
          `;
        case "Watch":
          return css`
            width: 42px;
            height: 68px;
            background-size: 42px 68px;
          `;
        case "AirPods":
          return css`
            margin-top: 8px;
            width: 66px;
            height: 60px;
            background-size: 66px 60px;
          `;
        case "Music":
          return css`
            width: 68px;
            height: 68px;
            background-size: 68px 68px;
          `;
        case "TV":
          return css`
            width: 72px;
            height: 68px;
            background-size: 72px 68px;
          `;
      }
    }
  }}
`;

interface ChapterNavName {
  columnname?: string | undefined;
}

const ChapterNavName = styled.span<ChapterNavName>`
  display: block;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.33337;
  color: ${(props) => props.theme.chapterNavText};
  white-space: normal;
  margin: 0 auto;
  user-select: none;

  &.message {
    display: block;
    font-size: 10px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.008em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    color: rgb(182,68,0);
  }

  ${(props) =>
    props.columnname === "Watch"
      ? css`
          display: block;
          max-width: 7em;
        `
      : ""};

  @media only screen and (max-width: 833px) {
  }
`;

const NavNew = styled.span``;

type IconSize = {
  _id: string;
  name: string;
  icon: string;
  width?: number | undefined;
  height?: number | undefined;
};

const CategoryWrap = styled.div``;

interface Props {
  categoryList: ColumnType[];
  selectedColumn: ColumnType | null;
  selectedTask: TaskType | null;
  setSelectedColumn: React.Dispatch<React.SetStateAction<ColumnType | null>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Category({ categoryList, selectedColumn, setSelectedColumn, selectedTask, setSelectedTask, setIsDarkMode }: Props) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(0);

  const [isIdNotFound, setIsIdNotFound] = useState<boolean>(false);
  const [advertise, setAdvertise] = useState<Advertise[]>([]);

  const [isChapterNavRender, setIsChapterNavRender] = useState<boolean>(false);
  const [isChapterNavScroll, setIsChapterNavScroll] = useState<boolean>(false);

  const scrollWrapRef = useRef<HTMLUListElement | null>(null);
  const scrollListRef = useRef<HTMLDivElement | null>(null);

  const [iconSize, setIconSize] = useState<IconSize[]>([]);

  useEffect(() => {
    setIsChapterNavRender(true);
  }, []);

  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await axios.post(`/smartstore/shop/${id}`, { selectedTask }, { withCredentials: true });

        setIsIdNotFound(false);
        setIsDarkMode(false);

        if (res.data.findColumn) {
          const adminColumn = res.data.findColumn;

          if (adminColumn.darkMode) {
            setIsDarkMode(adminColumn.darkMode);
          }

          setSelectedColumn(adminColumn);
          setSelectedTask(null);
          setAdvertise(res.data.Advertises);
        } else if (res.data.findTask) {
          const adminTask = res.data.findTask;

          if (adminTask.darkMode) {
            setIsDarkMode(adminTask.darkMode);
          }

          setSelectedColumn(null);
          setSelectedTask(adminTask);
          setAdvertise(res.data.Advertises);
        } else {
          if (!res.data.status) {
            setIsIdNotFound(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    categoryData();
  }, [id]);

  useEffect(() => {
    const loadImageSize = async (list: any) => {
      console.log(list);
      return new Promise<IconSize>((resolve) => {
        let width: number | undefined;
        let height: number | undefined;
        if (list.icon[0]) {
          const img = new Image();
          img.src = list.icon;
          img.onload = () => {
            width = img.naturalWidth;
            height = img.naturalHeight;
            resolve({ _id: list._id, name: list.name, icon: list.icon, width, height });
          };
          img.onerror = () => {
            resolve({ _id: list._id, name: list.name, icon: list.icon, width, height });
          };
        } else {
          resolve({ _id: list._id, name: list.name, icon: list.icon, width, height });
        }
      });
    };

    const loadAllImageSizes = async () => {
      if (selectedColumn && selectedColumn.taskIds) {
        const promises = selectedColumn.taskIds.map((list) => loadImageSize(list));
        const newIconSize = await Promise.all(promises);
        setIconSize(newIconSize);
      }

      if (selectedTask && selectedTask.subTaskIds) {
        const promises = selectedTask.subTaskIds.map((list) => loadImageSize(list));
        const newIconSize = await Promise.all(promises);
        setIconSize(newIconSize);
      }
    };

    loadAllImageSizes();
  }, [selectedColumn, selectedTask]);

  useEffect(() => {
    const handleResize = () => {
      const scrollableElement = scrollWrapRef.current;
      const listRef = scrollListRef.current;

      if (scrollableElement) {
        scrollableElement.scrollLeft = 0;

        const { scrollLeft, clientWidth, scrollWidth } = scrollableElement;

        const timer = setTimeout(() => {
          if (scrollableElement) {
            setClientWidth(scrollableElement.clientWidth);
            setScrollWidth(scrollableElement.scrollWidth);
            setIsChapterNavScroll(scrollableElement.scrollWidth !== scrollableElement.clientWidth);
          }
        }, 1000);

        return () => clearTimeout(timer);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  // console.log("scrollLeft " + scrollLeft);
  // console.log("clientWidth " + clientWidth);
  // console.log("scrollWidth " + scrollWidth);

  // 선택된 메인 카테고리 (selectedColumn)의 list.icon의 여부를 체크후 width와 height값을 계산하여
  // iconSize 배열에 새롭게 등록합니다.
  // iconSize는 CSS에 width와 height에 사용합니다.

  const handleScroll = (direction) => {
    const scrollAmount = scrollWidth / 5;
    const scrollableElement = scrollWrapRef.current;

    if (scrollableElement) {
      if (direction === "left") {
        scrollableElement.scrollLeft -= scrollAmount;
      } else {
        scrollableElement.scrollLeft += scrollAmount;
      }
      setScrollLeft(scrollableElement.scrollLeft);
    }
  };

  const touchScroll = (e: any) => {
    const scrollLeft = e.target.scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const renderAdvertise = (advertise: any) => {
    return (
      <AdverWrap key={advertise._id} className="AdverWrap">
        <AdverWrap2 className="AdverWrap2" backcolor={advertise.backcolor}>
          <AdverWidth>
            <AdverInner className="AdverInner" type={advertise.type}>
              <AdverTextWrap type={advertise.type}>
                <AdverSubTitle type={advertise.type} style={{ color: advertise.subtitleColor }}>{advertise.subtitle}</AdverSubTitle>
                <AdverMainTitle type={advertise.type} style={{ color: advertise.maintitleColor }}>{advertise.maintitle}</AdverMainTitle>
                <AdverDetail type={advertise.type} style={{ color: advertise.detailColor }}>{advertise.detail}</AdverDetail>
                <AdverSubDetail type={advertise.type} style={{ color: advertise.subdetailColor }}>{advertise.subdetail}</AdverSubDetail>
                <Links type={advertise.type}>
                  <BuyLink className="adver-blue-btn" to={`/shop/products/${advertise.url}`}>
                    <span className="text">구입하기</span>
                  </BuyLink>
                  <DetailLink to={`/shop/products/${advertise.url}`}>더 알아보기</DetailLink>
                </Links>
              </AdverTextWrap>
              {advertise.type !== 2 && <ShippingWrap></ShippingWrap>}
              <AdverImageWrap type={advertise.type}>
                <AdverImage type={advertise.type} src={advertise.image} />
              </AdverImageWrap>
            </AdverInner>
          </AdverWidth>
        </AdverWrap2>
      </AdverWrap>
    );
  };

  return (
    <>
      {!isIdNotFound ? (
        <>
          <ChapterNav className="ChapterNav" ref={scrollListRef}>
            <ChapterNavWrap className="ChapterNavWrap">
              <ChapterNavItems className="ChapterNavItems" id="test" ref={scrollWrapRef} onScroll={touchScroll}>
                {selectedColumn?.taskIds?.map((taskId) => {
                  if (taskId.chapterNavHide) return null;
                  const iconItem = iconSize.find((item) => item.name === taskId.name);
                  return (
                    <ChapterNavItem
                      key={taskId._id}
                      className="ChapterNavItem"
                      columnname={selectedColumn?.name}
                      taskname={taskId.name || ''}
                      isChapterNavRender={isChapterNavRender}
                    >
                      <ChapterNavLink
                        className="ChapterNavLink"
                        to={`${taskId.subTaskIds && taskId.subTaskIds.length > 0 ? "../" : "/shop/products/"}${taskId.url}`}
                        columnname={selectedColumn?.name}
                        taskname={taskId.name || ''}
                        type={taskId.type}
                      >
                        <LazyLoad className='LazyLoad' height={100} offset={100} placeholder={<Skeleton width={100} height={100} />}>
                          {iconItem?.icon && (
                            // <ChapterNavIcon
                            //   className="ChapterNavIcon"
                            //   columnname={selectedColumn?.name}
                            //   taskname={taskId.name || ''}
                            //   parentID={taskId.parentID}
                            //   icon={iconItem?.icon}
                            //   width={iconItem?.width}
                            //   height={iconItem?.height}
                            //   darkMode={selectedColumn.darkMode}
                            // />
                          <img src={iconItem?.icon} alt="" />
                          )}
                        </LazyLoad>
                        <ChapterNavName className="ChapterNavName" columnname={selectedColumn?.name}>
                          {taskId.name}
                        </ChapterNavName>
                          <ChapterNavName className="message">
                          {taskId.message}
                          </ChapterNavName>
                      </ChapterNavLink>
                    </ChapterNavItem>
                  );
                })}
                {selectedTask?.subTaskIds?.map((taskId, index) => {
                  if (taskId.chapterNavHide) return null;
                  const iconItem = iconSize.find((item) => item.name === taskId.name);
                  return (
                    <ChapterNavItem
                      key={index}
                      className="ChapterNavItem"
                      columnname={selectedTask.name}
                      taskname={taskId.name || ''}
                      isChapterNavRender={isChapterNavRender}
                    >
                      <ChapterNavLink
                        className="ChapterNavLink"
                        to={`/shop/products/${taskId.url}`}
                        columnname={selectedTask.name}
                        taskname={taskId.name || ''}
                      >
                        <LazyLoad className='LazyLoad' height={100} offset={100} placeholder={<Skeleton width={100} height={100} />}>
                          {iconItem?.icon && (
                            // <ChapterNavIcon
                            //   className="ChapterNavIcon"
                            //   columnname={selectedTask.name}
                            //   taskname={taskId.name || ''}
                            //   parentID={taskId.parentID}
                            //   icon={iconItem?.icon}
                            //   width={iconItem?.width}
                            //   height={iconItem?.height}
                            //   darkMode={taskId.darkMode}
                            // />
                            <img src={iconItem?.icon} alt="" />
                          )}
                        </LazyLoad>
                        <ChapterNavName className="ChapterNavName" columnname={selectedTask.name}>
                          {taskId.name}
                        </ChapterNavName>
                      </ChapterNavLink>
                    </ChapterNavItem>
                  );
                })}
              </ChapterNavItems>
              <ChapterNavButtons className="ChapterNavButtons" isChapterNavScroll={isChapterNavScroll}>
                <LeftButton
                  className="ChapterNavButton ChapterNavButton-Left"
                  onClick={() => handleScroll("left")}
                  scrollLeft={scrollLeft}
                  scrollWidth={scrollWidth}
                >
                  <svg width="7" height="13" viewBox="0 0 7 13" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="currentcolor"
                      d="m2.252 6.5001s0-.0001 0-.0001l4.4336-4.877c.3438-.3789.3164-.9648-.0625-1.3086s-.9648-.3174-1.3086.0625l-5 5.5c-.3212.3535-.3212.8927 0 1.2462l5 5.5c.3438.3799.9297.4062 1.3086.0625s.4062-.9297.0625-1.3086z"
                    ></path>
                  </svg>
                </LeftButton>
                <RightButton
                  className="ChapterNavButton ChapterNavButton-Right"
                  onClick={() => handleScroll("right")}
                  scrollLeft={scrollLeft}
                  clientWidth={clientWidth}
                  scrollWidth={scrollWidth}
                >
                  <svg width="7" height="13" viewBox="0 0 7 13" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="currentcolor"
                      d="m4.748 6.5001s0-.0001 0-.0001l-4.4336-4.877c-.3438-.3789-.3164-.9649.0625-1.3086s.9648-.3174 1.3086.0625l5 5.5c.3213.3535.3213.8927 0 1.2462l-5 5.5c-.3438.3799-.9297.4062-1.3086.0625s-.4062-.9297-.0625-1.3086l4.4336-4.877z"
                    ></path>
                  </svg>
                </RightButton>
              </ChapterNavButtons>
            </ChapterNavWrap>
          </ChapterNav>
          <Adver className="ProductsWrap">
            {advertise?.map((advertise: any, index: number) => {
              return renderAdvertise(advertise);
            })}
          </Adver>
        </>
      ) : (
        <div style={{ margin: "150px auto" }}>
          <div style={{ fontSize: "48px", fontWeight: "700", textAlign: "center" }}>
            <p>찾으시는 페이지가</p>
            <p>없는 듯 하네요.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
