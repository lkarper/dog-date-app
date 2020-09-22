import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import ReviewsService from '../services/reviews-service';
import './AddCommentForm.css';

const AddCommentForm = (props) => {
    const context = useContext(UserContext);

    const { 
        reviewId, 
        oldComment,
        suffix,
        id,
        comments,
        setComments,
    } = props;

    const [commentText, setCommentText] = useState(oldComment);
    const [apiError, setApiError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setApiError(false);
        const newComment = {
            date_time: new Date().toJSON(),
            comment: commentText,
            edited: !!suffix
        };

        // The suffix prop will only be used if the form is being used to update a comment 
        if (suffix) {
            ReviewsService.updateComment(reviewId, id, newComment)
                .then(() => {
                    const updatedComments = comments.filter(c => c.id !== id);
                    updatedComments.push({
                        ...newComment,
                        id,
                        commenter: context.user.username,
                        review_id: reviewId,
                    });
                    setCommentText('');
                    setComments(updatedComments);
                    props.setShowEdit(false);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                })
        } else {
            ReviewsService.addComment(reviewId, newComment)
                .then(comment => {
                    setComments([...comments, comment]);
                    setCommentText('');
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                });
        }
    }

    if (!reviewId) {
        return (
            <p 
                className='AddCommentForm__error error'
            >
                Cannot comment at this time.
            </p>
        );
    }

    return (
        <form 
            className='AddCommentForm__form'
            onSubmit={handleSubmit}
        >
            <textarea
                className='AddCommentForm__textarea'
                aria-label='Leave a new comment here.'
                placeholder='(Leave a new comment here.)'
                maxLength='2000'
                rows='8'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button
                className='AddCommentForm__submit button'
                type='submit'
                disabled={commentText.trim().length === 0}
            >
                Submit
            </button>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </form>
    );
}

AddCommentForm.defaultProps = {
    reviewId: '', 
    oldComment: '',
    suffix: '',
    id: '',
    comments: [],
    setComments: () => {},
};

AddCommentForm.propTypes = {
    reviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    oldComment: PropTypes.string,
    suffix: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comments: PropTypes.array,
    setComments: PropTypes.func,
};

export default AddCommentForm;
