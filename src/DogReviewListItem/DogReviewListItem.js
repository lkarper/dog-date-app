import React, { useContext } from 'react';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const DogReviewListItem = (props) => {

    const context = useContext(UserContext);

    const { review } = props;
    const { 
        id,
        reviewer,
        date_created,
        friendliness_dogs,
        friendliness_people,
        playing_interest,
        obedience,
        profile_accuracy,
        location_suitability,
    } = review;

    const dog = context.allDogs.find(dog => dog.id === review.dog_id);

    const averageRating = (
        friendliness_dogs +
        friendliness_people +
        playing_interest +
        obedience +
        profile_accuracy + 
        location_suitability 
    ) / 6;

    return (
        <li>
            <h3><Link to={`/reviews/${id}`}>Review of {dog.name}</Link></h3>
            <p>Reviewed by {reviewer} on {moment(date_created).format("MMMM Do YYYY, h:mm a")}</p>
            <p>Overall rating: {averageRating.toFixed(2)} stars</p>
        </li>
    )
}

export default DogReviewListItem;