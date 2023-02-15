import { useState } from 'react'
import { searchMovies } from '../service/movies'

// este custom Hook se encarga de hacer el fetching de datos
export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    const newMovies = await searchMovies({ search })
    setMovies(newMovies)
  }
  return { movies, getMovies }
}
