import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: {},
    dogs: [],
    userSavedHowls: [],
    packMembers: [],
    addPackMember: () => {},
    removePackMember: () => {},
    setUser: () => {},
    addDogProfile: () => {},
    removeDogProfile: () => {},
    updateDogProfile: () => {},
    addSavedHowl: () => {},
    removeSavedHowl: () => {},
    setDogs: () => {},
    setUserSavedHowls: () => {},
    setUserPackMembers: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [dogs, setDogs] = useState([]);
    const [user, setUser] = useState({});
    const [userSavedHowls, setUserSavedHowls] = useState([]);
    const [packMembers, setUserPackMembers] = useState([]);

    const addPackMember = (newPackMember) => {
        const updatedPackMembers = [...packMembers, newPackMember];
        setUserPackMembers(updatedPackMembers);
    }

    const removePackMember = (id_to_remove) => {
        const updatedPackMembers = packMembers.filter(pm => pm.id !== id_to_remove);
        setUserPackMembers(updatedPackMembers);
    }

    const addDogProfile = (newDogProfile) => {
        const updatedDogs = [...dogs, newDogProfile];
        setDogs(updatedDogs);
    }

    const removeDogProfile = (profileId) => {
        const updatedDogs = dogs.filter(dog => dog.id !== profileId);
        setDogs(updatedDogs);
    }

    const updateDogProfile = (newDogProfile) => {
        const updatedDogs = dogs.filter(dog => dog.id !== newDogProfile.id);
        updatedDogs.push(newDogProfile);
        setDogs(updatedDogs);
    }

    const addSavedHowl = (newHowl) => {
        const updatedHowls = [...userSavedHowls, newHowl];
        setUserSavedHowls(updatedHowls);
    }

    const removeSavedHowl = (idToRemove) => {
        const updatedHowls = userSavedHowls.filter(howl => howl.howl.id !== idToRemove);
        setUserSavedHowls(updatedHowls);
    }

    const value = {
        user,
        dogs,
        userSavedHowls,
        packMembers,
        setUser,
        addPackMember,
        removePackMember,
        addDogProfile,
        removeDogProfile,
        updateDogProfile,
        addSavedHowl,
        removeSavedHowl,
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