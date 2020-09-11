import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    });
    
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
                <p>Dog Date is an app that helps you find playdates for your dog!</p>
                <p>This is a demo version of the full Dog Date app designed to get feedback from users.</p>
                <p>The app is now hooked up to a server, so you can create an account, upload photos, howl about your dog, and more!</p>
                <p>Get started by <Link className='link' to='/register'>registering</Link> for an account.</p>
                <p>After you test the app, please fill out this <a className='Landing__feedback-link link' href='https://forms.gle/MNAWJUbRpTfPc76k8' target='_blank' rel='noopener noreferrer'>form</a>!</p>
                <p>Thank you! Thank you! Thank you!</p>
            </section>
            <section className='Landing__section section'>
                <header>
                    <h2>What can Dog Date do?</h2>
                </header>
                <section>
                    <header>
                        <h3>Howl about your dog and see what others are howling about!</h3>
                    </header>
                    <p>On Dog Date, you find playmates for your dog by <Link className='link' to='/create-howl'>creating</Link> and <Link className='link' to='/howls'>viewing</Link> "Howls".  Howls are essentially a message from a user that he or she is looking for playmates for his or her canine companion(s)!  There are two types of Howls: "one-time" and "recurring" playdates.  "One-time" playdates are requests for a playdate on a specific date.  Users post a date, available time frames, and a proposed location, and then wait for other interested users to contact them.  "Recurring" Howls, on the other hand, let users know that a user is generally available at certain times for a playdate (e.g. Saturdays from 11:00 am - 4:00 pm).</p>
                    <p>On the <Link className='link' to='/howls'>Howls page</Link> users can filter howls by zipcode, state, or the average rating of dogs in the Howl (more on ratings below.)</p>
                    <p>Note: At the moment, all of the Howls are demo requests and do not actually represent real-world dogs and users.</p>
                </section>
                <section>
                    <header>
                        <h3>Create profiles for your dogs!</h3>
                    </header>
                    <p>Whether you have one or one-hundred dogs, you can <Link className='link' to='/create-dog-profile'>create profiles</Link> for them on Dog Date.  You can set a profile picture for your dog, characterize its energy-levels, obedience, experience with other dogs, and more!  This allows others to decide if your dog is the right playmate for their dog!</p>
                    <p>Other users can leave reviews of your dog(s) and their dates, and then you can comment on those reviews in response.</p>
                </section>
                <section>
                    <header>
                        <h3>View the profiles of other users' dogs</h3>
                    </header>
                    <p>You can also view profiles of other users' dogs and even save those profiles by adding them to your pack!  A dog's profile page not only gives you a description and photo of a user's dog, but it likewise gives you a handy list of Howls about that dog and reviews of that dog by other users.  This allows you quickly to see when and where that dog is available to play and to decide if that dog is the right dog date for your pooch!</p>
                </section>
            </section>
        </>
    );
}

export default Landing;
