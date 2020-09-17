import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import DogProfilesService from '../services/dog-profiles-service';

const DogProfilePageHeaderButtons = (props) => {
    const context = useContext(UserContext);
  
    const {
        showEdit,
        setShowEdit,
        dog_profile,
    } = props;
    
    const { 
        owner, 
        id, 
        name 
    } = dog_profile;

    const [apiError, setApiError] = useState(false);

    const isAPackMember = context.packMembers.length !== 0 && context.packMembers.find(pm => pm.profile.id === id);

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

    if (!owner || !id) {
        return (
            <div 
                className='error'
                role='alert'
            >
                <p>Error: Looks like something went wrong. Please check your connection and try again.</p>
            </div>
        );
    }

    // Buttons to load on profile page if the user who is logged in is the owner of the profile
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
                <div 
                    className='error'
                    role='alert'
                >
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
                    <div 
                        className='error'
                        role='alert'
                    >
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
                <div 
                    className='error'
                    role='alert'
                >
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    }
}

DogProfilePageHeaderButtons.defaultProps = {
    showEdit: false,
    setShowEdit: () => {},
    dog_profile: {
        owner: {
            email: '',
            id: '',
            phone: '',
            username: '',
        },
        id: '',
        name: '',
    },
}

DogProfilePageHeaderButtons.propTypes = {
    showEdit: PropTypes.bool.isRequired,
    setShowEdit: PropTypes.func.isRequired,
    dog_profile: PropTypes.shape({
        owner: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            email: PropTypes.string,
            username: PropTypes.string,
            phone: PropTypes.string,
        }),
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
    }).isRequired,
};

export default withRouter(DogProfilePageHeaderButtons);
