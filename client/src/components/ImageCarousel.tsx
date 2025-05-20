import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ImageCarousel.css';

const imageCarousel = () => {
  const responsive = {
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      rewind={true}
      rewindWithAnimation={true}
      infinite={true}
      showDots={true}
      arrows={false}
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={5000}
    >
      <div>
        <img className="carouselImage" src="heroimg.png" alt="Carousel Image" />
      </div>
      <div>
        <img
          className="carouselImage"
          src="heroimg2.png"
          alt="Carousel Image"
        />
      </div>
      <div>
        <img
          className="carouselImage"
          src="heroimg3.jpg"
          alt="Carousel Image"
        />
      </div>
    </Carousel>
  );
};

export default imageCarousel;
