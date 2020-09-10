import React, { useState, useEffect } from 'react';
import StateSelector from '../StateSelector/StateSelector';
import ValidateZipCode from '../validation-components/create-howl-validation/ValidateZipCode';
import HowlsPageAdvancedSearch from '../HowlsPageAdvancedSearch/HowlsPageAdvancedSearch';
import './HowlsPageFilterForm.css';
import ReviewFormStarRater from '../ReviewFormStarRater/ReviewFormStarRater';

const HowlsPageFilterForm = (props) => {

    const {
        stateP,
        setStateP,
        zipcodeP,
        setZipcodeP,
        ratingFilterP,
        setRatingFilterP,
        typeOfMeetingP,
        setTypeOfMeetingP,
        daysOfWeekP,
        setDaysOfWeekP,
        dateP,
        setDateP,
        timeWindowsP,
        setTimeWindowsP,
        recurringMeetingWindowsP,
        setRecurringMeetingWindowsP,
        handleSubmit,
    } = props.data;

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [timeErrorP, setTimeErrorP] = useState('');

    useEffect(() => {
        if (state !== stateP) {
            setStateP(state);
        }
    }, [state, stateP, setStateP]);

    useEffect(() => {
        if (zipcode !== zipcodeP) {
            setZipcodeP(zipcode);
        }
    }, [zipcode, zipcodeP, setZipcodeP]);

    useEffect(() => {
        if (ratingFilter !== ratingFilterP) {
            setRatingFilterP(ratingFilter);
        }
    }, [ratingFilter, ratingFilterP, setRatingFilterP]);

    return (
        <form 
            className='HowlsPageFilterForm__form'
            onSubmit={handleSubmit}
        >
            <fieldset
                className='HowlsPageFilterForm__fieldset outer-fieldset'
            >
                <legend>Filter howls by:</legend>
                <fieldset className='HowlsPageFilterForm__fieldset sub-fieldset'>
                    <legend>Location</legend>
                    <StateSelector 
                        setState={setState}
                        notRequired={true}
                        propState={state}
                    />
                <div>
                    <label htmlFor='zipcode'>ZIP code:</label>
                    <input 
                        type='text'
                        id='zipcode'
                        name='zipcode'
                        value={zipcode}
                        aria-describedby='zipcode-validator'
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>
                <div 
                    className='HowlsPageFilterForm__zipcode-alert'
                    role='alert'
                >
                    <ValidateZipCode 
                        zipcode={zipcode}
                        zipcodeError={zipcodeError}
                        setZipcodeError={setZipcodeError}
                        notRequired={true}
                    />
                </div>
                </fieldset>
                <fieldset className='HowlsPageFilterForm__fieldset sub-fieldset'>
                    <ReviewFormStarRater
                        classSuffix='sort'
                        currentState={ratingFilter}
                        setter={setRatingFilter}
                        legendText='Average rating of dog(s) equal to or greater than'
                    />
                </fieldset>
                <div aria-live='polite'>
                    {showAdvanced 
                        ?
                            <>
                                <button
                                    className='HowlsPageFilterForm__button button'
                                    type='button'
                                    onClick={() => setShowAdvanced(false)}
                                >
                                    Hide advanced search options
                                </button>
                                <HowlsPageAdvancedSearch 
                                    data={{
                                        typeOfMeetingP,
                                        setTypeOfMeetingP,
                                        daysOfWeekP,
                                        setDaysOfWeekP,
                                        dateP,
                                        setDateP,
                                        timeWindowsP,
                                        setTimeWindowsP,
                                        timeErrorP,
                                        recurringMeetingWindowsP,
                                        setRecurringMeetingWindowsP,
                                        setTimeErrorP,
                                    }}
                                />
                            </>
                        :
                            <button 
                                className='HowlsPageFilterForm__button button'
                                type='button'
                                onClick={() => setShowAdvanced(true)}
                            >
                                Show advanced search options
                            </button> 
                    }
                </div>
            </fieldset>
            <button 
                className='HowlsPageFilterForm__button button'
                type='submit'
                disabled={zipcodeError || timeErrorP}
            >
                Search howls
            </button>
        </form>
    );
}

export default HowlsPageFilterForm;
