import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
    
    const { owner_id, dog_id, dog_name } = props;

    if (owner_id === context.user.id) {
        // Load a pop-up editor, like in FB
        return <button>Edit profile</button>
    }

    return <button>Add {dog_name} to your pack!</button>;
}

export default DogProfilePageHeaderButtons;