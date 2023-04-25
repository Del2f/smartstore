import axios from "../../api/axios";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ObjectId } from "mongodb";

import { Link } from "react-router-dom";
import { GmId, categoryListType } from "./Shop";


import "./Category.scss";

interface Props {
    gmId: GmId;
    categoryList: Array<{
        type: string;
        name: string;
        taskIds: any[];
        user: string;
        _id: string;
    }>;
    selectedColumn: categoryListType | null | undefined;
    setSelectedColumn: React.Dispatch<React.SetStateAction<categoryListType | null | undefined>>;
    selectedTask: categoryListType | null | undefined;
    setSelectedTask: React.Dispatch<React.SetStateAction<categoryListType | null | undefined>>;
}

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

interface Products {}

// 카테고리 클릭후 나오는 상품 메인사진
const Products = styled.div<Products>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    color: black;
`;

const ProductWrap = styled.div`
    display: flex;
    width: calc(33.33% - 10px);
    height: 500px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 0px solid black;
    border-radius: 20px;
    background-color: #f8f8f8;
    padding: 20px;
    justify-content: center;
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const Product = styled.div`
    background-color: white;
    border-radius: 20px;
    /* border: 1px solid black; */

    margin: 10px;
    margin-bottom: 20px;
    padding: 20px;
    position: relative;
    width: 320px;
    height: 320px;

    img {
        position: absolute;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const PriceWrap = styled.div`
    color: #353535;

`;

const SalePercent = styled.span`
    font-size: 20px;
    color: #7471b4;
`;

const Cost = styled.span`
    text-decoration: line-through;
    font-size: 15px;
    
`;

const CostUnit = styled.span`
    font-size: 14px;
`;

const Price = styled.span`
    display: block;
    font-size: 20px;
    font-weight: 800;
    color: #353535;

`;

const PriceUnit = styled.span`
    font-size: 14px;
`;

const NameWrap = styled.div`
    color: #353535;
`;

const Name = styled.span`
    font-size: 23px;
    font-weight: 700;
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
    option: [{
        id: Number,
        optionName: String,
        optionValue: String,
        optionPrice: Number,
        optionStatus: String,
        optionStock: String,
        optionUse: String,
        deleteBtn: String,
    }];
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

function Category({ gmId, categoryList, selectedColumn, setSelectedColumn, selectedTask, setSelectedTask }: Props) {

    const { id } = useParams();

    const [productList, setProductList] = useState<productList[] | null>([]);

    useEffect(() => {
        const categoryData = async () => {
            try {
                const res = await axios.post(`/smartstore/shop/${id}`, gmId, { withCredentials: true });

                const column = res.data.categoryList[0].columns;
                const task = res.data.categoryList[0].tasks;
                setSelectedColumn(column);
                setSelectedTask(null);
                if (task) {
                    setSelectedTask(task);
                }

                setProductList(res.data.productList);
            } catch (err) {
                console.log(err);
            }
        };

        categoryData();
    }, [id]);

    // 우측상단 퀵메뉴
    const [isQuickColumns, setIsQuickColumns] = useState<boolean>(false);
    const [isQuickTasks, setIsQuickTasks] = useState<boolean>(false);

    const QuickColumnShow = () => {
        setIsQuickColumns(!isQuickColumns);
    };

    const QuickTaskShow = () => {
        setIsQuickTasks(!isQuickTasks);
    };

    const [check, setCheck] = useState<Boolean>(false);
    const [view, setView] = useState<Number>(0);

    return (
        <>
            <div className="category-wrap">
                <div className="category-inner flex flex-ju-center">
                    <div className="category-inner2">
                        <div className="top">
                            <div className="title flex flex-ju-bt">
                                <div>
                                    {selectedColumn && <strong>{selectedColumn.name}</strong>}
                                    {selectedTask && <strong>{selectedTask.name}</strong>}
                                </div>
                                <div className="flex flex-ju-center">
                                    <Link to={"./"}>홈</Link>
                                    <span className="bar"></span>

                                    <a className="type-first" onClick={QuickColumnShow}>
                                        {selectedColumn && selectedColumn.name}
                                        <Column isQuickColumns={isQuickColumns}>
                                            {categoryList.map((list: any) => (
                                                <List>
                                                    <Link to={`../../shop/${list._id}`}>{list.name}</Link>
                                                </List>
                                            ))}
                                        </Column>
                                    </a>

                                    {selectedTask && (
                                        <a className="type-second" onClick={QuickTaskShow}>
                                            {selectedTask && selectedTask.name}
                                            <Task isQuickTasks={isQuickTasks}>
                                                {categoryList.map((list: any) => {
                                                    // list의 _id와 url 파라미터의 id가 일치하는지 확인
                                                    if (selectedColumn && selectedColumn._id == list._id) {
                                                        // list의 taskIds가 배열인지 확인
                                                        if (Array.isArray(list.taskIds)) {
                                                            // list의 taskIds를 반복하여 name을 출력
                                                            return list.taskIds.map((task: any) => (
                                                                <List>
                                                                    <Link to={`../../shop/${task._id}`}>{task.name}</Link>
                                                                </List>
                                                            ));
                                                        }
                                                    }
                                                })}
                                            </Task>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="buttons flex flex-ju-bt flex-align-center">
                                <div className="left">
                                    <button>인기도순</button>
                                    <button>누적판매순</button>
                                    <button>낮은가격순</button>
                                    <button>최신등록순</button>
                                    <button>리뷰많은순</button>
                                    <button>평점높은순</button>
                                </div>
                                <div className="right flex flex-align-center">
                                    <div className="free-shipping-wrap s">
                                        <input type="checkbox" id="checkboxID" />
                                        <label className="label-checkbox" htmlFor="checkboxID">
                                            <span className="text">무료배송</span>
                                            <span className="free-shipping"></span>
                                        </label>
                                    </div>
                                    <button className="more-show-btn">
                                        40개씩 보기
                                        <span className="icon"></span>
                                    </button>
                                    <div className="view-type-wrap">
                                        <ul>
                                            <li>
                                                <button className={view == 0 ? "one-select select" : "one"} onClick={() => setView(0)}></button>
                                            </li>
                                            <li>
                                                <button className={view == 1 ? "five-select select" : "five"} onClick={() => setView(1)}></button>
                                            </li>
                                            <li>
                                                <button className={view == 2 ? "four-select select" : "four"} onClick={() => setView(2)}></button>
                                            </li>
                                            <li>
                                                <button className={view == 3 ? "three-select select" : "three"} onClick={() => setView(3)}></button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Products>
                            {productList?.map((product: any) => {
                                return (
                                    <ProductWrap>
                                        <StyledLink to={`/shop/products/${product._id}`}>
                                            <Product>
                                                <img src={product.mainImage} alt="" />
                                            </Product>
                                            <NameWrap>
                                                <Name>{product.name}</Name>
                                            </NameWrap>
                                            <PriceWrap>
                                                <SalePercent>
                                                    {Math.round(((product.cost - product.price) / product.cost) * 100)}
                                                    <PriceUnit>% </PriceUnit>
                                                </SalePercent>
                                                <Cost>
                                                    {Number(product.cost).toLocaleString()}
                                                    <CostUnit>원</CostUnit>
                                                </Cost>
                                                <Price>
                                                    {Number(product.price).toLocaleString()}
                                                    <PriceUnit>원</PriceUnit>
                                                </Price>
                                            </PriceWrap>
                                            <ScoreWrap></ScoreWrap>
                                            <ShippingWrap></ShippingWrap>
                                        </StyledLink>
                                    </ProductWrap>
                                );
                            })}
                        </Products>
                        {/* <div className="product-wrap">
                            <div className="product-inner flex flex-wrap flex-ju-start">
                                <div className="product">
                                    <Link to="../products" className="img-wrap">
                                        <img src="/img/shop/products/macbookpro/01.jpg" alt="" className="img" />
                                        <div className="price-wrap">
                                            <strong className="sale-percent">2%</strong>
                                            <strong className="sale-after-price">
                                                <span className="price-value">3,292,800</span>
                                                <span className="price-text">원</span>
                                            </strong>
                                            <del className="sale-before-price">
                                                <span className="price-value">3,360,000</span>
                                                <span className="price-text">원</span>
                                            </del>
                                        </div>
                                        <strong className="product-name">Apple 2021 맥북프로 16 CTO M1 Pro (10C CPU 16C GPU)/16GB/512GB/영어 - 실버 (Z14Y000V3)</strong>
                                    </Link>
                                    <div className="score-wrap">
                                        <span className="score">평점 0</span>
                                        <span className="review">리뷰 0</span>
                                    </div>
                                    <div className="freeshipping">
                                        <span className="free-wrap">
                                            <span className="free-text">무료배송</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
