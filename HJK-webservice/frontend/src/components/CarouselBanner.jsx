import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function CarouselBanner({ data }) {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      interval={3000}
      emulateTouch
      infiniteLoop
    >
      {data
        .filter((b) => b.BannerNo)
        .map((b) => {
          return (
            <div key={b.BannerID}>
              <img src={b.BannerURL} alt={b.BannerName} />
            </div>
          );
        })}
    </Carousel>
  );
}
