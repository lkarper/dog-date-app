import React from 'react';

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

    return (
        <p>Average rating: {totalAverage.toFixed(2)} stars</p>
    );

}

export default DogAverageRating;