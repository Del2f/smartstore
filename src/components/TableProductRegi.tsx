    import { useState, useEffect, useCallback } from "react";
    import { AgGridReact } from "ag-grid-react";
    import "ag-grid-community/dist/styles/ag-grid.css";
    import "ag-grid-community/dist/styles/ag-theme-alpine.css";
    import "./TableProductRegi.scss";

    type Props = {
    optionResult?: any;
    setOptionResult?: any;
    optionSubmit?: any;
    OptionPrice?: any;
    setOptionValue?: any;
    setOptionPrice?: any;
    gridOptions?: any;
    };

    function TableProductRegi(props: Props) {
      const [gridApi, setGridApi] = useState<any>(null);
      const rowData = [...props.optionResult];
      // const [rowData, setRowData] = useState<any>(props.optionResult);
      
      useEffect(() => {
        console.log(rowData)
      },[rowData])

      const [selectedRows, setSelectedRows] = useState<any>([]);

      const [columnDefs] = useState([
          { headerName: "id", width: 70, checkboxSelection: true, headerCheckboxSelection: true },
          { field: "optionValue", headerName: "옵션명", width: 200, editable: true },
          { field: "optionPrice", headerName: "옵션가", width: 150, editable: true, },
          { field: "optionStock",headerName: "재고수량", width: 150, editable: true },
          { field: "optionStatus", headerName: "판매상태", width: 150, editable: true },
          { field: "optionUse", headerName: "사용여부", width: 150, editable: true },
          { field: "deleteBtn", headerName: "삭제", width: 150, cellRendererFramework:() => <div className="delete-btn-wrap"><button className="delete-btn flex flex-align-center" data-action="delete">삭제</button></div> },
      ]);

    const [ optionPrice, setOptionPrice ] = useState(0);
    console.log('옵션가'+optionPrice)
    const [ optionStock, setOptionStock ] = useState(0);
    console.log('재고수량'+optionStock)
    
    const [ optionStatus, setOptionStatus ] = useState(false);
    const [ optionStatusText, setOptionStatusText ] = useState('');
    console.log('판매상태'+optionStatus)
    
    const [ optionUse, setOptionUse ] = useState(false);
    const [ optionUseText, setOptionUseText ] = useState('');
    console.log('판매상태'+optionUse)

    useEffect(() => {
      optionStock >= 1 ? setOptionStatus(true) : setOptionStatus(false)
    },[optionStock])

    useEffect(() => {
      optionUse == true ? setOptionUseText('Y') : setOptionUseText('N')
    },[optionUse])

    useEffect(() => {
      optionStatus == true ? setOptionStatusText('판매') : setOptionStatusText('품절')
    },[optionStatus])

    // useEffect(() => {
    //   if(optionStock > 1) {
    //     setOptionStatus(true)
    //   }
    // },[])
    
    const onUpdateClick = (params: any) => {
        const newInput = rowData.map((list:any) => list.optionValue )
        props.setOptionValue(newInput);
    };

    const onUpdateBtn = () => {
      const test = selectedRows.map((list:any) => {
        list.optionPrice = optionPrice
        list.optionStock = optionStock
        list.optionStatus = optionStatusText
        list.optionUse = optionUseText
      })
    };

    const onSelectionChanged = () => {
        setSelectedRows(gridApi.getSelectedRows());
    }

    const onDeleteBtn = (params:any) => {
      const selectedData = gridApi.getSelectedRows();
      const data = gridApi.updateRowData({remove: selectedData});
      const remove = rowData.filter((list:any, index:any) => (!selectedData.includes(list)));
      props.setOptionResult(remove)
      const newInput = remove.map((list:any) => list.optionValue )
      props.setOptionValue(newInput);
    }

    const onChangePrice = (e: any) => {
        setOptionPrice(e.target.value)
    }

    const onChangeStock = (e: any) => {
        setOptionStock(e.target.value)
    }

    const onChangeUse = (e: any) => {
        setOptionUse((e) => !e)
    }

    // const getAllRows = () => {
    //   let rowData = [];
    //   gridApi.forEachNode((node:any) => rowData.push(node.data));
    //   return rowData;
    // }

  return (
    <>
        <div className="top flex flex-ju-bt flex-align-center">
          <button className="delete-btn" onClick={onDeleteBtn}>
            <span>선택삭제</span>
          </button>
          <div className="menu-bottom-right flex">
            <div className="option-price">
              <span>옵션가</span>
              <input type="text" value={optionPrice} onChange={onChangePrice}/>
            </div>
            <div className="option-stock">
              <span>재고수량</span>
              <input type="text" value={optionStock} onChange={onChangeStock}/>
            </div>
            <div className="option-use">
              <span>사용여부</span>
              <input type="checkbox" onChange={onChangeUse}/>
            </div>
            <button className="selected-modify-btn" onClick={onUpdateBtn}>
              <span>선택목록 일괄수정</span>
            </button>
          </div>
        </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          onGridReady={params => setGridApi(params.api)}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onCellEditingStopped={onUpdateClick}
          onSelectionChanged={onSelectionChanged}
          onCellClicked={(params:any) => {
            console.log(params)
            if (params.column.colId === "deleteBtn"){
              let action = params.event.target.dataset.action;
              console.log(action)
              if(action === "delete"){
                const selectedData = [params.node.data];
                const remove = rowData.filter((list:any, index:any) => (!selectedData.includes(list)));
                props.setOptionResult(remove)
                const newInput = remove.map((list:any) => list.optionValue )
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
