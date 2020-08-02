import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
    
    const { owner_id, dog_id, dog_name } = props;

    const isAPackMember = context.packMembers.find(pm => pm.pack_member_id === dog_id);

    const removePackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove ${dog_name} from your pack?`);
        if (confirmation) {
            context.removePackMember(dog_id);
        }
    }

    const addPackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to add ${dog_name} to your pack?`);
        if (confirmation) {
            const newPackMember = {
                "id": uuidv4(),
                "user_id": context.user.id,
                "pack_member_id": dog_id,
            };
            context.addPackMember(newPackMember);
        }
    }

    if (owner_id === context.user.id) {
        // Load a pop-up editor, like in FB
        return <button>Edit profile</button>;
    } else {
        if (isAPackMember) {
            return (
                <div>
                    <p>{dog_name} is a member of your pack!</p>
                    <button 
                        type="button"
                        onClick={removePackMemberCheck}
                    >
                        Click here to remove {dog_name} from your pack
                    </button>
                </div>
            );
        }

        return (
            <div>
                <p>{dog_name} is not a member of your pack.</p>
                <button
                    type='button'
                    onClick={addPackMemberCheck}
                >
                    Click here to add {dog_name} to your pack!
                </button>
            </div>
        );
    }
}

export default DogProfilePageHeaderButtons;