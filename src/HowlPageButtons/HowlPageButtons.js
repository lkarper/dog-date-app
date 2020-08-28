import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import HowlsService from '../services/howls-service';

const HowlPageButtons = (props) => {

    const { howl_id } = props;

    const context = useContext(UserContext);

    const howlSaved = context.userSavedHowls.find(ush => ush.howl.id === howl_id);

    const removeHowlCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove this howl from your list of saved howls?`);
        if (confirmation) {
            HowlsService.removeHowlFromUserSaved(howlSaved.id)
                .then(res => {
                    context.removeSavedHowl(howl_id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const addHowlCheck = () => {
        const confirmation = window.confirm(`Would you like to add this howl to your saved howls list?`);
        if (confirmation) {
            const newSavedHowl = {
                howl_id
            };
            HowlsService.addUserSavedHowl(newSavedHowl)
                .then(howl => {
                    context.addSavedHowl(howl);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    if (howlSaved) {
        return (
            <div>
                <p>Howl saved!</p>
                <button onClick={removeHowlCheck}>Remove howl from your saved howls.</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={addHowlCheck}>Save howl!</button>
        </div>
    );
}

export default HowlPageButtons;
