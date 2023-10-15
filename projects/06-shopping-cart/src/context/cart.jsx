import { createContext, useReducer, useState } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart';

export const CartContext = createContext()

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, dispatch, addToCart, removeFromCart, clearCart }
}

export function CartProvider({ children }) {

  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()


  //Si usamor hook reducer no es necesario meter aquí el addToCart,removeFromCart ni el clearCart
  /*   
  const [cart, setCart] = useState([])
  
  const addToCart = product => {
      //Chequear si el producto está ya en el carrito
      const productInCartIndex = cart.findIndex(item => item.id === product.id)
  
      if (productInCartIndex >= 0) {
        //Crea una copia profunda de un array
        const newCart = structuredClone(cart)
        newCart[productInCartIndex].quantity += 1
        return setCart(newCart)
      }
  
      //Si el producto no está ya en el carrito
      setCart(prevState => ([
        ...prevState,
        {
          ...product,
          quantity: 1
        }
      ]))
    } */

  /* const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  } */

  /* const clearCart = () => {
    setCart([])
  } */

  return (
    <CartContext.Provider value={{
      /* 
      Esto sin usar hook reducer
      cart,
      addToCart,
      removeFromCart,
      clearCart */
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}