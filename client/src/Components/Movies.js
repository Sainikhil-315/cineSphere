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
        // console.log(results)
        // console.log("Poster : ", results[0]?.poster_path)

    }
    useEffect(() => {
        /*eslint-disable */
        fetchMovies();
    }, [props.searchMovie]);
    return (
        <>
            <h1 className='mx-5 mt-5 text-align-center'>{props.searchMovie?"Results for - "+props.searchMovie:""}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", rowGap: "10px", columnGap: "35px", margin: "0px 100px 0px 100px" }}>

                {results?.map((element) => {
                    if (element.poster_path) {
                        return (<div className="card" key={element.poster_path} style={{ width: "18rem", marginTop: "70px", marginLeft: "20px", transform: hoveredItem === element.poster_path ? "scale(1.1)" : "scale(1)", transition: '0.3s' }}
                            onMouseOver={() => handleMouseEnter(element.poster_path)} onMouseLeave={handleMouseLeave}>
                            <Link to={"/movie/" + element.title}><img src={"https://image.tmdb.org/t/p/w500/" + element.poster_path} className="card-img-top" alt={element.title} onClick={() => { handleSubmit(element) }} /></Link>
                            {/* <div className="card-body">
                            <h5 className="card-title">{element.title ? element.title : ""}</h5>
                            <p className="card-text">
                                {element.overview}
                            </p>
                            <p className="text-muted">{element.release_date}</p>
                            <p><strong>Rating: {element.vote_average}</strong></p>
                        </div> */}
                        </div>)
                    }
                })}
            </div>
        </>
    )
}

export default Movies
