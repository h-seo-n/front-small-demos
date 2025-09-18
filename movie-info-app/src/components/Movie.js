import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const GENRE_BY_ID = Object.freeze({
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  });
  const returnGenre = (id) => GENRE_BY_ID[id] ?? null;

  return (
    <div className="movie-card" key={movie.id}>
      <h2 className="movie-title">
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </h2>
      <img
        className="movie-poster"
        src={movie.poster_path}
        alt={`poster of ${movie.title}`}
      />
      <div className="movie-meta">
        <h4>Released in {movie.release_date}</h4>
      </div>

      <ul
        className="chips"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li style={{ marginRight: 6, fontSize: "20px" }}>
          <strong key={0} style={{ float: "left" }}>
            Genre{" "}
          </strong>{" "}
        </li>

        {movie.genre_ids?.map((id) => {
          return (
            <li
              className="chip"
              key={`${movie.id}`.concat(" ", `${id}`)}
              style={{ float: "left" }}
            >
              &nbsp;{returnGenre(id)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Movie;
