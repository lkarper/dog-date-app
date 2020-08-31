import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import HowlsService from '../services/howls-service';

const HowlPageButtons = (props) => {

    const { howl_id } = props;

    const context = useContext(UserContext);

    const [apiError, setApiError] = useState(false);

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

    if (howlSaved) {
        return (
            <div aria-live='polite'>
                <p>Howl saved!</p>
                <button onClick={removeHowlCheck}>Remove howl from your saved howls.</button>
                <div role='alert'>
                    {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                </div>
            </div>
        );
    }

    return (
        <div aria-live='polite'>
            <button onClick={addHowlCheck}>Save howl!</button>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </div>
    );
}

export default HowlPageButtons;
