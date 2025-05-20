import { useState } from 'react';

type ProductType = {
  id: number;
  brand: string;
  model: string;
  price: number;
};

type CartItem = ProductType & {
  quantity: number;
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  const addToCart = (product: ProductType) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    console.log('Cart updated:', updatedCart);
  };

  return { cart, addToCart };
};
