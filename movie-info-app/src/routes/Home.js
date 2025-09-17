import {useEffect, useState} from "react"
import Movie from "../components/Movie";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);


    const getMovies = async () => {
        const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
        const data = await response.json();
        setLoading(false);
        setMovies(data);
    }

    useEffect(()=>{
        getMovies();
    }, []);

    return (
        <div>
        {loading ? <h1>Loading...</h1> : 
        <div>
            {movies.map(movie => <Movie movie={movie}/>)
            }
        </div>
        }
        </div>
    );
}
  export default Home;