import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import HowlListItem from '../HowlListItem/HowlListItem';

const HowlsList = (props) => {

    const context = useContext(UserContext);
    const { howls } = context;

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
                    {howls.map(howl => <HowlListItem key={howl.id} howl={howl} />)}
                </ol>
            </section>
        </>
    );
}

export default HowlsList;