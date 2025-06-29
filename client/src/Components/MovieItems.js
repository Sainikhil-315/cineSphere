import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MovieItems.css";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function MovieItems(props) {
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [results, setResults] = useState([]);
    const [total_results, setTotalResults] = useState(0);
    const [similar, setSimilar] = useState([]);
    const [currentMovie, setCurrentMovie] = useState(props.newMovie);
    const [loading, setLoading] = useState(false);
    const pathName = useLocation();
    const { id: movieTitle } = useParams();
    const navigate = useNavigate();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupElement, setPopupElement] = useState(null);
    const [showFullReview, setShowFullReview] = useState(false);

    const fetchMovieByTitle = async (title) => {
        setLoading(true);
        try {
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&query=${encodeURIComponent(title)}`;
            const searchData = await fetch(searchUrl);
            const searchResult = await searchData.json();

            if (searchResult.results && searchResult.results.length > 0) {
                const movie = searchResult.results[0];
                setCurrentMovie(movie);
                return movie;
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const fetchTrailers = async (movieData) => {
        if (movieData && movieData.id) {
            const url = `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            const foundTrailer = parsedData.results.find((video) => video.type === "Trailer") || null;
            setTrailer(foundTrailer);
        }
    };

    const fetchCastAndCrew = async (movieData) => {
        if (movieData && movieData.id) {
            const url = `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            setCast(parsedData.cast || []);
            setCrew(parsedData.crew || []);
        }
    };

    const fetchReviews = async (movieData) => {
        if (movieData && movieData.id) {
            const url = `https://api.themoviedb.org/3/movie/${movieData.id}/reviews?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            setResults(parsedData.results || []);
            setTotalResults(parsedData.total_results || 0);
        }
    };

    const fetchSimilarMovies = async (movieData) => {
        if (movieData && movieData.id) {
            const url = `https://api.themoviedb.org/3/movie/${movieData.id}/similar?api_key=${props.apiKey}&page=1`;
            const data = await fetch(url);
            const parsedData = await data.json();
            setSimilar(parsedData.results || []);
        }
    };

    const handleSimilarMovieClick = (movie) => {
        setCurrentMovie(movie);
        navigate(`/movie/${movie.title}`);
    };

    const handleOpenPopup = (element) => {
        setPopupElement(element);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        const initializeMovie = async () => {
            let movieData = currentMovie;

            // If no current movie or movie title from URL doesn't match, fetch by title
            if (!movieData || movieData.title !== movieTitle) {
                movieData = await fetchMovieByTitle(movieTitle);
            }

            if (movieData) {
                await Promise.all([
                    fetchTrailers(movieData),
                    fetchCastAndCrew(movieData),
                    fetchReviews(movieData),
                    fetchSimilarMovies(movieData)
                ]);
            }
        };

        initializeMovie();
    }, [movieTitle, pathName]);

    if (loading || !currentMovie) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="movie-details-container"
        >
            {/* Trailer Section */}
            <div className="trailer-section my-4">
                {trailer ? (
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Movie Trailer"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div className="no-trailer-placeholder d-flex align-items-center justify-content-center">
                        <p className="text-muted fs-5">No trailer available for this movie.</p>
                    </div>
                )}
            </div>

            {/* Movie Info Section */}
            <div className="container-fluid px-3 px-md-4">
                <div className="row movie-info-section mb-5">
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <img
                            className="movie-poster img-fluid rounded shadow-lg"
                            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
                            alt={currentMovie.title}
                        />
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6">
                        <div className="movie-details">
                            <h1 className="movie-title mb-3">{currentMovie.title}</h1>

                            {currentMovie.release_date && (
                                <div className="movie-meta">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <p className="meta-item">
                                                <strong className="text-warning">Released:</strong>
                                                <span className="ms-2 text-info">{currentMovie.release_date}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="meta-item">
                                                <strong className="text-warning">Popularity:</strong>
                                                <span className="ms-2 text-secondary">{currentMovie.popularity}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="meta-item">
                                                <strong className="text-warning">Rating:</strong>
                                                <span className="ms-2 rating-badge text-black">
                                                    &#11088; {currentMovie.vote_average?.toFixed(1)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="meta-item">
                                                <strong className="text-warning">Rated by:</strong>
                                                <span className="ms-2 text-primary">{currentMovie.vote_count?.toLocaleString()}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button className="btn btn-cinema mt-3">
                                <i className="fas fa-heart me-2"></i>
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="overview-section mb-5">
                    <h3 className="section-title">Overview</h3>
                    <p className="overview-text">{currentMovie.overview}</p>
                </div>

                {/* Cast Section */}
                <div className="cast-section mb-5">
                    <h3 className="section-title">Cast</h3>
                    <div className="cast-container">
                        <div className="cast-scroll d-flex overflow-auto pb-3">
                            {cast.filter(member => member.profile_path).map((element) => (
                                <Link to={`/person/${element.id}`} className="text-decoration-none text-white">
                                    <div key={element.id} className="cast-card flex-shrink-0 me-3">
                                        <img
                                            className="cast-image"
                                            src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`}
                                            alt={element.name}
                                        />
                                        <h6 className="cast-name text-center mt-2">{element.name}</h6>
                                        <p className="cast-role text-center text-muted">{element.known_for_department}</p>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                </div>

                {/* Crew Section */}
                <div className="crew-section mb-5">
                    <h3 className="section-title">Crew</h3>
                    <div className="crew-container">
                        <div className="crew-scroll d-flex overflow-auto pb-3">
                            {crew.filter(member => member.profile_path).map((element) => (
                                <Link to={`/person/${element.id}`} className="text-decoration-none text-white">
                                    <div className="crew-card text-center">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`}
                                            alt={element.name}
                                            className="crew-image rounded shadow"
                                        />
                                        <h6 className="mt-2">{element.name}</h6>
                                        <p className="text-muted small">{element.job}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section mb-5">
                    <button type="button" className="btn btn-cinema-outline mb-3">
                        <i className="fas fa-star me-2"></i>
                        Reviews
                        <span className="badge bg-warning text-dark ms-2">{total_results}</span>
                    </button>

                    <div className="reviews-container">
                        {[...results].sort((a, b) => {
                            const ratingA = a.author_details.rating ?? 0;
                            const ratingB = b.author_details.rating ?? 0;
                            return ratingB - ratingA;
                        })
                            .map((element, index) => (
                                <div key={index} className="review-card mb-3">
                                    <div className="card-body m-2">
                                        <div className="review-author text-warning mb-2 d-flex justify-content-between">
                                            <div>Reviewed by: {element.author}</div>
                                            {element.author_details.rating && <div>Rating: {element.author_details.rating}</div>}
                                        </div>
                                        <p className="review-content">{element.content.substring(0, 200)}...</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">
                                                <i className="far fa-calendar me-1"></i>
                                                {new Date(element.created_at).toLocaleDateString()}
                                            </small>
                                            <button className="btn btn-link btn-sm text-warning p-0" onClick={() => { setPopupOpen(true); handleOpenPopup(element); }}>
                                                Read more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {popupOpen && popupElement && (
                    <div
                        className="popup-overlay"
                        onClick={(e) => {
                            // Close popup when clicking on overlay (not content)
                            if (e.target === e.currentTarget) {
                                setPopupOpen(false);
                            }
                        }}
                    >
                        <div className="popup-content">
                            {/* Close Icon Button */}
                            <button
                                className="popup-close-icon"
                                onClick={() => setPopupOpen(false)}
                                aria-label="Close popup"
                            >
                                ✕
                            </button>

                            {/* Author Header Section */}
                            <div className="review-author-header">
                                {popupElement.author_details?.avatar_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${popupElement.author_details.avatar_path}`}
                                        alt={`${popupElement.author} avatar`}
                                        className="author-avatar"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(popupElement.author)}&background=f5c518&color=0d1117&size=120`;
                                        }}
                                    />
                                )}

                                <div className="author-info">
                                    <h5 className="author-name">{popupElement.author}</h5>
                                    {popupElement.author_details?.username && (
                                        <p className="author-username">@{popupElement.author_details.username}</p>
                                    )}

                                    {popupElement.author_details?.rating && (
                                        <div className="author-rating">
                                            <span className="rating-stars">
                                                {'★'.repeat(Math.floor(popupElement.author_details.rating))}
                                                {'☆'.repeat(10 - Math.floor(popupElement.author_details.rating))}
                                            </span>
                                            <span className="rating-number">
                                                {popupElement.author_details.rating}/10
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="review-content-text">
                                {popupElement.content.length > 500 ? (
                                    <>
                                        {popupElement.content.substring(0, 500)}
                                        {showFullReview ? (
                                            <>
                                                {popupElement.content.substring(500)}
                                                <button
                                                    className="btn btn-link text-warning p-0 ms-2"
                                                    onClick={() => setShowFullReview(false)}
                                                    style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                                                >
                                                    Show Less
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-link text-warning p-0 ms-2"
                                                onClick={() => setShowFullReview(true)}
                                                style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                                            >
                                                Read More...
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    popupElement.content
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Similar Movies Section */}
                <div className="similar-movies-section">
                    <h3 className="section-title mb-4">Similar Movies</h3>
                    {similar && similar.length > 0 ? (
                        <div className="row g-4">
                            {similar.filter(movie => movie.poster_path).slice(0, 8).map((element) => (
                                <div key={element.id} className="col-lg-3 col-md-4 col-sm-6">
                                    <div
                                        className="similar-movie-card cursor-pointer"
                                        onClick={() => handleSimilarMovieClick(element)}
                                    >
                                        <img
                                            className="similar-movie-poster img-fluid rounded"
                                            src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                                            alt={element.title}
                                        />
                                        <div className="similar-movie-overlay">
                                            <h6 className="similar-movie-title">{element.title}</h6>
                                            <p className="similar-movie-rating">
                                                ⭐ {element.vote_average?.toFixed(1)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-similar-movies text-center py-5">
                            <i className="fas fa-film fa-3x text-muted mb-3"></i>
                            <h4 className="text-muted">No similar movies available</h4>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default MovieItems;