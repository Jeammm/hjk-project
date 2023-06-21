import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function CarouselBanner() {
  return (
    <Carousel showThumbs={false} autoPlay interval={10000} emulateTouch infiniteLoop >
      <div>
        <img
          src="https://iili.io/HPxNgou.jpg"
          alt="promotion"
        />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img
          src="https://iili.io/HPxOIUl.png"
          alt="promotion"
        />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img
          src="https://iili.io/HPxN4Pj.png"
          alt="promotion"
        />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
}
