import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FilterSProvider } from './context/filters.jsx'
import './index.css'

/* <React.StrictMode>
    <App />
  </React.StrictMode> */

/**
 * Se debe englobar toda la App dentro del proveedor del contexto para que sea accesible
 * por todos los componentes. 
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <FilterSProvider>
    <App />
  </FilterSProvider>
)
