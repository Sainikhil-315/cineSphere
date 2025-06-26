import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function UpcomingMovies(props) {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const pathName = useLocation();

    const handleSubmit = (title) => {
        props.detailedView(title)
    }
    const handlePrev = () => {
        setPage(page - 1);
    }
    const handleNext = () => {
        setPage(page + 1)
    }

    
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });        
        const fetchNowPlaying = async () => {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${props.apiKey}&page=${page}`;
            const data = await fetch(url);
            const ParsedData = await data.json()
            // console.log(ParsedData);
            setResults(ParsedData.results);
        }
        fetchNowPlaying();
    }, [page, pathName])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} style={{ marginTop: "30px" }}>
            <h2 style={{ display: "flex", justifyContent: "center" }}>Upcoming Movies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>

                {results?.map((element) => {
                    if (element.poster_path) {
                        return (<div className="card" key={element.poster_path} style={{ width: "18rem", marginTop: "20px", marginLeft: "90px", marginBottom: "20px", display: "flex", justifyContent: "space-around" }}>
                            <Link to={"/movie/" + element.title}><img src={"https://image.tmdb.org/t/p/w500/" + element.poster_path} className="card-img-top" alt={element.title} onClick={() => { handleSubmit(element) }} /></Link>
                        </div>)
                    }
                })}
            </div>
            <div className='mx-5 my-5' style={{ display: "flex", justifyContent: "space-between" }}>
                <button className='btn btn-dark' disabled={page <= 1} onClick={handlePrev}>Previous</button>
                <button className='btn btn-dark' onClick={handleNext}>Next</button>
            </div>
        </motion.div>
    )
}

export default UpcomingMovies;
