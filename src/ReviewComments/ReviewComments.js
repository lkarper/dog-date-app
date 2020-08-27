import React from 'react';
import Comment from '../Comment/Comment';
import './ReviewComments.css';

const ReviewComments = (props) => {

    const { comments, setComments } = props;

    if (comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    return (
        <ul className='ReviewComments__list'>
            {comments
                .sort((a, b) => a.date_time - b.date_time)
                .map(comment => 
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        comments={comments}
                        setComments={setComments}
                    />
                )
            }
        </ul>
    );
}

export default ReviewComments;