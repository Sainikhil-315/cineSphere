import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Movies(props) {
    const [results, setResults] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleSubmit = (title) => {
        props.detailedView(title)
    }
    const handleMouseEnter = (id) => {
        setHoveredItem(id);
    }
    const handleMouseLeave = () => {
        setHoveredItem(null);
    }


    const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&query=${props.searchMovie}`
        const data = await fetch(url);
        const parsedData = await data.json()

        setResults(parsedData.results);

    }
    useEffect(() => {
        /*eslint-disable */
        fetchMovies();
    }, [props.searchMovie]);
    return (
        <>
            <h1 className='mx-5 mt-5 text-align-center text-warning'>{props.searchMovie ? "Results for - " + props.searchMovie : ""}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", rowGap: "10px", columnGap: "35px", margin: "0px 100px 0px 100px" }}>

                {[...results].sort((a, b) => {
                    const popA = a.popularity ?? 0;
                    const popB = b.popularity ?? 0;
                    return popB - popA;
                })?.map((element) => {
                    if (element.poster_path) {
                        return (<div className="card" key={element.poster_path} style={{ width: "18rem", marginTop: "70px", marginLeft: "20px", transform: hoveredItem === element.poster_path ? "scale(1.06)" : "scale(1)", transition: '0.3s' }}
                            onMouseOver={() => handleMouseEnter(element.poster_path)} onMouseLeave={handleMouseLeave}>
                            <Link to={"/movie/" + element.title}>
                                <img src={"https://image.tmdb.org/t/p/w500/" + element.poster_path} className="card-img-top" alt={element.title} onClick={() => { handleSubmit(element) }} />
                                <div
                                    className="position-absolute bottom-0 w-100 px-3 py-2 d-flex justify-content-between align-items-center"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
                                        borderBottomLeftRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                    }}
                                >
                                    <h6 className="mb-0 text-white text-truncate">{element.original_title}</h6>
                                    <span className="badge bg-warning text-dark">
                                        <i className="fas fa-star me-1"></i>
                                        {element.vote_average?.toFixed(1) ?? 'N/A'}
                                    </span>
                                </div>
                            </Link>
                        </div>)
                    }
                })}
            </div>
        </>
    )
}

export default Movies
