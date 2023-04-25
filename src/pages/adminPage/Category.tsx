// import $ from "jquery";
import axios from "../../api/axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
import { useSelector } from "react-redux";

// import { useCookies } from "react-cookie";
import { selectToken } from "../../store/authSlice";

// import { selectShowMenu } from "../../store/menuSlice";
import TableProductList from "../../components/admin/TableProductList";

import Column from "./CategoryDnD/Column";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type Props = {
    setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
    setNotice?: React.Dispatch<SetStateAction<string>>;
    setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

interface IData {
    tasks: {
        [key: string]: { id: string; content: string };
    };
    columns: {
        [key: string]: { _id: string; name: string; taskIds: string[] };
    };
    columnOrder: string[];
}

interface IData2 {
    tasks: { id: string; content: string };
    columns: { id: string; name: string; taskIds: string[] };
    columnOrder: string[];
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

function Category(props: Props) {
    const token = useSelector(selectToken);

    useEffect(() => {
        props.setNoticeIcon && props.setNoticeIcon("");
        props.setNotice && props.setNotice("카테고리 관리");
        props.setNoticeDate && props.setNoticeDate("");
        setIsCategory(true);
    }, []);

    // 카테고리 페이지 접속시 true로 반환.
    const [isCategory, setIsCategory] = useState<boolean>(false);

    // 우측 상품목록
    const [selectedProductList, setSelectedProductList] = useState<any>([]);
    console.log(selectedProductList);

    // 중앙 카테고리에 등록된 상품 목록
    const [addedProductList, setAddedProductList] = useState<any>([]);
    console.log(addedProductList);

    const [addedErrMessage, setAddedErrMessage] = useState<string>("");
    const [addedSelected, setAddedSelected] = useState<any>([]);
    const [addedSelectedName, setAddedSelectedName] = useState<string | null>();
    const [isAddedSelected, setIsAddedSelected] = useState<boolean>(false);

    const [categoryList, setCategoryList] = useState<any>([]);
    const [subCategoryList, setSubCategoryList] = useState<any>([]);

    const [selectedList, setSelectedList] = useState<any>([]);
    console.log(selectedList);

    const [selectedName, setSelectedName] = useState<string>();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [addColumn, setAddColumn] = useState<string>("");

    // 오류 메세지
    const [AddMessage, setAddMessage] = useState<string>("");
    const [NameMessage, setNameMessage] = useState<string>("");

    // 유효성 검사
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isSelectedTask, setIsSelectedTask] = useState<boolean>(false);

    const [isName, setIsName] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);

    const [rendering, setRendering] = useState<boolean>(false);

    // Ref
    const inputRef = useRef<any>();
    const inputRef2 = useRef<any>();
    const inputRef3 = useRef<any>();
    const listRef = useRef<any>(null);

    // 카테고리 등록된 상품
    const addedRefs = useRef<any>(null);
    const addedBtnArea = useRef<any>(null);

    // 카테고리 DND로 전송할 데이터
    const [dnd, setDnd] = useState<any>([]);

    // 유저 카테고리 가져오기
    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.post("/smartstore/home/category", token, { withCredentials: true });

                const columnOrder: any = new Array();
                const columns: any = new Array();
                const tasks: any = new Array();

                res.data.category.map((list: any) => {
                    columnOrder.push(list._id);
                    columns.push({ type: "column", _id: list._id, name: list.name, taskIds: list.taskIds, user: list.user });
                });
                tasks.push(...res.data.subCategory);

                const sendingDND = {
                    columnOrder: columnOrder,
                    columns: columns,
                    tasks: tasks,
                };

                setDnd(sendingDND);

                setCategoryList(res.data.category);
                setSubCategoryList(res.data.subCategory);
                setRendering(false);
            } catch (err) {
                console.log(err);
            }
        };
        get();
    }, [rendering]);

    // 카테고리 추가
    const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
        if (regex.test(input)) {
            setAddColumn(e.target.value);
        } else {
            // console.log("적합하지 않은 카테고리 명 입니다.");
        }
    };

    const addCategory = {
        beforeData: dnd,
        newData: addColumn,
    };

    const addSubCategory = {
        beforeData: dnd,
        parentID: selectedList._id,
        name: addColumn,
    };

    const plus = async () => {
        if (addColumn === "") {
            setAddMessage("카테고리 이름을 입력해주세요.");
            return;
        }
        // setAddColumn('');
        setSelectedName("");

        if (isSelectedTask) {
            setAddMessage("세부 카테고리는 추가 할수 없습니다.");
            return;
        }

        if (isSelected) {
            console.log("서브카테고리 추가");
            try {
                const res = await axios.post("/smartstore/home/category/subplus", addSubCategory, { withCredentials: true });

                const newColumnIndex = dnd.columns.findIndex((list: any) => list._id == res.data.newTask._id);

                dnd.columns.splice(newColumnIndex, 1, res.data.newTask);

                const sendingDND = {
                    columnOrder: dnd.columnOrder,
                    columns: dnd.columns,
                    tasks: res.data.sub,
                };

                setDnd(sendingDND);
                setAddColumn("");
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await axios.post("/smartstore/home/category/plus", addCategory, { withCredentials: true });

                const newColumnOrder = res.data.map((list: any) => list._id);
                const newColumns = res.data;

                const sendingDND = {
                    columnOrder: newColumnOrder,
                    columns: newColumns,
                    tasks: dnd.tasks,
                };

                setDnd(sendingDND);
                setAddColumn("");
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const minus = async () => {
        if (isSelected) {
            console.log("메인 카테고리 삭제");

            const deletedColumnOrder = dnd.columnOrder.filter((list: any) => list != selectedList._id);
            const deletedColumns = dnd.columns.filter((list: any) => list._id != selectedList._id);

            const findDeleteColumn = dnd.columns.filter((list: any) => list._id == selectedList._id);
            const deleteList = findDeleteColumn[0].taskIds.map((list: any) => list._id);
            const deletedTasks = dnd.tasks.filter((list: any) => !deleteList.includes(list._id));

            const deleteDnd = {
                columnOrder: deletedColumnOrder,
                columns: deletedColumns,
                tasks: deletedTasks,
            };

            try {
                const res = await axios.post("/smartstore/home/category/edit", deleteDnd, { withCredentials: true });

                const sendingDND = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category,
                    tasks: res.data.subcategory,
                };

                setDnd(sendingDND);
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        } else if (isSelectedTask) {
            console.log("서브 카테고리 삭제");

            const deleteTask = dnd.tasks.filter((list: any) => list._id != selectedList._id);

            console.log(deleteTask);

            const findColumn = dnd.columns.filter((list: any) => list._id == selectedList.parentID);

            console.log(findColumn);

            const deleteColumnInTask = findColumn[0].taskIds.filter((list: any) => list._id != selectedList._id);

            console.log(deleteColumnInTask);

            findColumn[0].taskIds = deleteColumnInTask;

            const deleteDnd = {
                columnOrder: dnd.columnOrder,
                columns: dnd.columns,
                tasks: deleteTask,
            };

            setSelectedName("");
            setIsSelected(false);
            setIsSelectedTask(false);

            try {
                const res = await axios.post("/smartstore/home/category/edit", deleteDnd, { withCredentials: true });

                // const newColumnOrder = res.data.map((list: any) => list._id);
                // const newColumns = res.data;

                const sendingDND = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category,
                    tasks: res.data.subcategory,
                };

                setDnd(sendingDND);
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setAddMessage("삭제할 카테고리를 선택 해주세요.");
        }
    };

    // 카테고리 이름
    const onChange = (e: any) => {
        if (isSelected || isSelectedTask) {
            setSelectedName(e.target.value);
        }
    };

    const selectedColumn = {
        type: "column",
        _id: selectedList._id,
        name: selectedName,
        taskIds: selectedList.taskIds,
        user: selectedList.user,
    };

    const selectedTask = {
        type: "task",
        parentID: selectedList.user,
        name: selectedName,
        user: selectedList.user,
        _id: selectedList._id,
    };

    // 저장 버튼
    const CategoryEdit = async (e: any) => {
        e.preventDefault();

        if (selectedList.name === "전체상품" || selectedList.name === "베스트") {
            setNameMessage("해당 카테고리는 이름을 변경 할 수 없습니다.");
            return;
        }

        // if (selectedList && selectedName!.length > 10) {
        //     setNameMessage("10글자 미만으로 입력 해주세요.");
        //     return;
        // }

        if (isSelected) {
            if (selectedName == "") {
                setNameMessage("카테고리 이름을 입력해 주세요.");
                return;
            }
            console.log("컬럼을 선택했을때 저장");
            setNameMessage("");

            const index = dnd.columns.findIndex((list: any, index: any) => list._id == selectedList._id);
            dnd.columns.splice(index, 1, selectedColumn);

            try {
                const res = await axios.post("/smartstore/home/category/edit", dnd, { withCredentials: true });

                const editDnd = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category.category,
                    tasks: dnd.tasks,
                };

                setDnd(editDnd);
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        } else if (isSelectedTask) {
            if (selectedName == "") {
                setNameMessage("카테고리 이름을 입력해 주세요.");
                return;
            }
            console.log("테스크를 선택했을때 저장");
            setNameMessage("");

            const findTask = dnd.tasks.filter((list: any) => list._id == selectedList._id);
            const findColumn = dnd.columns.filter((list: any) => list._id == selectedList.parentID);
            const editColumnInTask = findColumn[0].taskIds.filter((list: any) => list._id == selectedList._id);

            findTask[0].name = selectedName;
            editColumnInTask[0].name = selectedName;

            console.log(findTask);
            console.log(findColumn);
            console.log(editColumnInTask);

            try {
                const res = await axios.post("/smartstore/home/category/edit", {dnd, selectedList}, { withCredentials: true });
                console.log(res.data.category);
                console.log(res.data.subcategory);

                const editDnd = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category,
                    tasks: res.data.subcategory,
                };

                setDnd(editDnd);
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("아무것도 선택하지 않았을때 저장");
            setNameMessage("");
            try {
                const res = await axios.post("/smartstore/home/category/edit", dnd, { withCredentials: true });
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        }

        // try {
        //     const res = await axios.post("/smartstore/home/category/edit", categoryList, { withCredentials: true });
        //     console.log(res.data.category.category);
        //     setCategoryList(res.data.category.category);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    // 등록된 상품 클릭시
    const AddedProductClick = (name: string, e: React.MouseEvent<HTMLLIElement>) => {
        const select = e.currentTarget.textContent;
        const data = addedProductList.filter((list: any) => list.name == select);
        setIsAddedSelected(true);
        setAddedSelected(data);
        setAddedSelectedName(name);
    };

    // 적용 버튼
    const ProductAdd = async (e: any) => {
        e.preventDefault();

        const productCategoryAdd = {
            selectedProduct: selectedProductList,
            selectedCategory: selectedList,
        };

        if (!selectedProductList[0]) {
            console.log("상품선택이 안됨");
            return;
        } else if (!selectedList) {
            console.log("카테고리 선택이 안됨");
            return;
        }

        try {
            const res = await axios.post("/smartstore/home/category/productcategoryadd", productCategoryAdd, { withCredentials: true });
            console.log(res.data);

            // if (res.data.error == "카테고리중복") {
            //     setAddedErrMessage("선택된 카테고리에는 이미 등록 되어있는 상품입니다.");
            //     return;
            // }

            setAddedProductList(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    // 삭제 버튼
    const ProductDelete = async (e: any) => {
        e.preventDefault();

        if (!addedSelected[0]) {
            console.log("카테고리가 등록된 상품이 선택되지 않았습니다.");
            return;
        }

        console.log(addedSelected[0].category);
        console.log(selectedList._id);
        const copy = selectedList._id;
        console.log(copy);
        const addedDelete = addedSelected[0].category.filter((list: any) => list._id != selectedList._id);
        console.log(addedDelete);

        const data = {
            selectedCategory: selectedList,
            addedSelected: addedSelected,
            addedDelete: addedDelete,
        };

        try {
            const res = await axios.post("/smartstore/home/category/productcategorydelete", data, { withCredentials: true });
            console.log(res.data);
            setAddedProductList(res.data);
            // if(res.data.error == "카테고리중복"){
            //     setAddedErrMessage('선택된 카테고리에는 이미 등록 되어있는 상품입니다.')
            //     return
            // }
        } catch (err) {
            console.log(err);
        }
    };

    // 카테고리 리스트 바깥 클릭시 선택 해제
    useEffect(() => {
        const clickOutside = (e: any) => {
            if (!inputRef.current.contains(e.target) && !inputRef2.current.contains(e.target) && !inputRef3.current.contains(e.target) && listRef.current && !listRef.current.contains(e.target)) {
                setIsSelected(false);
                setIsSelectedTask(false);
                setSelectedId(null);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [selectedList]);

    // 카테고리 등록된 상품 리스트 선택 해제
    useEffect(() => {
        const clickOutside = (e: any) => {
            if (!addedBtnArea.current.contains(e.target) && addedRefs.current && !addedRefs.current.contains(e.target)) {
                setAddedSelectedName(null);
                setIsAddedSelected(false);
                setAddedSelected("");
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [addedBtnArea]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { destination, source, draggableId, type } = result;

            if (!destination) return;
            if (destination.droppableId === source.droppableId && source.index === destination.index) return;

            // const finishColumnOrder = dnd.columnOrder.filter((list: any) => list.id == draggableId );
            // console.log(finishDraggableTask2)
            const finishDraggableTask2 = dnd.columns.filter((list: any) => list._id == draggableId);
            console.log(finishDraggableTask2);

            // 카테고리 움직였을때
            if (type === "column") {
                const newColumnOrder = Array.from(dnd.columnOrder);
                newColumnOrder.splice(source.index, 1);
                newColumnOrder.splice(destination.index, 0, draggableId);

                const newColumns = Array.from(dnd.columns);
                newColumns.splice(source.index, 1);
                newColumns.splice(destination.index, 0, ...finishDraggableTask2);
                console.log(newColumns);

                const newData = { ...dnd };
                newData.columnOrder = newColumnOrder;
                newData.columns = newColumns;

                setDnd(newData);
                return;
            }

            const startColumn = dnd.columns.filter((list: any) => list._id == source.droppableId);
            const finishColumn = dnd.columns && dnd.columns.filter((list: any) => list._id == destination.droppableId);

            const startIndex = dnd.columns && dnd.columns.findIndex((list: any) => list._id == source.droppableId);
            const finishIndex = dnd.columns && dnd.columns.findIndex((list: any) => list._id == destination.droppableId);

            const finishDraggableTask = startColumn[0].taskIds && startColumn[0].taskIds.filter((list: any) => list._id == draggableId);
            finishDraggableTask[0].parentID = finishColumn[0]._id;

            const tasksIndex = dnd.tasks && dnd.tasks.findIndex((list: any) => list._id == finishDraggableTask[0]._id);
            dnd.tasks && dnd.tasks.splice(tasksIndex, 1, finishDraggableTask[0]);

            // task의 parentID는 항상 도착지의 _id로 바꿔준다.
            console.log(finishDraggableTask[0]);
            console.log(destination);

            // 같은 카테고리에서 서브 카테고리 이동 했을때
            if (startColumn[0]._id == finishColumn[0]._id) {
                const newTaskIds = Array.from(startColumn[0].taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, ...finishDraggableTask);

                const newData = { ...dnd };
                newData.columns[startIndex].taskIds = newTaskIds;

                setDnd(newData);
            } else {
                // 다른 카테고리로 서브 카테고리 이동 했을때
                const startTaskIds = Array.from(startColumn[0].taskIds);
                startTaskIds.splice(source.index, 1);
                const newStartColumn = { _id: startColumn[0]._id, name: startColumn[0].name, taskIds: startTaskIds, user: startColumn[0].user };

                const finishTaskIds = Array.from(finishColumn[0].taskIds);
                finishTaskIds.splice(destination.index, 0, ...finishDraggableTask);
                const newFinishColumn = { _id: finishColumn[0]._id, name: finishColumn[0].name, taskIds: finishTaskIds, user: startColumn[0].user };

                const newData = { ...dnd };

                newData.columns[startIndex] = newStartColumn;
                newData.columns[finishIndex] = newFinishColumn;
                // newData.tasks =

                setDnd(newData);
            }

            try {
                const res = axios.post("/smartstore/home/category/edit", dnd, { withCredentials: true });
                setRendering(true);
            } catch (err) {
                console.log(err);
            }
        },
        [dnd]
    );

    return (
        <>
            <div className="SellerSubframe home-category">
                <div className="product-list">
                    <div className="panel panel-seller">
                        <div className="panel-heading">
                            <div className="pull-left">
                                <h3 className="panel-title">
                                    카테고리 등록
                                    <span className="text-primary"></span>
                                </h3>
                            </div>
                        </div>
                        <div className="panel-body flex">
                            <div className="box-wrap flex">
                                <div className="box first flex flex-ju-bt flex-di-row">
                                    <div className="category-list" ref={listRef}>
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId="all-columns" direction="vertical" type="column">
                                                {(provided) => (
                                                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                                                        {dnd.columns &&
                                                            dnd.columns.map((list: any, index: any) => {
                                                                const tasks = list.taskIds && list.taskIds.map((taskId: any, index: any) => taskId);
                                                                return (
                                                                    <Column
                                                                        column={list}
                                                                        tasks={tasks}
                                                                        key={list._id}
                                                                        index={index}
                                                                        isSelected={isSelected}
                                                                        isSelectedTask={isSelectedTask}
                                                                        setIsSelected={setIsSelected}
                                                                        setIsSelectedTask={setIsSelectedTask}
                                                                        selectedList={selectedList}
                                                                        setSelectedList={setSelectedList}
                                                                        categoryList={categoryList}
                                                                        subCategoryList={subCategoryList}
                                                                        setSelectedName={setSelectedName}
                                                                        selectedId={selectedId}
                                                                        setSelectedId={setSelectedId}
                                                                        setAddedProductList={setAddedProductList}
                                                                    />
                                                                );
                                                            })}
                                                        {provided.placeholder}
                                                    </Container>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                    <div className="btn-list" ref={inputRef}>
                                        <div className="input-box">
                                            <div id="input-inner">
                                                <input type="text" className="input" placeholder="카테고리 추가" onChange={inputValue} />
                                            </div>
                                        </div>
                                        <div className={isAdd ? "error" : "error-active"}>{AddMessage}</div>
                                        <button className="normal-btn edit" onClick={plus}>
                                            <span className="text">+</span>
                                        </button>
                                        <button className="normal-btn edit" onClick={minus}>
                                            <span className="text">-</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="box second flex flex-ju-bt flex-di-row" ref={inputRef2}>
                                    <div className="second-product-list">
                                        <div className="top">
                                            <h5 className="box-name">카테고리 이름</h5>
                                            <div className="input-box">
                                                <div id="input-inner">
                                                    <input type="text" value={selectedName} placeholder="카테고리 이름" className="input" onChange={onChange} />
                                                </div>
                                            </div>
                                            <button className="normal-btn edit2" onClick={CategoryEdit}>
                                                <span className="text">저장</span>
                                            </button>
                                            <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                                        </div>
                                        <div className="middle">
                                            <h5 className="box-name">등록된 상품</h5>
                                            <ul className="category-list-wrap" ref={addedRefs}>
                                                {addedProductList.map((list: any, index: any) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            value={list.name}
                                                            className="category-list"
                                                            style={{ backgroundColor: list.name == addedSelectedName && isAddedSelected ? "#e0e0e0" : "#fff", marginBottom: "10px" }}
                                                            onClick={(e) => AddedProductClick(list.name, e)}
                                                        >
                                                            <div className="edit flex flex-ju-center flex-align-center">
                                                                <img src={list.mainImage[0]} style={{ width: "40px", marginRight: "5px", padding: "5px" }}></img>
                                                                <span>{list.name}</span>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <div ref={addedBtnArea} style={{ display: "flex" }}>
                                                <button className="normal-btn edit2" style={{ marginRight: "5px" }} onClick={ProductAdd}>
                                                    <span className="text">적용</span>
                                                </button>
                                                <button className="normal-btn edit2" onClick={ProductDelete}>
                                                    <span className="text">삭제</span>
                                                </button>
                                            </div>
                                            <div style={{ marginTop: "10px", color: "#ff3627" }}>
                                                <span>{addedErrMessage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box third" ref={inputRef3}>
                                    <h5 className="box-name">상품 목록</h5>
                                    <TableProductList isCategory={isCategory} setSelectedProductList={setSelectedProductList}></TableProductList>
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
