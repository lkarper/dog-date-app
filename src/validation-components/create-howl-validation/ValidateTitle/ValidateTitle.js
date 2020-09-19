import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateTitle = (props) => {
    const { 
        title, 
        titleError, 
        setTitleError, 
    } = props;

    useEffect(() => {
        if (title.trim().length === 0) {
            setTitleError('You must provide a title. (Max 100 chars.)');
        } else {
            setTitleError('');
        }
    }, [title, setTitleError]);

    if (titleError) {
        return (
            <p 
                className='ValidateTitle__validator error'
                id='title-validator'
            >
                {titleError}
            </p>
        );
    }

    return ( 
        <p 
            className='ValidateTitle__validator valid'
            id='title-validator'
        >
            Title meets requirements. (Max 100 chars.)
        </p>
    );
}

ValidateTitle.defaultProps = {
    title: '',
    titleError: 'You must provide a title. (Max 100 chars.)',
    setTitleError: () => {},
};

ValidateTitle.propTypes = {
    title: PropTypes.string.isRequired,
    titleError: PropTypes.string.isRequired,
    setTitleError: PropTypes.func.isRequired,
};

export default ValidateTitle;
