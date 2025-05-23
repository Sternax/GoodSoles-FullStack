import { createContext, useContext, useEffect, useState } from 'react';

type ProductType = {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
};

type CartItem = ProductType & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void;
};

const cartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    console.log('Cart updated:', cart);
  };
  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <cartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// För att komma åt Carten på någon annan sida eller komponent

// import { useCart } from './components/CartContext';
//const {cart} = useCart();

// Sen i till exempel en div
// <div>
//   {cart.map((item) => (
//     <div key={item.id}>
//       {item.brand} {item.model} - {item.quantity}
//     </div>
//   ))}
// </div>
