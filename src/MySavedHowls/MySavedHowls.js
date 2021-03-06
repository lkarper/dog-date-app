import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';
import './MySavedHowls.css';

const MySavedHowls = (props) => {
    const context = useContext(UserContext);

    return (
        <section 
            aria-live='polite'
            className='MySavedHowls__section section'
        >
            <header>
                <h2>My Saved Howls</h2>
            </header>
            {context.userSavedHowls.length
                ? 
                    <ul className='MySavedHowls__list'>
                        {context.userSavedHowls
                            .map(howl => 
                                <HowlListItem 
                                    key={howl.id} 
                                    howl={howl.howl} 
                                />
                            )
                        }
                    </ul>   
                :
                    <p>No howls saved yet.</p>
            }
        </section>
    );
}

export default MySavedHowls;
