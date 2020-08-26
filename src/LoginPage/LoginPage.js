import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import AuthApiService from '../services/auth-api-service';
import DogProfilesService from '../services/dog-profiles-service';
import HowlsService from '../services/howls-service';

const LoginForm = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const onLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/home';

        Promise.all([
                DogProfilesService.fetchUserDogs(), 
                DogProfilesService.fetchPackMembers(),
                HowlsService.fetchUserSavedHowls(),
            ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                const userDogs = values[0];
                const packMembers = values[1];
                const userSavedHowls = values[2];
                context.setDogs(userDogs);
                context.setUserPackMembers(packMembers);
                context.setUserSavedHowls(userSavedHowls);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                context.setError(error.message);
            });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError(null);
        AuthApiService.postLogin({
            username: username,
            password
        })
            .then(res => {
                setUsername('');
                setPassword('');
                onLoginSuccess();
            })
            .catch(res => {
                setLoginError(res.error);
            });
    }

    return (
        <section className='section'>
            <header>
                <h1>Log in</h1>
            </header>
            <form onSubmit={(e) => handleLogin(e)}>
                <div>
                    <label
                        htmlFor='username'
                    >
                        Username:
                    </label>
                    <input 
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='password'
                    >
                        Password:
                    </label>
                    <input 
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    disabled={!username || !password}
                >
                    Submit
                </button>
                <div role='alert'>
                    {loginError ? <p>{loginError}</p> : ''}
                </div>
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </section>
    );
}

export default LoginForm;