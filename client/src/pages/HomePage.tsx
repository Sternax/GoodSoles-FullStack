import './HomePage.css';
import ImageCarousel from '../components/ImageCarousel';
import { useEffect, useState } from 'react';
import type { Product } from '../components/productsAPI';
import { fetchProducts } from '../components/productsAPI';
import { useCart } from '../components/CartContext';
import toast from 'react-hot-toast';
import { Grow } from '@mui/material';

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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="homePageContainer">
      <div id="headerContainer">
        <div id="saleBanner">
          RIGHT NOW: <br /> SPRING CLEARANCE: 30% ON ALL THINGS NIKE
        </div>
        <ImageCarousel />
      </div>
      <div id="homePageContent">
        <div id="productsContainer1">
          {products.slice(0, 6).map((product, index) => (
            <Grow
              in={!loading}
              style={{ transformOrigin: '0 0 0' }}
              timeout={500 + index * 400}
              key={product.id}
            >
              <div key={product.id} className="productBox">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.model}`}
                  className="productImage"
                />
                <div className="productBoxText">
                  <h3>{product.brand}</h3>
                  <p>{product.model}</p>
                  <p>{product.price + ';-'}</p>
                </div>

                <button
                  className="productBtn"
                  onClick={() => {
                    addToCart(product);
                    toast.success(
                      `${product.brand} ${product.model} added to cart!`,
                    );
                  }}
                >
                  Add To Cart
                </button>
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
              <img
                src={product.image}
                alt={`${product.brand} ${product.model}`}
                className="productImage"
              />

              <div className="productBoxText">
                <h3>{product.brand}</h3>
                <p>{product.model}</p>
                <p>{product.price + ';-'}</p>
              </div>

              <button
                className="productBtn"
                onClick={() => {
                  addToCart(product);
                  toast.success(
                    `${product.brand} ${product.model} added to cart!`,
                  );
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
