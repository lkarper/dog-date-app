import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';

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
        <section>
            <header>
                <h3>Recent reviews of my dogs</h3>
            </header>
            {reviewsOfMyDogs.length
                ?
                    <ul>
                        {reviewsOfMyDogs.map(review => <DogReviewListItem key={review.id} review={review} />)}
                    </ul>
                :
                    <p>No reviews of my dogs yet.</p>
            }
        </section>
    );
}

export default ReviewsOfMyDogs;