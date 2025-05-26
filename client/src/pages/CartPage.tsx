import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? Number(storedUserId) : null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToFavorites = async (productId: number) => {
    if (!userId) {
      alert('Du måste vara inloggad för att spara favoriter.');
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
        alert('Tillagd i favoriter!');
        console.log('Favorit tillagd:', productId);
      } else {
        const errorData = await response.json();
        console.error('Fel vid favorit:', errorData);
        alert(errorData.message || 'Något gick fel.');
      }
    } catch (error) {
      console.error('Favoritfel:', error);
      alert('Kunde inte lägga till favorit.');
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-content">
            <ul className="cart-item-list">
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.model}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <div className="cart-item-title">
                        <strong>{item.brand}</strong> {item.model}
                      </div>
                      <div className="cart-item-quantity">
                        Quantity: {item.quantity}
                      </div>
                      <div className="cart-item-price">
                        {item.price * item.quantity} kr
                      </div>
                    </div>
                    <div className="cart-item-buttons">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="favorite-btn"
                        onClick={() => addToFavorites(item.id)}
                      >
                        ♥ Favorit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">Total: {totalPrice} kr</div>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Go to Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
