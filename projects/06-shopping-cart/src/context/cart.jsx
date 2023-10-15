import { createContext, useState } from 'react';

export const CartContext = createContext()

export function CartProvider({ children }) {
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
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}