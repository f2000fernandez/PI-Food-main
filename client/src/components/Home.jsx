import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to="/recipes">
                <button type='button'> HOME </button>
            </Link>
        </div>
    )
}

export default Home;