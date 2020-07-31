import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';

const MySavedHowls = (props) => {

    const context = useContext(UserContext);

    const mySavedHowls = context.userSavedHowls
        .map(savedHowl => (
            context.howls
            .find(howl => howl.id === savedHowl.howl_id)
        ));

    return (
        <section>
            <header>
                <h3>My saved howls</h3>
            </header>
            {mySavedHowls.length
                ? 
                    <ul>
                        {mySavedHowls.map(howl => <HowlListItem key={howl.id} howl={howl} />)}
                    </ul>   
                :
                    <p>No howls saved yet.</p>
            }
        </section>
    );
}

export default MySavedHowls;