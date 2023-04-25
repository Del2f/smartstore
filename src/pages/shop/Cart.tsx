import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect } from "react";

import { productList } from "./Category";
import { ObjectId } from "mongodb";

import { useCookies } from "react-cookie";

import checkIcon from "@img/icon-check-16.00020358.svg";

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #f4f4f4;
`;

const Top = styled.div`
    width: 100%;
    background-color: #fff;
`;

const TopInner = styled.div`
    margin: 0 150px;
    padding: 50px 0;
`;

const OrderText = styled.span``;

const OrderCount = styled.span``;

const OrderUnit = styled.span``;

const ListWrap = styled.ul`
    width: 80%;
    padding: 30px;
`;

const List = styled.li`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px 40px;
    margin-bottom: 20px;
`;

const ImgWrap = styled.div`
    display: flex;
    border-right: 1px solid #e0e0e0;
    align-items: center;
`;

const Img = styled.div`
    border-radius: 20px;
    padding: 20px;

    img {
        width: 100px;
        border-radius: 20px;
        /* border: 1px solid black; */
    }
`;
const ProductText = styled.div`
    /* display: flex; */
    /* flex-wrap: wrap; */
    padding: 20px;
    border-right: 1px solid #e0e0e0;
`;

const Name = styled.div`
    font-size: 18px;
`;
const Price = styled.div`
    font-size: 15px;
`;

// 장바구니 옵션

const CheckBox = styled.input`
    display: none;
    position: absolute;

    &:checked {
        + .agree-check-box .agree-ico-box {
            border-color: #03c75a;
            background-color: #03c75a;
        }
        + .agree-check-box .agree-ico {
            display: block;
        }
    }
`;

const Label = styled.label`
    display: inline-block;
    margin-right: 12px;
    cursor: pointer;
`;

const CheckIconBox = styled.span`
    display: block;
    position: relative;
    width: 19px;
    height: 19px;
    border: 1.2px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
`;

const CheckIcon = styled.span`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 17px;
    height: 17px;
    content: "";
    background: url(${checkIcon}) 0px 0px no-repeat;
`;

const Selected = styled.div`
    padding: 20px;
    display: flex;
`;

const OptionType = styled.span``;

const OptionName = styled.span`
    padding: 20px;
    border-right: 1px solid #e0e0e0;
`;

const OptionList = styled.div`
    display: flex;
    &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

// 장바구니 금액
const OptionPrice = styled.div`
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OptionPriceNum = styled.div``;

const OptionPriceName = styled.div`
    font-size: 14px;
    color: #4b4b4b;
`;

const OptionPriceShipping = styled.div`
    font-size: 12px;
    color: #808080;
`;

const OptionCount = styled.span``;
const ResultPrice = styled.div``;

interface selectedType {
    id: number;
    option: string;
    count: number;
}

interface cartListType {
    product: productList;
    selected: selectedType[];
    count: string;
    total: string;
    _id: ObjectId;
}

interface orderCountType {
    count: number;
}

function Cart() {
    const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

    const [cartList, setCartList] = useState<cartListType[]>();
    const [orderCount, setOrderCount] = useState<orderCountType[]>();

    const [cartCheck, setCartCheck] = useState<any>();

    console.log(cartList);

    // 유저 장바구니 리스트 불러오기.
    useEffect(() => {
        const cartData = async () => {
            try {
                const res = await axios.post(`/smartstore/cart/cartList`, cookies, { withCredentials: true });
                setOrderCount(res.data.length);
                setCartList(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        cartData();
    }, []);

    // 장바구니 상품 체크박스 클릭시
    const check = (e: any) => {
        // console.log("체크박스 클릭");
        
        const checkboxID = e.target.id;
        console.log(checkboxID);

        const result = cartList?.filter((cart: any) => {
            console.log(cart)
            const selected = cart.selected.find((item: any) => item.id == checkboxID );
            console.log(selected);

            if (selected) {
                return { ...cart.product[0], selected };
            }
        });

        console.log(result);

    };

    const cart = (
        <ListWrap>
            {cartList?.map((cartlist: any, index: any) => (
                <List key={index} className="List">
                    {cartlist.selected?.map((selected: any, index: any) => (
                        <>
                                {console.log(selected)}
                            <Selected>
                                <CheckBox type="checkbox" id={selected.id} name="checkbox" onChange={check} />
                                <Label className="agree-check-box" htmlFor={selected.id}>
                                    <CheckIconBox className="agree-ico-box"></CheckIconBox>
                                    <CheckIcon />
                                </Label>
                                <ImgWrap>
                                    <Img>
                                        <img src={cartlist.product[0].mainImage} alt="" />
                                    </Img>
                                </ImgWrap>
                                <ProductText>
                                    <Name>{cartlist.product[0].name}</Name>
                                    <Price>
                                        {cartlist.product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        <span>원</span>
                                    </Price>
                                </ProductText>
                                <OptionList key={index}>
                                    <OptionName>
                                        {selected.list.map((order: any, index: any) => (
                                            <div key={index}>
                                                <OptionType>{cartlist.product[0].option[0].optionName}&nbsp;</OptionType>
                                                <span>&nbsp;{order.option}</span>
                                                <span>&nbsp;{order.count}</span>
                                                <span>개</span>
                                            </div>
                                        ))}
                                    </OptionName>
                                    <OptionCount>{/* {list.count} */}</OptionCount>
                                    <OptionPrice>
                                        <OptionPriceName>상품금액</OptionPriceName>
                                        <OptionPriceNum>
                                            {selected.list
                                                .reduce((acc: any, cur: any) => acc + cur.price, 0)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            원
                                        </OptionPriceNum>
                                        <OptionPriceShipping>{cartlist.product[0].delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</OptionPriceShipping>
                                    </OptionPrice>
                                </OptionList>
                            </Selected>
                        </>
                    ))}
                    <ResultPrice>테스트</ResultPrice>
                </List>
            ))}
        </ListWrap>
    );

    return (
        <>
            <Wrap>
                <Top>
                    <TopInner>
                        <OrderText>주문 </OrderText>
                        <OrderCount></OrderCount>
                        <OrderUnit>건</OrderUnit>
                    </TopInner>
                </Top>
                {cart}
            </Wrap>
        </>
    );
}

export default Cart;
