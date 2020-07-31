import React from 'react';
import UserContactInfo from '../UserContactInfo/UserContactInfo';
import MyDogs from '../MyDogs/MyDogs';
import MyPack from '../MyPack/MyPack';
import MySavedHowls from '../MySavedHowls/MySavedHowls';
import MyHowls from '../MyHowls/MyHowls';
import ReviewsOfMyDogs from '../ReviewsOfMyDogs/ReviewsOfMyDogs';

const Homepage = (props) => {

    return (
        <>
            <header>
                <h3>My Dog Dating Life</h3>
            </header>
            <UserContactInfo />
            <MyDogs />
            <MyPack />
            <MySavedHowls />
            <MyHowls />
            <ReviewsOfMyDogs />
        </>
    );
}

export default Homepage;