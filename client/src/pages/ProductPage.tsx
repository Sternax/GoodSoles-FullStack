import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../components/productsAPI';
import { fetchProducts } from '../components/productsAPI';
import { useCart } from '../components/CartContext';
import { useFavorites } from '../components/FavoritesContext';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './ProductPage.css';

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();
      const found = products.find((p) => slugify(p.model) === productId);
      setProduct(found ?? null);
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  const handleFavoriteToggle = async () => {
  if (!product) return;

  const wasFavorite = isFavorite(product.id);

  try {
    await toggleFavorite(product.id);
    toast.success(
      wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    );
  } catch {
    toast.error('Failed to update favorites');
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
            onClick={handleFavoriteToggle}
            title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
              toast.success(
                `${product.brand} ${product.model} (Size ${selectedSize}) added to cart!`
              );
            }}
          >
            ADD TO CART
          </button>
        </div>

        <div className="product-size-scroll">
          {Array.from({ length: 11 }, (_, i) => 36 + i).map((size) => (
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
            <strong>Material:</strong> Upper made from textile and synthetic. Rubber outsole.
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
            <strong>Description:</strong> A comfortable and stylish shoe designed for both
            everyday wear and activity. Combines performance with modern aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
