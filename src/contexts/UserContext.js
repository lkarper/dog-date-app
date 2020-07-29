import React, { useState, useEffect, createContext } from 'react';
import STORE from '../STORE';

const UserContext = createContext({
    setUser: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [user, setUser] = useState({});
    const [dogs, setDogs] = useState({});
    
    useEffect(() => {
        if (Object.keys(user).length) {
            const dogs = STORE.dog_profiles.filter(dog => dog.owner_id === user.id);
            setDogs(dogs);
        }
    }, [user])

    const value = {
        user,
        dogs,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}