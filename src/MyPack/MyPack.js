import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import DogListView from '../DogListView/DogListView';
import './MyPack.css';

const MyPack = (props) => {

    const context = useContext(UserContext);
    const { packMembers } = context;

    return (
        <section className='MyPack__section section'>
            <header>
                <h2>My Pack</h2>
            </header>
            {packMembers.length > 0
                ?             
                    <ul className='MyPack__list'>
                        {packMembers.map(dog => <DogListView key={dog.id} dog={dog.profile} />)}
                    </ul>
                :
                    <p>No pack members yet.</p>
            }
        </section>
    );
}

export default MyPack;
