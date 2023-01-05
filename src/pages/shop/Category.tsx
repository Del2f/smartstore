import "./Category.scss";
import { useState } from "react";
import { Link } from "react-router-dom";


function Category () {

    const [check, setCheck] = useState<Boolean>(false);
    const [view, setView] = useState<Number>(0);

    // const check = () => {
    //     setCheck(!check)
    // }

    return (
        <>
            <div className="category-wrap">
                <div className="category-inner flex flex-ju-center">
                    <div className="category-inner2">
                        <div className="top">
                            <div className="title flex flex-ju-bt">
                                <strong>MacBook Air</strong>
                                <div className="flex flex-ju-center">
                                    <a href="{() => false}">홈</a>
                                    <span className="bar"></span>
                                    <a href="{() => false}" className="type-first">Mac</a>
                                    <a href="{() => false}" className="type-second">MacBook Air</a>
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
                                        <input type="checkbox" id="checkboxID"/>
                                        <label className="label-checkbox" htmlFor="checkboxID" >
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
                                            <li><button className={ view == 0 ? "one-select select" : "one"} onClick={() => setView(0)}></button></li>
                                            <li><button className={ view == 1 ? "five-select select" : "five"} onClick={() => setView(1)}></button></li>
                                            <li><button className={ view == 2 ? "four-select select" : "four"} onClick={() => setView(2)}></button></li>
                                            <li><button className={ view == 3 ? "three-select select   " : "three"} onClick={() => setView(3)}></button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-wrap">
                            <div className="product-inner flex flex-wrap flex-ju-start">
                                <div className="product">
                                    <Link to="../products" className="img-wrap">
                                        <img src="/smartstore/img/shop/products/macbookpro/01.jpg" alt="" className="img"/>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;
