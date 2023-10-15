import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons';
import './Cart.css'
import { useCart } from '../hooks/useCart';

export function Cart() {
  const cartCheckbxId = useId()
  const { cart, clearCart } = useCart()

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
          <li>
            <img src="" alt="" />
            <div>
              <strong></strong>
            </div>
            <footer>
              <small></small>
              <button></button>
            </footer>
          </li>
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}