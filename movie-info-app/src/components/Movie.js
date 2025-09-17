import {Link} from "react-router-dom";

const Movie = ({movie}) => {

    const GENRE_BY_ID = Object.freeze({
        28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
        99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
        27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
        878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
    });
    const returnGenre = (id) => GENRE_BY_ID[id] ?? null;


    return (
    <div key={movie.id}>
      <h2>
      <Link to={`/movie/${movie.id}`}>
        {movie.title}
        {movie.original_language === "en" ? null : (
          <small> ({movie.original_title})</small>
        )}
      </Link>
      </h2>
      <img src={movie.poster_path} width="40%" alt={`poster of ${movie.title}`} />
      <h4>Released in {movie.release_date}</h4>
      
      <ul style={{ listStyleType: "none", display: "inline" }}>
        <strong key={0} style={{ float: "left" }}>Genre : </strong>{" "}
        {movie.genre_ids?.map((id) => {
          return (<li 
          key={`${movie.id}`.concat(" ",`${id}`)}
          style={{ float: "left" }}>
            &nbsp;{returnGenre(id)}
          </li>);
        })}
      </ul>
      
      <p>
        <strong>Summary</strong>
        <br />
        {movie.overview}
      </p>
      <hr />
    </div>
  );
};

export default Movie;