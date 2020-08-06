import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Comment from '../Comment/Comment';
import './ReviewComments.css';

const ReviewComments = (props) => {

    const context = useContext(UserContext);

    const { reviewId } = props;

    const comments = context.reviewComments.filter(comment => comment.review_id === reviewId);

    if (comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    return (
        <ul className='ReviewComments__list'>
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </ul>
    );
}

export default ReviewComments;