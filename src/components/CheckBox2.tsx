import React, { useState, useRef } from "react";
import styled from "styled-components";

interface check {
  checked: boolean;
}

const CheckBoxContainer = styled.label`
  position: relative;

`;

const CheckBox = ({ isState, setIsState, message }) => {
  const Handler = () => {
    if (isState) {
      setIsState(null);
    } else {
      setIsState(true);
    }
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  // input checkbox를 빠르게 클릭하면 focus가 해제 되는것을 방지.
  const handleClick = () => {
    setTimeout(() => {
      if (checkboxRef.current) {
        checkboxRef.current.focus();
      }
    }, 0);
  };

  return (
    <CheckBoxContainer className="checkbox-wrap">
      <input type="checkbox" className="checkbox-input" id="checkbox01" ref={checkboxRef} onChange={Handler} onClick={handleClick}/>
      <label className="checkbox-label" htmlFor="checkbox01">
        <span className={`checkbox-icon ${isState !== null && !isState ? 'checkbox-icon-error' : ''}`}></span>
        {message}
      </label>
    </CheckBoxContainer>
  );
};

export default CheckBox;
