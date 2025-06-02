import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  fetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const userId = Number(localStorage.getItem('userId'));

  const fetchFavorites = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:8080/favorites/${userId}`);
      const data = await res.json();
      setFavorites(data.map((fav: any) => fav.product_id));
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (productId: number) => {
    if (!userId) return;

    const isFav = favorites.includes(productId);

    const res = await fetch('http://localhost:8080/favorites', {
      method: isFav ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    });

    if (res.ok) {
      setFavorites((prev) =>
        isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    } else {
      console.error('Failed to toggle favorite');
    }
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
