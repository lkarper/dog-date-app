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
};

export default HowlsService;