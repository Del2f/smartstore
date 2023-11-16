import React from "react";
import styled from "styled-components";
import check from "@img/icon-check-16.00020358.svg";

interface check {
  checked: boolean;
}

const CheckboxContainer = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
  height: 30px;
  width: 30px;
  user-select: none;
`;

const CustomCheckbox = styled.span<check>`
  position: absolute;
  top: 0;
  left: 0;
  border: 1.2px solid rgba(0, 0, 0, 0.15);

  height: 30px;
  width: 30px;
  content: "";
  background-size: cover;
  background-repeat: no-repeat;

  ${(props) =>
    props.checked &&
    `
    background: url(${check}) 5px 5px no-repeat;
    background-color: var(--blue-color);
  `}
`;

const CheckboxComponent = ({ checked, onClick }) => {
  return (
    <CheckboxContainer>
      <CustomCheckbox checked={checked} onClick={onClick} />
    </CheckboxContainer>
  );
};

export default CheckboxComponent;
