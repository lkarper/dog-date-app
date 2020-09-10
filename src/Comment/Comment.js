import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import moment from 'moment';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import ReviewsService from '../services/reviews-service';
import './Comment.css';

const Comment = (props) => {

    const context = useContext(UserContext);

    const { comment, comments, setComments } = props;

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

export default Comment;
