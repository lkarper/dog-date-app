import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';

const HowlPageButtons = (props) => {

    const { user_id, howl_id } = props;

    const context = useContext(UserContext);

    const howlSaved = context.userSavedHowls.find(ush => ush.user_id === user_id && ush.howl_id === howl_id);

    const removeHowlCheck = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to remove this howl from your list of saved howls?`);
        if (confirmation) {
            context.removeSavedHowl(howl_id);
        }
    }

    const addHowlCheck = () => {
        const confirmation = window.confirm(`Would you like to add this howl to your saved howls list?`);
        if (confirmation) {
            const newSavedHowl = {
                id: uuidv4(),
                user_id,
                howl_id
            };
            context.addSavedHowl(newSavedHowl);
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
