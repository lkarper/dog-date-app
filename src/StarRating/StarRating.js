import React from 'react';
import PropTypes from 'prop-types';
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

StarRating.defaultProps = {
    rating: 0,
};

StarRating.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default StarRating;