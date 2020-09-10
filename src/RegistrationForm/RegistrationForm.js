import React, { useState, useEffect, useContext, useRef } from 'react';
import UserContext from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthApiService from '../services/auth-api-service';
import ValidateEmail from '../validation-components/registration-validation/ValidateEmail';
import ValidatePhoneNumber from '../validation-components/registration-validation/ValidatePhoneNumber';
import ValidateUsername from '../validation-components/registration-validation/ValidateUsername';
import ValidatePassword from '../validation-components/registration-validation/ValidatePassword';
import ValidateReenteredPassword from '../validation-components/registration-validation/ValidateReenteredPassword';
import './RegistrationForm.css';

const RegistrationForm = (props) => {

    const context = useContext(UserContext);

    const errorEl = useRef(null);

    const {
        suffix = '',
        currentEmail = '',
        currentPhone = '',
        setShowEdit,
    } = props;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const [email, setEmail] = useState(currentEmail);
    const [emailValidationError, setEmailValidationError] = useState(null);
    const [phone, setPhone] = useState(currentPhone);
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
    const [apiError, setApiError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoading(true);
        setEmailAlreadyRegistered(false);
        setUsernameExists(false);

        if (suffix) {
            AuthApiService.updateUser({
                email,
                phone
            })
                .then(res => {
                    window.sessionStorage.setItem('email', email);
                    window.sessionStorage.setItem('phone', phone);
                    const {
                        id,
                        username
                    } = context.user;
                    context.setUser({
                        id,
                        username,
                        email,
                        phone
                    });
                    setEmailValidationError(false);
                    setPhoneValidationError(false);
                    setEmailAlreadyRegistered(false);
                    setApiError(false);
                    setShowEdit(false);
                })
                .catch(res => {
                    if (res.error === `Account already registered with that email`) {
                        setEmailAlreadyRegistered(email);
                    }
                    setShowLoading(false);
                    setApiError(res.error);
                });
        } else {
            AuthApiService.postUser({
                username,
                email,
                phone,
                password,
            })
                .then(user => {
                    setEmail('');
                    setEmailValidationError(false);
                    setPhone('');
                    setPhoneValidationError(false);
                    setUsername('');
                    setUsernameValidationError(false);
                    setPassword('');
                    setPasswordErrorMessage([]);
                    setReenteredPassword('');
                    setEmailAlreadyRegistered(false);
                    setUsernameExists(false);
                    props.history.push('/login');
                })
                    .catch(res => {
                        if (res.error === `Account already registered with that email`) {
                            setEmailAlreadyRegistered(email);
                        }
                        if (res.error === `Username already taken`) {
                            setUsernameExists(username)
                        }
                        setShowLoading(false);
                        setApiError(res.error);
                        window.scrollTo(0, errorEl.current.offsetTop)
                    });
        }
    }

    return (
        <section className='RegistrationForm__section outer-section'>
            {!suffix && 
                <header className='RegistrationForm__header'>
                    <h1>Even man's best friend needs a pack...</h1>
                </header>
            }
            {suffix &&
                <header>
                    <h3>Edit contact info</h3>
                </header>
            }
            <form 
                className='RegistrationForm__form'
                onSubmit={handleSubmit}
            >
                <fieldset
                    className='RegistrationForm__fieldset outer-fieldset'
                >
                    <legend>Create an account to get started!</legend>
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
                            suffix={suffix}
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
                            phoneValidationError={phoneValidationError}
                            setPhoneValidationError={setPhoneValidationError}
                        /> 
                    </div>
                    {!suffix &&
                        <> 
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    id="username" 
                                    name="username"
                                    value={username}
                                    autoComplete='username' 
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
                                    autoComplete='new-password'
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
                                    autoComplete='new-password'
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
                        </>
                    }
                </fieldset>
                <button 
                    className='button'
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
            <div
                ref={errorEl} 
                role="alert"
            >
                {(apiError && !suffix) && 
                    <section
                        className='RegistrationForm__section section'
                    >
                        <h2>Error</h2>
                        <p>New user could not be created: {apiError}</p>
                    </section>
                }
                {(apiError && suffix) && 
                    <>
                        <h2>Error</h2>
                        <p>Could not update user info; check your input and connection and try again.</p>
                    </>
                }
            </div>
            {showLoading && 
                <div className='RegistrationForm__loading-container'>
                    <FontAwesomeIcon 
                        className='RegistrationForm__loading' 
                        icon={faSpinner} 
                        spin 
                    />
                </div>
            }
        </section>
    );
}

export default RegistrationForm;
