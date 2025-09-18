import { useEffect, useState } from "react";
import Movie from "../components/Movie";

// TODO : 1. Make an instant-search feature
// TODO : 2. Make a category selector

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      "https://nomad-movies.nomadcoders.workers.dev/movies"
    );
    const data = await response.json();
    setLoading(false);
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <div className="brand">🎬 Latest Movie Info!</div>
      </header>
      <div>
        {loading ? (
          <div className="loading-wrap" aria-busy="true" aria-live="polite">
            <div className="loader" />
            <p className="loading-text">Fetching movie info…</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <Movie movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default Home;
