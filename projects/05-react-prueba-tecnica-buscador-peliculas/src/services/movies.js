const API_KEY = '4287ad07';

export async function searchMovies({ search }) {
  if (search === '') return null;

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const data = await res.json();

    const movies = data.Search;

    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return mappedMovies;
  } catch (error) {
    throw new Error('Error fetching films');
  }
}
