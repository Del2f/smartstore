import { useState, useEffect, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import TableProductList from "../../components/admin/TableProductList";

type Props = {
  setNoticeIcon?: React.Dispatch<SetStateAction<any>>;
  setNotice?: React.Dispatch<SetStateAction<string>>;
  setNoticeDate?: React.Dispatch<SetStateAction<string>>;
};

function Product(props: Props) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    props.setNoticeIcon && props.setNoticeIcon("");
    props.setNotice && props.setNotice("상품 조회/수정");
    props.setNoticeDate && props.setNoticeDate("");
  }, []);

  return (
    <>
      <div className="SellerSubframe product">
        <div style={{minWidth: "1200px"}}>

        <div className="panel panel-seller">
          <div className="panel-heading">
            <div className="pull-left">
              <h3 className="panel-title">
                상품목록 (총&nbsp;
                <span className="text-primary">{productTotal}</span>
                개)
              </h3>
            </div>
          </div>
          <div className="panel-body">
            <div className="btn-list"></div>
            {cookies.jwt ? (
              <div className="table-product-list">
                <TableProductList setProductTotal={setProductTotal}></TableProductList>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="panel-footer"></div>
        </div>
        </div>

      </div>
    </>
  );
}

export default Product;
