import './App.css'
import { useEffect, useState } from 'react'

// el useRef()
// crear referencia del DOM
// permite crear referencia mutale que persiste durante todo el ciclo de vida
// util para guardar cualquier valor que puedas mutar, ID, elemento DOM, etc.
// cuando cambia no renderiza el componente nuevamente

import { useMovies } from './hooks/useMovies.js'
// nuestro custom hook
import { Movies } from './mocks/components/Movies'

function App () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const { movies } = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(event.target.value)
  }

  // validar form de forma controlada
  //
  useEffect(() => {
    if (search === '') {
      setError('No se puede buscar la pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar la pelicula vacia')
      return
    }
    if (search.length < 3) {
      setError('Debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return (
    <div className='page'>
      <header>
        <h1>The Movie Finder</h1>
        <form className='form' action='' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' type='text' placeholder='Interstellar, The Matrix ...' />
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
