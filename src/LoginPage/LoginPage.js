import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../contexts/UserContext';
import AuthApiService from '../services/auth-api-service';
import DogProfilesService from '../services/dog-profiles-service';
import HowlsService from '../services/howls-service';
import './LoginPage.css';

const LoginForm = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    const onLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/home';

        Promise.all([
                DogProfilesService.fetchUserDogs(), 
                DogProfilesService.fetchPackMembers(),
                HowlsService.fetchUserSavedHowls(),
                HowlsService.fetchHowlsByUser(),
            ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                const userDogs = values[0];
                const packMembers = values[1];
                const userSavedHowls = values[2];
                const howls = values[3];
                context.setDogs(userDogs);
                context.setUserPackMembers(packMembers);
                context.setUserSavedHowls(userSavedHowls);
                context.setHowls(howls);
                context.setError(false);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                console.log(error);
                setShowLoading(false);
                context.setError(true);
            });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError(null);
        setShowLoading(true);
        AuthApiService.postLogin({
            username: username,
            password
        })
            .then(res => {
                const {
                    id,
                    username,
                    email,
                    phone
                } = res;
                setUsername('');
                setPassword('');
                context.setUser({
                    id,
                    username,
                    email,
                    phone
                });
                onLoginSuccess();
            })
            .catch(res => {
                setLoginError(res.error);
                setShowLoading(false);
            });
    }

    return (
        <section className='section'>
            <header>
                <h1>Log in</h1>
            </header>
            <form onSubmit={(e) => handleLogin(e)}>
                <div
                    className='LoginPage__div label-input-container'
                >
                    <label
                        htmlFor='username'
                    >
                        Username:
                    </label>
                    <input 
                        type='text'
                        id='username'
                        value={username}
                        autoComplete='username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div
                    className='LoginPage__div label-input-container'
                >
                    <label
                        htmlFor='password'
                    >
                        Password:
                    </label>
                    <input 
                        type='password'
                        id='password'
                        value={password}
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className='LoginPage__submit button'
                    type='submit'
                    disabled={!username || !password}
                >
                    Submit
                </button>
            </form>
            <div
                className='LoginPage__alert-div' 
                role='alert'
            >
                {loginError 
                    ? 
                        <p 
                            className='LoginPage__p error'
                        >
                            {loginError}
                        </p> 
                    : 
                        ''
                }
            </div>
            <p>Don't have an account? <Link className='link' to='/register'>Register</Link></p>
            {showLoading && 
                <div className='LoginPage__loading-container'>
                    <FontAwesomeIcon 
                        className='LoginPage__loading' 
                        icon={faSpinner} 
                        spin 
                    />
                </div>
            }
        </section>
    );
}

export default LoginForm;