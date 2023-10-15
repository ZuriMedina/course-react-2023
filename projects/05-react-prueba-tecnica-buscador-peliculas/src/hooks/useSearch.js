import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirtsInput = useRef(true)

  useEffect(() => {
    //Ejemplo de como usar el useRef
    if (isFirtsInput.current) {
      isFirtsInput.current = search === ''
      return;
    }

    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
