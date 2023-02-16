import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../service/movies'

// este custom Hook se encarga de hacer el fetching de datos
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    previousSearch.current = search
    const newMovies = await searchMovies({ search })
    setMovies(newMovies)
  }, [])

  const sortedMovies = useMemo(() => {
    console.log('memo')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  // de esa manera el sort queda guardado en Memo y solo se ejecutara cuando cambie el sort o el movies

  return { movies: sortedMovies, getMovies }
}
