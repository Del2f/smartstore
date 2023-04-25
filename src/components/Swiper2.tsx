import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import './Swiper.css';

import img1 from "@img/top-banner-right1-pc.png";
import img2 from "@img/top-banner-right2-pc.png";
import img3 from "@img/top-banner-right3-pc.png";
import img4 from "@img/top-banner-right4-pc.png";


function Swiper2() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark'>
      <Carousel.Item>
        <img
          className="carousel_img" 
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img4}
          alt="Fourth slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Swiper2;