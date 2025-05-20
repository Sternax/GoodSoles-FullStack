import './HomePage.css';
import { useEffect, useState } from 'react';
import type { Product } from '../components/productsAPI';
import { fetchProducts } from '../components/productsAPI';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <div id="heroImg">
          <img src="/heroimg.png" alt="Hero Image" />
        </div>
      </div>
      <div id="homePageContent">
        <div id="productsContainer1">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="productBox">
              <img
                src={product.image}
                alt={`${product.brand} ${product.model}`}
                className="productImage"
              />
              <h3>{product.brand}</h3>
              <p>{product.model}</p>
              <p>${product.price + ';-'}</p>
              <button id="productBtn">Add To Cart</button>
            </div>
          ))}
        </div>
        {/* Images of shoes in the middle of the page */}
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
              {/* <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="productImage"
              /> */}
              <h3>{product.brand}</h3>
              <p>{product.model}</p>
              <p>${product.price + ';-'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
