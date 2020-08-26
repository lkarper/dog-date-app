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
    }
}

export default DogProfilesService;