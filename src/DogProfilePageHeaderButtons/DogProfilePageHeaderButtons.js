import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
    
    const { owner_id, dog_id, dog_name } = props;

    if (owner_id === context.user.id) {
        return <Link to={`/dog-profile/${dog_id}/edit`}>Edit Profile</Link>
    }

    return <button>Add {dog_name} to your pack!</button>
}

export default DogProfilePageHeaderButtons;