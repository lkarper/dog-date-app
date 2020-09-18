import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReviewFormStarRater.css';

const ReviewFormStarRater = (props) => {
    const { 
        classSuffix, 
        currentState, 
        setter, 
        required,
        legendText,
    } = props;

    const [starRating, setStarRating] = useState(currentState.toString());

    // Passes the currently checked radio box value to the parent component
    useEffect(() => {
        if (currentState !== starRating) {
            setter(starRating);
        }
    }, [setter, currentState, starRating]);

    return (
        <fieldset className='sub-fieldset'>
            <legend>{legendText}</legend>
            <div className='ReviewFormStarRater__rate-container'>                
                <input 
                    className={`ReviewFormStarRater__input `}
                    type='radio' 
                    id={`star1-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value='1' 
                    checked={starRating === '1'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required={required}
                />
                <label
                    className={`ReviewFormStarRater__label ${starRating && parseInt(starRating) >= 1 ? 'auto-selected': 'not-selected'}`}
                    htmlFor={`star1-${classSuffix}`}
                >
                    1 star
                </label>              
                <input 
                    className='ReviewFormStarRater__input'
                    type='radio' 
                    id={`star2-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value='2' 
                    checked={starRating === '2'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required={required}
                />
                <label 
                    className={`ReviewFormStarRater__label ${starRating && parseInt(starRating) >= 2 ? 'auto-selected': 'not-selected'}`}
                    htmlFor={`star2-${classSuffix}`}
                >
                    2 stars
                </label>
                <input 
                    className='ReviewFormStarRater__input'
                    type='radio' 
                    id={`star3-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value='3' 
                    checked={starRating === '3'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required={required}
                />
                <label 
                    className={`ReviewFormStarRater__label ${starRating && parseInt(starRating) >= 3 ? 'auto-selected': 'not-selected'}`}
                    htmlFor={`star3-${classSuffix}`}
                >
                    3 stars
                </label>
                <input 
                    className='ReviewFormStarRater__input'
                    type='radio' 
                    id={`star4-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value='4' 
                    checked={starRating === '4'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required={required}
                />
                <label 
                    className={`ReviewFormStarRater__label ${starRating && parseInt(starRating) >= 4 ? 'auto-selected': 'not-selected'}`}
                    htmlFor={`star4-${classSuffix}`}
                >
                    4 stars
                </label>
                <input 
                    className='ReviewFormStarRater__input'
                    type='radio' 
                    id={`star5-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value='5' 
                    checked={starRating === '5'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required={required}
                />
                <label 
                    className={`ReviewFormStarRater__label ${starRating && parseInt(starRating) === 5 ? 'auto-selected': 'not-selected'}`}
                    htmlFor={`star5-${classSuffix}`}
                >
                    5 stars
                </label>                
            </div>
        </fieldset>
    );
}

ReviewFormStarRater.defaultProps = {
    classSuffix: '', 
    currentState: '', 
    setter: () => {}, 
    required: false,
    legendText: '',
};

ReviewFormStarRater.propTypes = {
    classSuffix: PropTypes.string.isRequired, 
    currentState: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    setter: PropTypes.func.isRequired, 
    required: PropTypes.bool,
    legendText: PropTypes.string, 
};

export default ReviewFormStarRater;
