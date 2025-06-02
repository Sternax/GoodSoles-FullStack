import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from 'react';
import { useFavorites } from '../components/FavoritesContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
  }, [favorites]);

  return (
    <div className="cart-page">
      <h1 className="cart-title">YOUR CART</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-content">
            <ul className="cart-item-list">
              {cart.map((item) => {
                const favorite = isFavorite(item.id);

                return (
                  <li className="cart-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.model}
                      className="cart-item-image"
                    />

                    <button
                      className="favorite-btn"
                      onClick={() => {
                        toggleFavorite(item.id)
                          .then(() => {
                            toast.success(favorite ? 'Removed from favorites' : 'Added to favorites');
                          })
                          .catch(() => {
                            toast.error('Failed to update favorites');
                          });
                      }}
                      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </button>

                    <div className="cart-item-details">
                      <div className="cart-item-info">
                        <div className="cart-item-title">
                          <strong>{item.brand}</strong> {item.model}
                        </div>

                        <div className="quantity-buttons">
                          <button onClick={() => decreaseQuantity(item.id)} title="Minska">
                            <RemoveIcon />
                          </button>
                          <span className="cart-item-quantity">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} title="Öka">
                            <AddIcon />
                          </button>
                        </div>

                        <div className="price-and-actions">
                          <span className="cart-item-price">
                            {item.price * item.quantity} kr
                          </span>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            title="Ta bort"
                          >
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-total">Total: {totalPrice} kr</div>

            <Link to="/checkout" className="checkout-btn">
              GO TO CHECKOUT
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
