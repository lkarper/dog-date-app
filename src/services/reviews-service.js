import config from '../config';
import TokenService from './token-service';

const ReviewsService = {
    getReviewsByDogId(dogId) {
        return fetch(`${config.API_ENDPOINT}/reviews/by-dog/${dogId}`, {
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
    getReviewsByOwnerId() {
        return fetch(`${config.API_ENDPOINT}/reviews/by-owner`, {
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
};

export default ReviewsService;