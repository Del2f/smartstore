// import $ from "jquery";
import axios from "../../api/axios";
import { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";

import { useCookies } from "react-cookie";
import { selectToken } from "../../store/authSlice";

import { selectShowMenu } from "../../store/menuSlice";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Props = {
    setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
    setNotice?: React.Dispatch<SetStateAction<string>>;
    setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

function Category(props: Props) {
    useEffect(() => {
        props.setNoticeIcon && props.setNoticeIcon("");
        props.setNotice && props.setNotice("카테고리 관리");
        props.setNoticeDate && props.setNoticeDate("");
    }, []);

    const token = useSelector(selectToken);
    const [categoryList, setCategoryList] = useState<any>([]);
    const [selectedList, setSelectedList] = useState<any>([]);
    const [selectedName, setSelectedName] = useState<string>();
    const [selectedId, setSelectedId] = useState<string>();
    console.log(selectedList);

    // 오류 메세지
    const [AddMessage, setAddMessage] = useState<string>("");
    const [NameMessage, setNameMessage] = useState<string>("");
    console.log(categoryList);

    // 유효성 검사
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isName, setIsName] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);

    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.post("/smartstore/home/category", token, { withCredentials: true });
                console.log(res.data.categoryList);
                setCategoryList(res.data.categoryList);
            } catch (err) {
                console.log(err);
            }
        };
        get();
    }, []);

    // 드래그앤드롭 끝나면 실행되는 코드.
    const handleChange = (result: any) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...categoryList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCategoryList(items);
    };

    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);

        const input = e.target.value;
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
        if (regex.test(input)) {
            console.log("적합한 카테고리 명 입니다.");
            setName(e.target.value);
        } else {
            console.log("적합하지 않은 카테고리 명 입니다.");
        }
    };

    const Selected = (e: any) => {
        const select = e.target.textContent;
        const data = categoryList.filter((list: any) => list.name == select);
        setIsSelected(true);
        setSelectedList(data[0]);
        setSelectedName(data[0].name);
        setSelectedId(data[0]._id);
    };

    const [name, setName] = useState<any>("");
    
    const addcategory = {
        name: name,
    };

    const plus = async () => {
        console.log(name)
        if (name === "") {
            setAddMessage("카테고리 이름을 입력해주세요.");
            return;
        }
        setName("");

        try {
            const res = await axios.post("/smartstore/home/category/plus", addcategory, { withCredentials: true });
            console.log(res.data.product);
            setCategoryList((enters: any) => [...enters, addcategory]);
        } catch (err) {
            console.log(err);
        }
    };

    const minus = () => {};

    const selected = {
        name: selectedName,
        _id: selectedId,
    };

    // 확인 버튼
    const CategoryEdit = async (e: any) => {
        e.preventDefault();
        console.log(selectedName);
        console.log(selectedList.name);

        if (selectedList.name === "전체상품" || selectedList.name === "베스트") {
            setNameMessage("해당 카테고리는 이름을 변경 할 수 없습니다.");
            return;
        }

        // if (selectedList && selectedName!.length > 10) {
        //     setNameMessage("10글자 미만으로 입력 해주세요.");
        //     return;
        // }

        if (selected.name == "") {
            setNameMessage("카테고리 이름을 입력해 주세요.");
            return;
        } 

        if(isSelected) {
            console.log('실행')
            setNameMessage("");
            const index = categoryList.findIndex((list: any, index: any) => list._id == selected._id);
            categoryList.splice(index, 1, selected);
        }

        try {
            const res = await axios.post("/smartstore/home/category/edit", categoryList, { withCredentials: true });
            console.log(res.data.category.category);
            setCategoryList(res.data.category.category);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e: any) => {
        setSelectedName(e.target.value);
    };

    return (
        <>
            <div className="SellerSubframe home-category">
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
                            <div className="LR-margin-20 flex">
                                <div className="first">
                                    <div className="category-list">
                                        <DragDropContext onDragEnd={handleChange}>
                                            <Droppable droppableId="category">
                                                {(provided) => (
                                                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                                                        {categoryList.map((list: any, index: any) => {
                                                            return (
                                                                <Draggable key={index} index={index} draggableId={String(index)}>
                                                                    {(provided) => (
                                                                        <li
                                                                            className={list.name == selectedName ? "category-li-active" : "category-li"}
                                                                            ref={provided.innerRef}
                                                                            onClick={Selected}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            {list.name}
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                    <div className="btn-list">
                                        <div className="input-box">
                                            <div id="input-inner">
                                                <input type="text" className="input" placeholder="카테고리 추가" onChange={inputValue} />
                                            </div>
                                        </div>
                                        <div className={isAdd ? "error" : "error-active"}>{AddMessage}</div>
                                        <button className="normal-btn" onClick={plus}>
                                            <span className="text">+</span>
                                        </button>
                                        <button className="normal-btn" onClick={minus}>
                                            <span className="text">-</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={isSelected ? "second show" : "second hide"}>
                                    <div className="second-product-list">
                                        <div className="top">
                                            <span>카테고리 이름</span>
                                            <div className="input-box">
                                                <div id="input-inner">
                                                    <input type="text" value={selectedName} placeholder="카테고리 이름" className="input" onChange={onChange} />
                                                </div>
                                            </div>
  
                                            <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                                        </div>
                                    </div>
                                        <button className="normal-btn" onClick={CategoryEdit}>
                                                <span className="text">저장</span>
                                            </button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
