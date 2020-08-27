import config from '../config';
import TokenService from './token-service';

const HowlsService = {
    fetchUserSavedHowls() {
        return fetch(`${config.API_ENDPOINT}/howls/user-saved`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    addUserSavedHowl(newSavedHowl) {
        return fetch(`${config.API_ENDPOINT}/howls/user-saved`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newSavedHowl),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    removeHowlFromUserSaved(howlId) {
        return fetch(`${config.API_ENDPOINT}/howls/user-saved/${howlId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    searchHowls(query) {
        return fetch(`${config.API_ENDPOINT}/howls/${query ? `?${query}` : ''}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getHowlById(id) {
        return fetch(`${config.API_ENDPOINT}/howls/${id}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    deleteHowl(id) {
        return fetch(`${config.API_ENDPOINT}/howls/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    fetchHowlByDogId(dogId) {
        return fetch(`${config.API_ENDPOINT}/howls/by-dog/${dogId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        });
    },
};

export default HowlsService;