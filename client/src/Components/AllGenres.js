import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MovieItems.css';

function AllGenres(props) {
    console.log(props);
    const [genres, setGenres] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const fetchGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${props.apiKey}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setGenres(parsedData.genres);
    }
    const handleGenre = (genre) => {
        props.genreById(genre);
    }
    const handleMouseEnter = (id) => {
        setHoveredItem(id);
    }
    const handleMouseLeave = () => {
        setHoveredItem(null)
    }

    useEffect(() => {
        fetchGenres();
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="row g-5 mx-4 my-3 justify-content-center"
        >
            {genres.map((element) => (
                <div key={element.id} className="col-12 col-sm-6 col-md-4">
                    <Link to={`/genre/${element.name}`} onClick={() => handleGenre(element.id)} className="text-decoration-none">
                        <div
                            className={`card bg-dark text-warning shadow genre-card ${hoveredItem === element.id ? 'scale-up' : ''}`}
                            onMouseOver={() => handleMouseEnter(element.id)}
                            onMouseLeave={handleMouseLeave}
                            style={{ borderRadius: "30px", height: "12rem", transition: "transform 0.3s ease" }}
                        >
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <h3 className="text-center">{element.name}</h3>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </motion.div>
    )
}

export default AllGenres
