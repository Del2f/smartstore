import axios from "../../api/axios";
import { useCallback, useRef, useEffect, useState, Dispatch, SetStateAction, useMemo } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";
import { AG_GRID_LOCALE_KO } from "../../api/locale.ko";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TableProductList.scss";
import "./OrdersList.scss";


const Header = styled.div`
  display: flex;
  align-items: center;

  .cell {
    display: flex;
  }

  .error-wrap {
    display: inline;
    margin-left: 15px;
  }
`;

type Props = {
  type: number;
  isChangeModal: boolean;
  setIsChangeModal: React.Dispatch<SetStateAction<boolean>>;
  selectedRows: any;
  setSelectedRows?: any;
  rowData: any;
  setRowData: any;
};

function OrdersList({ type, isChangeModal, setIsChangeModal, selectedRows, setSelectedRows, rowData, setRowData }: Props) {
  const token = useSelector(selectToken);

  const [inputClick, setInputClick] = useState(false);

  const [deleteAgreeValue, setDeleteAgreeValue] = useState("");
  const [deleteAgreeErr, setDeleteAgreeErr] = useState("");
  const [unselectedErr, setUnselectedErr] = useState("");

  const gridRef = useRef<any>();
  const dropmenu = useRef<HTMLDivElement>(null);

  // console.log(rowData);
  console.log(selectedRows);

  const [columnDefs] = useState([
    { width: 50, checkboxSelection: true, headerCheckboxSelection: true },
    {
      headerName: "이름",
      width: 100,
      resizable: true,
      cellRenderer: (params: any) => {
        return (
          <div className="edit flex flex-ju-center flex-align-center">
            <span>{params.data.user.name}</span>
          </div>
        );
      },
    },
    {
      headerName: "상품명",
      width: 120,
      resizable: true,
      cellRenderer: (params: any) => {
        return <div className="cell">{params.data.orders[0].product.name}</div>;
      },
    },
    {
      headerName: "결제 금액",
      width: 120,
      resizable: true,
      cellRenderer: (params: any) => {
        return <div className="cell">{params.data.orders[0].price.toLocaleString()}원</div>;
      },
    },
    {
      headerName: "옵션",
      width: 120,
      resizable: true,
      cellRenderer: (params: any) => {
        return (
          <>
            <div className="cell">{params.data.orders[0].option.optionValue1}&nbsp;</div>
            {params.data.orders[0].option.optionValue2 && <div className="cell">{params.data.orders[0].option.optionValue2}&nbsp;</div>}
            {params.data.orders[0].option.optionValue3 && <div className="cell">{params.data.orders[0].option.optionValue3}&nbsp;</div>}
            {params.data.orders[0].option.optionValue4 && <div className="cell">{params.data.orders[0].option.optionValue4}&nbsp;</div>}
            {params.data.orders[0].option.optionValue5 && <div className="cell">{params.data.orders[0].option.optionValue5}&nbsp;</div>}
            {params.data.orders[0].option.optionValue6 && <div className="cell">{params.data.orders[0].option.optionValue6}</div>}
          </>
        );
      },
    },
    { field: "orderNumber", headerName: "주문번호", width: 100, resizable: true },
    { field: "date", headerName: "주문날짜", width: 150, resizable: true },
    { field: "user.phone", headerName: "연락처", width: 100, resizable: true },
    { field: "user.email2", headerName: "이메일", width: 100, resizable: true },
    {
      headerName: "수령인",
      width: 70,
      resizable: true,
      cellRenderer: (params: any) => {
        const ordersToString = (order) => {
          return ` ${order.receiver}`;
        };
        const ordersString = ordersToString(params.data.user.address);
        return <div className="cell">{ordersString}</div>;
      },
    },
    {
      headerName: "주소",
      width: 200,
      resizable: true,
      cellRenderer: (params: any) => {
        const ordersToString = (order) => {
          return `${order.zipcode} ${order.state} ${order.cities} ${order.street}`;
        };
        const ordersString = ordersToString(params.data.user.address);
        return <div className="cell">{ordersString}</div>;
      },
    },
    {
      headerName: "현관 암호",
      width: 100,
      resizable: true,
      cellRenderer: (params: any) => {
        const ordersToString = (order) => {
          return `${order.accesscode}`;
        };

        const ordersString = ordersToString(params.data.user.address);

        return <div className="cell">{ordersString}</div>;
      },
    },
  ]);

  const onGridReady = async (params?: any) => {
    try {
      const res = await axios.post("/smartstore/home/orders", { type }, { withCredentials: true });
      console.log(res.data);

      // 원본 데이터를 엑셀 표에 맞게 orders를 쪼개는 코드.
      const expandedOrders = res.data.orders.flatMap((order) => {
        return order.orders.map((singleOrder) => ({
          ...order,
          orders: [singleOrder],
        }));
      });
      console.log(expandedOrders);

      setRowData(expandedOrders);
    } catch (err) {
      console.log(err);
    }
  };

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement).value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onRowSelected = (event) => {
    const clickedOrderNumber = event.data.orderNumber;
    const isSelected = event.node.isSelected();

    gridRef.current.api.forEachNode((node) => {
      if (node.data.orderNumber === clickedOrderNumber) {
        node.setSelected(isSelected);
      }
    });

    // 업데이트된 선택된 행 목록을 가져오기
    const updatedSelectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRows(updatedSelectedRows);

    // 필요에 따라 props.setSelectedProductList 호출
    // props.setSelectedProductList && props.setSelectedProductList(updatedSelectedRows);
  };

  // 전환 버튼을 눌렀을때
  const selectedChange = (e: any) => {
    if (!selectedRows[0]) {
      setUnselectedErr("전환할 상품을 선택 해주세요.");
      setIsChangeModal(false);
    } else {
      setUnselectedErr("");
      setIsChangeModal(true);
    }
  };

  // 전환 버튼
  const changeBtn = async (e: any) => {
    await selectedRows.forEach((list: any, index: any) => {
      try {
        axios.post(`/smartstore/home/orders/edit`, { withCredentials: true });
        setIsChangeModal(false);
        // window.location.reload();
      } catch (errors) {
        console.log(errors);
      }
    });
  };

  const deleteOnChange = (e: any) => {
    setDeleteAgreeValue(e.target.value);
    setDeleteAgreeErr("");
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

      if (isChangeModal && dropmenu.current && !dropmenu.current.contains(e.target)) {
        setIsChangeModal(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isChangeModal]);

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

  // 페이지 크기 커스텀
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 50, 100];
  }, []);

  // 페이지 크기 커스텀
  const pagination = useMemo(() => {
    return (
      <div className="tableright">
        <span>페이지 노출 </span>
        <select className="page-size" onChange={onPageSizeChanged}>
          <option value="10" selected={true}>
            10
          </option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    );
  }, []);

  return (
    <>
      <Header>
        {type !== 4 && (
            <>
          <button className="delete-btn" onClick={selectedChange}>
            <span>전환</span>
          </button>
          <div className="error-wrap">
            <span className="input-text-error">{unselectedErr}</span>
          </div>
            </>
        )}
      </Header>
      <div style={{ height: "500px", marginTop: "10px", borderRadius: "20px" }} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          localeText={localeText}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          onRowSelected={onRowSelected}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
}

export default OrdersList;
