import './HomePage.css';
import ImageCarousel from '../components/ImageCarousel';
import { useEffect, useState } from 'react';
import type { Product } from '../components/productsAPI';
import { fetchProducts } from '../components/productsAPI';
import { useCart } from '../components/CartContext';
import toast from 'react-hot-toast';
import { Grow } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="homePageContainer">
      <div id="headerContainer">
        <Carousel
          className="textCarousel"
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={6000}
          customTransition="all .5"
          transitionDuration={500}
          deviceType={'mobile'}
          removeArrowOnDeviceType={['mobile', 'tablet', 'desktop']}
        >
          <div className="carouselInnerText">
            SPRING CLEARANCE: 30% OFF ALL THINGS NIKE
          </div>
          <div className="carouselInnerText">
            SUMMER KICKS ARE HERE: 20% OFF SELECT SNEAKERS
          </div>
          <div className="carouselInnerText">
            SIGN UP FOR OUR NEWSLETTER FOR 10% OFF YOUR FIRST ORDER
          </div>
          <div className="carouselInnerText">FREE SHIPPING OVER 1500kr</div>
        </Carousel>
        <ImageCarousel />
      </div>
      <div id="homePageContent">
        <div id="productsContainer1">
          {products.slice(0, 6).map((product, index) => (
            <Grow in={true} timeout={300 + index * 500} key={product.id}>
              <div key={product.id} className="productBox">
                <Link to={`/product/${product.model}`} className="productLink">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    className="productImage"
                  />
                </Link>
                <div className="productBoxText">
                  <p>{product.brand + ' ' + product.model}</p>
                  <p>{product.price + ';-'}</p>
                </div>

                <AddShoppingCartIcon
                  className="productBtn"
                  onClick={() => {
                    addToCart(product);
                    toast.success(
                      `${product.brand} ${product.model} added to cart!`,
                    );
                  }}
                >
                  Add To Cart
                </AddShoppingCartIcon>
              </div>
            </Grow>
          ))}
        </div>

        <div id="middleHero">
          <div id="adidasHeroImgContainer">
            <img
              id="adidasHeroImg"
              src="./adidashero.png"
              alt="Adidas Hero Image"
            />
            <a id="adidasHeroLink" href="#">
              SHOP NOW{'>>'}
            </a>
          </div>

          <div id="spezialHero">
            <div id="adidasHandball1Container">
              <p className="spezialHeroText">DISCOVER</p>
              <img
                id="adidasHandball1"
                src="./adidasHandball1.png"
                alt="Adidas Handball Spezial One"
              />
            </div>
            <div id="adidasHandball2Container">
              <img
                id="adidasHandball2"
                src="./adidasHandball2.png"
                alt="Adidas Handball Spezial One"
              />
              <p className="spezialHeroText">YOUR FAVOURITE</p>
            </div>
          </div>
        </div>
        <div id="productsContainer2">
          {products.slice(6, 12).map((product) => (
            <div key={product.id} className="productBox">
              <Link to={`/product/${product.model}`} className="productLink">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.model}`}
                  className="productImage"
                />
              </Link>

              <div className="productBoxText">
                <p>{product.brand + ' ' + product.model}</p>
                <p>{product.price + ';-'}</p>
              </div>

              <AddShoppingCartIcon
                className="productBtn"
                onClick={() => {
                  addToCart(product);
                  toast.success(
                    `${product.brand} ${product.model} added to cart!`,
                  );
                }}
              >
                Add To Cart
              </AddShoppingCartIcon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
