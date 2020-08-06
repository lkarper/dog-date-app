import React, { useEffect } from 'react';
import CreateHowl from '../CreateHowl/CreateHowl';

const CreateHowlPage = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    return (
        <>
            <header>
                <h1>Howl now!</h1>
                <p>Look for friends for your dog!</p>
            </header>
            <CreateHowl />
        </>
    )
}

export default CreateHowlPage;