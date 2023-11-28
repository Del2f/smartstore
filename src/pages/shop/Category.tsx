import axios from "../../api/axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ObjectId } from "mongodb";
import { GmIdType } from "./Shop";
import { ColumnType, TaskType, SubTaskType, Advertise } from "../adminPage/Category";
import "./Category.scss";

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
  width: 980px;
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
    `
    padding: 60px 0;
    `}
  ${(props) =>
    props.type === 1 &&
    `
    padding: 60px 0;
    `}
  ${(props) =>
    props.type === 2 &&
    `
    display: flex;
    justify-content: flex-end;
    align-items: center;

    flex-direction: row;
    max-width: 1440px;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
  `}
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
    `
    display: flex;
    flex-direction: column;
    flex: 30%;
    z-index: 1;
  `}
`;

const AdverImageWrap = styled.div<Type>`
  ${(props) =>
    props.type === 0 &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 170px;
    margin-bottom: 100px;
  `}
  ${(props) =>
    props.type === 1 &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 170px;
    margin-bottom: 100px;
  `}
  ${(props) =>
    props.type === 2 &&
    `
    flex-basis: 70%;
    max-width: 70%;
    height: 100%;
  `}
`;

const AdverImage = styled.img<TypeImage>`

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
    `
    position: absolute;
    top: 0px;
    left: 50%;
    margin-left: -210px;
    max-width: 1000px;
    max-height: 800px;
  `}
`;

const AdverMainTitle = styled.h2<Type>`
  font-size: 56px;
  font-weight: 600;
  color: #1d1d1f;
  margin-top: 4px;

  ${(props) =>
    props.type === 2 &&
    `
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
    `
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
    `
    text-align: left;

  `}
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
    `
  text-align: left;
  font-size: 28px;
  max-width: 460px;
  `}
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
    `
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `}
`;

const BuyLink = styled(Link)`
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
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 980px;
  background: #0071e3;
  color: #fff;
  margin: 0 10px;
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

interface ChapterNav {
  columnName: string | undefined;
}

// 아이콘 네비게이션
const ChapterNav = styled.div<ChapterNav>`
  padding: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  width: 100%;
  height: 115px;
  position: relative;
  background-color: ${(props) => props.theme.navBG};

  ${(props) =>
    props.columnName === "Watch"
      ? `
      padding-top: 12px;
      padding-bottom: 12px;
      `
      : ""};
`;

const ChapterNavWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ChapterNavItems = styled.ul``;

interface ChapterNavItem {
  columnName: string | undefined;
  taskName: string;
  chapterNavRender: boolean;
}

const ChapterNavItem = styled.li<ChapterNavItem>`
  opacity: ${(props) => (props.chapterNavRender ? "0" : "1")};
  transform: ${(props) => (props.chapterNavRender ? "translateX(160px);" : "translateX(0);")};
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.6, 1);
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

  // Watch
  ${(props) => {
    if (props.columnName === "Watch") {
      return `
      padding: 0 9px;
      &:last-child {
        margin-right: 0;
        padding: 0 4px 0 9px;
      }
      `;
    }
  }}

  ${(props) => {
    if (props.taskName === "비교하기") {
      return `
      padding: 0 16px;
      `;
    }
    if (props.taskName === "밴드") {
      return `
      padding: 0 15px;
      `;
    }
    if (props.taskName === "AirPods") {
      return `
      padding: 0 20px;
      `;
    }
    if (props.taskName === "watchOS 10") {
      return `
      padding: 0 20px;
      `;
    }
  }}

  // 엔터테인먼트
  ${(props) =>
    props.columnName === "엔터테인먼트"
      ? `
      padding: 0 15px;
      `
      : ""};

  // 고객지원
  ${(props) =>
    props.columnName === "고객지원"
      ? `
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
      `
      : ""};
`;

interface ChapterNavLink {
  columnName: string | undefined;
  taskName: string;
}

const ChapterNavLink = styled(Link)<ChapterNavLink>`
  color: #1d1d1f;
  display: block;
  padding: 0;
  margin-top: 3px;
  position: relative;
  z-index: 1;

  // 고객지원
  ${(props) => {
    if (props.columnName === "고객지원") {
      return `
      gap: 16px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      `;

      if (props.taskName === "iPhone") {
        return `

      `;
      }
    }
  }}
`;

interface ChapterNavIcon {
  columnName: string | undefined;
  taskName: string;
  icon?: string;
  width?: number;
  height?: number;
  parentID: string;
}

const ChapterNavIcon = styled.figure<ChapterNavIcon>`
  display: block;
  margin: 0 auto 7px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.icon});
  margin-bottom: 4px;

  // Mac
  ${(props) => {
    if (props.parentID === "64ff1ccbe3ac394d8361dae7") {
      switch (props.taskName) {
        case "Mac Pro":
        case "Sonoma":
          return `
          width: 35px;
          height: 54px;
          background-size: 35px 54px;
        `;
        case "Mac mini":
        case "Mac Studio":
          return `
          width: 28px;
          height: 54px;
          background-size: 28px 54px;
        `;
        case "MacBook Pro 13":
          return `
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
      switch (props.taskName) {
        case "Sonoma":
          return `
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
      switch (props.taskName) {
        case "MacBook Pro 13":
          return `
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
      switch (props.taskName) {
        case "iPad Pro":
          return `
          width: 41px;
          height: 54px;
          background-size: 41px 54px;
        `;
        case "iPad Air":
        case "액세서리":
        case "iPadOS 17":
          return `
          width: 30px;
          height: 54px;
          background-size: 30px 54px;
        `;
        case "Apple Pencil":
          return `
          width: 3px;
          height: 54px;
          background-size: 3px 54px;
        `;
        case "키보드":
          return `
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

    const { taskName, parentID } = props;

    if (parentID === "64ff1cdfe3ac394d8361ddee" && sizes[taskName]) {
      const { width, height } = sizes[taskName];
      return `
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

    const { taskName, parentID } = props;

    if (parentID === "64ff28633c9faa3d2f6fc2ed" && sizes[taskName]) {
      const { width, height } = sizes[taskName];
      return `
      width: ${width}px;
      height: ${height}px;
      background-size: ${width}px ${height}px;
    `;
    }
  }}

  // Watch
  ${(props) => {
    if (props.parentID === "64ff1d19e3ac394d8361df79") {
      switch (props.taskName) {
        case "밴드":
          return `
        width: 17px;
        height: 54px;
        background-size: 17px 54px;
        `;
        case "watchOS 10":
          return `
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
      switch (props.taskName) {
        case "Apple TV 앱":
          return `
        width: 50px;
        height: 54px;
        background-size: 50px 54px;
        `;
        case "Apple TV+":
          return `
        width: 47px;
        height: 54px;
        background-size: 47px 54px;
        `;
      }
    }
  }}

// 액세서리
  ${(props) => {
    if (props.taskName === "iPad" && props.parentID === "64ff1d2fe3ac394d8361e5d7") {
      return `
      width: 47px;
      height: 54px;
      background-size: 47px 54px;
    `;
    }
  }}

  // 고객지원
  ${(props) => {
    if (props.parentID === "64ff1d34e3ac394d8361e77b") {
      switch (props.taskName) {
        case "iPhone":
          return `
          width: 34px;
          height: 68px;
          background-size: 34px 68px;
          `;
        case "Mac":
          return `
          width: 96px;
          height: 68px;
          background-size: 96px 68px;
          `;
        case "iPad":
          return `
          width: 80px;
          height: 68px;
          background-size: 80px 68px;
          `;
        case "Watch":
          return `
          width: 42px;
          height: 68px;
          background-size: 42px 68px;
          `;
        case "AirPods":
          return `
          margin-top: 8px;
          width: 66px;
          height: 60px;
          background-size: 66px 60px;
          `;
        case "Music":
          return `
          width: 68px;
          height: 68px;
          background-size: 68px 68px;
          `;
        case "TV":
          return `
          width: 72px;
          height: 68px;
          background-size: 72px 68px;
          `;
      }
    }
  }}
`;

interface ChapterNavName {
  columnName: string | undefined;
}

const ChapterNavName = styled.span<ChapterNavName>`
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33337;
  color: ${(props) => props.theme.chapterNavText};

  ${(props) =>
    props.columnName === "Watch"
      ? `
    display: block;
    max-width: 7em;
  `
      : ""};
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
  gmId: GmIdType;
  categoryList: ColumnType[];
  selectedColumn: ColumnType | null;
  selectedTask: TaskType | null;
  setSelectedColumn: React.Dispatch<React.SetStateAction<ColumnType | null>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Category({ gmId, categoryList, selectedColumn, setSelectedColumn, selectedTask, setSelectedTask, setIsDarkMode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(selectedTask);

  const [chapterNavRender, setRerender] = useState<boolean>(false);
  const [isIdNotFound, setIsIdNotFound] = useState<boolean>(false);
  const [advertise, setAdvertise] = useState<Advertise[]>([]);
  // console.log(advertise);

  useEffect(() => {
    setRerender(true);
    setTimeout(() => setRerender(false), 200);
  }, [selectedColumn && selectedColumn.taskIds && selectedColumn.taskIds.length]);

  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await axios.post(`/smartstore/shop/${id}`, { gmId, selectedTask }, { withCredentials: true });
        console.log(res.data);

        setIsIdNotFound(false);
        setIsDarkMode(false);

        if (res.data.findColumn) {
          const adminColumn = res.data.findColumn;
          console.log(adminColumn);

          if (adminColumn.darkMode) {
            setIsDarkMode(adminColumn.darkMode);
          }

          setSelectedColumn(adminColumn);
          setSelectedTask(null);
          setAdvertise(res.data.Advertises);
        } else if (res.data.findTask) {
          const adminTask = res.data.findTask;
          console.log(adminTask);

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

  const [iconSize, setIconSize] = useState<IconSize[]>([]);

  // 선택된 메인 카테고리 (selectedColumn)의 list.icon의 여부를 체크후 width와 height값을 계산하여
  // iconSize 배열에 새롭게 등록합니다.
  // iconSize는 CSS에 width와 height에 사용합니다.

  useEffect(() => {
    const loadImageSize = async (list: any) => {
      return new Promise<IconSize>((resolve) => {
        let width: number | undefined;
        let height: number | undefined;
        if (list.icon && list.icon.startsWith("http")) {
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

  return (
    <>
      {!isIdNotFound ? (
        <>
          <ChapterNav className="ChapterNav" columnName={selectedColumn ? selectedColumn.name : ""}>
            <ChapterNavWrap className="ChapterNavWrap">
              <ChapterNavItems className="ChapterNavItems">
                {selectedColumn?.taskIds?.map((taskId: any) => {
                  if (taskId.chapterNavHide) return null;
                  const iconItem = iconSize.find((item) => item.name === taskId.name);
                  // taskId.subTaskIds 배열이 비어있지 않으면
                  if (taskId.subTaskIds && taskId.subTaskIds.length > 0) {
                    return (
                      <>
                        <ChapterNavItem
                          className="ChapterNavItem"
                          columnName={selectedColumn.name}
                          taskName={taskId.name}
                          chapterNavRender={chapterNavRender}
                        >
                          <ChapterNavLink
                            className="ChapterNavLink"
                            to={`../${taskId.url}`}
                            columnName={selectedColumn.name}
                            taskName={taskId.name}
                            type={taskId.type}
                          >
                            <ChapterNavIcon
                              className="ChapterNavIcon"
                              columnName={selectedColumn.name}
                              taskName={taskId.name}
                              parentID={taskId.parentID}
                              icon={iconItem?.icon}
                              width={iconItem?.width}
                              height={iconItem?.height}
                            />
                            <ChapterNavName className="ChapterNavName" columnName={selectedColumn.name}>
                              {taskId.name}
                            </ChapterNavName>
                            {/* <span className="chapternav-new">New</span> */}
                          </ChapterNavLink>
                        </ChapterNavItem>
                      </>
                    );
                  } else {
                    // taskId.subTaskIds 배열이 비어있으면
                    return (
                      <>
                        <ChapterNavItem
                          className="ChapterNavItem"
                          columnName={selectedColumn.name}
                          taskName={taskId.name}
                          chapterNavRender={chapterNavRender}
                        >
                          <ChapterNavLink
                            className="ChapterNavLink"
                            to={`/shop/products/${taskId.url}`}
                            columnName={selectedColumn.name}
                            taskName={taskId.name}
                            type={taskId.type}
                          >
                            <ChapterNavIcon
                              className="ChapterNavIcon"
                              columnName={selectedColumn.name}
                              taskName={taskId.name}
                              parentID={taskId.parentID}
                              icon={iconItem?.icon}
                              width={iconItem?.width}
                              height={iconItem?.height}
                            />
                            <ChapterNavName className="ChapterNavName" columnName={selectedColumn.name}>
                              {taskId.name}
                            </ChapterNavName>
                            {/* <span className="chapternav-new">New</span> */}
                          </ChapterNavLink>
                        </ChapterNavItem>
                      </>
                    );
                  }
                })}

                {selectedTask?.subTaskIds?.map((taskId: any) => {
                  if (taskId.chapterNavHide) return null;
                  const iconItem = iconSize.find((item) => item.name === taskId.name);
                  return (
                    <>
                      <ChapterNavItem
                        className="ChapterNavItem"
                        columnName={selectedTask.name}
                        taskName={taskId.name}
                        chapterNavRender={chapterNavRender}
                      >
                        <ChapterNavLink
                          className="ChapterNavLink"
                          to={`/shop/products/${taskId.url}`}
                          columnName={selectedTask.name}
                          taskName={taskId.name}
                        >
                          <ChapterNavIcon
                            className="ChapterNavIcon"
                            columnName={selectedTask.name}
                            taskName={taskId.name}
                            parentID={taskId.parentID}
                            icon={iconItem?.icon}
                            width={iconItem?.width}
                            height={iconItem?.height}
                          />
                          <ChapterNavName className="ChapterNavName" columnName={selectedTask.name}>
                            {taskId.name}
                          </ChapterNavName>
                          {/* <span className="chapternav-new">New</span> */}
                        </ChapterNavLink>
                      </ChapterNavItem>
                    </>
                  );
                })}
              </ChapterNavItems>
            </ChapterNavWrap>
          </ChapterNav>
          <Adver className="ProductsWrap">
            {advertise?.map((advertise: any, index: any) => {
              return (
                <AdverWrap key={index} className="AdverWrap">
                  {advertise.type === 0 && (
                    <AdverWrap2 className="AdverWrap2" backcolor={advertise.backcolor}>
                      <AdverWidth>
                        <AdverInner className="AdverInner" type={0}>
                          <AdverTextWrap type={0}>
                            <AdverSubTitle type={0}>{advertise.subtitle}</AdverSubTitle>
                            <AdverMainTitle type={0}>{advertise.maintitle}</AdverMainTitle>
                            <AdverDetail type={0}>{advertise.detail}</AdverDetail>
                            <AdverSubDetail type={0}>{advertise.subdetail}</AdverSubDetail>
                            <Links type={0}>
                              <BuyLink to={`/shop/products/${advertise.url}`}>구입하기</BuyLink>
                              <DetailLink to={`/shop/products/${advertise.url}`}>더 알아보기</DetailLink>
                            </Links>
                          </AdverTextWrap>
                          <ShippingWrap></ShippingWrap>
                          <AdverImageWrap type={0}>
                            <AdverImage type={0} src={advertise.image} />
                          </AdverImageWrap>
                        </AdverInner>
                      </AdverWidth>
                    </AdverWrap2>
                  )}
                  {advertise.type === 1 && (
                    <AdverWrap2 className="AdverWrap2" backcolor={advertise.backcolor}>
                      <AdverWidth>
                        <AdverInner className="AdverInner" type={1}>
                          <AdverTextWrap type={1}>
                            <AdverSubTitle type={1}>{advertise.subtitle}</AdverSubTitle>
                            <AdverMainTitle type={1}>{advertise.maintitle}</AdverMainTitle>
                            <AdverDetail type={1}>{advertise.detail}</AdverDetail>
                            <AdverSubDetail type={1}>{advertise.subdetail}</AdverSubDetail>
                            <Links type={1}>
                              <BuyLink to={`/shop/products/${advertise.url}`}>구입하기</BuyLink>
                              <DetailLink to={`/shop/products/${advertise.url}`}>더 알아보기</DetailLink>
                            </Links>
                          </AdverTextWrap>

                          <ShippingWrap></ShippingWrap>
                          <AdverImageWrap type={1}>
                            <AdverImage type={1} src={advertise.image} />
                          </AdverImageWrap>
                        </AdverInner>
                      </AdverWidth>
                    </AdverWrap2>
                  )}
                  {advertise.type === 2 && (
                    <AdverWrap2 className="AdverWrap2" backcolor={advertise.backcolor}>
                      <AdverWidth>
                        <AdverInner className="AdverInner" type={2}>
                          <AdverTextWrap type={2}>
                            <AdverSubTitle type={2}>{advertise.subtitle}</AdverSubTitle>
                            <AdverMainTitle type={2}>{advertise.maintitle}</AdverMainTitle>
                            <AdverDetail type={2}>{advertise.detail}</AdverDetail>
                            <AdverSubDetail type={2}>{advertise.subdetail}</AdverSubDetail>
                            <Links type={2}>
                              <BuyLink to={`/shop/products/${advertise.url}`}>구입하기</BuyLink>
                              <DetailLink to={`/shop/products/${advertise.url}`}>더 알아보기</DetailLink>
                            </Links>
                          </AdverTextWrap>
                          <AdverImageWrap type={2}>
                            <AdverImage type={2} src={advertise.image} />
                          </AdverImageWrap>
                        </AdverInner>
                      </AdverWidth>
                    </AdverWrap2>
                  )}
                </AdverWrap>
              );
            })}
          </Adver>
        </>
      ) : (
        <>
          <div style={{ margin: "150px auto" }}>
            <div style={{ fontSize: "48px", fontWeight: "700", textAlign: "center" }}>
              <p>찾으시는 페이지가</p>
              <p>없는 듯 하네요.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Category;
