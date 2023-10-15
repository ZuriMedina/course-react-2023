import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons';
import './Cart.css'
import { useCart } from '../hooks/useCart';

function CartItem({ thumbnail, price, title, quantity, description, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={description} />
      <div>
        <strong>{title} - €{price}</strong>
      </div>
      <footer>
        <small>
          Quantity: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckbxId = useId()
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      <label
        className='cart-button'
        htmlFor={cartCheckbxId}
      >
        <CartIcon />
      </label>

      <input id={cartCheckbxId} type="checkbox" hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}