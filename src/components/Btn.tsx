import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styled from "styled-components";
import "./Btn.css";

function Btn() {

  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '결제건수', value: '1' },
    { name: '결제자수', value: '2' },
    { name: '결제금액', value: '3' },
  ];

  return (
    <>
      <ButtonGroupTest>
        {radios.map((radio, idx) => (
          <ToggleButtonTest
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButtonTest>
        ))}
      </ButtonGroupTest>
    </>
  );
}

const ToggleButtonTest = styled(ToggleButton)`
  border-radius: 0px;
  border-color: #dbdde2;
  background-color: #fff;
  color: #767a83;
  font-size: 12px;
  padding: 7px 34px;
`;

const ButtonGroupTest = styled(ButtonGroup)`
`;

export default Btn;