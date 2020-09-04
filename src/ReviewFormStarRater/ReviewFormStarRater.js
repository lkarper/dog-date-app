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
                    type="radio" 
                    id={`star1-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value="1" 
                    checked={starRating === '1'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                />
                <label
                    className={starRating && parseInt(starRating) >= 1 && `auto-selected`} 
                    htmlFor={`star1-${classSuffix}`}
                    style={{
                        color: `${starRating && parseInt(starRating) >= 1 ? '#ffc700' : '#ccc'}`
                    }}
                >
                    1 stars
                </label>              
                <input 
                    type="radio" 
                    id={`star2-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value="2" 
                    checked={starRating === '2'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                />
                <label 
                    htmlFor={`star2-${classSuffix}`}
                    style={{
                        color: `${starRating && parseInt(starRating) >= 2 ? '#ffc700' : '#ccc'}`
                    }}
                >
                    2 stars
                </label>
                <input 
                    type="radio" 
                    id={`star3-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value="3" 
                    checked={starRating === '3'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                />
                <label 
                    htmlFor={`star3-${classSuffix}`}
                    style={{
                        color: `${starRating && parseInt(starRating) >= 3 ? '#ffc700' : '#ccc'}`
                    }}
                >
                    3 stars
                </label>
            
                <input 
                    type="radio" 
                    id={`star4-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value="4" 
                    checked={starRating === '4'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                />
                <label 
                    htmlFor={`star4-${classSuffix}`}
                    style={{
                        color: `${starRating && parseInt(starRating) >= 4 ? '#ffc700' : '#ccc'}`
                    }}
                >
                    4 stars
                </label>
            
                <input 
                    type="radio" 
                    id={`star5-${classSuffix}`} 
                    name={`rate-${classSuffix}`} 
                    value="5" 
                    checked={starRating === '5'}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                />
                <label 
                    htmlFor={`star5-${classSuffix}`}
                    style={{
                        color: `${starRating && parseInt(starRating) === 5 ? '#ffc700' : '#ccc'}`
                    }}
                >
                    5 stars
                </label>                
            </div>
        </fieldset>
    );
}

export default ReviewFormStarRater;
