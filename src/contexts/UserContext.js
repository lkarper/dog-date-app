import React, { useState, createContext } from 'react';

const UserContext = createContext({
    setUser: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [user, setUser] = useState({});

    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}