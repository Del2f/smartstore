import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import OrdersList from "../../components/admin/OrdersList";
import OrdersListEdit from "../../components/admin/OrdersListEdit";
import "./Orders.scss";

const OrdersWrap = styled.div`
    width: 100%;
    max-width: 1200px;

    .orders-inner {
      padding: 20px;
    }
  `

type Props = {

};

function Orders(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [cookies] = useCookies(["jwt"]);
  const { type } = location.state || {};

  const [rowData, setRowData] = useState<any>();

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isChangeModal, setIsChangeModal] = useState<boolean>(false);
  
  useEffect(() => {
    if (type === undefined) {
      navigate('/home');
      return;
    }
  },[])

  return (
    <>
      
    <OrdersWrap>
      <div className="orders-inner">
        <OrdersList type={type} isChangeModal={isChangeModal} setIsChangeModal={setIsChangeModal} selectedRows={selectedRows} setSelectedRows={setSelectedRows} rowData={rowData} setRowData={setRowData}></OrdersList>
      </div>
    </OrdersWrap>
      {isChangeModal && <OrdersListEdit type={type} isShow={isChangeModal} setIsShow={setIsChangeModal} data={selectedRows} setData={setSelectedRows} setRowData={setRowData}></OrdersListEdit>}
</>
  );
}

export default Orders;
