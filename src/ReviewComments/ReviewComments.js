import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './ReviewComments.css';

const ReviewComments = (props) => {
    const { 
        comments, 
        setComments, 
    } = props;

    if (comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    return (
        <ul 
            aria-live='polite' 
            className='ReviewComments__list'
        >
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

ReviewComments.defaultProps = {
    comments: [],
    setComments: () => {},
};

ReviewComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
};

export default ReviewComments;
