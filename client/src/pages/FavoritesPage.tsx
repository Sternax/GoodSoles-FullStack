import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './FavoritesPage.css';
import { useFavorites } from '../components/FavoritesContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
}

const FavoritesPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const { favorites, fetchFavorites } = useFavorites();
  const userId = localStorage.getItem('userId');

  const fetchFavoriteProducts = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:8080/favorites/${userId}`);
      const data: Product[] = await res.json();
      setFavoriteProducts(data);
    } catch (err) {
      console.error('Error fetching favorite products:', err);
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, [favorites]);

  const handleRemove = async (productId: number) => {
    try {
      const res = await fetch('http://localhost:8080/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: Number(userId),
          product_id: productId,
        }),
      });

      if (res.ok) {
        toast.success('Removed from favorites');
        await fetchFavorites();
        await fetchFavoriteProducts();
      } else {
        toast.error('Failed to remove from favorites');
        console.error('Server returned error:', await res.text());
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast.error('Error removing favorite');
    }
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">YOUR FAVORITES</h2>

      {favoriteProducts.length === 0 ? (
        <p>You have no added favorites.</p>
      ) : (
        <ul className="favorite-list">
          {favoriteProducts.map((product) => (
            <li key={product.id} className="favorite-item">
              <button
                className="remove-favorite-btn"
                onClick={() => handleRemove(product.id)}
                title="Remove from favorites"
              >
                <DeleteForeverIcon />
              </button>
              <img
                src={product.image}
                alt={product.model}
                className="favorite-image"
              />
              <div className="favorite-details">
                <h3 className="favorite-title">
                  {product.brand} {product.model}
                </h3>
                <p className="favorite-price">{product.price} kr</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
