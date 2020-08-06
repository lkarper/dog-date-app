import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlPageButtons from '../HowlPageButtons/HowlPageButtons';

const HowlPageUserButtons = (props) => {

    const context = useContext(UserContext);

    const { howl } = props;

    if (Object.keys(context.user).length) {
        if (context.user.id === howl.user_id) {
            return (
                <div className='HowlPageUserButtons__container'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            );
        }
        return <HowlPageButtons user_id={context.user.id} howl_id={howl.id} />
    }

    return <Link to='/login'>Log in to edit and save Howls!</Link>;

}

export default HowlPageUserButtons;