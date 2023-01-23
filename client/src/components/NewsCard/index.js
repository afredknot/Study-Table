import React from "react";
import "./style.css";

const NewsCard = ({ announcements }) => {

    return (
        <div className="card2 no-scroll">

            <div className="cardHeader">
                <h3>News and Updates</h3>
            </div>

            <ul>
                <li className="article">
                    <div>
                        <h4>Ready.. Set.. Live!</h4>
                        <p>Thanks for joining us on our live launch of Study Table! This colabrative project was completed by a group of students in four days. As the final project of our bootcamp we were looking to make a app to help our fellow students and following classes manage their progess through assignments and take advantage of the largest resource availible, each other!</p>
                    </div>
                </li>
                <li className="article">
                    <div>
                        <h4>Contact the Creators!</h4>
                        <p>This project would not have been possible without the contributions of each group member! You can find a link to their github accounts below, feel free to reach out to them if you have any questions!</p>
                        <div className="links">
                            <a href="https://github.com/afredknot/" target="_blank">Daniel Nelson</a>
                            <a href="https://github.com/Dalidorn/" target="_blank">Nathaniel Fritz</a>
                            <a href="https://github.com/mfrabott" target="_blank">Micheal Frabott</a>
                            <a href="https://github.com/TomFallara" target="_blank">Tom Fallara</a>
                        </div>
                    </div>
                </li>
                <li className="article">
                    <div>
                        <h4>Code Concept!</h4>
                        <p>We set out with the goal to create an app called "Study Table". We wanted an app that helps students manage their homework and collaborate with their peers and instructors. With this app, students can set statuses on their assignments, create help tickets when they get stuck and view those tickets created by their fellow students. The design goal with the app is to help students overcome the fear of reaching out for help and being judged for their current knowledge or progress in assignments. With Study Table students can work together to achieve their educational goalsm making the learning process more efficient and enjoyable.</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default NewsCard;