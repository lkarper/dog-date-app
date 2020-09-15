import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import ReviewsService from '../services/reviews-service';
import './HowlPageDogProfile.css';

const HowlPageDogProfile = (props) => {

    const context = useContext(UserContext);
    
    const { dog_profile, dog_id, owner } = props;

    const [reviews, setReviews] = useState();
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        ReviewsService.getReviewsByDogId(dog_id)
            .then(reviews => {
                setReviews(reviews);
            })
            .catch(error => {
                console.log(error);
                setApiError(true);
            });
    }, [dog_id, setReviews]);

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
                                                `${dog_profile.age_years} year`
                                        }, 
                                        ${dog_profile.age_months === 1 
                                            ? 
                                                `${dog_profile.age_months} month` 
                                            : 
                                                `${dog_profile.age_months} months`
                                        }` 
                                    : 
                                        `${dog_profile.age_years}`
                                }
                            </p>
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
            <section aria-live='polite'>
                <header>
                    <h4>Reviews of {dog_profile.name}</h4>
                </header>
                {context.user.id === owner.id 
                    ? '' 
                    : <Link to={`/leave-review/${dog_id}`}>Leave your own review of {dog_profile.name}</Link>
                }
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

export default HowlPageDogProfile;
