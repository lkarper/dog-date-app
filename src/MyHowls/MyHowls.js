import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlListItem from '../HowlListItem/HowlListItem';
import './MyHowls.css';

const MyHowls = (props) => {
    
    const context = useContext(UserContext);
    const myHowls = context.howls
        .filter(howl => howl.user_id === context.user.id);

    return (
        <section className='MyHowls__section section'>
            <header>
                <h3>My howls</h3>
            </header>
            {myHowls.length 
                ?
                    <ul className='MyHowls__list'>
                        {myHowls.map(howl => <HowlListItem key={howl.id} howl={howl} />)} 
                    </ul>
                : 
                    <>
                        <p>You haven't howled yet.</p>
                        <Link to='/create-howl'>Click here to create a howl!</Link>
                    </>
            }
        </section>
    )
}

export default MyHowls;