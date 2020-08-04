import React, { useState, useEffect} from 'react';
import StateSelector from '../StateSelector/StateSelector';
import ValidateZipCode from '../validation-components/create-howl-validation/ValidateZipCode';

const HowlsPageFilterForm = (props) => {

    const {
        stateP,
        setStateP,
        zipcodeP,
        setZipcodeP,
        ratingFilterP,
        setRatingFilterP,
        handleSubmit,
    } = props.data;

    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');

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
            <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Filter howls by:</legend>
                <fieldset className="sub-fieldset">
                    <legend>Location</legend>
                    <StateSelector 
                        setState={setState}
                        notRequired={true}
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
                <div role='alert'>
                    <ValidateZipCode 
                        zipcode={zipcode}
                        zipcodeError={zipcodeError}
                        setZipcodeError={setZipcodeError}
                        notRequired={true}
                    />
                </div>
                </fieldset>
                <fieldset className="sub-fieldset">
                    <legend>Average rating of dog(s)</legend>
                    <div>
                        <input 
                            type="radio" 
                            id="sort-howls-rating-4" 
                            name="sort-howls-rating" 
                            value="4"
                            checked={ratingFilter === '4'}
                            onChange={(e) => setRatingFilter(e.target.value)} 
                        />
                        <label htmlFor="sort-howls-rating-4">4+</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="sort-howls-rating-3" 
                            name="sort-howls-rating" 
                            value="3"
                            checked={ratingFilter === '3'}
                            onChange={(e) => setRatingFilter(e.target.value)}  
                        />
                        <label htmlFor="sort-howls-rating-3">3+</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="sort-howls-rating-2" 
                            name="sort-howls-rating" 
                            value="2" 
                            checked={ratingFilter === '2'}
                            onChange={(e) => setRatingFilter(e.target.value)} 
                        />
                        <label htmlFor="sort-howls-rating-2">2+</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="sort-howls-rating-any" 
                            name="sort-howls-rating" 
                            value="" 
                            checked={ratingFilter === ''}
                            onChange={(e) => setRatingFilter(e.target.value)}  
                        />
                        <label htmlFor="sort-howls-rating-any">Show all howls regardless of rating</label>
                    </div>
                </fieldset>
            </fieldset>
            <button 
                type='submit'
                disabled={zipcodeError}
            >
                Search howls
            </button>
        </form>
    )
}

export default HowlsPageFilterForm;