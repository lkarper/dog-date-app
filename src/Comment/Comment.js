import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import moment from 'moment';
import PropTypes from 'prop-types';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import ReviewsService from '../services/reviews-service';
import './Comment.css';

const Comment = (props) => {

    const context = useContext(UserContext);

    const { 
        comment, 
        comments, 
        setComments 
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const [apiError, setApiError] = useState(false);

    const checkDelete = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete this comment?`);
        if (confirmation) {
            setApiError(false);
            ReviewsService.deleteComment(comment.review_id, comment.id)
                .then(() => {
                    const newComments = comments.filter(c => c.id !== comment.id);
                    setComments(newComments);
                })
                .catch(error => {
                    console.log(error);
                    setApiError(true);
                });
        }
    }

    if (!comment.comment || !comment.id || !comment.review_id) {
        return (
            <li
                className='Comment__li error'
            >
                <p>
                    Could not load comment at this time.
                </p>
            </li>
        )
    }

    return (
        <li className='Comment__li'>
            <div aria-live='polite'>
                <p><b>Comment by:</b> {comment.commenter}</p>
                <p>{moment(comment.date_time).format("MMMM Do YYYY, h:mm a")}</p>
                <p>{comment.edited && 'Edited'}</p>
                {!showEdit && <blockquote>{comment.comment}</blockquote>}
                {showEdit && 
                    <AddCommentForm 
                        reviewId={comment.review_id}
                        oldComment={comment.comment}
                        suffix='-edit'
                        id={comment.id}
                        setShowEdit={setShowEdit}
                        comments={comments}
                        setComments={setComments}
                    />
                }
                {context.user.username === comment.commenter && !showEdit
                    ?
                        <div>
                            <button
                                className='Comment__button button'
                                type='button'
                                onClick={() => setShowEdit(true)}
                            >
                                Edit comment
                            </button>
                            <button
                                className='Comment__button button'
                                type='button'
                                onClick={checkDelete}
                            >
                                Delete comment
                            </button>
                        </div>
                    :
                        ''
                }
                {showEdit && 
                    <button
                        className='Comment__button button'
                        type='button' 
                        onClick={() => setShowEdit(false)}
                    >
                        Nevermind
                    </button>
                }
            </div>
            <div role='alert'>
                {apiError && <p>Error: Looks like something went wrong. Please check your connection and try again.</p>}
            </div>
        </li>
    );
}

Comment.defaultProps = {
    comment: {
        comment: '',
        commenter: '',
        date_time: '',
        edited: false,
        id: 0,
        review_id: 0,
    },
    comments: [],
    setComments: () => {},
};

Comment.propTypes = {
    comment: PropTypes.shape({
        comment: PropTypes.string,
        commenter: PropTypes.string,
        date_time: PropTypes.string,
        edited: PropTypes.bool,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        review_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func,
};

export default Comment;
