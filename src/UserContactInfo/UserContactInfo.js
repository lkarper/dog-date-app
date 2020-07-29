import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const UserContactInfo = (props) => {
    
    const context = useContext(UserContext);
    
    const { phone, email } = context.user;

    return (
        <section>
            <header>
                <h3>My contact info</h3>
            </header>
                <p>{phone ? `Phone: ${phone}` : `Phone: (not provided)`}</p>
                <p>Email: {email}</p>
        </section>
    );
}

export default UserContactInfo;