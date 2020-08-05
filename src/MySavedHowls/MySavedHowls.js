import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';
import './MySavedHowls.css';

const MySavedHowls = (props) => {

    const context = useContext(UserContext);

    const mySavedHowls = context.userSavedHowls
        .map(savedHowl => (
            context.howls
            .find(howl => howl.id === savedHowl.howl_id)
        ));

    return (
        <section className='MySavedHowls__section section'>
            <header>
                <h2>My saved howls</h2>
            </header>
            {mySavedHowls.length
                ? 
                    <ul className='MySavedHowls__list'>
                        {mySavedHowls.map(howl => <HowlListItem key={howl.id} howl={howl} />)}
                    </ul>   
                :
                    <p>No howls saved yet.</p>
            }
        </section>
    );
}

export default MySavedHowls;