import axios from "../../api/axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productList } from "./Category";
import "./Buy.scss";
import ProductCarousel from "@components/shop/buy/ProductCarousel";
import OptionSelect from "@components/shop/buy/OptionSelect";

const Container = styled.div`
  width: 87.5%;
  margin: auto;
  min-width: 980px;
  max-width: 2632px;
`;

function Buy() {
  const { id } = useParams();
  const [product, setProduct] = useState<productList | null>();
  console.log(product);

  // 상품의 정보를 불러옵니다.
  useEffect(() => {
    const ProductData = async () => {
      try {
        const res = await axios.post(`/smartstore/shop/buy/${id}`, { withCredentials: true });

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    ProductData();
  }, [id]);

  return (
    <>
      <Container>
        <div className="pb-header-wrapper">
          <div className="pb-header-left">
            <div>
              {/* <span className="violator-frameless">New</span> */}
              <h1 className="fwl">{product?.name} 구입하기</h1>
            </div>
            <div>
              <span>₩{product?.price.toLocaleString()} 부터</span>
            </div>
          </div>
          <div className="pb-header-right">
            <div className="pb-header-learnmorelink-items">
              <div className="pb-header-learnmorelink">
                  보상 판매로 ₩50,000–₩1,060,000 더 저렴하게
                  <span className="visuallyhidden">Footnote </span>**
              </div>
              <div className="pb-header-learnmorelink">
                <div>신용 카드 할부</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb">
          <ProductCarousel mainimage={product?.mainImage} subimage={product?.subImage}></ProductCarousel>
          <OptionSelect product={product}></OptionSelect>
        </div>
      </Container>
    </>
  );
}

export default Buy;
