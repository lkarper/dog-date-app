import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';
import './MyHowls.css';

const MyHowls = (props) => {
    
    const context = useContext(UserContext);

    return (
        <section className='MyHowls__section section'>
            <header>
                <h3>My howls</h3>
            </header>
            {context.userSavedHowls.length 
                ?
                    <>
                        <Link to='/create-howl'>Click here to create a howl!</Link>
                        <ul className='MyHowls__list'>
                            {context.userSavedHowls.map(howl => <HowlListItem key={howl.id} howl={howl.howl} />)} 
                        </ul>
                    </>
                : 
                    <>
                        <p>You haven't howled yet.</p>
                        {context.dogs.length 
                            ?
                                <Link to='/create-howl'>Click here to create a howl!</Link>
                            :
                                <p>Create a dog profile to start howling!</p>
                        }
                    </>
            }
        </section>
    );
}

export default MyHowls;