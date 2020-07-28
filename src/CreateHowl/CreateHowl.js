import React, { useState } from 'react';
import MapForm from '../MapForm/MapForm';
import CurrentLocation from '../CurrentLocation/CurrentLocation';

const CreateHowl = (props) => {

    const [coordinates, setCoordinates] = useState({});
    const [address, setAddress] = useState('');

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
                <form className='howl-form'>
                    <fieldset>
                        <legend>Select your dog(s) to howl about</legend>
                        <div>
                            <input type="checkbox" id="Seymour" name="Seymour" value="Seymour" />
                            <label htmlFor="Seymour"><p>[<em>Placeholder for image of Seymour</em>]</p></label>
                        </div>
                        <div>
                            <input type="checkbox" id="Nibbler" name="Nibbler" value="Nibbler" />
                            <label htmlFor="Seymour"><p>[<em>Placeholder for image of Nibbler</em>]</p></label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Where are you interested in meeting?</legend>
                        <div className='MapForm__outer-container'>
                            <fieldset>
                                <legend>Enter the address for your meeting place here</legend>
                                <div>
                                    <label htmlFor='address'>Address:</label>
                                    <input 
                                        type="text" 
                                        id="address" 
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)} 
                                        required
                                    />
                                </div>
                            </fieldset>
                            <MapForm setCoordinates={setCoordinates} />
                        </div>
                        <div role='alert'>
                            <CurrentLocation address={address} coordinates={coordinates} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>When are you interested in meeting?</legend>
                        <fieldset className="sub-fieldset">
                            <legend>Looking for a one-time meeting on a specific date:</legend>
                            <label htmlFor="once-date">Date:</label>
                            <input type="date" id="once-date" name="once-date" placeholder="yyyy-mm-dd" />
                            <label htmlFor="once-start-time">I'm available from:</label>
                            <input type="time" id="once-start-time" name="once-start-time" placeholder="10:30" />
                            <label htmlFor="once-end-time">I'm available until:</label>
                            <input type="time" id="once-end-time" name="once-end-time" placeholder="16:00" />
                            <button type="button">Add another time window on this date</button>
                        </fieldset>
                        <hr />
                        <fieldset className="sub-fieldset">
                            <legend>I'm open for dog dates during the following windows of time:</legend>
                            <label htmlFor="window-day-1">Day of the week:</label>
                            <select id="windodw-day-1">
                                <option value="">--Select a day--</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <label htmlFor="window-start-time-1">I'm available from:</label>
                            <input type="time" id="window-start-time-1" name="window-start-time-1" placeholder="10:30" />
                            <label htmlFor="window-end-time-1">I'm available until:</label>
                            <input type="time" id="window-end-time-1" name="window-end-time-1" placeholder="16:00" />
                            <button type="button">Click to add another window</button>
                        </fieldset>
                    </fieldset>
                    <label htmlFor="howl-description">Add a personal message to go with your howl:</label>
                    <textarea id="howl-description" name="howl-description" maxLength="2000" placeholder="(Write your personal message here)" aria-describedby="char-limit"></textarea>
                    <p id="char-limit">(Limited to 2000 characters.)</p>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    );
}

export default CreateHowl;