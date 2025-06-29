import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PersonDetails({ apiKey, detailedView }) {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);

    const handleSubmit = (title) => {
        detailedView(title)
    }

    useEffect(() => {
        const fetchPerson = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
            const data = await res.json();
            setPerson(data);
        };

        const fetchCredits = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`);
            const data = await res.json();
            setCredits(data.cast || []);
        };

        fetchPerson();
        fetchCredits();

    }, [id, apiKey]);

    if (credits) { console.log(credits); }

    return person ? (
        <div className="container my-5">
            <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                <img
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={person.name}
                    className="rounded shadow me-md-4 mb-3 mb-md-0"
                />
                <div>
                    <h2 className="text-warning">{person.name}</h2>
                    <p className="text-muted">{person.biography || 'No biography available.'}</p>
                </div>
            </div>

            <h4 className="mb-3 text-warning">Filmography</h4>
            <div className="row g-4">
                {[...credits].filter(element => element.poster_path).sort((a, b) => {
                    const popA = a.popularity ?? 0;
                    const popB = b.popularity ?? 0;
                    return popB - popA;
                }).map((element) => (
                    <div key={element.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Link to={"/movie/" + element.title}>
                            <img src={"https://image.tmdb.org/t/p/w500/" + element.poster_path} className="card-img-top" alt={element.title} onClick={() => { handleSubmit(element) }} />
                            <div
                                className="position-relative bottom-0 w-100 px-3 py-2 d-flex justify-content-between align-items-center"
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
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p className="text-center my-5">Loading cast details...</p>
    );
}

export default PersonDetails;
