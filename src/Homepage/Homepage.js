import React, { useEffect } from 'react';
import UserContactInfo from '../UserContactInfo/UserContactInfo';
import MyDogs from '../MyDogs/MyDogs';
import MyPack from '../MyPack/MyPack';
import MySavedHowls from '../MySavedHowls/MySavedHowls';
import MyHowls from '../MyHowls/MyHowls';
import ReviewsOfMyDogs from '../ReviewsOfMyDogs/ReviewsOfMyDogs';

const Homepage = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    return (
        <>
            <header>
                <h1>My Dog Dating Life</h1>
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
