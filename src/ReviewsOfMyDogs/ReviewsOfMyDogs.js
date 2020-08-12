import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import './ReviewsOfMyDogs.css'; 

const ReviewsOfMyDogs = (props) => {

    const context = useContext(UserContext);

    const reviewsOfMyDogs = context.reviews
        .filter(review => {
            let found = false;
            context.dogs.forEach(dog => {
                if (dog.id === review.dog_id) {
                    found = true;
                }
            });
            return found;
        });

    return (
        <section className='ReviewsOfMyDogs__section section'>
            <header>
                <h3>Reviews of my dogs</h3>
            </header>
            {reviewsOfMyDogs.length
                ?
                    <ul className='ReviewsOfMyDogs__ul'>
                        {reviewsOfMyDogs.map(review => <DogReviewListItem key={review.id} review={review} />)}
                    </ul>
                :
                    <p>No reviews of my dogs yet.</p>
            }
        </section>
    );
}

export default ReviewsOfMyDogs;