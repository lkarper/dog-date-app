import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import HowlsService from '../services/howls-service';

const HowlPageButtons = (props) => {
    const { howl_id } = props;

    const context = useContext(UserContext);

    const [apiError, setApiError] = useState(false);

    // Checks to see if the howl being displayed is one of the user's saved howls
    const howlSaved = context.userSavedHowls.find(ush => ush.howl.id === howl_id);

    const removeHowlCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove this howl from your list of saved howls?`);
        if (confirmation) {
            setApiError(false);
            HowlsService.removeHowlFromUserSaved(howlSaved.id)
                .then(res => {
                    context.removeSavedHowl(howl_id);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                });
        }
    }

    const addHowlCheck = () => {
        const confirmation = window.confirm(`Would you like to add this howl to your saved howls list?`);
        if (confirmation) {
            setApiError(false);
            const newSavedHowl = {
                howl_id
            };
            HowlsService.addUserSavedHowl(newSavedHowl)
                .then(howl => {
                    context.addSavedHowl(howl);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                });
        }
    }

    if (!howl_id) {
        return (
            <div 
                className='error'
                role='alert'
            >
                <p>Error: Looks like something went wrong. Please check your connection and the URL and try again.</p>
            </div>
        );
    }

    if (howlSaved) {
        return (
            <div aria-live='polite'>
                <p className='HowlPageButtons__p valid'>Howl saved!</p>
                <button
                    className='HowlPageButtons__button button'
                    type='button' 
                    onClick={removeHowlCheck}
                >
                    Remove howl from your saved howls.
                </button>
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    }

    return (
        <div aria-live='polite'>
            <button
                className='HowlPageButtons__button button'
                type='button' 
                onClick={addHowlCheck}
            >
                Save howl!
            </button>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </div>
    );
}

HowlPageButtons.defaultProps = {
    howl_id: '',
};

HowlPageButtons.propTypes = {
    howl_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HowlPageButtons;
