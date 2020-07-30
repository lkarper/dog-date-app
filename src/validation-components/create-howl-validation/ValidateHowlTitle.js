import React, { useEffect } from 'react';

const ValidateHowlTitle = (props) => {
    const { howlTitle, howlTitleError, setHowlTitleError } = props;

    useEffect(() => {
        if (howlTitle.trim().length === 0) {
            setHowlTitleError('You must provide a title for your howl. (Max 100 chars.)')
        } else {
            setHowlTitleError('');
        }
    }, [howlTitle, setHowlTitleError]);

    if (howlTitleError) {
        return <p id='howl-title-validator'>{howlTitleError}</p>
    }

    return <p id='howl-title-validator'>Howl title meets requirements. (Max 100 chars.)</p>
}

export default ValidateHowlTitle;