import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StateSelector from '../StateSelector/StateSelector';
import ValidateZipCode from '../validation-components/create-howl-validation/ValidateZipCode';
import HowlsPageAdvancedSearch from '../HowlsPageAdvancedSearch/HowlsPageAdvancedSearch';
import ReviewFormStarRater from '../ReviewFormStarRater/ReviewFormStarRater';
import './HowlsPageFilterForm.css';

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
                <ReviewFormStarRater
                    classSuffix='sort'
                    currentState={ratingFilter}
                    setter={setRatingFilter}
                    required={false}
                    legendText='Average rating of dog(s) equal to or greater than'
                />
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

HowlsPageFilterForm.defaultProps = {
    data: {
        stateP: '',
        setStateP: () => {},
        zipcodeP: '',
        setZipcodeP: () => {},
        ratingFilterP: '',
        setRatingFilterP: () => {},
        typeOfMeetingP: '',
        setTypeOfMeetingP: () => {},
        daysOfWeekP: [],
        setDaysOfWeekP: () => {},
        dateP: '',
        setDateP: () => {},
        timeWindowsP: [],
        setTimeWindowsP: () => {},
        recurringMeetingWindowsP: [],
        setRecurringMeetingWindowsP: () => {},
        handleSubmit: () => {},
    },
}

HowlsPageFilterForm.propTypes = {
    data: PropTypes.shape({
        stateP: PropTypes.string,
        setStateP: PropTypes.func,
        zipcodeP: PropTypes.string,
        setZipcodeP: PropTypes.func,
        ratingFilterP: PropTypes.string,
        setRatingFilterP: PropTypes.func,
        typeOfMeetingP: PropTypes.string,
        setTypeOfMeetingP: PropTypes.func,
        daysOfWeekP: PropTypes.arrayOf(PropTypes.string),
        setDaysOfWeekP: PropTypes.func,
        dateP: PropTypes.string,
        setDateP: PropTypes.func,
        timeWindowsP: PropTypes.arrayOf(PropTypes.object),
        setTimeWindowsP: PropTypes.func,
        recurringMeetingWindowsP: PropTypes.arrayOf(PropTypes.object),
        setRecurringMeetingWindowsP: PropTypes.func,
        handleSubmit: PropTypes.func,
    }).isRequired,
}

export default HowlsPageFilterForm;
