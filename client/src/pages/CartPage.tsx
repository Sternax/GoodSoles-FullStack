import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? Number(storedUserId) : null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToFavorites = async (productId: number) => {
    if (!userId) {
      toast.error('You must be logged in to save favorites.');
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
        toast.success('Added to favorites!');
        console.log('Favorite added:', productId);
      } else {
        const errorData = await response.json();
        console.error('Favorite error:', errorData);
        toast.error(errorData.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Favorite error:', error);
      toast.error('Could not add to favorites.');
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">YOUR CART</h1>

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
                        className="favorite-btn"
                        onClick={() => addToFavorites(item.id)}
                        title="Add to favorites"
                      >
                        <FavoriteIcon />
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                      >
                        <DeleteForeverIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">Total: {totalPrice} kr</div>
          </div>

          <Link to="/checkout" className="checkout-btn">
            GO TO CHECKOUT
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
