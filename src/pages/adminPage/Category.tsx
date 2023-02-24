// import $ from "jquery";
import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useRef, useEffect, SetStateAction, useCallback } from "react";
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

    const [categoryList, setCategoryList] = useState<any>([]);
    const [subCategoryList, setSubCategoryList] = useState<any>([]);

    const [selectedList, setSelectedList] = useState<any>([]);

    const [selectedName, setSelectedName] = useState<string>();
    const [selectedId, setSelectedId] = useState<string>();
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
    const listRef = useRef<any>(null);

    // 카테고리 DND로 전송할 데이터
    const [dnd, setDnd] = useState<any>([]);
    console.log(dnd);

    // 유저 카테고리 가져오기
    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.post("/smartstore/home/category", token, { withCredentials: true });

                console.log(res)

                const columnOrder: any = new Array();
                const columns: any = new Array();
                const tasks: any = new Array();

                res.data.category.map((list: any) => {
                    columnOrder.push(list._id);
                    columns.push({ _id: list._id, name: list.name, taskIds: list.taskIds });
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
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
        if (regex.test(input)) {
            console.log("적합한 카테고리 명 입니다.");
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
        ParentID: selectedList._id,
        name: addColumn,
    };

    const plus = async () => {
        console.log(dnd)
        if (addColumn === "") {
            setAddMessage("카테고리 이름을 입력해주세요.");
            return;
        }
        setAddColumn("");

        if (isSelected) {
            console.log("서브카테고리 추가");
            console.log(selectedList)
            // const newTaskIds = Array.from(selectedList.taskIds);
            // console.log(newTaskIds)
            // newTaskIds.splice(source.index, 1);
            // newTaskIds.splice(selectedList.taskIds.length, 0, ...finishDraggableTask);

            // const newData = { ...dnd };
            // newData.columns[startIndex].taskIds = newTaskIds;

            // setDnd(newData);

            try {
                const res = await axios.post("/smartstore/home/category/subplus", addSubCategory, { withCredentials: true });
                console.log(res);
                // setSubCategoryList((enters: any) => [...enters, addSubCategory]);
            } catch (err) {
                console.log(err);
            }
        } else {
            
            try {
                const res = await axios.post("/smartstore/home/category/plus", addCategory, { withCredentials: true });
                console.log(res.data);

                // const newColumnOrder = res.data.map((list: any) => list._id);
                // const newColumns = res.data;
                // console.log(newColumnOrder);

                // const sendingDND = {
                //     columnOrder: newColumnOrder,
                //     columns: newColumns,
                //     tasks: dnd.tasks,
                // };

                // setDnd(sendingDND);
                // setRendering(true);
                // setCategoryList((enters: any) => [...enters, addCategory]);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const minus = () => {};

    // 카테고리 이름
    const onChange = (e: any) => {
        setSelectedName(e.target.value);
    };

    const selectedColumn = {
        _id: selectedList._id,
        name: selectedName,
        taskIds: selectedList.taskIds,
    };

    const selectedTask = {
        _id: selectedList._id,
        name: selectedName,
    };

    // console.log(selectedColumn);
    // console.log(selectedTask);

    // 확인 버튼
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

        if (selectedName == "") {
            setNameMessage("카테고리 이름을 입력해 주세요.");
            return;
        }

        if (isSelected) {
            console.log("컬럼실행");
            setNameMessage("");
            console.log(dnd.columns);

            const index = dnd.columns.findIndex((list: any, index: any) => list._id == selectedList._id);
            dnd.columns.splice(index, 1, selectedColumn);

            try {
                const res = await axios.post("/smartstore/home/category/edit", dnd, { withCredentials: true });
                console.log(res.data.category.category);

                const editDnd = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category.category,
                    tasks: dnd.tasks,
                };

                setDnd(editDnd);
            } catch (err) {
                console.log(err);
            }
        } else if (isSelectedTask) {
            console.log("테스크실행");
            setNameMessage("");
            // const test = dnd.columns.map((list: any) => {
            //     list.taskIds._id ==
            // })
            const index = dnd.tasks.findIndex((list: any, index: any) => list._id == selectedList._id);
            dnd.tasks.splice(index, 1, selectedTask);
            console.log(dnd.tasks);

            try {
                const res = await axios.post("/smartstore/home/category/edit", dnd, { withCredentials: true });
                console.log(res.data.category.category);

                const editDnd = {
                    columnOrder: dnd.columnOrder,
                    columns: res.data.category.category,
                    tasks: dnd.tasks,
                };

                setDnd(editDnd);
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

    // 카테고리 리스트 바깥 클릭시 셀렉트 해제
    useEffect(() => {
        const clickOutside = (e: any) => {
            if (!inputRef.current.contains(e.target) && !inputRef2.current.contains(e.target) && listRef.current && !listRef.current.contains(e.target)) {
                setIsSelected(false);
                setIsSelectedTask(false);
                // setSelectedName("");
                // setSelectedId("");
                setSelectedList("");
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [selectedList]);

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
                const newStartColumn = { _id: startColumn[0]._id, name: startColumn[0].name, taskIds: startTaskIds };

                const finishTaskIds = Array.from(finishColumn[0].taskIds);
                finishTaskIds.splice(destination.index, 0, ...finishDraggableTask);
                const newFinishColumn = { _id: finishColumn[0]._id, name: finishColumn[0].name, taskIds: finishTaskIds };

                const newData = { ...dnd };

                newData.columns[startIndex] = newStartColumn;
                newData.columns[finishIndex] = newFinishColumn;

                setDnd(newData);
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
                                                                        setIsSelected={setIsSelected}
                                                                        selectedList={selectedList}
                                                                        setSelectedList={setSelectedList}
                                                                        categoryList={categoryList}
                                                                        subCategoryList={subCategoryList}
                                                                        setIsSelectedTask={setIsSelectedTask}
                                                                        setSelectedName={setSelectedName}
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
                                        <button className="normal-btn" onClick={plus}>
                                            <span className="text">+</span>
                                        </button>
                                        <button className="normal-btn" onClick={minus}>
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
                                            <div className={isName ? "error" : "error-active"}>{NameMessage}</div>
                                        </div>
                                    </div>
                                    <button className="normal-btn" onClick={CategoryEdit}>
                                        <span className="text">저장</span>
                                    </button>
                                </div>
                                <div className="box third flex flex-wrap flex-align-center flex-ju-bt">
                                    <h5 className="box-name">상품 목록</h5>
                                    <TableProductList isCategory={isCategory}></TableProductList>
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
