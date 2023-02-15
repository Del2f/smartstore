// import $ from "jquery";
import axios from "../../api/axios";

import { useState, useRef, useEffect, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShowMenu } from "../../store/menuSlice";

import TableProduct from "../../components/admin/TableProductRegi";
import ImageProductRegi from "../../components/admin/ImageProductRegi";
import SubImageProductRegi from "../../components/admin/SubImageProductRegi";
import DetailImageProductRegi from "../../components/admin/DetailImageProductRegi";

import { useCookies } from "react-cookie";

type Props = {
    setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
    setNotice?: React.Dispatch<SetStateAction<any>>;
    setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

function ProductRegister(props: Props) {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        const userObjectID = async (params: any) => {
            try {
                const res = await axios.post( "/smartstore/home/productregister/get", cookies, { withCredentials:true })
                const defaultCategory = res.data.category.category;
                const allProduct = defaultCategory.filter((list: any) => list.name == "전체상품")
                console.log(allProduct)
                setCategory(allProduct)
              } catch (err) {
                console.log(err)
              }
        };
        userObjectID('');
    },[])

    const menu = useSelector(selectShowMenu);
    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [Price, setPrice] = useState("");
    const [OptionID, setOptionID] = useState<any>(0);
    const [OptionName, setOptionName] = useState<any>("");
    const [OptionValue, setOptionValue] = useState<any>([]);
    const [OptionResult, setOptionResult] = useState<any>([]);

    // 재고가 있으면서 사용여부가 Y인 경우에만 판매승인
    useEffect(() => {
        const use = OptionResult.some((list: any) => {
            return list.optionUse == "Y" && list.optionStock > 0;
        });

        if (use) {
            // console.log('판매 가능')
            setIsOptionList(true);
        } else {
            // console.log('판매 불가능')
            setIsOptionList(false);
        }
    }, [OptionResult]);

    const [MainImage, setMainImage] = useState<any>([]);
    const [SubImage, setSubImage] = useState<any>([]);
    const [DetailImage, setDetailImage] = useState<any>([]);
    // console.log(MainImage)
    // console.log(SubImage)
    // console.log(DetailImage)

    const [Delivery, setDelivery] = useState("");

    // 상품 수정
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            console.log("id가 조회되어 isEdit true로 변경");

            const get = async () => {
                const db = await axios.get(`/smartstore/home/product/${id}`);
                try {
                    console.log(`${id}의 db 정보를 가져옵니다.`);
                    const product = db.data.productEdit;
                    console.log(product);

                    setCategoryType(1);
                    setName(product.name);
                    setPrice(product.price);
                    setOptionName(product.option[0].optionName);
                    setMainImage(product.mainImage);
                    setSubImage(product.subImage);
                    setDetailImage(product.detailImage);

                    const valueString = product.option.map((list: any) => {
                        return list.optionValue;
                    });
                    setOptionValue(valueString.join());
                    setOptionResult(product.option);
                    setDelivery(product.delivery);

                    //유효성 검사 true
                    setIsCategory(true);
                    setIsName(true);
                    setIsPrice(true);
                    setIsOptionName(true);
                    setIsOptionValue(true);
                    setIsOptionList(true);
                    setIsImage(true);
                    setIsDetail(true);
                    setIsDelivery(true);
                    setSubmit(true);

                    if (product.category1.name) {
                        setSelectedCategory01(product.category1);
                        setOnCategoryText01(true);
                    }

                    if (product.category2.name) {
                        setSelectedCategory02(product.category2);
                        setOnCategory02(true);
                        setOnCategoryText02(true);

                        const result = second.filter((element: any) => element.parentcode == product.category1.code);
                        setShowSecond(result);
                    }

                    if (product.category3.name) {
                        setSelectedCategory03(product.category3);
                        setOnCategory03(true);
                        setOnCategoryText03(true);

                        const result = third.filter((element: any) => element.parentcode == product.category2.code);
                        setShowThird(result);
                    }

                    if (product.category4.name) {
                        console.log("실행");
                        setSelectedCategory04(product.category4);
                        setOnCategory04(true);
                        setOnCategoryText04(true);

                        const result = fourth.filter((element: any) => element.parentcode == product.category3.code);
                        setShowFourth(result);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            get();
        } else if (!id) {
            setIsEdit(false);
            console.log("그냥 상품등록입니다");
            setCategoryType(0);
            setName("");
            setPrice("");
            setIsCategory(false);

            setOnCategory02(false);
            setOnCategory03(false);
            setOnCategory04(false);

            setOnCategoryText01(false);
            setOnCategoryText02(false);
            setOnCategoryText03(false);
            setOnCategoryText04(false);

            setSelectedCategory01([]);
            setSelectedCategory02([]);
            setSelectedCategory03([]);
            setSelectedCategory04([]);

            setOptionName("");
            setOptionValue("");
            setOptionResult([]);
            setMainImage([]);
            setSubImage([]);
            setDetailImage([]);
            setDelivery("");
        }
    }, [id]);

    //오류메시지 상태저장
    const [NameMessage, setNameMessage] = useState<string>("");
    const [PriceMessage, setPriceMessage] = useState<string>("");
    const [OptionNameMessage, setOptionNameMessage] = useState<string>("");
    const [OptionValueMessage, setOptionValueMessage] = useState<string>("");
    const [ImageMessage, setImageMessage] = useState<string>("");
    const [DetailMessage, setDetailMessage] = useState<string>("");
    const [DeliveryMessage, setDeliveryMessage] = useState<string>("");

    // 유효성 검사
    const [isCategory, setIsCategory] = useState<boolean>(false);
    const [isName, setIsName] = useState<boolean>(false);
    const [isPrice, setIsPrice] = useState<boolean>(false);
    const [isOptionName, setIsOptionName] = useState<boolean>(false);
    const [isOptionValue, setIsOptionValue] = useState<boolean>(false);
    const [isOptionList, setIsOptionList] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [isDetail, setIsDetail] = useState<boolean>(false);
    const [isDelivery, setIsDelivery] = useState<boolean>(false);
    const [Submit, setSubmit] = useState<boolean>(false);

    // console.log('카테고리'+isCategory)
    // console.log('상품명'+isName)
    // console.log('가격'+isPrice)
    // console.log('옵션명'+isOptionName)
    // console.log('옵션값'+isOptionValue)
    // console.log('옵션재고'+isOptionList)
    // console.log('메인사진'+isImage)
    // console.log('상세사진'+isDetail)
    // console.log('배송비'+isDelivery)

    const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value == "") {
            setNameMessage("상품명을 입력해 주세요.");
            setIsName(false);
        } else if (e.target.value.length > 100) {
            setNameMessage("100글자 미만으로 입력 해주세요.");
            setIsName(false);
        } else {
            setIsName(true);
        }
    };

    const PriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

        const priceRegex = /^d[1-9]$/;
        const passwordCurrent = e.target.value;
        setPrice(passwordCurrent);

        if (e.target.value == "") {
            setPriceMessage("필수 정보입니다.");
            setIsPrice(false);
            return;
        }

        console.log(e.target.value.length);
        if (e.target.value.length === 1) {
            setPriceMessage("최소 10원 이상 입력해주세요.");
            setIsPrice(false);
            return;
        }

        if (e.target.value.length === 10) {
            setPriceMessage("최대 999,999,990원 이하로 입력해주세요.");
            setIsPrice(false);
            return;
        }

        if (priceRegex.test(e.target.value)) {
            setPriceMessage("10원 단위로 입력해주세요.");
            setIsPrice(false);
            return;
        } else {
            setPriceMessage("");
            setIsPrice(true);
        }
    };

    const OptionNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptionName(e.target.value);

        if (e.target.value === "") {
            setIsOptionName(false);
            setOptionNameMessage("옵션명을 입력 해주세요.");
        } else if (e.target.value.length > 5) {
            setIsOptionName(false);
            setOptionNameMessage("옵션명을 5글자 이내로 작성 해주세요.");
        } else {
            setIsOptionName(true);
        }
    };

    // 옵션 인풋
    const OptionValueHandler = (e: any) => {
        const dataSlice = e.target.value.split(",");
        setOptionValue(dataSlice);
        if (dataSlice[dataSlice.length - 1] == "") {
            setIsOptionValue(false);
            setOptionValueMessage("입력되지 않은 옵션값이 있습니다.");
        } else {
            setIsOptionValue(true);
        }

        // OptionValue.map((list:any, index:any) =>
        //     {
        //         if(list === ''){
        //             setIsOptionValue(false)
        //             setOptionValueMessage('옵션값을 입력 해주세요.')
        //         }
        //     })
    };

    // 옵션목록으로 적용 버튼
    const optionSubmit = () => {
        if (!(isOptionName && isOptionValue)) {
            return;
        }

        setOptionResult("");
        OptionValue.map((list: any, index: any) => {
            if (list === "") {
                setIsOptionValue(false);
                setOptionValueMessage("옵션값을 입력 해주세요.");
            } else if (list.length > 25) {
                setOptionValueMessage("하나의 옵션값은 최대 25자로 입력해주세요.");
                return;
            } else {
                setIsOptionValue(true);
            }

            const optiondata = {
                id: OptionID + index,
                optionName: OptionName,
                optionValue: list,
                optionPrice: 0,
                optionStock: 0,
                optionStatus: "품절",
                optionUse: "Y",
                deleteBtn: "",
            };

            setOptionResult((data: any) => [...data, optiondata]);
        });
    };

    // 배송비 핸들러
    const DeliveryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

        const priceRegex = /^d[1-9]$/;
        const passwordCurrent = e.target.value;
        setDelivery(passwordCurrent);

        if (e.target.value == "") {
            setDeliveryMessage("필수 정보입니다.");
            setIsDelivery(false);
            return;
        }

        if (e.target.value.length === 1) {
            setDeliveryMessage("최소 10원 이상 입력해주세요.");
            setIsDelivery(false);
            return;
        }

        if (e.target.value.length === 10) {
            setDeliveryMessage("최대 999,999,990원 이하로 입력해주세요.");
            setIsDelivery(false);
            return;
        }

        if (priceRegex.test(e.target.value)) {
            setDeliveryMessage("10원 단위로 입력해주세요.");
            setIsDelivery(false);
            return;
        } else {
            setDeliveryMessage("");
            setIsDelivery(true);
        }
    };

    const [inputClickNumber, setInputClickNumber] = useState(0);
    const [inputClick, setInputClick] = useState(false);
    const inputRefName = useRef<HTMLDivElement>(null);
    const inputRefPrice = useRef<HTMLDivElement>(null);
    const inputRefOptionName = useRef<HTMLDivElement>(null);
    const inputRefOptionValue = useRef<HTMLDivElement>(null);
    const inputRefImage = useRef<HTMLDivElement>(null);
    const inputRefDetail = useRef<HTMLDivElement>(null);
    const inputRefDelivery = useRef<HTMLDivElement>(null);

    // 모든 인풋 바깥 클릭시 닫기
    useEffect(() => {
        const clickOutside = (e: any) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            // useRef의 current 값은 선택한 DOM을 말함.
            // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

            if (inputClickNumber == 1 && inputRefName.current && !inputRefName.current.contains(e.target)) {
                setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber == 2 && inputRefPrice.current && !inputRefPrice.current.contains(e.target)) {
                setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber == 3 && inputRefOptionName.current && !inputRefOptionName.current.contains(e.target)) {
                setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber == 4 && inputRefOptionValue.current && !inputRefOptionValue.current.contains(e.target)) {
                setInputClick(false);
                setInputClickNumber(0);
            }
            if (inputClickNumber == 5 && inputRefDelivery.current && !inputRefDelivery.current.contains(e.target)) {
                setInputClick(false);
                setInputClickNumber(0);
            }
            // if (inputClickNumber == 6 && inputRefEmail.current && !inputRefEmail.current.contains(e.target)) {
            //     setInputClick(false);
            //     setInputClickNumber(0);
            // }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [inputClick]);

    // 드롭메뉴 접기
    const [CategoryDrop, setCategoryDrop] = useState(true);
    const [ProductDrop, setProductDrop] = useState(true);
    const [PriceDrop, setPriceDrop] = useState(true);
    const [OptionDrop, setOptionDrop] = useState(true);
    const [ImageDrop, setImageDrop] = useState(true);
    const [DetailDrop, setDetailDrop] = useState(true);
    const [DeliveryDrop, setDeliveryDrop] = useState(true);
    // const [ TakebackDrop, setTakebackDrop ] = useState(false);

    // 카테고리 타입 선택 (0/1)
    const [categoryType, setCategoryType] = useState(0);

    // 카테고리 첫번째
    const [first, setFirst] = useState([
        { name: "가구/인테리어", code: 3000000 },
        { name: "도서", code: 2000000 },
        { name: "디지털/가전", code: 1000000 },
        { name: "생활/건강", code: 4000000 },
        { name: "스포츠/레저", code: 5000000 },
        { name: "식품", code: 6000000 },
        { name: "여가/생활편의", code: 7000000 },
        { name: "출산/육아", code: 8000000 },
        { name: "패션의류", code: 9000000 },
        { name: "패션잡화", code: 10000000 },
        { name: "화장품/미용", code: 11000000 },
    ]);

    // 카테고리 두번째
    const [second, setSecond] = useState([
        { name: "PC", code: 1010000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "PC부품", code: 1020000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "PC액세서리", code: 1030000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "게임기/타이틀", code: 1040000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "계절가전", code: 1050000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "광학기기/용품", code: 1060000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "네트워크장비", code: 1070000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "노트북", code: 1080000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "노트북액세서리", code: 1090000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "멀티미디어장비", code: 1100000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "모니터", code: 1110000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "모니터주변기기", code: 1120000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "생활가전", code: 1130000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "소프트웨어", code: 1140000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "영상가전", code: 1150000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "음향가전", code: 1160000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "이미용가전", code: 1170000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "자동차기기", code: 1180000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "저장장치", code: 1190000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "주방가전", code: 1200000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "주변기기", code: 1210000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "카메라/캠코더용품", code: 1220000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "태블릿PC", code: 1230000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "태블릿PC액세서리", code: 1240000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "학습기기", code: 1250000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "휴대폰", code: 1260000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "휴대폰액세서리", code: 1270000, parentname: "디지털/가전", parentcode: 1000000 },
        { name: "가정/요리", code: 2010000, parentname: "도서", parentcode: 2000000 },
        { name: "DIY자재/용품", code: 3010000, parentname: "가구/인테리어", parentcode: 3000000 },
        { name: "DVD", code: 4010000, parentname: "생활/건강", parentcode: 4000000 },
    ]);

    // 카테고리 Second
    const [third, setThird] = useState([
        { name: "브랜드PC", code: 1010100, parentname: "PC", parentcode: 1010000 },
        { name: "서버/워크스테이션", code: 1010200, parentname: "PC", parentcode: 1010000 },
        { name: "조립/베어본PC", code: 1010300, parentname: "PC", parentcode: 1010000 },
        { name: "CPU", code: 1020100, parentname: "PC부품", parentcode: 1020000 },
        { name: "PC케이블", code: 1020200, parentname: "PC부품", parentcode: 1020000 },
        { name: "PC케이스", code: 1020300, parentname: "PC부품", parentcode: 1020000 },
        { name: "RAM", code: 1020400, parentname: "PC부품", parentcode: 1020000 },
        { name: "그래픽카드", code: 1020500, parentname: "PC부품", parentcode: 1020000 },
        { name: "메인보드", code: 1020600, parentname: "PC부품", parentcode: 1020000 },
        { name: "인터페이스카드", code: 1020700, parentname: "PC부품", parentcode: 1020000 },
        { name: "쿨러", code: 1020800, parentname: "PC부품", parentcode: 1020000 },
        { name: "튜닝용품", code: 1020900, parentname: "PC부품", parentcode: 1020000 },
        { name: "파워서플라이", code: 1021000, parentname: "PC부품", parentcode: 1020000 },
        { name: "PC받침대", code: 1030100, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "PC홀더/브라켓", code: 1030200, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "USB액세서리", code: 1030300, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "기타PC액세서리", code: 1030400, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "마우스패드", code: 1030500, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "보안기", code: 1030600, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "손목받침대", code: 1030700, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "케이블타이/정리함", code: 1030800, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "클리너", code: 1030900, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "키보드키스킨/스티커", code: 1031000, parentname: "PC액세서리", parentcode: 1030000 },
        { name: "PC게임", code: 1040100, parentname: "게임기/타이틀", parentcode: 1040000 },
        { name: "가정용게임기", code: 1040200, parentname: "게임기/타이틀", parentcode: 1040000 },
        { name: "게임기주변기기", code: 1040300, parentname: "게임기/타이틀", parentcode: 1040000 },
        { name: "게임타이틀", code: 1040400, parentname: "게임기/타이틀", parentcode: 1040000 },
        { name: "휴대용게임기", code: 1040500, parentname: "게임기/타이틀", parentcode: 1040000 },
        { name: "가습기", code: 1050100, parentname: "계절가전", parentcode: 1050000 },
        { name: "공기정화기", code: 1050200, parentname: "계절가전", parentcode: 1050000 },
        { name: "냉온풍기", code: 1050300, parentname: "계절가전", parentcode: 1050000 },
        { name: "냉풍기", code: 1050400, parentname: "계절가전", parentcode: 1050000 },
        { name: "라디에이터", code: 1050500, parentname: "계절가전", parentcode: 1050000 },
        { name: "보일러", code: 1050600, parentname: "계절가전", parentcode: 1050000 },
        { name: "선풍기", code: 1050700, parentname: "계절가전", parentcode: 1050000 },
        { name: "업소용냉온풍기", code: 1050800, parentname: "계절가전", parentcode: 1050000 },
        { name: "에어커튼", code: 1050900, parentname: "계절가전", parentcode: 1050000 },
        { name: "에어컨", code: 1051000, parentname: "계절가전", parentcode: 1050000 },
        { name: "에어컨주변기기", code: 1051100, parentname: "계절가전", parentcode: 1050000 },
        { name: "온수기", code: 1051200, parentname: "계절가전", parentcode: 1050000 },
        { name: "온수매트", code: 1051300, parentname: "계절가전", parentcode: 1050000 },
        { name: "온풍기", code: 1051400, parentname: "계절가전", parentcode: 1050000 },
        { name: "전기매트/장판", code: 1051500, parentname: "계절가전", parentcode: 1050000 },
        { name: "전기요/담요/방석", code: 1051600, parentname: "계절가전", parentcode: 1050000 },
        { name: "제습기", code: 1051700, parentname: "계절가전", parentcode: 1050000 },
        { name: "컨벡터", code: 1051800, parentname: "계절가전", parentcode: 1050000 },
        { name: "히터", code: 1051900, parentname: "계절가전", parentcode: 1050000 },
        { name: "광학용품액세서리", code: 1060100, parentname: "광학기기/용품", parentcode: 1060000 },
        { name: "망원경", code: 1060200, parentname: "광학기기/용품", parentcode: 1060000 },
        { name: "쌍안경", code: 1060300, parentname: "광학기기/용품", parentcode: 1060000 },
        { name: "천체망원경", code: 1060400, parentname: "광학기기/용품", parentcode: 1060000 },
        { name: "현미경", code: 1060500, parentname: "광학기기/용품", parentcode: 1060000 },
        { name: "AP", code: 1070100, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "KVM스위치", code: 1070200, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "KVM케이블", code: 1070300, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "공유기", code: 1070400, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "기타네트워크장비", code: 1070500, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "네트워크모듈", code: 1070600, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "네트워크테스트기", code: 1070700, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "라우터", code: 1070800, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "랜카드", code: 1070900, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "리피터장비", code: 1071000, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "모뎀", code: 1071100, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "무선모뎀", code: 1071200, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "블루투스동글", code: 1071300, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "선택기", code: 1071400, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "스위칭허브", code: 1071500, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "안테나", code: 1071600, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "컨버터장비", code: 1071700, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "프린터공유기", code: 1071800, parentname: "네트워크장비", parentcode: 1070000 },
        { name: "기타노트북액세서리", code: 1090100, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북가방/케이스", code: 1090200, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북도난방지", code: 1090300, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북받침대/쿨러", code: 1090400, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북보안기", code: 1090500, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북보호필름", code: 1090600, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북용배터리", code: 1090700, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "노트북키스킨", code: 1090800, parentname: "노트북액세서리", parentcode: 1090000 },
        { name: "DVR", code: 1100100, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "Divs플레이어", code: 1100200, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "PC마이크", code: 1100300, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "PC스피커", code: 1100400, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "PC헤드셋", code: 1100500, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "사운드카드", code: 1100600, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "영상수신장비", code: 1100700, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "영상편집카드", code: 1100800, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "웹캠", code: 1100900, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "휴대용스피커", code: 1101000, parentname: "멀티미디어장비", parentcode: 1100000 },
        { name: "기타모니터주변기기", code: 1120100, parentname: "모니터주변기기", parentcode: 1120000 },
        { name: "모니터받침대", code: 1120200, parentname: "모니터주변기기", parentcode: 1120000 },
        { name: "모니터브라켓", code: 1120300, parentname: "모니터주변기기", parentcode: 1120000 },
        { name: "모니터암", code: 1120400, parentname: "모니터주변기기", parentcode: 1120000 },
        { name: "모니터어댑터", code: 1120500, parentname: "모니터주변기기", parentcode: 1120000 },
        { name: "건조기/탈수기", code: 1130100, parentname: "생활가전", parentcode: 1130000 },
        { name: "구강청정기", code: 1130200, parentname: "생활가전", parentcode: 1130000 },
        { name: "다리미", code: 1130300, parentname: "생활가전", parentcode: 1130000 },
        { name: "디지털도어록", code: 1130400, parentname: "생활가전", parentcode: 1130000 },
        { name: "무전기", code: 1130500, parentname: "생활가전", parentcode: 1130000 },
        { name: "보풀제거기", code: 1130600, parentname: "생활가전", parentcode: 1130000 },
        { name: "세탁기", code: 1130700, parentname: "생활가전", parentcode: 1130000 },
        { name: "손소독기", code: 1130800, parentname: "생활가전", parentcode: 1130000 },
        { name: "스탠드", code: 1130900, parentname: "생활가전", parentcode: 1130000 },
        { name: "업소용자외선소독기", code: 1131000, parentname: "생활가전", parentcode: 1130000 },
        { name: "연수기", code: 1131100, parentname: "생활가전", parentcode: 1130000 },
        { name: "의류관리기", code: 1131200, parentname: "생활가전", parentcode: 1130000 },
        { name: "이온수기", code: 1131300, parentname: "생활가전", parentcode: 1130000 },
        { name: "자외선소독기", code: 1131400, parentname: "생활가전", parentcode: 1130000 },
        { name: "재봉틀", code: 1131500, parentname: "생활가전", parentcode: 1130000 },
        { name: "전신건조기", code: 1131600, parentname: "생활가전", parentcode: 1130000 },
        { name: "전화기", code: 1131700, parentname: "생활가전", parentcode: 1130000 },
        { name: "청소기", code: 1131800, parentname: "생활가전", parentcode: 1130000 },
        { name: "해충퇴치기", code: 1131900, parentname: "생활가전", parentcode: 1130000 },
        { name: "핸드드라이어", code: 1132000, parentname: "생활가전", parentcode: 1130000 },
        { name: "개발툴", code: 1140100, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "그래픽/멀티미디어", code: 1140200, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "번역", code: 1140300, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "보안/백신", code: 1140400, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "사무/회계", code: 1140500, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "운영체제", code: 1140600, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "유틸리티", code: 1140700, parentname: "소프트웨어", parentcode: 1140000 },
        { name: "TV", code: 1150100, parentname: "영상가전", parentcode: 1150000 },
        { name: "디지털액자", code: 1150200, parentname: "영상가전", parentcode: 1150000 },
        { name: "사이니지", code: 1150300, parentname: "영상가전", parentcode: 1150000 },
        { name: "영상가전액세서리", code: 1150400, parentname: "영상가전", parentcode: 1150000 },
        { name: "영상플레이어", code: 1150500, parentname: "영상가전", parentcode: 1150000 },
        { name: "프로젝터", code: 1150600, parentname: "영상가전", parentcode: 1150000 },
        { name: "프로젝터주변기기", code: 1150700, parentname: "영상가전", parentcode: 1150000 },
        { name: "CD플레이어", code: 1160100, parentname: "음향가전", parentcode: 1160000 },
        { name: "DAC", code: 1160200, parentname: "음향가전", parentcode: 1160000 },
        { name: "MD플레이어", code: 1160300, parentname: "음향가전", parentcode: 1160000 },
        { name: "MP3", code: 1160400, parentname: "음향가전", parentcode: 1160000 },
        { name: "MP3/PMP액세서리", code: 1160500, parentname: "음향가전", parentcode: 1160000 },
        { name: "PMP", code: 1160600, parentname: "음향가전", parentcode: 1160000 },
        { name: "노래반주기", code: 1160700, parentname: "음향가전", parentcode: 1160000 },
        { name: "데크", code: 1160800, parentname: "음향가전", parentcode: 1160000 },
        { name: "라디오", code: 1160900, parentname: "음향가전", parentcode: 1160000 },
        { name: "리시버/앰프", code: 1161000, parentname: "음향가전", parentcode: 1160000 },
        { name: "마이크", code: 1161100, parentname: "음향가전", parentcode: 1160000 },
        { name: "방송음향기기", code: 1161200, parentname: "음향가전", parentcode: 1160000 },
        { name: "블루투스셋", code: 1161300, parentname: "음향가전", parentcode: 1160000 },
        { name: "스피커", code: 1161400, parentname: "음향가전", parentcode: 1160000 },
        { name: "오디오", code: 1161500, parentname: "음향가전", parentcode: 1160000 },
        { name: "오디오믹서", code: 1161600, parentname: "음향가전", parentcode: 1160000 },
        { name: "이어폰", code: 1161700, parentname: "음향가전", parentcode: 1160000 },
        { name: "이아폰/헤드폰액세서리", code: 1161800, parentname: "음향가전", parentcode: 1160000 },
        { name: "카세트플레이어", code: 1161900, parentname: "음향가전", parentcode: 1160000 },
        { name: "턴테이블", code: 1162000, parentname: "음향가전", parentcode: 1160000 },
        { name: "튜너", code: 1162100, parentname: "음향가전", parentcode: 1160000 },
        { name: "헤드폰", code: 1162200, parentname: "음향가전", parentcode: 1160000 },
        { name: "홈시어터", code: 1162300, parentname: "음향가전", parentcode: 1160000 },
        { name: "고데기", code: 1170100, parentname: "이미용가전", parentcode: 1170000 },
        { name: "기타이미용가전", code: 1170200, parentname: "이미용가전", parentcode: 1170000 },
        { name: "눈썹정리기", code: 1170300, parentname: "이미용가전", parentcode: 1170000 },
        { name: "두피케어기기", code: 1170400, parentname: "이미용가전", parentcode: 1170000 },
        { name: "드라이어", code: 1170500, parentname: "이미용가전", parentcode: 1170000 },
        { name: "매직기", code: 1170600, parentname: "이미용가전", parentcode: 1170000 },
        { name: "면도기", code: 1170700, parentname: "이미용가전", parentcode: 1170000 },
        { name: "면도기소모품", code: 1170800, parentname: "이미용가전", parentcode: 1170000 },
        { name: "손발톱정리기", code: 1170900, parentname: "이미용가전", parentcode: 1170000 },
        { name: "에어브러시", code: 1171000, parentname: "이미용가전", parentcode: 1170000 },
        { name: "이미용가전액세서리", code: 1171100, parentname: "이미용가전", parentcode: 1170000 },
        { name: "이발기", code: 1171200, parentname: "이미용가전", parentcode: 1170000 },
        { name: "제모기", code: 1171300, parentname: "이미용가전", parentcode: 1170000 },
        { name: "코털제거기", code: 1171400, parentname: "이미용가전", parentcode: 1170000 },
        { name: "피부케어기기", code: 1171500, parentname: "이미용가전", parentcode: 1170000 },
        { name: "헤어롤/롤셋", code: 1171600, parentname: "이미용가전", parentcode: 1170000 },
        { name: "내비게이션/액세서리", code: 1180100, parentname: "자동차기기", parentcode: 1180000 },
        { name: "방음/방진용품", code: 1180200, parentname: "자동차기기", parentcode: 1180000 },
        { name: "블랙박스/액세서리", code: 1180300, parentname: "자동차기기", parentcode: 1180000 },
        { name: "자동차AV용품", code: 1180400, parentname: "자동차기기", parentcode: 1180000 },
        { name: "자동차TV/모니터", code: 1180500, parentname: "자동차기기", parentcode: 1180000 },
        { name: "전방/후방카메라", code: 1180600, parentname: "자동차기기", parentcode: 1180000 },
        { name: "카오디오음향기기", code: 1180700, parentname: "자동차기기", parentcode: 1180000 },
        { name: "카팩", code: 1180800, parentname: "자동차기기", parentcode: 1180000 },
        { name: "하이패스/GPS", code: 1180900, parentname: "자동차기기", parentcode: 1180000 },
        { name: "핸즈프리", code: 1181000, parentname: "자동차기기", parentcode: 1180000 },
        { name: "헤드유닛", code: 1181100, parentname: "자동차기기", parentcode: 1180000 },
        { name: "HDD", code: 1190100, parentname: "저장장치", parentcode: 1190000 },
        { name: "NAS", code: 1190200, parentname: "저장장치", parentcode: 1190000 },
        { name: "ODD", code: 1190300, parentname: "저장장치", parentcode: 1190000 },
        { name: "SSD", code: 1190400, parentname: "저장장치", parentcode: 1190000 },
        { name: "USB메모리", code: 1190500, parentname: "저장장치", parentcode: 1190000 },
        { name: "공미디어", code: 1190600, parentname: "저장장치", parentcode: 1190000 },
        { name: "기타저장장치", code: 1190700, parentname: "저장장치", parentcode: 1190000 },
        { name: "외장HDD", code: 1190800, parentname: "저장장치", parentcode: 1190000 },
        { name: "외장SSD", code: 1190900, parentname: "저장장치", parentcode: 1190000 },
        { name: "저장장치액세서리", code: 1191000, parentname: "저장장치", parentcode: 1190000 },
        { name: "가스레인지", code: 1200100, parentname: "주방가전", parentcode: 1200000 },
        { name: "가스레인지후드", code: 1200200, parentname: "주방가전", parentcode: 1200000 },
        { name: "거품/반죽기", code: 1200300, parentname: "주방가전", parentcode: 1200000 },
        { name: "기타주방가전", code: 1200400, parentname: "주방가전", parentcode: 1200000 },
        { name: "기타주방가전부속품", code: 1200500, parentname: "주방가전", parentcode: 1200000 },
        { name: "김치냉장고", code: 1200600, parentname: "주방가전", parentcode: 1200000 },
        { name: "냉동고", code: 1200700, parentname: "주방가전", parentcode: 1200000 },
        { name: "냉장고", code: 1200800, parentname: "주방가전", parentcode: 1200000 },
        { name: "두부두유제조기", code: 1200900, parentname: "주방가전", parentcode: 1200000 },
        { name: "믹서기", code: 1201000, parentname: "주방가전", parentcode: 1200000 },
        { name: "분쇄기", code: 1201100, parentname: "주방가전", parentcode: 1200000 },
        { name: "빙수기", code: 1201200, parentname: "주방가전", parentcode: 1200000 },
        { name: "샌드위치제조기", code: 1201300, parentname: "주방가전", parentcode: 1200000 },
        { name: "생선그릴", code: 1201400, parentname: "주방가전", parentcode: 1200000 },
        { name: "식기세척/건조기", code: 1201500, parentname: "주방가전", parentcode: 1200000 },
        { name: "식품건조기", code: 1201600, parentname: "주방가전", parentcode: 1200000 },
        { name: "아이스크림제조기", code: 1201700, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용거품/반죽기", code: 1201800, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용믹서기", code: 1201900, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용빙수기", code: 1202000, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용음식물처리기", code: 1202100, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용진공포장기", code: 1202200, parentname: "주방가전", parentcode: 1200000 },
        { name: "업소용튀김기", code: 1202300, parentname: "주방가전", parentcode: 1200000 },
        { name: "에어프라이어", code: 1202400, parentname: "주방가전", parentcode: 1200000 },
        { name: "오븐", code: 1202500, parentname: "주방가전", parentcode: 1200000 },
        { name: "와플제조기", code: 1202600, parentname: "주방가전", parentcode: 1200000 },
        { name: "요구르트제조기", code: 1202700, parentname: "주방가전", parentcode: 1200000 },
        { name: "음식물처리기", code: 1202800, parentname: "주방가전", parentcode: 1200000 },
        { name: "인덕션", code: 1202900, parentname: "주방가전", parentcode: 1200000 },
        { name: "전기그릴", code: 1203000, parentname: "주방가전", parentcode: 1200000 },
        { name: "전기밥솥", code: 1203100, parentname: "주방가전", parentcode: 1200000 },
        { name: "전기쿠커", code: 1203200, parentname: "주방가전", parentcode: 1200000 },
        { name: "전기팬", code: 1203300, parentname: "주방가전", parentcode: 1200000 },
        { name: "전기포트", code: 1203400, parentname: "주방가전", parentcode: 1200000 },
        { name: "전용냉장고", code: 1203500, parentname: "주방가전", parentcode: 1200000 },
        { name: "전자레인지", code: 1203600, parentname: "주방가전", parentcode: 1200000 },
        { name: "정수기", code: 1203700, parentname: "주방가전", parentcode: 1200000 },
        { name: "제빵기", code: 1203800, parentname: "주방가전", parentcode: 1200000 },
        { name: "죽제조기", code: 1203900, parentname: "주방가전", parentcode: 1200000 },
        { name: "쥬서기/녹즙기", code: 1204000, parentname: "주방가전", parentcode: 1200000 },
        { name: "진공포장기", code: 1204100, parentname: "주방가전", parentcode: 1200000 },
        { name: "커피머신", code: 1204200, parentname: "주방가전", parentcode: 1200000 },
        { name: "커피메이커", code: 1204300, parentname: "주방가전", parentcode: 1200000 },
        { name: "커피자판기", code: 1204400, parentname: "주방가전", parentcode: 1200000 },
        { name: "탄산수제조기", code: 1204500, parentname: "주방가전", parentcode: 1200000 },
        { name: "토스터기", code: 1204600, parentname: "주방가전", parentcode: 1200000 },
        { name: "튀김기", code: 1204700, parentname: "주방가전", parentcode: 1200000 },
        { name: "하이라이트", code: 1204800, parentname: "주방가전", parentcode: 1200000 },
        { name: "하이브리드", code: 1204900, parentname: "주방가전", parentcode: 1200000 },
        { name: "핫플레이트", code: 1205000, parentname: "주방가전", parentcode: 1200000 },
        { name: "핸드블렌더", code: 1205100, parentname: "주방가전", parentcode: 1200000 },
        { name: "홍삼제조기", code: 1205200, parentname: "주방가전", parentcode: 1200000 },
        { name: "마우스", code: 1210100, parentname: "주변기기", parentcode: 1210000 },
        { name: "복합기", code: 1210200, parentname: "주변기기", parentcode: 1210000 },
        { name: "복합기/프린터소모품", code: 1210300, parentname: "주변기기", parentcode: 1210000 },
        { name: "스캐너", code: 1210400, parentname: "주변기기", parentcode: 1210000 },
        { name: "키보드", code: 1210500, parentname: "주변기기", parentcode: 1210000 },
        { name: "키보드/마우스세트", code: 1210600, parentname: "주변기기", parentcode: 1210000 },
        { name: "태블릿/액세서리", code: 1210700, parentname: "주변기기", parentcode: 1210000 },
        { name: "프린터", code: 1210800, parentname: "주변기기", parentcode: 1210000 },
        { name: "DSLR카메라", code: 1220100, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "LCD용품/보호필름", code: 1220200, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "렌즈용품", code: 1220300, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "메모리카드", code: 1220400, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "미러리스디카", code: 1220500, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "삼각대/헤드", code: 1220600, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "액션캠", code: 1220700, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "일반디카", code: 1220800, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "즉석카메라", code: 1220900, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "충전기/배터리", code: 1221000, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "카드리더기", code: 1221100, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "카메라/캠코더 관련용품", code: 1221200, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "카메라가방/케이스", code: 1221300, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "카메라렌즈", code: 1221400, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "카메라스트랩/그립", code: 1221500, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "캠코더", code: 1221600, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "플래시/조명용품", code: 1221700, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "필름/관련용품", code: 1221800, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "필름카메라", code: 1221900, parentname: "카메라/캠코더용품", parentcode: 1220000 },
        { name: "스탠드/Dock", code: 1240100, parentname: "카메라/캠코더용품", parentcode: 1240000 },
        { name: "케이스/파우치", code: 1240200, parentname: "카메라/캠코더용품", parentcode: 1240000 },
        { name: "태블릿PC보호필름", code: 1240300, parentname: "카메라/캠코더용품", parentcode: 1240000 },
        { name: "터치펜/기타", code: 1240400, parentname: "카메라/캠코더용품", parentcode: 1240000 },
        { name: "보이스레코더", code: 1250100, parentname: "학습기기", parentcode: 1250000 },
        { name: "어학학습기", code: 1250200, parentname: "학습기기", parentcode: 1250000 },
        { name: "전자사전", code: 1250300, parentname: "학습기기", parentcode: 1250000 },
        { name: "전자책", code: 1250400, parentname: "학습기기", parentcode: 1250000 },
        { name: "학습기기액세서리", code: 1250500, parentname: "학습기기", parentcode: 1250000 },
        { name: "학습보조기", code: 1250600, parentname: "학습기기", parentcode: 1250000 },
        { name: "공기계/중고폰", code: 1260100, parentname: "휴대폰", parentcode: 1260000 },
        { name: "자급제폰", code: 1260100, parentname: "휴대폰", parentcode: 1260000 },
        { name: "해외출시폰", code: 1260100, parentname: "휴대폰", parentcode: 1260000 },
        { name: "기타휴대폰액세서리", code: 1270100, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "셀카봉", code: 1270200, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "웨어러블 디바이스", code: 1270300, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "웨어러블 디바이스 액세서리", code: 1270400, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "짐벌", code: 1270500, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "핸드셋", code: 1270600, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰DMB수신기", code: 1270700, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰거치대", code: 1270800, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰렌즈", code: 1270900, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰배터리", code: 1271000, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰보호필름", code: 1271100, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰이어캡", code: 1271200, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰젠더", code: 1271300, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰줄", code: 1271400, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰충전기", code: 1271500, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰케이블", code: 1271600, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰케이스", code: 1271700, parentname: "휴대폰액세서리", parentcode: 1270000 },
        { name: "휴대폰쿨링패드", code: 1271800, parentname: "휴대폰액세서리", parentcode: 1270000 },
    ]);

    // 카테고리 세번째
    const [fourth, setFourth] = useState([
        { name: "1394케이블", code: 1020201, parentname: "PC케이블", parentcode: 1020200 },
        { name: "D-SUB케이블", code: 1020202, parentname: "PC케이블", parentcode: 1020200 },
        { name: "DVI케이블", code: 1020203, parentname: "PC케이블", parentcode: 1020200 },
        { name: "HDMI케이블", code: 1020204, parentname: "PC케이블", parentcode: 1020200 },
        { name: "SATA케이블", code: 1020205, parentname: "PC케이블", parentcode: 1020200 },
        { name: "USB케이블", code: 1020206, parentname: "PC케이블", parentcode: 1020200 },
        { name: "광케이블", code: 1020207, parentname: "PC케이블", parentcode: 1020200 },
        { name: "기타케이블", code: 1020208, parentname: "PC케이블", parentcode: 1020200 },
        { name: "랜케이블", code: 1020209, parentname: "PC케이블", parentcode: 1020200 },
        { name: "비디오케이블", code: 1020210, parentname: "PC케이블", parentcode: 1020200 },
        { name: "오디오케이블", code: 1020211, parentname: "PC케이블", parentcode: 1020200 },
        { name: "전원케이블", code: 1020212, parentname: "PC케이블", parentcode: 1020200 },
        { name: "젠더", code: 1020213, parentname: "PC케이블", parentcode: 1020200 },
        { name: "노트북용", code: 1020401, parentname: "RAM", parentcode: 1020400 },
        { name: "데스크탑용", code: 1020402, parentname: "RAM", parentcode: 1020400 },
        { name: "AMD계열", code: 1020501, parentname: "그래픽카드", parentcode: 1020500 },
        { name: "NVIDIA계열", code: 1020502, parentname: "그래픽카드", parentcode: 1020500 },
        { name: "그래픽카드주변기기", code: 1020503, parentname: "그래픽카드", parentcode: 1020500 },
        { name: "기타계열", code: 1020504, parentname: "그래픽카드", parentcode: 1020500 },
        { name: "AMDCPU용", code: 1020601, parentname: "메인보드", parentcode: 1020600 },
        { name: "기타메인보드", code: 1020602, parentname: "메인보드", parentcode: 1020600 },
        { name: "인텔CPU용", code: 1020603, parentname: "메인보드", parentcode: 1020600 },
        { name: "1394카드", code: 1020701, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "RAID카드", code: 1020702, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "SATA카드", code: 1020703, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "SCSI카드", code: 1020704, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "USB카드", code: 1020705, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "기타인터페이스카드", code: 1020706, parentname: "인터페이스카드", parentcode: 1020700 },
        { name: "CPU쿨러", code: 1020801, parentname: "쿨러", parentcode: 1020800 },
        { name: "HDD쿨러", code: 1020802, parentname: "쿨러", parentcode: 1020800 },
        { name: "그래픽카드쿨러", code: 1020803, parentname: "쿨러", parentcode: 1020800 },
        { name: "기타쿨러", code: 1020804, parentname: "쿨러", parentcode: 1020800 },
        { name: "노트북쿨러", code: 1020805, parentname: "쿨러", parentcode: 1020800 },
        { name: "방열판", code: 1020806, parentname: "쿨러", parentcode: 1020800 },
        { name: "수냉쿨러", code: 1020807, parentname: "쿨러", parentcode: 1020800 },
        { name: "케이스쿨러", code: 1020808, parentname: "쿨러", parentcode: 1020800 },
        { name: "기타튜닝용품", code: 1020901, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "방음방진", code: 1020902, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "브라켓", code: 1020903, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "조명기기", code: 1020904, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "팬/온도컨트롤러", code: 1020905, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "팬그릴", code: 1020906, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "팬필터", code: 1020907, parentname: "튜닝용품", parentcode: 1020900 },
        { name: "ATX파워", code: 1021001, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "TFX파워", code: 1021002, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "UPS", code: 1021003, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "mATX파워", code: 1021004, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "기타PC용파워", code: 1021005, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "서버용파워", code: 1021006, parentname: "파워서플라이", parentcode: 1021000 },
        { name: "USB라이트", code: 1030301, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "USB보온제품", code: 1030302, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "USB잠금장치", code: 1030303, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "USB청소기", code: 1030304, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "USB토이", code: 1030305, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "USB허브", code: 1030306, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "기타USB액세서리", code: 1030307, parentname: "USB액세서리", parentcode: 1030300 },
        { name: "가방/케이스", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "기타주변기기", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "보호필름/스킨", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "음향기기", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "조이스틱/컨트롤러", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "충전기기", code: 1040301, parentname: "게임기주변기기", parentcode: 1040300 },
        { name: "USB가습기", code: 1050101, parentname: "가습기", parentcode: 1050100 },
        { name: "가습기필터", code: 1050102, parentname: "가습기", parentcode: 1050100 },
        { name: "가열식가습기", code: 1050103, parentname: "가습기", parentcode: 1050100 },
        { name: "복합식가습기", code: 1050104, parentname: "가습기", parentcode: 1050100 },
        { name: "자연식가습기", code: 1050105, parentname: "가습기", parentcode: 1050100 },
        { name: "초음파식가습기", code: 1050106, parentname: "가습기", parentcode: 1050100 },
        { name: "공기정화기필터", code: 1050201, parentname: "공기정화기", parentcode: 1050200 },
        { name: "공기청정기", code: 1050202, parentname: "공기정화기", parentcode: 1050200 },
        { name: "기타부속품", code: 1050203, parentname: "공기정화기", parentcode: 1050200 },
        { name: "산림욕기", code: 1050204, parentname: "공기정화기", parentcode: 1050200 },
        { name: "에어워셔", code: 1050205, parentname: "공기정화기", parentcode: 1050200 },
        { name: "환풍기", code: 1050206, parentname: "공기정화기", parentcode: 1050200 },
        { name: "업소용냉풍기", code: 1050401, parentname: "냉풍기", parentcode: 1050400 },
        { name: "일반용냉풍기", code: 1050401, parentname: "냉풍기", parentcode: 1050400 },
        { name: "가스보일러", code: 1050601, parentname: "보일러", parentcode: 1050600 },
        { name: "보일러부품", code: 1050602, parentname: "보일러", parentcode: 1050600 },
        { name: "석유보일러", code: 1050603, parentname: "보일러", parentcode: 1050600 },
        { name: "연탄/화목보일러", code: 1050604, parentname: "보일러", parentcode: 1050600 },
        { name: "전기보일러", code: 1050605, parentname: "보일러", parentcode: 1050600 },
        { name: "벽걸이형선풍기", code: 1050701, parentname: "선풍기", parentcode: 1050700 },
        { name: "서큘레이터", code: 1050702, parentname: "선풍기", parentcode: 1050700 },
        { name: "선풍기부속품", code: 1050703, parentname: "선풍기", parentcode: 1050700 },
        { name: "스탠드형선풍기", code: 1050704, parentname: "선풍기", parentcode: 1050700 },
        { name: "업소용선풍기", code: 1050705, parentname: "선풍기", parentcode: 1050700 },
        { name: "천장형선풍기", code: 1050706, parentname: "선풍기", parentcode: 1050700 },
        { name: "타워형선풍기", code: 1050707, parentname: "선풍기", parentcode: 1050700 },
        { name: "탁상형선풍기", code: 1050708, parentname: "선풍기", parentcode: 1050700 },
        { name: "휴대용선풍기", code: 1050709, parentname: "선풍기", parentcode: 1050700 },
        { name: "멀티형에어컨", code: 1051001, parentname: "에어컨", parentcode: 1051000 },
        { name: "벽걸이형에어컨", code: 1051002, parentname: "에어컨", parentcode: 1051000 },
        { name: "스탠드형에어컨", code: 1051003, parentname: "에어컨", parentcode: 1051000 },
        { name: "시스템에어컨", code: 1051004, parentname: "에어컨", parentcode: 1051000 },
        { name: "업소용에어컨", code: 1051005, parentname: "에어컨", parentcode: 1051000 },
        { name: "이동식에어컨", code: 1051006, parentname: "에어컨", parentcode: 1051000 },
        { name: "창문형에어컨", code: 1051007, parentname: "에어컨", parentcode: 1051000 },
        { name: "천장형에어컨", code: 1051008, parentname: "에어컨", parentcode: 1051000 },
        { name: "기타액세서리", code: 1051101, parentname: "에어컨주변기기", parentcode: 1051100 },
        { name: "에어컨 리모콘", code: 1051102, parentname: "에어컨주변기기", parentcode: 1051100 },
        { name: "에어컨 실외기", code: 1051103, parentname: "에어컨주변기기", parentcode: 1051100 },
        { name: "가스온수기", code: 1051201, parentname: "온수기", parentcode: 1051200 },
        { name: "전기온수기", code: 1051202, parentname: "온수기", parentcode: 1051200 },
        { name: "가스온풍기", code: 1051401, parentname: "온풍기", parentcode: 1051400 },
        { name: "온풍기", code: 1051402, parentname: "온풍기", parentcode: 1051400 },
        { name: "석유온풍기", code: 1051403, parentname: "온풍기", parentcode: 1051400 },
        { name: "전기온풍기", code: 1051404, parentname: "온풍기", parentcode: 1051400 },
        { name: "기타전기매트", code: 1051501, parentname: "전기매트/장판", parentcode: 1051500 },
        { name: "옥매트", code: 1051501, parentname: "전기매트/장판", parentcode: 1051500 },
        { name: "전기장판", code: 1051501, parentname: "전기매트/장판", parentcode: 1051500 },
        { name: "카페트매트", code: 1051501, parentname: "전기매트/장판", parentcode: 1051500 },
        { name: "황토매트", code: 1051501, parentname: "전기매트/장판", parentcode: 1051500 },
        { name: "전기담요", code: 1051601, parentname: "전기요/담요/방석", parentcode: 1051600 },
        { name: "전기방석", code: 1051602, parentname: "전기요/담요/방석", parentcode: 1051600 },
        { name: "전기요", code: 1051603, parentname: "전기요/담요/방석", parentcode: 1051600 },
        { name: "업소용제습기", code: 1051701, parentname: "제습기", parentcode: 1051700 },
        { name: "일반용제습기", code: 1051702, parentname: "제습기", parentcode: 1051700 },
        { name: "가스히터", code: 1051901, parentname: "히터", parentcode: 1051900 },
        { name: "석유히터", code: 1051902, parentname: "히터", parentcode: 1051900 },
        { name: "연탄/화목난로", code: 1051903, parentname: "히터", parentcode: 1051900 },
        { name: "전기히터", code: 1051904, parentname: "히터", parentcode: 1051900 },
        { name: "무선AP", code: 1070401, parentname: "공유기", parentcode: 1070400 },
        { name: "유무선공유기", code: 1070402, parentname: "공유기", parentcode: 1070400 },
        { name: "유선공유기", code: 1070403, parentname: "공유기", parentcode: 1070400 },
        { name: "무선랜카드", code: 1070901, parentname: "랜카드", parentcode: 1070900 },
        { name: "유선랜카드", code: 1070902, parentname: "랜카드", parentcode: 1070900 },
        { name: "액정보호필름", code: 1090601, parentname: "노트북보호필름", parentcode: 1090600 },
        { name: "전신보호필름", code: 1090601, parentname: "노트북보호필름", parentcode: 1090600 },
        { name: "DVR본체", code: 1100101, parentname: "DVR", parentcode: 1100100 },
        { name: "DVR카드", code: 1100102, parentname: "DVR", parentcode: 1100100 },
        { name: "DVR패키지", code: 1100103, parentname: "DVR", parentcode: 1100100 },
        { name: "2.1채널", code: 1100401, parentname: "PC스피커", parentcode: 1100400 },
        { name: "2채널", code: 1100402, parentname: "PC스피커", parentcode: 1100400 },
        { name: "5.1채널", code: 1100403, parentname: "PC스피커", parentcode: 1100400 },
        { name: "기타사운드카드용품", code: 1100601, parentname: "사운드카드", parentcode: 1100600 },
        { name: "내장형", code: 1100602, parentname: "사운드카드", parentcode: 1100600 },
        { name: "레코딩장비", code: 1100603, parentname: "사운드카드", parentcode: 1100600 },
        { name: "외장형", code: 1100604, parentname: "사운드카드", parentcode: 1100600 },
        { name: "DMB수신기", code: 1100701, parentname: "영상수신장비", parentcode: 1100700 },
        { name: "PC리모컨", code: 1100701, parentname: "영상수신장비", parentcode: 1100700 },
        { name: "TV카드", code: 1100701, parentname: "영상수신장비", parentcode: 1100700 },
        { name: "안테나", code: 1100701, parentname: "영상수신장비", parentcode: 1100700 },
        { name: "디코더", code: 1100801, parentname: "영상편집카드", parentcode: 1100800 },
        { name: "방송보드", code: 1100802, parentname: "영상편집카드", parentcode: 1100800 },
        { name: "엔코더", code: 1100803, parentname: "영상편집카드", parentcode: 1100800 },
        { name: "영상편집", code: 1100804, parentname: "영상편집카드", parentcode: 1100800 },
        { name: "신발건조기", code: 1130101, parentname: "건조기/탈수기", parentcode: 1130100 },
        { name: "의류건조기", code: 1130101, parentname: "건조기/탈수기", parentcode: 1130100 },
        { name: "탈수기", code: 1130101, parentname: "건조기/탈수기", parentcode: 1130100 },
        { name: "구강세정기", code: 1130201, parentname: "구강청정기", parentcode: 1130200 },
        { name: "전동칫솔", code: 1130202, parentname: "구강청정기", parentcode: 1130200 },
        { name: "전동칫솔모", code: 1130203, parentname: "구강청정기", parentcode: 1130200 },
        { name: "칫솔살균기", code: 1130204, parentname: "구강청정기", parentcode: 1130200 },
        { name: "건식다리미", code: 1130301, parentname: "다리미", parentcode: 1130300 },
        { name: "스팀다리미", code: 1130301, parentname: "다리미", parentcode: 1130300 },
        { name: "보조키형", code: 1130401, parentname: "디지털도어록", parentcode: 1130400 },
        { name: "주키형", code: 1130401, parentname: "디지털도어록", parentcode: 1130400 },
        { name: "무전기액세서리", code: 1130501, parentname: "무전기", parentcode: 1130500 },
        { name: "생활용무전기", code: 1130501, parentname: "무전기", parentcode: 1130500 },
        { name: "업무용무전기", code: 1130501, parentname: "무전기", parentcode: 1130500 },
        { name: "드럼세탁기", code: 1130701, parentname: "세탁기", parentcode: 1130700 },
        { name: "미니세탁기", code: 1130702, parentname: "세탁기", parentcode: 1130700 },
        { name: "세탁기부품", code: 1130703, parentname: "세탁기", parentcode: 1130700 },
        { name: "일반세탁기", code: 1130704, parentname: "세탁기", parentcode: 1130700 },
        { name: "LED스탠드", code: 1130901, parentname: "스탠드", parentcode: 1130900 },
        { name: "삼파장스탠드", code: 1130902, parentname: "스탠드", parentcode: 1130900 },
        { name: "오파장스탠드", code: 1130903, parentname: "스탠드", parentcode: 1130900 },
        { name: "일반스탠드", code: 1130904, parentname: "스탠드", parentcode: 1130900 },
        { name: "칠파장스탠드", code: 1130905, parentname: "스탠드", parentcode: 1130900 },
        { name: "무선전화기", code: 1131701, parentname: "전화기", parentcode: 1131700 },
        { name: "사무용전화기", code: 1131702, parentname: "전화기", parentcode: 1131700 },
        { name: "유무선전화기", code: 1131703, parentname: "전화기", parentcode: 1131700 },
        { name: "유선전화기", code: 1131704, parentname: "전화기", parentcode: 1131700 },
        { name: "전화기주변기기", code: 1131705, parentname: "전화기", parentcode: 1131700 },
        { name: "고압세척기", code: 1131801, parentname: "청소기", parentcode: 1131800 },
        { name: "로봇청소기", code: 1131802, parentname: "청소기", parentcode: 1131800 },
        { name: "무선청소기", code: 1131803, parentname: "청소기", parentcode: 1131800 },
        { name: "물걸레청소기", code: 1131804, parentname: "청소기", parentcode: 1131800 },
        { name: "스팀청소기", code: 1131805, parentname: "청소기", parentcode: 1131800 },
        { name: "업소용청소기", code: 1131806, parentname: "청소기", parentcode: 1131800 },
        { name: "유선청소기", code: 1131807, parentname: "청소기", parentcode: 1131800 },
        { name: "청소기액세서리", code: 1131808, parentname: "청소기", parentcode: 1131800 },
        { name: "침구청소기", code: 1131809, parentname: "청소기", parentcode: 1131800 },
        { name: "LCDTV", code: 1150101, parentname: "TV", parentcode: 1150100 },
        { name: "LEDTV", code: 1150102, parentname: "TV", parentcode: 1150100 },
        { name: "OLEDTV", code: 1150103, parentname: "TV", parentcode: 1150100 },
        { name: "PDPTV", code: 1150104, parentname: "TV", parentcode: 1150100 },
        { name: "QLEDTV", code: 1150105, parentname: "TV", parentcode: 1150100 },
        { name: "브라운관TV", code: 1150106, parentname: "TV", parentcode: 1150100 },
        { name: "3D입체안경", code: 1150401, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "AV젠더", code: 1150402, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "AV케이블", code: 1150403, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "TV셋톱박스", code: 1150404, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "TV전용키보드", code: 1150405, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "TV카메라", code: 1150406, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "기타액세서리", code: 1150407, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "리모컨", code: 1150408, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "방진용품", code: 1150409, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "브라켓", code: 1150410, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "셀렉터/분배기", code: 1150411, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "스탠드", code: 1150412, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "안테나", code: 1150413, parentname: "영상가전액세서리", parentcode: 1150400 },
        { name: "DVD레코더", code: 1150501, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "DVD콤보", code: 1150502, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "DVD플레이어", code: 1150503, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "블루레이플레이어", code: 1150504, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "퍼스널뷰어", code: 1150505, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "포터블DVD", code: 1150506, parentname: "영상플레이어", parentcode: 1150500 },
        { name: "DLP", code: 1150601, parentname: "프로젝터", parentcode: 1150600 },
        { name: "LCD", code: 1150602, parentname: "프로젝터", parentcode: 1150600 },
        { name: "LCoS/기타", code: 1150603, parentname: "프로젝터", parentcode: 1150600 },
        { name: "기타프로젝터주변기기", code: 1150701, parentname: "프로젝터주변기기", parentcode: 1150700 },
        { name: "프로젝터램프", code: 1150702, parentname: "프로젝터주변기기", parentcode: 1150700 },
        { name: "프로젝터스크린", code: 1150703, parentname: "프로젝터주변기기", parentcode: 1150700 },
        { name: "기타 MP3/PMP액세서리", code: 1160501, parentname: "MP3/PMP액세서리", parentcode: 1160500 },
        { name: "배터리", code: 1160501, parentname: "MP3/PMP액세서리", parentcode: 1160500 },
        { name: "보호필름", code: 1160501, parentname: "MP3/PMP액세서리", parentcode: 1160500 },
        { name: "충전기", code: 1160501, parentname: "MP3/PMP액세서리", parentcode: 1160500 },
        { name: "케이스", code: 1160501, parentname: "MP3/PMP액세서리", parentcode: 1160500 },
        { name: "마이크주변기기", code: 1161101, parentname: "마이크", parentcode: 1161100 },
        { name: "무선마이크", code: 1161101, parentname: "마이크", parentcode: 1161100 },
        { name: "일반마이크", code: 1161101, parentname: "마이크", parentcode: 1161100 },
        { name: "전문가용마이크", code: 1161101, parentname: "마이크", parentcode: 1161100 },
        { name: "확성기", code: 1161101, parentname: "마이크", parentcode: 1161100 },
        { name: "블루투스동글", code: 1161301, parentname: "블루투스셋", parentcode: 1161300 },
        { name: "블루투스이어폰/이어셋", code: 1161302, parentname: "블루투스셋", parentcode: 1161300 },
        { name: "블루투스헤드폰/헤드셋", code: 1161303, parentname: "블루투스셋", parentcode: 1161300 },
        { name: "블루투스스피커", code: 1161401, parentname: "스피커", parentcode: 1161400 },
        { name: "스피커단품", code: 1161401, parentname: "스피커", parentcode: 1161400 },
        { name: "스피커세트", code: 1161401, parentname: "스피커", parentcode: 1161400 },
        { name: "스피커액세서리", code: 1161401, parentname: "스피커", parentcode: 1161400 },
        { name: "분리형오디오", code: 1161501, parentname: "오디오", parentcode: 1161500 },
        { name: "오디오액세서리", code: 1161502, parentname: "오디오", parentcode: 1161500 },
        { name: "일체형오디오", code: 1161503, parentname: "오디오", parentcode: 1161500 },
        { name: "휴대폰도킹스피커/오디오", code: 1161504, parentname: "오디오", parentcode: 1161500 },
        { name: "거치대", code: 1161801, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "기타이어폰/헤드폰액세서리", code: 1161802, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "연장선/케이블", code: 1161803, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "정리기", code: 1161804, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "캡/솜/팁", code: 1161805, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "케이스/파우치", code: 1161806, parentname: "이어폰/헤드폰액세서리", parentcode: 1161800 },
        { name: "CD카세트", code: 1161901, parentname: "카세트플레이어", parentcode: 1161900 },
        { name: "워크맨", code: 1161902, parentname: "카세트플레이어", parentcode: 1161900 },
        { name: "일반카세트", code: 1161903, parentname: "카세트플레이어", parentcode: 1161900 },
        { name: "카세트플레이어액세서리", code: 1161904, parentname: "카세트플레이어", parentcode: 1161900 },
        { name: "단일형홈시어터", code: 1162301, parentname: "홈시어터", parentcode: 1162300 },
        { name: "사운드바시스템", code: 1162301, parentname: "홈시어터", parentcode: 1162300 },
        { name: "조합형홈시어터", code: 1162301, parentname: "홈시어터", parentcode: 1162300 },
        { name: "남성용면도기", code: 1170701, parentname: "면도기", parentcode: 1170700 },
        { name: "여성용면도기", code: 1170701, parentname: "면도기", parentcode: 1170700 },
        { name: "기타면도기소모품", code: 1170801, parentname: "면도기소모품", parentcode: 1170800 },
        { name: "면도날/망", code: 1170801, parentname: "면도기소모품", parentcode: 1170800 },
        { name: "세정액", code: 1170801, parentname: "면도기소모품", parentcode: 1170800 },
        { name: "HUD", code: 1180101, parentname: "내비게이션/액세서리", parentcode: 1180100 },
        { name: "내비게이션", code: 1180101, parentname: "내비게이션/액세서리", parentcode: 1180100 },
        { name: "내비게이션액세서리", code: 1180101, parentname: "내비게이션/액세서리", parentcode: 1180100 },
        { name: "방음/방진/흡음", code: 1180201, parentname: "방음/방진용품", parentcode: 1180200 },
        { name: "방청용품", code: 1180202, parentname: "방음/방진용품", parentcode: 1180200 },
        { name: "실내원단", code: 1180203, parentname: "방음/방진용품", parentcode: 1180200 },
        { name: "블랙박스", code: 1180301, parentname: "블랙박스/액세서리", parentcode: 1180300 },
        { name: "블랙박스액세서리", code: 1180302, parentname: "블랙박스/액세서리", parentcode: 1180300 },
        { name: "기타자동차AV용품", code: 1180401, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "노이즈필터", code: 1180402, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "레벨미터", code: 1180403, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "리모컨", code: 1180404, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "서랍장", code: 1180405, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "전원보강용품", code: 1180406, parentname: "자동차AV용품", parentcode: 1180400 },
        { name: "거치형", code: 1180501, parentname: "자동차TV/모니터", parentcode: 1180500 },
        { name: "기타차량용TV/모니터", code: 1180502, parentname: "자동차TV/모니터", parentcode: 1180500 },
        { name: "인대쉬형", code: 1180503, parentname: "자동차TV/모니터", parentcode: 1180500 },
        { name: "천장형", code: 1180504, parentname: "자동차TV/모니터", parentcode: 1180500 },
        { name: "헤드레스트형", code: 1180505, parentname: "자동차TV/모니터", parentcode: 1180500 },
        { name: "이동식카메라감지기", code: 1180601, parentname: "전방/후방카메라", parentcode: 1180600 },
        { name: "전방감지기", code: 1180602, parentname: "전방/후방카메라", parentcode: 1180600 },
        { name: "전방카메라", code: 1180603, parentname: "전방/후방카메라", parentcode: 1180600 },
        { name: "후방감지기", code: 1180604, parentname: "전방/후방카메라", parentcode: 1180600 },
        { name: "후방카메라", code: 1180605, parentname: "전방/후방카메라", parentcode: 1180600 },
        { name: "스피커", code: 1180701, parentname: "카오디오음향기기", parentcode: 1180700 },
        { name: "앰프", code: 1180701, parentname: "카오디오음향기기", parentcode: 1180700 },
        { name: "우퍼", code: 1180701, parentname: "카오디오음향기기", parentcode: 1180700 },
        { name: "음향기기기타", code: 1180701, parentname: "카오디오음향기기", parentcode: 1180700 },
        { name: "무선", code: 1180801, parentname: "카팩", parentcode: 1180800 },
        { name: "유선", code: 1180802, parentname: "카팩", parentcode: 1180800 },
        { name: "차량용GPS", code: 1180901, parentname: "하이패스/GPS", parentcode: 1180900 },
        { name: "하이패스", code: 1180902, parentname: "하이패스/GPS", parentcode: 1180900 },
        { name: "하이패스액세서리", code: 1180903, parentname: "하이패스/GPS", parentcode: 1180900 },
        { name: "CD/DVD체인저", code: 1181101, parentname: "헤드유닛", parentcode: 1181100 },
        { name: "CD/MP3플레이어", code: 1181102, parentname: "헤드유닛", parentcode: 1181100 },
        { name: "DVD플레이어", code: 1181103, parentname: "헤드유닛", parentcode: 1181100 },
        { name: "헤드유닛패키지", code: 1181104, parentname: "헤드유닛", parentcode: 1181100 },
        { name: "CD-ROM", code: 1190301, parentname: "ODD", parentcode: 1190300 },
        { name: "CD/DVD콤보", code: 1190302, parentname: "ODD", parentcode: 1190300 },
        { name: "CD레코더", code: 1190303, parentname: "ODD", parentcode: 1190300 },
        { name: "DVD-ROM", code: 1190304, parentname: "ODD", parentcode: 1190300 },
        { name: "DVD레코더", code: 1190305, parentname: "ODD", parentcode: 1190300 },
        { name: "블루레이", code: 1190306, parentname: "ODD", parentcode: 1190300 },
        { name: "CD미디어", code: 1190601, parentname: "공미디어", parentcode: 1190600 },
        { name: "DVD미디어", code: 1190602, parentname: "공미디어", parentcode: 1190600 },
        { name: "기타공미디어", code: 1190603, parentname: "공미디어", parentcode: 1190600 },
        { name: "기타공미디어액세서리", code: 1190604, parentname: "공미디어", parentcode: 1190600 },
        { name: "미디어보관함", code: 1190605, parentname: "공미디어", parentcode: 1190600 },
        { name: "미디어전용라벨", code: 1190606, parentname: "공미디어", parentcode: 1190600 },
        { name: "블루레이미디어", code: 1190607, parentname: "공미디어", parentcode: 1190600 },
        { name: "빌트인가스레인지", code: 1200101, parentname: "가스레인지", parentcode: 1200100 },
        { name: "업소용가스레인지", code: 1200102, parentname: "가스레인지", parentcode: 1200100 },
        { name: "일반가스레인지", code: 1200103, parentname: "가스레인지", parentcode: 1200100 },
        { name: "뚜껑형", code: 1200601, parentname: "김치냉장고", parentcode: 1200600 },
        { name: "서랍형", code: 1200601, parentname: "김치냉장고", parentcode: 1200600 },
        { name: "스탠드형", code: 1200601, parentname: "김치냉장고", parentcode: 1200600 },
        { name: "업소용", code: 1200601, parentname: "김치냉장고", parentcode: 1200600 },
        { name: "양문형냉장고", code: 1200801, parentname: "냉장고", parentcode: 1200800 },
        { name: "업소용냉장고", code: 1200801, parentname: "냉장고", parentcode: 1200800 },
        { name: "일반형냉장고", code: 1200801, parentname: "냉장고", parentcode: 1200800 },
        { name: "과일야채세척기", code: 1201501, parentname: "식기세척/건조기", parentcode: 1201500 },
        { name: "식기건조기", code: 1201501, parentname: "식기세척/건조기", parentcode: 1201500 },
        { name: "식기세척기", code: 1201501, parentname: "식기세척/건조기", parentcode: 1201500 },
        { name: "업소용식기건조기", code: 1201501, parentname: "식기세척/건조기", parentcode: 1201500 },
        { name: "업소용식기세척기", code: 1201501, parentname: "식기세척/건조기", parentcode: 1201500 },
        { name: "복합형오븐", code: 1202501, parentname: "오븐", parentcode: 1202500 },
        { name: "오븐레인지", code: 1202501, parentname: "오븐", parentcode: 1202500 },
        { name: "오븐조리기", code: 1202501, parentname: "오븐", parentcode: 1202500 },
        { name: "전기오븐", code: 1202501, parentname: "오븐", parentcode: 1202500 },
        { name: "압력밥솥", code: 1203101, parentname: "전기밥솥", parentcode: 1203100 },
        { name: "업소용밥솥", code: 1203101, parentname: "전기밥솥", parentcode: 1203100 },
        { name: "일반밥솥", code: 1203101, parentname: "전기밥솥", parentcode: 1203100 },
        { name: "슬로우쿠커", code: 1203201, parentname: "전기쿠커", parentcode: 1203200 },
        { name: "에그마스터", code: 1203202, parentname: "전기쿠커", parentcode: 1203200 },
        { name: "전기냄비", code: 1203203, parentname: "전기쿠커", parentcode: 1203200 },
        { name: "전기찜기", code: 1203204, parentname: "전기쿠커", parentcode: 1203200 },
        { name: "라면포트", code: 1203401, parentname: "전기포트", parentcode: 1203400 },
        { name: "무선포트", code: 1203402, parentname: "전기포트", parentcode: 1203400 },
        { name: "보온포트", code: 1203403, parentname: "전기포트", parentcode: 1203400 },
        { name: "유선포트", code: 1203404, parentname: "전기포트", parentcode: 1203400 },
        { name: "전기물통", code: 1203405, parentname: "전기포트", parentcode: 1203400 },
        { name: "반찬냉장고", code: 1203501, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "쇼케이스", code: 1203502, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "쌀냉장고", code: 1203503, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "와인냉장고", code: 1203504, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "육수냉장고", code: 1203505, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "제빙기", code: 1203506, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "화장품냉장고", code: 1203507, parentname: "전용냉장고", parentcode: 1203500 },
        { name: "기타정수기주변기기", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "냉온수기", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "냉온정수기", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "냉정수기", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "미니정수기", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "정수기필터", code: 1203701, parentname: "정수기", parentcode: 1203700 },
        { name: "업소용에스프레소머신", code: 1204201, parentname: "커피머신", parentcode: 1204200 },
        { name: "에스프레소머신", code: 1204202, parentname: "커피머신", parentcode: 1204200 },
        { name: "캡슐/POD머신", code: 1204203, parentname: "커피머신", parentcode: 1204200 },
        { name: "커피머신부속품", code: 1204204, parentname: "커피머신", parentcode: 1204200 },
        { name: "오븐토스터기", code: 1204601, parentname: "토스터기", parentcode: 1204600 },
        { name: "팝업토스터기", code: 1204601, parentname: "토스터기", parentcode: 1204600 },
        { name: "무선마우스", code: 1210101, parentname: "마우스", parentcode: 1210100 },
        { name: "유선마우스", code: 1210102, parentname: "마우스", parentcode: 1210100 },
        { name: "트랙볼마우스", code: 1210103, parentname: "마우스", parentcode: 1210100 },
        { name: "펜마우스", code: 1210104, parentname: "마우스", parentcode: 1210100 },
        { name: "프리젠터", code: 1210105, parentname: "마우스", parentcode: 1210100 },
        { name: "잉크젯복합기", code: 1210201, parentname: "복합기", parentcode: 1210200 },
        { name: "컬러레이저복합기", code: 1210202, parentname: "복합기", parentcode: 1210200 },
        { name: "흑백레이저복합기", code: 1210203, parentname: "복합기", parentcode: 1210200 },
        { name: "3D프린터 소모품", code: 1210301, parentname: "복합기/프린터소모품", parentcode: 1210300 },
        { name: "기타복합기/프린터소모품", code: 1210302, parentname: "복합기/프린터소모품", parentcode: 1210300 },
        { name: "잉크", code: 1210303, parentname: "복합기/프린터소모품", parentcode: 1210300 },
        { name: "토너", code: 1210304, parentname: "복합기/프린터소모품", parentcode: 1210300 },
        { name: "3D 스캐너", code: 1210401, parentname: "스캐너", parentcode: 1210400 },
        { name: "명함스캐너", code: 1210402, parentname: "스캐너", parentcode: 1210400 },
        { name: "바코드스캐너", code: 1210403, parentname: "스캐너", parentcode: 1210400 },
        { name: "양면스캐너", code: 1210404, parentname: "스캐너", parentcode: 1210400 },
        { name: "펜스캐너", code: 1210405, parentname: "스캐너", parentcode: 1210400 },
        { name: "평판스캐너", code: 1210406, parentname: "스캐너", parentcode: 1210400 },
        { name: "필름스캐너", code: 1210407, parentname: "스캐너", parentcode: 1210400 },
        { name: "무선키보드", code: 1210501, parentname: "키보드", parentcode: 1210500 },
        { name: "유선키보드", code: 1210502, parentname: "키보드", parentcode: 1210500 },
        { name: "키패드", code: 1210503, parentname: "키보드", parentcode: 1210500 },
        { name: "태블릿", code: 1210701, parentname: "태블릿/액세서리", parentcode: 1210700 },
        { name: "태블릿액세서리", code: 1210702, parentname: "태블릿/액세서리", parentcode: 1210700 },
        { name: "3D프린터", code: 1210801, parentname: "프린터", parentcode: 1210800 },
        { name: "도트프린터", code: 1210802, parentname: "프린터", parentcode: 1210800 },
        { name: "라벨프린터", code: 1210803, parentname: "프린터", parentcode: 1210800 },
        { name: "레이저프린터", code: 1210804, parentname: "프린터", parentcode: 1210800 },
        { name: "바코드프린터", code: 1210805, parentname: "프린터", parentcode: 1210800 },
        { name: "영수증프린터", code: 1210806, parentname: "프린터", parentcode: 1210800 },
        { name: "잉크젯프린터", code: 1210807, parentname: "프린터", parentcode: 1210800 },
        { name: "카드프린터", code: 1210808, parentname: "프린터", parentcode: 1210800 },
        { name: "포토프린터", code: 1210809, parentname: "프린터", parentcode: 1210800 },
        { name: "플로터", code: 1210810, parentname: "프린터", parentcode: 1210800 },
        { name: "LCD보호커버", code: 1220201, parentname: "LCD용품/보호필름", parentcode: 1220200 },
        { name: "LCD보호필름", code: 1220202, parentname: "LCD용품/보호필름", parentcode: 1220200 },
        { name: "LCD후드", code: 1220203, parentname: "LCD용품/보호필름", parentcode: 1220200 },
        { name: "외부보호필름/스티커", code: 1220204, parentname: "LCD용품/보호필름", parentcode: 1220200 },
        { name: "렌즈/필터케이스", code: 1220301, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "렌즈어댑터", code: 1220302, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "렌즈캡", code: 1220303, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "렌즈필터", code: 1220304, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "렌즈후드", code: 1220305, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "텔레컨버터", code: 1220306, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "핀홀/기타렌즈용품", code: 1220307, parentname: "렌즈용품", parentcode: 1220300 },
        { name: "CF메모리", code: 1220401, parentname: "메모리카드", parentcode: 1220400 },
        { name: "MicroSD메모리", code: 1220402, parentname: "메모리카드", parentcode: 1220400 },
        { name: "SD메모리", code: 1220403, parentname: "메모리카드", parentcode: 1220400 },
        { name: "XQD메모리", code: 1220404, parentname: "메모리카드", parentcode: 1220400 },
        { name: "기타메모리", code: 1220405, parentname: "메모리카드", parentcode: 1220400 },
        { name: "메모리스틱", code: 1220406, parentname: "메모리카드", parentcode: 1220400 },
        { name: "모노포드", code: 1220601, parentname: "삼각대/헤드", parentcode: 1220600 },
        { name: "삼각대", code: 1220601, parentname: "삼각대/헤드", parentcode: 1220600 },
        { name: "삼각대가방/스트랩", code: 1220601, parentname: "삼각대/헤드", parentcode: 1220600 },
        { name: "삼각대액세서리", code: 1220601, parentname: "삼각대/헤드", parentcode: 1220600 },
        { name: "헤드", code: 1220601, parentname: "삼각대/헤드", parentcode: 1220600 },
        { name: "즉석카메라", code: 1220901, parentname: "즉석카메라", parentcode: 1220900 },
        { name: "즉석카메라액세서리", code: 1220901, parentname: "즉석카메라", parentcode: 1220900 },
        { name: "즉석필름", code: 1220901, parentname: "즉석카메라", parentcode: 1220900 },
        { name: "배터리그립", code: 1221001, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "범용충전기", code: 1221002, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "범용충전지", code: 1221003, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "전용정품배터리", code: 1221004, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "전용정품충전기", code: 1221005, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "전용호환배터리", code: 1221006, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "전용호환충전기", code: 1221007, parentname: "충전기/배터리", parentcode: 1221000 },
        { name: "멀티리더기", code: 1221101, parentname: "카드리더기", parentcode: 1221100 },
        { name: "메모리어댑터", code: 1221102, parentname: "카드리더기", parentcode: 1221100 },
        { name: "전용리더기", code: 1221103, parentname: "카드리더기", parentcode: 1221100 },
        { name: "GPS/무선송수신", code: 1221201, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "기타카메라/캠코더용품", code: 1221202, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "라이트박스", code: 1221203, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "루페", code: 1221204, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "리모컨/릴리즈", code: 1221205, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "소프트버튼", code: 1221206, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "수평계", code: 1221207, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "아이피스", code: 1221208, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "청소용품", code: 1221209, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "촬영보조용품", code: 1221210, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "카메라/캠코더용마이크", code: 1221211, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "카메라보관함", code: 1221212, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "카메라제습용품", code: 1221213, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "파인더", code: 1221214, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "포커싱스크린", code: 1221215, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "핫슈커버", code: 1221216, parentname: "카메라/캠코더 관련용품", parentcode: 1221200 },
        { name: "가방용품", code: 1221301, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "기타카메라가방/케이스", code: 1221302, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "방수케이스", code: 1221303, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "배낭형케이스", code: 1221304, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "일반형가방", code: 1221305, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "전용케이스", code: 1221306, parentname: "카메라가방/케이스", parentcode: 1221300 },
        { name: "광각렌즈", code: 1221401, parentname: "카메라렌즈", parentcode: 1221400 },
        { name: "망원렌즈", code: 1221402, parentname: "카메라렌즈", parentcode: 1221400 },
        { name: "어안렌즈", code: 1221403, parentname: "카메라렌즈", parentcode: 1221400 },
        { name: "컨버젼렌즈", code: 1221404, parentname: "카메라렌즈", parentcode: 1221400 },
        { name: "표준렌즈", code: 1221405, parentname: "카메라렌즈", parentcode: 1221400 },
        { name: "넥스트랩", code: 1221501, parentname: "카메라스트랩/그립", parentcode: 1221500 },
        { name: "핸드그립", code: 1221501, parentname: "카메라스트랩/그립", parentcode: 1221500 },
        { name: "핸드스트랩", code: 1221501, parentname: "카메라스트랩/그립", parentcode: 1221500 },
        { name: "라이트", code: 1221701, parentname: "플래시/조명용품", parentcode: 1221700 },
        { name: "조명/노출용품", code: 1221701, parentname: "플래시/조명용품", parentcode: 1221700 },
        { name: "플래시", code: 1221701, parentname: "플래시/조명용품", parentcode: 1221700 },
        { name: "35mm필름", code: 1221801, parentname: "필름/관련용품", parentcode: 1221800 },
        { name: "기타필름/관련용품", code: 1221802, parentname: "필름/관련용품", parentcode: 1221800 },
        { name: "암실/현상용품", code: 1221803, parentname: "필름/관련용품", parentcode: 1221800 },
        { name: "중형필름", code: 1221804, parentname: "필름/관련용품", parentcode: 1221800 },
        { name: "SLR카메라", code: 1221901, parentname: "필름카메라", parentcode: 1221900 },
        { name: "로모카메라", code: 1221901, parentname: "필름카메라", parentcode: 1221900 },
        { name: "일회용카메라", code: 1221901, parentname: "필름카메라", parentcode: 1221900 },
        { name: "자동카메라", code: 1221901, parentname: "필름카메라", parentcode: 1221900 },
        { name: "토이카메라", code: 1221901, parentname: "필름카메라", parentcode: 1221900 },
        { name: "액정보호필름", code: 1240301, parentname: "태블릿PC보호필름", parentcode: 1240300 },
        { name: "전신보호필름", code: 1240302, parentname: "태블릿PC보호필름", parentcode: 1240300 },
        { name: "보호필름/키스킨", code: 1250501, parentname: "학습기기액세서리", parentcode: 1250500 },
        { name: "충전기/케이블", code: 1250501, parentname: "학습기기액세서리", parentcode: 1250500 },
        { name: "케이스/파우치", code: 1250501, parentname: "학습기기액세서리", parentcode: 1250500 },
        { name: "보조배터리", code: 1271001, parentname: "휴대폰배터리", parentcode: 1271000 },
        { name: "전용배터리", code: 1271001, parentname: "휴대폰배터리", parentcode: 1271000 },
        { name: "액정보호필름", code: 1271101, parentname: "휴대폰보호필름", parentcode: 1271100 },
        { name: "액정코팅제", code: 1271102, parentname: "휴대폰보호필름", parentcode: 1271100 },
        { name: "전신보호필름", code: 1271103, parentname: "휴대폰보호필름", parentcode: 1271100 },
        { name: "홈버튼스티커", code: 1271104, parentname: "휴대폰보호필름", parentcode: 1271100 },
        { name: "휴대폰스킨", code: 1271105, parentname: "휴대폰보호필름", parentcode: 1271100 },
        { name: "충전기", code: 1271501, parentname: "휴대폰충전기", parentcode: 1271500 },
        { name: "크래들", code: 1271501, parentname: "휴대폰충전기", parentcode: 1271500 },
        { name: "가죽케이스", code: 1271701, parentname: "휴대폰케이스", parentcode: 1271700 },
        { name: "기타케이스", code: 1271702, parentname: "휴대폰케이스", parentcode: 1271700 },
        { name: "메탈케이스", code: 1271703, parentname: "휴대폰케이스", parentcode: 1271700 },
        { name: "실리콘케이스", code: 1271704, parentname: "휴대폰케이스", parentcode: 1271700 },
        { name: "암밴드", code: 1271705, parentname: "휴대폰케이스", parentcode: 1271700 },
        { name: "플라스틱케이스", code: 1271706, parentname: "휴대폰케이스", parentcode: 1271700 },
    ]);

    // n번째 카테고리 슬롯에 선택된 값을 출력 합니다.
    const [showSecond, setShowSecond] = useState<any>([]);
    const [showThird, setShowThird] = useState<any>([]);
    const [showFourth, setShowFourth] = useState<any>([]);

    // n번째 카테고리 슬롯을 출력 합니까?
    const [onCategory02, setOnCategory02] = useState(false);
    const [onCategory03, setOnCategory03] = useState(false);
    const [onCategory04, setOnCategory04] = useState(false);

    // 하단에 노출되는 선택된 카테고리 텍스트
    const [onCategoryText01, setOnCategoryText01] = useState(false);
    const [onCategoryText02, setOnCategoryText02] = useState(false);
    const [onCategoryText03, setOnCategoryText03] = useState(false);
    const [onCategoryText04, setOnCategoryText04] = useState(false);

    // 최종적으로 선택된 카테고리를 저장 합니다.
    const [selectedCategory01, setSelectedCategory01] = useState<any>([]);
    const [selectedCategory02, setSelectedCategory02] = useState<any>([]);
    const [selectedCategory03, setSelectedCategory03] = useState<any>([]);
    const [selectedCategory04, setSelectedCategory04] = useState<any>([]);

    const onFirstClick = (e: any) => {
        // 선택한 카테고리에 다음 카테고리 선택하기.
        // 예) 디지털/가전 클릭시 PC, PC부품 등이 두번째 칸에 출력.
        const result = second.filter((element: any) => element.parentcode == e.code);

        const first = e;

        // 더이상 선택지가 없을때
        if (result.length == 0) {
            setIsCategory(false);

            setOnCategory02(true);
            setOnCategory03(false);
            setOnCategory04(false);

            setOnCategoryText01(true);
            setOnCategoryText02(false);
            setOnCategoryText03(false);
            setOnCategoryText04(false);
        } else {
            // 첫번째 카테고리를 선택했을때
            setShowSecond(result);

            setOnCategory02(true);
            setOnCategory03(false);
            setOnCategory04(false);

            setSelectedCategory01(first);
            setSelectedCategory02([]);
            setSelectedCategory03([]);
            setSelectedCategory04([]);

            setOnCategoryText01(true);
            setOnCategoryText02(false);
            setOnCategoryText03(false);
            setOnCategoryText04(false);

            setIsCategory(false);
        }
    };

    const onSecondClick = (e: any) => {
        const result = third.filter((element: any) => element.parentcode == e.code);
        const second = e;

        if (result.length == 0) {
            setOnCategory03(false);
            setOnCategory04(false);

            setSelectedCategory02(second);
            setSelectedCategory03([]);
            setSelectedCategory04([]);

            setOnCategoryText02(true);
            setOnCategoryText03(false);
            setOnCategoryText04(false);

            setIsCategory(true);
        } else {
            setShowThird(result);
            setOnCategory03(true);
            setOnCategory04(false);

            setSelectedCategory02(second);
            setSelectedCategory03([]);
            setSelectedCategory04([]);

            setOnCategoryText02(true);
            setOnCategoryText03(false);
            setOnCategoryText04(false);

            setIsCategory(false);
        }
    };

    const onThirdClick = (e: any) => {
        const result = fourth.filter((element: any) => element.parentcode == e.code);
        const third = e;

        if (result.length == 0) {
            setOnCategory04(false);

            setSelectedCategory03(third);
            setSelectedCategory04([]);

            setOnCategoryText03(true);
            setOnCategoryText04(false);

            setIsCategory(true);
        } else {
            setShowFourth(result);

            setOnCategory04(true);

            setSelectedCategory03(third);
            setSelectedCategory04([]);

            setOnCategoryText03(true);
            setOnCategoryText04(false);

            setIsCategory(false);
        }
    };

    const onFourthClick = (e: any) => {
        const fourth = e;
        setSelectedCategory04(fourth);
        setOnCategoryText04(true);
        setIsCategory(true);
    };

    // 최종 상품 등록 체크
    useEffect(() => {
        if (isCategory && isName && isPrice && isOptionName && isOptionValue && isOptionList && isImage && isDetail && isDelivery) {
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    });

    // 상품 데이터
    const productdata = {
        userID: cookies,
        category1: selectedCategory01,
        category2: selectedCategory02,
        category3: selectedCategory03,
        category4: selectedCategory04,
        name: Name,
        price: Price,
        option: OptionResult,
        mainImage: MainImage,
        subImage: SubImage,
        detailImage: DetailImage,
        delivery: Delivery,
        category: category
    };

    console.log(productdata);

    // 등록 버튼
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (Submit == false) {
            return;
        }

        try {
            if (!isEdit) {
                console.log("등록버튼");
                const test = await axios.post("/smartstore/home/productregister", productdata, { withCredentials: true });

                if (Submit == true) {
                    navigate("/home/product"); // 등록시 상품목록으로
                }
            } else {
                console.log("수정버튼");
                const test = await axios.post(`/smartstore/home/product/${id}`, productdata, { withCredentials: true });

                if (Submit == true) {
                    navigate("/home/product"); // 수정시 상품목록으로
                }
            }
        } catch (errors) {
            console.log(errors);
        }
    };
    
    // 공지사항
    useEffect(() => {
        props.setNotice && props.setNotice(isEdit ? <a>상품 수정</a> : <a>상품 등록</a>);
        props.setNoticeDate && props.setNoticeDate('');
    },[isEdit]);

    return (
        <>
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className="ProductRegister-layout-wrap">
                        {/* <div className="Notice">
                            <div className="NoticeWrapper">{isEdit ? <a>상품 수정</a> : <a>상품 등록</a>}</div>
                        </div> */}
                        <div className="layout-inner">
                            <div className="content">
                                <div className="product-register-area">
                                    <ul className="product-register-list">
                                        <li className="product-register-item">
                                            {/* 카테고리 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setCategoryDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">카테고리</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={CategoryDrop == true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={CategoryDrop == true ? "info showmenu" : "info"}>
                                                <div className="input-item">
                                                    <div className="select-category-type">
                                                        <button className={categoryType == 0 ? "search selected" : "search"} onClick={() => setCategoryType(0)}>
                                                            <span>카테고리명 검색</span>
                                                        </button>
                                                        <button className={categoryType == 1 ? "select selected" : "select"} onClick={() => setCategoryType(1)}>
                                                            <span>카테고리명 선택</span>
                                                        </button>
                                                    </div>
                                                    <div className={categoryType == 0 ? "search-type show" : "search-type hide"}>
                                                        <input className="input" type="text" />
                                                    </div>
                                                    <div className={categoryType == 1 ? "select-type flex flex-wrap" : "select-type hide"}>
                                                        <div className="select-type-category-wrap">
                                                            <ul className="category first">
                                                                {first.map((list: any, index: any) => {
                                                                    const result = second.some((element: any) => element.parentcode == list.code);
                                                                    return (
                                                                        <li key={index} className="category-list" onClick={() => onFirstClick(list)}>
                                                                            <span>{list.name}</span>
                                                                            <span className={result == true ? "show-arrow" : "none-arrow"}></span>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className="select-type-category-wrap">
                                                            <ul className="category second">
                                                                {onCategory02 == true ? (
                                                                    showSecond.map((list: any, index: any) => {
                                                                        const result = third.some((element: any) => element.parentcode == list.code);
                                                                        return (
                                                                            <li key={index} className="category-list" onClick={() => onSecondClick(list)}>
                                                                                <span>{list.name}</span>
                                                                                <span className={result == true ? "show-arrow" : "none-arrow"}></span>
                                                                            </li>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <li className="category-list">
                                                                        <span>중분류</span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                        <div className="select-type-category-wrap">
                                                            <ul className="category third">
                                                                {onCategory03 == true ? (
                                                                    showThird.map((list: any, index: any) => {
                                                                        const result = fourth.some((element: any) => element.parentcode == list.code);
                                                                        return (
                                                                            <li key={index} className="category-list" onClick={() => onThirdClick(list)}>
                                                                                <span>{list.name}</span>
                                                                                <span className={result == true ? "show-arrow" : "none-arrow"}></span>
                                                                            </li>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <li className="category-list">
                                                                        <span>소분류</span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                        <div className="select-type-category-wrap">
                                                            <ul className="category fourth">
                                                                {onCategory04 == true ? (
                                                                    showFourth.map((list: any, index: any) => {
                                                                        return (
                                                                            <li key={index} className="category-list" onClick={() => onFourthClick(list)}>
                                                                                <span>{list.name}</span>
                                                                            </li>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <li className="category-list">
                                                                        <span>세분류</span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className={isName ? "error" : "error-active" }>{NameMessage}</div> */}
                                                <div className={isCategory == true ? "selected-category-show selected-category" : "selected-category"}>
                                                    <span className="text">선택한 카테고리 : </span>
                                                    <strong className={onCategoryText01 == false ? "text-hide text" : "text"}>{selectedCategory01.name}</strong>
                                                    <strong className={onCategoryText02 == false ? "text-hide text" : "text"}>{" > " + selectedCategory02.name}</strong>
                                                    <strong className={onCategoryText03 == false ? "text-hide text" : "text"}>{" > " + selectedCategory03.name}</strong>
                                                    <strong className={onCategoryText04 == false ? "text-hide text" : "text"}>{" > " + selectedCategory04.name}</strong>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {/* 상품명 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setProductDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">상품명</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={ProductDrop == true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={ProductDrop == true ? "info showmenu" : "info"}>
                                                <div className="input-item">
                                                    <div className="input-area">
                                                        <div className="input-box" ref={inputRefName}>
                                                            <div id={inputClick && inputClickNumber == 1 ? "input-inner-active" : "input-inner"}>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="상품명"
                                                                    className="input"
                                                                    value={Name}
                                                                    onClick={() => {
                                                                        setInputClick(true);
                                                                        setInputClickNumber(1);
                                                                    }}
                                                                    onChange={NameHandler}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {" "}
                                            {/* 판매가 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setPriceDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">판매가</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={PriceDrop == true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={PriceDrop == true ? "menu flex flex-align-center" : "menu hide"}>
                                                <div className="menu-left">
                                                    <span>판매가</span>
                                                </div>
                                                <div className="input-item">
                                                    <div className="input-area">
                                                        <div className="input-box" ref={inputRefPrice}>
                                                            <div id={inputClick && inputClickNumber == 2 ? "input-inner-active" : "input-inner"}>
                                                                <input
                                                                    type="text"
                                                                    maxLength={10}
                                                                    name="productprice"
                                                                    placeholder="숫자만 입력"
                                                                    className="input"
                                                                    value={Price}
                                                                    onClick={() => {
                                                                        setInputClick(true);
                                                                        setInputClickNumber(2);
                                                                    }}
                                                                    onChange={PriceHandler}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={isPrice == false ? "error-active" : "error-active"}>{PriceMessage}</div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {" "}
                                            {/* 옵션 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setOptionDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">옵션</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={OptionDrop === true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={OptionDrop === true ? "menu show" : "menu hide"}>
                                                <div className="inner-menu-list flex flex-align-center">
                                                    <div className="menu-left">
                                                        <span>옵션입력</span>
                                                    </div>
                                                    <div className="menu-right">
                                                        <div className="input-item input-item-name">
                                                            {" "}
                                                            {/* 옵션명 */}
                                                            <div className="input-area">
                                                                <div className="input-box" ref={inputRefOptionName}>
                                                                    <div className="input-box-title">
                                                                        <span>옵션명</span>
                                                                    </div>
                                                                    <div id={inputClick && inputClickNumber === 3 ? "input-inner-active" : "input-inner"}>
                                                                        <input
                                                                            type="text"
                                                                            maxLength={10}
                                                                            name="productOptionName"
                                                                            placeholder="예시 : 컬러"
                                                                            className="input"
                                                                            value={OptionName}
                                                                            onClick={() => {
                                                                                setInputClick(true);
                                                                                setInputClickNumber(3);
                                                                            }}
                                                                            onChange={OptionNameHandler}
                                                                        />
                                                                    </div>
                                                                    <div className={isOptionName === false ? "error-active name" : "error"}>{OptionNameMessage}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="input-item input-item-value">
                                                            {" "}
                                                            {/* 옵션값 */}
                                                            <div className="input-area">
                                                                <div className="input-box" ref={inputRefOptionValue}>
                                                                    <div className="input-box-title">
                                                                        <span>옵션값</span>
                                                                    </div>
                                                                    <div id={inputClick && inputClickNumber === 4 ? "input-inner-active" : "input-inner"}>
                                                                        <input
                                                                            type="text"
                                                                            name="productOptionValue"
                                                                            placeholder="예시 : 빨강,노랑 ( ,로 구분 )"
                                                                            className="input"
                                                                            id="OptionInputValue"
                                                                            value={OptionValue}
                                                                            onClick={() => {
                                                                                setInputClick(true);
                                                                                setInputClickNumber(4);
                                                                            }}
                                                                            onChange={OptionValueHandler}
                                                                        />
                                                                    </div>
                                                                    <div className={isOptionValue === false ? "error-active value" : "error"}>{OptionValueMessage}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="apply-btn-wrap">
                                                            <button className={isOptionName && isOptionValue ? "apply-btn-active" : "apply-btn"} onClick={optionSubmit}>
                                                                <span className="apply-btn-text">옵션목록으로 적용</span>
                                                                <span className="apply-btn-icon"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inner-menu-list">
                                                    <div className="menu-left">
                                                        <span>옵션목록</span>
                                                    </div>
                                                    <div className="menu-bottom">
                                                        <div className="info"></div>
                                                        <TableProduct
                                                            optionResult={OptionResult}
                                                            setOptionResult={setOptionResult}
                                                            optionSubmit={optionSubmit}
                                                            setOptionValue={setOptionValue}
                                                        ></TableProduct>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {" "}
                                            {/* 메인사진 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setImageDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">메인 사진</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={ImageDrop === true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={ImageDrop === true ? "menu show" : "menu hide"}>
                                                <div className="inner-menu-list flex flex-align-center">
                                                    <div className="menu-left">
                                                        <span>메인 사진</span>
                                                    </div>
                                                    <div className="menu-right">
                                                        <div className="input-item">
                                                            {" "}
                                                            {/* 메인 사진*/}
                                                            <ImageProductRegi setIsImage={setIsImage} setMainImage={setMainImage} MainImage={MainImage} SubImage={SubImage} DetailImage={DetailImage} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inner-menu-list flex flex-align-center">
                                                    <div className="menu-left">
                                                        <span>추가 사진</span>
                                                    </div>
                                                    <div className="menu-right">
                                                        <div className="input-item">
                                                            {" "}
                                                            {/* 추가 사진 */}
                                                            <div className="input-area">
                                                                <div className="input-box" ref={inputRefImage}>
                                                                    <div className="Image-box"></div>
                                                                    <SubImageProductRegi SubImage={SubImage} setSubImage={setSubImage} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {" "}
                                            {/* 상세 사진 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setDetailDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">상세 사진</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={DetailDrop === true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={DetailDrop === true ? "menu show" : "menu hide"}>
                                                <div className="inner-menu-list flex flex-align-center">
                                                    <div className="menu-left">
                                                        <span>상세 사진</span>
                                                    </div>
                                                    <div className="menu-right">
                                                        <div className="input-item">
                                                            {" "}
                                                            {/* 추가 사진 */}
                                                            <div className="input-area">
                                                                <div className="input-box" ref={inputRefDetail}>
                                                                    <div className="Image-box"></div>
                                                                    <DetailImageProductRegi setIsDetail={setIsDetail} DetailImage={DetailImage} setDetailImage={setDetailImage} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="product-register-item">
                                            {" "}
                                            {/* 배송비 */}
                                            <div className="title flex flex-ju-bt flex-align-center" onClick={() => setDeliveryDrop((e) => !e)}>
                                                <div className="text-wrap">
                                                    <label className="text">배송비</label>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="showdropmenu">
                                                        <span className={DeliveryDrop == true ? "icon-arrow reverse" : "icon-arrow"}></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={DeliveryDrop == true ? "menu flex flex-align-center" : "menu hide"}>
                                                <div className="menu-left">
                                                    <span>배송비</span>
                                                </div>
                                                <div className="input-item">
                                                    <div className="input-area">
                                                        <div className="input-box" ref={inputRefDelivery}>
                                                            <div id={inputClick && inputClickNumber == 3 ? "input-inner-active" : "input-inner"}>
                                                                <input
                                                                    type="text"
                                                                    maxLength={10}
                                                                    name="productDelivery"
                                                                    placeholder="숫자만 입력"
                                                                    className="input"
                                                                    value={Delivery}
                                                                    onClick={() => {
                                                                        setInputClick(true);
                                                                        setInputClickNumber(3);
                                                                    }}
                                                                    onChange={DeliveryHandler}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={isDelivery == false ? "error-active" : "error-active"}>{DeliveryMessage}</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="btn-area">
                                    <button type="submit" className={Submit ? "btn-area-btn btn-area-btn-active" : "btn-area-btn"}>
                                        {isEdit ? <span className="btn-txt">상품 수정</span> : <span className="btn-txt">상품 등록</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </form>
        </>
    );
}

export default ProductRegister;
