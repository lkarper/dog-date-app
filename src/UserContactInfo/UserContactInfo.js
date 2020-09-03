import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './UserContactInfo.css';

const UserContactInfo = (props) => {
    
    const context = useContext(UserContext);
    
    const { phone, email } = context.user;

    return (
        <section className='UserContactInfo__section section'>
            <header>
                <h2>My contact info</h2>
            </header>
            <p
                className='UserContactInfo__p'
            >{phone ? `Phone: ${phone}` : `Phone: (not provided)`}</p>
            <p
                className='UserContactInfo__p'
            >Email:{' '} 
                <a
                    className='link'
                    target='_blank'
                    rel="noopener noreferrer"
                    href={`mailto:${email}`}
                >
                    {email}
                </a>
            </p>
        </section>
    );
}

export default UserContactInfo;
