// DarkModeContext.js
import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(ModeContext);
};
