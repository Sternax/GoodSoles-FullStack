import './CheckoutPage.css';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useCart();

  return (
    <div className="checkout-page">
      <img src="checkout-success.png" alt="Checkout Successful" />
      <h2>PURCHASE COMPLETE!</h2>
      <p>
        Your order is being processed and a confirmation of your purchase will
        be sent to your e-mail.
      </p>
      <br />
      <p>Thank you for shopping with us!</p>
      <button>
        <Link to={'/'}>CONTINUE SHOPPING</Link>
      </button>
      <br />
      <h3>Your Purchase</h3>
      {cart.map((item) => (
        <div id="purchased-item" key={item.id}>
          <img id="purchased-item-image" src={item.image} alt="" />
          <p id="purchased-item-title">
            {item.brand} {item.model}
          </p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
export default CheckoutPage;
