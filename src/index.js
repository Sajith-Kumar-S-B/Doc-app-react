import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'firebase/compat/firestore';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthProvider';
import { ModeContextProvider } from './ModeContext';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter> <AuthProvider> <ModeContextProvider><App /></ModeContextProvider></AuthProvider></BrowserRouter>
  </React.StrictMode>
);


