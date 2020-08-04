import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';

const HowlPageDogProfile = (props) => {

    const context = useContext(UserContext);
    
    const { dog_profile } = props;

    const reviews = context.reviews.filter(review => review.dog_id === dog_profile.id);

    return (
        <li>
            <header>
                <h3>
                    <Link
                        to={`/dog-profile/${dog_profile.id}`}    
                    >
                        {dog_profile.name}
                    </Link>
                </h3>
                <img 
                    src={dog_profile.profile_img_url}
                    alt={`Avatar for the dog named ${dog_profile.name}.`} 
                />
            </header>
            <section>
                <header>
                    <h3>About {dog_profile.name}:</h3>
                </header>
                <p>{dog_profile.owner_description}</p>
                <section>
                    <p>Age: {dog_profile.age_months ? `${dog_profile.age_years} years, ${dog_profile.age_months}, months` : `${dog_profile.age_years}`}</p>
                    <p>Breed: {dog_profile.breed || `(not listed)`}</p>
                    <p>Weight: {dog_profile.weight ? `${dog_profile.weight} lbs` : `(Not listed)`}</p>
                    <p>Sex: {dog_profile.sex || `(not listed)`}</p>
                </section>
            <DogProfileCharacteristics dog_profile={dog_profile}/>
            </section>
            <section>
                <header>
                    <h2>Reviews of {dog_profile.name}</h2>
                </header>
                {context.user.id === dog_profile.owner_id 
                    ? '' 
                    : <Link to={`/leave-review/${dog_profile.id}`}>Leave your own review of {dog_profile.name}</Link>
                }
                {reviews.length 
                    ? 
                        <div>
                            <DogAverageRating 
                                reviews={reviews}
                            />
                            <ul>
                                {reviews.map(review => <DogReviewListItem key={review.id} review={review} />)}
                            </ul>
                        </div>
                    :
                        <p>No reviews of {dog_profile.name} yet.</p>
            }
            </section>
        </li>
    );
}

export default HowlPageDogProfile;
