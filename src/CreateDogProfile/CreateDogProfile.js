import React, { useState } from 'react';
import BasicInfo from '../CreateDogProfileFormComponents/BasicInfo/BasicInfo';

const CreateDogProfile = (props) => {

    return (
        <form className='profile-creation-form'>
           <BasicInfo />
            <fieldset>
                <legend>Describe your dog:</legend>
                <fieldset className="sub-fieldset">
                    <legend>How energetic is your dog?</legend>
                    <div>
                        <input type="radio" id="low-energy" name="energy-level" value='low-energy' />
                        <label htmlFor="low-energy">Not very...</label>
                    </div>
                    <div>
                        <input type="radio" id="medium-energy" name="energy-level" value='medium-energy' />
                        <label htmlFor="medium-energy">About as energetic as the average dog.</label>
                    </div>
                    <div>
                        <input type="radio" id="high-energy" name="energy-level" value='high-energy' />
                        <label htmlFor="high-energy">Very energetic.</label>
                    </div>
                    <div>
                        <input type="radio" id="extreme-energy" name="energy-level" value='extreme-energy' />
                        <label htmlFor="extreme-energy">So...much...energy...it never runs out.</label>
                    </div>
                </fieldset>
                <hr />
                <fieldset className="sub-fieldset">
                    <legend>How would you describe your dog's temperment?</legend>
                    <div>
                        <input type="radio" id="temperment-nervous" name="temperment" value="nervous" />
                        <label htmlFor="temperment-nervous">Nervous around new people or dogs</label>
                    </div>
                    <div>
                        <input type="radio" id="temperment-shy" name="temperment" value="shy" />
                        <label htmlFor="temperment-shy">Shy, but not skiddish or nervous</label>
                    </div>
                    <div>
                        <input type="radio" id="temperment-indifferent" name="temperment" value="indifferent" />
                        <label htmlFor="temperment-indifferent">Somewhat indifferent to most dogs</label>
                    </div>
                    <div>
                        <input type="radio" id="temperment-outgoing" name="temperment" value="outgoing" />
                        <label htmlFor="temperment-outgoing">Outgoing and eager to be friends with most dogs</label>
                    </div>
                    <div>
                        <input type="radio" id="temperment-aggressive" name="temperment" value="aggressive" />
                        <label htmlFor="temperment-aggressive">On the aggressive side and always trying to be the alpha</label>
                    </div>
                </fieldset>
                <hr />
                <fieldset className="sub-fieldset">
                    <legend>How well trained and obedient is your dog?</legend>
                    <div>
                        <input type="radio" id="no-training" name="training-level" value="no training" />
                        <label htmlFor="no-training">Not trained at all and struggles with obedience...</label>
                    </div>
                    <div>
                        <input type="radio" id="some-training" name="training-level" value="some training" />
                        <label htmlFor="some-training">Some training, but not always obedient</label>
                    </div>
                    <div>
                        <input type="radio" id="well-trained" name="training-level" value="well-trained" />
                        <label htmlFor="well-trained">Well trained in basic commands and generally obedient</label>
                    </div>
                    <div>
                        <input type="radio" id="very-well-trained" name="training-level" value="very-well-trained" />
                        <label htmlFor="very-well-trained">Very-well trained and always obedient</label>
                    </div>
                </fieldset>
                <hr />
                <fieldset className="sub-fieldset">
                    <legend>What else should others know about your dog?</legend>
                    <div>
                        <input type="checkbox" id="other-dislikes-puppies" name="other-dislikes-puppies" value="dislikes puppies" />
                        <label htmlFor="other-dislikes-puppies">Dislikes puppies</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-dislikes-men" name="other-dislikes-men" value="dislikes men" />
                        <label htmlFor="other-dislikes-men">Dislikes men</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-dislikes-women" name="other-dislikes-women" value="dislikes women" />
                        <label htmlFor="other-dislikes-women">Dislikes women</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-no-children" name="other-no-children" value="not good with children" />
                        <label htmlFor="other-no-children">Not good with children</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-recently-adopted" name="other-recently-adopted" value="recently adopted" />
                        <label htmlFor="other-recently-adopted">Recently adopted</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-loves-people" name="other-loves-people" value="prefers people to dogs" />
                        <label htmlFor="other-loves-people">Prefers people to dogs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-leash-aggression" name="other-leash-aggression" value="has leash aggression" />
                        <label htmlFor="other-leash-aggression">Has leash aggression</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-elderly" name="other-elderly" value="elderly dog" />
                        <label htmlFor="other-elderly">Elderly dog</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-little-experience" name="other-little-experience" value="has spent little time with other dogs" />
                        <label htmlFor="other-little-experience">Has spent little time with other dogs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-much-experience" name="other-much-experience" value="has a lot of experience playing with other dogs" />
                        <label htmlFor="other-much-experience">Has a lot of experience playing with other dogs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="other-food-aggression" name="other-food-aggression" value="aggressive around and protective of food" />
                        <label htmlFor="other-food-aggression">Aggressive around and protective of food</label>
                    </div>
                </fieldset>
                <hr />
                <div>
                    <label htmlFor="own-description">Describe your dog in your own words:</label>
                    <textarea id="own-description" name="own-description" maxLength="2000" placeholder="My dog is..." aria-describedby="char-limit"></textarea>
                    <p id="char-limit">(Limited to 2000 characters.)</p>
                </div>
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateDogProfile;