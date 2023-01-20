import React, { useState } from 'react';
import notification from "./notification.svg"

const NotificationHandler = () => {

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  }

  const handleClearNotification = (index) => {
    let newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  }

// UPDATE NOTIFICATION IMAGE SRC
  return (
    <div>
      <div onClick={handleNotificationClick}>
        <img src={notification} alt="Notification Icon" style={{ width: "25px" }} />
        {notifications.length > 0 && <div style={{ position: "absolute", top: "0", right: "0", width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%" }} />}
      </div>

      {showNotifications && (
        <div style={{ position: "absolute", right: "30px", top: "30px", backgroundColor: "white", padding: "10px", border: "1px solid gray" }}>

          <h4>Active Notifications</h4>

          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                {notification} <button onClick={() => handleClearNotification(index)}>x</button>
              </li>
            ))}  
          </ul>

        </div>
      )}
    </div>
  );
}

export default NotificationHandler;