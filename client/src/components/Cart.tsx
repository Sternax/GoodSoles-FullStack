type ProductType = {
  id: number;
  brand: string;
  model: string;
  price: number;
};

type CartItem = ProductType & {
  quantity: number;
};

export const addToCart = (product: ProductType) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const productIndex = cart.findIndex(
    (item: { id: number }) => item.id === product.id,
  );

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Cart updated:', cart);
};
