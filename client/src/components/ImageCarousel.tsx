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
      autoPlaySpeed={6000}
    >
      <div>
        <img
          className="carouselImage"
          src="jordan-hero.jpg"
          alt="Carousel Image"
        />
      </div>
      <div>
        <img
          className="carouselImage"
          src="newbal-hero.jpg"
          alt="Carousel Image"
        />
      </div>
      <div>
        <img
          className="carouselImage"
          src="samba-hero.jpg"
          alt="Carousel Image"
        />
      </div>
      <div>
        <img
          className="carouselImage"
          src="adidasmoto-hero.jpg"
          alt="Carousel Image"
        />
      </div>
    </Carousel>
  );
};

export default imageCarousel;
