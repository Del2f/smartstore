import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_Shop.scss';

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
          src="/smartstore/img/shop/iPad_Pro.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/iPad_10th.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/Apple-TV_4K.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/AirPods_Pro_2nd.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img" 
          src="/smartstore/img/shop/iPhone14_Pro.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/iPhone14.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/Watch_ULTRA.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/Watch8.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel_img"
          src="/smartstore/img/shop/Macbook_Air_M2.jpg"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Swiper_Shop;