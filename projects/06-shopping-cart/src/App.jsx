import { Products } from './components/Products'
import { Header } from './components/Header'
import { Footer } from './components/footer'
import { products as initialProducts } from './mocks/products.json'
import { IS_DEVELOPMENT } from './config'
import './App.css'
import { useState } from 'react'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
