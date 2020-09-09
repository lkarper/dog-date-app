import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './UserContactInfo.css';

const UserContactInfo = (props) => {
    
    const context = useContext(UserContext);
    
    const { phone, email } = context.user;

    const [showEdit, setShowEdit] = useState(false);

    return (
        <section 
            className='UserContactInfo__section section'
        >
            <header>
                <h2>My Contact Info</h2>
            </header>
            {showEdit 
                ? 
                    <RegistrationForm 
                        suffix='edit'
                        currentEmail={email}
                        currentPhone={phone}
                        setShowEdit={setShowEdit}
                    />
                :
                    <>
                        <p
                            className='UserContactInfo__p'
                        >
                            {phone ? `Phone: ${phone}` : `Phone: (not provided)`}
                        </p>
                        <p
                            className='UserContactInfo__p'
                        >
                            Email:{' '} 
                            <a
                                className='link'
                                target='_blank'
                                rel="noopener noreferrer"
                                href={`mailto:${email}`}
                            >
                                {email}
                            </a>
                        </p>
                    </>
            }
            <button
                className='UserContactInfo__button button'
                onClick={() => setShowEdit(!showEdit)}
            >
                {showEdit ? 'Nevermind' : 'Edit contact info'}
            </button>
        </section>
    );
}

export default UserContactInfo;
