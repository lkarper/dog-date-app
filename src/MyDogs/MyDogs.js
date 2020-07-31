import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogListView from '../DogListView/DogListView';

const MyDogs = (props) => {

    const context = useContext(UserContext);
    const { dogs } = context;

    return (
        <section>
            <header>
                <h3>My dogs</h3>
            </header>
            <ul>
                {dogs.map(dog => <DogListView key={dog.id} dog={dog} />)}
            </ul>
        </section>
    );
}

export default MyDogs;