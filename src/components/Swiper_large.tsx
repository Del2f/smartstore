import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_large.css';

import img1 from '@img/bottom-banner-1.png';
import img2 from '@img/bottom-banner-2.png';
import img3 from '@img/bottom-banner-3.png';
import img4 from '@img/bottom-banner-4.jpg';

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

export default Swiper_large;