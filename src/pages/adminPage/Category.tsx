// import $ from "jquery";
import axios from "../../api/axios";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { useCookies } from "react-cookie";
import { selectToken } from '../../store/authSlice';

import { selectShowMenu } from "../../store/menuSlice";

function Category() {

    const token = useSelector(selectToken)
    console.log(token)

    useEffect(() => {
        const get = async () => {
            try {
                const result = await axios.post("/smartstore/home/category", token, { withCredentials: true })
                console.log(result)
            } catch (err) {
                console.log(err)
            }
        }
        get();
    },[])

    // 최종 상품 등록 체크
    // useEffect(() => {
    //     if (isCategory && isName && isPrice && isOptionName && isOptionValue && isOptionList && isImage && isDetail && isDelivery){
    //         setSubmit(true)
    //     } else {
    //         setSubmit(false)
    //     }
    // })

    // 상품 데이터
    const productdata = {};

    // 등록 버튼
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // if (Submit == false) {
        //     return
        // }

        // try {
        //     if(!isEdit){
        //         console.log('등록버튼')
        //         const test = await axios.post("/smartstore/home/productregister", productdata, { withCredentials: true })

        //         if(Submit == true) {
        //             navigate("/home/product"); // 등록시 상품목록으로
        //         }
        //     } else {
        //         console.log('수정버튼')
        //         const test = await axios.post(`/smartstore/home/product/${id}`, productdata, { withCredentials: true })

        //         if(Submit == true) {
        //             navigate("/home/product"); // 수정시 상품목록으로
        //         }
        //     }

        // } catch (errors) {
        //     console.log(errors)
        // }
    };

    return (
        <>
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
                <div className="SellerSubframe">
                    <div className="product-list">
                        <div className="panel panel-seller">
                            <div className="panel-heading">
                                <div className="pull-left">
                                    <h3 className="panel-title">
                                        <span className="text-primary"></span>
                                    </h3>
                                </div>
                            </div>
                            <div className="panel-body">
                            <ul className="category first">
                                                                {/* {first.map((list: any, index: any) => {
                                                                    const result = second.some((element: any) => element.parentcode == list.code);
                                                                    return (
                                                                        <li key={index} className="category-list">
                                                                            <span>{list.name}</span>
                                                                            <span className={result == true ? "show-arrow" : "none-arrow"}></span>
                                                                        </li>
                                                                    );
                                                                })} */}
                                                            </ul>
                                <div className="btn-list"></div>
                                <div className="product-list"></div>
                            </div>
                            <div className="panel-footer"></div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Category;
