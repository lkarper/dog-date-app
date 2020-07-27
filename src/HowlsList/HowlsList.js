import React from 'react';
import { Link } from 'react-router-dom';

const HowlsList = (props) => {
    return (
        <>
            <header>
                <h2>What are people howling about?</h2>
                <Link
                    to='/create-howl'    
                >
                    Start howling yourself!
                </Link>
            </header> 
            <form>
                <fieldset>
                    <legend>Filter howls by:</legend>
                    <fieldset class="sub-fieldset">
                        <legend>Distance</legend>
                        <div>
                            <input type="radio" id="sort-howls-distance-5" name="sort-howls-distance" value="5" checked />
                            <label for="sort-howls-distance-5">Less than 5 miles away</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-distance-15" name="sort-howls-distance" value="15" />
                            <label for="sort-howls-distance-15">Less than 15 miles away</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-distance-25" name="sort-howls-distance" value="25" />
                            <label for="sort-howls-distance-25">Less than 25 miles away</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-distance-any" name="sort-howls-distance" value="any" />
                            <label for="sort-howls-distance-any">Show all howls regardless of location</label>
                        </div>
                    </fieldset>
                    <fieldset class="sub-fieldset">
                        <legend>Average rating of dog(s)</legend>
                        <div>
                            <input type="radio" id="sort-howls-rating-4" name="sort-howls-rating" value="4" />
                            <label for="sort-howls-rating-4">4+</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-rating-3" name="sort-howls-rating" value="3" />
                            <label for="sort-howls-rating-3">3+</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-rating-2" name="sort-howls-rating" value="2" />
                            <label for="sort-howls-rating-2">2+</label>
                        </div>
                        <div>
                            <input type="radio" id="sort-howls-rating-any" name="sort-howls-rating" value="any" checked />
                            <label for="sort-howls-rating-any">Show all howls regardless of rating</label>
                        </div>
                    </fieldset>
                </fieldset>
                <a href="">Advanced Search</a>
            </form>
            <section>
                <header>
                    <h2>Dogs howling for a playmate</h2>
                </header>
                <ol>
                    <li>
                        <h2>Looking for 1-3 small dogs for some fetch!</h2>
                        <p>Dog: Seymour</p>
                        <p>Avg. rating: 4.7 (10 reviews)</p>
                        <p>Availability:</p>
                            <ul class="availability">
                                <li>Mondays: 1:00 - 3:00 PM</li>
                                <li>Saturdays: 9:00 AM - 2:00 PM</li>
                            </ul>
                        <p>Location: Central Park, New New York, New York</p>
                        <p>2 dogs are interested!</p>
                    </li>
                    <li>
                        <h2>Race around the yard with me!</h2>
                        <p>Dog: Santos L. Halper</p>
                        <p>Avg. rating: 4.3 (15 reviews)</p>
                        <p>Availability:</p>
                            <ul class="availability">
                                <li>Saturday, August 10: 10:00 AM - 12:00 PM</li>
                            </ul>
                        <p>Location: 742 Evergreen Terrace, Springfield</p>
                        <p>No dogs interested yet...</p>
                    </li>
                </ol>
            </section>
        </>
    );
}

export default HowlsList;