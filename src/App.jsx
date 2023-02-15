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
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
// nuestro custom hook
import { Movies } from './mocks/components/Movies'

function App () {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

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
