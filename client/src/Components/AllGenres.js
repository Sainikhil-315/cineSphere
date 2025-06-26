import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", rowGap: "20px", columnGap:"35px", margin: "30px 100px 20px 100px" }} >
            {genres.map(element => {
                return (
                    <Link to={'/genre/'+element.name}  key={element.id}>
                        <div className="card" style={{transform:hoveredItem===element.id?"scale(1.1)":"scale(1)", transition:"0.5s", height:"12rem", boxShadow:"5px 5px 5px 0px rgba(55, 66, 66,0.2)",borderRadius:"40px"}} onMouseOver={() => handleMouseEnter(element.id)} onMouseLeave={handleMouseLeave} onClick={() => {handleGenre(element.id)}}>
                            <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h3>{element.name}</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </motion.div>
    )
}

export default AllGenres
