import React, { useState, useEffect } from 'react';
import ReviewFormStarRater from '../ReviewFormStarRater/ReviewFormStarRater';
import MapForm from '../MapForm/MapForm';
import LocationForm from '../LocationForm/LocationForm';
import ValidatePersonalMessage from '../validation-components/create-howl-validation/ValidatePersonalMessage';
import './DogReviewForm.css';

const DogReviewForm = (props) => {

    const { 
        friendlinessDogsP,
        friendlinessPeopleP,
        playingInterestP,
        obedienceP,
        profileAccuracyP,
        locationSuitabilityP,
        coordinatesP,
        locationP,
        personalMessageP,
        whenP,
        setFriendlinessDogsP,
        setFriendlinessPeopleP,
        setPlayingInterestP,
        setObedienceP,
        setProfileAccuracyP,
        setLocationSuitabilityP,
        setCoordinatesP,
        setLocationP,
        setPersonalMessageP,
        setWhenP,
    } = props;

    const [friendlinessDogs, setFriendlinessDogs] = useState('');
    const [friendlinessPeople, setFriendlinessPeople] = useState('');
    const [playingInterest, setPlayingInterest] = useState('');
    const [obedience, setObedience] = useState('');
    const [profileAccuracy, setProfileAccuracy] = useState('');
    const [locationSuitability, setLocationSuitability] = useState('');
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [locationError, setLocationError] = useState([]);
    const [personalMessage, setPersonalMessage] = useState('');
    const [personalMessageError, setPersonalMessageError] = useState('');
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const newWhen = {
            date,
            startTime,
            endTime,
        };
        if (whenP.date !== date || whenP.startTime !== startTime || whenP.endTime !== endTime) {
            setWhenP(newWhen);
        } 
    }, [date, startTime, endTime, whenP, setWhenP]);

    useEffect(() => {
        if (personalMessageP !== personalMessage) {
            setPersonalMessageP(personalMessage);
        }
    }, [personalMessage, personalMessageP, setPersonalMessageP]);

    useEffect(() => {
        if (locationP.address !== location.address || 
            locationP.city !== location.city || 
            locationP.state !== location.state || 
            locationP.zipcode !== location.zipcode) {
            setLocationP(location);
        }
    }, [location, locationP, setLocationP]);

    useEffect(() => {
        if (friendlinessDogsP !== friendlinessDogs) {
            setFriendlinessDogsP(friendlinessDogs);
        }
    }, [friendlinessDogsP, setFriendlinessDogsP, friendlinessDogs]);

    useEffect(() => {
        if (friendlinessPeopleP !== friendlinessPeople) {
            setFriendlinessPeopleP(friendlinessPeople);
        }
    }, [friendlinessPeople, friendlinessPeopleP, setFriendlinessPeopleP]);

    useEffect(() => {
        if (playingInterestP !== playingInterest) {
            setPlayingInterestP(playingInterest);
        }
    }, [playingInterest, playingInterestP, setPlayingInterestP]);

    useEffect(() => {
        if (obedienceP !== obedience) {
            setObedienceP(obedience);
        }
    }, [obedience, obedienceP, setObedienceP]);

    useEffect(() => {
        if (profileAccuracyP !== profileAccuracy) {
            setProfileAccuracyP(profileAccuracy);
        }
    }, [profileAccuracy, profileAccuracyP, setProfileAccuracyP]);

    useEffect(() => {
        if (locationSuitabilityP !== locationSuitability) {
            setLocationSuitabilityP(locationSuitability);
        }
    }, [locationSuitability, locationSuitabilityP, setLocationSuitabilityP]);

    useEffect(() => {
        if (Object.keys(coordinatesP).length !== 2) {
            setCoordinatesP(coordinates);        
        } else {
            if (coordinatesP.lon !== coordinates.lon || coordinatesP.lat !== coordinates.lat) {
                setCoordinatesP({
                    lat: coordinates.lat,
                    lon: coordinates.lon,
                });
            }
        }
    }, [coordinates, coordinatesP, setCoordinatesP]);

    const today = new Date();
    const maxDate = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

    return (
        <form className='review-form'>
            <fieldset>
                <legend>How would you rate Seymour on the following:</legend>
                <ReviewFormStarRater 
                    classSuffix='fd'
                    currentState={friendlinessDogs}
                    setter={setFriendlinessDogs}
                    legendText='Friendliness towards other dogs'
                />
                <ReviewFormStarRater 
                    classSuffix='fp'
                    currentState={friendlinessPeople}
                    setter={setFriendlinessPeople}
                    legendText='Friendliness towards people'
                />
                <ReviewFormStarRater 
                    classSuffix='ip'
                    currentState={playingInterest}
                    setter={setPlayingInterest}
                    legendText='Interest in playing'
                />
                <ReviewFormStarRater 
                    classSuffix='o'
                    currentState={obedience}
                    setter={setObedience}
                    legendText='Obedience'
                />
                <ReviewFormStarRater 
                    classSuffix='acc'
                    currentState={profileAccuracy}
                    setter={setProfileAccuracy}
                    legendText='Accuracy of profile'
                />
                
            </fieldset>
            <fieldset>
                <legend>Meeting and Location</legend>
                <fieldset className="sub-fieldset">
                    <legend>When did your dogs play?</legend>
                    <label htmlFor="date">Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        placeholder="yyyy-mm-dd" 
                        value={date}
                        max={maxDate}
                        onChange={(e) => setDate(e.target.value)}
                        required    
                    />
                    <label htmlFor="start-time">Start time:</label>
                    <input 
                        type="time" 
                        id="start-time" 
                        name="start-time" 
                        placeholder="10:30" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <label htmlFor="end-time">End time:</label>
                    <input 
                        type="time" 
                        id="end-time" 
                        name="end-time" 
                        placeholder="16:00" 
                        min={startTime}
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </fieldset>
                    <hr />
                <fieldset className="sub-fieldset">
                    <legend>Where did your dog play with Seymour?</legend>
                    <div className='DogReviewForm__map-outer-container'>
                        <LocationForm
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
                    legendText={`How would you rate this location's suitability for a dog date?`}
                />
            </fieldset>
            <fieldset>
                <legend>Add a personal note here</legend>
                <div className='DogReviewForm__message-container'>
                    <label htmlFor="review-note">Add a personal message to go with your howl:</label>
                    <textarea 
                        id="review-note" 
                        name="review-note" 
                        maxLength="2000" 
                        rows='10'
                        placeholder="(Write your personal message here)" 
                        aria-describedby="personal-message-validator"
                        value={personalMessage}
                        onChange={(e) => setPersonalMessage(e.target.value)}
                    ></textarea>
                </div>
                <div role='alert'>
                    <ValidatePersonalMessage 
                        personalMessage={personalMessage}
                        personalMessageError={personalMessageError}
                        setPersonalMessageError={setPersonalMessageError}
                    />
                </div>
            </fieldset>
            <button 
                type="submit"
                disabled={personalMessageError || locationError.length}
            >Submit</button>
        </form>
    );
}

export default DogReviewForm;
