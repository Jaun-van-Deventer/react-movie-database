import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

const RandomMovie = () => {
    const [randomMovie, setRandomMovie] = useState(null);
    const navigate = useNavigate();

    const fetchRandomMovie = async () => {
        try {
            const randomPage = Math.floor(Math.random() * 500) + 1; 
            
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=1d02c59884e6c61d9fd0278a52a48fd0&language=en-US&page=${randomPage}`
            );
            const data = await response.json();
            
            const movies = data.results;
            const randomIndex = Math.floor(Math.random() * movies.length);
            setRandomMovie(movies[randomIndex]);
        } catch (error) {
            console.error("Failed to fetch random movie:", error);
        }
    };

    useEffect(() => {
        fetchRandomMovie();

        const intervalId = setInterval(fetchRandomMovie, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (!randomMovie) {
        return <h2>Loading...</h2>;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
    const title = randomMovie.title || randomMovie.original_title;

    const openMovieDetails = () => {
        navigate(`/movies/${randomMovie.id}`);
    };

    return (
        <div className="random-movie">
            <h2>Random Movie Recommendation</h2>
            <div className="card">
                <img
                    src={posterUrl}
                    alt={title}
                    className="card-img-top"
                    style={{ height: "20rem", objectFit: "contain" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">
                        {randomMovie.overview || "No description available."}
                    </p>
                    <button onClick={fetchRandomMovie} className="btn btn-dark me-2">
                        Get Another Random Movie
                    </button>
                    <button onClick={openMovieDetails} className="btn btn-dark me-2">
                        Open Movie Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RandomMovie;
