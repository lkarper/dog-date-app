import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import './HowlPageDogProfile.css';

const HowlPageDogProfile = (props) => {

    const context = useContext(UserContext);
    
    const { dog_profile } = props;

    const reviews = context.reviews.filter(review => review.dog_id === dog_profile.id);

    return (
        <li className='HowlPageDogProfile__li'>
            <header className='HowlPageDogProfile__header'>
                <h3>
                    <Link
                        to={`/dog-profile/${dog_profile.id}`}    
                    >
                        {dog_profile.name}
                    </Link>
                </h3>
                <img 
                    className='HowlPageDogProfile__img'
                    src={dog_profile.profile_img_url}
                    alt={`Avatar for the dog named ${dog_profile.name}.`} 
                />
            </header>
            <section>
                <header>
                    <h4>About {dog_profile.name}:</h4>
                </header>
                <p>{dog_profile.owner_description}</p>
                <p>Age: {dog_profile.age_months ? `${dog_profile.age_years} years, ${dog_profile.age_months}, months` : `${dog_profile.age_years}`}</p>
                <p>Breed: {dog_profile.breed || `(not listed)`}</p>
                <p>Weight: {dog_profile.weight ? `${dog_profile.weight} lbs` : `(Not listed)`}</p>
                <p>Sex: {dog_profile.sex || `(not listed)`}</p>
            </section>
            <section>
                <header>
                    <h4>Characteristics</h4>
                </header>
                <DogProfileCharacteristics dog_profile={dog_profile}/>
            </section>
            <section>
                <header>
                    <h4>Reviews of {dog_profile.name}</h4>
                </header>
                {context.user.id === dog_profile.owner_id 
                    ? '' 
                    : <Link to={`/leave-review/${dog_profile.id}`}>Leave your own review of {dog_profile.name}</Link>
                }
                {reviews.length 
                    ? 
                        <div className='HowlPageDogProfile__reviews-container'>
                            <DogAverageRating 
                                reviews={reviews}
                            />
                            <ul className='HowlPageDogProfile__reviews-ul'>
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
