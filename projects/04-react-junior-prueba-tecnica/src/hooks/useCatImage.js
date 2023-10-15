import { useState, useEffect } from 'react';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';
//Custom hook(debe empezar por use) que devuelve {imageUrl: 'https://...'}
//En los custom hooks podemos meter otros hooks de React
export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  //useEffect que recupera la imagen cada vez que tenemos un hecho nuevo
  useEffect(() => {
    if (!fact) return; //Si no hay fact no ejecuta el siguiente código

    const firstThreeWords = fact.split(' ', 3).join(' ');

    fetch(
      `https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]); //Cada vez que cambia fact, se ejecuta este useEffect

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` };
}
