import { useState, useEffect } from 'react';
import { getRandomFact } from '../services/facts';

export function useCatFact() {
  const [fact, setFact] = useState(); //Se inicializa el estado como vacio

  const refreshRandomFact = () => {
    const getNewFact = async () => {
      const newFact = await getRandomFact();
      setFact(newFact);
    };
    getNewFact();
  };
  //useEffect que recupera el hecho aleatorio de la API
  useEffect(refreshRandomFact, []); //Esta dependencia hace que se inicia solo la primera vez que se monta el componente.

  return { fact, refreshRandomFact };
}
