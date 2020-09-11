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
        <li 
            className='DogReviewListItem__li'
        >
            <h3
                className='DogReviewListItem__h3'
            >
                <Link
                    className='link' 
                    to={`/reviews/${id}`}
                >
                    {review_title}
                </Link>
                {(!props.noImage && review.dog_profile.profile_img_url)
                    &&
                        <img
                            className='DogReviewListItem__img' 
                            src={review.dog_profile.profile_img_url} 
                            alt={`Avatar of the dog named ${review.dog_profile.name}.`} 
                        />
                }
                {(!props.noImage && !review.dog_profile.profile_img_url)
                    &&
                        <img
                            className='DogReviewListItem__img' 
                            src='/images/photo_not_available.png'
                            alt={`Avatar of the dog named ${review.dog_profile.name} not available.`} 
                        />
                }
            </h3>
            <p>Reviewed by {reviewer} on {moment(date_created).format("MMMM Do YYYY, h:mm a")}</p>
            <div 
                className='DogReviewListItem__star-outer-container'
            >
                <p>Overall rating:</p> 
                <StarRating rating={averageRating.toFixed(2)} />
            </div>
        </li>
    );
}

export default DogReviewListItem;
