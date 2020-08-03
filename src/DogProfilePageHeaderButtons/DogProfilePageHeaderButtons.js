import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import CreateDogProfile from '../CreateDogProfile/CreateDogProfile';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
    
    const { owner_id, id, name } = props.dog_profile;

    const [showEdit, setShowEdit] = useState(false);

    const isAPackMember = context.packMembers.find(pm => pm.pack_member_id === id);

    const removePackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove ${name} from your pack?`);
        if (confirmation) {
            context.removePackMember(id);
        }
    }

    const addPackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to add ${name} to your pack?`);
        if (confirmation) {
            const newPackMember = {
                "id": uuidv4(),
                "user_id": context.user.id,
                "pack_member_id": id,
            };
            context.addPackMember(newPackMember);
        }
    }

    if (owner_id === context.user.id) {
        return (
            <>
                <button
                    onClick={() => setShowEdit(true)}
                >
                    Edit profile
                </button>
                {showEdit 
                    ? 
                        <CreateDogProfile 
                            setShowEdit={setShowEdit} 
                            dog_profile={props.dog_profile} 
                            suffix='-edit' 
                        />
                    : ''
                }
            </>
        );
    } else {
        if (isAPackMember) {
            return (
                <div>
                    <p>{name} is a member of your pack!</p>
                    <button 
                        type="button"
                        onClick={removePackMemberCheck}
                    >
                        Click here to remove {name} from your pack
                    </button>
                </div>
            );
        }

        return (
            <div>
                <p>{name} is not a member of your pack.</p>
                <button
                    type='button'
                    onClick={addPackMemberCheck}
                >
                    Click here to add {name} to your pack!
                </button>
            </div>
        );
    }
}

export default DogProfilePageHeaderButtons;