import React from "react";

const NewsCard = ({ announcements }) => {

    return (
        <div className="card1 col-3">
            <h3>News and Updates</h3>
            <ul>
                <li>
                    <div>
                        <h4>Here's an update</h4>
                        <p>and here's some content for that update to display</p>
                    </div>
                </li>
                <li>
                    <div>
                        <h4>Here's some News</h4>
                        <p>and this is the body of that news link</p>
                    </div>
                </li>
                {/* {announcements.map((announcement) => {
                <div>
                    <h4>{announcement.title}</h4>
                    <p>{announcement.body}</p>
                </div>
            })} */}
            </ul>
        </div>
    );
};

export default NewsCard;