import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import DogProfilesService from '../services/dog-profiles-service';

const DogProfilePageHeaderButtons = (props) => {

    const context = useContext(UserContext);
  
    const {
        showEdit,
        setShowEdit,
        dog_profile,
    } = props;
    
    const { owner, id, name } = dog_profile;

    const [apiError, setApiError] = useState(false);

    const isAPackMember = context.packMembers.length 
        ? context.packMembers.find(pm => pm.profile.id === id)
        : false;

    const removePackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove ${name} from your pack?`);
        if (confirmation) {
            if (isAPackMember) {
                setApiError(false);             
                DogProfilesService.removePackMember(isAPackMember.id)
                    .then(() => {
                        context.removePackMember(isAPackMember.id);
                    })
                    .catch(error => {
                        console.log(error);
                        setApiError(true);
                    });   
            }
        }
    }

    const addPackMemberCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to add ${name} to your pack?`);
        if (confirmation) {
            setApiError(false);
            const newPackMember = {
                pack_member_id: id,
            };
            DogProfilesService.addPackMember(newPackMember)
                .then(profile => {
                    context.addPackMember(profile);
                })
                .catch(error => {
                    setApiError(true);
                    console.log(error);
                });
        }
    }

    const removeDogProfileCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete ${name}'s profile?`);
        if (confirmation) {
            setApiError(false);
            DogProfilesService.deleteDogProfile(id)
                .then(() => {
                    props.history.push('/home');
                    context.removeDogProfile(id);
                })
                .catch(error => {
                    setApiError(true);
                    console.log(error);
                });
        }
    }

    if (owner.id === context.user.id) {
        return (
            <div 
                aria-live='polite' 
                className='DogProfilePageHeaderButtons__container'
            >
                <button
                    className='DogProfilePageHeaderButtons__button button'
                    type='button'
                    onClick={() => setShowEdit(!showEdit)}
                >
                    {showEdit ? 'Cancel edit' : 'Edit profile'}
                </button>
                <button
                    className='DogProfilePageHeaderButtons__button button'
                    type='button'
                    onClick={removeDogProfileCheck}
                >
                    Delete profile
                </button>
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    } else {
        if (isAPackMember) {
            return (
                <div 
                    aria-live='polite' 
                    className='DogProfilePageHeaderButtons__container'
                >
                    <p>{name} is a member of your pack!</p>
                    <button
                        className='DogProfilePageHeaderButtons__button button' 
                        type='button'
                        onClick={removePackMemberCheck}
                    >
                        Click here to remove {name} from your pack
                    </button>
                    <div role='alert'>
                        {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                    </div>
                </div>
            );
        }

        return (
            <div aria-live='polite'>
                <p>{name} is not a member of your pack.</p>
                <button
                    className='DogProfilePageHeaderButtons__button button'
                    type='button'
                    onClick={addPackMemberCheck}
                >
                    Click here to add {name} to your pack!
                </button>
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    }
}

export default withRouter(DogProfilePageHeaderButtons);
