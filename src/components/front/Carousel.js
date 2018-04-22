import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

import banner1 from "../../resources/Cookie_banner.png";
import banner2 from "../../resources/Chocolate_banner.png";

export default class CarouselContainer extends React.Component {
  render() {
    let isMobile = window.innerWidth < 768;
    return isMobile ? null : (
      <Carousel showThumbs={false} showStatus={false}>
        <div>
          <img src={banner1} alt="banner" />
        </div>
        <div>
          <img src={banner2} alt="Banner" />
        </div>
      </Carousel>
    );
  }
}
