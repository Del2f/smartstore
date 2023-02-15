import axios from "../../api/axios";

import { useCallback, useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableProductList.scss";

type Props = {
    setProductTotal?: Dispatch<SetStateAction<number>>;
};

function TableProductList(props: Props) {
    const token = useSelector(selectToken);

    const gridRef = useRef<any>();

    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [rowData, setRowData] = useState();
    const [selectedRows, setSelectedRows] = useState<any>([]);
    console.log(selectedRows);

    const [columnDefs] = useState([
        { width: 100, checkboxSelection: true, headerCheckboxSelection: true, resizable: true },
        {
            headerName: "수정",
            width: 80,
            resizable: false,
            cellRendererFramework: (params: any) => {
                return (
                    <div className="edit">
                        <Link to={params.data._id}>
                            <button className="editBtn flex flex-align-center" data-action="edit">
                                <span>수정</span>
                            </button>
                        </Link>
                    </div>
                );
            },
        },
        { field: "_id", headerName: "상품코드", width: 200, resizable: true },
        { field: "name", headerName: "상품명", width: 200, resizable: true },
        { field: "price", headerName: "가격", width: 200, resizable: true },
        // { field: "option", headerName: "옵션", width: 200, resizable: true },
        { field: "delivery", headerName: "배송비", width: 200, resizable: true },
        { field: "category1.name", headerName: "카테고리1", width: 250, resizable: true },
        { field: "category2.name", headerName: "카테고리2", width: 200, resizable: true },
        { field: "category3.name", headerName: "카테고리3", width: 200, resizable: true },
        { field: "category4.name", headerName: "카테고리4", width: 200, resizable: true },
    ]);

    const paginationNumberFormatter = useCallback((params: any) => {
        return "[" + params.value.toLocaleString() + "]";
    }, []);

    const onGridReady = async (params?: any) => {
        try {
            const db = await axios.post("/smartstore/home/product", token, { withCredentials: true });
            console.log(db.data.productList);
            setRowData(db.data.productList);
            props.setProductTotal && props.setProductTotal(db.data.productList.length);
        } catch (err) {
            console.log(err);
        }
    };

    // const onFirstDataRendered = useCallback((params: any) => {
    //   gridRef.current.api.paginationGoToPage(4);
    // }, []);

    const onPageSizeChanged = useCallback(() => {
        var value = (document.getElementById("page-size") as HTMLInputElement).value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    const onSelectionChanged = () => {
        setSelectedRows(gridRef.current.api.getSelectedRows());
    };

    const [inputClickNumber, setInputClickNumber] = useState(0);
    const [inputClick, setInputClick] = useState(false);

    // 선택삭제 버튼을 눌렀을때
    const selectedDelete = (e: any) => {
        if (!selectedRows[0]) {
            setUnselectedErr("삭제할 상품을 선택 해주세요.");
        } else {
            setUnselectedErr("");
            setDeleteAgreeModal(true);
        }
    };

    // 선택삭제 모달안에 input의 border-active 컨트롤
    useEffect(() => {
        const clickOutside = (e: any) => {
            // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
            // useRef의 current 값은 선택한 DOM을 말함.
            // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.
            if (inputClick && dropmenu.current && dropmenu.current.contains(e.target)) {
                setInputClick(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [inputClick]);

    const [deleteAgreeModal, setDeleteAgreeModal] = useState(false);
    const [deleteAgreeValue, setDeleteAgreeValue] = useState("");
    const [deleteAgreeErr, setDeleteAgreeErr] = useState("");
    const [unselectedErr, setUnselectedErr] = useState("");
    const dropmenu = useRef<HTMLDivElement>(null);

    // 삭제 버튼
    const deleteBtn = async (e: any) => {
        if (deleteAgreeValue !== "삭제") {
            setDeleteAgreeErr("정확히 입력 해주세요.");
            return;
        }

        await selectedRows.forEach((list: any, index: any) => {
            try {
                axios.post(`/smartstore/home/product/${list._id}/delete`, { withCredentials: true });
                setDeleteAgreeModal(false);
                window.location.reload();
            } catch (errors) {
                console.log(errors);
            }
        });
    };

    const deleteOnChange = (e: any) => {
        setDeleteAgreeValue(e.target.value);
        setDeleteAgreeErr("");
    };

    // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
    useEffect(() => {
        const clickOutside = (e: any) => {
            // useRef의 current 값은 선택한 DOM을 말함.
            // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

            if (deleteAgreeModal && dropmenu.current && !dropmenu.current.contains(e.target)) {
                setDeleteAgreeModal(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [deleteAgreeModal]);

    return (
        <>
            <div className="flex flex-ju-bt flex-align-center">
                <div className="left">
                    <button className="delete-btn" onClick={selectedDelete}>
                        <span>선택삭제</span>
                    </button>
                    <span className="unselectedErr">{unselectedErr}</span>
                    <div className={deleteAgreeModal ? "delete-agree show" : "delete-agree"} ref={dropmenu}>
                        <span>
                            상품을 삭제하시겠습니까? <br></br>삭제를 원하신다면 <strong>'삭제'</strong> 를 입력 해주세요.
                        </span>
                        <div id={inputClick ? "input-inner-active" : "input-inner"}>
                            <input
                                type="text"
                                placeholder=""
                                className="input"
                                onClick={() => {
                                    setInputClick(true);
                                }}
                                onChange={deleteOnChange}
                            />
                        </div>
                        <span className="err">{deleteAgreeErr}</span>
                        <button className="delete-btn" onClick={deleteBtn}>
                            <span>확인</span>
                        </button>
                    </div>
                </div>
                <div className="right">
                    <span>페이지 노출 </span>
                    <select onChange={onPageSizeChanged} id="page-size">
                        <option value="10" selected={true}>
                            10
                        </option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select>
                </div>
            </div>

            <div style={{ height: "400px", width: "100%", marginTop: "10px" }} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    // autoGroupColumnDef={autoGroupColumnDef}
                    // defaultColDef={defaultColDef}
                    // suppressRowClickSelection={true}
                    // groupSelectsChildren={true}
                    rowSelection={"multiple"}
                    // rowGroupPanelShow={'always'}
                    // pivotPanelShow={'always'}
                    onSelectionChanged={onSelectionChanged}
                    pagination={true}
                    paginationPageSize={10}
                    paginationNumberFormatter={paginationNumberFormatter}
                    onGridReady={onGridReady}
                    // onFirstDataRendered={onFirstDataRendered}
                    onCellClicked={(params: any) => {
                        // console.log(params)
                        //   const URL = params.data._id;
                        //   setModifyURL(URL)
                        // console.log(modifyURL)
                        // if (params.column.colId === "deleteBtn"){
                        //   let action = params.event.target.dataset.action;
                        //   console.log(action)
                        //     const selectedData = [params.node.data];
                        //     const remove = rowData.filter((list:any, index:any) => (!selectedData.includes(list)));
                        //     props.setOptionResult(remove)
                        //     const newInput = remove.map((list:any) => list.optionValue )
                        //     props.setOptionValue(newInput);
                        //   }
                    }}
                ></AgGridReact>
            </div>
        </>
    );
}

export default TableProductList;
