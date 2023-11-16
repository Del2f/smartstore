import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_Buy.scss';

function Swiper_Buy() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark' className="SwiperBuy">
      <Carousel.Item>
        <img
          className="carousel_img" 
          // src={img1}
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Swiper_Buy;