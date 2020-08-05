import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogListView from '../DogListView/DogListView';
import './MyDogs.css';

const MyDogs = (props) => {

    const context = useContext(UserContext);
    const { dogs } = context;

    return (
        <section className='MyDogs__section section'>
            <header>
                <h2>My dogs</h2>
            </header>
            <Link to='/create-dog-profile'>Create a new dog profile!</Link>
            <ul className='MyDogs__list'>
                {dogs.map(dog => <DogListView key={dog.id} dog={dog} />)}
            </ul>
        </section>
    );
}

export default MyDogs;