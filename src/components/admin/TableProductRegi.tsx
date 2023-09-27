import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./TableProductRegi.scss";

import $ from "jquery";

type Props = {
  optionResult?: any;
  optionSubmit?: any;
  OptionPrice?: any;
  setOptionResult?: any;
  setOptionValue?: any;
  setOptionPrice?: any;
  gridOptions?: any;
  OptionAdd: number;
};

function TableProductRegi(props: Props) {
  const rowData = [...props.optionResult];
  const [gridApi, setGridApi] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  console.log(selectedRows);
  const selectedID = selectedRows.map((list: any, index: any) => {
    return list.id;
  });

  const [columnDefs, setColumnDefs] = useState<any>([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: true, resizable: false },
    // { field: "optionValue", headerName: "옵션명", width: 250, editable: true, resizable: true },
    { field: "optionPrice", headerName: "옵션가", width: 200, editable: true, resizable: true },
    { field: "optionStock", headerName: "재고수량", width: 200, editable: true, resizable: true },
    { field: "optionStatus", headerName: "판매상태", width: 200, resizable: true },
    { field: "optionUse", headerName: "사용여부", width: 200, editable: true, resizable: true },
    {
      field: "deleteBtn",
      headerName: "삭제",
      width: 200,
      resizable: false,
      cellRendererFramework: () => (
        <div className="delete-btn-wrap">
          <button className="delete-btn flex flex-align-center" data-action="delete">
            삭제
          </button>
        </div>
      ),
    },
  ]);

useEffect(() => {
  setColumnDefs(prevDefs => {
    // 먼저 현재 columnDefs에서 optionValue1과 optionValue2를 제거합니다.
    const filteredDefs = prevDefs.filter(def => def.field !== "optionValue1" && def.field !== "optionValue2" && def.field !== "optionValue3" && def.field !== "optionValue4" && def.field !== "optionValue5");

    // OptionAdd 값에 따라 필드를 추가합니다.
    if (props.OptionAdd === 0) {
      return [
        filteredDefs[0], // 첫 번째 요소 유지
        { field: "optionValue1", headerName: "옵션명", width: 250, editable: true, resizable: true },
        ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      ];
    } else if (props.OptionAdd === 1) {
      return [
        filteredDefs[0], // 첫 번째 요소 유지
        { field: "optionValue1", headerName: "옵션명", width: 250, editable: true, resizable: true },
        { field: "optionValue2", headerName: "옵션명2", width: 250, editable: true, resizable: true },
        ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      ];
    } else if (props.OptionAdd === 2) {
      return [
        filteredDefs[0], // 첫 번째 요소 유지
        { field: "optionValue1", headerName: "옵션명", width: 250, editable: true, resizable: true },
        { field: "optionValue2", headerName: "옵션명2", width: 250, editable: true, resizable: true },
        { field: "optionValue3", headerName: "옵션명3", width: 250, editable: true, resizable: true },
        ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      ];
    } else if (props.OptionAdd === 3) {
      return [
        filteredDefs[0], // 첫 번째 요소 유지
        { field: "optionValue1", headerName: "옵션명", width: 250, editable: true, resizable: true },
        { field: "optionValue2", headerName: "옵션명2", width: 250, editable: true, resizable: true },
        { field: "optionValue3", headerName: "옵션명3", width: 250, editable: true, resizable: true },
        { field: "optionValue4", headerName: "옵션명4", width: 250, editable: true, resizable: true },
        ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      ];
    } else if (props.OptionAdd === 4) {
      return [
        filteredDefs[0], // 첫 번째 요소 유지
        { field: "optionValue1", headerName: "옵션명", width: 250, editable: true, resizable: true },
        { field: "optionValue2", headerName: "옵션명2", width: 250, editable: true, resizable: true },
        { field: "optionValue3", headerName: "옵션명3", width: 250, editable: true, resizable: true },
        { field: "optionValue4", headerName: "옵션명4", width: 250, editable: true, resizable: true },
        { field: "optionValue5", headerName: "옵션명5", width: 250, editable: true, resizable: true },
        ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      ];
    } else {
      return;
    }
  });
}, [props.OptionAdd]);

  const [optionPriceValue, setOptionPriceValue] = useState(0);
  const [optionStockValue, setOptionStockValue] = useState(0);
  const [optionStatusValue, setOptionStatusValue] = useState(" 절");
  const [optionUseValue, setOptionUseValue] = useState(true);

  const [showdropmenu, setShowdropmenu] = useState(false);
  const dropmenu = useRef<HTMLDivElement>(null);

  const onCellEditingStopped = (params: any) => {
    // 셀 수정 즉시 새 데이터를 반환합니다.
    const cellEditData: string[] = [];
    gridApi.forEachNode((node: any) => {
      cellEditData.push(node.data);
    });

    // const copy = [...rowData]
    const test = cellEditData.map((list: any) => (list.optionStock > 0 ? { ...list, optionStatus: "판매" } : { ...list, optionStatus: "품절" }));

    props.setOptionResult(test);
  };

  // 2023-01-10 드디어 해결한 옵션.
  // 선택목록 일괄 수정을 눌렀을때 체크된 row만 값이 변하는 코드.
  const onUpdateBtn = () => {
    const copy = [...rowData];

    const copy2 = copy.map((list: any, index: any) =>
    selectedID.includes(list.id)
        ? {
            ...list,
            optionPrice: optionPriceValue,
            optionStock: optionStockValue,
            optionStatus: optionStockValue > 0 ? "판매" : "품절",
            optionUse: optionUseValue ? "Y" : "N",
          }
        : { ...list }
    );
    console.log(copy2)
    props.setOptionResult(copy2);
  };

  const onSelectionChanged = () => {
    setSelectedRows(gridApi.getSelectedRows());
  };

  const onDeleteBtn = (params: any) => {
    const selectedData = gridApi.getSelectedRows();
    const data = gridApi.updateRowData({ remove: selectedData });
    const remove = rowData.filter((list: any, index: any) => !selectedData.includes(list));
    props.setOptionResult(remove);
    const newInput = remove.map((list: any) => list.optionValue);
    props.setOptionValue(newInput);
  };

  const onChangePrice = (e: any) => {
    setOptionPriceValue(e.target.value);
  };

  const onChangeStock = (e: any) => {
    setOptionStockValue(e.target.value);
  };

  // 사용여부 Y/N 인풋
  const menuChange = (e: any) => {
    if (e.target.innerHTML == "Y") {
      setOptionUseValue(true);
    } else {
      setOptionUseValue(false);
    }

    $(".option").removeClass("selected");
    $(e.target).addClass("selected");

    const clone = $(e.target).clone();

    $(".selectize-input").empty();
    $(".selectize-input").append(clone);
    $(".selectize-input").children(".option").attr("class", "item");

    setShowdropmenu(false);
  };

  // 메뉴 파트1 옵션 마우스 올렸을때
  useEffect(() => {
    showdropmenu == false
      ? $(".selectize-dropdown-content").children(".option").removeClass("active")
      : $(".selectize-dropdown-content").children(".selected").addClass("active");

    $(".selectize-dropdown-content").on("mouseover", function (e) {
      $(".option").removeClass("active");
      $(e.target).addClass("active");
    });
  });

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
        setShowdropmenu(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showdropmenu]);

  return (
    <>
      <div className="top flex flex-ju-bt flex-align-center">
        <button className="delete-btn" onClick={onDeleteBtn}>
          <span>선택삭제</span>
        </button>
        <div className="menu-bottom-right flex">
          <div className="option-price">
            <span>옵션가</span>
            <input type="text" className="option-input" value={optionPriceValue} onChange={onChangePrice} />
          </div>
          <div className="option-stock">
            <span>재고수량</span>
            <input type="text" className="option-input" value={optionStockValue} onChange={onChangeStock} />
          </div>
          <div className="option-use">
            <span>사용여부</span>
            <ul className="usebox">
              <div className="selectize-control" ref={dropmenu}>
                <div className={showdropmenu ? "selectize-input check" : "selectize-input"} onClick={() => setShowdropmenu((e) => !e)}>
                  <div className="item">Y</div>
                </div>
                <div className={showdropmenu ? "selectize-dropdown dropdown-active" : "selectize-dropdown"}>
                  <div className="selectize-dropdown-content">
                    <div className="option selected" onClick={menuChange}>
                      Y
                    </div>
                    <div className="option" onClick={menuChange}>
                      N
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <button className="selected-modify-btn" onClick={onUpdateBtn}>
            <span>선택목록 일괄수정</span>
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
        <AgGridReact
          onGridReady={(params) => {
            setGridApi(params.api);
          }}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={true}
          onCellEditingStopped={onCellEditingStopped}
          onSelectionChanged={onSelectionChanged}
          onCellClicked={(params: any) => {
            if (params.column.colId === "deleteBtn") {
              let action = params.event.target.dataset.action;
              if (action === "delete") {
                const selectedData = [params.node.data];
                const remove = rowData.filter((list: any, index: any) => !selectedData.includes(list));
                props.setOptionResult(remove);
                const newInput = remove.map((list: any) => list.optionValue);
                props.setOptionValue(newInput);
              }
            }
          }}
        ></AgGridReact>
      </div>
    </>
  );
}

export default TableProductRegi;
