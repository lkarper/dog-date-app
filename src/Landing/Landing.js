import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import AuthApiService from '../services/auth-api-service';
import DogProfilesService from '../services/dog-profiles-service';
import HowlsService from '../services/howls-service';
import './Landing.css';

const Landing = (props) => {
    const context = useContext(UserContext);

    const { 
        forceUpdate,
        history,
    } = props;

    const [loginError, setLoginError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const onLoginSuccess = () => {
        // Lets components know that basic user data is still being retrieved from the api
        context.setLoading(true);

        // Retrieves basic user data on login
        Promise.all([
                DogProfilesService.fetchUserDogs(), 
                DogProfilesService.fetchPackMembers(),
                HowlsService.fetchUserSavedHowls(),
                HowlsService.fetchHowlsByUser(),
            ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                const userDogs = values[0];
                const packMembers = values[1];
                const userSavedHowls = values[2];
                const howls = values[3];
                context.setDogs(userDogs);
                context.setUserPackMembers(packMembers);
                context.setUserSavedHowls(userSavedHowls);
                context.setHowls(howls);
                context.setLoading(false);
                context.setError(false);
                history.push('/home');
                forceUpdate();
            })
            .catch(error => {
                console.log(error);
                setShowLoading(false);
                context.setLoading(false);
                context.setError(true);
            });
    }

    const demoLogin = () => {
        setLoginError(false);
        setShowLoading(true);
        AuthApiService.postLogin({
            username: 'demoUser',
            password: 'DemoPassword123!',
        })
            .then(res => {
                const {
                    id,
                    username,
                    email,
                    phone,
                } = res;
                context.setUser({
                    id,
                    username,
                    email,
                    phone,
                });
                onLoginSuccess();
            })
            .catch(res => {
                setLoginError(true);
                setShowLoading(false);
            });
    }
    
    return (
        <>
            <header>
                <h1
                    className='Landing__h1'
                >
                    Welcome to Dog Date!
                </h1>
            </header>
            <section className='Landing__section section'>
                <header>
                    <h2>What is Dog Date?</h2>
                </header>
                <p>Dog Date is a web app for users who want to find playmates for their dogs. Whether you have one or one-hundred dogs, you can create profiles for them on Dog Date. You can set a profile picture for your dog, characterize its energy-levels, obedience, experience with other dogs, and more! This allows others to decide if your dog is the right playmate for their dog! Other users can leave reviews of your dog(s) and their dates, and then you can comment on those reviews in response.</p>
            </section>
            <section className='Landing__section section'>
                <header>
                    <h2>Want to jump right in?</h2>
                </header>
                <p>Try out Dog Date by using a demo account before creating an account of your own.</p>
                <button
                    className='Landing__demo button'
                    type='button'
                    onClick={demoLogin}
                >
                    Try Dog Date with a demo account
                </button>
                <div
                    className='Landing__alert-div' 
                    role='alert'
                >
                    {loginError 
                        ? 
                            <p 
                                className='Landing__p error'
                            >
                                Error: Could not launch demo. Check your connection and try again.
                            </p> 
                        : 
                            ''
                    }
                </div>
                <p>(You can also go to the <Link className='link' to='/login'>login page</Link> and enter the Username "demoUser" and the Password "DemoPassword123!".)</p>
                <p><b>Or you can get started by <Link className='link' to='/register'>registering</Link> for an account of your own!</b></p>
            </section>
            <section className='Landing__section section'>
                <header>
                    <h2>What can Dog Date do?</h2>
                </header>
                <section>
                    <header>
                        <h3>Create profiles for your dogs!</h3>
                    </header>
                    <p>Whether you have one or one-hundred dogs, you can <Link className='link' to='/create-dog-profile'>create profiles</Link> for them on Dog Date.  You can set a profile picture for your dog, characterize its energy-levels, obedience, experience with other dogs, and more!  This allows others to decide if your dog is the right playmate for their dog!</p>
                    <p>Other users can leave reviews of your dog(s) and their dates, and then you can comment on those reviews in response.</p>
                </section>
                <section>
                    <header>
                        <h3>View the profiles of other users' dogs!</h3>
                        <p>You can also view profiles of other users' dogs and even save those profiles by adding them to your pack! A dog's profile page not only gives you a description and photo of a user's dog, but it likewise gives you a handy list of Howls about that dog and reviews of that dog by other users. This allows you quickly to see when and where that dog is available to play and to decide if that dog is the right dog date for your pooch!</p>
                    </header>
                </section>
                <section>
                    <header>
                        <h3>Howl about your dog and see what others are Howling about!</h3>
                    </header>
                    <p>On Dog Date, you find playmates for your dog by <Link className='link' to='/create-howl'>creating</Link> and <Link className='link' to='/howls'>viewing</Link> "Howls".  Howls are essentially a message from a user that he or she is looking for playmates for his or her canine companion(s)!  There are two types of Howls: "one-time" and "recurring" playdates.  "One-time" playdates are requests for a playdate on a specific date.  Users post a date, available time frames, and a proposed location, and then wait for other interested users to contact them.  "Recurring" Howls, on the other hand, let users know that a user is generally available at certain times for a playdate (e.g. Saturdays, 11:00 am - 4:00 pm).</p>
                    <p>On the <Link className='link' to='/howls'>Howls page</Link> users can filter Howls by zipcode, state, or the average rating of dogs in the Howl (more on ratings below.)</p>
                    <p>Note: At the moment, all of the Howls are demo requests and do not actually represent real-world dogs and users.</p>
                </section>
                <section>
                    <header>
                        <h3>Leave reviews of other dogs and get reviews of your own dogs!</h3>
                        <p>You can leave reviews of dogs that your dogs have played with, and other users can leave reviews of your dog(s) and their dates.  Anyone can then comment on those reviews in response.</p>
                    </header>
                </section>
                <section>
                    <header>
                        <h3>Keep track of everything on your dashboard</h3>
                        <p>Once you have an account, your <Link className='link' to='/home'>dashboard</Link> keeps track of your dogs, Howls, and pack members!</p>
                    </header>
                </section>
            </section>
            {showLoading && 
                <div className='Landing__loading-container'>
                    <FontAwesomeIcon 
                        className='Landing__loading' 
                        icon={faSpinner} 
                        spin 
                    />
                </div>
            }
        </>
    );
}

Landing.defaultProps = {
    forceUpdate: () => {},
    history: {
        push: () => {},
    },
};

Landing.propTypes = {
    forceUpdate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default Landing;
