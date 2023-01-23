import React from "react";
import "./style.css";


const CommentDisplay = ({ comment }) => {

    // add delete buttons?
    return (
        <div className="commentContainer">
            <li key={comment._id} className="commentLine">
                <p id={comment._id} className="commentBody">{comment.commentText}</p>
                <p className="commentAuth">Created by : {comment.commentAuthor}</p>
                <p className="commentDate">{comment.createdAt}</p>
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