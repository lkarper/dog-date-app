import React from 'react';
import PropTypes from 'prop-types';
import './StarRating.scss';

const StarRating = (props) => {    
    const { rating } = props;

    return (
        <div 
            className="StarRating__stars" 
            /* 
                Passes the --rating variable to .scss file; 
                this variable is used to create the star rating graphic.
            */
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
