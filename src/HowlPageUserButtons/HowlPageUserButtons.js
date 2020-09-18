import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import HowlPageButtons from '../HowlPageButtons/HowlPageButtons';
import HowlsService from '../services/howls-service';

const HowlPageUserButtons = (props) => {
    const context = useContext(UserContext);

    const { 
        howl, 
        showEdit,
        setShowEdit, 
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

    if (!howl.id) {
        return (
            <div 
                className='HowlPageUserButtons__container error'
            >
                <p>
                    Error: Looks like something went wrong. Check your connection and the URL and try again.
                </p>
            </div>
        );
    }

    // Only display user buttons if the user is logged in
    if (Object.keys(context.user).length) {

        // Only display the buttons for editing or deleting a howl if the user owns the howl
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
        
        // Display buttons for adding to or removing from saved howls if the user does not own the howl
        return <HowlPageButtons howl_id={howl.id} />;
    }

    return <Link to='/login'>Log in to edit and save Howls!</Link>;

}

HowlPageUserButtons.defaultProps = {
    howl: {
        id: '',
        user_id: '',
    }, 
    showEdit: false,
    setShowEdit: () => {},
    history:  {
        push: () => {},
    },
};

HowlPageUserButtons.propTypes = {
    howl: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    showEdit: PropTypes.bool,
    setShowEdit: PropTypes.func,
    history: PropTypes.object,
};

export default withRouter(HowlPageUserButtons);
