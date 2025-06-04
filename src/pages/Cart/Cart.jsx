import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';

const Cart = () => {
  const promoCodes = ['nani123', 'sree123', 'amma1996'];

  const { cartItems, removeFromCart, food_list, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const totalCartItems = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  // 🔹 New states for promo code and discount
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // 🔹 Handle promo code submission
  const handlePromoCodeSubmit = () => {
    if (promoCodes.includes(promoCodeInput.trim())) {
      setDiscount(10);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid Promo Code ❌');
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className='cart'>
      {totalCartItems > 2 && (
        <div
          className='cart-error'
          style={{ color: 'red', marginBottom: '10px' }}
        >
          ❗ You cannot add more than 2 items to the cart.
        </div>
      )}
      <div className='cart-items'>
        <div className='cart-item-title'>
          <p>ItemsS</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        <br />
        {food_list.map(item => {
          if (cartItems[item._id] > 0) {
            return (
              <div className='cart-items-item' key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p className='cross' onClick={() => removeFromCart(item._id)}>
                  x
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <hr />
      <div className='card-bottom'>
        <div className='cart-total'>
          <h2>Cart totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            {discount > 0 && (
              <>
                <hr />
                <div className='cart-total-details'>
                  <p>Promo Discount</p>
                  <p style={{ color: 'green' }}>-${discount}</p>
                </div>
              </>
            )}
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${total > 0 ? total : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>
            Proceed To Checkout
          </button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input
                type='text'
                placeholder='Promo Code'
                value={promoCodeInput}
                onChange={e => setPromoCodeInput(e.target.value)}
              />
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
            {promoError && (
              <p style={{ color: 'red', marginTop: '5px' }}>{promoError}</p>
            )}
            {discount > 0 && (
              <p style={{ color: 'green', marginTop: '5px' }}>
                ✅ Promo applied: -${discount}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
