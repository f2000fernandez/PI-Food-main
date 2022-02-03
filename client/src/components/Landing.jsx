import React from 'react';
import { Link } from 'react-router-dom';
import './estilos/Landing.css';

const Landing = () => {
    return (
        <div className='landing'>
            <p className='welcome'>Welcome to the Henry food app</p>
            <p className='dev'>developed by: Francisco Fernandez</p>
            <Link to="/recipes">
                <button type='button'> GET STARTED! </button>
            </Link>
        </div>
    )
}

export default Landing;
