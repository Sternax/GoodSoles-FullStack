import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
    <button
      className="remove-btn"
      onClick={() => removeFromCart(item.id)}
    >
      Remove
    </button>
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
