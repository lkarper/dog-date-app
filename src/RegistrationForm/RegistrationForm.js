import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ValidateEmail from '../validation-components/registration-validation/ValidateEmail';
import ValidatePhoneNumber from '../validation-components/registration-validation/ValidatePhoneNumber';
import ValidateUsername from '../validation-components/registration-validation/ValidateUsername';
import ValidatePassword from '../validation-components/registration-validation/ValidatePassword';
import ValidateReenteredPassword from '../validation-components/registration-validation/ValidateReenteredPassword';
import STORE from '../STORE';

const RegistrationForm = (props) => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const [email, setEmail] = useState('');
    const [emailValidationError, setEmailValidationError] = useState(null);
    const [phone, setPhone] = useState('');
    const [phoneValidationError, setPhoneValidationError] = useState(null);
    const [username, setUsername] = useState('');
    const [usernameValidationError, setUsernameValidationError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);
    const [passwordError, setPasswordError] = useState({
        tooShort: true,
        tooLong: false,
        endSpaces: false,
        upperCase: true,
        lowerCase: true,
        number: true,
        specialChar: true,
    });
    const [reenteredPassword, setReenteredPassword] = useState('');
    const [reenteredPasswordError, setReenteredPasswordError] = useState(null);
    const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const promise1 = new Promise (resolve => {
            if (STORE.users.find(user => user.email === email)) {
                setEmailAlreadyRegistered(email);
            } else {
                setEmailAlreadyRegistered(false);
            }
        });
        const promise2 = new Promise (resolve => {
            if (STORE.users.find(user => user.username === username)) {
                setUsernameExists(username);
            } else {
                setUsernameExists(false);
            }
        });
        Promise.all([promise1, promise2])
            .then(values => {
                if (!emailAlreadyRegistered && !usernameExists) {
                    const newUser = {
                        id: uuidv4(),
                        email,
                        username,
                        phone,
                        password
                    }
                    STORE.users.push(newUser);
                    props.history.push('/login');
                }
            });
    }

    return (
        <section>
            <header>
                <h2>Even man's best friend needs a pack.</h2>
                <p>Create an account to get started!</p>
            </header>
            <form 
                className='signup-form'
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        placeholder="example@example.com" 
                        id="email" 
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-describedby='email-validation'
                    />
                </div>
                <div role='alert'>
                    <ValidateEmail 
                        email={email}
                        emailValidationError={emailValidationError}
                        emailAlreadyRegistered={emailAlreadyRegistered}
                        setEmailValidationError={setEmailValidationError}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone number:</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={phone} 
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        aria-describedby="phone-validation" 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div role='alert'>
                    <ValidatePhoneNumber 
                        phone={phone}
                        setPhoneValidationError={setPhoneValidationError}
                    /> 
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        id="username" 
                        name="username"
                        value={username} 
                        aria-describedby='username-validation'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div role='alert'>
                    <ValidateUsername 
                        username={username}
                        usernameValidationError={usernameValidationError}
                        usernameExists={usernameExists}
                        setUsernameValidationError={setUsernameValidationError}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        aria-describedby="password-error-message"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </div>
                <ValidatePassword 
                    password={password} 
                    passwordErrorMessage={passwordErrorMessage}
                    passwordError={passwordError}
                    setPasswordErrorMessage={setPasswordErrorMessage}
                    setPasswordError={setPasswordError}
                />
                <div>
                    <label htmlFor="reenter-password">Re-enter password:</label>
                    <input 
                        type="password" 
                        id="reenter-password" 
                        name="reenter-password" 
                        value={reenteredPassword}
                        aria-describedby="reenter-password-validation"
                        onChange={(e) => setReenteredPassword(e.target.value)}
                        required
                    />
                </div>
                <ValidateReenteredPassword 
                    password={password}
                    reenteredPassword={reenteredPassword}
                    reenteredPasswordError={reenteredPasswordError}
                    setReenteredPasswordError={setReenteredPasswordError}
                /> 
                <div role='alert'>

                </div>
                <button 
                    type="submit"
                    disabled={
                        emailValidationError || 
                        phoneValidationError || 
                        usernameValidationError || 
                        passwordErrorMessage.length || 
                        reenteredPasswordError}
                >
                    Submit
                </button>
            </form>
        </section>
    );
}

export default RegistrationForm;