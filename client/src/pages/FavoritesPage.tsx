import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './FavoritesPage.css';

interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/favorites/${userId}`)
      .then((res) => res.json())
      .then((data: Product[]) => setFavorites(data))
      .catch((err) => console.error('Error fetching favorites:', err));
  }, [userId]);

  const removeFavorite = (productId: number) => {
    if (!userId) return;

    fetch('http://localhost:8080/favorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: Number(userId), product_id: productId }),
    })
      .then(() => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
      })
      .catch((err) => console.error('Error removing favorite:', err));
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">YOUR FAVORITES</h2>

      {favorites.length === 0 ? (
        <p>You have no added favorites.</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map((product) => (
            <li key={product.id} className="favorite-item">
              <button
                className="remove-favorite-btn"
                onClick={() => removeFavorite(product.id)}
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
