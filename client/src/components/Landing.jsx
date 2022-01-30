import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <p className='wecolme'>Welcome to the Henry food app</p>
            <p className='dev'>developed by: Francisco Fernandez</p>
            <Link to="/recipes">
                <button type='button'> GET STARTED! </button>
            </Link>
        </div>
    )
}

export default Landing;
