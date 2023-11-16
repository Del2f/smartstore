import axios from "../../api/axios";
import { useCallback, useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";
import { Advertise } from "../../pages/adminPage/Category";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableProductList.scss";

type Props = {
  isAdvertise?: boolean;
  setProductTotal?: Dispatch<SetStateAction<number>>;
  setSelectedProductList?: Dispatch<any>;
  selectedAdvertise?: Advertise[];
  adProduct?: React.Dispatch<any>;
  setAdProduct?: React.Dispatch<any>;
};

function TableProductList(props: Props) {
  const token = useSelector(selectToken);
  const [rowData, setRowData] = useState<any>();

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [inputClick, setInputClick] = useState(false);

  const [deleteAgreeModal, setDeleteAgreeModal] = useState(false);
  const [deleteAgreeValue, setDeleteAgreeValue] = useState("");
  const [deleteAgreeErr, setDeleteAgreeErr] = useState("");
  const [unselectedErr, setUnselectedErr] = useState("");

  const gridRef = useRef<any>();
  const dropmenu = useRef<HTMLDivElement>(null);

  const [columnDefs] = useState([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: true },
    {
      headerName: "메인사진",
      width: 100,
      resizable: false,
      cellRendererFramework: (params: any) => {
        return (
          <div className="edit flex flex-ju-center flex-align-center">
            <img src={params.data.mainImage[0]} style={{ width: "50px" }}></img>
          </div>
        );
      },
    },
    {
      headerName: "수정",
      width: 80,
      resizable: false,
      cellRendererFramework: (params: any) => {
        return (
          <Link to={params.data._id} style={{ display: "flex", alignItems: "center" }}>
            <button className="editBtn" data-action="edit">
              <span>수정</span>
            </button>
          </Link>
        );
      },
    },
    { field: "_id", headerName: "상품코드", width: 100, resizable: true },
    { field: "name", headerName: "상품명", width: 150, resizable: true },
    { field: "subtitle", headerName: "부제목", width: 150, resizable: true },
    { field: "price", headerName: "가격", width: 100, resizable: true },
    { field: "delivery", headerName: "배송비", width: 100, resizable: true },
    { field: "url", headerName: "URL", width: 150, resizable: true },
  ]);

  const [category] = useState([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: true },
    {
      headerName: "메인사진",
      width: 100,
      resizable: false,
      cellRendererFramework: (params: any) => {
        return (
          <div className="edit flex flex-ju-center flex-align-center">
            <img src={params.data.mainImage[0]} style={{ width: "50px" }}></img>
          </div>
        );
      },
    },
    { field: "name", headerName: "상품명", width: 150, resizable: true },
    { field: "_id", headerName: "상품코드", width: 100, resizable: true },
    { field: "price", headerName: "가격", width: 100, resizable: true },
    { field: "delivery", headerName: "배송비", width: 70, resizable: true },
    { field: "url", headerName: "URL", width: 70, resizable: true },
  ]);

  const [advertise] = useState([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: false },
    {
      headerName: "메인사진",
      width: 100,
      resizable: false,
      cellRendererFramework: (params: any) => {
        return (
          <div className="edit flex flex-ju-center flex-align-center">
            <img src={params.data.mainImage[0]} style={{ width: "50px" }}></img>
          </div>
        );
      },
    },
    { field: "name", headerName: "상품명", width: 150, resizable: true },
    { field: "_id", headerName: "상품코드", width: 100, resizable: true },
    { field: "price", headerName: "가격", width: 100, resizable: true },
    { field: "delivery", headerName: "배송비", width: 70, resizable: true },
    { field: "url", headerName: "URL", width: 70, resizable: true },
  ]);

  const paginationNumberFormatter = useCallback((params: any) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);

  const onGridReady = async (params?: any) => {
    try {
      const res = await axios.post("/smartstore/home/product", token, { withCredentials: true });
      console.log(res.data);

      setRowData(res.data.productList);
      props.setProductTotal && props.setProductTotal(res.data.productList.length);
    } catch (err) {
      console.log(err);
    }
  };

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement).value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onSelectionChanged = () => {
    setSelectedRows(gridRef.current.api.getSelectedRows());

    props.setSelectedProductList && props.setSelectedProductList(gridRef.current.api.getSelectedRows());
  };

  // 선택삭제 버튼을 눌렀을때
  const selectedDelete = (e: any) => {
    if (!selectedRows[0]) {
      setUnselectedErr("삭제할 상품을 선택 해주세요.");
    } else {
      setUnselectedErr("");
      setDeleteAgreeModal(true);
    }
  };

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

  // 카테고리에 등록된 광고의 product._id를 Product에서 검색후 해당하는 상품을 선택합니다.
  useEffect(() => {
    console.log('tableproductlist adproduct')

    if(rowData && props.selectedAdvertise?.[0]){
      console.log('등록')
      const test = rowData?.filter((list: any) => list._id === props.selectedAdvertise?.[0].product_id);
      props.setSelectedProductList && props.setSelectedProductList(test);
      props.setAdProduct && props.setAdProduct(test);
    }
    // setSelectedRows(test);
  }, [rowData && props.selectedAdvertise]);

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
  

  // 초기화
  // useEffect(() => {
  //   const clearSelection = () => {
  //     setSelectedRows([]);
  //     if (selectedRows.length >= 1) {
  //       gridRef.current.api.deselectAll();
  //     }
  //   };
  //   clearSelection();
  // }, [props.isAdvertise, props.adProduct]);

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
      {props.isAdvertise ? (
        <div className="tableright">
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
      ) : (
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
          <div className="tableright">
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
      )}
      <div style={{ height: "500px", marginTop: "10px", borderRadius: "20px" }} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={props.isAdvertise ? advertise : columnDefs}
          rowSelection={props.isAdvertise ? "single" : "multiple"}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={10}
          paginationNumberFormatter={paginationNumberFormatter}
          onGridReady={onGridReady}
          onCellClicked={(params: any) => {}}
        ></AgGridReact>
      </div>
    </>
  );
}

export default TableProductList;
