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
    fetchReviewsByDogId(dogId) {
        return fetch(`${config.API_ENDPOINT}/reviews/by-dog/${dogId}`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        });
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
    getReviewByReviewId(id) {
        return fetch(`${config.API_ENDPOINT}/reviews/${id}`, {
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
    createNewReview(newReview) {
        return fetch(`${config.API_ENDPOINT}/reviews`, {
            method: 'POST',
            body: JSON.stringify(newReview),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    updateReview(reviewId, updatedReview) {
        return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedReview),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    deleteReview(id) {
        return fetch(`${config.API_ENDPOINT}/reviews/${id}`, {
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
    addComment(reviewId, newComment) {
        return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}/comments`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    updateComment(reviewId, commentId, updatedComment) {
        return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}/comments/${commentId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedComment),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    deleteComment(reviewId, commentId) {
        return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}/comments/${commentId}`, {
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
};

export default ReviewsService;
