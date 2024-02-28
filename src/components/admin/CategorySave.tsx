import axios from "../../api/axios";
import { AxiosError } from "axios";
import styled from "styled-components";
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from "react";

interface ModalWrapType {
  isBoolean: boolean;
}

const ModalWrap = styled.div<ModalWrapType>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isBoolean
      ? `
      visibility: visible;
      `
      : `
      visibility: hidden;
  `}
`;

const ModalListWrap = styled.div<ModalWrapType>`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isBoolean
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
   `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
`;

const ModalList = styled.div`
  position: relative;
  width: 600px;
  background-color: white;
  padding: 30px 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const ModalBlur = styled.div<ModalWrapType>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  backdrop-filter: blur(20px);

  ${(props) =>
    props.isBoolean
      ? `
      opacity: 1;
      visibility: visible;
      `
      : `
      opacity: 0;
      visibility: hidden;
  `}
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1) 80ms, visibility 0.32s 80ms;
`;

interface Props {
  isBoolean: boolean;
  setIsBoolean: React.Dispatch<React.SetStateAction<boolean>>;
}

function SaveModal({ isBoolean, setIsBoolean }: Props) {
  const ModalWrapRef = useRef<HTMLDivElement>(null);
  const ModalBlurRef = useRef<HTMLDivElement>(null);

  const ModalClost = () => {
    setIsBoolean(false);
  };

  return (
    <ModalWrap isBoolean={isBoolean} ref={ModalWrapRef} className="modal">
      <ModalListWrap isBoolean={isBoolean} ref={ModalBlurRef}>
        <ModalList>
          <button className="modal-close-button" style={{ position: "absolute", top: "0" }} onClick={ModalClost}>
            <span className="modal-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
              </svg>
            </span>
          </button>
          {/* <h5 className="box-name"></h5> */}
          <div style={{ textAlign: "center", padding: "20px", fontSize: "20px", fontWeight: "700" }}>카테고리를 저장 하였습니다.</div>
        </ModalList>
      </ModalListWrap>
      <ModalBlur className="AdverBlur" isBoolean={isBoolean}></ModalBlur>
    </ModalWrap>
  );
}

export default SaveModal;
