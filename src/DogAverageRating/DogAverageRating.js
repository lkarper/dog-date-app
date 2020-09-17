import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating';
import './DogAverageRating.css';

const DogAverageRating = (props) => {
    const { reviews } = props;

    const calculateAverageWithArrayOfReviews = (reviews) => {
        return reviews.reduce((acc, curr) => {
            const { 
                friendliness_dogs,
                friendliness_people,
                playing_interest,
                obedience,
                profile_accuracy,
                location_suitability,
            } = curr;
            const averageRating = (
                friendliness_dogs +
                friendliness_people +
                playing_interest +
                obedience +
                profile_accuracy + 
                location_suitability 
            ) / 6;
            return acc + averageRating;
        }, 0) / reviews.length;
    }

    const totalAverage = calculateAverageWithArrayOfReviews(reviews);

    if (isNaN(totalAverage)) {
        return (
            <p>Average rating not available.</p>
        );
    }

    return (
        <div
            className='DogAverageRating__star-outer-container'
        >
            <p>Average rating:</p> 
            <StarRating rating={totalAverage.toFixed(2)} />
        </div>
    );
}

DogAverageRating.defaultProps = {
    reviews: [{}],
};

DogAverageRating.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.object),
};

export default DogAverageRating;
