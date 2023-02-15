import { useState, useEffect } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  // validar form de forma controlada
  // no la mas recomendada
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

  return { search, setSearch, error }
}
