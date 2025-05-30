import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../components/productsAPI';
import { fetchProducts } from '../components/productsAPI';
import { useCart } from '../components/CartContext';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ProductPage.css';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();

  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? Number(storedUserId) : null;

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();
      const found = products.find((p) => slugify(p.model) === productId);
      setProduct(found ?? null);
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  const addToFavorites = async (productId: number) => {
    if (!userId) {
      toast.error('You must be logged in to save favorites.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      });

      if (response.ok) {
        toast.success('Added to favorites!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Could not add to favorites.');
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-page">
      <img
        src={product.image}
        alt={`${product.brand} ${product.model}`}
        className="product-image"
      />
      <div className="product-info">
        <div className="brand-and-favorite">
          <h1 className="product-brand">{product.brand}</h1>
          <button
            className="product-favorite-btn"
            onClick={() => addToFavorites(product.id)}
            title="Add to favorites"
          >
            <FavoriteIcon />
          </button>
        </div>

        <h2 className="product-model">{product.model}</h2>
        <div className="price-and-button">
          <p className="product-price">{product.price} kr</p>
          <button
            className="add-to-cart-btn"
            onClick={() => {
              if (!selectedSize) {
                toast.error('Please select a size');
                return;
              }
              addToCart(product);
              toast.success(`${product.brand} ${product.model} (Size ${selectedSize}) added to cart!`);
            }}
          >
            ADD TO CART
          </button>
        </div>

        <div className="product-size-scroll">
          {Array.from({ length: 11 }, (_, i) => 36 + i).map(size => (
            <button
              key={size}
              className={`size-option ${selectedSize === String(size) ? 'selected' : ''}`}
              onClick={() => setSelectedSize(String(size))}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="product-details">
          <p>
            <strong>Material:</strong> Upper made from textile and synthetic.
            Rubber outsole.
          </p>
          <p>
            <strong>Lining:</strong> Breathable mesh
          </p>
          <p>
            <strong>Care instructions:</strong> Wipe clean with a damp cloth
          </p>
          <p>
            <strong>Fit:</strong> True to size
          </p>
          <p>
            <strong>Description:</strong> A comfortable and stylish shoe
            designed for both everyday wear and activity. Combines performance
            with modern aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
