import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import STORE from '../STORE';

const LoginForm = (props) => {

    const context = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
        const user = STORE.users.find(user => user.username === username);
        if (user) {
            if (user.password === password) {
                setLoginError(null);
                context.setUser({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    username: user.username, 
                });
                props.history.push('/home');
            } else {
                setLoginError('Incorrect username or password.')
            }
        } else {
            setLoginError('Incorrect username or password.')
        }        
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