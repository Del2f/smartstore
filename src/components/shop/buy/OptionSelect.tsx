import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { productList } from "../../../pages/shop/Category";

interface Props {
  product: productList | null | undefined;
}

const Options = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;

  .option:first-child {
    margin: max(0px, -221px + 50vh) 0px max(60px, -279px + 50vh);
  }

  .option {
    margin: 0px 0px max(60px, -333.5px + 50vh);
  }
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  width: 328px;
  gap: 10px;


`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #86868b;
  border-radius: 12px;
  padding: 14px;
  min-height: 4.8823529412rem;

  .name {
    width: 200px;
    font-size: 13px;
    font-weight: 600;
  }

  .price {
    font-size: 11px;
  }
`;
interface SelectOptions {
  productID: string;
  options: { name: string; value: string }[];
  price: number;
}

function OptionSelect({ product }: Props) {

  useEffect(() => {
    if (product) {
      const result = {
        productID: product._id ? product._id.toString() : '',
        options: selectOptions,
        price: price,
      }
      setResult(result);
    }
  }, [product]);

  const [result, setResult] = useState<SelectOptions>({ productID: "", options: [], price: 0 });
  const [selectOptions, setSelectOptions] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [selectType, setSelectType] = useState<number>(0);

  console.log(product);
  console.log(result);
  console.log(selectOptions);

  const optionHandler = (index: number, options: { name: string, values: string[], price: number[] }) => {
    const optionIndex = selectOptions.findIndex(opt => opt && opt.name === options.name);
  
    // 같은 이름의 옵션이 이미 존재하는 경우
    if (optionIndex !== -1) {
      const updatedOptions = [...selectOptions];
      updatedOptions[optionIndex].value = options.values[index];
      setSelectOptions(updatedOptions);
  
      // 가격을 누적하여 더함
      const newPrice = options.price[index];
      setPrice(prevPrice => prevPrice + newPrice);
    } else { // 같은 이름의 옵션이 존재하지 않는 경우
      setSelectOptions(prevOptions => [...prevOptions, { name: options.name, value: options.values[index], price: options.price[index] }]);
      
      // 가격을 누적하여 더함
      const newPrice = options.price[index];
      setPrice(prevPrice => prevPrice + newPrice);
    }
  }

  return (
    <Options>
      {product?.optionList?.map((options, index) => (
        <Option key={index} className="option">
          <span>{options.name}</span>
          {options.values.map((value, valueIdx) => (
            <OptionBox key={valueIdx} className="optionBox" onClick={() => optionHandler(valueIdx, options)}>
              <span className="name">{value}</span>
              <span className="price">￦{parseInt(options.price[valueIdx] + product.price).toLocaleString()}부터</span>
            </OptionBox>
          ))}
        </Option>
      ))}
    </Options>
  );
}

export default OptionSelect;
