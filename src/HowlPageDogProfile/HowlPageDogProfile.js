import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import ReviewsService from '../services/reviews-service';
import './HowlPageDogProfile.css';

const HowlPageDogProfile = (props) => {
    const context = useContext(UserContext);
    
    const { 
        dog_profile, 
        dog_id, 
        owner, 
    } = props;

    const [reviews, setReviews] = useState();
    const [apiError, setApiError] = useState(false);

    // Fetches reviews of a dog for display with profile
    useEffect(() => {
        if (dog_id) {
            ReviewsService.getReviewsByDogId(dog_id)
            .then(reviews => {
                setReviews(reviews);
            })
            .catch(error => {
                console.log(error);
                setApiError(true);
            });

        }
    }, [dog_id, setReviews]);

    if (!dog_id) {
        return (
            <li className='HowlPageDogProfile__li error'>
                <p>
                    Error: Could not load profile.  Check your connection and the URL and try again.
                </p>
            </li>
        );
    }

    return (
        <li className='HowlPageDogProfile__li'>
            <header className='HowlPageDogProfile__header'>
                <h3>
                    <Link
                        to={`/dog-profile/${dog_id}`}    
                    >
                        {dog_profile.name}
                    </Link>
                </h3>
                {dog_profile.profile_img_url 
                        ?
                            <img
                                className='HowlPageDogProfile__img' 
                                src={dog_profile.profile_img_url} 
                                alt={`Avatar of the dog named ${dog_profile.name}.`} 
                            />
                        :
                            <img
                                className='HowlPageDogProfile__img' 
                                src='/images/photo_not_available.png'
                                alt={`Avatar of the dog named ${dog_profile.name} not available.`} 
                            />
                }
            </header>
            <section>
                <header>
                    <h4>About {dog_profile.name}:</h4>
                </header>
                <p>{dog_profile.owner_description}</p>
                <p>Age: {' '} 
                    {dog_profile.age_months 
                        ? 
                            `${dog_profile.age_years === 1 
                                ? 
                                    `${dog_profile.age_years} year` 
                                : 
                                    dog_profile.age_years !== 0 ? `${dog_profile.age_years} years, ` : ''
                            }${dog_profile.age_months === 1 
                                ? 
                                    `${dog_profile.age_months} month` 
                                : 
                                    `${dog_profile.age_months} months`
                            }` 
                        : 
                            `${dog_profile.age_years}`
                    }
                </p>
                <p>Breed: {dog_profile.breed || `(Not listed)`}</p>
                <p>Weight: {dog_profile.weight ? `${dog_profile.weight} lbs` : `(Not listed)`}</p>
                <p>Sex: {dog_profile.sex || `(Not listed)`}</p>
            </section>
            <section>
                <header>
                    <h4>Characteristics</h4>
                </header>
                <DogProfileCharacteristics dog_profile={dog_profile} />
            </section>
            <section aria-live='polite'>
                <header>
                    <h4>Reviews of {dog_profile.name}</h4>
                </header>
                {/* If the user is the owner of the profile, no need to ask if they'd like to leave a review of the dog */}
                {context.user.id === owner.id || <Link to={`/leave-review/${dog_id}`}>Leave your own review of {dog_profile.name}</Link>}
                {(reviews && reviews.length > 0) 
                    && 
                        <div className='HowlPageDogProfile__reviews-container'>
                            <DogAverageRating 
                                reviews={reviews}
                            />
                            <ul className='HowlPageDogProfile__reviews-ul'>
                                {reviews.map(review => 
                                    <DogReviewListItem 
                                        key={review.id} 
                                        review={review}
                                        noImage={true} 
                                    />
                                )}
                            </ul>
                        </div>
                }
                {(reviews && reviews.length=== 0)
                    &&
                        <p>No reviews of {dog_profile.name} yet.</p>
                }
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </section>
        </li>
    );
}

HowlPageDogProfile.defaultProps = {
    dog_id: '',
    dog_profile: {
        age_months: '',
        age_years: '',
        aggressive: false,
        breed: '',
        dislikes_children: false,
        dislikes_men: false,
        dislikes_puppies: false,
        dislikes_women: false,
        elderly_dog: false,
        energy: '',
        leash_aggression: false,
        little_time_with_other_dogs: false,
        much_experience_with_other_dogs: false,
        name: '',
        obedience: '',
        owner_description: '',
        prefers_people: false,
        profile_img_url: '',
        recently_adopted: false,
        sex: '',
        temperment: '',
        weight: '',
    },
    owner: {
        email: '',
        id: '',
        phone: '',
        username: '',
    },
};

HowlPageDogProfile.propTypes = {
    dog_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dog_profile: PropTypes.shape({
        age_months: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        age_years: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        aggressive: PropTypes.bool,
        breed: PropTypes.string,
        dislikes_children: PropTypes.bool,
        dislikes_men: PropTypes.bool,
        dislikes_puppies: PropTypes.bool,
        dislikes_women: PropTypes.bool,
        elderly_dog: PropTypes.bool,
        energy: PropTypes.string,
        leash_aggression: PropTypes.bool,
        little_time_with_other_dogs: PropTypes.bool,
        much_experience_with_other_dogs: PropTypes.bool,
        name: PropTypes.string,
        obedience: PropTypes.string,
        owner_description: PropTypes.string,
        prefers_people: PropTypes.bool,
        profile_img_url: PropTypes.string,
        recently_adopted: PropTypes.bool,
        sex: PropTypes.string,
        temperment: PropTypes.string,
        weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    owner: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        phone: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,
};

export default HowlPageDogProfile;
