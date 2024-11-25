import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieView = () => {
    const {id} = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [movieCredits, setMovieCredits] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?&language=en-US&api_key=1d02c59884e6c61d9fd0278a52a48fd0`)
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
            });

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1d02c59884e6c61d9fd0278a52a48fd0&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                setMovieCredits(data);
                setIsLoading(false);
            });
    }, [id]);

    function renderCastSection() {
        if (!movieCredits || !movieCredits.cast || movieCredits.cast.length === 0) {
            return <p>No cast data available.</p>;
        }

        return (
            <div className="row">
                {movieCredits.cast.map((member) => (
                    <div
                        key={member.id}
                        className="col-md-3 col-sm-4 col-6 text-center my-3"
                    >
                        {/* Display Profile Picture */}
                        {member.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                alt={member.name}
                                className="img-fluid shadow rounded"
                                style={{ width: "150px", height: "225px", objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                className="rounded bg-secondary text-white shadow"
                                style={{
                                    width: "150px",
                                    height: "225px",
                                    lineHeight: "225px",
                                    fontSize: "16px",
                                }}
                            >
                                No Image
                            </div>
                        )}
                        {/* Cast Details */}
                        <h5 className="mt-2">{member.name}</h5>
                        <p className="text-muted small">as {member.character}</p>
                    </div>
                ))}
            </div>
        );
    }
    
    function renderMovieDetails() {
        if(isLoading) {
            return <Hero text="Loading..." />
        }
        if (movieDetails) {
            const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path} `

            return ( 
                <>
                <Hero text={movieDetails.original_title} backdrop={backdropUrl}  />
                <div id="detailBox" className="container my-5">
                    <div className="row">
                        {/* Poster Section */}
                        <div className="col-md-3">
                            <img
                                src={posterPath}
                                alt="Movie Poster"
                                className="img-fluid shadow rounded"
                            />
                        </div>
                        {/* Movie Details Section */}
                        <div className="col-md-9">
                            <div className="row">
                                {/* Left Column: Movie Details */}
                                <div className="col-md-6">
                                    <h2>{movieDetails.original_title}</h2>
                                    <p className="lead">{movieDetails.overview}</p>
                                    <h4>Release Date:</h4>
                                    <p>{movieDetails.release_date}</p>
                                    <h4>Runtime:</h4>
                                    <p>{movieDetails.runtime} minutes</p>
                                    <h4>Status:</h4>
                                    <p>{movieDetails.status}</p>
                                    <h4>Rating:</h4>
                                    <p>{Math.floor(movieDetails.vote_average)}/10</p>
                                    <h4>Genres:</h4>
                                    <ul>
                                        {movieDetails.genres.map((genre) => (
                                            <li key={genre.id}>{genre.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Column: Produced By Section */}
                                <div className="col-md-6">
                                    <h3>Produced by:</h3>
                                    <ul className="list-unstyled">
                                        {movieDetails.production_companies.map((company) => (
                                            <li key={company.id} className="mb-4">
                                                <div>
                                                    {/* Display the company logo if available */}
                                                    {company.logo_path && (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                            alt={company.name}
                                                            className="img-fluid mb-2"
                                                            style={{ maxWidth: "10rem" }}
                                                        />
                                                    )}
                                                    <p>
                                                        <strong>Name:</strong> {company.name}
                                                    </p>
                                                    <p>
                                                        <strong>Origin Country:</strong> {company.origin_country}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Cast Section */}
                            <h3 className="my-5">Cast:</h3>
                            {renderCastSection()}
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }
    return renderMovieDetails()

}

export default MovieView;