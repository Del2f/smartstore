import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Swiper_lntro.scss';

import img1 from "@img/home/pay.png";
import img2 from "@img/home/ntalk.png";
import img3 from "@img/home/graph.png";
import img4 from "@img/home/commission.jpg";
import img5 from "@img/home/map.png";
import img6 from "@img/home/site.png";
import img7 from "@img/home/modoo.png";
import img8 from "@img/home/price.png";


function Swiper_Intro() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:any, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark' className="Swiper_Intro">
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
    </Carousel>
  );
}

export default Swiper_Intro;