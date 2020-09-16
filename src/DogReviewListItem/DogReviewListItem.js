import React from 'react';
import PropTypes from 'prop-types';
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

    if (!id) {
        return (
            <li
                className='DogReviewListItem__li error'
            >
                <p>Error: could not load review info.  Check your connection and the URL and try again.</p>
            </li>
        )
    }

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

DogReviewListItem.defaultProps = {
    review: {
        id: '',
        review_title: '',
        reviewer: '',
        date_created: '',
        friendliness_dogs: 0,
        friendliness_people: 0,
        playing_interest: 0,
        obedience: 0,
        profile_accuracy: 0,
        location_suitability: 0,
    },
    noImage: false,
};

DogReviewListItem.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        review_title: PropTypes.string,
        reviewer: PropTypes.string,
        date_created: PropTypes.string,
        friendliness_dogs: PropTypes.number,
        friendliness_people: PropTypes.number,
        playing_interest: PropTypes.number,
        obedience: PropTypes.number,
        profile_accuracy: PropTypes.number,
        location_suitability: PropTypes.number,
    }).isRequired,
    noImage: PropTypes.bool,
}

export default DogReviewListItem;
