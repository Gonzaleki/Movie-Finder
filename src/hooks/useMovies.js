import { useState } from 'react'
import withoutResults from '../mocks/no-results.json'

// este custom Hook se encarga de hacer el fetching de datos
export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  const API = 'https://www.omdbapi.com/?apikey=4287ad07&s='

  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies = () => {
    if (search) {
      fetch(API + search)
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json)
        })
    } else {
      setResponseMovies(withoutResults)
    }
  }
  return { movies: mappedMovies, getMovies }
}
