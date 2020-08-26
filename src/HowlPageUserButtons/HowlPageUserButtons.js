import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlPageButtons from '../HowlPageButtons/HowlPageButtons';

const HowlPageUserButtons = (props) => {

    const context = useContext(UserContext);

    const { howl, setShowEdit } = props;

    const checkDeleteHowl = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete this howl?`);
        if (confirmation) {
            context.removeHowl(howl.id);
            props.history.push('/home');
        }
    }

    if (Object.keys(context.user).length) {
        if (context.user.id === howl.user_id) {
            return (
                <div className='HowlPageUserButtons__container'>
                    <button onClick={() => setShowEdit(true)}>Edit</button>
                    <button onClick={checkDeleteHowl}>Delete</button>
                </div>
            );
        }
        return <HowlPageButtons user_id={context.user.id} howl_id={howl.id} />
    }

    return <Link to='/login'>Log in to edit and save Howls!</Link>;

}

export default withRouter(HowlPageUserButtons);