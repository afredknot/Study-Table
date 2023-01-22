import React, { useState } from 'react';
import settings from "./settings.svg";

function SettingsMenu() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

{/* <button onClick={toggleTheme}>Toggle Theme</button> */}

  return (
    <div className="navButton">
     <img src={settings}></img>
    </div>
  );
}
export default SettingsMenu;
