import React, { useState } from 'react';
import settings from "./settings.svg";
import { useProviderContext } from '../../utils/providerContext'; 

function SettingsMenu() {

  // const [theme, setTheme] = useState('light');

  // const toggleTheme = () => {
  //   if (theme === 'light') {
  //     setTheme('dark');
  //   } else {
  //     setTheme('light');
  //   }
  // };
  const { setVisibility, modalVisibility } = useProviderContext();

  const handleSettingsClick = () => {
    setVisibility(!modalVisibility);
  }

{/* <button onClick={toggleTheme}>Toggle Theme</button> */}

  return (
    <div onClick={handleSettingsClick} className="navButton">
     <img src={settings}></img>
    </div>
  );
}
export default SettingsMenu;
