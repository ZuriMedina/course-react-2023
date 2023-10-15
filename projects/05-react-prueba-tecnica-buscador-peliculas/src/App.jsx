
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import './App.css'
//import { useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {

  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  /**
   * Si se usa el hook useRef
   * Es un valor que persiste cada vez que se renderiza algo
   */
  //const inputRef = useRef()

  /**
   * con debounce se espera hasta que el usuario deje de teclear y espera 500 mls para hacer la búsqueda.
   * El use callback se asegura que solo se ejecute el debounce una vez
   */
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 500)
    , [getMovies]
  )



  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    /**
     * Al usar useState para el el estado del input
     * No es necesario hacer el vanilla javascript que se
     * realizó en handleSubmit ya que se actualiza "updateSearch"
     * con el valor del input, es decir, "search"
     */
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    /* Esta opción si se usa el hook useRef para obtener la referencia de un input
    * <input ref={inputRef}......
    * Engorroso si tienes que manejar varios inputs de un form 
    **/
    //const value = inputRef.current.value
    /* esta opción con vanilla te da todos los inputs de un form como objeto
    Importante poner el name <input name='query'... */
    /* const { query } = Object.fromEntries(
      new window.FormData(event.target)
    ) */
  }



  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit} >
          <input
            value={search}
            onChange={handleChange}
            name='query'
            placeholder='Avenger, Star Wars, The Matrix...'
            type="text"
          />

          <input type="checkbox"
            onChange={handleSort}
          />

          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
