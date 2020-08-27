import React, { useState, useEffect, createContext } from 'react';
import STORE from '../STORE';

const UserContext = createContext({
    user: {},
    dogs: [],
    allDogs: [],
    howls: [],
    userSavedHowls: [],
    packMembers: [],
    reviews: [],
    reviewComments: [],
    addReview: () => {},
    removeReview: () => {},
    updateReview: () => {},
    addHowl: () => {},
    removeHowl: () => {},
    updateHowl: () => {},
    addPackMember: () => {},
    removePackMember: () => {},
    setUser: () => {},
    addDogProfile: () => {},
    removeDogProfile: () => {},
    updateDogProfile: () => {},
    addSavedHowl: () => {},
    removeSavedHowl: () => {},
    addComment: () => {},
    updateComment: () => {},
    removeComment: () => {},
    setDogs: () => {},
    setUserSavedHowls: () => {},
    setUserPackMembers: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [dogs, setDogs] = useState([]);
    const [user, setUser] = useState({});
    const [allDogs, setAllDogs] = useState(STORE.dog_profiles);
    const [howls, setHowls] = useState(STORE.howls);
    const [reviews, setReviews] = useState(STORE.reviews);
    const [userSavedHowls, setUserSavedHowls] = useState([]);
    const [packMembers, setUserPackMembers] = useState([]);
    const [reviewComments, setReviewComments] = useState(STORE.review_comments);
    
    useEffect(() => {
        if (Object.keys(user).length) {
            const dogs = STORE.dog_profiles.filter(dog => dog.owner_id === user.id);
            setDogs(dogs);
            const savedHowls = STORE.user_saved_howls.filter(howl => howl.user_id === user.id);
            setUserSavedHowls(savedHowls);
            const userPackMembers = STORE.pack_members.filter(pm => pm.user_id === user.id);
            setUserPackMembers(userPackMembers);
        }
    }, [user]);

    const addHowl = (newHowl) => {
        const updatedHowls = [...howls, newHowl];
        setHowls(updatedHowls);
    }

    const removeHowl = (howlId) => {
        const updatedHowls = howls.filter(howl => howl.id !== howlId);
        setHowls(updatedHowls);
    }

    const updateHowl = (newHowl) => {
        const updatedHowls = [ ...howls.filter(howl => howl.id !== newHowl.id), newHowl];
        setHowls(updatedHowls);
    }

    const addReview = (newReview) => {
        const updatedReviews = [ ...reviews, newReview];
        setReviews(updatedReviews);
    }

    const updateReview = (newReview) => {
        const updatedReviews = [...reviews.filter(r => r.id !== newReview.id), newReview];
        setReviews(updatedReviews);
    }

    const removeReview = (idToRemove) => {
        const updatedReviews = reviews.filter(r => r.id !== idToRemove);
        setReviews(updatedReviews);
    }

    const addPackMember = (newPackMember) => {
        const updatedPackMembers = [...packMembers, newPackMember];
        setUserPackMembers(updatedPackMembers);
    }

    const removePackMember = (id_to_remove) => {
        const updatedPackMembers = packMembers.filter(pm => pm.id !== id_to_remove);
        setUserPackMembers(updatedPackMembers);
    }

    const addDogProfile = (newDogProfile) => {
        const updateDogs = [...dogs, newDogProfile];
        setDogs(updateDogs);
    }

    const removeDogProfile = (profileId) => {
        const updatedDogs = dogs.filter(dog => dog.id !== profileId);
        setDogs(updatedDogs);
    }

    const updateDogProfile = (newDogProfile) => {
        const updatedDogs = dogs.filter(dog => dog.id !== newDogProfile.id);
        updatedDogs.push(newDogProfile);
        setDogs(updatedDogs);
        const updatedAllDogs = allDogs.filter(dog => dog.id !== newDogProfile.id);
        updatedAllDogs.push(newDogProfile);
        setAllDogs(updatedAllDogs);
    }

    const addSavedHowl = (newHowl) => {
        const updatedHowls = [...userSavedHowls, newHowl];
        setUserSavedHowls(updatedHowls);
    }

    const removeSavedHowl = (idToRemove) => {
        const updatedHowls = userSavedHowls.filter(howl => howl.howl.id !== idToRemove);
        setUserSavedHowls(updatedHowls);
    }

    const addComment = (newComment) => {
        const updatedComments = [...reviewComments, newComment];
        setReviewComments(updatedComments);
    }

    const updateComment = (updatedComment) => {
        const updatedComments = [...reviewComments.filter(com => com.id !== updatedComment.id), updatedComment];
        setReviewComments(updatedComments);
    }

    const removeComment = (idToRemove) => {
        const updatedComments = [...reviewComments.filter(com => com.id !== idToRemove)];
        setReviewComments(updatedComments);
    }

    const value = {
        user,
        dogs,
        allDogs,
        howls,
        userSavedHowls,
        packMembers,
        reviews,
        reviewComments,
        addReview,
        setUser,
        addHowl,
        addPackMember,
        removePackMember,
        addDogProfile,
        removeDogProfile,
        updateDogProfile,
        addSavedHowl,
        removeSavedHowl,
        addComment,
        removeHowl,
        updateHowl,
        updateReview,
        removeReview,
        updateComment,
        removeComment,
        setDogs,
        setUserSavedHowls,
        setUserPackMembers,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}