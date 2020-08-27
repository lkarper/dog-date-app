import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './AddCommentForm.css';
import ReviewsService from '../services/reviews-service';

const AddCommentForm = (props) => {

    const context = useContext(UserContext);

    const { 
        reviewId, 
        oldComment = '',
        suffix = '',
        id = '',
        comments,
        setComments,
    } = props;

    const [commentText, setCommentText] = useState(oldComment);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            date_time: new Date().toJSON(),
            comment: commentText,
            edited: !!suffix
        };

        if (suffix) {
            ReviewsService.updateComment(reviewId, id, newComment)
                .then(() => {
                    const updatedComments = comments.filter(c => c.id !== id);
                    updatedComments.push({
                        ...newComment,
                        id,
                        commenter: context.user.username,
                    });
                    setComments(updatedComments);
                    props.setShowEdit(false);
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            ReviewsService.addComment(reviewId, newComment)
                .then(comment => {
                    setComments([...comments, comment]);
                })
                .catch(error => console.log(error));
        }
        setCommentText('');
    }

    return (
        <form 
            className='AddCommentForm__form'
            onSubmit={handleSubmit}
        >
            <textarea
                className='AddCommentForm__textarea'
                aria-label='Leave your own comment here.'
                placeholder='(Leave your own comment here.)'
                maxLength='2000'
                rows='8'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            >
            </textarea> 
            <button
                type='submit'
                disabled={commentText.trim().length === 0}
            >
                Submit
            </button>
        </form>
    );
}

export default AddCommentForm;