import { useEffect, useState } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h2>Dina favoriter</h2>

      {favorites.length === 0 ? (
        <p>Du har inga favoriter ännu.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map((product) => (
            <li
              key={product.id}
              style={{
                marginBottom: '20px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              <img
                src={product.image}
                alt={product.model}
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />
              <h3>
                {product.brand} {product.model}
              </h3>
              <p>{product.price} kr</p>
              <button onClick={() => removeFavorite(product.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
