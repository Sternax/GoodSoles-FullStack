import './HomePage.css';

const products = [
  { brand: 'Nike', name: 'Air Max 90', price: 120, image: './af1-blue.png' },
  { brand: 'Adidas', name: 'Ultraboost', price: 180 },
  { brand: 'Puma', name: 'RS-X', price: 110 },
  { brand: 'Reebok', name: 'Club C', price: 75 },
  { brand: 'New Balance', name: '574', price: 85 },
  { brand: 'Asics', name: 'Gel-Lyte III', price: 110 },
  { brand: 'Converse', name: 'Chuck Taylor All Star', price: 60 },
  { brand: 'Vans', name: 'Old Skool', price: 70 },
  { brand: 'Hoka One One', name: 'Bondi 7', price: 160 },
  { brand: 'On Running', name: 'Cloudstratus', price: 170 },
  { brand: 'Saucony', name: 'Endorphin Pro', price: 200 },
  { brand: 'Brooks', name: 'Ghost 14', price: 140 },
];

const displayedProducts1 = products.slice(0, 6);
const displayedProducts2 = products.slice(6, 12);

const HomePage = () => {
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
          {displayedProducts1.map((product) => (
            <div
              key={`${product.brand}-${product.name}`}
              className="productBox"
            >
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="productImage"
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
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
          {displayedProducts2.map((product) => (
            <div
              key={`${product.brand}-${product.name}`}
              className="productBox"
            >
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="productImage"
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
