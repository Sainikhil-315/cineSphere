import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MovieItems.css';

function Navbar({ onMovieUpdate }) {
    const [underline, setUnderline] = useState(false);
    const handleUpdate = (event) => {
        event.preventDefault();
        onMovieUpdate(event.target.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
    }
    const handleClick = (link) => {
        setUnderline(link)
    }
    return (
        <nav className="sticky-top navbar navbar-expand-lg text-light" style={{backgroundColor: "#722f37"}}>
            <div className="container-fluid" style={{gap:"220px"}}>
                <Link className="navbar-brand text-light" to="/">CineSphere</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='text-light navbar-nav me-auto' style={{ listStyleType: "none", gap:"30px"}}>
                        <Link className='text-light text-decoration-none' to='/movies/popular'><li className='nav-item' style={{textDecoration: underline === 'popular'?"underline":"none", transition: "textDecoration 1.3s ease"}} onClick={() => handleClick('popular')}>Trending</li></Link>
                        <Link className='text-light text-decoration-none' to='/movies/now-playing'><li className='nav-item' style={{textDecoration: underline === 'now-playing'?"underline":"none", transition: "textDecoration 1.3s ease"}} onClick={() => handleClick('now-playing')}>Playing Now</li></Link>
                        <Link className='text-light text-decoration-none' to='/movies/top-rated'><li className='nav-item' style={{textDecoration: underline === 'top-rated'?"underline":"none", transition: "textDecoration 1.3s ease"}} onClick={() => handleClick('top-rated')}>Top Rated</li></Link>
                        <Link className='text-light text-decoration-none' to='/movies/upcoming'><li className='nav-item' style={{textDecoration: underline === 'upcoming'?"underline":"none", transition: "textDecoration 1.3s ease"}} onClick={() => handleClick('upcoming')}>Upcoming Movies</li></Link>
                    </ul>
                </div>
                <Link to='/search'>
                    <form onSubmit={handleOnSubmit} className="d-flex" role="search">
                        <input className="form-control"
                            type="search"
                            placeholder="Search for a Movie"
                            aria-label="Search"
                            onChange={handleUpdate} />
                    </form>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
