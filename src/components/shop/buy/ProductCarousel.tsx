import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Slider from "react-slick";
import "./ProductCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Carousel {
  width: string;
  height: string;
}

const Carousel = styled.div<Carousel>`
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  .slick-dots {
    bottom: 40px;
    transition: background-color 0.1s linear;
    transition: color 0.1s linear;

    li.slick-active button:before {
      opacity: 0.8;
      color: black;
    }

    li {
      margin: 0;

      button {
        position: relative;
        padding: 0;
        /* opacity: 0; */

        &::before {
          position: absolute;
          left: 30%;
          top: 30%;
          padding: 2px;
          background-color: rgba(0, 0, 0, 0.8);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          font-size: 0;
        }
      }
    }
  }
`;

const CarouselInner = styled.div`
  transform: translateX(0px);
  width: 200%;
  left: 0%;
  transition: none 0s ease 0s;
  white-space: nowrap;
  display: flex;
  position: relative;
`;

interface ImgContentType {
  // width: string;
  // height: string;
}

const ImgItemWrap = styled.div<Carousel>`
    align-items: center;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 189px);
    justify-content: center;
    min-height: 460px;
    min-width: 592px;
`;

const ImgItem = styled.div<Carousel>`
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    /* width: ${(props) => props.width};
  height: ${(props) => props.height}; */
    width: 100%;
  height: 100%;
`;

const ImgContent = styled.div`

align-items: center;
    border-radius: 18px;
    display: flex;
    height: 100%;
    justify-content: center;
    max-height: 1200px;
    overflow: hidden;
    position: relative;
    width: 100%;
`;

const ImgWrap = styled.div`
    height: 100%;
    width: auto;

  img {
    width: auto;
    height: 100%;
    max-width: none;
    max-height: 1200px;
    display: block;
    border-radius: 18px;
  }
`;

const CircleNav = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 10px;
  z-index: 5;

  ul {
    display: inline-flex;
    justify-content: center;
  }

  li {
    list-style: none;
    margin: 0 7px;
    width: 8px;
    height: 8px;
    position: relative;
  }
`;

const ButtonWrap = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 50%;

  font-weight: 300;
  width: 3.05882rem;
  height: 3.05882rem;
  border-radius: 3.05882rem;
  font-size: 53px;
  line-height: 3.05882rem;
  background-color: rgba(210, 210, 215, 0.64);

  &::after {
    font-family: SF Pro Icons;
    color: rgba(0, 0, 0, 0.56);
    font-size: 53px;
  }
`;

const LeftBtn = styled(ButtonWrap)`
  left: 20px;
  z-index: 1;
  margin-top: -30px;

  &::after {
    content: "";
    margin-top: 1px;
    margin-right: 3px;
  }
`;

const RightBtn = styled(ButtonWrap)`
  right: 20px;
  z-index: 1;
  margin-top: -30px;

  &::after {
    content: "";
    margin-top: 1px;
    margin-left: 3px;
  }
`;

interface Props {
  mainimage: string[] | undefined | null;
  subimage: string[] | undefined | null;
}

function Swiper_Buy({ mainimage, subimage }: Props) {
  const [width, setWidth] = useState<string>("1285px");
  const [height, setHeight] = useState<string>("722px");
  const widthRef = useRef<HTMLDivElement>(null);
  console.log(width);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

        if (widthRef.current) {
          const newWidth = widthRef.current.clientWidth.toString(); // number를 string으로 변환
          setWidth(newWidth);
        }
  
      // if (windowWidth > 1285) {
      //   setWidth(`${windowWidth}px`);
      //   setHeight(`${Math.max(722, windowHeight)}px`);
      // } else {
      //   setWidth(`${Math.max(592, windowWidth)}px`);
      //   setHeight(`${Math.max(592, windowHeight)}px`);
      // }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <RightBtn className="RightBtn carousel-arrow" onClick={onClick}></RightBtn>;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <LeftBtn className="LeftBtn carousel-arrow" onClick={onClick}></LeftBtn>;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Carousel className="carousel" width={width} height={height} ref={widthRef}>
      <Slider className={"Slider"} {...settings}>
        {subimage?.map((list: any) => {
          return (
            <ImgItemWrap className="ImgItemWrap" width={width} height={height} >
              <ImgItem className="ImgItem" width={width} height={height}>
                <ImgContent className="ImgContent">
                  <ImgWrap className="ImgWrap">
                    <img src={list} alt="" />
                  </ImgWrap>
                </ImgContent>
              </ImgItem>
            </ImgItemWrap>
          );
        })}
      </Slider>
    </Carousel>
  );
}

export default Swiper_Buy;
