import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: {},
    dogs: [],
    howls: [],
    userSavedHowls: [],
    packMembers: [],
    error: false,
    setError: () => {},
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
    setDogs: () => {},
    setUserSavedHowls: () => {},
    setUserPackMembers: () => {},
    setHowls: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [dogs, setDogs] = useState([]);
    const [user, setUser] = useState({});
    const [howls, setHowls] = useState([]);
    const [userSavedHowls, setUserSavedHowls] = useState([]);
    const [packMembers, setUserPackMembers] = useState([]);
    const [error, setError] = useState(false);

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
        howls,
        userSavedHowls,
        packMembers,
        error,
        setError,
        setUser,
        addHowl,
        removeHowl,
        updateHowl,
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
        setHowls,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}