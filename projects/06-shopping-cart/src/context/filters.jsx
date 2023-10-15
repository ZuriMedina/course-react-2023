import { createContext, useState } from 'react';

//1. Crear el contexto. Este es el que consumimos
export const FiltersContext = createContext();

//2. Crear el provider para proveer el contexto. Este nos provee de acceso al contexto.
export function FilterSProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
