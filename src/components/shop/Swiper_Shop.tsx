import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_Shop.scss';

import img1 from "@img/shop/iPad_Pro.jpg";
import img2 from "@img/shop/iPad_10th.jpg";
import img3 from "@img/shop/Apple-TV_4K.jpg";
import img4 from "@img/shop/AirPods_Pro_2nd.jpg";
import img5 from "@img/shop/iPhone14_Pro.jpg";
import img6 from "@img/shop/iPhone14.jpg";
import img7 from "@img/shop/Watch_ULTRA.jpg";
import img8 from "@img/shop/Watch8.jpg";
import img9 from "@img/shop/Macbook_Air_M2.jpg"


function Swiper_Shop() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark' className="Swiper_Shop">
      <Carousel.Item>
        <img
          className="carousel_img" 
          src={img1}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img2}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img3}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img4}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img" 
          src={img5}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img6}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img7}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img8}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src={img9}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Swiper_Shop;