import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import MapForm from '../MapForm/MapForm';
import SelectDogForHowl from '../SelectDogForHowl/SelectDogForHowl';
import OneTimeMeetingForm from '../OneTimeMeetingForm/OneTimeMeetingForm';
import RecurringMeetingForm from '../RecurringMeetingForm/RecurringMeetingForm';
import ValidateDogSelection from '../validation-components/create-howl-validation/ValidateDogSelection';
import ValidateTime from '../validation-components/create-howl-validation/ValidateTime';
import ValidatePersonalMessage from '../validation-components/create-howl-validation/ValidatePersonalMessage';
import LocationForm from '../LocationForm/LocationForm';
import ValidateTitle from '../validation-components/create-howl-validation/ValidateTitle';
import HowlsService from '../services/howls-service';
import './CreateHowl.css';

const CreateHowl = (props) => {

    const {
        suffix = '',
        howl = {
            dogs: [],
            howl_title: '',
            id: '',
            location: {
                address: '',
                city: '',
                lat: 0,
                lon: 0,
                state: '',
                zipcode: '',
            },
            meeting_type: '',
            date: '',
            time_windows: [],
            personal_message: '',
            user_id: '',
        },
    } = props;

    const context = useContext(UserContext);

    const [dogsForHowl, setDogsForHowl] = useState(howl.dogs.map(d => d.dog_id));
    const [dogsForHowlError, setDogsForHowlError] = useState(null);
    const [location, setLocation] = useState({
        address: howl.location.address,
        city: howl.location.city,
        state: howl.location.state,
        zipcode: howl.location.zipcode,
    });
    const [coordinates, setCoordinates] = useState({
        lat: howl.location.lat,
        lon: howl.location.lon,
    });
    const [locationError, setLocationError] = useState([]);
    const [meetingType, setMeetingType] = useState(howl.meeting_type || 'recurring');
    const [recurringMeetingWindows, setRecurringMeetingWindows] = useState(howl.meeting_type === 'recurring' 
        ?
            howl.time_windows.map(win => {
                return {
                    dayOfWeek: win.day_of_week,
                    startTime: win.start_time,
                    endTime: win.end_time
                }
            })
        :   
            [
                {
                    dayOfWeek: '',
                    startTime: '',
                    endTime: '',
                },
            ]);
    const [oneTimeMeetingWindows, setOneTimeMeetingWindows] = useState(howl.meeting_type === 'once'
        ?
            {
                date: howl.date,
                timeWindows: howl.time_windows.map(win => {
                    return {
                        startTime: win.start_time,
                        endTime: win.end_time
                    };
                }),
            }
        : 
            {
                date: '',
                timeWindows: [
                    {
                        startTime: '',
                        endTime: '',
                    },
                ],
            });
    const [timeError, setTimeError] = useState(false);
    const [howlTitle, setHowlTitle] = useState(howl.howl_title);
    const [howlTitleError, setHowlTitleError] = useState('');
    const [personalMessage, setPersonalMessage] = useState(howl.personal_message);
    const [personalMessageError, setPersonalMessageError] = useState(null);
    const [apiError, setApiError] = useState(false);

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
        setApiError(false);

        const newHowl = {
            howl_title: howlTitle,
            dog_ids: dogsForHowl,
            address: location.address,
            city: location.city,
            state: location.state,
            zipcode: location.zipcode,
            lat: coordinates.lat,
            lon: coordinates.lon, 
            meeting_type: meetingType,
            date: meetingType === 'once' ? oneTimeMeetingWindows.date : '',
            time_windows: meetingType === 'once' 
                ?
                    oneTimeMeetingWindows.timeWindows
                        .map(win => {
                            return {
                                day_of_week: '',
                                start_time: win.startTime,
                                end_time: win.endTime
                            };
                        })
                :
                    recurringMeetingWindows.map(win => {
                        return {
                            day_of_week: win.dayOfWeek,
                            start_time: win.startTime,
                            end_time: win.endTime
                        };
                    }),
            personal_message: personalMessage,
        };
        if (suffix) {
            HowlsService.updateHowl(howl.id, newHowl)
                .then(() => HowlsService.getHowlById(howl.id))
                .then(howl => {
                    context.updateHowl(howl);
                    props.forceUpdate(new Date().toJSON());
                    props.setShowEdit(false);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                }); 
        } else {
            HowlsService.createNewHowl(newHowl)
                .then(howl => {
                    context.addHowl(howl);
                    props.history.push(`/howls/${howl.id}`);
                })
                .catch(error => {
                    console.log(error)
                    setApiError(true);
                });
        }
    }

    return (
        <section className={`CreateHowl__section${suffix} section`}>
            <header>
                <h2>Enter details below to create a howl</h2>
            </header>
            {suffix 
                ? 
                    <button 
                        className={`CreateHowl__close-button${suffix}`}
                        onClick={() => props.setShowEdit(false)}
                    >
                        &#10006;
                    </button> 
                : 
                    ''
            }
            <form 
                className='CreateHowl__howl-form'
                onSubmit={handleSubmit}
            >
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
                            location={location}
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
                <div className='CreateHowl__description-outer-container'>
                    <div className='CreateHowl__title-container'>
                        <label 
                            className='CreateHowl__title-label'
                            htmlFor='howl-title'>Howl title: </label>
                        <input 
                            className='CreateHowl__title-input'
                            type='text'
                            id='howl-title'
                            name='howl-title'
                            maxLength='100'
                            aria-describedby='title-validator'
                            value={howlTitle}
                            onChange={(e) => setHowlTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div role='alert'>
                        <ValidateTitle 
                            title={howlTitle}
                            titleError={howlTitleError}
                            setTitleError={setHowlTitleError}
                        />
                    </div>
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
                        howlTitleError ||
                        personalMessageError
                    }
                >Submit</button>
            </form>
            {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
        </section>
    );
}

export default withRouter(CreateHowl);
