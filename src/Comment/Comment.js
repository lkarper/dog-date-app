import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import moment from 'moment';
import './Comment.css';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import ReviewsService from '../services/reviews-service';

const Comment = (props) => {

    const context = useContext(UserContext);

    const { comment, comments, setComments } = props;

    const [showEdit, setShowEdit] = useState(false);

    const checkDelete = () => {
        const confirmation = window.confirm(`Are you sure that you'd like to delete this comment?`);
        if (confirmation) {
            ReviewsService.deleteComment(comment.review_id, comment.id)
                .then(() => {
                    const newComments = comments.filter(c => c.id !== comment.id);
                    setComments(newComments);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <li className='Comment__li'>
            <p>Comment by {comment.commenter}</p>
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
                            onClick={() => setShowEdit(true)}
                        >
                            Edit comment
                        </button>
                        <button
                            onClick={checkDelete}
                        >
                            Delete comment
                        </button>
                    </div>
                :
                    ''
            }
            {showEdit && <button onClick={() => setShowEdit(false)}>Nevermind</button>}
        </li>
    );
}

export default Comment;