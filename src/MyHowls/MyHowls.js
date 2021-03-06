import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';
import './MyHowls.css';

const MyHowls = (props) => {
    const context = useContext(UserContext);

    return (
        <section 
            aria-live='polite'
            className='MyHowls__section section'
        >
            <header>
                <h2>My Howls</h2>
            </header>
            {context.howls.length > 0
                ?
                    <>
                        <Link
                            className='link' 
                            to='/create-howl'
                        >
                            Click here to create a howl!
                        </Link>
                        <ul className='MyHowls__list'>
                            {context.howls.map(howl => <HowlListItem key={howl.id} howl={howl} />)} 
                        </ul>
                    </>
                : 
                    <>
                        <p>You haven't howled yet.</p>
                        {context.dogs.length > 0
                            ?
                                <Link 
                                    className='link'
                                    to='/create-howl'
                                >
                                    Click here to create a howl!
                                </Link>
                            :
                                <p>Create a dog profile to start howling!</p>
                        }
                    </>
            }
        </section>
    );
}

export default MyHowls;
