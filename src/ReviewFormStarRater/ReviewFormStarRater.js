import React, { useState, useEffect } from 'react';
import './ReviewFormStarRater.css';

const ReviewFormStarRater = (props) => {

    const { classSuffix, currentState, setter, legendText } = props;

    const [starRating, setStarRating] = useState(currentState.toString());

    useEffect(() => {
        if (currentState !== starRating) {
            setter(starRating);
        }
    }, [setter, currentState, starRating]);

    return (
        <fieldset className="sub-fieldset">
            <legend>{legendText}</legend>
            <div className="ReviewFormStarRater__rate-container">
                
                    <input
                        tabIndex='5' 
                        type="radio" 
                        id={`star5-${classSuffix}`} 
                        name={`rate-${classSuffix}`} 
                        value="5" 
                        checked={starRating === '5'}
                        onChange={(e) => setStarRating(e.target.value)}
                        required
                    />
                    <label htmlFor={`star5-${classSuffix}`}>5 stars</label>
                
                    <input 
                        tabIndex='4'
                        type="radio" 
                        id={`star4-${classSuffix}`} 
                        name={`rate-${classSuffix}`} 
                        value="4" 
                        checked={starRating === '4'}
                        onChange={(e) => setStarRating(e.target.value)}
                        required
                    />
                    <label htmlFor={`star4-${classSuffix}`}>4 stars</label>
                
                    <input 
                        tabIndex='3'
                        type="radio" 
                        id={`star3-${classSuffix}`} 
                        name={`rate-${classSuffix}`} 
                        value="3" 
                        checked={starRating === '3'}
                        onChange={(e) => setStarRating(e.target.value)}
                        required
                    />
                    <label htmlFor={`star3-${classSuffix}`}>3 stars</label>
                
                    <input 
                        tabIndex='2'
                        type="radio" 
                        id={`star2-${classSuffix}`} 
                        name={`rate-${classSuffix}`} 
                        value="2" 
                        checked={starRating === '2'}
                        onChange={(e) => setStarRating(e.target.value)}
                        required
                    />
                    <label htmlFor={`star2-${classSuffix}`}>2 stars</label>
                
                    <input 
                        tabIndex='1'
                        type="radio" 
                        id={`star1-${classSuffix}`} 
                        name={`rate-${classSuffix}`} 
                        value="1" 
                        checked={starRating === '1'}
                        onChange={(e) => setStarRating(e.target.value)}
                        required
                    />
                    <label htmlFor={`star1-${classSuffix}`}>1 stars</label>                  
            </div>
        </fieldset>
    );
}

export default ReviewFormStarRater;
