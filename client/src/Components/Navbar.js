import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MovieItems.css';

function Navbar({ onMovieUpdate }) {
    const [underline, setUnderline] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleUpdate = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        onMovieUpdate(value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // You can add search submission logic here if needed
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            // Navigate to search results or trigger search
        }
    }

    const handleClick = (link) => {
        setUnderline(link)
    }

    const clearSearch = () => {
        setSearchValue('');
        onMovieUpdate('');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-cinema sticky-top">
            <div className="container-fluid navbar-container">
                <Link className="navbar-brand cinema-brand" to="/">
                    <span className="brand-icon">🎬</span>
                    CineSphere
                </Link>

                <button className="navbar-toggler cinema-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav cinema-nav me-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link cinema-link ${underline === 'popular' ? 'active' : ''}`}
                                to='/movies/popular'
                                onClick={() => handleClick('popular')}
                            >
                                <span className="nav-icon">🔥</span>
                                Trending
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link cinema-link ${underline === 'now-playing' ? 'active' : ''}`}
                                to='/movies/now-playing'
                                onClick={() => handleClick('now-playing')}
                            >
                                <span className="nav-icon">▶️</span>
                                Playing Now
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link cinema-link ${underline === 'top-rated' ? 'active' : ''}`}
                                to='/movies/top-rated'
                                onClick={() => handleClick('top-rated')}
                            >
                                <span className="nav-icon">⭐</span>
                                Top Rated
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link cinema-link ${underline === 'upcoming' ? 'active' : ''}`}
                                to='/movies/upcoming'
                                onClick={() => handleClick('upcoming')}
                            >
                                <span className="nav-icon">📅</span>
                                Upcoming
                            </Link>
                        </li>
                    </ul>

                    {/* Enhanced Search Section */}
                    <div className="search-wrapper">
                        <Link to='/search' style={{ width: '100%', textDecoration: 'none' }}>
                            <form onSubmit={handleOnSubmit} className="d-flex w-100" role="search">
                                <div className={`search-container ${searchFocused ? 'focused' : ''} ${searchValue ? 'has-value' : ''}`}>
                                    <input
                                        className="cinema-search"
                                        type="text"
                                        placeholder="Search movies, actors, directors..."
                                        aria-label="Search movies"
                                        value={searchValue}
                                        onChange={handleUpdate}
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                    />
                                    {searchValue && (
                                        <button
                                            type="button"
                                            className="search-clear"
                                            onClick={clearSearch}
                                            aria-label="Clear search"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </form>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar