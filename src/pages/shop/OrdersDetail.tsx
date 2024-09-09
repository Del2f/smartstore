import axios from "../../api/axios";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import Carousel from "../../components/shop/buy/ProductCarousel";
import Mail from "../../img/email-8-svgrepo-com.svg";
import Box from "../../img/big-box.svg";

const OrdersDetailWrap = styled.div`
  max-width: 1030px;
  margin: auto;
  padding: 0 20px;

  .box-icon,
  .mail-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    width: 20px;

    img {
      width: 100%;
    }
  }
  .box-icon-wrap,
  .mail-icon-wrap {
    margin-right: 10px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0px;

    h1 {
      font-size: 32px;
      font-weight: 600;
    }

    .ordernumber {
      font-size: 12px;
    }
  }

  .product-wrap {
    display: flex;
    border-bottom: 1px solid #d2d2d7;

    @media only screen and (max-width: 833px) {
      flex-direction: column;
    }

    /* flex-basis: 40%; */

    .carousel {
      max-width: 50%;
      max-height: 500px;
      padding: 0 20px;
      position: static;
      /* flex-basis: 20%; */
      /*
        min-height: auto;
        height: auto; */
      @media only screen and (max-width: 833px) {
        max-width: 100%;
        max-height: 100%;
      }

      .slick-slider {
        /* max-height: 300px; */
        height: 100%;
        @media only screen and (max-width: 833px) {
          height: 100%;
        }

        .slick-list {
          height: 100%;

          @media only screen and (max-width: 833px) {
            height: 50%;
          }
          .slick-track {
            height: 100%;

            @media only screen and (max-width: 833px) {
            }
            .slick-slide {
              display: flex;
              justify-content: center;
              align-items: center;
              
              @media only screen and (max-width: 833px) {
                height: 100%;
              }
            }
            .ImgItemWrap {
              height: 100%;
              .ImgItem {

                .ImgContent {
                  /* width: 100%; */

                  .ImgWrap {
                    /* display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin: 0 50px;
                    width: 100%; */
                    
                    @media only screen and (max-width: 833px) {
                      max-height: 100%;
                        /* max-height: 70%; */
                      }

                    img {
                      width: 80%;
                      /* 
                      height: auto; */
                      @media only screen and (max-width: 833px) {
                        width: 90%;
                        max-height: 600px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .carousel-arrow {
        width: 20px;
        height: 20px;
        top: 53%;
      }
      .carousel-arrow::after {
        font-size: 20px;
      }
    }

    .text-wrap {
      flex-basis: 60%;

      .header-wrap {
        margin-top: 10px;
        font-size: 32px;
        font-weight: 600;
      }

      .status-bar-wrap {
        padding: 40px 0;

        .status-text {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;

          .text {
            font-size: 13px;
            color: #949494;
          }

          .status-text-center {
            gap: 80px;
          }
        }
      }
    }
  }

  .bottom-wrap {
    display: flex;
    min-height: 300px;

    .product-name {
      flex-basis: 40%;
      line-height: 1.5;

      .product-info {
        border-bottom: 1px solid #d2d2d7;
        padding: 40px 20px;

        .name,
        .spec {
          font-weight: 600;
        }

        .name,
        .spec,
        .price {
          line-height: 1.5;
        }
      }
    }

    .address-email-wrap {
      display: flex;
      flex-basis: 60%;

      @media only screen and (max-width: 833px) {
        flex-direction: column;
                      }
    }

    .address-wrap,
    .email {
      display: flex;
      flex-basis: 50%;
      padding: 40px;

      h3 {
        font-size: 17px;
        font-weight: 400;
        font-weight: 600;
        line-height: 1.6;
        margin-bottom: 6px;
      }

      .address {
        line-height: 1.6;

        span {
          padding-right: 5px;
        }
      }
    }

    .email {
      flex-basis: 30%;
      
      @media only screen and (max-width: 833px) {
        flex-basis: 50%;
                      }
    }
  }
`;

interface Type {
  status: number | null;
}

const StatusBar = styled.div<Type>`
  ${(props) => {
    switch (props.status) {
      case 0:
        return css`
          width: 8%;
        `;
      case 1:
        return css`
          width: 25%;
        `;
      case 2:
        return css`
          width: 50%;
        `;
      case 3:
        return css`
          width: 75%;
        `;
      case 4:
        return css`
          width: 100%;
        `;
      default:
        return css`
          width: 0%;
        `;
    }
  }}
  height: 7px;
  background-color: #137918;
  border-radius: 20px;
  transition: width 2s cubic-bezier(0.4, 0, 0.6, 1) 80ms;
`;

function OrdersDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["userjwt"]);

  const [order, setOrder] = useState<any>([]);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { id } = location.state || {};
  console.log(order);
  // console.log(status);
  // console.log(date);

  // 유저의 로그인 상태를 확인
  useEffect(() => {
    const verifyUser = async () => {
      if (!id) {
        navigate("/shop");
        return;
      }

      if (!cookies.userjwt) {
        navigate("/shop");
        return;
      }

      try {
        const res = await axios.post("/smartstore/ordersdetail", { id }, { withCredentials: true });
        console.log(res.data);
        const resOrder = res.data.findorder;

        const mainImages = res.data.findorder.orders ? res.data.findorder.orders.map((orderItem) => orderItem.product.mainImage) : [];
        setImages(mainImages);

        setOrder(res.data.findorder);

        const statusMessages = {
          0: "주문 접수",
          1: "처리 중",
          2: "출고 준비중",
          3: "출고됨",
          4: "배송됨",
        };

        let statusMessage = "";
        let time = "";

        if (resOrder.update.length > 0) {
          const lastUpdate = resOrder.update[resOrder.update.length - 1];
          statusMessage = statusMessages[lastUpdate.status] || "";
          const date = new Date(lastUpdate.date);
          time = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        }

        setStatus(statusMessage);
        setDate(time);
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  const formattedDate = order.date ? formatDate(order.date) : "";

  function maskEmail(email: string) {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return email; // localPart가 너무 짧아서 마스킹하지 않음
    }
    const maskedLocalPart = `${localPart[0]}*****${localPart[localPart.length - 1]}`;
    return `${maskedLocalPart}@${domain}`;
  }

  return (
    <>
      <OrdersDetailWrap>
        <header>
          <div>
            <h1>주문 상세 정보.</h1>
          </div>
          <div className="ordernumber">
            <span>주문 접수: {formattedDate}</span>
          </div>
        </header>
        <div className="product-wrap">
          {/* <img src={order.orders[0].product.mainImage} alt="" /> */}
          <Carousel subimage={images}></Carousel>
          <div className="text-wrap">
            <div>
              {order.orders && order.orders.length > 0 && <span>{order.orders[0].product.name}</span>}
              <div className="header-wrap">
                <span>{status} </span>
                <span>{date}</span>
              </div>
              <div className="status-bar-wrap">
                <StatusBar className="status-bar" status={order && order?.update?.length > 0 ? order.update.length - 1 : null}></StatusBar>
                <div className="status-text">
                  <div className="text">주문 접수</div>
                  <div className="flex status-text-center">
                    <div className="text">처리 중</div>
                    <div className="text">출고 준비 중</div>
                    <div className="text">출고됨</div>
                  </div>
                  <div className="text">배송중</div>
                </div>
              </div>
            </div>
            <h1></h1>
          </div>
        </div>
        <div className="bottom-wrap">
          <div className="product-name">
            {order &&
              order?.orders?.map((list, index) => {
                return (
                  <div className="product-info" key={index}>
                    <span className="name">{list.product.name} </span>
                    <span className="price">₩{list.price && list.price.toLocaleString()}</span>
                    <div className="spec">{list.product.spec.map((list) => list)}</div>
                  </div>
                );
              })}
          </div>
          <div className="address-email-wrap">
            <div className="address-wrap">
              <div className="box-icon-wrap">
                <div className="box-icon">
                  <img src={Box} alt="" />
                </div>
              </div>
              <div className="">
                <h3>청구 주소:</h3>
                <div className="address">
                  <span>{order && order.user?.address?.receiver}</span>
                </div>
                <div className="address">
                  <span>{order && order.user?.address?.state}</span>
                  <span>{order && order.user?.address?.cities}</span>
                </div>
                <div className="address">
                  <span>{order && order.user?.address?.zipcode}</span>
                </div>
                <div className="address">
                  <span>{order && order.user?.address?.street}</span>
                  <span>{order && order.user?.address?.accesscode}</span>
                </div>
              </div>
            </div>
            <div className="email">
              <div className="mail-icon-wrap">
                <div className="mail-icon">
                  <img src={Mail} alt="" />
                </div>
              </div>
              <div>
                <h3>배송 업데이트 공유:</h3>
                <span>{maskEmail(order && order.user?.email2)}</span>
              </div>
            </div>
          </div>
        </div>
      </OrdersDetailWrap>
    </>
  );
}

export default OrdersDetail;
