import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const id = useParams();

  const getMovie = async () => {
    console.log(id["id"]);
    const response = await fetch(
      `https://nomad-movies.nomadcoders.workers.dev/movies?${id["id"]}`
    );
    const data = await response.json();
    setMovie(data.find((movie) => movie.id == id["id"]));
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    getMovie();
  });

  if (loading) {
    return (
      <div className="loading-wrap" aria-busy="true" aria-live="polite">
        <div className="loader" />
        <p className="loading-text">Fetching movie info…</p>
      </div>
    );
  }

  return (
    <div className="container detail">
      <section className="detail-hero">
        <img
          className="detail-backdrop"
          src={movie.backdrop_path}
          width="80%"
          alt="a backdrop similar to the poster"
        />
        <div className="detail-gradient" />
        <div className="detail-content">
          <h1 className="detail-title">
            {movie.title}
            {movie.original_language === "en" ? null : (
              <small> ({movie.original_title})</small>
            )}
          </h1>
        </div>
      </section>
      <div className="detail-sub">
        <h1 className="rating-text">Rating</h1>
        <span className="rating">
          {"⭐️".repeat(Math.round(movie.vote_average / 2))}
        </span>
        <h3>{movie.adult ? <span className="badge">Adult</span> : null}</h3>
      </div>
      <section>
        <p className="summary">
          <strong className="rating-text">Summary</strong>
          <br />
          {movie.overview}
        </p>
      </section>
    </div>
  );
};

export default Detail;
