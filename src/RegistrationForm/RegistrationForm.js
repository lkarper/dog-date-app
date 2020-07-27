import React, { useState } from 'react';
import ValidateEmail from '../validation-components/ValidateEmail';

const RegistrationForm = (props) => {

    const [email, setEmail] = useState('');
    const [emailValidationError, setEmailValidationError] = useState(null);
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState('');

    return (
        <section>
            <header>
                <h2>Even man's best friend needs a pack.</h2>
                <p>Create an account to get started!</p>
            </header>
            <form class='signup-form'>
                <div>
                    <label for="email">Email:</label>
                    <input 
                        type="email" 
                        placeholder="example@example.com" 
                        id="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-describedby='email-validation'
                    />
                </div>
                <div role='alert'>
                    <ValidateEmail 
                        email={email}
                        setEmailValidationError={setEmailValidationError}
                    />
                </div>
                <div>
                    <label for="phone">Phone number:</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" aria-describedby="phone-optional" />
                    <p id="phone-optional">Phone number optional</p>
                </div>
                <div>
                    <label for="user-name">Username:</label>
                    <input type="text" placeholder="Username" id="user-name" name="user-name" />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <label for="reenter-password">Re-enter password:</label>
                    <input type="password" id="reenter-password" name="reenter-password" />
                </div>
                <button 
                    type="submit"
                    disabled={emailValidationError}
                >
                    Submit
                </button>
            </form>
        </section>
    );
}

export default RegistrationForm;