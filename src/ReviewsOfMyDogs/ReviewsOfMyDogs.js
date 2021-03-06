import React, { useState, useEffect } from 'react';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import ReviewsService from '../services/reviews-service';
import './ReviewsOfMyDogs.css'; 

const ReviewsOfMyDogs = (props) => {
    const [reviews, setReviews] = useState();
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        ReviewsService.getReviewsByOwnerId()
            .then(reviews => {
                setApiError(false);
                setReviews(reviews);
            })
            .catch(error => {
                console.log(error);
                setApiError(true);
            });
    }, [props, setApiError, setReviews]);

    return (
        <section className='ReviewsOfMyDogs__section section'>
            <header>
                <h2>Reviews of my Dogs</h2>
            </header>
            {reviews && (reviews.length > 0
                ?
                    <ul className='ReviewsOfMyDogs__ul'>
                        {reviews.map(review => <DogReviewListItem key={review.id} review={review} />)}
                    </ul>
                :
                    <p>No reviews of my dogs yet.</p>)
            }
            {(!reviews && !apiError) && <p>Loading...</p>}
            <div role='alert'>
                {apiError && <p>Could not fetch reviews at this time.</p>}
            </div>
        </section>
    );
}

export default ReviewsOfMyDogs;
