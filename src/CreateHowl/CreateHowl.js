import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import MapForm from '../MapForm/MapForm';
import SelectDogForHowl from '../SelectDogForHowl/SelectDogForHowl';
import OneTimeMeetingForm from '../OneTimeMeetingForm/OneTimeMeetingForm';
import RecurringMeetingForm from '../RecurringMeetingForm/RecurringMeetingForm';
import ValidateDogSelection from '../validation-components/create-howl-validation/ValidateDogSelection';
import ValidateTime from '../validation-components/create-howl-validation/ValidateTime';
import ValidatePersonalMessage from '../validation-components/create-howl-validation/ValidatePersonalMessage';
import LocationForm from '../LocationForm/LocationForm';
import './CreateHowl.css';

const CreateHowl = (props) => {

    const context = useContext(UserContext);

    const [dogsForHowl, setDogsForHowl] = useState([]);
    const [dogsForHowlError, setDogsForHowlError] = useState(null);
    const [location, setLocation] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [coordinates, setCoordinates] = useState({});
    const [locationError, setLocationError] = useState([]);
    const [meetingType, setMeetingType] = useState('recurring');
    const [recurringMeetingWindows, setRecurringMeetingWindows] = useState([
        {
            dayOfWeek: '',
            startTime: '',
            endTime: '',
        },
    ]);
    const [oneTimeMeetingWindows, setOneTimeMeetingWindows] = useState(
        {
            date: '',
            timeWindows: [
                {
                    startTime: '',
                    endTime: '',
                },
            ],
        }
    );
    const [timeError, setTimeError] = useState(false);
    const [personalMessage, setPersonalMessage] = useState('');
    const [personalMessageError, setPersonalMessageError] = useState(null);

    const updateDogsForHowl = (id, checkedBool) => {
        if (checkedBool) {
            const newDogsArray = [...dogsForHowl, id];
            setDogsForHowl(newDogsArray);
        } else {
            const newDogsArray = dogsForHowl.filter(dogId => dogId !== id);
            setDogsForHowl(newDogsArray);
        }
    }

    const updateRecurringMeetingWindows = (index, dayOfWeek, startTime, endTime) => {
        const updatedWindow = {
            dayOfWeek,
            startTime,
            endTime,
        };

        const newRecurringMeetingWindows = [...recurringMeetingWindows];
        newRecurringMeetingWindows.splice(index, 1, updatedWindow);
        setRecurringMeetingWindows(newRecurringMeetingWindows);
    }

    const addRecurringMeetingWindow = () => {
        const newRecurringMeetingWindows = [
            ...recurringMeetingWindows, 
            {
                dayOfWeek: '',
                startTime: '',
                endTime: '',
            },
        ];
        setRecurringMeetingWindows(newRecurringMeetingWindows);
    }

    const removeRecurringMeetingWindow = (index) => {
        const newRecurringMeetingWindows = [...recurringMeetingWindows];
        newRecurringMeetingWindows.splice(index, 1);
        setRecurringMeetingWindows(newRecurringMeetingWindows)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newHowl = {
            id: uuidv4(),
            user_id: context.user.id,
            dog_ids: dogsForHowl,
            location: {
                ...location,
                lat: coordinates.lat,
                lon: coordinates.lon, 
            },
            meeting_type: meetingType,
            one_time_windows: meetingType === 'once' ? oneTimeMeetingWindows : {},
            recurring_windows: meetingType === 'recurring' ? recurringMeetingWindows : [],
            personal_message: personalMessage,
        };
        context.addHowl(newHowl);
    }

    return (
        <>
            <header>
                <h2>Howl now!</h2>
                <p>Look for friends for your dog!</p>
            </header>
        
            <section>
                <header>
                    <h2>Enter details below to create a howl</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Select your dog(s) to howl about</legend>
                        <div className='CreateHowl__dog-select-container'>
                            {context.dogs.map(dog => <SelectDogForHowl key={dog.id} dog={dog} dogsForHowl={dogsForHowl} updateDogsForHowl={updateDogsForHowl} /> )}
                        </div>
                        <div role='alert'>
                            <ValidateDogSelection 
                                dogsForHowl={dogsForHowl}
                                dogsForHowlError={dogsForHowlError}
                                setDogsForHowlError={setDogsForHowlError}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Where are you interested in meeting?</legend>
                        <div className='CreateHowl__map-outer-container'>
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
                    <fieldset>
                        <legend>When are you interested in meeting?</legend>
                        <fieldset>
                            <legend>What type of howl would you like to create?</legend>
                            <div>
                                <input 
                                    type='radio'
                                    name='meeting-type'
                                    id='meet-once'
                                    value='once'
                                    checked={meetingType === 'once'}
                                    onChange={(e) => setMeetingType(e.target.value)}
                                    required
                                />
                                <label htmlFor='meet-once'>One time meeting</label>
                            </div>
                            <div>
                                <input 
                                    type='radio'
                                    name='meeting-type'
                                    id='recurring-meeting'
                                    value='recurring'
                                    checked={meetingType === 'recurring'}
                                    onChange={(e) => setMeetingType(e.target.value)}
                                    required
                                />
                                <label htmlFor='recurring-meeting'>Recurring meeting</label>
                            </div>
                        </fieldset>
                        {meetingType === 'once' 
                            ? 
                                <div>    
                                    <OneTimeMeetingForm 
                                        currentData={oneTimeMeetingWindows}
                                        setOneTimeMeetingWindows={setOneTimeMeetingWindows}
                                    />
                                </div> 
                            :  
                                <div>
                                    <ol>
                                        {recurringMeetingWindows.map((window, i) => 
                                            <RecurringMeetingForm 
                                                key={i} 
                                                index={i}
                                                currentData={window} 
                                                updateRecurringMeetingWindows={updateRecurringMeetingWindows} 
                                                removeRecurringMeetingWindow={removeRecurringMeetingWindow}    
                                            />)
                                        }
                                    </ol>
                                    <button onClick={addRecurringMeetingWindow} type="button">Click to add another window</button>
                                </div>
                        }
                        <div role='alert'>
                            <ValidateTime 
                                meetingType={meetingType}
                                oneTimeMeetingWindows={oneTimeMeetingWindows}
                                recurringMeetingWindows={recurringMeetingWindows}
                                setTimeError={setTimeError}
                            />
                        </div>
                    </fieldset>
                    <div className='CreateHowl__description-container'>
                        <label htmlFor="howl-description">Add a personal message to go with your howl:</label>
                        <textarea 
                            className='CreateHowl__description'
                            id="howl-description" 
                            name="howl-description" 
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
                    <button 
                        type="submit"
                        disabled={
                            dogsForHowlError ||
                            locationError.length ||
                            timeError ||
                            personalMessageError
                        }
                    >Submit</button>
                </form>
            </section>
        </>
    );
}

export default CreateHowl;