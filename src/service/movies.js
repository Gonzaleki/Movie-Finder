export const searchMovies = async ({ search }) => {
  const API = 'https://www.omdbapi.com/?apikey=4287ad07&s='

  if (search === '') return null

  try {
    const response = await fetch(`${API}${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster

    }))
  } catch (error) {
    throw new Error('Error while searching movies. E:' + error)
  }
}
