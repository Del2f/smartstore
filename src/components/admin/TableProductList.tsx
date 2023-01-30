import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import axios from "../../api/axios";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './TableProductList.scss';

// var checkboxSelection = function (params: any) {
//   // we put checkbox on the name if we are not doing grouping
//   return params.columnApi.getRowGroupColumns().length === 0;
// };

// var headerCheckboxSelection = function (params: any) {
//   // we put checkbox on the name if we are not doing grouping
//   return params.columnApi.getRowGroupColumns().length === 0;
// };

function TableProductList(){

  const gridRef = useRef<any>();

  // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [rowData, setRowData] = useState();
  const [modifyURL, setModifyURL] = useState<any>();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  console.log(selectedRows)

  const [columnDefs] = useState([
    { width: 100, checkboxSelection: true, headerCheckboxSelection: true, resizable: true },
    { headerName: "수정", width: 80, resizable: false, cellRendererFramework:(params:any) => {
      return (
        <div className="edit">
          <Link to={params.data._id}>
            <button className="editBtn flex flex-align-center" data-action="edit">
              <span>
                수정
              </span>
            </button>
          </Link>
        </div>
      )
    }
    },
    { field: "_id", headerName: "id", width: 200, resizable: true },
    { field: "name", headerName: "상품명", width: 200, resizable: true },
    { field: "price", headerName: "가격", width: 200, resizable: true },
    // { field: "option", headerName: "옵션", width: 200, resizable: true },
    { field: "delivery", headerName: "배송비", width: 200, resizable: true },
    { field: "category1.name", headerName: "카테고리1", width: 250, resizable: true },
    { field: "category2.name", headerName: "카테고리2", width: 200, resizable: true },
    { field: "category3.name",headerName: "카테고리3", width: 200, resizable: true },
    { field: "category4.name", headerName: "카테고리4", width: 200, resizable: true },
]);

  // const autoGroupColumnDef = useMemo(() => {
  //   return {
  //     headerName: 'Group',
  //     minWidth: 170,
  //     field: 'athlete',
  //     valueGetter: (params: any) => {
  //       if (params.node.group) {
  //         return params.node.key;
  //       } else {
  //         return params.data[params.colDef.field];
  //       }
  //     },
  //     headerCheckboxSelection: true,
  //     cellRenderer: 'agGroupCellRenderer',
  //     cellRendererParams: {
  //       checkbox: true,
  //     },
  //   };
  // }, []);

  // const defaultColDef = useMemo(() => {
  //   return {
  //     editable: true,
  //     enableRowGroup: true,
  //     enablePivot: true,
  //     enableValue: true,
  //     sortable: true,
  //     resizable: true,
  //     filter: true,
  //     flex: 1,
  //     minWidth: 100,
  //   };
  // }, []);

  const paginationNumberFormatter = useCallback((params: any) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const onGridReady = async (params?: any) => {
    // 
    try {
        const db = await axios.get( "/smartstore/home/product")
        console.log(db)
        setRowData(db.data.productList)
      } catch (err) {
          console.log(err)
      }
  };

  // const onFirstDataRendered = useCallback((params: any) => {
  //   gridRef.current.api.paginationGoToPage(4);
  // }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onSelectionChanged = () => {
    setSelectedRows(gridRef.current.api.getSelectedRows());
  }

  // 삭제 버튼
  const deleteBtn = async (e: any) => {
    console.log('삭제 버튼')
    await selectedRows.forEach((list:any, index:any) => {
      try {
        axios.post(`/smartstore/home/product/${list._id}/delete`, { withCredentials: true })
      } catch (errors) {
        console.log(errors)
      }
    })
    // const db = await axios.get( "/smartstore/home/product")
    // console.log(db)
    // setRowData(db.data.productList)
  };

  return (
    <>
          <div className="product-top flex flex-ju-bt flex-align-center">
            <div className='left'>
              <button className="delete-btn" onClick={deleteBtn}>
                <span>선택삭제</span>
              </button>
            </div>
            <div className='right'>
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

          <div style={{ height: "400px", width: "100%" }} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              // autoGroupColumnDef={autoGroupColumnDef}
              // defaultColDef={defaultColDef}
              // suppressRowClickSelection={true}
              // groupSelectsChildren={true}
              rowSelection={'multiple'}
              // rowGroupPanelShow={'always'}
              // pivotPanelShow={'always'}
              onSelectionChanged={onSelectionChanged}
              pagination={true}
              paginationPageSize={10}
              paginationNumberFormatter={paginationNumberFormatter}
              onGridReady={onGridReady}
              // onFirstDataRendered={onFirstDataRendered}
              onCellClicked={(params:any) => {
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
};

export default TableProductList;