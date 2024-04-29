import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";

import Checkbox from "../CheckBox";
import { AG_GRID_LOCALE_KO } from "../../api/locale.ko";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the grid
import "./TableProductRegi.scss";

import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { options } from "../../pages/adminPage/ProductRegister";

type Props = {
  optionResult?: any;
  optionSubmit?: any;
  OptionPrice?: any;
  setOptionResult?: any;
  setOptionValue?: any;
  setOptionPrice?: any;
  gridOptions?: any;
  options: options[];
  isEdit: boolean;
};

const Select = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: #525252;
  border: 1px solid #dbdde2;
  user-select: none;
  font-weight: 700;
  margin-right: -1px;
`;

interface pricetype {
  priceTypeShow: boolean;
}

const Selector = styled.div<pricetype>`
  position: absolute;
  top: 35px;
  z-index: 1;
  width: 30px;
  color: #525252;
  border: 1px solid #dbdde2;
  background-color: white;
  user-select: none;
  font-weight: 700;

  ${(props) =>
    props.priceTypeShow
      ? `
    display: block;
    
  `
      : `
    display: none;
  `}
`;
const List = styled.li`
  text-align: center;
  padding: 5px 0;

  &:hover {
    background-color: #e7e7e7;
  }
`;

function TableProductRegi(props: Props) {

  const [rowData, setRowData] = useState<any>();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedID, setSelectedID] = useState<string[]>([]);
  const [priceTypeSelect, setPriceTypeSelect] = useState<string>("+");
  const [priceTypeSelector, setPriceTypeSelector] = useState<string[]>(["+", "-", "="]);
  const [priceTypeShow, setPriceTypeShow] = useState<boolean>(false);

  const [isOptionPriceCheckBox, setIsOptionPriceCheckBox] = useState<boolean>(true);
  const [isOptionStockCheckBox, setIsOptionStockCheckBox] = useState<boolean>(true);
  const [isOptionUseCheckBox, setIsOptionUseCheckBox] = useState<boolean>(true);

  useEffect(() => {
    const selectedID = selectedRows.map((list: any) => list.id);
    setSelectedID(selectedID);
  }, [selectedRows]);

  const [columnDefs, setColumnDefs] = useState<any>([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, resizable: false },
    // { field: "optionValue", headerName: "옵션명", width: 250, editable: true, resizable: true },
    { field: "optionPrice", headerName: "옵션가", width: 100, editable: true, resizable: true },
    { field: "optionStock", headerName: "재고수량", width: 100, editable: true, resizable: true },
    { field: "optionStatus", headerName: "판매상태", width: 100, resizable: true },
    { field: "optionUse", headerName: "사용여부", width: 100, editable: true, resizable: true },
    {
      field: "deleteBtn",
      headerName: "삭제",
      width: 100,
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

  // console.log(props.optionResult);
  // console.log(props.options.length);

  // 옵션 슬롯을 추가할때마다 Table에 optionValue 슬롯을 추가합니다.
  // [옵션 목록으로 적용]을 눌러 props.optionResult가 최신화 될 경우에만 슬롯이 늘어납니다.
  useEffect(() => {
    setRowData(props.optionResult);
    setColumnDefs((prevDefs) => {
      const filteredDefs = prevDefs.filter(
        (def) =>
          def.field !== "optionValue1" &&
          def.field !== "optionValue2" &&
          def.field !== "optionValue3" &&
          def.field !== "optionValue4" &&
          def.field !== "optionValue5" &&
          def.field !== "optionValue6"
      );

      // if (props.options.length === 0) {
      //   return [
      //     filteredDefs[0], // 첫 번째 요소 유지
      //     { field: "옵션명", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
      //     ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
      //   ];
      // }

      // OptionType 값에 따라 필드를 추가합니다.
      if (props.options.length === 1) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1 ? props.optionResult[0]?.optionName1 : "옵션명", width: 100, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else if (props.options.length === 2) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
          { field: "optionValue2", headerName: props.optionResult[0]?.optionName2, width: 250, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else if (props.options.length === 3) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
          { field: "optionValue2", headerName: props.optionResult[0]?.optionName2, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue3", headerName: props.optionResult[0]?.optionName3, width: 250, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else if (props.options.length === 4) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
          { field: "optionValue2", headerName: props.optionResult[0]?.optionName2, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue3", headerName: props.optionResult[0]?.optionName3, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue4", headerName: props.optionResult[0]?.optionName4, width: 250, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else if (props.options.length === 5) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
          { field: "optionValue2", headerName: props.optionResult[0]?.optionName2, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue3", headerName: props.optionResult[0]?.optionName3, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue4", headerName: props.optionResult[0]?.optionName4, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue5", headerName: props.optionResult[0]?.optionName5, width: 250, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else if (props.options.length === 6) {
        return [
          filteredDefs[0], // 첫 번째 요소 유지
          { field: "optionValue1", headerName: props.optionResult[0]?.optionName1, width: 100, editable: true, resizable: true, filter: true },
          { field: "optionValue2", headerName: props.optionResult[0]?.optionName2, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue3", headerName: props.optionResult[0]?.optionName3, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue4", headerName: props.optionResult[0]?.optionName4, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue5", headerName: props.optionResult[0]?.optionName5, width: 250, editable: true, resizable: true, filter: true },
          { field: "optionValue6", headerName: props.optionResult[0]?.optionName6, width: 250, editable: true, resizable: true, filter: true },
          ...filteredDefs.slice(1), // 첫 번째 요소 이후의 요소들을 그대로 유지
        ];
      } else {
        return;
      }

    });
  }, [props.optionResult]);

  const [optionPriceValue, setOptionPriceValue] = useState<any>(0);
  const [optionStockValue, setOptionStockValue] = useState<any>(0);
  const [optionUseValue, setOptionUseValue] = useState<Boolean>(true);

  const [showdropmenu, setShowdropmenu] = useState<Boolean>(false);

  const gridRef = useRef<any>();
  const dropmenu = useRef<HTMLDivElement>(null);
  const pricedropmenu = useRef<HTMLDivElement>(null);

  // ag-grid 한글화
  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_KO;
  }, []);

  // ag-grid bottom 디자인 변경
  const slash = document.getElementById("ag-79-of-page");
  if (slash) {
    slash.textContent = "/"; // 페이지 1 의 10 => 페이지 1 / 10
  }

  const slash2 = document.getElementById("ag-79-of");
  if (slash2) {
    slash2.textContent = "/"; // 1 의 10 => 페이지 10 / 100
  }

  const to = document.getElementById("ag-79-to");
  if (to) {
    to.textContent = "-"; // 1 의 10 => 페이지 10 / 100
  }

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement).value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onCellEditingStopped = (params: any) => {
    // 셀 수정 즉시 새 데이터를 반환합니다.
    const cellEditData: string[] = [];
    gridRef.current.api.forEachNode((node: any) => {
      cellEditData.push(node.data);
    });

    const test = cellEditData.map((list: any) => (list.optionStock > 0 ? { ...list, optionStatus: "판매" } : { ...list, optionStatus: "품절" }));
    props.setOptionResult(test);
  };

  const onSelectionChanged = () => {
    // setSelectedRows(gridRef.current.api.getSelectedRows());
    const selectedRows = gridRef.current.api.getSelectedRows();
    const currentPageRows = gridRef.current.api.getRenderedNodes().map(node => node.data);
    const selectedRowsInCurrentPage = selectedRows.filter(row => currentPageRows.includes(row));
    setSelectedRows(selectedRowsInCurrentPage);
  };

  // 선택삭제
  const onDeleteBtn = (params: any) => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const remove = rowData.filter((list: any) => !selectedData.includes(list));
    props.setOptionResult(remove);
    const newInput = remove.map((list: any) => list.optionValue);
    props.setOptionValue(newInput);
    gridRef.current.api.setRowData(remove);
  };

  const priceTypeOnChange = (e: any) => {
    const select = e.currentTarget.innerHTML;
    setPriceTypeSelect(select);
  };

  // 옵션가
  const onChangePrice = (e: any) => {
    setOptionPriceValue(e.target.value);
  };

  // 재고 수량
  const onChangeStock = (e: any) => {
    setOptionStockValue(e.target.value);
  };

  // 사용여부 Y/N 인풋
  const onChangeUse = (e: any) => {
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

  const option = {
    CheckBoxPriceHandler: () => {
      console.log("CheckBoxPriceHandler");
      setIsOptionPriceCheckBox(!isOptionPriceCheckBox);
    },
    CheckBoxStockHandler: () => {
      console.log("CheckBoxStockHandler");
      setIsOptionStockCheckBox(!isOptionStockCheckBox);
    },
    CheckBoxUseHandler: () => {
      console.log("CheckBoxUseHandler");
      setIsOptionUseCheckBox(!isOptionUseCheckBox);
    },
  };

  // 2023-01-10 드디어 해결한 옵션.
  // 선택목록 일괄 수정을 눌렀을때 체크된 row만 값이 변하는 코드.
  
  const onUpdateBtn = () => {
    console.log("onUpdateBtn");
    const copy = [...rowData];

    const result = copy.map((list: any, index: any) => {
      if (selectedID.includes(list.id)) {
        let updatedOptionPrice = parseFloat(list.optionPrice);
        let updatedOptionStock = list.optionStock;
        let updatedOptionUse = list.optionUse;

        if (isOptionPriceCheckBox) {
          if (priceTypeSelect === "+") {
            updatedOptionPrice += parseFloat(optionPriceValue);
          } else if (priceTypeSelect === "-") {
            updatedOptionPrice -= parseFloat(optionPriceValue);
            if (updatedOptionPrice < 0) {
              updatedOptionPrice = 0;
            }
          } else if (priceTypeSelect === "=") {
            updatedOptionPrice = optionPriceValue;
          }
        }

        if (isOptionStockCheckBox) {
          updatedOptionStock = optionStockValue;
        }

        if (isOptionUseCheckBox) {
          updatedOptionUse = optionUseValue ? "Y" : "N";
        }

        return {
          ...list,
          optionPrice: updatedOptionPrice,
          optionStock: updatedOptionStock,
          optionStatus: updatedOptionStock > 0 ? "판매" : "품절",
          optionUse: updatedOptionUse,
        };
      } else {
        return { ...list };
      }
    });

    setSelectedRows([]);
    setSelectedID([]);
    console.log(result);
    props.setOptionResult(result);
  };

  // 메뉴 파트1 옵션 마우스 올렸을때
  // useEffect(() => {
  //   showdropmenu == false
  //     ? $(".selectize-dropdown-content").children(".option").removeClass("active")
  //     : $(".selectize-dropdown-content").children(".selected").addClass("active");

  //   $(".selectize-dropdown-content").on("mouseover", function (e) {
  //     $(".option").removeClass("active");
  //     $(e.target).addClass("active");
  //   });
  // });

  // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
  useEffect(() => {
    const clickOutside = (e: any) => {
      // useRef의 current 값은 선택한 DOM을 말함.
      // 드롭메뉴를 제외한 나머지 공간을 클릭하면 닫히게된다.

      if (showdropmenu && dropmenu.current && !dropmenu.current.contains(e.target)) {
        setShowdropmenu(false);
      }
      if (priceTypeShow && pricedropmenu.current && !pricedropmenu.current.contains(e.target)) {
        setPriceTypeShow(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showdropmenu, priceTypeShow]);

  const onGridReady = (params: GridReadyEvent) => {
    gridRef.current.grid = params.api;
    gridRef.current.column = params.columnApi;
  };


  // 페이지 크기 커스텀
  const paginationPageSizeSelector = useMemo(() => {
    return [20, 50, 100, 500, 1000];
  }, []);
  return (
    <>
      <div className="top flex flex-ju-bt flex-align-center">
        <div className="menu-left">
          <span>옵션목록</span>
        </div>
        <div className="menu-bottom-right flex">
          <div className="option-price">
            <span>옵션가</span>
            <Select onClick={() => setPriceTypeShow(!priceTypeShow)}>
              {priceTypeSelect}
              <Selector priceTypeShow={priceTypeShow} ref={pricedropmenu}>
                {priceTypeSelector.map((list: any, index: number) => (
                  <List key={index} onClick={priceTypeOnChange}>
                    {list}
                  </List>
                ))}
              </Selector>
            </Select>
            <input type="text" className="option-input" value={optionPriceValue} onChange={onChangePrice} />
            <Checkbox checked={isOptionPriceCheckBox} onClick={option.CheckBoxPriceHandler} />
          </div>
          <div className="option-stock">
            <span>재고수량</span>
            <input type="text" className="option-input" value={optionStockValue} onChange={onChangeStock} />
            <Checkbox checked={isOptionStockCheckBox} onClick={option.CheckBoxStockHandler} />
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
                    <div className="option selected" onClick={onChangeUse}>
                      Y
                    </div>
                    <div className="option" onClick={onChangeUse}>
                      N
                    </div>
                  </div>
                </div>
              </div>
            </ul>
            <Checkbox checked={isOptionUseCheckBox} onClick={option.CheckBoxUseHandler} />
          </div>
          <button className="selected-modify-btn" onClick={onUpdateBtn}>
            <span>선택 수정</span>
          </button>
          <button className="delete-btn" onClick={onDeleteBtn}>
            <span>선택 삭제</span>
          </button>
        </div>
      </div>
      <div style={{ height: "600px", marginTop: "10px", borderRadius: "20px" }} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          localeText={localeText}
          // suppressHorizontalScroll={true}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          // rowMultiSelectWithClick={true}
          onCellEditingStopped={onCellEditingStopped}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={paginationPageSizeSelector}
          // onCellClicked={(params: any) => { 
          //   if (params.column.colId === "deleteBtn") {
          //     let action = params.event.target.dataset.action;
          //     if (action === "delete") {
          //       const selectedData = [params.node.data];
          //       const remove = rowData.filter((list: any, index: any) => !selectedData.includes(list));
          //       props.setOptionResult(remove);
          //       const newInput = remove.map((list: any) => list.optionValue);
          //       props.setOptionValue(newInput);
          //     }
          //   }
          // }}
          // onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
}

export default TableProductRegi;
