import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import ReviewFormStarRater from '../ReviewFormStarRater/ReviewFormStarRater';
import MapForm from '../MapForm/MapForm';
import LocationForm from '../LocationForm/LocationForm';
import ValidatePersonalMessage from '../validation-components/create-howl-validation/ValidatePersonalMessage/ValidatePersonalMessage';
import ReviewsService from '../services/reviews-service';
import ValidateTitle from '../validation-components/create-howl-validation/ValidateTitle/ValidateTitle';
import './DogReviewForm.css';

const DogReviewForm = (props) => {
    const context = useContext(UserContext);

    const { 
        dogName,
        dog_id,
        suffix,
        review,
    } = props;

    const [friendlinessDogs, setFriendlinessDogs] = useState(review.friendliness_dogs);
    const [friendlinessPeople, setFriendlinessPeople] = useState(review.friendliness_people);
    const [playingInterest, setPlayingInterest] = useState(review.playing_interest);
    const [obedience, setObedience] = useState(review.obedience);
    const [profileAccuracy, setProfileAccuracy] = useState(review.profile_accuracy);
    const [locationSuitability, setLocationSuitability] = useState(review.location_suitability);
    const [coordinates, setCoordinates] = useState({
        lat: review.location.lat,
        lon: review.location.lon,
    });
    const [location, setLocation] = useState({
        address: review.location.address,
        city: review.location.city,
        state: review.location.state,
        zipcode: review.location.zipcode,
    });
    const [locationError, setLocationError] = useState([]);
    const [reviewTitle, setReviewTitle] = useState(review.review_title);
    const [reviewTitleError, setReviewTitleError] = useState('');
    const [personalMessage, setPersonalMessage] = useState(review.personal_message);
    const [personalMessageError, setPersonalMessageError] = useState('');
    const [date, setDate] = useState(review.date)
    const [startTime, setStartTime] = useState(review.start_time)
    const [endTime, setEndTime] = useState(review.end_time);
    const [apiError, setApiError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    
    // Sets the max. date of playdate to today, since you cannot review events in the future
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 
        ? `0${today.getMonth() + 1}` 
        : today.getMonth() + 1;
    const day = today.getDate() < 10 
        ? `0${today.getDate()}` 
        : today.getDate(); 
    const maxDate = `${year}-${month}-${day}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoading(true);
        setApiError(false);
        const newReview = {
            date_created: new Date().toJSON(),
            dog_id,
            review_title: reviewTitle,
            reviewer: context.user.username,
            friendliness_dogs: parseInt(friendlinessDogs),
            friendliness_people: parseInt(friendlinessPeople),
            playing_interest: parseInt(playingInterest),
            obedience: parseInt(obedience),
            profile_accuracy: parseInt(profileAccuracy),
            location_suitability: parseInt(locationSuitability),
            address: location.address,
            city: location.city,
            state: location.state,
            zipcode: location.zipcode,
            lat: coordinates.lat,
            lon: coordinates.lon,
            date,
            start_time: startTime,
            end_time: endTime,
            personal_message: personalMessage,
        };

        // The suffix prop is only supplied if the component is being used to update a review
        if (suffix) {
            ReviewsService.updateReview(review.id, newReview)
                .then(() => {
                    props.setShowEdit(false);
                    props.forceUpdate(new Date().toJSON());
                    setShowLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setShowLoading(false);
                    setApiError(true);
                })

        } else {
            ReviewsService.createNewReview(newReview)
                .then(review => {
                    props.history.push(`/reviews/${review.id}`);
                })
                .catch(error => {
                    console.log(error);
                    setShowLoading(false);
                    setApiError(true);
                });
        }
    }

    if (!dog_id) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and the URL and try again.</p>
        );
    }

    return (
        <form 
            className={`DogReviewForm__review-form ${suffix}`}
            onSubmit={handleSubmit}
        >
            <fieldset
                className='DogReviewForm__fieldset outer-fieldset'
            >
                <legend>How would you rate {dogName} on the following</legend>
                <ReviewFormStarRater 
                    classSuffix='fd'
                    currentState={friendlinessDogs}
                    setter={setFriendlinessDogs}
                    required={true}
                    legendText='Friendliness towards other dogs'
                />
                <ReviewFormStarRater 
                    classSuffix='fp'
                    currentState={friendlinessPeople}
                    setter={setFriendlinessPeople}
                    required={true}
                    legendText='Friendliness towards people'
                />
                <ReviewFormStarRater 
                    classSuffix='ip'
                    currentState={playingInterest}
                    setter={setPlayingInterest}
                    required={true}
                    legendText='Interest in playing'
                />
                <ReviewFormStarRater 
                    classSuffix='o'
                    currentState={obedience}
                    setter={setObedience}
                    required={true}
                    legendText='Obedience'
                />
                <ReviewFormStarRater 
                    classSuffix='acc'
                    currentState={profileAccuracy}
                    setter={setProfileAccuracy}
                    required={true}
                    legendText='Accuracy of profile'
                />
            </fieldset>
            <fieldset
                className='DogReviewForm__fieldset outer-fieldset'
            >
                <legend>Meeting and Location</legend>
                <fieldset 
                    className='DogReviewForm__fieldset sub-fieldset'
                >
                    <legend>When did your dogs play?</legend>
                    <div 
                        className='DogReviewForm__input-container'
                    >
                        <label 
                            htmlFor='date'
                        >
                            Date:{' '} 
                        </label>
                        <input 
                            type='date' 
                            id='date' 
                            name='date' 
                            placeholder='yyyy-mm-dd' 
                            value={date}
                            max={maxDate}
                            onChange={(e) => setDate(e.target.value)}
                            required    
                        />
                    </div>
                    <div 
                        className='DogReviewForm__input-container'
                    >
                        <label 
                            htmlFor='start-time'
                        >
                            Start time:{' '} 
                        </label>
                        <input 
                            type='time' 
                            id='start-time' 
                            name='start-time' 
                            placeholder='10:30' 
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </div>
                    <div 
                        className='DogReviewForm__input-container'
                    >
                        <label 
                            htmlFor='end-time'
                        >
                            End time:{' '} 
                        </label>
                        <input 
                            type='time' 
                            id='end-time' 
                            name='end-time' 
                            placeholder='16:00' 
                            min={startTime}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>
                </fieldset>
                <fieldset 
                    className='DogReviewForm__fieldset sub-fieldset'
                >
                    <legend>Where did your dog play with {dogName}?</legend>
                    <div 
                        className='DogReviewForm__map-outer-container'
                    >
                        <LocationForm
                            location={location}
                            setLocationError={setLocationError} 
                            setLocation={setLocation}
                        />
                        <MapForm 
                            coordinates={coordinates}
                            setCoordinates={setCoordinates}
                        />
                    </div>
                </fieldset>
                <ReviewFormStarRater 
                    classSuffix='loc'
                    currentState={locationSuitability}
                    setter={setLocationSuitability}
                    required={true}
                    legendText={`How would you rate this location's suitability for a dog date?`}
                />
            </fieldset>
            <fieldset 
                className='DogReviewForm__fieldset outer-fieldset'
            >
                <legend>Title and Message</legend>
                <fieldset 
                    className='DogReviewForm__fieldset sub-fieldset'
                >
                    <div 
                        className='DogReviewForm__title-container'
                    >
                        <label 
                            className='DogReviewForm__title-label'
                            htmlFor='review-title'
                        >
                            Review title:{' '} 
                        </label>
                        <input 
                            className='DogReviewForm__title-input'
                            type='text'
                            id='review-title'
                            name='review-title'
                            maxLength='100'
                            aria-describedby='howl-title-validator'
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div 
                        className='DogReviewForm__alert-div validate-title'
                        role='alert'
                    >
                        <ValidateTitle
                            title={reviewTitle}
                            titleError={reviewTitleError}
                            setTitleError={setReviewTitleError}
                        />
                    </div>
                </fieldset>
                <fieldset 
                    className='DogReviewForm__fieldset sub-fieldset'
                >
                    <legend>Add a personal note here</legend>
                    <div 
                        className='DogReviewForm__message-container'
                    >
                        <label 
                            htmlFor='review-note'
                        >
                            Add a personal note to go with your review:
                        </label>
                        <textarea 
                            id='review-note' 
                            name='review-note' 
                            maxLength='2000' 
                            rows='10'
                            placeholder='(Write your personal note here.)' 
                            aria-describedby='personal-message-validator'
                            value={personalMessage}
                            onChange={(e) => setPersonalMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div 
                        className='DogReviewForm__alert-div personal-message'
                        role='alert'
                    >
                        <ValidatePersonalMessage 
                            personalMessage={personalMessage}
                            personalMessageError={personalMessageError}
                            setPersonalMessageError={setPersonalMessageError}
                        />
                    </div>
                </fieldset>
            </fieldset>
            <button 
                className='DogReviewForm__submit button'
                type='submit'
                disabled={
                    reviewTitleError || 
                    personalMessageError || 
                    locationError.length
                }
            >
                Submit
            </button>
            {suffix &&
                <button
                    className='DogReviewForm__button button'
                    type='button'
                    onClick={() => props.setShowEdit(false)}
                >
                    Cancel edit
                </button>
            }
            <div 
                role='alert'
            >
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
            {showLoading && 
                <div className='DogReviewForm__loading-container'>
                    <FontAwesomeIcon 
                        className='DogReviewForm__loading' 
                        icon={faSpinner} 
                        spin 
                    />
                </div>
            }
        </form>
    );
}

DogReviewForm.defaultProps = {
    dogName: '',
    dog_id: '',
    suffix: '',
    review: {
        id: '',
        date_created: '',
        dog_id: '',
        review_title: '',
        reviewer: '',
        friendliness_dogs: '',
        friendliness_people: '',
        playing_interest: '',
        obedience: '',
        profile_accuracy: '',
        location_suitability: '',
        location: {
            address: '',
            city: '',
            state: '',
            zipcode: '',
            lat: 0,
            lon: 0,
        },
        date: '',
        start_time: '',
        end_time: '',        
        personal_message: '',
    },
    setShowEdit: () => {},
    forceUpdate: () => {},
};

DogReviewForm.propTypes = {
    dogName: PropTypes.string.isRequired,
    dog_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    suffix: PropTypes.string.isRequired,
    review: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        date_created: PropTypes.string,
        dog_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        review_title: PropTypes.string,
        reviewer: PropTypes.string,
        friendliness_dogs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        friendliness_people: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        playing_interest: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        obedience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile_accuracy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location_suitability: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location: PropTypes.shape({
            address: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            zipcode: PropTypes.string,
            lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        date: PropTypes.string,
        start_time: PropTypes.string,
        end_time: PropTypes.string,        
        personal_message: PropTypes.string,
    }).isRequired,
};

export default withRouter(DogReviewForm);
