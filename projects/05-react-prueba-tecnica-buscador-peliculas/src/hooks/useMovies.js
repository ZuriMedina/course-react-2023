import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const previousSarch = useRef(search);

  /**
   * useCallback es como useMemo pero pensado para devolver funciones.
   * Con useMemo habría que añadir un callback; useMemo(()=>{return async ({ search }) => {....}})
   *
   * Al pasar el search por parametros y no poner dependencias en userMemo.
   * La función se genera una sola vez y no cada vez qu detecta cambios en el input search
   */
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSarch.current) return;

    previousSarch.current = search;
    const newMovies = await searchMovies({ search });
    setMovies(newMovies);
  }, []);

  /**
   * Recalcula sortedMovies cuando cambia algunas de las dependencias especificadas [sort, movies]
   * si no, se mantiene esa info en memoria
   */
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  /* 
  //Con este código hace lo mismo que el anterior pero recalcula la consulta constantemente
  const sortMovies = sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies; */

  return { movies: sortedMovies, getMovies };
}
