import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../contexts/UserContext';
import './AddCommentForm.css';

const AddCommentForm = (props) => {

    const context = useContext(UserContext);

    const { reviewId } = props;

    const [commentText, setCommentText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            id: uuidv4(),
            review_id: reviewId,
            commenter: context.user.username,
            date_time: new Date().toJSON(),
            comment: commentText,
        };
        context.addComment(newComment);
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
    )

}

export default AddCommentForm;