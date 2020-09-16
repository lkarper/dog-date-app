import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId;

const TokenService = {
    saveAuthToken(res) {
        const {
            id,
            username,
            email,
            phone,
            authToken
        } = res;
        window.sessionStorage.setItem(config.TOKEN_KEY, authToken);
        window.sessionStorage.setItem('username', username);
        window.sessionStorage.setItem('id', id);
        window.sessionStorage.setItem('email', email);
        window.sessionStorage.setItem('phone', phone);
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY);
        window.sessionStorage.removeItem('id');
        window.sessionStorage.removeItem('username');
        window.sessionStorage.removeItem('email');
        window.sessionStorage.removeItem('phone');
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },
    parseJwt(jwt) {
        return jwtDecode(jwt);
    },
    readJwtToken() {
        return TokenService.parseJwt(TokenService.getAuthToken());
    },
    _getMsUntilExpiry(payload) {
        /*
        payload is from the JWT
        the `exp` value is in seconds, need to convert to ms, so * 1000
        calculates the difference between now and when the JWT will expire
        */
        return (payload.exp * 1000) - Date.now();
    },
    queueCallbackBeforeExpiry(callback) {
        /* get the number of ms from now until the token expires */
        const msUntilExpiry = TokenService._getMsUntilExpiry(
            TokenService.readJwtToken()
        );
        /*
        queue a callback that will happen 30 seconds before the token expires
        the callback is passed in as an argument so could be anything,
        in this app, the callback is for calling the refresh endpoint
        */
        _timeoutId = setTimeout(callback, msUntilExpiry - 30000);
    },
    clearCallbackBeforeExpiry() {
        clearTimeout(_timeoutId);
    },
}

export default TokenService
