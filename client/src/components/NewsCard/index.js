import React from "react";

const NewsCard = ({announcements}) => {

    return (
        <card>
            {announcements.map((announcement) => {
                <div>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.body}</p>
                </div>
            })}
        </card>
    );
};

export default NewsCard;