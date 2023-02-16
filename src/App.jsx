import './App.css'
// el useRef()
// crear referencia del DOM
// permite crear referencia mutale que persiste durante todo el ciclo de vida
// util para guardar cualquier valor que puedas mutar, ID, elemento DOM, etc.
// cuando cambia no renderiza el componente nuevamente
// siempre con .current, ejemplo
//
// const counter = useRef(0)
// counter.current++
//
// en ese caso de arriba no se reiniciara el valor a 0 cada vez que se renderiza el comp
import { useState, useCallback } from 'react'
// nuestros custom hooks
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

import { Movies } from './mocks/components/Movies'

function App () {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  const handleSort = () => {
    setSort(!sort)
  }

  // para que el debounce no se ejecute cada vez que se renderea el componente usaremos useCallback
  const debounceGetMovies = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 500)
  , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
    // hacer la busqueda mientras escribimos
  }

  return (
    <div className='page'>
      <header>
        <h1>The Movie Finder</h1>
        <form className='form' action='' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' type='text' placeholder='Interstellar, The Matrix ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
