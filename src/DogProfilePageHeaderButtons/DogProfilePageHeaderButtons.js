import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CreateDogProfile from '../CreateDogProfile/CreateDogProfile';
import DogProfilesService from '../services/dog-profiles-service';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
    
    const { owner, id, name } = props.dog_profile;

    const [showEdit, setShowEdit] = useState(false);

    const isAPackMember = context.packMembers.find(pm => pm.profile._id === id);

    const removePackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove ${name} from your pack?`);
        if (confirmation) {
            const entryId = context.packMembers.find(pm => pm.profile._id === id).id;
            DogProfilesService.removePackMember(entryId)
                .then(() => {
                    context.removePackMember(entryId);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const addPackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to add ${name} to your pack?`);
        if (confirmation) {
            const newPackMember = {
                pack_member_id: id,
            };
            DogProfilesService.addPackMember(newPackMember)
                .then(profile => {
                    context.addPackMember(profile);
                })
                .catch(error => {
                    console.log(error);
                });

            context.addPackMember(newPackMember);
        }
    }

    const removeDogProfileCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete ${name}'s profile?`);
        if (confirmation) {
            DogProfilesService.deleteDogProfile(id)
                .then(() => {
                    context.removeDogProfile(id);
                    props.history.push('/home');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    if (owner.id === context.user.id) {
        return (
            <div className='DogProfilePageHeaderButtons__container'>
                <button
                    onClick={() => setShowEdit(true)}
                >
                    Edit profile
                </button>
                <button
                    onClick={removeDogProfileCheck}
                >
                    Delete profile
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
            </div>
        );
    } else {
        if (isAPackMember) {
            return (
                <div className='DogProfilePageHeaderButtons__container'>
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

export default withRouter(DogProfilePageHeaderButtons);