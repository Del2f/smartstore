import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_large.css';

function Swiper_large() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark'>
      <Carousel.Item>
        <img
          className="carousel_img" 
          src="/img/bottom-banner-1.png"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/img/bottom-banner-2.png"
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/img/bottom-banner-3.png"
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/img/bottom-banner-4.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Swiper_large;