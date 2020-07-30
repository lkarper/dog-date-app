import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogProfileCharacteristics from '../DogProfileCharacteristics/DogProfileCharacteristics';
import HowlListItem from '../HowlListItem/HowlListItem';

const DogProfilePage = (props) => {

    const context = useContext(UserContext);

    const { id } = props.match.params;
    const dog_profile = context.allDogs.find(profile => profile.id === id);
    const howlsBy = context.howls.filter(howl => howl.dog_ids.includes(id));

    return (
        <>
            <header>
                <h1>{dog_profile.name}</h1>
                <img 
                    src={dog_profile.profile_img_url}
                    alt={`Avatar for the dog named ${dog_profile.name}.`} 
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
                    {howlsBy.map(howl => <HowlListItem key={howl.id} howl={howl}/>)}
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