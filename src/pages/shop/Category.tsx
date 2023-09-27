import axios from "../../api/axios";
import styled, { css } from "styled-components";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ObjectId } from "mongodb";
import { GmIdType } from "./Shop";

import { ColumnType, TaskType, SubTaskType } from "../adminPage/Category";

// import CategorySubTasks from "./CategorySubTasks";
import NotFound from "./NotFound";
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

// 카테고리 클릭후 나오는 상품 메인사진
const Products = styled.div`
  position: relative;
`;

const ProductWrap = styled.div`
  background-color: #fbfbfd;
  border-bottom: 10px solid #fff;
  padding: 59px 0;
  display: flex;
  flex-direction: column;
`;

const Product = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const ProductInner = styled.div`
  min-height: 672px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  text-align: center;
`;

const ProductImageWrap = styled.div`
  margin-top: 200px;
`;

const ProductImage = styled.img`
  position: relative;
`;

const ProductTitle = styled.h2`
  font-size: 56px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 10px;
`;

const ProductSubTitle = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

const PriceWrap = styled.div`
  color: #353535;
  margin-top: 30px;
`;

const Price = styled.span`
  display: block;
  font-size: 17px;
  font-weight: 400;
  color: #1d1d1f;
`;

const Links = styled.div`
  margin-top: 14px;
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
  z-index: 1;
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
  ${(props) =>
    props.columnName === "Watch"
      ? `
      padding: 0 9px;
      &:last-child {
        margin-right: 0;
        padding: 0 4px 0 9px;
      }
      `
      : ""};

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

interface ChapterNavIcon {
  columnName: string | undefined;
  taskName: string;
}

const ChapterNavLink = styled(Link)<ChapterNavIcon>`
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
    if (props.taskName === "Mac Pro") {
      return `
    width: 35px;
    height: 54px;
    background-size: 35px 54px;
    `;
    }
    if (props.taskName === "Mac mini") {
      return `
    width: 28px;
    height: 54px;
    background-size: 28px 54px;
    `;
    }
    if (props.taskName === "Mac Studio") {
      return `
    width: 28px;
    height: 54px;
    background-size: 28px 54px;
    `;
    }
    if (props.taskName === "Sonoma") {
      return `
    width: 35px;
    height: 54px;
    background-size: 35px 54px;
    `;
    }
    if (props.taskName === "MacBook Pro 13") {
      return `
    width: 54px;
    height: 54px;
    background-size: 54px 54px;
    `;
    }
  }}

  // iPad
  ${(props) => {
    if (props.taskName === "iPad Pro") {
      return `
    width: 41px;
    height: 54px;
    background-size: 41px 54px;
    `;
    }
    if (props.taskName === "iPad Air") {
      return `
    width: 30px;
    height: 54px;
    background-size: 30px 54px;
    `;
    }
    if (props.taskName === "Apple Pencil") {
      return `
    width: 3px;
    height: 54px;
    background-size: 3px 54px;
    `;
    }
    if (props.taskName === "키보드") {
      return `
    width: 63px;
    height: 54px;
    background-size: 63px 54px;
    `;
    }
    if (props.taskName === "액세서리") {
      return `
    width: 31px;
    height: 54px;
    background-size: 31px 54px;
    `;
    }
    if (props.taskName === "iPadOS 17") {
      return `
    width: 32px;
    height: 54px;
    background-size: 32px 54px;
    `;
    }
  }}

  // iPhone
  ${(props) => {
    if (props.taskName === "iPhone SE") {
      return `
    width: 19px;
    height: 54px;
    background-size: 19px 54px;
    `;
    }
    if (props.taskName === "AirTag") {
      return `
    width: 30px;
    height: 54px;
    background-size: 30px 54px;
    `;
    }
    if (props.taskName === "iOS 17") {
      return `
    width: 32px;
    height: 54px;
    background-size: 32px 54px;
    `;
    }
  }}

  // Watch
  ${(props) => {
    if (props.taskName === "밴드") {
      return `
    width: 17px;
    height: 54px;
    background-size: 17px 54px;
    `;
    }
    if (props.taskName === "watchOS 10") {
      return `
    width: 35px;
    height: 54px;
    background-size: 35px 54px;
    `;
    }
  }}

  // TV 및 홈
  ${(props) => {
    if (props.taskName === "Apple TV 앱") {
      return `
    width: 50px;
    height: 54px;
    background-size: 50px 54px;
    `;
    }
    if (props.taskName === "Apple TV+") {
      return `
    width: 47px;
    height: 54px;
    background-size: 47px 54px;
    `;
    }
  }}

  ${(props) => {
    if (props.columnName === "고객지원") {
      return `
      margin: 0;
    `;
    }
  }}

  // 고객지원
  ${(props) => {
    if (props.columnName === "고객지원") {
      if (props.taskName === "iPhone") {
        return `
        width: 34px;
        height: 68px;
        background-size: 34px 68px;
      `;
      }

      if (props.taskName === "Mac") {
        return `
        width: 96px;
        height: 68px;
        background-size: 96px 68px;
      `;
      }

      if (props.taskName === "iPad") {
        return `
        width: 80px;
        height: 68px;
        background-size: 80px 68px;
      `;
      }

      if (props.taskName === "Watch") {
        return `
        width: 42px;
        height: 68px;
        background-size: 42px 68px;
      `;
      }

      if (props.taskName === "AirPods") {
        return `
        margin-top: 8px;
        width: 66px;
        height: 60px;
        background-size: 66px 60px;
      `;
      }

      if (props.taskName === "Music") {
        return `
        width: 68px;
        height: 68px;
        background-size: 68px 68px;
      `;
      }

      if (props.taskName === "TV") {
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
  console.log(id);

  const [productList, setProductList] = useState<productList[] | null>([]);
  console.log(productList);

  const [chapterNavRender, setRerender] = useState<boolean>(false);
  const [isIdNotFound, setIsIdNotFound] = useState<boolean>(false);

  const [subTaskId, setSubTaskId] = useState<string>();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    setRerender(true);
    setTimeout(() => setRerender(false), 300);
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
          setProductList(res.data.productList);
        } else if (res.data.findTask) {
          const adminTask = res.data.findTask;
          console.log(adminTask);

          if (adminTask.darkMode) {
            setIsDarkMode(adminTask.darkMode);
          }

          setSelectedColumn(null);
          setSelectedTask(adminTask);
          setProductList(res.data.productList);
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
                  console.log(taskId.name);
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
                        <ChapterNavLink className="ChapterNavLink" to={`/shop/products/${taskId.url}`} columnName={selectedTask.name} taskName={taskId.name}>
                          <ChapterNavIcon
                            className="ChapterNavIcon"
                            columnName={selectedTask.name}
                            taskName={taskId.name}
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
          <Products className="ProductsWrap">
            {productList?.map((product: any) => {
              return (
                <ProductWrap className="ProductWrap">
                  <Product className="Product">
                    <ProductInner className="ProductInner">
                      <ProductTitle>{product.name}</ProductTitle>
                      <ProductSubTitle>{product.subtitle}</ProductSubTitle>
                      <PriceWrap>
                        <Price>₩{Number(product.price).toLocaleString()}원 부터</Price>
                      </PriceWrap>
                      <ScoreWrap></ScoreWrap>
                      <Links>
                        <BuyLink to={`/shop/products/${product.url}`}>구매하기</BuyLink>
                        <DetailLink to={`/shop/products/${product.url}`}>더 알아보기</DetailLink>
                      </Links>
                      <ShippingWrap></ShippingWrap>
                      <ProductImageWrap>
                        <ProductImage src={product.mainImage} alt="" />
                      </ProductImageWrap>
                    </ProductInner>
                  </Product>
                </ProductWrap>
              );
            })}
            {/* <Routes>
            <Route path="*" element={<NotFound />} />

          </Routes> */}
          </Products>
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
