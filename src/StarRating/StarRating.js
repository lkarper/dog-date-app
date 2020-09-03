import React from 'react';
import './StarRating.scss';

const StarRating = (props) => {
    
    const { rating } = props;

    return (
        <div 
            className="StarRating__stars" 
            style={{ '--rating': `${rating}` }} 
            aria-label={`Rating is ${rating} out of 5.`}
        />
    );
}

export default StarRating;