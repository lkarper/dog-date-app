import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import HowlListItem from '../HowlListItem/HowlListItem';
import DogProfilePageHeaderButtons from '../DogProfilePageHeaderButtons/DogProfilePageHeaderButtons';
import DogReviewListItem from '../DogReviewListItem/DogReviewListItem';
import DogAverageRating from '../DogAverageRating/DogAverageRating';
import DogProfilesService from '../services/dog-profiles-service';
import ReviewsService from '../services/reviews-service';
import HowlsService from '../services/howls-service';
import CreateDogProfile from '../CreateDogProfile/CreateDogProfile';
import './DogProfilePage.css';

const DogProfilePage = (props) => {
    const context = useContext(UserContext);

    const { id } = props.match.params;

    const [dog, setDog] = useState();
    const [reviews, setReviews] = useState();
    const [howls, setHowls] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        if (!showEdit) {
            window.scrollTo(0, 0);
        }
    }, [showEdit]);

    useEffect(() => {
        window.scrollTo(0, 0);
        DogProfilesService.fetchDogProfileById(id)
            .then(dog => {
                setApiError(false);
                setDog(dog);
            })
            .catch(error => {
                console.log(error);
                setApiError(true);
            });
    }, [id, setApiError, setDog]);

    useEffect(() => {
        if (dog) {
            Promise.all([
                ReviewsService.fetchReviewsByDogId(dog.id),
                HowlsService.fetchHowlByDogId(dog.id)
            ])
                .then(res => Promise.all(res.map(res => res.json())))
                .then(values => {
                    setApiError(false);
                    const dogReviews = values[0];
                    const dogHowls = values[1];
                    setReviews(dogReviews);
                    setHowls(dogHowls);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                })
        }
    }, [dog]);

    if (dog) {
        return (
            <section
                className='DogProfilePage__outer-section'
                aria-live='polite'
            >
                <header>
                    <h1>Dog Profile</h1>
                </header>
                <section
                    className='DogProfilePage__section section'
                >
                    <header 
                        className='DogProfilePage__header'
                    >
                        <h2>{dog.name}</h2>
                    </header>
                    {dog.profile_img_url 
                            ?
                                <img
                                    className='DogProfilePage__profile-img' 
                                    src={dog.profile_img_url} 
                                    alt={`Avatar of the dog named ${dog.name}.`} 
                                />
                            :
                                <img
                                    className='DogProfilePage__profile-img' 
                                    src='/images/photo_not_available.png'
                                    alt={`Avatar of the dog named ${dog.name} not available.`} 
                                />
                    }
                    <DogProfilePageHeaderButtons 
                        dog_profile={dog}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                    />
                </section>                
                <div
                    className='DogProfilePage__edit-div'
                    aria-live='polite'
                >
                    {showEdit 
                        ? 
                            <CreateDogProfile 
                                setShowEdit={setShowEdit}
                                setDog={setDog} 
                                dog_profile={dog} 
                                suffix=' edit ' 
                            />
                        : ''
                    }
                </div>
                {!showEdit &&
                    <>
                        <section 
                            className='DogProfilePage__section section'
                        >
                            <header 
                                className='DogProfilePage__header'
                            >
                                <h2>About {dog.name}</h2>
                            </header>
                            <p>{dog.owner_description}</p>
                            <p>Age: {' '} 
                                {dog.age_months 
                                    ? 
                                        `${dog.age_years === 1 
                                            ? 
                                                `${dog.age_years} year` 
                                            : 
                                                `${dog.age_years} years`
                                        }, ${dog.age_months === 1 
                                            ? 
                                                `${dog.age_months} month` 
                                            : 
                                                `${dog.age_months} months`
                                        }` 
                                    : 
                                        `${dog.age_years}`
                                }
                            </p>
                            <p>Breed: {dog.breed || `(not listed)`}</p>
                            <p>Weight: {dog.weight ? `${dog.weight} lbs` : `(Not listed)`}</p>
                            <p>Sex: {dog.sex || `(not listed)`}</p>
                        </section>
                        <section
                            className='DogProfilePage__section section'
                        >
                            <header 
                                className='DogProfilePage__header'
                            >
                                <h2>Characteristics</h2>
                            </header>
                            <DogProfileCharacteristics dog_profile={dog}/>
                        </section>
                        <section
                            className='DogProfilePage__section section'
                        >
                            <header 
                                className='DogProfilePage__header'
                            >
                                <h2>Howls about {dog.name}</h2>
                            </header>
                            <ul 
                                className='DogProfilePage__howls-list'
                            >
                                {(howls && howls.length > 0) && 
                                    howls.map(howl => 
                                        <HowlListItem key={howl.id} howl={howl}/>
                                    )
                                }
                                {(howls && howls.length === 0) && (
                                    <p>No howls featuring {dog.name} yet. <Link to='/create-howl'>Create a howl now!</Link></p>
                                )}
                                {!howls && <p>Loading...</p>}
                            </ul>
                        </section>
                        <section
                            className='DogProfilePage__section section'
                        >
                            <header className='DogProfilePage__header'>
                                <h2>Reviews of {dog.name}</h2>
                            </header>
                            {context.user.id === dog.owner.id 
                                ? '' 
                                : <Link to={`/leave-review/${dog.id}`}>Leave your own review of {dog.name}</Link>
                            }
                            {(reviews && reviews.length > 0)
                                &&
                                    <div>
                                        <DogAverageRating 
                                            reviews={reviews}
                                        />
                                        <ul className='DogProfilePage__reviews-list'>
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
                            {(reviews && reviews.length === 0) && <p>No reviews of {dog.name} yet.</p>}
                            {!reviews && <p>Loading...</p>}
                        </section>
                    </>
                }
            </section>
        );
    }

    if (apiError) {
        return (
            <section 
                className='DogProfilePage__section section'
                aria-live='polite'
            >
                <header>
                    <h1>Woof...</h1>
                </header>
                <p>Somthing went wrong while loading the dog profile.  Please check the url and your connection and try again.</p>
            </section>
        );
    }

    if (!id) {
        return (
            <section
                className='DogProfilePage__section section error'
                aria-live='polite'
            >
                <p>Error: Could not load profile.  Check your connection and the URL and try again.</p>
            </section>
        );    
    }

    return (
        <section
            aria-live='polite'
        >
            <p>Loading...</p>
        </section>
    );
}

DogProfilePage.defaultProps = {
    match: {
        params: {
            id: '',
        }
    },
}

DogProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default DogProfilePage;
