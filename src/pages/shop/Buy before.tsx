import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect, useReducer, useRef } from "react";
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";

import DaumPostcode from "react-daum-postcode";

import { productList } from "./Category";
import { ObjectId } from "mongodb";

import { useCookies } from "react-cookie";

import checkIcon from "@img/sp_input.png";
import inputIcon from "@img/spr_orderpage.png";

import { v4 as uuidv4 } from "uuid";

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 50px 0px;
    background-color: #f4f4f4;
`;

const Box = styled.div`
    display: flex;
    width: 1230px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 40px;
    padding: 40px 40px;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.05);
`;

const AddressSelectWrap = styled.div`
    display: flex;

    & > div {
        margin-right: 30px;

        & > input {
            display: none;
        }
    }
`;

const CheckBoxWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    display: inline-block;
    cursor: pointer;
    position: relative;
    width: 18px;
    height: 18px;
`;

const Label2 = styled.label`
    display: inline-block;
    cursor: pointer;
    position: relative;
    width: 18px;
    height: 18px;
`;

interface ICheckBox {
    isAllCheck: boolean;
}

interface ICheckIcon {
    isNewAddress: any;
}

const CheckIcon = styled.span<ICheckIcon>`
    display: inline-block;
    position: absolute;
    top: -2px;
    right: 0;
    bottom: 0;
    left: 1px;
    width: 18px;
    height: 18px;
    content: "";
    background: url(${checkIcon}) ${(props) => (props.isNewAddress ? "0px -60px" : "-30px -60px")} no-repeat;
`;

interface ICheckIcon2 {
    isNewAddress: any;
}

const CheckIcon2 = styled.span<ICheckIcon2>`
    display: inline-block;
    position: absolute;
    top: -2px;
    right: 0;
    bottom: 0;
    left: 1px;
    width: 18px;
    height: 18px;
    content: "";
    background: url(${checkIcon}) ${(props) => (props.isNewAddress ? "-30px -60px" : "0px -60px")} no-repeat;
`;

// 기본 배송지
const UserInfoWrap = styled.div``;
const UserInfo = styled.div`
    margin: 20px 0 ;
`;

// 신규 배송지
const NewUserInfo = styled.ul``;
const NewUserInfoList = styled.li`
    margin-top: 8px;
`;

const TextWrap = styled.div`
    width: 100px;
    display: inline-block;
    float: left;
    margin-top: 13px;
`;
const AddressWrap = styled.div`
    display: inline-block;
`;

const Payment = styled.div``;



const PayButton = styled.div``;

const InputFlex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`;

interface InputWrap {
    inputClickNumber: number;
    number: number;
}

// 기본 배송지
const InputWrap = styled.div<InputWrap>`
    position: relative;
    width: 100%;
    padding: 1px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border: 1px solid
        ${(props) => {
            if (props.inputClickNumber === props.number) {
                return "#03c75a";
            } else {
                return "rgba(0, 0, 0, 0.15)";
            }
        }};
    border-radius: 8px;
    background-color: #fff;

    &:hover {
        border: 1px solid
            ${(props) => {
                if (props.inputClickNumber === props.number) {
                    return "#03c75a";
                } else {
                    return "rgb(117, 117, 117)";
                }
            }};
    }

    span {
        position: absolute;
        margin-top: -4px;
        top: 50%;
        right: 10px;
        width: 13px;
        height: 8px;
        background: url(${inputIcon}) no-repeat;
        background-position: -40px -20px;
        display: inline-block;
    }
`;

interface InputWrap2 {
    inputClickNumber: number;
    number: number;
    width: number;
}

const InputWrap2Wrap = styled.div`
    display: flex;
    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const PostcodeWrap = styled.div`
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
`;

// 신규 배송지
const InputWrap2 = styled.div<InputWrap2>`
    width: ${(props) => props.width + "px"};
    position: relative;
    display: inline-block;
    padding: 1px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border: 1px solid
        ${(props) => {
            if (props.inputClickNumber === props.number) {
                return "#03c75a";
            } else {
                return "rgba(0, 0, 0, 0.15)";
            }
        }};
    border-radius: 8px;
    background-color: #fff;

    &:hover {
        border: 1px solid
            ${(props) => {
                if (props.inputClickNumber === props.number) {
                    return "#03c75a";
                } else {
                    return "rgb(117, 117, 117)";
                }
            }};
    }

    span {
        position: absolute;
        margin-top: -4px;
        top: 50%;
        right: 10px;
        width: 13px;
        height: 8px;
        background: url(${inputIcon}) no-repeat;
        background-position: -40px -20px;
        display: inline-block;
    }
`;

interface IExample {
    inputClickNumber1: number;
    number: number;
}

const Example = styled.ul<IExample>`
    display: ${(props) => {
        if (props.inputClickNumber1 === props.number) {
            return "block";
        } else {
            return "none";
        }
    }};
    width: 100%;
    padding: 1px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    margin-top: -1px;

    li:hover {
        background-color: #ebebeb;
    }
`;

interface IExamplePhone {
    inputClickNumber1: number;
    number: number;
}

// 핸드폰번호 앞자리
const ExamplePhone = styled.ul<IExamplePhone>`
    display: ${(props) => {
        if (props.inputClickNumber1 === props.number) {
            return "block";
        } else {
            return "none";
        }
    }};
    position: absolute;
    z-index: 10;
    top: 48px;
    left: 0px;
    width: 100%;
    padding: 1px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    margin-top: -1px;

    li:hover {
        background-color: #ebebeb;
    }
`;

const Left = styled.div`
    width: calc(49.4%);
`;

const Right = styled.div`
    width: calc(49.4%);
`;

const Input = styled.input`
    outline: transparent;
    width: 100%;
    border: none;
    font-size: 15px;
    line-height: 42px;
    color: #000;
    letter-spacing: -0.2px;
`;

const FindAddressBtn = styled.button`
    display: inline-block;
    width: 92px;
    height: 100%;
    border: none;
    border-radius: 8px;
    background-color: #e5e5e5;
    margin-left: 8px;

    span {
        color: rgba(0, 0, 0, 0.26);
        font-size: 15px;
        font-weight: 700;
    }
`;

// 결제 상품 리스트
const ListWrap = styled.ul``;

const List = styled.li`
`;

const ListTop = styled.div`
    display: flex;
`;

const ListLeft = styled.div``;

const ImgWrap = styled.div`
    display: flex;
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
    width: 350px;
    padding: 20px;
    border-right: 1px solid #e0e0e0;
`;

const Name = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        display: flex;
        justify-content: center;
        background-color: transparent;
        border: 0;
        align-items: center;
        width: 22px;
        height: 22px;
        padding: 5px;
        margin-bottom: 2px;
        svg {
            width: 13px;
            height: 13px;
        }
    }
`;
const ProductPrice = styled.div`
    font-size: 15px;
    font-weight: 400;

    del {
        color: #aaaaaa;
        font-weight: 100;
        font-size: 13px;
    }
`;

// 장바구니 옵션
const CheckBox = styled.input.attrs({ type: "checkbox" })<ICheckBox>`
    display: none;
    position: absolute;
`;

interface ICheckIconBox {
    checked: any;
}

const CheckIconBox = styled.span<ICheckIconBox>`
    display: block;
    position: relative;
    width: 19px;
    height: 19px;
    border: 1.2px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    background-color: ${(props) => (props.checked ? "#03c75a" : "none")};
    border-color: ${(props) => (props.checked ? "#03c75a" : "#d3d3d3")};
`;

const Selected = styled.div`
    display: flex;
    &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

const OptionType = styled.span``;

const OptionName = styled.span`
    width: 300px;
    padding: 10px 20px;
    border-right: 1px solid #e0e0e0;
`;

const OptionNameList = styled.div`
    padding: 12px 0;

    &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

const OptionList = styled.div`
    display: flex;
    &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

// 장바구니 금액
const Text = styled.div``;
const Price = styled.div`
    font-weight: 700;
`;
const Unit = styled.span``;

const OptionPrice = styled.div`
    padding: 20px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DeliveryName = styled.div`
    font-size: 14px;
    color: #4b4b4b;
`;

const DeliveryWrap = styled.div`
    padding-left: 20px;
    border-left: 1px solid #e0e0e0;

    display: flex;
    width: 160px;
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

const SalePrice = styled.div`
    position: relative;
    padding-right: 30px;

    ${Price} {
        color: #f85151;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        max-height: 46px;
        background-color: #d1d4d7;
        content: "";
    }
`;

const ErrorMessageWrap = styled.div`
    margin-top: 10px;
`;

const ErrorMessage = styled.span`
    color: red;
    margin-top: 10px;
`;

interface ICheckedID {
    [index: number]: string;
    length: number;
    some: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => boolean;
    filter: (callbackfn: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => string[];
    [Symbol.iterator](): IterableIterator<string>;
    includes(searchElement: string, fromIndex?: number): boolean;
}

type Props = {
    // cartCheck: any;
};

function Buy(props: Props) {
    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    // 결제예정 상품
    const [payList, setPayList] = useState<any>();
    console.log(payList);

    const randomId = uuidv4().replace(/-/g, "");

    const [cookies, setCookie, removeCookie] = useCookies(["userjwt"]);

    const [checkedID, setCheckedID] = useState<ICheckedID>([]);
    const [cartCheck, setCartCheck] = useState<any>([]);

    // 유저 정보
    const [userInfo, setUserInfo] = useState<any>([]);

    // 신규 배송지 선택 기본배송지:true, 신규배송지:false
    const [isNewAddress, setIsNewAddress] = useState<any>(false);

    // 신규 배송지 필수입력 유효성 검사
    const [isReceiver, setIsReceiver] = useState<boolean>(false);
    const [isPhoneNum1, setIsPhoneNum1] = useState<boolean>(false);
    const [isAddress, setIsAddress] = useState<boolean>(false);

    const [inputClickNumber, setInputClickNumber] = useState(0);

    // 기본 배송지
    const [deliMessage, setDeliMessage] = useState<string>();
    const [passMessage, setPassMessage] = useState<string>();
    const [deliPassMessage, setDeliPassMessage] = useState<string>();

    // 신규 배송지 정보

    const [receiver, setReceiver] = useState<String>("");
    const [addressName, setAddressName] = useState<String>("");

    const [phoneNum11, setPhoneNum11] = useState<number>();
    const [phoneNum12, setPhoneNum12] = useState<number | null>();
    const [phoneNum13, setPhoneNum13] = useState<number | null>();
    const [phoneNumResult1, setPhoneNumResult1] = useState<String>("");

    const [phoneNum21, setPhoneNum21] = useState<number>();
    const [phoneNum22, setPhoneNum22] = useState<number>();
    const [phoneNum23, setPhoneNum23] = useState<number>();
    const [phoneNumResult2, setPhoneNumResult2] = useState<String>("");

    const [openPostcode, setOpenPostcode] = useState<boolean>(false);
    const [postCode, setPostCode] = useState<number>();
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    const [NewDeliMessage, setNewDeliMessage] = useState<string>();
    const [NewPassMessage, setNewPassMessage] = useState<string>();
    const [NewDeliPassMessage, setNewDeliPassMessage] = useState<string>();

    // 기본배송지 ref
    const inputDeliMessage = useRef<HTMLDivElement>(null);
    const inputPassMessage = useRef<HTMLDivElement>(null);

    // 신규배송지 ref
    const inputNameRef = useRef<HTMLDivElement>(null);
    const inputAddressNameRef = useRef<HTMLDivElement>(null);
    const inputPhone11Ref = useRef<HTMLDivElement>(null);
    const inputPhone12Ref = useRef<HTMLDivElement>(null);
    const inputPhone13Ref = useRef<HTMLDivElement>(null);
    const inputPhone21Ref = useRef<HTMLDivElement>(null);
    const inputPhone22Ref = useRef<HTMLDivElement>(null);
    const inputPhone23Ref = useRef<HTMLDivElement>(null);
    const inputAddress1Ref = useRef<HTMLDivElement>(null);
    const inputAddress2Ref = useRef<HTMLDivElement>(null);
    const inputAddress3Ref = useRef<HTMLDivElement>(null);
    const inputMessageRef = useRef<HTMLDivElement>(null);
    const inputPassRef = useRef<HTMLDivElement>(null);

    // 기본 배송지 오류 메세지
    const [ErrorPasswordMessage, setErrorPasswordMessage] = useState<string>("");

    // 신규 배송지 오류 메세지
    const [ErrorNewPasswordMessage, setErrorNewPasswordMessage] = useState<string>("");

    const defaultDeliMessgae = [{ text: "배송 전에 미리 연락 바랍니다." }, { text: "부재시 경비실에 맡겨 주세요." }, { text: "부재시 전화 주시거나 문자 남겨 주세요." }];
    const defaultPhoneNum = [
        { number: "010" },
        { number: "011" },
        { number: "016" },
        { number: "017" },
        { number: "018" },
        { number: "019" },
        { number: "02" },
        { number: "031" },
        { number: "032" },
        { number: "033" },
        { number: "041" },
        { number: "042" },
        { number: "043" },
        { number: "044" },
        { number: "051" },
        { number: "052" },
        { number: "053" },
        { number: "054" },
        { number: "055" },
        { number: "061" },
        { number: "062" },
        { number: "063" },
        { number: "064" },
        { number: "070" },
        { number: "080" },
        { number: "0130" },
        { number: "0303" },
        { number: "0502" },
        { number: "0503" },
        { number: "0504" },
        { number: "0505" },
        { number: "0506" },
        { number: "0507" },
        { number: "0508" },
        { number: "050" },
        { number: "012" },
        { number: "059" },
    ];

    const defaultPhone2Num = [
        { number: "선택" },
        { number: "010" },
        { number: "011" },
        { number: "016" },
        { number: "017" },
        { number: "018" },
        { number: "019" },
        { number: "02" },
        { number: "031" },
        { number: "032" },
        { number: "033" },
        { number: "041" },
        { number: "042" },
        { number: "043" },
        { number: "044" },
        { number: "051" },
        { number: "052" },
        { number: "053" },
        { number: "054" },
        { number: "055" },
        { number: "061" },
        { number: "062" },
        { number: "063" },
        { number: "064" },
        { number: "070" },
        { number: "080" },
        { number: "0130" },
        { number: "0303" },
        { number: "0502" },
        { number: "0503" },
        { number: "0504" },
        { number: "0505" },
        { number: "0506" },
        { number: "0507" },
        { number: "0508" },
        { number: "050" },
        { number: "012" },
        { number: "059" },
    ];

    const addresshandle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode((current) => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data: any) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
            setIsAddress(true);
            setOpenPostcode(false);
            setPostCode(data.zonecode);
            setAddress(data.address);
        },
    };

    // 주문서

    // 체크된 결제 예정 상품 리스트 불러오기
    useEffect(() => {
        const paylist = async () => {
            // cart에서 받아온 주문리스트중 체크 안된 상품은 제거합니다.
            const filtered = location.state.filter((list: any) => list.count !== 0)
            setPayList(filtered);
            if (payList === null) {
                alert("결제시간이 초과하여 장바구니 페이지로 이동합니다.");
                navigate("/cart");
            }
        };
        paylist();
    }, []);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.post("/smartstore/buy", {}, { withCredentials: true });
                if (res.status) {
                    setUserInfo(res.data.user);
                } else {
                    removeCookie("userjwt");
                    navigate("/user/login");
                }
            } catch (errors) {
                console.log(errors);
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    // 장바구니 상품 최종 결제금액
    useEffect(() => {
        const result = cartCheck?.reduce((acc: any, cur: any) => {
            if (cur.total != 0) {
                acc += cur.total;
                if (cur.product) {
                    cur.product.delivery = Number(cur.product.delivery);
                    acc += cur.product.delivery;
                }
            }
            return acc;
        }, 0);
    }, [cartCheck]);

    // Input 포커스
    const onFocus = (e: any) => {
        console.log(e.target.value);
    };

    const onClick = (number: any) => {
        setInputClickNumber(number);
    };

    // 기본 배송지 함수 모음
    const defaultDelivery = {
        // 배송 메세지
        MessageHandler: (e: any) => {
            setDeliMessage(e.target.value);
        },

        // 배송 메세지 기본값 클릭
        MessageExampleClick: (e: any) => {
            setDeliMessage(e.target.innerHTML);
            setInputClickNumber(0);
        },

        // 공동현관 비밀번호
        PasswordHandler: (e: any) => {
            const regex = /^[0-9]*$/;

            if (regex.test(e.target.value)) {
                setPassMessage(e.target.value);
                setErrorPasswordMessage("");
                if (e.target.value.length > 10) {
                    setPassMessage("");
                    setErrorPasswordMessage("10글자 이내로 작성해주세요.");
                    return;
                }
                return;
            }
            setPassMessage("");
            setErrorPasswordMessage("숫자만 입력 해주세요.");
        },
    };

    // 기본 배송지 공동현관 비밀번호 입력시 배송메세지에 등록됩니다.
    useEffect(() => {
        if (passMessage) {
            setDeliPassMessage("(공동현관" + passMessage + ")");
            if (deliMessage) {
                setDeliPassMessage("(공동현관" + passMessage + ")" + deliMessage);
            }
        } else {
            setDeliPassMessage(deliMessage);
        }
    }, [deliMessage, passMessage]);

    // 신규 배송지 함수 모음
    const NewDelivery = {
        // 수령인
        ReceiverHandler: (e: any) => {
            setReceiver(e.target.value);
        },

        // 배송지명
        AddressNameHandler: (e: any) => {
            setAddressName(e.target.value);
        },

        // 연락처 1-1
        Phone11Handler: (e: any) => {
            setPhoneNum11(e.target.innerHTML);
            setInputClickNumber(0);
        },

        // // 연락처 1-2
        // Phone12Handler: (e: any) => {
        //     setPhoneNum12(e.target.value);

        // },

        // 연락처 1-2
        Phone12Handler: (e: any) => {
            const regex = /^[0-9]*$/;

            if (regex.test(e.target.value)) {
                setPhoneNum12(e.target.value);
                if (e.target.value.length >= 4) {
                    inputPhone13Ref.current?.focus();
                }
            } else {
                setPhoneNum12(null);
            }
        },

        // 연락처 1-3
        Phone13Handler: (e: any) => {
            const regex = /^[0-9]*$/;

            if (regex.test(e.target.value)) {
                setPhoneNum13(e.target.value);
                if (e.target.value.length >= 5) {
                    setPhoneNum13(phoneNum13);
                }
            } else {
                setPhoneNum13(null);
            }
        },

        // 연락처 2-1
        Phone21Handler: (e: any) => {
            setPhoneNum21(e.target.innerHTML);
            setInputClickNumber(0);
        },

        // 연락처 2-2
        Phone22Handler: (e: any) => {
            setPhoneNum22(e.target.value);
        },

        // 연락처 2-3
        Phone23Handler: (e: any) => {
            setPhoneNum23(e.target.value);
        },

        // 우편번호
        PostCodeHandler: (e: any) => {
            setDetailAddress(e.target.value);
        },

        // 상세 주소
        DetailAddressHandler: (e: any) => {
            setDetailAddress(e.target.value);
        },

        // 배송 메세지
        MessageHandler: (e: any) => {
            setNewDeliMessage(e.target.value);
        },

        // 배송 메세지 기본값 클릭
        MessageExampleClick: (e: any) => {
            setNewDeliMessage(e.target.innerHTML);
            setInputClickNumber(0);
        },

        // 공동현관 비밀번호
        PasswordHandler: (e: any) => {
            const regex = /^[0-9]*$/;

            if (regex.test(e.target.value)) {
                setNewPassMessage(e.target.value);
                setErrorNewPasswordMessage("");
                if (e.target.value.length > 10) {
                    setNewPassMessage("");
                    setErrorNewPasswordMessage("10글자 이내로 작성해주세요.");
                    return;
                }
                return;
            }
            setNewPassMessage("");
            setErrorNewPasswordMessage("숫자만 입력 해주세요.");
        },
    };

    // 신규 배송지 공동현관 비밀번호 입력시 배송메세지에 등록됩니다.
    useEffect(() => {
        if (NewPassMessage) {
            setNewDeliPassMessage("(공동현관" + NewPassMessage + ")");
            if (NewDeliMessage) {
                setDeliPassMessage("(공동현관" + NewPassMessage + ")" + NewDeliMessage);
            }
        } else {
            setNewDeliPassMessage(NewDeliMessage);
        }
    }, [NewDeliMessage, NewPassMessage]);

    // 각 input 바깥 클릭시 닫아주는거
    useEffect(() => {
        const clickOutside = (e: any) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            // useRef의 current 값은 선택한 DOM을 말함.
            // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

            if (inputClickNumber === 1 && inputDeliMessage.current && !inputDeliMessage.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 2 && inputPassMessage.current && !inputPassMessage.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 10 && inputNameRef.current && !inputNameRef.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 11 && inputAddressNameRef.current && !inputAddressNameRef.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 12 && inputPhone11Ref.current && !inputPhone11Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 13 && inputPhone12Ref.current && !inputPhone12Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 14 && inputPhone13Ref.current && !inputPhone13Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 15 && inputPhone21Ref.current && !inputPhone21Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 16 && inputPhone22Ref.current && !inputPhone22Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 17 && inputPhone23Ref.current && !inputPhone23Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 18 && inputAddress1Ref.current && !inputAddress1Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 19 && inputAddress2Ref.current && !inputAddress2Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 20 && inputAddress3Ref.current && !inputAddress3Ref.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber === 21 && inputMessageRef.current && !inputMessageRef.current.contains(e.target)) {
                // setInputClick(false);
                setInputClickNumber(0);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [inputClickNumber]);

    const cart = (
        <ListWrap>
            <List className="List">
                {payList?.map((paylist: any, index: any) => (
                    <>
                        <ListTop>
                            <ListLeft>
                                {paylist.selected?.map((selected: any, index: any) => (
                                    <>
                                        <Selected className="selected">
                                            <ImgWrap>
                                                <Img>
                                                    <img src={paylist.product.mainImage} alt="" />
                                                </Img>
                                            </ImgWrap>
                                            <ProductText>
                                                <Name>
                                                    <div>
                                                        <svg width="48" height="15" viewBox="0 0 48 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#IcoNpayPlus_svg__clip0_1450:8150)">
                                                                <path d="M47 0H34.141l-3.124 7.686L34.142 15H47a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" fill="#1E9BF5"></path>
                                                                <path
                                                                    d="M42.652 6.505v-2.97h-1.99v2.97h-2.97v1.99h7.93v-1.99h-2.97zm-1.98 2.253l-.012 2.707h1.99V10.21c0-.943-1-1.453-1.978-1.453zM1.114 1.115h12.77v12.77H1.114V1.114z"
                                                                    fill="#fff"
                                                                ></path>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.746 4V7.5L6.15 4H4v6.998h2.252v-3.5l2.596 3.5h2.15V4H8.746z" fill="#03C75A"></path>
                                                                <path
                                                                    d="M0 1v13a1 1 0 0 0 1 1h33.142a.858.858 0 0 0 .858-.857V.857A.857.857 0 0 0 34.142 0H1a1 1 0 0 0-1 1zm1.3 12.698V1.3h12.398v12.398H1.3z"
                                                                    fill="#03C75A"
                                                                ></path>
                                                                <path
                                                                    d="M16.83 3.606h2.502c.346-.008.693.04 1.026.143.26.08.5.213.702.393.183.166.324.373.41.604.09.24.135.496.133.754v.193c0 .263-.049.523-.142.769-.092.242-.24.458-.43.634a2.1 2.1 0 0 1-.714.428c-.32.113-.66.169-.999.162h-1.325v2.55h-1.165v-6.63h.001zm1.177.984v2.106h1.168a1.64 1.64 0 0 0 .912-.22c.219-.144.33-.415.33-.8V5.51a1.071 1.071 0 0 0-.082-.45.72.72 0 0 0-.235-.288.923.923 0 0 0-.364-.142 2.194 2.194 0 0 0-.46-.041l-1.269.001zm5.842 5.722c-.546 0-.969-.125-1.269-.374a1.27 1.27 0 0 1-.45-1.044V8.6c-.002-.194.03-.388.096-.572.066-.177.176-.334.322-.456.175-.142.377-.246.595-.305.294-.08.598-.118.901-.11h1.161v-.195c0-.312-.073-.537-.217-.675-.145-.137-.374-.206-.685-.207-.52 0-1.024.178-1.429.506l-.57-.846c.274-.188.567-.346.874-.474a2.866 2.866 0 0 1 1.142-.208c.277-.002.553.035.82.11.233.066.453.173.648.32.18.131.327.305.428.505.105.212.158.447.153.684v3.56h-1.04l-.019-.623a.817.817 0 0 1-.234.298c-.11.09-.231.164-.363.219a2.238 2.238 0 0 1-.864.18zm1.353-2.255H24.07c-.308 0-.52.058-.64.176a.627.627 0 0 0-.18.468v.11a.462.462 0 0 0 .178.387c.15.104.333.154.516.144.47 0 .82-.114 1.048-.34a.589.589 0 0 0 .183-.335c.021-.155.03-.31.029-.465l-.003-.145zm3.092-2.889l1.142 3.744h.037l1.159-3.744h1.233l-2.626 7.178-1.085-.377.653-1.665L27 5.169h1.293z"
                                                                    fill="#fff"
                                                                ></path>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="IcoNpayPlus_svg__clip0_1450:8150">
                                                                    <path fill="#fff" d="M0 0h48v15H0z"></path>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        &nbsp;{paylist.product.name}
                                                    </div>
                                                </Name>
                                                <ProductPrice>
                                                    {paylist.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    <span>원</span>
                                                    <del>
                                                        &nbsp;
                                                        {paylist.product.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </del>
                                                </ProductPrice>
                                            </ProductText>
                                            <OptionList key={index}>
                                                <OptionName>
                                                    {selected.list.map((order: any, index: any) => (
                                                        <OptionNameList key={index}>
                                                            <OptionType>{paylist.product.option[0].optionName}&nbsp;</OptionType>
                                                            <span>&nbsp;{order.option}&nbsp;/&nbsp;</span>
                                                            <span>&nbsp;{order.count}</span>
                                                            <span>개</span>
                                                        </OptionNameList>
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
                                                    <OptionPriceShipping></OptionPriceShipping>
                                                </OptionPrice>
                                                {/* <DeliveryWrap>
                                        <DeliveryName>배송비</DeliveryName>
                                        {paylist.product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </DeliveryWrap> */}
                                            </OptionList>
                                        </Selected>
                                    </>
                                ))}
                            </ListLeft>

                            <DeliveryWrap>
                                <DeliveryName>배송비</DeliveryName>
                                {paylist.product.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </DeliveryWrap>
                        </ListTop>
                    </>
                ))}
            </List>
        </ListWrap>
    );

    return (
        <>
            <Wrap>
                <Box>{cart}</Box>
                <Box>
                    <AddressSelectWrap>
                        <div>배송지 선택</div>
                        <CheckBoxWrap>
                            <input type="radio" id={"radio1"} />
                            <Label htmlFor={"radio1"} onClick={() => setIsNewAddress(false)}>
                                <CheckIcon className="checkicon" isNewAddress={isNewAddress}></CheckIcon>
                            </Label>
                            <span>&nbsp;기본 배송지</span>
                            <span>&nbsp;&nbsp;</span>
                            <input type="radio" id={"radio2"} />
                            <Label2 htmlFor={"radio2"} onClick={() => setIsNewAddress(true)}>
                                <CheckIcon2 className="checkicon" isNewAddress={isNewAddress}></CheckIcon2>
                            </Label2>
                            <span>&nbsp;신규 배송지</span>
                        </CheckBoxWrap>
                    </AddressSelectWrap>
                    {!isNewAddress ? (
                        <UserInfoWrap>
                            <UserInfo>
                                <div>{userInfo.name}</div>
                                <div>{userInfo.phone}</div>
                                <div>
                                    <span>({userInfo.postcode})&nbsp;</span>
                                    <span>{userInfo.address}&nbsp;</span>
                                    <span>{userInfo.detailaddress}</span>
                                </div>
                            </UserInfo>
                            <InputFlex>
                                <Left className="left" ref={inputDeliMessage}>
                                    <span>배송메세지</span>
                                    <InputWrap
                                        inputClickNumber={inputClickNumber}
                                        number={1}
                                        onClick={() => {
                                            // setInputClick(true);
                                            if (inputClickNumber == 0) {
                                                setInputClickNumber(1);
                                            } else {
                                                setInputClickNumber(0);
                                            }
                                        }}
                                    >
                                        <Input
                                            type="text"
                                            name="delimessage"
                                            placeholder="요청사항을 입력 해주세요."
                                            className="input"
                                            value={deliMessage ? deliMessage : ""}
                                            onChange={defaultDelivery.MessageHandler}
                                        />
                                        <div>
                                            <span></span>
                                        </div>
                                    </InputWrap>
                                    <Example number={1} inputClickNumber1={inputClickNumber}>
                                        {defaultDeliMessgae?.map((list: any, index: any) => (
                                            <li key={index} onClick={defaultDelivery.MessageExampleClick}>
                                                {list.text}
                                            </li>
                                        ))}
                                    </Example>
                                </Left>
                                <Right>
                                    <span>공동현관 비밀번호</span>

                                    <InputWrap number={2} inputClickNumber={inputClickNumber} ref={inputPassMessage}>
                                        <Input
                                            type="text"
                                            key="pass"
                                            placeholder="공동현관 비밀번호를 택배 기사님께 전하시려면 작성 해주세요."
                                            className="input"
                                            onClick={() => {
                                                setInputClickNumber(2);
                                            }}
                                            onChange={defaultDelivery.PasswordHandler}
                                        />
                                    </InputWrap>
                                    <ErrorMessageWrap>
                                        <ErrorMessage>{ErrorPasswordMessage}</ErrorMessage>
                                    </ErrorMessageWrap>
                                </Right>
                            </InputFlex>
                        </UserInfoWrap>
                    ) : (
                        <NewUserInfo>
                            <NewUserInfoList>
                                <TextWrap>
                                    <span>수령인</span>
                                </TextWrap>
                                <InputWrap2 number={10} width={200} inputClickNumber={inputClickNumber} ref={inputNameRef}>
                                    <Input
                                        type="text"
                                        placeholder="50자 이내로 입력하세요."
                                        className="input"
                                        onChange={NewDelivery.ReceiverHandler}
                                        onFocus={() => {
                                            setInputClickNumber(10);
                                        }}
                                    />
                                </InputWrap2>
                            </NewUserInfoList>
                            <NewUserInfoList>
                                <TextWrap>
                                    <span>배송지명</span>
                                </TextWrap>
                                <InputWrap2 number={11} width={200} inputClickNumber={inputClickNumber} ref={inputAddressNameRef}>
                                    <Input
                                        type="text"
                                        placeholder="직접 입력하거나 선택하세요."
                                        className="input"
                                        onFocus={() => {
                                            setInputClickNumber(11);
                                        }}
                                        onChange={NewDelivery.AddressNameHandler}
                                    />
                                </InputWrap2>
                            </NewUserInfoList>
                            <NewUserInfoList>
                                <TextWrap>
                                    <span>연락처1</span>
                                </TextWrap>
                                <InputWrap2
                                    number={12}
                                    width={100}
                                    inputClickNumber={inputClickNumber}
                                    onClick={() => {
                                        if (inputClickNumber == 0) {
                                            setInputClickNumber(12);
                                        } else {
                                            setInputClickNumber(0);
                                        }
                                    }}
                                    ref={inputPhone11Ref}
                                >
                                    <Input type="text" placeholder="" className="input" value={phoneNum11} onChange={NewDelivery.Phone11Handler} />
                                    <ExamplePhone number={12} inputClickNumber1={inputClickNumber}>
                                        {defaultPhoneNum?.map((list: any, index: any) => (
                                            <li key={index} onClick={NewDelivery.Phone11Handler}>
                                                {list.number}
                                            </li>
                                        ))}
                                    </ExamplePhone>
                                    <div>
                                        <span></span>
                                    </div>
                                </InputWrap2>
                                <span>&nbsp;-&nbsp;</span>
                                <InputWrap2 number={13} width={100} inputClickNumber={inputClickNumber} ref={inputPhone12Ref}>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        className="input"
                                        value={phoneNum12 ? phoneNum12 : ""}
                                        onFocus={() => {
                                            setInputClickNumber(13);
                                        }}
                                        onChange={NewDelivery.Phone12Handler}
                                        maxLength={4}
                                    />
                                </InputWrap2>
                                <span>&nbsp;-&nbsp;</span>

                                <InputWrap2 number={14} width={100} inputClickNumber={inputClickNumber} ref={inputPhone13Ref}>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        className="input"
                                        onFocus={() => {
                                            setInputClickNumber(14);
                                        }}
                                        onChange={NewDelivery.Phone13Handler}
                                        maxLength={4}
                                    />
                                </InputWrap2>
                            </NewUserInfoList>
                            <NewUserInfoList>
                                <TextWrap>
                                    <span>연락처2</span>
                                </TextWrap>
                                <InputWrap2
                                    number={15}
                                    width={100}
                                    inputClickNumber={inputClickNumber}
                                    onClick={() => {
                                        if (inputClickNumber == 0) {
                                            setInputClickNumber(15);
                                        } else {
                                            setInputClickNumber(0);
                                        }
                                    }}
                                    ref={inputPhone21Ref}
                                >
                                    <Input type="text" placeholder="" className="input" value={phoneNum21 ? phoneNum21 : "선택"} onChange={NewDelivery.Phone21Handler} />
                                    <ExamplePhone number={15} inputClickNumber1={inputClickNumber}>
                                        {defaultPhone2Num?.map((list: any, index: any) => (
                                            <li key={index} onClick={NewDelivery.Phone21Handler}>
                                                {list.number}
                                            </li>
                                        ))}
                                    </ExamplePhone>
                                    <div>
                                        <span></span>
                                    </div>
                                </InputWrap2>
                                <span>&nbsp;-&nbsp;</span>
                                <InputWrap2 number={16} width={100} inputClickNumber={inputClickNumber} ref={inputPhone22Ref}>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        className="input"
                                        onFocus={() => {
                                            setInputClickNumber(16);
                                        }}
                                        onChange={NewDelivery.Phone22Handler}
                                    />
                                </InputWrap2>
                                <span>&nbsp;-&nbsp;</span>
                                <InputWrap2 number={17} width={100} inputClickNumber={inputClickNumber} ref={inputPhone23Ref}>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        className="input"
                                        onFocus={() => {
                                            setInputClickNumber(17);
                                        }}
                                        onChange={NewDelivery.Phone23Handler}
                                    />
                                </InputWrap2>
                            </NewUserInfoList>
                            <NewUserInfoList>
                                <TextWrap>
                                    <span>배송지 주소</span>
                                </TextWrap>
                                <AddressWrap>
                                    <InputWrap2Wrap>
                                        <InputWrap2 number={18} width={100} inputClickNumber={inputClickNumber} ref={inputAddress1Ref}>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                value={postCode}
                                                className="input"
                                                onFocus={() => {
                                                    setInputClickNumber(18);
                                                }}
                                            />
                                        </InputWrap2>
                                        <div>
                                            <FindAddressBtn className="findAddressBtn" onClick={addresshandle.clickButton}>
                                                <span className="text">주소검색</span>
                                            </FindAddressBtn>
                                        </div>
                                    </InputWrap2Wrap>

                                    <InputWrap2Wrap>
                                        <InputWrap2 number={19} width={300} inputClickNumber={inputClickNumber} ref={inputAddress2Ref}>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                className="input"
                                                value={address}
                                                onFocus={() => {
                                                    setInputClickNumber(19);
                                                }}
                                            />
                                        </InputWrap2>
                                        <span>&nbsp;</span>

                                        <InputWrap2 number={20} width={300} inputClickNumber={inputClickNumber} ref={inputAddress3Ref}>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                className="input"
                                                value={detailAddress}
                                                onFocus={() => {
                                                    setInputClickNumber(20);
                                                }}
                                                onChange={NewDelivery.DetailAddressHandler}
                                            />
                                        </InputWrap2>
                                    </InputWrap2Wrap>
                                </AddressWrap>
                                {openPostcode && (
                                    <PostcodeWrap className="postcode-wrap">
                                        <DaumPostcode
                                            onComplete={addresshandle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                                        />
                                    </PostcodeWrap>
                                )}
                            </NewUserInfoList>
                            <NewUserInfoList>
                                <InputFlex>
                                    <Left className="left" ref={inputDeliMessage}>
                                        <span>배송메세지</span>
                                        <InputWrap number={21} inputClickNumber={inputClickNumber} ref={inputMessageRef}>
                                            <Input
                                                type="text"
                                                name="delimessage"
                                                placeholder="요청사항을 입력 해주세요."
                                                className="input"
                                                value={NewDeliMessage ? NewDeliMessage : ""}
                                                onFocus={() => {
                                                    setInputClickNumber(21);
                                                }}
                                                onChange={NewDelivery.MessageHandler}
                                                
                                            />
                                            <div>
                                                <span></span>
                                            </div>
                                        </InputWrap>
                                        <Example number={21} inputClickNumber1={inputClickNumber}>
                                            {defaultDeliMessgae?.map((list: any, index: any) => (
                                                <li key={index} onClick={NewDelivery.MessageExampleClick}>
                                                    {list.text}
                                                </li>
                                            ))}
                                        </Example>
                                    </Left>
                                    <Right>
                                        <span>공동현관 비밀번호</span>

                                        <InputWrap number={22} inputClickNumber={inputClickNumber} ref={inputPassRef}>
                                            <Input
                                                type="text"
                                                key="pass"
                                                placeholder="공동현관 비밀번호를 택배 기사님께 전하시려면 작성 해주세요."
                                                className="input"
                                                onFocus={() => {
                                                    setInputClickNumber(22);
                                                }}
                                                onChange={NewDelivery.PasswordHandler}
                                            />
                                        </InputWrap>
                                        <ErrorMessageWrap>
                                            <ErrorMessage>{ErrorNewPasswordMessage}</ErrorMessage>
                                        </ErrorMessageWrap>
                                    </Right>
                                </InputFlex>
                            </NewUserInfoList>
                        </NewUserInfo>
                    )}

                    <Payment></Payment>
                </Box>
                <Box>
                    <div>결제금액</div>
                    <span>{payList?.reduce((acc: any, cur: any) => acc + (Number(cur.product.cost) * Number(cur.count)), 0)}원</span>
                    <div>상품금액</div>
                    <span>{payList?.reduce((acc: any, cur: any) => acc + Number(cur.total), 0)}원</span>
                    <div>배송비</div>
                    <span>{payList?.reduce((acc: any, cur: any) => acc + Number(cur.total), 0)}원</span>
                    <div>할인금액</div>
                </Box>
                <PayButton></PayButton>
            </Wrap>
        </>
    );
}

export default Buy;
