// DarkModeToggle.js
import React from 'react';
import { useDarkMode } from './ModeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div onClick={toggleDarkMode}>
      {darkMode ? <DarkModeIcon/> : <Brightness7Icon/>}
    </div>
  );
};

export default ModeToggle;
