import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import {
  createTheme,
  ThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';

import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
const materialTheme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <HelmetProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
