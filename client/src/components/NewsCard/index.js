import React from "react";

const NewsCard = ({announcements}) => {

    return (
        <div className= "card col-3"> 
        <p> this is the card for the news feed</p>
            {/* {announcements.map((announcement) => {
                <div>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.body}</p>
                </div>
            })} */}
       
        </div>
    );
};

export default NewsCard;