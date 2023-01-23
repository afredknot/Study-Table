import React from "react";
import "./style.css";


const CommentDisplay = ({ comment }) => {

    // add delete buttons?
    return (
        <div className = "">
            <li key={comment._id}>
                <h4 id={comment._id} className="comment">{comment.commentText}</h4>
                <h5>{comment.commentAuthor}</h5>
                <h5>{comment.createdAt}</h5>

            <ul>
                {comment.replies.map((reply) => {
                    <li key={reply._id}>
                        <p className="tagAuth">{reply.replyText}</p>
                        <p className="tagAssi">{reply.replyAuthor}</p>
                        <p className="tagDur">{reply.createdAt}</p>
                    </li>
                })}
            </ul>

                {/* <button>Reply</button> */}
            </li>
        </div>
    );
};

export default CommentDisplay;