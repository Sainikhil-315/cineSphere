import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MovieItems.css";
import { h1 } from "framer-motion/client";
import { Link } from "react-router-dom";

function MovieItems(props) {
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [results, setResults] = useState([]);
    const [total_results, setTotalResults] = useState(0);
    const [similar, setSimilar] = useState([]);
    const [movieId, setMovieId] = useState(null);

    const fetchTrailers = async () => {
        if (props.newMovie && props.newMovie.id) {
            const url = `https://api.themoviedb.org/3/movie/${props.newMovie.id}/videos?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            const foundTrailer =
                parsedData.results.find((video) => video.type === "Trailer") || null;
            setTrailer(foundTrailer);
            // console.log(foundTrailer);
        }
    };
    const fetchCastAndCrew = async () => {
        if (props.newMovie && props.newMovie.id) {
            const url = `https://api.themoviedb.org/3/movie/${props.newMovie.id}/credits?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            // console.log(parsedData.cast);
            setCast(parsedData.cast);
            setCrew(parsedData.crew);
            // console.log(cast[1].profile_path);
        }
    };
    const fetchReviews = async () => {
        if (props.newMovie && props.newMovie.id) {
            const url = `https://api.themoviedb.org/3/movie/${props.newMovie.id}/reviews?api_key=${props.apiKey}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            // console.log(parsedData);
            setResults(parsedData.results);
            setTotalResults(parsedData.total_results);
        }
    };
    const fetchSimilarMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/${props.newMovie.id}/similar?api_key=${props.apiKey}&page=1`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setSimilar(parsedData.results);
        // console.log(parsedData.results[1].original_title);
    }
    const handleSubmit = (id) => {
        setMovieId(id)
    }
    useEffect(() => {
        /*eslint-diable*/
        if (props.newMovie) {
            fetchTrailers();
            fetchCastAndCrew();
            fetchReviews();
            fetchSimilarMovies();
        }
    }, [props.newMovie,movieId]);

    if (!props.newMovie) {
        return <h1>Loading...</h1>;
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
        >
            <div>
                {trailer ? (
                    <iframe
                        width="100%"
                        height="600px"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                    ></iframe>
                ) : (
                    <p>No trailer available for this movie.</p>
                )}
            </div>
            <div className="d-flex" style={{ gap: "40px", marginTop: "30px", marginLeft: "35px" }} >
                <img style={{ width: "250px", height: "350px" }} src={"https://image.tmdb.org/t/p/w500/" + props.newMovie.poster_path} alt={props.newMovie.title} />
                <div>
                    <h1>{props.newMovie.title}</h1>
                    <br />
                    {props.newMovie.release_date ? (
                        <div>
                            <p><strong>Released :</strong>{props.newMovie.release_date ? props.newMovie.release_date : "Not Released"}</p>
                            <p><strong>Popularity:</strong> {props.newMovie.popularity}</p>
                            <p><strong>Rating:</strong>{props.newMovie.vote_average.toFixed(2)}</p>
                            <p><strong>Rated by: </strong>{props.newMovie.vote_count}</p>
                        </div>
                    ) : (
                        <h1></h1>
                    )}
                    <button className="btn btn-info my-3"> + WishList</button>
                </div>
            </div>
            <p className="mt-4 font-monospace mx-4">{props.newMovie.overview}</p>
            <h1 className="m-4">Cast</h1>
            <div className="m-4 d-flex scrollable" style={{ overflowX: "auto" }}>
                {cast.map((element) => {
                    if (element.profile_path) {
                        return (
                            <div key={element.id}>
                                <img style={{ width: "125px", height: "125px", borderRadius: "50%", margin: "15px" }} src={"https://image.tmdb.org/t/p/w500/" + element.profile_path} alt={element.name} />
                                <h6 className="d-flex justify-content-center">{element.name}</h6>
                                <h6 className="d-flex justify-content-center">{element.known_for_department}</h6>
                            </div>
                        );
                    }
                })}
            </div>
            <h1 className="m-4">Crew</h1>
            <div className="m-4 d-flex scrollable" style={{ overflowX: "scroll" }}>
                {crew.map((element) => {
                    if (element.profile_path) {
                        return (
                            <div>
                                <img style={{ width: "125px", height: "125px", borderRadius: "50%", margin: "15px" }} src={"https://image.tmdb.org/t/p/w500/" + element.profile_path} alt={element.name} />
                                <h6 className="d-flex justify-content-center">{element.name}</h6>
                                <h6 className="d-flex justify-content-center">{element.department}</h6>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="m-4">
                <button type="button" className="btn btn-primary">
                    Reviews -
                    <span className="badge badge-light badge-outline">{total_results}</span>
                </button>
                <div className="card">
                    {results.map(element => {
                        return (
                            <div style={{ marginBottom: "10px" }}>
                                <div className="card-body card-body-custom">
                                    <h6 className="card-subtitle mb-2 text-muted">Reviewed by: {element.author}</h6>
                                    <p className="card-text">{element.content.substring(0, 200)}...</p>
                                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                        <div className="card-text">
                                            <small className="text-muted">Reviewed on: {element.created_at.substring(0, 10)}</small>
                                        </div>
                                        <div>
                                            read more
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1>Similar movies - </h1>
                    <div style={{ display: 'grid', gridTemplateColumns: "repeat(4,1fr)",gap:"20px 35px"}}>
                        {similar ? (similar.length > 0 && similar.map(element => {
                            if (element.poster_path) {
                                return (<div key={element.id} style={{margin: "0px 45px 0px 45px"}}>
                                    <Link to={"/movie/" + element.title}>
                                        <img className="mt-2" src={"https://image.tmdb.org/t/p/w500/" + element.poster_path} width="150px" height="150px" alt={element.title} onClick={() => handleSubmit(element.id)} />
                                    </Link>
                                </div>
                                )
                            }
                        })) : (<h1>No similar movies available</h1>)
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MovieItems;
