const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';

//Versión async/await
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
  if (!res.ok) throw new Error('Error fetching fact');
  const data = await res.json();
  const { fact } = data;
  return fact;
};

//Versión Promise
/* 
export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then((res) => {
      if (!res.ok) throw new Error('Error fetching fact');
      return res.json();
    })
    .then((data) => {
      const { fact } = data;
      return fact;
    })
    .catch((err) => {
      //tanto si hay error con la respuesta como si hay error con la petición
      throw new Error(err);
    });
};
 */
