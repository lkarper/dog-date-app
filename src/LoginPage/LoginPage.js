import React, { useState, useContext } from 'react';
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
                context.setUser({
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    username: user.username, 
                });
                props.history.push('/homepage');
            }
        }        
    }

    return (
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
        </form>
    )
}

export default LoginForm;