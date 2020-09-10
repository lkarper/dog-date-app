import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import HowlPageButtons from '../HowlPageButtons/HowlPageButtons';
import HowlsService from '../services/howls-service';

const HowlPageUserButtons = (props) => {

    const context = useContext(UserContext);

    const { 
        howl, 
        showEdit,
        setShowEdit 
    } = props;

    const [apiError, setApiError] = useState(false);

    const checkDeleteHowl = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete this howl?`);
        if (confirmation) {
            setApiError(false);
            HowlsService.deleteHowl(howl.id)
                .then(() => {
                    props.history.push('/home');
                    context.removeHowl(howl.id);
                })
                .catch(error => {
                    setApiError(true);
                    console.log(error);
                });
        }
    }

    if (Object.keys(context.user).length) {
        if (context.user.id === howl.user_id) {
            return (
                <div className='HowlPageUserButtons__container'>
                    <button
                        className='HowlPageUserButtons__button button'
                        type='button' 
                        onClick={() => setShowEdit(!showEdit)}
                    >
                        {showEdit ? 'Cancel edit' : 'Edit'}
                    </button>
                    <button 
                        className='HowlPageUserButtons__button button'
                        type='button'
                        onClick={checkDeleteHowl}
                    >
                        Delete
                    </button>
                    <div role='alert'>
                        {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
                    </div>
                </div>
            );
        }
        return <HowlPageButtons user_id={context.user.id} howl_id={howl.id} />
    }

    return <Link to='/login'>Log in to edit and save Howls!</Link>;

}

export default withRouter(HowlPageUserButtons);
