import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CreateHowl from '../CreateHowl/CreateHowl';
import './CreateHowlPage.css';

const CreateHowlPage = (props) => {

    const context = useContext(UserContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    return (
        <>
            <header
                className='CreateHowlPage__header-top'
            >
                <h1>Howl now!</h1>
                <p>Look for friends for your dog!</p>
            </header>
            {context.dogs.length === 0 
                ?
                    <section>
                        <header>
                            <h2>Looks like you haven't created a dog profile yet.</h2>
                        </header>
                        <p>You must have at least one dog profile associated with your account to create a howl.</p>
                        <Link to='/create-dog-profile'>Click here</Link> to create a dog profile now! 
                    </section>
                : <CreateHowl />
            }
        </>
    )
}

export default CreateHowlPage;
