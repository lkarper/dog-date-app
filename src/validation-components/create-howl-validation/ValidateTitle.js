import React, { useEffect } from 'react';

const ValidateTitle = (props) => {
    const { title, titleError, setTitleError } = props;

    useEffect(() => {
        if (title.trim().length === 0) {
            setTitleError('You must provide a title. (Max 100 chars.)')
        } else {
            setTitleError('');
        }
    }, [title, setTitleError]);

    if (titleError) {
        return <p id='title-validator'>{titleError}</p>
    }

    return <p id='title-validator'>Title meets requirements. (Max 100 chars.)</p>
}

export default ValidateTitle;