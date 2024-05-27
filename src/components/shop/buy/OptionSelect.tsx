import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { productList } from "../../../pages/shop/Category";

interface Props {
  product: productList | null | undefined;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>
  isOptionSelect: boolean[];
  setIsOptionSelect: React.Dispatch<React.SetStateAction<boolean[]>>;
  selectOptions: any;
  setSelectOptions: React.Dispatch<any>;
  isOptionDisabled: boolean[];
  setIsOptionDisabled: React.Dispatch<React.SetStateAction<boolean[]>>
}

interface Type {
  isOptionDisabled: boolean[];
  index: number;
}

interface OptionBox {
  value: string;
  selectOptions: any;
  index: number;
}

const OptionsWrap = styled.div`
  width: 100%;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;

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
  gap: 10px;

  .title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
`;

const OptionBoxWrap = styled.div<Type>`
  opacity: ${ props => props.isOptionDisabled[props.index] ? "1" : "0.32"};
  /* pointer-events: ${props => props.isOptionDisabled[props.index] ? "auto" : "none"}; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OptionBox = styled.div<OptionBox>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  padding: 14px;
  min-height: 4.8823529412rem;

  ${props => props.selectOptions[props.index]?.value === props.value ? css`
  border: 2px solid #0071e3;
  ` : css`
  border: 1px solid #86868b;
  `};

  .name {
    width: 200px;
    font-size: 15px;
    font-weight: 700;
  }

  .price {
    font-size: 12px;
  }

  .unit {
    font-size: 11px;
    white-space: nowrap;
  }

  .price, .unit {
    color: #1d1d1f;
  }
`;
interface SelectOptions {
  productID: string;
  options: { name: string; value: string }[];
  price: number;
}

function OptionSelect({ product, price, setPrice, isOptionSelect, setIsOptionSelect, selectOptions, setSelectOptions,isOptionDisabled, setIsOptionDisabled }: Props) {

  const optionHandler = (index: number, valueIdx: number, options: { name: string, values: string[], price: number[] }) => {
    const optionIndex = selectOptions.findIndex(opt => opt && opt.name === options.name);
  
    if (!isOptionDisabled[index]) {
      return;
    }

      const newIsOptionDisabled = isOptionDisabled;
      // if (selectOptions.length + 1 === isOptionDisabled.length) {
      //   return;
      // }
      newIsOptionDisabled[index + 1] = true;
      setIsOptionDisabled(newIsOptionDisabled);
    // console.log(newArray);

    // 같은 이름의 옵션이 이미 존재하는 경우
    if (optionIndex !== -1) {
      const updatedOptions = [...selectOptions];
      updatedOptions[optionIndex].value = options.values[valueIdx];
      // updatedOptions[optionIndex].price = options.price[valueIdx];
      setSelectOptions(updatedOptions);
  
      // 가격을 누적하여 더함
      // const newPrice = options.price[valueIdx];
      // const newPriceArray = price;
      
      // setPrice(prevPrice => prevPrice + newPrice);
    } else { // 같은 이름의 옵션이 존재하지 않는 경우
      setSelectOptions(prevOptions => [...prevOptions, { name: options.name, value: options.values[valueIdx] }]);
      
      // 가격을 누적하여 더함
      // const newPrice = options.price[valueIdx];
      // setPrice(prevPrice => prevPrice + newPrice);
    }
    
    const newIsOptionSelect = isOptionSelect;
    newIsOptionSelect[index] = true;
    setIsOptionSelect(newIsOptionSelect);
  }

  return (
    <OptionsWrap>
      <Options>
        {product?.optionList?.map((options, index) => (
          <Option key={index} className="option">
            <span className="title">{options.name}</span>
            <OptionBoxWrap index={index} isOptionDisabled={isOptionDisabled}>
              {options.values.map((value, valueIdx) => (
                <OptionBox key={valueIdx} index={index} className="optionBox" selectOptions={selectOptions} value={value} onClick={() => optionHandler(index, valueIdx, options)}>
                  <span className="name" >{value}</span>
                  {options.price[valueIdx] !== 0 && (
                    <div>
                      <span className="price">￦{options.price[valueIdx].toLocaleString()} +</span>
                    </div>
                  )}
                </OptionBox>
              ))}
            </OptionBoxWrap>
          </Option>
        ))}
      </Options>
    </OptionsWrap>
  );
}

export default OptionSelect;
