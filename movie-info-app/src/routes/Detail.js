import {useParams} from "react-router-dom";
import { useState , useEffect } from "react";

const Detail = () => {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const id = useParams();

    const getMovie = async() => {
        console.log(id["id"]);
        const response = await fetch(`https://nomad-movies.nomadcoders.workers.dev/movies?${id["id"]}`);
        const data = await response.json();
        setMovie(data.find(movie => movie.id == id["id"]));  
        setLoading(false);      
        console.log(data);
    }
    
    useEffect(() => {
        getMovie();
    }, [])

    if (loading) return <h1>Loading...</h1>;

    return (
        <div>
        <h1>{movie.title}</h1>
        <img src={movie.backdrop_path} width="80%" />
        <h2>Rating : {"⭐️".repeat(Math.round(movie.vote_average / 2))}</h2>
        <h3>{movie.adult ? "Adult" : null}</h3>
        </div>
);    
}



export default Detail;