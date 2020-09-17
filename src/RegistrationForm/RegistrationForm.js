import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthApiService from '../services/auth-api-service';
import ValidateEmail from '../validation-components/registration-validation/ValidateEmail/ValidateEmail';
import ValidatePhoneNumber from '../validation-components/registration-validation/ValidatePhoneNumber/ValidatePhoneNumber';
import ValidateUsername from '../validation-components/registration-validation/ValidateUsername/ValidateUsername';
import ValidatePassword from '../validation-components/registration-validation/ValidatePassword/ValidatePassword';
import ValidateReenteredPassword from '../validation-components/registration-validation/ValidateReenteredPassword/ValidateReenteredPassword';
import './RegistrationForm.css';

const RegistrationForm = (props) => {

    const context = useContext(UserContext);

    const {
        suffix,
        currentEmail,
        currentPhone,
        setShowEdit,
    } = props;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const [email, setEmail] = useState(currentEmail);
    const [emailValidationError, setEmailValidationError] = useState('');
    const [phone, setPhone] = useState(currentPhone);
    const [phoneValidationError, setPhoneValidationError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameValidationError, setUsernameValidationError] = useState('');
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
    const [reenteredPasswordError, setReenteredPasswordError] = useState('');
    const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState('');
    const [usernameExists, setUsernameExists] = useState('');
    const [apiError, setApiError] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoading(true);
        setEmailAlreadyRegistered('');
        setUsernameExists('');

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
                    setEmailValidationError('');
                    setPhoneValidationError('');
                    setEmailAlreadyRegistered('');
                    setApiError('');
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
                    setEmailValidationError('');
                    setPhone('');
                    setPhoneValidationError('');
                    setUsername('');
                    setUsernameValidationError('');
                    setPassword('');
                    setPasswordErrorMessage([]);
                    setReenteredPassword('');
                    setEmailAlreadyRegistered('');
                    setUsernameExists('');
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
                        window.scrollTo(0, document.querySelector('.RegistrationForm__alert-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
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
                <header
                    className='RegistrationForm__header-edit'
                >
                    <h3>Edit contact info</h3>
                </header>
            }
            <form 
                className='RegistrationForm__form'
                onSubmit={handleSubmit}
            >
                <fieldset
                    className={`RegistrationForm__fieldset outer-fieldset ${suffix}`}
                >
                    {!suffix && <legend>Create an account to get started!</legend>}
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
                className='RegistrationForm__alert-div'
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

RegistrationForm.defaultProps = {
    suffix: '',
    currentEmail: '',
    currentPhone: '',
    setShowEdit: () => {},
    history: {
        push: () => {},
    }
};

RegistrationForm.propTypes = {
    suffix: PropTypes.string.isRequired,
    currentEmail: PropTypes.string.isRequired,
    currentPhone: PropTypes.string.isRequired,
    setShowEdit: PropTypes.func,
    history: PropTypes.object,
};

export default RegistrationForm;
