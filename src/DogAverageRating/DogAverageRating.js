import React from 'react';
import PropTypes from 'prop-types';

export const calculateAverageWithArrayOfReviews = (reviews) => {
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

const DogAverageRating = (props) => {
    const { reviews } = props;

    const totalAverage = calculateAverageWithArrayOfReviews(reviews);

    if (isNaN(totalAverage)) {
        return (
            <p>Average rating not available.</p>
        );
    }

    return (
        <p>Average rating: {totalAverage.toFixed(2)} stars</p>
    );

}

DogAverageRating.defaultProps = {
    reviews: [{}],
};

DogAverageRating.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.object),
};

export default DogAverageRating;
