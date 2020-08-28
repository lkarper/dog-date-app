import config from '../config';
import TokenService from './token-service';

const DogProfilesService = {
    fetchUserDogs() {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/user-dogs`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        });
    },
    fetchPackMembers() {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/pack-members`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        });
    },
    fetchDogProfileById(id) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/${id}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()    
            );
    },
    removePackMember(entryId) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/pack-members/${entryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    addPackMember(newPackMember) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/pack-members`, {
            method: 'POST',
            body: JSON.stringify(newPackMember),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    deleteDogProfile(dogId) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/${dogId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    createDogProfile(newProfile) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newProfile)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    updateDogProfile(id, updatedProfile) {
        return fetch(`${config.API_ENDPOINT}/dog-profiles/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(updatedProfile)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
}

export default DogProfilesService;
