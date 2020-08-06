import React from 'react';
import moment from 'moment';
import './Comment.css';

const Comment = (props) => {

    const { comment } = props;

    return (
        <li className='Comment__li'>
            <p>Comment by {comment.commenter}</p>
            <p>{moment(comment.date_time).format("MMMM Do YYYY, h:mm a")}</p>
            <blockquote>{comment.comment}</blockquote>
        </li>
    );

}

export default Comment;