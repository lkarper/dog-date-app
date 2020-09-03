import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './DogReviewListItem.css';

const DogReviewListItem = (props) => {
    const { review } = props;

    const { 
        id,
        review_title,
        reviewer,
        date_created,
        friendliness_dogs,
        friendliness_people,
        playing_interest,
        obedience,
        profile_accuracy,
        location_suitability,
    } = review;

    const averageRating = (
        friendliness_dogs +
        friendliness_people +
        playing_interest +
        obedience +
        profile_accuracy + 
        location_suitability 
    ) / 6;

    return (
        <li className='DogReviewListItem__li'>
            <h3
                className='DogReviewListItem__h3'
            >
                <Link
                    className='link' 
                    to={`/reviews/${id}`}
                >
                    {review_title}
                </Link>
            </h3>
            <p>Reviewed by {reviewer} on {moment(date_created).format("MMMM Do YYYY, h:mm a")}</p>
            <p>Overall rating:</p> 
            <StarRating rating={averageRating.toFixed(2)} />
        </li>
    );
}

export default DogReviewListItem;
