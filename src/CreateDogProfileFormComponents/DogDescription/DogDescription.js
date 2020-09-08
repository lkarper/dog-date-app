import React, { useState, useEffect } from 'react';
import ValidateDogProfileEnergy from '../../validation-components/create-dog-profile-validation/ValidateDogProfileEnergy';
import ValidateDogProfileTemperment from '../../validation-components/create-dog-profile-validation/ValidateDogProfileTemperment';
import ValidateDogProfileObedience from '../../validation-components/create-dog-profile-validation/ValidateDogProfileObedience';
import ValidatePersonalMessage from '../../validation-components/create-howl-validation/ValidatePersonalMessage';
import './DogDescription.css';

const DogDescription = (props) => {
    
    const {
        energyP,
        setEnergyP,
        energyErrorP,
        setEnergyErrorP,
        tempermentP,
        setTempermentP,
        tempermentErrorP,
        setTempermentErrorP,
        obedienceP,
        setObedienceP,
        obedienceErrorP,
        setObedienceErrorP,
        dislikesPuppiesP,
        setDislikesPuppiesP,
        dislikesMenP,
        setDislikesMenP,
        dislikesWomenP,
        setDislikesWomenP,
        noChildrenP,
        setNoChildrenP,
        recentlyAdoptedP,
        setRecentlyAdoptedP,
        lovesPeopleP,
        setLovesPeopleP,
        leashAggressionP,
        setLeashAggressionP,
        elderlyDogP,
        setElderlyDogP,
        littleExperienceP,
        setLittleExperienceP,
        muchExperienceP,
        setMuchExperienceP,
        foodAggressionP,
        setFoodAggressionP,
        personalMessageP,
        setPersonalMessageP,
        personalMessageErrorP,
        setPersonalMessageErrorP,
    } = props.data;

    const [energy, setEnergy] = useState(energyP);
    const [energyError, setEnergyError] = useState('');
    const [temperment, setTemperment] = useState(tempermentP);
    const [tempermentError, setTempermentError] = useState('');
    const [obedience, setObedience] = useState(obedienceP);
    const [obedienceError, setObedienceError] = useState('');
    const [dislikesPuppies, setDislikesPuppies] = useState(dislikesPuppiesP);
    const [dislikesMen, setDislikesMen] = useState(dislikesMenP);
    const [dislikesWomen, setDislikesWomen] = useState(dislikesWomenP);
    const [noChildren, setNoChildren] = useState(noChildrenP);
    const [recentlyAdopted, setRecentlyAdopted] = useState(recentlyAdoptedP);
    const [lovesPeople, setLovesPeople] = useState(lovesPeopleP);
    const [leashAggression, setLeashAggression] = useState(leashAggressionP);
    const [elderlyDog, setElderlyDog] = useState(elderlyDogP);
    const [littleExperience, setLittleExperience] = useState(littleExperienceP);
    const [muchExperience, setMuchExperience] = useState(muchExperienceP);
    const [foodAggression, setFoodAggression] = useState(foodAggressionP);
    const [personalMessage, setPersonalMessage] = useState(personalMessageP);
    const [personalMessageError, setPersonalMessageError] = useState('');

    useEffect(() => {
        if (energy !== energyP) {
            setEnergyP(energy);
        }
    }, [energy, energyP, setEnergyP]);

    useEffect(() => {
        if (energyError !== energyErrorP) {
            setEnergyErrorP(energyError);
        }
    }, [energyError, energyErrorP, setEnergyErrorP]);

    useEffect(() => {
        if (temperment !== tempermentP) {
            setTempermentP(temperment);
        }
    }, [temperment, tempermentP, setTempermentP]);

    useEffect(() => {
        if (tempermentError !== tempermentErrorP) {
            setTempermentErrorP(tempermentError);
        }
    }, [tempermentError, tempermentErrorP, setTempermentErrorP]);

    useEffect(() => {
        if (obedience !== obedienceP) {
            setObedienceP(obedience);
        }
    }, [obedience, obedienceP, setObedienceP]);

    useEffect(() => {
        if (obedienceError !== obedienceErrorP) {
            setObedienceErrorP(obedienceError);
        }
    }, [obedienceError, obedienceErrorP, setObedienceErrorP]);

    useEffect(() => {
        if (dislikesPuppies !== dislikesPuppiesP) {
            setDislikesPuppiesP(dislikesPuppies);
        }
    }, [dislikesPuppies, dislikesPuppiesP, setDislikesPuppiesP]);

    useEffect(() => {
        if (dislikesMen !== dislikesMenP) {
            setDislikesMenP(dislikesMen);
        }
    }, [dislikesMen, dislikesMenP, setDislikesMenP]);

    useEffect(() => {
        if (dislikesWomen !== dislikesWomenP) {
            setDislikesWomenP(dislikesWomen);
        }
    }, [dislikesWomen, dislikesWomenP, setDislikesWomenP]);

    useEffect(() => {
        if (noChildren !== noChildrenP) {
            setNoChildrenP(noChildren);
        }
    }, [noChildren, noChildrenP, setNoChildrenP]);

    useEffect(() => {
        if (recentlyAdopted !== recentlyAdoptedP) {
            setRecentlyAdoptedP(recentlyAdopted);
        }
    }, [recentlyAdopted, recentlyAdoptedP, setRecentlyAdoptedP]);

    useEffect(() => {
        if (lovesPeople !== lovesPeopleP) {
            setLovesPeopleP(lovesPeople);
        }
    }, [lovesPeople, lovesPeopleP, setLovesPeopleP]);

    useEffect(() => {
        if (leashAggression !== leashAggressionP) {
            setLeashAggressionP(leashAggression);
        }
    }, [leashAggression, leashAggressionP, setLeashAggressionP]);

    useEffect(() => {
        if (elderlyDog !== elderlyDogP) {
            setElderlyDogP(elderlyDog);
        }
    }, [elderlyDog, elderlyDogP, setElderlyDogP]);

    useEffect(() => {
        if (littleExperience !== littleExperienceP) {
            setLittleExperienceP(littleExperience);
        }
    }, [littleExperience, littleExperienceP, setLittleExperienceP]);

    useEffect(() => {
        if (muchExperience !== muchExperienceP) {
            setMuchExperienceP(muchExperience);
        }
    }, [muchExperience, muchExperienceP, setMuchExperienceP]);

    useEffect(() => {
        if (foodAggression !== foodAggressionP) {
            setFoodAggressionP(foodAggression);
        }
    }, [foodAggression, foodAggressionP, setFoodAggressionP]);

    useEffect(() => {
        if (personalMessage !== personalMessageP) {
            setPersonalMessageP(personalMessage);
        }
    }, [personalMessage, personalMessageP, setPersonalMessageP]);

    useEffect(() => {
        if (personalMessageError !== personalMessageErrorP) {
            setPersonalMessageErrorP(personalMessageError);
        }
    }, [personalMessageError, personalMessageErrorP, setPersonalMessageErrorP]);

    return (
        <fieldset 
            className='DogDescription__outer-fieldset outer-fieldset'
        >
            <legend>Describe your Dog</legend>
            <fieldset className="sub-fieldset">
                <legend>How energetic is your dog?</legend>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="low-energy" 
                        name="energy-level" 
                        value='Not very...'
                        checked={energy === 'Not very...'}
                        aria-describedby='energy-validator'
                        onChange={(e) => setEnergy(e.target.value)}
                        required
                    />
                    <label htmlFor="low-energy">Not very...</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="medium-energy" 
                        name="energy-level" 
                        value='About as energetic as the average dog.'
                        aria-describedby='energy-validator' 
                        checked={energy === 'About as energetic as the average dog.'}
                        onChange={(e) => setEnergy(e.target.value)}
                        required
                    />
                    <label htmlFor="medium-energy">About as energetic as the average dog.</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="high-energy" 
                        name="energy-level" 
                        value='Very energetic.'
                        aria-describedby='energy-validator'
                        checked={energy === 'Very energetic.'}
                        onChange={(e) => setEnergy(e.target.value)}
                        required
                    />
                    <label htmlFor="high-energy">Very energetic.</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="extreme-energy" 
                        name="energy-level" 
                        value='So... much... energy... it never runs out.'
                        aria-describedby='energy-validator'
                        checked={energy === 'So... much... energy... it never runs out.'}
                        onChange={(e) => setEnergy(e.target.value)} 
                        required
                    />
                    <label htmlFor="extreme-energy">So... much... energy... it never runs out.</label>
                </div>
                <div
                    className='DogDescription__alert-div' 
                    role='alert'
                >
                    <ValidateDogProfileEnergy 
                        energy={energy}
                        energyError={energyError}
                        setEnergyError={setEnergyError}
                    />
                </div>
            </fieldset>
            <hr />
            <fieldset className="sub-fieldset">
                <legend>How would you describe your dog's temperment?</legend>
                <div>
                    <input
                        className='DogDescription__input radio' 
                        type="radio" 
                        id="temperment-nervous" 
                        name="temperment" 
                        value="Nervous around new people or dogs"
                        checked={temperment === 'Nervous around new people or dogs'} 
                        aria-describedby='temperment-validator'
                        onChange={(e) => setTemperment(e.target.value)}
                        required
                    />
                    <label htmlFor="temperment-nervous">Nervous around new people or dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="temperment-shy" 
                        name="temperment" 
                        value="Shy, but not skiddish or nervous" 
                        checked={temperment === 'Shy, but not skiddish or nervous'}
                        aria-describedby='temperment-validator'
                        onChange={(e) => setTemperment(e.target.value)}
                        required
                    />
                    <label htmlFor="temperment-shy">Shy, but not skiddish or nervous</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="temperment-indifferent" 
                        name="temperment" 
                        value="Somewhat indifferent to most dogs"
                        checked={temperment === 'Somewhat indifferent to most dogs'}
                        aria-describedby='temperment-validator'
                        onChange={(e) => setTemperment(e.target.value)}
                        required 
                    />
                    <label htmlFor="temperment-indifferent">Somewhat indifferent to most dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="temperment-outgoing" 
                        name="temperment" 
                        value="Outgoing and eager to be friends with most dogs" 
                        checked={temperment === 'Outgoing and eager to be friends with most dogs'}
                        aria-describedby='temperment-validator'
                        onChange={(e) => setTemperment(e.target.value)}
                        required
                    />
                    <label htmlFor="temperment-outgoing">Outgoing and eager to be friends with most dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="temperment-aggressive" 
                        name="temperment" 
                        value="On the aggressive side and always trying to be the alpha"
                        checked={temperment === 'On the aggressive side and always trying to be the alpha'}
                        aria-describedby='temperment-validator'
                        onChange={(e) => setTemperment(e.target.value)}
                        required 
                    />
                    <label htmlFor="temperment-aggressive">On the aggressive side and always trying to be the alpha</label>
                </div>
                <div
                    className='DogDescription__alert-div' 
                    role='alert'
                >
                    <ValidateDogProfileTemperment 
                        temperment={temperment}
                        tempermentError={tempermentError}
                        setTempermentError={setTempermentError}
                    />
                </div>
            </fieldset>
            <hr />
            <fieldset className="sub-fieldset">
                <legend>How well trained and obedient is your dog?</legend>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="no-training" 
                        name="training-level" 
                        value="Not trained at all and struggles with obedience..."
                        checked={obedience === 'Not trained at all and struggles with obedience...'}
                        aria-describedby='obedience-validator'
                        onChange={(e) => setObedience(e.target.value)}
                        required 
                    />
                    <label htmlFor="no-training">Not trained at all and struggles with obedience...</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="some-training" 
                        name="training-level" 
                        value="Some training, but not always obedient" 
                        checked={obedience === 'Some training, but not always obedient'}
                        aria-describedby='obedience-validator'
                        onChange={(e) => setObedience(e.target.value)}
                        required
                    />
                    <label htmlFor="some-training">Some training, but not always obedient</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="well-trained" 
                        name="training-level" 
                        value="Well trained in basic commands and generally obedient"
                        checked={obedience === 'Well trained in basic commands and generally obedient'}
                        aria-describedby='obedience-validator'
                        onChange={(e) => setObedience(e.target.value)} 
                        required
                    />
                    <label htmlFor="well-trained">Well trained in basic commands and generally obedient</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input radio'
                        type="radio" 
                        id="very-well-trained" 
                        name="training-level" 
                        value="Very-well trained and always obedient"
                        checked={obedience === 'Very-well trained and always obedient'}
                        aria-describedby='obedience-validator' 
                        onChange={(e) => setObedience(e.target.value)}
                        required
                    />
                    <label htmlFor="very-well-trained">Very-well trained and always obedient</label>
                </div>
                <div
                    className='DogDescription__alert-div'
                    role='alert'
                >
                    <ValidateDogProfileObedience 
                        obedience={obedience}
                        obedienceError={obedienceError}
                        setObedienceError={setObedienceError}
                    />
                </div>
            </fieldset>
            <hr />
            <fieldset className="sub-fieldset">
                <legend>What else should others know about your dog?</legend>
                <div>
                    <input
                        className='DogDescription__input checkbox' 
                        type="checkbox" 
                        id="other-dislikes-puppies" 
                        name="other-dislikes-puppies" 
                        value="Dislikes puppies" 
                        checked={!!dislikesPuppies}
                        onChange={(e) => setDislikesPuppies(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-dislikes-puppies">Dislikes puppies</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-dislikes-men" 
                        name="other-dislikes-men" 
                        value="Dislikes men"
                        checked={!!dislikesMen}
                        onChange={(e) => setDislikesMen(e.target.checked ? e.target.value : '')} 
                    />
                    <label htmlFor="other-dislikes-men">Dislikes men</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-dislikes-women" 
                        name="other-dislikes-women" 
                        value="Dislikes women" 
                        checked={!!dislikesWomen}
                        onChange={(e) => setDislikesWomen(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-dislikes-women">Dislikes women</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-no-children" 
                        name="other-no-children" 
                        value="Not good with children" 
                        checked={!!noChildren}
                        onChange={(e) => setNoChildren(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-no-children">Not good with children</label>
                </div>
                <div>
                    <input
                        className='DogDescription__input checkbox' 
                        type="checkbox" 
                        id="other-recently-adopted" 
                        name="other-recently-adopted" 
                        value="Recently adopted" 
                        checked={!!recentlyAdopted}
                        onChange={(e) => setRecentlyAdopted(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-recently-adopted">Recently adopted</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-loves-people" 
                        name="other-loves-people" 
                        value="Prefers people to dogs" 
                        checked={!!lovesPeople}
                        onChange={(e) => setLovesPeople(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-loves-people">Prefers people to dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-leash-aggression" 
                        name="other-leash-aggression" 
                        value="Has leash aggression" 
                        checked={!!leashAggression}
                        onChange={(e) => setLeashAggression(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-leash-aggression">Has leash aggression</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-elderly" 
                        name="other-elderly" 
                        value="Elderly dog" 
                        checked={!!elderlyDog}
                        onChange={(e) => setElderlyDog(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-elderly">Elderly dog</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-little-experience" 
                        name="other-little-experience" 
                        value="Has spent little time with other dogs" 
                        checked={!!littleExperience}
                        onChange={(e) => setLittleExperience(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-little-experience">Has spent little time with other dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-much-experience" 
                        name="other-much-experience" 
                        value="Has a lot of experience playing with other dogs" 
                        checked={!!muchExperience}
                        onChange={(e) => setMuchExperience(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-much-experience">Has a lot of experience playing with other dogs</label>
                </div>
                <div>
                    <input 
                        className='DogDescription__input checkbox'
                        type="checkbox" 
                        id="other-food-aggression" 
                        name="other-food-aggression" 
                        value="Aggressive around and protective of food" 
                        checked={!!foodAggression}
                        onChange={(e) => setFoodAggression(e.target.checked ? e.target.value : '')}
                    />
                    <label htmlFor="other-food-aggression">Aggressive around and protective of food</label>
                </div>
            </fieldset>
            <hr />
            <div className='DogDescription__message-container'>
                <label htmlFor="own-description">Describe your dog in your own words:</label>
                <textarea 
                    id="own-description" 
                    name="own-description" 
                    maxLength="2000" 
                    rows='10'
                    placeholder="My dog is..." 
                    aria-describedby="personal-message-validator"
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                ></textarea>
            </div>
            <div 
                className='DogDescription__alert-div'
                role='alert'
            >
                <ValidatePersonalMessage 
                    personalMessage={personalMessage}
                    personalMessageError={personalMessageError}
                    setPersonalMessageError={setPersonalMessageError}
                />
            </div>
        </fieldset>
    );
}

export default DogDescription;
