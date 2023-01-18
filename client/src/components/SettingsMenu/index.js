// LIGHT AND DARK MODE

import React, { useState } from 'react';

function SettingsMenu() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <div className={`App ${theme}`}>
     <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
export default SettingsMenu;
