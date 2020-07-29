import React from 'react';
import STORE from '../STORE';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';

const DogProfilePage = (props) => {
    const { id } = props.match.params;
    const dog_profile = STORE.dog_profiles.find(profile => profile.id === id);

    return (
        <>
            <header>
                <h1>{dog_profile.name}</h1>
                <img 
                    src={dog_profile.profile_img_url}
                    alt={`Profile picture for the dog named ${dog_profile.name}.`} 
                />
                <button type="button">Add Seymour to your pack</button>
            </header>
            <section>
                <header>
                    <h2>About {dog_profile.name}:</h2>
                </header>
                <p>{dog_profile.owner_description}</p>
                <section>
                    <p>Age: {dog_profile.age_months ? `${dog_profile.age_years} years, ${dog_profile.age_months}, months` : `${dog_profile.age_years}`}</p>
                    <p>Breed: {dog_profile.breed || `(not listed)`}</p>
                    <p>Weight: {dog_profile.weight ? `${dog_profile.weight} lbs` : `(Not listed)`}</p>
                    <p>Sex: {dog_profile.sex || `(not listed)`}</p>
                </section>
               <DogProfileCharacteristics dog_profile={dog_profile}/>
            </section>
            <section>
                <header>
                    <h2>Howls about Seymour</h2>
                </header>
                <ul>
                    <li>
                        <h2>Looking for 1-3 small dogs for some fetch!</h2>
                        <p>Availability:</p>
                            <ul className="availability">
                                <li>Mondays: 1:00 - 3:00 PM</li>
                                <li>Saturdays: 9:00 AM - 2:00 PM</li>
                            </ul>
                        <p>Location: Central Park, New New York, New York</p>
                        <p>2 dogs are interested!</p>
                    </li>
                </ul>
            </section>
            <section>
                <header>
                    <h2>Reviews of Seymour</h2>
                </header>
                <a href="">Leave your own review of Seymour</a>
                <ul>
                    <li>
                        <h2>Seymour is a great dog!</h2>
                        <p>Left by: B. Simpson</p>
                        <p>From Seymour's playdate with Santos L. Halper on February 10, 2020</p>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default DogProfilePage;