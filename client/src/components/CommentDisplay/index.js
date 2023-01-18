import React from "react";

const CommentDisplay = ({ comment }) => {

    return (
        <div>
            <button onClick={createComment}>Create Comment</button>
            {comment.map((comment) => (
                <div>
                    <div>
                        <p>{comment.author}</p>
                        <p>{comment.time}</p>
                        <p>{comment.body}</p>
                        <button onClick={createReply}>reply</button>
                    </div>


                    {(comment.replies > 0) ? comment.replies.map((reply) => {
                        <div>
                            <p>{reply.author}</p>
                            <p>{reply.time}</p>
                            <p>{reply.body}</p>
                        </div>
                    }) : false}
                </div>
            ))}
        </div>
    );
};

export default CommentDisplay;