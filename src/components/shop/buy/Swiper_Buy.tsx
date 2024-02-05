import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import "./Swiper_Buy.scss";

const Carousel = styled.div`
  display: flex;
  /* flex-basis: 70%; */
  overflow: hidden;
  /* height: 500px; */
`;

interface ImgContentType {
  width: string;
  height: string;
}

const ImgItem = styled.div`
  display: flex;
  border-radius: 18px;
  height: calc(100vh - 189px);
  justify-content: center;
  align-items: center;
  min-width: 592px;
  min-height: 460px;
  flex-direction: column;
`;

const ImgContent = styled.div<ImgContentType>`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImgWrap = styled.div`
  height: 100%;
  width: 100%;
  max-height: 1200px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  img {
    width: auto;
    height: 100%;
    max-width: none;
    max-height: 1200px;
    display: block;
    border-radius: 18px;
  }
`;

const LeftBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  mainimage: string[] | undefined | null;
  subimage: string[] | undefined | null;
}

function Swiper_Buy({ mainimage, subimage }: Props) {
  
  const [width, setWidth] = useState<string>("807px");
  const [height, setHeight] = useState<string>("722px");

  return (
    <Carousel className="carousel">
      <LeftBtn></LeftBtn>
      <RightBtn></RightBtn>
      {/* {mainimage?.map((list: any) => {
        return (
          <ImgWrap>
            <img src={list} alt="" />
          </ImgWrap>
        );
      })} */}
      {subimage?.map((list: any) => {
        return (
          <ImgItem>
            <ImgContent width={width} height={height}>
              <ImgWrap>
                <img src={list} alt="" />
              </ImgWrap>
            </ImgContent>
          </ImgItem>
        );
      })}
    </Carousel>
  );
}

export default Swiper_Buy;
